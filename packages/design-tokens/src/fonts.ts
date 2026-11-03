import latin from '@fontsource-variable/geist/files/geist-latin-wght-normal.woff2?url';
import korean from '@fontsource-variable/noto-sans-kr/files/noto-sans-kr-119-wght-normal.woff2?url';

// Preload the most common glyphs while other language subsets load only when used.
export const fontPreloads = [latin, korean];
