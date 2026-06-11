import { useEffect, useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  Building2,
  MapPin,
  Star,
  Wifi,
  Waves,
  Car,
  Dumbbell,
  Coffee,
  SlidersHorizontal,
} from "lucide-react";
import { PageLayout } from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { HOTELS } from "@/lib/data/hotels";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { DatePicker } from "@/components/ui/date-picker";
import { CARD_BASE, SECTION_HEADING } from "@/lib/card-styles";

const AMENITY_ICONS: Record<string, typeof Wifi> = {
  WiFi: Wifi,
  Pool: Waves,
  Parking: Car,
  Gym: Dumbbell,
  Breakfast: Coffee,
};

const PER_PAGE = 8;

export default function HotelsPage() {
  const [loading, setLoading] = useState(true);
  const [destination, setDestination] = useState("Paris");
  const [checkIn, setCheckIn] = useState<Date | undefined>(new Date(2026, 5, 15));
  const [checkOut, setCheckOut] = useState<Date | undefined>(new Date(2026, 5, 20));
  const [guests, setGuests] = useState(2);
  const [sort, setSort] = useState("recommended");
  const [page, setPage] = useState(1);
  const [priceRange, setPriceRange] = useState([200, 1500]);
  const [starFilter, setStarFilter] = useState<number[]>([]);
  const [amenityFilter, setAmenityFilter] = useState<string[]>([]);
  const [distance, setDistance] = useState("any");
  const [minRating, setMinRating] = useState([8]);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(t);
  }, []);

  const filtered = useMemo(() => {
    let list = [...HOTELS];
    if (starFilter.length) list = list.filter((h) => starFilter.includes(h.stars));
    if (amenityFilter.length)
      list = list.filter((h) => amenityFilter.every((a) => h.amenities.includes(a)));
    list = list.filter(
      (h) => h.pricePerNight >= priceRange[0] && h.pricePerNight <= priceRange[1],
    );
    list = list.filter((h) => h.rating >= minRating[0]);
    if (distance === "1") list = list.filter((h) => h.distanceFromCenter <= 1);
    if (distance === "3") list = list.filter((h) => h.distanceFromCenter <= 3);
    if (sort === "price-asc") list.sort((a, b) => a.pricePerNight - b.pricePerNight);
    if (sort === "price-desc") list.sort((a, b) => b.pricePerNight - a.pricePerNight);
    if (sort === "rating") list.sort((a, b) => b.rating - a.rating);
    return list;
  }, [starFilter, amenityFilter, priceRange, minRating, distance, sort]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  const FilterPanel = () => (
    <div className="space-y-6">
      <div>
        <Label className="text-sm font-medium">Price per night</Label>
        <Slider
          value={priceRange}
          onValueChange={setPriceRange}
          min={100}
          max={2000}
          step={50}
          className="mt-3"
        />
        <div className="mt-2 flex justify-between text-xs text-[#1A1A1A]/60">
          <span>Prix sur commande</span>
          <span>Prix sur commande</span>
        </div>
      </div>
      <div>
        <Label className="text-sm font-medium">Star rating</Label>
        <div className="mt-3 space-y-2">
          {[5, 4, 3, 2, 1].map((s) => (
            <label key={s} className="flex items-center gap-2 text-sm">
              <Checkbox
                checked={starFilter.includes(s)}
                onCheckedChange={(c) =>
                  setStarFilter((prev) =>
                    c ? [...prev, s] : prev.filter((x) => x !== s),
                  )
                }
              />
              {s} stars
            </label>
          ))}
        </div>
      </div>
      <div>
        <Label className="text-sm font-medium">Amenities</Label>
        <div className="mt-3 space-y-2">
          {["WiFi", "Pool", "Parking", "Gym", "Breakfast"].map((a) => (
            <label key={a} className="flex items-center gap-2 text-sm">
              <Checkbox
                checked={amenityFilter.includes(a)}
                onCheckedChange={(c) =>
                  setAmenityFilter((prev) =>
                    c ? [...prev, a] : prev.filter((x) => x !== a),
                  )
                }
              />
              {a}
            </label>
          ))}
        </div>
      </div>
      <div>
        <Label className="text-sm font-medium">Distance from center</Label>
        <RadioGroup value={distance} onValueChange={setDistance} className="mt-3 space-y-2">
          <label className="flex items-center gap-2 text-sm">
            <RadioGroupItem value="any" /> Any distance
          </label>
          <label className="flex items-center gap-2 text-sm">
            <RadioGroupItem value="1" /> Within 1 km
          </label>
          <label className="flex items-center gap-2 text-sm">
            <RadioGroupItem value="3" /> Within 3 km
          </label>
        </RadioGroup>
      </div>
      <div>
        <Label className="text-sm font-medium">Guest rating (min {minRating[0]})</Label>
        <Slider
          value={minRating}
          onValueChange={setMinRating}
          min={6}
          max={10}
          step={0.5}
          className="mt-3"
        />
      </div>
      <Button className="w-full bg-[#185FA5] hover:bg-[#185FA5]/90">Apply Filters</Button>
    </div>
  );

  return (
    <PageLayout>
      <div className="sticky top-16 z-40 shadow-2xl" style={{background: 'linear-gradient(135deg, #0a1628 0%, #1a2f5e 100%)', borderBottom: '1px solid rgba(201,168,76,0.3)'}}>
        <div className="mx-auto flex max-w-7xl flex-wrap items-end gap-4 px-4 py-8 md:px-6">
          <div className="grid flex-1 grid-cols-2 gap-4 md:grid-cols-4">
            <div>
              <Label className="text-xs uppercase tracking-wider text-white/70">Destination</Label>
              <Input 
                value={destination} 
                onChange={(e) => setDestination(e.target.value)} 
                style={{background: 'rgba(255,255,255,0.08)', color: 'white', border: '1px solid rgba(255,255,255,0.1)'}}
                className="focus:border-[#C9A84C]"
              />
            </div>
            <div>
              <Label className="text-xs uppercase tracking-wider text-white/70">Check-in</Label>
              <DatePicker date={checkIn} onDateChange={setCheckIn} placeholder="Check-in" />
            </div>
            <div>
              <Label className="text-xs uppercase tracking-wider text-white/70">Check-out</Label>
              <DatePicker date={checkOut} onDateChange={setCheckOut} placeholder="Check-out" />
            </div>
            <div>
              <Label className="text-xs uppercase tracking-wider text-white/70">Guests</Label>
              <Input
                type="number"
                min={1}
                value={guests}
                onChange={(e) => setGuests(Number(e.target.value))}
                style={{background: 'rgba(255,255,255,0.08)', color: 'white', border: '1px solid rgba(255,255,255,0.1)'}}
                className="focus:border-[#C9A84C]"
              />
            </div>
          </div>
          <Button 
            variant="outline"
            className="rounded-xl transition-all hover:scale-105"
            style={{background: 'linear-gradient(135deg, #C9A84C, #e8d5a3)', color: '#0a1628', border: 'none'}}
          >
            Edit Search
          </Button>
        </div>
      </div>

      <div className="mx-auto flex max-w-7xl gap-8 px-4 py-8 md:px-6">
        <aside className="hidden w-[280px] shrink-0 lg:block">
          <div className={`sticky top-36 border-t-4 border-[#185FA5] p-5 ${CARD_BASE}`}>
            <h2 className={`mb-4 ${SECTION_HEADING}`}>Filters</h2>
            <FilterPanel />
          </div>
        </aside>

        <div className="min-w-0 flex-1">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <p className="text-sm text-[#1A1A1A]/70">
                {loading ? "Searching…" : `${filtered.length} hotels found`}
              </p>
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" size="sm" className="lg:hidden">
                    <SlidersHorizontal className="mr-2 h-4 w-4" />
                    Filters
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-[300px] overflow-y-auto">
                  <SheetHeader>
                    <SheetTitle>Filters</SheetTitle>
                  </SheetHeader>
                  <div className="mt-6">
                    <FilterPanel />
                  </div>
                </SheetContent>
              </Sheet>
            </div>
            <Select value={sort} onValueChange={setSort}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="recommended">Recommended</SelectItem>
                <SelectItem value="price-asc">Price: low to high</SelectItem>
                <SelectItem value="price-desc">Price: high to low</SelectItem>
                <SelectItem value="rating">Rating</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-4">
            {loading
              ? Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className={`flex gap-4 overflow-hidden p-4 ${CARD_BASE}`}>
                    <Skeleton className="h-48 w-56 shrink-0 rounded-xl" />
                    <div className="flex-1 space-y-3">
                      <Skeleton className="h-5 w-2/3" />
                      <Skeleton className="h-4 w-1/2" />
                      <Skeleton className="h-4 w-full" />
                    </div>
                  </div>
                ))
              : paginated.map((hotel) => {
                const hotelPrices: Record<string, number> = {
                  "Ritz Paris": 890,
                  "Burj Al Arab": 1250,
                  "Aman Tokyo": 980,
                  "Four Seasons Paris": 750,
                  "Mandarin Oriental": 680,
                  "Shangri-La": 520,
                  "Hilton": 280,
                  "Marriott": 320,
                  "Hyatt": 350,
                  "InterContinental": 380,
                  "Radisson": 220,
                  "Novotel": 180,
                  "Ibis": 150,
                  "Sheraton": 290,
                  "Westin": 340,
                };
                const price = hotelPrices[hotel.name] || Math.floor(Math.random() * 300) + 150;
                const isBestPrice = price < 300;

                return (
                  <div
                    key={hotel.id}
                    className="group flex overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-[0_4px_24px_rgba(0,0,0,0.08)] transition-all duration-300 hover:shadow-[0_8px_40px_rgba(24,95,165,0.15)] hover:-translate-y-1 sm:flex-row"
                  >
                    <div className="relative h-48 w-full shrink-0 sm:h-52 sm:w-64">
                      <img
                        src={hotel.image}
                        alt={hotel.name}
                        className="h-full w-full object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=400";
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                      {isBestPrice && (
                        <span className="absolute top-3 left-3 rounded-full bg-gradient-to-r from-[#C9A84C] to-[#E8C97A] px-3 py-1 text-xs font-bold text-white shadow-md">
                          Best Price
                        </span>
                      )}
                    </div>
                    <div className="flex min-w-0 flex-1 flex-col justify-between p-5">
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-xl font-bold text-[#1A1A1A]">{hotel.name}</h3>
                          <div className="flex items-center gap-1 text-[#C9A84C]">
                            {Array.from({ length: hotel.stars }).map((_, i) => (
                              <Star key={i} className="h-4 w-4 fill-current" />
                            ))}
                          </div>
                        </div>
                        <p className="mt-2 flex items-center gap-1 text-sm text-gray-500">
                          <MapPin className="h-4 w-4" />
                          {hotel.address}, {hotel.city}
                        </p>
                        <div className="mt-3 flex flex-wrap gap-2">
                          {hotel.amenities.slice(0, 4).map((a) => {
                            const Icon = AMENITY_ICONS[a] ?? Building2;
                            return (
                              <span
                                key={a}
                                className="flex items-center gap-1 rounded-full border border-gray-200 bg-gray-50 px-3 py-1 text-xs text-gray-600"
                              >
                                <Icon className="h-3 w-3" />
                                {a}
                              </span>
                            );
                          })}
                        </div>
                      </div>
                      <div className="mt-4 flex items-end justify-between gap-4">
                        <div className="flex items-center gap-2">
                          <span className="rounded-lg bg-[#185FA5] px-3 py-1 text-sm font-bold text-white">
                            {hotel.rating}
                          </span>
                          <span className="text-sm text-gray-500">{hotel.reviewCount.toLocaleString()} reviews</span>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-bold text-[#185FA5]">${price}</p>
                          <p className="text-sm text-gray-400">/night</p>
                          <Button
                            asChild
                            className="mt-2 rounded-xl px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#0d4a82]"
                            style={{background: '#185FA5'}}
                          >
                            <Link to="/hotels/$id" params={{ id: hotel.id }}>
                              View Deal
                            </Link>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>

          {!loading && totalPages > 1 && (
            <Pagination className="mt-8">
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      setPage((p) => Math.max(1, p - 1));
                    }}
                  />
                </PaginationItem>
                {Array.from({ length: totalPages }).map((_, i) => (
                  <PaginationItem key={i}>
                    <PaginationLink
                      href="#"
                      isActive={page === i + 1}
                      onClick={(e) => {
                        e.preventDefault();
                        setPage(i + 1);
                      }}
                    >
                      {i + 1}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                <PaginationItem>
                  <PaginationNext
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      setPage((p) => Math.min(totalPages, p + 1));
                    }}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          )}

          <div className="mt-8 overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-[0_4px_24px_rgba(0,0,0,0.08)]">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/e/e4/Schengen_Luxembourg_Sign.jpg"
              alt="Schengen"
              className="h-auto w-full object-cover"
            />
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
