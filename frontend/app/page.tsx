import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight, Globe, ShieldCheck, FileText, BarChart3, Sparkles, Zap, TrendingUp } from "lucide-react"

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-pink-500/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      <header className="px-6 h-20 flex items-center glass-panel sticky top-0 z-50 border-b border-white/10">
        <div className="flex items-center gap-3 font-bold text-2xl mr-auto">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center glow-effect">
            <Globe className="h-6 w-6 text-white" />
          </div>
          <span className="gradient-text">ExportSarathi</span>
        </div>
        <nav className="hidden md:flex gap-8 text-sm font-medium">
          <Link href="#features" className="text-gray-100 hover:text-purple-300 transition-colors">Features</Link>
          <Link href="#pricing" className="text-gray-100 hover:text-purple-300 transition-colors">Pricing</Link>
          <Link href="#about" className="text-gray-100 hover:text-purple-300 transition-colors">About</Link>
        </nav>
        <div className="flex items-center gap-4 ml-8">
          <Link href="/login" className="text-sm font-medium text-gray-100 hover:text-purple-300 transition-colors">Login</Link>
          <Link href="/dashboard">
            <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 border-0 shadow-lg shadow-purple-500/50">
              Get Started <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </header>

      <main className="flex-1 relative z-10">
        {/* Hero Section */}
        <section className="py-32 px-6 text-center space-y-10 max-w-6xl mx-auto fade-in">
          <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
          <div className="relative z-10 container mx-auto px-4 pt-32 pb-20 text-center">
            <div className="inline-block mb-6 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm animate-fade-in">
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent font-medium">
                🚀 The Future of Export Intelligence
              </span>
            </div>
            <h1 className="text-6xl md:text-8xl font-bold tracking-tight mb-8">
              <span className="gradient-text">ExportSarathi</span>
            </h1>
            <p className="text-2xl md:text-3xl text-gray-100 mb-8 max-w-3xl mx-auto font-light">
              Know everything about export.
            </p>
            <p className="text-lg text-gray-200 mb-10 max-w-2xl mx-auto">
              Your AI-powered companion for navigating global trade, compliance, and market expansion with confidence.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
            <Link href="/dashboard">
              <Button size="lg" className="h-14 px-10 text-lg bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 shadow-2xl shadow-purple-500/50 border-0 group">
                Start Exporting Now
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Button
              size="lg"
              variant="outline"
              className="h-14 px-10 text-lg glass-panel border-white/20 hover:bg-white/10"
              onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <Zap className="mr-2 h-5 w-5 text-yellow-400" />
              Watch Demo
            </Button>
          </div>

          <div className="pt-16 float-animation">
            <div className="premium-card p-2 shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1400&q=80"
                alt="Dashboard Preview"
                width={1400}
                height={900}
                className="w-full h-auto rounded-lg"
                priority
              />
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section id="features" className="py-32 px-6 relative">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-20">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                Everything you need to <span className="gradient-text">go global</span>
              </h2>
              <p className="text-xl text-gray-200 max-w-2xl mx-auto">
                Powerful features designed specifically for Indian exporters
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {/* Feature 1 */}
              <div className="premium-card p-8 group">
                <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center mb-6 glow-effect">
                  <Globe className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-3 text-white">Market Intelligence</h3>
                <p className="text-gray-200 leading-relaxed">
                  Identify the best target countries for your specific product using real-time trade data and AI-powered demand analysis.
                </p>
                <Link href="/dashboard" className="mt-6 flex items-center text-purple-400 font-semibold group-hover:translate-x-2 transition-transform cursor-pointer">
                  Learn more <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>

              {/* Feature 2 */}
              <div className="premium-card p-8 group">
                <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center mb-6 glow-effect">
                  <ShieldCheck className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-3 text-white">Compliance Roadmap</h3>
                <p className="text-gray-200 leading-relaxed">
                  Get a step-by-step checklist of certifications, registrations, and legal requirements for any destination country.
                </p>
                <Link href="/dashboard/compliance" className="mt-6 flex items-center text-purple-400 font-semibold group-hover:translate-x-2 transition-transform cursor-pointer">
                  Learn more <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>

              {/* Feature 3 */}
              <div className="premium-card p-8 group">
                <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mb-6 glow-effect">
                  <FileText className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-3 text-white">Auto-Documentation</h3>
                <p className="text-gray-200 leading-relaxed">
                  Generate error-free Commercial Invoices, Packing Lists, and Certificates of Origin in one click with AI assistance.
                </p>
                <Link href="/dashboard/documents" className="mt-6 flex items-center text-purple-400 font-semibold group-hover:translate-x-2 transition-transform cursor-pointer">
                  Learn more <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>

              {/* Feature 4 */}
              <div className="premium-card p-8 group">
                <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center mb-6 glow-effect">
                  <BarChart3 className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-3 text-white">Analytics Dashboard</h3>
                <p className="text-gray-200 leading-relaxed">
                  Track your export readiness score, market trends, and compliance status all in one beautiful dashboard.
                </p>
                <Link href="/dashboard/analytics" className="mt-6 flex items-center text-purple-400 font-semibold group-hover:translate-x-2 transition-transform cursor-pointer">
                  Learn more <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>

              {/* Feature 5 */}
              <div className="premium-card p-8 group">
                <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center mb-6 glow-effect">
                  <Sparkles className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-3 text-white">AI Export Advisor</h3>
                <p className="text-gray-200 leading-relaxed">
                  Get instant answers to your compliance queries with our RAG-powered chatbot trained on DGFT and WTO regulations.
                </p>
                <Link href="/dashboard/advisor" className="mt-6 flex items-center text-purple-400 font-semibold group-hover:translate-x-2 transition-transform cursor-pointer">
                  Learn more <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>

              {/* Feature 6 */}
              <div className="premium-card p-8 group">
                <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center mb-6 glow-effect">
                  <TrendingUp className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-3 text-white">Feasibility Checker</h3>
                <p className="text-gray-200 leading-relaxed">
                  AI-driven analysis of your product's potential in global markets with detailed viability scores and recommendations.
                </p>
                <Link href="/dashboard/feasibility" className="mt-6 flex items-center text-purple-400 font-semibold group-hover:translate-x-2 transition-transform cursor-pointer">
                  Learn more <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-32 px-6">
          <div className="max-w-5xl mx-auto">
            <div className="premium-card p-12 md:p-16 text-center neon-border">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Ready to <span className="gradient-text">go global</span>?
              </h2>
              <p className="text-xl text-gray-100 mb-10 max-w-2xl mx-auto">
                Join thousands of Indian MSMEs already using ExportSarathi to expand their business internationally.
              </p>
              <Link href="/dashboard">
                <Button size="lg" className="h-16 px-12 text-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 shadow-2xl shadow-purple-500/50 border-0">
                  Start Your Export Journey
                  <ArrowRight className="ml-3 h-6 w-6" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <footer className="py-16 px-6 glass-panel border-t border-white/10 relative z-10">
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-12">
          <div className="col-span-2">
            <div className="flex items-center gap-3 font-bold text-2xl mb-6">
              <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                <Globe className="h-6 w-6 text-white" />
              </div>
              <span className="gradient-text">ExportSarathi</span>
            </div>
            <p className="text-gray-200 max-w-sm leading-relaxed">
              Making Indian MSMEs global champions through cutting-edge AI technology and intelligent automation.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-4 text-lg">Product</h4>
            <ul className="space-y-3 text-gray-200">
              <li className="hover:text-purple-400 transition-colors cursor-pointer">Features</li>
              <li className="hover:text-purple-400 transition-colors cursor-pointer">Pricing</li>
              <li className="hover:text-purple-400 transition-colors cursor-pointer">Case Studies</li>
              <li className="hover:text-purple-400 transition-colors cursor-pointer">API Access</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-4 text-lg">Company</h4>
            <ul className="space-y-3 text-gray-200">
              <li className="hover:text-purple-400 transition-colors cursor-pointer">About Us</li>
              <li className="hover:text-purple-400 transition-colors cursor-pointer">Careers</li>
              <li className="hover:text-purple-400 transition-colors cursor-pointer">Contact</li>
              <li className="hover:text-purple-400 transition-colors cursor-pointer">Privacy Policy</li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-white/10">
          <div className="flex flex-col items-center gap-4">
            <p className="text-gray-200 text-center">© 2025 ExportSarathi. All rights reserved.</p>
            <div className="flex flex-col items-center gap-3">
              <p className="text-sm text-gray-300">Proudly made by</p>
              <Image
                src="/creovyn-logo.jpg"
                alt="Creovyn Solutions"
                width={200}
                height={60}
                className="h-12 w-auto"
              />
              <p className="text-sm text-purple-300 font-semibold">for Impact AI Summit 2026</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
