import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { ImageUploader } from './components/ImageUploader';
import { CardResult } from './components/CardResult';
import { HistoryList } from './components/HistoryList';
import { scanBusinessCard } from './services/geminiService';
import { BusinessCardData, ScanStatus, ScannedCard } from './types';
import './firebase'; // Ensure Firebase inits

function App() {
  const [currentImage, setCurrentImage] = useState<string | null>(null);
  const [scanStatus, setScanStatus] = useState<ScanStatus>('idle');
  const [scanData, setScanData] = useState<BusinessCardData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [history, setHistory] = useState<ScannedCard[]>([]);

  // Load history from local storage on mount
  useEffect(() => {
    const saved = localStorage.getItem('ideaScanHistory');
    if (saved) {
      try {
        setHistory(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse history", e);
      }
    }
  }, []);

  const handleImageSelected = async (base64: string) => {
    setCurrentImage(base64);
    setScanStatus('scanning');
    setError(null);
    setScanData(null);

    try {
      const data = await scanBusinessCard(base64);
      setScanData(data);
      setScanStatus('success');
    } catch (err: any) {
      setError(err.message || 'Failed to scan card');
      setScanStatus('error');
    }
  };

  const handleSave = () => {
    if (scanData && currentImage) {
      const newCard: ScannedCard = {
        id: Date.now().toString(),
        timestamp: Date.now(),
        imageUrl: currentImage,
        data: scanData
      };
      
      const newHistory = [newCard, ...history];
      setHistory(newHistory);
      localStorage.setItem('ideaScanHistory', JSON.stringify(newHistory));
      
      // Optionally reset scanning state
      alert("Card saved successfully!");
    }
  };

  const handleReset = () => {
    setCurrentImage(null);
    setScanStatus('idle');
    setScanData(null);
    setError(null);
  };

  const handleClearHistory = () => {
    if(confirm("Are you sure you want to clear all history?")) {
        setHistory([]);
        localStorage.removeItem('ideaScanHistory');
    }
  };

  const handleSelectHistory = (card: ScannedCard) => {
    setCurrentImage(card.imageUrl);
    setScanData(card.data);
    setScanStatus('success');
    setError(null);
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 font-sans">
      <Header />
      
      <main className="flex-1 max-w-5xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Hero / Intro */}
        {scanStatus === 'idle' && (
           <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
                Visiting Card Scanner
              </h2>
              <p className="mt-3 text-lg text-gray-500 max-w-2xl mx-auto">
                Instantly capture and digitize business contacts using advanced AI.
                Designed for Idea Holiday's Operator efficiency.
              </p>
           </div>
        )}

        {/* Error Message */}
        {error && (
            <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-center justify-between">
                <span>{error}</span>
                <button onClick={() => setError(null)} className="text-red-900 hover:text-red-700 font-bold">&times;</button>
            </div>
        )}

        {/* Main Content Area */}
        <div className="transition-all duration-500 ease-in-out">
            {!scanData ? (
                <div className="max-w-xl mx-auto">
                    <ImageUploader 
                        onImageSelected={handleImageSelected} 
                        isScanning={scanStatus === 'scanning'}
                    />
                </div>
            ) : (
                <CardResult 
                    data={scanData} 
                    imageUrl={currentImage || ''} 
                    onReset={handleReset}
                    onSave={handleSave}
                />
            )}
        </div>

        {/* History Section */}
        {scanStatus === 'idle' && (
            <HistoryList 
                history={history} 
                onClear={handleClearHistory}
                onSelect={handleSelectHistory}
            />
        )}
        
      </main>

      <Footer />
    </div>
  );
}

export default App;
