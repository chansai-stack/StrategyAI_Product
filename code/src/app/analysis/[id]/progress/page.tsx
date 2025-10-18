'use client'

import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { analysisApi } from '@/lib/api'
import { Loader2, CheckCircle2, Clock } from 'lucide-react'
import type { AnalysisStatus } from '@/types'

const ANALYSIS_STEPS = [
  'Extracting context',
  'Parsing PDF document',
  'Analyzing market data',
  'Gathering competitive intelligence',
  'Performing strategic analysis',
  'Assessing risks',
  'Evaluating competitive position',
  'Synthesizing insights',
  'Calculating confidence score',
]

const TIPS = [
  '💡 Our 5 AI agents cross-validate their findings to ensure accuracy.',
  '💡 Confidence scores range from 0-100%, with explanations for the rating.',
  '💡 You can chat with our AI assistant about any part of the report.',
  '💡 Higher context detail leads to more confident recommendations.',
  '💡 All analyses are saved and can be referenced later.',
]

export default function AnalysisProgressPage() {
  const params = useParams()
  const router = useRouter()
  const analysisId = params.id as string

  const [status, setStatus] = useState<AnalysisStatus | null>(null)
  const [currentTip, setCurrentTip] = useState(0)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let interval: NodeJS.Timeout

    const checkStatus = async () => {
      try {
        const response = await analysisApi.getStatus(analysisId)
        setStatus(response)

        if (response.status === 'completed') {
          clearInterval(interval)
          setTimeout(() => {
            router.push(`/report/${analysisId}`)
          }, 1000)
        } else if (response.status === 'failed') {
          clearInterval(interval)
          setError('Analysis failed. Please try again or contact support.')
        }
      } catch (err) {
        console.error('Error checking status:', err)
        setError('Failed to check analysis status. Please refresh the page.')
      }
    }

    // Initial check
    checkStatus()

    // Poll every 2 seconds
    interval = setInterval(checkStatus, 2000)

    return () => clearInterval(interval)
  }, [analysisId, router])

  useEffect(() => {
    // Rotate tips every 5 seconds
    const tipInterval = setInterval(() => {
      setCurrentTip((prev) => (prev + 1) % TIPS.length)
    }, 5000)

    return () => clearInterval(tipInterval)
  }, [])

  if (error) {
    return (
      <div className="container mx-auto max-w-2xl px-4 py-12">
        <div className="rounded-lg border border-red-200 bg-red-50 p-8 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
            <span className="text-3xl">⚠️</span>
          </div>
          <h2 className="mb-2 text-xl font-semibold text-red-900">Analysis Failed</h2>
          <p className="mb-6 text-red-700">{error}</p>
          <button
            onClick={() => router.push('/new-analysis')}
            className="rounded-lg bg-red-600 px-6 py-2 text-white hover:bg-red-700"
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  const progress = status?.progress || 0
  const currentStep = status?.current_step || 'Initializing...'
  const estimatedRemaining = status?.estimated_remaining || 60

  return (
    <div className="container mx-auto max-w-3xl px-4 py-12">
      <div className="rounded-lg border border-slate-200 bg-white p-8 shadow-lg">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center">
            <Loader2 className="h-20 w-20 animate-spin text-primary-600" />
          </div>
          <h1 className="mb-2 text-2xl font-bold text-slate-900">
            Analyzing Your Strategic Question...
          </h1>
          <p className="text-slate-600">
            Our multi-agent AI system is processing your request
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="mb-2 flex items-center justify-between text-sm">
            <span className="font-medium text-slate-700">Progress</span>
            <span className="font-semibold text-primary-600">{progress}%</span>
          </div>
          <div className="h-3 w-full overflow-hidden rounded-full bg-slate-200">
            <div
              className="h-full bg-gradient-primary transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Current Status */}
        <div className="mb-8 rounded-lg bg-slate-50 p-6">
          <div className="mb-4 flex items-center gap-2 text-sm font-medium text-slate-700">
            <Clock className="h-4 w-4" />
            Current Status:
          </div>
          <p className="mb-4 text-lg font-semibold text-slate-900">{currentStep}</p>
          <p className="text-sm text-slate-600">
            Estimated time remaining: ~{estimatedRemaining} seconds
          </p>
        </div>

        {/* Steps List */}
        <div className="mb-8 space-y-3">
          {ANALYSIS_STEPS.map((step, index) => {
            const stepProgress = ((index + 1) / ANALYSIS_STEPS.length) * 100
            const isCompleted = progress >= stepProgress
            const isCurrent = !isCompleted && progress >= (index / ANALYSIS_STEPS.length) * 100

            return (
              <div
                key={step}
                className={`flex items-center gap-3 transition-opacity ${
                  isCompleted || isCurrent ? 'opacity-100' : 'opacity-40'
                }`}
              >
                <div className="flex-shrink-0">
                  {isCompleted ? (
                    <CheckCircle2 className="h-5 w-5 text-green-600" />
                  ) : isCurrent ? (
                    <Loader2 className="h-5 w-5 animate-spin text-primary-600" />
                  ) : (
                    <div className="h-5 w-5 rounded-full border-2 border-slate-300" />
                  )}
                </div>
                <span
                  className={`text-sm ${
                    isCompleted || isCurrent
                      ? 'font-medium text-slate-900'
                      : 'text-slate-600'
                  }`}
                >
                  {step}
                </span>
              </div>
            )
          })}
        </div>

        {/* Rotating Tip */}
        <div className="rounded-lg border border-primary-200 bg-primary-50 p-6">
          <p className="text-sm text-primary-900">{TIPS[currentTip]}</p>
        </div>
      </div>
    </div>
  )
}
