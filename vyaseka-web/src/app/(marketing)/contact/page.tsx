'use client';
import { Mail, MessageSquare, Clock, ArrowRight, Zap } from 'lucide-react';
import { useState } from 'react';

export default function ContactPage() {
  const [copied, setCopied] = useState(false);
  const emailAddress = "vyasekaai25@gmail.com";

  const handleCopy = () => {
    navigator.clipboard.writeText(emailAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <main className="relative min-h-screen bg-[#050508] pt-32 pb-20 px-4 sm:px-6 overflow-hidden">
      {/* Background orbs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="orb w-[500px] h-[500px] bg-purple-600/10 top-[-100px] left-[-100px]" />
        <div className="orb w-[400px] h-[400px] bg-blue-600/8 bottom-[-100px] right-[-100px]" />
      </div>
      <div className="fixed inset-0 bg-grid pointer-events-none" />

      <div className="max-w-3xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-sm text-blue-400 font-medium mb-4">
            <MessageSquare className="w-3.5 h-3.5" /> Support & Service
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-white mb-6">
            Get in <span className="gradient-text">Touch</span>
          </h1>
          <p className="text-lg text-white/50 max-w-xl mx-auto leading-relaxed">
            Have a question, feedback, or need support? We are here to help you get the most out of Vyaseka AI.
          </p>
        </div>

        {/* Support Card */}
        <div className="glass border border-white/10 rounded-3xl p-8 md:p-10 mb-8 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-purple-600/5 pointer-events-none" />
          
          <div className="relative z-10 text-center max-w-xl mx-auto">
            <div className="w-16 h-16 rounded-2xl bg-blue-600/15 border border-blue-500/30 flex items-center justify-center mx-auto mb-6">
              <Mail className="w-8 h-8 text-blue-400" />
            </div>

            <h3 className="text-2xl font-bold text-white mb-4">Email Our Support Team</h3>
            
            <p className="text-white/60 mb-6 leading-relaxed">
              If you require service, onboarding assistance, custom pricing models, or general technical support, please contact us directly via email.
            </p>

            {/* Email Display / Action */}
            <div className="inline-flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 w-full max-w-md mx-auto mb-8">
              <div className="flex-1 bg-black/40 border border-white/10 rounded-2xl px-5 py-3.5 text-white font-mono text-sm sm:text-base text-left flex items-center justify-between">
                <span>{emailAddress}</span>
                <button
                  onClick={handleCopy}
                  className="text-xs text-blue-400 hover:text-blue-300 font-semibold transition-colors uppercase ml-4"
                >
                  {copied ? 'Copied!' : 'Copy'}
                </button>
              </div>
              <a
                href={`mailto:${emailAddress}`}
                className="btn-primary py-3.5 px-6 rounded-2xl text-sm font-semibold justify-center"
              >
                Send Email <ArrowRight className="w-4 h-4" />
              </a>
            </div>

            <div className="flex items-center justify-center gap-6 border-t border-white/5 pt-6 text-xs text-white/40">
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-blue-400/70" /> Response under 12 hours
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-white/10" />
              <span className="flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-blue-400/70" /> 24/7 Priority Mailbox
              </span>
            </div>
          </div>
        </div>

        {/* Office/Regulatory Note */}
        <div className="text-center text-xs text-white/30 leading-relaxed max-w-md mx-auto">
          Vyaseka AI Services Private Limited. <br />
          Registered in Pune, Maharashtra, India.
        </div>
      </div>
    </main>
  );
}
