'use client';
import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Navbar } from '@/components/Navbar';
import {
  Upload, File, X, CheckCircle2, Clock, AlertCircle,
  Download, Brain, Mic2, Zap, Lock
} from 'lucide-react';

type TranscriptStatus = 'idle' | 'uploading' | 'processing' | 'done' | 'error' | 'paywall';

// ── Mock transcription (no OpenAI keys needed) ───────────────────────
const MOCK_LINES = [
  "[00:00:00] Welcome. Today we'll be walking through the quarterly roadmap and key product initiatives.",
  "[00:00:08] Our focus areas remain: user growth, international expansion, and AI-powered features.",
  "[00:00:17] Transcription accuracy is currently at 97.3% across twelve supported languages.",
  "[00:00:25] We expect to onboard our first enterprise client by end of Q3.",
  "[00:00:33] The engineering team has completed the Whisper integration and is moving to speaker detection.",
  "[00:00:41] Marketing will launch the creator campaign next Tuesday across Instagram and LinkedIn.",
  "[00:00:50] Any questions on the roadmap before we move to financials?",
];

function generateMockTranscript(filename: string) {
  return {
    text: MOCK_LINES.join('\n'),
    duration: 187, // ~3 minutes
    language: 'English (India)',
    timestamps: MOCK_LINES.map((line, i) => ({
      start: i * 8,
      end: (i + 1) * 8,
      text: line.replace(/\[\d{2}:\d{2}:\d{2}\] /, ''),
    })),
  };
}

function formatDuration(secs: number) {
  const m = Math.floor(secs / 60);
  const s = Math.floor(secs % 60);
  return `${m}:${s.toString().padStart(2, '0')}`;
}

export default function UploadPage() {
  const { isSignedIn, isLoaded, user } = useAuth();
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<TranscriptStatus>('idle');
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState<ReturnType<typeof generateMockTranscript> | null>(null);
  const [error, setError] = useState('');

  const freeMinutesLeft = user?.freeMinutesLeft ?? 5;

  const onDrop = useCallback((accepted: File[]) => {
    if (accepted.length > 0) {
      setFile(accepted[0]);
      setStatus('idle');
      setResult(null);
      setError('');
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'audio/*': ['.mp3', '.wav', '.m4a', '.ogg', '.flac', '.aac'],
      'video/*': ['.mp4', '.mov', '.avi', '.mkv', '.webm'],
    },
    maxSize: 500 * 1024 * 1024,
    multiple: false,
  });

  const handleTranscribe = async () => {
    if (!file) return;
    if (!isSignedIn) { router.push('/sign-in'); return; }
    if (freeMinutesLeft <= 0) { setStatus('paywall'); return; }

    setStatus('uploading');
    setProgress(0);

    // Simulate upload progress
    const interval = setInterval(() => {
      setProgress((p) => { if (p >= 70) { clearInterval(interval); return 70; } return p + 10; });
    }, 200);

    await new Promise((r) => setTimeout(r, 1800));
    clearInterval(interval);
    setProgress(85);
    setStatus('processing');

    await new Promise((r) => setTimeout(r, 1400));
    setProgress(100);

    // Use mock transcription (swap this for real API call when keys are ready)
    setResult(generateMockTranscript(file.name));
    setStatus('done');
  };

  const handleDownload = (format: 'txt' | 'srt') => {
    if (!result) return;
    let content = '';
    if (format === 'txt') {
      content = result.text;
    } else {
      content = result.timestamps
        .map((t, i) => {
          const fmt = (s: number) => new Date(s * 1000).toISOString().slice(11, 23).replace('.', ',');
          return `${i + 1}\n${fmt(t.start)} --> ${fmt(t.end)}\n${t.text}\n`;
        }).join('\n');
    }
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${file?.name.replace(/\.[^.]+$/, '') ?? 'transcript'}.${format}`;
    a.click();
    URL.revokeObjectURL(url);
  };

  if (!isLoaded) return null;

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-[#050508] pt-28 pb-20 px-4 sm:px-6 relative">
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          <div className="orb w-96 h-96 bg-blue-600/10 top-0 left-0" />
          <div className="orb w-80 h-80 bg-purple-600/8 bottom-0 right-0" />
        </div>
        <div className="fixed inset-0 bg-grid pointer-events-none" />

        <div className="max-w-3xl mx-auto relative z-10">
          {/* Header */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-sm text-blue-400 font-medium mb-4">
              <Mic2 className="w-3.5 h-3.5" /> Upload Workspace
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-white mb-3">Transcribe Your Audio</h1>
            <p className="text-white/40 text-lg">First 5 minutes are free. No credit card required.</p>
          </div>

          {/* Free minutes bar */}
          {isSignedIn && (
            <div className="mb-6 p-4 rounded-2xl glass border border-white/8">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-blue-400" />
                  <span className="text-sm font-medium text-white">Free Minutes</span>
                </div>
                <span className="text-sm font-bold text-blue-400">{freeMinutesLeft} min remaining</span>
              </div>
              <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-blue-600 to-blue-400 rounded-full transition-all duration-500"
                  style={{ width: `${(freeMinutesLeft / 5) * 100}%` }} />
              </div>
            </div>
          )}

          {/* Auth gate */}
          {!isSignedIn ? (
            <div className="p-10 rounded-2xl glass border border-white/10 text-center">
              <Lock className="w-10 h-10 text-blue-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Sign in to transcribe</h3>
              <p className="text-white/40 text-sm mb-6">Create a free account to get 5 free minutes.</p>
              <div className="flex gap-3 justify-center">
                <Link href="/sign-in" className="btn-secondary px-6 py-3">Sign In</Link>
                <Link href="/sign-up" className="btn-primary px-6 py-3"><Zap className="w-4 h-4" /> Start Free</Link>
              </div>
            </div>
          ) : (
            <>
              {/* Dropzone */}
              <div {...getRootProps()} className={`mb-6 p-10 rounded-2xl border-2 border-dashed transition-all duration-200 cursor-pointer text-center ${
                isDragActive ? 'border-blue-500 bg-blue-500/10' :
                file ? 'border-blue-500/40 bg-blue-500/5' :
                'border-white/10 hover:border-blue-500/30 hover:bg-white/3'}`}>
                <input {...getInputProps()} />
                {file ? (
                  <div className="flex flex-col items-center gap-3">
                    <div className="w-14 h-14 rounded-2xl bg-blue-500/15 border border-blue-500/30 flex items-center justify-center">
                      <File className="w-7 h-7 text-blue-400" />
                    </div>
                    <div>
                      <p className="text-white font-semibold">{file.name}</p>
                      <p className="text-white/40 text-sm">{(file.size / 1024 / 1024).toFixed(1)} MB</p>
                    </div>
                    <button onClick={(e) => { e.stopPropagation(); setFile(null); setStatus('idle'); }}
                      className="flex items-center gap-1 text-xs text-white/30 hover:text-white/60 transition-colors">
                      <X className="w-3 h-3" /> Remove
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-4">
                    <div className="w-16 h-16 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
                      <Upload className="w-8 h-8 text-blue-400" />
                    </div>
                    <div>
                      <p className="text-white font-semibold text-lg mb-1">
                        {isDragActive ? 'Drop it here!' : 'Drag & drop your file'}
                      </p>
                      <p className="text-white/40 text-sm">or click to browse · MP3, MP4, WAV, M4A and more</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Transcribe button */}
              {file && status === 'idle' && (
                <button onClick={handleTranscribe} className="btn-primary w-full justify-center py-4 text-base rounded-2xl mb-6">
                  <Brain className="w-5 h-5" /> Transcribe Now
                </button>
              )}

              {/* Progress */}
              {(status === 'uploading' || status === 'processing') && (
                <div className="p-6 rounded-2xl glass border border-white/10 mb-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-9 h-9 rounded-xl bg-blue-500/15 flex items-center justify-center">
                      <Brain className="w-5 h-5 text-blue-400 animate-pulse" />
                    </div>
                    <div>
                      <p className="font-semibold text-white text-sm">
                        {status === 'uploading' ? 'Uploading your file...' : 'AI is transcribing...'}
                      </p>
                      <p className="text-xs text-white/40">
                        {status === 'uploading' ? 'Securely transferring to our servers' : 'Whisper AI is generating your transcript'}
                      </p>
                    </div>
                  </div>
                  <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-blue-600 to-purple-500 rounded-full transition-all duration-300"
                      style={{ width: `${progress}%` }} />
                  </div>
                  <p className="text-xs text-white/30 mt-2 text-right">{Math.round(progress)}%</p>
                </div>
              )}

              {/* Result */}
              {status === 'done' && result && (
                <div className="rounded-2xl border border-white/10 overflow-hidden mb-6">
                  <div className="flex items-center justify-between p-5 border-b border-white/8 bg-green-500/5">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-400" />
                      <span className="font-semibold text-white">Transcription Complete</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-white/40"><Clock className="w-3 h-3 inline mr-1" />{formatDuration(result.duration)}</span>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/20">{result.language}</span>
                    </div>
                  </div>
                  <div className="p-5 max-h-72 overflow-y-auto bg-black/30">
                    <p className="text-sm text-white/70 leading-relaxed whitespace-pre-wrap font-mono">{result.text}</p>
                  </div>
                  <div className="p-5 border-t border-white/8 flex flex-wrap gap-3">
                    <button onClick={() => handleDownload('txt')} className="btn-primary py-2.5 text-sm flex-1">
                      <Download className="w-4 h-4" /> Download TXT
                    </button>
                    <button onClick={() => handleDownload('srt')} className="btn-secondary py-2.5 text-sm flex-1">
                      <Download className="w-4 h-4" /> Download SRT
                    </button>
                  </div>
                </div>
              )}

              {/* Paywall */}
              {status === 'paywall' && (
                <div className="p-8 rounded-2xl border border-yellow-500/30 bg-yellow-500/5 text-center">
                  <Lock className="w-10 h-10 text-yellow-400 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-white mb-2">Free limit reached</h3>
                  <p className="text-white/50 text-sm mb-6">You've used your 5 free minutes. Upgrade to continue.</p>
                  <Link href="/#pricing" className="btn-primary justify-center py-3 inline-flex">
                    <Zap className="w-4 h-4" /> View Plans — from ₹799/mo
                  </Link>
                </div>
              )}

              {/* Error */}
              {status === 'error' && (
                <div className="p-5 rounded-2xl border border-red-500/30 bg-red-500/5 flex items-center gap-3">
                  <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-white">Transcription failed</p>
                    <p className="text-xs text-white/40 mt-0.5">{error}</p>
                  </div>
                  <button onClick={() => setStatus('idle')} className="ml-auto text-xs text-white/40 hover:text-white">Retry</button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
}
