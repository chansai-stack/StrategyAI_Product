'use client'

import { Slider } from '@/components/ui/slider'
import { Info } from 'lucide-react'
import * as Tooltip from '@radix-ui/react-tooltip'

interface MarketSignalSliderProps {
  label: string
  value: number
  onChange: (value: number) => void
  description?: string
}

export function MarketSignalSlider({
  label,
  value,
  onChange,
  description,
}: MarketSignalSliderProps) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium text-slate-700">{label}</label>
          {description && (
            <Tooltip.Provider>
              <Tooltip.Root>
                <Tooltip.Trigger asChild>
                  <button className="text-slate-400 hover:text-slate-600">
                    <Info className="h-4 w-4" />
                  </button>
                </Tooltip.Trigger>
                <Tooltip.Portal>
                  <Tooltip.Content
                    className="max-w-xs rounded-lg bg-slate-900 px-3 py-2 text-sm text-white shadow-lg"
                    sideOffset={5}
                  >
                    {description}
                    <Tooltip.Arrow className="fill-slate-900" />
                  </Tooltip.Content>
                </Tooltip.Portal>
              </Tooltip.Root>
            </Tooltip.Provider>
          )}
        </div>
        <span className="text-sm font-semibold text-primary-600">{value}%</span>
      </div>
      <Slider
        value={[value]}
        onValueChange={(values) => onChange(values[0])}
        max={100}
        step={1}
        className="w-full"
      />
    </div>
  )
}
