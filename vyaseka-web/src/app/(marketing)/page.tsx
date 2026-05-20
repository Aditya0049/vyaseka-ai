'use client';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import {
  Mic2, ArrowRight, Zap, Globe, FileText, BarChart3,
  Users, Clock, Shield, ChevronDown, Check, X,
  Play, Download, Brain, Sparkles, MessageSquare, Volume2
} from 'lucide-react';

// ── Waveform animation ──────────────────────────────────────────────
function WaveformVisual() {
  const bars = Array.from({ length: 40 }, (_, i) => i);
  return (
    <div className="flex items-center justify-center gap-[3px] h-16">
      {bars.map((i) => (
        <div
          key={i}
          className="wave-bar bg-blue-500/60 rounded-full w-[3px]"
          style={{
            height: `${Math.random() * 60 + 10}%`,
            animationDelay: `${(i * 0.05) % 1.2}s`,
            animationDuration: `${0.8 + (i % 5) * 0.1}s`,
          }}
        />
      ))}
    </div>
  );
}

// ── Typing transcript effect ─────────────────────────────────────────
const DEMO_TRANSCRIPT = `[00:00] Welcome to today's meeting. We'll be discussing the Q3 roadmap...
[00:08] The key initiatives are: product expansion, market entry in Southeast Asia...
[00:17] Our transcription accuracy has reached 97.3% across 12 languages...
[00:25] Vyaseka AI is processing over 50,000 minutes of audio daily...`;

function LiveTranscriptEffect() {
  const [displayed, setDisplayed] = useState('');
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    if (idx < DEMO_TRANSCRIPT.length) {
      const timer = setTimeout(() => {
        setDisplayed(DEMO_TRANSCRIPT.slice(0, idx + 1));
        setIdx(idx + 1);
      }, 28);
      return () => clearTimeout(timer);
    } else {
      // Restart after pause
      const reset = setTimeout(() => {
        setDisplayed('');
        setIdx(0);
      }, 3000);
      return () => clearTimeout(reset);
    }
  }, [idx]);

  return (
    <div className="font-mono text-xs text-green-400/80 leading-relaxed">
      {displayed}
      <span className="cursor-blink text-green-400">█</span>
    </div>
  );
}

// ── Feature card ─────────────────────────────────────────────────────
const FEATURES = [
  { icon: Mic2, label: 'Audio Transcription', desc: '97%+ accuracy across accents and noisy environments.', color: 'blue' },
  { icon: Play, label: 'Video Captions', desc: 'Auto-generate SRT/VTT captions for any video format.', color: 'purple' },
  { icon: Brain, label: 'AI Summaries', desc: 'Smart meeting notes and action items in seconds.', color: 'cyan' },
  { icon: Globe, label: 'Multilingual', desc: 'Support for 50+ languages including Hindi, Tamil, Marathi.', color: 'emerald' },
  { icon: MessageSquare, label: 'Speaker Detection', desc: 'Identify who said what — perfect for interviews.', color: 'orange' },
  { icon: Download, label: 'Export Anywhere', desc: 'Download TXT, PDF, DOCX, or SRT in one click.', color: 'pink' },
  { icon: Shield, label: 'Secure & Private', desc: 'End-to-end encrypted. DPDP compliant. India-first.', color: 'indigo' },
  { icon: Zap, label: 'Real-time Processing', desc: 'Sub-3 minute turnaround for hour-long recordings.', color: 'yellow' },
];

const COLOR_MAP: Record<string, string> = {
  blue: 'text-blue-400 bg-blue-500/10 border-blue-500/20',
  purple: 'text-purple-400 bg-purple-500/10 border-purple-500/20',
  cyan: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20',
  emerald: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
  orange: 'text-orange-400 bg-orange-500/10 border-orange-500/20',
  pink: 'text-pink-400 bg-pink-500/10 border-pink-500/20',
  indigo: 'text-indigo-400 bg-indigo-500/10 border-indigo-500/20',
  yellow: 'text-yellow-400 bg-yellow-500/10 border-yellow-500/20',
};

// ── Steps ─────────────────────────────────────────────────────────────
const STEPS = [
  { num: '01', title: 'Upload Your File', desc: 'Drag and drop any audio or video file. MP3, MP4, WAV, M4A, and 20+ formats supported.', icon: Volume2 },
  { num: '02', title: 'AI Processes It', desc: 'Our Whisper-powered engine transcribes with timestamps, speaker detection, and 97%+ accuracy.', icon: Brain },
  { num: '03', title: 'Review & Export', desc: 'Edit inline, search your transcript, and export to PDF, DOCX, or SRT in one click.', icon: Download },
];



// ── Pricing ───────────────────────────────────────────────────────────
const PLANS = [
  {
    name: 'Free',
    price: '₹0',
    period: 'forever',
    desc: 'Perfect to get started',
    features: ['5 minutes free', '1 language', 'TXT export', 'Standard quality', 'Email support'],
    cta: 'Start Free',
    href: '/upload',
    highlighted: false,
  },
  {
    name: 'Creator',
    price: '₹799',
    period: '/month',
    desc: 'For creators & freelancers',
    features: ['600 minutes/month', '50+ languages', 'PDF, DOCX, SRT export', 'Speaker detection', 'AI summaries', 'Priority processing'],
    cta: 'Start Creator',
    href: '/upload',
    highlighted: true,
    badge: 'Most Popular',
  },
  {
    name: 'Business',
    price: '₹2,999',
    period: '/month',
    desc: 'For teams & agencies',
    features: ['Unlimited minutes', '50+ languages', 'All export formats', 'Speaker detection', 'AI summaries + notes', 'API access', 'Dedicated support', 'Team workspace'],
    cta: 'Start Business',
    href: '/contact',
    highlighted: false,
  },
];

// ── FAQ ────────────────────────────────────────────────────────────────
const FAQS = [
  { q: 'What file formats do you support?', a: 'We support MP3, MP4, WAV, M4A, FLAC, OGG, WebM, MOV, AVI, and more. If your format is not listed, contact us.' },
  { q: 'How accurate is the transcription?', a: 'Our AI engine achieves 95-99% accuracy on clear audio. Noisy recordings or heavy accents may vary, but we continuously improve.' },
  { q: 'Is my audio data secure?', a: 'Yes. All files are encrypted in transit and at rest. We are fully DPDP Act compliant and do not use your data to train AI models.' },
  { q: 'How does the free tier work?', a: 'Your first 5 minutes of audio are completely free, no credit card required. After that, you can choose a plan that fits your usage.' },
  { q: 'Can I cancel anytime?', a: 'Yes, absolutely. Cancel anytime from your dashboard. No questions asked, no lock-in.' },
];

export default function HomePage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [statsVisible, setStatsVisible] = useState(false);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStatsVisible(true); },
      { threshold: 0.3 }
    );
    if (statsRef.current) obs.observe(statsRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <main className="relative min-h-screen bg-[#050508] overflow-x-hidden">
      {/* ── Background orbs ── */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="orb w-[600px] h-[600px] bg-blue-600/15 top-[-200px] left-[-100px]" />
        <div className="orb w-[500px] h-[500px] bg-purple-600/10 top-[300px] right-[-150px]" />
        <div className="orb w-[400px] h-[400px] bg-blue-500/8 bottom-[200px] left-[30%]" />
      </div>
      <div className="fixed inset-0 bg-grid pointer-events-none" />

      {/* ── HERO ── */}
      <section className="relative pt-40 pb-24 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          {/* Badge */}
          <div className="flex justify-center mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-blue-500/20 text-sm">
              <div className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
              <span className="text-white/60">Incubated at</span>
              <span className="text-blue-400 font-semibold">SPPU Research Park Foundation</span>
              <Sparkles className="w-3.5 h-3.5 text-blue-400" />
            </div>
          </div>

          {/* Headline */}
          <h1 className="text-center text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight leading-[1.0] text-white mb-6">
            Turn Speech Into{' '}
            <span className="gradient-text">
              Usable Intelligence.
            </span>
          </h1>

          <p className="text-center text-lg sm:text-xl text-white/50 max-w-2xl mx-auto mb-10 leading-relaxed">
            AI-powered transcription, captions, summaries, and multilingual voice workflows — 
            built for India and the world.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Link href="/upload" className="btn-primary text-base px-8 py-4 rounded-2xl">
              <Zap className="w-5 h-5" />
              Start Free — 5 mins on us
            </Link>
            <Link href="/upload" className="btn-secondary text-base px-8 py-4 rounded-2xl">
              <Volume2 className="w-5 h-5" />
              Upload Audio
            </Link>
            <Link href="/contact" className="text-sm text-white/40 hover:text-white/70 transition-colors flex items-center gap-1.5">
              Book a Demo <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Hero Visual */}
          <div className="relative max-w-4xl mx-auto">
            {/* Glow behind */}
            <div className="absolute inset-0 bg-blue-500/10 blur-3xl rounded-3xl" />

            <div className="relative glass rounded-3xl border border-white/10 p-6 sm:p-8 overflow-hidden">
              {/* Top bar */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500/60" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                    <div className="w-3 h-3 rounded-full bg-green-500/60" />
                  </div>
                  <span className="text-xs text-white/30 font-mono">vyaseka_ai — live transcription</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-400 status-dot" />
                  <span className="text-xs text-green-400 font-medium">Processing...</span>
                </div>
              </div>

              {/* Waveform */}
              <div className="mb-6 p-4 rounded-xl bg-white/3 border border-white/5">
                <WaveformVisual />
              </div>

              {/* Transcript */}
              <div className="p-4 rounded-xl bg-black/40 border border-white/5 min-h-[100px]">
                <div className="flex items-center gap-2 mb-3">
                  <Brain className="w-3.5 h-3.5 text-blue-400" />
                  <span className="text-xs text-blue-400 font-semibold uppercase tracking-wider">Live Transcript</span>
                </div>
                <LiveTranscriptEffect />
              </div>

              {/* Bottom stats */}
              <div className="mt-6 grid grid-cols-3 gap-4">
                {[
                  { label: 'Accuracy', value: '97.3%' },
                  { label: 'Languages', value: '50+' },
                  { label: 'Speed', value: '< 3 min' },
                ].map((stat) => (
                  <div key={stat.label} className="text-center p-3 rounded-xl bg-white/3">
                    <div className="text-lg font-bold text-white">{stat.value}</div>
                    <div className="text-xs text-white/40 mt-0.5">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SOCIAL PROOF STATS ── */}
      <section ref={statsRef} className="py-16 px-4 sm:px-6 border-y border-white/5">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { value: '50K+', label: 'Minutes Processed Daily', icon: Clock },
            { value: '97.3%', label: 'Transcription Accuracy', icon: BarChart3 },
            { value: '50+', label: 'Languages Supported', icon: Globe },
            { value: '5,000+', label: 'Happy Users', icon: Users },
          ].map(({ value, label, icon: Icon }) => (
            <div key={label} className="group">
              <Icon className="w-5 h-5 text-blue-500/60 mx-auto mb-2 group-hover:text-blue-400 transition-colors" />
              <div className="text-3xl md:text-4xl font-black text-white mb-1">{value}</div>
              <div className="text-xs text-white/40 font-medium">{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section id="features" className="py-24 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-sm text-blue-400 font-medium mb-4">
              <Zap className="w-3.5 h-3.5" /> Features
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
              Everything you need to unlock your voice data
            </h2>
            <p className="text-white/40 text-lg max-w-xl mx-auto">
              From raw audio to structured intelligence — in minutes, not hours.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {FEATURES.map(({ icon: Icon, label, desc, color }) => (
              <div
                key={label}
                className="card-hover group p-6 rounded-2xl border border-white/8 bg-white/3 cursor-default"
              >
                <div className={`w-11 h-11 rounded-xl border flex items-center justify-center mb-4 ${COLOR_MAP[color]}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="font-semibold text-white mb-2">{label}</h3>
                <p className="text-sm text-white/40 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="py-24 px-4 sm:px-6 bg-black/20">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-sm text-purple-400 font-medium mb-4">
              <ArrowRight className="w-3.5 h-3.5" /> How It Works
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
              Three steps to transform your audio
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {STEPS.map(({ num, title, desc, icon: Icon }, i) => (
              <div key={num} className="relative text-center group">
                {i < STEPS.length - 1 && (
                  <div className="hidden md:block absolute top-10 left-[calc(50%+48px)] w-[calc(100%-96px)] h-px bg-gradient-to-r from-blue-500/30 to-transparent" />
                )}
                <div className="relative w-20 h-20 mx-auto mb-6">
                  <div className="absolute inset-0 rounded-2xl bg-blue-500/10 group-hover:bg-blue-500/20 transition-colors" />
                  <div className="absolute inset-0 rounded-2xl border border-blue-500/20 group-hover:border-blue-500/40 transition-colors" />
                  <div className="relative w-full h-full flex items-center justify-center">
                    <Icon className="w-8 h-8 text-blue-400" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center text-xs font-bold text-white">
                    {i + 1}
                  </div>
                </div>
                <h3 className="font-bold text-white text-lg mb-3">{title}</h3>
                <p className="text-sm text-white/40 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-12 text-center">
            <Link href="/upload" className="btn-primary text-base px-8 py-4 rounded-2xl">
              Try It Now — Free <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>


      {/* ── PRICING ── */}
      <section id="pricing" className="py-24 px-4 sm:px-6 bg-black/20">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-sm text-emerald-400 font-medium mb-4">
              <Zap className="w-3.5 h-3.5" /> Pricing
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4">Simple, honest pricing</h2>
            <p className="text-white/40 text-lg">Start free. Scale as you grow.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PLANS.map((plan) => (
              <div
                key={plan.name}
                className={`relative p-8 rounded-2xl border transition-all duration-300 ${
                  plan.highlighted
                    ? 'border-blue-500/50 bg-blue-950/30 shadow-[0_0_60px_rgba(37,99,235,0.15)]'
                    : 'border-white/8 bg-white/3 hover:border-white/15'
                }`}
              >
                {plan.badge && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-blue-600 text-xs font-bold text-white">
                    {plan.badge}
                  </div>
                )}
                <div className="mb-6">
                  <h3 className="font-bold text-white text-lg mb-1">{plan.name}</h3>
                  <p className="text-white/40 text-sm">{plan.desc}</p>
                </div>
                <div className="mb-6">
                  <span className="text-4xl font-black text-white">{plan.price}</span>
                  <span className="text-white/40 text-sm ml-1">{plan.period}</span>
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-center gap-2.5 text-sm text-white/70">
                      <Check className="w-4 h-4 text-blue-400 flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  href={plan.href}
                  className={plan.highlighted ? 'btn-primary w-full justify-center py-3.5' : 'btn-secondary w-full justify-center py-3.5'}
                >
                  {plan.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-24 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4">Frequently Asked Questions</h2>
          </div>
          <div className="space-y-3">
            {FAQS.map(({ q, a }, i) => (
              <div key={i} className="rounded-xl border border-white/8 overflow-hidden">
                <button
                  className="w-full flex items-center justify-between p-5 text-left hover:bg-white/3 transition-colors"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <span className="font-medium text-white text-sm pr-4">{q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-white/40 flex-shrink-0 transition-transform duration-200 ${
                      openFaq === i ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {openFaq === i && (
                  <div className="px-5 pb-5 text-sm text-white/50 leading-relaxed">{a}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section className="py-24 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <div className="relative p-12 rounded-3xl overflow-hidden text-center">
            {/* Background gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-900/50 via-purple-900/30 to-blue-900/50" />
            <div className="absolute inset-0 border border-blue-500/20 rounded-3xl" />
            <div className="absolute inset-0 bg-grid opacity-30" />
            {/* Orb */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-blue-600/20 rounded-full blur-3xl" />
            <div className="relative z-10">
              <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
                Your first 5 minutes are free.
              </h2>
              <p className="text-white/50 text-lg mb-8 max-w-xl mx-auto">
                No credit card. No setup. Upload now and see Vyaseka AI in action in under 3 minutes.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/upload" className="btn-primary text-base px-10 py-4 rounded-2xl">
                  <Zap className="w-5 h-5" />
                  Upload Your First File
                </Link>
                <Link href="/pricing" className="btn-secondary text-base px-8 py-4 rounded-2xl">
                  View All Plans
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
