import { forwardRef } from 'react';

export type DigitalThemeMode = 'pulse' | 'night' | 'day';

interface DigitalThemePalette {
  bg: string;
  surface: string;
  surfaceBorder: string;
  textPrimary: string;
  textMuted: string;
  accent: string;
  secondaryAccent: string;
}

const THEME_MAP: Record<DigitalThemeMode, DigitalThemePalette> = {
  pulse: {
    bg: '#0E1116',
    surface: '#171B23',
    surfaceBorder: '#2A313D',
    textPrimary: '#F8FAFC',
    textMuted: '#94A3B8',
    accent: '#C8F135',
    secondaryAccent: '#3B82F6',
  },
  night: {
    bg: '#080B12',
    surface: '#101624',
    surfaceBorder: '#1E293B',
    textPrimary: '#F1F5F9',
    textMuted: '#8494AA',
    accent: '#3B82F6',
    secondaryAccent: '#C8F135',
  },
  day: {
    bg: '#F3F5F8',
    surface: '#FFFFFF',
    surfaceBorder: '#DDE2EA',
    textPrimary: '#111317',
    textMuted: '#5B6370',
    accent: '#1D4ED8',
    secondaryAccent: '#84CC16',
  },
};

export const EnjoyProScreenSvg = forwardRef<
  SVGSVGElement,
  { mode: DigitalThemeMode; activeTrackIndex?: number; className?: string }
>(function EnjoyProScreenSvg({ mode, activeTrackIndex = 0, className = '' }, ref) {
  const t = THEME_MAP[mode];
  const tracks = [
    { title: 'Ночной Проспект', artist: 'PULSE FM · 124 BPM', time: '02:14 / 03:45' },
    { title: 'Тольятти Неон', artist: 'VESTA SOUND LAB', time: '01:08 / 03:12' },
    { title: 'Линия ИКС', artist: 'СИНТИ-ГОРОД 2026', time: '03:02 / 04:01' },
  ];
  const track = tracks[activeTrackIndex % tracks.length];

  return (
    <svg
      ref={ref}
      viewBox="0 0 420 680"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="Макет мультимедийной системы LADA EnjoY Pro в стиле VESTA PULSE"
    >
      {/* Tablet Hardware Bezel */}
      <rect x="4" y="4" width="412" height="672" rx="28" fill="#181A1F" stroke="#2D323B" strokeWidth="4" />
      <rect x="16" y="18" width="388" height="644" rx="20" fill={t.bg} />

      {/* Top Status Bar */}
      <text x="36" y="46" fill={t.textPrimary} fontFamily="JetBrains Mono, monospace" fontSize="13" fontWeight="600">
        18:45
      </text>
      <text x="110" y="46" fill={t.accent} fontFamily="Manrope, sans-serif" fontSize="11" fontWeight="700">
        LADA EnjoY Pro · VESTA PULSE
      </text>
      <text x="384" y="46" textAnchor="end" fill={t.textMuted} fontFamily="JetBrains Mono, monospace" fontSize="12">
        5G · +18°C
      </text>
      <line x1="30" y1="58" x2="390" y2="58" stroke={t.surfaceBorder} strokeWidth="1" />

      {/* Hero Navigation Card */}
      <rect x="30" y="72" width="360" height="250" rx="16" fill={t.surface} stroke={t.surfaceBorder} strokeWidth="1.5" />
      {/* Stylized Geometric City Map */}
      <g opacity="0.32" stroke={t.textMuted} strokeWidth="1.2" fill="none">
        <path d="M 45 120 L 375 120 M 45 175 L 375 175 M 45 230 L 375 230 M 45 280 L 375 280" />
        <path d="M 100 84 L 100 310 M 185 84 L 185 310 M 275 84 L 275 310 M 340 84 L 340 310" />
      </g>
      {/* Kinetic X-Route Path */}
      <path
        d="M 110 292 L 185 230 L 185 175 L 275 142"
        fill="none"
        stroke={t.accent}
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="110" cy="292" r="7" fill={t.secondaryAccent} stroke={t.bg} strokeWidth="2" />
      <circle cx="275" cy="142" r="8" fill={t.accent} />
      {/* Next Turn Overlay Pill */}
      <rect x="44" y="86" width="196" height="44" rx="10" fill={t.bg} stroke={t.surfaceBorder} strokeWidth="1" />
      <path d="M 62 116 L 62 100 L 76 100" fill="none" stroke={t.accent} strokeWidth="3" strokeLinecap="round" />
      <text x="90" y="106" fill={t.textPrimary} fontFamily="JetBrains Mono, monospace" fontSize="13" fontWeight="700">
        350 м
      </text>
      <text x="90" y="122" fill={t.textMuted} fontFamily="Plus Jakarta Sans, sans-serif" fontSize="11">
        Налево · ул. Революционная
      </text>

      <text x="48" y="308" fill={t.textPrimary} fontFamily="Manrope, sans-serif" fontSize="13" fontWeight="600">
        В пути: 14 мин · 6.4 км
      </text>
      <text x="374" y="308" textAnchor="end" fill={t.accent} fontFamily="JetBrains Mono, monospace" fontSize="12" fontWeight="600">
        ПРИБЫТИЕ 18:59
      </text>

      {/* Media Widget */}
      <rect x="30" y="336" width="360" height="104" rx="16" fill={t.surface} stroke={t.surfaceBorder} strokeWidth="1.5" />
      {/* Kinetic X Cover Graphic */}
      <rect x="46" y="352" width="72" height="72" rx="12" fill={t.bg} stroke={t.accent} strokeWidth="1.5" />
      <path d="M 62 368 L 102 408 M 102 368 L 62 408" stroke={t.accent} strokeWidth="4" strokeLinecap="round" />
      <text x="134" y="376" fill={t.textPrimary} fontFamily="Manrope, sans-serif" fontSize="16" fontWeight="700">
        {track.title}
      </text>
      <text x="134" y="396" fill={t.textMuted} fontFamily="Plus Jakarta Sans, sans-serif" fontSize="12">
        {track.artist}
      </text>
      <rect x="134" y="410" width="180" height="4" rx="2" fill={t.surfaceBorder} />
      <rect x="134" y="410" width="112" height="4" rx="2" fill={t.accent} />
      <text x="374" y="416" textAnchor="end" fill={t.textMuted} fontFamily="JetBrains Mono, monospace" fontSize="10">
        {track.time}
      </text>

      {/* Vehicle Telemetry & Synced Ambient Cards */}
      <rect x="30" y="454" width="174" height="100" rx="14" fill={t.surface} stroke={t.surfaceBorder} strokeWidth="1.5" />
      <text x="46" y="478" fill={t.textMuted} fontFamily="Plus Jakarta Sans, sans-serif" fontSize="11">
        РЕЖИМ ДИНАМИКИ
      </text>
      <text x="46" y="504" fill={t.accent} fontFamily="Manrope, sans-serif" fontSize="18" fontWeight="800">
        ПУЛЬС-ГОРОД
      </text>
      <text x="46" y="534" fill={t.textPrimary} fontFamily="JetBrains Mono, monospace" fontSize="12">
        ESC АКТИВ · ECO 94%
      </text>

      <rect x="216" y="454" width="174" height="100" rx="14" fill={t.surface} stroke={t.surfaceBorder} strokeWidth="1.5" />
      <text x="232" y="478" fill={t.textMuted} fontFamily="Plus Jakarta Sans, sans-serif" fontSize="11">
        ГАДЖЕТ-КОННЕКТ
      </text>
      <text x="232" y="504" fill={t.textPrimary} fontFamily="Manrope, sans-serif" fontSize="16" fontWeight="700">
        Смартфон SYNC
      </text>
      <text x="232" y="534" fill={t.secondaryAccent} fontFamily="JetBrains Mono, monospace" fontSize="12">
        БЕСПРОВОДНОЙ 88%
      </text>

      {/* Bottom Climate & App Dock */}
      <rect x="30" y="568" width="360" height="76" rx="14" fill={t.surface} stroke={t.surfaceBorder} strokeWidth="1.5" />
      <text x="52" y="602" fill={t.textPrimary} fontFamily="JetBrains Mono, monospace" fontSize="22" fontWeight="700">
        21.5°
      </text>
      <text x="52" y="622" fill={t.textMuted} fontFamily="Plus Jakarta Sans, sans-serif" fontSize="10">
        КЛИМАТ АВТО
      </text>

      <line x1="136" y1="582" x2="136" y2="630" stroke={t.surfaceBorder} strokeWidth="1" />

      {/* Custom X-geometry Dock Icons */}
      {[
        { x: 162, label: 'Нави' },
        { x: 222, label: 'Медиа' },
        { x: 282, label: 'Авто' },
        { x: 342, label: 'Профиль' },
      ].map((item, idx) => (
        <g key={item.label}>
          <rect
            x={item.x}
            y="582"
            width="38"
            height="32"
            rx="8"
            fill={idx === 2 ? t.accent : t.bg}
            stroke={t.surfaceBorder}
            strokeWidth="1"
          />
          <path
            d={`M ${item.x + 13} 592 L ${item.x + 25} 604 M ${item.x + 25} 592 L ${item.x + 13} 604`}
            stroke={idx === 2 ? '#111317' : t.textPrimary}
            strokeWidth="2.2"
            strokeLinecap="round"
          />
          <text
            x={item.x + 19}
            y="630"
            textAnchor="middle"
            fill={t.textMuted}
            fontFamily="Plus Jakarta Sans, sans-serif"
            fontSize="10"
          >
            {item.label}
          </text>
        </g>
      ))}
    </svg>
  );
});

export const DigitalClusterSvg = forwardRef<
  SVGSVGElement,
  { mode: DigitalThemeMode; speed?: number; className?: string }
>(function DigitalClusterSvg({ mode, speed = 64, className = '' }, ref) {
  const t = THEME_MAP[mode];

  return (
    <svg
      ref={ref}
      viewBox="0 0 840 340"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="Макет цифровой приборной панели LADA Vesta NG в стиле VESTA PULSE"
    >
      {/* Outer Cluster Housing */}
      <rect x="4" y="4" width="832" height="332" rx="24" fill="#14171D" stroke="#2D323B" strokeWidth="4" />
      <rect x="18" y="16" width="804" height="308" rx="16" fill={t.bg} />

      {/* Top Telemetry Header */}
      <text x="48" y="46" fill={t.textMuted} fontFamily="JetBrains Mono, monospace" fontSize="12">
        18:45 · +18°C
      </text>
      <text x="420" y="46" textAnchor="middle" fill={t.accent} fontFamily="Manrope, sans-serif" fontSize="12" fontWeight="700">
        LADA VESTA PULSE · РЕЖИМ «ГОРОД»
      </text>
      <text x="792" y="46" textAnchor="end" fill={t.textPrimary} fontFamily="JetBrains Mono, monospace" fontSize="12">
        ЗАПАС ХОДА 480 КМ
      </text>

      {/* Left X-Arc Gauge: Speedometer */}
      <path
        d="M 245 78 A 115 115 0 1 0 245 274"
        fill="none"
        stroke={t.surfaceBorder}
        strokeWidth="12"
        strokeLinecap="round"
      />
      <path
        d="M 116 254 A 115 115 0 0 1 178 72"
        fill="none"
        stroke={t.accent}
        strokeWidth="12"
        strokeLinecap="round"
      />
      <text x="180" y="182" textAnchor="middle" fill={t.textPrimary} fontFamily="JetBrains Mono, monospace" fontSize="58" fontWeight="700">
        {speed}
      </text>
      <text x="180" y="210" textAnchor="middle" fill={t.textMuted} fontFamily="Manrope, sans-serif" fontSize="14" fontWeight="600">
        КМ/Ч
      </text>
      <text x="180" y="276" textAnchor="middle" fill={t.textMuted} fontFamily="JetBrains Mono, monospace" fontSize="11">
        КРУИЗ-КОНТРОЛЬ 60
      </text>

      {/* Center ADAS & Navigation Focus Panel */}
      <rect x="290" y="68" width="260" height="206" rx="14" fill={t.surface} stroke={t.surfaceBorder} strokeWidth="1.5" />
      {/* Perspective Lane Lines */}
      <line x1="366" y1="88" x2="314" y2="254" stroke={t.secondaryAccent} strokeWidth="2.5" strokeDasharray="8 6" />
      <line x1="474" y1="88" x2="526" y2="254" stroke={t.secondaryAccent} strokeWidth="2.5" strokeDasharray="8 6" />
      {/* Top-Down Vesta Silhouette */}
      <rect x="394" y="148" width="52" height="92" rx="14" fill={t.bg} stroke={t.accent} strokeWidth="2" />
      <rect x="401" y="168" width="38" height="24" rx="4" fill={t.surfaceBorder} />
      <line x1="402" y1="152" x2="438" y2="152" stroke={t.accent} strokeWidth="3" />
      {/* Turn Prompt */}
      <text x="420" y="106" textAnchor="middle" fill={t.textPrimary} fontFamily="Manrope, sans-serif" fontSize="13" fontWeight="700">
        350 м налево
      </text>
      <text x="420" y="124" textAnchor="middle" fill={t.textMuted} fontFamily="Plus Jakarta Sans, sans-serif" fontSize="11">
        ул. Революционная
      </text>

      {/* Right X-Arc Gauge: Tachometer */}
      <path
        d="M 595 78 A 115 115 0 1 1 595 274"
        fill="none"
        stroke={t.surfaceBorder}
        strokeWidth="12"
        strokeLinecap="round"
      />
      <path
        d="M 724 254 A 115 115 0 0 0 706 104"
        fill="none"
        stroke={t.secondaryAccent}
        strokeWidth="12"
        strokeLinecap="round"
      />
      <text x="660" y="182" textAnchor="middle" fill={t.textPrimary} fontFamily="JetBrains Mono, monospace" fontSize="50" fontWeight="700">
        2.4
      </text>
      <text x="660" y="210" textAnchor="middle" fill={t.textMuted} fontFamily="Manrope, sans-serif" fontSize="12" fontWeight="600">
        ОБ/МИН ×1000
      </text>
      <text x="660" y="276" textAnchor="middle" fill={t.accent} fontFamily="JetBrains Mono, monospace" fontSize="14" fontWeight="700">
        ПЕРЕДАЧА D4
      </text>

      {/* Bottom Fuel & Temp Bar */}
      <rect x="48" y="290" width="200" height="6" rx="3" fill={t.surfaceBorder} />
      <rect x="48" y="290" width="154" height="6" rx="3" fill={t.accent} />
      <text x="48" y="312" fill={t.textMuted} fontFamily="JetBrains Mono, monospace" fontSize="11">
        ТОПЛИВО 78%
      </text>

      <text x="420" y="308" textAnchor="middle" fill={t.textMuted} fontFamily="JetBrains Mono, monospace" fontSize="11">
        ПРОБЕГ 14 280 КМ · СРЕДНИЙ РАСХОД 6.8 Л/100
      </text>

      <rect x="592" y="290" width="200" height="6" rx="3" fill={t.surfaceBorder} />
      <rect x="592" y="290" width="110" height="6" rx="3" fill={t.secondaryAccent} />
      <text x="792" y="312" textAnchor="end" fill={t.textMuted} fontFamily="JetBrains Mono, monospace" fontSize="11">
        ОЖ 90°C
      </text>
    </svg>
  );
});
