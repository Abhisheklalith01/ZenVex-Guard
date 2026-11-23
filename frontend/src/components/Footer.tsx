import React from 'react';
import { Shield, PhoneCall, AlertCircle, ExternalLink, Lock, CheckCircle2 } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-slate-800/80 bg-navy-950 mt-20 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand Info */}
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center space-x-2">
              <div className="flex items-center justify-center w-7 h-7 rounded-lg bg-violet-600 text-white">
                <Shield className="w-4 h-4" />
              </div>
              <span className="font-extrabold text-sm text-white tracking-tight">ZENVEX GUARD</span>
            </div>
            <p className="text-slate-400 leading-relaxed text-[13px]">
              AI-Powered Multilingual Scam Intelligence Platform. Defending citizens against deceptive messaging, malicious links, and digital financial fraud.
            </p>
            <p className="text-[11px] text-cyan-400 font-mono">
              TAGLINE: DETECT. ANALYSE. PROTECT.
            </p>
          </div>

          {/* Emergency & Official Portals */}
          <div className="space-y-3">
            <h4 className="font-semibold text-slate-200 text-xs uppercase tracking-wider">
              Emergency Hotlines
            </h4>
            <ul className="space-y-2 text-[13px]">
              <li>
                <a 
                  href="tel:1930" 
                  className="flex items-center space-x-2 text-rose-400 hover:text-rose-300 transition-colors font-medium"
                >
                  <PhoneCall className="w-3.5 h-3.5" />
                  <span>National Cyber Helpline: 1930</span>
                </a>
              </li>
              <li>
                <a 
                  href="https://cybercrime.gov.in" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="flex items-center space-x-1.5 hover:text-cyan-300 transition-colors"
                >
                  <span>National Cyber Crime Portal</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a 
                  href="https://sancharsaathi.gov.in" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="flex items-center space-x-1.5 hover:text-cyan-300 transition-colors"
                >
                  <span>Chakshu (Suspected Fraud)</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
            </ul>
          </div>

          {/* Privacy & Safety Guarantees */}
          <div className="space-y-3">
            <h4 className="font-semibold text-slate-200 text-xs uppercase tracking-wider">
              Privacy by Design
            </h4>
            <ul className="space-y-1.5 text-[12px] text-slate-400">
              <li className="flex items-center space-x-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Zero Message Persistence</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Stateless Backend Architecture</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Zero Link Opening (Offline Parsing)</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Transparent Evidence Attribution</span>
              </li>
            </ul>
          </div>

          {/* Disclaimers */}
          <div className="space-y-3">
            <h4 className="font-semibold text-slate-200 text-xs uppercase tracking-wider">
              Advisory Notice
            </h4>
            <div className="p-3 rounded-lg bg-navy-900 border border-slate-800 text-[11px] leading-relaxed text-slate-400 space-y-1.5">
              <div className="flex items-center space-x-1.5 text-amber-400 font-medium">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                <span>Advisory System</span>
              </div>
              <p>
                ZenVex Guard is an intelligent threat awareness platform. It does not replace official banking portals or law enforcement agencies. If financial loss has occurred, dial 1930 immediately.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-800/60 flex flex-col sm:flex-row items-center justify-between text-slate-400 text-xs">
          <p>© 2026 ZenVex Guard. Built for Next-Generation Digital Trust. All rights reserved.</p>
          <div className="flex items-center space-x-4 mt-4 sm:mt-0">
            <span className="flex items-center space-x-1 text-slate-400">
              <Lock className="w-3 h-3 text-violet-400" />
              <span>TLS Encrypted API</span>
            </span>
            <span>•</span>
            <span className="text-slate-400">Cybersecurity Hackathon 2026</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
