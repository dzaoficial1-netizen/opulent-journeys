import { Link } from "@tanstack/react-router";
import { Facebook, Instagram, Mail, MapPin, Phone } from "lucide-react";
import { BRAND, COLORS } from "@/lib/constants";
import { Button } from "@/components/ui/button";

export function Footer() {
  return (
    <footer className="border-t border-black/[0.06] bg-[#1A1A1A] text-[#F9F8F6]">
      <div className="mx-auto max-w-7xl px-4 py-8 md:px-6">
        <div className="flex items-center justify-between gap-4">
          <p className="text-lg font-semibold text-white">Ready to travel?</p>
          <Button className="bg-[#C9A84C] text-[#1A1A1A] hover:bg-[#C9A84C]/90">
            Start Planning
          </Button>
        </div>
      </div>
      <div className="mx-auto max-w-7xl px-4 py-12 md:px-6">
        <div className="mb-10 flex items-center gap-2">
          <img src="/logo.png" alt="iTrip Travel Services" className="h-14 w-auto max-w-[180px] object-contain" />
        </div>

        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-wider text-[#C9A84C]">
              Services
            </h3>
            <ul className="space-y-2 text-sm text-[#F9F8F6]/70">
              <li>
                <Link to="/hotels" className="hover:text-[#C9A84C]">
                  Hotel Booking
                </Link>
              </li>
              <li>
                <Link to="/flights" className="hover:text-[#C9A84C]">
                  Flight Search
                </Link>
              </li>
              <li>
                <Link to="/visas" className="hover:text-[#C9A84C]">
                  Visa Services
                </Link>
              </li>
              <li>
                <Link to="/checkout" className="hover:text-[#C9A84C]">
                  Checkout
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-wider text-[#C9A84C]">
              Company
            </h3>
            <ul className="space-y-2 text-sm text-[#F9F8F6]/70">
              <li>
                <Link to="/about" className="hover:text-[#C9A84C]">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-[#C9A84C]">
                  Careers
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-[#C9A84C]">
                  Press
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-wider text-[#C9A84C]">
              Contact
            </h3>
            <ul className="space-y-3 text-sm text-[#F9F8F6]/70">
              <li className="flex items-start gap-2">
                <Phone className="mt-0.5 h-4 w-4 shrink-0" />
                <a href="tel:+213672385666" className="hover:text-[#C9A84C]">
                  +213 672 385 666
                </a>
              </li>
              <li className="flex items-start gap-2">
                <Mail className="mt-0.5 h-4 w-4 shrink-0" />
                <a href="mailto:itrip.travelservices@gmail.com" className="hover:text-[#C9A84C]">
                  itrip.travelservices@gmail.com
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0" />
                <span>Cité Fares Yahia, Tebessa, Algeria</span>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-wider text-[#C9A84C]">
              Follow Us
            </h3>
            <div className="flex gap-3">
              <a
                href="https://web.facebook.com/itriptravelservices"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-[#F9F8F6]/20 transition hover:border-[#1877F2] hover:bg-[#1877F2] hover:text-white"
              >
                <Facebook className="h-4 w-4" />
              </a>
              <a
                href="https://www.instagram.com/itriptravelservices"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-[#F9F8F6]/20 transition hover:border-transparent hover:bg-gradient-to-br hover:from-purple-500 hover:to-pink-500 hover:text-white"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a
                href="https://www.tiktok.com/@itriptravelservices"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-[#F9F8F6]/20 transition hover:border-black hover:bg-black hover:text-white"
              >
                <span className="text-xs font-bold">TikTok</span>
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-[#F9F8F6]/10 pt-6 text-xs text-[#F9F8F6]/50">
          <span>© {new Date().getFullYear()} {BRAND.name}. All rights reserved.</span>
          <div className="flex gap-4">
            <a href="#" className="hover:text-[#C9A84C]">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-[#C9A84C]">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
