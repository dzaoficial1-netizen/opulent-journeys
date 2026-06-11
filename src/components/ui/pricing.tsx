import { useState } from "react";
import { Check } from "lucide-react";

export function Pricing() {
  const [isAnnual, setIsAnnual] = useState(false);

  const plans = [
    {
      name: "Economy",
      price: "$0",
      description: "For casual travelers",
      features: [
        "Basic hotel & flight search",
        "Standard support",
        "Email confirmations",
        "Community help center",
      ],
      cta: "Get Started",
      highlighted: false,
    },
    {
      name: "Business",
      price: isAnnual ? "$99" : "$12",
      description: "For frequent travelers",
      features: [
        "Priority seat selection",
        "Flexible date changes",
        "Priority customer support",
        "Exclusive deals & discounts",
        "Multi-passenger booking",
        "Instant visa tracking",
      ],
      cta: "Upgrade to Business",
      highlighted: true,
    },
    {
      name: "First Class",
      price: "Custom",
      description: "For agencies & groups",
      features: [
        "All Business features",
        "Dedicated travel agent",
        "Group booking tools",
        "Custom branding",
        "Enterprise integrations",
        "Bulk visa processing",
      ],
      cta: "Contact Us",
      highlighted: false,
    },
  ];

  return (
    <div className="bg-[#F9F8F6]">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-[#1A1A1A] md:text-4xl">
            Plans & Pricing
          </h2>
          <p className="mb-6 text-lg text-[#1A1A1A]/60">Save more when you book yearly</p>
          <div className="inline-flex items-center rounded-full bg-black/[0.03] p-1">
            <button
              type="button"
              className={`rounded-full px-6 py-2.5 text-sm font-medium transition-colors ${
                !isAnnual
                  ? "bg-black/[0.07] text-[#1A1A1A]"
                  : "text-[#1A1A1A]/50 hover:text-[#1A1A1A]"
              }`}
              onClick={() => setIsAnnual(false)}
            >
              Monthly
            </button>
            <button
              type="button"
              className={`rounded-full px-6 py-2.5 text-sm font-medium transition-colors ${
                isAnnual
                  ? "bg-black/[0.07] text-[#1A1A1A]"
                  : "text-[#1A1A1A]/50 hover:text-[#1A1A1A]"
              }`}
              onClick={() => setIsAnnual(true)}
            >
              Annual
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-2xl border p-6 transition-all duration-300 ${
                plan.highlighted
                  ? "scale-[1.02] border-[#C9A84C]/40 bg-[#C9A84C]/5 shadow-xl"
                  : "border-black/[0.08]"
              }`}
            >
              {plan.highlighted && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <div className="rounded-full bg-[#C9A84C] px-4 py-1.5">
                    <span className="text-xs font-medium text-[#1A1A1A]">Most Popular</span>
                  </div>
                </div>
              )}
              <div className="mb-6">
                <h3 className="mb-2 text-xl font-medium text-[#1A1A1A]">{plan.name}</h3>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-bold text-[#1A1A1A]">{plan.price}</span>
                  {plan.price !== "Custom" && (
                    <span className="text-sm text-[#1A1A1A]/50">
                      per user/{isAnnual ? "year" : "month"}
                    </span>
                  )}
                </div>
                <p className="mt-4 text-sm text-[#1A1A1A]/50">{plan.description}</p>
              </div>
              <div className="mb-6 space-y-3">
                {plan.features.map((f) => (
                  <div key={f} className="flex items-center gap-2.5">
                    <Check className="h-4 w-4 text-[#0F6E56]" />
                    <span className="text-sm text-[#1A1A1A]/80">{f}</span>
                  </div>
                ))}
              </div>
              <button
                type="button"
                className={`w-full rounded-xl px-4 py-2.5 text-sm font-medium transition-colors ${
                  plan.highlighted
                    ? "bg-[#C9A84C] text-[#1A1A1A] hover:bg-[#C9A84C]/90"
                    : "border border-black/10 text-[#1A1A1A] hover:bg-black/[0.03]"
                }`}
              >
                {plan.cta}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
