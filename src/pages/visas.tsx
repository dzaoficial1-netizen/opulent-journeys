import { useState } from "react";
import { Search, Check, ChevronDown } from "lucide-react";
import { PageLayout } from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  getVisaRequirement,
  VISA_TYPE_LABELS,
  VISA_TYPE_COLORS,
  VISA_FAQ,
} from "@/lib/data/visas";
import { getCountry } from "@/lib/data/countries";

const VISA_COUNTRIES = [
  // Europe
  { code: "FR", name: "France", flag: "https://flagcdn.com/w40/fr.png", visaType: "required" as const, continent: "Europe", capital: "Paris", schengen: true },
  { code: "ES", name: "Spain", flag: "https://flagcdn.com/w40/es.png", visaType: "required" as const, continent: "Europe", capital: "Madrid", schengen: true },
  { code: "DE", name: "Germany", flag: "https://flagcdn.com/w40/de.png", visaType: "required" as const, continent: "Europe", capital: "Berlin", schengen: true },
  { code: "IT", name: "Italy", flag: "https://flagcdn.com/w40/it.png", visaType: "required" as const, continent: "Europe", capital: "Rome", schengen: true },
  { code: "GB", name: "UK", flag: "https://flagcdn.com/w40/gb.png", visaType: "required" as const, continent: "Europe", capital: "London", schengen: false },
  // Asia
  { code: "TR", name: "Turkey", flag: "https://flagcdn.com/w40/tr.png", visaType: "evisa" as const, continent: "Asia", capital: "Ankara", schengen: false },
  { code: "QA", name: "Qatar", flag: "https://flagcdn.com/w40/qa.png", visaType: "evisa" as const, continent: "Asia", capital: "Doha", schengen: false },
  { code: "LK", name: "Sri Lanka", flag: "https://flagcdn.com/w40/lk.png", visaType: "evisa" as const, continent: "Asia", capital: "Colombo", schengen: false },
  { code: "MY", name: "Malaysia", flag: "https://flagcdn.com/w40/my.png", visaType: "visa_free" as const, continent: "Asia", capital: "Kuala Lumpur", schengen: false },
  { code: "ID", name: "Indonesia", flag: "https://flagcdn.com/w40/id.png", visaType: "visa_free" as const, continent: "Asia", capital: "Jakarta", schengen: false },
  // Africa
  { code: "TN", name: "Tunisia", flag: "https://flagcdn.com/w40/tn.png", visaType: "visa_free" as const, continent: "Africa", capital: "Tunis", schengen: false },
  { code: "MA", name: "Morocco", flag: "https://flagcdn.com/w40/ma.png", visaType: "visa_free" as const, continent: "Africa", capital: "Rabat", schengen: false },
  { code: "EG", name: "Egypt", flag: "https://flagcdn.com/w40/eg.png", visaType: "visa_free" as const, continent: "Africa", capital: "Cairo", schengen: false },
  { code: "KE", name: "Kenya", flag: "https://flagcdn.com/w40/ke.png", visaType: "evisa" as const, continent: "Africa", capital: "Nairobi", schengen: false },
  { code: "ET", name: "Ethiopia", flag: "https://flagcdn.com/w40/et.png", visaType: "evisa" as const, continent: "Africa", capital: "Addis Ababa", schengen: false },
  { code: "MR", name: "Mauritania", flag: "https://flagcdn.com/w40/mr.png", visaType: "visa_free" as const, continent: "Africa", capital: "Nouakchott", schengen: false },
  { code: "ML", name: "Mali", flag: "https://flagcdn.com/w40/ml.png", visaType: "visa_free" as const, continent: "Africa", capital: "Bamako", schengen: false },
  { code: "NE", name: "Niger", flag: "https://flagcdn.com/w40/ne.png", visaType: "visa_free" as const, continent: "Africa", capital: "Niamey", schengen: false },
  { code: "SN", name: "Senegal", flag: "https://flagcdn.com/w40/sn.png", visaType: "visa_free" as const, continent: "Africa", capital: "Dakar", schengen: false },
  { code: "RW", name: "Rwanda", flag: "https://flagcdn.com/w40/rw.png", visaType: "evisa" as const, continent: "Africa", capital: "Kigali", schengen: false },
  // Middle East
  { code: "AE", name: "UAE", flag: "https://flagcdn.com/w40/ae.png", visaType: "on_arrival" as const, continent: "Middle East", capital: "Abu Dhabi", schengen: false },
  { code: "JO", name: "Jordan", flag: "https://flagcdn.com/w40/jo.png", visaType: "visa_free" as const, continent: "Middle East", capital: "Amman", schengen: false },
  { code: "QA", name: "Qatar", flag: "https://flagcdn.com/w40/qa.png", visaType: "evisa" as const, continent: "Middle East", capital: "Doha", schengen: false },
  // America
  { code: "US", name: "USA", flag: "https://flagcdn.com/w40/us.png", visaType: "required" as const, continent: "America", capital: "Washington D.C.", schengen: false },
  { code: "CA", name: "Canada", flag: "https://flagcdn.com/w40/ca.png", visaType: "required" as const, continent: "America", capital: "Ottawa", schengen: false },
  { code: "AU", name: "Australia", flag: "https://flagcdn.com/w40/au.png", visaType: "required" as const, continent: "America", capital: "Canberra", schengen: false },
];

const VISA_TYPE_BADGE_COLORS: Record<string, string> = {
  visa_free: "bg-emerald-100 text-emerald-700 border-emerald-200",
  evisa: "bg-blue-100 text-blue-700 border-blue-200",
  on_arrival: "bg-amber-100 text-amber-700 border-amber-200",
  required: "bg-red-100 text-red-700 border-red-200",
};

const VISA_TYPE_LABELS_LOCAL: Record<string, string> = {
  visa_free: "Visa Free",
  evisa: "eVisa",
  on_arrival: "On Arrival",
  required: "Required",
};

const CONTINENTS = ["All", "Schengen", "Europe", "Asia", "Africa", "Middle East", "America"];

export default function VisasPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [selectedContinent, setSelectedContinent] = useState("Europe");
  const [selectedCountry, setSelectedCountry] = useState<typeof VISA_COUNTRIES[number] | null>(null);

  const filteredCountries = VISA_COUNTRIES.filter((country) => {
    const matchesSearch = searchQuery === "" || 
      country.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      country.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      country.capital.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesFilter = selectedFilter === "All" || 
      (selectedFilter === "Schengen" && country.schengen) ||
      (selectedFilter === country.continent);
    
    return matchesSearch && matchesFilter;
  });

  const continentCountries = VISA_COUNTRIES.filter(
    country => selectedContinent === "All" || country.continent === selectedContinent
  );

  return (
    <PageLayout>
      {/* Smart Search Bar */}
      <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
        <div className="mx-auto max-w-4xl px-4 md:px-6">
          <h1 className="mb-8 text-center text-4xl font-bold text-[#1A1A1A]">
            Find Your Visa Requirements
          </h1>
          
          {/* Filter Pills */}
          <div className="mb-6 flex flex-wrap justify-center gap-2">
            {CONTINENTS.map((filter) => (
              <button
                key={filter}
                type="button"
                onClick={() => setSelectedFilter(filter)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
                  selectedFilter === filter
                    ? "bg-[#C9A84C] text-white"
                    : "bg-white text-[#1A1A1A]/70 hover:bg-gray-100 border border-gray-200"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search a country, code, or capital..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-2xl border-2 border-gray-200 bg-white py-4 pl-12 pr-4 text-lg shadow-sm transition-all focus:border-[#C9A84C] focus:outline-none"
            />
            
            {/* Search Dropdown */}
            {searchQuery && filteredCountries.length > 0 && (
              <div className="absolute z-10 mt-2 w-full rounded-2xl border border-gray-200 bg-white shadow-lg">
                {filteredCountries.slice(0, 8).map((country) => (
                  <button
                    key={country.code}
                    type="button"
                    onClick={() => {
                      setSelectedCountry(country);
                      setSearchQuery("");
                    }}
                    className="flex w-full items-center gap-3 border-b border-gray-100 p-4 transition-colors hover:bg-gray-50 last:border-0"
                  >
                    <img src={country.flag} alt={country.name} className="h-8 w-8 rounded object-contain" />
                    <div className="text-left">
                      <p className="font-semibold text-[#1A1A1A]">{country.name}</p>
                      <p className="text-xs text-[#C9A84C]">{VISA_TYPE_LABELS_LOCAL[country.visaType]}</p>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Inline Country Detail Panel */}
      {selectedCountry && (
        <section className="mx-auto max-w-4xl px-4 py-8 md:px-6">
          <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-lg">
            <div className="mb-6 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <img src={selectedCountry.flag} alt={selectedCountry.name} className="h-16 w-16 rounded object-contain" />
                <div>
                  <h2 className="text-2xl font-bold text-[#1A1A1A]">{selectedCountry.name}</h2>
                  <p className="text-sm text-[#1A1A1A]/60">Capital: {selectedCountry.capital}</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setSelectedCountry(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                <ChevronDown className="h-6 w-6" />
              </button>
            </div>

            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="overview" className="border-b border-gray-100 py-4">
                <AccordionTrigger className="font-semibold text-[#1A1A1A]">Overview</AccordionTrigger>
                <AccordionContent className="text-[#1A1A1A]/70">
                  {selectedCountry.visaType === "visa_free" && "Algerian passport holders can enter this country without a visa for tourism purposes."}
                  {selectedCountry.visaType === "evisa" && "Algerian passport holders can apply for an electronic visa (eVisa) online before traveling."}
                  {selectedCountry.visaType === "on_arrival" && "Algerian passport holders can obtain a visa on arrival at the airport."}
                  {selectedCountry.visaType === "required" && "Algerian passport holders require a visa to enter this country. Apply in advance at the embassy."}
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="requirements" className="border-b border-gray-100 py-4">
                <AccordionTrigger className="font-semibold text-[#1A1A1A]">Requirements</AccordionTrigger>
                <AccordionContent className="text-[#1A1A1A]/70">
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#0F6E56]" />
                      Valid passport (minimum 6 months validity)
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#0F6E56]" />
                      Completed visa application form
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#0F6E56]" />
                      Passport-sized photographs
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#0F6E56]" />
                      Proof of accommodation
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#0F6E56]" />
                      Return flight ticket
                    </li>
                  </ul>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="documents" className="border-b border-gray-100 py-4">
                <AccordionTrigger className="font-semibold text-[#1A1A1A]">Documents</AccordionTrigger>
                <AccordionContent className="text-[#1A1A1A]/70">
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#0F6E56]" />
                      Original passport
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#0F6E56]" />
                      Bank statement (last 3 months)
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#0F6E56]" />
                      Travel insurance
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#0F6E56]" />
                      Invitation letter (if applicable)
                    </li>
                  </ul>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="processing" className="border-b border-gray-100 py-4">
                <AccordionTrigger className="font-semibold text-[#1A1A1A]">Processing Time</AccordionTrigger>
                <AccordionContent className="text-[#1A1A1A]/70">
                  {selectedCountry.visaType === "visa_free" && "Not required"}
                  {selectedCountry.visaType === "evisa" && "3-5 business days"}
                  {selectedCountry.visaType === "on_arrival" && "Immediate at airport"}
                  {selectedCountry.visaType === "required" && "15-30 business days"}
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="fees" className="border-b border-gray-100 py-4">
                <AccordionTrigger className="font-semibold text-[#1A1A1A]">Fees</AccordionTrigger>
                <AccordionContent className="text-[#1A1A1A]/70">
                  {selectedCountry.visaType === "visa_free" && "Free"}
                  {selectedCountry.visaType === "evisa" && "$50 - $100 USD"}
                  {selectedCountry.visaType === "on_arrival" && "$30 - $50 USD"}
                  {selectedCountry.visaType === "required" && "$80 - $150 USD"}
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="faqs" className="py-4">
                <AccordionTrigger className="font-semibold text-[#1A1A1A]">FAQs</AccordionTrigger>
                <AccordionContent className="text-[#1A1A1A]/70">
                  <Accordion type="single" collapsible className="w-full">
                    {VISA_FAQ.slice(0, 3).map((f, i) => (
                      <AccordionItem key={i} value={`sub-faq-${i}`} className="border-b border-gray-100 py-2 last:border-0">
                        <AccordionTrigger className="text-sm font-medium text-[#1A1A1A] hover:no-underline">{f.q}</AccordionTrigger>
                        <AccordionContent className="text-xs text-[#1A1A1A]/70">{f.a}</AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </section>
      )}

      {/* Schengen Section */}
      <section className="py-16">
        <div className="mx-auto max-w-6xl px-4 md:px-6">
          <h2 className="mb-8 text-center text-3xl font-bold text-[#1A1A1A]">
            🇪🇺 Schengen Visa
          </h2>

          {/* Info Cards */}
          <div className="mb-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { label: "Included Countries", value: "27" },
              { label: "Accessible Duration", value: "90 days" },
              { label: "Visa Types", value: "4 types" },
              { label: "Processing Time", value: "15-30 days" },
            ].map((info) => (
              <div
                key={info.label}
                className="rounded-2xl border border-gray-200 bg-white p-6 text-center shadow-sm"
              >
                <p className="text-3xl font-bold text-[#C9A84C]">{info.value}</p>
                <p className="mt-2 text-sm text-[#1A1A1A]/60">{info.label}</p>
              </div>
            ))}
          </div>

          {/* Schengen Buttons */}
          <div className="flex flex-wrap justify-center gap-4">
            {["Tourist Schengen", "Business Schengen", "Student Schengen", "Family Visit"].map((type) => (
              <button
                key={type}
                type="button"
                className="rounded-xl border-2 border-[#C9A84C] px-6 py-3 font-medium text-[#1A1A1A] transition-all hover:bg-[#C9A84C] hover:text-white"
              >
                {type}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Countries by Continent */}
      <section className="py-16 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <h2 className="mb-8 text-center text-3xl font-bold text-[#1A1A1A]">
            Countries by Continent
          </h2>

          {/* Continent Tabs */}
          <div className="mb-8 flex flex-wrap justify-center gap-2">
            {["Europe", "Asia", "America", "Africa", "Middle East"].map((continent) => (
              <button
                key={continent}
                type="button"
                onClick={() => setSelectedContinent(continent)}
                className={`rounded-full px-6 py-2 font-medium transition-all ${
                  selectedContinent === continent
                    ? "bg-[#C9A84C] text-white"
                    : "bg-white text-[#1A1A1A]/70 hover:bg-gray-100 border border-gray-200"
                }`}
              >
                {continent}
              </button>
            ))}
          </div>

          {/* Country Cards Grid */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {continentCountries.map((country) => (
              <div
                key={country.code}
                className="group overflow-hidden rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-[#C9A84C]"
              >
                <img src={country.flag} alt={country.name} className="mx-auto h-16 w-16 rounded object-contain" />
                <h3 className="mt-4 text-center text-lg font-bold text-[#1A1A1A]">{country.name}</h3>
                <Badge className={`mx-auto mt-3 border ${VISA_TYPE_BADGE_COLORS[country.visaType]}`}>
                  {VISA_TYPE_LABELS_LOCAL[country.visaType]}
                </Badge>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Premium CTA */}
      <section 
        className="py-20"
        style={{background: 'linear-gradient(135deg, #0a1628 0%, #1a2f5e 100%)'}}
      >
        <div className="mx-auto max-w-3xl px-4 text-center md:px-6">
          <h2 className="mb-4 text-2xl font-bold text-white">
            Not sure which visa is right for you?
          </h2>
          <Button
            className="mt-6 rounded-xl px-8 py-4 text-lg font-bold transition-all hover:scale-105"
            style={{background: 'linear-gradient(135deg, #C9A84C, #e8d5a3)', color: '#0a1628'}}
          >
            Get Free Consultation
          </Button>
        </div>
      </section>
    </PageLayout>
  );
}
