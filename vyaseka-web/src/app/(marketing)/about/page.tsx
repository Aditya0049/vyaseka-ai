'use client';
import { Mic2, Shield, Globe, Award, Users } from 'lucide-react';

export default function AboutPage() {
  return (
    <main className="relative min-h-screen bg-[#050508] pt-32 pb-20 px-4 sm:px-6 overflow-hidden">
      {/* Background orbs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="orb w-[500px] h-[500px] bg-blue-600/10 top-[-100px] right-[-100px]" />
        <div className="orb w-[400px] h-[400px] bg-purple-600/8 bottom-[-100px] left-[-100px]" />
      </div>
      <div className="fixed inset-0 bg-grid pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-sm text-blue-400 font-medium mb-4">
            <Mic2 className="w-3.5 h-3.5" /> About Us
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-white mb-6">
            Pioneering <span className="gradient-text">Voice Intelligence</span>
          </h1>
          <p className="text-lg text-white/50 max-w-2xl mx-auto leading-relaxed">
            Vyaseka AI is building the next generation of voice infrastructure. We specialize in speech-to-text, summarization, and understanding for Indian languages and accents.
          </p>
        </div>

        {/* Incubation details */}
        <div className="p-8 rounded-3xl glass border border-blue-500/20 mb-12 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-purple-600/5 pointer-events-none" />
          <div className="relative z-10 flex flex-col md:flex-row items-center gap-6">
            <div className="w-16 h-16 rounded-2xl bg-blue-600/10 border border-blue-500/20 flex items-center justify-center shrink-0">
              <Award className="w-8 h-8 text-blue-400" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white mb-2">Incubated at SPPU Research Park Foundation</h3>
              <p className="text-sm text-white/50 leading-relaxed">
                We are proud to be incubated at Savitribai Phule Pune University (SPPU) Research Park Foundation. Our academic connection enables us to drive deep-tech research in voice synthesis and multi-dialect translation.
              </p>
            </div>
          </div>
        </div>

        {/* Pillars / Values */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {[
            {
              icon: Globe,
              title: "India-First",
              desc: "Engineered specifically to understand Indian accents, dialects, and mixed language patterns (like Hinglish)."
            },
            {
              icon: Shield,
              title: "Secure by Design",
              desc: "Compliant with the DPDP Act. Your voice recordings and data are fully encrypted and never used for external training."
            },
            {
              icon: Users,
              title: "Accessible AI",
              desc: "Democratizing state-of-the-art AI so that creators, developers, and businesses can build multilingual solutions."
            }
          ].map(({ icon: Icon, title, desc }) => (
            <div key={title} className="p-6 rounded-2xl border border-white/8 bg-white/3">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mb-4">
                <Icon className="w-5 h-5 text-blue-400" />
              </div>
              <h4 className="font-bold text-white mb-2">{title}</h4>
              <p className="text-sm text-white/40 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>

        {/* Story Section */}
        <div className="prose prose-invert max-w-none text-white/60 leading-relaxed space-y-6">
          <h2 className="text-2xl font-bold text-white">Our Vision</h2>
          <p>
            Speech is the most natural way we communicate, yet most digital tools are built around keyboard inputs. Vyaseka AI bridges this gap. By building localized, highly accurate voice-to-text models, we enable a future where any voice command or recording can be processed, translated, and structured instantly.
          </p>
          <p>
            Whether you are a physician dictating clinical notes, a creator editing a podcast, or an enterprise parsing thousands of call logs — Vyaseka AI gives you the infrastructure to turn sound into structured knowledge.
          </p>
        </div>
      </div>
    </main>
  );
}
