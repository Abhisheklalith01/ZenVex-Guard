import React, { useState } from 'react';
import { 
  Lock, 
  ShieldAlert, 
  PhoneCall, 
  ExternalLink, 
  CheckCircle2, 
  AlertTriangle, 
  FileWarning, 
  Key, 
  CreditCard, 
  Smartphone,
  Eye,
  HelpCircle,
  Clock
} from 'lucide-react';

export const ProtectionCentre: React.FC = () => {
  const [selectedEmergency, setSelectedEmergency] = useState<'clicked_link' | 'shared_creds' | 'lost_money'>('lost_money');

  return (
    <div className="space-y-12 py-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="border-b border-slate-800 pb-4">
        <div className="flex items-center space-x-2">
          <Lock className="w-5 h-5 text-violet-400" />
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Protection & Emergency Centre
          </h1>
        </div>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Standardized cybersecurity playbooks, proactive threat hygiene, and immediate financial recovery protocols.
        </p>
      </div>

      {/* Emergency Incident Response Switcher */}
      <div className="p-6 rounded-2xl glass-panel border border-rose-500/40 bg-rose-950/10 space-y-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-rose-500/20 text-rose-400 border border-rose-500/30 flex items-center justify-center shrink-0">
            <ShieldAlert className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white tracking-tight">
              Emergency Incident Response
            </h2>
            <p className="text-xs text-rose-300">
              Immediate containment steps if you have interacted with a fraudulent message or website.
            </p>
          </div>
        </div>

        {/* Emergency Tabs */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          <button
            onClick={() => setSelectedEmergency('lost_money')}
            className={`p-3 rounded-xl text-left border transition-all text-xs font-semibold ${
              selectedEmergency === 'lost_money'
                ? 'bg-rose-500/20 text-white border-rose-500'
                : 'bg-navy-950 text-slate-400 border-slate-800 hover:border-slate-700'
            }`}
          >
            <div className="flex items-center space-x-2">
              <CreditCard className="w-4 h-4 text-rose-400" />
              <span>1. Money Was Deducted</span>
            </div>
          </button>
          <button
            onClick={() => setSelectedEmergency('shared_creds')}
            className={`p-3 rounded-xl text-left border transition-all text-xs font-semibold ${
              selectedEmergency === 'shared_creds'
                ? 'bg-rose-500/20 text-white border-rose-500'
                : 'bg-navy-950 text-slate-400 border-slate-800 hover:border-slate-700'
            }`}
          >
            <div className="flex items-center space-x-2">
              <Key className="w-4 h-4 text-amber-400" />
              <span>2. Shared OTP or PIN</span>
            </div>
          </button>
          <button
            onClick={() => setSelectedEmergency('clicked_link')}
            className={`p-3 rounded-xl text-left border transition-all text-xs font-semibold ${
              selectedEmergency === 'clicked_link'
                ? 'bg-rose-500/20 text-white border-rose-500'
                : 'bg-navy-950 text-slate-400 border-slate-800 hover:border-slate-700'
            }`}
          >
            <div className="flex items-center space-x-2">
              <FileWarning className="w-4 h-4 text-cyan-400" />
              <span>3. Clicked a Link / APK</span>
            </div>
          </button>
        </div>

        {/* Emergency Steps content */}
        <div className="p-5 rounded-xl bg-navy-950 border border-slate-800/80 space-y-4">
          {selectedEmergency === 'lost_money' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold font-mono text-rose-400 uppercase tracking-wider">
                  PRIORITY 1: THE GOLDEN HOUR PROTOCOL
                </span>
                <span className="text-xs text-rose-300 font-mono flex items-center space-x-1">
                  <Clock className="w-3.5 h-3.5" />
                  <span>Act Within 2 Hours</span>
                </span>
              </div>
              <ol className="space-y-3 text-xs text-slate-300">
                <li className="flex items-start space-x-3">
                  <span className="w-5 h-5 rounded-full bg-rose-500/20 text-rose-400 flex items-center justify-center font-bold font-mono shrink-0">1</span>
                  <span><strong>Call 1930 immediately:</strong> The Citizen Financial Cyber Fraud Reporting System operates 24x7. Reporting within the first 2 hours triggers automated freeze requests across interbank nodal accounts.</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="w-5 h-5 rounded-full bg-rose-500/20 text-rose-400 flex items-center justify-center font-bold font-mono shrink-0">2</span>
                  <span><strong>Contact your bank's fraud division:</strong> Report unauthorized debits and request immediate freeze of affected debit/credit cards and net banking accounts.</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="w-5 h-5 rounded-full bg-rose-500/20 text-rose-400 flex items-center justify-center font-bold font-mono shrink-0">3</span>
                  <span><strong>File a formal incident on cybercrime.gov.in:</strong> Preserve transaction IDs, SMS screenshots, UTR numbers, and bank account statements as evidence.</span>
                </li>
              </ol>
            </div>
          )}

          {selectedEmergency === 'shared_creds' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold font-mono text-amber-400 uppercase tracking-wider">
                  CONTAINMENT: COMPROMISED AUTHENTICATION
                </span>
              </div>
              <ol className="space-y-3 text-xs text-slate-300">
                <li className="flex items-start space-x-3">
                  <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold font-mono shrink-0">1</span>
                  <span><strong>Change Passwords Immediately:</strong> Access your net banking from a different trusted device and update your login password, transaction password, and UPI PIN.</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold font-mono shrink-0">2</span>
                  <span><strong>Freeze Debit / Credit Cards:</strong> Use your official banking mobile app to temporarily toggle off online transactions, international transactions, and ATM withdrawals.</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold font-mono shrink-0">3</span>
                  <span><strong>De-link Active UPI Sessions:</strong> In PhonePe, Google Pay, or Paytm, go to Settings &gt; Manage Devices and terminate any unrecognised sessions.</span>
                </li>
              </ol>
            </div>
          )}

          {selectedEmergency === 'clicked_link' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold font-mono text-cyan-400 uppercase tracking-wider">
                  ISOLATION: SUSPICIOUS URL / MALWARE SIDELOAD
                </span>
              </div>
              <ol className="space-y-3 text-xs text-slate-300">
                <li className="flex items-start space-x-3">
                  <span className="w-5 h-5 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold font-mono shrink-0">1</span>
                  <span><strong>Turn on Airplane Mode immediately:</strong> Disconnecting Wi-Fi and mobile data halts any active remote access sessions (AnyDesk, TeamViewer) or background SMS exfiltration.</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="w-5 h-5 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold font-mono shrink-0">2</span>
                  <span><strong>Uninstall Recently Downloaded APKs:</strong> Check Android Settings &gt; Apps &gt; Installed Apps. Look for suspicious packages masquerading as "Customer Support", "Update", or "Rewards".</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="w-5 h-5 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold font-mono shrink-0">3</span>
                  <span><strong>Revoke Accessibility & Notification Permissions:</strong> Go to Settings &gt; Accessibility and ensure no unknown applications have permission to read your screen or notifications.</span>
                </li>
              </ol>
            </div>
          )}
        </div>
      </div>

      {/* Core Educational Guidance Cards */}
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight">
            Fundamental Threat Recognition Guide
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Master the standard cognitive red flags across common communication vectors.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Card 1: Identifying Suspicious Messages */}
          <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-3">
            <div className="flex items-center space-x-2 text-violet-400 font-bold text-sm">
              <Smartphone className="w-4 h-4" />
              <span>1. How to Identify Suspicious Messages</span>
            </div>
            <ul className="space-y-2 text-xs text-slate-300 leading-relaxed">
              <li className="flex items-start space-x-2">
                <span className="text-violet-400 font-bold">•</span>
                <span><strong>Header Inspection:</strong> Genuine banks send SMS using verified alphanumeric headers (e.g. <em>VM-HDFCBK</em>, <em>AD-SBIINB</em>), never from 10-digit mobile phone numbers (+91-98...).</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-violet-400 font-bold">•</span>
                <span><strong>Artificial Deadlines:</strong> Phrases like "blocked today", "within 2 hours", or "last chance" are designed to short-circuit analytical thinking.</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-violet-400 font-bold">•</span>
                <span><strong>Code-Mixed Manipulation:</strong> Scammers frequently use Romanised Telugu or Hindi (<em>"Mee khata block avutundi"</em>) to bypass standard smartphone spam filters.</span>
              </li>
            </ul>
          </div>

          {/* Card 2: Recognizing Phishing Links */}
          <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-3">
            <div className="flex items-center space-x-2 text-cyan-400 font-bold text-sm">
              <Eye className="w-4 h-4" />
              <span>2. How to Recognise Phishing Links</span>
            </div>
            <ul className="space-y-2 text-xs text-slate-300 leading-relaxed">
              <li className="flex items-start space-x-2">
                <span className="text-cyan-400 font-bold">•</span>
                <span><strong>Check the Registered Domain:</strong> In <em>sbi-kyc-verify.xyz</em>, the domain is <strong>.xyz</strong>, not <em>sbi.co.in</em>. The brand name was placed in the subdomain to deceive you.</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-cyan-400 font-bold">•</span>
                <span><strong>Beware of Cheap TLDs:</strong> Reputable banks almost never use <em>.xyz, .top, .cfd, .buzz,</em> or <em>.link</em> for financial operations.</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-cyan-400 font-bold">•</span>
                <span><strong>Shortened Links:</strong> Avoid clicking <em>bit.ly, tinyurl,</em> or <em>t.co</em> links sent via SMS claiming to be official banking notifications.</span>
              </li>
            </ul>
          </div>

          {/* Card 3: Avoiding UPI Fraud */}
          <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-3">
            <div className="flex items-center space-x-2 text-emerald-400 font-bold text-sm">
              <CreditCard className="w-4 h-4" />
              <span>3. How to Avoid UPI & QR Code Fraud</span>
            </div>
            <ul className="space-y-2 text-xs text-slate-300 leading-relaxed">
              <li className="flex items-start space-x-2">
                <span className="text-emerald-400 font-bold">•</span>
                <span><strong>Golden Rule of UPI:</strong> Entering your UPI PIN always <strong>DEBITS</strong> money from your bank account. You never need a PIN to <strong>RECEIVE</strong> money.</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-emerald-400 font-bold">•</span>
                <span><strong>Decline Collect Requests:</strong> If a buyer on OLX sends a request to "claim money", reject it immediately.</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-emerald-400 font-bold">•</span>
                <span><strong>QR Code Illusion:</strong> Scanning a QR code inside PhonePe, GPay, or Paytm initiates an outgoing payment, never an incoming deposit.</span>
              </li>
            </ul>
          </div>

          {/* Card 4: Protecting Personal Information */}
          <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-3">
            <div className="flex items-center space-x-2 text-amber-400 font-bold text-sm">
              <Key className="w-4 h-4" />
              <span>4. Protecting Sensitive Data</span>
            </div>
            <ul className="space-y-2 text-xs text-slate-300 leading-relaxed">
              <li className="flex items-start space-x-2">
                <span className="text-amber-400 font-bold">•</span>
                <span><strong>Never Sideload APKs:</strong> Only install applications through Google Play Store or Apple App Store. Disable "Install from Unknown Sources".</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-amber-400 font-bold">•</span>
                <span><strong>Masked Aadhaar:</strong> When providing identity verification to hotels or private services, provide only Masked Aadhaar (showing only the last 4 digits).</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-amber-400 font-bold">•</span>
                <span><strong>Report to Chakshu:</strong> Flag fraudulent calls, WhatsApp solicitations, or SMS to the Department of Telecommunications portal at sancharsaathi.gov.in.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
