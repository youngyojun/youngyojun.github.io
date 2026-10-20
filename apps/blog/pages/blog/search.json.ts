import { posts } from '../../lib/posts';
export function GET() {
  return Response.json(posts.map(post => ({ title: post.data.title, content: post.text, url: post.url })));
}
