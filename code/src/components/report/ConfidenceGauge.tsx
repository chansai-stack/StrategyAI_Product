'use client'

import { getConfidenceLevel } from '@/lib/utils'

interface ConfidenceGaugeProps {
  score: number
  size?: 'sm' | 'md' | 'lg'
}

export function ConfidenceGauge({ score, size = 'md' }: ConfidenceGaugeProps) {
  const { label, color, bgColor } = getConfidenceLevel(score)

  const sizeClasses = {
    sm: 'w-24 h-24',
    md: 'w-32 h-32',
    lg: 'w-48 h-48',
  }

  const textSizes = {
    sm: 'text-xl',
    md: 'text-3xl',
    lg: 'text-5xl',
  }

  const labelSizes = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base',
  }

  // Calculate SVG circle parameters
  const radius = size === 'sm' ? 40 : size === 'md' ? 52 : 80
  const circumference = 2 * Math.PI * radius
  const progress = (score / 100) * circumference

  return (
    <div className="flex flex-col items-center gap-2">
      <div className={`relative ${sizeClasses[size]}`}>
        <svg className="h-full w-full -rotate-90 transform">
          <circle
            cx="50%"
            cy="50%"
            r={radius}
            stroke="currentColor"
            strokeWidth="8"
            fill="none"
            className="text-slate-200"
          />
          <circle
            cx="50%"
            cy="50%"
            r={radius}
            stroke="currentColor"
            strokeWidth="8"
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={circumference - progress}
            strokeLinecap="round"
            className={cn(
              'transition-all duration-1000 ease-out',
              score >= 75
                ? 'text-green-500'
                : score >= 60
                ? 'text-yellow-500'
                : score >= 40
                ? 'text-orange-500'
                : 'text-red-500'
            )}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className={`${textSizes[size]} font-bold text-slate-900`}>
              {score.toFixed(1)}%
            </div>
          </div>
        </div>
      </div>
      <div className={`${labelSizes[size]} ${bgColor} ${color} rounded-full px-3 py-1 font-semibold`}>
        {label}
      </div>
    </div>
  )
}
