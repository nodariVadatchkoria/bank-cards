const fs = require('fs');
const path = require('path');

// Card designs with SVG patterns
const cardDesigns = {
  'midnight-gradient': {
    background: 'linear-gradient(135deg, #1a1a2e, #16213e, #0f3460)',
    logo: 'VISA',
    logoColor: 'white'
  },
  'aurora-foil': {
    background: 'linear-gradient(135deg, #ff6b6b, #4ecdc4, #45b7d1, #96ceb4, #feca57)',
    logo: 'MasterCard',
    logoColor: 'white'
  },
  'abstract-waves': {
    background: 'linear-gradient(135deg, #667eea, #764ba2, #f093fb)',
    logo: 'MasterCard',
    logoColor: 'white'
  },
  'gold-foil': {
    background: 'linear-gradient(135deg, #ffd700, #ffed4e, #f39c12)',
    logo: 'VISA',
    logoColor: '#1a1a1a'
  },
  'blue-pattern': {
    background: 'linear-gradient(135deg, #74b9ff, #0984e3, #00b894)',
    logo: 'MasterCard',
    logoColor: 'white'
  },
  'emerald-luxury': {
    background: 'linear-gradient(135deg, #00b894, #00cec9, #55a3ff)',
    logo: 'VISA',
    logoColor: 'white'
  },
  'rose-gold-elite': {
    background: 'linear-gradient(135deg, #fd79a8, #fdcb6e, #e17055)',
    logo: 'MasterCard',
    logoColor: 'white'
  },
  'carbon-black': {
    background: 'linear-gradient(135deg, #2d3436, #636e72, #74b9ff)',
    logo: 'VISA',
    logoColor: 'white'
  }
};

function generateCardSVG(design, id) {
  const { background, logo, logoColor } = design;
  
  return `<svg width="400" height="252" viewBox="0 0 400 252" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <style>
        .card-bg { fill: url(#gradient-${id}); }
        .logo-text { font-family: Arial, sans-serif; font-weight: bold; font-size: 18px; fill: ${logoColor}; }
        .card-number { font-family: 'Courier New', monospace; font-size: 14px; fill: ${logoColor}; opacity: 0.9; }
        .card-name { font-family: Arial, sans-serif; font-size: 10px; fill: ${logoColor}; opacity: 0.8; text-transform: uppercase; }
      </style>
      <linearGradient id="gradient-${id}" x1="0%" y1="0%" x2="100%" y2="100%">
        ${background.includes('linear-gradient') 
          ? background.match(/#[a-fA-F0-9]{6}/g)?.map((color, i, arr) => 
              `<stop offset="${(i / (arr.length - 1)) * 100}%" style="stop-color:${color}"/>`)?.join('') || ''
          : `<stop offset="0%" style="stop-color:${background}"/>`}
      </linearGradient>
      <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="2" dy="4" stdDeviation="3" flood-opacity="0.3"/>
      </filter>
    </defs>
    
    <!-- Card background with rounded corners -->
    <rect x="8" y="8" width="384" height="236" rx="12" ry="12" class="card-bg" filter="url(#shadow)"/>
    
    <!-- Logo -->
    <text x="320" y="40" class="logo-text" text-anchor="middle">${logo}</text>
    
    <!-- Chip -->
    <rect x="40" y="80" width="32" height="24" rx="4" ry="4" fill="${logoColor}" opacity="0.9"/>
    <rect x="44" y="84" width="24" height="16" rx="2" ry="2" fill="${background.includes('#') ? background : '#666'}" opacity="0.3"/>
    
    <!-- Card number -->
    <text x="40" y="140" class="card-number">•••• •••• •••• 1234</text>
    
    <!-- Cardholder name -->
    <text x="40" y="170" class="card-name">Card Holder</text>
    
    <!-- Expiry -->
    <text x="40" y="190" class="card-name">12/28</text>
    
    <!-- Network logo area -->
    ${logo === 'MasterCard' 
      ? `<g transform="translate(320, 180)">
           <circle cx="-8" cy="0" r="12" fill="#eb001b" opacity="0.9"/>
           <circle cx="8" cy="0" r="12" fill="#f79e1b" opacity="0.9"/>
         </g>`
      : `<g transform="translate(320, 180)">
           <rect x="-20" y="-8" width="40" height="16" rx="2" fill="${logoColor}" opacity="0.9"/>
           <text x="0" y="2" text-anchor="middle" font-family="Arial" font-size="8" font-weight="bold" fill="${background.includes('#2d') ? '#2d3436' : '#1a1a2e'}">VISA</text>
         </g>`}
  </svg>`;
}

// Create cards directory if it doesn't exist
const cardsDir = path.join(__dirname, '../public/cards');
if (!fs.existsSync(cardsDir)) {
  fs.mkdirSync(cardsDir, { recursive: true });
}

// Generate SVG files for each card
Object.entries(cardDesigns).forEach(([id, design]) => {
  const svg = generateCardSVG(design, id);
  const filePath = path.join(cardsDir, `${id}.svg`);
  fs.writeFileSync(filePath, svg);
  console.log(`Generated ${id}.svg`);
});

console.log('All card images generated successfully!');
