import type { VisaType } from "@/lib/data/visas";

const COLORS: Record<VisaType, string> = {
  free: "#4ade80",
  evisa: "#60a5fa",
  "on-arrival": "#fbbf24",
  required: "#f87171",
};

/** Stylized flat world map — regions colored by typical visa category */
export function VisaWorldMap() {
  const regions: { d: string; type: VisaType; label: string }[] = [
    { d: "M120,80 L220,60 L280,100 L260,180 L180,200 L100,150 Z", type: "free", label: "North Africa" },
    { d: "M280,100 L420,70 L500,120 L480,200 L320,190 L260,180 Z", type: "required", label: "Europe" },
    { d: "M100,200 L200,190 L240,280 L180,350 L80,320 Z", type: "on-arrival", label: "West Africa" },
    { d: "M240,280 L380,260 L420,380 L300,400 L180,350 Z", type: "free", label: "Southern Africa" },
    { d: "M420,70 L620,50 L700,100 L680,200 L500,120 Z", type: "required", label: "Russia & Central Asia" },
    { d: "M500,120 L680,100 L760,180 L720,280 L480,200 Z", type: "evisa", label: "Middle East" },
    { d: "M680,100 L880,80 L920,200 L800,260 L720,180 Z", type: "evisa", label: "East Asia" },
    { d: "M720,280 L880,260 L900,380 L760,400 L600,360 Z", type: "evisa", label: "Southeast Asia" },
    { d: "M80,80 L120,80 L100,150 L60,120 Z", type: "required", label: "North America" },
    { d: "M60,180 L140,200 L120,320 L40,300 Z", type: "required", label: "Central America" },
    { d: "M120,320 L280,300 L300,420 L140,440 Z", type: "on-arrival", label: "South America" },
    { d: "M760,400 L920,380 L940,460 L800,480 Z", type: "evisa", label: "Australia" },
  ];

  return (
    <div className="mx-auto max-w-4xl">
      <svg
        viewBox="0 0 1000 520"
        className="w-full rounded-2xl bg-[#e8eef4] shadow-[0_2px_20px_rgba(0,0,0,0.06)]"
        role="img"
        aria-label="World visa requirements map"
      >
        <rect width="1000" height="520" fill="#dce6f0" rx="16" />
        {/* Ocean texture */}
        <circle cx="200" cy="120" r="80" fill="#d0dae8" opacity="0.4" />
        <circle cx="750" cy="350" r="100" fill="#d0dae8" opacity="0.4" />
        {regions.map((r) => (
          <path
            key={r.label}
            d={r.d}
            fill={COLORS[r.type]}
            stroke="#ffffff"
            strokeWidth="2"
            opacity="0.85"
            className="transition-opacity hover:opacity-100"
          >
            <title>{r.label}</title>
          </path>
        ))}
        {/* Grid lines for map feel */}
        {[200, 400, 600, 800].map((x) => (
          <line key={x} x1={x} y1="0" x2={x} y2="520" stroke="#c5d0de" strokeWidth="0.5" opacity="0.5" />
        ))}
        {[130, 260, 390].map((y) => (
          <line key={y} x1="0" y1={y} x2="1000" y2={y} stroke="#c5d0de" strokeWidth="0.5" opacity="0.5" />
        ))}
      </svg>
      <div className="mt-6 flex flex-wrap justify-center gap-6 text-sm text-[#1A1A1A]/70">
        <span className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full" style={{ background: COLORS.free }} />
          Visa Free
        </span>
        <span className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full" style={{ background: COLORS.evisa }} />
          eVisa
        </span>
        <span className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full" style={{ background: COLORS["on-arrival"] }} />
          On Arrival
        </span>
        <span className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full" style={{ background: COLORS.required }} />
          Required
        </span>
      </div>
    </div>
  );
}
