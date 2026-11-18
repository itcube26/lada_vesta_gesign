import { jsPDF } from 'jspdf';
import {
  BODY_VARIANTS,
  CMF_MATERIALS,
  COLLECTION_PALETTE,
  EXTERIOR_SPECS,
  GENERATED_ASSETS,
  USER_SCENARIO_STEPS,
} from '../data/collectionData';
import type { PresentationAuthor } from '../components/SlideDeck';
import { downloadBlob } from './exportImage';

const SLIDE_W = 1920;
const SLIDE_H = 1080;

interface LoadedImages {
  exterior34: HTMLImageElement;
  trunkSpoiler: HTMLImageElement;
  details: HTMLImageElement;
  variants: HTMLImageElement;
  interior: HTMLImageElement;
  cmf: HTMLImageElement;
  printedParts: HTMLImageElement;
  stickerSheets: HTMLImageElement;
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error(`Не удалось загрузить изображение: ${src}`));
    img.src = src;
  });
}

async function loadAllAssets(): Promise<LoadedImages> {
  const [
    exterior34,
    trunkSpoiler,
    details,
    variants,
    interior,
    cmf,
    printedParts,
    stickerSheets,
  ] = await Promise.all([
    loadImage(GENERATED_ASSETS.exteriorThreeQuarter),
    loadImage(GENERATED_ASSETS.trunkSpoilerView),
    loadImage(GENERATED_ASSETS.exteriorDetails),
    loadImage(GENERATED_ASSETS.colorVariants),
    loadImage(GENERATED_ASSETS.interiorCabin),
    loadImage(GENERATED_ASSETS.cmfMaterials),
    loadImage(GENERATED_ASSETS.printedParts),
    loadImage(GENERATED_ASSETS.stickerSheets),
  ]);
  return {
    exterior34,
    trunkSpoiler,
    details,
    variants,
    interior,
    cmf,
    printedParts,
    stickerSheets,
  };
}

function drawRoundedRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number
) {
  ctx.beginPath();
  ctx.roundRect(x, y, w, h, r);
  ctx.closePath();
}

function drawImageCover(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  x: number,
  y: number,
  w: number,
  h: number,
  radius = 0
) {
  ctx.save();
  if (radius > 0) {
    drawRoundedRect(ctx, x, y, w, h, radius);
    ctx.clip();
  }
  const imgRatio = img.naturalWidth / img.naturalHeight;
  const boxRatio = w / h;
  let drawW = w;
  let drawH = h;
  let offsetX = x;
  let offsetY = y;

  if (imgRatio > boxRatio) {
    drawH = h;
    drawW = h * imgRatio;
    offsetX = x - (drawW - w) / 2;
  } else {
    drawW = w;
    drawH = w / imgRatio;
    offsetY = y - (drawH - h) / 2;
  }
  ctx.drawImage(img, offsetX, offsetY, drawW, drawH);
  ctx.restore();
}

function drawWrappedText(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  maxWidth: number,
  lineHeight: number
): number {
  const words = text.split(' ');
  let line = '';
  let currentY = y;

  for (let i = 0; i < words.length; i++) {
    const testLine = line ? `${line} ${words[i]}` : words[i];
    const metrics = ctx.measureText(testLine);
    if (metrics.width > maxWidth && line) {
      ctx.fillText(line, x, currentY);
      line = words[i];
      currentY += lineHeight;
    } else {
      line = testLine;
    }
  }
  if (line) {
    ctx.fillText(line, x, currentY);
    currentY += lineHeight;
  }
  return currentY;
}

function drawSlideHeader(
  ctx: CanvasRenderingContext2D,
  kicker: string,
  title: string,
  rightLabel: string,
  dark = false
) {
  const fg = dark ? '#FFFFFF' : '#111317';
  const border = dark ? 'rgba(255,255,255,0.16)' : '#E4E7EC';
  const accent = dark ? '#C8F135' : '#1D4ED8';

  ctx.fillStyle = dark ? '#C8F135' : '#555B66';
  ctx.font = '600 20px "JetBrains Mono", monospace';
  ctx.fillText(kicker, 88, 92);

  ctx.fillStyle = fg;
  ctx.font = '800 42px "Manrope", sans-serif';
  ctx.fillText(title, 88, 148);

  ctx.save();
  ctx.textAlign = 'right';
  ctx.fillStyle = accent;
  ctx.font = '600 20px "JetBrains Mono", monospace';
  ctx.fillText(rightLabel, SLIDE_W - 88, 144);
  ctx.restore();

  ctx.strokeStyle = border;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(88, 178);
  ctx.lineTo(SLIDE_W - 88, 178);
  ctx.stroke();
}

function drawSlideFooter(
  ctx: CanvasRenderingContext2D,
  leftText: string,
  rightText: string,
  dark = false
) {
  const border = dark ? 'rgba(255,255,255,0.16)' : '#E4E7EC';
  const muted = dark ? '#9CA3AF' : '#555B66';

  ctx.strokeStyle = border;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(88, SLIDE_H - 96);
  ctx.lineTo(SLIDE_W - 88, SLIDE_H - 96);
  ctx.stroke();

  ctx.fillStyle = muted;
  ctx.font = '500 20px "Plus Jakarta Sans", sans-serif';
  ctx.fillText(leftText, 88, SLIDE_H - 54);

  ctx.save();
  ctx.textAlign = 'right';
  ctx.font = '500 20px "JetBrains Mono", monospace';
  ctx.fillText(rightText, SLIDE_W - 88, SLIDE_H - 54);
  ctx.restore();
}

function drawCard(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  bg = '#F8F9FB',
  border = '#E4E7EC',
  r = 20
) {
  ctx.fillStyle = bg;
  drawRoundedRect(ctx, x, y, w, h, r);
  ctx.fill();
  ctx.strokeStyle = border;
  ctx.lineWidth = 2;
  ctx.stroke();
}

export function drawEnjoyProMockup(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number
) {
  drawCard(ctx, x, y, w, h, '#181A1F', '#2D323B', 32);
  const pad = 16;
  const sx = x + pad;
  const sy = y + pad;
  const sw = w - pad * 2;
  const sh = h - pad * 2;
  drawCard(ctx, sx, sy, sw, sh, '#0E1116', '#2A313D', 22);

  ctx.fillStyle = '#F8FAFC';
  ctx.font = '600 18px "JetBrains Mono", monospace';
  ctx.fillText('18:45', sx + 22, sy + 38);
  ctx.fillStyle = '#C8F135';
  ctx.font = '700 16px "Manrope", sans-serif';
  ctx.fillText('EnjoY Pro · PULSE', sx + 96, sy + 38);

  drawCard(ctx, sx + 18, sy + 58, sw - 36, 250, '#171B23', '#2A313D', 18);
  ctx.strokeStyle = 'rgba(148,163,184,0.25)';
  ctx.lineWidth = 1.5;
  for (let gx = sx + 60; gx < sx + sw - 40; gx += 65) {
    ctx.beginPath();
    ctx.moveTo(gx, sy + 68);
    ctx.lineTo(gx, sy + 295);
    ctx.stroke();
  }
  for (let gy = sy + 100; gy < sy + 295; gy += 55) {
    ctx.beginPath();
    ctx.moveTo(sx + 30, gy);
    ctx.lineTo(sx + sw - 30, gy);
    ctx.stroke();
  }
  ctx.strokeStyle = '#C8F135';
  ctx.lineWidth = 6;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
  ctx.beginPath();
  ctx.moveTo(sx + 95, sy + 260);
  ctx.lineTo(sx + 165, sy + 200);
  ctx.lineTo(sx + 165, sy + 145);
  ctx.lineTo(sx + 265, sy + 110);
  ctx.stroke();

  ctx.fillStyle = '#3B82F6';
  ctx.beginPath();
  ctx.arc(sx + 95, sy + 260, 8, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#C8F135';
  ctx.beginPath();
  ctx.arc(sx + 265, sy + 110, 9, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = '#F8FAFC';
  ctx.font = '600 17px "Manrope", sans-serif';
  ctx.fillText('350 м · ул. Революционная', sx + 34, sy + 92);
  ctx.fillStyle = '#C8F135';
  ctx.font = '600 15px "JetBrains Mono", monospace';
  ctx.fillText('14 мин · 6.4 км · 18:59', sx + 34, sy + 292);

  drawCard(ctx, sx + 18, sy + 324, sw - 36, 112, '#171B23', '#2A313D', 18);
  drawCard(ctx, sx + 34, sy + 342, 76, 76, '#0E1116', '#C8F135', 14);
  ctx.strokeStyle = '#C8F135';
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.moveTo(sx + 52, sy + 360);
  ctx.lineTo(sx + 92, sy + 400);
  ctx.moveTo(sx + 92, sy + 360);
  ctx.lineTo(sx + 52, sy + 400);
  ctx.stroke();

  ctx.fillStyle = '#F8FAFC';
  ctx.font = '700 20px "Manrope", sans-serif';
  ctx.fillText('Ночной Проспект', sx + 128, sy + 372);
  ctx.fillStyle = '#94A3B8';
  ctx.font = '500 15px "Plus Jakarta Sans", sans-serif';
  ctx.fillText('PULSE FM · 124 BPM', sx + 128, sy + 398);

  const halfW = (sw - 50) / 2;
  drawCard(ctx, sx + 18, sy + 452, halfW, 108, '#171B23', '#2A313D', 16);
  ctx.fillStyle = '#94A3B8';
  ctx.font = '600 13px "Plus Jakarta Sans", sans-serif';
  ctx.fillText('РЕЖИМ', sx + 34, sy + 482);
  ctx.fillStyle = '#C8F135';
  ctx.font = '800 20px "Manrope", sans-serif';
  ctx.fillText('ПУЛЬС', sx + 34, sy + 516);
  ctx.fillStyle = '#F8FAFC';
  ctx.font = '500 14px "JetBrains Mono", monospace';
  ctx.fillText('ECO 94%', sx + 34, sy + 542);

  drawCard(ctx, sx + 32 + halfW, sy + 452, halfW, 108, '#171B23', '#2A313D', 16);
  ctx.fillStyle = '#94A3B8';
  ctx.font = '600 13px "Plus Jakarta Sans", sans-serif';
  ctx.fillText('ГАДЖЕТ', sx + 48 + halfW, sy + 482);
  ctx.fillStyle = '#F8FAFC';
  ctx.font = '700 19px "Manrope", sans-serif';
  ctx.fillText('Смартфон', sx + 48 + halfW, sy + 516);
  ctx.fillStyle = '#3B82F6';
  ctx.font = '500 14px "JetBrains Mono", monospace';
  ctx.fillText('SYNC 88%', sx + 48 + halfW, sy + 542);

  drawCard(ctx, sx + 18, sy + 576, sw - 36, 78, '#171B23', '#2A313D', 16);
  ctx.fillStyle = '#F8FAFC';
  ctx.font = '700 28px "JetBrains Mono", monospace';
  ctx.fillText('21.5°', sx + 38, sy + 622);
  ctx.fillStyle = '#94A3B8';
  ctx.font = '500 14px "Plus Jakarta Sans", sans-serif';
  ctx.fillText('КЛИМАТ · НАВИ · МЕДИА · АВТО', sx + 135, sy + 620);
}

export function drawClusterMockup(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number
) {
  drawCard(ctx, x, y, w, h, '#14171D', '#2D323B', 28);
  const pad = 18;
  const sx = x + pad;
  const sy = y + pad;
  const sw = w - pad * 2;
  const sh = h - pad * 2;
  drawCard(ctx, sx, sy, sw, sh, '#0E1116', '#2A313D', 20);

  ctx.fillStyle = '#94A3B8';
  ctx.font = '600 18px "JetBrains Mono", monospace';
  ctx.fillText('18:45 · +18°C', sx + 36, sy + 42);
  ctx.save();
  ctx.textAlign = 'center';
  ctx.fillStyle = '#C8F135';
  ctx.font = '700 18px "Manrope", sans-serif';
  ctx.fillText('LADA VESTA PULSE · РЕЖИМ «ГОРОД»', sx + sw / 2, sy + 42);
  ctx.textAlign = 'right';
  ctx.fillStyle = '#F8FAFC';
  ctx.fillText('ЗАПАС 480 КМ', sx + sw - 36, sy + 42);
  ctx.restore();

  const leftCx = sx + 210;
  const cy = sy + sh / 2 + 6;
  ctx.strokeStyle = '#2A313D';
  ctx.lineWidth = 14;
  ctx.lineCap = 'round';
  ctx.beginPath();
  ctx.arc(leftCx, cy, 128, Math.PI * 0.65, Math.PI * 1.85);
  ctx.stroke();

  ctx.strokeStyle = '#C8F135';
  ctx.beginPath();
  ctx.arc(leftCx, cy, 128, Math.PI * 0.65, Math.PI * 1.42);
  ctx.stroke();

  ctx.save();
  ctx.textAlign = 'center';
  ctx.fillStyle = '#F8FAFC';
  ctx.font = '700 72px "JetBrains Mono", monospace';
  ctx.fillText('64', leftCx, cy + 16);
  ctx.fillStyle = '#94A3B8';
  ctx.font = '600 18px "Manrope", sans-serif';
  ctx.fillText('КМ/Ч', leftCx, cy + 52);
  ctx.restore();

  const midW = 310;
  const midX = sx + (sw - midW) / 2;
  drawCard(ctx, midX, sy + 76, midW, sh - 140, '#171B23', '#2A313D', 18);
  ctx.strokeStyle = '#3B82F6';
  ctx.lineWidth = 3;
  ctx.setLineDash([10, 8]);
  ctx.beginPath();
  ctx.moveTo(midX + 95, sy + 145);
  ctx.lineTo(midX + 42, sy + sh - 85);
  ctx.moveTo(midX + midW - 95, sy + 145);
  ctx.lineTo(midX + midW - 42, sy + sh - 85);
  ctx.stroke();
  ctx.setLineDash([]);

  drawCard(ctx, midX + midW / 2 - 32, sy + 185, 64, 108, '#0E1116', '#C8F135', 16);
  ctx.save();
  ctx.textAlign = 'center';
  ctx.fillStyle = '#F8FAFC';
  ctx.font = '700 18px "Manrope", sans-serif';
  ctx.fillText('350 м налево', sx + sw / 2, sy + 114);
  ctx.fillStyle = '#94A3B8';
  ctx.font = '500 15px "Plus Jakarta Sans", sans-serif';
  ctx.fillText('ул. Революционная', sx + sw / 2, sy + 138);
  ctx.restore();

  const rightCx = sx + sw - 210;
  ctx.strokeStyle = '#2A313D';
  ctx.lineWidth = 14;
  ctx.beginPath();
  ctx.arc(rightCx, cy, 128, Math.PI * 1.15, Math.PI * 2.35);
  ctx.stroke();

  ctx.strokeStyle = '#3B82F6';
  ctx.beginPath();
  ctx.arc(rightCx, cy, 128, Math.PI * 1.15, Math.PI * 1.78);
  ctx.stroke();

  ctx.save();
  ctx.textAlign = 'center';
  ctx.fillStyle = '#F8FAFC';
  ctx.font = '700 62px "JetBrains Mono", monospace';
  ctx.fillText('2.4', rightCx, cy + 16);
  ctx.fillStyle = '#94A3B8';
  ctx.font = '600 16px "Manrope", sans-serif';
  ctx.fillText('ОБ/МИН ×1000', rightCx, cy + 50);
  ctx.fillStyle = '#C8F135';
  ctx.font = '700 18px "JetBrains Mono", monospace';
  ctx.fillText('ПЕРЕДАЧА D4', rightCx, cy + 96);
  ctx.restore();
}

function renderSlideToCanvas(
  slideNum: number,
  images: LoadedImages,
  author: PresentationAuthor
): HTMLCanvasElement {
  const canvas = document.createElement('canvas');
  canvas.width = SLIDE_W;
  canvas.height = SLIDE_H;
  const ctx = canvas.getContext('2d')!;

  ctx.fillStyle = '#FFFFFF';
  ctx.fillRect(0, 0, SLIDE_W, SLIDE_H);

  switch (slideNum) {
    case 1: {
      ctx.fillStyle = '#111317';
      ctx.fillRect(0, 0, SLIDE_W, SLIDE_H);
      drawImageCover(ctx, images.exterior34, 760, 0, 1160, SLIDE_H);
      const grad = ctx.createLinearGradient(740, 0, 1180, 0);
      grad.addColorStop(0, '#111317');
      grad.addColorStop(1, 'rgba(17,19,23,0)');
      ctx.fillStyle = grad;
      ctx.fillRect(740, 0, 440, SLIDE_H);

      ctx.fillStyle = '#9CA3AF';
      ctx.font = '600 22px "Plus Jakarta Sans", sans-serif';
      ctx.fillText('Инженеры транспорта · Первые × АВТОВАЗ', 96, 110);

      ctx.fillStyle = '#C8F135';
      ctx.fillRect(96, 175, 110, 8);

      ctx.fillStyle = '#FFFFFF';
      ctx.font = '800 80px "Manrope", sans-serif';
      ctx.fillText('LADA VESTA', 96, 285);
      ctx.fillText('PULSE', 96, 372);

      ctx.fillStyle = '#D1D5DB';
      ctx.font = '500 28px "Plus Jakarta Sans", sans-serif';
      drawWrappedText(
        ctx,
        'Мой проект тюнинга LADA Vesta NG Седан: 3D-печать деталей и наклейки с официального сайта',
        96,
        445,
        660,
        42
      );

      ctx.strokeStyle = 'rgba(255,255,255,0.18)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(96, 740);
      ctx.lineTo(740, 740);
      ctx.stroke();

      const rows = [
        ['Машина', 'LADA Vesta NG Седан', '#FFFFFF'],
        ['Участник', author.fio, '#FFFFFF'],
        ['Команда / Школа', `${author.team} · ${author.school}`, '#D1D5DB'],
        ['Город · Год', `${author.city} · 2026`, '#C8F135'],
      ] as const;

      rows.forEach(([label, val, col], idx) => {
        const ry = 795 + idx * 54;
        ctx.fillStyle = '#9CA3AF';
        ctx.font = '500 22px "Plus Jakarta Sans", sans-serif';
        ctx.fillText(label, 96, ry);
        ctx.save();
        ctx.textAlign = 'right';
        ctx.fillStyle = col;
        ctx.font = '600 22px "Manrope", sans-serif';
        ctx.fillText(val, 740, ry);
        ctx.restore();
      });
      break;
    }

    case 2: {
      drawSlideHeader(
        ctx,
        'Слайд 02 / 10 · Мудборд и главная идея',
        'Моя идея: 3D-принтер + наклейки с сайта',
        'Для молодых водителей'
      );

      const cards = [
        [
          '01. 3D-печать (.STL)',
          'Детали своими руками',
          'Спойлер, шильдик, заглушки дисков и подставку под телефон можно скачать с сайта и напечатать из PETG.',
        ],
        [
          '02. Наклейки',
          'Полосы и акулы',
          'Готовые листы виниловых полос под ИКС-форму дверей, стикеры «Акула» и полоски на диски.',
        ],
        [
          '03. Наш сайт',
          'Бесплатные модели',
          'Владелец заходит на сайт, скачивает нужные .STL и макеты наклеек — и ничего не нужно перекрашивать.',
        ],
      ];

      cards.forEach(([k, t, d], idx) => {
        const cx = 88 + idx * 336;
        drawCard(ctx, cx, 215, 314, 330);
        ctx.fillStyle = '#1D4ED8';
        ctx.font = '600 18px "JetBrains Mono", monospace';
        ctx.fillText(k, cx + 26, 260);
        ctx.fillStyle = '#111317';
        ctx.font = '700 24px "Manrope", sans-serif';
        ctx.fillText(t, cx + 26, 304);
        ctx.fillStyle = '#555B66';
        ctx.font = '400 19px "Plus Jakarta Sans", sans-serif';
        drawWrappedText(ctx, d, cx + 26, 350, 262, 28);
      });

      drawCard(ctx, 88, 575, 986, 365);
      ctx.fillStyle = '#555B66';
      ctx.font = '600 20px "Plus Jakarta Sans", sans-serif';
      ctx.fillText('Какие цвета я выбрал (для пластика и наклеек)', 116, 622);

      COLLECTION_PALETTE.forEach((token, idx) => {
        const sx = 116 + idx * 238;
        ctx.fillStyle = token.hex;
        drawRoundedRect(ctx, sx, 650, 216, 150, 14);
        ctx.fill();
        ctx.strokeStyle = 'rgba(0,0,0,0.12)';
        ctx.lineWidth = 2;
        ctx.stroke();

        ctx.fillStyle = '#111317';
        ctx.font = '700 20px "Manrope", sans-serif';
        ctx.fillText(token.name, sx, 838);
        ctx.fillStyle = '#555B66';
        ctx.font = '500 18px "JetBrains Mono", monospace';
        ctx.fillText(`${token.hex} · ${token.code}`, sx, 870);
      });

      drawImageCover(ctx, images.printedParts, 1106, 215, 726, 350, 20);
      drawImageCover(ctx, images.stickerSheets, 1106, 590, 726, 350, 20);

      drawSlideFooter(
        ctx,
        'Просто, недорого и можно собрать дома или в школьном кружке',
        'LADA Vesta NG Седан · VESTA PULSE'
      );
      break;
    }

    case 3: {
      drawSlideHeader(
        ctx,
        'Слайд 03 / 10 · Экстерьер автомобиля',
        'Как машина выглядит снаружи: наклейки и 3D-спойлер',
        'Спереди и сзади'
      );

      drawImageCover(ctx, images.exterior34, 88, 212, 1080, 730, 22);
      drawImageCover(ctx, images.trunkSpoiler, 1200, 212, 632, 430, 22);

      drawCard(ctx, 1200, 670, 632, 272);
      ctx.fillStyle = '#1D4ED8';
      ctx.font = '600 20px "JetBrains Mono", monospace';
      ctx.fillText('Что я добавил снаружи', 1234, 718);
      ctx.fillStyle = '#555B66';
      ctx.font = '400 22px "Plus Jakarta Sans", sans-serif';
      drawWrappedText(
        ctx,
        'Полосы наклеены ровно по ИКС-линиям на дверях Весты, а сзади стоит напечатанный на 3D-принтере спойлер. Всё держится на 3M-скотче — кузов сверлить не надо.',
        1234,
        768,
        564,
        34
      );

      drawSlideFooter(
        ctx,
        'Машина сохраняет гарантию — все детали и плёнку можно снять',
        'Ракурсы 3/4 спереди и сзади'
      );
      break;
    }

    case 4: {
      drawSlideHeader(
        ctx,
        'Слайд 04 / 10 · Детали и 3D-печать (.STL)',
        'Мои 3D-детали: спойлер, шильдик, заглушки и зеркала',
        'Файлы .STL на сайте'
      );

      drawImageCover(ctx, images.printedParts, 88, 212, 960, 352, 20);
      drawImageCover(ctx, images.details, 88, 588, 960, 354, 20);

      EXTERIOR_SPECS.forEach((spec, idx) => {
        const sy = 212 + idx * 188;
        drawCard(ctx, 1080, sy, 752, 166);
        ctx.fillStyle = '#111317';
        ctx.font = '700 23px "Manrope", sans-serif';
        ctx.fillText(spec.part, 1112, sy + 44);

        ctx.save();
        ctx.textAlign = 'right';
        ctx.fillStyle = '#1D4ED8';
        ctx.font = '600 19px "JetBrains Mono", monospace';
        ctx.fillText(spec.code, 1800, sy + 44);
        ctx.restore();

        ctx.fillStyle = '#111317';
        ctx.font = '600 19px "Plus Jakarta Sans", sans-serif';
        ctx.fillText(spec.tech, 1112, sy + 82);

        ctx.fillStyle = '#555B66';
        ctx.font = '400 18px "Plus Jakarta Sans", sans-serif';
        drawWrappedText(ctx, spec.detail, 1112, sy + 118, 688, 26);
      });

      drawSlideFooter(
        ctx,
        'Все эти модельки можно скачать в .STL прямо на нашем сайте',
        'STL-01 · STL-02 · STL-03 · STL-04'
      );
      break;
    }

    case 5: {
      drawSlideHeader(
        ctx,
        'Слайд 05 / 10 · Проверка на 3 цветах',
        'Как наклейки смотрятся на белой, серой и синей Весте',
        'Белый · Серый · Синий'
      );

      drawImageCover(ctx, images.variants, 88, 212, 1744, 480, 22);

      BODY_VARIANTS.forEach((variant, idx) => {
        const vx = 88 + idx * 594;
        drawCard(ctx, vx, 718, 556, 226);

        ctx.fillStyle = variant.bodyHex;
        drawRoundedRect(ctx, vx + 28, 748, 36, 36, 8);
        ctx.fill();
        ctx.strokeStyle = 'rgba(0,0,0,0.2)';
        ctx.lineWidth = 2;
        ctx.stroke();

        ctx.fillStyle = '#111317';
        ctx.font = '700 24px "Manrope", sans-serif';
        ctx.fillText(variant.name, vx + 80, 774);

        ctx.fillStyle = '#1D4ED8';
        ctx.font = '600 17px "JetBrains Mono", monospace';
        ctx.fillText(variant.factoryColor, vx + 28, 814);

        ctx.fillStyle = '#555B66';
        ctx.font = '400 19px "Plus Jakarta Sans", sans-serif';
        drawWrappedText(ctx, variant.contrastNote, vx + 28, 854, 500, 27);
      });

      drawSlideFooter(
        ctx,
        'Один макет на плоттере подходит сразу на любой цвет кузова',
        'Белый · Тайфун · Кобальт'
      );
      break;
    }

    case 6: {
      drawSlideHeader(
        ctx,
        'Слайд 06 / 10 · Салон автомобиля',
        'Салон: чехлы, прострочка и 3D-подставка под телефон',
        'Интерьер'
      );

      drawImageCover(ctx, images.interior, 88, 212, 1150, 730, 22);

      const zones = [
        [
          '01. Сиденья',
          'Тёмная сетка + лайм',
          'По центру дышащая сетка, чтобы летом было не жарко, а по краям мягкая эко-замша с яркой ниткой.',
        ],
        [
          '02. Подставка (STL-05)',
          'Печатается на 3D-принтере',
          'Ставится на панель без клея, держит смартфон в дороге и имеет вырез снизу под кабель зарядки.',
        ],
        [
          '03. Двери и руль',
          'В одном стиле с кузовом',
          'Прострочка на дверях, руле и ковриках повторяет цвет наклеек на кузове.',
        ],
      ];

      zones.forEach(([k, t, d], idx) => {
        const by = 212 + idx * 252;
        drawCard(ctx, 1272, by, 560, 226);
        ctx.fillStyle = '#1D4ED8';
        ctx.font = '600 19px "JetBrains Mono", monospace';
        ctx.fillText(k, 1304, by + 46);
        ctx.fillStyle = '#111317';
        ctx.font = '700 24px "Manrope", sans-serif';
        ctx.fillText(t, 1304, by + 88);
        ctx.fillStyle = '#555B66';
        ctx.font = '400 20px "Plus Jakarta Sans", sans-serif';
        drawWrappedText(ctx, d, 1304, by + 130, 496, 29);
      });

      drawSlideFooter(
        ctx,
        'Салон тёмный, не пачкается и не бликует на солнце',
        'EnjoY Pro · STL-05'
      );
      break;
    }

    case 7: {
      drawSlideHeader(
        ctx,
        'Слайд 07 / 10 · Карта материалов CMF',
        'Из чего всё сделано: пластик PETG, плёнка и ткани',
        '5 материалов'
      );

      drawImageCover(ctx, images.cmf, 88, 212, 740, 730, 22);

      CMF_MATERIALS.forEach((mat, idx) => {
        const my = 212 + idx * 149;
        drawCard(ctx, 860, my, 972, 134);

        ctx.fillStyle = mat.swatchHex;
        drawRoundedRect(ctx, 888, my + 31, 72, 72, 14);
        ctx.fill();
        ctx.strokeStyle = 'rgba(0,0,0,0.16)';
        ctx.lineWidth = 2;
        ctx.stroke();

        ctx.fillStyle = '#1D4ED8';
        ctx.font = '600 17px "JetBrains Mono", monospace';
        ctx.fillText(`${mat.code} · ${mat.category}`, 984, my + 42);

        ctx.fillStyle = '#111317';
        ctx.font = '700 22px "Manrope", sans-serif';
        ctx.fillText(mat.name, 984, my + 74);

        ctx.fillStyle = '#555B66';
        ctx.font = '400 18px "Plus Jakarta Sans", sans-serif';
        ctx.fillText(`Где: ${mat.zones}`, 984, my + 108);
      });

      drawSlideFooter(
        ctx,
        'PETG не боится жары, а плёнка не слезает на автомойке',
        'PETG · Винил · Ткань'
      );
      break;
    }

    case 8: {
      drawSlideHeader(
        ctx,
        'Слайд 08 / 10 · Digital-кастомизация',
        'Своя тема для экрана LADA EnjoY Pro и приборки',
        'Тема VESTA PULSE'
      );

      drawEnjoyProMockup(ctx, 88, 210, 440, 730);
      drawClusterMockup(ctx, 568, 210, 1264, 490);

      const uiNotes = [
        [
          'Шкалы в виде ИКС',
          'Дуги спидометра и оборотов сделаны под тем же углом, что и наклейки на дверях.',
        ],
        [
          'Под цвет деталей',
          'Яркие лаймовые и синие элементы на экране совпадают с цветом 3D-вставок.',
        ],
        [
          'Удобные кнопки',
          'На главном экране сразу видны карта, музыка, телефон и климат — ничего лишнего.',
        ],
      ];

      uiNotes.forEach(([t, d], idx) => {
        const ux = 568 + idx * 428;
        drawCard(ctx, ux, 728, 408, 212);
        ctx.fillStyle = '#111317';
        ctx.font = '700 23px "Manrope", sans-serif';
        ctx.fillText(t, ux + 26, 774);
        ctx.fillStyle = '#555B66';
        ctx.font = '400 19px "Plus Jakarta Sans", sans-serif';
        drawWrappedText(ctx, d, ux + 26, 816, 356, 28);
      });

      drawSlideFooter(
        ctx,
        'Машина и внутри, и снаружи выглядит как один проект',
        'Пульс · Ночь · День'
      );
      break;
    }

    case 9: {
      drawSlideHeader(
        ctx,
        'Слайд 09 / 10 · Как этим пользоваться',
        'Как обычный владелец собирает этот тюнинг с сайта',
        '4 шага'
      );

      USER_SCENARIO_STEPS.forEach((step, idx) => {
        const sx = 88 + idx * 442;
        drawCard(ctx, sx, 224, 418, 520);

        ctx.fillStyle = '#1D4ED8';
        ctx.font = '800 44px "JetBrains Mono", monospace';
        ctx.fillText(step.step, sx + 32, 294);

        ctx.fillStyle = '#C8F135';
        ctx.fillRect(sx + 310, 272, 76, 8);

        ctx.fillStyle = '#111317';
        ctx.font = '700 25px "Manrope", sans-serif';
        const afterTitle = drawWrappedText(ctx, step.title, sx + 32, 355, 354, 33);

        ctx.fillStyle = '#555B66';
        ctx.font = '400 19px "Plus Jakarta Sans", sans-serif';
        drawWrappedText(ctx, step.description, sx + 32, afterTitle + 18, 354, 28);

        ctx.strokeStyle = '#E4E7EC';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(sx + 32, 650);
        ctx.lineTo(sx + 386, 650);
        ctx.stroke();

        ctx.fillStyle = '#111317';
        ctx.font = '600 18px "Plus Jakarta Sans", sans-serif';
        drawWrappedText(ctx, step.result, sx + 32, 686, 354, 24);
      });

      drawCard(ctx, 88, 780, 1744, 152, '#111317', '#111317', 20);
      ctx.fillStyle = '#C8F135';
      ctx.font = '600 20px "JetBrains Mono", monospace';
      ctx.fillText('Почему это удобно', 124, 830);
      ctx.fillStyle = '#FFFFFF';
      ctx.font = '500 24px "Plus Jakarta Sans", sans-serif';
      ctx.fillText(
        'Не нужно покупать дорогой пластиковый обвес в магазине — все модельки и макеты наклеек лежат на сайте бесплатно.',
        124,
        882
      );

      drawSlideFooter(
        ctx,
        'Можно собрать за одни выходные без сварки и перекраски',
        '.STL + .SVG + EnjoY Pro'
      );
      break;
    }

    case 10: {
      ctx.fillStyle = '#111317';
      ctx.fillRect(0, 0, SLIDE_W, SLIDE_H);

      drawSlideHeader(
        ctx,
        'Слайд 10 / 10 · Итоги проекта',
        'LADA VESTA PULSE — 3D-печать и наклейки для каждого',
        'Итог',
        true
      );

      drawImageCover(ctx, images.exterior34, 88, 212, 990, 500, 20);
      drawImageCover(ctx, images.trunkSpoiler, 88, 734, 316, 208, 16);
      drawImageCover(ctx, images.printedParts, 425, 734, 316, 208, 16);
      drawImageCover(ctx, images.stickerSheets, 762, 734, 316, 208, 16);

      drawCard(ctx, 1114, 212, 718, 290, 'rgba(255,255,255,0.05)', 'rgba(255,255,255,0.16)', 20);
      ctx.fillStyle = '#C8F135';
      ctx.font = '600 20px "JetBrains Mono", monospace';
      ctx.fillText('Что я сделал', 1148, 256);

      const kitItems = [
        '· 5 3D-моделей (.STL): спойлер, шильдик, колпачки, плавник, подставка',
        '· Наборы виниловых наклеек («ИКС-Контур», «Акула», полосы на диски)',
        '· Проверку на 3 цветах Весты: Белый, Серый, Синий',
        '· Салон из сетки и тему для экрана LADA EnjoY Pro',
      ];
      ctx.fillStyle = '#E5E7EB';
      ctx.font = '400 20px "Plus Jakarta Sans", sans-serif';
      kitItems.forEach((line, i) => {
        ctx.fillText(line, 1148, 306 + i * 44);
      });

      drawCard(ctx, 1114, 526, 718, 210, 'rgba(255,255,255,0.05)', 'rgba(255,255,255,0.16)', 20);
      ctx.fillStyle = '#C8F135';
      ctx.font = '600 20px "JetBrains Mono", monospace';
      ctx.fillText('Почему это работает', 1148, 570);

      ctx.fillStyle = '#FFFFFF';
      ctx.font = '700 22px "Manrope", sans-serif';
      ctx.fillText('Всё на сайте', 1148, 622);
      ctx.fillText('Дёшево сделать', 1480, 622);
      ctx.fillStyle = '#9CA3AF';
      ctx.font = '400 18px "Plus Jakarta Sans", sans-serif';
      drawWrappedText(ctx, 'Модели можно скачать бесплатно', 1148, 658, 300, 26);
      drawWrappedText(ctx, 'Нужен только 3D-принтер и плёнка', 1480, 658, 310, 26);

      drawCard(ctx, 1114, 760, 718, 182, 'rgba(200,241,53,0.12)', 'rgba(200,241,53,0.45)', 20);
      ctx.fillStyle = '#C8F135';
      ctx.font = '700 20px "Manrope", sans-serif';
      ctx.fillText('Результат', 1148, 808);
      ctx.fillStyle = '#FFFFFF';
      ctx.font = '700 22px "Manrope", sans-serif';
      drawWrappedText(
        ctx,
        'Сайт работает: .STL детали, наклейки и презентацию можно скачать прямо сейчас.',
        1148,
        854,
        640,
        32
      );

      drawSlideFooter(
        ctx,
        `${author.fio} · ${author.team} · ${author.school}`,
        'LADA NEW WAVE · 2026',
        true
      );
      break;
    }
  }

  return canvas;
}

export async function exportSingleSlidePng(
  slideNum: number,
  author: PresentationAuthor
): Promise<void> {
  if ('fonts' in document) {
    await document.fonts.ready;
  }
  const images = await loadAllAssets();
  const canvas = renderSlideToCanvas(slideNum, images, author);

  await new Promise<void>((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (!blob) {
          reject(new Error('Не удалось сформировать PNG слайда'));
          return;
        }
        downloadBlob(blob, `LADA_Vesta_Pulse_Slide_${String(slideNum).padStart(2, '0')}.png`);
        resolve();
      },
      'image/png',
      1.0
    );
  });
}

export async function exportPresentationPdf(
  author: PresentationAuthor,
  onProgress?: (current: number, total: number) => void
): Promise<void> {
  if ('fonts' in document) {
    await document.fonts.ready;
  }
  const images = await loadAllAssets();

  const doc = new jsPDF({
    orientation: 'landscape',
    unit: 'pt',
    format: [960, 540],
    compress: true,
  });

  for (let i = 1; i <= 10; i++) {
    onProgress?.(i, 10);
    await new Promise((r) => window.setTimeout(r, 15));

    const canvas = renderSlideToCanvas(i, images, author);
    const dataUrl = canvas.toDataURL('image/jpeg', 0.94);

    if (i > 1) {
      doc.addPage([960, 540], 'landscape');
    }
    doc.addImage(dataUrl, 'JPEG', 0, 0, 960, 540, undefined, 'FAST');
  }

  const pdfBlob = doc.output('blob');
  downloadBlob(pdfBlob, 'LADA_Vesta_Pulse_Presentation_16x9.pdf');
}
