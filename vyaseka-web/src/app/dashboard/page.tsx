'use client';
import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Navbar } from '@/components/Navbar';
import { File, Clock, CheckCircle2, AlertCircle, Loader2, Download, Zap, Plus, Brain, BarChart3, Trash2 } from 'lucide-react';

interface Transcript {
  id: string;
  fileName: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  duration: number;
  language: string;
  createdAt: string;
}

const STATUS_CFG = {
  pending:    { icon: Clock,       color: 'text-yellow-400', bg: 'bg-yellow-500/10', label: 'Pending'    },
  processing: { icon: Loader2,     color: 'text-blue-400',   bg: 'bg-blue-500/10',   label: 'Processing' },
  completed:  { icon: CheckCircle2, color: 'text-green-400',  bg: 'bg-green-500/10',  label: 'Completed'  },
  failed:     { icon: AlertCircle, color: 'text-red-400',    bg: 'bg-red-500/10',    label: 'Failed'     },
};

const MOCK_DATA: Transcript[] = [
  { id: '1', fileName: 'podcast_ep23.mp3',  status: 'completed',  duration: 3240, language: 'English',       createdAt: '2024-01-15T10:00:00Z' },
  { id: '2', fileName: 'client_call.mp4',   status: 'completed',  duration: 1820, language: 'Hindi',         createdAt: '2024-01-14T08:30:00Z' },
  { id: '3', fileName: 'lecture_notes.wav', status: 'processing', duration: 0,    language: '—',             createdAt: '2024-01-13T14:20:00Z' },
  { id: '4', fileName: 'meeting_rec.m4a',   status: 'completed',  duration: 2100, language: 'English (IN)',  createdAt: '2024-01-12T11:00:00Z' },
];

function fmt(secs: number) {
  if (!secs) return '—';
  const h = Math.floor(secs / 3600);
  const m = Math.floor((secs % 3600) / 60);
  return h > 0 ? `${h}h ${m}m` : `${m}m ${Math.floor(secs % 60)}s`;
}

const ICON_COLOR: Record<string, string> = {
  blue:    'text-blue-400 bg-blue-500/10 border-blue-500/20',
  emerald: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
  purple:  'text-purple-400 bg-purple-500/10 border-purple-500/20',
  orange:  'text-orange-400 bg-orange-500/10 border-orange-500/20',
};

export default function DashboardPage() {
  const { isLoaded, isSignedIn, user } = useAuth();
  const router = useRouter();
  const [transcripts, setTranscripts] = useState<Transcript[]>(MOCK_DATA);

  useEffect(() => {
    if (isLoaded && !isSignedIn) router.push('/sign-in');
  }, [isLoaded, isSignedIn, router]);

  if (!isLoaded || !isSignedIn) return null;

  const completed = transcripts.filter((t) => t.status === 'completed');
  const totalSecs  = completed.reduce((a, t) => a + t.duration, 0);

  const stats = [
    { label: 'Total Files',     value: transcripts.length,         icon: File,         color: 'blue'    },
    { label: 'Completed',       value: completed.length,           icon: CheckCircle2, color: 'emerald' },
    { label: 'Free Mins Left',  value: `${user?.freeMinutesLeft ?? 5}m`, icon: Zap,   color: 'purple'  },
    { label: 'Total Processed', value: fmt(totalSecs),             icon: Brain,        color: 'orange'  },
  ];

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-[#050508] pt-28 pb-20 px-4 sm:px-6 relative">
        <div className="fixed inset-0 bg-grid pointer-events-none opacity-50" />
        <div className="max-w-6xl mx-auto relative z-10">

          {/* Header */}
          <div className="flex items-center justify-between mb-10">
            <div>
              <h1 className="text-3xl font-black text-white mb-1">Welcome back, {user?.firstName} 👋</h1>
              <p className="text-white/40 text-sm">{user?.email}</p>
            </div>
            <Link href="/upload" className="btn-primary">
              <Plus className="w-4 h-4" /> New Transcript
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {stats.map(({ label, value, icon: Icon, color }) => (
              <div key={label} className="p-5 rounded-2xl border border-white/8 bg-white/3">
                <div className={`w-10 h-10 rounded-xl border flex items-center justify-center mb-4 ${ICON_COLOR[color]}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div className="text-2xl font-black text-white mb-0.5">{value}</div>
                <div className="text-xs text-white/40 font-medium">{label}</div>
              </div>
            ))}
          </div>

          {/* Free minutes bar */}
          <div className="p-5 rounded-2xl glass border border-blue-500/20 mb-8">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-blue-400" />
                <span className="text-sm font-semibold text-white">Free Tier Usage</span>
              </div>
              <Link href="/#pricing" className="text-xs text-blue-400 hover:text-blue-300 transition-colors">Upgrade →</Link>
            </div>
            <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-blue-600 to-purple-500 rounded-full"
                style={{ width: `${((user?.freeMinutesLeft ?? 5) / 5) * 100}%` }} />
            </div>
            <p className="text-xs text-white/30 mt-2">{user?.freeMinutesLeft ?? 5} of 5 free minutes remaining</p>
          </div>

          {/* Transcripts table */}
          <div className="rounded-2xl border border-white/8 overflow-hidden">
            <div className="flex items-center justify-between p-5 border-b border-white/8">
              <h2 className="font-bold text-white">Your Transcripts</h2>
              <div className="flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-white/30" />
                <span className="text-xs text-white/30">{transcripts.length} total</span>
              </div>
            </div>
            {transcripts.length === 0 ? (
              <div className="py-20 text-center">
                <File className="w-10 h-10 text-white/20 mx-auto mb-3" />
                <p className="text-white/40 text-sm">No transcripts yet</p>
                <Link href="/upload" className="btn-primary mt-4 inline-flex"><Plus className="w-4 h-4" /> Upload your first file</Link>
              </div>
            ) : (
              <div className="divide-y divide-white/5">
                {transcripts.map((t) => {
                  const cfg = STATUS_CFG[t.status];
                  const Icon = cfg.icon;
                  return (
                    <div key={t.id} className="flex items-center gap-4 p-5 hover:bg-white/2 transition-colors group">
                      <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/8 flex items-center justify-center flex-shrink-0">
                        <File className="w-5 h-5 text-white/40" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-white text-sm truncate">{t.fileName}</p>
                        <p className="text-xs text-white/30 mt-0.5">
                          {new Date(t.createdAt).toLocaleDateString('en-IN')} · {t.language} · {fmt(t.duration)}
                        </p>
                      </div>
                      <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${cfg.bg} ${cfg.color}`}>
                        <Icon className={`w-3.5 h-3.5 ${t.status === 'processing' ? 'animate-spin' : ''}`} />
                        {cfg.label}
                      </div>
                      <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        {t.status === 'completed' && (
                          <button className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 hover:bg-blue-500/20 transition-colors">
                            <Download className="w-4 h-4" />
                          </button>
                        )}
                        <button onClick={() => setTranscripts((prev) => prev.filter((x) => x.id !== t.id))}
                          className="w-8 h-8 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400 hover:bg-red-500/20 transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
