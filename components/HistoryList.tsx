import React from 'react';
import { ScannedCard } from '../types';
import { Clock, Trash2, ExternalLink } from 'lucide-react';

interface HistoryListProps {
  history: ScannedCard[];
  onClear: () => void;
  onSelect: (card: ScannedCard) => void;
}

export const HistoryList: React.FC<HistoryListProps> = ({ history, onClear, onSelect }) => {
  if (history.length === 0) return null;

  return (
    <div className="mt-12 space-y-4">
      <div className="flex items-center justify-between px-1">
        <div className="flex items-center gap-2 text-gray-800">
            <Clock className="w-5 h-5" />
            <h2 className="text-lg font-semibold">Recent Scans</h2>
        </div>
        <button 
            onClick={onClear}
            className="text-xs text-red-500 hover:text-red-700 flex items-center gap-1 hover:bg-red-50 px-2 py-1 rounded"
        >
            <Trash2 className="w-3 h-3" />
            Clear History
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {history.map((card) => (
          <div 
            key={card.id}
            onClick={() => onSelect(card)}
            className="group bg-white rounded-xl p-4 shadow-sm border border-gray-200 hover:shadow-md hover:border-blue-300 transition-all cursor-pointer flex gap-4 items-center"
          >
            <div className="h-16 w-16 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0 border border-gray-100">
                <img src={card.imageUrl} alt="thumbnail" className="w-full h-full object-cover" />
            </div>
            <div className="flex-1 min-w-0">
                <h3 className="text-sm font-semibold text-gray-900 truncate">
                    {card.data.name || 'Unknown Name'}
                </h3>
                <p className="text-xs text-gray-500 truncate">
                    {card.data.companyName || 'Unknown Company'}
                </p>
                <p className="text-xs text-gray-400 mt-1">
                    {new Date(card.timestamp).toLocaleDateString()}
                </p>
            </div>
            <ExternalLink className="w-4 h-4 text-gray-300 group-hover:text-blue-500" />
          </div>
        ))}
      </div>
    </div>
  );
};
