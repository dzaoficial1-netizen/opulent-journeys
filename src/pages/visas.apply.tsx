import { useState } from "react";
import { format } from "date-fns";
import { PageLayout } from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Pricing } from "@/components/ui/pricing";
import { maskPhone, maskPassport } from "@/lib/masks";
import { DatePicker } from "@/components/ui/date-picker";
import { Check, Upload } from "lucide-react";

type VisaForm = {
  fullName: string;
  dob?: Date;
  gender: string;
  marital: string;
  religion: string;
  birthPlace: string;
  nationality: string;
  address: string;
  phone: string;
  email: string;
  passport: string;
  issueDate?: Date;
  expiryDate?: Date;
  issuingCountry: string;
  purpose: string;
  entryDate?: Date;
  exitDate?: Date;
  accommodation: string;
  hostContact: string;
};

function formatFormValue(value: string | Date | undefined): string {
  if (value instanceof Date) return format(value, "PPP");
  return value || "—";
}

const STEPS = ["Personal Info", "Passport & Travel", "Documents", "Review & Submit"];

const UPLOAD_ZONES = [
  { id: "passport", label: "Passport scan", formats: "PDF, JPG, PNG", maxSize: "5 MB" },
  { id: "photo", label: "Personal photo", formats: "JPG, PNG", maxSize: "2 MB" },
  { id: "bank", label: "Bank statement", formats: "PDF", maxSize: "10 MB" },
  { id: "accommodation", label: "Proof of accommodation", formats: "PDF, JPG", maxSize: "5 MB" },
  { id: "insurance", label: "Travel insurance", formats: "PDF", maxSize: "5 MB" },
  { id: "invitation", label: "Invitation letter (optional)", formats: "PDF", maxSize: "5 MB" },
];

export default function VisaApplyPage() {
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [uploads, setUploads] = useState<Record<string, boolean>>({});
  const [confirmed, setConfirmed] = useState(false);
  const [prevVisas, setPrevVisas] = useState(false);
  const [form, setForm] = useState<VisaForm>({
    fullName: "",
    dob: undefined,
    gender: "",
    marital: "",
    religion: "",
    birthPlace: "",
    nationality: "Algeria",
    address: "",
    phone: "",
    email: "",
    passport: "",
    issueDate: undefined,
    expiryDate: undefined,
    issuingCountry: "Algeria",
    purpose: "",
    entryDate: undefined,
    exitDate: undefined,
    accommodation: "",
    hostContact: "",
  });

  const update = <K extends keyof VisaForm>(key: K, value: VisaForm[K]) =>
    setForm((f) => ({ ...f, [key]: value }));
  const fee = 80;
  const serviceFee = 25;
  const total = fee + serviceFee;

  if (submitted) {
    return (
      <PageLayout>
        <div className="mx-auto max-w-lg px-4 py-20 text-center md:px-6">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#0F6E56]/20">
            <Check className="h-8 w-8 text-[#0F6E56]" />
          </div>
          <h1 className="mt-6 text-2xl font-bold">Application Submitted</h1>
          <p className="mt-2 text-[#1A1A1A]/60">Your reference number</p>
          <p className="mt-1 text-3xl font-bold text-[#185FA5]">ITR-2026-78432</p>
          <p className="mt-4 text-sm text-[#1A1A1A]/60">
            Estimated processing: 10–15 business days
          </p>
          <Button className="mt-8 bg-[#185FA5] hover:bg-[#185FA5]/90">Track Application</Button>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <div className="mx-auto max-w-4xl px-4 py-8 md:px-6">
        <div className="mb-8">
          <div className="mb-4 flex flex-wrap justify-between gap-2">
            {STEPS.map((s, i) => (
              <span
                key={s}
                className={`text-xs font-medium sm:text-sm ${i <= step ? "text-[#185FA5]" : "text-[#1A1A1A]/40"}`}
              >
                {i + 1}. {s}
              </span>
            ))}
          </div>
          <Progress value={((step + 1) / STEPS.length) * 100} className="h-2" />
        </div>

        {step === 0 && (
          <div className="space-y-8">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <Label>Full name</Label>
                <Input value={form.fullName} onChange={(e) => update("fullName", e.target.value)} />
              </div>
              <div>
                <Label>Date of birth</Label>
                <DatePicker date={form.dob} onDateChange={(date) => update("dob", date)} placeholder="Date of birth" />
              </div>
              <div>
                <Label>Gender</Label>
                <Select value={form.gender} onValueChange={(v) => update("gender", v)}>
                  <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Marital status</Label>
                <Select value={form.marital} onValueChange={(v) => update("marital", v)}>
                  <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="single">Single</SelectItem>
                    <SelectItem value="married">Married</SelectItem>
                    <SelectItem value="divorced">Divorced</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Religion (optional)</Label>
                <Input value={form.religion} onChange={(e) => update("religion", e.target.value)} />
              </div>
              <div>
                <Label>Place of birth</Label>
                <Input value={form.birthPlace} onChange={(e) => update("birthPlace", e.target.value)} />
              </div>
              <div>
                <Label>Nationality</Label>
                <Input value={form.nationality} onChange={(e) => update("nationality", e.target.value)} />
              </div>
            </div>
            <div className="border-t border-black/[0.06] pt-6">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <Label>Current address</Label>
                  <Textarea value={form.address} onChange={(e) => update("address", e.target.value)} />
                </div>
                <div>
                  <Label>Phone</Label>
                  <Input value={form.phone} onChange={(e) => update("phone", maskPhone(e.target.value))} />
                </div>
                <div>
                  <Label>Email</Label>
                  <Input type="email" value={form.email} onChange={(e) => update("email", e.target.value)} />
                </div>
              </div>
            </div>
          </div>
        )}

        {step === 1 && (
          <div className="space-y-8">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <Label>Passport number</Label>
                <Input value={form.passport} onChange={(e) => update("passport", maskPassport(e.target.value))} />
              </div>
              <div>
                <Label>Issuing country</Label>
                <Input value={form.issuingCountry} onChange={(e) => update("issuingCountry", e.target.value)} />
              </div>
              <div>
                <Label>Issue date</Label>
                <DatePicker date={form.issueDate} onDateChange={(date) => update("issueDate", date)} placeholder="Issue date" />
              </div>
              <div>
                <Label>Expiry date</Label>
                <DatePicker date={form.expiryDate} onDateChange={(date) => update("expiryDate", date)} placeholder="Expiry date" />
              </div>
            </div>
            <div className="flex items-center justify-between rounded-xl border border-black/[0.08] p-4">
              <Label>Previous visas?</Label>
              <Switch checked={prevVisas} onCheckedChange={setPrevVisas} />
            </div>
            {prevVisas && (
              <div className="overflow-x-auto rounded-xl border border-black/[0.08]">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-black/[0.06] bg-black/[0.02]">
                      <th className="p-3 text-left">Country</th>
                      <th className="p-3 text-left">Type</th>
                      <th className="p-3 text-left">Dates</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="p-3">France</td>
                      <td className="p-3">Tourist</td>
                      <td className="p-3">2024</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <Label>Purpose of visit</Label>
                <Select value={form.purpose} onValueChange={(v) => update("purpose", v)}>
                  <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="tourism">Tourism</SelectItem>
                    <SelectItem value="business">Business</SelectItem>
                    <SelectItem value="study">Study</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Intended entry date</Label>
                <DatePicker date={form.entryDate} onDateChange={(date) => update("entryDate", date)} placeholder="Entry date" />
              </div>
              <div>
                <Label>Intended exit date</Label>
                <DatePicker date={form.exitDate} onDateChange={(date) => update("exitDate", date)} placeholder="Exit date" />
              </div>
              <div className="sm:col-span-2">
                <Label>Accommodation address</Label>
                <Input value={form.accommodation} onChange={(e) => update("accommodation", e.target.value)} />
              </div>
              <div className="sm:col-span-2">
                <Label>Host contact (optional)</Label>
                <Input value={form.hostContact} onChange={(e) => update("hostContact", e.target.value)} />
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="grid gap-4 sm:grid-cols-2">
            {UPLOAD_ZONES.map((zone) => (
              <div
                key={zone.id}
                className={`relative rounded-xl border-2 border-dashed p-6 text-center transition ${
                  uploads[zone.id]
                    ? "border-[#0F6E56] bg-[#0F6E56]/5"
                    : "border-black/[0.12] hover:border-[#185FA5]/50"
                }`}
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                  e.preventDefault();
                  setUploads((u) => ({ ...u, [zone.id]: true }));
                }}
              >
                {uploads[zone.id] ? (
                  <Check className="mx-auto h-8 w-8 text-[#0F6E56]" />
                ) : (
                  <Upload className="mx-auto h-8 w-8 text-[#1A1A1A]/40" />
                )}
                <p className="mt-2 font-medium">{zone.label}</p>
                <p className="mt-1 text-xs text-[#1A1A1A]/50">
                  {zone.formats} · Max {zone.maxSize}
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-3"
                  onClick={() => setUploads((u) => ({ ...u, [zone.id]: true }))}
                >
                  Choose file
                </Button>
              </div>
            ))}
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6">
            {[
              { title: "Personal Info", fields: ["fullName", "dob", "email", "phone"] },
              { title: "Passport & Travel", fields: ["passport", "purpose", "entryDate", "exitDate"] },
            ].map((section) => (
              <div key={section.title} className="rounded-xl border border-black/[0.08] p-5">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">{section.title}</h3>
                  <button type="button" className="text-sm text-[#185FA5] hover:underline" onClick={() => setStep(section.title.includes("Personal") ? 0 : 1)}>
                    Edit
                  </button>
                </div>
                <dl className="mt-3 grid gap-2 text-sm sm:grid-cols-2">
                  {section.fields.map((f) => (
                    <div key={f}>
                      <dt className="text-[#1A1A1A]/50 capitalize">{f.replace(/([A-Z])/g, " $1")}</dt>
                      <dd>{formatFormValue(form[f as keyof VisaForm])}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            ))}
            <div className="rounded-xl border border-black/[0.08] bg-[#C9A84C]/10 p-5">
              <h3 className="font-semibold">Fee Summary</h3>
              <div className="mt-3 space-y-1 text-sm">
                <div className="flex justify-between"><span>Visa fee</span><span>Prix sur commande</span></div>
                <div className="flex justify-between"><span>Service fee</span><span>Prix sur commande</span></div>
                <div className="flex justify-between font-bold"><span>Total</span><span>Prix sur commande</span></div>
              </div>
            </div>
            <label className="flex items-center gap-2 text-sm">
              <Checkbox checked={confirmed} onCheckedChange={(c) => setConfirmed(!!c)} />
              I confirm all information is accurate
            </label>
          </div>
        )}

        <div className="mt-8 flex justify-between">
          {step > 0 ? (
            <Button variant="outline" onClick={() => setStep((s) => s - 1)}>Back</Button>
          ) : (
            <div />
          )}
          {step < 3 ? (
            <Button className="bg-[#185FA5] hover:bg-[#185FA5]/90" onClick={() => setStep((s) => s + 1)}>
              Continue
            </Button>
          ) : (
            <Button
              className="bg-[#C9A84C] text-[#1A1A1A] hover:bg-[#C9A84C]/90"
              disabled={!confirmed}
              onClick={() => setSubmitted(true)}
            >
              Submit Application
            </Button>
          )}
        </div>

        <div className="mt-16">
          <Pricing />
        </div>
      </div>
    </PageLayout>
  );
}
