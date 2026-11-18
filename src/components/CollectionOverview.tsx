import { useState } from 'react';
import { ArrowRight, Box, Download } from 'lucide-react';
import {
  BODY_VARIANTS,
  CMF_MATERIALS,
  GENERATED_ASSETS,
  STICKER_PACKS,
  USER_SCENARIO_STEPS,
} from '../data/collectionData';
import { DigitalClusterSvg, DigitalThemeMode, EnjoyProScreenSvg } from './DigitalMockups';
import { LiveryBlueprintSvg } from './LiveryBlueprintSvg';
import { ResilientImage } from './ResilientImage';

interface CollectionOverviewProps {
  onOpenSlides: () => void;
  onOpenStl: () => void;
  onOpenAssets: () => void;
}

export function CollectionOverview({
  onOpenSlides,
  onOpenStl,
  onOpenAssets,
}: CollectionOverviewProps) {
  const [previewColor, setPreviewColor] = useState<'white' | 'grey' | 'cobalt'>('white');
  const [digitalMode, setDigitalMode] = useState<DigitalThemeMode>('pulse');

  const activeVariant =
    BODY_VARIANTS.find((v) => v.id === previewColor) ?? BODY_VARIANTS[0];

  return (
    <div className="space-y-16">
      {/* Hero Section: Smart Auto style clarity + LADA Vesta NG */}
      <section className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          <div className="lg:col-span-5 flex flex-col justify-between bg-white border border-[#E4E7EC] rounded-2xl p-8">
            <div>
              <div className="text-xs font-medium text-[#555B66] flex items-center gap-2">
                <span>Инженеры транспорта</span>
                <span aria-hidden="true">·</span>
                <span>LADA Vesta NG Седан</span>
              </div>
              <h1 className="mt-4 text-[clamp(2rem,3.3vw,3rem)] font-extrabold tracking-tight leading-[1.08] text-[#111317] [text-wrap:balance]">
                LADA Vesta Pulse: 3D-печать и кастомные наклейки
              </h1>
              <p className="mt-4 text-sm lg:text-base text-[#555B66] leading-relaxed">
                Практичная коллекция кастомизации для нового поколения: детали (спойлер, шильдики, колпачки дисков, держатель телефона) можно бесплатно скачать с официального сайта в формате .STL и напечатать на 3D-принтере, а кузов оформить готовыми наборами виниловых наклеек.
              </p>
            </div>

            <div className="mt-7 pt-5 border-t border-[#E4E7EC] flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={onOpenStl}
                className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold rounded-lg bg-[#111317] text-white hover:bg-[#232730] transition-colors cursor-pointer whitespace-nowrap shrink-0"
              >
                <Box className="w-4 h-4" />
                Скачать 3D-модели (.STL)
              </button>
              <button
                type="button"
                onClick={onOpenAssets}
                className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold rounded-lg border border-[#E4E7EC] bg-white hover:bg-[#F3F5F8] transition-colors cursor-pointer whitespace-nowrap shrink-0"
              >
                <Download className="w-4 h-4" />
                Наклейки и картинки
              </button>
              <button
                type="button"
                onClick={onOpenSlides}
                className="inline-flex items-center gap-1.5 px-3 py-2.5 text-xs font-semibold text-[#1D4ED8] hover:underline cursor-pointer whitespace-nowrap shrink-0"
              >
                10 слайдов PDF
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <div className="lg:col-span-7 rounded-2xl overflow-hidden border border-[#E4E7EC] bg-[#ECEDF0] min-h-[320px]">
            <ResilientImage
              src={GENERATED_ASSETS.exteriorThreeQuarter}
              alt="LADA Vesta NG Седан с наклейками и 3D-деталями VESTA PULSE"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* 4-Column Quick Summary Strip */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white border border-[#E4E7EC] rounded-xl p-5">
            <div className="text-xs text-[#555B66]">Основа проекта</div>
            <div className="mt-1 text-base font-bold text-[#111317]">3D-печать + наклейки</div>
            <div className="mt-1 text-xs text-[#555B66]">Модельки на официальном сайте</div>
          </div>
          <div className="bg-white border border-[#E4E7EC] rounded-xl p-5">
            <div className="text-xs text-[#555B66]">Готовые 3D-файлы</div>
            <div className="mt-1 text-base font-bold font-mono-tabular text-[#111317]">
              5 моделей .STL
            </div>
            <div className="mt-1 text-xs text-[#555B66]">Спойлер, шильдик, диски, салон</div>
          </div>
          <div className="bg-white border border-[#E4E7EC] rounded-xl p-5">
            <div className="text-xs text-[#555B66]">Адаптация наклеек</div>
            <div className="mt-1 text-base font-bold font-mono-tabular text-[#111317]">
              3 цвета кузова
            </div>
            <div className="mt-1 text-xs text-[#555B66]">Белый, Тайфун, Кобальт</div>
          </div>
          <div className="bg-white border border-[#E4E7EC] rounded-xl p-5">
            <div className="text-xs text-[#555B66]">Цифровая среда</div>
            <div className="mt-1 text-base font-bold text-[#111317]">LADA EnjoY Pro</div>
            <div className="mt-1 text-xs text-[#555B66]">Тема экрана и приборки</div>
          </div>
        </div>
      </section>

      {/* Section 01: 3D-печать и ракурс сзади со спойлером */}
      <section className="space-y-5">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-mono-tabular text-[#1D4ED8] font-semibold">
              01. 3D-печать деталей для LADA Vesta NG
            </p>
            <h2 className="mt-1 text-2xl font-bold tracking-tight">
              Скачай .STL с сайта — распечатай и поставь без сверления
            </h2>
          </div>
          <button
            type="button"
            onClick={onOpenStl}
            className="text-xs font-semibold text-[#1D4ED8] hover:underline cursor-pointer whitespace-nowrap"
          >
            Перейти в каталог .STL →
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-6 bg-white border border-[#E4E7EC] rounded-2xl overflow-hidden">
            <div className="aspect-video bg-[#ECEDF0]">
              <ResilientImage
                src={GENERATED_ASSETS.printedParts}
                alt="3D-печатные детали: лип-спойлер, шильдик, держатель смартфона и заглушки"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-5">
              <h3 className="text-base font-bold">Детали из PETG / ASA пластика</h3>
              <p className="mt-1 text-xs text-[#555B66] leading-relaxed">
                Лип-спойлер багажника, объёмный ИКС-шильдик, заглушки ступиц и держатель смартфона на торпедо. Крепятся на клипсы и скотч 3M.
              </p>
            </div>
          </div>

          <div className="lg:col-span-6 bg-white border border-[#E4E7EC] rounded-2xl overflow-hidden">
            <div className="aspect-video bg-[#ECEDF0]">
              <ResilientImage
                src={GENERATED_ASSETS.trunkSpoilerView}
                alt="Вид сзади 3/4 LADA Vesta NG со спойлером и наклейками"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-5">
              <h3 className="text-base font-bold">Вид сзади: 3D-спойлер и боковые стикеры</h3>
              <p className="mt-1 text-xs text-[#555B66] leading-relaxed">
                Спойлер подчёркивает крышку багажника седана, а графитовые наклейки с лаймовой кромкой поддерживают геометрию задних фонарей.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 02: Кастомные наклейки + 3 цвета кузова */}
      <section className="space-y-5">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-mono-tabular text-[#1D4ED8] font-semibold">
              02. Кастомные наклейки и 3 цвета кузова
            </p>
            <h2 className="mt-1 text-2xl font-bold tracking-tight">
              Готовые листы стикеров и адаптация под любой цвет Vesta
            </h2>
          </div>
          <div className="flex items-center gap-1 p-1 bg-[#EAECEF] rounded-lg">
            {BODY_VARIANTS.map((v) => (
              <button
                key={v.id}
                type="button"
                onClick={() => setPreviewColor(v.id)}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                  previewColor === v.id
                    ? 'bg-white text-[#111317] shadow-sm'
                    : 'text-[#555B66] hover:text-[#111317]'
                }`}
              >
                {v.name.split(' ')[0]}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          <div className="lg:col-span-6 bg-white border border-[#E4E7EC] rounded-2xl overflow-hidden flex flex-col">
            <div className="aspect-video bg-[#ECEDF0]">
              <ResilientImage
                src={GENERATED_ASSETS.stickerSheets}
                alt="Листы виниловых наклеек для LADA Vesta NG: ИКС-полосы, Акула и полосы на диски"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-5 space-y-2.5 flex-1">
              {STICKER_PACKS.map((pack) => (
                <div key={pack.id} className="text-xs">
                  <span className="font-bold text-[#111317]">{pack.name}: </span>
                  <span className="text-[#555B66]">{pack.description}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-6 flex flex-col gap-5">
            <div className="bg-white border border-[#E4E7EC] rounded-2xl overflow-hidden">
              <div className="aspect-video bg-[#ECEDF0]">
                <ResilientImage
                  src={GENERATED_ASSETS.colorVariants}
                  alt="Наклейки на белом, сером и синем кузове LADA Vesta NG"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4 text-xs text-[#555B66]">
                <span className="font-bold text-[#111317]">{activeVariant.name}: </span>
                {activeVariant.contrastNote}
              </div>
            </div>

            <div className="bg-white border border-[#E4E7EC] rounded-2xl p-4">
              <LiveryBlueprintSvg variant={activeVariant} className="w-full h-auto rounded-lg" />
            </div>
          </div>
        </div>
      </section>

      {/* Section 03: Интерьер, CMF и EnjoY Pro */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        <div className="lg:col-span-6 bg-white border border-[#E4E7EC] rounded-2xl overflow-hidden flex flex-col">
          <div className="aspect-video bg-[#181A1F]">
            <ResilientImage
              src={GENERATED_ASSETS.interiorCabin}
              alt="Интерьер LADA Vesta NG: чехлы, прострочка, держатель и экран EnjoY Pro"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="p-6 space-y-4 flex-1">
            <h3 className="text-lg font-bold">03. Салон и материалы CMF</h3>
            <div className="space-y-2.5">
              {CMF_MATERIALS.slice(0, 4).map((m) => (
                <div key={m.id} className="flex items-center gap-3 text-xs">
                  <span
                    className="w-4 h-4 rounded border border-black/15 shrink-0"
                    style={{ backgroundColor: m.swatchHex }}
                  />
                  <div>
                    <span className="font-bold text-[#111317]">{m.name}</span>
                    <span className="text-[#555B66]"> — {m.zones}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-6 bg-white border border-[#E4E7EC] rounded-2xl p-6 flex flex-col justify-between gap-5">
          <div className="flex items-center justify-between gap-3">
            <div>
              <h3 className="text-lg font-bold">04. Тема LADA EnjoY Pro и приборка</h3>
              <p className="text-xs text-[#555B66]">Единый стиль с наклейками и 3D-акцентами</p>
            </div>
            <div className="flex items-center gap-1 p-1 bg-[#F1F3F6] rounded-lg">
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

          <div className="grid grid-cols-12 gap-4 items-center">
            <div className="col-span-4 flex justify-center">
              <EnjoyProScreenSvg mode={digitalMode} className="w-full max-w-[165px] h-auto" />
            </div>
            <div className="col-span-8">
              <DigitalClusterSvg mode={digitalMode} className="w-full h-auto" />
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {USER_SCENARIO_STEPS.map((s) => (
              <div key={s.step} className="border border-[#E4E7EC] rounded-xl p-3 bg-[#F8F9FB]">
                <div className="text-xs font-mono-tabular font-bold text-[#1D4ED8]">{s.step}</div>
                <div className="mt-1 text-[11px] font-semibold leading-snug">{s.title}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
