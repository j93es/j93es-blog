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
3. 나오며

## 0. 들어가며

이번 포스팅은 React 기반 어플리케이션에서의 에러 핸들링에 대하여 살펴보겠습니다. 먼저, 에러 핸들링을 위해서는 어떤 에러가 있는지 살펴보아야할 것입니다. 더하여 이러한 에러를 잘 분류해야하겠죠. 마지막으로 이렇게 분류한 에러를 어떤 방식으로 핸들링하는지 설명하겠습니다.

## 1. React 기반 어플리케이션에서 발생하는 에러 분류

프론트엔드에서 에러를 핸들링하려면 어떤 과정을 밟아야할까요? 먼저 어떤 에러를 핸들링해야할지 명확히 파악해야할 것 입니다. 정확히 파악하기 위해서는 단위를 잘 나누는 것이 중요하죠. 먼저 에러를 분류화해봅시다. 

### 핵심 판단 기준

React 애플리케이션에서 발생하는 예외는 발생 위치와 형태(Promise rejection 여부)에 따라 처리 방식이 달라집니다. 에러 처리 위치와 형태를 통하여 3가지 분류로 에러를 나눌 수 있습니다.

- React가 실행 중인 코드인가?
- Promise rejection 형태인가?
- 그 외의 브라우저 콜백에서 발생한 일반 `throw`인가?

세부적으로 살펴봅시다.

### React가 실행하는 코드에서 발생한 예외

React는 컴포넌트를 생성하고 화면을 렌더링하는 과정에서 여러 메서드와 함수를 직접 호출합니다. 이러한 React가 직접 실행하는 코드에서 예외(throw)가 발생하면 React는 이를 감지하여 가장 가까운 Error Boundary에게 예외를 전달합니다.

대상은 다음과 같습니다.

- `render()`
- `constructor()`
- `componentDidMount()`
- `componentDidUpdate()`
- `getDerivedStateFromProps()`
- 기타 React 렌더링 및 생명주기 과정

이러한 위치에서 예외가 발생하면 React는 해당 컴포넌리 트리의 렌더링을 중단하고 가장 가까운 Error Boundary를 찾습니다.

처리 과정은 다음과 같습니다.

```txt
React가 컴포넌트 렌더링 시작
           │
           ▼
컴포넌트에서 예외 발생
           │
           ▼
가장 가까운 Error Boundary 탐색
           │
           ▼
componentDidCatch()
또는 getDerivedStateFromError() 호출
           │
           ▼
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

Promise에서 발생하는 오류는 일반적인 동기 예외(throw)와 다르게 처리됩니다.

Promise 내부에서 예외가 발생하면 JavaScript 엔진은 이를 즉시 바깥으로 던지는 것이 아니라 Promise를 rejected 상태로 전환합니다. 따라서 이 오류는 try...catch나 React의 Error Boundary가 아니라 Promise 체인을 따라 전파됩니다.

대표적인 대상은 다음과 같습니다.

- `Promise.reject(...)`
- `async` 함수 내부의 `throw`
- `await` 대상 Promise의 reject
- `Promise.then()` 내부에서 발생한 `throw`
- `Promise.catch()` 내부에서 다시 발생한 `throw`
- Promise executor 내부의 `throw`
- 처리되지 않은 Promise rejection

Promise에서 오류가 발생하면 다음과 같은 순서로 처리됩니다.

```txt
Promise 실행
      │
      ▼
reject 발생
      │
      ▼
.catch() 또는 try...await...catch 탐색
      │
      ├──────────────► 처리됨
      │                     │
      │                     ▼
      │                정상 종료
      │
      ▼
처리되지 않음
      │
      ▼
unhandledrejection 이벤트 발생
      │
      ▼
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

브라우저는 다양한 비동기 작업과 이벤트 처리를 위해 개발자가 등록한 콜백 함수를 직접 실행합니다.

이러한 브라우저가 실행하는 콜백 내부에서 throw가 발생하면, 예외는 React가 아닌 브라우저의 전역 예외 처리기(Global Error Handler) 로 전달됩니다.

대표적인 대상은 다음과 같습니다.

- `setTimeout()` 콜백 내부의 `throw`
- `setInterval()` 콜백 내부의 `throw`
- `requestAnimationFrame()` 콜백 내부의 `throw`
- DOM 이벤트 핸들러 내부의 `throw`
- `pageshow`, `load`, `beforeunload` 등의 이벤트 리스너 내부의 `throw`
- `addEventListener()` 콜백 내부의 `throw`
- Web Worker에서 발생한 일반 예외
- 기타 브라우저 API 콜백 내부의 `throw`

브라우저가 실행한 콜백에서 예외가 발생하면 일반적으로 다음과 같은 흐름으로 처리됩니다.

```
브라우저가 콜백 실행
        │
        ▼
throw 발생
        │
        ▼
브라우저의 전역 예외 처리기
        │
        ▼
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

지금부터는 에러 핸들러를 어떻게 구현하였는지 살펴보겠습니다.

### Root 살펴보기

먼저 최상단 컴포넌트를 살펴봅시다. 먼저 React 내부에서 발생하는 에러는 `<App />` 컴포넌트를 자식으로 하는 `<ErrorBoundary>` 컴포넌트에서 처리합니다. 다음으로 PromiseRejection 에러는 커스텀 훅에서 이벤트를 리스닝하여 처리합니다. 브라우저에 등록된 콜백에서 발생하는 에러는 추후 설명하겠지만, 다른 방식으로 처리합니다.

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

안드로이드 네이버 앱의 경우 웹사이트 공유하기 기능이 존재합니다. 그런데 2025년 2월 1일 기준, react-router-dom을 사용하는 어플리케이션의 경우, 에러 핸들링을 할때에 `onerror` 이벤트 리스너 등록시, 공유하기 버튼을 누른다면 에러가 발생하여 정상적으로 어플리케이션이 동작하지 않았습니다. 더하여 동일한 현상이 개인정보보호 브라우징에서도 발생하였습니다.

이러한 현상의 원인은 브라우저와 react-router-dom이 특정 동작에서 충돌하거나, react-router-dom으로 인하여 브라우저 자체에서 에러가 발생하고, `onerror` 이벤트를 리스닝하기 때문이라고 판단하였습니다.

즉, 특정 환경에서 웹 서비스를 정상적으로 사용하지 못하기 때문에, `error` 이벤트는 리스닝하지 않았습니다. 추후 브라우저에 등록된 callback은 에러를 catch하는 wrapper 함수로 일관되게 처리할 예정입니다.

## 3. 나오며

지금까지 React 어플리케이션의 에러를 분류하고, 분류한 에러를 핸들링하는 방식에 대하여 살펴보았습니다. 먼저 에러는 크게 3가지의 카테고리로 분류할 수 있습니다. 첫째로, React가 실행하는 코드에서 발생한 예외가 있습니다. 둘째로, Promise rejection이 있습니다. 셋째로, 브라우저 콜백에 등록된 함수가 throw하는 에러가 있습니다. 마지막으로 이러한 에러를 핸들링하는 방식을 `ErrorBoundary`와 이벤트 리스너를 중심으로 살펴보았습니다. 더하여 `error` 이벤트를 리스닝할때 생기는 이슈를 살펴보았습니다.
