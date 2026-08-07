---
title: 블로그 SEO
date: 2026-07-26
tag: [Frontend, Backend]
category: engineering
description: "개인 블로그를 운영하며 학습했던 SEO에 대하여 논해보겠습니다. 봇 특성을 고려해야한다는 점과 Lighthouse의 평가 항목을 살펴보겠습니다."
---

## 목차

0. 들어가며
1. 검색 엔진의 관리자 플랫폼에 웹사이트 등록
2. 봇 특성을 고려한 SEO
  - 응답 코드
  - meta tag
  - robots.txt, sitemap.xml
3. Lighthouse의 평가 항목
4. 나오며

## 0. 들어가며

SEO는 검색 엔진의 상단에 노출될 수 있도록 최적화하는 과정을 의미합니다. 구글, 야후, 네이버, 다음과 같은 검색엔진의 상단에 자신의 웹사이트가 표출된다면, 더욱 많은 사용자를 끌어모을 수 있겠죠. 이번 포스팅에서는 이러한 SEO에 대하여 다루어보겠습니다.

결국 SEO는 2가지를 고려하는 것이 중요하다고 생각합니다. 첫째로 SEO를 평가하는 주체의 특성, 즉 봇의 특성을 고려해야합니다. 둘째로, SEO 평가 항목을 정확히 파악하고, 여러 meta tag를 잘 열거하여 파악하는 것이 중요합니다. 이번 포스팅은 크게 위의 2가지 주제를 소개합니다.

## 1. 검색 엔진의 관리자 플랫폼에 웹사이트 등록

웹사이트가 검색 엔진의 상단에 노출되려면, 먼저 검색 엔진이 해당 웹사이트를 인지해야합니다. 즉, 자신이 소유한 도메인을 검색 엔진에 등록해야하는 것이죠. 아래는 각 검색엔진의 도메인 관리자 도구입니다. 

- 구글: [구글 서치 콘솔](https://search.google.com/search-console/welcome?hl=ko)
- 야후(Bing): [Bing 웹 마스터 도구](https://www.bing.com/webmasters/about)
- 네이버: [네이버 서치 어드바이저](https://searchadvisor.naver.com/)
- 다음: [다음 웹 마스터 도구](https://webmaster.daum.net/)

그런데 국내 검색 엔진의 경우, 검색 엔진마다 HTML 헤더가 추가해야하는 태그가 있습니다.

네이버 서치 어드바이저의 경우, 해당 도메인이 HTML이 관리자의 도메인인지 확인하는 태그를 HTML 헤더에 다음의 태그로 삽입해야합니다.

```HTML
    <!-- Start Naver Search Advisor -->
    <meta
      name="naver-site-verification"
      content="a322cfc3527974bd716ec3027704ffd878053e40"
    />
    <!-- End Naver Search Advisor -->
```

다음 웹 마스터 도구의 경우, title과 description을 적용하기 위해서는 다음의 태그를 삽입해야합니다.

```HTML
    <!-- title start -->
    <template>
      <div class="daum-wm-title">{{title}}</div>
    </template>
    <!-- title end -->

    <!-- description start -->
    <template>
      <div class="daum-wm-content">{{description}}</div>
    </template>
    <!-- description end -->
```

이렇게 헤더에 적절한 태그를 넣었다면, 검색 엔진에 해당 웹사이트가 등록되게 됩니다.

그런데 단순히 웹사이트를 등록했다고해서, 좋은 SEO가 되는 것은 아닙니다. 검색 엔진의 봇이 잘 이해할 수 있는 meta tag, 봇이 웹사이트를 파악할 수 있는 리소스 및 URL, 응답 코드가 필요합니다. 지금부터는 좋은 SEO에 대하여 살펴보겠습니다.

## 2. 봇 특성을 고려한 SEO

웹사이트를 돌아다니는 봇은 어떤 특성을 지녔을까요? CSR의 경우, 브라우저에서 JS를 실행하여 페이지를 랜더링합니다. 그런데 봇은 과연 그러할까요? 종종 JS를 실행시키지 않을 수 있습니다. 그리고 JS를 실행시키는 것 보다는 HTML의 meta tag, 응답 코드 등을 살펴보는 것이 봇의 입장에서 효율적이겠죠.

즉, JS를 실행 시켜서 랜더링된 페이지를 분석하는 봇은 많지 않습니다. 다시말해 많은 검색 엔진 봇은 JavaScript 렌더링 이전의 HTML만으로도 페이지를 평가하거나, JavaScript 렌더링을 지연 또는 생략할 수 있습니다. 그렇다면 CSR의 경우, **HTML의 헤더와 응답 헤더만으로 봇이 웹사이트를 파악할 수 있도록 구성**하는 것이 유리합니다. 이때 어떻게 HTML의 헤더와 응답 코드를 구성해야할까요? 차례대로 살펴봅시다.

### 응답 코드

먼저 봇은 응답 헤더의 응답 코드를 먼저 고려하는 것으로 추정합니다. 301 일시적인 이동인지, 302 영구 이동인지, 404 Not Found인지, 500번대 에러 코드인지를 말이죠. 여기에서 두가지 짚고 넘어가면 좋을 부분이 있습니다. 먼저 봇이 300번대 리디렉션을 따르는지를 살펴보면 좋습니다. 다음으로 CSR의 경우, 에러 페이지를 JS로 랜더링 시키는 경우가 있는데 그렇다면 응답 코드가 200번대가 될텐데, 이것이 어떤 문제가 될 지 입니다.

처음으로 300번대 리디렉션된 페이지의 경우, 리디렉션된 페이지를 대부분 따라가긴 할 것입니다. 하지만 특정 봇의 경우, 리디렉션된 페이지를 따라가지 않습니다. 즉, 300번대 응답코드를 응답하는 페이지를 검색 엔진에 등록한다면, SEO 측면에서 좋지 않을 수 있다고 판단합니다.

다음으로 에러 페이지를 JS로 랜더링 시키는 경우에 200번대 코드가 문제가 될 수 있는지의 여부입니다. 이것을 구글에서는 **Soft 404**로 정의합니다. 즉, 200번대 응답 코드로 응답했는데도 불구하고, 에러 페이지를 랜더링하는 경우이죠. 

이 경우가 문제가 될 수 있는 경우를 살펴봅시다. 응답코드가 200번대이며 실제로 존재하는 페이지가 있었다고 가정합시다. 그런데 추후 url 변경으로 인하여 400번대 에러 페이지가 랜더링되기 시작하였습니다. 그런데 여전히 응답코드는 200번대이기에 여전히 해당 페이지가 검색 엔진에 남아있는 경우가 생길 수 있다는 것입니다. 

구글 서치 콘솔은 다음과 같이 Soft 404를 표출합니다.

[Google Soft 404 예시](https://j93.es/api/posting/engineering/blog-seo/img/soft-404.png)

이러한 문제를 해결하는 방법에 대하여 살펴봅시다. `https://j93.es/path`로 요청을 했다고 가정합시다. 그렇다면 백엔드에서 응답코드를 1차적으로 반영하여 응답하는 것이 중요합니다. 즉, "302면 302번이다. 404번 404다."라고 응답하는 것이 중요합니다.

추후 봇은 해당 리소스가 언제 변경되었는지 확인할 수 있는 `last-modified` 영역 등을 살펴보겠네요.

### meta tag

HTML 헤더의 meta tag는 웹사이트의 기본적인 정보를 담은 태그입니다. 각 태그에 담긴 내용을 통하여 봇들은 웹사이트에 대하여 파악합니다. 지금부터는 태그의 종류와 신경쓰면 좋은 디테일에 대하여 논해보갰습니다.

#### title, description

각각의 path마다 다른 title과 description을 통하여 해당 페이지의 제목과 설명을 제공합니다. 이때 영문 기준 title 50-60자, description 150-160자를 넘긴다면, 제목이나 설명이 잘릴 수 있습니다. 즉, 제목, 설명마다 글자 수를 적절히 조정하는 것이 중요합니다.

이때 CSR일 경우, title, description이 HTML의 헤더에 어떻게 적용될까요? 많은 경우 React의 `Helmet`을 이용합니다. 다음의 과정을 살펴봅시다.

- HTML 도착

```html
<head>
  <title>기본(각각의 path마다 똑같은) 제목</title>
  <meta
    name="description"
    content="기본(각각의 path마다 똑같은) 설명"
  />
<head>
```

- 랜더링 시에 path에 해당하는 title, description 수정

```tsx
<Helmet>
  <title>{posting.title}</title>
  <meta
    name="description"
    content={posting.description}
  />
</Helmet>
```

그런데 이전에 살펴보았듯이 많은 검색 엔진 봇은 JavaScript 렌더링 이전의 HTML만으로도 페이지를 평가하거나, JavaScript 렌더링을 지연 또는 생략할 수 있습니다. 즉, 전달된 HTML의 헤더에, path에 해당하는 title, description이 담겨있지 않다면, 모든 path에 같은 title, description이 적용됩니다. 이는 SEO에 부정적인 영향을 미칩니다.

그렇다면 랜더링 시에 title, description을 바꾸는 것이 아닌, 응답에서 title, description이 각 path에 적절하게 적용되어있어야 합니다. 저의 블로그의 경우 다음과 같은 방식을 사용합니다.

index.html을 템플릿 엔진과 유사하게 구성합니다.

```html
<html xmlns="https://www.w3.org/2000/svg" lang="ko">
  <head>
    <!-- title start -->
    <title>{{title}}</title>
    <meta property="og:title" content="{{title}}" />
    <meta name="apple-mobile-web-app-title" content="{{title}}" />
    <meta name="twitter:title" content="{{title}}" />
    <template>
      <div class="daum-wm-title">{{title}}</div>
    </template>
    <!-- title end -->

    <!-- description start -->
    <meta name="description" content="{{description}}" />
    <meta property="og:description" content="{{description}}" />
    <meta name="twitter:description" content="{{description}}" />
    <template>
      <div class="daum-wm-content">{{description}}</div>
    </template>
    <!-- description end -->
  </head>
</html>
```

React에서 build 된 파일을 express 서버에서 서빙합니다. 이때 express 서버가 `{{title or description}}`로 둘러싸여진 부분을 각 path에 적합하게 변환하여 응답합니다.

즉, express 서버의 응답에서 각 path에 해당하는 title, description이 적용되도록 구성하였습니다. 이를 통하여 CSR 환경에서 SEO를 적절히 수행하였습니다.

#### 모바일 반응형

추가적으로 SEO에서 모바일 반응형을 고려하는 것도 중요합니다. 구글의 경우 Mobile-First Indexing, 즉 데스크탑 버전보다 모바일 버전을 중심으로 인덱싱을 진행합니다. Google은 색인을 생성하고 순위를 지정하는 데 스마트폰 에이전트로 크롤링된 모바일 버전의 콘텐츠를 사용합니다. 이를 모바일 중심 색인 생성이라고 정의합니다. [구글 모바일 사이트 및 모바일 중심 색인 생성 권장사항](https://developers.google.com/search/docs/crawling-indexing/mobile/mobile-sites-mobile-first-indexing?hl=ko) 즉, 모바일 버전으로 사이트를 보았을때, 글자가 깨지거나 사용자 경험이 좋지 않게 판단된다면, SEO Index가 떨어질 수 있습니다.

이때 모바일 반응형으로 동작하게 만들기 위해서는 다음의 meta 태그가 권장됩니다. `<meta name="viewport" content="width=device-width, initial-scale=1" />`를 사용한다면 모바일 반응형으로 동작하게 만들 수 있습니다.

#### meta tag를 읽는 주체마다 다른 형식

같은 기능을 하는 meta tag라도 Apple이 제시하는 형식과 meta가 제시하는 형식이 다를 수 있습니다. 더하여 많은 meta tag가 있어 이를 찾아보는 것도 쉽지 않습니다. 아래에 meta tag들을 기능별로 정리해보겠습니다.

| 역할 | 태그 | 설명 | SEO 중요도 (0~5) |
|------|------|------|:---------------:|
| 문자 인코딩 | `<meta charset="UTF-8">` | 문서의 문자 인코딩을 UTF-8로 지정하여 한글 깨짐을 방지합니다. | 3 |
| 문서 언어 | `<meta http-equiv="content-language">` | 문서의 기본 언어를 지정합니다. | 1 |
| 브라우저 호환성 | `<meta http-equiv="X-UA-Compatible">` | Internet Explorer에서 최신 렌더링 엔진을 사용하도록 합니다. (현재는 거의 사용되지 않음) | 0 |
| 모바일 반응형 | `<meta name="viewport">` | 모바일 기기에서 화면 크기에 맞게 페이지를 렌더링하도록 설정합니다. | 4 |
| 페이지 제목 | `<title>` | 브라우저 탭과 검색 결과의 제목으로 사용됩니다. 가장 중요한 SEO 요소 중 하나입니다. | 5 |
| 검색 설명 | `<meta name="description">` | 검색 결과에 표시되는 페이지 요약입니다. | 4 |
| Open Graph 제목 | `<meta property="og:title">` | SNS 공유 시 표시되는 제목입니다. | 2 |
| Open Graph 설명 | `<meta property="og:description">` | SNS 공유 시 표시되는 설명입니다. | 2 |
| Open Graph 이미지 | `<meta property="og:image">` | SNS 공유 시 대표 이미지입니다. | 2 |
| Open Graph 타입 | `<meta property="og:type">` | 콘텐츠 유형(website, article 등)을 지정합니다. | 1 |
| Open Graph URL | `<meta property="og:url">` | 대표 URL을 지정합니다. | 2 |
| Open Graph 사이트명 | `<meta property="og:site_name">` | SNS에서 표시될 사이트 이름입니다. | 1 |
| Open Graph 언어 | `<meta property="og:locale">` | 콘텐츠의 언어 및 지역을 지정합니다. | 1 |
| Twitter Card | `<meta name="twitter:card">` | Twitter(X) 카드 유형을 지정합니다. | 1 |
| Twitter 제목 | `<meta name="twitter:title">` | Twitter(X) 공유 제목입니다. | 1 |
| Twitter 설명 | `<meta name="twitter:description">` | Twitter(X) 공유 설명입니다. | 1 |
| Twitter 이미지 | `<meta name="twitter:image">` | Twitter(X) 공유 이미지입니다. | 1 |
| 이미지 설명 | `<meta property="og:image:alt">`<br>`<meta name="twitter:image:alt">` | 공유 이미지의 대체 설명(접근성 향상)입니다. | 1 |
| 파비콘 | `<link rel="icon">` | 브라우저 탭에 표시되는 사이트 아이콘입니다. | 0 |
| Apple Touch Icon | `<link rel="apple-touch-icon">` | iOS 홈 화면에 추가 시 사용하는 아이콘입니다. | 0 |
| Web App 이름 | `<meta name="apple-mobile-web-app-title">` | iOS에서 홈 화면에 추가한 앱의 이름입니다. | 0 |
| PWA 지원 | `<meta name="mobile-web-app-capable">` | Android에서 웹앱처럼 실행할 수 있도록 설정합니다. | 0 |
| Manifest | `<link rel="manifest">` | PWA의 설정 파일을 연결합니다. | 1 |
| 테마 색상 | `<meta name="theme-color">` | 모바일 브라우저 주소창 등의 색상을 지정합니다. | 0 |
| 상태바 색상 | `<meta name="apple-mobile-web-app-status-bar-style">` | iOS 상태바 스타일을 지정합니다. | 0 |
| Windows 타일 색상 | `<meta name="msapplication-TileColor">` | Windows 타일 색상을 지정합니다. | 0 |
| Windows 네비게이션 색상 | `<meta name="msapplication-navbutton-color">` | Windows 브라우저 UI 색상을 지정합니다. | 0 |
| 애플리케이션 이름 | `<meta name="application-name">` | 웹앱 또는 브라우저에서 사용할 애플리케이션 이름입니다. | 0 |
| 작성자 | `<meta name="author">` | 문서 작성자를 나타냅니다. | 0 |
| 저작권 | `<meta http-equiv="Copyright">` | 문서의 저작권 정보를 제공합니다. | 0 |

| 점수 | 의미 | SEO 영향 수준 |
|---|---|---|
| 5점 | 검색 순위에 매우 중요한 핵심 요소 (필수) | 검색 알고리즘이 직접적으로 중요하게 평가하는 요소 |
| 4점 | 검색엔진이 중요하게 고려하는 요소 | 높은 수준의 순위 영향 가능 |
| 3점 | SEO 및 크롤링에 긍정적인 영향을 주는 요소 | 검색 노출 개선에 도움 |
| 2점 | 직접적인 순위 영향은 적지만 SNS 공유 및 간접적인 SEO에 도움 | 사용자 참여·확산 측면에서 의미 있음 |
| 1점 | 보조적인 메타데이터 또는 특정 플랫폼에서 활용 | 제한적인 SEO 효과 |
| 0점 | SEO에는 거의 영향을 주지 않으며 브라우저, 운영체제 또는 사용자 경험(UX)을 위한 설정 | 검색 순위와 거의 무관 |

### robots.txt, sitemap.xml

봇이 도메인에 요청을 했을때, 어떤 파일을 요청해야할까요? 그런데 봇이 도메인에 접근되는 것이 금지되진 않았을까요? 이러한 내용을 알려주는 것이 robots.txt입니다. robots.txt의 세부 내용을 살펴보겠습니다.

```txt
# https://www.robotstxt.org/robotstxt.html
User-agent: *
Disallow:

Sitemap: https://j93.es/sitemap.xml
```

이 파일을 통하여, 어떤 에이전트(요청 헤더에서 브라우저 정보 등)가 접근할 수 있는지, 허용되지 않는 에이전트는 누구인지 확인할 수 있습니다. robots.txt는 봇이 해당 도메인에 접근할때, 우선적으로 확인하는 항목입니다. 즉, 봇에게 해당 사이트 접근에 대한 정보를 제공한다고 생각하면 좋습니다.

그런데 하단에 sitemap.xml 또한 확인됩니다. 이 파일은 도메인에 어떤 리소스가 있는지 알려주는 파일입니다. 한번 살펴봅시다.

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">

  <!-- main page start -->
  <url>
    <loc>https://j93.es/</loc>
    <lastmod>2025-02-08</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.99</priority>
  </url>
  <!-- main page end -->

  ...
</urlset>
```

이러한 형식으로 도메인에 접근가능한 리소스 등을 열거하는 파일이 sitemap.xml입니다. 즉, 해당 파일을 통하여 봇은 도메인에 어떤 사이트맵이 있는지 확인하여 접근할 목록을 정할 수 있습니다.

## 3. Lighthouse의 평가 항목

크롬 검사 도구인 Lighthouse에는 SEO를 평가하고 점수메기는 항목이 있습니다. [크롬 개발자 문서의 SEO 평가 문서](https://developer.chrome.com/docs/lighthouse/seo)에는 각 평가항목에 대한 설명이 있습니다. 카테고리별 평가항목을 정리해보았습니다.

### 검색 엔진이 내 콘텐츠를 이해하도록 돕기

- meta description이 없습니다.
- a 태그 등 링크에 설명(href 등)이 없습니다.
- 다국어 페이지를 지원할 때에 link 태그에 hreflang가 없습니다.
- HTTP 응답이나 HTML 헤더의 link에, 표준 링크를 지정하는 rel=canonical가 없습니다.

### 검색 엔진의 크롤링 및 색인 생성 지원

- 페이지의 응답 코드가 400, 500번대 응답 코드로 반환됨
- robots.txt가 유효하지 않음
- 문서가 콘텐츠(비디오 등)를 외부 플러그인을 통하여 사용함(HTML로 변경해야 크롤링 가능, 또한 대부분의 휴대기기는 플러그인을 지원하지 않으므로 모바일 사용자에게 불편을 초래함)

### 모바일 친화적 환경

- 탭 타겟 크기가 48 픽셀보다 작거나, 타겟 중심이 48픽셀 이내의 타겟 영역이 다른 타겟과 25% 이상 겹침

## 4. 나오며

지금까지 검색 엔진의 상단에 웹사이트가 노출되도록 하는 과정인 SEO에 대하여 살펴보았습니다. 처음으로 검색엔진에 자신의 웹사이트를 등록할 때 고려할 요소를 살펴보았습니다. 더하여 SEO를 고려할때는 봇 특성을 잘 살펴보아야한다는 점과 Lighthouse의 평가 항목을 열거해보았습니다.

설계 단계부터 SEO를 고려하여 설계하지 않는다면, 백엔드에서 관리해야할 영역과 프론트엔드에서 관리해야할 영역을 제대로 나누지 못하여 구현과정에서 설계를 갈아엎어야하는 일이 생길 수도 있습니다. 즉, 설계에서부터 SEO를 고려하는 것이 중요하다고 생각합니다.
