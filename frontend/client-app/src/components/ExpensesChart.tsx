'use client';

import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

const data = [
  { name: 'Food & Dining', value: 450000, color: '#10b981' }, // Emerald 500
  { name: 'Transportation', value: 320000, color: '#3b82f6' }, // Blue 500
  { name: 'Shopping', value: 850000, color: '#f59e0b' }, // Amber 500
  { name: 'Entertainment', value: 210000, color: '#8b5cf6' }, // Violet 500
];

export default function ExpensesChart() {
  return (
    <div className="h-[13rem] w-full relative">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={80}
            outerRadius={95}
            paddingAngle={5}
            dataKey="value"
            cornerRadius={10}
            startAngle={90}
            endAngle={-270}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} strokeWidth={0} />
            ))}
          </Pie>
          <Tooltip
            formatter={(value: number) => [`${value.toLocaleString()} UZS`, 'Amount']}
            contentStyle={{
              borderRadius: '8px',
              border: 'none',
              boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
            }}
          />
        </PieChart>
      </ResponsiveContainer>
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
        <span className="text-sm text-gray-500 font-medium">Expenses for Nov</span>
        <span className="text-2xl font-bold text-gray-900 mt-1">1,830,000</span>
        <span className="text-xs text-gray-400 font-medium">UZS</span>
      </div>
    </div>
  );
}
