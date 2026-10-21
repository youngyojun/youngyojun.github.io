import { blogPath } from './site.ts';
import { searchPosts, type SearchEntry, type SearchHit } from './search.ts';

const toggle = document.querySelector<HTMLButtonElement>('#search-toggle')!;
const dialog = document.querySelector<HTMLDialogElement>('#search-dialog')!;
const input = document.querySelector<HTMLInputElement>('#search-input')!;
const status = document.querySelector<HTMLElement>('#search-status')!;
const results = document.querySelector<HTMLUListElement>('#search-results')!;
let entries: SearchEntry[] | undefined;
let request: Promise<SearchEntry[]> | undefined;

function highlighted(text: string, hits: SearchHit[]) {
  const fragment = document.createDocumentFragment();
  let end = 0;
  for (const hit of hits) {
    fragment.append(text.slice(end, hit.start));
    const mark = document.createElement('mark');
    mark.textContent = text.slice(hit.start, hit.end);
    fragment.append(mark);
    end = hit.end;
  }
  fragment.append(text.slice(end));
  return fragment;
}

function showResults() {
  if (!entries || !dialog.open) return;
  results.replaceChildren();
  const matches = searchPosts(entries, input.value);
  status.textContent = !input.value.trim() ? '검색어를 입력하세요.' : matches.length ? `${matches.length}개의 글` : '검색 결과가 없습니다.';
  for (const match of matches) {
    const item = document.createElement('li');
    const link = document.createElement('a');
    link.href = match.url;
    link.append(highlighted(match.title, match.titleHits));
    item.append(link);
    if (match.excerpt) {
      const excerpt = document.createElement('p');
      excerpt.append(highlighted(match.excerpt, match.excerptHits));
      item.append(excerpt);
    }
    results.append(item);
  }
}

async function loadEntries(): Promise<SearchEntry[]> {
  const response = await fetch(blogPath('search.json'));
  if (!response.ok) throw new Error('Search index request failed');
  const data: unknown = await response.json();
  if (!Array.isArray(data) || !data.every(entry =>
    entry && typeof entry.title === 'string' && typeof entry.content === 'string' &&
    typeof entry.url === 'string' && entry.url.startsWith(blogPath('posts/')) && /^[a-z0-9]+(?:-[a-z0-9]+)*\/$/.test(entry.url.slice(blogPath('posts/').length))
  )) throw new Error('Invalid search index');
  return data;
}

toggle.hidden = false;
toggle.addEventListener('click', async () => {
  dialog.showModal();
  input.focus();
  if (entries) { showResults(); return; }
  status.textContent = '검색 데이터를 불러오는 중입니다.';
  try {
    request ??= loadEntries();
    entries = await request;
    showResults();
  } catch {
    request = undefined;
    if (dialog.open) status.textContent = '검색 데이터를 불러오지 못했습니다. 닫았다가 다시 열어주세요.';
  }
});
input.addEventListener('input', showResults);
document.querySelector('#search-close')!.addEventListener('click', () => dialog.close());
dialog.addEventListener('keydown', event => {
  if (event.key === 'Escape') { event.preventDefault(); dialog.close(); }
});
dialog.addEventListener('close', () => {
  input.value = '';
  results.replaceChildren();
  status.textContent = '검색어를 입력하세요.';
  // WebKit does not focus buttons on pointer activation, so native dialog restoration misses the opener.
  toggle.focus();
});
dialog.addEventListener('click', event => {
  if (event.target !== dialog) return;
  const bounds = dialog.getBoundingClientRect();
  if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) dialog.close();
});
