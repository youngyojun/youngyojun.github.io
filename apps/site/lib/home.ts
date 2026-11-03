import { appPaths } from '../../../site.config.ts';

interface RecentPost { title: string; url: string; date: string; description: string }

const year = document.querySelector('#copyright-year')!;
year.textContent = String(new Date().getFullYear());

const list = document.querySelector<HTMLUListElement>('#latest-posts')!;
const status = document.querySelector<HTMLElement>('#writing-status')!;
const postPrefix = `${appPaths.blog}posts/`;
const dateFormat = new Intl.DateTimeFormat('sv-SE', { timeZone: 'Asia/Seoul', year: 'numeric', month: '2-digit', day: '2-digit' });

async function loadPosts() {
  list.setAttribute('aria-busy', 'true');
  try {
    // Consume the blog's public feed rather than coupling the two apps' builds.
    const response = await fetch(`${appPaths.blog}recent-posts.json`, { cache: 'no-cache' });
    if (!response.ok) throw new Error('Recent posts request failed');
    const data: unknown = await response.json();
    if (!Array.isArray(data) || data.length > 3 || !data.every((entry): entry is RecentPost =>
      entry && typeof entry.title === 'string' && entry.title.trim() &&
      typeof entry.description === 'string' && typeof entry.date === 'string' &&
      /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:Z|[+-]\d{2}:\d{2})$/.test(entry.date) && Number.isFinite(Date.parse(entry.date)) &&
      typeof entry.url === 'string' && entry.url.startsWith(postPrefix) && /^[a-z0-9]+(?:-[a-z0-9]+)*\/$/.test(entry.url.slice(postPrefix.length))
    )) throw new Error('Invalid recent posts feed');

    const fragment = document.createDocumentFragment();
    for (const entry of data) {
      const item = document.createElement('li');
      const link = document.createElement('a');
      link.href = entry.url;
      const time = document.createElement('time');
      time.dateTime = entry.date;
      time.textContent = dateFormat.format(new Date(entry.date)).replaceAll('-', '.');
      const text = document.createElement('div');
      const heading = document.createElement('h3');
      heading.textContent = entry.title;
      const description = document.createElement('p');
      description.textContent = entry.description;
      text.append(heading, description);
      const arrow = document.createElement('span');
      arrow.className = 'row-arrow';
      arrow.setAttribute('aria-hidden', 'true');
      arrow.textContent = '↗';
      link.append(time, text, arrow);
      item.append(link);
      fragment.append(item);
    }
    list.replaceChildren(fragment);
    status.textContent = data.length ? '' : 'No posts yet.';
  } catch {
    status.textContent = 'Could not load recent posts. You can read them on the blog.';
  } finally {
    list.setAttribute('aria-busy', 'false');
  }
}

void loadPosts();
