import PptxGenJS from 'pptxgenjs';
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
import { drawClusterMockup, drawEnjoyProMockup } from './pdfExporter';

const W = 13.333;
const H = 7.5;
const MARGIN_X = 0.6;
const CONTENT_W = W - MARGIN_X * 2;

const FONT_HEAD = 'Segoe UI';
const FONT_BODY = 'Segoe UI';
const FONT_MONO = 'Consolas';

function hex(color: string): string {
  return color.replace('#', '').toUpperCase();
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error(`Не удалось загрузить картинку: ${src}`));
    img.src = src;
  });
}

async function renderCoverImageData(
  src: string,
  boxWIn: number,
  boxHIn: number,
  quality = 0.92
): Promise<string> {
  const img = await loadImage(src);
  const pxPerIn = 150;
  const targetW = Math.round(boxWIn * pxPerIn);
  const targetH = Math.round(boxHIn * pxPerIn);

  const canvas = document.createElement('canvas');
  canvas.width = targetW;
  canvas.height = targetH;
  const ctx = canvas.getContext('2d')!;

  const imgRatio = img.naturalWidth / img.naturalHeight;
  const boxRatio = targetW / targetH;
  let drawW = targetW;
  let drawH = targetH;
  let offsetX = 0;
  let offsetY = 0;

  if (imgRatio > boxRatio) {
    drawH = targetH;
    drawW = targetH * imgRatio;
    offsetX = -(drawW - targetW) / 2;
  } else {
    drawW = targetW;
    drawH = targetW / imgRatio;
    offsetY = -(drawH - targetH) / 2;
  }

  ctx.drawImage(img, offsetX, offsetY, drawW, drawH);
  return canvas.toDataURL('image/jpeg', quality);
}

function renderEnjoyProPng(): string {
  const canvas = document.createElement('canvas');
  canvas.width = 480;
  canvas.height = 760;
  const ctx = canvas.getContext('2d')!;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawEnjoyProMockup(ctx, 10, 10, 460, 740);
  return canvas.toDataURL('image/png');
}

function renderClusterPng(): string {
  const canvas = document.createElement('canvas');
  canvas.width = 1280;
  canvas.height = 510;
  const ctx = canvas.getContext('2d')!;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawClusterMockup(ctx, 10, 10, 1260, 490);
  return canvas.toDataURL('image/png');
}

function addSlideHeader(
  slide: PptxGenJS.Slide,
  kicker: string,
  title: string,
  rightLabel: string,
  dark = false
) {
  const fg = dark ? 'FFFFFF' : '111317';
  const muted = dark ? 'C8F135' : '555B66';
  const accent = dark ? 'C8F135' : '1D4ED8';
  const border = dark ? '2D323B' : 'E4E7EC';

  slide.addText(kicker, {
    x: MARGIN_X,
    y: 0.34,
    w: 9.2,
    h: 0.25,
    fontFace: FONT_MONO,
    fontSize: 10,
    bold: true,
    color: muted,
    margin: 0,
  });

  slide.addText(title, {
    x: MARGIN_X,
    y: 0.6,
    w: 9.8,
    h: 0.45,
    fontFace: FONT_HEAD,
    fontSize: 21,
    bold: true,
    color: fg,
    margin: 0,
  });

  slide.addText(rightLabel, {
    x: 9.6,
    y: 0.64,
    w: W - MARGIN_X - 9.6,
    h: 0.32,
    align: 'right',
    fontFace: FONT_MONO,
    fontSize: 10.5,
    bold: true,
    color: accent,
    margin: 0,
  });

  slide.addShape('line', {
    x: MARGIN_X,
    y: 1.14,
    w: CONTENT_W,
    h: 0,
    line: { color: border, width: 1 },
  });
}

function addSlideFooter(
  slide: PptxGenJS.Slide,
  leftText: string,
  rightText: string,
  dark = false
) {
  const border = dark ? '2D323B' : 'E4E7EC';
  const muted = dark ? '9CA3AF' : '555B66';

  slide.addShape('line', {
    x: MARGIN_X,
    y: 6.88,
    w: CONTENT_W,
    h: 0,
    line: { color: border, width: 1 },
  });

  slide.addText(leftText, {
    x: MARGIN_X,
    y: 6.98,
    w: 8.6,
    h: 0.28,
    fontFace: FONT_BODY,
    fontSize: 10,
    color: muted,
    margin: 0,
  });

  slide.addText(rightText, {
    x: 9.0,
    y: 6.98,
    w: W - MARGIN_X - 9.0,
    h: 0.28,
    align: 'right',
    fontFace: FONT_MONO,
    fontSize: 10,
    color: muted,
    margin: 0,
  });
}

function addCardBox(
  slide: PptxGenJS.Slide,
  x: number,
  y: number,
  w: number,
  h: number,
  fill = 'F8F9FB',
  border = 'E4E7EC'
) {
  slide.addShape('roundRect', {
    x,
    y,
    w,
    h,
    rectRadius: 0.08,
    fill: { color: fill },
    line: { color: border, width: 1 },
  });
}

export async function exportPresentationPptx(
  author: PresentationAuthor,
  onProgress?: (current: number, total: number) => void
): Promise<void> {
  const pptx = new PptxGenJS();
  pptx.layout = 'LAYOUT_WIDE';
  pptx.title = 'LADA Vesta Pulse — 3D-печать и наклейки';
  pptx.subject = 'Конкурс «Инженеры транспорта» · LADA Vesta NG Седан';
  pptx.author = author.fio;
  pptx.company = `${author.team} · ${author.school}`;

  // Pre-crop all photos cleanly to their slide container aspect ratios
  onProgress?.(1, 10);
  const [
    s1Hero,
    s2Printed,
    s2Stickers,
    s3Main,
    s3Rear,
    s4Printed,
    s4Details,
    s5Variants,
    s6Interior,
    s7Cmf,
    s10Hero,
    s10Thumb1,
    s10Thumb2,
    s10Thumb3,
  ] = await Promise.all([
    renderCoverImageData(GENERATED_ASSETS.exteriorThreeQuarter, 7.65, 7.5),
    renderCoverImageData(GENERATED_ASSETS.printedParts, 4.95, 2.65),
    renderCoverImageData(GENERATED_ASSETS.stickerSheets, 4.95, 2.65),
    renderCoverImageData(GENERATED_ASSETS.exteriorThreeQuarter, 7.35, 5.42),
    renderCoverImageData(GENERATED_ASSETS.trunkSpoilerView, 4.5, 3.2),
    renderCoverImageData(GENERATED_ASSETS.printedParts, 5.9, 2.6),
    renderCoverImageData(GENERATED_ASSETS.exteriorDetails, 5.9, 2.6),
    renderCoverImageData(GENERATED_ASSETS.colorVariants, 12.133, 3.35),
    renderCoverImageData(GENERATED_ASSETS.interiorCabin, 7.85, 5.42),
    renderCoverImageData(GENERATED_ASSETS.cmfMaterials, 5.05, 5.42),
    renderCoverImageData(GENERATED_ASSETS.exteriorThreeQuarter, 6.85, 3.72),
    renderCoverImageData(GENERATED_ASSETS.trunkSpoilerView, 2.18, 1.5),
    renderCoverImageData(GENERATED_ASSETS.printedParts, 2.18, 1.5),
    renderCoverImageData(GENERATED_ASSETS.stickerSheets, 2.18, 1.5),
  ]);

  const enjoyProPng = renderEnjoyProPng();
  const clusterPng = renderClusterPng();

  // ---------------- SLIDE 1: ТИТУЛ ----------------
  onProgress?.(2, 10);
  {
    const slide = pptx.addSlide();
    slide.background = { color: '111317' };

    slide.addImage({
      data: s1Hero,
      x: 5.68,
      y: 0,
      w: 7.653,
      h: 7.5,
    });

    // Subtle dark panel behind left text for crisp contrast
    slide.addShape('rect', {
      x: 0,
      y: 0,
      w: 5.75,
      h: 7.5,
      fill: { color: '111317' },
      line: { color: '111317', width: 0 },
    });

    slide.addText('Инженеры транспорта · Первые × АВТОВАЗ', {
      x: 0.65,
      y: 0.62,
      w: 4.8,
      h: 0.3,
      fontFace: FONT_BODY,
      fontSize: 11,
      bold: true,
      color: '9CA3AF',
      margin: 0,
    });

    slide.addShape('rect', {
      x: 0.65,
      y: 1.15,
      w: 0.85,
      h: 0.06,
      fill: { color: 'C8F135' },
      line: { color: 'C8F135', width: 0 },
    });

    slide.addText('LADA VESTA\nPULSE', {
      x: 0.65,
      y: 1.45,
      w: 4.9,
      h: 1.4,
      fontFace: FONT_HEAD,
      fontSize: 38,
      bold: true,
      color: 'FFFFFF',
      lineSpacingMultiple: 1.05,
      margin: 0,
    });

    slide.addText(
      'Мой проект тюнинга LADA Vesta NG Седан: 3D-печать деталей и наклейки с официального сайта',
      {
        x: 0.65,
        y: 3.05,
        w: 4.7,
        h: 1.2,
        fontFace: FONT_BODY,
        fontSize: 14,
        color: 'D1D5DB',
        lineSpacingMultiple: 1.25,
        margin: 0,
      }
    );

    slide.addShape('line', {
      x: 0.65,
      y: 5.05,
      w: 4.7,
      h: 0,
      line: { color: '2D323B', width: 1 },
    });

    const metaRows: [string, string, string][] = [
      ['Машина', 'LADA Vesta NG Седан', 'FFFFFF'],
      ['Участник', author.fio, 'FFFFFF'],
      ['Команда / Школа', `${author.team} · ${author.school}`, 'D1D5DB'],
      ['Город · Год', `${author.city} · 2026`, 'C8F135'],
    ];

    metaRows.forEach(([label, val, col], idx) => {
      const ry = 5.25 + idx * 0.42;
      slide.addText(label, {
        x: 0.65,
        y: ry,
        w: 1.8,
        h: 0.3,
        fontFace: FONT_BODY,
        fontSize: 10.5,
        color: '9CA3AF',
        margin: 0,
      });
      slide.addText(val, {
        x: 2.35,
        y: ry,
        w: 3.0,
        h: 0.3,
        align: 'right',
        fontFace: FONT_HEAD,
        fontSize: 10.5,
        bold: true,
        color: col,
        margin: 0,
      });
    });
  }

  // ---------------- SLIDE 2: ИДЕЯ И МУДБОРД ----------------
  onProgress?.(3, 10);
  {
    const slide = pptx.addSlide();
    slide.background = { color: 'FFFFFF' };
    addSlideHeader(
      slide,
      'Слайд 02 / 10 · Мудборд и главная идея',
      'Моя идея: 3D-принтер + наклейки с сайта',
      'Для молодых водителей'
    );

    const ideaCards: [string, string, string][] = [
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

    ideaCards.forEach(([kicker, heading, desc], idx) => {
      const cx = MARGIN_X + idx * 2.34;
      addCardBox(slide, cx, 1.32, 2.2, 2.62);
      slide.addText(kicker, {
        x: cx + 0.16,
        y: 1.48,
        w: 1.88,
        h: 0.24,
        fontFace: FONT_MONO,
        fontSize: 9.5,
        bold: true,
        color: '1D4ED8',
        margin: 0,
      });
      slide.addText(heading, {
        x: cx + 0.16,
        y: 1.78,
        w: 1.88,
        h: 0.34,
        fontFace: FONT_HEAD,
        fontSize: 12.5,
        bold: true,
        color: '111317',
        margin: 0,
      });
      slide.addText(desc, {
        x: cx + 0.16,
        y: 2.18,
        w: 1.88,
        h: 1.6,
        fontFace: FONT_BODY,
        fontSize: 10,
        color: '555B66',
        valign: 'top',
        lineSpacingMultiple: 1.2,
        margin: 0,
      });
    });

    addCardBox(slide, MARGIN_X, 4.12, 6.88, 2.58);
    slide.addText('Какие цвета я выбрал (для пластика и наклеек)', {
      x: MARGIN_X + 0.18,
      y: 4.28,
      w: 6.4,
      h: 0.28,
      fontFace: FONT_BODY,
      fontSize: 10.5,
      bold: true,
      color: '555B66',
      margin: 0,
    });

    COLLECTION_PALETTE.forEach((token, idx) => {
      const sx = MARGIN_X + 0.18 + idx * 1.66;
      slide.addShape('roundRect', {
        x: sx,
        y: 4.66,
        w: 1.52,
        h: 1.05,
        rectRadius: 0.06,
        fill: { color: hex(token.hex) },
        line: { color: 'D1D5DB', width: 1 },
      });
      slide.addText(token.name, {
        x: sx,
        y: 5.82,
        w: 1.52,
        h: 0.28,
        fontFace: FONT_HEAD,
        fontSize: 10.5,
        bold: true,
        color: '111317',
        margin: 0,
      });
      slide.addText(`${token.hex} · ${token.code}`, {
        x: sx,
        y: 6.12,
        w: 1.52,
        h: 0.26,
        fontFace: FONT_MONO,
        fontSize: 9,
        color: '555B66',
        margin: 0,
      });
    });

    slide.addImage({
      data: s2Printed,
      x: 7.78,
      y: 1.32,
      w: 4.95,
      h: 2.62,
    });
    slide.addImage({
      data: s2Stickers,
      x: 7.78,
      y: 4.08,
      w: 4.95,
      h: 2.62,
    });

    addSlideFooter(
      slide,
      'Просто, недорого и можно собрать дома или в школьном кружке',
      'LADA Vesta NG Седан · VESTA PULSE'
    );
  }

  // ---------------- SLIDE 3: ЭКСТЕРИОР ----------------
  onProgress?.(4, 10);
  {
    const slide = pptx.addSlide();
    slide.background = { color: 'FFFFFF' };
    addSlideHeader(
      slide,
      'Слайд 03 / 10 · Экстерьер автомобиля',
      'Как машина выглядит снаружи: наклейки и 3D-спойлер',
      'Спереди и сзади'
    );

    slide.addImage({
      data: s3Main,
      x: MARGIN_X,
      y: 1.32,
      w: 7.35,
      h: 5.38,
    });

    slide.addImage({
      data: s3Rear,
      x: 8.23,
      y: 1.32,
      w: 4.5,
      h: 3.16,
    });

    addCardBox(slide, 8.23, 4.66, 4.5, 2.04);
    slide.addText('Что я добавил снаружи', {
      x: 8.45,
      y: 4.84,
      w: 4.06,
      h: 0.28,
      fontFace: FONT_MONO,
      fontSize: 10.5,
      bold: true,
      color: '1D4ED8',
      margin: 0,
    });
    slide.addText(
      'Полосы наклеены ровно по ИКС-линиям на дверях Весты, а сзади стоит напечатанный на 3D-принтере спойлер. Всё держится на 3M-скотче — кузов сверлить не надо.',
      {
        x: 8.45,
        y: 5.2,
        w: 4.06,
        h: 1.3,
        fontFace: FONT_BODY,
        fontSize: 11,
        color: '555B66',
        valign: 'top',
        lineSpacingMultiple: 1.25,
        margin: 0,
      }
    );

    addSlideFooter(
      slide,
      'Машина сохраняет гарантию — все детали и плёнку можно снять',
      'Ракурсы 3/4 спереди и сзади'
    );
  }

  // ---------------- SLIDE 4: 3D-ДЕТАЛИ ----------------
  onProgress?.(5, 10);
  {
    const slide = pptx.addSlide();
    slide.background = { color: 'FFFFFF' };
    addSlideHeader(
      slide,
      'Слайд 04 / 10 · Детали и 3D-печать (.STL)',
      'Мои 3D-детали: спойлер, шильдик, заглушки и зеркала',
      'Файлы .STL на сайте'
    );

    slide.addImage({
      data: s4Printed,
      x: MARGIN_X,
      y: 1.32,
      w: 5.85,
      h: 2.6,
    });
    slide.addImage({
      data: s4Details,
      x: MARGIN_X,
      y: 4.1,
      w: 5.85,
      h: 2.6,
    });

    EXTERIOR_SPECS.forEach((spec, idx) => {
      const sy = 1.32 + idx * 1.38;
      addCardBox(slide, 6.72, sy, 6.01, 1.24);
      slide.addText(spec.part, {
        x: 6.92,
        y: sy + 0.14,
        w: 4.7,
        h: 0.28,
        fontFace: FONT_HEAD,
        fontSize: 12,
        bold: true,
        color: '111317',
        margin: 0,
      });
      slide.addText(spec.code, {
        x: 11.65,
        y: sy + 0.14,
        w: 0.9,
        h: 0.28,
        align: 'right',
        fontFace: FONT_MONO,
        fontSize: 10,
        bold: true,
        color: '1D4ED8',
        margin: 0,
      });
      slide.addText(spec.tech, {
        x: 6.92,
        y: sy + 0.45,
        w: 5.6,
        h: 0.24,
        fontFace: FONT_BODY,
        fontSize: 10,
        bold: true,
        color: '111317',
        margin: 0,
      });
      slide.addText(spec.detail, {
        x: 6.92,
        y: sy + 0.73,
        w: 5.6,
        h: 0.42,
        fontFace: FONT_BODY,
        fontSize: 9.5,
        color: '555B66',
        valign: 'top',
        margin: 0,
      });
    });

    addSlideFooter(
      slide,
      'Все эти модельки можно скачать в .STL прямо на нашем сайте',
      'STL-01 · STL-02 · STL-03 · STL-04'
    );
  }

  // ---------------- SLIDE 5: 3 ЦВЕТА КУЗОВА ----------------
  onProgress?.(6, 10);
  {
    const slide = pptx.addSlide();
    slide.background = { color: 'FFFFFF' };
    addSlideHeader(
      slide,
      'Слайд 05 / 10 · Проверка на 3 цветах',
      'Как наклейки смотрятся на белой, серой и синей Весте',
      'Белый · Серый · Синий'
    );

    slide.addImage({
      data: s5Variants,
      x: MARGIN_X,
      y: 1.32,
      w: CONTENT_W,
      h: 3.35,
    });

    BODY_VARIANTS.forEach((variant, idx) => {
      const vx = MARGIN_X + idx * 4.11;
      addCardBox(slide, vx, 4.85, 3.91, 1.85);
      slide.addShape('roundRect', {
        x: vx + 0.18,
        y: 5.04,
        w: 0.26,
        h: 0.26,
        rectRadius: 0.04,
        fill: { color: hex(variant.bodyHex) },
        line: { color: '9CA3AF', width: 1 },
      });
      slide.addText(variant.name, {
        x: vx + 0.54,
        y: 5.03,
        w: 3.2,
        h: 0.28,
        fontFace: FONT_HEAD,
        fontSize: 12,
        bold: true,
        color: '111317',
        margin: 0,
      });
      slide.addText(variant.factoryColor, {
        x: vx + 0.18,
        y: 5.4,
        w: 3.55,
        h: 0.24,
        fontFace: FONT_MONO,
        fontSize: 9.5,
        bold: true,
        color: '1D4ED8',
        margin: 0,
      });
      slide.addText(variant.contrastNote, {
        x: vx + 0.18,
        y: 5.7,
        w: 3.55,
        h: 0.88,
        fontFace: FONT_BODY,
        fontSize: 9.8,
        color: '555B66',
        valign: 'top',
        lineSpacingMultiple: 1.2,
        margin: 0,
      });
    });

    addSlideFooter(
      slide,
      'Один макет на плоттере подходит сразу на любой цвет кузова',
      'Белый · Тайфун · Кобальт'
    );
  }

  // ---------------- SLIDE 6: САЛОН ----------------
  onProgress?.(7, 10);
  {
    const slide = pptx.addSlide();
    slide.background = { color: 'FFFFFF' };
    addSlideHeader(
      slide,
      'Слайд 06 / 10 · Салон автомобиля',
      'Салон: чехлы, прострочка и 3D-подставка под телефон',
      'Интерьер'
    );

    slide.addImage({
      data: s6Interior,
      x: MARGIN_X,
      y: 1.32,
      w: 7.85,
      h: 5.38,
    });

    const zones: [string, string, string][] = [
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
      const by = 1.32 + idx * 1.84;
      addCardBox(slide, 8.7, by, 4.03, 1.68);
      slide.addText(k, {
        x: 8.9,
        y: by + 0.16,
        w: 3.63,
        h: 0.24,
        fontFace: FONT_MONO,
        fontSize: 9.5,
        bold: true,
        color: '1D4ED8',
        margin: 0,
      });
      slide.addText(t, {
        x: 8.9,
        y: by + 0.44,
        w: 3.63,
        h: 0.3,
        fontFace: FONT_HEAD,
        fontSize: 12.5,
        bold: true,
        color: '111317',
        margin: 0,
      });
      slide.addText(d, {
        x: 8.9,
        y: by + 0.78,
        w: 3.63,
        h: 0.78,
        fontFace: FONT_BODY,
        fontSize: 10,
        color: '555B66',
        valign: 'top',
        lineSpacingMultiple: 1.2,
        margin: 0,
      });
    });

    addSlideFooter(
      slide,
      'Салон тёмный, не пачкается и не бликует на солнце',
      'EnjoY Pro · STL-05'
    );
  }

  // ---------------- SLIDE 7: МАТЕРИАЛЫ CMF ----------------
  onProgress?.(8, 10);
  {
    const slide = pptx.addSlide();
    slide.background = { color: 'FFFFFF' };
    addSlideHeader(
      slide,
      'Слайд 07 / 10 · Карта материалов CMF',
      'Из чего всё сделано: пластик PETG, плёнка и ткани',
      '5 материалов'
    );

    slide.addImage({
      data: s7Cmf,
      x: MARGIN_X,
      y: 1.32,
      w: 5.05,
      h: 5.38,
    });

    CMF_MATERIALS.forEach((mat, idx) => {
      const my = 1.32 + idx * 1.1;
      addCardBox(slide, 5.88, my, 6.85, 0.98);
      slide.addShape('roundRect', {
        x: 6.06,
        y: my + 0.22,
        w: 0.54,
        h: 0.54,
        rectRadius: 0.06,
        fill: { color: hex(mat.swatchHex) },
        line: { color: 'D1D5DB', width: 1 },
      });
      slide.addText(`${mat.code} · ${mat.category}`, {
        x: 6.76,
        y: my + 0.12,
        w: 5.8,
        h: 0.22,
        fontFace: FONT_MONO,
        fontSize: 9,
        bold: true,
        color: '1D4ED8',
        margin: 0,
      });
      slide.addText(mat.name, {
        x: 6.76,
        y: my + 0.36,
        w: 5.8,
        h: 0.26,
        fontFace: FONT_HEAD,
        fontSize: 11.5,
        bold: true,
        color: '111317',
        margin: 0,
      });
      slide.addText(`Где: ${mat.zones}`, {
        x: 6.76,
        y: my + 0.65,
        w: 5.8,
        h: 0.22,
        fontFace: FONT_BODY,
        fontSize: 9.5,
        color: '555B66',
        margin: 0,
      });
    });

    addSlideFooter(
      slide,
      'PETG не боится жары, а плёнка не слезает на автомойке',
      'PETG · Винил · Ткань'
    );
  }

  // ---------------- SLIDE 8: DIGITAL-КАСТОМИЗАЦИЯ ----------------
  onProgress?.(9, 10);
  {
    const slide = pptx.addSlide();
    slide.background = { color: 'FFFFFF' };
    addSlideHeader(
      slide,
      'Слайд 08 / 10 · Digital-кастомизация',
      'Своя тема для экрана LADA EnjoY Pro и приборки',
      'Тема VESTA PULSE'
    );

    slide.addImage({
      data: enjoyProPng,
      x: MARGIN_X,
      y: 1.32,
      w: 3.35,
      h: 5.3,
    });

    slide.addImage({
      data: clusterPng,
      x: 4.2,
      y: 1.32,
      w: 8.53,
      h: 3.4,
    });

    const uiNotes: [string, string][] = [
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

    uiNotes.forEach(([title, desc], idx) => {
      const ux = 4.2 + idx * 2.91;
      addCardBox(slide, ux, 4.92, 2.71, 1.7);
      slide.addText(title, {
        x: ux + 0.16,
        y: 5.1,
        w: 2.39,
        h: 0.3,
        fontFace: FONT_HEAD,
        fontSize: 12,
        bold: true,
        color: '111317',
        margin: 0,
      });
      slide.addText(desc, {
        x: ux + 0.16,
        y: 5.46,
        w: 2.39,
        h: 1.0,
        fontFace: FONT_BODY,
        fontSize: 9.8,
        color: '555B66',
        valign: 'top',
        lineSpacingMultiple: 1.2,
        margin: 0,
      });
    });

    addSlideFooter(
      slide,
      'Машина и внутри, и снаружи выглядит как один проект',
      'Пульс · Ночь · День'
    );
  }

  // ---------------- SLIDE 9: КАК ПОЛЬЗОВАТЬСЯ ----------------
  {
    const slide = pptx.addSlide();
    slide.background = { color: 'FFFFFF' };
    addSlideHeader(
      slide,
      'Слайд 09 / 10 · Как этим пользоваться',
      'Как обычный владелец собирает этот тюнинг с сайта',
      '4 шага'
    );

    USER_SCENARIO_STEPS.forEach((step, idx) => {
      const sx = MARGIN_X + idx * 3.09;
      addCardBox(slide, sx, 1.38, 2.86, 3.85);

      slide.addText(step.step, {
        x: sx + 0.2,
        y: 1.56,
        w: 1.1,
        h: 0.45,
        fontFace: FONT_MONO,
        fontSize: 22,
        bold: true,
        color: '1D4ED8',
        margin: 0,
      });

      slide.addShape('rect', {
        x: sx + 2.08,
        y: 1.76,
        w: 0.56,
        h: 0.06,
        fill: { color: 'C8F135' },
        line: { color: 'C8F135', width: 0 },
      });

      slide.addText(step.title, {
        x: sx + 0.2,
        y: 2.16,
        w: 2.46,
        h: 0.62,
        fontFace: FONT_HEAD,
        fontSize: 13,
        bold: true,
        color: '111317',
        valign: 'top',
        margin: 0,
      });

      slide.addText(step.description, {
        x: sx + 0.2,
        y: 2.84,
        w: 2.46,
        h: 1.6,
        fontFace: FONT_BODY,
        fontSize: 9.8,
        color: '555B66',
        valign: 'top',
        lineSpacingMultiple: 1.2,
        margin: 0,
      });

      slide.addShape('line', {
        x: sx + 0.2,
        y: 4.55,
        w: 2.46,
        h: 0,
        line: { color: 'E4E7EC', width: 1 },
      });

      slide.addText(step.result, {
        x: sx + 0.2,
        y: 4.66,
        w: 2.46,
        h: 0.42,
        fontFace: FONT_BODY,
        fontSize: 9.5,
        bold: true,
        color: '111317',
        margin: 0,
      });
    });

    addCardBox(slide, MARGIN_X, 5.45, CONTENT_W, 1.18, '111317', '111317');
    slide.addText('Почему это удобно', {
      x: MARGIN_X + 0.26,
      y: 5.64,
      w: 5.0,
      h: 0.26,
      fontFace: FONT_MONO,
      fontSize: 10,
      bold: true,
      color: 'C8F135',
      margin: 0,
    });
    slide.addText(
      'Не нужно покупать дорогой пластиковый обвес в магазине — все модельки и макеты наклеек лежат на сайте бесплатно.',
      {
        x: MARGIN_X + 0.26,
        y: 5.96,
        w: 9.6,
        h: 0.48,
        fontFace: FONT_BODY,
        fontSize: 12,
        bold: true,
        color: 'FFFFFF',
        margin: 0,
      }
    );
    slide.addText('.STL + .SVG + EnjoY Pro', {
      x: 10.3,
      y: 5.92,
      w: 2.2,
      h: 0.3,
      align: 'right',
      fontFace: FONT_MONO,
      fontSize: 10,
      color: '9CA3AF',
      margin: 0,
    });

    addSlideFooter(
      slide,
      'Можно собрать за одни выходные без сварки и перекраски',
      '.STL + .SVG + EnjoY Pro'
    );
  }

  // ---------------- SLIDE 10: ИТОГИ ----------------
  onProgress?.(10, 10);
  {
    const slide = pptx.addSlide();
    slide.background = { color: '111317' };
    addSlideHeader(
      slide,
      'Слайд 10 / 10 · Итоги проекта',
      'LADA VESTA PULSE — 3D-печать и наклейки для каждого',
      'Итог',
      true
    );

    slide.addImage({
      data: s10Hero,
      x: MARGIN_X,
      y: 1.32,
      w: 6.85,
      h: 3.72,
    });
    slide.addImage({ data: s10Thumb1, x: MARGIN_X, y: 5.2, w: 2.18, h: 1.5 });
    slide.addImage({ data: s10Thumb2, x: MARGIN_X + 2.335, y: 5.2, w: 2.18, h: 1.5 });
    slide.addImage({ data: s10Thumb3, x: MARGIN_X + 4.67, y: 5.2, w: 2.18, h: 1.5 });

    addCardBox(slide, 7.72, 1.32, 5.01, 2.08, '1A1D24', '2D323B');
    slide.addText('Что я сделал', {
      x: 7.94,
      y: 1.48,
      w: 4.5,
      h: 0.26,
      fontFace: FONT_MONO,
      fontSize: 10,
      bold: true,
      color: 'C8F135',
      margin: 0,
    });
    slide.addText(
      [
        '· 5 3D-моделей (.STL): спойлер, шильдик, колпачки, плавник, подставка',
        '· Наборы виниловых наклеек («ИКС-Контур», «Акула», полосы на диски)',
        '· Проверку на 3 цветах Весты: Белый, Серый, Синий',
        '· Салон из сетки и тему для экрана LADA EnjoY Pro',
      ].join('\n'),
      {
        x: 7.94,
        y: 1.82,
        w: 4.56,
        h: 1.45,
        fontFace: FONT_BODY,
        fontSize: 10,
        color: 'E5E7EB',
        lineSpacingMultiple: 1.35,
        valign: 'top',
        margin: 0,
      }
    );

    addCardBox(slide, 7.72, 3.58, 5.01, 1.52, '1A1D24', '2D323B');
    slide.addText('Почему это работает', {
      x: 7.94,
      y: 3.74,
      w: 4.5,
      h: 0.26,
      fontFace: FONT_MONO,
      fontSize: 10,
      bold: true,
      color: 'C8F135',
      margin: 0,
    });
    slide.addText('Всё на сайте', {
      x: 7.94,
      y: 4.1,
      w: 2.1,
      h: 0.28,
      fontFace: FONT_HEAD,
      fontSize: 11.5,
      bold: true,
      color: 'FFFFFF',
      margin: 0,
    });
    slide.addText('Модели можно скачать бесплатно', {
      x: 7.94,
      y: 4.4,
      w: 2.1,
      h: 0.5,
      fontFace: FONT_BODY,
      fontSize: 9.8,
      color: '9CA3AF',
      margin: 0,
    });
    slide.addText('Дёшево сделать', {
      x: 10.3,
      y: 4.1,
      w: 2.2,
      h: 0.28,
      fontFace: FONT_HEAD,
      fontSize: 11.5,
      bold: true,
      color: 'FFFFFF',
      margin: 0,
    });
    slide.addText('Нужен только 3D-принтер и плёнка', {
      x: 10.3,
      y: 4.4,
      w: 2.2,
      h: 0.5,
      fontFace: FONT_BODY,
      fontSize: 9.8,
      color: '9CA3AF',
      margin: 0,
    });

    addCardBox(slide, 7.72, 5.28, 5.01, 1.42, '202819', '6D8323');
    slide.addText('Результат', {
      x: 7.94,
      y: 5.46,
      w: 4.5,
      h: 0.26,
      fontFace: FONT_HEAD,
      fontSize: 11,
      bold: true,
      color: 'C8F135',
      margin: 0,
    });
    slide.addText(
      'Сайт работает: .STL детали, наклейки и презентацию можно скачать прямо сейчас.',
      {
        x: 7.94,
        y: 5.8,
        w: 4.56,
        h: 0.72,
        fontFace: FONT_HEAD,
        fontSize: 12,
        bold: true,
        color: 'FFFFFF',
        lineSpacingMultiple: 1.25,
        margin: 0,
      }
    );

    addSlideFooter(
      slide,
      `${author.fio} · ${author.team} · ${author.school}`,
      'LADA NEW WAVE · 2026',
      true
    );
  }

  const output = await pptx.write({ outputType: 'blob' });
  const blob =
    output instanceof Blob
      ? output
      : new Blob([output as ArrayBuffer], {
          type: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
        });

  downloadBlob(blob, 'LADA_Vesta_Pulse_Presentation.pptx');
}
