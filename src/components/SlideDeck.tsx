import { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, Download, FileDown, SlidersHorizontal } from 'lucide-react';
import {
  BODY_VARIANTS,
  CMF_MATERIALS,
  COLLECTION_PALETTE,
  EXTERIOR_SPECS,
  GENERATED_ASSETS,
  SLIDE_TITLES,
  USER_SCENARIO_STEPS,
} from '../data/collectionData';
import { exportSingleSlidePng } from '../utils/pdfExporter';
import { DigitalClusterSvg, DigitalThemeMode, EnjoyProScreenSvg } from './DigitalMockups';
import { LiveryBlueprintSvg } from './LiveryBlueprintSvg';
import { ResilientImage } from './ResilientImage';

export interface PresentationAuthor {
  fio: string;
  school: string;
  team: string;
  city: string;
}

interface SlideDeckProps {
  author: PresentationAuthor;
  onUpdateAuthor: (next: PresentationAuthor) => void;
  onExportPdf: () => void;
  isExportingPdf: boolean;
  pdfProgress: { current: number; total: number } | null;
}

export function SlideDeck({
  author,
  onUpdateAuthor,
  onExportPdf,
  isExportingPdf,
  pdfProgress,
}: SlideDeckProps) {
  const [activeSlide, setActiveSlide] = useState(1);
  const [showAuthorEditor, setShowAuthorEditor] = useState(false);
  const [selectedColorId, setSelectedColorId] = useState<'white' | 'grey' | 'cobalt'>('white');
  const [digitalMode, setDigitalMode] = useState<DigitalThemeMode>('pulse');
  const [isExportingPng, setIsExportingPng] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }
      if (e.key === 'ArrowRight') {
        setActiveSlide((prev) => Math.min(10, prev + 1));
      } else if (e.key === 'ArrowLeft') {
        setActiveSlide((prev) => Math.max(1, prev - 1));
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const activeVariant =
    BODY_VARIANTS.find((v) => v.id === selectedColorId) ?? BODY_VARIANTS[0];

  const renderSlideContent = (slideNum: number) => {
    switch (slideNum) {
      case 1:
        return (
          <div className="relative h-full w-full bg-[#111317] text-white grid grid-cols-12 overflow-hidden">
            <div className="col-span-5 flex flex-col justify-between p-10 lg:p-12 z-10 bg-[#111317]">
              <div>
                <div className="text-xs font-medium tracking-wide text-[#9CA3AF] flex items-center gap-2">
                  <span>Инженеры транспорта</span>
                  <span aria-hidden="true">·</span>
                  <span>Первые × АВТОВАЗ</span>
                </div>
                <div className="mt-8 h-1 w-14 bg-[#C8F135]" />
                <h2 className="mt-6 text-4xl lg:text-5xl font-extrabold tracking-tight leading-[1.06] [text-wrap:balance]">
                  LADA VESTA PULSE
                </h2>
                <p className="mt-4 text-base lg:text-lg text-[#D1D5DB] leading-relaxed">
                  3D-печать и кастомные наклейки для LADA Vesta NG Седан с официальным сайтом моделей
                </p>
              </div>

              <div className="border-t border-white/15 pt-6 space-y-2 text-sm">
                <div className="flex justify-between gap-4">
                  <span className="text-[#9CA3AF]">Модель</span>
                  <span className="font-semibold text-white">LADA Vesta NG Седан</span>
                </div>
                <div className="flex justify-between gap-4">
                  <span className="text-[#9CA3AF]">Участник</span>
                  <span className="font-semibold text-white text-right">{author.fio}</span>
                </div>
                <div className="flex justify-between gap-4">
                  <span className="text-[#9CA3AF]">Команда / Организация</span>
                  <span className="font-medium text-[#D1D5DB] text-right">
                    {author.team} · {author.school}
                  </span>
                </div>
                <div className="flex justify-between gap-4">
                  <span className="text-[#9CA3AF]">Город · Год</span>
                  <span className="font-mono-tabular text-[#C8F135]">
                    {author.city} · 2026
                  </span>
                </div>
              </div>
            </div>

            <div className="col-span-7 relative h-full">
              <ResilientImage
                src={GENERATED_ASSETS.exteriorThreeQuarter}
                alt="LADA Vesta NG Седан VESTA PULSE ракурс 3/4"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#111317] via-transparent to-transparent" />
            </div>
          </div>
        );

      case 2:
        return (
          <div className="h-full w-full bg-white text-[#111317] p-8 lg:p-10 flex flex-col justify-between">
            <div className="flex items-baseline justify-between border-b border-[#E4E7EC] pb-4">
              <div>
                <p className="text-xs font-mono-tabular text-[#555B66]">
                  Слайд 02 / 10 · Мудборд и главная идея проекта
                </p>
                <h2 className="mt-1 text-2xl lg:text-3xl font-bold tracking-tight">
                  Концепция: 3D-печать + кастомные наклейки с сайта
                </h2>
              </div>
              <span className="text-xs font-medium text-[#1D4ED8]">
                Целевая аудитория: 18–28 лет
              </span>
            </div>

            <div className="grid grid-cols-12 gap-6 my-auto py-4">
              <div className="col-span-7 flex flex-col justify-between gap-4">
                <div className="grid grid-cols-3 gap-4">
                  <div className="border border-[#E4E7EC] rounded-xl p-4 bg-[#F8F9FB]">
                    <p className="text-xs font-mono-tabular text-[#1D4ED8] font-semibold">01. 3D-печать (.STL)</p>
                    <p className="mt-2 text-sm font-semibold">Детали своими руками</p>
                    <p className="mt-1 text-xs text-[#555B66] leading-relaxed">
                      Спойлер, ИКС-шильдик, заглушки дисков и держатель смартфона можно скачать с сайта и напечатать из PETG/ASA.
                    </p>
                  </div>
                  <div className="border border-[#E4E7EC] rounded-xl p-4 bg-[#F8F9FB]">
                    <p className="text-xs font-mono-tabular text-[#1D4ED8] font-semibold">02. Наклейки</p>
                    <p className="mt-2 text-sm font-semibold">Стикерпаки и ИКС-линии</p>
                    <p className="mt-1 text-xs text-[#555B66] leading-relaxed">
                      Готовые векторные листы виниловых полос, стикеров «Акула» и лент на диски под плоттерную резку.
                    </p>
                  </div>
                  <div className="border border-[#E4E7EC] rounded-xl p-4 bg-[#F8F9FB]">
                    <p className="text-xs font-mono-tabular text-[#1D4ED8] font-semibold">03. Официальный сайт</p>
                    <p className="mt-2 text-sm font-semibold">Открытая библиотека</p>
                    <p className="mt-1 text-xs text-[#555B66] leading-relaxed">
                      Владелец сам выбирает набор на сайте, скачивает .STL и наклейки бесплатно или заказывает печать у дилера.
                    </p>
                  </div>
                </div>

                <div className="border border-[#E4E7EC] rounded-xl p-4 bg-[#F8F9FB]">
                  <p className="text-xs font-semibold text-[#555B66] mb-3">
                    Цветовая палитра (филамент и виниловая плёнка)
                  </p>
                  <div className="grid grid-cols-4 gap-3">
                    {COLLECTION_PALETTE.map((token) => (
                      <div key={token.code} className="space-y-1.5">
                        <div
                          className="h-12 w-full rounded-lg border border-black/10"
                          style={{ backgroundColor: token.hex }}
                        />
                        <div className="text-xs font-semibold leading-tight">{token.name}</div>
                        <div className="text-[11px] font-mono-tabular text-[#555B66]">
                          {token.hex} · {token.code}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="col-span-5 grid grid-rows-2 gap-3">
                <div className="rounded-xl overflow-hidden border border-[#E4E7EC]">
                  <ResilientImage
                    src={GENERATED_ASSETS.printedParts}
                    alt="3D-печатные детали для LADA Vesta NG"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="rounded-xl overflow-hidden border border-[#E4E7EC]">
                  <ResilientImage
                    src={GENERATED_ASSETS.stickerSheets}
                    alt="Листы кастомных наклеек VESTA PULSE"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between border-t border-[#E4E7EC] pt-3 text-xs text-[#555B66]">
              <span>Доступный конструктор: 3D-принтер + виниловые наклейки без перекраски</span>
              <span className="font-mono-tabular">LADA Vesta NG Седан · VESTA PULSE</span>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="h-full w-full bg-white text-[#111317] p-8 lg:p-10 flex flex-col justify-between">
            <div className="flex items-baseline justify-between border-b border-[#E4E7EC] pb-4">
              <div>
                <p className="text-xs font-mono-tabular text-[#555B66]">
                  Слайд 03 / 10 · Экстерьер автомобиля
                </p>
                <h2 className="mt-1 text-2xl lg:text-3xl font-bold tracking-tight">
                  Общий вид 3/4 спереди и сзади: наклейки и 3D-спойлер
                </h2>
              </div>
              <span className="text-xs font-mono-tabular text-[#555B66]">Экстерьер</span>
            </div>

            <div className="grid grid-cols-12 gap-5 my-auto py-3 items-stretch">
              <div className="col-span-7 rounded-xl overflow-hidden border border-[#E4E7EC] bg-[#F3F4F6]">
                <ResilientImage
                  src={GENERATED_ASSETS.exteriorThreeQuarter}
                  alt="Общий вид 3/4 спереди LADA Vesta NG Седан с наклейками VESTA PULSE"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="col-span-5 flex flex-col justify-between gap-3">
                <div className="rounded-xl overflow-hidden border border-[#E4E7EC] flex-1 bg-[#F3F4F6]">
                  <ResilientImage
                    src={GENERATED_ASSETS.trunkSpoilerView}
                    alt="Вид сзади 3/4 со спойлером крышки багажника и наклейками"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="border border-[#E4E7EC] rounded-xl p-4 bg-[#F8F9FB]">
                  <p className="text-xs font-mono-tabular text-[#1D4ED8] font-semibold">
                    Что изменено снаружи
                  </p>
                  <p className="mt-1 text-xs text-[#555B66] leading-relaxed">
                    Наклейки точно повторяют боковые ИКС-выштамповки кузова, а 3D-печатный лип-спойлер и накладки зеркал крепятся на 3M-скотч без сверления.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between border-t border-[#E4E7EC] pt-3 text-xs text-[#555B66]">
              <span>Сохранение заводской гарантии и кузова — все детали съёмные</span>
              <span className="font-mono-tabular">Ракурсы 3/4 спереди и сзади</span>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="h-full w-full bg-white text-[#111317] p-8 lg:p-10 flex flex-col justify-between">
            <div className="flex items-baseline justify-between border-b border-[#E4E7EC] pb-4">
              <div>
                <p className="text-xs font-mono-tabular text-[#555B66]">
                  Слайд 04 / 10 · Детали экстерьера и 3D-печать (.STL)
                </p>
                <h2 className="mt-1 text-2xl lg:text-3xl font-bold tracking-tight">
                  Печатные детали: спойлер, шильдик, заглушки дисков и зеркала
                </h2>
              </div>
              <span className="text-xs font-mono-tabular text-[#555B66]">Файлы .STL на сайте</span>
            </div>

            <div className="grid grid-cols-12 gap-5 my-auto py-3 items-stretch">
              <div className="col-span-6 grid grid-rows-2 gap-3">
                <div className="rounded-xl overflow-hidden border border-[#E4E7EC] bg-[#F3F4F6]">
                  <ResilientImage
                    src={GENERATED_ASSETS.printedParts}
                    alt="3D-печатные детали для LADA Vesta NG"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="rounded-xl overflow-hidden border border-[#E4E7EC] bg-[#F3F4F6]">
                  <ResilientImage
                    src={GENERATED_ASSETS.exteriorDetails}
                    alt="Колёсный диск, накладка зеркала и шильдик"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              <div className="col-span-6 flex flex-col justify-between gap-2.5">
                {EXTERIOR_SPECS.map((item) => (
                  <div
                    key={item.code}
                    className="border border-[#E4E7EC] rounded-xl p-3.5 bg-[#F8F9FB]"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-sm font-bold">{item.part}</span>
                      <span className="text-[11px] font-mono-tabular text-[#1D4ED8] font-semibold">
                        {item.code}
                      </span>
                    </div>
                    <p className="mt-1 text-xs font-medium text-[#111317]">{item.tech}</p>
                    <p className="mt-1 text-xs text-[#555B66] leading-snug">{item.detail}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between border-t border-[#E4E7EC] pt-3 text-xs text-[#555B66]">
              <span>Каждая 3D-модель доступна для скачивания в .STL на сайте коллекции</span>
              <span className="font-mono-tabular">STL-01 · STL-02 · STL-03 · STL-04</span>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="h-full w-full bg-white text-[#111317] p-8 lg:p-10 flex flex-col justify-between">
            <div className="flex items-baseline justify-between border-b border-[#E4E7EC] pb-4">
              <div>
                <p className="text-xs font-mono-tabular text-[#555B66]">
                  Слайд 05 / 10 · Адаптивность наклеек
                </p>
                <h2 className="mt-1 text-2xl lg:text-3xl font-bold tracking-tight">
                  Читаемость наклеек на трёх контрастных цветах кузова
                </h2>
              </div>
              <div className="no-print flex items-center gap-1 p-1 bg-[#F1F3F6] rounded-lg">
                {BODY_VARIANTS.map((v) => (
                  <button
                    key={v.id}
                    type="button"
                    onClick={() => setSelectedColorId(v.id)}
                    className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                      selectedColorId === v.id
                        ? 'bg-white text-[#111317] shadow-sm'
                        : 'text-[#555B66] hover:text-[#111317]'
                    }`}
                  >
                    {v.name.split(' ')[0]}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-12 gap-5 my-auto py-3">
              <div className="col-span-7 flex flex-col gap-3">
                <div className="rounded-xl overflow-hidden border border-[#E4E7EC] flex-1 bg-[#F3F4F6]">
                  <ResilientImage
                    src={GENERATED_ASSETS.colorVariants}
                    alt="Адаптация наклеек на белом, сером и синем кузовах LADA Vesta NG"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="grid grid-cols-3 gap-3">
                  {BODY_VARIANTS.map((variant) => (
                    <div
                      key={variant.id}
                      className="border border-[#E4E7EC] rounded-xl p-3 bg-[#F8F9FB]"
                    >
                      <div className="flex items-center gap-2">
                        <span
                          className="w-3.5 h-3.5 rounded-sm border border-black/15 shrink-0"
                          style={{ backgroundColor: variant.bodyHex }}
                        />
                        <span className="text-xs font-bold truncate">{variant.name}</span>
                      </div>
                      <p className="mt-1 text-[11px] text-[#555B66] leading-snug">
                        {variant.contrastNote}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="col-span-5 flex flex-col justify-between border border-[#E4E7EC] rounded-xl p-3 bg-[#F8F9FB]">
                <div className="flex items-center justify-between text-xs px-1">
                  <span className="font-semibold">Схема раскроя наклеек</span>
                  <span className="font-mono-tabular text-[#1D4ED8]">{activeVariant.name}</span>
                </div>
                <LiveryBlueprintSvg variant={activeVariant} className="w-full h-auto rounded-lg" />
                <p className="text-[11px] text-[#555B66] px-1">
                  Двухслойная виниловая наклейка (тёмный графит + яркий кант Вольт-Лайм) одинаково хорошо видна на светлом, сером и синем кузове.
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between border-t border-[#E4E7EC] pt-3 text-xs text-[#555B66]">
              <span>Один макет плоттерной резки подходит на любой заводской цвет LADA Vesta NG</span>
              <span className="font-mono-tabular">Контраст ≥ 4.5:1</span>
            </div>
          </div>
        );

      case 6:
        return (
          <div className="h-full w-full bg-white text-[#111317] p-8 lg:p-10 flex flex-col justify-between">
            <div className="flex items-baseline justify-between border-b border-[#E4E7EC] pb-4">
              <div>
                <p className="text-xs font-mono-tabular text-[#555B66]">
                  Слайд 06 / 10 · Интерьер автомобиля
                </p>
                <h2 className="mt-1 text-2xl lg:text-3xl font-bold tracking-tight">
                  Салон: чехлы, прострочка и 3D-держатель смартфона
                </h2>
              </div>
              <span className="text-xs font-mono-tabular text-[#555B66]">Интерьер NG</span>
            </div>

            <div className="grid grid-cols-12 gap-6 my-auto py-3 items-stretch">
              <div className="col-span-8 rounded-xl overflow-hidden border border-[#E4E7EC] bg-[#181A1F]">
                <ResilientImage
                  src={GENERATED_ASSETS.interiorCabin}
                  alt="Интерьер салона LADA Vesta NG VESTA PULSE"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="col-span-4 flex flex-col justify-between gap-3">
                <div className="border border-[#E4E7EC] rounded-xl p-4 bg-[#F8F9FB]">
                  <p className="text-xs font-mono-tabular text-[#1D4ED8] font-semibold">01. Сиденья и чехлы</p>
                  <p className="mt-1 text-sm font-semibold">3D-сетка и ИКС-строчка</p>
                  <p className="mt-1 text-xs text-[#555B66] leading-relaxed">
                    Дышащая сетка по центру и перфорированная микрозамша по бокам с контрастной нитью Вольт-Лайм.
                  </p>
                </div>
                <div className="border border-[#E4E7EC] rounded-xl p-4 bg-[#F8F9FB]">
                  <p className="text-xs font-mono-tabular text-[#1D4ED8] font-semibold">02. 3D-аксессуар (STL-05)</p>
                  <p className="mt-1 text-sm font-semibold">Держатель смартфона на панель</p>
                  <p className="mt-1 text-xs text-[#555B66] leading-relaxed">
                    Печатается на 3D-принтере из матового PETG, защёлкивается в штатную нишу панели без клея и имеет вырез под провод.
                  </p>
                </div>
                <div className="border border-[#E4E7EC] rounded-xl p-4 bg-[#F8F9FB]">
                  <p className="text-xs font-mono-tabular text-[#1D4ED8] font-semibold">03. Дверные карты и руль</p>
                  <p className="mt-1 text-sm font-semibold">Поддержка общей стилистики</p>
                  <p className="mt-1 text-xs text-[#555B66] leading-relaxed">
                    ИКС-узор на вставках дверей, оплётка руля и окантовка ковриков повторяют цвет наклеек на кузове.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between border-t border-[#E4E7EC] pt-3 text-xs text-[#555B66]">
              <span>Матовые материалы без бликов на лобовом стекле</span>
              <span className="font-mono-tabular">EnjoY Pro 10.4" · STL-05</span>
            </div>
          </div>
        );

      case 7:
        return (
          <div className="h-full w-full bg-white text-[#111317] p-8 lg:p-10 flex flex-col justify-between">
            <div className="flex items-baseline justify-between border-b border-[#E4E7EC] pb-4">
              <div>
                <p className="text-xs font-mono-tabular text-[#555B66]">
                  Слайд 07 / 10 · Карта материалов CMF
                </p>
                <h2 className="mt-1 text-2xl lg:text-3xl font-bold tracking-tight">
                  Материалы для 3D-печати, винила и отделки салона
                </h2>
              </div>
              <span className="text-xs font-mono-tabular text-[#555B66]">5 материалов</span>
            </div>

            <div className="grid grid-cols-12 gap-5 my-auto py-2 items-stretch">
              <div className="col-span-5 rounded-xl overflow-hidden border border-[#E4E7EC] bg-[#ECEDF0]">
                <ResilientImage
                  src={GENERATED_ASSETS.cmfMaterials}
                  alt="Карта материалов CMF: пластик, винил, 3D-трикотаж, микрозамша"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="col-span-7 flex flex-col justify-between gap-2">
                {CMF_MATERIALS.map((mat) => (
                  <div
                    key={mat.id}
                    className="border border-[#E4E7EC] rounded-xl px-4 py-2.5 bg-[#F8F9FB] grid grid-cols-12 gap-3 items-center"
                  >
                    <div className="col-span-4 flex items-center gap-3">
                      <span
                        className="w-8 h-8 rounded-lg border border-black/15 shrink-0"
                        style={{ backgroundColor: mat.swatchHex }}
                      />
                      <div className="min-w-0">
                        <div className="text-[11px] font-mono-tabular text-[#1D4ED8] font-semibold">
                          {mat.code}
                        </div>
                        <div className="text-xs font-bold truncate">{mat.name}</div>
                      </div>
                    </div>
                    <div className="col-span-4 text-xs text-[#111317]">
                      <span className="font-semibold">Зона: </span>
                      <span className="text-[#555B66]">{mat.zones}</span>
                    </div>
                    <div className="col-span-4 text-[11px] text-[#555B66] leading-snug">
                      {mat.spec}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between border-t border-[#E4E7EC] pt-3 text-xs text-[#555B66]">
              <span>PETG/ASA выдерживает солнце и мойку, винил снимается без следов</span>
              <span className="font-mono-tabular">PETG · Винил · Эко-текстиль</span>
            </div>
          </div>
        );

      case 8:
        return (
          <div className="h-full w-full bg-white text-[#111317] p-8 lg:p-10 flex flex-col justify-between">
            <div className="flex items-baseline justify-between border-b border-[#E4E7EC] pb-4">
              <div>
                <p className="text-xs font-mono-tabular text-[#555B66]">
                  Слайд 08 / 10 · Digital-кастомизация
                </p>
                <h2 className="mt-1 text-2xl lg:text-3xl font-bold tracking-tight">
                  Цифровая среда: LADA EnjoY Pro и приборная панель
                </h2>
              </div>
              <div className="no-print flex items-center gap-1 p-1 bg-[#F1F3F6] rounded-lg">
                {[
                  { id: 'pulse' as const, label: 'Пульс' },
                  { id: 'night' as const, label: 'Ночь' },
                  { id: 'day' as const, label: 'День' },
                ].map((m) => (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => setDigitalMode(m.id)}
                    className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                      digitalMode === m.id
                        ? 'bg-white text-[#111317] shadow-sm'
                        : 'text-[#555B66] hover:text-[#111317]'
                    }`}
                  >
                    {m.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-12 gap-6 my-auto py-3 items-center">
              <div className="col-span-4 flex flex-col items-center">
                <EnjoyProScreenSvg
                  mode={digitalMode}
                  className="w-full max-h-[340px] h-auto drop-shadow-sm"
                />
                <p className="mt-2 text-xs font-semibold">
                  LADA EnjoY Pro (10.4&quot;) · Главный экран
                </p>
              </div>

              <div className="col-span-8 flex flex-col justify-between gap-4">
                <DigitalClusterSvg
                  mode={digitalMode}
                  className="w-full h-auto drop-shadow-sm"
                />
                <div className="grid grid-cols-3 gap-3">
                  <div className="border border-[#E4E7EC] rounded-xl p-3 bg-[#F8F9FB]">
                    <p className="text-xs font-bold">Шкалы ИКС-арка</p>
                    <p className="mt-1 text-[11px] text-[#555B66]">
                      Дуги спидометра и тахометра повторяют угол боковых наклеек и выштамповок Vesta NG.
                    </p>
                  </div>
                  <div className="border border-[#E4E7EC] rounded-xl p-3 bg-[#F8F9FB]">
                    <p className="text-xs font-bold">Связь с 3D-деталями</p>
                    <p className="mt-1 text-[11px] text-[#555B66]">
                      Цвет акцентов на экране совпадает с цветом напечатанных вставок и виниловой плёнки.
                    </p>
                  </div>
                  <div className="border border-[#E4E7EC] rounded-xl p-3 bg-[#F8F9FB]">
                    <p className="text-xs font-bold">Тема с сайта</p>
                    <p className="mt-1 text-[11px] text-[#555B66]">
                      Пакет обоев и иконок скачивается вместе с .STL-моделями в одном архиве коллекции.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between border-t border-[#E4E7EC] pt-3 text-xs text-[#555B66]">
              <span>Единый стиль экстерьера, 3D-аксессуаров, наклеек и экранов</span>
              <span className="font-mono-tabular">UI-тема: VESTA PULSE</span>
            </div>
          </div>
        );

      case 9:
        return (
          <div className="h-full w-full bg-white text-[#111317] p-8 lg:p-10 flex flex-col justify-between">
            <div className="flex items-baseline justify-between border-b border-[#E4E7EC] pb-4">
              <div>
                <p className="text-xs font-mono-tabular text-[#555B66]">
                  Слайд 09 / 10 · Пользовательский сценарий
                </p>
                <h2 className="mt-1 text-2xl lg:text-3xl font-bold tracking-tight">
                  Как владелец кастомизирует машину через официальный сайт
                </h2>
              </div>
              <span className="text-xs font-mono-tabular text-[#555B66]">4 простых шага</span>
            </div>

            <div className="grid grid-cols-4 gap-4 my-auto py-4">
              {USER_SCENARIO_STEPS.map((item) => (
                <div
                  key={item.step}
                  className="border border-[#E4E7EC] rounded-xl p-5 bg-[#F8F9FB] flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-extrabold font-mono-tabular text-[#1D4ED8]">
                        {item.step}
                      </span>
                      <span className="h-1.5 w-8 bg-[#C8F135]" />
                    </div>
                    <h3 className="mt-4 text-base font-bold leading-snug">{item.title}</h3>
                    <p className="mt-2 text-xs text-[#555B66] leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-[#E4E7EC] text-[11px] font-semibold text-[#111317]">
                    {item.result}
                  </div>
                </div>
              ))}
            </div>

            <div className="border border-[#E4E7EC] rounded-xl p-4 bg-[#111317] text-white flex items-center justify-between gap-6">
              <div>
                <p className="text-xs font-mono-tabular text-[#C8F135]">
                  Почему это удобно для молодёжи
                </p>
                <p className="mt-1 text-sm font-medium">
                  Не нужно покупать дорогой заводской обвес — все модельки и лекала наклеек лежат в открытом доступе на сайте коллекции.
                </p>
              </div>
              <span className="text-xs font-mono-tabular text-[#9CA3AF] whitespace-nowrap shrink-0">
                .STL + .SVG + EnjoY Pro
              </span>
            </div>
          </div>
        );

      case 10:
        return (
          <div className="h-full w-full bg-[#111317] text-white p-8 lg:p-10 flex flex-col justify-between">
            <div className="flex items-baseline justify-between border-b border-white/15 pb-4">
              <div>
                <p className="text-xs font-mono-tabular text-[#C8F135]">
                  Слайд 10 / 10 · Презентационный лист продукта
                </p>
                <h2 className="mt-1 text-2xl lg:text-3xl font-extrabold tracking-tight">
                  LADA VESTA PULSE — сайт 3D-моделей и наклеек для Vesta NG
                </h2>
              </div>
              <span className="text-xs font-mono-tabular text-[#9CA3AF]">Итог проекта</span>
            </div>

            <div className="grid grid-cols-12 gap-6 my-auto py-3 items-stretch">
              <div className="col-span-7 flex flex-col gap-3">
                <div className="rounded-xl overflow-hidden border border-white/15 flex-1">
                  <ResilientImage
                    src={GENERATED_ASSETS.exteriorThreeQuarter}
                    alt="Финальный презентационный плакат LADA VESTA PULSE"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="grid grid-cols-3 gap-3">
                  <div className="rounded-xl overflow-hidden border border-white/15 h-28">
                    <ResilientImage
                      src={GENERATED_ASSETS.trunkSpoilerView}
                      alt="Вид сзади со спойлером"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="rounded-xl overflow-hidden border border-white/15 h-28">
                    <ResilientImage
                      src={GENERATED_ASSETS.printedParts}
                      alt="3D-печатные детали"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="rounded-xl overflow-hidden border border-white/15 h-28">
                    <ResilientImage
                      src={GENERATED_ASSETS.stickerSheets}
                      alt="Наборы наклеек"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>

              <div className="col-span-5 flex flex-col justify-between gap-3">
                <div className="border border-white/15 rounded-xl p-4 bg-white/5">
                  <p className="text-xs font-mono-tabular text-[#C8F135]">Что входит в коллекцию</p>
                  <ul className="mt-2.5 space-y-1.5 text-xs text-[#E5E7EB]">
                    <li>· 5 готовых 3D-моделей (.STL): спойлер, шильдик, колпачки, плавник зеркала, держатель телефона</li>
                    <li>· Наборы виниловых наклеек («ИКС-Контур», «Акула», ленты на диски)</li>
                    <li>· Адаптация графики на 3 цветах: Белый, Тайфун, Кобальт</li>
                    <li>· Салон из 3D-трикотажа и скин для LADA EnjoY Pro</li>
                  </ul>
                </div>

                <div className="border border-white/15 rounded-xl p-4 bg-white/5">
                  <p className="text-xs font-mono-tabular text-[#C8F135]">Плюсы для АВТОВАЗ и владельцев</p>
                  <div className="mt-2.5 grid grid-cols-2 gap-3 text-xs">
                    <div>
                      <div className="font-bold text-white">Просто внедрить</div>
                      <div className="text-[#9CA3AF]">Модели скачиваются с официального сайта</div>
                    </div>
                    <div>
                      <div className="font-bold text-white">Низкая цена</div>
                      <div className="text-[#9CA3AF]">3D-печать из PETG и плоттерная резка</div>
                    </div>
                  </div>
                </div>

                <div className="border border-[#C8F135]/40 rounded-xl p-4 bg-[#C8F135]/10">
                  <div className="text-xs font-semibold text-[#C8F135]">Готовность материалов</div>
                  <div className="mt-1 text-sm font-bold text-white">
                    На сайте доступны для скачивания .STL файлы деталей, .SVG макеты наклеек и эта презентация.
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between border-t border-white/15 pt-3 text-xs text-[#9CA3AF]">
              <span>{author.fio} · {author.team} · {author.school}</span>
              <span className="font-mono-tabular">LADA NEW WAVE · 2026</span>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="no-print flex flex-wrap items-center justify-between gap-4 bg-white border border-[#E4E7EC] rounded-xl p-4">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setActiveSlide((prev) => Math.max(1, prev - 1))}
            disabled={activeSlide === 1}
            className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg border border-[#E4E7EC] hover:bg-[#F3F5F8] disabled:opacity-40 transition-colors cursor-pointer whitespace-nowrap shrink-0"
          >
            <ChevronLeft className="w-4 h-4" />
            Назад
          </button>
          <span className="text-sm font-semibold font-mono-tabular px-2">
            Слайд {activeSlide} / 10
          </span>
          <button
            type="button"
            onClick={() => setActiveSlide((prev) => Math.min(10, prev + 1))}
            disabled={activeSlide === 10}
            className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg border border-[#E4E7EC] hover:bg-[#F3F5F8] disabled:opacity-40 transition-colors cursor-pointer whitespace-nowrap shrink-0"
          >
            Вперёд
            <ChevronRight className="w-4 h-4" />
          </button>
          <span className="hidden lg:inline text-xs text-[#555B66] pl-2">
            {SLIDE_TITLES[activeSlide - 1]?.label}
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            type="button"
            onClick={() => setShowAuthorEditor((v) => !v)}
            className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-lg border border-[#E4E7EC] hover:bg-[#F3F5F8] transition-colors cursor-pointer whitespace-nowrap shrink-0"
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            Данные титульного листа
          </button>
          <button
            type="button"
            disabled={isExportingPng}
            onClick={async () => {
              setIsExportingPng(true);
              try {
                await exportSingleSlidePng(activeSlide, author);
              } finally {
                setIsExportingPng(false);
              }
            }}
            className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-lg border border-[#E4E7EC] hover:bg-[#F3F5F8] disabled:opacity-50 transition-colors cursor-pointer whitespace-nowrap shrink-0"
          >
            <Download className="w-3.5 h-3.5" />
            {isExportingPng ? 'Сохранение...' : 'Слайд в PNG'}
          </button>
          <button
            type="button"
            disabled={isExportingPdf}
            onClick={onExportPdf}
            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg bg-[#111317] text-white hover:bg-[#232730] disabled:opacity-60 transition-colors cursor-pointer whitespace-nowrap shrink-0"
          >
            <FileDown className="w-3.5 h-3.5" />
            {isExportingPdf && pdfProgress
              ? `Сборка PDF (${pdfProgress.current}/${pdfProgress.total})...`
              : 'Скачать PDF (10 слайдов)'}
          </button>
        </div>
      </div>

      {showAuthorEditor && (
        <div className="no-print bg-white border border-[#E4E7EC] rounded-xl p-5 grid grid-cols-1 md:grid-cols-4 gap-4">
          <label className="block space-y-1.5">
            <span className="text-xs font-semibold text-[#555B66]">ФИО участника</span>
            <input
              type="text"
              value={author.fio}
              onChange={(e) => onUpdateAuthor({ ...author, fio: e.target.value })}
              className="w-full px-3 py-2 text-sm border border-[#E4E7EC] rounded-lg focus:outline-none focus:border-[#1D4ED8]"
            />
          </label>
          <label className="block space-y-1.5">
            <span className="text-xs font-semibold text-[#555B66]">Образовательная организация</span>
            <input
              type="text"
              value={author.school}
              onChange={(e) => onUpdateAuthor({ ...author, school: e.target.value })}
              className="w-full px-3 py-2 text-sm border border-[#E4E7EC] rounded-lg focus:outline-none focus:border-[#1D4ED8]"
            />
          </label>
          <label className="block space-y-1.5">
            <span className="text-xs font-semibold text-[#555B66]">Название команды</span>
            <input
              type="text"
              value={author.team}
              onChange={(e) => onUpdateAuthor({ ...author, team: e.target.value })}
              className="w-full px-3 py-2 text-sm border border-[#E4E7EC] rounded-lg focus:outline-none focus:border-[#1D4ED8]"
            />
          </label>
          <label className="block space-y-1.5">
            <span className="text-xs font-semibold text-[#555B66]">Город</span>
            <input
              type="text"
              value={author.city}
              onChange={(e) => onUpdateAuthor({ ...author, city: e.target.value })}
              className="w-full px-3 py-2 text-sm border border-[#E4E7EC] rounded-lg focus:outline-none focus:border-[#1D4ED8]"
            />
          </label>
        </div>
      )}

      <div className="no-print w-full aspect-video rounded-2xl overflow-hidden border border-[#DDE2EA] shadow-sm bg-white">
        {renderSlideContent(activeSlide)}
      </div>

      <div className="no-print grid grid-cols-2 sm:grid-cols-5 lg:grid-cols-10 gap-2">
        {SLIDE_TITLES.map((s) => {
          const isActive = activeSlide === s.num;
          return (
            <button
              key={s.num}
              type="button"
              onClick={() => setActiveSlide(s.num)}
              className={`text-left p-2.5 rounded-xl border transition-colors cursor-pointer ${
                isActive
                  ? 'bg-[#111317] text-white border-[#111317]'
                  : 'bg-white text-[#111317] border-[#E4E7EC] hover:border-[#9CA3AF]'
              }`}
            >
              <div
                className={`text-[11px] font-mono-tabular font-semibold ${
                  isActive ? 'text-[#C8F135]' : 'text-[#1D4ED8]'
                }`}
              >
                {String(s.num).padStart(2, '0')}
              </div>
              <div className="mt-1 text-xs font-semibold leading-tight line-clamp-2">
                {s.label}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
