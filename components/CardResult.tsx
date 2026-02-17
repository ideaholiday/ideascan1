import React from 'react';
import { User, Briefcase, Building, Phone, Mail, MapPin, Globe, Copy, Check, Save } from 'lucide-react';
import { BusinessCardData } from '../types';

interface CardResultProps {
  data: BusinessCardData;
  imageUrl: string;
  onReset: () => void;
  onSave: () => void;
}

export const CardResult: React.FC<CardResultProps> = ({ data, imageUrl, onReset, onSave }) => {
  const [copiedField, setCopiedField] = React.useState<string | null>(null);

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const FieldItem = ({ icon: Icon, label, value, fieldKey }: { icon: any, label: string, value: string, fieldKey: string }) => {
    if (!value) return null;
    
    return (
      <div className="flex items-start p-3 bg-gray-50 rounded-lg group hover:bg-gray-100 transition-colors">
        <div className="mt-1 p-2 bg-white rounded-md shadow-sm text-blue-600">
          <Icon className="w-4 h-4" />
        </div>
        <div className="ml-3 flex-1 overflow-hidden">
          <p className="text-xs font-medium text-gray-500 uppercase">{label}</p>
          <p className="text-sm font-medium text-gray-900 break-words">{value}</p>
        </div>
        <button 
          onClick={() => copyToClipboard(value, fieldKey)}
          className="ml-2 p-1.5 text-gray-400 hover:text-blue-600 rounded-md hover:bg-white transition-all opacity-0 group-hover:opacity-100"
          title="Copy"
        >
          {copiedField === fieldKey ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
        </button>
      </div>
    );
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-fade-in">
      {/* Image Preview */}
      <div className="space-y-4">
        <div className="bg-white p-2 rounded-xl shadow-sm border border-gray-200">
          <img 
            src={imageUrl} 
            alt="Scanned Card" 
            className="w-full h-auto rounded-lg object-contain max-h-[500px] mx-auto bg-gray-900/5"
          />
        </div>
        <div className="flex justify-center">
            <button
                onClick={onReset}
                className="text-sm text-gray-500 hover:text-gray-700 underline underline-offset-2"
            >
                Scan Another Card
            </button>
        </div>
      </div>

      {/* Details */}
      <div className="space-y-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                <h2 className="text-lg font-semibold text-gray-900">Extracted Details</h2>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    High Confidence
                </span>
            </div>
            
            <div className="p-6 space-y-4">
                <div className="grid grid-cols-1 gap-4">
                    <FieldItem icon={User} label="Full Name" value={data.name} fieldKey="name" />
                    <FieldItem icon={Briefcase} label="Job Title" value={data.jobTitle} fieldKey="jobTitle" />
                    <FieldItem icon={Building} label="Company" value={data.companyName} fieldKey="companyName" />
                    <FieldItem icon={Phone} label="Phone" value={data.phone} fieldKey="phone" />
                    <FieldItem icon={Mail} label="Email" value={data.email} fieldKey="email" />
                    <FieldItem icon={Globe} label="Website" value={data.website} fieldKey="website" />
                    <FieldItem icon={MapPin} label="Address" value={data.address} fieldKey="address" />
                </div>
                
                {data.description && (
                  <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-100">
                    <p className="text-xs font-semibold text-blue-800 mb-1">NOTES / SERVICES</p>
                    <p className="text-sm text-blue-900">{data.description}</p>
                  </div>
                )}
            </div>
            
            <div className="bg-gray-50 px-6 py-4 flex justify-end">
                <button
                    onClick={onSave}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                    <Save className="w-4 h-4 mr-2" />
                    Save to History
                </button>
            </div>
        </div>
      </div>
    </div>
  );
};
