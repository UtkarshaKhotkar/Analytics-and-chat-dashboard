'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ChatInterface } from '@/components/chat/chat-interface';
import { API_BASE } from '@/lib/utils';

export default function ChatPage() {
  return (
    <div className="p-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Chat with Data</h1>
        <p className="text-gray-500 mt-1">Ask questions about your data in natural language</p>
      </div>

      <ChatInterface />
    </div>
  );
}




