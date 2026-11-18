import type { StlPartId } from '../utils/stlGenerator';
import exteriorThreeQuarterImg from '../assets/images/vesta_exterior_three_quarter_1794992305450.jpg';
import trunkSpoilerViewImg from '../assets/images/vesta_trunk_spoiler_view_1794993193690.jpg';
import exteriorDetailsImg from '../assets/images/vesta_exterior_details_1794992306204.jpg';
import colorVariantsImg from '../assets/images/vesta_color_variants_1794992305650.jpg';
import interiorCabinImg from '../assets/images/vesta_interior_cabin_1794992307434.jpg';
import cmfMaterialsImg from '../assets/images/vesta_cmf_materials_1794992307230.jpg';
import printedPartsImg from '../assets/images/vesta_3d_printed_parts_1794993194860.jpg';
import stickerSheetsImg from '../assets/images/vesta_sticker_sheets_1794993193792.jpg';

export interface ColorToken {
  code: string;
  name: string;
  hex: string;
  finish: string;
  role: string;
}

export interface CmfMaterial {
  id: string;
  code: string;
  name: string;
  category: string;
  finish: string;
  zones: string;
  spec: string;
  swatchHex: string;
}

export interface BodyVariant {
  id: 'white' | 'grey' | 'cobalt';
  name: string;
  factoryColor: string;
  bodyHex: string;
  liveryPrimary: string;
  liveryAccent: string;
  contrastNote: string;
}

export interface PrintableStlPart {
  id: StlPartId;
  code: string;
  name: string;
  zone: string;
  filament: string;
  sizeMm: string;
  infill: string;
  printTime: string;
  mount: string;
  description: string;
}

export interface StickerPack {
  id: string;
  name: string;
  style: string;
  description: string;
  film: string;
  zones: string;
}

export const GENERATED_ASSETS = {
  exteriorThreeQuarter: exteriorThreeQuarterImg,
  trunkSpoilerView: trunkSpoilerViewImg,
  exteriorDetails: exteriorDetailsImg,
  colorVariants: colorVariantsImg,
  interiorCabin: interiorCabinImg,
  cmfMaterials: cmfMaterialsImg,
  printedParts: printedPartsImg,
  stickerSheets: stickerSheetsImg,
} as const;

export const COLLECTION_PALETTE: ColorToken[] = [
  {
    code: 'VP-01',
    name: 'Графит (PETG Carbon)',
    hex: '#181A1F',
    finish: 'Матовый 3D-пластик / винил',
    role: 'Основа спойлера, накладок, подложка наклеек и салона',
  },
  {
    code: 'VP-02',
    name: 'Вольт-Лайм',
    hex: '#C8F135',
    finish: 'Яркий филамент и плёнка',
    role: 'Акцентные вставки, полосы ИКС-наклеек и строчка сидений',
  },
  {
    code: 'VP-03',
    name: 'Синий Кобальт',
    hex: '#1D4ED8',
    finish: 'Контрастный акцент / эмаль',
    role: 'Вторая акцентная линия и яркий цвет кузова',
  },
  {
    code: 'VP-04',
    name: 'Серый Матовый',
    hex: '#ECEDF0',
    finish: 'Нейтральная база',
    role: 'Фон листов наклеек и светлых вставок',
  },
];

export const BODY_VARIANTS: BodyVariant[] = [
  {
    id: 'white',
    name: 'Белый «Ледниковый»',
    factoryColor: 'Серийная эмаль 221',
    bodyHex: '#F3F4F6',
    liveryPrimary: '#181A1F',
    liveryAccent: '#C8F135',
    contrastNote: 'Чёрно-графитовые наклейки и 3D-спойлер чётко выделяются на белом кузове, а лаймовый кант добавляет динамики.',
  },
  {
    id: 'grey',
    name: 'Серый металлик «Тайфун»',
    factoryColor: 'Металлик 616',
    bodyHex: '#525760',
    liveryPrimary: '#111317',
    liveryAccent: '#C8F135',
    contrastNote: 'На тёмном металлике графит подчёркивает линии выштамповок, а яркий Вольт-Лайм делает наклейки хорошо читаемыми.',
  },
  {
    id: 'cobalt',
    name: 'Синий «Кобальт»',
    factoryColor: 'Яркий концептуальный цвет',
    bodyHex: '#1D4ED8',
    liveryPrimary: '#0F172A',
    liveryAccent: '#C8F135',
    contrastNote: 'Двухслойная виниловая наклейка (тёмная основа + светлая грань) одинаково чётко читается и на яркой синей эмали.',
  },
];

export const PRINTABLE_STL_PARTS: PrintableStlPart[] = [
  {
    id: 'spoiler',
    code: 'STL-01',
    name: 'Лип-спойлер крышки багажника',
    zone: 'Экстерьер · Крышка багажника',
    filament: 'PETG / ASA (термостойкий)',
    sizeMm: '440 × 65 × 24 мм (сегмент)',
    infill: '35% гироид',
    printTime: '5 ч 40 мин',
    mount: 'Двусторонний скотч 3M VHB',
    description: 'Компактный спойлер, повторяющий изгиб багажника LADA Vesta NG. Печатается секциями и собирается без сверления кузова.',
  },
  {
    id: 'badge',
    code: 'STL-02',
    name: 'Объёмный ИКС-шильдик',
    zone: 'Экстерьер · Решётка / багажник',
    filament: 'Двухцветный PETG (чёрный + лайм)',
    sizeMm: '108 × 48 × 7.5 мм',
    infill: '100%',
    printTime: '45 мин',
    mount: 'Штатная площадка / 3M скотч',
    description: 'Переосмысленная эмблема в стиле ИКС-графики. Печатается со сменой филамента на 3-м миллиметре высоты.',
  },
  {
    id: 'wheel-cap',
    code: 'STL-03',
    name: 'Заглушка ступицы диска (Ø 60 мм)',
    zone: 'Экстерьер · Колёсные диски',
    filament: 'ASA / PETG',
    sizeMm: 'Ø 60 × 10.5 мм',
    infill: '40%',
    printTime: '35 мин / шт.',
    mount: 'Защёлка в штатное отверстие',
    description: 'Центральный колпачок с рельефом и кольцом-вставкой, который можно напечатать в цвете под свой стиль наклеек.',
  },
  {
    id: 'mirror-trim',
    code: 'STL-04',
    name: 'Декоративный плавник зеркала',
    zone: 'Экстерьер · Корпуса зеркал',
    filament: 'PETG Carbon / TPU-кромка',
    sizeMm: '160 × 28 × 13 мм',
    infill: '30%',
    printTime: '1 ч 10 мин',
    mount: 'На штатный корпус зеркала',
    description: 'Тонкая накладка с контрастной кромкой, защищающая корпус зеркала от мелких сколов и добавляющая спортивный профиль.',
  },
  {
    id: 'phone-dock',
    code: 'STL-05',
    name: 'Держатель смартфона на панель',
    zone: 'Интерьер · Торпедо Vesta NG',
    filament: 'PETG матовый + резинка TPU',
    sizeMm: '84 × 44 × 34 мм',
    infill: '45%',
    printTime: '1 ч 50 мин',
    mount: 'Клипса без саморезов и клея',
    description: 'Практичный аксессуар в салон под гаджеты молодёжи: с прорезью для кабеля зарядки и быстрым снятием.',
  },
];

export const STICKER_PACKS: StickerPack[] = [
  {
    id: 'x-contour',
    name: 'Пакет «ИКС-Контур» (борта и пороги)',
    style: 'Геометрия LADA',
    description: 'Основные виниловые полосы, которые ложатся точно по штамповкам дверей Vesta NG и подчёркивают пороги.',
    film: 'Литая автовинил-плёнка с ламинацией',
    zones: 'Передние и задние двери, пороги, передний бампер',
  },
  {
    id: 'shark',
    name: 'Коллекция наклеек «Акула»',
    style: 'Графичный стрит-арт',
    description: 'Фирменная серия полигональных стикеров (продолжение нашей коллекции из Smart Auto) в цветах VESTA PULSE.',
    film: 'Плоттерная резка с контурным краем',
    zones: 'Задние стойки, крыло, крышка багажника',
  },
  {
    id: 'rims',
    name: 'Полосы на диски и мелкие стикеры',
    style: 'Техно-детали',
    description: 'Дуговые наклейки на обод 16"/17" дисков, стрелки и техно-иконки для лючка бензобака и салона.',
    film: 'Светоотражающий или матовый винил',
    zones: 'Обода дисков, лючок, панель торпедо',
  },
];

export const CMF_MATERIALS: CmfMaterial[] = [
  {
    id: 'petg',
    code: 'CMF-3D01',
    name: '3D-пластик PETG Carbon / ASA',
    category: '3D-печать (экстерьер и салон)',
    finish: 'Матовая слоистая фактура',
    zones: 'Лип-спойлер, накладки зеркал, держатель смартфона',
    spec: 'Не боится солнца (до +95°C) и мойки высокого давления · печатается на обычном FDM-принтере',
    swatchHex: '#181A1F',
  },
  {
    id: 'vinyl',
    code: 'CMF-V02',
    name: 'Литой автовинил (графит + лайм)',
    category: 'Кастомные наклейки',
    finish: 'Матовый графит + полуглянцевый акцент',
    zones: 'Бортовые выштамповки, пороги, задние стойки',
    spec: 'Срок службы 5+ лет · снимается феном без следов на заводской краске',
    swatchHex: '#C8F135',
  },
  {
    id: 'knit',
    code: 'CMF-T03',
    name: '3D-трикотаж «Аэро-Сетка»',
    category: 'Чехлы и сиденья',
    finish: 'Дышащее объёмное плетение',
    zones: 'Центральная часть спинок и подушек сидений',
    spec: 'Практичная ткань для города, не парит летом и легко чистится',
    swatchHex: '#272A32',
  },
  {
    id: 'suede',
    code: 'CMF-L04',
    name: 'Перфорированная эко-замша с прострочкой',
    category: 'Обивка салона',
    finish: 'Перфорация + нить Вольт-Лайм',
    zones: 'Боковины сидений, дверные подлокотники, руль',
    spec: 'Износостойкая пропитка, приятный хват на руле',
    swatchHex: '#373B44',
  },
  {
    id: 'metal',
    code: 'CMF-M05',
    name: 'Шлифованный пластик и алюминий',
    category: 'Панель и диски',
    finish: 'Мелкое геометрическое тиснение',
    zones: 'Вставка торпедо, центральные колпачки дисков',
    spec: 'Не бликует на солнце, устойчиво к царапинам',
    swatchHex: '#636873',
  },
];

export const EXTERIOR_SPECS = [
  {
    part: 'Спойлер крышки багажника (3D-печать)',
    code: 'STL-01',
    tech: 'FDM-печать из ASA / PETG Carbon',
    detail: 'Модель скачивается с сайта, печатается за 1 вечер и ставится на 3M-скотч',
  },
  {
    part: 'Колёсные диски 17" + 3D-заглушки',
    code: 'STL-03',
    tech: 'Двухцветные диски + печатный колпачок Ø 60 мм',
    detail: 'Кольцо колпачка можно распечатать под любой цвет наклеек на кузове',
  },
  {
    part: 'Накладки зеркал + контурная наклейка',
    code: 'STL-04',
    tech: '3D-печатный плавник + виниловая полоса',
    detail: 'Защищает зеркало и связывает его с боковой линией ИКС-ливреи',
  },
  {
    part: 'Объёмный ИКС-шильдик',
    code: 'STL-02',
    tech: 'Двухцветная 3D-печать со сменой нити',
    detail: 'Простая печать без сложного оборудования — ставится вместо штатного шильдика',
  },
];

export const USER_SCENARIO_STEPS = [
  {
    step: '01',
    title: 'Заход на официальный сайт коллекции',
    description: 'Владелец LADA Vesta NG заходит на портал коллекции, выбирает цвет своей машины и стиль: «ИКС-Контур», «Акула» или «Стрит-Пульс».',
    result: 'Бесплатный доступ к .STL и макетам наклеек',
  },
  {
    step: '02',
    title: '3D-печать деталей дома или в технопарке',
    description: 'Скачивает готовые 3D-модели (спойлер, шильдик, колпачки, держатель телефона) и печатает их из прочного PETG или ASA пластика.',
    result: 'Себестоимость комплекта в разы ниже заводского обвеса',
  },
  {
    step: '03',
    title: 'Печать и поклейка винила',
    description: 'Вырезает на плоттере готовый лист наклеек, наносит его по ИКС-выштамповкам кузова и устанавливает 3D-детали на клипсы и 3M-скотч.',
    result: 'Сборка образа за один выходной без сварки и покраски',
  },
  {
    step: '04',
    title: 'Обновление под настроение и гаджеты',
    description: 'Ставит на телефон и LADA EnjoY Pro тему «VESTA PULSE», а через полгода может перепечатать акценты и сменить наклейки на новый цвет.',
    result: 'Живой конструктор, который растёт вместе с владельцем',
  },
];

export const SLIDE_TITLES = [
  { num: 1, label: 'Титульный лист' },
  { num: 2, label: 'Идея: 3D + Наклейки' },
  { num: 3, label: 'Экстерьер 3/4' },
  { num: 4, label: '3D-детали и диски' },
  { num: 5, label: 'Наклейки на 3 цветах' },
  { num: 6, label: 'Интерьер салона' },
  { num: 7, label: 'Материалы CMF и PETG' },
  { num: 8, label: 'LADA EnjoY Pro и UI' },
  { num: 9, label: 'Как это работает' },
  { num: 10, label: 'Итоговый лист продукта' },
];
