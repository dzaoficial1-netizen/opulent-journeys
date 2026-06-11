"use client";
import { useState } from "react";

export default function HeroItrip() {
  const [activeTab, setActiveTab] = useState("Hotel");

  return (
    <section className="relative w-full min-h-[600px] bg-[#F9F9F9] flex flex-col items-center justify-center p-6 text-black">
      <h1 className="text-5xl font-bold mb-4">Your Journey Starts Here</h1>
      <p className="text-lg text-gray-600 mb-8">Experience the world with Itrip Agency</p>

      <div className="bg-white p-6 rounded-2xl shadow-xl border border-[#D4AF37]/20 w-full max-w-3xl">
        <div className="flex gap-4 mb-6 border-b border-gray-200">
          {["Hotel", "Flight", "Visa"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 font-medium transition-all ${
                activeTab === tab 
                  ? "text-[#185FA5] border-b-2 border-[#185FA5]" 
                  : "text-gray-500 hover:text-black"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
