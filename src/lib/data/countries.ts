export interface Country {
  code: string;
  name: string;
  flag: string;
}

export const COUNTRIES: Country[] = [
  { code: "DZ", name: "Algeria", flag: "🇩🇿" },
  { code: "FR", name: "France", flag: "🇫🇷" },
  { code: "AE", name: "United Arab Emirates", flag: "🇦🇪" },
  { code: "TR", name: "Türkiye", flag: "🇹🇷" },
  { code: "US", name: "United States", flag: "🇺🇸" },
  { code: "GB", name: "United Kingdom", flag: "🇬🇧" },
  { code: "DE", name: "Germany", flag: "🇩🇪" },
  { code: "IT", name: "Italy", flag: "🇮🇹" },
  { code: "ES", name: "Spain", flag: "🇪🇸" },
  { code: "CA", name: "Canada", flag: "🇨🇦" },
  { code: "SA", name: "Saudi Arabia", flag: "🇸🇦" },
  { code: "EG", name: "Egypt", flag: "🇪🇬" },
  { code: "MA", name: "Morocco", flag: "🇲🇦" },
  { code: "TN", name: "Tunisia", flag: "🇹🇳" },
  { code: "QA", name: "Qatar", flag: "🇶🇦" },
  { code: "JP", name: "Japan", flag: "🇯🇵" },
  { code: "CN", name: "China", flag: "🇨🇳" },
  { code: "IN", name: "India", flag: "🇮🇳" },
  { code: "BR", name: "Brazil", flag: "🇧🇷" },
  { code: "AU", name: "Australia", flag: "🇦🇺" },
];

export function getCountry(code: string) {
  return COUNTRIES.find((c) => c.code === code);
}
