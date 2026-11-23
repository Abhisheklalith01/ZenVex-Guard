import React from 'react';
import { 
  Shield, 
  Terminal, 
  Globe, 
  CheckCircle, 
  AlertTriangle, 
  Lock, 
  Zap, 
  Activity, 
  Layers, 
  ArrowRight,
  EyeOff,
  Cpu,
  FileCheck2,
  Database
} from 'lucide-react';

interface LandingPageProps {
  onStartScan: () => void;
  onExploreDashboard: () => void;
  onOpenUrlScanner: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onStartScan,
  onExploreDashboard,
  onOpenUrlScanner
}) => {
  return (
    <div className="space-y-24 py-8">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-8 pb-12 sm:pt-16 sm:pb-20">
        {/* Glow ambient backgrounds */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-gradient-to-tr from-violet-600/20 to-cyan-500/20 rounded-full blur-3xl pointer-events-none -z-10" />
        <div className="absolute top-1/2 right-10 w-[300px] h-[300px] bg-violet-600/10 rounded-full blur-2xl pointer-events-none -z-10" />

        <div className="max-w-5xl mx-auto text-center px-4 sm:px-6">
          {/* Eyebrow badge */}
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-slate-800/80 border border-slate-700/80 text-xs font-medium text-slate-300 mb-6 backdrop-blur-sm">
            <span className="flex h-2 w-2 rounded-full bg-cyan-400 animate-pulse"></span>
            <span className="text-cyan-300 font-semibold uppercase tracking-wider text-[11px]">Next-Gen Scam Intelligence</span>
            <span className="text-slate-500">•</span>
            <span>Multilingual Threat Engine</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-[1.15]">
            Your First Line of Defence Against{' '}
            <span className="bg-gradient-to-r from-violet-400 via-cyan-300 to-indigo-300 bg-clip-text text-transparent">
              Digital Deception.
            </span>
          </h1>

          {/* Subtitle */}
          <p className="mt-6 text-lg sm:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
            ZenVex Guard uses intelligent threat analysis to identify suspicious messages, malicious URLs, and emerging digital scam patterns — helping users make safer decisions.
          </p>

          {/* CTAs */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={onStartScan}
              className="w-full sm:w-auto flex items-center justify-center space-x-3 px-8 py-3.5 rounded-xl font-semibold text-sm bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white shadow-lg shadow-violet-600/30 transition-all duration-200 active:scale-95 group"
            >
              <Terminal className="w-4 h-4 text-cyan-300" />
              <span>Start Threat Analysis</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={onExploreDashboard}
              className="w-full sm:w-auto flex items-center justify-center space-x-2 px-8 py-3.5 rounded-xl font-semibold text-sm bg-navy-850 hover:bg-slate-800 text-slate-200 border border-slate-700/80 transition-all duration-200 active:scale-95"
            >
              <Activity className="w-4 h-4 text-violet-400" />
              <span>Explore Command Centre</span>
            </button>
          </div>

          {/* Interactive Visualisation Card */}
          <div className="mt-16 text-left glass-panel rounded-2xl p-6 sm:p-8 border border-slate-800/80 shadow-2xl relative overflow-hidden">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-6">
              <div className="flex items-center space-x-3">
                <div className="flex space-x-1.5">
                  <div className="w-3 h-3 rounded-full bg-rose-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-amber-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80"></div>
                </div>
                <span className="text-xs font-mono text-slate-400">zenvex-intelligence-stream // live telemetry</span>
              </div>
              <div className="flex items-center space-x-2 text-xs font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                <span>STATELESS INSPECTION</span>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Sample Suspicious Input */}
              <div className="p-4 rounded-xl bg-navy-950 border border-slate-800/80 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Sample Inbound Threat</span>
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-rose-500/20 text-rose-300 border border-rose-500/30">SMS Impersonation</span>
                </div>
                <div className="text-sm font-mono text-slate-300 bg-navy-900 p-3 rounded-lg border border-slate-800/90 leading-relaxed">
                  "Dear Customer, your bank account will be <span className="bg-rose-500/25 text-rose-300 px-1 rounded font-semibold">blocked today</span> due to incomplete KYC. Update immediately: <span className="bg-amber-500/25 text-amber-300 underline font-semibold">http://sbi-kyc-update.xyz</span>"
                </div>
                <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
                  <span>Detected Script: Latin (EN)</span>
                  <span className="text-cyan-400 font-mono">14 Structural Checks</span>
                </div>
              </div>

              {/* Engine Processing */}
              <div className="p-4 rounded-xl bg-navy-950 border border-slate-800/80 space-y-3 flex flex-col justify-between">
                <div>
                  <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-3">Multi-Layer Threat Evaluation</span>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs p-2 rounded bg-navy-900 border border-slate-800">
                      <span className="text-slate-300">Urgency Induction</span>
                      <span className="text-rose-400 font-mono font-semibold">+12 pts</span>
                    </div>
                    <div className="flex items-center justify-between text-xs p-2 rounded bg-navy-900 border border-slate-800">
                      <span className="text-slate-300">Account Threat / Coercion</span>
                      <span className="text-rose-400 font-mono font-semibold">+20 pts</span>
                    </div>
                    <div className="flex items-center justify-between text-xs p-2 rounded bg-navy-900 border border-slate-800">
                      <span className="text-slate-300">Lookalike Domain (.xyz)</span>
                      <span className="text-amber-400 font-mono font-semibold">+35 pts</span>
                    </div>
                  </div>
                </div>
                <div className="pt-2 text-center text-[11px] text-slate-400 font-mono">
                  Engine Latency: &lt; 28ms • Zero Link Execution
                </div>
              </div>

              {/* Synthesized Output */}
              <div className="p-4 rounded-xl bg-gradient-to-br from-rose-950/40 via-navy-950 to-navy-950 border border-rose-500/30 space-y-3 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-semibold text-rose-300 uppercase tracking-wider">Investigation Result</span>
                    <span className="text-xs font-bold text-rose-400 bg-rose-500/10 px-2 py-0.5 rounded border border-rose-500/30">HIGH RISK</span>
                  </div>
                  <div className="mt-3">
                    <div className="flex items-baseline space-x-2">
                      <span className="text-3xl font-extrabold text-white">82</span>
                      <span className="text-xs text-slate-400 font-mono">/ 100 Evidence Score</span>
                    </div>
                    <p className="mt-2 text-xs text-slate-300 leading-relaxed">
                      Resembles <strong>KYC Account Block Scam</strong>. Exploits bank brand impersonation and artificial deadline pressure to extract banking credentials.
                    </p>
                  </div>
                </div>
                <button
                  onClick={onStartScan}
                  className="w-full text-center py-2 text-xs font-semibold text-cyan-300 bg-cyan-950/60 hover:bg-cyan-900/60 border border-cyan-800/80 rounded-lg transition-colors"
                >
                  Inspect Full Forensic Breakdown →
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Platform Capabilities */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-xs font-semibold text-cyan-400 uppercase tracking-widest">
            Enterprise Architecture
          </h2>
          <p className="mt-2 text-3xl font-bold text-white tracking-tight">
            Built for Real-World Deception Vectors
          </p>
          <p className="mt-4 text-sm text-slate-400">
            Engineered specifically to counter Indian cybercrime tactics, high-speed UPI fraud, and multilingual manipulation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Feature 1 */}
          <div className="p-6 rounded-2xl glass-panel border border-slate-800/80 space-y-4 hover:border-violet-500/40 transition-all duration-300">
            <div className="w-12 h-12 rounded-xl bg-violet-600/15 border border-violet-500/30 flex items-center justify-center text-violet-400">
              <Layers className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">Multilingual & Code-Mixed Support</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Scammers often mix English with Romanised Telugu or Hindi (e.g. <em>"Mee account block avutundi"</em>). ZenVex Guard processes native scripts, Romanised transliterations, and hybrid code-switching seamlessly.
            </p>
            <div className="flex flex-wrap gap-1.5 pt-2">
              <span className="text-[11px] px-2 py-0.5 rounded bg-slate-800 text-slate-300">English</span>
              <span className="text-[11px] px-2 py-0.5 rounded bg-slate-800 text-slate-300">Telugu (తెలుగు)</span>
              <span className="text-[11px] px-2 py-0.5 rounded bg-slate-800 text-slate-300">Hindi (हिंदी)</span>
              <span className="text-[11px] px-2 py-0.5 rounded bg-slate-800 text-slate-300">Romanised</span>
            </div>
          </div>

          {/* Feature 2 */}
          <div className="p-6 rounded-2xl glass-panel border border-slate-800/80 space-y-4 hover:border-cyan-500/40 transition-all duration-300">
            <div className="w-12 h-12 rounded-xl bg-cyan-600/15 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
              <Globe className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">14-Point Offline URL Intelligence</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Never visit suspicious links. Our offline structural inspection analyzes lookalike domains, punycode spoofing, IP hosts, suspicious TLDs, and bank impersonation without triggering web requests or alerting attackers.
            </p>
            <button
              onClick={onOpenUrlScanner}
              className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 inline-flex items-center space-x-1"
            >
              <span>Explore URL Inspector</span>
              <span>→</span>
            </button>
          </div>

          {/* Feature 3 */}
          <div className="p-6 rounded-2xl glass-panel border border-slate-800/80 space-y-4 hover:border-violet-500/40 transition-all duration-300">
            <div className="w-12 h-12 rounded-xl bg-indigo-600/15 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
              <Database className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">9 Specialized Indian Scam Playbooks</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Covers India's most devastating fraud archetypes: Digital Arrest, Remote APK theft, UPI QR Collect fraud, Fake Job tasks, SEBI-unregistered trading groups, and Postal redelivery scams with tailored safety actions.
            </p>
            <div className="text-[11px] text-slate-400 font-mono pt-2">
              Integrated with Cybercrime Helpline 1930 & Chakshu
            </div>
          </div>
        </div>
      </section>

      {/* How it Works / Threat Flow */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="glass-panel rounded-2xl p-8 sm:p-12 border border-slate-800/80">
          <div className="text-center max-w-xl mx-auto mb-12">
            <h2 className="text-xs font-semibold text-violet-400 uppercase tracking-widest">
              Execution Pipeline
            </h2>
            <p className="mt-2 text-2xl sm:text-3xl font-bold text-white tracking-tight">
              From Deceptive Inbound to Actionable Defense
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="p-4 rounded-xl bg-navy-950 border border-slate-800 space-y-2">
              <div className="text-xs font-mono font-bold text-cyan-400">STAGE 01</div>
              <h4 className="font-semibold text-white text-sm">Input & Language Detection</h4>
              <p className="text-xs text-slate-400">
                Identifies script, transliteration, and code-mixing across English, Telugu, Hindi, or Romanised formats.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-navy-950 border border-slate-800 space-y-2">
              <div className="text-xs font-mono font-bold text-violet-400">STAGE 02</div>
              <h4 className="font-semibold text-white text-sm">Structural Threat Extraction</h4>
              <p className="text-xs text-slate-400">
                Offline URL isolation parses hosts, brands, and TLDs. Rule engine isolates urgency, account threats, and credential hooks.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-navy-950 border border-slate-800 space-y-2">
              <div className="text-xs font-mono font-bold text-indigo-400">STAGE 03</div>
              <h4 className="font-semibold text-white text-sm">Playbook Pattern Correlation</h4>
              <p className="text-xs text-slate-400">
                Matches the evidence signature against 9 named Indian fraud playbooks and evaluates risk band.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-navy-950 border border-slate-800 space-y-2">
              <div className="text-xs font-mono font-bold text-emerald-400">STAGE 04</div>
              <h4 className="font-semibold text-white text-sm">Explainable Investigation</h4>
              <p className="text-xs text-slate-400">
                Presents highlighted text evidence, attacker manipulation mechanics, safe recovery steps, and 1930 hotlines.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Privacy Guarantees */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="p-8 rounded-2xl bg-gradient-to-r from-violet-950/20 via-navy-900 to-cyan-950/20 border border-slate-800/80 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3">
            <div className="inline-flex items-center space-x-2 text-xs font-semibold text-emerald-400">
              <EyeOff className="w-4 h-4" />
              <span>PRIVACY COMMITMENT</span>
            </div>
            <h3 className="text-xl font-bold text-white">Stateless by Design. We Never Store Your Messages.</h3>
            <p className="text-sm text-slate-400 max-w-xl leading-relaxed">
              ZenVex Guard operates with zero persistent message storage. Everything you submit is analyzed entirely in-memory and discarded immediately upon response generation.
            </p>
          </div>
          <button
            onClick={onStartScan}
            className="shrink-0 px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-sm border border-slate-700 transition-colors"
          >
            Launch Scanner Now
          </button>
        </div>
      </section>
    </div>
  );
};
