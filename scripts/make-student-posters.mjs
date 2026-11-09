// Writes the three student sign-in posters (A3 portrait, SVG), one per programme. Each has the address, and under it
// a QR code of the same address with a short plain caption.
// Run from the project folder:  node scripts/make-student-posters.mjs
import { writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import QRCode from 'qrcode';

const outDir = join(dirname(fileURLToPath(import.meta.url)), '..', 'docs', 'student-login');
mkdirSync(outDir, { recursive: true });

const PROGRAMMES = [
  { file: 'poster-igcse.svg', name: 'IGCSE Хими 0620', en: 'IGCSE Chemistry 0620', url: 'https://ulziikhutagbatchimeg-cpu.github.io/123/', color: '#059669', soft: '#ecfdf5' },
  { file: 'poster-as.svg', name: 'AS Level Хими 9701', en: 'AS Level Chemistry 9701', url: 'https://ulziikhutagbatchimeg-cpu.github.io/123-as-9701/', color: '#2563eb', soft: '#eff6ff' },
  { file: 'poster-a.svg', name: 'A Level Хими 9701', en: 'A Level Chemistry 9701', url: 'https://ulziikhutagbatchimeg-cpu.github.io/123-a-9701/', color: '#7c3aed', soft: '#f5f3ff' }
];

const STEPS = [
  { head: 'Хаягаар орно', lines: ['Хөтчид хаягийг бичнэ, эсвэл доорх QR-ийг скан хийнэ.'] },
  { head: 'Бүртгүүлнэ (анх удаа)', lines: ['Имэйл, нууц үг (дор хаяж 6 тэмдэгт).', 'Анх удаа бол «Бүртгүүлэх», дараа нь «Нэвтрэх».'] },
  { head: 'Овог нэр, анги', lines: ['Овог, нэрээ бүтнээр бичиж ангиа сонгоно.', '«Элсэх хүсэлт илгээх» дарна.'] },
  { head: 'Багш зөвшөөрнө', lines: ['Багш хүсэлтийг зөвшөөрсний дараа', 'хичээлүүд автоматаар нээгдэнэ.'] },
  { head: 'Өөрийн үнэлгээ', lines: ['5 асуултыг 1–5-аар үнэлнэ.', 'Дууссаны дараа хичээл нээгдэнэ.'] },
  { head: 'Хичээлээ эхлэнэ', lines: ['Хичээл, слайд, дасгал, алдааны сан.'] }
];

const NOTES = [
  'Нэг бүртгэл гурван хөтөлбөрт; хөтөлбөр бүрт тусад нь элсэнэ.',
  'Нууц үг мартвал «Нууц үг мартсан» дарж имэйлээ шалгана уу.',
  'Асуудал гарвал багштайгаа холбогдоно уу.'
];

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

// The QR code as one SVG path with a quiet zone, inside a white box of size `box` at (x, y)
const qrGroup = (url, x, y, box) => {
  const qr = QRCode.create(url, { errorCorrectionLevel: 'M' });
  const n = qr.modules.size;
  const data = qr.modules.data;
  const quiet = 4;
  const cell = box / (n + quiet * 2);
  let d = '';
  for (let r = 0; r < n; r++) {
    for (let c = 0; c < n; c++) {
      if (data[r * n + c]) d += `M${(c + quiet) * cell} ${(r + quiet) * cell}h${cell}v${cell}h${-cell}z`;
    }
  }
  return `<g transform="translate(${x} ${y})"><rect width="${box}" height="${box}" fill="#ffffff"/><path d="${d}" fill="#0f172a" shape-rendering="crispEdges"/></g>`;
};

const poster = (p) => {
  const W = 1190;
  const H = 1684;
  const parts = [];
  parts.push(`<rect x="0" y="0" width="${W}" height="${H}" fill="#ffffff"/>`);
  // header band: the title and the programme
  parts.push(`<rect x="0" y="0" width="${W}" height="240" fill="${p.color}"/>`);
  parts.push(`<text x="80" y="84" font-size="56" font-weight="800" fill="#ffffff">Суралцагчид нэвтрэх заавар</text>`);
  parts.push(`<text x="80" y="150" font-size="42" font-weight="700" fill="#ffffff">${esc(p.name)}</text>`);
  parts.push(`<text x="80" y="202" font-size="24" fill="#ffffff" fill-opacity="0.9">${esc(p.en)} · Student sign-in guide</text>`);
  // address box
  parts.push(`<rect x="80" y="270" width="1030" height="92" rx="18" fill="${p.soft}" stroke="${p.color}" stroke-width="3"/>`);
  parts.push(`<text x="110" y="305" font-size="26" font-weight="700" fill="#475569">Хаяг · Address</text>`);
  // the address in one line: a long one gets a smaller size so it stays inside the box (about 1000 units of room)
  const urlSize = Math.min(34, Math.floor(1000 / (p.url.length * 0.6)));
  parts.push(`<text x="110" y="340" font-size="${urlSize}" font-weight="800" fill="${p.color}">${esc(p.url)}</text>`);
  // the QR code under the address, with a plain caption beside it
  parts.push(qrGroup(p.url, 80, 392, 190));
  parts.push(`<text x="300" y="462" font-size="40" font-weight="800" fill="#0f172a">Скан хийж нээнэ</text>`);
  parts.push(`<text x="300" y="508" font-size="28" fill="#334155">Утсаараа QR-ийг скан хийвэл</text>`);
  parts.push(`<text x="300" y="546" font-size="28" fill="#334155">энэ хаяг шууд нээгдэнэ.</text>`);
  // steps
  let y = 630;
  STEPS.forEach((s, i) => {
    parts.push(`<circle cx="130" cy="${y + 52}" r="50" fill="${p.color}"/>`);
    parts.push(`<text x="130" y="${y + 68}" font-size="50" font-weight="800" fill="#ffffff" text-anchor="middle">${i + 1}</text>`);
    parts.push(`<text x="225" y="${y + 40}" font-size="44" font-weight="800" fill="#0f172a">${esc(s.head)}</text>`);
    s.lines.forEach((ln, j) => {
      parts.push(`<text x="225" y="${y + 90 + j * 40}" font-size="30" fill="#334155">${esc(ln)}</text>`);
    });
    if (i < STEPS.length - 1) {
      parts.push(`<line x1="130" y1="${y + 106}" x2="130" y2="${y + 131}" stroke="#cbd5e1" stroke-width="4"/>`);
    }
    y += 135;
  });
  // notes
  parts.push(`<rect x="80" y="1460" width="1030" height="184" rx="18" fill="#f8fafc" stroke="#cbd5e1" stroke-width="2"/>`);
  parts.push(`<text x="110" y="1506" font-size="36" font-weight="800" fill="#0f172a">Анхаарах</text>`);
  NOTES.forEach((n, j) => {
    parts.push(`<text x="110" y="${1548 + j * 38}" font-size="28" fill="#334155">• ${esc(n)}</text>`);
  });
  // footer
  parts.push(`<text x="80" y="1672" font-size="24" fill="#64748b">Cambridge Chemistry Study Hub · ${esc(p.name)}</text>`);

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" font-family="system-ui, 'Segoe UI', Arial, sans-serif">
${parts.join('\n')}
</svg>
`;
};

for (const p of PROGRAMMES) {
  writeFileSync(join(outDir, p.file), poster(p), 'utf8');
  console.log('wrote', p.file);
}
