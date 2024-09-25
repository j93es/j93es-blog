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
