# j93es-blog

제 블로그입니당

## 일지

- 일지는 일단 제 언어로 러프하게 적어보았고, 추후 글로 작성할 가치가 있다고 판단되면 포스팅으로 올릴 예정입니다.

#### 2024-9-26 initial

1. frontend

- react-markdown 이라는 심각한 의존성을 가짐에 심히 염려스럽다.
- rehype-raw 툴을 이용해서 md의 html 태그를 랜더링 시키려했으나, 무슨 미친 의존성을(아니 상식적으로 typescript 환경에 영향을 주는게 말이야 방구야) 요구하길래, 버렸다. react-markdown의 img 태그 컴포넌트를 추가하는 것으로 해결했으나, 여전히 react-markdown을 가지고 가는 것은 위협요소라 판단한다.(2024-10-13 추가: react-markdown 공식문서를 확인하고 rehype-raw를 적용해보니 잘 적용되더라... 일단 적용하진 않았으나, 웹팩 용량 등을 확인하고 추후 적용할 수도 있을것 같다. 먼저 문서를 읽는 것을 최우선으로 해야겠다.)
- TODO controller 분리 등 리팩터링 필요하다. 일해라 미래의 나.

2. backend

- 간단한 정적파일 제공 서버로 구현하였다.
- posting을 할 때, 마크다운 파일을 public까지 타고 들어가야해서 솔직히 포스팅에 어려움을 겪을 수는 있을 것 같다. (사실 귀찮은거지)

#### 2024-9-27 initial Production

- 배포했다
- j93.es, j93es.com, j93es.net 이 세개의 도메인에 배포하려했는데, api를 j93.es로 쓰려다보니, j93es.com, j93es.net의 경우에는 마크다운 내의 이미지를 다운받을때 ERR_BLOCKED_BY_ORB 이 에러가 발생하였다. 그래서 그냥 j93es.com, j93es.net을 j93.es로 리다이렉션 시켰다.

#### 2024-10-1 public directory structure update

- 블로그 카테고리에 사진을 추가하려하는데, 추후 사진의 용량이 5GB 이상으로 커지면 유지보수에 어려움을 느낄 수 있다고 판단했다. (카메라 사진 한장의 용량이 8mb인 것을 고려한다면 사진 용량에 관한 유지보수 고려는 필수적이라고 생각한다,) (깃허브는 한 레포지터리의 용량을 5GB 이하로 하기를 권장한다.) 따라서 /public/photo/dir-name/(name.md & /image/name.png)이런 식으로 구성되어 있던 것을 /public/posting/photo/dir-name/name.md /public/image/photo/dir-name/name.png의 구조로 바꾸고 추후 이미지 용량이 커진다면, /public/image/dir-name에 해당하는 레포지터리를 하나 더파서 build 할때 추가할 예정이다.

#### 2024-10-2 category

- 카테고리 분류와 posting list를 표시하는 방법(sorting, 카테고리 분류)을 바꿨다.

#### 2024-10-4 add photo posting

- 월본 이미지 사이즈(약 8mb)를 그대로 서빙하는 것은 쿨하지 않아서, 이미지 리사이즈 해주는 툴을 만들어서(이 툴은 어딘가에 무조건 있겠지만, 구현해보고 싶어서 만들어봤다. 낭만있잖아~ 사실 추후 미래에는 이미지, 그래픽을 다루는 능력이 점차 중요해질 것 같아서 맛보기로 구현해보았다.) 8짜리를 200kb로 줄여 public 파일에 넣었다. 깃 링크는 https://github.com/J93es/jpg-resizer.git 이것 참고
- html meta 태크를 통해 theme-color을 추가해봤는데 별 효과가 없는 것 같다ㅠㅠ

#### 2024-10-5 meta tag, Lighthouse, CSP

- 메타태그들을 손보았다. 성능 향상을 위하여 dns-prefetch를 해볼까 했는데 외부 도메인에서 받아오는게 없는 것 같아서 적용하지않았다. theme-color는 캐시문제인지 아직 잘 작동하지 않았다. 더하여 웹앱으로 실행될때의 로고등을 설정하였다.
- Lighthouse를 통하여 성능 테스트를 하였다. 모바일 환경에서의 performance가 낮게 측정되었으나, React를 활용하고 있고, 서버 사양이 개인 서버인 이상 현재 수준에서는 어쩔 수 없다고 판단한다. 하지만 성능을 높이기 위한 방법을 꾸준히 공부해봐야겠다. (그리고 lighthouse에서 모바일 환경 성능측정은 cpu를 20배 느리게 쓰로틀링 걸고 측정하는 것 같다...)
- 메타 태그에 apple-mobile-web-app-capable 이걸 사용했으나, chrome 브라우저에서 apple-mobile-web-app-capable is deprecated 라고 해서 mobile-web-app-capable로 바꾸었다. 기능상 문제는 없지만, frontend에서 디테일을 살리는 작업은 중요하다고 생각한다.
- bg-color을 body 태그에 적용하지 않아서 아래로 계속 스크롤하는 등의 액션을 취할 때에 흰색 영역이 보였다. 이를 body 태그에 bg-color 속성을 적용해서 해결했다.
- 랜더링 성능을 비약적으로 향상시켰다. 먼저 코드분리를 하였다. 홈페이지 화면에서는 마크다운을 html로 변환해주는 코드가 필요없다. 이에 홈페이지를 로드할때 필요없는 js 파일을 React.lazy를 이용하여 로드하지 않도록 만들었다. 둘째로 의존성을 정리하였다. react-syntax-highlighter라는 것을 사용하였는데... 이것이 용량이 상당히 컸다. 이에 rehype-highlight 만을 이용하여 code highlighting을 구현했다. 앞으로는 플러그인을 가져올때에, 플러그인의 용량도 생각해가며 가져와야겠다.
- 성능 최적화 결과, lighthouse 테스트 결과 본래 performance가 70점대를 웃돌았는데, 100점으로 향상되었다. ./frontend/performance-test/10-5-homepage 참고
- XSS 공격을 방지하기 위해 helmet을 통하여 content-security-policy를 설정하였다. express 서버에서 헤더를 추가할까 고민햇는데, 생각해보니 frontend 페이지에서도 CSP 헤더가 적용되어야해서 nginx에서 헤더를 추가하기로 하였다.
- cloudflare 캐싱 정책을 활용하였다. 일단 사이즈가 큰 image 라우터만 적용하였다.
- 캐싱 정책을 cloudflare에서 관리하기보다는 로컬에서 관리하는 것이 좋다고 판단하여 express에서 정적파일을 제공할 때에 캐싱을 설정하였다.

#### 2024-10-6 footer

- footer를 하단에 고정시키느라 애를 조금 먹었다. 여러 방법이 있었다. 먼저 footer를 제외한 header, body를 감싸는 wrapper를 만들어서 정렬하는 방법이 있었는데, html 구성요소가 한눈에 들어오는게 구조상 좋다고 생각했고, 추후(말도 안되는 이야기자만) header, body 밖에 요소를 실수로 추가하거나 혹은 그럴 필요가 생겼을때, 유지보수성이 좋지 않다고 판단했다. 따라서 App을 감싸는 요소에서 그리드를 세로로 지정해주어서 해결했다.(생각해보니 header, body 밖에 요소를 실수로 추가하면 여전히 동일한 문제가 발생할 수 있으나, 전체 html에서 header, main(body), footer가 직관적으로 보이는 장점[이것이 장점인지는 의문의 여지가 남아있으나]이 있을 것 같다.)

#### 2024-10-7 Build

- git pull 했을때 변경사항이 없으면 업데이트 하지 않도록 했다.
- css를 갈아 엎었더니 로고 a 태그의 높이가 엉망이 되어있었다. 이를 해결했다.
- css 요소 class의 이름을 통일성 있도록 작성하였다.

#### 2024-10-8 Detail

- 포스팅 페이지에서 새로고침을 하면, Notfound 페이지가 0.1초 정도 나왔다가, 로딩바가 떳다가 다시 포스팅 페이지가 랜더링되었다. 그 이유는 새로고침하면 api/index/를 불러와야하는데, 해당 api response가 도착하기 전까지는 리액트 라우터가 생성되지 않는다. 이에 리액트 라우터가 생성되지 않은 상태에서 해당 페이지에 접근하러하니 Notfound 페이지가 나왔던 것 같다. 해당 상황에서 Notfound 페이지가 뜨지 않도록, 로딩중일때는 리다이렉트 페이지보다 로딩바를 우선적으로 랜더링 되도록 하였다.
- 이미지가 밀려나는것을 방지하고 싶은데 한번 방법을 더욱 상세히 공부해봐야겠다.
- 정보 보호 정책을 수립하였다. 개인을 식별할 수 없는 범위 내에서 보안, 사용자 경험 등을 위하여 최소한의 정보(IP 주소, 브라우저 정보) 만을 수집하기로 하였다.

#### 2024-10-9 posting category

- 기존에는 포스팅 카테고리를 frontend에서 관리하는 부분이 있었다. 이를 전부 backend에서 관리할 수 있도록 하였다.
- 이전 글, 다음 글 기능을 추가하였다.
- PostingDataClass를 추가하여 데이터를 직관적으로 사용할 수 있게 되었다.(ex. Object.keys(postingData).sort(---) => postingData.getCategoryList())

#### 2024-10-10 remove dependency

- gray-matter라는 툴이 별로라는 생각이 들었다. 일단 Webpack5에서 Buffer을 기본적으로 제공해주지 않아서, React에서는 gray-matter를 사용하기에 어려워 보였다. 이에, 마크다운 parser를 만들어서 gray-matter를 대체하였다. 구현이 쉬워보였는데, 정규표현식 등을 활용해서 여러 엣지 케이스를 막아야 했다는 점이 까다롭게 느껴졌다.
- 포스팅을 fetch하는 주체를 Body 컴포넌트에서 Posting 컴포넌트로 옮겼다. 더하여 Loading을 isPostingListLoading과 isPostingLoading으로 분리하였다.
- react-markdown에서 생성하는 pre 태그가 화면 밖으로 삐져나오는 것을 <pre style={{ whiteSpace: "pre-wrap", width: "100%" }} {...props} /> 을 통하여 해결하였다.

#### 2024-10-13 markdown pre tag, code tag, scroll

- 코드 블록이 줄바꿈 되는 것이 아주 보기 싫다. 따라서 scoll하는 방향으로 pre tag를 변경하였다.
- 마크다운의 pre tag 랜더링 성능을 향상시켰다. pre 태그를 scroll 하는 방법으로 업데이트 했더니, 부모요소의 size가 업데이트 된다면, markdown 전체가 렌더링 되는 문제가 있었는데, 변경후에는 pre tag만 랜더링 된다

#### 2024-10-14 refactor, add rehype-raw

- backend: 기존 util에 묶여 있었던 service 로직을 분리하였다.
- frontend: postingData라는 model의 어휘가 중의적이라고 생각되어, postingIndex로 이름을 바꾸었다. 더하여 model 파일에 같이 존재하였던 controller 로직을 분리하였다.
- rehype-raw를 적용할까 고민하였으나 결론적으로 적용하기로 했다. 일단 적용하려한 이유는 img 태그의 width, height를 지정하여 이미지가 랜더링 시에 쉬프트 되지 않도록 하여 사용자 경험을 높이기 위해서였다. 하지만 rehype-raw를 install하고 웹팩으로 감싸면 무려 90kb에서 60kb증가한 150kb 정도가 나와서(약 1.6배 증가한 수치이다.) 적용하는데 망설여졌다. 그런데 사용자의 경험을 위하여 각 img에 lasyloading을 적용하고 추후 picture 태그를 통하여 확장 가능하다는 점에서 rehype-raw를 적용하기로 하였다. 현재로서는 img 태그만을 위하여 이 툴을 적용하였는데, 수지타산이 맞는지 고민이긴하다.

#### 2024-10-17 component lazy loading

- posting 컴포넌트를 lazy loading하였다. 그런데, posting 컴포넌트 진입시에, 조금은 딜레이가 발생했다. 따라서 사용자 이용 패턴에 대하여 정의하여, 언제 preload 할지 생각해보았다. 먼저 사용자는 postingList를 fetch해야한다. 즉, postingList를 fetch하면 홈페이지 렌더링이 됨으로, postingList를 fetch한 후, posting 컴포넌트를 load하여 지연시간을 최소화하려 노력하였다... 을 적용했다가,,, 그냥 원래대로 롤백했다. 왜냐하면 posting 페이지 자체에서 새로고침하면 로딩이 더욱 느려졌고(postingList가 로딩이 완료된 후, chunk 된 js, css 파일을 불러옴으로), 원래대로 돌려도 브라우저가 병렬 다운로드를 진행하기에 큰 문제가 없어보였지만, 정확히 측정해봐야한다.
- posting 로딩 중에 footer를 랜더링하지 않도록 하여, posting loading 후 footer가 밀려나는 것을 방지하였다.

#### 2024-10-19 vh to dvh

- 모바일 화면에서 스크롤바가 생기는 것을 막고자 vh를 dvh로 바꾸었다.

#### 2024-10-21 gzip

- express 서버에서 compression 모듈을 통하여 gzip으로 압축 후, client에 전송하여 성능 향상을 꾀하였다.

#### 2024-10-23 gzip

- local 환경에서는 compression이 잘 동작했지만, 배포 환경에서는 잘 동작하지 않았다. nginx가 gzip 관련한 것을 건드려서 그런것으로 파악되며, 아싸리 nginx에서 gzip 설정을 하기로 하였다. (대회 준비중인 서버가 있는데, gzip 설정을 잘못 적용하면 예상치 못한 상황이 생길 것 같아서 11월 7일 이후에 nginx 설정을 바꾸려한다.)
- nginx에서 보안관련 설정을 하여서 helmet을 제거하였다.

#### 2025-1-5 loading 이펙트를 어디에서 처리할 것인가?

- 현재 프로젝트는 App -> Body -> Posting/Posting List의 계층으로 이루어져있다. 이때, 포스팅 리스트에 대한 fetch는 App에서(라우터를 생성하기 위하여)하였으나, 멍청하게도 포스팅 리스트에 대한 loading 이펙트는 Body에서 하고 있었다. 가독성과 유지보수를 위하여 App에서 포스팅 리스트에 대한 loading 이펙트를 처리하였다.

#### 2025-1-7 리팩터링 | 포스팅에서 부모요소 사이즈를 observing

- app에서 라우터를 설정하여, 가독성이 떨어지는 것처럼 보였고, 차라리 react router를 body에서 관리하면 posting list에 대한 fetch도 body에서 진행할 수 있으니, react router를 body에서 관리하도록 리팩터링 하였다.
- 포스팅에서 부모요소 사이즈를 observing할때 기존에는

```typescript
useEffect(() => {
  const updateSize = () => {
    const element = elementRef.current;
    if (element) {
      const { width } = element.getBoundingClientRect();
      setElementWidth(width);
    }
  };

  updateSize();
  window.addEventListener("resize", updateSize);

  return () => {
    window.removeEventListener("resize", updateSize);
  };
}, []);
```

위의 코드를 사용하였다. 하지만 브라우저 창을 너무 빠르게 변경하면 width가 제대로 적용되지 않았다. 더하여 resize 이벤트는 정말 빠르게 발생되기 때문에 비효율적이다. 이에, 다음의 코드로 개선하였다.

```typescript
useEffect(() => {
  const resizeObserver = new ResizeObserver((entries) => {
    for (const entry of entries) {
      const width = entry.contentRect.width;
      setElementWidth(width);
    }
  });

  const element = elementRef.current;
  if (element) {
    resizeObserver.observe(element);
  }

  return () => {
    if (element) {
      resizeObserver.unobserve(element);
    }
  };
}, []);
```

#### 2025-1-18 특정 브라우저에서의 포스팅 이동 시의 화면 조정 | css 변수처럼 사용

- 사파리에서 이전에 랜더링 되었던, 이전 포스팅 링크로 이동 시에, 뷰포트에 제일 상단이 아닌 포스팅에 중간이 노출되게 되었다. 예를 들어 A포스팅/B포스팅이 있다고 할 때, 먼저 A포스팅에 접속하고, 다음 포스팅 링크를 클릭하여 B포스팅으로 넘어갔다고 가정하자. 이때 B포스팅에서 이전 포스팅 링크를 클릭하여 A포스팅으로 넘어가면, 포스팅의 상단이 아닌, 중간부터 노출된다. 따라서 포스팅 path가 변경될때마다 화면 상단이 보여지게끔 만들었다.

- css에서 색깔을 변수처럼 사용하였다. index.css에서 :root에 여러 색을 지정하고, 자식에서 var(--color-name) 처럼 사용하였다.

#### 2025-1-19 ErrorBoundary & useGlobalErrorHandler

- ErrorBoundary로 이벤트나 비동기 작업이 아닌 곳에서 발생하는 에러를, useGlobalErrorHandler를 통하여 이벤트나 비동기 작업에서 발생하는 에러를, 전역으로 핸들링 할 수 있게 되었다.

#### 2025-1-20 svg refactor

- 기존에는 svg 등의 아이콘이나 로고를 inlineㅇ로 활용하였다. 하지만, 여러 컴포넌트에서 로고를 활용할 상황이 생겼고, 이에 assets 폴더에 svg 파일을 정리하여 유지보수성/재사용성을 높혔다.

#### 2025-1-27 soft 404

- 에러 페이지에서 soft 404라는 문제가 발생하였다. soft 404는 실제 http 상태코드는 200이지만 내부에 표시되는 페이지는 404를 담고 있는 상황이다. 일반적인 사용자는 문제가 안되지만, 봇은 헷갈린다고 한다. 이에 soft 404를 실제 404로 바꾸기 위하여, express 서버에 에러 관련 html을 전달해주는 라우터를 만들고, react 페이지에서 에러가 발생한다면 해당 라우터로 리다이렉션 시켰다.

#### 2025-2-1 네이버 공유하기 에러

- 안드로이드 네이버 앱 환경에서 네이버 공유하기를 클릭시 에러가 발생하였다. 왜냐하면 네이버 공유하기 기능에서는 document 속성이 충돌되는 것 같다. 따라서 document 관련 코드를 try-catch로 묶으니 해결되었다.
- react 에러 바운더리에 단순히 "예기치 못한 문제가 발생하였습니다."가 아닌 실제 에러 객체의 메세지를 표기하여 디버깅이 더 쉽게 수정하였다.

#### 2025-2-2 error event listener | footer hide cmd 관리 주체 | refactor

- error event listener를 삭제하였습니다. 안드로이드 네이버 앱 환경에서 공유하기 버튼을 누르거나, 개인정보보호 브라우저를 실행할 시에 무조건 에러 페이지로 리디렉션 되었습니다. 즉, 브라우저 자체에서 발생하는 오류로 인하여 error event가 발생하고, 에러 페이지로 리디렉션 되는 상황이었습니다. 이에 error event listener를 삭제하였습니다.
- 이제부터 footer hide cmd를 loader에서 관리합니다.
- export를 파일의 제일 아래에서 관리하고, function을 arrow function으로 교체하였습니다.

#### 2025-2-4 soft 404

- soft 404를 해결하기 위하여 별의 별짓을 다했다. 결론적으로 frontend 파일들을 express에서 서빙하며, url에 대하여 선제적으로 파일이 있는지 검사하여, 없다면 에러페이지로 리디렉션하고, 있다면 index.html을 반환하여 정상적으로 동작하게 하였다.

#### 2025-2-5 seo optimize

- index.html을 템플릿 엔진처럼 변환할 수 있도록 만들었다. 즉, placeholder를 넣어두고 토큰화하여, 해당 부분을 교체하는 방법으로 진행하였다. 이제 각 url 별로 알맞는 title과 description이 출력된다. 그럼에도 불구하고 나중에 ssg 프레임워크로 변경할 예정이다.

#### 2025-2-20 refactor

- backend의 filesMetadata에 postingIndex 로직이 엮여있었다. 예를들어 filesMetadata의 메서드 중 일부는 postingIndex의 모델로 반환값을 전송했다. 그런데 단순한 리스트 형태로 정보를 전달받을 일이 생겼다. 따라서 filesMetadata는 EachPosting[] 형태로 정보를 전달하고, adapter가 EachPosting[]를 postingIndex로 변환시키도록 하였다.

#### 2025-2-24 loading spinner, refactor, Crossbrowsing

- 여러 fetch가 이루어질때, loading spinner가 끊기듯이 랜더링 되었다. 따라서 loading에 관한 로직을 전역으로 처리하였다.
- context들을 하나의 디렉토리에 몰아두어 가독성을 향상시켰다.

- Safari에서 트랙패드로 뒤로가기 제스처 시에 브라우저가 1초간 멈추는 이슈를 해결했다. 먼저 Safari에서 포스팅의 중간부분에 있다가, 뒤로가기 트랙패드 제스처 이후, 앞으로가기 트랙패드 제스처를 하면, 브라우저가 1초 정도 멈춘다. 특히 뒤로가기 버튼을 클릭하면 정상작동하고, 트랙패드 제스처만 해당 이슈가 발생하였다. [링크](https://bugs.webkit.org/show_bug.cgi?id=248303)에서도 동일한 문제를 겪고있는 사람이 있었고, 원인을 추측할 수 있었다. 간단히 설명하면, 짧은 터치 제스처(touchstart → touchend가 빠르게 실행됨)는 히스토리 항목이 정상적으로 추가되지만(뒤로 가기 버튼이 동작함), 긴 터치 제스처(touchstart 후 1초 이상 대기 후 touchend)는 히스토리 항목이 사용자 상호작용으로 추가된 것으로 간주되지 않기 때문인것으로 추측된다(뒤로 가기 버튼이 작동하지 않음). 즉, 트랙패드 제스처는 히스토리 항목에 정상적으로 추가되지 않을 수 있고, 브라우저의 히스토리 상태가 변경될 때 실행되는 popstate 이벤트와 충돌되는 것으로 추측한다. 따라서 popstate 이벤트가 발생하면, window.location.reload();를 하여 문제를 해결하였다.

<details>
<summary>링크 전문</summary>
<div markdown="1">

### **번역:**

---

**안녕하세요 Chris 및 WebKit 팀,**

설명해 주셔서 감사합니다. 참고로, Chris가 설명한 변경 사항은 아래 링크에서 확인할 수 있습니다:

- <https://bugs.webkit.org/show_bug.cgi?id=241885> (<https://commits.webkit.org/251783@main>)
- 그리고 후속 수정: <https://bugs.webkit.org/show_bug.cgi?id=242947> (<https://commits.webkit.org/252649@main>)

지금, 저는 **iOS 16.3.1 (20D67)** 을 실행하는 **iPhone SE (2세대)** 에서 실험을 진행했으며, `"is history item added by user interaction"`(사용자 상호작용을 통해 추가된 히스토리 항목인지 감지하는 로직)이 `"touchend"` 이벤트를 사용할 때 다소 예측 불가능하게 작동하는 것을 발견했습니다.

즉, 어떤 경우에는 `"touchend"` 리스너에서 추가된 히스토리 항목이 **"사용자 상호작용에 의해 추가된 것"** 으로 간주되지만,  
어떤 경우에는 그렇지 않으며, **일관된 패턴 없이 랜덤하게 작동하는 것처럼 보였습니다.**

그러나 위에 링크된 WebKit 소스 코드 변경 사항을 분석한 결과, 몇 가지 가설을 세울 수 있었습니다.

---

## **🔍 WebKit의 "사용자 상호작용에 의해 추가된 히스토리 항목" 감지 로직**

핵심 로직은 **`Document.cpp`** 에서 다음과 같이 구현되어 있습니다:

```cpp
bool Document::hasRecentUserInteractionForNavigationFromJS() const
{
    if (UserGestureIndicator::processingUserGesture(this))
        return true;

    static constexpr Seconds maximumItervalForUserGestureForwarding { 10_s };
    return (MonotonicTime::now() - lastHandledUserGestureTimestamp()) <= maximumItervalForUserGestureForwarding;
}
```

이 함수는 두 가지 경우 중 하나에 해당하면 `true`를 반환합니다:

1. **`processingUserGesture()`가 `true`를 반환하는 경우**  
   → 즉, 현재 브라우저가 **사용자 제스처를 처리 중인 상태**라면 `true`를 반환
2. **마지막 사용자 제스처가 1초 이내에 발생한 경우**  
   → `lastHandledUserGestureTimestamp()` 값이 **현재 시간에서 1초 이내**라면 `true` 반환

`lastHandledUserGestureTimestamp()`는 내부적으로 `updateLastHandledUserGestureTimestamp()`를 호출하여 업데이트됩니다.  
이 함수는 **`UserGestureIndicator` 객체가 생성될 때 실행되며, 새로운 `UserGestureToken`을 생성할 때도 실행됩니다.**

---

## **🤔 가설: WebKit의 `UserGestureToken` 동작 방식과 touchend 이벤트 감지 문제**

여러 단서를 통해, **`UserGestureToken`은 단순한 개별 터치 이벤트가 아니라, 전체 제스처의 "수명 주기"를 추적하는 객체일 가능성이 있습니다.**

### **🚩 이를 뒷받침하는 단서:**

- `UserGestureToken` 객체에 `startTime`이라는 멤버 변수가 있음
- macOS **AppKit** 및 iOS **UIKit**에서는 `"gesture"`(제스처)라는 용어를 단일 터치 이벤트가 아닌, **전체 터치 이벤트 시퀀스**를 의미하는 용도로 사용

**➡️ 즉, WebKit의 `hasRecentUserInteractionForNavigationFromJS()` 함수는 "마지막 제스처의 시작 시점"이 1초 이내인지 확인하는 것일 수 있습니다.**

---

## **🔬 테스트 결과: 터치 제스처의 길이에 따른 차이**

이 가설이 맞다면, `"touchend"` 이벤트에서 히스토리 항목을 추가할 때 성공 여부가 **제스처의 전체 길이에 따라 달라질 가능성이 있습니다.**

### **🧪 실험 결과**

- **짧은 터치 제스처** (`touchstart` → `touchend`가 빠르게 실행됨)  
  ✅ 히스토리 항목이 정상적으로 추가됨 (뒤로 가기 버튼이 동작함)

- **긴 터치 제스처** (`touchstart` 후 1초 이상 대기 후 `touchend`)  
  ❌ 히스토리 항목이 **사용자 상호작용으로 추가된 것으로 간주되지 않음** (뒤로 가기 버튼이 작동하지 않음)

즉, **제스처가 길어질수록 히스토리 항목 추가가 정상적으로 인식되지 않는 경향이 있었습니다.**

---

## **📌 추가 궁금한 점**

저는 정확한 1초 임계값을 JavaScript에서 측정할 수 없었지만, 확실한 것은 **짧은 터치 제스처는 정상적으로 작동하고 긴 제스처는 실패하는 패턴이 있다는 점입니다.**

- iOS에서 이 "1초" 임계값을 변경하는 경우가 있을까?
- 혹은 내부적으로 **레이스 컨디션 (race condition)** 이 발생하는 것일까?
- 이 동작이 일관되지 않은 이유는 무엇일까?

**오늘은 어셈블리 코드를 분석하지 않겠지만, 이 부분이 어떻게 작동하는지 매우 궁금합니다.** 🤔

테스트 케이스를 첨부할 예정이니, 이 버그를 추적하는 데 도움이 되었으면 합니다. 🚀

---

## **✅ 요약**

- WebKit의 `"사용자 상호작용 감지"` 로직은 제스처 시작 시점을 기준으로 판단하는 것일 가능성이 있음
- `"touchend"` 이벤트에서 히스토리 항목을 추가할 때, **짧은 제스처는 정상적으로 동작하지만 긴 제스처는 실패하는 경향**이 있음
- 이 문제의 원인은 **제스처 시작 시점과 `hasRecentUserInteractionForNavigationFromJS()`의 임계값(1초?)이 맞물려 발생하는 것일 가능성이 큼**
- 내부적으로 `UserGestureToken`이 전체 제스처를 추적하는 구조일 가능성이 있음
- iOS에서 이 임계값이 변경될 수 있는지, 혹은 레이스 컨디션이 있는지 추가 확인이 필요함

🚀 **테스트 케이스를 공유할 예정이니, 이 정보를 통해 문제를 해결할 수 있기를 바랍니다!** 🔍

</div>
</details>

#### 2025-2-25 Crossbrowsing

- Safari에서 트랙패드로 뒤로가기 제스처 시에 브라우저가 1초간 멈추는 이슈를 해결했는데, 배포과정에서 이상한 문제가 생겼다. 사파리 개인정보 브라우저에서 트랙패드로 뒤로가기 실행시, fetch에러가 났다. 이유를 알아보니, reload시에 fetch가 취소되는데, 이때문에 에러가 발생하여 문제가 생겼다. 따라서 fetch 에러처리 로직을 변경하였다.
- 해당 해결책을 적용하고 나니, ios의 Chrome과 ios의 Safari에서 불필요하게 reload되고 있었다. 사실 Desktop Safari에서 문제가 발생하기 때문에, Chrome에서는 reload되지 않아도 된다. 이유를 알아보니 user agent가 "CriOS" 로 표기되어 제대로 파싱하지 못했다. npm라이브러리를 통하여 브라우저 정보를 해석하기로 하였다.
- css normalize 를 하여 여러 브라우저에서 동일한 스타일을 유지하도록 하였다.
- crossbrowsing을 위해서 html5 태그, css 가상 selector, css 변수를 지원하지 않는 브라우저에서 잘 동작하도록 만들었다.

#### 2025-02-26

- 로고와 body의 간격 등에 의해 postinglist와 posting의 간격이 동시에 변하게 하는것이, 유지보수에 이롭다고 판단하였다.(간격의 gap은 일정하게 유지하는 것이 좋기에) 따라서 css 변수를 활용하여, 유지보수성을 높혔다.

#### 2025-2-28

- 여러 환경에서 동일한 디자인을 제공하기 위해 폰트를 적용했다.

#### 2025-3-1

- 에러 페이지와 noscript 페이지를 압축하여 serving하도록 만들었다.
