export interface AnalysisRequest {
  user_email: string
  company_name: string
  job_function: string
  strategic_question: string
  market_intelligence?: string
  strategic_context?: string
  risk_factors?: string
  competitive_landscape?: string
  organizational_insights?: string
  user_ai_chip_rate: number
  user_crypto_rate: number
  user_ev_rate: number
  user_supply_risk: number
  user_regulatory: number
  user_consumer_rate: number
  pdf_file?: string
}

export interface AnalysisResponse {
  success: boolean
  analysis_id: string
  estimated_time: number
}

export interface AnalysisStatus {
  status: 'processing' | 'completed' | 'failed'
  progress: number
  current_step: string
  estimated_remaining: number
}

export interface Report {
  report_id: string
  confidence_score: string
  strategic_question: string
  company_name: string
  user_email: string
  executive_summary: string
  market_comparison: string
  cross_validation: string
  strategic_insights: string
  decision_factors: string
  recommendations: string
  risk_matrix: string
  executive_framework: string
  limitations: string
  reliability: string
  full_report: string
  google_doc_url: string
  created_at: string
  ai_chip_rate: number
  crypto_rate: number
  ev_rate: number
  supply_risk: number
  regulatory: number
  consumer_rate: number
}

export interface ChatMessage {
  role: 'user' | 'assistant'
  content: string
  timestamp: string
}

export interface ChatResponse {
  response: string
  timestamp: string
}

export interface FeedbackRequest {
  report_id: string
  rating: number
  useful: boolean
  would_recommend: boolean
  feedback_text?: string
}

export interface AnalyticsData {
  total_reports: number
  avg_confidence: string
  avg_rating: string
  recommend_rate: string
  reports_by_company: Record<string, number>
  recent_reports: Array<{
    report_id: string
    company: string
    confidence: string
    timestamp: string
  }>
}
