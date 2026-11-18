import { useRef, useState } from 'react';
import { Download, FileCode2 } from 'lucide-react';
import { BODY_VARIANTS, GENERATED_ASSETS, STICKER_PACKS } from '../data/collectionData';
import { downloadStaticImage, downloadSvgAsPng, downloadSvgSource } from '../utils/exportImage';
import { DigitalClusterSvg, DigitalThemeMode, EnjoyProScreenSvg } from './DigitalMockups';
import { LiveryBlueprintSvg } from './LiveryBlueprintSvg';
import { ResilientImage } from './ResilientImage';

const RASTER_GALLERY = [
  {
    id: 'printed-parts',
    title: 'Комплект 3D-печатных деталей (спойлер, шильдик, держатель, колпачки)',
    slideRef: 'Слайд 4 · 3D-печать',
    description: 'Фотография напечатанных деталей из PETG Carbon и Вольт-Лайм на рабочем коврике.',
    src: GENERATED_ASSETS.printedParts,
    filename: '01_vesta_3d_printed_parts.jpg',
  },
  {
    id: 'sticker-sheets',
    title: 'Готовые листы кастомных наклеек («ИКС-Контур» и «Акула»)',
    slideRef: 'Слайд 2 / 5 · Наклейки',
    description: 'Плоттерная нарезка виниловых полос, стикеров «Акула» и лент на колёсные диски.',
    src: GENERATED_ASSETS.stickerSheets,
    filename: '02_vesta_sticker_sheets.jpg',
  },
  {
    id: 'exterior-34',
    title: 'Экстерьер LADA Vesta NG Седан (ракурс 3/4 спереди)',
    slideRef: 'Слайд 3 · Главный вид',
    description: 'Белая LADA Vesta NG с контурными наклейками и 3D-накладками зеркал.',
    src: GENERATED_ASSETS.exteriorThreeQuarter,
    filename: '03_vesta_exterior_front_3_4.jpg',
  },
  {
    id: 'trunk-spoiler',
    title: 'LADA Vesta NG сзади: 3D-печатный лип-спойлер и наклейки',
    slideRef: 'Слайд 3 / 4 · Вид сзади',
    description: 'Ракурс сзади 3/4 с установленным спойлером крышки багажника и боковыми наклейками.',
    src: GENERATED_ASSETS.trunkSpoilerView,
    filename: '04_vesta_rear_spoiler_stickers.jpg',
  },
  {
    id: 'exterior-details',
    title: 'Детали крупным планом: диски 17", зеркало и шильдик',
    slideRef: 'Слайд 4 · Крупные планы',
    description: 'Диск X-Spoke с 3D-заглушкой, накладка зеркала и тёмный шильдик.',
    src: GENERATED_ASSETS.exteriorDetails,
    filename: '05_vesta_details_closeup.jpg',
  },
  {
    id: 'color-variants',
    title: 'Адаптация наклеек на 3 цветах кузова (Белый, Серый, Синий)',
    slideRef: 'Слайд 5 · 3 цвета',
    description: 'Проверка читаемости виниловой графики на контрастных заводских эмалях LADA.',
    src: GENERATED_ASSETS.colorVariants,
    filename: '06_vesta_3_colors.jpg',
  },
  {
    id: 'interior-cabin',
    title: 'Интерьер салона LADA Vesta NG',
    slideRef: 'Слайд 6 · Салон',
    description: 'Сиденья с ИКС-прострочкой, экран LADA EnjoY Pro и цифровая приборка.',
    src: GENERATED_ASSETS.interiorCabin,
    filename: '07_vesta_interior_cabin.jpg',
  },
  {
    id: 'cmf-board',
    title: 'Карта материалов CMF (пластик, винил, ткани)',
    slideRef: 'Слайд 7 · Материалы',
    description: 'Образцы материалов: 3D-трикотаж, перфорированная микрозамша, пластик, металл.',
    src: GENERATED_ASSETS.cmfMaterials,
    filename: '08_vesta_cmf_materials.jpg',
  },
];

export function AssetLibrary() {
  const [blueprintColor, setBlueprintColor] = useState<'white' | 'grey' | 'cobalt'>('white');
  const [digitalTheme, setDigitalTheme] = useState<DigitalThemeMode>('pulse');
  const [exportStatus, setExportStatus] = useState<string | null>(null);

  const blueprintRef = useRef<SVGSVGElement | null>(null);
  const enjoyProRef = useRef<SVGSVGElement | null>(null);
  const clusterRef = useRef<SVGSVGElement | null>(null);

  const activeVariant =
    BODY_VARIANTS.find((v) => v.id === blueprintColor) ?? BODY_VARIANTS[0];

  const notifyExport = (msg: string) => {
    setExportStatus(msg);
    window.setTimeout(() => setExportStatus(null), 3000);
  };

  return (
    <div className="space-y-12">
      <div className="flex flex-wrap items-end justify-between gap-4 border-b border-[#E4E7EC] pb-6">
        <div>
          <p className="text-xs font-mono-tabular text-[#1D4ED8] font-semibold">
            Картинки для слайда «Мои предложения» и макеты под плоттер
          </p>
          <h2 className="mt-1 text-2xl lg:text-3xl font-bold tracking-tight [text-wrap:balance]">
            Кастомные наклейки, фото и макеты EnjoY Pro
          </h2>
          <p className="mt-2 text-sm text-[#555B66] max-w-2xl">
            Скачивайте готовые картинки для презентации (.JPG), векторные схемы наклеек для плоттерной резки (.SVG / .PNG) и экраны LADA EnjoY Pro.
          </p>
        </div>
        {exportStatus && (
          <div className="text-xs font-semibold text-[#111317] bg-[#C8F135] px-4 py-2 rounded-lg">
            {exportStatus}
          </div>
        )}
      </div>

      {/* Section 1: Sticker Packs Summary */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {STICKER_PACKS.map((pack) => (
          <div key={pack.id} className="bg-white border border-[#E4E7EC] rounded-xl p-5 space-y-2">
            <div className="text-xs font-mono-tabular text-[#1D4ED8] font-semibold">{pack.style}</div>
            <h3 className="text-sm font-bold text-[#111317]">{pack.name}</h3>
            <p className="text-xs text-[#555B66] leading-relaxed">{pack.description}</p>
            <div className="pt-2 border-t border-[#F1F3F6] text-[11px] text-[#555B66]">
              Зоны: {pack.zones}
            </div>
          </div>
        ))}
      </section>

      {/* Section 2: 8 High-Res Images */}
      <section className="space-y-5">
        <h3 className="text-lg font-bold tracking-tight">
          01. Фотографии и рендеры для презентации (8 шт.)
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {RASTER_GALLERY.map((asset) => (
            <article
              key={asset.id}
              className="bg-white border border-[#E4E7EC] rounded-xl overflow-hidden flex flex-col justify-between"
            >
              <div>
                <div className="aspect-video bg-[#ECEDF0] overflow-hidden border-b border-[#E4E7EC]">
                  <ResilientImage
                    src={asset.src}
                    alt={asset.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <div className="text-[11px] font-mono-tabular text-[#555B66]">
                    {asset.slideRef}
                  </div>
                  <h4 className="mt-1 text-sm font-bold leading-snug">{asset.title}</h4>
                  <p className="mt-1 text-xs text-[#555B66] leading-relaxed">
                    {asset.description}
                  </p>
                </div>
              </div>
              <div className="px-4 pb-4">
                <button
                  type="button"
                  onClick={async () => {
                    await downloadStaticImage(asset.src, asset.filename);
                    notifyExport(`Файл ${asset.filename} скачан`);
                  }}
                  className="w-full inline-flex items-center justify-center gap-2 px-3 py-2 text-xs font-semibold rounded-lg bg-[#111317] text-white hover:bg-[#232730] transition-colors cursor-pointer whitespace-nowrap"
                >
                  <Download className="w-3.5 h-3.5" />
                  Скачать .JPG
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Section 3: Vector Sticker Layout Blueprint */}
      <section className="bg-white border border-[#E4E7EC] rounded-xl p-6 space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-bold tracking-tight">
              02. Векторная схема наклеек на LADA Vesta NG (для плоттера)
            </h3>
            <p className="mt-1 text-xs text-[#555B66]">
              Переключайте цвет кузова и скачивайте макет разметки в .SVG или .PNG.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-1 p-1 bg-[#F1F3F6] rounded-lg">
              {BODY_VARIANTS.map((v) => (
                <button
                  key={v.id}
                  type="button"
                  onClick={() => setBlueprintColor(v.id)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                    blueprintColor === v.id
                      ? 'bg-white text-[#111317] shadow-sm'
                      : 'text-[#555B66] hover:text-[#111317]'
                  }`}
                >
                  {v.name.split(' ')[0]}
                </button>
              ))}
            </div>
            <button
              type="button"
              onClick={() => {
                downloadSvgSource(blueprintRef.current, `vesta_stickers_${blueprintColor}.svg`);
                notifyExport('Макет наклеек (.SVG) скачан');
              }}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-lg border border-[#E4E7EC] hover:bg-[#F3F5F8] transition-colors cursor-pointer whitespace-nowrap shrink-0"
            >
              <FileCode2 className="w-3.5 h-3.5" />
              Скачать .SVG
            </button>
            <button
              type="button"
              onClick={async () => {
                await downloadSvgAsPng(
                  blueprintRef.current,
                  `vesta_stickers_${blueprintColor}.png`,
                  1920,
                  864
                );
                notifyExport('Схема наклеек (.PNG) скачана');
              }}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-lg bg-[#111317] text-white hover:bg-[#232730] transition-colors cursor-pointer whitespace-nowrap shrink-0"
            >
              <Download className="w-3.5 h-3.5" />
              Скачать .PNG
            </button>
          </div>
        </div>

        <div className="border border-[#E4E7EC] rounded-xl overflow-hidden bg-[#F8F9FB]">
          <LiveryBlueprintSvg ref={blueprintRef} variant={activeVariant} className="w-full h-auto" />
        </div>
      </section>

      {/* Section 4: Digital Interface Mockups */}
      <section className="bg-white border border-[#E4E7EC] rounded-xl p-6 space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-bold tracking-tight">
              03. Макеты LADA EnjoY Pro и цифровой приборной панели
            </h3>
            <p className="mt-1 text-xs text-[#555B66]">
              Готовые экраны для слайда 8 (Digital-кастомизация) в форматах .SVG и .PNG.
            </p>
          </div>
          <div className="flex items-center gap-1 p-1 bg-[#F1F3F6] rounded-lg">
            {[
              { id: 'pulse' as const, label: 'Тема Пульс' },
              { id: 'night' as const, label: 'Ночь' },
              { id: 'day' as const, label: 'День' },
            ].map((m) => (
              <button
                key={m.id}
                type="button"
                onClick={() => setDigitalTheme(m.id)}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                  digitalTheme === m.id
                    ? 'bg-white text-[#111317] shadow-sm'
                    : 'text-[#555B66] hover:text-[#111317]'
                }`}
              >
                {m.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-5 flex flex-col items-center gap-4 border border-[#E4E7EC] rounded-xl p-5 bg-[#F8F9FB]">
            <EnjoyProScreenSvg
              ref={enjoyProRef}
              mode={digitalTheme}
              className="w-full max-w-[300px] h-auto"
            />
            <div className="flex items-center gap-2 w-full justify-center">
              <button
                type="button"
                onClick={() => {
                  downloadSvgSource(enjoyProRef.current, `lada_enjoy_pro_${digitalTheme}.svg`);
                  notifyExport('Макет EnjoY Pro (.SVG) скачан');
                }}
                className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg border border-[#E4E7EC] bg-white hover:bg-[#F3F5F8] transition-colors cursor-pointer whitespace-nowrap"
              >
                <FileCode2 className="w-3.5 h-3.5" />
                .SVG
              </button>
              <button
                type="button"
                onClick={async () => {
                  await downloadSvgAsPng(
                    enjoyProRef.current,
                    `lada_enjoy_pro_${digitalTheme}.png`,
                    840,
                    1360
                  );
                  notifyExport('Макет EnjoY Pro (.PNG) скачан');
                }}
                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-lg bg-[#111317] text-white hover:bg-[#232730] transition-colors cursor-pointer whitespace-nowrap"
              >
                <Download className="w-3.5 h-3.5" />
                Скачать EnjoY Pro (.PNG)
              </button>
            </div>
          </div>

          <div className="lg:col-span-7 flex flex-col items-center gap-4 border border-[#E4E7EC] rounded-xl p-5 bg-[#F8F9FB]">
            <DigitalClusterSvg
              ref={clusterRef}
              mode={digitalTheme}
              className="w-full h-auto"
            />
            <div className="flex items-center gap-2 w-full justify-center">
              <button
                type="button"
                onClick={() => {
                  downloadSvgSource(clusterRef.current, `lada_digital_cluster_${digitalTheme}.svg`);
                  notifyExport('Приборная панель (.SVG) скачана');
                }}
                className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg border border-[#E4E7EC] bg-white hover:bg-[#F3F5F8] transition-colors cursor-pointer whitespace-nowrap"
              >
                <FileCode2 className="w-3.5 h-3.5" />
                .SVG
              </button>
              <button
                type="button"
                onClick={async () => {
                  await downloadSvgAsPng(
                    clusterRef.current,
                    `lada_digital_cluster_${digitalTheme}.png`,
                    1680,
                    680
                  );
                  notifyExport('Приборная панель (.PNG) скачана');
                }}
                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-lg bg-[#111317] text-white hover:bg-[#232730] transition-colors cursor-pointer whitespace-nowrap"
              >
                <Download className="w-3.5 h-3.5" />
                Скачать приборку (.PNG)
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
