import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// API base URL - use environment variable
// Development: Set NEXT_PUBLIC_API_BASE=http://localhost:3001/api in .env.local
// Production: Set NEXT_PUBLIC_API_BASE=/api for Vercel rewrites, or full URL
export const API_BASE = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:3001/api';



