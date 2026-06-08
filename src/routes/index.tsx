import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { motion, useScroll, useTransform, useInView, AnimatePresence } from "framer-motion";
import CountUp from "react-countup";
import { Button } from "@/components/ui/button";
import {
  Plane, Hotel, FileCheck, Star, MapPin, Users, Globe, Award,
  ArrowRight, ArrowLeftRight, Instagram, Facebook, Twitter, Send, Check,
  Mail, MessageCircle, Plus, Minus, ChevronDown, Sparkles,
} from "lucide-react";

import heroCinematic from "@/assets/hero-cinematic.jpg";
import parallaxHotel from "@/assets/parallax-hotel.jpg";
import destMountains from "@/assets/dest-mountains.jpg";
import destParis from "@/assets/dest-paris.jpg";
import destMorocco from "@/assets/dest-morocco.jpg";
import destSantorini from "@/assets/dest-santorini.jpg";
import destSafari from "@/assets/dest-safari.jpg";
import destDubai from "@/assets/dest-dubai.jpg";
import destIstanbul from "@/assets/dest-istanbul.jpg";

const PHONE = "213776897923";
const EMAIL = "anesmokhati@gmail.com";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Luxury Escapes — The World Is Yours" },
      { name: "description", content: "Luxury travel experiences crafted for the few who expect the extraordinary. Flights, hotels, and visas — concierge service worldwide." },
      { property: "og:title", content: "Luxury Escapes — The World Is Yours" },
      { property: "og:description", content: "Luxury travel experiences crafted for the few who expect the extraordinary." },
      { property: "og:image", content: heroCinematic },
      { name: "twitter:image", content: heroCinematic },
    ],
  }),
  component: Landing,
});

// ============================== Helpers ==============================
function FadeUp({ children, delay = 0, className }: { children: ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, delay, ease: [0.2, 0.7, 0.2, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ============================== Loader ==============================
function Loader() {
  const [done, setDone] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setDone(true), 1400);
    return () => clearTimeout(t);
  }, []);
  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ x: "100%" }}
          transition={{ duration: 0.9, ease: [0.7, 0, 0.3, 1] }}
          className="fixed inset-0 z-[100] bg-[#0A1628] flex items-center justify-center"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
            className="flex items-center gap-3"
          >
            <div className="h-12 w-12 rounded-full gold-gradient flex items-center justify-center shadow-[0_0_40px_rgba(201,168,76,0.6)]">
              <span className="font-serif text-navy-deep text-2xl leading-none">L</span>
            </div>
            <span className="font-serif text-white text-3xl tracking-wider">Luxury Escapes</span>
          </motion.div>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.1, delay: 0.4, ease: [0.7, 0, 0.3, 1] }}
            className="absolute bottom-0 left-0 h-[3px] w-full gold-gradient origin-left"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ============================== Header ==============================
function Header() {
  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 1.4 }}
      className="fixed top-4 inset-x-4 z-50 flex justify-center pointer-events-none"
    >
      <div className="pointer-events-auto w-full max-w-6xl glass rounded-full shadow-[0_10px_40px_-12px_rgba(10,22,40,0.25)] px-6 py-3 flex items-center justify-between">
        <a href="#top" className="flex items-center gap-2">
          <span className="h-8 w-8 rounded-full gold-gradient flex items-center justify-center">
            <span className="font-serif text-navy-deep text-lg leading-none">L</span>
          </span>
          <span className="font-serif text-navy text-lg tracking-wide">Luxury Escapes</span>
        </a>
        <nav className="hidden md:flex items-center gap-8 text-sm text-navy/80">
          <a href="#destinations" className="hover:text-navy transition">Destinations</a>
          <a href="#flights" className="hover:text-navy transition">Flights</a>
          <a href="#hotels" className="hover:text-navy transition">Hotels</a>
          <a href="#visa" className="hover:text-navy transition">Visa</a>
          <a href="#contact" className="hover:text-navy transition">Contact</a>
        </nav>
        <Button asChild className="rounded-full bg-navy hover:bg-navy-deep text-ivory gold-glow px-5">
          <a href="#contact">Book Now</a>
        </Button>
      </div>
    </motion.header>
  );
}

// ============================== Hero ==============================
function Particles() {
  // generate 40 stars deterministically
  const stars = Array.from({ length: 40 }, (_, i) => {
    const x = (i * 137) % 100;
    const y = (i * 53) % 100;
    const d = 6 + ((i * 7) % 8);
    const s = 1 + ((i * 3) % 3);
    return { x, y, d, s };
  });
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {stars.map((p, i) => (
        <span
          key={i}
          className="absolute rounded-full bg-gold"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: `${p.s}px`,
            height: `${p.s}px`,
            opacity: 0.7,
            boxShadow: `0 0 ${p.s * 3}px rgba(201,168,76,0.8)`,
            animation: `float-y ${p.d}s ease-in-out ${i * 0.15}s infinite`,
          }}
        />
      ))}
    </div>
  );
}

function Globe3D() {
  // SVG globe with rotating flight paths
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-40">
      <div className="animate-spin-slow">
        <svg width="700" height="700" viewBox="-100 -100 200 200">
          <defs>
            <radialGradient id="globe" cx="35%" cy="35%">
              <stop offset="0%" stopColor="#1e3a5f" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#0A1628" stopOpacity="0.9" />
            </radialGradient>
          </defs>
          <circle r="90" fill="url(#globe)" stroke="#C9A84C" strokeWidth="0.4" opacity="0.8" />
          {/* latitudes */}
          {[-60, -30, 0, 30, 60].map((y) => (
            <ellipse key={y} cx="0" cy={y * 0.7} rx="90" ry={Math.abs(Math.cos((y * Math.PI) / 180)) * 12} fill="none" stroke="#C9A84C" strokeWidth="0.2" opacity="0.5" />
          ))}
          {/* longitudes */}
          {[0, 30, 60, 90, 120, 150].map((r) => (
            <ellipse key={r} cx="0" cy="0" rx={Math.abs(Math.sin((r * Math.PI) / 180)) * 90} ry="90" fill="none" stroke="#C9A84C" strokeWidth="0.2" opacity="0.4" />
          ))}
          {/* flight arcs */}
          <path d="M -70 -20 Q 0 -90 70 10" fill="none" stroke="#E8C96A" strokeWidth="0.6" strokeDasharray="2 2" opacity="0.9" />
          <path d="M -40 40 Q 20 -60 80 -20" fill="none" stroke="#E8C96A" strokeWidth="0.6" strokeDasharray="2 2" opacity="0.9" />
          <path d="M -80 10 Q -10 70 60 50" fill="none" stroke="#E8C96A" strokeWidth="0.6" strokeDasharray="2 2" opacity="0.7" />
          {/* dots */}
          {[[-70,-20],[70,10],[-40,40],[80,-20],[60,50],[-80,10]].map(([x,y],i)=>(
            <circle key={i} cx={x} cy={y} r="1.6" fill="#E8C96A">
              <animate attributeName="r" values="1.6;3;1.6" dur="2.5s" repeatCount="indefinite" begin={`${i*0.4}s`} />
            </circle>
          ))}
        </svg>
      </div>
    </div>
  );
}

function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 600], [0, 120]);
  const opacity = useTransform(scrollY, [0, 500], [1, 0.3]);

  return (
    <section id="top" ref={ref} className="relative min-h-screen w-full overflow-hidden bg-[#0A1628]">
      {/* background image */}
      <motion.div style={{ y, opacity }} className="absolute inset-0">
        <img src={heroCinematic} alt="" className="w-full h-full object-cover animate-ken-burns" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A1628]/70 via-[#0A1628]/55 to-[#0A1628]/95" />
      </motion.div>

      <Globe3D />
      <Particles />

      <div className="relative z-10 max-w-6xl mx-auto px-6 pt-40 pb-24 flex flex-col items-center text-center min-h-screen justify-center">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6, duration: 0.6 }}
          className="inline-flex items-center gap-2 rounded-full glass-dark px-4 py-1.5 text-xs tracking-[0.25em] uppercase text-gold"
        >
          <Sparkles className="h-3 w-3" /> Bespoke Journeys · Est. 2010
        </motion.span>

        <h1 className="mt-8 font-serif text-5xl sm:text-7xl md:text-8xl leading-[1.05]">
          {["The", "World", "Is", "Yours"].map((w, i) => (
            <motion.span
              key={w}
              initial={{ y: 80, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1.7 + i * 0.12, duration: 0.8, ease: [0.2, 0.7, 0.2, 1] }}
              className="inline-block mr-4"
            >
              <span className={i === 1 ? "text-shimmer" : "text-white"}>{w}</span>
            </motion.span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.5, duration: 0.8 }}
          className="mt-6 max-w-2xl text-white/75 text-lg md:text-xl font-light"
        >
          Luxury travel experiences crafted for the few who expect the extraordinary.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.8, duration: 0.7, type: "spring", bounce: 0.4 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <a href="#contact" className="group relative inline-flex items-center gap-2 rounded-full gold-gradient text-navy-deep px-7 py-3.5 font-medium gold-glow shadow-[0_20px_60px_-15px_rgba(201,168,76,0.6)]">
            <Plane className="h-4 w-4" /> Start Your Journey
            <span className="absolute inset-0 rounded-full pulse-gold" />
          </a>
          <a href="#destinations" className="inline-flex items-center gap-2 rounded-full border border-white/40 text-white px-7 py-3.5 font-medium backdrop-blur hover:bg-white/10 transition">
            <Globe className="h-4 w-4" /> Explore Destinations
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3.4, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/60"
        >
          <span className="text-[10px] tracking-[0.3em] uppercase">Scroll</span>
          <ChevronDown className="h-5 w-5 animate-bounce-down" />
        </motion.div>
      </div>
    </section>
  );
}

// ============================== Trust Bar ==============================
function TrustBar() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const stats = [
    { icon: Plane, value: 12400, suffix: "+", label: "Happy Travelers" },
    { icon: Globe, value: 68, suffix: "", label: "Destinations" },
    { icon: Star, value: 4.9, suffix: "/5", label: "Average Rating", decimals: 1 },
    { icon: Award, value: 15, suffix: "", label: "Years of Excellence" },
  ];
  return (
    <section ref={ref} className="bg-[#0A1628] text-white py-12 border-y border-gold/15">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-6 md:divide-x md:divide-gold/15">
        {stats.map((s, i) => (
          <FadeUp key={s.label} delay={i * 0.1}>
            <div className="px-4 text-center group transition-transform hover:-translate-y-1 hover:drop-shadow-[0_10px_30px_rgba(201,168,76,0.3)]">
              <s.icon className="h-6 w-6 text-gold mx-auto mb-3" />
              <div className="font-serif text-3xl md:text-4xl">
                {inView && (
                  <CountUp end={s.value} duration={2.2} decimals={s.decimals ?? 0} suffix={s.suffix} />
                )}
              </div>
              <div className="text-xs uppercase tracking-[0.2em] text-white/60 mt-2">{s.label}</div>
            </div>
          </FadeUp>
        ))}
      </div>
    </section>
  );
}

// ============================== Destinations ==============================
const DESTINATIONS = [
  { name: "Santorini", country: "🇬🇷 Greece", img: destSantorini, price: 1890, rating: 4.9, highlights: ["Caldera villas", "Private yacht", "Sunset dining"] },
  { name: "Dubai", country: "🇦🇪 UAE", img: destDubai, price: 1450, rating: 4.8, highlights: ["Burj Al Arab", "Desert safari", "Yacht charters"] },
  { name: "Marrakech", country: "🇲🇦 Morocco", img: destMorocco, price: 1290, rating: 4.9, highlights: ["Private riad", "Atlas escape", "Spice souks"] },
  { name: "Paris", country: "🇫🇷 France", img: destParis, price: 1690, rating: 4.7, highlights: ["Palace suites", "Seine cruise", "Michelin dining"] },
  { name: "Istanbul", country: "🇹🇷 Türkiye", img: destIstanbul, price: 990, rating: 4.8, highlights: ["Bosphorus suite", "Hammam ritual", "Grand Bazaar"] },
  { name: "Maasai Mara", country: "🇰🇪 Kenya", img: destSafari, price: 3490, rating: 5.0, highlights: ["Private safari", "Tented camp", "Migration views"] },
];

function GoldUnderline() {
  return (
    <svg width="200" height="14" viewBox="0 0 200 14" className="mt-4">
      <motion.path
        d="M2 8 Q 60 -2 100 7 T 198 6"
        fill="none"
        stroke="#C9A84C"
        strokeWidth="2"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.6, ease: "easeInOut" }}
      />
    </svg>
  );
}

function DestinationCard({ d, i }: { d: typeof DESTINATIONS[number]; i: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `perspective(1000px) rotateY(${x * 10}deg) rotateX(${-y * 10}deg)`;
  };
  const onLeave = () => {
    const el = ref.current;
    if (el) el.style.transform = "perspective(1000px) rotateY(0) rotateX(0)";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.7, delay: i * 0.1, ease: [0.2, 0.7, 0.2, 1] }}
      className="flip-card h-[420px]"
    >
      <div
        ref={ref}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        className="flip-inner transition-transform duration-300"
      >
        {/* Front */}
        <div className="flip-face shine shadow-[0_25px_60px_-20px_rgba(10,22,40,0.4)]">
          <img src={d.img} alt={d.name} loading="lazy" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/85 via-navy-deep/20 to-transparent" />
          <div className="absolute top-4 right-4 animate-bob">
            <div className="rounded-full gold-gradient text-navy-deep text-xs font-semibold px-3 py-1.5 shadow-[0_8px_24px_rgba(201,168,76,0.4)]">
              From ${d.price}
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
            <div className="text-xs tracking-[0.2em] uppercase text-gold-soft">{d.country}</div>
            <div className="font-serif text-3xl mt-1">{d.name}</div>
            <div className="flex items-center gap-1 mt-2 text-gold text-sm">
              {Array.from({ length: 5 }).map((_, k) => (
                <Star key={k} className="h-3.5 w-3.5 fill-gold" />
              ))}
              <span className="text-white/70 ml-1">{d.rating}</span>
            </div>
          </div>
        </div>
        {/* Back */}
        <div className="flip-face flip-back bg-navy-deep text-white p-6 flex flex-col">
          <div className="text-xs tracking-[0.2em] uppercase text-gold">{d.country}</div>
          <h3 className="font-serif text-2xl mt-1">{d.name}</h3>
          <div className="my-4 h-px bg-gold/30" />
          <ul className="space-y-2 text-sm text-white/80 flex-1">
            {d.highlights.map((h) => (
              <li key={h} className="flex items-start gap-2">
                <Check className="h-4 w-4 text-gold mt-0.5 shrink-0" /> {h}
              </li>
            ))}
          </ul>
          <div className="mt-4 flex items-end justify-between">
            <div>
              <div className="text-[10px] uppercase tracking-widest text-white/50">From</div>
              <div className="font-serif text-2xl text-gold">${d.price}</div>
            </div>
            <a href="#contact" className="rounded-full gold-gradient text-navy-deep text-sm font-medium px-5 py-2 gold-glow">
              Book Now
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function Destinations() {
  return (
    <section id="destinations" className="py-28 bg-background">
      <div className="max-w-6xl mx-auto px-6">
        <FadeUp className="text-center mb-16">
          <span className="text-xs tracking-[0.3em] uppercase text-gold">Curated Collection</span>
          <h2 className="font-serif text-4xl md:text-6xl mt-3 text-navy-deep">Where Will You Go Next?</h2>
          <div className="flex justify-center"><GoldUnderline /></div>
        </FadeUp>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {DESTINATIONS.map((d, i) => <DestinationCard key={d.name} d={d} i={i} />)}
        </div>
      </div>
    </section>
  );
}

// ============================== Flights ==============================
function Flights() {
  const [cabin, setCabin] = useState<"Economy" | "Business" | "First">("Business");
  const [pax, setPax] = useState(2);
  const [origin, setOrigin] = useState("Algiers (ALG)");
  const [dest, setDest] = useState("Paris (CDG)");
  const swap = () => {
    setOrigin(dest);
    setDest(origin);
  };

  const featured = [
    { from: "Algiers", to: "Paris", price: 380, duration: "2h 45m", airline: "Air France" },
    { from: "Algiers", to: "Dubai", price: 690, duration: "6h 10m", airline: "Emirates" },
    { from: "Algiers", to: "Istanbul", price: 420, duration: "3h 20m", airline: "Turkish" },
  ];

  return (
    <section id="flights" className="relative py-28 bg-[#0A1628] text-white overflow-hidden">
      {/* plane contrail */}
      <svg className="absolute inset-0 w-full h-full opacity-40 pointer-events-none" preserveAspectRatio="none">
        <defs>
          <linearGradient id="contrail" x1="0" x2="1">
            <stop offset="0%" stopColor="#C9A84C" stopOpacity="0" />
            <stop offset="100%" stopColor="#E8C96A" stopOpacity="0.8" />
          </linearGradient>
        </defs>
        <path d="M -50 200 Q 400 50 1200 280" stroke="url(#contrail)" strokeWidth="2" fill="none" strokeDasharray="6 6" />
      </svg>

      <div className="relative max-w-6xl mx-auto px-6">
        <FadeUp className="text-center mb-12">
          <span className="text-xs tracking-[0.3em] uppercase text-gold">Take Flight</span>
          <h2 className="font-serif text-4xl md:text-6xl mt-3">Search Premium Fares</h2>
        </FadeUp>

        <FadeUp>
          <div className={`relative rounded-3xl glass-dark p-6 md:p-10 transition-all duration-500 ${cabin === "First" ? "shadow-[0_30px_80px_-20px_rgba(201,168,76,0.4)]" : ""}`}
               style={cabin === "First" ? { background: "linear-gradient(135deg, rgba(201,168,76,0.18), rgba(10,22,40,0.6))" } : undefined}>
            <div className="grid md:grid-cols-[1fr_auto_1fr_1fr_1fr] gap-4 items-end">
              <Field label="From">
                <input value={origin} onChange={(e) => setOrigin(e.target.value)} className="input-luxe bg-white/10 border-white/15 text-white placeholder:text-white/40" />
              </Field>
              <button onClick={swap} className="self-end mb-1 h-11 w-11 rounded-full gold-gradient text-navy-deep flex items-center justify-center transition-transform hover:rotate-180 duration-500 gold-glow">
                <ArrowLeftRight className="h-4 w-4" />
              </button>
              <Field label="To">
                <input value={dest} onChange={(e) => setDest(e.target.value)} className="input-luxe bg-white/10 border-white/15 text-white placeholder:text-white/40" />
              </Field>
              <Field label="Departure">
                <input type="date" className="input-luxe bg-white/10 border-white/15 text-white" />
              </Field>
              <Field label="Return">
                <input type="date" className="input-luxe bg-white/10 border-white/15 text-white" />
              </Field>
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
              <div className="flex rounded-full bg-white/10 p-1 border border-white/15">
                {(["Economy", "Business", "First"] as const).map((c) => (
                  <button
                    key={c}
                    onClick={() => setCabin(c)}
                    className={`relative px-5 py-2 text-sm rounded-full transition ${cabin === c ? "text-navy-deep" : "text-white/70 hover:text-white"}`}
                  >
                    {cabin === c && <motion.span layoutId="cabin" className="absolute inset-0 rounded-full gold-gradient" transition={{ type: "spring", bounce: 0.2, duration: 0.5 }} />}
                    <span className="relative">{c}</span>
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-3 bg-white/10 border border-white/15 rounded-full px-3 py-1.5">
                <span className="text-sm text-white/70 px-2">Passengers</span>
                <button onClick={() => setPax(Math.max(1, pax - 1))} className="h-7 w-7 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center"><Minus className="h-3 w-3" /></button>
                <span className="w-6 text-center">{pax}</span>
                <button onClick={() => setPax(pax + 1)} className="h-7 w-7 rounded-full gold-gradient text-navy-deep flex items-center justify-center"><Plus className="h-3 w-3" /></button>
              </div>

              <button className="rounded-full gold-gradient text-navy-deep font-medium px-8 py-3 inline-flex items-center gap-2 gold-glow">
                <Plane className="h-4 w-4" /> Search Flights
              </button>
            </div>
          </div>
        </FadeUp>

        <div className="mt-10 grid md:grid-cols-3 gap-5">
          {featured.map((f, i) => (
            <FadeUp key={f.to} delay={i * 0.1}>
              <div className="rounded-2xl glass-dark p-6 transition hover:-translate-y-1 hover:shadow-[0_20px_50px_-15px_rgba(201,168,76,0.4)] cursor-pointer">
                <div className="flex items-center justify-between text-xs text-white/60 uppercase tracking-widest">
                  <span>{f.airline}</span>
                  <span>{f.duration}</span>
                </div>
                <div className="mt-4 flex items-center gap-3 font-serif text-2xl">
                  {f.from} <Plane className="h-4 w-4 text-gold" /> {f.to}
                </div>
                <div className="mt-6 flex items-end justify-between">
                  <div>
                    <div className="text-[10px] uppercase tracking-widest text-white/50">From</div>
                    <div className="text-gold font-serif text-3xl">${f.price}</div>
                  </div>
                  <span className="text-sm text-white/70 inline-flex items-center gap-1">View <ArrowRight className="h-3 w-3" /></span>
                </div>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="block">
      <span className="text-[10px] uppercase tracking-[0.2em] text-white/60">{label}</span>
      <div className="mt-1">{children}</div>
    </label>
  );
}

// ============================== Hotels ==============================
function Hotels() {
  const { scrollYProgress } = useScroll();
  const bgY = useTransform(scrollYProgress, [0, 1], ["-10%", "20%"]);

  const offers = [
    { name: "The Ritz-Carlton", location: "Maldives", rating: 5, was: 1890, price: 1290, badge: "Best Value", img: destSantorini },
    { name: "Aman Tokyo", location: "Tokyo, Japan", rating: 5, was: 2200, price: 1690, badge: "Limited", img: parallaxHotel },
    { name: "La Mamounia", location: "Marrakech, Morocco", rating: 5, was: 950, price: 720, badge: "Sold Out", img: destMorocco },
  ];

  return (
    <section id="hotels" className="relative py-28 overflow-hidden">
      <motion.div style={{ y: bgY }} className="absolute inset-0 -z-10">
        <img src={parallaxHotel} alt="" className="w-full h-[130%] object-cover" loading="lazy" />
        <div className="absolute inset-0 bg-[#0A1628]/75" />
      </motion.div>

      <div className="max-w-6xl mx-auto px-6 text-white">
        <FadeUp className="text-center mb-12">
          <span className="text-xs tracking-[0.3em] uppercase text-gold">Stay Elevated</span>
          <h2 className="font-serif text-4xl md:text-6xl mt-3">Five-Star Sanctuaries</h2>
        </FadeUp>

        <FadeUp>
          <div className="rounded-3xl glass-dark p-6 md:p-8 grid md:grid-cols-5 gap-4 items-end">
            <Field label="Destination"><input className="input-luxe bg-white/10 border-white/15 text-white" placeholder="Where to?" /></Field>
            <Field label="Check-in"><input type="date" className="input-luxe bg-white/10 border-white/15 text-white" /></Field>
            <Field label="Check-out"><input type="date" className="input-luxe bg-white/10 border-white/15 text-white" /></Field>
            <Field label="Room Type">
              <select className="input-luxe bg-white/10 border-white/15 text-white">
                <option className="text-navy">Standard</option><option className="text-navy">Deluxe</option>
                <option className="text-navy">Suite</option><option className="text-navy">Villa</option>
              </select>
            </Field>
            <button className="rounded-full gold-gradient text-navy-deep font-medium px-6 py-3 gold-glow inline-flex items-center justify-center gap-2">
              <Hotel className="h-4 w-4" /> Find Stays
            </button>
          </div>
        </FadeUp>

        <div className="mt-12 grid md:grid-cols-3 gap-6">
          {offers.map((o, i) => (
            <FadeUp key={o.name} delay={i * 0.1}>
              <div className="group relative rounded-2xl overflow-hidden bg-navy-deep border border-gold/15 transition hover:-translate-y-1 hover:shadow-[0_25px_60px_-20px_rgba(201,168,76,0.5)]">
                <div className="absolute top-4 left-4 z-10">
                  <span className="text-[10px] uppercase tracking-widest gold-gradient text-navy-deep px-3 py-1 rounded-full font-semibold">{o.badge}</span>
                </div>
                <div className="relative h-56 overflow-hidden">
                  <img src={o.img} alt={o.name} loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                </div>
                <div className="p-5">
                  <div className="text-xs text-white/60 uppercase tracking-widest">{o.location}</div>
                  <div className="font-serif text-xl mt-1">{o.name}</div>
                  <div className="flex items-center gap-1 text-gold mt-2">
                    {Array.from({ length: o.rating }).map((_, k) => <Star key={k} className="h-3.5 w-3.5 fill-gold" />)}
                  </div>
                  <div className="mt-4 flex items-end justify-between">
                    <div>
                      <span className="text-white/40 line-through text-sm mr-2">${o.was}</span>
                      <span className="font-serif text-2xl text-gold">${o.price}</span>
                      <span className="text-white/60 text-xs"> /night</span>
                    </div>
                    <a href="#contact" className="text-sm rounded-full border border-gold/40 text-gold px-4 py-1.5 hover:bg-gold hover:text-navy-deep transition">Reserve</a>
                  </div>
                </div>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================== Visa ==============================
function Visa() {
  const [type, setType] = useState<"Tourist" | "Business" | "Student" | "Transit">("Tourist");
  const steps = ["Apply", "Review", "Approval", "Travel"];
  const docs = ["Passport (6+ months)", "Photos (2)", "Travel insurance", "Hotel booking", "Bank statement"];

  return (
    <section id="visa" className="py-28 bg-background relative">
      <div className="max-w-6xl mx-auto px-6">
        <FadeUp className="text-center mb-14">
          <span className="text-xs tracking-[0.3em] uppercase text-emerald">Borderless</span>
          <h2 className="font-serif text-4xl md:text-6xl mt-3 text-navy-deep">Visa, Simplified</h2>
          <p className="text-muted-foreground mt-4 max-w-xl mx-auto">From application to approval — our concierge handles every step.</p>
        </FadeUp>

        {/* timeline */}
        <FadeUp>
          <div className="relative grid grid-cols-4 gap-2 mb-14">
            <div className="absolute left-[12%] right-[12%] top-5 h-px bg-gradient-to-r from-emerald via-gold to-emerald" />
            {steps.map((s, i) => (
              <div key={s} className="flex flex-col items-center relative">
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15, type: "spring", bounce: 0.5 }}
                  className="h-10 w-10 rounded-full gold-gradient text-navy-deep font-semibold flex items-center justify-center shadow-lg z-10"
                >
                  {i + 1}
                </motion.div>
                <span className="mt-3 text-sm font-medium text-navy-deep">{s}</span>
              </div>
            ))}
          </div>
        </FadeUp>

        <div className="grid md:grid-cols-2 gap-8 items-start">
          <FadeUp>
            <div className="rounded-3xl bg-white p-7 shadow-[0_25px_60px_-25px_rgba(10,22,40,0.2)] border border-border">
              <Field label="Destination">
                <select className="input-luxe">
                  <option>🇫🇷 France</option><option>🇦🇪 United Arab Emirates</option>
                  <option>🇹🇷 Türkiye</option><option>🇨🇦 Canada</option><option>🇺🇸 United States</option>
                </select>
              </Field>
              <div className="mt-5">
                <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Visa Type</span>
                <div className="mt-2 flex rounded-full bg-secondary p-1 text-sm">
                  {(["Tourist", "Business", "Student", "Transit"] as const).map((t) => (
                    <button key={t} onClick={() => setType(t)} className={`relative flex-1 px-3 py-2 rounded-full transition ${type === t ? "text-white" : "text-navy/70"}`}>
                      {type === t && <motion.span layoutId="visa-tab" className="absolute inset-0 bg-navy rounded-full" />}
                      <span className="relative">{t}</span>
                    </button>
                  ))}
                </div>
              </div>
              <a href="#contact" className="mt-6 inline-flex items-center gap-2 rounded-full gold-gradient text-navy-deep font-medium px-6 py-3 pulse-gold gold-glow">
                <FileCheck className="h-4 w-4" /> Start My Visa Request
              </a>
            </div>
          </FadeUp>

          <FadeUp delay={0.1}>
            <div className="rounded-3xl bg-navy-deep text-white p-7 border border-gold/20">
              <h3 className="font-serif text-2xl">Documents Checklist</h3>
              <p className="text-white/60 text-sm mt-1">Have these ready and we handle the rest.</p>
              <ul className="mt-6 space-y-3">
                {docs.map((d, i) => (
                  <motion.li
                    key={d}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.12 }}
                    className="flex items-center gap-3 text-sm"
                  >
                    <span className="h-6 w-6 rounded-md gold-gradient text-navy-deep flex items-center justify-center">
                      <Check className="h-3.5 w-3.5" />
                    </span>
                    {d}
                  </motion.li>
                ))}
              </ul>
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}

// ============================== Contact ==============================
function Contact() {
  const [sent, setSent] = useState(false);
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 4000);
  };

  return (
    <section id="contact" className="py-28 bg-background relative">
      <div className="max-w-6xl mx-auto px-6">
        <FadeUp className="text-center mb-12">
          <span className="text-xs tracking-[0.3em] uppercase text-gold">Get in Touch</span>
          <h2 className="font-serif text-4xl md:text-6xl mt-3 text-navy-deep">Let's Plan Your Escape</h2>
        </FadeUp>

        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <FadeUp>
            <a href={`https://wa.me/${PHONE}?text=Hello,%20I%20want%20to%20book%20a%20trip`} target="_blank" rel="noreferrer"
               className="group block rounded-3xl bg-white p-8 border-2 border-[#25D366]/30 hover:border-[#25D366] transition shadow-[0_20px_50px_-20px_rgba(37,211,102,0.3)] hover:shadow-[0_25px_60px_-15px_rgba(37,211,102,0.5)]">
              <div className="flex items-center gap-4">
                <div className="h-14 w-14 rounded-2xl bg-[#25D366] text-white flex items-center justify-center group-hover:rotate-12 transition-transform">
                  <MessageCircle className="h-7 w-7" />
                </div>
                <div>
                  <div className="text-xs uppercase tracking-widest text-muted-foreground">WhatsApp</div>
                  <div className="font-serif text-2xl text-navy-deep">+{PHONE}</div>
                </div>
              </div>
              <p className="text-muted-foreground mt-5">Chat with our concierge instantly — replies within minutes.</p>
              <span className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#25D366] text-white px-5 py-2.5 text-sm font-medium">
                Chat Now <ArrowRight className="h-4 w-4" />
              </span>
            </a>
          </FadeUp>

          <FadeUp delay={0.1}>
            <a href={`mailto:${EMAIL}?subject=Travel%20Booking%20Request`}
               className="group block rounded-3xl bg-white p-8 border-2 border-gold/30 hover:border-gold transition shadow-[0_20px_50px_-20px_rgba(201,168,76,0.3)] hover:shadow-[0_25px_60px_-15px_rgba(201,168,76,0.5)]">
              <div className="flex items-center gap-4">
                <div className="h-14 w-14 rounded-2xl gold-gradient text-navy-deep flex items-center justify-center group-hover:-rotate-12 transition-transform">
                  <Mail className="h-7 w-7" />
                </div>
                <div>
                  <div className="text-xs uppercase tracking-widest text-muted-foreground">Email</div>
                  <div className="font-serif text-xl text-navy-deep break-all">{EMAIL}</div>
                </div>
              </div>
              <p className="text-muted-foreground mt-5">Send us your dream itinerary — we'll craft a bespoke proposal.</p>
              <span className="mt-6 inline-flex items-center gap-2 rounded-full gold-gradient text-navy-deep px-5 py-2.5 text-sm font-medium">
                Send Email <ArrowRight className="h-4 w-4" />
              </span>
            </a>
          </FadeUp>
        </div>

        <FadeUp>
          <form onSubmit={submit} className="rounded-3xl bg-white p-8 md:p-10 shadow-[0_30px_80px_-30px_rgba(10,22,40,0.25)] border border-border">
            <div className="grid md:grid-cols-2 gap-5">
              <Field label="Full Name"><input className="input-luxe" placeholder="Your name" required /></Field>
              <Field label="Email"><input type="email" className="input-luxe" placeholder="you@email.com" required /></Field>
              <Field label="Service">
                <select className="input-luxe">
                  <option>Flight booking</option><option>Hotel reservation</option>
                  <option>Visa assistance</option><option>Full itinerary</option>
                </select>
              </Field>
              <Field label="Travel Date"><input type="date" className="input-luxe" /></Field>
            </div>
            <div className="mt-5">
              <Field label="Message">
                <textarea className="input-luxe min-h-[120px]" placeholder="Tell us about your dream trip…" />
              </Field>
            </div>
            <div className="mt-6 flex items-center justify-between flex-wrap gap-4">
              <p className="text-xs text-muted-foreground">We reply within 24h. All inquiries are confidential.</p>
              <button type="submit" className="rounded-full gold-gradient text-navy-deep font-medium px-8 py-3 inline-flex items-center gap-2 gold-glow">
                <Send className="h-4 w-4" /> Send My Request
              </button>
            </div>
          </form>
        </FadeUp>

        <AnimatePresence>
          {sent && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="fixed bottom-24 left-1/2 -translate-x-1/2 z-50 rounded-2xl bg-navy-deep text-white px-6 py-4 flex items-center gap-3 shadow-[0_30px_70px_-20px_rgba(10,22,40,0.5)] border border-gold/30"
            >
              <div className="h-9 w-9 rounded-full gold-gradient flex items-center justify-center">
                <Check className="h-5 w-5 text-navy-deep" strokeWidth={3} />
              </div>
              <div>
                <div className="font-medium">Request received</div>
                <div className="text-xs text-white/60">Our concierge will reach out shortly.</div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

// ============================== Testimonials ==============================
const TESTIMONIALS = [
  { name: "Sofia Reyes", location: "Madrid, Spain", text: "From the private jet to the villa in Santorini — every detail was flawless. Truly the gold standard.", img: "https://i.pravatar.cc/120?img=47" },
  { name: "James Carter", location: "London, UK", text: "They orchestrated a 3-week tour across Morocco that felt effortless. Concierge available 24/7.", img: "https://i.pravatar.cc/120?img=12" },
  { name: "Amira Khaled", location: "Dubai, UAE", text: "Booking my honeymoon through Luxury Escapes was the best decision. Pure magic.", img: "https://i.pravatar.cc/120?img=32" },
  { name: "Lucas Müller", location: "Berlin, Germany", text: "The visa was approved in 4 days. Stayed at a 5-star resort I'd never have found alone.", img: "https://i.pravatar.cc/120?img=15" },
];

function Testimonials() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((p) => (p + 1) % TESTIMONIALS.length), 4500);
    return () => clearInterval(t);
  }, []);
  return (
    <section id="stories" className="relative py-28 bg-[#0A1628] text-white overflow-hidden">
      <Particles />
      <div className="relative max-w-4xl mx-auto px-6 text-center">
        <FadeUp className="mb-12">
          <span className="text-xs tracking-[0.3em] uppercase text-gold">Client Stories</span>
          <h2 className="font-serif text-4xl md:text-6xl mt-3">Words from Our Travelers</h2>
        </FadeUp>

        <div className="relative h-[320px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9, rotateY: 30 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              exit={{ opacity: 0, scale: 0.9, rotateY: -30 }}
              transition={{ duration: 0.6 }}
              className="rounded-3xl glass-dark p-10 max-w-2xl mx-auto"
            >
              <img src={TESTIMONIALS[i].img} alt={TESTIMONIALS[i].name} className="h-16 w-16 rounded-full mx-auto ring-2 ring-gold p-0.5 object-cover" />
              <div className="flex justify-center gap-1 mt-4 text-gold">
                {Array.from({ length: 5 }).map((_, k) => <Star key={k} className="h-4 w-4 fill-gold" />)}
              </div>
              <p className="mt-5 font-serif text-xl md:text-2xl italic text-white/90">"{TESTIMONIALS[i].text}"</p>
              <div className="mt-5">
                <div className="font-medium">{TESTIMONIALS[i].name}</div>
                <div className="text-xs text-white/60 tracking-widest uppercase">{TESTIMONIALS[i].location}</div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex justify-center gap-2 mt-8">
          {TESTIMONIALS.map((_, k) => (
            <button key={k} onClick={() => setI(k)} className={`h-1.5 rounded-full transition-all ${k === i ? "w-8 bg-gold" : "w-2 bg-white/30"}`} />
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================== FAQ ==============================
const FAQS = [
  { q: "How do I book a trip?", a: "Reach out via WhatsApp, email, or the contact form. Our concierge will craft a custom itinerary within 24 hours." },
  { q: "What's included in luxury packages?", a: "Flights, accommodations, private transfers, curated experiences, and 24/7 concierge support." },
  { q: "Do you handle visa applications?", a: "Yes. We manage the entire visa process for over 60 destinations, including documentation and follow-ups." },
  { q: "What payment methods do you accept?", a: "Bank transfer, major credit cards, and secure online payment links. Installments available." },
  { q: "Can I customize my itinerary?", a: "Absolutely. Every journey is bespoke — tell us your vision and we'll build around it." },
  { q: "What's your cancellation policy?", a: "Flexible cancellation up to 30 days before travel for most packages. Specific terms vary by supplier." },
  { q: "Do you offer group bookings?", a: "Yes — from intimate gatherings to corporate retreats. Discounts apply for groups of 8 or more." },
  { q: "Is travel insurance included?", a: "We partner with leading insurers and include comprehensive cover in all premium packages." },
];

function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="py-28 bg-[#0A1628] text-white">
      <div className="max-w-3xl mx-auto px-6">
        <FadeUp className="text-center mb-12">
          <span className="text-xs tracking-[0.3em] uppercase text-gold">Questions</span>
          <h2 className="font-serif text-4xl md:text-6xl mt-3">Frequently Asked</h2>
        </FadeUp>
        <div className="space-y-3">
          {FAQS.map((f, i) => (
            <FadeUp key={f.q} delay={i * 0.05}>
              <div className={`rounded-2xl border transition ${open === i ? "border-gold/40 bg-white/5 border-l-4 border-l-gold" : "border-white/10 hover:border-white/20"}`}>
                <button onClick={() => setOpen(open === i ? null : i)} className="w-full flex items-center justify-between gap-4 p-5 text-left">
                  <span className="font-medium">{f.q}</span>
                  <motion.span animate={{ rotate: open === i ? 45 : 0 }} className="h-7 w-7 rounded-full gold-gradient text-navy-deep flex items-center justify-center shrink-0">
                    <Plus className="h-4 w-4" />
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {open === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <p className="px-5 pb-5 text-sm text-white/70">{f.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================== Footer ==============================
function Footer() {
  return (
    <footer className="relative bg-[#070F1F] text-white pt-16 pb-8 border-t border-gold/20">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold to-transparent" />
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-4 gap-10">
        <div>
          <div className="flex items-center gap-2">
            <span className="h-9 w-9 rounded-full gold-gradient flex items-center justify-center">
              <span className="font-serif text-navy-deep text-lg">L</span>
            </span>
            <span className="font-serif text-xl">Luxury Escapes</span>
          </div>
          <p className="text-sm text-white/60 mt-4 leading-relaxed">Bespoke journeys for the discerning traveler. The world, on your terms.</p>
          <div className="flex items-center gap-3 mt-5">
            {[Instagram, Facebook, Twitter].map((Icon, k) => (
              <a key={k} href="#" className="h-9 w-9 rounded-full border border-white/15 flex items-center justify-center hover:gold-gradient hover:text-navy-deep hover:scale-110 transition">
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
        <div>
          <div className="text-xs uppercase tracking-[0.2em] text-gold mb-4">Quick Links</div>
          <ul className="space-y-2 text-sm text-white/70">
            <li><a href="#destinations" className="hover:text-gold">Destinations</a></li>
            <li><a href="#flights" className="hover:text-gold">Flights</a></li>
            <li><a href="#hotels" className="hover:text-gold">Hotels</a></li>
            <li><a href="#visa" className="hover:text-gold">Visa Services</a></li>
          </ul>
        </div>
        <div>
          <div className="text-xs uppercase tracking-[0.2em] text-gold mb-4">Contact</div>
          <ul className="space-y-2 text-sm text-white/70">
            <li className="flex items-center gap-2"><MessageCircle className="h-4 w-4 text-gold" /> +{PHONE}</li>
            <li className="flex items-center gap-2"><Mail className="h-4 w-4 text-gold" /> {EMAIL}</li>
            <li className="flex items-center gap-2"><MapPin className="h-4 w-4 text-gold" /> Algiers, Algeria</li>
          </ul>
        </div>
        <div>
          <div className="text-xs uppercase tracking-[0.2em] text-gold mb-4">Newsletter</div>
          <p className="text-sm text-white/60 mb-3">Exclusive offers & travel inspiration.</p>
          <form className="flex items-center rounded-full bg-white/5 border border-white/15 overflow-hidden focus-within:border-gold">
            <input type="email" placeholder="Your email" className="flex-1 bg-transparent px-4 py-2.5 text-sm outline-none placeholder:text-white/40" />
            <button type="submit" className="h-10 w-10 m-1 rounded-full gold-gradient text-navy-deep flex items-center justify-center hover:scale-110 transition-transform">
              <ArrowRight className="h-4 w-4" />
            </button>
          </form>
        </div>
      </div>
      <div className="max-w-6xl mx-auto px-6 mt-12 pt-6 border-t border-white/10 text-xs text-white/40 flex flex-wrap items-center justify-between gap-3">
        <span>© {new Date().getFullYear()} Luxury Escapes. All rights reserved.</span>
        <span>Crafted with care for the extraordinary.</span>
      </div>
    </footer>
  );
}

// ============================== Floating WhatsApp ==============================
function FloatingWA() {
  const [show, setShow] = useState(false);
  useEffect(() => { const t = setTimeout(() => setShow(true), 2000); return () => clearTimeout(t); }, []);
  return (
    <AnimatePresence>
      {show && (
        <motion.a
          initial={{ scale: 0, y: 30 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0 }}
          transition={{ type: "spring", bounce: 0.5 }}
          href={`https://wa.me/${PHONE}?text=Hello,%20I%20want%20to%20book%20a%20trip`}
          target="_blank"
          rel="noreferrer"
          className="group fixed bottom-6 right-6 z-40 inline-flex items-center gap-3 rounded-full bg-[#25D366] text-white pl-4 pr-5 py-3 shadow-[0_15px_40px_-10px_rgba(37,211,102,0.6)] pulse-green hover:pl-5 hover:pr-6 transition-all"
        >
          <MessageCircle className="h-5 w-5" />
          <span className="max-w-0 group-hover:max-w-[160px] overflow-hidden whitespace-nowrap transition-all duration-500 text-sm font-medium">Chat with us</span>
        </motion.a>
      )}
    </AnimatePresence>
  );
}

// ============================== Page ==============================
function Landing() {
  return (
    <main className="bg-background text-foreground">
      <Loader />
      <Header />
      <Hero />
      <TrustBar />
      <Destinations />
      <Flights />
      <Hotels />
      <Visa />
      <Testimonials />
      <Contact />
      <FAQ />
      <Footer />
      <FloatingWA />
    </main>
  );
}
