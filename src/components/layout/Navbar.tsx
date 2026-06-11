import { useState, useEffect } from "react";
import { Link } from "@tanstack/react-router";
import { Plane } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BRAND, COLORS } from "@/lib/constants";

const NAV_LINKS = [
  { to: "/hotels", label: "Hotels" },
  { to: "/flights", label: "Flights" },
  { to: "/visas", label: "Visas" },
  { to: "/account", label: "My Account" },
  { to: "/about", label: "Contact" },
] as const;

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header 
      className="sticky top-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? 'white' : 'rgba(255,255,255,0.85)',
        backdropFilter: 'blur(20px)',
        borderBottom: scrolled ? 'none' : '1px solid rgba(201,168,76,0.2)',
        boxShadow: scrolled ? '0 4px 20px rgba(0,0,0,0.1)' : 'none',
        animation: 'slideDown 0.5s ease-out'
      }}
    >
      <style>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-100%);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .nav-link {
          position: relative;
        }
        .nav-link::after {
          content: '';
          position: absolute;
          width: 0;
          height: 2px;
          bottom: -2px;
          left: 0;
          background-color: #C9A84C;
          transition: width 0.3s ease;
        }
        .nav-link:hover::after {
          width: 100%;
        }
        .nav-link.active::after {
          width: 100%;
        }
      `}</style>
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:px-6">
        <Link to="/" className="flex items-center gap-2">
          <img 
            src="/logo.png" 
            alt="iTrip Travel Services" 
            className="h-14 w-auto max-w-[180px] object-contain"
            style={{animation: 'fadeIn 1s ease-in'}}
          />
        </Link>

        <nav className="flex items-center gap-6">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              activeProps={{
                className: "nav-link active text-[#C9A84C]",
              }}
              className="nav-link text-sm font-medium text-[#1A1A1A] transition-colors hover:text-[#C9A84C]"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <Button
          variant="outline"
          className="rounded-full border-2 border-[#C9A84C] text-[#C9A84C] px-6 transition-all hover:scale-105"
          style={{background: 'transparent'}}
          asChild
        >
          <Link to="/account" style={{color: '#C9A84C'}}>Sign In</Link>
        </Button>
      </div>
    </header>
  );
}
