import React, { useState } from 'react';
import { 
  Globe, 
  Search, 
  ShieldCheck, 
  AlertTriangle, 
  Sparkles, 
  Lock, 
  ExternalLink,
  Shield, 
  CheckCircle2,
  AlertCircle,
  EyeOff,
  Cpu
} from 'lucide-react';
import { api } from '../services/api';
import { ScanResponse } from '../types/intelligence';

interface UrlScannerProps {
  onScanComplete: (report: ScanResponse) => void;
  initialUrl?: string;
}

export const UrlScanner: React.FC<UrlScannerProps> = ({ onScanComplete, initialUrl = '' }) => {
  const [url, setUrl] = useState(initialUrl);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sampleUrls = [
    { label: 'Bank Impersonation (.xyz)', url: 'http://sbi-kyc-update.xyz/verify' },
    { label: 'Postal Phishing (.top)', url: 'http://indiapost-redelivery.top/address' },
    { label: 'Suspicious Shortener', url: 'https://bit.ly/secure-banking-login' },
    { label: 'Raw IP Host Link', url: 'http://192.168.1.100/account/login.php' },
    { label: 'Official Genuine Domain', url: 'https://www.onlinesbi.sbi' },
  ];

  const handleScan = async (targetUrl?: string) => {
    const inputUrl = targetUrl !== undefined ? targetUrl : url;
    if (!inputUrl.trim()) {
      setError('Please enter a URL to analyze.');
      return;
    }

    setError(null);
    setLoading(true);

    try {
      const report = await api.scanUrl(inputUrl);
      onScanComplete(report);
    } catch (err: any) {
      setError(err.message || 'Failed to complete URL analysis.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8 py-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="border-b border-slate-800 pb-4">
        <div className="flex items-center space-x-2">
          <Globe className="w-5 h-5 text-cyan-400" />
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            URL Threat Intelligence
          </h1>
        </div>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Forensic offline structural inspection of suspicious hyperlinks, lookalike domains, punycode attacks, and brand impersonation.
        </p>
      </div>

      {/* Security Guarantee Banner */}
      <div className="p-4 rounded-xl bg-cyan-950/20 border border-cyan-500/30 flex items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <div className="w-9 h-9 rounded-lg bg-cyan-600/20 text-cyan-300 border border-cyan-500/30 flex items-center justify-center shrink-0">
            <EyeOff className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-cyan-300 uppercase tracking-wider">Air-Gapped Structural Inspection</h4>
            <p className="text-xs text-slate-300">
              Links are <strong>NEVER visited or fetched over the network</strong>. You are completely protected from drive-by downloads or tracking beacons.
            </p>
          </div>
        </div>
        <span className="hidden sm:inline-block px-2.5 py-1 rounded bg-slate-900 text-cyan-400 border border-cyan-500/30 font-mono text-[11px] shrink-0">
          ZERO-NETWORK SANDBOX
        </span>
      </div>

      {/* Sample Links */}
      <div className="glass-panel p-4 rounded-xl border border-slate-800 space-y-2.5">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center space-x-1.5">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>Preset Target Links</span>
          </span>
          <span className="text-[11px] font-mono text-slate-500">1-click test</span>
        </div>

        <div className="flex flex-wrap gap-2">
          {sampleUrls.map((item, idx) => (
            <button
              key={idx}
              onClick={() => {
                setUrl(item.url);
                setError(null);
              }}
              className="px-3 py-1.5 rounded-lg text-xs font-medium bg-navy-950 hover:bg-slate-800 text-slate-300 border border-slate-800 hover:border-cyan-500/50 transition-all active:scale-95 text-left"
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* URL Input Form */}
      <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-4">
        <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">
          Target Link / URL
        </label>
        
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Globe className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              value={url}
              onChange={(e) => {
                setUrl(e.target.value);
                if (error) setError(null);
              }}
              placeholder="Enter suspicious link... e.g. http://sbi-kyc-update.xyz or bit.ly/reactivate"
              className="w-full bg-navy-950 text-slate-100 rounded-xl pl-10 pr-4 py-3 border border-slate-800 focus:outline-none focus:border-cyan-500 font-mono text-xs sm:text-sm"
            />
          </div>

          <button
            onClick={() => handleScan()}
            disabled={loading || !url.trim()}
            className="flex items-center justify-center space-x-2 px-6 py-3 rounded-xl font-semibold text-xs bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white shadow-md shadow-cyan-600/30 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed active:scale-95 shrink-0"
          >
            {loading ? (
              <>
                <Cpu className="w-4 h-4 animate-spin" />
                <span>Analysing Structure...</span>
              </>
            ) : (
              <>
                <Search className="w-4 h-4" />
                <span>Inspect URL</span>
              </>
            )}
          </button>
        </div>

        {error && (
          <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center space-x-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}
      </div>

      {/* The 14 Checks Breakdown Information */}
      <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-4">
        <h3 className="text-sm font-bold text-white flex items-center space-x-2">
          <Shield className="w-4 h-4 text-violet-400" />
          <span>ZenVex 14-Point Structural Inspection Matrix</span>
        </h3>
        <p className="text-xs text-slate-400 leading-relaxed">
          The offline engine inspects URLs against 14 structural heuristics to uncover attacker intent without exposing the client to malware:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-xs">
          <div className="p-3 rounded-xl bg-navy-950 border border-slate-800 space-y-1">
            <span className="font-semibold text-slate-200">1. Raw IP Host Address</span>
            <p className="text-[11px] text-slate-400">Flags numeric IPs (e.g. 192.168.x.x) used to evade domain take-downs.</p>
          </div>
          <div className="p-3 rounded-xl bg-navy-950 border border-slate-800 space-y-1">
            <span className="font-semibold text-slate-200">2. Embedded @ Symbol</span>
            <p className="text-[11px] text-slate-400">Detects browser destination masking tricks.</p>
          </div>
          <div className="p-3 rounded-xl bg-navy-950 border border-slate-800 space-y-1">
            <span className="font-semibold text-slate-200">3. Punycode Characters</span>
            <p className="text-[11px] text-slate-400">Catches Cyrillic/homograph look-alike characters (xn--).</p>
          </div>
          <div className="p-3 rounded-xl bg-navy-950 border border-slate-800 space-y-1">
            <span className="font-semibold text-slate-200">4. URL Shorteners</span>
            <p className="text-[11px] text-slate-400">Identifies bit.ly, tinyurl, t.co concealing actual destinations.</p>
          </div>
          <div className="p-3 rounded-xl bg-navy-950 border border-slate-800 space-y-1">
            <span className="font-semibold text-slate-200">5. High-Risk Abuse TLDs</span>
            <p className="text-[11px] text-slate-400">Flags low-cost domains (.xyz, .top, .cfd, .buzz, .icu).</p>
          </div>
          <div className="p-3 rounded-xl bg-navy-950 border border-slate-800 space-y-1">
            <span className="font-semibold text-slate-200">6. Brand Impersonation</span>
            <p className="text-[11px] text-slate-400">Checks SBI, HDFC, ICICI, India Post, Amazon allowlists.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
