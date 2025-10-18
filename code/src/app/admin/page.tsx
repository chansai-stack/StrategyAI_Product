'use client'

import { useEffect, useState } from 'react'
import { adminApi } from '@/lib/api'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { TrendingUp, Star, Users, FileText } from 'lucide-react'
import { formatDate } from '@/lib/utils'
import type { AnalyticsData } from '@/types'
import Link from 'next/link'

export default function AdminDashboardPage() {
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const data = await adminApi.getAnalytics()
        setAnalytics(data)
      } catch (error) {
        console.error('Error fetching analytics:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchAnalytics()
  }, [])

  if (isLoading || !analytics) {
    return (
      <div className="container mx-auto px-4 py-12">
        <p className="text-center text-slate-600">Loading analytics...</p>
      </div>
    )
  }

  const chartData = Object.entries(analytics.reports_by_company).map(([company, count]) => ({
    company: company.substring(0, 20),
    reports: count,
  }))

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-bold text-slate-900">Admin Dashboard</h1>
        <p className="text-slate-600">Last 30 days overview</p>
      </div>

      {/* Metrics Grid */}
      <div className="mb-8 grid gap-6 md:grid-cols-4">
        <MetricCard
          icon={<FileText className="h-6 w-6 text-primary-600" />}
          label="Total Reports"
          value={analytics.total_reports.toString()}
        />
        <MetricCard
          icon={<TrendingUp className="h-6 w-6 text-green-600" />}
          label="Avg Confidence"
          value={`${analytics.avg_confidence}%`}
        />
        <MetricCard
          icon={<Star className="h-6 w-6 text-yellow-600" />}
          label="Avg Rating"
          value={`${analytics.avg_rating}★`}
        />
        <MetricCard
          icon={<Users className="h-6 w-6 text-blue-600" />}
          label="Would Recommend"
          value={`${analytics.recommend_rate}%`}
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Reports by Company Chart */}
        <div className="rounded-lg border border-slate-200 bg-white p-6">
          <h2 className="mb-4 text-lg font-semibold text-slate-900">
            Reports by Company
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="company" angle={-45} textAnchor="end" height={100} />
              <YAxis />
              <Tooltip />
              <Bar dataKey="reports" fill="#667eea" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Recent Reports */}
        <div className="rounded-lg border border-slate-200 bg-white p-6">
          <h2 className="mb-4 text-lg font-semibold text-slate-900">Recent Reports</h2>
          <div className="space-y-3">
            {analytics.recent_reports.map((report) => (
              <Link
                key={report.report_id}
                href={`/report/${report.report_id}`}
                className="block rounded-lg border border-slate-200 p-4 transition-colors hover:bg-slate-50"
              >
                <div className="mb-2 flex items-center justify-between">
                  <span className="font-medium text-slate-900">{report.company}</span>
                  <span className="rounded-full bg-primary-100 px-2 py-1 text-xs font-semibold text-primary-700">
                    {report.confidence}%
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span>{report.report_id}</span>
                  <span>{formatDate(report.timestamp)}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function MetricCard({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode
  label: string
  value: string
}) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-6">
      <div className="mb-2 flex items-center gap-2">
        {icon}
        <span className="text-sm font-medium text-slate-600">{label}</span>
      </div>
      <p className="text-3xl font-bold text-slate-900">{value}</p>
    </div>
  )
}
