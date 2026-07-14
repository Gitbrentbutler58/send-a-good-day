// Single source of truth for card content, site config, and design art.
// Message IDs and design IDs are permanent once shared in a URL — append, never renumber.

// Site base URL ending in "/". Derived from where data.js was loaded from, so links
// work at a domain root, on localhost, or under a subpath (e.g. GitHub Pages).
const SITE_BASE = (() => {
  const src = document.currentScript && document.currentScript.src;
  return src ? src.replace(/js\/data\.js.*$/, '') : location.origin + '/';
})();

const CONFIG = {
  shopBase: 'https://sipgooddaycoffee.com',
  standingOrderUrl: 'https://sipgooddaycoffee.com/pages/standing-order',
  codes: {
    recipient: 'GOTAGOODDAY',
    sender: 'SENTAGOODDAY',
  },
  discountUrl(code, campaign, extra) {
    const params = new URLSearchParams({
      utm_source: 'sendagoodday',
      utm_medium: 'referral',
      utm_campaign: campaign,
    });
    if (extra) for (const k in extra) params.set(k, extra[k]);
    return `${this.shopBase}/discount/${code}?redirect=/collections/all&${params.toString()}`;
  },
  linkUrl(path, campaign) {
    const params = new URLSearchParams({
      utm_source: 'sendagoodday',
      utm_medium: 'referral',
      utm_campaign: campaign,
    });
    return `${path}?${params.toString()}`;
  },
};

const CATEGORIES = [
  { id: 'just-because',    label: 'Just Because',    suggests: 'rainbow' },
  { id: 'thank-you',       label: 'Thank You',       suggests: 'warm-cup' },
  { id: 'rough-week',      label: 'Rough Week',      suggests: 'sunrise' },
  { id: 'big-day',         label: 'Big Day',         suggests: 'sunshine' },
  { id: 'thinking-of-you', label: 'Thinking of You', suggests: 'bloom' },
  { id: 'birthday',        label: 'Birthday',        suggests: 'confetti' },
  { id: 'congrats',        label: 'Congrats',        suggests: 'north-star' },
  { id: 'for-your-team',   label: 'For Your Team',   suggests: 'lakeside' },
];

const MESSAGES = {
  jb1: { cat: 'just-because', text: 'No reason. Just glad you exist.' },
  jb2: { cat: 'just-because', text: 'Thinking about you today — that’s it, that’s the whole card.' },
  jb3: { cat: 'just-because', text: 'You make the world a little warmer just by being in it.' },
  jb4: { cat: 'just-because', text: 'Consider this a hug you can open.' },

  ty1: { cat: 'thank-you', text: 'Thank you — for being exactly who you are.' },
  ty2: { cat: 'thank-you', text: 'You showed up when it mattered. I noticed.' },
  ty3: { cat: 'thank-you', text: 'Some people make everything easier just by being around. You’re one of them.' },
  ty4: { cat: 'thank-you', text: 'A little thank-you, freshly brewed.' },

  rw1: { cat: 'rough-week', text: 'One cup at a time. One thing at a time. You’ve got this.' },
  rw2: { cat: 'rough-week', text: 'Monday called. I told it to be gentle with you.' },
  rw3: { cat: 'rough-week', text: 'New week, clean slate, strong coffee.' },
  rw4: { cat: 'rough-week', text: 'Sending you the good kind of Monday.' },

  bd1: { cat: 'big-day', text: 'Big day. Deep breath. You were built for this.' },
  bd2: { cat: 'big-day', text: 'Whatever today holds, you’re ready for it.' },
  bd3: { cat: 'big-day', text: 'Go show them what you already know.' },
  bd4: { cat: 'big-day', text: 'Rooting for you today. Loudly.' },

  to1: { cat: 'thinking-of-you', text: 'No advice, no fixing. Just me, in your corner.' },
  to2: { cat: 'thinking-of-you', text: 'You don’t have to carry today by yourself.' },
  to3: { cat: 'thinking-of-you', text: 'Sending something warm for a heavy week.' },
  to4: { cat: 'thinking-of-you', text: 'Still here. Always will be.' },

  bh1: { cat: 'birthday', text: 'Another year of you? Lucky us.' },
  bh2: { cat: 'birthday', text: 'Happy birthday — the world got brighter the day you showed up.' },
  bh3: { cat: 'birthday', text: 'Cake for breakfast. It’s the law today.' },
  bh4: { cat: 'birthday', text: 'Here’s to your best lap around the sun yet.' },

  cg1: { cat: 'congrats', text: 'You did the thing! So proud of you.' },
  cg2: { cat: 'congrats', text: 'They’re lucky to have you.' },
  cg3: { cat: 'congrats', text: 'Hard work looks good on you.' },
  cg4: { cat: 'congrats', text: 'This calls for the good mug.' },

  tm1: { cat: 'for-your-team', text: 'To the whole team: you make hard days lighter. Thank you.' },
  tm2: { cat: 'for-your-team', text: 'Take a breath, crew — you’ve earned it.' },
  tm3: { cat: 'for-your-team', text: 'Good people doing great work. That’s this team.' },
  tm4: { cat: 'for-your-team', text: 'Coffee’s on us soon. Thanks for everything you do.' },
};

// --- Design art -----------------------------------------------------------
// Each svg() returns a viewBox="0 0 400 300" decorative SVG string.

function svgSunrise() {
  return `<svg viewBox="0 0 400 300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
    <rect width="400" height="300" fill="var(--cream)"/>
    <path d="M 40 230 A 160 160 0 0 1 360 230" fill="none" stroke="var(--sand)" stroke-width="3"/>
    <path d="M 70 230 A 130 130 0 0 1 330 230" fill="none" stroke="var(--caramel)" stroke-opacity="0.3" stroke-width="3"/>
    <path d="M 100 230 A 100 100 0 0 1 300 230" fill="none" stroke="var(--sand)" stroke-width="3"/>
    <path d="M 40 230 A 160 40 0 0 0 360 230 Z" fill="var(--amber)"/>
    <rect x="0" y="228" width="400" height="4" fill="var(--coffee)"/>
  </svg>`;
}

function svgWarmCup() {
  return `<svg viewBox="0 0 400 300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
    <rect width="400" height="300" fill="var(--sand)"/>
    <path d="M170,80 C160,110 150,130 150,155 A50,50 0 1 0 250,155 C250,130 240,110 230,80 Z" fill="var(--coffee)"/>
    <ellipse cx="200" cy="155" rx="42" ry="10" fill="var(--paper)"/>
    <path d="M262,140 q28,0 28,25 q0,25 -28,25" fill="none" stroke="var(--coffee)" stroke-width="10"/>
    <path d="M185,60 q-10,-20 0,-35" fill="none" stroke="var(--taupe)" stroke-opacity="0.6" stroke-width="6" stroke-linecap="round"/>
    <path d="M200,55 q-10,-22 0,-40" fill="none" stroke="var(--taupe)" stroke-opacity="0.6" stroke-width="6" stroke-linecap="round"/>
    <path d="M215,60 q-10,-20 0,-35" fill="none" stroke="var(--taupe)" stroke-opacity="0.6" stroke-width="6" stroke-linecap="round"/>
  </svg>`;
}

function svgNorthStar() {
  return `<svg viewBox="0 0 400 300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
    <rect width="400" height="300" fill="var(--navy)"/>
    <path d="M0,260 L60,235 L130,255 L190,225 L260,250 L330,230 L400,255 L400,300 L0,300 Z" fill="#16283f"/>
    <g fill="var(--sand)">
      <circle cx="60" cy="60" r="2.4"/><circle cx="120" cy="40" r="2"/><circle cx="90" cy="100" r="2.2"/>
      <circle cx="180" cy="70" r="2"/><circle cx="230" cy="45" r="2.4"/><circle cx="270" cy="90" r="2"/>
      <circle cx="330" cy="60" r="2.2"/><circle cx="360" cy="110" r="2"/><circle cx="40" cy="130" r="2"/>
      <circle cx="150" cy="130" r="2.2"/><circle cx="300" cy="140" r="2"/><circle cx="20" cy="80" r="2"/>
      <circle cx="380" cy="40" r="2.2"/><circle cx="250" cy="120" r="2"/>
    </g>
    <g fill="var(--amber)">
      <path d="M290,60 L300,105 L345,115 L300,125 L290,170 L280,125 L235,115 L280,105 Z"/>
    </g>
  </svg>`;
}

function svgConfetti() {
  const shapes = [
    ['circle', 50, 40, 6, 'var(--caramel)'], ['circle', 340, 55, 5, 'var(--navy)'],
    ['circle', 120, 90, 5, 'var(--brick)'], ['circle', 260, 35, 6, 'var(--leaf)'],
    ['circle', 200, 110, 5, 'var(--amber)'], ['circle', 80, 160, 6, 'var(--navy)'],
    ['circle', 360, 150, 5, 'var(--caramel)'], ['circle', 20, 220, 5, 'var(--brick)'],
    ['circle', 300, 200, 6, 'var(--leaf)'], ['circle', 160, 230, 5, 'var(--amber)'],
    ['rect', 150, 55, 12, 'var(--brick)', 20], ['rect', 220, 150, 12, 'var(--navy)', -15],
    ['rect', 40, 110, 12, 'var(--leaf)', 35], ['rect', 320, 100, 12, 'var(--amber)', -25],
    ['rect', 100, 200, 12, 'var(--caramel)', 15], ['rect', 260, 240, 12, 'var(--brick)', -35],
    ['rect', 370, 220, 12, 'var(--leaf)', 20], ['rect', 10, 60, 12, 'var(--amber)', -20],
    ['rect', 190, 20, 12, 'var(--navy)', 30], ['rect', 340, 260, 12, 'var(--caramel)', -10],
  ];
  const parts = shapes.map(s => {
    if (s[0] === 'circle') return `<circle cx="${s[1]}" cy="${s[2]}" r="${s[3]}" fill="${s[4]}"/>`;
    return `<rect x="${s[1]-6}" y="${s[2]-6}" width="12" height="12" fill="${s[4]}" transform="rotate(${s[5]} ${s[1]} ${s[2]})"/>`;
  }).join('');
  return `<svg viewBox="0 0 400 300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
    <rect width="400" height="300" fill="var(--cream)"/>
    ${parts}
    <path d="M60,270 q30,-20 60,0 t60,0" fill="none" stroke="var(--brick)" stroke-width="4" stroke-linecap="round"/>
    <path d="M220,60 q30,-20 60,0 t60,0" fill="none" stroke="var(--navy)" stroke-width="4" stroke-linecap="round"/>
    <path d="M20,150 q30,-20 60,0 t60,0" fill="none" stroke="var(--leaf)" stroke-width="4" stroke-linecap="round"/>
  </svg>`;
}

function svgRainbow() {
  return `<svg viewBox="0 0 400 300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
    <rect width="400" height="300" fill="var(--cream)"/>
    <path d="M20,280 A180,180 0 0 1 380,280" fill="none" stroke="var(--brick)" stroke-width="18" stroke-linecap="round"/>
    <path d="M50,280 A150,150 0 0 1 350,280" fill="none" stroke="var(--caramel)" stroke-width="18" stroke-linecap="round"/>
    <path d="M80,280 A120,120 0 0 1 320,280" fill="none" stroke="var(--amber)" stroke-width="18" stroke-linecap="round"/>
    <path d="M110,280 A90,90 0 0 1 290,280" fill="none" stroke="var(--leaf)" stroke-width="18" stroke-linecap="round"/>
    <g fill="var(--sage)">
      <ellipse cx="35" cy="278" rx="30" ry="16"/><ellipse cx="15" cy="270" rx="20" ry="12"/>
      <ellipse cx="365" cy="278" rx="30" ry="16"/><ellipse cx="385" cy="270" rx="20" ry="12"/>
    </g>
  </svg>`;
}

function svgLakeside() {
  return `<svg viewBox="0 0 400 300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
    <rect width="400" height="120" fill="var(--cream)"/>
    <circle cx="330" cy="55" r="26" fill="var(--amber)"/>
    <path d="M0,120 Q100,105 200,120 T400,120 V150 H0 Z" fill="var(--sage)"/>
    <path d="M40,140 L55,110 L70,140 Z" fill="var(--leaf)"/>
    <path d="M90,145 L103,118 L116,145 Z" fill="var(--leaf)"/>
    <path d="M0,150 Q100,170 200,150 T400,150 V230 H0 Z" fill="var(--navy)"/>
    <path d="M120,190 h30 M220,175 h26 M300,205 h24" stroke="var(--paper)" stroke-width="3" stroke-linecap="round"/>
    <path d="M0,230 Q120,215 240,230 T400,225 V300 H0 Z" fill="var(--sand)"/>
  </svg>`;
}

function svgBloom() {
  return `<svg viewBox="0 0 400 300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
    <rect width="400" height="300" fill="var(--paper)"/>
    <path d="M140,280 V150" stroke="var(--leaf)" stroke-width="6" fill="none"/>
    <path d="M200,280 V110" stroke="var(--leaf)" stroke-width="6" fill="none"/>
    <path d="M260,280 V170" stroke="var(--leaf)" stroke-width="6" fill="none"/>
    <path d="M140,220 q-20,-10 -30,5" stroke="var(--leaf)" stroke-width="5" fill="none"/>
    <path d="M260,230 q20,-10 30,5" stroke="var(--leaf)" stroke-width="5" fill="none"/>
    <g transform="translate(140,150)">
      <circle cx="-14" cy="-8" r="14" fill="var(--brick)"/><circle cx="14" cy="-8" r="14" fill="var(--brick)"/>
      <circle cx="0" cy="-24" r="14" fill="var(--brick)"/><circle cx="0" cy="8" r="14" fill="var(--brick)"/>
      <circle cx="-14" cy="24" r="14" fill="var(--brick)"/><circle cx="14" cy="24" r="14" fill="var(--brick)"/>
      <circle cx="0" cy="0" r="10" fill="var(--amber)"/>
    </g>
    <circle cx="260" cy="170" r="22" fill="var(--caramel)"/>
    <circle cx="260" cy="170" r="9" fill="var(--sand)"/>
    <path d="M200,110 q-16,20 0,45 q16,-25 0,-45 Z" fill="var(--blush)" stroke="var(--brick)" stroke-width="2"/>
  </svg>`;
}

function svgSunshine() {
  return `<svg viewBox="0 0 400 300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
    <rect width="400" height="300" fill="var(--cream)"/>
    <g stroke="var(--caramel)" stroke-width="10" stroke-linecap="round">
      <line x1="200" y1="150" x2="200" y2="60" transform="rotate(0 200 150)"/>
      <line x1="200" y1="150" x2="200" y2="60" transform="rotate(30 200 150)"/>
      <line x1="200" y1="150" x2="200" y2="60" transform="rotate(60 200 150)"/>
      <line x1="200" y1="150" x2="200" y2="60" transform="rotate(90 200 150)"/>
      <line x1="200" y1="150" x2="200" y2="60" transform="rotate(120 200 150)"/>
      <line x1="200" y1="150" x2="200" y2="60" transform="rotate(150 200 150)"/>
      <line x1="200" y1="150" x2="200" y2="60" transform="rotate(180 200 150)"/>
      <line x1="200" y1="150" x2="200" y2="60" transform="rotate(210 200 150)"/>
      <line x1="200" y1="150" x2="200" y2="60" transform="rotate(240 200 150)"/>
      <line x1="200" y1="150" x2="200" y2="60" transform="rotate(270 200 150)"/>
      <line x1="200" y1="150" x2="200" y2="60" transform="rotate(300 200 150)"/>
      <line x1="200" y1="150" x2="200" y2="60" transform="rotate(330 200 150)"/>
    </g>
    <circle cx="200" cy="150" r="55" fill="var(--amber)"/>
    <circle cx="182" cy="140" r="4" fill="var(--roast)"/>
    <circle cx="218" cy="140" r="4" fill="var(--roast)"/>
    <path d="M178,162 q22,18 44,0" fill="none" stroke="var(--roast)" stroke-width="4" stroke-linecap="round"/>
  </svg>`;
}

const DESIGNS = {
  'sunrise':    { name: 'First Light',    fallbackMsg: 'rw4', svg: svgSunrise },
  'warm-cup':   { name: 'Warm Cup',       fallbackMsg: 'ty4', svg: svgWarmCup },
  'north-star': { name: 'North Star',     fallbackMsg: 'cg2', svg: svgNorthStar },
  'confetti':   { name: 'Confetti Day',   fallbackMsg: 'bh1', svg: svgConfetti },
  'rainbow':    { name: 'A Little Good',  fallbackMsg: 'jb3', svg: svgRainbow },
  'lakeside':   { name: 'Lakeside',       fallbackMsg: 'tm1', svg: svgLakeside },
  'bloom':      { name: 'Bloom',          fallbackMsg: 'to3', svg: svgBloom },
  'sunshine':   { name: 'Hello Sunshine', fallbackMsg: 'bd2', svg: svgSunshine },
};

// --- Name validation (shared by create.js and card.js) --------------------

const NAME_RE = /^[\p{L}][\p{L}\s'’.-]{0,23}$/u;
const NAME_BLOCKLIST = ['fuck','shit','bitch','cunt','nigg','fag','asshole','dick',
  'pussy','whore','slut','nazi','hitler','rape','kill yourself','kys'];

function sanitizeName(raw) {
  if (!raw) return '';
  const name = raw.trim().slice(0, 24);
  if (!NAME_RE.test(name)) return '';
  const lower = name.toLowerCase();
  if (NAME_BLOCKLIST.some(w => lower.includes(w))) return '';
  return name;
}
