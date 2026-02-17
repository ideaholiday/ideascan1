export interface BusinessCardData {
  name: string;
  jobTitle: string;
  companyName: string;
  phone: string;
  email: string;
  address: string;
  website: string;
  description: string;
}

export interface ScannedCard {
  id: string;
  timestamp: number;
  imageUrl: string;
  data: BusinessCardData;
}

export type ScanStatus = 'idle' | 'scanning' | 'success' | 'error';
