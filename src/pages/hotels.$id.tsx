import { useState } from "react";
import { Link, getRouteApi } from "@tanstack/react-router";
import {
  Star,
  MapPin,
  Heart,
  Wifi,
  Waves,
  Car,
  Dumbbell,
  Coffee,
  Utensils,
  Wind,
  Shield,
  Tv,
  ConciergeBell,
  Sparkles,
} from "lucide-react";
import { PageLayout } from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { getHotel, HOTEL_ROOMS } from "@/lib/data/hotels";
import { DatePicker } from "@/components/ui/date-picker";

const AMENITY_ICONS = [Wifi, Waves, Car, Dumbbell, Coffee, Utensils, Wind, Shield, Tv, ConciergeBell, Sparkles, MapPin];

const REVIEWS = [
  {
    name: "Sarah M.",
    date: "May 2026",
    rating: 5,
    comment: "Absolutely stunning property. The staff went above and beyond to make our stay memorable.",
  },
  {
    name: "Ahmed K.",
    date: "April 2026",
    rating: 5,
    comment: "Perfect location and impeccable service. Will definitely return on our next trip.",
  },
  {
    name: "Elena R.",
    date: "March 2026",
    rating: 4,
    comment: "Beautiful rooms and excellent breakfast. The spa was a highlight of our vacation.",
  },
];

const routeApi = getRouteApi("/hotels/$id");

export default function HotelDetailPage() {
  const { id } = routeApi.useParams();
  const hotel = getHotel(id);
  const [selectedImage, setSelectedImage] = useState(0);
  const [checkIn, setCheckIn] = useState<Date | undefined>(new Date(2026, 5, 15));
  const [checkOut, setCheckOut] = useState<Date | undefined>(new Date(2026, 5, 20));
  const [guests, setGuests] = useState(2);
  const [roomType, setRoomType] = useState("deluxe");

  if (!hotel) {
    return (
      <PageLayout>
        <div className="mx-auto max-w-7xl px-4 py-20 text-center md:px-6">
          <h1 className="text-2xl font-bold">Hotel not found</h1>
          <Button asChild className="mt-4">
            <Link to="/hotels">Back to search</Link>
          </Button>
        </div>
      </PageLayout>
    );
  }

  const nights = 5;
  const basePrice = hotel.pricePerNight * nights;
  const taxes = Math.round(basePrice * 0.12);
  const total = basePrice + taxes;

  return (
    <PageLayout>
      <div className="mx-auto max-w-7xl px-4 py-8 md:px-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold">{hotel.name}</h1>
          <div className="mt-2 flex flex-wrap items-center gap-3">
            <div className="flex text-[#C9A84C]">
              {Array.from({ length: hotel.stars }).map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-current" />
              ))}
            </div>
            <span className="flex items-center gap-1 text-sm text-[#1A1A1A]/60">
              <MapPin className="h-4 w-4" />
              {hotel.address}, {hotel.city}
            </span>
            <Badge className="bg-[#0F6E56] text-[#F9F8F6]">
              {hotel.rating} · {hotel.reviewCount.toLocaleString()} reviews
            </Badge>
          </div>
        </div>

        <div className="mb-8 grid gap-2 md:grid-cols-4 md:grid-rows-2">
          <img
            src={hotel.images[selectedImage]}
            alt={hotel.name}
            className="h-64 w-full rounded-xl object-cover md:col-span-2 md:row-span-2 md:h-full"
          />
          {hotel.images.slice(0, 4).map((img, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setSelectedImage(i)}
              className={`overflow-hidden rounded-lg border-2 transition ${
                selectedImage === i ? "border-[#185FA5]" : "border-transparent"
              }`}
            >
              <img src={img} alt="" className="h-24 w-full object-cover md:h-full" />
            </button>
          ))}
        </div>

        <div className="grid gap-8 lg:grid-cols-[1fr_340px]">
          <div>
            <section className="mb-8">
              <h2 className="mb-3 text-xl font-semibold">About</h2>
              <p className="leading-relaxed text-[#1A1A1A]/80">{hotel.about}</p>
            </section>

            <section className="mb-8">
              <h2 className="mb-4 text-xl font-semibold">Amenities</h2>
              <div className="grid grid-cols-3 gap-4 md:grid-cols-4">
                {hotel.amenities.concat(["Restaurant", "AC", "TV", "Concierge", "Spa", "Room Service"]).slice(0, 12).map((a, i) => {
                  const Icon = AMENITY_ICONS[i % AMENITY_ICONS.length];
                  return (
                    <div key={a} className="flex flex-col items-center gap-2 rounded-lg border border-black/[0.06] p-3 text-center text-sm">
                      <Icon className="h-5 w-5 text-[#185FA5]" />
                      {a}
                    </div>
                  );
                })}
              </div>
            </section>

            <section className="mb-8">
              <h2 className="mb-4 text-xl font-semibold">Guest Reviews</h2>
              <div className="space-y-4">
                {REVIEWS.map((r) => (
                  <div key={r.name} className="rounded-xl border border-black/[0.08] p-4">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarFallback>{r.name[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{r.name}</p>
                        <p className="text-xs text-[#1A1A1A]/50">{r.date}</p>
                      </div>
                      <div className="ml-auto flex text-[#C9A84C]">
                        {Array.from({ length: r.rating }).map((_, i) => (
                          <Star key={i} className="h-3.5 w-3.5 fill-current" />
                        ))}
                      </div>
                    </div>
                    <p className="mt-3 text-sm text-[#1A1A1A]/80">{r.comment}</p>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h2 className="mb-4 text-xl font-semibold">Location</h2>
              <div className="flex h-64 items-center justify-center rounded-xl border border-black/[0.08] bg-[#1A1A1A]/5 text-[#1A1A1A]/50">
                <MapPin className="mr-2 h-5 w-5" />
                Google Maps — {hotel.city}
              </div>
            </section>
          </div>

          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-xl border border-black/[0.08] bg-[#F9F8F6] p-5 shadow-sm">
              <div className="space-y-4">
                <div>
                  <Label>Check-in</Label>
                  <DatePicker date={checkIn} onDateChange={setCheckIn} placeholder="Check-in" />
                </div>
                <div>
                  <Label>Check-out</Label>
                  <DatePicker date={checkOut} onDateChange={setCheckOut} placeholder="Check-out" />
                </div>
                <div>
                  <Label>Guests</Label>
                  <Input type="number" min={1} value={guests} onChange={(e) => setGuests(Number(e.target.value))} />
                </div>
                <div>
                  <Label>Room type</Label>
                  <Select value={roomType} onValueChange={setRoomType}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="deluxe">Deluxe King</SelectItem>
                      <SelectItem value="executive">Executive Suite</SelectItem>
                      <SelectItem value="presidential">Presidential Suite</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="mt-6 space-y-2 border-t border-black/[0.06] pt-4 text-sm">
                <div className="flex justify-between">
                  <span>${hotel.pricePerNight} × {nights} nights</span>
                  <span>${basePrice}</span>
                </div>
                <div className="flex justify-between text-[#1A1A1A]/60">
                  <span>Taxes & fees</span>
                  <span>${taxes}</span>
                </div>
                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span className="text-[#185FA5]">${total}</span>
                </div>
              </div>
              <Button asChild className="mt-4 w-full bg-[#185FA5] hover:bg-[#185FA5]/90">
                <Link to="/checkout" search={{ type: "hotel", id: hotel.id }}>
                  Book Now
                </Link>
              </Button>
              <button type="button" className="mt-3 flex w-full items-center justify-center gap-2 text-sm text-[#185FA5] hover:underline">
                <Heart className="h-4 w-4" />
                Add to Wishlist
              </button>
            </div>
          </aside>
        </div>

        <section className="mt-12">
          <h2 className="mb-4 text-xl font-semibold">Available Rooms</h2>
          <div className="overflow-x-auto rounded-xl border border-black/[0.08]">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Room Type</TableHead>
                  <TableHead>Size</TableHead>
                  <TableHead>Bed Type</TableHead>
                  <TableHead>Max Guests</TableHead>
                  <TableHead>Includes</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead />
                </TableRow>
              </TableHeader>
              <TableBody>
                {HOTEL_ROOMS.map((room) => (
                  <TableRow key={room.type}>
                    <TableCell className="font-medium">{room.type}</TableCell>
                    <TableCell>{room.size}</TableCell>
                    <TableCell>{room.bed}</TableCell>
                    <TableCell>{room.maxGuests}</TableCell>
                    <TableCell>{room.includes}</TableCell>
                    <TableCell className="font-semibold text-[#185FA5]">
                      ${hotel.pricePerNight + room.price}/night
                    </TableCell>
                    <TableCell>
                      <Button size="sm" variant="outline" className="border-[#0F6E56] text-[#0F6E56]">
                        Select
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </section>
      </div>
    </PageLayout>
  );
}
