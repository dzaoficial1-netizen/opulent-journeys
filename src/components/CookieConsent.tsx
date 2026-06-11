import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookieConsent");
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookieConsent", "accepted");
    setIsVisible(false);
  };

  const handleReject = () => {
    localStorage.setItem("cookieConsent", "rejected");
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 p-4"
      style={{
        background: "#0a1628",
        borderTop: "1px solid #C9A84C",
        animation: "slideUp 0.5s ease-out"
      }}
    >
      <style>{`
        @keyframes slideUp {
          from {
            transform: translateY(100%);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
      `}</style>
      <div className="mx-auto max-w-7xl flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-white flex-1">
          Nous utilisons des cookies pour améliorer votre expérience. En continuant, vous acceptez notre politique de confidentialité.
        </p>
        <div className="flex gap-3">
          <Button
            onClick={handleReject}
            variant="outline"
            className="rounded-full border-white/30 text-white hover:bg-white/10"
          >
            Refuser
          </Button>
          <Button
            onClick={handleAccept}
            className="rounded-full transition-all hover:scale-105"
            style={{background: 'linear-gradient(135deg, #C9A84C, #e8d5a3)', color: '#0a1628'}}
          >
            Accepter
          </Button>
        </div>
      </div>
    </div>
  );
}
