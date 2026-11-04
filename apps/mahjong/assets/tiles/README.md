# Mahjong tile artwork

- Source: https://github.com/FluffyStuff/riichi-mahjong-tiles
- Revision: `26e127ba2117f45cdce5ea0225748cc0cfad3169`

The 40 Regular SVG files are unmodified upstream artwork: 34 tile faces, three red fives, and Front, Back, and Blank. See [`LICENSE.md`](./LICENSE.md) for the upstream CC0/public-domain notice.

Import tiles through the app's MahjongTile component so every tool uses the same assets.

Tile faces contain transparent artwork, including Haku, which has no markings. MahjongTile layers each face over `Front.svg`; `Back.svg` and `Front.svg` are already complete bodies. `Blank.svg` is the upstream question-mark placeholder.
