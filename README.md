# youngyojun.github.io

Astro 블로그와 독립 앱을 관리하는 pnpm monorepo입니다. 현재 구현된 앱은 `apps/blog`이며, 메인 사이트와 다른 앱은 실제 구현 시 `apps/`에 추가합니다.

Jekyll 빌드와 이전 테마의 렌더링 코드는 제거했습니다. 운영 GitHub Pages 설정은 아직 전환하지 않았습니다. 기존 Jekyll 방식으로 이 변경을 배포하지 마세요. CI는 검증과 정적 산출물 업로드만 수행하며 사이트를 게시하지 않습니다.

## 개발

Node 버전은 `.nvmrc`, pnpm 버전은 `package.json`에 고정합니다.

```sh
nvm use
corepack pnpm install --frozen-lockfile
corepack pnpm dev --host 127.0.0.1 --port 4323
```

블로그는 `http://localhost:4323/blog/`에서 확인합니다. 현재 `/`는 `/blog/`로 이동합니다. 향후 메인 사이트가 `/`를 소유할 때 이 진입점만 교체합니다.

| 명령 | 동작 |
| --- | --- |
| `corepack pnpm dev` | 블로그 개발 서버 |
| `corepack pnpm check` | 블로그·공용 UI 타입 검사 |
| `corepack pnpm test` | 단위 테스트, 블로그 빌드·내부 링크·콘텐츠·자산 검사, 산출물 조립 테스트 |
| `corepack pnpm build` | 독립 앱 빌드 후 루트 `dist/`로 조립 |
| `corepack pnpm preview` | 조립된 `dist/`를 `http://localhost:4325/`에서 제공 |
| `corepack pnpm test:e2e` | 조립된 결과의 데스크톱·모바일 브라우저 검증 |

브라우저 검증 전에 한 번 설치합니다.

```sh
corepack pnpm --filter @youngyojun/blog exec playwright install chromium
corepack pnpm build
corepack pnpm test:e2e
```

Playwright가 설치한 전용 Chromium만 사용합니다. 개인 Chrome 실행 파일·프로필·기존 CDP 연결은 테스트에 사용하지 않습니다. 각 테스트는 독립 브라우저 컨텍스트를 사용하고 종료 시 정리합니다.

## 저장소 구조

```text
apps/blog/
  content/posts/        # 글 Markdown
  content/pages/        # 소개 등 작성 콘텐츠
  pages/                # URL 진입점
  layouts/              # 문서 틀·공통 탐색·메타데이터
  components/           # 블로그 전용 UI
  styles/               # 블로그 스타일
  lib/                  # 콘텐츠 조회·검색·페이지 계산·호환 주소
  public/               # 가공 없이 배포하는 이미지·첨부파일
  content.config.ts     # 공식 콘텐츠 loader와 스키마 연결
  tests/                # 단위·정적 산출물·브라우저 검증
packages/
  design-tokens/        # 앱 공통 CSS 변수
  ui/                   # 앱 공통 React 컴포넌트
scripts/                # 빌드 결과 조립
third-party/next/       # 보관한 원본 테마 설명서
```

`astro.config.mjs`의 `srcDir: '.'` 설정으로 앱 루트의 디렉터리를 사용합니다. 작성 원문과 URL 코드는 분리되어 있습니다. `pages/`는 콘텐츠를 조회해 화면에 연결하며 Markdown 원문을 보관하지 않습니다.

앱은 다른 앱의 내부 소스를 import하지 않습니다. 실제 공통 기능만 `packages/`에서 public export로 제공합니다. 콘텐츠·검색·분류 로직은 블로그 앱이 소유합니다.

## 새 글 작성

`apps/blog/content/posts/<slug>.md`에 작성합니다. 파일명은 slug와 맞추는 것을 권장하지만 URL은 frontmatter의 slug로 결정됩니다.

```markdown
---
title: "글 제목"
slug: example-post
date: "2026-10-20T12:00:00+09:00"
description: "목록과 검색 엔진에 표시할 설명. 생략할 수 있습니다."
categories: [Algorithm]
tags: [ICPC, 수학]
---

첫 문단부터 본문을 작성합니다.

수식은 $a_i$처럼 작성합니다.
```

제목·slug·게시일은 필수입니다. 게시일은 시간대가 있는 ISO 문자열을 따옴표로 감싸 작성합니다. 내부에서는 UTC로 정규화하고 UTC 날짜로 표시하며 게시 시각 내림차순으로 정렬합니다. 분류·태그는 생략하면 빈 배열입니다. 이름에 경로 구분자, `#`·`?`와 `.`·`..`를 사용할 수 없습니다. 알 수 없는 필드, 잘못된 날짜, 잘못된 slug, 중복 slug와 잘못된 수식은 빌드를 실패시킵니다.

slug는 소문자 영문·숫자와 단어 사이의 단일 하이픈을 사용합니다. 공개 후에는 유지합니다. 제목·게시일·파일명 변경으로 URL을 바꾸지 않습니다. 연도·연습일·회차는 의미상 필요한 경우에만 포함합니다.

`description`을 생략하면 첫 문단을 일반 텍스트로 추출해 짧게 표시합니다. 글 전체를 목록에서 다시 렌더링하지 않습니다. 현재 `content/posts`의 모든 Markdown은 발행 대상이므로 초안은 이 디렉터리에 넣지 않습니다.

수식은 한 쌍의 `$`로 인라인 작성하고, 표시 수식은 아래처럼 구분자를 별도 줄에 둡니다.

```text
$$
\sum_{i=0}^{n} a_i = \frac{n(n+1)}{2}
$$
```

Astro 공식 Unified processor와 remark-math·rehype-katex로 빌드 시 수식을 렌더링합니다. 렌더러와 CSS/폰트의 KaTeX 버전을 맞추고 로컬 산출물로 제공합니다. 외부 MathJax 스크립트와 런타임 수식 변환은 없습니다. TeX 중괄호는 `\{`·`\}`로 작성하고 Jekyll용 이중 이스케이프를 추가하지 않습니다. Markdown 표 안의 절댓값은 `\lvert`·`\rvert`를 사용하면 구분자와 충돌하지 않습니다.

## 이미지·첨부파일

새 그림은 `apps/blog/public/images/<slug>/`, 새 첨부는 `apps/blog/public/downloads/`에 추가하고 본문에서는 `/images/...`, `/downloads/...`로 연결할 수 있습니다. `public` 파일은 이름과 바이트를 유지해 배포합니다.

기존 원본은 `public/assets/`, `public/downloadable_files/`로 이동했고 공개 주소 `/assets/…`, `/downloadable_files/…`는 유지합니다. 원본 그림·PDF·DOCX·C++ 파일을 변환하거나 DOCX 내부 이미지를 추출하지 않습니다. 기존 만료된 외부 Googleusercontent 이미지 링크는 사용자의 결정대로 유지합니다.

원래 라이브러리 소스와 라이선스도 `public/assets/lib/`에 보존합니다. 새 화면에서는 이 테마 라이브러리를 실행하지 않습니다. 제외하기로 한 NexT/FastClick/jQuery Lazy Load 설명서의 공개 HTML 페이지는 생성하지 않습니다.

## URL·검색·피드

- 블로그: `/blog/`, `/blog/page/2/`
- 글: `/blog/posts/<slug>/`
- 태그: `/blog/tags/`, `/blog/tags/<인코딩한 이름>/`
- 분류: `/blog/categories/`, `/blog/categories/<인코딩한 이름>/`
- 분류별 다음 페이지: 해당 주소 뒤 `page/2/`
- 아카이브: `/blog/archives/`에서 연도별 전체 목록
- 소개: `/blog/about/`

글·분류·목록·수식은 JavaScript 없이 읽고 이동할 수 있습니다. 검색은 native dialog와 처음 열 때 불러오는 `/blog/search.json`을 사용합니다. 한글·영어 제목/본문을 검색하며 전체 문구의 일치를 우선합니다. Escape·닫기·배경 클릭으로 닫고, 포커스를 복원합니다. 로딩 실패는 닫았다 다시 열어 재시도할 수 있습니다. 검색 결과는 HTML로 삽입하지 않고 텍스트 노드로 구성합니다.

과거 글 주소는 `lib/post-aliases.json`, 과거 탐색 주소는 `lib/redirects.ts`에서 관리합니다. 기존 주소에는 canonical·이동 링크와 HTML 이동 페이지를 생성합니다. HTTP 301이 아닙니다. 예전 hash 기반 태그·분류 URL은 작은 호환 스크립트로 새 정적 주소에 연결합니다. JavaScript를 끄면 해당 분류 목록으로 이동합니다. 새 글은 과거 주소 매핑 없이 발행할 수 있습니다.

`/atom.xml`은 최신 10개 글의 전체 본문을 제공합니다. 기존 글 ID는 유지하고 실제 링크는 새 주소를 사용합니다. `/sitemap.xml`에는 대표 글·탐색 페이지와 공개 PDF만 넣습니다. 글 날짜는 명시한 게시 시각을 사용하고 파일 체크아웃 시각을 수정일로 사용하지 않습니다. `/robots.txt`는 사이트맵을 안내합니다. `/search.xml`도 기존 소비자를 위해 같은 글 데이터에서 생성합니다.

없는 주소에는 안내와 블로그 링크가 있는 `404.html`을 제공합니다. 실제 GitHub Pages의 오류 페이지 연결은 운영 전환 후 확인해야 합니다.

## 공통 UI와 새 앱

공통 색상·글꼴·읽기 폭은 `packages/design-tokens/src/tokens.css`에서 관리합니다. 앱은 `@youngyojun/design-tokens/tokens.css`를 import합니다.

공용 React UI는 `@youngyojun/ui`에서 가져옵니다. 현재 `Button`은 일반 버튼 props·ref·className을 지원하며 기본 `type="button"`을 사용합니다. Astro에서는 `client:*` 없이 정적 HTML로 사용할 수 있고, React 상태·이벤트가 필요할 때만 해당 컴포넌트를 hydrate합니다. 블로그 전체를 React로 실행하지 않습니다.

새 앱은 `apps/<name>`에 별도 package.json과 dev/check/test/build 명령을 둡니다. 실제로 필요한 공유 패키지에 workspace 의존성을 선언하고, 출력의 URL·자산 경로가 다른 앱과 겹치지 않도록 합니다. 빌드 결과를 조립 스크립트에 등록할 때 `/`와 `404.html`·사이트맵 등 사이트 전체 경로의 소유자도 정해야 합니다.

## CI·배포 준비

`corepack pnpm build`는 현재 `apps/blog/dist`를 루트 `dist`에 조립하고 `.nojekyll`을 추가합니다. `scripts/assemble-site.mjs`는 원본과 출력의 경로 중첩·심볼릭 링크·파일 충돌을 검출하며, 충돌이 있으면 기존 결과를 건드리기 전에 실패합니다. 배포 대상은 루트 `dist/`입니다. 산출물과 브라우저 테스트 결과는 Git에 넣지 않습니다.

`.github/workflows/ci.yml`은 고정된 Node/pnpm으로 설치·타입·테스트·조립·브라우저 검증을 실행하고 `static-site` artifact를 업로드합니다. 배포 권한과 게시 단계는 포함하지 않습니다. Actions 자체는 로컬 검증 후에도 원격 첫 실행을 확인해야 합니다.

운영 전환 시에는 실제 GitHub Pages 설정을 확인하고, Jekyll 소스 빌드 대신 검증한 정적 artifact를 게시하도록 전환해야 합니다. 이전 정상 산출물을 확보한 뒤 새 버전에 문제가 있으면 이전 산출물을 다시 게시하는 절차를 준비합니다. 현재 운영 설정 변경·push·배포는 수행하지 않았습니다.
