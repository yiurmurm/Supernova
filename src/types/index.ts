export type SuperpowerCategory = 'potions' | 'sprays' | 'accessories' | 'insects' | 'eyewear';

export type RarityLevel = 'Common' | 'Rare' | 'Epic' | 'Legendary' | 'Omega-Class';

export interface PowerStats {
  speed: number;       // 0-100
  power: number;       // 0-100
  intelligence: number;// 0-100
  stealth: number;     // 0-100
  durability: number;  // 0-100
}

export interface Product {
  id: string;
  name: string;
  tagline: string;
  category: SuperpowerCategory;
  categoryLabel: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  rarity: RarityLevel;
  powerType: string;
  duration: string;
  powerLevel: number;
  magicType: string;
  description: string;
  powerSpecs: string[];
  howItWorks: string;
  storyLore: string;
  stats: PowerStats;
  image: string;
  variants?: string[];
  badge?: string;
  bestseller?: boolean;
  newArrival?: boolean;
  limitedEdition?: boolean;
  archetype: 'tech' | 'mutant' | 'mystic';
  originDimension?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedVariant?: string;
}

export interface Address {
  id: string;
  name: string;
  address: string;
  lat: number;
  lng: number;
  isSecretHideout: boolean;
}

export interface MascotCompanion {
  id: string;
  name: string;
  title: string;
  species: string;
  avatarEmoji: string;
  perk: string;
  greeting: string;
  tips: string[];
}

export interface UserProfile {
  heroAlias: string;
  secretIdentity: string;
  email: string;
  avatar: string;
  isGoogleLinked: boolean;
  mode: 'hero' | 'villain';
  powerLevelScore: number;
  powerLevelRank: 'Mundane' | 'Trainee' | 'Heroic Junior' | 'Gentle Legend' | 'Cosmic Friend';
  equippedPowers: string[]; // product IDs
  savedAddresses: Address[];
  giftCardBalance: number;
}

export interface Order {
  id: string;
  date: string;
  items: CartItem[];
  total: number;
  deliveryMode: 'teleport' | 'sonic' | 'subterranean';
  status: 'Processing' | 'In Teleport Transit' | 'Sonic Drop Dispatched' | 'Delivered to Hideout';
  trackingStep: number;
  destinationAddress: string;
  coordinates: { lat: number; lng: number };
  teleportPassCode: string;
}

export interface SupportTicket {
  id: string;
  category: string;
  orderId?: string;
  subject: string;
  message: string;
  status: 'Submitted' | 'Under Review' | 'In Progress' | 'Resolved';
  date: string;
  witchAdvice?: string;
}

export interface OnomatopoeiaEvent {
  id: string;
  text: string;
  x: number;
  y: number;
  color?: string;
}

export interface QuizQuestion {
  id: number;
  question: string;
  subtitle: string;
  options: {
    label: string;
    description: string;
    powerAffinity: 'teleportation' | 'time' | 'electricity' | 'flight' | 'stealth';
    icon: string;
  }[];
}

export interface QuizResult {
  powerName: string;
  tagline: string;
  archetype: string;
  description: string;
  recommendedProductIds: string[];
  stats: PowerStats;
}
