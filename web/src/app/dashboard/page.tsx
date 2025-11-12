'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { StatsCards } from '@/components/dashboard/stats-cards';
import { InvoiceTrendsChart } from '@/components/dashboard/invoice-trends-chart';
import { TopVendorsChart } from '@/components/dashboard/top-vendors-chart';
import { CategorySpendChart } from '@/components/dashboard/category-spend-chart';
import { CashOutflowChart } from '@/components/dashboard/cash-outflow-chart';
import { InvoicesTable } from '@/components/dashboard/invoices-table';
import { API_BASE } from '@/lib/utils';

export default function DashboardPage() {
  const [stats, setStats] = useState<any>(null);
  const [trends, setTrends] = useState<any[]>([]);
  const [topVendors, setTopVendors] = useState<any[]>([]);
  const [categorySpend, setCategorySpend] = useState<any[]>([]);
  const [cashOutflow, setCashOutflow] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDashboardData() {
      try {
        const [statsRes, trendsRes, vendorsRes, categoryRes, outflowRes] = await Promise.all([
          fetch(`${API_BASE}/stats`),
          fetch(`${API_BASE}/invoice-trends`),
          fetch(`${API_BASE}/vendors/top10`),
          fetch(`${API_BASE}/category-spend`),
          fetch(`${API_BASE}/cash-outflow`),
        ]);

        const [statsData, trendsData, vendorsData, categoryData, outflowData] = await Promise.all([
          statsRes.json(),
          trendsRes.json(),
          vendorsRes.json(),
          categoryRes.json(),
          outflowRes.json(),
        ]);

        setStats(statsData);
        setTrends(trendsData);
        setTopVendors(vendorsData);
        setCategorySpend(categoryData);
        setCashOutflow(outflowData);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="p-8">
        <div className="flex items-center justify-center h-64">
          <div className="text-gray-500">Loading dashboard...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-500 mt-1">Analytics and insights overview</p>
      </div>

      {/* Stats Cards */}
      {stats && <StatsCards stats={stats} />}

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Invoice Volume & Value Trend</CardTitle>
            <CardDescription>Monthly invoice count and total spend</CardDescription>
          </CardHeader>
          <CardContent>
            <InvoiceTrendsChart data={trends} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Top 10 Vendors</CardTitle>
            <CardDescription>Vendors ranked by total spend</CardDescription>
          </CardHeader>
          <CardContent>
            <TopVendorsChart data={topVendors} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Spend by Category</CardTitle>
            <CardDescription>Distribution of spend across categories</CardDescription>
          </CardHeader>
          <CardContent>
            <CategorySpendChart data={categorySpend} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Cash Outflow Forecast</CardTitle>
            <CardDescription>Projected payments for pending invoices</CardDescription>
          </CardHeader>
          <CardContent>
            <CashOutflowChart data={cashOutflow} />
          </CardContent>
        </Card>
      </div>

      {/* Invoices Table */}
      <Card>
        <CardHeader>
          <CardTitle>Invoices</CardTitle>
          <CardDescription>Recent invoice transactions</CardDescription>
        </CardHeader>
        <CardContent>
          <InvoicesTable />
        </CardContent>
      </Card>
    </div>
  );
}




