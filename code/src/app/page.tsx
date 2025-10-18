import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight, Bot, BarChart3, CheckCircle, MessageSquare } from 'lucide-react'

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-50 to-white py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="mx-auto max-w-4xl">
            <h1 className="mb-6 text-5xl font-bold leading-tight text-slate-900 md:text-6xl">
              Strategic Intelligence Powered by{' '}
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                Multi-Agent AI
              </span>
            </h1>
            <p className="mb-8 text-xl text-slate-600 md:text-2xl">
              Make confident decisions with AI that shows its work. Get semiconductor
              strategy insights with explainable confidence scoring.
            </p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <Button asChild size="lg" className="text-lg">
                <Link href="/new-analysis">
                  Start Free Analysis <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-lg">
                <Link href="/demo">Watch Demo</Link>
              </Button>
            </div>
            <p className="mt-6 text-sm text-slate-500">
              Trusted by executives at Azure, Google Cloud, Oracle, NVIDIA, Tesla
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center text-3xl font-bold text-slate-900 md:text-4xl">
            Why StratAI?
          </h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <FeatureCard
              icon={<Bot className="h-8 w-8 text-primary-600" />}
              title="5 AI Agents"
              description="Specialized agents analyze market data, intelligence, strategy, risk, and competition."
            />
            <FeatureCard
              icon={<BarChart3 className="h-8 w-8 text-primary-600" />}
              title="Confidence Scoring"
              description="70-95% reliability scores using our HHH (Helpful, Harmless, Honest) framework."
            />
            <FeatureCard
              icon={<CheckCircle className="h-8 w-8 text-primary-600" />}
              title="Cross-Validation"
              description="Agents validate each other's findings to ensure accuracy and catch conflicts."
            />
            <FeatureCard
              icon={<MessageSquare className="h-8 w-8 text-primary-600" />}
              title="AI Chat Assistant"
              description="Ask follow-up questions and dive deeper into any part of the analysis."
            />
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="bg-slate-50 py-20">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center text-3xl font-bold text-slate-900 md:text-4xl">
            How It Works
          </h2>
          <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-3">
            <StepCard
              number="1"
              title="Ask Strategic Question"
              description='E.g., "Should we adopt AMD MI300X GPUs?" Share your strategic dilemma.'
            />
            <StepCard
              number="2"
              title="Provide Context"
              description="Add market data, constraints, competitive landscape, and organizational insights."
            />
            <StepCard
              number="3"
              title="Get Analysis in 60s"
              description="Receive a comprehensive report with confidence score and actionable recommendations."
            />
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="mb-12 text-3xl font-bold text-slate-900 md:text-4xl">
            Trusted by Strategic Decision Makers
          </h2>
          <div className="mx-auto grid max-w-4xl gap-8 md:grid-cols-3">
            <StatCard value="247" label="Analyses Generated" />
            <StatCard value="76%" label="Avg Confidence Score" />
            <StatCard value="4.6★" label="User Rating" />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-primary py-20 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="mb-6 text-3xl font-bold md:text-4xl">
            Ready to Make Better Strategic Decisions?
          </h2>
          <p className="mb-8 text-xl opacity-90">
            Generate your first analysis in 60 seconds. No credit card required.
          </p>
          <Button asChild size="lg" variant="secondary" className="text-lg">
            <Link href="/new-analysis">
              Generate Your First Analysis <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  )
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode
  title: string
  description: string
}) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-6 text-center transition-shadow hover:shadow-lg">
      <div className="mb-4 flex justify-center">{icon}</div>
      <h3 className="mb-2 text-lg font-semibold text-slate-900">{title}</h3>
      <p className="text-sm text-slate-600">{description}</p>
    </div>
  )
}

function StepCard({
  number,
  title,
  description,
}: {
  number: string
  title: string
  description: string
}) {
  return (
    <div className="text-center">
      <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-primary text-xl font-bold text-white">
        {number}
      </div>
      <h3 className="mb-2 text-xl font-semibold text-slate-900">{title}</h3>
      <p className="text-slate-600">{description}</p>
    </div>
  )
}

function StatCard({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <div className="mb-2 text-5xl font-bold text-primary-600">{value}</div>
      <p className="text-slate-600">{label}</p>
    </div>
  )
}
