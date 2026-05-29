
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { InputSection } from './components/InputSection';
import { ImagePreview } from './components/ImagePreview';
import { EventSelector } from './components/EventSelector';
import { generateImageFromPrompt } from './services/geminiService';
import { GeneratedImage, GenerationStatus, ApiError, EventInfrastructure } from './types';
import { AlertCircle, Loader2, LayoutGrid, History } from 'lucide-react';

import { PALESTINO_EXAMPLES, EVENT_DATA } from './src/constants';

const App: React.FC = () => {
  const [status, setStatus] = useState<GenerationStatus>(GenerationStatus.IDLE);
  const [currentImage, setCurrentImage] = useState<GeneratedImage | null>(null);
  const [history, setHistory] = useState<GeneratedImage[]>([]);
  const [error, setError] = useState<ApiError | null>(null);
  const [selectedEventId, setSelectedEventId] = useState<string | undefined>(EVENT_DATA[0]?.id);

  // Load history from localStorage on mount
  useEffect(() => {
    const savedHistory = localStorage.getItem('palestino_history');
    if (savedHistory) {
      try {
        setHistory(JSON.parse(savedHistory));
      } catch (e) {
        console.error("Failed to load history", e);
      }
    }
  }, []);

  // Save history to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('palestino_history', JSON.stringify(history));
  }, [history]);

  const handleGenerate = async (prompt: string) => {
    setStatus(GenerationStatus.LOADING);
    setError(null);
    setCurrentImage(null);

    try {
      const imageUrl = await generateImageFromPrompt(prompt);
      
      const newImage: GeneratedImage = {
        id: crypto.randomUUID(),
        url: imageUrl,
        prompt: prompt,
        timestamp: Date.now()
      };
      
      setCurrentImage(newImage);
      setHistory(prev => [newImage, ...prev].slice(0, 10)); // Keep last 10
      setStatus(GenerationStatus.SUCCESS);
      
      // Scroll to result
      setTimeout(() => {
        const previewElement = document.getElementById('image-preview-section');
        if (previewElement) {
          previewElement.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } catch (err: any) {
      setStatus(GenerationStatus.ERROR);
      setError({
        message: "Erro na Geração",
        details: err.message || "Não foi possível gerar a visualização da estrutura."
      });
    }
  };

  const handleSelectInfrastructure = (infra: EventInfrastructure) => {
    handleGenerate(infra.prompt);
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 font-sans selection:bg-indigo-500/30">
      <Header />
      
      <main className="pb-24">
        <InputSection onGenerate={handleGenerate} status={status} />
        
        <EventSelector 
          onSelectInfrastructure={handleSelectInfrastructure}
          selectedEventId={selectedEventId}
          onSelectEvent={setSelectedEventId}
        />

        {status === GenerationStatus.ERROR && error && (
          <div className="max-w-2xl mx-auto mt-12 px-4">
            <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-5 flex items-start gap-4 text-red-200">
              <AlertCircle className="w-6 h-6 text-red-500 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-red-400 uppercase tracking-tight">{error.message}</h4>
                <p className="text-sm text-red-300/70 mt-1">{error.details}</p>
              </div>
            </div>
          </div>
        )}

        <div id="image-preview-section">
          {status === GenerationStatus.SUCCESS && currentImage && (
            <ImagePreview data={currentImage} />
          )}
          
          {/* Placeholder de Carregamento Customizado */}
          {status === GenerationStatus.LOADING && (
             <div className="max-w-5xl mx-auto mt-12 px-4">
                <div className="aspect-video bg-zinc-900/50 border border-white/5 rounded-2xl flex flex-col items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full animate-[shimmer_2s_infinite]" />
                  <Loader2 className="w-12 h-12 text-indigo-500 animate-spin mb-4" />
                  <p className="text-zinc-500 font-bold uppercase tracking-[0.2em] text-xs">Renderizando Estrutura Palestino...</p>
                </div>
             </div>
          )}
        </div>

        {/* Recent History */}
        {history.length > 0 && (
          <div className="max-w-5xl mx-auto mt-24 px-4">
            <div className="flex items-center gap-3 mb-8">
              <History className="w-5 h-5 text-zinc-500" />
              <h3 className="text-xs font-black uppercase tracking-[0.3em] text-zinc-500">Projetos Recentes</h3>
              <div className="flex-1 h-px bg-white/5" />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {history.map((item) => (
                <button 
                  key={item.id}
                  onClick={() => {
                    setCurrentImage(item);
                    setStatus(GenerationStatus.SUCCESS);
                    window.scrollTo({ top: 400, behavior: 'smooth' });
                  }}
                  className="group relative aspect-video bg-zinc-900 border border-white/5 rounded-xl overflow-hidden hover:border-indigo-500/50 transition-all text-left"
                >
                  <img src={item.url} alt={item.prompt} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-4 flex flex-col justify-end">
                    <p className="text-[10px] font-bold text-white uppercase tracking-wider line-clamp-2 leading-relaxed">
                      {item.prompt}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Reference Gallery */}
        {status === GenerationStatus.IDLE && (
          <div className="max-w-5xl mx-auto mt-24 px-4">
            <div className="flex items-center gap-3 mb-8">
              <LayoutGrid className="w-5 h-5 text-zinc-500" />
              <h3 className="text-xs font-black uppercase tracking-[0.3em] text-zinc-500">Modelos de Referência</h3>
              <div className="flex-1 h-px bg-white/5" />
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {PALESTINO_EXAMPLES.map((example) => (
                <div 
                  key={example.id}
                  className="group relative aspect-[3/4] bg-zinc-900 border border-white/5 rounded-2xl overflow-hidden hover:border-white/20 transition-all"
                >
                  <img 
                    src={example.image} 
                    alt={example.title} 
                    className="w-full h-full object-cover opacity-40 group-hover:opacity-60 transition-opacity grayscale group-hover:grayscale-0"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 p-6 flex flex-col justify-end bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent">
                    <h4 className="text-sm font-black text-white uppercase tracking-tighter mb-1">{example.title}</h4>
                    <p className="text-[9px] text-zinc-500 font-bold uppercase tracking-widest leading-relaxed mb-4">
                      {example.description}
                    </p>
                    <button 
                      onClick={() => handleGenerate(example.prompt)}
                      className="w-full py-2 bg-white text-zinc-950 text-[9px] font-black uppercase tracking-[0.2em] rounded-lg opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all"
                    >
                      Gerar Similar
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {status === GenerationStatus.IDLE && history.length === 0 && (
          <div className="max-w-2xl mx-auto mt-24 text-center px-4 opacity-10 pointer-events-none select-none">
             <p className="text-zinc-600 text-[10px] font-black uppercase tracking-[0.5em]">Palestino Estruturas © 2026</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default App;