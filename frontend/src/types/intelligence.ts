export type RiskBand = 'low' | 'caution' | 'high' | 'very_high';

export interface Risk {
  score: number;
  band: RiskBand;
  label: string;
  breakdown: {
    text: number;
    url: number;
    ml: number;
  };
  disclaimer: string;
}

export interface ScamType {
  id: string;
  label: string;
}

export interface IndicatorOut {
  id: string;
  label: string;
  weight: number;
  evidence: string[];
}

export interface UrlFlag {
  id: string;
  label: string;
  weight: number;
}

export interface UrlOut {
  url: string;
  host: string;
  registered_domain: string;
  verdict: string;
  score: number;
  flags: UrlFlag[];
  official_domain_match: boolean;
  reputation_checked: boolean;
  note: string;
}

export interface Span {
  start: number;
  end: number;
  kind: 'url' | 'indicator';
  id: string;
}

export interface Explanation {
  text: string;
  source: string;
}

export interface Action {
  en: string;
  te?: string | null;
}

export interface Helplines {
  cybercrime_helpline: string;
  cybercrime_portal: string;
  suspected_fraud_reporting: string;
  note: string;
}

export interface ScanResponse {
  scan_id: string;
  input_type: 'text' | 'url';
  text: string;
  language: string;
  risk: Risk;
  scam_type?: ScamType | null;
  indicators: IndicatorOut[];
  urls: UrlOut[];
  spans: Span[];
  explanation: Explanation;
  actions: Action[];
  helplines: Helplines;
  ml_used: boolean;
}

export interface Example {
  id: string;
  title: string;
  text: string;
}

export interface Playbook {
  id: string;
  label: string;
  description: string;
  warning_signs: string[];
  attacker_techniques: string[];
  example_message: string;
  prevention_tips: string[];
}

export interface ThreatStatItem {
  name: string;
  count: number;
  percentage: number;
  risk: string;
}

export interface TimelineActivity {
  time: string;
  scans: number;
  threats: number;
}

export interface RecentThreat {
  id: string;
  category: string;
  risk: string;
  score: number;
  language: string;
  timestamp: string;
}

export interface IntelligenceStats {
  total_analyses: number;
  threats_detected: number;
  high_risk_detections: number;
  safe_analyses: number;
  accuracy_benchmark: string;
  supported_languages: string[];
  scam_category_distribution: ThreatStatItem[];
  timeline_activity: TimelineActivity[];
  recent_threats: RecentThreat[];
}
