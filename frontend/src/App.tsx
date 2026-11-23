import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { LandingPage } from './components/LandingPage';
import { Dashboard } from './components/Dashboard';
import { MessageScanner } from './components/MessageScanner';
import { UrlScanner } from './components/UrlScanner';
import { InvestigationReport } from './components/InvestigationReport';
import { ScamLibrary } from './components/ScamLibrary';
import { ProtectionCentre } from './components/ProtectionCentre';
import { ScanResponse } from './types/intelligence';
import { api } from './services/api';

export const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [report, setReport] = useState<ScanResponse | null>(null);
  const [prefilledMessage, setPrefilledMessage] = useState<string>('');
  const [prefilledUrl, setPrefilledUrl] = useState<string>('');
  const [backendStatus, setBackendStatus] = useState<string>('checking');

  useEffect(() => {
    api.checkHealth()
      .then(() => setBackendStatus('online'))
      .catch(() => setBackendStatus('offline'));
  }, []);

  const handleScanComplete = (result: ScanResponse) => {
    setReport(result);
    setActiveTab('report');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleStartScan = (sampleText?: string) => {
    if (sampleText) {
      setPrefilledMessage(sampleText);
    }
    setActiveTab('message-scanner');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleStartUrlScan = (sampleUrl?: string) => {
    if (sampleUrl) {
      setPrefilledUrl(sampleUrl);
    }
    setActiveTab('url-scanner');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNewScan = () => {
    setActiveTab('message-scanner');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-navy-950 text-slate-100 font-sans selection:bg-violet-600 selection:text-white">
      {/* Top Navigation */}
      <Navbar 
        activeTab={activeTab} 
        setActiveTab={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onQuickScan={() => handleStartScan()}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8">
        {activeTab === 'home' && (
          <LandingPage
            onStartScan={() => handleStartScan()}
            onExploreDashboard={() => {
              setActiveTab('dashboard');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onOpenUrlScanner={() => handleStartUrlScan()}
          />
        )}

        {activeTab === 'dashboard' && (
          <Dashboard 
            onScanMessage={(txt) => handleStartScan(txt)}
            onScanUrl={(u) => handleStartUrlScan(u)}
          />
        )}

        {activeTab === 'message-scanner' && (
          <MessageScanner 
            onScanComplete={handleScanComplete}
            initialText={prefilledMessage}
          />
        )}

        {activeTab === 'url-scanner' && (
          <UrlScanner 
            onScanComplete={handleScanComplete}
            initialUrl={prefilledUrl}
          />
        )}

        {activeTab === 'report' && report && (
          <InvestigationReport 
            report={report}
            onNewScan={handleNewScan}
          />
        )}

        {activeTab === 'library' && (
          <ScamLibrary 
            onTestExample={(exampleText) => handleStartScan(exampleText)}
          />
        )}

        {activeTab === 'protection' && (
          <ProtectionCentre />
        )}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default App;
