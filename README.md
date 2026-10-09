# 개발

기존 블로그는 현재 루트의 Jekyll 소스를 사용합니다. `apps/blog`는 별도로 실행하는 Astro 이전 검증용 앱이며 운영 배포에는 연결하지 않았습니다.

`apps/blog`는 글·검색·분류·아카이브·피드를 담당하는 독립 블로그 앱입니다. 개인 홈과 프로젝트 허브는 실제 구현할 때 별도의 `apps/site` 앱으로 추가합니다. 앱 이름과 디렉터리 변경은 기존 공개 URL을 바꾸지 않습니다. 현재 루트의 `dev`와 `preview` 명령은 `@youngyojun/blog`를 실행합니다.

Node 버전은 `.nvmrc`, pnpm 버전은 루트 `package.json`에 고정합니다. Corepack을 사용할 수 있는 환경에서 실행하세요.

```sh
nvm use
corepack pnpm install --frozen-lockfile
corepack pnpm dev
```

개발 페이지는 `http://localhost:4321/`에서 확인합니다. `corepack pnpm check`는 Astro/TypeScript 검사, `corepack pnpm build`는 앱 빌드, `corepack pnpm preview`는 빌드 결과 미리보기입니다. 산출물은 `apps/blog/dist/`에 생성합니다.

현재 Astro에서는 기존 글 30개를 `/blog/posts/<slug>/`에서 제공합니다. 과거 주소에서도 같은 글을 열 수 있으며 canonical은 새 주소를 가리킵니다. 홈의 글 목록에서 한글·영어 본문, 수식, 그림, 코드와 다운로드 링크를 비교하세요. 원문은 루트 `_posts/`에서 직접 읽고, `apps/blog/public/`의 심볼릭 링크는 기존 `assets/`와 `downloadable_files/`를 가리키므로 자산을 복사해 관리하지 않습니다. 수식은 기존 블로그와 같은 MathJax CDN의 TeX 웹폰트를 사용합니다. 불완전한 로컬 STIX 폰트 때문에 특수 글자가 깨지는 문제를 피하도록 로컬 폰트 자동 선택을 끕니다. `corepack pnpm test`는 빌드 후 Markdown 호환 처리, 기존 글 URL과 첨부파일을 검사합니다.

글은 Astro Content Collections로 읽습니다. `apps/blog/src/content.config.ts`의 `glob` loader가 루트 `_posts/`의 Markdown을 읽고, `apps/blog/src/post-schema.ts`가 제목·slug·게시일과 분류 배열을 검증합니다. `apps/blog/src/posts.ts`는 검증한 글을 최신순으로 정렬해 페이지·검색·피드·사이트맵에 제공합니다. 콘텐츠 파일의 이동은 운영 Jekyll 소스 정리와 함께 별도로 진행합니다.

새 글은 `_posts/`에 Markdown 파일을 추가하고 다음과 같이 작성합니다. 제목·slug·게시일은 필수이며, 카테고리·태그는 생략하면 빈 배열로 처리합니다. 게시일은 시간대가 명확한 ISO 문자열을 따옴표로 감싸는 것을 권장합니다. 알 수 없는 frontmatter 필드는 빌드 오류로 검출합니다.

```markdown
---
title: "글 제목"
slug: example-post
date: "2026-10-10T12:00:00+09:00"
categories: [Algorithm]
tags: [ICPC]
---

본문을 작성합니다.
```

고유한 `slug`는 직접 지정합니다. 소문자 영문·숫자와 단어 사이의 하이픈만 허용하며, 누락·잘못된 형식·중복은 `apps/blog/src/post-slugs.ts`에서 빌드 오류로 검출합니다. 제목·게시일·분류·파일명을 바꿔도 공개한 slug는 유지합니다. 날짜는 자동으로 붙이지 않으며, 대회 연도·연습일·연재 회차처럼 구분에 필요한 경우에만 포함합니다. 기존 WF 연습 글은 제목에 적힌 연습일을 사용합니다. 현재 읽어들인 모든 Markdown 글을 공개하므로 초안은 이 폴더에 넣지 않습니다.

모든 글의 대표 주소는 `/blog/posts/<slug>/`이며, 글 목록·검색·사이트맵·피드와 본문 안의 글 링크도 이 주소를 사용합니다. `apps/blog/src/legacy-post-urls.json`은 기존 30개 글의 slug를 키로 과거 주소를 보관하므로 파일명을 바꿔도 과거 주소가 유지됩니다. 새 글은 slug를 명시해 추가하고 이 매핑을 수정하지 않습니다. 중복되거나 원본이 없는 과거 매핑은 빌드 오류로 검출합니다. 과거 주소는 현재 같은 글을 보여주는 호환 페이지로 생성하고, canonical은 새 주소로 지정합니다. 자동 리다이렉션 방식은 아직 미확정이며 운영 배포 전환 전에 결정할 예정입니다. 기존 Jekyll 빌드와 비교할 때는 `TZ=UTC`를 사용해야 운영 주소와 일치합니다.

Atom 피드는 기존 `/atom.xml` 주소에 최신 글 10개의 전체 본문과 발췌를 생성합니다. 구독기에 같은 글이 중복 등록되지 않도록 기존 피드·글 ID를 유지합니다. 글 링크와 본문의 `xml:base`는 새 대표 주소를 사용하고, UTC 게시 시각과 태그는 보존합니다. 본문과 발췌는 `apps/blog/src/legacy-markdown.ts`의 공통 Markdown 설정을 사용하고, 피드 본문의 상대 주소는 각 글의 `xml:base`를 기준으로 해석합니다. 원래 비활성화된 RSS 메뉴는 추가하지 않습니다.

사이트맵은 기존 `/sitemap.xml` 주소에 글 30개·탐색 페이지 9개·PDF 11개의 공개 주소를 생성합니다. 홈 페이지 수는 글 목록에서 계산하고, PDF 목록은 기존 다운로드 폴더에서 읽습니다. 기존처럼 글의 `lastmod`는 UTC 게시 시각, PDF는 파일 수정 시각을 사용하며 탐색 페이지에는 날짜를 넣지 않습니다. PDF 날짜는 체크아웃 시 파일 수정 시각의 영향을 받습니다. 사용자의 결정에 따라 NexT 영문 설명서(`/README.en/`)와 라이브러리 설명서(`/assets/lib/fastclick/`, `/assets/lib/jquery_lazyload/`)의 공개 HTML 페이지는 이전 대상에서 제외합니다. 이 문서들의 원본 파일과 라이브러리 코드는 보관합니다.

`/robots.txt`는 기존처럼 `Sitemap: https://youngyojun.github.io/sitemap.xml` 한 줄을 제공합니다. 주소는 `apps/blog/astro.config.mjs`의 사이트 설정에서 가져오며, 파일은 `apps/blog/src/pages/robots.txt.ts`에서 생성합니다.

404 화면은 `apps/blog/src/pages/404.astro`에서 `dist/404.html`로 생성합니다. 오류 안내와 홈으로 돌아가기 링크를 제공하며, 공통 탐색 메뉴와 검색도 사용할 수 있습니다. 오류 페이지는 검색 색인과 사이트맵에서 제외합니다. `corepack pnpm preview`로 빌드 결과를 실행한 뒤 `/missing-page/` 또는 `/missing-file.html`에서 HTTP 404 응답과 홈 이동을 확인하세요. 일반 파일 서버는 자체 오류 화면을 보여줄 수 있습니다. 현재 `trailingSlash: 'always'` 설정에서 Astro preview는 `/missing-page`처럼 끝 슬래시가 없는 주소에 내장 오류 화면을 표시합니다. 실제 GitHub Pages에서의 오류 페이지 연결은 배포 후 확인해야 합니다.

작성일은 기존 운영 화면과 같이 UTC 기준으로 표시하며, 목록은 파일명 대신 frontmatter의 게시 시각 내림차순으로 정렬합니다. 기존 시간대 없는 날짜는 UTC로 해석합니다. 날짜가 없던 첫 글에는 기존 게시 시각을 명시했습니다. 파일명은 URL과 게시 시각을 결정하지 않습니다. 카테고리·태그는 원문의 이름과 순서를 유지하며, 현재는 글 상단에 표시합니다.

홈은 기존 `/`, `/page2/`, `/page3/` 주소에서 최신순으로 10개씩 나눕니다. 페이지별 글과 주소는 `apps/blog/src/legacy-home-pages.ts`, 공통 화면은 `apps/blog/src/components/HomePage.astro`에서 관리합니다. 각 글의 제목·날짜·본문 발췌와 새 대표 주소로 연결되는 ‘더 읽어보기’ 링크를 표시합니다. 발췌는 Atom과 같은 `legacyExcerptSource` 및 Markdown 설정을 사용합니다. 기존 Jekyll의 빈 줄 경계를 그대로 읽으므로, CRLF로 작성된 「영 타블로」는 기존 홈처럼 본문 전체와 그림 7개가 표시됩니다. 홈과 글 페이지의 수식 설정은 `apps/blog/src/components/MathJax.astro`에서 공유합니다. 페이지 이동과 글 링크는 JavaScript 없이도 사용할 수 있습니다.

소개 페이지는 기존 `/about/` 주소에서 루트의 `about/index.md`를 직접 읽습니다. 소개 내용을 수정할 때는 이 원문을 편집하며, Astro용 사본을 만들지 않습니다. 기존 제목·링크·제목의 책갈피 주소를 유지하고 공통 소개 메뉴로 이동할 수 있습니다.

태그 목록은 `/tags/`, 카테고리 목록은 `/categories/`에서 볼 수 있습니다. 상세 목록은 기존 `/tag/#/<인코딩된 이름>`과 `/category/#/<인코딩된 이름>` 주소를 사용하며, 글 상단의 분류에서도 이동합니다. 최신순으로 10개씩 표시하고 `/tag/#/ICPC/page2`, `/category/#/ICPC/page2` 주소도 유지합니다. `/tag/`와 `/category/`는 각각의 목록으로 이동하며, 없는 분류·페이지는 안내를 표시합니다. JavaScript를 끄면 미리 생성된 전체 분류별 목록을 볼 수 있습니다.

태그·카테고리 데이터는 `apps/blog/src/legacy-collections.ts`, 공통 상세 화면·페이지 이동은 `apps/blog/src/components/CollectionPage.astro`에서 관리합니다. 분류·아카이브 화면의 간결한 글 목록은 `apps/blog/src/components/PostList.astro`를 함께 사용합니다. 원문의 카테고리 배열은 기존처럼 각각 독립된 분류로 취급합니다.

아카이브는 `/archives/`에서 최신순으로 10개씩 나누고 각 페이지에서 연도별로 묶습니다. 기존 `/archives/#/page2`, `/archives/#/page3` 주소와 월·일 표시를 유지하며, JavaScript를 끄면 전체 목록을 볼 수 있습니다. ‘본문으로 건너뛰기’는 선택한 분류·아카이브 페이지의 주소를 유지하면서 본문에 초점을 옮깁니다.

검색 버튼은 제목·본문을 입력 즉시 검색하는 팝업을 엽니다. 검색 데이터는 빌드 때 원문에서 `/search.xml`로 생성하고 팝업을 처음 열 때 불러옵니다. 검색 판정·문맥 선택은 `apps/blog/src/search.ts`, 팝업은 `apps/blog/src/components/Search.astro`에서 관리합니다. 기존처럼 영어 대소문자를 구분하지 않고, 공백·하이픈으로 나눈 단어 중 하나라도 일치하면 표시하며, 문구 전체의 일치와 일치 횟수를 우선합니다. 결과에는 글마다 본문 문맥 하나와 원래 글 링크를 표시합니다. Escape·닫기 버튼·배경 클릭으로 닫을 수 있고, 닫으면 검색어를 지웁니다. JavaScript를 끄면 검색 버튼을 숨기며 기존 글 목록과 탐색 링크는 그대로 사용할 수 있습니다.

앱은 `apps/*`, 실제 공유 패키지는 `packages/*`에 추가합니다. 새 개발 경로는 Jekyll의 `exclude`로 제외합니다.

Astro의 공통 HTML 틀·사이트 헤더는 `apps/blog/src/layouts/BaseLayout.astro`, 본문·모바일 스타일은 `apps/blog/src/styles/site.css`에서 관리합니다. 페이지는 `apps/blog/src/pages/`에서 레이아웃을 사용하며, 글 원문은 기존 위치에 둡니다. 현재 NexT Muse의 밝은 배경과 검정 헤더를 기준으로 구성했습니다.

공통 색상·본문/코드 글꼴·읽기 폭은 `packages/design-tokens/src/tokens.css`에서 관리합니다. CSS만 제공하는 `@youngyojun/design-tokens` 패키지이며 React나 별도 빌드가 필요하지 않습니다. 소비하는 앱은 `package.json`에 `"@youngyojun/design-tokens": "workspace:*"` 의존성을 선언하고, 스타일 파일에서 `@import "@youngyojun/design-tokens/tokens.css";`로 가져옵니다. 패키지 내부 파일 경로를 직접 참조하지 않습니다. 전체 디자인의 기본값은 이 파일에서 변경하고, 각 앱의 레이아웃과 전용 컴포넌트 스타일은 해당 앱에서 관리합니다. 현재 토큰은 기존 밝은 테마의 값을 그대로 사용합니다.

공용 React 컴포넌트는 `packages/ui`의 `@youngyojun/ui` 패키지에서 관리합니다. 앱은 `"@youngyojun/ui": "workspace:*"` 의존성을 선언하고 `import { Button } from '@youngyojun/ui'`로 사용합니다. 토큰은 공용 UI에서 가져오며, 컴포넌트 스타일은 CSS Modules로 분리합니다. 현재 `Button`은 기본 `type="button"`으로 폼 제출을 방지하고, 일반 버튼 속성·`ref`·`className`을 받습니다. 제출 버튼에는 `type="submit"`을 명시하세요. 키보드 초점과 비활성 상태의 스타일도 포함합니다.

UI 패키지는 React 19를 peer dependency로 선언하고, 앱과 개발·테스트 환경의 React/React DOM 버전을 맞춥니다. 이 저장소에서는 공개 export의 TypeScript/TSX 소스를 Astro와 향후 Vite 앱이 직접 처리하므로 UI 패키지의 별도 빌드가 필요하지 않습니다. `corepack pnpm check`는 UI와 블로그의 타입을 검사하고, `corepack pnpm test`는 UI의 Vitest 단위 테스트와 블로그의 정적 빌드 검증을 실행합니다.

블로그는 공식 `@astrojs/react` integration을 사용합니다. 검색창의 닫기 버튼은 공용 `Button`을 정적 HTML로 렌더링하며 기존 Astro 스크립트가 클릭을 처리합니다. 이 버튼에는 `client:*`를 사용하지 않습니다. React 앱에서는 부모의 상태와 `onClick`을 그대로 연결할 수 있습니다. Astro에서 React 상태·이벤트 처리가 필요한 화면은 해당 React 컴포넌트에 hydration을 적용해야 합니다.

아래는 기존 NexT 테마 안내입니다.

# NexT

> 精于心，简于形

NexT 是由 [Hexo NexT](https://github.com/iissnan/hexo-theme-next) 移植而来的 Jekyll 主题。<!--commit: f951075d9b739d26b42472431995fa68d08796aa-->

<a href="http://simpleyyt.github.io/jekyll-theme-next/" target="_blank">在线预览 Preview</a> | <a href="http://simpleyyt.com" target="_blank">Yitao's Blog</a> | <a href="http://theme-next.simpleyyt.com" target="_blank">NexT 使用文档</a> |  [English Documentation](README.en.md)

[![Join the chat at https://gitter.im/simpleyyt/jekyll-theme-next](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/jekyll-theme-next/lobby?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

![NexT Schemes](http://iissnan.com/nexus/next/next-schemes.jpg)


## 浏览器支持 Browser support

![Browser support](http://iissnan.com/nexus/next/browser-support.png)


## 贡献 Contributing

欢迎提交问题与需求，修复代码。


## 开发 Development

NexT 主旨在于简洁优雅且易于使用，所以首先要尽量确保 NexT 的简洁易用性。

NexT is built for easily use with elegant appearance. First things first, always keep things simple.


## 捐赠

支付宝捐赠链接还是要有的，万一真的有人捐呢。

![支付宝扫码捐赠](http://7lryc0.com1.z0.glb.clouddn.com/a6x049034plyvjm1rvn4h28%20%281%29.png)
