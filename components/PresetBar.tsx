import React, { useState } from 'react';
import { PresetProfile } from '../types';

interface PresetBarProps {
  presets: PresetProfile[];
  onSave: (name: string) => void;
  onLoad: (preset: PresetProfile) => void;
  onDelete: (id: string) => void;
}

export const PresetBar: React.FC<PresetBarProps> = ({ presets, onSave, onLoad, onDelete }) => {
  const [isCreating, setIsCreating] = useState(false);
  const [newName, setNewName] = useState('');

  const handleSaveClick = () => {
    if (!newName.trim()) return;
    onSave(newName);
    setNewName('');
    setIsCreating(false);
  };

  return (
    <div className="bg-white/50 backdrop-blur-md border border-white/60 rounded-2xl p-4 shadow-sm">
      <div className="flex items-center justify-between mb-4 px-1">
         <h3 className="text-sm font-semibold text-gray-700 flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-indigo-500">
               <path strokeLinecap="round" strokeLinejoin="round" d="M9.568 3H5.25A2.25 2.25 0 0 0 3 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 0 0 5.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 0 0 9.568 3Z" />
               <path strokeLinecap="round" strokeLinejoin="round" d="M6 6h.008v.008H6V6Z" />
            </svg>
            Hazır Ayar Paketleri (Presets)
         </h3>
         <span className="text-xs font-medium text-gray-400 bg-gray-100 px-2 py-1 rounded-md">
            {presets.length} / 10
         </span>
      </div>

      <div className="flex gap-3 overflow-x-auto pb-2 custom-scrollbar items-center min-h-[60px]">
        
        {/* Create New Button */}
        {isCreating ? (
            <div className="flex items-center gap-1 bg-white p-1 pr-2 rounded-full border border-indigo-200 shadow-lg min-w-[220px] animate-slide-in">
                <input 
                    type="text" 
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    placeholder="Paket adı..."
                    className="pl-4 py-2 bg-transparent text-sm font-medium outline-none text-gray-700 w-full placeholder:text-gray-300"
                    autoFocus
                    onKeyDown={(e) => e.key === 'Enter' && handleSaveClick()}
                />
                <button 
                    onClick={handleSaveClick}
                    className="p-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition-colors shadow-sm"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                        <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z" clipRule="evenodd" />
                    </svg>
                </button>
                <button 
                    onClick={() => setIsCreating(false)}
                    className="p-2 bg-gray-100 text-gray-400 rounded-full hover:bg-gray-200 hover:text-gray-600 transition-colors"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                        <path d="M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z" />
                    </svg>
                </button>
            </div>
        ) : (
            <button 
                onClick={() => setIsCreating(true)}
                className="flex flex-col items-center justify-center gap-1 w-32 h-20 border border-dashed border-gray-300 hover:border-indigo-400 hover:bg-indigo-50/50 rounded-xl transition-all duration-200 group flex-shrink-0"
            >
                <div className="w-8 h-8 rounded-full bg-gray-100 group-hover:bg-indigo-100 group-hover:text-indigo-600 flex items-center justify-center transition-colors text-gray-400">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                        <path d="M10.75 4.75a.75.75 0 0 0-1.5 0v4.5h-4.5a.75.75 0 0 0 0 1.5h4.5v4.5a.75.75 0 0 0 1.5 0v-4.5h4.5a.75.75 0 0 0 0-1.5h-4.5v-4.5Z" />
                    </svg>
                </div>
                <span className="text-xs font-medium text-gray-500 group-hover:text-indigo-600">Yeni Paket</span>
            </button>
        )}

        {/* Existing Presets */}
        {presets.map((preset) => (
            <div 
                key={preset.id} 
                className="group relative w-48 h-20 bg-white border border-gray-200 hover:border-indigo-300 hover:shadow-md rounded-xl p-3 cursor-pointer transition-all flex-shrink-0 flex flex-col justify-center animate-slide-in"
                onClick={() => onLoad(preset)}
            >
                <div className="flex justify-between items-start w-full">
                    <span className="text-sm font-bold text-gray-800 truncate pr-4 group-hover:text-indigo-700 transition-colors">
                        {preset.name}
                    </span>
                </div>
                <div className="flex items-center gap-2 mt-1">
                    <span className="text-[10px] text-gray-400 bg-gray-50 px-1.5 py-0.5 rounded border border-gray-100">
                        {Object.values(preset.selections).flat().length} Ayar
                    </span>
                    <span className="text-[10px] text-gray-300">
                         {new Date(preset.createdAt).toLocaleDateString()}
                    </span>
                </div>

                {/* Delete Button */}
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        if(window.confirm(`${preset.name} silinsin mi?`)) {
                            onDelete(preset.id);
                        }
                    }}
                    className="absolute top-2 right-2 p-1 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-full opacity-0 group-hover:opacity-100 transition-all"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5">
                        <path fillRule="evenodd" d="M8.75 1A2.75 2.75 0 0 0 6 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 1 0 .23 1.482l.149-.022.841 10.518A2.75 2.75 0 0 0 7.596 19h4.807a2.75 2.75 0 0 0 2.742-2.53l.841-10.52.149.023a.75.75 0 0 0 .23-1.482A41.03 41.03 0 0 0 14 4.193V3.75A2.75 2.75 0 0 0 11.25 1h-2.5ZM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4ZM8.58 7.72a.75.75 0 0 0-1.5.06l.3 7.5a.75.75 0 1 0 1.5-.06l-.3-7.5Zm4.34.06a.75.75 0 1 0-1.5-.06l-.3 7.5a.75.75 0 1 0 1.5.06l.3-7.5Z" clipRule="evenodd" />
                    </svg>
                </button>
            </div>
        ))}
      </div>
    </div>
  );
};