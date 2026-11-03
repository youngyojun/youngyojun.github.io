import latin from 'wanted-sans/fonts/webfonts/variable/split/woff2/WantedSansVariable.split.90.woff2?url';
import korean from 'wanted-sans/fonts/webfonts/variable/split/woff2/WantedSansVariable.split.88.woff2?url';

// Preload the most common glyphs while other language subsets load only when used.
export const fontPreloads = [latin, korean];
