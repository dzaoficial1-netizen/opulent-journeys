import { useState } from "react";
import { PageLayout } from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { maskPhone, maskCardNumber, maskExpiry } from "@/lib/masks";
import {
  Hotel,
  Shield,
  Lock,
  ChevronDown,
  Check,
  Download,
  Calendar,
} from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

export default function CheckoutPage() {
  const [paid, setPaid] = useState(false);
  const [promo, setPromo] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);
  const [summaryOpen, setSummaryOpen] = useState(false);
  const [saveCard, setSaveCard] = useState(false);
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [phone, setPhone] = useState("");

  const subtotal = 890;
  const taxes = 107;
  const discount = promoApplied ? 50 : 0;
  const total = subtotal + taxes - discount;

  if (paid) {
    return (
      <PageLayout>
        <div className="mx-auto max-w-lg px-4 py-20 text-center md:px-6">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#0F6E56]/20">
            <Check className="h-8 w-8 text-[#0F6E56]" />
          </div>
          <h1 className="mt-6 text-2xl font-bold">Payment Confirmed</h1>
          <p className="mt-2 text-[#1A1A1A]/60">Booking reference</p>
          <p className="mt-1 text-3xl font-bold text-[#185FA5]">ITR-BK-2026-99124</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Download PDF
            </Button>
            <Button variant="outline">
              <Calendar className="mr-2 h-4 w-4" />
              Add to calendar
            </Button>
          </div>
        </div>
      </PageLayout>
    );
  }

  const OrderSummary = () => (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Badge className="bg-[#185FA5] text-[#F9F8F6]">
          <Hotel className="mr-1 h-3 w-3" />
          Hotel
        </Badge>
      </div>
      <div className="rounded-xl border border-black/[0.08] p-4">
        <h3 className="font-semibold">Hôtel Ritz Paris</h3>
        <p className="mt-1 text-sm text-[#1A1A1A]/60">Jun 15 – Jun 20, 2026 · 2 guests</p>
        <p className="mt-1 text-sm text-[#1A1A1A]/60">Deluxe King Room</p>
      </div>
      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span>Room (5 nights)</span>
          <span>${subtotal}</span>
        </div>
        <div className="flex justify-between text-[#1A1A1A]/60">
          <span>Taxes & fees</span>
          <span>${taxes}</span>
        </div>
        {promoApplied && (
          <div className="flex justify-between text-[#0F6E56]">
            <span>Promo discount</span>
            <span>-${discount}</span>
          </div>
        )}
        <div className="flex justify-between border-t border-black/[0.06] pt-2 text-xl font-bold">
          <span>Total</span>
          <span className="text-[#185FA5]">${total}</span>
        </div>
      </div>
      <div className="flex gap-2">
        <Input
          placeholder="Promo code"
          value={promo}
          onChange={(e) => setPromo(e.target.value)}
        />
        <Button
          variant="outline"
          onClick={() => promo.toUpperCase() === "ITRIP10" && setPromoApplied(true)}
        >
          Apply
        </Button>
      </div>
      <p className="text-xs text-[#1A1A1A]/50">
        Free cancellation until Jun 10, 2026. After that, first night is non-refundable.
      </p>
      <div className="flex items-center gap-4 text-xs text-[#1A1A1A]/50">
        <span className="flex items-center gap-1">
          <Lock className="h-3.5 w-3.5" /> SSL Encrypted
        </span>
        <span className="flex items-center gap-1">
          <Shield className="h-3.5 w-3.5" /> PCI-DSS
        </span>
      </div>
    </div>
  );

  return (
    <PageLayout>
      <div className="mx-auto max-w-6xl px-4 py-8 md:px-6">
        <h1 className="mb-8 text-3xl font-bold">Checkout</h1>

        <Collapsible open={summaryOpen} onOpenChange={setSummaryOpen} className="mb-6 lg:hidden">
          <CollapsibleTrigger className="flex w-full items-center justify-between rounded-xl border border-black/[0.08] p-4">
            <span className="font-semibold">Order Summary · ${total}</span>
            <ChevronDown className={`h-5 w-5 transition ${summaryOpen ? "rotate-180" : ""}`} />
          </CollapsibleTrigger>
          <CollapsibleContent className="mt-2 rounded-xl border border-black/[0.08] p-4">
            <OrderSummary />
          </CollapsibleContent>
        </Collapsible>

        <div className="grid gap-8 lg:grid-cols-[2fr_3fr]">
          <div className="hidden lg:block">
            <OrderSummary />
          </div>

          <div>
            <div className="rounded-xl border border-black/[0.08] bg-[#F9F8F6] p-6">
              <h2 className="mb-6 text-xl font-semibold">Payment Details</h2>

              <div className="mb-6 grid gap-4 sm:grid-cols-2">
                <div>
                  <Label>Email</Label>
                  <Input type="email" placeholder="you@email.com" />
                </div>
                <div>
                  <Label>Phone</Label>
                  <Input
                    value={phone}
                    onChange={(e) => setPhone(maskPhone(e.target.value))}
                    placeholder="+213 555 000 000"
                  />
                </div>
              </div>

              <div className="mb-6">
                <Label className="mb-2 block">Billing address</Label>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Input placeholder="Street address" />
                  <Input placeholder="City" />
                  <Input placeholder="Postal code" />
                  <Input placeholder="Country" />
                </div>
              </div>

              <Tabs defaultValue="card">
                <TabsList className="mb-4">
                  <TabsTrigger value="card">Card</TabsTrigger>
                  <TabsTrigger value="paypal">PayPal</TabsTrigger>
                  <TabsTrigger value="bank">Bank Transfer</TabsTrigger>
                </TabsList>

                <TabsContent value="card" className="space-y-4">
                  <div>
                    <Label>Card number</Label>
                    <Input
                      value={cardNumber}
                      onChange={(e) => setCardNumber(maskCardNumber(e.target.value))}
                      placeholder="1234 5678 9012 3456"
                    />
                  </div>
                  <div>
                    <Label>Name on card</Label>
                    <Input placeholder="Full name" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Expiry</Label>
                      <Input
                        value={expiry}
                        onChange={(e) => setExpiry(maskExpiry(e.target.value))}
                        placeholder="MM/YY"
                      />
                    </div>
                    <div>
                      <Label>
                        CVV{" "}
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger className="text-[#1A1A1A]/40">ⓘ</TooltipTrigger>
                            <TooltipContent>3-digit code on back of card</TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </Label>
                      <Input placeholder="123" maxLength={4} />
                    </div>
                  </div>
                  <label className="flex items-center gap-2 text-sm">
                    <Checkbox checked={saveCard} onCheckedChange={(c) => setSaveCard(!!c)} />
                    Save card for future bookings
                  </label>
                </TabsContent>

                <TabsContent value="paypal">
                  <p className="text-sm text-[#1A1A1A]/60">
                    You will be redirected to PayPal to complete your payment securely.
                  </p>
                  <Button variant="outline" className="mt-4">
                    Continue with PayPal
                  </Button>
                </TabsContent>

                <TabsContent value="bank">
                  <div className="rounded-lg bg-black/[0.03] p-4 text-sm">
                    <p className="font-medium">Bank transfer details</p>
                    <p className="mt-2 text-[#1A1A1A]/60">IBAN: DZ58 1234 5678 9012 3456 7890</p>
                    <p className="text-[#1A1A1A]/60">Reference: ITR-BK-2026</p>
                  </div>
                </TabsContent>
              </Tabs>

              <Button
                className="mt-6 w-full bg-[#185FA5] py-6 text-lg hover:bg-[#185FA5]/90"
                onClick={() => setPaid(true)}
              >
                Pay Now — ${total}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
