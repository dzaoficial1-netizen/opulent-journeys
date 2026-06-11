import { useEffect, useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Plane, SlidersHorizontal, Sun, Sunset, Moon, Clock, ArrowRight } from "lucide-react";
import { PageLayout } from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FLIGHTS, CALENDAR_PRICES, AIRLINES } from "@/lib/data/flights";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { DatePicker } from "@/components/ui/date-picker";
import { CARD_BASE, SECTION_HEADING } from "@/lib/card-styles";
import { cn } from "@/lib/utils";

const AIRLINE_STYLES: Record<string, { border: string; badge: string; initials: string; textColor: string; logo?: string; textLogo?: boolean }> = {
  "Air France": { border: "border-l-[#002157]", badge: "bg-[#002157]", initials: "AF", textColor: "text-white", logo: "/airlines/Air France.png" },
  Emirates: { border: "border-l-[#C9A84C]", badge: "bg-[#C9A84C]", initials: "EK", textColor: "text-white", logo: "/airlines/Emirates.png" },
  "Turkish Airlines": { border: "border-l-[#E81932]", badge: "bg-[#E81932]", initials: "TK", textColor: "text-white", logo: "/airlines/Turkish Airlines.png" },
  Lufthansa: { border: "border-l-[#FECB00]", badge: "bg-[#FECB00]", initials: "LH", textColor: "text-[#1A1A1A]", logo: "/airlines/Lufthansa.png" },
  "Qatar Airways": { border: "border-l-[#6b0f2a]", badge: "bg-[#6b0f2a]", initials: "QR", textColor: "text-white", logo: "/airlines/Qatar Airways.png" },
  "British Airways": { border: "border-l-[#075AAA]", badge: "bg-[#075AAA]", initials: "BA", textColor: "text-white", logo: "/airlines/British Airways.png" },
  "Air Algérie": { border: "border-l-[#007A3D]", badge: "bg-[#007A3D]", initials: "AA", textColor: "text-white", logo: "/airlines/Airalgerie.png" },
};

function StopBadge({ stops, label }: { stops: number; label: string }) {
  if (stops === 0) {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
        {label}
      </span>
    );
  }
  if (stops === 1) {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700">
        <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
        {label}
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-gray-50 px-3 py-1 text-xs font-semibold text-gray-600">
      <span className="h-1.5 w-1.5 rounded-full bg-gray-400" />
      {label}
    </span>
  );
}

export default function FlightsPage() {
  const [loading, setLoading] = useState(true);
  const [from, setFrom] = useState("Algiers (ALG)");
  const [to, setTo] = useState("Paris (CDG)");
  const [depart, setDepart] = useState<Date | undefined>(new Date(2026, 5, 10));
  const [ret, setRet] = useState<Date | undefined>(new Date(2026, 5, 17));
  const [passengers, setPassengers] = useState(1);
  const [cabin, setCabin] = useState("Economy");
  const [sort, setSort] = useState<"cheapest" | "fastest" | "best">("cheapest");
  const [stops, setStops] = useState<number[]>([]);
  const [priceRange, setPriceRange] = useState([200, 1500]);
  const [airlineFilter, setAirlineFilter] = useState<string[]>([]);
  const [timeFilter, setTimeFilter] = useState<string[]>([]);
  const [maxDuration, setMaxDuration] = useState([10]);
  const [selectedDay, setSelectedDay] = useState("Jun 10");

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(t);
  }, []);

  const filtered = useMemo(() => {
    let list = [...FLIGHTS];
    if (stops.length) list = list.filter((f) => stops.includes(f.stops));
    if (airlineFilter.length) list = list.filter((f) => airlineFilter.includes(f.airline));
    list = list.filter((f) => f.price >= priceRange[0] && f.price <= priceRange[1]);
    if (sort === "cheapest") list.sort((a, b) => a.price - b.price);
    if (sort === "fastest") list.sort((a, b) => a.duration.localeCompare(b.duration));
    return list;
  }, [stops, airlineFilter, priceRange, sort]);

  const FilterPanel = () => (
    <div className="space-y-6">
      <div>
        <Label className="text-sm font-medium">Stops</Label>
        <div className="mt-3 space-y-2">
          {[
            { v: 0, l: "Non-stop" },
            { v: 1, l: "1 stop" },
            { v: 2, l: "2+ stops" },
          ].map((s) => (
            <label key={s.v} className="flex items-center gap-2 text-sm">
              <Checkbox
                checked={stops.includes(s.v)}
                onCheckedChange={(c) =>
                  setStops((prev) => (c ? [...prev, s.v] : prev.filter((x) => x !== s.v)))
                }
              />
              {s.l}
            </label>
          ))}
        </div>
      </div>
      <div>
        <Label className="text-sm font-medium">Price range</Label>
        <Slider value={priceRange} onValueChange={setPriceRange} min={100} max={2000} step={50} className="mt-3" />
        <div className="mt-2 flex justify-between text-xs text-[#1A1A1A]/60">
          <span>Prix sur commande</span>
          <span>Prix sur commande</span>
        </div>
      </div>
      <div>
        <Label className="text-sm font-medium">Departure time</Label>
        <div className="mt-3 grid grid-cols-2 gap-2">
          {[
            { id: "morning", icon: Sun, label: "Morning" },
            { id: "afternoon", icon: Sunset, label: "Afternoon" },
            { id: "evening", icon: Moon, label: "Evening" },
            { id: "night", icon: Clock, label: "Night" },
          ].map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() =>
                setTimeFilter((prev) =>
                  prev.includes(t.id) ? prev.filter((x) => x !== t.id) : [...prev, t.id],
                )
              }
              className={`flex items-center gap-2 rounded-lg border p-2 text-xs transition ${
                timeFilter.includes(t.id)
                  ? "border-[#185FA5] bg-[#185FA5]/10"
                  : "border-black/[0.08]"
              }`}
            >
              <t.icon className="h-4 w-4" />
              {t.label}
            </button>
          ))}
        </div>
      </div>
      <div>
        <Label className="text-sm font-medium">Airlines</Label>
        <div className="mt-3 space-y-2">
          {AIRLINES.map((a) => (
            <label key={a} className="flex items-center gap-2 text-sm">
              <Checkbox
                checked={airlineFilter.includes(a)}
                onCheckedChange={(c) =>
                  setAirlineFilter((prev) =>
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
        <Label className="text-sm font-medium">Max duration ({maxDuration[0]}h)</Label>
        <Slider value={maxDuration} onValueChange={setMaxDuration} min={2} max={24} step={1} className="mt-3" />
      </div>
    </div>
  );

  return (
    <PageLayout>
      <div className="sticky top-16 z-40 shadow-2xl" style={{background: 'linear-gradient(135deg, #0a1628 0%, #1a2f5e 100%)', borderBottom: '1px solid rgba(201,168,76,0.3)'}}>
        <div className="mx-auto max-w-7xl px-4 py-8 md:px-6">
          <div className="grid grid-cols-2 gap-4 md:grid-cols-6">
            <div>
              <Label className="text-xs uppercase tracking-wider text-white/70">From</Label>
              <Input 
                value={from} 
                onChange={(e) => setFrom(e.target.value)} 
                style={{background: 'rgba(255,255,255,0.08)', color: 'white', border: '1px solid rgba(255,255,255,0.1)'}}
                className="focus:border-[#C9A84C]"
              />
            </div>
            <div>
              <Label className="text-xs uppercase tracking-wider text-white/70">To</Label>
              <Input 
                value={to} 
                onChange={(e) => setTo(e.target.value)} 
                style={{background: 'rgba(255,255,255,0.08)', color: 'white', border: '1px solid rgba(255,255,255,0.1)'}}
                className="focus:border-[#C9A84C]"
              />
            </div>
            <div>
              <Label className="text-xs uppercase tracking-wider text-white/70">Departure</Label>
              <DatePicker date={depart} onDateChange={setDepart} placeholder="Departure" />
            </div>
            <div>
              <Label className="text-xs uppercase tracking-wider text-white/70">Return</Label>
              <DatePicker date={ret} onDateChange={setRet} placeholder="Return" />
            </div>
            <div>
              <Label className="text-xs uppercase tracking-wider text-white/70">Passengers</Label>
              <Input 
                type="number" 
                min={1} 
                value={passengers} 
                onChange={(e) => setPassengers(Number(e.target.value))} 
                style={{background: 'rgba(255,255,255,0.08)', color: 'white', border: '1px solid rgba(255,255,255,0.1)'}}
                className="focus:border-[#C9A84C]"
              />
            </div>
            <div>
              <Label className="text-xs uppercase tracking-wider text-white/70">Cabin</Label>
              <Select value={cabin} onValueChange={setCabin}>
                <SelectTrigger className="rounded-xl border-2 border-gray-200 focus:border-[#C9A84C]" style={{background: 'rgba(255,255,255,0.08)', color: 'white', border: '1px solid rgba(255,255,255,0.1)'}}>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Economy">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">💺</span>
                      <span>Economy</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="Business">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">🛋️</span>
                      <span>Business</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="First">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">👑</span>
                      <span>First Class</span>
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <Button 
            className="mt-4 rounded-xl py-4 font-bold transition-all hover:scale-105" 
            style={{background: 'linear-gradient(135deg, #C9A84C, #e8d5a3)', color: '#0a1628', width: '100%'}}
          >
            Search
          </Button>
        </div>
      </div>

      <div className="mx-auto flex max-w-7xl gap-8 px-4 py-8 md:px-6 bg-white">
        <aside className="hidden w-[280px] shrink-0 lg:block">
          <div className={`sticky top-36 border-t-4 border-[#185FA5] p-5 ${CARD_BASE}`}>
            <h2 className={`mb-4 ${SECTION_HEADING}`}>Filters</h2>
            <FilterPanel />
          </div>
        </aside>

        <div className="min-w-0 flex-1">
          <div className="mb-6 flex items-center gap-3">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="sm" className="lg:hidden rounded-xl border border-gray-200 hover:border-[#C9A84C]" style={{color: '#C9A84C'}}>
                  <SlidersHorizontal className="mr-2 h-4 w-4" style={{color: '#C9A84C'}} />
                  Filters
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="overflow-y-auto">
                <SheetHeader>
                  <SheetTitle>Filters</SheetTitle>
                </SheetHeader>
                <div className="mt-6">
                  <FilterPanel />
                </div>
              </SheetContent>
            </Sheet>
          </div>

          <ScrollArea className="mb-8 w-full whitespace-nowrap">
            <div className="flex gap-3 pb-2">
              {CALENDAR_PRICES.map((d) => {
                const isSelected = selectedDay === d.date;
                return (
                  <button
                    key={d.date}
                    type="button"
                    onClick={() => setSelectedDay(d.date)}
                    style={{
                      background: isSelected ? '#0a1628' : 'white',
                      color: isSelected ? '#C9A84C' : '#1A1A1A',
                      border: isSelected ? 'none' : '1px solid #e5e7eb',
                      borderRadius: '12px',
                      boxShadow: isSelected ? 'none' : '0 1px 3px rgba(0,0,0,0.1)',
                      transition: 'all 0.3s ease'
                    }}
                    className="flex min-w-[100px] flex-col items-center px-4 py-3 text-sm"
                    onMouseEnter={(e) => {
                      if (!isSelected) {
                        e.currentTarget.style.borderColor = '#C9A84C';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isSelected) {
                        e.currentTarget.style.borderColor = '#e5e7eb';
                      }
                    }}
                  >
                    <span className="text-xs font-bold" style={{color: isSelected ? '#C9A84C' : '#1A1A1A'}}>
                      {d.date}
                    </span>
                    <span className="text-xs font-semibold" style={{color: '#C9A84C', fontStyle: 'italic'}}>
                      Prix sur commande
                    </span>
                  </button>
                );
              })}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>

          <div className="mb-8 flex gap-3">
            {(["cheapest", "fastest", "best"] as const).map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setSort(s)}
                style={{
                  background: sort === s ? 'linear-gradient(135deg, #C9A84C, #e8d5a3)' : '#f5f5f5',
                  color: sort === s ? '#0a1628' : '#666',
                  borderRadius: '9999px',
                  padding: '8px 24px',
                  fontWeight: '500',
                  transition: 'all 0.3s ease'
                }}
                className="text-sm capitalize"
              >
                {s}
              </button>
            ))}
          </div>

          <div className="space-y-4">
            {loading
              ? Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className={`p-5 ${CARD_BASE}`}>
                    <Skeleton className="h-5 w-1/3" />
                    <Skeleton className="mt-3 h-8 w-2/3" />
                    <Skeleton className="mt-3 h-4 w-1/2" />
                  </div>
                ))
              : filtered.map((flight) => {
                  const style = AIRLINE_STYLES[flight.airline] ?? {
                    border: "border-l-[#185FA5]",
                    badge: "bg-[#185FA5]",
                    initials: "FL",
                    textColor: "text-white",
                  };
                  const borderColor = style.border.replace('border-l-', '').replace('[', '').replace(']', '');
                  return (
                    <motion.div
                      key={flight.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      whileHover={{ y: -3, boxShadow: "0 20px 40px rgba(0,0,0,0.1)" }}
                      style={{background:'white', borderRadius:'20px', boxShadow:'0 4px 20px rgba(0,0,0,0.08)', marginBottom:'16px', overflow:'hidden', borderLeft:`4px solid ${borderColor}`}}
                    >
                      <div style={{display:'flex', alignItems:'center', justifyContent:'space-between', padding:'20px 24px', gap:'32px'}}>
                        <div style={{display:'flex', flexDirection:'column', alignItems:'center', gap:'8px', width:'140px'}}>
                          {style.logo ? (
                            <div style={{width:'80px', height:'50px', background:'white', borderRadius:'10px', padding:'6px', boxShadow:'0 2px 8px rgba(0,0,0,0.1)', display:'flex', alignItems:'center', justifyContent:'center'}}>
                              <img src={style.logo} alt={flight.airline} style={flight.airline === "Air France" ? {maxWidth:'150%', maxHeight:'150%', objectFit:'contain', transform:'scale(1.5)'} : {maxWidth:'100%', maxHeight:'100%', objectFit:'contain'}} />
                            </div>
                          ) : (
                            <div style={{width:'80px', height:'50px', background:style.badge, borderRadius:'10px', display:'flex', alignItems:'center', justifyContent:'center'}}>
                              <span style={{color:style.textColor, fontWeight:'700', fontSize:'18px'}}>{style.initials}</span>
                            </div>
                          )}
                          <div style={{textAlign:'center'}}>
                            <div style={{fontWeight:'700', fontSize:'15px'}}>{flight.airline}</div>
                            <div style={{
                              fontSize:'12px',
                              fontWeight:'600',
                              padding:'4px 12px',
                              borderRadius:'20px',
                              marginTop:'4px',
                              background: flight.cabin === 'Economy' ? '#dcfce7' : flight.cabin === 'Business' ? '#dbeafe' : '#fef9c3',
                              color: flight.cabin === 'Economy' ? '#166534' : flight.cabin === 'Business' ? '#1e40af' : '#854d0e',
                              border: flight.cabin === 'Economy' ? '1px solid #86efac' : flight.cabin === 'Business' ? '1px solid #93c5fd' : '1px solid #fde047'
                            }}>{flight.cabin}</div>
                          </div>
                        </div>
                        <div style={{display:'flex', alignItems:'center', gap:'24px', flex:1, justifyContent:'center'}}>
                          <div style={{textAlign:'center'}}>
                            <div style={{fontSize:'2rem', fontWeight:'800', letterSpacing:'-1px'}}>{flight.depart}</div>
                            <div style={{fontSize:'12px', color:'#888', marginTop:'2px'}}>{flight.fromCode}</div>
                          </div>
                          <div style={{textAlign:'center', flex:1}}>
                            <div style={{fontSize:'11px', color:'#aaa', marginBottom:'4px'}}>{flight.duration}</div>
                            <div style={{height:'2px', background:'linear-gradient(to right, #C9A84C, #e8d5a3)', borderRadius:'2px', position:'relative'}}>
                              <span style={{position:'absolute', top:'-8px', left:'50%', transform:'translateX(-50%)', fontSize:'16px'}}>✈</span>
                            </div>
                            <div style={{fontSize:'11px', color:flight.stops===0?'#22c55e':'#f97316', marginTop:'4px', fontWeight:'600'}}>{flight.stops===0?'Non-stop':`${flight.stops} stop`}</div>
                          </div>
                          <div style={{textAlign:'center'}}>
                            <div style={{fontSize:'2rem', fontWeight:'800', letterSpacing:'-1px'}}>{flight.arrive}</div>
                            <div style={{fontSize:'12px', color:'#888', marginTop:'2px'}}>{flight.toCode}</div>
                          </div>
                        </div>
                        <div style={{textAlign:'right', minWidth:'140px'}}>
                          <Button
                            asChild
                            style={{background:'linear-gradient(135deg, #C9A84C, #e8d5a3)', color:'#1a1a1a', border:'none', borderRadius:'12px', padding:'12px 24px', fontWeight:'700', fontSize:'14px', cursor:'pointer', width:'100%'}}
                          >
                            <Link to="/flights/book" search={{ id: flight.id }}>
                              Sélectionner
                            </Link>
                          </Button>
                        </div>
                      </div>
                      <div style={{borderTop:'1px solid #f0f0f0', padding:'8px 24px', textAlign:'center'}}>
                        <span style={{color:'#C9A84C', fontStyle:'italic', fontSize:'13px', fontWeight:'500'}}>Prix sur commande</span>
                      </div>
                    </motion.div>
                  );
                })
          }
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
