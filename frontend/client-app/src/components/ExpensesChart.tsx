"use client";

import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";

const data = [
    { name: "Food & Dining", value: 450000, color: "#10b981" }, // Emerald 500
    { name: "Transportation", value: 320000, color: "#3b82f6" }, // Blue 500
    { name: "Shopping", value: 850000, color: "#f59e0b" }, // Amber 500
    { name: "Entertainment", value: 210000, color: "#8b5cf6" }, // Violet 500
];

export default function ExpensesChart() {
    return (
        <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <Pie
                        data={data}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                    >
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} strokeWidth={0} />
                        ))}
                    </Pie>
                    <Tooltip
                        formatter={(value: number) => [`${value.toLocaleString()} UZS`, 'Amount']}
                        contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                    />
                    <Legend
                        verticalAlign="middle"
                        align="right"
                        layout="vertical"
                        iconType="circle"
                        formatter={(value, entry: any) => (
                            <span className="text-sm text-gray-600 font-medium ml-2">{value}</span>
                        )}
                    />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
}
