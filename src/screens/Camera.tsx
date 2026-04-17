
import React, { useState, useRef, useEffect } from 'react';
import { ScreenName } from '../types';
import { analyzeSustainabilityImage } from '../services/geminiService';

interface Props {
  onNavigate: (screen: ScreenName) => void;
  goBack: () => void;
}

const CameraScreen: React.FC<Props> = ({ onNavigate, goBack }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState<any>(null);

  useEffect(() => {
    startCamera();
    return () => stopCamera();
  }, []);

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (err) {
      console.error("Camera error:", err);
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
  };

  const handleCapture = async () => {
    if (!videoRef.current) return;
    setIsScanning(true);

    // Simulate capture by drawing to canvas
    const canvas = document.createElement('canvas');
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.drawImage(videoRef.current, 0, 0);
      const base64 = canvas.toDataURL('image/jpeg').split(',')[1];
      
      // Analyze with Gemini
      const result = await analyzeSustainabilityImage(base64);
      setScanResult(result);
    }
    setIsScanning(false);
  };

  return (
    <div className="h-full w-full bg-black relative flex flex-col">
      {/* Top Bar */}
      <div className="absolute top-0 left-0 right-0 p-6 pt-12 flex justify-between items-center z-20">
        <button onClick={goBack} className="w-10 h-10 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center text-white hover:bg-black/60 transition-colors">
          <i className="fas fa-times text-xl"></i>
        </button>
        <span className="bg-black/40 backdrop-blur-md px-4 py-1 rounded-full text-white text-sm font-semibold">Scanner</span>
        <button className="w-10 h-10 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center text-white hover:bg-black/60 transition-colors">
          <i className="fas fa-bolt"></i>
        </button>
      </div>

      {/* Viewfinder */}
      <div className="flex-1 relative overflow-hidden">
        <video ref={videoRef} autoPlay playsInline muted className="absolute inset-0 w-full h-full object-cover"></video>
        
        {/* Scanner Overlay */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-64 h-64 border-2 border-white/50 rounded-3xl relative">
            <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-[var(--forest-light)] -mt-1 -ml-1 rounded-tl-lg"></div>
            <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-[var(--forest-light)] -mt-1 -mr-1 rounded-tr-lg"></div>
            <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-[var(--forest-light)] -mb-1 -ml-1 rounded-bl-lg"></div>
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-[var(--forest-light)] -mb-1 -mr-1 rounded-br-lg"></div>
            <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-[var(--forest-light)] opacity-50 animate-[scanLine_2s_infinite]"></div>
          </div>
        </div>

        {/* Loading Overlay */}
        {isScanning && (
          <div className="fixed inset-0 bg-black/50 flex flex-col items-center justify-center z-30 backdrop-blur-sm">
            <div className="w-16 h-16 border-4 border-white/20 border-t-[var(--forest-light)] rounded-full animate-spin mb-4"></div>
            <p className="text-white font-semibold animate-pulse">Analyzing with Gemini...</p>
          </div>
        )}
      </div>

      {/* Controls */}
      <div className="h-32 bg-black/80 backdrop-blur-md flex items-center justify-center gap-12 pb-8 pt-4 relative z-20">
        <button className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors">
          <i className="fas fa-image"></i>
        </button>
        <button onClick={handleCapture} className="w-20 h-20 rounded-full border-4 border-white flex items-center justify-center hover:scale-105 transition-transform">
          <div className="w-16 h-16 bg-white rounded-full active:scale-90 transition-transform"></div>
        </button>
        <button className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors">
          <i className="fas fa-sync-alt"></i>
        </button>
      </div>

      {/* Result Modal - Rich UI from HTML mockup */}
      {scanResult && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-end">
          <div className="bg-[var(--bg-secondary)] w-full rounded-t-3xl p-6 animate-[slideUp_0.3s_ease-out] max-h-[85vh] overflow-y-auto no-scrollbar">
            <div className="w-12 h-1.5 bg-gray-300 rounded-full mx-auto mb-6"></div>
            
            {/* Header / Score */}
            <div className="text-center mb-6">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 text-[var(--forest-light)] text-3xl animate-[scaleIn_0.5s_ease-out]">
                 <i className="fas fa-check"></i>
              </div>
              
              <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-1">Scan Successful!</h2>
              <p className="text-[var(--text-secondary)] text-sm mb-6">{scanResult.title}</p>

              {/* Sustainability Score Circle */}
              <div className="bg-[var(--bg-tertiary)] rounded-2xl p-4 mb-4 text-center">
                 <div className="w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-3 relative" style={{background: `conic-gradient(var(--forest-light) 0%, var(--forest-light) ${scanResult.score}%, var(--bg-primary) ${scanResult.score}%, var(--bg-primary) 100%)`}}>
                    <div className="absolute inset-0 rounded-full border-4 border-transparent"></div>
                    <div className="w-20 h-20 bg-[var(--bg-tertiary)] rounded-full flex items-center justify-center">
                       <span className="text-2xl font-bold text-[var(--forest-light)]">{scanResult.score}</span>
                    </div>
                 </div>
                 <span className="text-sm font-bold text-[var(--text-primary)]">Sustainability Score</span>
                 <p className="text-xs text-[var(--text-secondary)] mt-1">Above average for this product</p>
              </div>
            </div>
            
            {/* Scan Details */}
            <div className="bg-[var(--bg-tertiary)] rounded-2xl p-4 mb-4">
                <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[var(--forest-light)] to-[var(--forest-medium)] flex items-center justify-center text-white text-lg">
                        <i className="fas fa-recycle"></i>
                    </div>
                    <div>
                        <h4 className="font-bold text-sm">Product Details</h4>
                        <p className="text-xs text-[var(--text-secondary)]">{scanResult.analysis}</p>
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                    <div className="flex items-center gap-2 text-xs text-[var(--text-secondary)] p-2 bg-white rounded-lg">
                        <i className="fas fa-check-circle text-[var(--forest-light)]"></i> Recyclable
                    </div>
                    <div className="flex items-center gap-2 text-xs text-[var(--text-secondary)] p-2 bg-white rounded-lg">
                        <i className="fas fa-leaf text-[var(--forest-light)]"></i> Eco-Certified
                    </div>
                    <div className="flex items-center gap-2 text-xs text-[var(--text-secondary)] p-2 bg-white rounded-lg">
                        <i className="fas fa-globe text-[var(--forest-light)]"></i> Fair Trade
                    </div>
                    <div className="flex items-center gap-2 text-xs text-[var(--text-secondary)] p-2 bg-white rounded-lg">
                        <i className="fas fa-bolt text-[var(--forest-light)]"></i> Low Carbon
                    </div>
                </div>
            </div>

            {/* Rewards */}
            <div className="bg-gradient-to-r from-[rgba(16,185,129,0.1)] to-[rgba(6,78,59,0.05)] border border-[rgba(16,185,129,0.2)] rounded-2xl p-4 mb-6">
                <div className="flex justify-between items-center mb-3">
                    <h4 className="font-bold text-sm flex items-center gap-2"><i className="fas fa-gift text-[var(--amber)]"></i> You've Earned</h4>
                    <span className="text-xs font-bold text-[var(--forest-light)]">+125 Wda total</span>
                </div>
                <div className="space-y-2">
                    <div className="flex justify-between items-center bg-white/50 p-2 rounded-lg">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[var(--amber)] to-orange-500 flex items-center justify-center text-white text-xs"><i className="fas fa-coins"></i></div>
                            <span className="text-xs font-semibold">Scan Reward</span>
                        </div>
                        <span className="font-bold text-xs">+50 Wda</span>
                    </div>
                    <div className="flex justify-between items-center bg-white/50 p-2 rounded-lg">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[var(--forest-light)] to-[var(--forest-deep)] flex items-center justify-center text-white text-xs"><i className="fas fa-tree"></i></div>
                            <span className="text-xs font-semibold">Carbon Offset</span>
                        </div>
                        <span className="font-bold text-xs">0.5 Trees</span>
                    </div>
                </div>
            </div>

            <div className="flex gap-3">
              <button onClick={() => setScanResult(null)} className="flex-1 py-4 bg-[var(--bg-tertiary)] rounded-xl font-bold text-[var(--text-secondary)] hover:bg-[var(--border-light)] transition-colors">Close</button>
              <button onClick={() => { setScanResult(null); onNavigate(ScreenName.IMPACT); }} className="flex-[2] py-4 bg-gradient-to-r from-[var(--forest-light)] to-[var(--forest-deep)] text-white rounded-xl font-bold shadow-lg">View Impact</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CameraScreen;
