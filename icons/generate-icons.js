// Node.js ile ikonları SVG'den PNG'ye dönüştürmek için
// Ama burada basit bir inline SVG data URI olarak saklayacağız.
// Chrome eklentileri PNG kabul eder, bu yüzden aşağıdaki script
// basit canvas tabanlı PNG üretir (tarayıcıda çalıştırılabilir).

const sizes = [16, 32, 48, 128];
const fs = require('fs');

function createIconSVG(size) {
  const r = Math.round(size * 0.15);
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
  <rect width="${size}" height="${size}" rx="${r}" fill="#6c63ff"/>
  <rect x="${size*0.25}" y="${size*0.15}" width="${size*0.5}" height="${size*0.12}" rx="${size*0.06}" fill="white" opacity="0.9"/>
  <rect x="${size*0.2}" y="${size*0.2}" width="${size*0.6}" height="${size*0.65}" rx="${size*0.06}" fill="white" opacity="0.15"/>
  <rect x="${size*0.28}" y="${size*0.35}" width="${size*0.44}" height="${size*0.06}" rx="${size*0.03}" fill="white" opacity="0.8"/>
  <rect x="${size*0.28}" y="${size*0.48}" width="${size*0.35}" height="${size*0.06}" rx="${size*0.03}" fill="white" opacity="0.8"/>
  <rect x="${size*0.28}" y="${size*0.61}" width="${size*0.39}" height="${size*0.06}" rx="${size*0.03}" fill="white" opacity="0.8"/>
</svg>`;
}

sizes.forEach(size => {
  const svg = createIconSVG(size);
  fs.writeFileSync(`icon${size}.svg`, svg);
  console.log(`Created icon${size}.svg`);
});
