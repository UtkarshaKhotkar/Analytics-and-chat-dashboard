'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table2 } from 'lucide-react';

interface QueryResultsProps {
  results: any[];
}

export function QueryResults({ results }: QueryResultsProps) {
  if (results.length === 0) {
    return (
      <Card>
        <CardContent className="py-8 text-center text-gray-500">
          No results found
        </CardContent>
      </Card>
    );
  }

  const columns = Object.keys(results[0]);

  const formatValue = (value: any): string => {
    if (value === null || value === undefined) return 'N/A';
    if (typeof value === 'number') {
      // Check if it's a currency value (has decimal places)
      if (value % 1 !== 0) {
        return new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
        }).format(value);
      }
      return value.toLocaleString();
    }
    if (typeof value === 'string' && value.match(/^\d{4}-\d{2}-\d{2}/)) {
      return new Date(value).toLocaleDateString();
    }
    return String(value);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <Table2 className="w-5 h-5" />
          Results ({results.length} {results.length === 1 ? 'row' : 'rows'})
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b">
                {columns.map((col) => (
                  <th
                    key={col}
                    className="px-4 py-3 text-left text-sm font-semibold text-gray-700 bg-gray-50"
                  >
                    {col.replace(/_/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase())}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {results.map((row, idx) => (
                <tr key={idx} className="border-b hover:bg-gray-50">
                  {columns.map((col) => (
                    <td key={col} className="px-4 py-3 text-sm text-gray-700">
                      {formatValue(row[col])}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}




