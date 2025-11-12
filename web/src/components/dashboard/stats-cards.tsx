import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DollarSign, FileText, Upload, TrendingUp } from 'lucide-react';

interface StatsCardsProps {
  stats: {
    totalSpendYTD: number;
    totalInvoicesProcessed: number;
    documentsUploaded: number;
    averageInvoiceValue: number;
  };
}

export function StatsCards({ stats }: StatsCardsProps) {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(value);
  };

  const cards = [
    {
      title: 'Total Spend (YTD)',
      value: formatCurrency(Number(stats.totalSpendYTD)),
      icon: DollarSign,
      description: 'Year-to-date spending',
    },
    {
      title: 'Total Invoices Processed',
      value: stats.totalInvoicesProcessed.toString(),
      icon: FileText,
      description: 'Invoices this year',
    },
    {
      title: 'Documents Uploaded',
      value: stats.documentsUploaded.toString(),
      icon: Upload,
      description: 'Total documents',
    },
    {
      title: 'Average Invoice Value',
      value: formatCurrency(Number(stats.averageInvoiceValue)),
      icon: TrendingUp,
      description: 'Average per invoice',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {cards.map((card) => {
        const Icon = card.icon;
        return (
          <Card key={card.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                {card.title}
              </CardTitle>
              <Icon className="h-4 w-4 text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{card.value}</div>
              <p className="text-xs text-gray-500 mt-1">{card.description}</p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}




