export type PhoneSeries = 
  | 'Galaxy S' 
  | 'Galaxy A' 
  | 'Galaxy M' 
  | 'Galaxy Note' 
  | 'Galaxy Z' 
  | 'Galaxy F' 
  | 'Galaxy J' 
  | 'Galaxy XCover';

export type SupportStatus = 'active' | 'security_only' | 'discontinued';

export interface ModelCodeVariant {
  code: string;
  regionDescription: string;
  bandsOrSim?: string;
}

export interface SoftwareMilestone {
  androidVersion: string;
  oneUIVersion: string;
  releaseDate: string;
  buildNumber?: string;
  notes: string;
  isInitial?: boolean;
  isFinal?: boolean;
}

export interface SamsungPhone {
  id: string;
  name: string;
  series: PhoneSeries;
  modelCodes: string[];
  variants?: ModelCodeVariant[];
  releaseDate: string; // e.g. "2019-02"
  releaseDateFormatted: string; // e.g. "Fevral 2019"
  factoryAndroid: string; // e.g. "Android 9 (Pie)"
  factoryOneUI: string; // e.g. "One UI 1.1"
  latestAndroid: string; // e.g. "Android 11"
  latestOneUI: string; // e.g. "One UI 3.1"
  supportStatus: SupportStatus;
  securityPatchStatus: string;
  chipset: string;
  display?: string;
  isFeatured?: boolean;
  image?: string;
  description: string;
  historyTimeline: SoftwareMilestone[];
  supportedOneUIVersions: string[]; // e.g. ["One UI 1.1", "One UI 2.0", "One UI 2.1", "One UI 2.5", "One UI 3.1"]
}

export interface OneUIFeature {
  title: string;
  description: string;
  category: 'ui' | 'camera' | 'battery' | 'security' | 'ai' | 'system';
}

export interface OneUIVersionData {
  id: string;
  version: string; // e.g. "One UI 3.1"
  codeName?: string;
  androidBase: string; // e.g. "Android 11"
  releaseDate: string; // e.g. "Mart 2021"
  status: 'released' | 'beta' | 'planned';
  headline: string;
  newFeatures: string[];
  uiChanges: string[];
  supportedDevicesSummary: string;
  detailedChangelog: string;
  iconAccentColor?: string;
}

export interface AndroidVersionData {
  version: string; // e.g. "Android 11"
  codename: string; // e.g. "Red Velvet Cake"
  apiLevel: number;
  releaseYear: string;
  samsungOneUIPairing: string;
  majorFeatures: string[];
}

export interface FirmwareItem {
  id: string;
  model: string; // e.g. "Galaxy A50"
  modelCode: string; // e.g. "SM-A505F"
  csc: string; // e.g. "CAC", "SER", "DBT"
  region: string; // e.g. "O'zbekiston (CAC)", "Rossiya (SER)", "Germaniya (DBT)"
  country: string; // e.g. "O'zbekiston"
  androidVersion: string; // e.g. "Android 11"
  oneUIVersion: string; // e.g. "One UI 3.1"
  buildNumber: string; // e.g. "A505FDDU9CVD1"
  securityPatch: string; // e.g. "2023-04-01"
  releaseDate: string; // e.g. "2023-04-18"
  fileSize?: string;
}

export type CompatibilityStatus = 'compatible' | 'insufficient_data' | 'incompatible';

export interface CompatibilityCheckResult {
  status: CompatibilityStatus;
  statusText: string;
  modelName: string;
  currentOneUI: string;
  targetOneUI: string;
  summary: string;
  reasons: string[];
  recommendation: string;
}

export type NavTab = 
  | 'home' 
  | 'phones' 
  | 'a50' 
  | 'oneui' 
  | 'android' 
  | 'checker' 
  | 'firmware' 
  | 'install' 
  | 'admin';
