import React from 'react';
import { MapPin } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-gray-200 mt-auto">
      <div className="max-w-5xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center text-gray-500 text-sm">
            <MapPin className="h-4 w-4 mr-2 text-blue-600" />
            <span>Office No 129, Deva Palace, Lucknow</span>
          </div>
          <div className="text-xs text-gray-400">
            &copy; {new Date().getFullYear()} Idea Holiday Pvt Ltd. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};
