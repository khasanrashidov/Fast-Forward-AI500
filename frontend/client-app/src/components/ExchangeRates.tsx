"use client";

import { TrendingUp, TrendingDown } from "lucide-react";

const rates = [
    { currency: "USD", value: "12,850.00", change: "+12.5", isUp: true },
    { currency: "EUR", value: "13,540.00", change: "-8.2", isUp: false },
    { currency: "RUB", value: "135.50", change: "+0.5", isUp: true },
];

export default function ExchangeRates() {
    return (
        <div className="grid grid-cols-3 gap-4">
            {rates.map((rate) => (
                <div key={rate.currency} className="bg-white/70 backdrop-blur-xl border border-white/40 rounded-2xl p-4 shadow-sm flex flex-col items-center justify-center text-center">
                    <div className="flex items-center gap-2 mb-1">
                        <span className="font-bold text-gray-900">{rate.currency}</span>
                        {rate.isUp ? <TrendingUp size={14} className="text-emerald-500" /> : <TrendingDown size={14} className="text-red-500" />}
                    </div>
                    <p className="text-sm font-bold text-gray-900">{rate.value}</p>
                    <p className={`text-[10px] font-medium ${rate.isUp ? "text-emerald-500" : "text-red-500"}`}>
                        {rate.change}
                    </p>
                </div>
            ))}
        </div>
    );
}
