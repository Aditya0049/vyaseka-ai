'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { Mic2, Menu, X, Zap, LogOut } from 'lucide-react';

const NAV_LINKS = [
  { href: '/#features', label: 'Features' },
  { href: '/#pricing', label: 'Pricing' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { isSignedIn, user, signOut } = useAuth();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'py-3 bg-[#050508]/90 backdrop-blur-xl border-b border-white/5' : 'py-5'
        }`}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="relative w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center glow-blue group-hover:bg-blue-500 transition-colors">
              <Mic2 className="w-5 h-5 text-white" />
              <div className="absolute inset-0 rounded-xl bg-blue-400/20 animate-pulse" />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-white text-sm leading-tight tracking-tight">Vyaseka AI</span>
              <span className="text-[10px] text-blue-400/70 leading-tight font-medium tracking-widest uppercase">Voice Intelligence</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <Link key={link.href} href={link.href}
                className="px-4 py-2 rounded-lg text-sm text-white/60 hover:text-white hover:bg-white/5 transition-all duration-200 font-medium">
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            {isSignedIn ? (
              <>
                <Link href="/dashboard" className="px-4 py-2 rounded-lg text-sm text-white/70 hover:text-white transition-colors font-medium">
                  Dashboard
                </Link>
                <Link href="/upload" className="btn-primary text-xs px-5 py-2.5">
                  <Zap className="w-3.5 h-3.5" /> Upload
                </Link>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-bold">
                    {user?.firstName?.[0]?.toUpperCase() ?? 'U'}
                  </div>
                  <button onClick={signOut} className="p-1.5 rounded-lg text-white/40 hover:text-white hover:bg-white/5 transition-colors">
                    <LogOut className="w-3.5 h-3.5" />
                  </button>
                </div>
              </>
            ) : (
              <>
                <Link href="/sign-in" className="px-4 py-2 rounded-lg text-sm text-white/70 hover:text-white transition-colors font-medium">
                  Sign In
                </Link>
                <Link href="/upload" className="btn-primary text-xs px-5 py-2.5">
                  <Zap className="w-3.5 h-3.5" /> Start Free
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu toggle */}
          <button className="md:hidden p-2 rounded-lg text-white/60 hover:text-white hover:bg-white/5 transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </nav>
      </header>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 pt-20 bg-[#050508]/95 backdrop-blur-xl md:hidden">
          <div className="px-4 py-6 flex flex-col gap-2">
            {NAV_LINKS.map((link) => (
              <Link key={link.href} href={link.href} onClick={() => setMobileOpen(false)}
                className="px-4 py-3 rounded-xl text-white/70 hover:text-white hover:bg-white/5 transition-colors text-base font-medium">
                {link.label}
              </Link>
            ))}
            <div className="mt-4 flex flex-col gap-3">
              {isSignedIn ? (
                <>
                  <Link href="/dashboard" className="btn-secondary justify-center" onClick={() => setMobileOpen(false)}>Dashboard</Link>
                  <Link href="/upload" className="btn-primary justify-center" onClick={() => setMobileOpen(false)}>
                    <Zap className="w-4 h-4" /> Upload
                  </Link>
                  <button onClick={() => { signOut(); setMobileOpen(false); }}
                    className="btn-secondary justify-center text-red-400 border-red-500/20">
                    <LogOut className="w-4 h-4" /> Sign Out
                  </button>
                </>
              ) : (
                <>
                  <Link href="/sign-in" className="btn-secondary justify-center" onClick={() => setMobileOpen(false)}>Sign In</Link>
                  <Link href="/upload" className="btn-primary justify-center" onClick={() => setMobileOpen(false)}>
                    <Zap className="w-4 h-4" /> Start Free
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
