import { preview } from 'astro';
import { fileURLToPath } from 'node:url';

const server = await preview({
  root: fileURLToPath(new URL('./', import.meta.url)),
  outDir: fileURLToPath(new URL('../../dist/', import.meta.url)),
  server: { host: '127.0.0.1', port: Number(process.env.BLOG_PREVIEW_PORT ?? 4325) },
});
for (const signal of ['SIGINT', 'SIGTERM']) {
  process.once(signal, async () => { await server.stop(); process.exit(0); });
}
