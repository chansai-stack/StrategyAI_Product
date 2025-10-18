'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { analysisApi } from '@/lib/api'
import { ConfidenceGauge } from '@/components/report/ConfidenceGauge'
import { ReportSection } from '@/components/report/ReportSection'
import { ChatInterface } from '@/components/chat/ChatInterface'
import { FeedbackModal } from '@/components/modals/FeedbackModal'
import { Button } from '@/components/ui/button'
import { formatDate } from '@/lib/utils'
import { Download, Share2, FileText, Loader2 } from 'lucide-react'
import type { Report } from '@/types'

export default function ReportPage() {
  const params = useParams()
  const reportId = params.id as string

  const [report, setReport] = useState<Report | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [showFeedback, setShowFeedback] = useState(false)
  const [activeSection, setActiveSection] = useState<string>('executive-summary')

  useEffect(() => {
    const fetchReport = async () => {
      try {
        const data = await analysisApi.getReport(reportId)
        setReport(data)
      } catch (err) {
        console.error('Error fetching report:', err)
        setError('Failed to load report. Please try again.')
      } finally {
        setIsLoading(false)
      }
    }

    fetchReport()
  }, [reportId])

  useEffect(() => {
    // Show feedback modal after 2 minutes
    const timer = setTimeout(() => {
      setShowFeedback(true)
    }, 120000)

    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return (
      <div className="container mx-auto flex min-h-[60vh] items-center justify-center px-4">
        <div className="text-center">
          <Loader2 className="mx-auto mb-4 h-12 w-12 animate-spin text-primary-600" />
          <p className="text-slate-600">Loading report...</p>
        </div>
      </div>
    )
  }

  if (error || !report) {
    return (
      <div className="container mx-auto max-w-2xl px-4 py-12">
        <div className="rounded-lg border border-red-200 bg-red-50 p-8 text-center">
          <h2 className="mb-2 text-xl font-semibold text-red-900">Error Loading Report</h2>
          <p className="text-red-700">{error || 'Report not found'}</p>
        </div>
      </div>
    )
  }

  const confidenceScore = parseFloat(report.confidence_score)

  const sections = [
    { id: 'executive-summary', title: 'Executive Summary', content: report.executive_summary },
    { id: 'market-comparison', title: 'Market Comparison', content: report.market_comparison },
    { id: 'cross-validation', title: 'Cross-Validation', content: report.cross_validation },
    { id: 'strategic-insights', title: 'Strategic Insights', content: report.strategic_insights },
    { id: 'decision-factors', title: 'Top 3 Decision Factors', content: report.decision_factors },
    { id: 'recommendations', title: 'Recommendations', content: report.recommendations },
    { id: 'risk-matrix', title: 'Risk Analysis', content: report.risk_matrix },
    { id: 'executive-framework', title: 'Decision Framework', content: report.executive_framework },
    { id: 'limitations', title: 'Limitations & Follow-Up', content: report.limitations },
    { id: 'reliability', title: 'Agent Reliability Assessment', content: report.reliability },
  ]

  return (
    <div className="bg-slate-50">
      <div className="container mx-auto max-w-6xl px-4 py-8">
        {/* Header */}
        <div className="sticky top-16 z-40 mb-6 rounded-lg border border-slate-200 bg-white p-6 shadow-lg">
          <div className="mb-4 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
            <div className="flex-1">
              <h1 className="mb-2 text-2xl font-bold text-slate-900">
                Strategic Analysis Report
              </h1>
              <div className="space-y-1 text-sm text-slate-600">
                <p>
                  <strong>Company:</strong> {report.company_name}
                </p>
                <p>
                  <strong>Question:</strong> {report.strategic_question}
                </p>
                <p>
                  <strong>Generated:</strong> {formatDate(report.created_at)}
                </p>
              </div>
            </div>

            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => window.open(report.google_doc_url, '_blank')}
              >
                <FileText className="mr-2 h-4 w-4" />
                Google Doc
              </Button>
              <Button variant="outline" size="sm">
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
              <Button variant="outline" size="sm">
                <Share2 className="mr-2 h-4 w-4" />
                Share
              </Button>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex gap-2 overflow-x-auto pb-2">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => {
                  setActiveSection(section.id)
                  document.getElementById(section.id)?.scrollIntoView({ behavior: 'smooth' })
                }}
                className={`whitespace-nowrap rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
                  activeSection === section.id
                    ? 'bg-primary-600 text-white'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {section.title}
              </button>
            ))}
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Main Content */}
          <div className="space-y-6 lg:col-span-2">
            {/* Confidence Score */}
            <div className="rounded-lg border border-slate-200 bg-white p-8 text-center">
              <h2 className="mb-6 text-xl font-semibold text-slate-900">
                Confidence Score
              </h2>
              <ConfidenceGauge score={confidenceScore} size="lg" />
              <p className="mt-6 text-sm text-slate-600">
                {confidenceScore >= 75
                  ? 'Strong agreement among agents with no major conflicts'
                  : confidenceScore >= 60
                  ? 'Moderate agreement among agents with minor conflicts'
                  : confidenceScore >= 40
                  ? 'Fair agreement with some conflicting views'
                  : 'Low confidence due to major conflicts or data gaps'}
              </p>
            </div>

            {/* Report Sections */}
            <div className="space-y-4">
              {sections.map((section) => (
                <div key={section.id} id={section.id}>
                  <ReportSection
                    title={section.title}
                    content={section.content}
                    defaultOpen={section.id === 'executive-summary'}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6 lg:col-span-1">
            {/* Market Signals */}
            <div className="rounded-lg border border-slate-200 bg-white p-6">
              <h3 className="mb-4 text-lg font-semibold text-slate-900">Market Signals</h3>
              <div className="space-y-3">
                <SignalBar label="AI Chip Demand" value={report.ai_chip_rate} />
                <SignalBar label="Crypto Mining" value={report.crypto_rate} />
                <SignalBar label="EV Components" value={report.ev_rate} />
                <SignalBar label="Supply Risk" value={report.supply_risk} />
                <SignalBar label="Regulatory Risk" value={report.regulatory} />
                <SignalBar label="Consumer Electronics" value={report.consumer_rate} />
              </div>
            </div>

            {/* Quick Actions */}
            <div className="rounded-lg border border-slate-200 bg-white p-6">
              <h3 className="mb-4 text-lg font-semibold text-slate-900">Quick Actions</h3>
              <div className="space-y-2">
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => setShowFeedback(true)}
                >
                  📝 Provide Feedback
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => window.print()}
                >
                  🖨️ Print Report
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => window.open(report.google_doc_url, '_blank')}
                >
                  📄 Open in Google Docs
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Chat Interface */}
        <div className="mt-6">
          <ChatInterface reportId={reportId} />
        </div>

        {/* Feedback Modal */}
        <FeedbackModal
          reportId={reportId}
          isOpen={showFeedback}
          onClose={() => setShowFeedback(false)}
        />
      </div>
    </div>
  )
}

function SignalBar({ label, value }: { label: string; value: number }) {
  return (
    <div>
      <div className="mb-1 flex items-center justify-between text-sm">
        <span className="text-slate-700">{label}</span>
        <span className="font-semibold text-slate-900">{value}%</span>
      </div>
      <div className="h-2 w-full overflow-hidden rounded-full bg-slate-200">
        <div
          className="h-full bg-gradient-primary transition-all"
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  )
}
