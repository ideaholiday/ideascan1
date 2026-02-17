import React from 'react';
import { Scan, Building2 } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-2">
            <div className="bg-blue-600 p-2 rounded-lg">
              <Scan className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900 tracking-tight">IdeaScan</h1>
              <p className="text-xs text-blue-600 font-medium uppercase tracking-wider">Idea Holiday Pvt Ltd</p>
            </div>
          </div>
          <div className="hidden md:flex items-center text-gray-500 text-sm gap-2">
            <Building2 className="h-4 w-4" />
            <span>Internal Tool: B2B Operator Panel</span>
          </div>
        </div>
      </div>
    </header>
  );
};
