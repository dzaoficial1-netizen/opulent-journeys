import { useState, useEffect } from "react";
import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Building2, Plane, FileCheck, Shield, Clock, DollarSign, Headphones } from "lucide-react";
import { ProgressiveBlur } from "@/components/ui/progressive-blur";
import { PageLayout } from "@/components/layout/PageLayout";

const DESTINATIONS = [
  { city: "Paris", price: "Prix sur commande", image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800" },
  { city: "Dubai", price: "Prix sur commande", image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800" },
  { city: "Istanbul", price: "Prix sur commande", image: "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=800" },
  { city: "Santorini", price: "Prix sur commande", image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=800" },
  { city: "Tokyo", price: "Prix sur commande", image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800" },
  { city: "Tunis", price: "", image: "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=800" },
];

function DestinationCard({ dest }: { dest: (typeof DESTINATIONS)[number] }) {
  const [hovered, setHovered] = useState(false);

  return (
    <Link
      to="/hotels"
      className="relative aspect-[3/4] cursor-pointer overflow-hidden rounded-xl"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <motion.img
        src={dest.image}
        alt={dest.city}
        className="absolute inset-0 h-full w-full object-cover"
        animate={hovered ? { scale: 1.05 } : { scale: 1 }}
        transition={{ duration: 0.3 }}
        onError={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1539020140153-e479b8791e64?w=800' }}
      />
      <ProgressiveBlur
        className="pointer-events-none absolute bottom-0 left-0 h-[75%] w-full"
        blurIntensity={0.5}
        animate={hovered ? "visible" : "hidden"}
        variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
        transition={{ duration: 0.2, ease: "easeOut" }}
      />
      <motion.div
        className="absolute bottom-0 left-0 w-full"
        initial={{ y: 20, opacity: 0 }}
        animate={hovered ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        <div className="flex items-end justify-between px-5 py-4">
          <p className="text-lg font-semibold text-white">{dest.city}</p>
          {dest.price && (
            <span className="rounded-full bg-black/30 px-3 py-1 text-sm text-white/80">
              {dest.price}
            </span>
          )}
        </div>
      </motion.div>
    </Link>
  );
}

export default function Home() {
  useEffect(() => {
    const targets = [
      { id: 'stat-bookings', target: 10000, suffix: '+' },
      { id: 'stat-destinations', target: 50, suffix: '+' },
      { id: 'stat-satisfaction', target: 99, suffix: '%' },
    ];
    targets.forEach(({ id, target, suffix }) => {
      const el = document.getElementById(id);
      if (!el) return;
      let start = 0;
      const duration = 2000;
      const step = target / (duration / 16);
      const timer = setInterval(() => {
        start += step;
        if (start >= target) { start = target; clearInterval(timer); }
        el.textContent = Math.floor(start).toLocaleString() + suffix;
      }, 16);
    });
  }, []);

  return (
    <PageLayout>
      <section className="relative h-[700px] overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1920&q=80"
          alt="Travel"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70" />
        <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <motion.p
              className="mb-6 text-lg font-medium text-[#C9A84C] tracking-widest uppercase"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Itrip Agency
            </motion.p>
            <motion.h1
              className="mb-4 text-6xl font-bold md:text-8xl"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <span className="bg-gradient-to-r from-[#C9A84C] via-white to-[#0F6E56] bg-clip-text text-transparent">
                Your Journey
              </span>
            </motion.h1>
            <motion.h2
              className="mb-8 text-5xl font-bold text-white md:text-7xl"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <span className="relative inline-block">
                Starts Here
                <motion.span
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent bg-clip-text"
                  initial={{ x: "-100%" }}
                  animate={{ x: "100%" }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear", repeatDelay: 1 }}
                />
              </span>
            </motion.h2>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <motion.button
                className="rounded-full bg-gradient-to-r from-[#C9A84C] to-[#E8C97A] px-8 py-4 text-lg font-semibold text-[#1A1A1A] shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(201,168,76,0.5)]"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Explore Destinations
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 md:px-6">
        <div className="text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-[#C9A84C]">Why Choose iTrip</p>
          <h2 className="mb-4 text-3xl font-bold text-[#1A1A1A] md:text-4xl">Your Trusted Travel Partner in Algeria</h2>
          <p className="mx-auto max-w-2xl text-base text-[#1A1A1A]/70">
            From hotel bookings and flight reservations to visa assistance, iTrip handles every detail of your journey with care and expertise.
          </p>
        </div>
      </section>

      <section className="border-y border-gray-100 bg-gray-50 py-6">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <p className="mb-4 text-center text-sm font-semibold uppercase tracking-widest text-[#C9A84C]">NOS COMPAGNIES PARTENAIRES</p>
          <div className="relative">
            <div className="absolute left-0 top-0 z-10 h-full w-20 bg-gradient-to-r from-gray-50 to-transparent" />
            <div className="absolute right-0 top-0 z-10 h-full w-20 bg-gradient-to-l from-gray-50 to-transparent" />
            <div className="overflow-hidden">
              <div className="flex gap-6 py-4 animate-scroll w-max">
                {[
                  { name: "Emirates", src: "/airlines/Emirates.png" },
                  { name: "Qatar Airways", src: "/airlines/Qatar Airways.png" },
                  { name: "Air Algérie", src: "/airlines/Airalgerie.png" },
                  { name: "Air France", src: "/airlines/Air France.png" },
                  { name: "Lufthansa", src: "/airlines/Lufthansa.png" },
                  { name: "British Airways", src: "/airlines/British Airways.png" },
                  { name: "Turkish Airlines", src: "/airlines/Turkish Airlines.png" },
                  { name: "Emirates", src: "/airlines/Emirates.png" },
                  { name: "Qatar Airways", src: "/airlines/Qatar Airways.png" },
                  { name: "Air Algérie", src: "/airlines/Airalgerie.png" },
                  { name: "Air France", src: "/airlines/Air France.png" },
                  { name: "Lufthansa", src: "/airlines/Lufthansa.png" },
                  { name: "British Airways", src: "/airlines/British Airways.png" },
                  { name: "Turkish Airlines", src: "/airlines/Turkish Airlines.png" },
                ].map((airline, i) => (
                  <Link
                    key={airline.name + i}
                    to="/flights"
                  >
                    <div
                      style={{width:'180px', height:'80px', minWidth:'180px', backgroundColor:'white', borderRadius:'16px', boxShadow:'0 2px 8px rgba(0,0,0,0.08)', display:'flex', alignItems:'center', justifyContent:'center', padding:'12px', margin:'0 12px', cursor:'pointer', transition:'all 0.3s ease'}}
                      onMouseEnter={e => {
                        e.currentTarget.style.transform = 'translateY(-4px)';
                        e.currentTarget.style.boxShadow = '0 12px 30px rgba(201,168,76,0.25)';
                        e.currentTarget.style.border = '1.5px solid #C9A84C';
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.08)';
                        e.currentTarget.style.border = 'none';
                      }}
                    >
                      <img
                        src={airline.src}
                        alt={airline.name}
                        style={airline.name === "Air France" ? {maxWidth:'150%', maxHeight:'150%', objectFit:'contain', transform:'scale(1.5)'} : {maxWidth:'100%', maxHeight:'100%', width:'auto', height:'auto', objectFit:'contain'}}
                      />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-8 md:px-6">
        <div className="grid gap-6 md:grid-cols-3">
          {[
            { icon: Building2, title: "Hotel Bookings", desc: "Find the perfect stay from budget to luxury across hundreds of destinations.", button: "Search Hotels", to: "/hotels", image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800" },
            { icon: Plane, title: "Ticket Reservations", desc: "Find the best routes across top airlines. Fast, simple, and reliable.", button: "Book Flights", to: "/flights", image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800" },
            { icon: FileCheck, title: "Visa Requests", desc: "Expert visa assistance for a smooth and stress-free application process.", button: "Apply for Visa", to: "/visas", image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800" },
          ].map((card) => (
            <motion.div
              key={card.title}
              className="group overflow-hidden rounded-xl border border-black/[0.08] bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              whileHover={{ y: -4 }}
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={card.image}
                  alt={card.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute left-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/80 backdrop-blur-sm shadow-md">
                  <card.icon className="h-5 w-5 text-[#185FA5]" />
                </div>
              </div>
              <div className="p-5">
                <h3 className="mb-2 text-xl font-bold text-[#1A1A1A]">{card.title}</h3>
                <p className="mb-4 text-sm text-[#1A1A1A]/70">{card.desc}</p>
                <Link
                  to={card.to}
                  className="inline-flex items-center justify-center rounded-lg bg-[#185FA5] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#0d4a82]"
                >
                  {card.button}
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <section 
        style={{background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #0a0a0a 100%)', borderTop: '2px solid #C9A84C', padding: '64px 24px'}}
      >
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-4 gap-0">
            {[
              { id: 'stat-bookings', number: '10,000+', label: 'Bookings' },
              { id: 'stat-destinations', number: '50+', label: 'Destinations' },
              { id: 'stat-satisfaction', number: '99%', label: 'Satisfaction' },
              { number: '24/7', label: 'Support' },
            ].map((stat, index) => (
              <div key={stat.label} className="flex flex-col items-center text-center relative">
                {index > 0 && (
                  <div style={{position: 'absolute', left: 0, top: '20%', height: '60%', width: '1px', background: 'linear-gradient(to bottom, transparent, #C9A84C, transparent)'}} />
                )}
                <p 
                  id={stat.id}
                  style={{
                    fontSize: '3.5rem',
                    fontWeight: '800',
                    background: 'linear-gradient(135deg, #C9A84C, #f0d080)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    color: 'transparent'
                  }}
                >
                  {stat.number}
                </p>
                <p style={{color: 'white', fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase', opacity: 0.7, marginTop: '8px'}}>
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 md:px-6">
        <h2 className="mb-8 text-center text-3xl font-bold">Popular Destinations</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {DESTINATIONS.map((d) => (
            <DestinationCard key={d.city} dest={d} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 md:px-6">
        <h2 className="mb-8 text-center text-3xl font-bold">Visit Us</h2>
        <div className="rounded-2xl overflow-hidden shadow-lg">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d813.0207628169085!2d8.1071613!3d35.4031919!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12f9ed00204f64df%3A0xdf6c279ccf113109!2sitrip%20travel%20services!5e0!3m2!1sfr!2sdz!4v1781130407287!5m2!1sfr!2sdz"
            width="100%"
            height="450"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 md:px-6">
        <h2 className="mb-2 text-center text-3xl font-bold">⭐ Avis Google</h2>
        <p className="mb-8 text-center text-sm text-[#1A1A1A]/60">5.0 ★★★★★ · 2 avis sur Google Maps</p>
        <div className="grid gap-6 md:grid-cols-2">
          {[
            {
              name: "Islam Sayada",
              rating: 5,
              comment: "L'un des meilleurs",
              date: "il y a un an",
              avatarColor: "bg-[#FF6B35]"
            },
            {
              name: "Boubetana Kamel",
              rating: 5,
              comment: "Réponse du propriétaire: 🙏",
              date: "il y a un an",
              avatarColor: "bg-[#185FA5]"
            }
          ].map((review, index) => (
            <div
              key={index}
              className="rounded-2xl border border-black/[0.08] bg-[#F9F8F6] p-6 shadow-sm transition hover:shadow-md"
            >
              <div className="mb-3 flex items-center gap-1">
                {Array.from({ length: review.rating }).map((_, i) => (
                  <svg
                    key={i}
                    className="h-5 w-5 fill-[#C9A84C] text-[#C9A84C]"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="mb-4 text-sm text-[#1A1A1A]/80">{review.comment}</p>
              <div className="flex items-center gap-2">
                <div className={`flex h-10 w-10 items-center justify-center rounded-full ${review.avatarColor} text-white font-semibold`}>
                  {review.name.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#1A1A1A]">{review.name}</p>
                  <p className="text-xs text-[#1A1A1A]/60">{review.date}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </PageLayout>
  );
}
