'use client'

import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import { useState } from 'react'
import { Button } from '@/components/ui/button'

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/80 backdrop-blur-lg">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-primary">
              <span className="text-xl font-bold text-white">S</span>
            </div>
            <span className="text-xl font-bold text-slate-900">StratAI</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-6 md:flex">
            <Link
              href="/new-analysis"
              className="text-sm font-medium text-slate-700 transition-colors hover:text-primary-600"
            >
              New Analysis
            </Link>
            <Link
              href="/reports"
              className="text-sm font-medium text-slate-700 transition-colors hover:text-primary-600"
            >
              My Reports
            </Link>
            <Link
              href="/demo"
              className="text-sm font-medium text-slate-700 transition-colors hover:text-primary-600"
            >
              Demo
            </Link>
            <Button asChild>
              <Link href="/new-analysis">Get Started</Link>
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6 text-slate-700" />
            ) : (
              <Menu className="h-6 w-6 text-slate-700" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="border-t border-slate-200 py-4 md:hidden">
            <div className="flex flex-col gap-4">
              <Link
                href="/new-analysis"
                className="text-sm font-medium text-slate-700"
                onClick={() => setMobileMenuOpen(false)}
              >
                New Analysis
              </Link>
              <Link
                href="/reports"
                className="text-sm font-medium text-slate-700"
                onClick={() => setMobileMenuOpen(false)}
              >
                My Reports
              </Link>
              <Link
                href="/demo"
                className="text-sm font-medium text-slate-700"
                onClick={() => setMobileMenuOpen(false)}
              >
                Demo
              </Link>
              <Button asChild className="w-full">
                <Link href="/new-analysis">Get Started</Link>
              </Button>
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}
