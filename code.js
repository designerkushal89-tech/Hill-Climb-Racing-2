// Wonder Kingdom - Store Screens (editable)
// Builds 9 editable 810x1440 store-screenshot frames + reusable components:
//   "WK / Tile"           (variants Type=Star/Heart/Drop/Diamond)
//   "WK / Caption banner" (variants Color=Blue/Red, text property "Caption")
// Scene art (character, hazard, background) is a placeholder layer: drop the
// client's own illustration into "Scene art" in each frame.
// Run: Figma desktop > Plugins > Development > Import plugin from manifest.
 
const W = 810, H = 1440;
const COLS = 9, ROWS = 7, CELL = 80, TILE = 76, PAD = 12;
 
const hex = (h) => {
  h = h.replace('#', '');
  return { r: parseInt(h.slice(0, 2), 16) / 255, g: parseInt(h.slice(2, 4), 16) / 255, b: parseInt(h.slice(4, 6), 16) / 255 };
};
const solid = (h, opacity = 1) => [{ type: 'SOLID', color: hex(h), opacity }];
const linear = (a, b) => [{
  type: 'GRADIENT_LINEAR',
  gradientTransform: [[0, 1, 0], [-1, 0, 1]],
  gradientStops: [{ position: 0, color: Object.assign(hex(a), { a: 1 }) }, { position: 1, color: Object.assign(hex(b), { a: 1 }) }],
}];
const shadow = (y, blur, op) => ({
  type: 'DROP_SHADOW', color: { r: 0, g: 0, b: 0, a: op }, offset: { x: 0, y }, radius: blur,
  spread: 0, visible: true, blendMode: 'NORMAL',
});
 
// ---------- fonts ----------
async function firstFont(list) {
  for (const f of list) {
    try { await figma.loadFontAsync(f); return f; } catch (e) { /* try next */ }
  }
  throw new Error('No usable font found');
}
 
// ---------- screens (captions + board shape; x = tile, . = rock) ----------
const SCREENS = [
  { caption: 'ESCAPE\nTHE SHARK', banner: 'Blue', sky: ['#1F5E6E', '#0E2E3A'], tileBg: '#2E4A55', mask: ['xxxxxxxxx', 'xxxxxx...', 'xxxx.....', 'xxxx....x', 'xxx.....x', 'xxxxxxxxx', 'xxxxxxxxx'] },
  { caption: 'MAKE\nTHE PERFECT MATCH', banner: 'Blue', sky: ['#E9B44C', '#8A3B2A'], tileBg: '#BFF0B8', mask: ['x.......x', 'x.......x', 'x......xx', 'xx.....xx', 'xxxxx.xxx', 'xxxxxxxxx', 'xxxxxxxxx'] },
  { caption: 'CLEAR\nTHE WAY', banner: 'Blue', sky: ['#C9CED6', '#7B8592'], tileBg: '#7FE6DC', mask: ['xx...xxxx', 'x....xxxx', 'x..xxxxxx', 'x..xxxxxx', 'xxx..xxxx', 'xxx..xxxx', 'xxxxxxxxx'] },
  { caption: 'SAVE\nTHE KING!', banner: 'Red', sky: ['#7A3A4A', '#3A1E2A'], tileBg: '#EFE6D2', mask: ['xxxxxxx..', 'xxxxxxx..', 'xxxxxx...', 'xxxxx..xx', 'x...x..xx', 'xxxxx..xx', 'xxxxx..xx'] },
  { caption: 'RESCUE\nTHE KING!', banner: 'Red', sky: ['#3A4E78', '#14203A'], tileBg: '#D6E8F7', mask: ['.....xxxx', '.....xxxx', '...xx.xxx', '...xx..xx', '...xxxxxx', '...xxxxxx', '...xxxxxx'] },
  { caption: 'DROP\nTHE ROCKS!', banner: 'Red', sky: ['#E3A048', '#9A5A1E'], tileBg: '#F2DEB0', mask: ['..xxxxxxx', '...xxxxxx', '....xxxxx', '....xxxxx', 'xxx..xxxx', 'xxx.xxxxx', 'xxx.xxxxx'] },
  { caption: 'ESCAPE\nTHE LAVA!', banner: 'Red', sky: ['#4A4458', '#221E2C'], tileBg: '#F4F1EC', mask: ['...xxxxx.', 'x....xxx.', 'x...x.xx.', 'xx..x.xx.', 'xx.x..xx.', 'xxxxxxxx.', 'xxxxxxxx.'] },
  { caption: 'CLEAR\nTHE WAY!', banner: 'Red', sky: ['#7E7A74', '#3E3A36'], tileBg: '#F3DDC4', mask: ['xxx......', 'xxxx.....', 'xxxxx....', 'xx...xx..', 'xx.......', 'xxxxxxxxx', 'xxxxxxxxx'] },
  { caption: 'MATCH TO\nWIN THE CROWN!', banner: 'Red', sky: ['#6B2F7A', '#2A1238'], tileBg: '#F1E3C8', mask: ['xxxxxxxxx', 'xxxx..xxx', 'xxx....xx', 'xxx....xx', 'xxxx..xxx', 'xxxxxxxxx', 'xxxxxxxxx'] },
];
 
// ---------- icon shapes (original set, 48x48 box) ----------
const ICONS = {
  Star: { color: '#FFC83D' },
  Heart: { color: '#E8334A', path: 'M 24 43 C 10 33 3 25 3 15 C 3 8 8 3 15 3 C 19 3 22 5 24 9 C 26 5 29 3 33 3 C 40 3 45 8 45 15 C 45 25 38 33 24 43 Z' },
  Drop: { color: '#35C46A', path: 'M 24 3 C 24 3 7 22 7 31 C 7 40 14 46 24 46 C 34 46 41 40 41 31 C 41 22 24 3 24 3 Z' },
  Diamond: { color: '#3D8BFF', path: 'M 12 4 L 36 4 L 46 17 L 24 45 L 2 17 Z' },
};
 
function makeIcon(type) {
  let icon;
  if (type === 'Star') {
    icon = figma.createStar();
    icon.pointCount = 5;
    icon.innerRadius = 0.5;
    icon.resize(50, 48);
  } else {
    icon = figma.createVector();
    icon.vectorPaths = [{ windingRule: 'NONZERO', data: ICONS[type].path }];
  }
  icon.name = 'Icon';
  icon.fills = solid(ICONS[type].color);
  icon.strokes = solid('#000000', 0.18);
  icon.strokeWeight = 2;
  icon.effects = [shadow(3, 2, 0.25)];
  return icon;
}
 
function buildTileComponents() {
  const comps = [];
  Object.keys(ICONS).forEach((type, i) => {
    const c = figma.createComponent();
    c.name = 'Type=' + type;
    c.resize(TILE, TILE);
    c.cornerRadius = 10;
    c.fills = solid('#F6EBD4');
    c.strokes = solid('#000000', 0.15);
    c.strokeWeight = 2;
    c.effects = [shadow(4, 0, 0.25)];
    const icon = makeIcon(type);
    icon.x = (TILE - icon.width) / 2;
    icon.y = (TILE - icon.height) / 2;
    c.appendChild(icon);
    const shine = figma.createEllipse();
    shine.name = 'Shine';
    shine.resize(14, 8);
    shine.rotation = 30;
    shine.x = icon.x + 10; shine.y = icon.y + 14;
    shine.fills = solid('#FFFFFF', 0.45);
    c.appendChild(shine);
    c.x = i * (TILE + 16);
    comps.push(c);
  });
  const set = figma.combineAsVariants(comps, figma.currentPage);
  set.name = 'WK / Tile';
  set.layoutMode = 'HORIZONTAL';
  set.itemSpacing = 16;
  set.paddingLeft = set.paddingRight = set.paddingTop = set.paddingBottom = 16;
  set.primaryAxisSizingMode = 'AUTO';
  set.counterAxisSizingMode = 'AUTO';
  set.cornerRadius = 8;
  return set;
}
 
function buildBannerComponents(font) {
  const colors = { Blue: ['#2F5BD8', '#1C3A99'], Red: ['#D43B55', '#8E1E34'] };
  const comps = [];
  const texts = [];
  Object.keys(colors).forEach((name, i) => {
    const c = figma.createComponent();
    c.name = 'Color=' + name;
    c.resize(W, 280);
    c.fills = [];
    c.clipsContent = true;
 
    const rim = figma.createVector();
    rim.name = 'Gold rim';
    rim.vectorPaths = [{ windingRule: 'NONZERO', data: 'M 0 40 Q 405 -24 810 40 L 810 280 L 0 280 Z' }];
    rim.fills = linear('#FFE07A', '#E89A1C');
    c.appendChild(rim);
 
    const body = figma.createVector();
    body.name = 'Body';
    body.vectorPaths = [{ windingRule: 'NONZERO', data: 'M 0 60 Q 405 -2 810 60 L 810 266 L 0 266 Z' }];
    body.fills = linear(colors[name][0], colors[name][1]);
    c.appendChild(body);
 
    const t = figma.createText();
    t.name = 'Caption';
    t.fontName = font;
    t.characters = 'CAPTION\nTEXT';
    t.fontSize = 84;
    t.lineHeight = { value: 90, unit: 'PIXELS' };
    t.textAlignHorizontal = 'CENTER';
    t.textAlignVertical = 'CENTER';
    t.textAutoResize = 'NONE';
    t.resize(750, 190);
    t.x = 30; t.y = 76;
    t.fills = solid(name === 'Red' ? '#FFF1C9' : '#FFFFFF');
    t.strokes = solid('#1A1033');
    t.strokeWeight = 6;
    t.strokeAlign = 'OUTSIDE';
    t.effects = [shadow(6, 0, 0.35)];
    c.appendChild(t);
    texts.push(t);
 
    c.y = i * 320;
    comps.push(c);
  });
  const set = figma.combineAsVariants(comps, figma.currentPage);
  set.name = 'WK / Caption banner';
  set.layoutMode = 'VERTICAL';
  set.itemSpacing = 24;
  set.paddingLeft = set.paddingRight = set.paddingTop = set.paddingBottom = 16;
  set.primaryAxisSizingMode = 'AUTO';
  set.counterAxisSizingMode = 'AUTO';
  const key = set.addComponentProperty('Caption', 'TEXT', 'CAPTION\nTEXT');
  texts.forEach((t) => { t.componentPropertyReferences = { characters: key }; });
  return { set, key };
}
 
// deterministic pseudo-random so re-runs give the same boards
function rng(seed) {
  let s = seed * 9301 + 49297;
  return () => { s = (s * 9301 + 49297) % 233280; return s / 233280; };
}
 
function buildRockCell(rand) {
  const g = figma.createFrame();
  g.name = 'Rock';
  g.resize(CELL, CELL);
  g.fills = solid('#7D7A86');
  g.clipsContent = true;
  for (let k = 0; k < 7; k++) {
    const r = figma.createEllipse();
    const s = 18 + Math.floor(rand() * 16);
    r.resize(s, s * 0.85);
    r.x = rand() * (CELL - s); r.y = rand() * (CELL - s);
    r.fills = solid(k % 2 ? '#B9B6C2' : '#9C99A6');
    g.appendChild(r);
  }
  return g;
}
 
function buildScreen(cfg, idx, tileSet, banner, labelFont) {
  const f = figma.createFrame();
  f.name = 'WK / Store ' + (idx + 1) + ' - ' + cfg.caption.replace('\n', ' ');
  f.resize(W, H);
  f.fills = linear(cfg.sky[0], cfg.sky[1]);
  f.clipsContent = true;
 
  // Scene placeholder
  const scene = figma.createFrame();
  scene.name = 'Scene art (replace with illustration)';
  scene.resize(W, 600);
  scene.fills = linear(cfg.sky[0], cfg.sky[1]);
  const box = figma.createRectangle();
  box.name = 'Placeholder outline';
  box.resize(W - 80, 520);
  box.x = 40; box.y = 40;
  box.cornerRadius = 24;
  box.fills = solid('#FFFFFF', 0.06);
  box.strokes = solid('#FFFFFF', 0.5);
  box.strokeWeight = 3;
  box.dashPattern = [16, 12];
  scene.appendChild(box);
  const lbl = figma.createText();
  lbl.fontName = labelFont;
  lbl.characters = 'Scene illustration\nCharacter + hazard art';
  lbl.fontSize = 32;
  lbl.textAlignHorizontal = 'CENTER';
  lbl.fills = solid('#FFFFFF', 0.75);
  lbl.textAutoResize = 'WIDTH_AND_HEIGHT';
  scene.appendChild(lbl);
  lbl.x = (W - lbl.width) / 2; lbl.y = (600 - lbl.height) / 2;
  f.appendChild(scene);
 
  // Board
  const board = figma.createFrame();
  board.name = 'Board';
  board.resize(COLS * CELL + PAD * 2, ROWS * CELL + PAD * 2);
  board.x = (W - board.width) / 2; board.y = 570;
  board.cornerRadius = 18;
  board.fills = solid('#1B1530', 0.85);
  board.strokes = solid('#FFD36A');
  board.strokeWeight = 4;
  board.effects = [shadow(8, 16, 0.4)];
  const rand = rng(idx + 1);
  const types = Object.keys(ICONS);
  const tiles = [];
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      const x = PAD + c * CELL, y = PAD + r * CELL;
      if (cfg.mask[r][c] === '.') {
        const rock = buildRockCell(rand);
        rock.x = x; rock.y = y;
        board.appendChild(rock);
      } else {
        const t = types[Math.floor(rand() * types.length)];
        const variant = tileSet.children.find((n) => n.name === 'Type=' + t);
        const inst = variant.createInstance();
        inst.name = 'Tile ' + (r + 1) + '-' + (c + 1);
        inst.x = x + (CELL - TILE) / 2; inst.y = y + (CELL - TILE) / 2;
        inst.fills = solid(cfg.tileBg);
        board.appendChild(inst);
        tiles.push(inst);
      }
    }
  }
  f.appendChild(board);
 
  // Hint ring on one tile (swap for a tap-hand illustration if needed)
  const target = tiles[Math.floor(tiles.length * 0.7)];
  if (target) {
    const ring = figma.createEllipse();
    ring.name = 'Hint ring';
    ring.resize(96, 96);
    ring.x = board.x + target.x + TILE / 2 - 48;
    ring.y = board.y + target.y + TILE / 2 - 48;
    ring.fills = [];
    ring.strokes = solid('#FFFFFF');
    ring.strokeWeight = 6;
    ring.effects = [{ type: 'DROP_SHADOW', color: { r: 1, g: 0.85, b: 0.3, a: 0.9 }, offset: { x: 0, y: 0 }, radius: 18, spread: 0, visible: true, blendMode: 'NORMAL' }];
    f.appendChild(ring);
  }
 
  // Caption banner
  const variant = banner.set.children.find((n) => n.name === 'Color=' + cfg.banner);
  const b = variant.createInstance();
  b.name = 'Caption banner';
  b.x = 0; b.y = H - 280;
  const propKey = Object.keys(b.componentProperties).find((k) => k.indexOf('Caption') === 0);
  if (propKey) b.setProperties({ [propKey]: cfg.caption });
  // shrink long captions so they fit on one banner line each
  const longest = Math.max.apply(null, cfg.caption.split('\n').map((l) => l.length));
  const cap = b.findOne((n) => n.type === 'TEXT' && n.name === 'Caption');
  if (cap && longest > 12) cap.fontSize = Math.min(84, Math.floor(750 / (longest * 0.6)));
  f.appendChild(b);
  return f;
}
 
async function main() {
  const page = figma.currentPage;
  if (page.findOne((n) => n.name === 'WK / Tile' && n.type === 'COMPONENT_SET')) {
    figma.closePlugin('Wonder Kingdom components already exist on this page. Delete them first to rebuild.');
    return;
  }
  const display = await firstFont([
    { family: 'Lilita One', style: 'Regular' },
    { family: 'Luckiest Guy', style: 'Regular' },
    { family: 'Inter', style: 'Black' },
    { family: 'Roboto', style: 'Black' },
    { family: 'Inter', style: 'Bold' },
  ]);
  const label = await firstFont([{ family: 'Inter', style: 'Medium' }, { family: 'Roboto', style: 'Medium' }, display]);
 
  // place below everything already on the page
  let maxY = 0, minX = 0;
  page.children.forEach((n, i) => {
    if (i === 0 || n.x < minX) minX = n.x;
    if (n.y + n.height > maxY) maxY = n.y + n.height;
  });
  const baseY = maxY + 400;
 
  const tileSet = buildTileComponents();
  tileSet.x = minX; tileSet.y = baseY;
  const banner = buildBannerComponents(display);
  banner.set.x = tileSet.x + tileSet.width + 80; banner.set.y = baseY;
 
  const screensY = baseY + Math.max(tileSet.height, banner.set.height) + 200;
  const made = [];
  SCREENS.forEach((cfg, i) => {
    const f = buildScreen(cfg, i, tileSet, banner, label);
    f.x = minX + i * (W + 120);
    f.y = screensY;
    page.appendChild(f);
    made.push(f);
  });
 
  figma.viewport.scrollAndZoomIntoView(made);
  figma.closePlugin('Wonder Kingdom: 9 store screens + Tile/Banner components created (font: ' + display.family + ').');
}
 
main().catch((e) => figma.closePlugin('Error: ' + e.message));
 