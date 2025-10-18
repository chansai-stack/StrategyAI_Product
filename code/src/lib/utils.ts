import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: string | Date): string {
  const d = new Date(date)
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  }).format(d)
}

export function getConfidenceLevel(score: number): {
  label: string
  color: string
  bgColor: string
} {
  if (score >= 75) {
    return { label: 'HIGH', color: 'text-green-600', bgColor: 'bg-green-100' }
  } else if (score >= 60) {
    return { label: 'MODERATE', color: 'text-yellow-600', bgColor: 'bg-yellow-100' }
  } else if (score >= 40) {
    return { label: 'FAIR', color: 'text-orange-600', bgColor: 'bg-orange-100' }
  } else {
    return { label: 'LOW', color: 'text-red-600', bgColor: 'bg-red-100' }
  }
}

export function truncate(str: string, length: number): string {
  return str.length > length ? str.substring(0, length) + '...' : str
}
