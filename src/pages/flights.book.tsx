import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { PageLayout } from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Pricing } from "@/components/ui/pricing";
import { maskPassport } from "@/lib/masks";
import { DatePicker } from "@/components/ui/date-picker";
import { FLIGHTS } from "@/lib/data/flights";

type Passenger = {
  title: string;
  firstName: string;
  lastName: string;
  dob?: Date;
  nationality: string;
  passport: string;
  expiry?: Date;
};

const STEPS = ["Passengers", "Seats", "Extras"];
const ROWS = 30;
const COLS = ["A", "B", "C", "D", "E", "F"];
const TAKEN = new Set(["3B", "3C", "5A", "7D", "12F", "15A", "18E", "22B"]);
const EXTRA_LEGROOM = new Set(["1A", "1B", "1C", "1D", "1E", "1F", "2A", "2F"]);

type SeatStatus = "available" | "taken" | "selected" | "extra";

function getSeatStatus(seat: string, selected: string[]): SeatStatus {
  if (selected.includes(seat)) return "selected";
  if (TAKEN.has(seat)) return "taken";
  if (EXTRA_LEGROOM.has(seat)) return "extra";
  return "available";
}

const SEAT_COLORS: Record<SeatStatus, string> = {
  available: "bg-[#0F6E56]/20 border-[#0F6E56] hover:bg-[#0F6E56]/40",
  taken: "bg-[#1A1A1A]/10 border-[#1A1A1A]/20 cursor-not-allowed",
  selected: "bg-[#185FA5] border-[#185FA5] text-[#F9F8F6]",
  extra: "bg-[#C9A84C]/30 border-[#C9A84C] hover:bg-[#C9A84C]/50",
};

export default function FlightBookPage() {
  const [step, setStep] = useState(0);
  const [passengers, setPassengers] = useState<Passenger[]>([
    { title: "Mr", firstName: "", lastName: "", dob: undefined, nationality: "DZ", passport: "", expiry: undefined },
  ]);
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const [baggage, setBaggage] = useState("carry-on");
  const [meal, setMeal] = useState("standard");
  const [insurance, setInsurance] = useState(false);
  const [priority, setPriority] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const flight = FLIGHTS[0];
  const basePrice = flight.price * passengers.length;
  const seatUpcharge = selectedSeats.filter((s) => EXTRA_LEGROOM.has(s)).length * 45;
  const baggagePrice = baggage === "23kg" ? 35 : baggage === "32kg" ? 60 : 0;
  const extrasPrice = (insurance ? 25 : 0) + (priority ? 15 : 0);
  const taxes = Math.round(basePrice * 0.1);
  const total = basePrice + seatUpcharge + baggagePrice + extrasPrice + taxes;

  const validatePassengers = () => {
    const errs: Record<string, string> = {};
    passengers.forEach((p, i) => {
      if (!p.firstName) errs[`firstName-${i}`] = "Required";
      if (!p.lastName) errs[`lastName-${i}`] = "Required";
      if (!p.passport) errs[`passport-${i}`] = "Required";
    });
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const toggleSeat = (seat: string) => {
    if (TAKEN.has(seat)) return;
    setSelectedSeats((prev) =>
      prev.includes(seat) ? prev.filter((s) => s !== seat) : [...prev, seat],
    );
  };

  const PriceSummary = () => (
    <div className="sticky top-24 rounded-xl border border-black/[0.08] bg-[#F9F8F6] p-5">
      <h3 className="font-semibold">Price Summary</h3>
      <div className="mt-4 space-y-2 text-sm">
        <div className="flex justify-between">
          <span>Base ({passengers.length} pax)</span>
          <span>Prix sur commande</span>
        </div>
        {seatUpcharge > 0 && (
          <div className="flex justify-between">
            <span>Seat selection</span>
            <span>Prix sur commande</span>
          </div>
        )}
        {baggagePrice > 0 && (
          <div className="flex justify-between">
            <span>Baggage</span>
            <span>Prix sur commande</span>
          </div>
        )}
        {extrasPrice > 0 && (
          <div className="flex justify-between">
            <span>Extras</span>
            <span>Prix sur commande</span>
          </div>
        )}
        <div className="flex justify-between text-[#1A1A1A]/60">
          <span>Taxes</span>
          <span>Prix sur commande</span>
        </div>
        <div className="flex justify-between border-t border-black/[0.06] pt-2 text-lg font-bold">
          <span>Total</span>
          <span className="text-[#185FA5]">Prix sur commande</span>
        </div>
      </div>
      {step < 2 ? (
        <Button
          className="mt-4 w-full bg-[#185FA5] hover:bg-[#185FA5]/90"
          onClick={() => {
            if (step === 0 && !validatePassengers()) return;
            setStep((s) => s + 1);
          }}
        >
          Continue
        </Button>
      ) : (
        <Button asChild className="mt-4 w-full bg-[#185FA5] hover:bg-[#185FA5]/90">
          <Link to="/checkout" search={{ type: "flight", total }}>
            Continue to Payment
          </Link>
        </Button>
      )}
      {step > 0 && (
        <button
          type="button"
          onClick={() => setStep((s) => s - 1)}
          className="mt-3 w-full text-center text-sm text-[#185FA5] hover:underline"
        >
          Back
        </button>
      )}
    </div>
  );

  return (
    <PageLayout>
      <div className="mx-auto max-w-7xl px-4 py-8 md:px-6">
        <div className="mb-8">
          <div className="mb-4 flex justify-between">
            {STEPS.map((s, i) => (
              <div key={s} className={`text-sm font-medium ${i <= step ? "text-[#185FA5]" : "text-[#1A1A1A]/40"}`}>
                {i + 1}. {s}
              </div>
            ))}
          </div>
          <Progress value={((step + 1) / STEPS.length) * 100} className="h-2" />
        </div>

        <div className="grid gap-8 lg:grid-cols-[1fr_300px]">
          <div>
            {step === 0 && (
              <div className="space-y-6">
                {passengers.map((p, i) => (
                  <div key={i} className="rounded-xl border border-black/[0.08] p-5">
                    <h3 className="mb-4 font-semibold">Passenger {i + 1}</h3>
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                      <div>
                        <Label>Title</Label>
                        <Select
                          value={p.title}
                          onValueChange={(v) => {
                            const next = [...passengers];
                            next[i] = { ...next[i], title: v };
                            setPassengers(next);
                          }}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Mr">Mr</SelectItem>
                            <SelectItem value="Mrs">Mrs</SelectItem>
                            <SelectItem value="Ms">Ms</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label>First name</Label>
                        <Input
                          value={p.firstName}
                          onChange={(e) => {
                            const next = [...passengers];
                            next[i] = { ...next[i], firstName: e.target.value };
                            setPassengers(next);
                          }}
                        />
                        {errors[`firstName-${i}`] && (
                          <p className="mt-1 text-xs text-red-600">{errors[`firstName-${i}`]}</p>
                        )}
                      </div>
                      <div>
                        <Label>Last name</Label>
                        <Input
                          value={p.lastName}
                          onChange={(e) => {
                            const next = [...passengers];
                            next[i] = { ...next[i], lastName: e.target.value };
                            setPassengers(next);
                          }}
                        />
                        {errors[`lastName-${i}`] && (
                          <p className="mt-1 text-xs text-red-600">{errors[`lastName-${i}`]}</p>
                        )}
                      </div>
                      <div>
                        <Label>Date of birth</Label>
                        <DatePicker
                          date={p.dob}
                          onDateChange={(date) => {
                            const next = [...passengers];
                            next[i] = { ...next[i], dob: date };
                            setPassengers(next);
                          }}
                          placeholder="Date of birth"
                        />
                      </div>
                      <div>
                        <Label>Passport number</Label>
                        <Input
                          value={p.passport}
                          onChange={(e) => {
                            const next = [...passengers];
                            next[i] = { ...next[i], passport: maskPassport(e.target.value) };
                            setPassengers(next);
                          }}
                        />
                        {errors[`passport-${i}`] && (
                          <p className="mt-1 text-xs text-red-600">{errors[`passport-${i}`]}</p>
                        )}
                      </div>
                      <div>
                        <Label>Passport expiry</Label>
                        <DatePicker
                          date={p.expiry}
                          onDateChange={(date) => {
                            const next = [...passengers];
                            next[i] = { ...next[i], expiry: date };
                            setPassengers(next);
                          }}
                          placeholder="Passport expiry"
                        />
                      </div>
                    </div>
                  </div>
                ))}
                <Button
                  variant="outline"
                  onClick={() =>
                    setPassengers([
                      ...passengers,
                      { title: "Mr", firstName: "", lastName: "", dob: undefined, nationality: "DZ", passport: "", expiry: undefined },
                    ])
                  }
                >
                  Add passenger
                </Button>
              </div>
            )}

            {step === 1 && (
              <div>
                <div className="mb-4 flex flex-wrap gap-4 text-xs">
                  <span className="flex items-center gap-1">
                    <span className="h-3 w-3 rounded border border-[#0F6E56] bg-[#0F6E56]/20" /> Available
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="h-3 w-3 rounded border border-[#1A1A1A]/20 bg-[#1A1A1A]/10" /> Taken
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="h-3 w-3 rounded bg-[#185FA5]" /> Selected
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="h-3 w-3 rounded border border-[#C9A84C] bg-[#C9A84C]/30" /> Extra legroom
                  </span>
                </div>
                <div className="overflow-x-auto rounded-xl border border-black/[0.08] p-4">
                  <div className="mx-auto w-fit">
                    {Array.from({ length: ROWS }).map((_, row) => (
                      <div key={row} className="mb-1 flex items-center gap-1">
                        <span className="w-6 text-center text-xs text-[#1A1A1A]/50">{row + 1}</span>
                        {COLS.map((col, ci) => {
                          const seat = `${row + 1}${col}`;
                          const status = getSeatStatus(seat, selectedSeats);
                          return (
                            <button
                              key={seat}
                              type="button"
                              disabled={status === "taken"}
                              onClick={() => toggleSeat(seat)}
                              className={`h-7 w-7 rounded border text-[9px] transition ${SEAT_COLORS[status]} ${ci === 2 ? "mr-3" : ""}`}
                            >
                              {col}
                            </button>
                          );
                        })}
                      </div>
                    ))}
                  </div>
                </div>
                {selectedSeats.length > 0 && (
                  <p className="mt-4 text-sm">
                    Selected: {selectedSeats.join(", ")}
                  </p>
                )}
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="mt-4 text-sm text-[#185FA5] hover:underline"
                >
                  Skip seat selection
                </button>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6">
                <div className="rounded-xl border border-black/[0.08] p-5">
                  <Label className="text-base font-semibold">Baggage</Label>
                  <div className="mt-3 space-y-2">
                    {[
                      { id: "carry-on", label: "Free carry-on (7 kg)", price: 0 },
                      { id: "23kg", label: "Checked bag 23 kg", price: 35 },
                      { id: "32kg", label: "Checked bag 32 kg", price: 60 },
                    ].map((b) => (
                      <label key={b.id} className="flex cursor-pointer items-center justify-between rounded-lg border border-black/[0.06] p-3">
                        <div className="flex items-center gap-3">
                          <input
                            type="radio"
                            name="baggage"
                            checked={baggage === b.id}
                            onChange={() => setBaggage(b.id)}
                          />
                          {b.label}
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
                <div className="rounded-xl border border-black/[0.08] p-5">
                  <Label>Meal preference</Label>
                  <Select value={meal} onValueChange={setMeal}>
                    <SelectTrigger className="mt-2">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="standard">Standard meal</SelectItem>
                      <SelectItem value="vegetarian">Vegetarian</SelectItem>
                      <SelectItem value="halal">Halal</SelectItem>
                      <SelectItem value="kosher">Kosher</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center justify-between rounded-xl border border-black/[0.08] p-5">
                  <div>
                    <p className="font-medium">Travel insurance</p>
                    <p className="text-sm text-[#1A1A1A]/60">Prix sur commande</p>
                  </div>
                  <Switch checked={insurance} onCheckedChange={setInsurance} />
                </div>
                <div className="flex items-center justify-between rounded-xl border border-black/[0.08] p-5">
                  <div>
                    <p className="font-medium">Priority boarding</p>
                    <p className="text-sm text-[#1A1A1A]/60">Prix sur commande</p>
                  </div>
                  <Switch checked={priority} onCheckedChange={setPriority} />
                </div>
              </div>
            )}
          </div>

          <PriceSummary />
        </div>

        <div className="mt-16">
          <Pricing />
        </div>
      </div>
    </PageLayout>
  );
}
