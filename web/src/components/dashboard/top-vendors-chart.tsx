'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface VendorData {
  vendorId: string;
  name: string;
  category: string;
  totalSpend: number;
}

interface TopVendorsChartProps {
  data: VendorData[];
}

export function TopVendorsChart({ data }: TopVendorsChartProps) {
  const chartData = data
    .slice()
    .reverse()
    .map(vendor => ({
      name: vendor.name.length > 20 ? vendor.name.substring(0, 20) + '...' : vendor.name,
      'Total Spend': Math.round(vendor.totalSpend),
    }));

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={chartData} layout="vertical">
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis type="number" />
        <YAxis dataKey="name" type="category" width={120} />
        <Tooltip formatter={(value: number) => `$${value.toLocaleString()}`} />
        <Legend />
        <Bar dataKey="Total Spend" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  );
}




