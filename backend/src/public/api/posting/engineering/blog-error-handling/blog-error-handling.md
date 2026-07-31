---
title: 블로그 에러 핸들링
date: 2026-07-28
tag: [Frontend, Backend]
category: engineering
description: "React 기반 어플리케이션에서의 에러 핸들링에 대하여 논합니다. 어떤 에러가 있는지 확인하고, 이러한 에러를 분류하여 살펴봅니다. 더하여 분류한 에러를 어떤 방식으로 핸들링하는지 설명하겠습니다."
---

## 목차

0. 들어가며
1. React 기반 어플리케이션에서 발생하는 에러 분류
    - 핵심 판단 기준
    - React가 실행하는 코드에서 발생한 예외
    - Promise 기반 예외 (`Promise rejection`)
    - 브라우저 콜백에서 발생한 일반 예외 (`throw`)
2. 에러 핸들러 구현
    - 에러 바운더리
    - unhandledrejection(Promise rejection)
    - error(그 외 브라우저 콜백에서 throw)
        - 브라우저 자체(네이버 앱 등)의 에러
3. 나오며

## 0. 들어가며

이번 포스팅은 React 기반 어플리케이션에서의 에러 핸들링에 대하여 살펴보겠습니다. 먼저, 에러 핸들링을 위해서는 어떤 에러가 있는지 살펴보아야할 것입니다. 더하여 이러한 에러를 잘 분류해야하겠죠. 마지막으로 이렇게 분류한 에러를 어떤 방식으로 핸들링하는지 설명하겠습니다.

## 1. React 기반 어플리케이션에서 발생하는 에러 분류

프론트엔드에서 에러를 핸들링하려면 어떤 과정을 밟아야할까요? 먼저 어떤 에러를 핸들링해야할지 명확히 파악해야할 것 입니다. 에러를 분류화해봅시다. React 애플리케이션에서 발생하는 예외는 발생 위치와 형태(Promise rejection 여부)에 따라 처리 방식이 달라집니다. 

### 핵심 판단 기준

에러 처리 위치를 결정하는 기준은 **동기/비동기 여부가 아닙니다.** 해당 코드가 어디에서 실행되는지와 어떤 종류의 코드인지가 중요합니다. 다음의 3가지로 에러 처리 위치를 분류할 수 있습니다.

1. **React가 실행 중인 코드인가?**
   - 그렇다면 → React Error Boundary

2. **Promise rejection 형태인가?**
   - 그렇다면 → `unhandledrejection`

3. **그 외의 브라우저 콜백에서 발생한 일반 `throw`인가?**
   - 그렇다면 → `error` 이벤트 (`window.onerror`)

즉:

```txt
React 실행 중 throw
        ↓
Error Boundary
```

```txt
Promise reject
        ↓
unhandledrejection
```

```txt
그 외 브라우저 콜백에서 throw
        ↓
error 이벤트
```

세부적으로 살펴봅시다.

### React가 실행하는 코드에서 발생한 예외

React가 컴포넌트를 렌더링하거나 생명주기를 실행하는 과정에서 발생한 예외는 React Error Boundary가 처리할 수 있습니다.

대상:

- `render()`
- `constructor()`
- `componentDidMount()`
- `componentDidUpdate()`
- `getDerivedStateFromProps()`
- 기타 React 렌더링 및 생명주기 과정

처리 흐름:

```
# React 실행 영역

예외 발생
      ↓
React Error Boundary
      ↓
Fallback UI 렌더링
```

예:

```jsx
function Component() {
  throw new Error("Render error");

  return <div>Hello</div>;
}
```

### Promise 기반 예외 (`Promise rejection`)

Promise 내부에서 발생한 오류는 일반적인 `throw`가 아니라 **Promise rejection 상태**로 전환됩니다.

React Error Boundary는 Promise rejection을 직접 처리하지 않습니다.

대상:

- `Promise.reject(...)`
- `async` 함수 내부의 `throw`
- `await` 대상 Promise의 reject
- `Promise.then()` 내부에서 발생한 `throw`
- `Promise.catch()` 내부에서 다시 발생한 `throw`
- Promise executor 내부의 `throw`
- 처리되지 않은 Promise rejection

처리 흐름:

```
Promise 실행
      ↓
reject 발생
      ↓
catch 처리 여부 확인
      ↓
처리되지 않은 경우
      ↓
window.onunhandledrejection
또는
window.addEventListener("unhandledrejection")
```

예:

```javascript
Promise.resolve()
  .then(() => {
    throw new Error("Promise error");
  });
```

결과:

```text
window.onunhandledrejection 발생
```

### 브라우저 콜백에서 발생한 일반 예외 (`throw`)

React가 직접 실행하지 않는 브라우저 이벤트나 비동기 콜백 내부에서 발생한 일반 예외는 Error Boundary가 처리하지 않습니다.

대상:

- `setTimeout()` 콜백 내부의 `throw`
- `setInterval()` 콜백 내부의 `throw`
- `requestAnimationFrame()` 콜백 내부의 `throw`
- DOM 이벤트 핸들러 내부의 `throw`
- `pageshow`, `load`, `beforeunload` 등의 이벤트 리스너 내부의 `throw`
- `addEventListener()` 콜백 내부의 `throw`
- Web Worker에서 발생한 일반 예외
- 기타 브라우저 API 콜백 내부의 `throw`

처리 흐름:

```
브라우저 콜백 실행
      ↓
예외 발생 (throw)
      ↓
window.onerror
또는
window.addEventListener("error")
```

예:

```javascript
setTimeout(() => {
  throw new Error("Timeout error");
}, 1000);
```

결과:

```text
window.onerror 발생
```

지금까지 React의 에러를 분류하고 정리해보았습니다.

## 2. 에러 핸들러 구현

지금부터는 에러 핸들러를 어떻게 구현하였는지 살펴보겠습니다. 먼저 고려해야할 사항은 다음과 같습니다.

- 에러 발생 시, 에러 페이지로 리디렉션되어야 함
    - API 요청 시에 404에러가 발생하면 404 응답코드의 에러페이지로 전달
    - 에러 바운더리에서 에러가 발생하면 1000번으로 서버에 전달 후 418 응답코드로 리디렉션
    - Promise rejection에서 에러가 발생하면, 1001번으로 서버에 전달 후 418 응답코드로 리디렉션
    - React 외부(네트워크 에러 등)이 발생하면, 1002번으로 서버에 전달 후 418 응답코드로 리디렉션
- 위에서 살펴본 3가지 분류의 에러를 전부 핸들링한다.

위의 두가지 사항을 고려하여 개발한 내용을 살펴보겠습니다.

### Root 살펴보기

먼저 최상단 컴포넌트를 살펴봅시다. 먼저 커스텀 훅를 통하여 PromiseRejection 에러를 처리합니다. 브라우저에 등록된 콜백에서 발생하는 에러는 추후 설명하겠지만, 다른 방식으로 처리합니다. 더하여 React 내부에서 발생하는 에러는 App 컴포넌트를 자식으로 하는 ErrorBoundary 컴포넌트에서 처리합니다.

```tsx
const Root = () => {
  usePromiseRejectionErrorHandler();
  /* 추후 설명하겠지만, BrowserCallbackError는 다른 방식으로 처리합니다. */
  // useBrowserCallbackErrorHandler();

  return (
    <ErrorBoundary>
        <App />
    </ErrorBoundary>
  );
};
```

이제 각 요소를 살펴보겠습니다.

### 에러 바운더리

[React 에러 바운더리](https://react.dev/reference/react/Component#catching-rendering-errors-with-an-error-boundary)에 따르면 다음과 같이 에러 바운더리 컴포넌트를 구성할 수 있습니다.

```tsx
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // 다음 렌더링에서 폴백 UI가 보이도록 상태를 업데이트 합니다.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // 에러 리포팅 서비스에 에러를 기록할 수도 있습니다.
    logErrorToMyService(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      /* 에러 발생 시 처리할 logic */
      // 저의 블로그의 경우, 에러 페이지로 리디렉션되도록 하였습니다.
    }

    return this.props.children;
  }
}
```

즉, 위의 컴포넌트를 최상단 컴포넌트에 위치시키고, 자식 컴포넌트의 에러를 핸들링하는 것입니다. React는 내부적으로 에러가 발생시에 `getDerivedStateFromError()`를 호출합니다. 즉, `getDerivedStateFromError()` 함수가 `hasError` Prop을 true로 바꾸는 것을 통하여, 리액트 내부에서 발생하는 자식 컴포넌트의 에러를 핸들링합니다.

### unhandledrejection(Promise rejection)

다음은 커스텀 훅입니다. 주요 로직은 `unhandledrejection` 이벤트를 리스닝하는 것입니다. `unhandledrejection` 이벤트를 리스닝한다면, Promise Rejection이 발생할때, 등록한 callback 함수로 에러를 핸들링 할 수 있습니다.

```tsx
const usePromiseRejectionErrorHandler = () => {
  useEffect(() => {
    // 처리되지 않은 Promise Rejection
    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      /* 에러 발생 시 처리할 logic */
      // 저의 블로그의 경우, 에러 페이지로 리디렉션되도록 하였습니다.
    };

    // 이벤트 리스너 등록
    window.addEventListener("unhandledrejection", handleUnhandledRejection);

    return () => {
      // 컴포넌트 언마운트 시 리스너 해제
      window.removeEventListener(
        "unhandledrejection",
        handleUnhandledRejection
      );
    };
  }, []);
};
```

### error(그 외 브라우저 콜백에서 throw)

브라우저 콜백에서 throw하는 에러는 위의 `usePromiseRejectionErrorHandler`의 예시에서 이벤트 리스너를 아래의 코드로 변경하면 됩니다. 즉, `error` 이벤트를 리스닝하는 것 입니다.

`window.addEventListener("error", handleError);`

그런데 해당 코드 적용시 특정 브라우저에서 문제가 발생하였습니다. 2025년 2월 1일 기준 안드로이드 네이버 앱의 개인정보보호 브라우저와 네이버 앱 공유하기 기능에서 사이트가 정상적으로 동작하지 않았습니다. 해당 브라우저에서 직접 등록한 콜백에서 에러가 발생했던 것입니다. 즉, 특정 환경에서 정상적인 사용이 불가해서 채택하지 않았습니다. 추후 브라우저에 등록된 callback은 에러를 catch하는 wrapper 함수로 일관되게 처리할 예정입니다.

## 3. 나오며

지금까지 React 어플리케이션의 에러를 분류하고, 분류한 에러를 핸들링하는 방식에 대하여 살펴보았습니다. 먼저 에러는 크게 3가지의 카테고리로 분류할 수 있습니다. 첫째로, React가 실행하는 코드에서 발생한 예외가 있습니다. 둘째로, Promise rejection이 있습니다. 셋째로, 브라우저 콜백에 등록된 함수가 throw하는 에러가 있습니다. 마지막으로 이러한 에러를 핸들링하는 방식을 살펴보았습니다.
