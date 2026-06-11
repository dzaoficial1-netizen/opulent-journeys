import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { PageLayout } from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Hotel,
  Plane,
  FileCheck,
  Heart,
  CreditCard,
  Settings,
  LogOut,
  LayoutDashboard,
  ChevronDown,
  Download,
} from "lucide-react";

const NAV = [
  { id: "overview", label: "Overview", icon: LayoutDashboard },
  { id: "bookings", label: "My Bookings", icon: Hotel },
  { id: "visas", label: "My Visas", icon: FileCheck },
  { id: "saved", label: "Saved", icon: Heart },
  { id: "payment", label: "Payment Methods", icon: CreditCard },
  { id: "settings", label: "Settings", icon: Settings },
] as const;

const BOOKINGS = [
  { ref: "ITR-BK-99124", service: "Hotel", dest: "Paris, France", dates: "Jun 15–20", status: "Confirmed", amount: 997 },
  { ref: "ITR-FL-88231", service: "Flight", dest: "Algiers → Dubai", dates: "Jul 3–10", status: "Pending", amount: 1380 },
  { ref: "ITR-VS-77412", service: "Visa", dest: "France", dates: "Applied May 28", status: "Processing", amount: 105 },
];

const VISAS = [
  { country: "🇫🇷 France", date: "May 28, 2026", status: "Processing", ref: "ITR-VS-77412", expiry: "—" },
  { country: "🇦🇪 UAE", date: "Mar 10, 2026", status: "Approved", ref: "ITR-VS-66103", expiry: "Apr 10, 2026" },
];

const SAVED = [
  { type: "Hotel", name: "Burj Al Arab", price: 1250, image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=400&q=80" },
  { type: "Flight", name: "ALG → CDG · Air France", price: 380, image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=400&q=80" },
];

export default function AccountPage() {
  const [tab, setTab] = useState<string>("overview");
  const [bookingFilter, setBookingFilter] = useState("all");
  const [expandedRow, setExpandedRow] = useState<string | null>(null);

  const filteredBookings =
    bookingFilter === "all"
      ? BOOKINGS
      : BOOKINGS.filter((b) => b.service.toLowerCase() === bookingFilter);

  return (
    <PageLayout>
      <div className="mx-auto flex max-w-7xl gap-8 px-4 py-8 md:px-6">
        <aside className="hidden w-[240px] shrink-0 lg:block">
          <div className="sticky top-24 rounded-xl border border-black/[0.08] p-5">
            <div className="flex flex-col items-center text-center">
              <Avatar className="h-16 w-16">
                <AvatarFallback className="bg-[#185FA5] text-lg text-[#F9F8F6]">AK</AvatarFallback>
              </Avatar>
              <p className="mt-3 font-semibold">Ahmed Khelifi</p>
              <p className="text-sm text-[#1A1A1A]/60">ahmed@email.com</p>
            </div>
            <nav className="mt-6 space-y-1">
              {NAV.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setTab(item.id)}
                  className={`flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm transition ${
                    tab === item.id
                      ? "bg-[#185FA5]/10 text-[#185FA5]"
                      : "text-[#1A1A1A]/70 hover:bg-black/[0.04]"
                  }`}
                >
                  <item.icon className="h-4 w-4" />
                  {item.label}
                </button>
              ))}
              <button
                type="button"
                className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-red-600 hover:bg-red-50"
              >
                <LogOut className="h-4 w-4" />
                Sign Out
              </button>
            </nav>
          </div>
        </aside>

        <div className="min-w-0 flex-1">
          <div className="mb-6 lg:hidden">
            <Select value={tab} onValueChange={setTab}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {NAV.map((n) => (
                  <SelectItem key={n.id} value={n.id}>
                    {n.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {tab === "overview" && (
            <div>
              <h1 className="text-2xl font-bold">Overview</h1>
              <div className="mt-6 grid gap-4 sm:grid-cols-3">
                {[
                  { label: "Upcoming trips", value: "2", color: "#185FA5" },
                  { label: "Total bookings", value: "12", color: "#0F6E56" },
                  { label: "Loyalty points", value: "2,450", color: "#C9A84C" },
                ].map((s) => (
                  <div
                    key={s.label}
                    className="rounded-xl border border-black/[0.08] p-5"
                    style={{ borderTopColor: s.color, borderTopWidth: 3 }}
                  >
                    <p className="text-sm text-[#1A1A1A]/60">{s.label}</p>
                    <p className="mt-1 text-3xl font-bold" style={{ color: s.color }}>
                      {s.value}
                    </p>
                  </div>
                ))}
              </div>
              <h2 className="mt-8 font-semibold">Upcoming Bookings</h2>
              <div className="mt-4 space-y-3">
                {BOOKINGS.slice(0, 2).map((b) => (
                  <div
                    key={b.ref}
                    className="flex flex-wrap items-center gap-4 rounded-xl border border-black/[0.08] p-4"
                  >
                    {b.service === "Hotel" ? (
                      <Hotel className="h-5 w-5 text-[#185FA5]" />
                    ) : (
                      <Plane className="h-5 w-5 text-[#185FA5]" />
                    )}
                    <div className="flex-1">
                      <p className="font-medium">{b.dest}</p>
                      <p className="text-sm text-[#1A1A1A]/60">{b.dates}</p>
                    </div>
                    <Badge
                      className={
                        b.status === "Confirmed"
                          ? "bg-[#0F6E56]/10 text-[#0F6E56]"
                          : "bg-amber-100 text-amber-800"
                      }
                    >
                      {b.status}
                    </Badge>
                    <Button variant="outline" size="sm">
                      View
                    </Button>
                  </div>
                ))}
              </div>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button asChild className="bg-[#185FA5] hover:bg-[#185FA5]/90">
                  <Link to="/hotels">Book Hotel</Link>
                </Button>
                <Button asChild variant="outline">
                  <Link to="/flights">Book Flight</Link>
                </Button>
                <Button asChild variant="outline" className="border-[#C9A84C] text-[#C9A84C]">
                  <Link to="/visas">Apply Visa</Link>
                </Button>
              </div>
            </div>
          )}

          {tab === "bookings" && (
            <div>
              <h1 className="text-2xl font-bold">My Bookings</h1>
              <div className="mt-4 flex gap-2">
                {["all", "hotels", "flights", "visas"].map((f) => (
                  <button
                    key={f}
                    type="button"
                    onClick={() => setBookingFilter(f)}
                    className={`rounded-full px-4 py-1.5 text-sm capitalize transition ${
                      bookingFilter === f
                        ? "bg-[#185FA5] text-[#F9F8F6]"
                        : "bg-black/[0.04] text-[#1A1A1A]/70"
                    }`}
                  >
                    {f}
                  </button>
                ))}
              </div>
              <div className="mt-6 overflow-x-auto rounded-xl border border-black/[0.08]">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Reference</TableHead>
                      <TableHead>Service</TableHead>
                      <TableHead>Destination</TableHead>
                      <TableHead>Dates</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead />
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredBookings.map((b) => (
                      <TableRow key={b.ref}>
                        <TableCell className="font-mono text-sm">{b.ref}</TableCell>
                        <TableCell>{b.service}</TableCell>
                        <TableCell>{b.dest}</TableCell>
                        <TableCell>{b.dates}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{b.status}</Badge>
                        </TableCell>
                        <TableCell>${b.amount}</TableCell>
                        <TableCell>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() =>
                              setExpandedRow(expandedRow === b.ref ? null : b.ref)
                            }
                          >
                            <ChevronDown
                              className={`h-4 w-4 transition ${expandedRow === b.ref ? "rotate-180" : ""}`}
                            />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                    {expandedRow && (
                      <TableRow>
                        <TableCell colSpan={7} className="bg-black/[0.02]">
                          <p className="text-sm text-[#1A1A1A]/70">
                            Booking details for {expandedRow}. Contact support for changes or
                            cancellations.
                          </p>
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </div>
          )}

          {tab === "visas" && (
            <div>
              <h1 className="text-2xl font-bold">My Visas</h1>
              <div className="mt-6 overflow-x-auto rounded-xl border border-black/[0.08]">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Country</TableHead>
                      <TableHead>Applied</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Reference</TableHead>
                      <TableHead>Expiry</TableHead>
                      <TableHead />
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {VISAS.map((v) => (
                      <TableRow key={v.ref}>
                        <TableCell>{v.country}</TableCell>
                        <TableCell>{v.date}</TableCell>
                        <TableCell>
                          <Badge
                            className={
                              v.status === "Approved"
                                ? "bg-[#0F6E56]/10 text-[#0F6E56]"
                                : "bg-amber-100 text-amber-800"
                            }
                          >
                            {v.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="font-mono text-sm">{v.ref}</TableCell>
                        <TableCell>{v.expiry}</TableCell>
                        <TableCell>
                          {v.status === "Approved" && (
                            <Button variant="ghost" size="sm">
                              <Download className="h-4 w-4" />
                            </Button>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          )}

          {tab === "saved" && (
            <div>
              <h1 className="text-2xl font-bold">Saved</h1>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {SAVED.map((s) => (
                  <div key={s.name} className="overflow-hidden rounded-xl border border-black/[0.08]">
                    <img src={s.image} alt={s.name} className="h-36 w-full object-cover" />
                    <div className="p-4">
                      <Badge variant="outline" className="text-xs">
                        {s.type}
                      </Badge>
                      <p className="mt-2 font-semibold">{s.name}</p>
                      <p className="text-lg font-bold text-[#185FA5]">From ${s.price}</p>
                      <Button className="mt-3 w-full bg-[#0F6E56] hover:bg-[#0F6E56]/90">
                        Book Now
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {tab === "payment" && (
            <div>
              <h1 className="text-2xl font-bold">Payment Methods</h1>
              <div className="mt-6 space-y-3">
                <div className="flex items-center justify-between rounded-xl border border-black/[0.08] p-4">
                  <div className="flex items-center gap-3">
                    <CreditCard className="h-5 w-5 text-[#185FA5]" />
                    <div>
                      <p className="font-medium">•••• •••• •••• 4242</p>
                      <p className="text-sm text-[#1A1A1A]/60">Expires 08/28</p>
                    </div>
                  </div>
                  <Badge>Default</Badge>
                </div>
                <Button variant="outline">Add payment method</Button>
              </div>
            </div>
          )}

          {tab === "settings" && (
            <div>
              <h1 className="text-2xl font-bold">Settings</h1>
              <div className="mt-6 space-y-8">
                <div className="rounded-xl border border-black/[0.08] p-5">
                  <h3 className="font-semibold">Personal Information</h3>
                  <div className="mt-4 grid gap-4 sm:grid-cols-2">
                    <div>
                      <Label>Full name</Label>
                      <Input defaultValue="Ahmed Khelifi" />
                    </div>
                    <div>
                      <Label>Email</Label>
                      <Input defaultValue="ahmed@email.com" />
                    </div>
                  </div>
                  <Button className="mt-4 bg-[#185FA5] hover:bg-[#185FA5]/90">Save changes</Button>
                </div>
                <div className="rounded-xl border border-black/[0.08] p-5">
                  <h3 className="font-semibold">Change Password</h3>
                  <div className="mt-4 grid gap-4 sm:grid-cols-2">
                    <div>
                      <Label>Current password</Label>
                      <Input type="password" />
                    </div>
                    <div>
                      <Label>New password</Label>
                      <Input type="password" />
                    </div>
                  </div>
                  <Button variant="outline" className="mt-4">
                    Update password
                  </Button>
                </div>
                <div className="rounded-xl border border-black/[0.08] p-5">
                  <h3 className="font-semibold">Notifications</h3>
                  <div className="mt-4 space-y-3">
                    {["Booking confirmations", "Price alerts", "Visa status updates"].map((n) => (
                      <div key={n} className="flex items-center justify-between">
                        <span className="text-sm">{n}</span>
                        <Switch defaultChecked />
                      </div>
                    ))}
                  </div>
                </div>
                <div className="rounded-xl border border-black/[0.08] p-5">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <Label>Language</Label>
                      <Select defaultValue="en">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="en">English</SelectItem>
                          <SelectItem value="fr">Français</SelectItem>
                          <SelectItem value="ar">العربية</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>Currency</Label>
                      <Select defaultValue="usd">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="usd">USD ($)</SelectItem>
                          <SelectItem value="eur">EUR (€)</SelectItem>
                          <SelectItem value="dzd">DZD (د.ج)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
                <div className="rounded-xl border border-red-200 bg-red-50 p-5">
                  <h3 className="font-semibold text-red-800">Danger Zone</h3>
                  <p className="mt-1 text-sm text-red-700">
                    Permanently delete your account and all associated data.
                  </p>
                  <Button variant="destructive" className="mt-4">
                    Delete account
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </PageLayout>
  );
}
