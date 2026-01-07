import React, { useState, useCallback, useEffect } from 'react';
import { CATEGORIES, INITIAL_SELECTIONS } from './constants';
import { PromptSelections, SelectionCategory, GeneratedPrompt, ViralExample, SavedPrompt, PresetProfile } from './types';
import { Selector } from './components/Selector';
import { ImageUploader } from './components/ImageUploader';
import { JsonResult } from './components/JsonResult';
import { InspirationGallery } from './components/InspirationGallery';
import { SavedLibrary } from './components/SavedLibrary';
import { PresetBar } from './components/PresetBar';
import { generateJsonPrompt } from './services/geminiService';

const SAVED_PROMPTS_KEY = 'lumina_saved_prompts';
const PRESETS_KEY = 'lumina_user_presets';

const App: React.FC = () => {
  const [selections, setSelections] = useState<PromptSelections>(INITIAL_SELECTIONS);
  const [image, setImage] = useState<string | null>(null);
  const [result, setResult] = useState<GeneratedPrompt | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Library State
  const [savedPrompts, setSavedPrompts] = useState<SavedPrompt[]>([]);
  const [isLibraryOpen, setIsLibraryOpen] = useState(false);

  // Preset State
  const [presets, setPresets] = useState<PresetProfile[]>([]);

  // Load Data on Mount
  useEffect(() => {
    const storedPrompts = localStorage.getItem(SAVED_PROMPTS_KEY);
    if (storedPrompts) {
      try {
        setSavedPrompts(JSON.parse(storedPrompts));
      } catch (e) { console.error(e); }
    }

    const storedPresets = localStorage.getItem(PRESETS_KEY);
    if (storedPresets) {
      try {
        setPresets(JSON.parse(storedPresets));
      } catch (e) { console.error(e); }
    }
  }, []);

  // --- Saved Library Logic ---
  const savePromptToLibrary = (prompt: GeneratedPrompt) => {
    const exists = savedPrompts.some(p => p.video_generation_prompt === prompt.video_generation_prompt);
    if (exists) return;

    const newSavedPrompt: SavedPrompt = {
      ...prompt,
      id: Date.now().toString(),
      savedAt: Date.now()
    };

    const updatedList = [newSavedPrompt, ...savedPrompts];
    setSavedPrompts(updatedList);
    localStorage.setItem(SAVED_PROMPTS_KEY, JSON.stringify(updatedList));
  };

  const deletePromptFromLibrary = (id: string) => {
    const updatedList = savedPrompts.filter(p => p.id !== id);
    setSavedPrompts(updatedList);
    localStorage.setItem(SAVED_PROMPTS_KEY, JSON.stringify(updatedList));
  };

  const loadPromptFromLibrary = (prompt: SavedPrompt) => {
    setResult(prompt);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // --- Preset Logic ---
  const savePreset = (name: string) => {
    const newPreset: PresetProfile = {
      id: Date.now().toString(),
      name,
      selections: { ...selections },
      createdAt: Date.now(),
    };
    const updatedPresets = [newPreset, ...presets];
    setPresets(updatedPresets);
    localStorage.setItem(PRESETS_KEY, JSON.stringify(updatedPresets));
  };

  const loadPreset = (preset: PresetProfile) => {
    setSelections(preset.selections);
  };

  const deletePreset = (id: string) => {
    const updatedPresets = presets.filter(p => p.id !== id);
    setPresets(updatedPresets);
    localStorage.setItem(PRESETS_KEY, JSON.stringify(updatedPresets));
  };

  // --- Selection Logic ---
  const handleToggle = useCallback((categoryId: SelectionCategory, value: string) => {
    const categoryDef = CATEGORIES.find(c => c.id === categoryId);
    if (!categoryDef) return;

    setSelections((prev) => {
      const current = prev[categoryId] as string[]; 
      const exists = current.includes(value);
      
      let updated: string[];

      if (categoryDef.selectionType === 'single') {
        updated = exists ? [] : [value];
      } else {
        if (exists) {
          updated = current.filter((item) => item !== value);
        } else {
          updated = [...current, value];
        }
      }

      return { ...prev, [categoryId]: updated };
    });
  }, []);

  const handleGenerate = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const generatedData = await generateJsonPrompt(image, selections);
      setResult(generatedData);
    } catch (err: any) {
      setError(err.message || "Oluşturma sırasında bir hata meydana geldi.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoadExample = (example: ViralExample) => {
    setResult(example);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const isCurrentResultSaved = result 
    ? savedPrompts.some(p => p.video_generation_prompt === result.video_generation_prompt)
    : false;

  return (
    <div className="min-h-screen bg-[#f5f5f7] relative text-gray-900 font-sans selection:bg-indigo-100 selection:text-indigo-700">
      
      {/* Background Decor - Subtler */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
         <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-50/50 blur-[100px]" />
         <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-50/50 blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-[1440px] mx-auto px-4 md:px-8 py-6 md:py-10">
        
        {/* Header Area */}
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 border-b border-gray-200/60 pb-8">
          <div>
            <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-gray-900 mb-2">
              Lumina <span className="text-gray-400 font-light">Silver</span>
            </h1>
            <p className="text-lg text-gray-500 font-light tracking-wide max-w-lg">
              Profesyonel sinematografi ve video prompt mimarisi.
            </p>
          </div>
          
          <button 
            onClick={() => setIsLibraryOpen(true)}
            className="group flex items-center gap-3 px-5 py-2.5 bg-white rounded-full shadow-sm border border-gray-200 hover:border-indigo-200 hover:shadow-md transition-all"
          >
            <div className="relative">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-600 group-hover:text-indigo-600 transition-colors">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z" />
              </svg>
              {savedPrompts.length > 0 && (
                <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-indigo-500"></span>
                </span>
              )}
            </div>
            <span className="text-sm font-medium text-gray-600 group-hover:text-gray-900">Kütüphanem</span>
          </button>
        </header>

        {/* Top Full Width Bar: Preset Management */}
        <section className="mb-8">
           <PresetBar 
             presets={presets}
             onSave={savePreset}
             onLoad={loadPreset}
             onDelete={deletePreset}
           />
        </section>

        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
          
          {/* Left: Input & Config (8 cols) */}
          <div className="xl:col-span-8 flex flex-col gap-8">
            
            {/* 1. Image Upload Section */}
            <section>
              <h2 className="text-xl font-medium text-gray-800 mb-4 px-1">Referans Görsel</h2>
              <ImageUploader selectedImage={image} onImageSelect={setImage} />
            </section>

            {/* 2. Parameters Grid */}
            <section>
              <div className="flex items-center justify-between mb-4 px-1">
                <h2 className="text-xl font-medium text-gray-800">Parametreler</h2>
                <button 
                  onClick={() => setSelections(INITIAL_SELECTIONS)}
                  className="text-xs font-semibold text-gray-400 hover:text-red-500 transition-colors uppercase tracking-wider"
                >
                  Sıfırla
                </button>
              </div>
              
              <div className="grid grid-cols-1 gap-6">
                 {CATEGORIES.map((category) => (
                   <Selector 
                     key={category.id} 
                     category={category} 
                     selectedValues={selections[category.id as SelectionCategory]} 
                     onToggle={handleToggle} 
                   />
                 ))}
              </div>
            </section>
          </div>

          {/* Right: Output & Generation (4 cols) - Sticky */}
          <div className="xl:col-span-4 xl:sticky xl:top-8 space-y-6">
            
            {/* Generate Button */}
            <div className="p-1 bg-white rounded-[20px] shadow-lg shadow-gray-200/50">
                <button
                    onClick={handleGenerate}
                    disabled={isLoading}
                    className={`
                    w-full py-5 rounded-2xl font-medium text-lg tracking-wide transition-all duration-300 flex items-center justify-center gap-3
                    ${isLoading 
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                        : 'bg-gray-900 text-white hover:bg-black hover:scale-[0.99] shadow-md'
                    }
                    `}
                >
                    {isLoading ? (
                        <>
                         <svg className="animate-spin h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                           <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                           <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                         </svg>
                         Analiz Ediliyor...
                        </>
                    ) : (
                        <>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z" />
                        </svg>
                        Prompt Oluştur
                        </>
                    )}
                </button>
            </div>

            {error && (
                <div className="p-4 bg-red-50 border border-red-100 text-red-600 rounded-xl text-sm">
                  {error}
                </div>
            )}

            <div className="min-h-[500px]">
                <JsonResult 
                  data={result} 
                  isLoading={isLoading} 
                  onSave={savePromptToLibrary}
                  isSaved={isCurrentResultSaved}
                />
            </div>
          </div>
        </div>

        {/* Viral Gallery */}
        <InspirationGallery onSelect={handleLoadExample} />

      </div>

      <SavedLibrary 
        isOpen={isLibraryOpen}
        onClose={() => setIsLibraryOpen(false)}
        savedPrompts={savedPrompts}
        onLoad={loadPromptFromLibrary}
        onDelete={deletePromptFromLibrary}
      />

      <footer className="mt-20 border-t border-gray-200 py-10 text-center">
        <p className="text-gray-400 text-sm">Lumina Silver &copy; {new Date().getFullYear()} AI Prompt Architect.</p>
      </footer>
    </div>
  );
};

export default App;