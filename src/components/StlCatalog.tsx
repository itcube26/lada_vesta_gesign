import { useState } from 'react';
import { Box, Download } from 'lucide-react';
import { GENERATED_ASSETS, PRINTABLE_STL_PARTS } from '../data/collectionData';
import { downloadVestaStl } from '../utils/stlGenerator';
import { ResilientImage } from './ResilientImage';

export function StlCatalog() {
  const [downloadedFile, setDownloadedFile] = useState<string | null>(null);

  const handleDownloadStl = (partId: (typeof PRINTABLE_STL_PARTS)[number]['id']) => {
    const filename = downloadVestaStl(partId);
    setDownloadedFile(filename);
    window.setTimeout(() => setDownloadedFile(null), 3500);
  };

  return (
    <div className="space-y-10">
      <div className="flex flex-wrap items-end justify-between gap-4 border-b border-[#E4E7EC] pb-6">
        <div>
          <p className="text-xs font-mono-tabular text-[#1D4ED8] font-semibold">
            Официальная библиотека моделей · LADA Vesta NG Седан
          </p>
          <h2 className="mt-1 text-2xl lg:text-3xl font-bold tracking-tight [text-wrap:balance]">
            3D-модели и файлы для 3D-печати (.STL)
          </h2>
          <p className="mt-2 text-sm text-[#555B66] max-w-2xl">
            Любой владелец Vesta NG может скачать готовые .STL-файлы с сайта и распечатать детали дома, в школьном технопарке или у дилера из термостойкого пластика PETG / ASA.
          </p>
        </div>

        {downloadedFile && (
          <div className="text-xs font-semibold text-[#111317] bg-[#C8F135] px-4 py-2 rounded-lg">
            Файл {downloadedFile} скачан
          </div>
        )}
      </div>

      {/* Visual Showcase: 3D-Printed Parts & Installed Rear Spoiler */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white border border-[#E4E7EC] rounded-2xl overflow-hidden">
          <div className="aspect-video bg-[#ECEDF0]">
            <ResilientImage
              src={GENERATED_ASSETS.printedParts}
              alt="Готовые 3D-печатные детали для LADA Vesta NG: спойлер, шильдик, держатель и колпачки"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="p-5">
            <h3 className="text-base font-bold">Комплект деталей после печати (PETG / ASA)</h3>
            <p className="mt-1 text-xs text-[#555B66]">
              Лип-спойлер крышки багажника, объёмный ИКС-шильдик, держатель смартфона в салон и 4 заглушки ступиц.
            </p>
          </div>
        </div>

        <div className="bg-white border border-[#E4E7EC] rounded-2xl overflow-hidden">
          <div className="aspect-video bg-[#ECEDF0]">
            <ResilientImage
              src={GENERATED_ASSETS.trunkSpoilerView}
              alt="LADA Vesta NG Седан с установленным 3D-печатным спойлером и наклейками"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="p-5">
            <h3 className="text-base font-bold">Пример установки на LADA Vesta NG Седан</h3>
            <p className="mt-1 text-xs text-[#555B66]">
              Компактный спойлер крепится на скотч 3M без сверления крышки багажника и сочетается с боковыми наклейками.
            </p>
          </div>
        </div>
      </div>

      {/* Downloadable STL Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {PRINTABLE_STL_PARTS.map((part) => (
          <article
            key={part.id}
            className="bg-white border border-[#E4E7EC] rounded-2xl p-6 flex flex-col justify-between gap-5"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="font-mono-tabular font-semibold text-[#1D4ED8]">
                  {part.code} · .STL
                </span>
                <span className="text-[#555B66]">{part.zone}</span>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#F3F5F8] border border-[#E4E7EC] flex items-center justify-center shrink-0 text-[#111317]">
                  <Box className="w-5 h-5" strokeWidth={1.75} />
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#111317] leading-snug">
                    {part.name}
                  </h3>
                  <p className="mt-1 text-xs text-[#555B66] leading-relaxed">
                    {part.description}
                  </p>
                </div>
              </div>

              <div className="pt-3 border-t border-[#F1F3F6] space-y-1.5 text-xs">
                <div className="flex justify-between gap-2">
                  <span className="text-[#555B66]">Материал</span>
                  <span className="font-medium text-[#111317] text-right">{part.filament}</span>
                </div>
                <div className="flex justify-between gap-2">
                  <span className="text-[#555B66]">Габариты</span>
                  <span className="font-mono-tabular text-[#111317] text-right">{part.sizeMm}</span>
                </div>
                <div className="flex justify-between gap-2">
                  <span className="text-[#555B66]">Печать</span>
                  <span className="font-mono-tabular text-[#111317] text-right">
                    {part.infill} · {part.printTime}
                  </span>
                </div>
                <div className="flex justify-between gap-2">
                  <span className="text-[#555B66]">Крепление</span>
                  <span className="font-medium text-[#111317] text-right">{part.mount}</span>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => handleDownloadStl(part.id)}
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-semibold rounded-lg bg-[#111317] text-white hover:bg-[#232730] transition-colors cursor-pointer whitespace-nowrap"
            >
              <Download className="w-3.5 h-3.5" />
              Скачать 3D-модель (.STL)
            </button>
          </article>
        ))}
      </div>
    </div>
  );
}
