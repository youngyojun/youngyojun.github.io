# 개발

기존 블로그는 현재 루트의 Jekyll 소스를 사용합니다. `apps/site`는 별도로 실행하는 Astro 이전 검증용 앱이며 운영 배포에는 연결하지 않았습니다.

Node 버전은 `.nvmrc`, pnpm 버전은 루트 `package.json`에 고정합니다. Corepack을 사용할 수 있는 환경에서 실행하세요.

```sh
nvm use
corepack pnpm install --frozen-lockfile
corepack pnpm dev
```

개발 페이지는 `http://localhost:4321/`에서 확인합니다. `corepack pnpm check`는 Astro/TypeScript 검사, `corepack pnpm build`는 앱 빌드, `corepack pnpm preview`는 빌드 결과 미리보기입니다. 산출물은 `apps/site/dist/`에 생성합니다.

현재 Astro에서는 기존 글 30개를 원래 URL로 검증합니다. 홈의 글 목록에서 한글·영어 본문, 수식, 그림, 코드와 다운로드 링크를 비교하세요. 원문은 루트 `_posts/`에서 직접 읽고, `apps/site/public/`의 심볼릭 링크는 기존 `assets/`와 `downloadable_files/`를 가리키므로 자산을 복사해 관리하지 않습니다. 수식은 기존 블로그와 같은 MathJax CDN의 TeX 웹폰트를 사용합니다. 불완전한 로컬 STIX 폰트 때문에 특수 글자가 깨지는 문제를 피하도록 로컬 폰트 자동 선택을 끕니다. `corepack pnpm test`는 빌드 후 Markdown 호환 처리, 기존 글 URL과 첨부파일을 검사합니다.

`apps/site/src/legacy-post-urls.json`은 운영 sitemap과 각 글 제목으로 확인한 공개 주소를 고정합니다. 글을 추가할 때 원문 파일명과 URL 매핑도 함께 추가해야 하며, 누락·중복·남은 매핑은 빌드 오류로 검출합니다. 파일명의 날짜나 로컬 시간대로 주소를 다시 계산하지 마세요. 기존 Jekyll 빌드와 비교할 때는 `TZ=UTC`를 사용해야 운영 주소와 일치합니다. 사이트맵 등 나머지 공개 파일과 배포 전환은 아직 준비 중입니다.

Atom 피드는 기존 `/atom.xml` 주소에 최신 글 10개의 전체 본문과 발췌를 생성합니다. 구독기에 같은 글이 중복 등록되지 않도록 기존 피드·글 ID를 유지하며, 글 링크·UTC 게시 시각·태그도 보존합니다. 본문과 발췌는 `apps/site/src/legacy-markdown.ts`의 공통 Markdown 설정을 사용하고, 피드 본문의 상대 주소는 각 글의 `xml:base`를 기준으로 해석합니다. 원래 비활성화된 RSS 메뉴는 추가하지 않습니다.

작성일은 기존 운영 화면과 같이 UTC 기준으로 표시하며, 목록은 파일명 대신 게시 시각의 내림차순으로 정렬합니다. 원문에 날짜가 없는 글은 파일명의 날짜를 사용합니다. 카테고리·태그는 원문의 이름과 순서를 유지하며, 현재는 글 상단에 표시합니다.

홈은 기존 `/`, `/page2/`, `/page3/` 주소에서 최신순으로 10개씩 나눕니다. 페이지별 글과 주소는 `apps/site/src/legacy-home-pages.ts`, 공통 화면은 `apps/site/src/components/HomePage.astro`에서 관리합니다. 페이지 이동은 정적 HTML 링크이므로 JavaScript 없이도 직접 접속·새로고침·이전/다음 이동이 가능합니다. 현재 홈에는 제목·날짜 목록을 표시하며, 기존 본문 발췌 표시는 아직 옮기지 않았습니다.

소개 페이지는 기존 `/about/` 주소에서 루트의 `about/index.md`를 직접 읽습니다. 소개 내용을 수정할 때는 이 원문을 편집하며, Astro용 사본을 만들지 않습니다. 기존 제목·링크·제목의 책갈피 주소를 유지하고 공통 소개 메뉴로 이동할 수 있습니다.

태그 목록은 `/tags/`, 카테고리 목록은 `/categories/`에서 볼 수 있습니다. 상세 목록은 기존 `/tag/#/<인코딩된 이름>`과 `/category/#/<인코딩된 이름>` 주소를 사용하며, 글 상단의 분류에서도 이동합니다. 최신순으로 10개씩 표시하고 `/tag/#/ICPC/page2`, `/category/#/ICPC/page2` 주소도 유지합니다. `/tag/`와 `/category/`는 각각의 목록으로 이동하며, 없는 분류·페이지는 안내를 표시합니다. JavaScript를 끄면 미리 생성된 전체 분류별 목록을 볼 수 있습니다.

태그·카테고리 데이터는 `apps/site/src/legacy-collections.ts`, 공통 상세 화면·페이지 이동은 `apps/site/src/components/CollectionPage.astro`에서 관리합니다. 홈·분류·아카이브 화면의 글 목록은 `apps/site/src/components/PostList.astro`를 함께 사용합니다. 원문의 카테고리 배열은 기존처럼 각각 독립된 분류로 취급합니다.

아카이브는 `/archives/`에서 최신순으로 10개씩 나누고 각 페이지에서 연도별로 묶습니다. 기존 `/archives/#/page2`, `/archives/#/page3` 주소와 월·일 표시를 유지하며, JavaScript를 끄면 전체 목록을 볼 수 있습니다. ‘본문으로 건너뛰기’는 선택한 분류·아카이브 페이지의 주소를 유지하면서 본문에 초점을 옮깁니다.

검색 버튼은 제목·본문을 입력 즉시 검색하는 팝업을 엽니다. 검색 데이터는 빌드 때 원문에서 `/search.xml`로 생성하고 팝업을 처음 열 때 불러옵니다. 검색 판정·문맥 선택은 `apps/site/src/search.ts`, 팝업은 `apps/site/src/components/Search.astro`에서 관리합니다. 기존처럼 영어 대소문자를 구분하지 않고, 공백·하이픈으로 나눈 단어 중 하나라도 일치하면 표시하며, 문구 전체의 일치와 일치 횟수를 우선합니다. 결과에는 글마다 본문 문맥 하나와 원래 글 링크를 표시합니다. Escape·닫기 버튼·배경 클릭으로 닫을 수 있고, 닫으면 검색어를 지웁니다. JavaScript를 끄면 검색 버튼을 숨기며 기존 글 목록과 탐색 링크는 그대로 사용할 수 있습니다.

앱은 `apps/*`, 실제 공유 패키지는 `packages/*`에 추가합니다. 새 개발 경로는 Jekyll의 `exclude`로 제외합니다.

Astro의 공통 HTML 틀·사이트 헤더는 `apps/site/src/layouts/BaseLayout.astro`, 색상 변수와 본문·모바일 스타일은 `apps/site/src/styles/site.css`에서 관리합니다. 페이지는 `apps/site/src/pages/`에서 레이아웃을 사용하며, 글 원문은 기존 위치에 둡니다. 현재 NexT Muse의 밝은 배경과 검정 헤더를 기준으로 구성했습니다. 공유 스타일 패키지는 다른 앱에서도 실제로 필요해질 때 분리합니다.

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
