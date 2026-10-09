import { renderToStaticMarkup } from 'react-dom/server';
import { expect, test } from 'vitest';
import { Button } from '../src/index';

test('defaults to a native button that does not submit its enclosing form', () => {
  const html = renderToStaticMarkup(<form><Button>닫기</Button></form>);
  expect(html).toContain('type="button"');
  expect(html).toContain('>닫기</button>');
});

test('allows explicit form submission and preserves native attributes and caller styles', () => {
  const html = renderToStaticMarkup(<Button type="submit" disabled name="action" value="save" aria-label="저장" className="caller-style">저장</Button>);
  expect(html).toContain('type="submit"');
  expect(html).toContain('disabled=""');
  expect(html).toContain('name="action"');
  expect(html).toContain('value="save"');
  expect(html).toContain('aria-label="저장"');
  expect(html).toMatch(/class="[^"\s]+ caller-style"/);
});
