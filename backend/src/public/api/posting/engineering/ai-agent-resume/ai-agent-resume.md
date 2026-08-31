---
title: ai-agent-resume
tag: [Engineer]
category: engineering
description: "호기심을 원동력으로 문제에 도전하고, 몰입하며, 그 자체를 즐깁니다. 이러한 과정에서 문제를 깊이 파고, 본질을 간결하게 바라보는 태도를 지향합니다."
---

## 목차

0. 자기소개
1. 학력
2. 경력
3. 보유 기술
4. 보유 역량
5. 프로젝트
6. 주요 업적
7. 발표 이력
8. 봉사활동

## 0. 자기소개

호기심을 원동력으로 새로운 문제에 도전합니다. 그리고 문제를 해결해 나가는 과정, 그 자체를 즐기고 몰입합니다. 이러한 과정에서 문제를 깊이 파고, 다른 시각에서 본질을 간결하게 바라보려는 태도를 지향합니다.

기술은 목적에 부합할 때 비로소 빛을 발한다고 생각합니다. 따라서 저는 목적에 부합하지 않는 불필요한 기술을 지양하고, 간결하고 본질에 충실한 엔지니어링을 추구합니다.

기술의 진가는 그로 인해 창출되는 가치 속에 있으며, 그 가치는 기술이 소비될 때 현실화됩니다. 따라서, 저는 기술을 소비하는 주체를 고려한 엔지니어링을 지향합니다. 첫째로 소비자를 고려합니다. 소비자는 자신이 원하는 서비스를 편하게 이용할 수 있어야합니다. 이에 소비자가 원하는 기능을 파악하고, 소비자 입장에서 서비스를 설계합니다. 둘째로 회사를 고려합니다. 회사는 빠르게 변화하는 비즈니스 로직 속에서, 제가 생산한 기술이 유연하고 안정적으로 동작할 수 있기를 기대할 것입니다. 이에 보안을 고려한 설계, 클린 아키텍처, 테스트, 자동화된 검증 체계를 통하여 변화에 흔들리지 않는 견고함을 확보하고, 회사가 안심하고 성장에 집중할 수 있는 기술적 토대를 마련합니다. 마지막으로 팀원을 고려합니다. 함께하는 팀원이 제 코드를 원활히 이해하고 활용할 수 있도록, 재사용성과 가독성을 핵심 원칙으로 삼습니다.

## 1. 학력

### 서울시립대학교 (University of Seoul)

- 국어국문학/철학 학사 (2020년 3월 ~ 2027년 1월 예정)

## 2. 경력

### 서울시립대학교 중앙동아리 로봇 연구회 ZETIN

- 제32대 회장 (2023년 12월 ~ 2024년 12월)
- 32기 정회원 (2023년 3월 ~ 2025년 2월)
- 제25회 전국 라인트레이서 경연대회를 운영/감독
  - 학생처/총무과/스폰서 등 여러 주체와 협업하고, 약 100명의 동아리원과 함께 대회를 성공적으로 마무리하였습니다.

### 화이트햇 스쿨 3기

- 수료생 (2025년 3월 ~ 2025년 9월)
- 프로젝트 PM (2025년 5월 ~ 2025년 8월)

## 3. 보유 기술

### Frontend

- React
- Web Performance Optimization
- Search Engine Optimization (SEO)
- Error Handling Architecture
- Cross-Browser Compatibility
- Web APIs (e.g., Web Serial API)
- OAuth

### Backend

- Express, Nginx
- Layered Architecture
- Performance & Load Testing
- Real-time Communication
- Logging

### Infrastructure

- On-premise Server Operation
- CDN (Cloudflare, AWS)
- WAF (Web traffic protection, Rule configuration)

### Embedded Software

- Firmware Development on ARM (STM32F4xx) MCUs
- PID Control Implementation
- Debugging in Embedded Environments

### AI

- Browser Automation with Agentic AI

### Security

- Development of Automated Vulnerability Detection Tools

### Language

- C
- Typescript(I don't know Javascript.)
- Python
- Shell Script
- Makefile
- etc.

## 4. 보유 역량

### AI

#### Browser Automation with Agentic AI

AI 에이전트를 활용하여 브라우저 자동화를 구현합니다.

Browser Use라는 오픈소스 도구를 통하여 Agentic AI를 활용한 브라우저 자동화를 구현하였습니다. 

이때, 하나의 프롬프트에 많은 일을 시킨다면, AI가 업무를 잘 수행하지 못하는 이슈가 발생하였습니다. 이러한 이슈를 해결하기 위하여 업무의 단위를 잘게 나누어 프롬프트를 구성하였습니다. 즉, Apple의 어뎁터 형식의 AI와 유사하게, 하나의 프롬프트가 특정 일만 담당하는 방식으로 엔지니어링하였습니다. 

또한 더하여 AI 모델 성능차이 혹은 특성으로 인하여 겪는 성능 저하를 경험하였습니다. 이에따라 적절한 AI 모델을 선택하고, 프롬프트를 경량화하는 방식으로 해결한 경험이 있습니다. 더하여 금지 목록과 꼭 해야하는 목록, 마크다운 형식, 순서 명시 등 AI가 쉽게 이해할 수 있는 프롬프트를 작성하여 완성도를 높혔습니다.

더하여 Agentic AI에서는 매크로와 가까운 AI의 손을 만들어 주는 것이 중요하다고 생각합니다. 조금더 부연해보겠습니다. 예를들어 "브라우저에서 방향키를 오른쪽으로 2번 누르고, Enter 키를 눌러줘"라고 명령한다면, AI에게 방향키를 누르고, 엔터키를 누를 수 있도록하는 손이 필요할 것입니다. 이러한 손을 구현할 수 있는 라이브러리인 playwright 등이 있고, 이를 활용할 수 있는 Python 지식을 보유하고 있습니다.

이러한 과정을 통하여 OAuth 로그인 과정을 재현하는 AI 에이전트를 생산했습니다.

### Security

#### Development of Automated Vulnerability Detection Tools

브라우저에서 발생하는 네트워크 패킷을 캡처하고 분석하여, 해당 패킷에 보안상 취약점이 존재하는지 또는 관련 표준을 준수하고 있는지를 검증하는 것을 목적으로 합니다.

이를 위해 MITM(Man-in-the-Middle) 프록시를 활용하여 브라우저와 서버 간에 송수신되는 패킷을 확인하고, 패킷의 구조 및 내용을 분석합니다. 분석 과정에서 잠재적인 보안 취약점이나 비정상적인 요소를 식별하고, 관련 프로토콜 및 표준에 부합하는지 여부를 함께 검토하였습니다.

### Backend

#### Layered Architecture

서비스 규모 확장과 유지보수를 고려하여 관심사의 분리(Separation of Concerns)를 기반으로 백엔드 계층 구조를 설계하고, 비즈니스 로직과 데이터 접근 로직의 결합도를 낮춘 확장 가능한 서버 구조를 구축합니다.

초기 개발 과정에서는 Router 계층에서 API 요청 처리, 데이터 접근, 비즈니스 로직이 함께 관리되며 코드 복잡도가 증가하는 문제가 발생하였습니다. 이를 개선하기 위해 Controller/Router, Service, Repository 계층으로 역할을 분리하는 Layered Architecture를 적용하였습니다.

Repository 계층은 MongoDB와의 데이터 접근을 담당하여 데이터 저장소에 대한 책임을 집중시키고, Service 계층은 도메인 규칙과 비즈니스 로직을 담당하도록 설계하였습니다. 이를 통해 데이터베이스 구조 변경이나 조회 방식 변경이 발생하더라도 비즈니스 로직에 미치는 영향을 최소화할 수 있도록 구성하였습니다.

또한 Interface 기반 추상화를 적용하여 Service 계층이 Repository의 구체적인 구현체에 의존하지 않도록 설계하였습니다. 즉, 의존성 주입을 통해 각 계층 간 결합도를 낮추었습니다.

계층별 책임이 명확하게 분리된 백엔드 구조를 구축하여 기능 추가 및 장애 분석 시 코드 추적성을 향상시켰습니다. 또한 데이터 접근 계층의 추상화를 통해 유지보수성과 확장성을 확보한 서버 아키텍처를 구현하였습니다.

#### Performance & Load Testing

실제 운영 환경의 트래픽을 견딜 수 있는 서버를 구축하기 위해 성능 병목을 분석하고, 부하 테스트 기반의 성능 검증 및 개선 프로세스를 마련합니다.

라인트레이서 계수기 프로젝트에서 대회 당일 MongoDB Atlas Free Tier의 리소스 한계로 인해 DB 응답 오류가 발생하였고, 이로 인해 SSE(Server-Sent Events) 기반 실시간 데이터 전송이 중단되는 장애를 경험하였습니다. 이후 장애 원인을 분석하여 DB가 시스템의 병목 지점임을 확인하였습니다.

이후 창의적 종합설계 프로젝트에서는 동일한 문제가 재발하지 않도록 Polling 기반 통신 구조를 분석하고, Memory Cache(TTL)를 적용하여 빈번한 DB 조회를 최소화하는 구조를 설계하였습니다. 또한 실제 운영 환경의 예상 요청량을 기준으로 k6와 같은 부하 테스트 도구를 활용하는 프로세스를 도입하여, 평균 응답시간, Error Rate, Throughput 등의 성능 지표를 사전에 검증할 수 있도록 개발 프로세스를 개선하였습니다.

운영 환경에서 발생했던 DB 병목 원인을 분석하여 캐시 기반의 서버 구조를 설계하였으며, 부하 테스트를 개발 프로세스에 포함하여 실제 서비스 환경을 고려한 성능 검증 체계를 마련하였습니다. 이를 통해 DB 부하를 줄이는 아키텍처 설계 역량과, 운영 환경을 고려한 성능 최적화 및 장애 예방 경험을 확보하였습니다.


## 5. 프로젝트

### Security

#### OAuth 취약점 분석을 위한 Agentic AI 기반 브라우저 자동화
  - 화이트햇 스쿨 3기에서 OAuth 구현 시 발생할 수 있는 취약점을 분석하고 버그헌팅을 진행하였습니다.
  - 팀에서 PM 및 개발의 역할을 맡았습니다.
  - 표준 사양(RFC) 문서를 분석하여, OAuth 표준을 학습하였습니다.
  - Agentic AI를 이용한 브라우저 자동화 및 패킷 분석 도구(mitm proxy)로 버그헌팅을 진행하였습니다.
  - 약 200만원 상당의 버운티를 수령하였습니다.
  - [소스 코드(Frontend-Browser)](https://github.com/j93es/OAuth-OIDC-VulnScanner-frontend)
  - [소스 코드(Backend-Proxy)](https://github.com/j93es/OAuth-OIDC-VulnScanner-backend)

#### 화이트햇 스쿨 3기
  - OAuth 표준 사양(RFC)과 이를 지키지 않았을때 발생할 수 있는 위협을 학습하였습니다.
  - 과거 위협 사례 분석과 보안 정책에 입문하였습니다.
  - API에서 악성 URL 위협 패턴을 학습하였습니다.

### WEB

#### [개인 블로그](https://j93.es)
  - 엔지니어링 경험에서 얻은 인사이트 등을 공유하기 위한 개인 블로그를 운영중입니다.
  - SEO, Cross Browser 환경에서의 호환성, FCP/CLS 등 성능 최적화를 고려하여 설계하였습니다.
  - error page, noscript page 등 세세한 디테일을 챙겨, 웹 품질을 높이기 위한 설계를 경험하였습니다.
  - [소스 코드](https://github.com/j93es/j93es-blog)
  - [개인 서버 구축 경험 소개](https://j93.es/posting/engineering/personal-server/personal-server.md)
  - [블로그 성능 최적화](https://j93.es/posting/engineering/blog-performance/blog-performance.md)
  - [블로그 디테일 챙기기](https://j93.es/posting/engineering/blog-detail/blog-detail.md)
  - [블로그 SEO](https://j93.es/posting/engineering/blog-seo/blog-seo.md)
  - [블로그 에러 핸들링](https://j93.es/posting/engineering/blog-error-handling/blog-error-handling.md)
  - [블로그 크로스 브라우징](https://j93.es/posting/engineering/blog-crossbrowsing/blog-crossbrowsing.md)

#### 창의적 종합설계 경진대회
  - 창의적 종합설계 경진대회에 "터널 내 레일 로봇의 실시간 모니터링 및 협동을 통한 자동차 2차 사고 예방 시스템"이라는 주제로 대회에 참여하였습니다.
  - 웹 풀스택 개발 및 서버 인프라 관리의 역할을 수행하였습니다.
  - 산업통상자원부 장관상 등을 수상하였습니다.
  - [소스 코드](https://github.com/j93es/2024-creative-engineering-design-competition)
  - [창의적 종합설계 경진대회 출전 경험 소개](https://j93.es/posting/engineering/creative-engineering-design-competition/creative-engineering-design-competition.md)

#### 라인트레이서 계수기 소프트웨어
  - 제25회 전국라인트레이서 경연대회에서 대회 운영을 위한 라인트레이서 계수기 소프트웨어를 설계/구현하였습니다.
  - 참가자 페이지, 전광판 페이지 및 백엔드 개발과 서버 인프라 관리의 역할을 수행하였습니다.
  - [라인트레이서 계수기 소프트웨어 제작 경험 소개](https://j93.es/posting/engineering/linetracer-counter/linetracer-counter.md)
  - [라인트레이서 계수기 소프트웨어 피드백](https://j93.es/posting/engineering/linetracer-counter-feedback/linetracer-counter-feedback.md)

### Embedded Software

#### DC 모터 라인트레이서
  - DC 모터를 활용하여 선을 따라가는 로봇을 구현하였습니다.
  - 모터 제어(PID) 등의 지식을 학습하였습니다.
  - 임베디드 개발환경에서의 디버깅에 대한 인사이트를 얻었습니다.
  - 대전광역시장상, 단국대학교 총장상, 서울시립대학교 학생처장상을 수상하였습니다.
  - [DC 모터 라인트레이서 제작 경험 소개](https://j93.es/posting/engineering/dc-linetracer/dc-linetracer.md)

#### STEP 모터 라인트레이서
  - STEP 모터를 활용하여 선을 따라가는 로봇을 구현하였습니다.
  - 타이머 인터럽트/State Machine 등의 지식을 학습하였습니다.
  - 임베디드 개발환경에서의 테스트, 유지보수를 위한 아키텍쳐 설계에 대한 인사이트를 얻었습니다.
  - 서울시립대 학생처장 상을 수상하였습니다.
  - [STEP 모터 라인트레이서 제작 경험 소개](https://j93.es/posting/engineering/step-linetracer/step-linetracer.md)

### Others

#### 제25회 전국라인트레이서 경연대회 운영/감독
  - 서울시립대학교에서 주최하고 로봇 연구회 ZETIN에서 주관하는 제25회 전국 라인트레이서 경연대회를 운영/감독하였습니다.
  - 학생처/총무과 등 학교 부서와 협업하고, 약 100명의 동아리원을 통솔하여, 대회를 성공적으로 마무리하였습니다.
  - [ZETIN 회장 경험 소개](https://j93.es/posting/engineering/chairman-of-zetin/chairman-of-zetin.md)

## 6. 주요 업적

| 내역                                                                                                      | 수여 기관                     |
| --------------------------------------------------------------------------------------------------------- | ----------------------------- |
| 2025 1학기 서울시립대학교 학생포상 학술상                                                                 | 서울시립대학교 총장           |
| 2025 1학기 학교발전 및 위상제고 기여 장학                                                                 | 서울시립대학교 총장           |
| 2024 공학 페스티벌 창의적 종합설계 경진대회 최우수상                                                      | **산업통상자원부 장관**       |
| 2024 창의적 종합설계 경진대회 컨소시엄 예선 대상 (1위)                                                    | 고려대학교 공학교육혁신센터장 |
| 지역사회와 함께하는 서울시립대학교 2024 창의공학설계경진대회 우수상 (2위)                                 | 서울시립대학교 총장           |
| 전국 지능형 로봇 대회 Expert DC 부문 대상 (예선 1위, 본선 1위)                                            | 단국대학교 총장               |
| 제25회 전국라인트레이서 경연대회 Expert DC 부문 대상 (예선 1위, 본선 1위)                                 | 서울시립대학교 학생처장       |
| 제13회 로봇융합 페스티벌 지능형 창작로봇 경진대회 라인트레이서 2D 부문 대상 (예선 1위, 본선 1위)          | **대전광역시장**            |
| 제24회 전국라인트레이서 경연대회 Expert STEP 부문 대상 (예선 1위, 본선 1위)                               | 서울시립대학교 학생처장       |

## 7. 발표 이력

### OWASP Seoul Chapter 2025 7월 세미나
  - 발표 주제: 해커들이 좋아하는 인증 환경은 따로 있다? - Safe Us 팀 소속
  - [발표 영상](https://youtu.be/lw7vOgRlEOE?feature=shared&t=705)(11분 45초 ~ 36분 00초)
  - [발표 자료](https://owasp.org/www-chapter-seoul/#div-presentation)

## 8. 봉사활동

- 2024 ROBOTEX & MRC Global Olympiad Korea International 심사위원
