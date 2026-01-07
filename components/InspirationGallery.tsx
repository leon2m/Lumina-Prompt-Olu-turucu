import React, { useState } from 'react';
import { ViralExample, GalleryCategory } from '../types';
import { GlassCard } from './GlassCard';
import { VIRAL_EXAMPLES, GALLERY_FILTERS } from '../constants';

interface InspirationGalleryProps {
  onSelect: (example: ViralExample) => void;
}

export const InspirationGallery: React.FC<InspirationGalleryProps> = ({ onSelect }) => {
  const [activeCategory, setActiveCategory] = useState<GalleryCategory>('all');

  const filteredExamples = activeCategory === 'all' 
    ? VIRAL_EXAMPLES 
    : VIRAL_EXAMPLES.filter(ex => ex.category === activeCategory);

  return (
    <div className="w-full mt-16 md:mt-24 pb-12">
      
      {/* Header Section */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 text-sm font-medium mb-3">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
             <path fillRule="evenodd" d="M9.661 2.237a.531.531 0 0 1 .678 0 11.947 11.947 0 0 0 7.078 2.749.5.5 0 0 1 .479.425c.069.452.104.91.104 1.372 0 5.122-3.06 9.87-7.982 12.241a.532.532 0 0 1-.44 0C4.06 16.654 1 11.906 1 6.783c0-.463.035-.921.104-1.372a.5.5 0 0 1 .479-.425A11.947 11.947 0 0 0 9.661 2.237Z" clipRule="evenodd" />
          </svg>
          Viral Showcase
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 tracking-tight">İlham Galerisi</h2>
        <p className="text-gray-500 mt-2 max-w-2xl mx-auto">
          Dünya genelinde trend olan video stilleri. Tek tıkla parametreleri kopyalayın ve kendi vizyonunuzu oluşturun.
        </p>
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap justify-center gap-2 mb-10">
        {GALLERY_FILTERS.map((filter) => (
          <button
            key={filter.id}
            onClick={() => setActiveCategory(filter.id)}
            className={`
              px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300
              ${activeCategory === filter.id 
                ? 'bg-gray-800 text-white shadow-lg scale-105' 
                : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
              }
            `}
          >
            {filter.label}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-2">
        {filteredExamples.map((example) => (
          <GlassCard 
            key={example.id} 
            className="group p-0 overflow-hidden border-0 relative aspect-video cursor-pointer shadow-lg hover:shadow-2xl hover:-translate-y-1"
            onClick={() => onSelect(example)}
          >
            {/* Background Image */}
            <div className="absolute inset-0 w-full h-full">
               <img 
                 src={example.thumbnail} 
                 alt={example.title} 
                 className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
               />
               {/* Play Icon Overlay */}
               <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/40 transition-colors">
                  <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/40 group-hover:scale-110 transition-transform duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-white ml-0.5">
                       <path fillRule="evenodd" d="M4.5 5.653c0-1.427 1.529-2.33 2.779-1.643l11.54 6.347c1.295.712 1.295 2.573 0 3.286L7.28 19.99c-1.25.687-2.779-.217-2.779-1.643V5.653Z" clipRule="evenodd" />
                    </svg>
                  </div>
               </div>
               {/* Gradient Overlay for Text */}
               <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-90" />
            </div>

            {/* Content */}
            <div className="absolute bottom-0 left-0 w-full p-6 text-white z-10 flex flex-col justify-end h-full">
               <div className="transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                  <div className="flex items-center justify-between mb-2">
                     <span className="inline-block px-2 py-0.5 bg-white/20 backdrop-blur-md rounded text-[10px] uppercase font-bold tracking-wider">
                       {example.categoryLabel}
                     </span>
                     <span className="text-[10px] opacity-70 border border-white/30 px-1.5 rounded">
                        {example.suggested_settings.fps} FPS
                     </span>
                  </div>
                  <h4 className="text-xl font-bold leading-tight mb-1">{example.title}</h4>
                  <p className="text-xs text-gray-300 line-clamp-2 opacity-80 group-hover:opacity-100 transition-opacity">
                    {example.video_generation_prompt}
                  </p>
               </div>
            </div>
          </GlassCard>
        ))}
      </div>
      
      {filteredExamples.length === 0 && (
        <div className="text-center py-20 text-gray-400">
           Bu kategoride henüz örnek bulunmuyor.
        </div>
      )}

    </div>
  );
};