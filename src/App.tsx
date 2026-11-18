import { useEffect, useState } from 'react';
import { FileDown } from 'lucide-react';
import { AssetLibrary } from './components/AssetLibrary';
import { CollectionOverview } from './components/CollectionOverview';
import { PresentationAuthor, SlideDeck } from './components/SlideDeck';
import { StlCatalog } from './components/StlCatalog';
import { exportPresentationPdf } from './utils/pdfExporter';
import { exportPresentationPptx } from './utils/pptxExporter';

type AppTab = 'overview' | 'stl' | 'assets' | 'slides';

const DEFAULT_AUTHOR: PresentationAuthor = {
  fio: 'Иванов Алексей (8 «А» класс)',
  school: 'Школа № 19 / ИТ-Куб',
  team: 'Команда «Vesta 3D»',
  city: 'Тольятти',
};

const STORAGE_KEY = 'lada_vesta_pulse_author_v1';

const NAV_ITEMS: { id: AppTab; label: string }[] = [
  { id: 'overview', label: 'Обзор' },
  { id: 'stl', label: '3D-печать (.STL)' },
  { id: 'assets', label: 'Наклейки и UI' },
  { id: 'slides', label: 'Слайды (10)' },
];

export default function App() {
  const [activeTab, setActiveTab] = useState<AppTab>('overview');
  const [isExportingPdf, setIsExportingPdf] = useState(false);
  const [pdfProgress, setPdfProgress] = useState<{ current: number; total: number } | null>(null);
  const [isExportingPptx, setIsExportingPptx] = useState(false);
  const [pptxProgress, setPptxProgress] = useState<{ current: number; total: number } | null>(null);
  const [exportMessage, setExportMessage] = useState<string | null>(null);
  const [author, setAuthor] = useState<PresentationAuthor>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return { ...DEFAULT_AUTHOR, ...JSON.parse(saved) };
      }
    } catch {
      // Ignore storage failures
    }
    return DEFAULT_AUTHOR;
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(author));
    } catch {
      // Ignore storage failures
    }
  }, [author]);

  const handleExportPdf = async () => {
    if (isExportingPdf) return;
    setIsExportingPdf(true);
    setExportMessage(null);
    try {
      await exportPresentationPdf(author, (current, total) => {
        setPdfProgress({ current, total });
      });
      setExportMessage('Файл LADA_Vesta_Pulse_Presentation_16x9.pdf сохранён в загрузки.');
      window.setTimeout(() => setExportMessage(null), 5000);
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Ошибка создания PDF';
      setExportMessage(msg);
    } finally {
      setIsExportingPdf(false);
      setPdfProgress(null);
    }
  };

  const handleExportPptx = async () => {
    if (isExportingPptx) return;
    setIsExportingPptx(true);
    setExportMessage(null);
    try {
      await exportPresentationPptx(author, (current, total) => {
        setPptxProgress({ current, total });
      });
      setExportMessage('Презентация LADA_Vesta_Pulse_Presentation.pptx сохранена в загрузки.');
      window.setTimeout(() => setExportMessage(null), 5000);
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Ошибка создания PPTX';
      setExportMessage(msg);
    } finally {
      setIsExportingPptx(false);
      setPptxProgress(null);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F6F7F9] text-[#111317]">
      {/* Strict 3-Zone Top Bar Contract */}
      <header className="no-print sticky top-0 z-30 bg-white/95 backdrop-blur-sm border-b border-[#E4E7EC]">
        <div className="max-w-[1360px] mx-auto px-6 h-16 flex items-center justify-between gap-8">
          {/* Zone 1: Single-element Brand Wordmark */}
          <button
            type="button"
            onClick={() => setActiveTab('overview')}
            className="text-base lg:text-lg font-extrabold tracking-tight text-[#111317] whitespace-nowrap shrink-0 cursor-pointer"
          >
            LADA VESTA PULSE
          </button>

          {/* Zone 2: 5 Single-line Navigation Links */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
            {NAV_ITEMS.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveTab(item.id)}
                  className={`py-5 border-b-2 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    isActive
                      ? 'border-[#111317] text-[#111317] font-semibold'
                      : 'border-transparent text-[#555B66] hover:text-[#111317]'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: 1 Primary Action */}
          <div className="shrink-0">
            <button
              type="button"
              disabled={isExportingPptx}
              onClick={handleExportPptx}
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg bg-[#111317] text-white hover:bg-[#232730] disabled:opacity-60 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              <FileDown className="w-3.5 h-3.5" />
              {isExportingPptx && pptxProgress
                ? `PPTX ${pptxProgress.current}/${pptxProgress.total}...`
                : 'Скачать PPTX'}
            </button>
          </div>
        </div>

        {/* Mobile Tab Bar */}
        <div className="md:hidden border-t border-[#E4E7EC] px-4 py-2 flex items-center gap-2 overflow-x-auto">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setActiveTab(item.id)}
              className={`px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap shrink-0 cursor-pointer ${
                activeTab === item.id
                  ? 'bg-[#111317] text-white'
                  : 'text-[#555B66] hover:text-[#111317]'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </header>

      {/* Main Content Workspace */}
      <main className="flex-1 max-w-[1360px] w-full mx-auto px-6 py-8 lg:py-10">
        {exportMessage && (
          <div className="mb-6 bg-[#111317] text-white text-xs font-medium px-4 py-3 rounded-xl flex items-center justify-between gap-4">
            <span>{exportMessage}</span>
            <button
              type="button"
              onClick={() => setExportMessage(null)}
              className="text-[#C8F135] font-semibold cursor-pointer"
            >
              Закрыть
            </button>
          </div>
        )}

        {activeTab === 'overview' && (
          <CollectionOverview
            onOpenSlides={() => setActiveTab('slides')}
            onOpenStl={() => setActiveTab('stl')}
            onOpenAssets={() => setActiveTab('assets')}
          />
        )}
        {activeTab === 'stl' && <StlCatalog />}
        {activeTab === 'assets' && <AssetLibrary />}
        {activeTab === 'slides' && (
          <SlideDeck
            author={author}
            onUpdateAuthor={setAuthor}
            onExportPdf={handleExportPdf}
            isExportingPdf={isExportingPdf}
            pdfProgress={pdfProgress}
            onExportPptx={handleExportPptx}
            isExportingPptx={isExportingPptx}
            pptxProgress={pptxProgress}
          />
        )}
      </main>

      {/* Quiet Footer */}
      <footer className="no-print border-t border-[#E4E7EC] bg-white">
        <div className="max-w-[1360px] mx-auto px-6 py-6 flex flex-wrap items-center justify-between gap-4 text-xs text-[#555B66]">
          <span>LADA Vesta NG Седан · 3D-печать и кастомные наклейки VESTA PULSE</span>
          <span>Конкурс «Инженеры транспорта» · Первые × АВТОВАЗ</span>
        </div>
      </footer>
    </div>
  );
}
