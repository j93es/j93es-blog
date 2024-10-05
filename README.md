# j93es-blog

제 블로그입니당

## 일지

#### 2024-9-26 initial

1. frontend

- react-markdown 이라는 심각한 의존성을 가짐에 심히 염려스럽다.
- rehype-raw 툴을 이용해서 md의 html 태그를 랜더링 시키려했으나, 무슨 미친 의존성을(아니 상식적으로 typescript 환경에 영향을 주는게 말이야 방구야) 요구하길래, 버렸다. react-markdown의 img 태그 컴포넌트를 추가하는 것으로 해결했으나, 여전히 react-markdown을 가지고 가는 것은 위협요소라 판단한다.
- TODO controller 분리 등 리팩터링 필요하다. 일해라 미래의 나.

2. backend

- 간단한 정적파일 제공 서버로 구현하였다.
- posting을 할 때, 마크다운 파일을 public까지 타고 들어가야해서 솔직히 포스팅에 어려움을 겪을 수는 있을 것 같다. (사실 귀찮은거지)

#### 2024-9-27 initial Production

- 배포했다
- j93.es, j93es.com, j93es.net 이 세개의 도메인에 배포하려했는데, api를 j93.es로 쓰려다보니, j93es.com, j93es.net의 경우에는 마크다운 내의 이미지를 다운받을때 ERR_BLOCKED_BY_ORB 이 에러가 발생하였다. 그래서 그냥 j93es.com, j93es.net을 j93.es로 리다이렉션 시켰다.

#### 2024-10-1 public directory structure update

- 블로그 카테고리에 사진을 추가하려하는데, 추후 사진의 용량이 10GB 이상으로 커지면 유지보수에 어려움을 느낄 수 있다고 판단했다. (카메라 사진 한장의 용량이 8mb인 것을 고려한다면 사진 용량에 관한 유지보수 고려는 필수적이라고 생각한다,) (깃허브는 한 레포지터리의 용량을 10GB 이하로 하기를 권장한다.) 따라서 /public/photo/dir-name/(name.md & /image/name.png)이런 식으로 구성되어 있던 것을 /public/posting/photo/dir-name/name.md /public/image/photo/dir-name/name.png의 구조로 바꾸고 추후 이미지 용량이 커진다면, /public/image/dir-name에 해당하는 레포지터리를 하나 더파서 build 할때 추가할 예정이다.

#### 2024-10-2 category

- 카테고리 분류와 posting list를 표시하는 방법(sorting, 카테고리 분류)을 바꿨다.

#### 2024-10-4 add photo posting

- 월본 이미지 사이즈(약 8mb)를 그대로 서빙하는 것은 쿨하지 않아서, 이미지 리사이즈 해주는 툴을 만들어서(이 툴은 어딘가에 무조건 있겠지만, 구현해보고 싶어서 만들어봤다. 낭만있잖아~ 사실 추후 미래에는 이미지, 그래픽을 다루는 능력이 점차 중요해질 것 같아서 맛보기로 구현해보았다.) 8짜리를 200kb로 줄여 public 파일에 넣었다. 깃 링크는 https://github.com/J93es/jpg-resizer.git 이것 참고
- html meta 태크를 통해 theme-color을 추가해봤는데 별 효과가 없는 것 같다ㅠㅠ

#### 2024-10-5 meta tag and Lighthouse

- 메타태그들을 손보았다. 성능 향상을 위하여 dns-prefetch를 해볼까 했는데 외부 도메인에서 받아오는게 없는 것 같아서 적용하지않았다. theme-color는 캐시문제인지 아직 잘 작동하지 않았다. 더하여 웹앱으로 실행될때의 로고등을 설정하였다.
- Lighthouse를 통하여 성능 테스트를 하였다. 모바일 환경에서의 performance가 낮게 측정되었으나, React를 활용하고 있고, 서버 사양이 개인 서버인 이상 현재 수준에서는 어쩔 수 없다고 판단한다. 하지만 성능을 높이기 위한 방법을 꾸준히 공부해봐야겠다. (그리고 lighthouse에서 모바일 환경 성능측정은 cpu를 20배 느리게 쓰로틀링 걸고 측정하는 것 같다...)
- 메타 태그에 apple-mobile-web-app-capable 이걸 사용했으나, chrome 브라우저에서 apple-mobile-web-app-capable is deprecated 라고 해서 mobile-web-app-capable로 바꾸었다. 기능상 문제는 없지만, frontend에서 디테일을 살리는 작업은 중요하다고 생각한다.
- bg-color을 body 태그에 적용하지 않아서 아래로 계속 스크롤하는 등의 액션을 취할 때에 흰색 영역이 보였다. 이를 body 태그에 bg-color 속성을 적용해서 해결했다.
