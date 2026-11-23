import React, { useState, useEffect } from 'react';
import { 
  BookOpen, 
  Search, 
  AlertTriangle, 
  ShieldCheck, 
  Terminal, 
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Tag,
  Lightbulb,
  Copy,
  Check
} from 'lucide-react';
import { api } from '../services/api';
import { Playbook } from '../types/intelligence';

interface ScamLibraryProps {
  onTestExample: (exampleText: string) => void;
}

export const ScamLibrary: React.FC<ScamLibraryProps> = ({ onTestExample }) => {
  const [playbooks, setPlaybooks] = useState<Playbook[]>([]);
  const [search, setSearch] = useState('');
  const [expandedId, setExpandedId] = useState<string | null>('digital_arrest');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  useEffect(() => {
    api.getPlaybooks().then(data => {
      if (data && data.length > 0) {
        setPlaybooks(data);
      }
    });
  }, []);

  const filtered = playbooks.filter(p => 
    p.label.toLowerCase().includes(search.toLowerCase()) ||
    p.description.toLowerCase().includes(search.toLowerCase()) ||
    p.warning_signs.some(w => w.toLowerCase().includes(search.toLowerCase()))
  );

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const handleCopyExample = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-8 py-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="flex items-center space-x-2">
            <BookOpen className="w-5 h-5 text-violet-400" />
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Scam Intelligence Library
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Official repository of 9 Indian cyber fraud playbooks, attacker engineering patterns, and prevention protocols.
          </p>
        </div>

        {/* Search */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            type="text"
            placeholder="Search scams, techniques, keywords..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-navy-950 border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-violet-500"
          />
        </div>
      </div>

      {/* Playbooks list */}
      <div className="space-y-4">
        {filtered.map((item) => {
          const isExpanded = expandedId === item.id;
          return (
            <div 
              key={item.id}
              className={`rounded-2xl glass-panel border transition-all duration-200 overflow-hidden ${
                isExpanded ? 'border-violet-500/50 shadow-lg shadow-violet-500/5' : 'border-slate-800 hover:border-slate-700'
              }`}
            >
              {/* Card Header / Click to expand */}
              <div 
                onClick={() => toggleExpand(item.id)}
                className="p-5 sm:p-6 cursor-pointer flex items-center justify-between gap-4 select-none bg-navy-900/40 hover:bg-navy-900/70 transition-colors"
              >
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-mono font-bold text-violet-400 uppercase tracking-wider">
                      PLAYBOOK #{item.id.toUpperCase()}
                    </span>
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">
                    {item.label}
                  </h3>
                  <p className="text-xs text-slate-400 line-clamp-1">
                    {item.description}
                  </p>
                </div>

                <div className="flex items-center space-x-3 shrink-0">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onTestExample(item.example_message);
                    }}
                    className="hidden sm:flex items-center space-x-1 px-3 py-1.5 rounded-lg text-xs font-semibold bg-violet-600/20 text-violet-300 border border-violet-500/30 hover:bg-violet-600/30 transition-colors"
                  >
                    <Terminal className="w-3.5 h-3.5" />
                    <span>Test In Scanner</span>
                  </button>

                  <div className="w-8 h-8 rounded-lg bg-navy-950 border border-slate-800 flex items-center justify-center text-slate-400">
                    {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </div>
              </div>

              {/* Expanded Details */}
              {isExpanded && (
                <div className="p-6 border-t border-slate-800/80 bg-navy-950/60 space-y-6">
                  {/* Detailed Description */}
                  <div className="space-y-2">
                    <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                      Scam Modus Operandi
                    </h4>
                    <p className="text-sm text-slate-300 leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  {/* Warning Signs & Attacker Techniques Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Common Warning Signs */}
                    <div className="p-4 rounded-xl bg-navy-950 border border-slate-800 space-y-3">
                      <div className="flex items-center space-x-2 text-rose-400 font-bold text-xs uppercase tracking-wider">
                        <AlertTriangle className="w-3.5 h-3.5" />
                        <span>Common Warning Signs</span>
                      </div>
                      <ul className="space-y-2 text-xs text-slate-300">
                        {item.warning_signs.map((sign, idx) => (
                          <li key={idx} className="flex items-start space-x-2">
                            <span className="text-rose-400 font-bold">•</span>
                            <span>{sign}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Attacker Techniques */}
                    <div className="p-4 rounded-xl bg-navy-950 border border-slate-800 space-y-3">
                      <div className="flex items-center space-x-2 text-amber-400 font-bold text-xs uppercase tracking-wider">
                        <Tag className="w-3.5 h-3.5" />
                        <span>Attacker Techniques</span>
                      </div>
                      <ul className="space-y-2 text-xs text-slate-300">
                        {item.attacker_techniques.map((tech, idx) => (
                          <li key={idx} className="flex items-start space-x-2">
                            <span className="text-amber-400 font-bold">•</span>
                            <span>{tech}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Example Message with Actions */}
                  <div className="p-4 rounded-xl bg-navy-900 border border-slate-800 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                        Typical Deceptive Message Template
                      </span>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleCopyExample(item.id, item.example_message)}
                          className="flex items-center space-x-1 text-xs text-slate-400 hover:text-slate-200 transition-colors"
                        >
                          {copiedId === item.id ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                          <span>{copiedId === item.id ? 'Copied' : 'Copy'}</span>
                        </button>
                        <button
                          onClick={() => onTestExample(item.example_message)}
                          className="flex items-center space-x-1 text-xs text-cyan-400 hover:text-cyan-300 transition-colors"
                        >
                          <Terminal className="w-3.5 h-3.5" />
                          <span>Run In Scanner</span>
                        </button>
                      </div>
                    </div>
                    <div className="p-3 rounded-lg bg-navy-950 border border-slate-800/80 font-mono text-xs text-slate-300 leading-relaxed whitespace-pre-wrap">
                      "{item.example_message}"
                    </div>
                  </div>

                  {/* Prevention Guidelines */}
                  <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/30 space-y-2">
                    <div className="flex items-center space-x-2 text-emerald-400 font-bold text-xs uppercase tracking-wider">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>Official Prevention & Response Protocol</span>
                    </div>
                    <ul className="space-y-1.5 text-xs text-slate-300">
                      {item.prevention_tips.map((tip, idx) => (
                        <li key={idx} className="flex items-start space-x-2">
                          <span className="text-emerald-400 font-bold">✓</span>
                          <span>{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
