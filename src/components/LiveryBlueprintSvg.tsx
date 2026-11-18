import { forwardRef } from 'react';
import { BodyVariant } from '../data/collectionData';

interface LiveryBlueprintSvgProps {
  variant: BodyVariant;
  className?: string;
}

export const LiveryBlueprintSvg = forwardRef<SVGSVGElement, LiveryBlueprintSvgProps>(
  function LiveryBlueprintSvg({ variant, className = '' }, ref) {
    const isLightBody = variant.id === 'white';
    const bodyFill = variant.bodyHex;
    const bodyStroke = isLightBody ? '#9CA3AF' : '#1F2937';
    const windowFill = '#181C24';
    const liveryMain = variant.liveryPrimary;
    const liveryAccent = variant.liveryAccent;

    return (
      <svg
        ref={ref}
        viewBox="0 0 1200 540"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        role="img"
        aria-label={`Развёртка графики VESTA PULSE на кузове ${variant.name}`}
      >
        <defs>
          <pattern id="techGrid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#E2E6EC" strokeWidth="0.8" />
          </pattern>
          <linearGradient id="glassShine" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#2B3240" />
            <stop offset="50%" stopColor="#141820" />
            <stop offset="100%" stopColor="#222834" />
          </linearGradient>
        </defs>

        {/* Studio Blueprint Background */}
        <rect width="1200" height="540" fill="#F8F9FB" />
        <rect width="1200" height="540" fill="url(#techGrid)" />

        {/* Technical Header Strip */}
        <text x="48" y="46" fill="#111317" fontFamily="Manrope, sans-serif" fontSize="18" fontWeight="700">
          LADA VESTA NG СЕДАН — РАЗВЁРТКА ИКС-ГРАФИКИ «VESTA PULSE»
        </text>
        <text x="48" y="70" fill="#555B66" fontFamily="JetBrains Mono, monospace" fontSize="12">
          МАСШТАБ 1:18 · ЦВЕТ КУЗОВА: {variant.name.toUpperCase()} · КОД ПАКЕТА: VP-EXT-KIT
        </text>

        {/* Dimension Lines */}
        <line x1="150" y1="455" x2="1050" y2="455" stroke="#9AA1AD" strokeWidth="1" />
        <line x1="150" y1="445" x2="150" y2="465" stroke="#9AA1AD" strokeWidth="1" />
        <line x1="1050" y1="445" x2="1050" y2="465" stroke="#9AA1AD" strokeWidth="1" />
        <text x="600" y="476" textAnchor="middle" fill="#555B66" fontFamily="JetBrains Mono, monospace" fontSize="11">
          ДЛИНА 4440 ММ · КОЛЁСНАЯ БАЗА 2635 ММ
        </text>

        {/* Ground Shadow */}
        <ellipse cx="600" cy="404" rx="445" ry="14" fill="#111317" opacity="0.14" />

        {/* Sedan Silhouette Body */}
        <path
          d="M 154 345
             C 150 315, 162 282, 198 265
             L 335 234
             C 405 180, 495 154, 625 152
             C 735 152, 825 182, 902 232
             L 1012 246
             C 1038 252, 1046 276, 1042 320
             L 1034 362
             L 944 374
             C 940 312, 820 312, 816 374
             L 372 374
             C 368 312, 248 312, 244 374
             L 168 368
             Z"
          fill={bodyFill}
          stroke={bodyStroke}
          strokeWidth="2"
        />

        {/* Greenhouse Windows */}
        <path
          d="M 358 232
             C 425 184, 505 164, 622 164
             C 722 164, 795 186, 868 232
             L 636 236
             L 358 232 Z"
          fill="url(#glassShine)"
          stroke="#111317"
          strokeWidth="2"
        />
        {/* B-Pillar & C-Pillar trim */}
        <rect x="618" y="164" width="18" height="72" fill="#111317" />
        <line x1="472" y1="184" x2="472" y2="232" stroke="#2D333E" strokeWidth="2" />

        {/* Door Seams & Handles */}
        <path d="M 412 234 L 402 364" fill="none" stroke={bodyStroke} strokeWidth="1.2" opacity="0.55" />
        <path d="M 626 236 L 624 372" fill="none" stroke={bodyStroke} strokeWidth="1.2" opacity="0.55" />
        <path d="M 806 234 L 828 316" fill="none" stroke={bodyStroke} strokeWidth="1.2" opacity="0.55" />
        <rect x="556" y="266" width="38" height="9" rx="4" fill="#181A1F" />
        <rect x="748" y="266" width="38" height="9" rx="4" fill="#181A1F" />

        {/* Front & Rear Lamps */}
        <path d="M 164 282 L 238 268 L 224 294 L 160 296 Z" fill="#E5E7EB" stroke="#374151" strokeWidth="1.5" />
        <path d="M 1034 252 L 976 258 L 994 282 L 1038 278 Z" fill="#DC2626" stroke="#7F1D1D" strokeWidth="1.5" />

        {/* VESTA PULSE: Signature X-Contour Side Livery (Front & Rear Doors) */}
        {/* Front X-wing contour */}
        <path
          d="M 358 272 L 484 272 C 516 272, 536 288, 550 302 C 524 316, 488 332, 434 344"
          fill="none"
          stroke={liveryMain}
          strokeWidth="8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M 358 272 L 484 272 C 516 272, 536 288, 550 302 C 524 316, 488 332, 434 344"
          fill="none"
          stroke={liveryAccent}
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Rear X-wing contour */}
        <path
          d="M 976 266 L 786 266 C 756 266, 738 282, 724 298 C 748 314, 782 328, 822 338"
          fill="none"
          stroke={liveryMain}
          strokeWidth="8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M 976 266 L 786 266 C 756 266, 738 282, 724 298 C 748 314, 782 328, 822 338"
          fill="none"
          stroke={liveryAccent}
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Lower Rocker Blade Graphic */}
        <polygon points="384,358 808,358 814,373 378,373" fill={liveryMain} />
        <polygon points="404,363 796,363 798,368 402,368" fill={liveryAccent} />

        {/* Front Splitter Accent */}
        <polygon points="164,358 238,362 238,370 166,366" fill={liveryAccent} />

        {/* Carbon Wing Mirror with Lime Edge */}
        <path d="M 402 228 C 402 214, 426 210, 438 220 L 434 236 L 402 236 Z" fill="#181A1F" />
        <line x1="404" y1="234" x2="435" y2="234" stroke={liveryAccent} strokeWidth="3" />

        {/* 17" X-Spoke Alloy Wheels */}
        {[308, 880].map((cx) => (
          <g key={cx}>
            <circle cx={cx} cy="370" r="58" fill="#15181E" />
            <circle cx={cx} cy="370" r="42" fill="#2A2F3A" stroke="#D1D5DB" strokeWidth="2.5" />
            {[0, 72, 144, 216, 288].map((deg) => (
              <g key={deg} transform={`rotate(${deg} ${cx} 370)`}>
                <polygon points={`${cx - 5},370 ${cx + 5},370 ${cx + 11},330 ${cx - 2},330`} fill="#E5E7EB" />
                <polygon points={`${cx - 3},370 ${cx + 3},370 ${cx - 11},330 ${cx - 15},332`} fill="#9CA3AF" />
              </g>
            ))}
            <circle cx={cx} cy="370" r="12" fill="#111317" stroke={liveryAccent} strokeWidth="3" />
          </g>
        ))}

        {/* Technical Callout Annotations */}
        <g fontFamily="Plus Jakarta Sans, sans-serif" fontSize="12" fill="#111317">
          {/* Callout 1: Mirror */}
          <line x1="422" y1="214" x2="422" y2="122" stroke="#1D4ED8" strokeWidth="1.2" strokeDasharray="3 3" />
          <circle cx="422" cy="214" r="3.5" fill="#1D4ED8" />
          <text x="430" y="128" fontWeight="700">VP-MIR-02 · Корпус зеркала (карбон + кромка 4 мм)</text>

          {/* Callout 2: Side X-Graphics */}
          <line x1="518" y1="286" x2="585" y2="115" stroke="#1D4ED8" strokeWidth="1.2" strokeDasharray="3 3" />
          <circle cx="518" cy="286" r="3.5" fill="#1D4ED8" />
          <text x="593" y="112" fontWeight="700">VP-EXT-01 · Контурная ливрея ИКС-выштамповки</text>

          {/* Callout 3: Rocker Blade */}
          <line x1="600" y1="366" x2="600" y2="430" stroke="#1D4ED8" strokeWidth="1.2" strokeDasharray="3 3" />
          <circle cx="600" cy="366" r="3.5" fill="#1D4ED8" />
          <text x="610" y="428" fontWeight="700">VP-SKT-04 · Накладка порога + клипса Вольт-Лайм</text>

          {/* Callout 4: Wheel */}
          <line x1="880" y1="428" x2="940" y2="495" stroke="#1D4ED8" strokeWidth="1.2" strokeDasharray="3 3" />
          <circle cx="880" cy="370" r="3.5" fill="#1D4ED8" />
          <text x="720" y="510" fontWeight="700">VP-WHL-17 · Диск 17" X-Spoke + кольцо ступицы</text>
        </g>
      </svg>
    );
  }
);
