import Link from 'next/link';
import { Mic2, Twitter, Linkedin, Github, Mail } from 'lucide-react';

const FOOTER_LINKS = {
  Product: [
    { label: 'Features', href: '/#features' },
    { label: 'Pricing', href: '/pricing' },
    { label: 'Upload', href: '/upload' },
    { label: 'Dashboard', href: '/dashboard' },
  ],
  Company: [
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
    { label: 'Blog', href: '#' },
    { label: 'Careers', href: '#' },
  ],
  Legal: [
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Service', href: '/terms' },
    { label: 'Cookie Policy', href: '#' },
    { label: 'DPDP Act', href: '#' },
  ],
};

export function Footer() {
  return (
    <footer className="relative border-t border-white/5 bg-[#020204]">
      {/* Top gradient line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/40 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2.5 mb-5">
              <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center">
                <Mic2 className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="font-bold text-white text-sm">Vyaseka AI</div>
                <div className="text-[10px] text-blue-400/70 uppercase tracking-widest">Voice Intelligence</div>
              </div>
            </Link>
            <p className="text-sm text-white/40 leading-relaxed max-w-xs mb-6">
              Voice infrastructure for India and multilingual global workflows. Transcribe, summarize, and understand speech at scale.
            </p>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-400 status-dot" />
              <span className="text-xs text-white/40">Incubated at SPPU Research Park Foundation</span>
            </div>
            <div className="flex items-center gap-3 mt-5">
              {[
                { icon: Twitter, href: '#' },
                { icon: Linkedin, href: '#' },
                { icon: Github, href: '#' },
                { icon: Mail, href: 'mailto:hello@vyaseka.ai' },
              ].map(({ icon: Icon, href }, i) => (
                <a
                  key={i}
                  href={href}
                  className="w-9 h-9 rounded-lg border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:border-blue-500/40 hover:bg-blue-500/10 transition-all duration-200"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(FOOTER_LINKS).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-xs font-semibold text-white/30 uppercase tracking-widest mb-4">
                {category}
              </h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/50 hover:text-white transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="mt-16 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/25">
            © {new Date().getFullYear()} Vyaseka AI Services Private Limited. All rights reserved.
          </p>
          <p className="text-xs text-white/25">
            Registered in India · CIN: U72900PN2024PTC000000 · GSTIN: 27XXXXXX
          </p>
        </div>
      </div>
    </footer>
  );
}
