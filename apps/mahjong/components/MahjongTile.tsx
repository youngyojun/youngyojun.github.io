type Rank = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
export type Tile = `${'Man' | 'Pin' | 'Sou'}${Rank | '5-Dora'}` | 'Ton' | 'Nan' | 'Shaa' | 'Pei' | 'Haku' | 'Hatsu' | 'Chun' | 'Back' | 'Front' | 'Blank';

const images = import.meta.glob<string>('../assets/tiles/*.svg', { eager: true, query: '?url', import: 'default' });

export function MahjongTile({ tile, alt }: { tile: Tile; alt: string }) {
  // Upstream faces are transparent artwork; Front supplies their shared tile body.
  const body = tile === 'Back' || tile === 'Front' ? undefined : { backgroundImage: `url("${images['../assets/tiles/Front.svg']}")` };
  return <img className="mahjong-tile" src={images[`../assets/tiles/${tile}.svg`]} style={body} alt={alt} width="300" height="400" draggable={false} />;
}
