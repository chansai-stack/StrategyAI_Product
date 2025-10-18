import Link from 'next/link'

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-50">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 md:grid-cols-4">
          <div>
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-primary">
                <span className="text-sm font-bold text-white">S</span>
              </div>
              <span className="text-lg font-bold text-slate-900">StratAI</span>
            </div>
            <p className="mt-3 text-sm text-slate-600">
              Strategic Intelligence Powered by Multi-Agent AI
            </p>
          </div>

          <div>
            <h3 className="mb-3 text-sm font-semibold text-slate-900">Product</h3>
            <ul className="space-y-2 text-sm text-slate-600">
              <li>
                <Link href="/new-analysis" className="hover:text-primary-600">
                  New Analysis
                </Link>
              </li>
              <li>
                <Link href="/demo" className="hover:text-primary-600">
                  Demo
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="hover:text-primary-600">
                  Pricing
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-3 text-sm font-semibold text-slate-900">Company</h3>
            <ul className="space-y-2 text-sm text-slate-600">
              <li>
                <Link href="/about" className="hover:text-primary-600">
                  About
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-primary-600">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-primary-600">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-3 text-sm font-semibold text-slate-900">Legal</h3>
            <ul className="space-y-2 text-sm text-slate-600">
              <li>
                <Link href="/privacy" className="hover:text-primary-600">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-primary-600">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-slate-200 pt-8 text-center text-sm text-slate-600">
          <p>&copy; {new Date().getFullYear()} StratAI. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
