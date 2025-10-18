import { Button } from '@/components/ui/button'
import { ConfidenceGauge } from '@/components/report/ConfidenceGauge'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export default function DemoPage() {
  return (
    <div className="container mx-auto max-w-4xl px-4 py-12">
      <div className="mb-8 text-center">
        <h1 className="mb-4 text-4xl font-bold text-slate-900">
          See StratAI in Action
        </h1>
        <p className="text-xl text-slate-600">
          Example analysis for a GPU allocation decision at Azure
        </p>
      </div>

      {/* Demo Report Preview */}
      <div className="space-y-6">
        {/* Strategic Question */}
        <div className="rounded-lg border border-slate-200 bg-white p-6">
          <h2 className="mb-2 text-sm font-semibold uppercase tracking-wide text-slate-500">
            Strategic Question
          </h2>
          <p className="text-lg text-slate-900">
            "Should we implement tiered rate-limiting or uniform throttling for GPU
            capacity across our 85 Azure OpenAI accounts?"
          </p>
        </div>

        {/* Confidence Score */}
        <div className="rounded-lg border border-slate-200 bg-white p-8 text-center">
          <h2 className="mb-6 text-xl font-semibold text-slate-900">
            Confidence Score
          </h2>
          <ConfidenceGauge score={72.45} size="lg" />
          <p className="mt-6 text-slate-600">
            Moderate-high confidence with strong agreement among agents and minor
            conflicts on customer behavior predictions
          </p>
        </div>

        {/* Executive Summary Preview */}
        <div className="rounded-lg border border-slate-200 bg-white p-6">
          <h2 className="mb-4 text-xl font-semibold text-slate-900">
            Executive Summary (Preview)
          </h2>
          <div className="prose prose-slate">
            <p>
              Based on multi-agent analysis of your GPU allocation challenge, we recommend
              implementing a <strong>three-tier rate-limiting system</strong> with
              grandfathered exceptions for your top 10 enterprise customers (72.45%
              confidence).
            </p>
            <p>
              <strong>Key Findings:</strong>
            </p>
            <ul>
              <li>
                Current 68% concentration in 10 customers creates significant dependency
                risk
              </li>
              <li>
                Uniform throttling would impact $8M Salesforce renewal (90 days out)
              </li>
              <li>
                Tiered approach balances satisfaction (92% target) with growth capacity
              </li>
            </ul>
          </div>
        </div>

        {/* Sample Recommendations */}
        <div className="rounded-lg border border-slate-200 bg-white p-6">
          <h2 className="mb-4 text-xl font-semibold text-slate-900">
            Top 3 Recommendations
          </h2>
          <div className="space-y-4">
            <div className="rounded-lg bg-slate-50 p-4">
              <h3 className="mb-2 font-semibold text-slate-900">
                1. Implement Three-Tier System (30 days)
              </h3>
              <p className="text-sm text-slate-600">
                Platinum (top 10): No limits, guaranteed capacity. Gold (11-30): 2x
                standard allocation. Standard: Base allocation with fair queuing.
              </p>
            </div>
            <div className="rounded-lg bg-slate-50 p-4">
              <h3 className="mb-2 font-semibold text-slate-900">
                2. Grandfather Top Customers (Immediate)
              </h3>
              <p className="text-sm text-slate-600">
                Protect Salesforce and other critical renewals with explicit Platinum
                tier commitments before any changes.
              </p>
            </div>
            <div className="rounded-lg bg-slate-50 p-4">
              <h3 className="mb-2 font-semibold text-slate-900">
                3. Monitor Satisfaction Metrics (Weekly)
              </h3>
              <p className="text-sm text-slate-600">
                Track NPS, support tickets, and churn indicators weekly for first 90
                days to enable rapid adjustments.
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="rounded-lg bg-gradient-primary p-8 text-center text-white">
          <h2 className="mb-4 text-2xl font-bold">Ready to Try StratAI?</h2>
          <p className="mb-6 text-lg opacity-90">
            Generate your own strategic analysis in 60 seconds
          </p>
          <Button asChild size="lg" variant="secondary">
            <Link href="/new-analysis">
              Create Your Analysis <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
