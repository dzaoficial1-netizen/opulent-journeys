import { useState } from "react";
import { PageLayout } from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { BRAND } from "@/lib/constants";
import { maskPhone } from "@/lib/masks";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  MessageCircle,
  Send,
  Check,
  Facebook,
  Instagram,
} from "lucide-react";

const VALUES = [
  {
    title: "Transparency",
    desc: "Clear pricing, honest advice, and no hidden fees on every booking.",
  },
  {
    title: "Speed",
    desc: "Fast confirmations, rapid visa processing, and 24/7 support when you need it.",
  },
  {
    title: "Customer First",
    desc: "Your journey matters. We tailor every trip to your needs and budget.",
  },
];

const FAQ = [
  {
    q: "What is your refund policy?",
    a: "Refunds depend on the supplier's cancellation policy. We offer flexible options on most hotel and flight bookings when cancelled 24+ hours in advance.",
  },
  {
    q: "What happens if my visa is rejected?",
    a: "We review applications before submission to minimize rejection risk. If rejected, we assist with reapplication and offer partial refunds on eligible service fees.",
  },
  {
    q: "Can I rebook or change my trip?",
    a: "Yes. Contact us via WhatsApp or email. Change fees may apply depending on airline and hotel policies.",
  },
  {
    q: "Is my payment secure?",
    a: "All payments are processed through SSL-encrypted, PCI-DSS compliant gateways. We never store full card details.",
  },
  {
    q: "How do I reach customer support?",
    a: "We're available via WhatsApp, phone, and email during business hours, with emergency support for active travelers.",
  },
  {
    q: "Do you offer group bookings?",
    a: "Yes. We handle group travel for families, corporate trips, and tour groups with special rates.",
  },
];

export default function AboutPage() {
  const [sent, setSent] = useState(false);
  const [phone, setPhone] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 4000);
  };

  return (
    <PageLayout>
      <section className="relative flex min-h-[400px] items-center justify-center overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1920&q=80"
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-[#1A1A1A]/60" />
        <div className="relative z-10 px-4 text-center text-[#F9F8F6]">
          <h1 className="text-4xl font-bold md:text-5xl">{BRAND.name}</h1>
          <p className="mt-2 text-[#C9A84C]">Est. {BRAND.founded}</p>
          <p className="mx-auto mt-4 max-w-xl text-lg text-[#F9F8F6]/80">{BRAND.tagline}</p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 md:px-6">
        <div className="grid gap-12 lg:grid-cols-2">
          <div className="space-y-4 leading-relaxed text-[#1A1A1A]/80">
            <h2 className="text-2xl font-bold text-[#1A1A1A]">About Us</h2>
            <p>
              Founded in {BRAND.founded} in Algiers, {BRAND.name} has grown from a small travel desk
              into a full-service agency trusted by thousands of travelers across Algeria and beyond.
            </p>
            <p>
              We specialize in hotel reservations, flight bookings, and visa assistance — combining
              local expertise with global partnerships to deliver seamless travel experiences at
              competitive prices.
            </p>
            <p>
              Our team of certified travel consultants works around the clock to ensure every journey
              is planned with care, from the first inquiry to your safe return home.
            </p>
          </div>
          <img
            src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=800&q=80"
            alt="Itrip Agency team"
            className="rounded-2xl object-cover shadow-lg"
          />
        </div>

        <div className="mt-16 grid grid-cols-2 gap-6 md:grid-cols-4">
          {[
            { label: "Years", value: "14+" },
            { label: "Destinations", value: "68" },
            { label: "Customers", value: "12,400+" },
            { label: "Visa approvals", value: "9,800+" },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <p className="text-3xl font-bold text-[#185FA5]">{s.value}</p>
              <p className="mt-1 text-sm text-[#1A1A1A]/60">{s.label}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {VALUES.map((v) => (
            <div
              key={v.title}
              className="rounded-xl border border-black/[0.08] bg-[#F9F8F6] p-6"
            >
              <h3 className="text-lg font-semibold text-[#185FA5]">{v.title}</h3>
              <p className="mt-2 text-sm text-[#1A1A1A]/70">{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="contact" className="border-t border-black/[0.06] bg-[#1A1A1A]/[0.02] py-16">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <h2 className="mb-8 text-center text-2xl font-bold text-[#1A1A1A]">Contact Us</h2>
          <div className="grid gap-8 lg:grid-cols-2">
            <form onSubmit={handleSubmit} className="rounded-2xl p-8 shadow-2xl" style={{background: 'linear-gradient(135deg, #0a1628 0%, #1a2f5e 100%)', border: '1px solid rgba(201,168,76,0.3)'}}>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <Label className="text-xs uppercase tracking-wider text-white/70">Name</Label>
                  <Input required style={{background: 'rgba(255,255,255,0.08)', color: 'white', border: '1px solid rgba(255,255,255,0.1)'}} className="focus:border-[#C9A84C]" />
                </div>
                <div>
                  <Label className="text-xs uppercase tracking-wider text-white/70">Email</Label>
                  <Input type="email" required style={{background: 'rgba(255,255,255,0.08)', color: 'white', border: '1px solid rgba(255,255,255,0.1)'}} className="focus:border-[#C9A84C]" />
                </div>
                <div>
                  <Label className="text-xs uppercase tracking-wider text-white/70">Phone (optional)</Label>
                  <Input
                    value={phone}
                    onChange={(e) => setPhone(maskPhone(e.target.value))}
                    style={{background: 'rgba(255,255,255,0.08)', color: 'white', border: '1px solid rgba(255,255,255,0.1)'}}
                    className="focus:border-[#C9A84C]"
                  />
                </div>
                <div>
                  <Label className="text-xs uppercase tracking-wider text-white/70">Subject</Label>
                  <Select>
                    <SelectTrigger style={{background: 'rgba(255,255,255,0.08)', color: 'white', border: '1px solid rgba(255,255,255,0.1)'}} className="focus:border-[#C9A84C]">
                      <SelectValue placeholder="Select subject" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="booking">Booking inquiry</SelectItem>
                      <SelectItem value="visa">Visa assistance</SelectItem>
                      <SelectItem value="support">Support</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="mt-4">
                <Label className="text-xs uppercase tracking-wider text-white/70">Message</Label>
                <Textarea className="mt-1 min-h-[120px]" required style={{background: 'rgba(255,255,255,0.08)', color: 'white', border: '1px solid rgba(255,255,255,0.1)'}} />
              </div>
              <Button
                type="submit"
                className="mt-4 rounded-xl px-6 py-3 font-semibold transition-all hover:scale-105"
                style={{background: 'linear-gradient(135deg, #C9A84C, #e8d5a3)', color: '#0a1628', border: 'none'}}
              >
                <Send className="mr-2 h-4 w-4" />
                Send Message
              </Button>
            </form>

            <div className="rounded-xl border border-black/[0.08] bg-[#F9F8F6] p-6">
              <h3 className="font-semibold">Get in Touch</h3>
              <ul className="mt-4 space-y-4 text-sm">
                <li className="flex items-start gap-3">
                  <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-[#185FA5]" />
                  <a href={BRAND.mapsUrl} target="_blank" rel="noreferrer" className="hover:text-[#185FA5]">
                    Cité Fares Yahia, Tebessa, Algeria
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-[#185FA5]" />
                  <a href="tel:+213672385666">+213 672 385 666</a>
                </li>
                <li className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-[#185FA5]" />
                  <a href="mailto:itrip.travelservices@gmail.com">itrip.travelservices@gmail.com</a>
                </li>
                <li className="flex items-start gap-3">
                  <Clock className="mt-0.5 h-5 w-5 shrink-0 text-[#185FA5]" />
                  {BRAND.hours}
                </li>
              </ul>
              <Button asChild className="mt-6 w-full bg-[#25D366] hover:bg-[#25D366]/90">
                <a href="https://wa.me/213672385666" target="_blank" rel="noreferrer">
                  <MessageCircle className="mr-2 h-4 w-4" />
                  Chat on WhatsApp
                </a>
              </Button>
              <div className="mt-6">
                <h4 className="mb-3 text-sm font-semibold">Follow Us</h4>
                <div className="flex gap-3">
                  <a
                    href="https://web.facebook.com/itriptravelservices"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 transition hover:border-[#1877F2] hover:bg-[#1877F2] hover:text-white"
                  >
                    <Facebook className="h-4 w-4" />
                  </a>
                  <a
                    href="https://www.instagram.com/itriptravelservices"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 transition hover:border-transparent hover:bg-gradient-to-br hover:from-purple-500 hover:to-pink-500 hover:text-white"
                  >
                    <Instagram className="h-4 w-4" />
                  </a>
                  <a
                    href="https://www.tiktok.com/@itriptravelservices"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 transition hover:border-black hover:bg-black hover:text-white"
                  >
                    <span className="text-xs font-bold">TikTok</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 overflow-hidden rounded-2xl">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d813.0207628169085!2d8.1071613!3d35.4031919!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12f9ed00204f64df%3A0xdf6c279ccf113109!2sitrip%20travel%20services!5e0!3m2!1sfr!2sdz!4v1781130407287!5m2!1sfr!2sdz"
              width="100%"
              height="400"
              style={{border:0}}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="rounded-2xl w-full"
            />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 py-16 md:px-6">
        <h2 className="mb-6 text-2xl font-bold">Frequently Asked Questions</h2>
        <Accordion type="single" collapsible>
          {FAQ.map((f, i) => (
            <AccordionItem key={i} value={`faq-${i}`}>
              <AccordionTrigger>{f.q}</AccordionTrigger>
              <AccordionContent>{f.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      {sent && (
        <div className="fixed bottom-6 left-1/2 z-50 flex -translate-x-1/2 items-center gap-3 rounded-xl border border-[#0F6E56]/30 bg-[#F9F8F6] px-6 py-4 shadow-lg">
          <Check className="h-5 w-5 text-[#0F6E56]" />
          <span>Message sent! We'll reply within 24 hours.</span>
        </div>
      )}
    </PageLayout>
  );
}



