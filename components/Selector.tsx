import React from 'react';
import { CategoryGroup, SelectionCategory } from '../types';
import { GlassCard } from './GlassCard';

interface SelectorProps {
  category: CategoryGroup;
  selectedValues: string[];
  onToggle: (category: SelectionCategory, value: string) => void;
}

export const Selector: React.FC<SelectorProps> = ({ category, selectedValues, onToggle }) => {
  const isSingle = category.selectionType === 'single';

  return (
    <GlassCard className="mb-6 border-l-4 border-l-gray-300/50">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-widest flex items-center gap-2">
          <span className={`w-2 h-2 rounded-full ${isSingle ? 'bg-indigo-400' : 'bg-emerald-400'}`}></span>
          {category.title}
        </h3>
        <span className="text-[10px] uppercase font-medium text-gray-400 bg-gray-100/50 px-2 py-1 rounded-md border border-gray-200">
          {isSingle ? 'Tekli Seçim' : 'Çoklu Seçim'}
        </span>
      </div>
      
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
        {category.items.map((item) => {
          const isSelected = selectedValues.includes(item.id);
          return (
            <button
              key={item.id}
              onClick={() => onToggle(category.id as SelectionCategory, item.id)}
              className={`
                relative overflow-hidden text-left p-3 rounded-xl transition-all duration-300
                border
                flex flex-col justify-between h-20 md:h-24
                active:scale-95
                ${isSelected 
                  ? 'bg-gradient-to-br from-gray-700 to-gray-900 text-white border-transparent shadow-md transform scale-[1.01]' 
                  : 'bg-white/40 text-gray-600 border-white/40 hover:bg-white/60 hover:border-white/60'
                }
              `}
            >
              <div className="flex justify-between items-start w-full">
                <span className={`text-xs md:text-sm font-medium pr-2 ${isSelected ? 'text-gray-100' : 'text-gray-800'}`}>
                  {item.label}
                </span>
                {/* Visual Indicator for Selection Type */}
                <div className={`
                    w-3 h-3 min-w-[12px] rounded-full border border-current opacity-50 flex items-center justify-center
                    ${isSelected ? 'opacity-100' : ''}
                    ${isSingle ? 'rounded-full' : 'rounded-sm'}
                `}>
                    {isSelected && <div className={`w-1.5 h-1.5 bg-white ${isSingle ? 'rounded-full' : 'rounded-[1px]'}`} />}
                </div>
              </div>

              <span className={`text-[9px] md:text-[10px] leading-tight mt-1 line-clamp-2 ${isSelected ? 'text-gray-300' : 'text-gray-500'}`}>
                {item.description}
              </span>
              
              {/* Subtle sheen effect for selected items */}
              {isSelected && (
                <div className="absolute inset-0 bg-white/10 pointer-events-none" />
              )}
            </button>
          );
        })}
      </div>
    </GlassCard>
  );
};