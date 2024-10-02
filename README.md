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
