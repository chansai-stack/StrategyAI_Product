'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { MarketSignalSlider } from '@/components/forms/MarketSignalSlider'
import { PDFUpload } from '@/components/forms/PDFUpload'
import { analysisApi } from '@/lib/api'
import { useToast } from '@/components/ui/use-toast'
import { Loader2, ChevronDown, ChevronUp } from 'lucide-react'
import type { AnalysisRequest } from '@/types'

const formSchema = z.object({
  user_email: z.string().email('Invalid email address'),
  company_name: z.string().min(1, 'Company name is required').max(200),
  job_function: z.string().min(1, 'Job function is required').max(200),
  strategic_question: z
    .string()
    .min(10, 'Question must be at least 10 characters')
    .max(500, 'Question must be less than 500 characters'),
  market_intelligence: z.string().max(5000).optional(),
  strategic_context: z.string().max(5000).optional(),
  risk_factors: z.string().max(5000).optional(),
  competitive_landscape: z.string().max(5000).optional(),
  organizational_insights: z.string().max(5000).optional(),
  user_ai_chip_rate: z.number().min(0).max(100),
  user_crypto_rate: z.number().min(0).max(100),
  user_ev_rate: z.number().min(0).max(100),
  user_supply_risk: z.number().min(0).max(100),
  user_regulatory: z.number().min(0).max(100),
  user_consumer_rate: z.number().min(0).max(100),
})

type FormData = z.infer<typeof formSchema>

export default function NewAnalysisPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [pdfFile, setPdfFile] = useState<string | null>(null)
  const [expandedSections, setExpandedSections] = useState({
    market_intelligence: false,
    strategic_context: false,
    risk_factors: false,
    competitive_landscape: false,
    organizational_insights: false,
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      user_ai_chip_rate: 50,
      user_crypto_rate: 50,
      user_ev_rate: 50,
      user_supply_risk: 50,
      user_regulatory: 50,
      user_consumer_rate: 50,
    },
  })

  const strategicQuestion = watch('strategic_question') || ''

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }))
  }

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true)

    try {
      const requestData: AnalysisRequest = {
        ...data,
        pdf_file: pdfFile || undefined,
      }

      const response = await analysisApi.create(requestData)

      toast({
        title: 'Analysis Started!',
        description: `Estimated completion time: ${response.estimated_time} seconds`,
      })

      router.push(`/analysis/${response.analysis_id}/progress`)
    } catch (error) {
      console.error('Error submitting analysis:', error)
      toast({
        title: 'Error',
        description: 'Failed to start analysis. Please try again.',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="container mx-auto max-w-4xl px-4 py-12">
      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-bold text-slate-900">
          New Strategic Analysis
        </h1>
        <p className="text-slate-600">
          Share your strategic question and context to receive AI-powered analysis with
          confidence scoring.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* Your Information */}
        <section className="rounded-lg border border-slate-200 bg-white p-6">
          <h2 className="mb-4 text-xl font-semibold text-slate-900">
            Your Information
          </h2>
          <div className="grid gap-4 md:grid-cols-3">
            <Input
              {...register('user_email')}
              type="email"
              placeholder="Email"
              error={errors.user_email?.message}
            />
            <Input
              {...register('company_name')}
              placeholder="Company"
              error={errors.company_name?.message}
            />
            <Input
              {...register('job_function')}
              placeholder="Role"
              error={errors.job_function?.message}
            />
          </div>
        </section>

        {/* Strategic Question */}
        <section className="rounded-lg border border-slate-200 bg-white p-6">
          <h2 className="mb-2 text-xl font-semibold text-slate-900">
            Strategic Question *
          </h2>
          <p className="mb-4 text-sm text-slate-600">
            What strategic decision are you facing? Be specific.
          </p>
          <Textarea
            {...register('strategic_question')}
            placeholder='e.g., "Should we implement tiered rate-limiting for GPU capacity?"'
            rows={3}
            error={errors.strategic_question?.message}
          />
          <div className="mt-2 text-right text-xs text-slate-500">
            {strategicQuestion.length}/500 characters
          </div>
        </section>

        {/* Context Sections */}
        <section className="rounded-lg border border-slate-200 bg-white p-6">
          <h2 className="mb-2 text-xl font-semibold text-slate-900">
            Context (Optional but Recommended)
          </h2>
          <p className="mb-4 text-sm text-slate-600">
            The more context you provide, the better the analysis. Click each section to
            expand.
          </p>

          <div className="space-y-4">
            {[
              {
                key: 'market_intelligence' as const,
                title: 'Market Intelligence',
                placeholder:
                  'Share current market conditions, demand trends, competitor moves...',
              },
              {
                key: 'strategic_context' as const,
                title: 'Strategic Context',
                placeholder:
                  'Business objectives, customer dynamics, growth targets...',
              },
              {
                key: 'risk_factors' as const,
                title: 'Risk Factors',
                placeholder:
                  'Supply chain vulnerabilities, regulatory concerns, financial constraints...',
              },
              {
                key: 'competitive_landscape' as const,
                title: 'Competitive Landscape',
                placeholder:
                  "Competitor strategies, market positioning, customer relationships...",
              },
              {
                key: 'organizational_insights' as const,
                title: 'Organizational Insights',
                placeholder:
                  'Team capabilities, internal constraints, organizational priorities...',
              },
            ].map((section) => (
              <div key={section.key} className="rounded-lg border border-slate-200">
                <button
                  type="button"
                  onClick={() => toggleSection(section.key)}
                  className="flex w-full items-center justify-between p-4 text-left hover:bg-slate-50"
                >
                  <span className="font-medium text-slate-900">{section.title}</span>
                  {expandedSections[section.key] ? (
                    <ChevronUp className="h-5 w-5 text-slate-600" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-slate-600" />
                  )}
                </button>
                {expandedSections[section.key] && (
                  <div className="border-t border-slate-200 p-4">
                    <Textarea
                      {...register(section.key)}
                      placeholder={section.placeholder}
                      rows={4}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Market Signals */}
        <section className="rounded-lg border border-slate-200 bg-white p-6">
          <h2 className="mb-2 text-xl font-semibold text-slate-900">Market Signals</h2>
          <p className="mb-6 text-sm text-slate-600">
            Indicate the intensity of these market factors (0-100%)
          </p>

          <div className="space-y-6">
            <MarketSignalSlider
              label="AI Chip Demand"
              value={watch('user_ai_chip_rate')}
              onChange={(value) => setValue('user_ai_chip_rate', value)}
              description="Current demand for AI/ML accelerators (H100, MI300X, etc.)"
            />
            <MarketSignalSlider
              label="Crypto Mining Demand"
              value={watch('user_crypto_rate')}
              onChange={(value) => setValue('user_crypto_rate', value)}
              description="GPU demand from cryptocurrency mining operations"
            />
            <MarketSignalSlider
              label="EV Component Demand"
              value={watch('user_ev_rate')}
              onChange={(value) => setValue('user_ev_rate', value)}
              description="Semiconductor demand from electric vehicle manufacturers"
            />
            <MarketSignalSlider
              label="Supply Chain Risk"
              value={watch('user_supply_risk')}
              onChange={(value) => setValue('user_supply_risk', value)}
              description="Level of supply chain uncertainty and bottlenecks"
            />
            <MarketSignalSlider
              label="Regulatory Risk"
              value={watch('user_regulatory')}
              onChange={(value) => setValue('user_regulatory', value)}
              description="Impact of export controls, trade policies, compliance"
            />
            <MarketSignalSlider
              label="Consumer Electronics Demand"
              value={watch('user_consumer_rate')}
              onChange={(value) => setValue('user_consumer_rate', value)}
              description="GPU demand from gaming, laptops, consumer devices"
            />
          </div>
        </section>

        {/* PDF Upload */}
        <section className="rounded-lg border border-slate-200 bg-white p-6">
          <h2 className="mb-2 text-xl font-semibold text-slate-900">
            Upload PDF (Optional)
          </h2>
          <p className="mb-4 text-sm text-slate-600">
            Upload internal documents, reports, or data for richer context (max 10MB)
          </p>
          <PDFUpload onFileSelect={setPdfFile} />
        </section>

        {/* Submit */}
        <div className="flex justify-end gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push('/')}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting} size="lg">
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Generating Analysis...
              </>
            ) : (
              'Generate Analysis →'
            )}
          </Button>
        </div>
      </form>
    </div>
  )
}
