import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Plane, Hotel, FileCheck, Star, MapPin, Users, Globe, Award,
  ArrowRight, ArrowLeftRight, Menu, Instagram, Facebook, Twitter, Send, Check,
} from "lucide-react";

import heroVilla from "@/assets/hero-villa.jpg";
import aboutHotel from "@/assets/about-hotel.jpg";
import destMountains from "@/assets/dest-mountains.jpg";
import destParis from "@/assets/dest-paris.jpg";
import destMorocco from "@/assets/dest-morocco.jpg";
import destSantorini from "@/assets/dest-santorini.jpg";
import destSafari from "@/assets/dest-safari.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Luxury Escapes — Your Journey. Elevated." },
      { name: "description", content: "Bespoke luxury travel agency. Private villas, curated escapes, and white-glove concierge across the world's most extraordinary destinations." },
      { property: "og:title", content: "Luxury Escapes — Your Journey. Elevated." },
      { property: "og:description", content: "Bespoke luxury travel. Private villas, curated escapes, and white-glove concierge across the world's most extraordinary destinations." },
      { property: "og:image", content: heroVilla },
      { name: "twitter:image", content: heroVilla },
    ],
  }),
  component: Landing,
});

// ----------------------------- Header -----------------------------
function Header() {
  return (
    <header className="fixed top-4 inset-x-4 z-50 flex justify-center pointer-events-none">
      <div className="pointer-events-auto w-full max-w-6xl glass rounded-full shadow-[0_10px_40px_-12px_rgba(10,22,40,0.18)] px-6 py-3 flex items-center justify-between">
        <a href="#top" className="flex items-center gap-2">
          <span className="h-8 w-8 rounded-full bg-navy flex items-center justify-center">
            <span className="font-serif text-gold text-lg leading-none">L</span>
          </span>
          <span className="font-serif text-navy text-lg tracking-wide">Luxury Escapes</span>
        </a>
        <nav className="hidden md:flex items-center gap-8 text-sm text-navy/80">
          <a href="#destinations" className="hover:text-navy transition">Destinations</a>
          <a href="#services" className="hover:text-navy transition">Services</a>
          <a href="#offers" className="hover:text-navy transition">Offers</a>
          <a href="#stories" className="hover:text-navy transition">Stories</a>
          <a href="#about" className="hover:text-navy transition">About</a>
        </nav>
        <div className="flex items-center gap-2">
          <Button asChild className="hidden sm:inline-flex rounded-full bg-navy hover:bg-navy-deep text-ivory gold-glow px-5">
            <a href="#book">Book Now</a>
          </Button>
          <button className="md:hidden p-2 text-navy"><Menu className="h-5 w-5" /></button>
        </div>
      </div>
    </header>
  );
}

// ----------------------------- Hero -----------------------------
function Hero() {
  return (
    <section id="top" className="relative min-h-screen w-full overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={heroVilla}
          alt="Luxury overwater villa at golden hour"
          className="absolute inset-0 h-full w-full object-cover animate-ken-burns"
          width={1920}
          height={1080}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-navy-deep/70 via-navy-deep/35 to-navy-deep/85" />
      </div>

      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 text-center text-ivory">
        <span className="animate-fade-in mb-6 inline-flex items-center gap-2 rounded-full border border-gold/40 bg-white/5 px-4 py-1.5 text-xs tracking-[0.25em] uppercase text-gold">
          <span className="h-1.5 w-1.5 rounded-full bg-gold" /> Bespoke Travel · Est. 2009
        </span>
        <h1 className="animate-fade-up font-serif text-5xl sm:text-7xl md:text-8xl leading-[1.05] max-w-5xl">
          Your Journey.<br />
          <span className="italic text-gold">Elevated.</span>
        </h1>
        <p className="animate-fade-up mt-6 max-w-xl text-base sm:text-lg text-ivory/80 [animation-delay:120ms]">
          Hand-crafted escapes to the world's most extraordinary places — private villas, exclusive routes,
          and concierge service that anticipates every desire.
        </p>
        <div className="animate-fade-up mt-10 flex flex-col sm:flex-row items-center gap-3 [animation-delay:240ms]">
          <Button asChild size="lg" className="rounded-full bg-gold hover:bg-gold-soft text-navy-deep gold-glow px-7 py-6 text-base font-medium">
            <a href="#destinations">Explore Destinations <ArrowRight className="ml-2 h-4 w-4" /></a>
          </Button>
          <Button asChild size="lg" variant="outline" className="rounded-full border-ivory/40 bg-white/5 text-ivory hover:bg-white/10 hover:text-ivory px-7 py-6 text-base">
            <a href="#book">Book Now</a>
          </Button>
        </div>
      </div>

      {/* scroll cue */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-ivory/60 text-xs tracking-[0.3em] uppercase">
        Scroll
      </div>
    </section>
  );
}

// ----------------------------- About -----------------------------
function About() {
  const stats = [
    { icon: Users, value: "10K+", label: "Clients Served" },
    { icon: Globe, value: "50+", label: "Destinations" },
    { icon: Award, value: "15", label: "Years of Craft" },
  ];
  return (
    <section id="about" className="relative py-28 md:py-36 px-6">
      <div className="mx-auto max-w-6xl grid md:grid-cols-2 gap-14 md:gap-20 items-center">
        <div className="relative">
          <div className="absolute -inset-4 rounded-3xl bg-gold/20 blur-2xl" aria-hidden />
          <img
            src={aboutHotel}
            alt="Luxurious marble hotel lobby"
            loading="lazy"
            width={1200}
            height={1400}
            className="relative rounded-3xl shadow-2xl object-cover w-full h-[560px]"
          />
        </div>
        <div>
          <span className="text-xs tracking-[0.3em] uppercase text-emerald">Our Philosophy</span>
          <h2 className="mt-4 font-serif text-4xl md:text-5xl text-navy leading-tight">
            Quiet luxury,<br /> rendered in detail.
          </h2>
          <p className="mt-6 text-muted-foreground leading-relaxed">
            For fifteen years we've designed singular journeys for travelers who measure value in
            moments, not minutes. Every booking passes through a private concierge — every villa,
            flight, and reservation chosen with intention.
          </p>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            Trust, exclusivity, and a craftsman's eye for the small things. That is the Luxury
            Escapes promise.
          </p>

          <div className="mt-10 grid grid-cols-3 gap-4">
            {stats.map((s) => (
              <div key={s.label} className="rounded-2xl bg-white border border-border p-5 shadow-sm">
                <s.icon className="h-5 w-5 text-gold" />
                <div className="mt-3 font-serif text-3xl text-navy">{s.value}</div>
                <div className="text-xs tracking-wide text-muted-foreground mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ----------------------------- Services -----------------------------
function Services() {
  const [tab, setTab] = useState<"hotel" | "visa" | "flight">("hotel");

  return (
    <section id="services" className="relative py-28 md:py-36 px-6 bg-navy-deep text-ivory overflow-hidden">
      <div className="absolute inset-0 opacity-[0.07] [background-image:radial-gradient(circle_at_1px_1px,white_1px,transparent_0)] [background-size:24px_24px]" />
      <div className="relative mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <span className="text-xs tracking-[0.3em] uppercase text-gold">Our Services</span>
          <h2 className="mt-3 font-serif text-4xl md:text-5xl">Three doorways to the extraordinary</h2>
          <p className="mt-4 max-w-xl mx-auto text-ivory/70">
            From the first inquiry to the welcome glass at arrival — every detail, handled.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {([
            { id: "hotel", label: "Hotels & Rooms", icon: Hotel },
            { id: "visa", label: "Visa Requests", icon: FileCheck },
            { id: "flight", label: "Flight Tickets", icon: Plane },
          ] as const).map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm transition ${
                tab === t.id
                  ? "bg-gold text-navy-deep"
                  : "border border-ivory/15 text-ivory/80 hover:bg-white/5"
              }`}
            >
              <t.icon className="h-4 w-4" /> {t.label}
            </button>
          ))}
        </div>

        <div className="glass-dark rounded-3xl p-6 md:p-10">
          {tab === "hotel" && <HotelForm />}
          {tab === "visa" && <VisaForm />}
          {tab === "flight" && <FlightForm />}
        </div>
      </div>
    </section>
  );
}

function FieldLabel({ children }: { children: React.ReactNode }) {
  return <label className="block text-xs tracking-wider uppercase text-ivory/60 mb-2">{children}</label>;
}

function HotelForm() {
  return (
    <div className="grid md:grid-cols-2 gap-10">
      <div>
        <h3 className="font-serif text-2xl text-ivory">Reserve your suite</h3>
        <p className="text-ivory/60 text-sm mt-1">Curated stays in the world's finest properties.</p>
        <div className="mt-6 grid sm:grid-cols-2 gap-4">
          <div className="sm:col-span-2">
            <FieldLabel>Destination</FieldLabel>
            <input className="input-luxe" placeholder="Maldives, Paris, Marrakech…" />
          </div>
          <div>
            <FieldLabel>Check-in</FieldLabel>
            <input type="date" className="input-luxe" />
          </div>
          <div>
            <FieldLabel>Check-out</FieldLabel>
            <input type="date" className="input-luxe" />
          </div>
          <div>
            <FieldLabel>Room Type</FieldLabel>
            <select className="input-luxe">
              <option>Standard</option><option>Deluxe</option><option>Suite</option><option>Private Villa</option>
            </select>
          </div>
          <div>
            <FieldLabel>Guests</FieldLabel>
            <input type="number" defaultValue={2} min={1} className="input-luxe" />
          </div>
        </div>
        <Button className="mt-6 rounded-full bg-gold hover:bg-gold-soft text-navy-deep gold-glow px-6 py-5">
          Find Available Suites <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
      <div>
        <FieldLabel>Featured offers</FieldLabel>
        <div className="space-y-3">
          {[
            { name: "Soneva Jani · Maldives", price: "$2,450 / night", img: heroVilla },
            { name: "Riad Yasmine · Marrakech", price: "$680 / night", img: destMorocco },
            { name: "Canaves Oia · Santorini", price: "$1,120 / night", img: destSantorini },
          ].map((h) => (
            <div key={h.name} className="flex items-center gap-4 rounded-2xl bg-white/5 p-3 border border-white/10 hover:border-gold/40 transition">
              <img src={h.img} alt={h.name} loading="lazy" className="h-16 w-20 object-cover rounded-xl" />
              <div className="flex-1">
                <div className="text-sm text-ivory">{h.name}</div>
                <div className="text-xs text-ivory/60">From {h.price}</div>
              </div>
              <span className="text-xs rounded-full bg-gold/15 text-gold px-2.5 py-1">View</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function VisaForm() {
  const docs = ["Passport (valid 6+ months)", "Recent photograph", "Proof of accommodation", "Return ticket", "Bank statement"];
  return (
    <div className="grid md:grid-cols-2 gap-10">
      <div>
        <h3 className="font-serif text-2xl text-ivory">Request a visa</h3>
        <p className="text-ivory/60 text-sm mt-1">We handle the paperwork while you plan the trip.</p>
        <div className="mt-6 grid sm:grid-cols-2 gap-4">
          <div>
            <FieldLabel>Country</FieldLabel>
            <select className="input-luxe">
              <option>France</option><option>United States</option><option>Japan</option><option>UAE</option>
            </select>
          </div>
          <div>
            <FieldLabel>Visa type</FieldLabel>
            <select className="input-luxe">
              <option>Tourist</option><option>Business</option><option>Student</option>
            </select>
          </div>
          <div className="sm:col-span-2">
            <FieldLabel>Travel date</FieldLabel>
            <input type="date" className="input-luxe" />
          </div>
        </div>
        <Button className="mt-6 rounded-full bg-gold hover:bg-gold-soft text-navy-deep gold-glow px-6 py-5">
          Request Visa <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
      <div>
        <FieldLabel>Document checklist</FieldLabel>
        <div className="space-y-2">
          {docs.map((d) => (
            <label key={d} className="flex items-center gap-3 rounded-xl bg-white/5 border border-white/10 p-3 cursor-pointer hover:border-gold/40 transition">
              <span className="h-5 w-5 rounded-md border border-gold/60 flex items-center justify-center bg-gold/10">
                <Check className="h-3 w-3 text-gold" />
              </span>
              <span className="text-sm text-ivory/85">{d}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}

function FlightForm() {
  return (
    <div className="grid md:grid-cols-2 gap-10">
      <div>
        <h3 className="font-serif text-2xl text-ivory">Book your flight</h3>
        <p className="text-ivory/60 text-sm mt-1">Private cabins, first class, and rare routes.</p>
        <div className="mt-6 grid sm:grid-cols-[1fr_auto_1fr] gap-3 items-end">
          <div>
            <FieldLabel>From</FieldLabel>
            <input className="input-luxe" defaultValue="Algiers (ALG)" />
          </div>
          <button className="h-12 w-12 rounded-full bg-gold/20 hover:bg-gold/30 text-gold flex items-center justify-center mb-0.5">
            <ArrowLeftRight className="h-4 w-4" />
          </button>
          <div>
            <FieldLabel>To</FieldLabel>
            <input className="input-luxe" defaultValue="Paris (CDG)" />
          </div>
        </div>
        <div className="mt-4 grid sm:grid-cols-3 gap-4">
          <div>
            <FieldLabel>Departure</FieldLabel>
            <input type="date" className="input-luxe" />
          </div>
          <div>
            <FieldLabel>Return</FieldLabel>
            <input type="date" className="input-luxe" />
          </div>
          <div>
            <FieldLabel>Cabin</FieldLabel>
            <select className="input-luxe"><option>Economy</option><option>Business</option><option>First</option></select>
          </div>
        </div>
        <div className="mt-4">
          <FieldLabel>Passengers</FieldLabel>
          <input type="number" defaultValue={1} min={1} className="input-luxe max-w-[140px]" />
        </div>
        <Button className="mt-6 rounded-full bg-gold hover:bg-gold-soft text-navy-deep gold-glow px-6 py-5">
          Search Flights <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
      <div>
        <FieldLabel>Featured routes</FieldLabel>
        <div className="space-y-3">
          {[
            { route: "Algiers → Paris", carrier: "Air Algérie · Business", price: "from $640" },
            { route: "Dubai → Maldives", carrier: "Emirates · First", price: "from $2,180" },
            { route: "London → Marrakech", carrier: "Royal Air Maroc · Business", price: "from $890" },
          ].map((f) => (
            <div key={f.route} className="rounded-2xl bg-white/5 p-4 border border-white/10 hover:border-gold/40 transition">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-serif text-lg text-ivory">{f.route}</div>
                  <div className="text-xs text-ivory/60 mt-0.5">{f.carrier}</div>
                </div>
                <span className="text-gold text-sm">{f.price}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ----------------------------- Destinations / Offers -----------------------------
const offers = [
  { name: "Maldives", tag: "Indian Ocean", img: heroVilla, price: "$4,800", rating: 5, desc: "Seven nights overwater, private chef included." },
  { name: "Santorini", tag: "Greece", img: destSantorini, price: "$3,200", rating: 5, desc: "Caldera-view suites and private sunset cruise." },
  { name: "Marrakech", tag: "Morocco", img: destMorocco, price: "$2,150", rating: 4, desc: "Riad stays, hammam rituals, Atlas excursion." },
  { name: "Serengeti", tag: "Tanzania", img: destSafari, price: "$6,400", rating: 5, desc: "Tented luxury camp and great migration access." },
  { name: "Paris", tag: "France", img: destParis, price: "$1,950", rating: 4, desc: "Palace hotel, Michelin tasting, private gallery." },
  { name: "Dolomites", tag: "Italy", img: destMountains, price: "$2,700", rating: 5, desc: "Alpine retreat with heli-skiing and spa." },
];

function Offers() {
  return (
    <section id="offers" className="relative py-28 md:py-36 px-6">
      <div className="mx-auto max-w-6xl">
        <div className="flex items-end justify-between flex-wrap gap-4 mb-12">
          <div>
            <span className="text-xs tracking-[0.3em] uppercase text-emerald">Featured Offers</span>
            <h2 className="mt-3 font-serif text-4xl md:text-5xl text-navy">This season's escapes</h2>
          </div>
          <a href="#book" className="text-sm text-navy hover:text-gold transition inline-flex items-center gap-2">
            View all <ArrowRight className="h-4 w-4" />
          </a>
        </div>

        <div id="destinations" className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {offers.map((o) => (
            <article key={o.name} className="group rounded-3xl overflow-hidden bg-white border border-border shadow-sm hover:shadow-2xl hover:-translate-y-1 transition duration-500">
              <div className="relative h-64 overflow-hidden">
                <img src={o.img} alt={o.name} loading="lazy" className="h-full w-full object-cover group-hover:scale-110 transition duration-700" />
                <div className="absolute top-4 left-4 inline-flex items-center gap-1.5 rounded-full bg-white/85 backdrop-blur px-3 py-1 text-xs text-navy">
                  <MapPin className="h-3 w-3" /> {o.tag}
                </div>
                <div className="absolute top-4 right-4 rounded-full bg-gold text-navy-deep px-3 py-1 text-xs font-medium">
                  from {o.price}
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between">
                  <h3 className="font-serif text-2xl text-navy">{o.name}</h3>
                  <div className="flex">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className={`h-3.5 w-3.5 ${i < o.rating ? "fill-gold text-gold" : "text-border"}`} />
                    ))}
                  </div>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">{o.desc}</p>
                <Button className="mt-5 w-full rounded-full bg-navy hover:bg-navy-deep text-ivory gold-glow">
                  Book Now
                </Button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

// ----------------------------- Testimonials -----------------------------
const testimonials = [
  { name: "Amelia & James Carter", trip: "Maldives, 2024", quote: "Every detail anticipated. From the airport welcome to the private chef on our villa terrace — it felt like we were the only guests on earth.", rating: 5 },
  { name: "Yasmine Belkacem", trip: "Marrakech & Atlas", quote: "Their concierge unlocked doors I didn't know existed. A private dinner inside a 17th-century riad will stay with me forever.", rating: 5 },
  { name: "Daniel Moreau", trip: "Serengeti, 2023", quote: "The most thoughtful itinerary I've ever experienced. Quiet luxury done right — never showy, always exquisite.", rating: 5 },
];

function Testimonials() {
  const [i, setI] = useState(0);
  const t = testimonials[i];
  return (
    <section id="stories" className="relative py-28 md:py-36 px-6 bg-navy-deep text-ivory overflow-hidden">
      <div className="absolute inset-0 opacity-[0.06] [background-image:radial-gradient(circle_at_1px_1px,white_1px,transparent_0)] [background-size:28px_28px]" />
      <div className="relative mx-auto max-w-4xl text-center">
        <span className="text-xs tracking-[0.3em] uppercase text-gold">Client Stories</span>
        <h2 className="mt-3 font-serif text-4xl md:text-5xl">Words from our travelers</h2>

        <div className="mt-14">
          <div className="flex justify-center mb-6">
            {Array.from({ length: t.rating }).map((_, k) => (
              <Star key={k} className="h-5 w-5 fill-gold text-gold" />
            ))}
          </div>
          <blockquote className="font-serif text-2xl md:text-3xl leading-relaxed italic text-ivory/95">
            “{t.quote}”
          </blockquote>
          <div className="mt-8">
            <div className="text-gold">{t.name}</div>
            <div className="text-xs tracking-wider uppercase text-ivory/50 mt-1">{t.trip}</div>
          </div>
          <div className="mt-10 flex justify-center gap-2">
            {testimonials.map((_, k) => (
              <button
                key={k}
                onClick={() => setI(k)}
                aria-label={`Story ${k + 1}`}
                className={`h-1.5 rounded-full transition-all ${k === i ? "w-8 bg-gold" : "w-3 bg-ivory/30 hover:bg-ivory/50"}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ----------------------------- Booking Form -----------------------------
function Booking() {
  return (
    <section id="book" className="relative py-28 md:py-36 px-6 overflow-hidden">
      <div className="absolute inset-0 opacity-[0.05] [background-image:radial-gradient(circle_at_1px_1px,oklch(0.22_0.05_252)_1px,transparent_0)] [background-size:22px_22px]" />
      <div className="relative mx-auto max-w-3xl">
        <div className="text-center">
          <span className="text-xs tracking-[0.3em] uppercase text-emerald">Confirm Your Booking</span>
          <h2 className="mt-3 font-serif text-4xl md:text-5xl text-navy">Let's plan something unforgettable.</h2>
          <p className="mt-4 text-muted-foreground">A concierge will respond within the hour.</p>
        </div>

        <form onSubmit={(e) => e.preventDefault()} className="mt-12 rounded-3xl bg-white border border-border shadow-xl p-6 md:p-10 grid sm:grid-cols-2 gap-5">
          <div className="sm:col-span-2">
            <Label>Full name</Label>
            <input className="input-luxe" placeholder="Jane Doe" />
          </div>
          <div>
            <Label>Email</Label>
            <input type="email" className="input-luxe" placeholder="jane@example.com" />
          </div>
          <div>
            <Label>Phone</Label>
            <input className="input-luxe" placeholder="+1 555 123 4567" />
          </div>
          <div>
            <Label>Service</Label>
            <select className="input-luxe">
              <option>Hotels & Rooms</option>
              <option>Flight Tickets</option>
              <option>Visa Requests</option>
              <option>Full Itinerary</option>
            </select>
          </div>
          <div>
            <Label>Travel date</Label>
            <input type="date" className="input-luxe" />
          </div>
          <div className="sm:col-span-2">
            <Label>Special requests</Label>
            <textarea rows={4} className="input-luxe resize-none" placeholder="Anniversary, dietary needs, preferred experiences…" />
          </div>
          <div className="sm:col-span-2">
            <Button type="submit" size="lg" className="w-full rounded-full bg-gold hover:bg-gold-soft text-navy-deep gold-glow py-6 text-base">
              Confirm My Booking <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return <label className="block text-xs tracking-wider uppercase text-navy/70 mb-2">{children}</label>;
}

// ----------------------------- Footer -----------------------------
function Footer() {
  return (
    <footer className="bg-navy-deep text-ivory">
      <div className="mx-auto max-w-6xl px-6 py-20 grid md:grid-cols-4 gap-10">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2">
            <span className="h-9 w-9 rounded-full bg-gold flex items-center justify-center">
              <span className="font-serif text-navy-deep text-lg leading-none">L</span>
            </span>
            <span className="font-serif text-xl">Luxury Escapes</span>
          </div>
          <p className="mt-4 text-sm text-ivory/60 max-w-sm">
            Bespoke travel for those who travel rarely, and exquisitely.
          </p>
          <form onSubmit={(e) => e.preventDefault()} className="mt-6 flex max-w-sm rounded-full border border-ivory/15 bg-white/5 p-1.5">
            <input className="flex-1 bg-transparent px-4 text-sm placeholder:text-ivory/40 focus:outline-none" placeholder="Your email" />
            <button className="rounded-full bg-gold text-navy-deep px-4 py-2 text-sm gold-glow inline-flex items-center gap-1">
              Subscribe <Send className="h-3.5 w-3.5" />
            </button>
          </form>
        </div>
        <div>
          <div className="text-xs tracking-[0.25em] uppercase text-gold mb-4">Explore</div>
          <ul className="space-y-2 text-sm text-ivory/75">
            <li><a href="#about" className="hover:text-gold transition">About Us</a></li>
            <li><a href="#destinations" className="hover:text-gold transition">Destinations</a></li>
            <li><a href="#services" className="hover:text-gold transition">Concierge Services</a></li>
            <li><a href="#stories" className="hover:text-gold transition">Stories</a></li>
          </ul>
        </div>
        <div>
          <div className="text-xs tracking-[0.25em] uppercase text-gold mb-4">Contact</div>
          <ul className="space-y-2 text-sm text-ivory/75">
            <li>concierge@luxuryescapes.co</li>
            <li>+1 (212) 555-0188</li>
            <li>New York · Paris · Dubai</li>
          </ul>
          <div className="mt-5 flex gap-3">
            {[Instagram, Facebook, Twitter].map((Icon, i) => (
              <a key={i} href="#" className="h-9 w-9 rounded-full border border-ivory/15 flex items-center justify-center hover:bg-gold hover:text-navy-deep hover:border-gold transition">
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className="border-t border-ivory/10 py-6 px-6 text-center text-xs text-ivory/40">
        © {new Date().getFullYear()} Luxury Escapes · Crafted with care.
      </div>
    </footer>
  );
}

// ----------------------------- Page -----------------------------
function Landing() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <About />
        <Services />
        <Offers />
        <Testimonials />
        <Booking />
      </main>
      <Footer />
    </div>
  );
}
