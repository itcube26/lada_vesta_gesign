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
    name: 'Чёрный графит',
    hex: '#181A1F',
    finish: 'Матовый пластик / плёнка',
    role: 'Спойлер, накладки, подложка наклеек и цвет салона',
  },
  {
    code: 'VP-02',
    name: 'Яркий лайм',
    hex: '#C8F135',
    finish: 'Яркий пластик и винил',
    role: 'Полоски на кузов, строчка на сиденьях и акценты',
  },
  {
    code: 'VP-03',
    name: 'Синий',
    hex: '#1D4ED8',
    finish: 'Второй яркий цвет',
    role: 'Запасной цвет наклеек и синий цвет кузова',
  },
  {
    code: 'VP-04',
    name: 'Светло-серый',
    hex: '#ECEDF0',
    finish: 'Базовый фон',
    role: 'Фон для листов с наклейками и светлых деталей',
  },
];

export const BODY_VARIANTS: BodyVariant[] = [
  {
    id: 'white',
    name: 'Белый «Ледниковый»',
    factoryColor: 'Обычный белый цвет',
    bodyHex: '#F3F4F6',
    liveryPrimary: '#181A1F',
    liveryAccent: '#C8F135',
    contrastNote: 'На белой машине чёрный спойлер и графитовые полосы видны сразу издалека, а лаймовая полоска добавляет яркости.',
  },
  {
    id: 'grey',
    name: 'Серый «Тайфун»',
    factoryColor: 'Тёмно-серый металлик',
    bodyHex: '#525760',
    liveryPrimary: '#111317',
    liveryAccent: '#C8F135',
    contrastNote: 'На серой машине чёрные наклейки красиво сливаются с тенями, а яркий лайм не даёт им потеряться.',
  },
  {
    id: 'cobalt',
    name: 'Синий «Кобальт»',
    factoryColor: 'Яркий синий цвет',
    bodyHex: '#1D4ED8',
    liveryPrimary: '#0F172A',
    liveryAccent: '#C8F135',
    contrastNote: 'Так как у наклейки сразу два слоя (тёмный и светлый лайм), она отлично читается даже на ярко-синей Весте.',
  },
];

export const PRINTABLE_STL_PARTS: PrintableStlPart[] = [
  {
    id: 'spoiler',
    code: 'STL-01',
    name: 'Спойлер на крышку багажника',
    zone: 'Багажник (снаружи)',
    filament: 'Пластик PETG (чтобы не поплыл на солнце)',
    sizeMm: '440 × 65 × 24 мм (печатается частями)',
    infill: 'Заполнение 35%',
    printTime: 'около 5.5 часов',
    mount: 'Крепкий двусторонний скотч 3M',
    description: 'Аккуратный спойлер по форме багажника Весты. Ничего сверлить не нужно — напечатал, зашкурил, приклеил на 3M-скотч.',
  },
  {
    id: 'badge',
    code: 'STL-02',
    name: 'Объёмный ИКС-шильдик',
    zone: 'Решётка или багажник',
    filament: 'PETG (смена нити: чёрный + лайм)',
    sizeMm: '108 × 48 × 7.5 мм',
    infill: 'Заполнение 100%',
    printTime: '45 минут',
    mount: 'На место значка / 3M-скотч',
    description: 'Значок в стиле ИКС-линий Лады. Во время печати на 3 миллиметре ставим паузу, меняем пластик на лаймовый и получаем двухцветный значок.',
  },
  {
    id: 'wheel-cap',
    code: 'STL-03',
    name: 'Заглушка на диск (60 мм)',
    zone: 'Колёсные диски',
    filament: 'PETG или ASA',
    sizeMm: 'Диаметр 60 мм',
    infill: 'Заполнение 40%',
    printTime: '35 минут за 1 шт.',
    mount: 'Защёлкивается в центр диска',
    description: 'Простая крышечка в центр литого диска. Можно распечатать сразу 4 штуки и менять цвета хоть под каждую погоду.',
  },
  {
    id: 'mirror-trim',
    code: 'STL-04',
    name: 'Накладка-плавник на зеркало',
    zone: 'Боковые зеркала',
    filament: 'Чёрный PETG',
    sizeMm: '160 × 28 × 13 мм',
    infill: 'Заполнение 30%',
    printTime: '1 час 10 минут',
    mount: 'Клеится сверху на зеркало',
    description: 'Маленькая накладка на зеркало, которая защищает его от царапин и делает вид сбоку более спортивным.',
  },
  {
    id: 'phone-dock',
    code: 'STL-05',
    name: 'Подставка для телефона в салон',
    zone: 'Торпедо в салоне',
    filament: 'Чёрный PETG',
    sizeMm: '84 × 44 × 34 мм',
    infill: 'Заполнение 45%',
    printTime: '1 час 50 минут',
    mount: 'Ставится в нишу без клея',
    description: 'Удобная подставка под смартфон на панель Весты. Снизу сделал прорезь, чтобы можно было спокойно подключить зарядку.',
  },
];

export const STICKER_PACKS: StickerPack[] = [
  {
    id: 'x-contour',
    name: 'Наклейки «ИКС-Контур»',
    style: 'По линиям кузова',
    description: 'Полосы на двери и пороги, которые сделаны ровно под боковую форму Весты, чтобы не клеить абы как.',
    film: 'Виниловая плёнка (не боится мойки)',
    zones: 'Двери, пороги, передний бампер',
  },
  {
    id: 'shark',
    name: 'Стикерпак «Акула»',
    style: 'Из нашего проекта Smart Auto',
    description: 'Решил перенести наших крутых угловатых акул на Ладу Весту — они классно смотрятся на заднем стекле или крыле.',
    film: 'Плоттерная резка с контуром',
    zones: 'Заднее крыло, стекло, крышка багажника',
  },
  {
    id: 'rims',
    name: 'Полоски на диски и мелкие стикеры',
    style: 'Для деталей',
    description: 'Тонкие полоски на обод колёс и небольшие наклейки-стрелки на лючок бензобака и торпедо.',
    film: 'Обычный или светоотражающий винил',
    zones: 'Обода колёс, лючок, салон',
  },
];

export const CMF_MATERIALS: CmfMaterial[] = [
  {
    id: 'petg',
    code: 'CMF-01',
    name: 'Пластик PETG (для 3D-принтера)',
    category: '3D-печать',
    finish: 'Прочный, матовый',
    zones: 'Спойлер, накладка зеркала, подставка под телефон',
    spec: 'В отличие от обычного PLA, PETG не размягчается летом на солнце в закрытой машине.',
    swatchHex: '#181A1F',
  },
  {
    id: 'vinyl',
    code: 'CMF-02',
    name: 'Автомобильная виниловая плёнка',
    category: 'Наклейки',
    finish: 'Графит + яркий лайм',
    zones: 'Бока кузова, пороги, заднее крыло',
    spec: 'Легко режется на плоттере, не отклеивается на автомойке и снимается без следов.',
    swatchHex: '#C8F135',
  },
  {
    id: 'knit',
    code: 'CMF-03',
    name: 'Дышащая ткань 3D-сетка',
    category: 'Чехлы на сиденья',
    finish: 'Объёмная сетка',
    zones: 'Середина сидений и спинок',
    spec: 'Летом спина не потеет, а саму ткань легко пропылесосить или протереть.',
    swatchHex: '#272A32',
  },
  {
    id: 'suede',
    code: 'CMF-04',
    name: 'Эко-замша с лаймовой ниткой',
    category: 'Обивка и двери',
    finish: 'Мягкая с перфорацией',
    zones: 'Бока сидений, подлокотники дверей, оплётка руля',
    spec: 'Приятная на ощупь, не скользит и не рвётся.',
    swatchHex: '#373B44',
  },
  {
    id: 'metal',
    code: 'CMF-05',
    name: 'Тёмный матовый пластик и алюминий',
    category: 'Панель и диски',
    finish: 'Без бликов на солнце',
    zones: 'Вставки на торпедо и обод дисков',
    spec: 'Не оставляет отпечатков пальцев и не бликует на лобовое стекло.',
    swatchHex: '#636873',
  },
];

export const EXTERIOR_SPECS = [
  {
    part: 'Спойлер на багажник (3D-печать)',
    code: 'STL-01',
    tech: 'Печатается на 3D-принтере из PETG',
    detail: 'Модель можно скачать на сайте, распечатать и приклеить на скотч 3M без сверления',
  },
  {
    part: 'Диски 17" + 3D-заглушки',
    code: 'STL-03',
    tech: 'Литые диски + печатный колпачок 60 мм',
    detail: 'Колпачок в центре диска печатается с лаймовым кольцом под цвет наклеек',
  },
  {
    part: 'Накладка на зеркало + полоска',
    code: 'STL-04',
    tech: 'Плавник из 3D-принтера + винил',
    detail: 'Защищает зеркало от мелких веток и красиво смотрится сбоку',
  },
  {
    part: 'Объёмный ИКС-шильдик',
    code: 'STL-02',
    tech: 'Двухцветная 3D-печать со сменой пластика',
    detail: 'Легко напечатать даже на простом школьном 3D-принтере за 45 минут',
  },
];

export const USER_SCENARIO_STEPS = [
  {
    step: '01',
    title: 'Открыть сайт коллекции',
    description: 'Владелец LADA Vesta заходит на сайт, смотрит, как наклейки выглядят на его цвете машины, и выбирает нужные детали.',
    result: 'Все .STL и наклейки лежат бесплатно',
  },
  {
    step: '02',
    title: 'Распечатать на 3D-принтере',
    description: 'Скачивает .STL-файлы (спойлер, шильдик, колпачки, подставку под телефон) и печатает дома, в школе или у знакомых из PETG.',
    result: 'Выходит в разы дешевле магазина',
  },
  {
    step: '03',
    title: 'Вырезать наклейки и собрать всё',
    description: 'Режет плёнку на плоттере (или заказывает резку), клеит полосы по линиям дверей и крепит 3D-детали на 3M-скотч.',
    result: 'Можно собрать за одни выходные',
  },
  {
    step: '04',
    title: 'Поставить тему на экран EnjoY Pro',
    description: 'Включает на экране в машине и приборке тему VESTA PULSE — и внутри всё совпадает с внешним видом машины.',
    result: 'Машина выделяется в потоке',
  },
];

export const SLIDE_TITLES = [
  { num: 1, label: 'Титульный лист' },
  { num: 2, label: 'Идея: 3D + Наклейки' },
  { num: 3, label: 'Как выглядит снаружи' },
  { num: 4, label: 'Мои 3D-детали (.STL)' },
  { num: 5, label: 'Наклейки на 3 цветах' },
  { num: 6, label: 'Салон и подставка' },
  { num: 7, label: 'Материалы (PETG и плёнка)' },
  { num: 8, label: 'Экран EnjoY Pro и приборка' },
  { num: 9, label: 'Как этим пользоваться' },
  { num: 10, label: 'Итоги проекта' },
];
