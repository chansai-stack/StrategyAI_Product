import axios from 'axios'
import type {
  AnalysisRequest,
  AnalysisResponse,
  AnalysisStatus,
  Report,
  ChatResponse,
  FeedbackRequest,
  AnalyticsData,
} from '@/types'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api'

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

export const analysisApi = {
  create: async (data: AnalysisRequest): Promise<AnalysisResponse> => {
    const response = await api.post('/analysis', data)
    return response.data
  },

  getStatus: async (id: string): Promise<AnalysisStatus> => {
    const response = await api.get(`/analysis/${id}/status`)
    return response.data
  },

  getReport: async (id: string): Promise<Report> => {
    const response = await api.get(`/analysis/${id}/report`)
    return response.data
  },
}

export const chatApi = {
  sendMessage: async (
    reportId: string,
    message: string,
    history?: Array<{ role: string; content: string }>
  ): Promise<ChatResponse> => {
    const response = await api.post('/chat', {
      report_id: reportId,
      message,
      conversation_history: history,
    })
    return response.data
  },
}

export const feedbackApi = {
  submit: async (data: FeedbackRequest): Promise<{ success: boolean }> => {
    const response = await api.post('/feedback', data)
    return response.data
  },
}

export const adminApi = {
  getAnalytics: async (): Promise<AnalyticsData> => {
    const response = await api.get('/admin/analytics')
    return response.data
  },
}
