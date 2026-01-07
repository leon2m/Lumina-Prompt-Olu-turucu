import React, { useState } from 'react';
import { GeneratedPrompt } from '../types';
import { GlassCard } from './GlassCard';

interface JsonResultProps {
  data: GeneratedPrompt | null;
  isLoading: boolean;
  onSave?: (data: GeneratedPrompt) => void;
  isSaved?: boolean;
}

export const JsonResult: React.FC<JsonResultProps> = ({ data, isLoading, onSave, isSaved = false }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (!data) return;
    navigator.clipboard.writeText(JSON.stringify(data, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCopyPrompt = () => {
    if (!data) return;
    navigator.clipboard.writeText(data.video_generation_prompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  if (isLoading) {
    return (
      <GlassCard className="h-full flex flex-col items-center justify-center min-h-[400px]">
        <div className="relative w-16 h-16">
           <div className="absolute top-0 left-0 w-full h-full border-4 border-gray-200 rounded-full animate-pulse"></div>
           <div className="absolute top-0 left-0 w-full h-full border-t-4 border-gray-800 rounded-full animate-spin"></div>
        </div>
        <p className="mt-6 text-gray-500 font-medium tracking-wide animate-pulse">Video Senaryosu Analiz Ediliyor...</p>
      </GlassCard>
    );
  }

  if (!data) {
    return (
      <GlassCard className="h-full flex flex-col items-center justify-center min-h-[400px] text-center p-8">
        <div className="text-gray-300 mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-16 h-16 mx-auto">
            <path strokeLinecap="round" strokeLinejoin="round" d="m15.75 10.5 4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25h-9A2.25 2.25 0 0 0 2.25 7.5v9a2.25 2.25 0 0 0 2.25 2.25Z" />
          </svg>
        </div>
        <h3 className="text-xl text-gray-600 font-semibold mb-2">Video Prompt Oluşturucu</h3>
        <p className="text-gray-400 max-w-xs text-sm">Görselinizi yükleyin ve video modelleri (Runway, Pika, Sora) için hareket ve kamera parametrelerini seçin.</p>
      </GlassCard>
    );
  }

  return (
    <div className="h-full">
      <GlassCard className="relative h-full overflow-hidden border-t-4 border-t-gray-800 flex flex-col">
        <div className="flex justify-between items-start mb-6">
          <div className="flex-1 pr-2">
            <h2 className="text-2xl font-bold text-gray-800 tracking-tight leading-tight">{data.title || "Adsız Sahne"}</h2>
            <p className="text-sm text-gray-500 mt-1">Video Konsepti</p>
          </div>
          
          <div className="flex items-center gap-2">
            {/* Save Button */}
            {onSave && (
                <button
                    onClick={() => onSave(data)}
                    disabled={isSaved}
                    className={`
                        p-2 rounded-full transition-all duration-300 border
                        ${isSaved 
                            ? 'bg-indigo-50 border-indigo-200 text-indigo-600' 
                            : 'bg-white border-gray-200 text-gray-400 hover:text-indigo-500 hover:border-indigo-200 hover:bg-indigo-50'
                        }
                    `}
                    title={isSaved ? "Kaydedildi" : "Kütüphaneye Kaydet"}
                >
                    {isSaved ? (
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                             <path fillRule="evenodd" d="M6.32 2.577a49.255 49.255 0 0 1 11.36 0c1.497.174 2.57 1.46 2.57 2.93V21a.75.75 0 0 1-1.085.67L12 18.089l-7.165 3.583A.75.75 0 0 1 3.75 21V5.507c0-1.47 1.073-2.756 2.57-2.93Z" clipRule="evenodd" />
                        </svg>
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z" />
                        </svg>
                    )}
                </button>
            )}

            {/* Copy Button */}
            <button 
                onClick={handleCopy}
                className="flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm border border-gray-200 hover:bg-gray-50 transition-colors text-sm font-medium text-gray-700"
            >
                {copied ? (
                <>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-green-600">
                    <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z" clipRule="evenodd" />
                    </svg>
                    Kopyalandı
                </>
                ) : (
                <>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 0 1 1.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 0 0-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 0 1-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5" />
                    </svg>
                    JSON Kopyala
                </>
                )}
            </button>
          </div>
        </div>

        <div className="space-y-6 flex-1 overflow-y-auto pr-2 custom-scrollbar">
          
          {/* Main Video Prompt Box */}
          <div className="p-5 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl border border-gray-200 shadow-sm relative group">
             <div className="flex justify-between items-center mb-2">
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest">Video Generation Prompt</h4>
                <button 
                  onClick={handleCopyPrompt}
                  className="text-xs text-gray-500 hover:text-gray-800 transition-colors opacity-0 group-hover:opacity-100"
                >
                  Sadece Metni Kopyala
                </button>
             </div>
             <p className="text-sm md:text-base text-gray-800 font-medium font-serif leading-relaxed select-all">
               {data.video_generation_prompt}
             </p>
          </div>

          {/* Action & Technical Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             <div className="p-4 bg-white/40 rounded-xl border border-white/60">
                <h4 className="text-[10px] font-bold text-gray-400 uppercase mb-1">Sahne Hareketi</h4>
                <p className="text-xs text-gray-600">{data.scene_action}</p>
             </div>
             <div className="p-4 bg-white/40 rounded-xl border border-white/60">
                <h4 className="text-[10px] font-bold text-gray-400 uppercase mb-1">Kamera Hareketi</h4>
                <p className="text-xs text-gray-600">{data.technical_specifications.movement}</p>
             </div>
          </div>

           {/* Negative Prompt */}
           {data.negative_prompt && (
            <div className="p-4 bg-red-50/30 rounded-xl border border-red-100/50">
               <h4 className="text-[10px] font-bold text-red-300 uppercase mb-1">Negative Prompt</h4>
               <p className="text-xs text-red-800/70 font-mono">{data.negative_prompt}</p>
            </div>
           )}

          {/* Raw JSON Preview */}
          <div className="bg-gray-900 rounded-xl p-6 overflow-x-auto custom-scrollbar">
            <h4 className="text-[10px] font-bold text-gray-500 uppercase mb-3">Full JSON Structure</h4>
            <pre className="text-[10px] md:text-xs text-gray-300 font-mono">
              {JSON.stringify(data, null, 2)}
            </pre>
          </div>
        </div>
        
        {/* Decor */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-indigo-200 to-transparent opacity-10 rounded-bl-full pointer-events-none"></div>
      </GlassCard>
    </div>
  );
};