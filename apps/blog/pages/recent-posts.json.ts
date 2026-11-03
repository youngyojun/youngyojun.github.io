import { posts } from '../lib/posts';

export function GET() {
  return Response.json(posts.slice(0, 3).map(post => ({
    title: post.title,
    url: post.url,
    date: post.data.date,
    description: post.description,
  })));
}
