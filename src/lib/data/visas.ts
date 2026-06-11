export type VisaType = "required" | "on-arrival" | "free" | "evisa";

export interface VisaRequirement {
  nationality: string;
  destination: string;
  type: VisaType;
  documents: string[];
  processingTime: string;
  validity: string;
  embassy: string;
  fee: number;
}

const REQUIREMENTS: Record<string, VisaRequirement> = {
  "DZ-FR": {
    nationality: "DZ",
    destination: "FR",
    type: "required",
    documents: [
      "Valid passport (6+ months)",
      "Completed visa application form",
      "2 passport photos",
      "Travel insurance",
      "Proof of accommodation",
      "Bank statements (3 months)",
      "Flight itinerary",
    ],
    processingTime: "10–15 business days",
    validity: "90 days within 180 days",
    embassy: "Embassy of France, Algiers",
    fee: 80,
  },
  "DZ-AE": {
    nationality: "DZ",
    destination: "AE",
    type: "evisa",
    documents: [
      "Valid passport (6+ months)",
      "Passport photo",
      "Confirmed hotel booking",
      "Return flight ticket",
    ],
    processingTime: "3–5 business days",
    validity: "30 days",
    embassy: "UAE Immigration ePortal",
    fee: 100,
  },
  "DZ-TR": {
    nationality: "DZ",
    destination: "TR",
    type: "evisa",
    documents: ["Valid passport", "Email address", "Debit/credit card"],
    processingTime: "24–48 hours",
    validity: "90 days",
    embassy: "Turkish e-Visa System",
    fee: 50,
  },
  "DZ-US": {
    nationality: "DZ",
    destination: "US",
    type: "required",
    documents: [
      "Valid passport",
      "DS-160 confirmation",
      "Passport photo",
      "Interview appointment",
      "Proof of ties to home country",
      "Financial documents",
    ],
    processingTime: "2–4 weeks",
    validity: "Up to 10 years (B1/B2)",
    embassy: "U.S. Embassy, Algiers",
    fee: 185,
  },
  "DZ-GB": {
    nationality: "DZ",
    destination: "GB",
    type: "required",
    documents: [
      "Valid passport",
      "Online application",
      "Biometric appointment",
      "Bank statements",
      "Employment letter",
      "Travel itinerary",
    ],
    processingTime: "15 working days",
    validity: "6 months standard visitor",
    embassy: "UK Visa Application Centre, Algiers",
    fee: 127,
  },
  "DZ-MA": {
    nationality: "DZ",
    destination: "MA",
    type: "free",
    documents: ["Valid passport or national ID"],
    processingTime: "No visa required",
    validity: "90 days",
    embassy: "N/A — visa-free travel",
    fee: 0,
  },
  "DZ-TN": {
    nationality: "DZ",
    destination: "TN",
    type: "free",
    documents: ["Valid passport or national ID"],
    processingTime: "No visa required",
    validity: "90 days",
    embassy: "N/A — visa-free travel",
    fee: 0,
  },
  "DZ-EG": {
    nationality: "DZ",
    destination: "EG",
    type: "on-arrival",
    documents: ["Valid passport", "Return ticket", "Hotel booking"],
    processingTime: "On arrival at airport",
    validity: "30 days",
    embassy: "Egyptian Consulate, Algiers",
    fee: 25,
  },
};

export function getVisaRequirement(nationality: string, destination: string): VisaRequirement {
  const key = `${nationality}-${destination}`;
  return (
    REQUIREMENTS[key] ?? {
      nationality,
      destination,
      type: "required" as VisaType,
      documents: [
        "Valid passport (6+ months)",
        "Visa application form",
        "Passport photos",
        "Proof of accommodation",
        "Return flight ticket",
      ],
      processingTime: "10–20 business days",
      validity: "Varies by embassy",
      embassy: "Contact nearest embassy",
      fee: 75,
    }
  );
}

export const VISA_TYPE_LABELS: Record<VisaType, string> = {
  required: "Visa Required",
  "on-arrival": "Visa on Arrival",
  free: "Visa Free",
  evisa: "eVisa",
};

export const VISA_TYPE_COLORS: Record<VisaType, string> = {
  required: "bg-red-100 text-red-800 border-red-200",
  "on-arrival": "bg-amber-100 text-amber-800 border-amber-200",
  free: "bg-green-100 text-green-800 border-green-200",
  evisa: "bg-blue-100 text-blue-800 border-blue-200",
};

export const POPULAR_VISA_DESTINATIONS = [
  { code: "FR", type: "required" as VisaType },
  { code: "AE", type: "evisa" as VisaType },
  { code: "TR", type: "evisa" as VisaType },
  { code: "US", type: "required" as VisaType },
  { code: "GB", type: "required" as VisaType },
  { code: "EG", type: "on-arrival" as VisaType },
];

export const VISA_FAQ = [
  {
    q: "How long does visa processing take?",
    a: "Processing times vary by destination — from 24 hours for eVisas to 4 weeks for embassy interviews. We provide estimated timelines for each country.",
  },
  {
    q: "What if my visa is rejected?",
    a: "We review applications before submission to minimize rejection risk. If rejected, we assist with reapplication and partial fee refunds on eligible services.",
  },
  {
    q: "Can I track my application status?",
    a: "Yes. Your account dashboard shows real-time status updates and estimated completion dates for all active applications.",
  },
  {
    q: "Do you offer express processing?",
    a: "Express options are available for select destinations at an additional fee, reducing processing to 2–5 business days.",
  },
  {
    q: "What documents do I need?",
    a: "Requirements vary by nationality and destination. Use our visa checker above for a personalized document checklist.",
  },
];
