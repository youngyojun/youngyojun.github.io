# 개발

기존 블로그는 현재 루트의 Jekyll 소스를 사용합니다. `apps/site`는 별도로 실행하는 Astro 이전 검증용 앱이며 운영 배포에는 연결하지 않았습니다.

Node 버전은 `.nvmrc`, pnpm 버전은 루트 `package.json`에 고정합니다. Corepack을 사용할 수 있는 환경에서 실행하세요.

```sh
nvm use
corepack pnpm install --frozen-lockfile
corepack pnpm dev
```

개발 페이지는 `http://localhost:4321/`에서 확인합니다. `corepack pnpm check`는 Astro/TypeScript 검사, `corepack pnpm build`는 앱 빌드, `corepack pnpm preview`는 빌드 결과 미리보기입니다. 산출물은 `apps/site/dist/`에 생성합니다.

현재 Astro에서는 그래프 절점 글 한 편만 기존 URL로 검증합니다. 홈의 대표 글 링크로 들어가 수식, 그림 4개, Python 코드와 HTML 캡션을 비교하세요. 원문은 루트 `_posts/`에서 직접 읽고, `apps/site/public/assets`는 기존 `assets/`를 가리키므로 자산을 복사해 관리하지 않습니다. 수식은 기존 블로그와 같은 MathJax CDN을 사용합니다. `corepack pnpm test`는 빌드 후 Markdown 호환 처리와 실제 글 산출물을 검사합니다.

앱은 `apps/*`, 실제 공유 패키지는 `packages/*`에 추가합니다. 새 개발 경로는 Jekyll의 `exclude`로 제외합니다. 아래는 기존 NexT 테마 안내입니다.

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
