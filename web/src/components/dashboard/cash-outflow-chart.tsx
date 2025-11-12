'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface OutflowData {
  month: string;
  amount: number;
}

interface CashOutflowChartProps {
  data: OutflowData[];
}

export function CashOutflowChart({ data }: CashOutflowChartProps) {
  const chartData = data.map(item => ({
    month: new Date(item.month + '-01').toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
    amount: Math.round(item.amount),
  }));

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip formatter={(value: number) => `$${value.toLocaleString()}`} />
        <Legend />
        <Bar dataKey="amount" fill="#FF8042" name="Forecasted Outflow" />
      </BarChart>
    </ResponsiveContainer>
  );
}




