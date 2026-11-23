import React, { useState, useEffect } from 'react';
import { 
  Terminal, 
  Send, 
  Sparkles, 
  AlertCircle, 
  Globe, 
  ShieldAlert, 
  MessageSquare, 
  Mail, 
  Smartphone, 
  CheckCircle,
  Copy,
  Trash2,
  Cpu
} from 'lucide-react';
import { api } from '../services/api';
import { Example, ScanResponse } from '../types/intelligence';

interface MessageScannerProps {
  onScanComplete: (report: ScanResponse) => void;
  initialText?: string;
}

export const MessageScanner: React.FC<MessageScannerProps> = ({ onScanComplete, initialText = '' }) => {
  const [text, setText] = useState(initialText);
  const [examples, setExamples] = useState<Example[]>([]);
  const [channel, setChannel] = useState<'sms' | 'whatsapp' | 'email' | 'telegram'>('sms');
  const [loading, setLoading] = useState(false);
  const [scanStep, setScanStep] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (initialText) {
      setText(initialText);
    }
  }, [initialText]);

  useEffect(() => {
    api.getExamples().then((data) => {
      setExamples(data);
    });
  }, []);

  const handleScan = async (overrideText?: string) => {
    const targetText = overrideText !== undefined ? overrideText : text;
    if (!targetText.trim()) {
      setError('Please paste or type a message before scanning.');
      return;
    }

    setError(null);
    setLoading(true);

    try {
      // Animated telemetry feedback
      setScanStep('Normalising text & detecting script...');
      await new Promise(r => setTimeout(r, 200));

      setScanStep('Executing 12-indicator rule engine & URL extraction...');
      await new Promise(r => setTimeout(r, 250));

      setScanStep('Correlating against 9 Indian scam playbooks...');
      const report = await api.scanText(targetText);

      setScanStep('Finalising forensic dossier...');
      await new Promise(r => setTimeout(r, 150));

      onScanComplete(report);
    } catch (err: any) {
      setError(err.message || 'Failed to complete message scan. Please check backend status.');
    } finally {
      setLoading(false);
      setScanStep('');
    }
  };

  const handleExampleClick = (exText: string) => {
    setText(exText);
    setError(null);
  };

  const handleClear = () => {
    setText('');
    setError(null);
  };

  return (
    <div className="space-y-8 py-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="border-b border-slate-800 pb-4">
        <div className="flex items-center space-x-2">
          <Terminal className="w-5 h-5 text-violet-400" />
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Message Threat Scanner
          </h1>
        </div>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Analyze suspicious SMS messages, WhatsApp chats, emails, or social media text across English, Telugu, Hindi, and Romanised languages.
        </p>
      </div>

      {/* Preset Test Scenarios */}
      <div className="glass-panel p-4 rounded-xl border border-slate-800 space-y-2.5">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center space-x-1.5">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>Demonstration Scenarios</span>
          </span>
          <span className="text-[11px] font-mono text-slate-500">1-click test input</span>
        </div>

        <div className="flex flex-wrap gap-2">
          {examples.map((ex) => (
            <button
              key={ex.id}
              onClick={() => handleExampleClick(ex.text)}
              className="px-3 py-1.5 rounded-lg text-xs font-medium bg-navy-950 hover:bg-slate-800 text-slate-300 border border-slate-800 hover:border-violet-500/50 transition-all active:scale-95 text-left"
            >
              {ex.title}
            </button>
          ))}
        </div>
      </div>

      {/* Input Console */}
      <div className="glass-panel rounded-2xl border border-slate-800 overflow-hidden space-y-0">
        {/* Input channel tabs */}
        <div className="flex border-b border-slate-800 bg-navy-900/70 px-4 py-2 space-x-2">
          <button
            onClick={() => setChannel('sms')}
            className={`flex items-center space-x-1.5 px-3 py-1 rounded-md text-xs font-medium transition-colors ${
              channel === 'sms' ? 'bg-violet-600/20 text-violet-300 border border-violet-500/30' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>SMS Message</span>
          </button>
          <button
            onClick={() => setChannel('whatsapp')}
            className={`flex items-center space-x-1.5 px-3 py-1 rounded-md text-xs font-medium transition-colors ${
              channel === 'whatsapp' ? 'bg-violet-600/20 text-violet-300 border border-violet-500/30' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>WhatsApp / Chat</span>
          </button>
          <button
            onClick={() => setChannel('email')}
            className={`flex items-center space-x-1.5 px-3 py-1 rounded-md text-xs font-medium transition-colors ${
              channel === 'email' ? 'bg-violet-600/20 text-violet-300 border border-violet-500/30' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Mail className="w-3.5 h-3.5" />
            <span>Suspicious Email</span>
          </button>
        </div>

        {/* Textarea */}
        <div className="p-4 sm:p-6 space-y-4">
          <div className="relative">
            <textarea
              rows={7}
              value={text}
              onChange={(e) => {
                setText(e.target.value);
                if (error) setError(null);
              }}
              placeholder="Paste the suspicious message content here... E.g. 'Dear Customer, your bank account will be blocked today due to pending KYC. Update immediately: http://...'"
              className="w-full bg-navy-950 text-slate-100 rounded-xl p-4 border border-slate-800 focus:outline-none focus:border-violet-500 font-mono text-sm leading-relaxed placeholder-slate-600 resize-y"
            />
            {text && (
              <button
                onClick={handleClear}
                className="absolute right-3 top-3 p-1.5 rounded-md bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-slate-200 transition-colors"
                title="Clear input"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Action and counter bar */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center space-x-4 text-xs font-mono text-slate-500">
              <span>{text.length} / 5,000 characters</span>
              <span>•</span>
              <span className="flex items-center space-x-1 text-emerald-400">
                <Globe className="w-3 h-3" />
                <span>Auto-Detects English, Telugu, Hindi & Romanised</span>
              </span>
            </div>

            <button
              onClick={() => handleScan()}
              disabled={loading || !text.trim()}
              className="w-full sm:w-auto flex items-center justify-center space-x-2 px-6 py-2.5 rounded-xl font-semibold text-xs bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white shadow-md shadow-violet-600/30 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed active:scale-95"
            >
              {loading ? (
                <>
                  <Cpu className="w-4 h-4 animate-spin text-cyan-300" />
                  <span>{scanStep || 'Analysing...'}</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Execute Threat Analysis</span>
                </>
              )}
            </button>
          </div>

          {/* Error Message */}
          {error && (
            <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center space-x-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}
        </div>
      </div>

      {/* Safety & Architecture Note */}
      <div className="p-4 rounded-xl bg-navy-900 border border-slate-800/80 flex items-start space-x-3 text-xs text-slate-400">
        <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <span className="font-semibold text-slate-300">Privacy & Stateless Isolation</span>
          <p className="leading-relaxed">
            Content is analyzed entirely in-memory using deterministic rule matching and offline structural parsing. Messages are never stored in databases, written to disk, or used for model training.
          </p>
        </div>
      </div>
    </div>
  );
};
