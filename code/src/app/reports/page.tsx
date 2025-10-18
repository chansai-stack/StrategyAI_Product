'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ConfidenceGauge } from '@/components/report/ConfidenceGauge'
import { formatDate, truncate } from '@/lib/utils'
import { Search, Plus } from 'lucide-react'

// Mock data - replace with actual API call
const mockReports = [
  {
    report_id: 'RPT-1737158400123',
    company_name: 'Microsoft Azure',
    strategic_question: 'Should we implement tiered rate-limiting for GPU capacity?',
    confidence_score: '72.45',
    created_at: '2025-01-18T10:30:45.123Z',
  },
  {
    report_id: 'RPT-1737158300456',
    company_name: 'Oracle Cloud',
    strategic_question: 'Should we adopt AMD MI300X GPUs for our AI workloads?',
    confidence_score: '85.20',
    created_at: '2025-01-18T09:15:22.456Z',
  },
  {
    report_id: 'RPT-1737158200789',
    company_name: 'Google Cloud',
    strategic_question: 'How should we prioritize GPU allocation across TPU and GPU instances?',
    confidence_score: '68.90',
    created_at: '2025-01-17T16:45:11.789Z',
  },
]

export default function ReportsPage() {
  const [searchQuery, setSearchQuery] = useState('')

  const filteredReports = mockReports.filter(
    (report) =>
      report.company_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      report.strategic_question.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="container mx-auto max-w-6xl px-4 py-12">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="mb-2 text-3xl font-bold text-slate-900">My Reports</h1>
          <p className="text-slate-600">View and manage your strategic analyses</p>
        </div>
        <Button asChild>
          <Link href="/new-analysis">
            <Plus className="mr-2 h-5 w-5" />
            New Analysis
          </Link>
        </Button>
      </div>

      {/* Search */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
          <Input
            type="text"
            placeholder="Search reports..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Reports Grid */}
      {filteredReports.length === 0 ? (
        <div className="rounded-lg border border-slate-200 bg-white p-12 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-slate-100">
            <FileText className="h-8 w-8 text-slate-400" />
          </div>
          <h3 className="mb-2 text-lg font-semibold text-slate-900">No reports found</h3>
          <p className="mb-6 text-slate-600">
            {searchQuery
              ? 'Try adjusting your search'
              : 'Generate your first strategic analysis to get started'}
          </p>
          {!searchQuery && (
            <Button asChild>
              <Link href="/new-analysis">Create Analysis</Link>
            </Button>
          )}
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredReports.map((report) => (
            <Link
              key={report.report_id}
              href={`/report/${report.report_id}`}
              className="group rounded-lg border border-slate-200 bg-white p-6 transition-all hover:shadow-lg"
            >
              <div className="mb-4 flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="mb-1 font-semibold text-slate-900 group-hover:text-primary-600">
                    {report.company_name}
                  </h3>
                  <p className="text-sm text-slate-600">
                    {truncate(report.strategic_question, 80)}
                  </p>
                </div>
              </div>

              <div className="mb-4 flex justify-center">
                <ConfidenceGauge score={parseFloat(report.confidence_score)} size="sm" />
              </div>

              <div className="flex items-center justify-between text-xs text-slate-500">
                <span>{report.report_id}</span>
                <span>{formatDate(report.created_at)}</span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
