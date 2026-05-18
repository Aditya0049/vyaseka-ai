'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';
import { Mic2, Lock, Mail, User, Zap, Eye, EyeOff, ArrowRight } from 'lucide-react';

export default function SignUpPage() {
  const { signIn, isSignedIn } = useAuth();
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (isSignedIn) { router.replace('/dashboard'); return null; }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!name || !email || !password) { setError('All fields are required.'); return; }
    if (password.length < 6) { setError('Password must be at least 6 characters.'); return; }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 700));
    signIn(email);
    router.push('/dashboard');
  };

  return (
    <div className="min-h-screen bg-[#050508] flex items-center justify-center px-4 relative overflow-hidden">
      <div className="orb w-96 h-96 bg-blue-600/15 top-[-100px] right-[-100px]" />
      <div className="orb w-80 h-80 bg-purple-600/10 bottom-[-80px] left-[-80px]" />
      <div className="fixed inset-0 bg-grid pointer-events-none" />

      <div className="relative z-10 w-full max-w-sm">
        <Link href="/" className="flex items-center gap-2.5 justify-center mb-8">
          <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center">
            <Mic2 className="w-5 h-5 text-white" />
          </div>
          <span className="font-bold text-white text-lg">Vyaseka AI</span>
        </Link>

        <div className="glass border border-white/10 rounded-2xl p-8">
          <h1 className="text-2xl font-black text-white mb-1 text-center">Create account</h1>
          <p className="text-white/40 text-sm text-center mb-7">Start with 5 free minutes — no credit card</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs text-white/50 mb-1.5 font-medium">Full name</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)}
                  placeholder="Priya Sharma" className="input-field pl-9" required />
              </div>
            </div>

            <div>
              <label className="block text-xs text-white/50 mb-1.5 font-medium">Email address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                <input type="email" id="signup-email" value={email} onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com" className="input-field pl-9" required />
              </div>
            </div>

            <div>
              <label className="block text-xs text-white/50 mb-1.5 font-medium">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                <input type={showPass ? 'text' : 'password'} id="signup-password" value={password}
                  onChange={(e) => setPassword(e.target.value)} placeholder="Min. 6 characters"
                  className="input-field pl-9 pr-10" required />
                <button type="button" onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60">
                  {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {error && (
              <p className="text-xs text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">{error}</p>
            )}

            <button type="submit" disabled={loading}
              className="btn-primary w-full justify-center py-3.5 mt-2 disabled:opacity-60 disabled:cursor-not-allowed">
              {loading ? (
                <span className="flex items-center gap-2"><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Creating account...</span>
              ) : (
                <span className="flex items-center gap-2"><Zap className="w-4 h-4" /> Create Free Account</span>
              )}
            </button>
          </form>

          <div className="mt-5 p-3 rounded-xl bg-blue-500/10 border border-blue-500/20">
            <p className="text-xs text-blue-400 text-center">
              <span className="font-semibold">Demo mode:</span> any credentials work — no real account created
            </p>
          </div>

          <p className="text-center text-xs text-white/30 mt-5">
            Already have an account?{' '}
            <Link href="/sign-in" className="text-blue-400 hover:text-blue-300 transition-colors">Sign in</Link>
          </p>
        </div>

        <p className="text-center text-xs text-white/20 mt-4">
          <Link href="/" className="hover:text-white/40 transition-colors flex items-center justify-center gap-1">
            <ArrowRight className="w-3 h-3 rotate-180" /> Back to homepage
          </Link>
        </p>
      </div>
    </div>
  );
}
