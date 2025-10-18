import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { ToastProvider, ToastViewport } from '@/components/ui/toast'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'StratAI - Strategic Intelligence Powered by Multi-Agent AI',
  description:
    'Make confident strategic decisions with AI-powered analysis from 5 specialized agents. Get semiconductor strategy insights with explainable confidence scoring.',
  keywords: [
    'strategic analysis',
    'AI decision making',
    'semiconductor strategy',
    'GPU allocation',
    'multi-agent AI',
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ToastProvider>
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
          <ToastViewport />
        </ToastProvider>
      </body>
    </html>
  )
}
