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

- posting 컴포넌트를 lazy loading하였다. 그런데, posting 컴포넌트 진입시에, 조금은 딜레이가 발생했다. 따라서 사용자 이용 패턴에 대하여 정의하여, 언제 preload 할지 생각해보았다. 먼저 사용자는 postingList를 fetch해야한다. 즉, postingList를 fetch하면 홈페이지 렌더링이 됨으로, postingList를 fetch한 후, posting 컴포넌트를 preload하여 지연시간을 최소화하려 노력하였다... 을 적용했다가,,, 그냥 원래대로 롤백했다. 왜냐하면 posting 페이지 자체에서 새로고침하면 로딩이 더욱 느려졌고(postingList가 로딩이 완료된 후, chunk 된 js, css 파일을 불러옴으로), 원래대로 돌려도 브라우저가 병렬 다운로드를 진행하기에 큰 문제가 없어보였지만, 정확히 측정해봐야한다.
- posting 로딩 중에 footer를 랜더링하지 않도록 하여, posting loading 후 footer가 밀려나는 것을 방지하였다.

#### 2024-10-19 vh to dvh

- 모바일 화면에서 스크롤바가 생기는 것을 막고자 vh를 dvh로 바꾸었다.
