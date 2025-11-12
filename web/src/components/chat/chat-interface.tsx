'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Send, Code, Database } from 'lucide-react';
import { API_BASE } from '@/lib/utils';
import { QueryResults } from './query-results';

interface Message {
  id: string;
  query: string;
  sql: string;
  results: any[];
  error?: string;
  timestamp: Date;
}

export function ChatInterface() {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim() || loading) return;

    const userQuery = query.trim();
    setQuery('');
    setLoading(true);

    try {
      const response = await fetch(`${API_BASE}/chat-with-data`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: userQuery }),
      });

      const data = await response.json();

      const newMessage: Message = {
        id: Date.now().toString(),
        query: userQuery,
        sql: data.query || '',
        results: data.results || [],
        error: data.error,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, newMessage]);
    } catch (error) {
      const errorMessage: Message = {
        id: Date.now().toString(),
        query: userQuery,
        sql: '',
        results: [],
        error: error instanceof Error ? error.message : 'Failed to process query',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Ask a Question</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="flex gap-2">
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="e.g., Show me total spend by vendor"
              className="flex-1"
              disabled={loading}
            />
            <Button type="submit" disabled={loading || !query.trim()}>
              <Send className="w-4 h-4 mr-2" />
              {loading ? 'Processing...' : 'Send'}
            </Button>
          </form>
        </CardContent>
      </Card>

      <div className="space-y-4">
        {messages.length === 0 && (
          <Card>
            <CardContent className="py-12 text-center text-gray-500">
              <Database className="w-12 h-12 mx-auto mb-4 text-gray-400" />
              <p>Start asking questions about your data</p>
              <p className="text-sm mt-2">Example: "What are the top 5 customers by invoice amount?"</p>
            </CardContent>
          </Card>
        )}

        {messages.map((message) => (
          <div key={message.id} className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Your Question</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">{message.query}</p>
              </CardContent>
            </Card>

            {message.error ? (
              <Card className="border-red-200 bg-red-50">
                <CardContent className="py-4">
                  <p className="text-red-800">Error: {message.error}</p>
                </CardContent>
              </Card>
            ) : (
              <>
                {message.sql && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2">
                        <Code className="w-5 h-5" />
                        Generated SQL
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm">
                        {message.sql}
                      </pre>
                    </CardContent>
                  </Card>
                )}

                {message.results.length > 0 && (
                  <QueryResults results={message.results} />
                )}
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}




