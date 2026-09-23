import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem, UserProfile, Order, SupportTicket, OnomatopoeiaEvent } from '../types';
import { PRODUCTS } from '../data/products';

interface AppContextType {
  cart: CartItem[];
  cartCount: number;
  cartSubtotal: number;
  discountAmount: number;
  appliedCoupon: string | null;
  utilityBeltCapacity: number; // percentage 0-100%
  addToCart: (product: Product, quantity?: number, variant?: string, event?: React.MouseEvent) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  applyCoupon: (code: string) => { success: boolean; message: string };

  wishlist: string[];
  toggleWishlist: (productId: string, event?: React.MouseEvent) => void;
  isInWishlist: (productId: string) => boolean;

  user: UserProfile;
  setUser: React.Dispatch<React.SetStateAction<UserProfile>>;
  linkGoogleAccount: () => void;
  toggleHeroVillainMode: () => void;
  equipPower: (productId: string, event?: React.MouseEvent) => void;
  unequipPower: (productId: string) => void;
  updateSecretHideout: (address: string, lat: number, lng: number) => void;

  orders: Order[];
  createOrder: (deliveryMode: 'teleport' | 'sonic' | 'subterranean', destinationAddress: string, coordinates: { lat: number; lng: number }) => Order;
  activeTrackingOrder: Order | null;
  setActiveTrackingOrder: (order: Order | null) => void;

  supportTickets: SupportTicket[];
  addSupportTicket: (category: string, subject: string, message: string, orderId?: string) => SupportTicket;

  selectedProduct: Product | null;
  setSelectedProduct: (product: Product | null) => void;

  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isAuthOpen: boolean;
  setIsAuthOpen: (open: boolean) => void;
  isProfileOpen: boolean;
  setIsProfileOpen: (open: boolean) => void;
  isHelpOpen: boolean;
  setIsHelpOpen: (open: boolean) => void;
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;

  activeTab: 'home' | 'shop' | 'bestsellers' | 'new-arrivals' | 'quiz' | 'orders';
  setActiveTab: (tab: 'home' | 'shop' | 'bestsellers' | 'new-arrivals' | 'quiz' | 'orders') => void;
  activeCategory: string | null;
  setActiveCategory: (cat: string | null) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;

  powerSurge: number;
  setPowerSurge: (surge: number) => void;

  onomatopoeiaList: OnomatopoeiaEvent[];
  triggerSoundEffect: (text: string, x?: number, y?: number, color?: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Cart State
  const [cart, setCart] = useState<CartItem[]>([
    {
      product: PRODUCTS.find(p => p.id === 'potion-voltaris') || PRODUCTS[0],
      quantity: 1,
      selectedVariant: 'Single Dose Vial (50ml)'
    }
  ]);
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>('HERO2026');

  // Wishlist State
  const [wishlist, setWishlist] = useState<string[]>(['acc-portalring', 'eyewear-cognivision']);

  // User Profile
  const [user, setUser] = useState<UserProfile>({
    heroAlias: 'Agent Nova-01',
    secretIdentity: 'Alex Mercer',
    email: 'alex.mercer@supranova.labs',
    avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=AgentNova',
    isGoogleLinked: true,
    mode: 'hero',
    powerLevelScore: 9420,
    equippedPowers: ['potion-voltaris', 'acc-portalring'],
    savedAddresses: [
      {
        id: 'addr-1',
        name: 'Apex Hideout (Bunker 4)',
        address: '742 Evergreen Terrace, Sector 7, Neo-Citadel',
        lat: 37.7749,
        lng: -122.4194,
        isSecretHideout: true
      },
      {
        id: 'addr-2',
        name: 'Civilian Penthouse',
        address: '450 Lexington Ave, Suite 2100, New York',
        lat: 40.7516,
        lng: -73.9754,
        isSecretHideout: false
      }
    ],
    giftCardBalance: 150
  });

  // Orders State
  const [orders, setOrders] = useState<Order[]>([
    {
      id: 'SN-90821-X',
      date: 'September 21, 2026',
      items: [
        {
          product: PRODUCTS.find(p => p.id === 'acc-portalring') || PRODUCTS[20],
          quantity: 1,
          selectedVariant: 'Titanium & Starlight Gold (Size 8)'
        }
      ],
      total: 899,
      deliveryMode: 'teleport',
      status: 'In Teleport Transit',
      trackingStep: 2,
      destinationAddress: 'Apex Hideout (Bunker 4), Neo-Citadel',
      coordinates: { lat: 37.7749, lng: -122.4194 },
      teleportPassCode: 'QUANTUM-PORTAL-KEY-9941'
    }
  ]);
  const [activeTrackingOrder, setActiveTrackingOrder] = useState<Order | null>(orders[0]);

  // Support Tickets State
  const [supportTickets, setSupportTickets] = useState<SupportTicket[]>([
    {
      id: 'TICKET-4402',
      category: 'Time Reversal Question',
      orderId: 'SN-90821-X',
      subject: 'TimeLoop Bracelet latency calibration',
      message: 'Does the 10-second rewind affect surrounding electronic camera footage or only biological coordinates?',
      status: 'In Progress',
      date: '2026-09-22',
      witchAdvice: 'The Support Witch consulted the Chrono-Oracle: all electromagnetic camera sensors within the localized 15m radius revert quantum states seamlessly!'
    }
  ]);

  // Navigation & Modals
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  const [activeTab, setActiveTab] = useState<'home' | 'shop' | 'bestsellers' | 'new-arrivals' | 'quiz' | 'orders'>('home');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Power Surge Slider (0 - 100)
  const [powerSurge, setPowerSurge] = useState(65);

  // Onomatopoeia Popups
  const [onomatopoeiaList, setOnomatopoeiaList] = useState<OnomatopoeiaEvent[]>([]);

  const triggerSoundEffect = (text: string, x?: number, y?: number, color?: string) => {
    const posX = x ?? (typeof window !== 'undefined' ? window.innerWidth / 2 + (Math.random() * 200 - 100) : 300);
    const posY = y ?? (typeof window !== 'undefined' ? window.innerHeight / 2 + (Math.random() * 200 - 100) : 300);
    
    const newEvent: OnomatopoeiaEvent = {
      id: Math.random().toString(36).substring(2, 9),
      text,
      x: posX,
      y: posY,
      color: color || (user.mode === 'villain' ? '#FF0033' : '#00F0FF')
    };

    setOnomatopoeiaList(prev => [...prev.slice(-8), newEvent]);

    setTimeout(() => {
      setOnomatopoeiaList(prev => prev.filter(item => item.id !== newEvent.id));
    }, 1000);
  };

  // Cart calculations
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartSubtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const discountRate = appliedCoupon === 'HERO2026' ? 0.15 : appliedCoupon === 'VILLAIN10' ? 0.10 : appliedCoupon === 'SUPERNOVA' ? 0.20 : 0;
  const discountAmount = Math.round(cartSubtotal * discountRate);
  
  // Utility belt capacity (max 10 items is 100% capacity)
  const utilityBeltCapacity = Math.min(100, Math.round((cartCount / 8) * 100));

  const addToCart = (product: Product, quantity = 1, variant?: string, event?: React.MouseEvent) => {
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id && item.selectedVariant === variant);
      if (existing) {
        return prev.map(item =>
          item.product.id === product.id && item.selectedVariant === variant
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity, selectedVariant: variant || product.variants?.[0] }];
    });

    const sounds = ['LOCK & LOAD!', 'ZIP!', 'EQUIPPED!', 'BAM!'];
    const randomSound = sounds[Math.floor(Math.random() * sounds.length)];
    triggerSoundEffect(randomSound, event?.clientX, event?.clientY);
    setIsCartOpen(true);
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prev => prev.map(item => item.product.id === productId ? { ...item, quantity } : item));
    triggerSoundEffect('CLICK!');
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.product.id !== productId));
    triggerSoundEffect('DISCARD!');
  };

  const clearCart = () => setCart([]);

  const applyCoupon = (code: string) => {
    const clean = code.trim().toUpperCase();
    if (clean === 'HERO2026' || clean === 'VILLAIN10' || clean === 'SUPERNOVA') {
      setAppliedCoupon(clean);
      triggerSoundEffect('BOOM! 15% OFF');
      return { success: true, message: `Coupon ${clean} applied successfully!` };
    }
    return { success: false, message: 'Invalid Superpower authorization code.' };
  };

  // Wishlist
  const toggleWishlist = (productId: string, event?: React.MouseEvent) => {
    setWishlist(prev => {
      const exists = prev.includes(productId);
      if (exists) {
        triggerSoundEffect('POOF!', event?.clientX, event?.clientY);
        return prev.filter(id => id !== productId);
      } else {
        triggerSoundEffect('STAR-LOCK! ★', event?.clientX, event?.clientY, '#F59E0B');
        return [...prev, productId];
      }
    });
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  // User Actions
  const linkGoogleAccount = () => {
    setUser(prev => ({
      ...prev,
      isGoogleLinked: true,
      heroAlias: 'Supreme Vanguard',
      avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=SupremeVanguard'
    }));
    triggerSoundEffect('GOOGLE IDENTITY SYNCED!', undefined, undefined, '#4285F4');
  };

  const toggleHeroVillainMode = () => {
    setUser(prev => {
      const nextMode = prev.mode === 'hero' ? 'villain' : 'hero';
      if (nextMode === 'villain') {
        document.documentElement.classList.add('villain-mode');
        triggerSoundEffect('VILLAIN MODE AWAKENED! ⚡', undefined, undefined, '#FF0033');
      } else {
        document.documentElement.classList.remove('villain-mode');
        triggerSoundEffect('HERO MODE ENGAGED! 🛡️', undefined, undefined, '#00F0FF');
      }
      return { ...prev, mode: nextMode };
    });
  };

  const equipPower = (productId: string, event?: React.MouseEvent) => {
    setUser(prev => {
      const exists = prev.equippedPowers.includes(productId);
      let updated: string[];
      if (exists) {
        updated = prev.equippedPowers.filter(id => id !== productId);
        triggerSoundEffect('UNEQUIPPED!', event?.clientX, event?.clientY);
      } else {
        updated = [...prev.equippedPowers, productId];
        triggerSoundEffect('POWER SYNCHRONIZED! ⚡', event?.clientX, event?.clientY, '#8B5CF6');
      }
      return {
        ...prev,
        equippedPowers: updated,
        powerLevelScore: 9000 + updated.length * 350
      };
    });
  };

  const unequipPower = (productId: string) => {
    setUser(prev => ({
      ...prev,
      equippedPowers: prev.equippedPowers.filter(id => id !== productId),
      powerLevelScore: Math.max(8000, prev.powerLevelScore - 350)
    }));
    triggerSoundEffect('UNEQUIPPED!');
  };

  const updateSecretHideout = (address: string, lat: number, lng: number) => {
    setUser(prev => ({
      ...prev,
      savedAddresses: [
        {
          id: 'hideout-' + Date.now(),
          name: 'Primary Secret Hideout',
          address,
          lat,
          lng,
          isSecretHideout: true
        },
        ...prev.savedAddresses.filter(a => !a.isSecretHideout)
      ]
    }));
    triggerSoundEffect('BASE COORDINATES LOCKED!');
  };

  // Orders
  const createOrder = (
    deliveryMode: 'teleport' | 'sonic' | 'subterranean',
    destinationAddress: string,
    coordinates: { lat: number; lng: number }
  ): Order => {
    const newOrder: Order = {
      id: `SN-${Math.floor(10000 + Math.random() * 90000)}-${user.mode === 'villain' ? 'VLN' : 'HRO'}`,
      date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      items: [...cart],
      total: Math.max(0, cartSubtotal - discountAmount),
      deliveryMode,
      status: deliveryMode === 'teleport' ? 'In Teleport Transit' : 'Sonic Drop Dispatched',
      trackingStep: 1,
      destinationAddress,
      coordinates,
      teleportPassCode: `PASS-${Math.random().toString(36).substring(2, 8).toUpperCase()}`
    };

    setOrders(prev => [newOrder, ...prev]);
    setActiveTrackingOrder(newOrder);
    clearCart();
    triggerSoundEffect('TELEPORT DISPATCH AUTHORIZED! 🚀');
    return newOrder;
  };

  // Support Tickets
  const addSupportTicket = (category: string, subject: string, message: string, orderId?: string): SupportTicket => {
    const witchResponses: Record<string, string> = {
      'Track Order': 'The Support Witch divines your quantum coordinates: Your teleport capsule is currently bypassing gravitational eddies and is right on schedule!',
      'Return Product': 'Unbinding spell initiated: As long as the containment seal is unbroken, our astral retrieval familiar will collect the artifact.',
      'Request Refund': 'Mana refund approved: Your credits are flowing back into your dimensional ledger within 1-2 astral cycles.',
      'Payment Failed': 'The psychic firewall detected a frequency mismatch. Switching to Google Pay or direct Mana Transfer will bypass the restriction.',
      'Product Question': 'The Oracle has consulted the Grimoire of Sector 7: This superpower operates via non-invasive resonance and harmonizes with existing abilities!',
      'Damaged Product': 'Astral replacement issued: If your vial or crystal arrived fractured, an emergency teleport replacement has been flagged.',
      'Account Issue': 'Identity realignment complete: Your secret hero dossier has been safely calibrated with your master Google key.',
      'Gift Card Issue': 'Mana balance refreshed: The runes have recharged your card balance to optimal capacity.'
    };

    const newTicket: SupportTicket = {
      id: `TICKET-${Math.floor(1000 + Math.random() * 9000)}`,
      category,
      orderId,
      subject,
      message,
      status: 'Submitted',
      date: new Date().toISOString().split('T')[0],
      witchAdvice: witchResponses[category] || 'The Support Witch has received your missive and is casting a resolution ward over your issue!'
    };

    setSupportTickets(prev => [newTicket, ...prev]);
    triggerSoundEffect('WITCH SPELL CAST! ✨', undefined, undefined, '#FF0055');
    return newTicket;
  };

  // Secret Konami Code Easter Egg
  // Up Up Down Down Left Right Left Right B A
  useEffect(() => {
    const konamiSequence = [
      'ArrowUp', 'ArrowUp',
      'ArrowDown', 'ArrowDown',
      'ArrowLeft', 'ArrowRight',
      'ArrowLeft', 'ArrowRight',
      'b', 'a'
    ];
    let currentIndex = 0;

    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      const expectedKey = konamiSequence[currentIndex].toLowerCase();

      if (key === expectedKey) {
        currentIndex++;
        if (currentIndex === konamiSequence.length) {
          currentIndex = 0;
          toggleHeroVillainMode();
        }
      } else {
        currentIndex = 0;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <AppContext.Provider
      value={{
        cart,
        cartCount,
        cartSubtotal,
        discountAmount,
        appliedCoupon,
        utilityBeltCapacity,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        applyCoupon,

        wishlist,
        toggleWishlist,
        isInWishlist,

        user,
        setUser,
        linkGoogleAccount,
        toggleHeroVillainMode,
        equipPower,
        unequipPower,
        updateSecretHideout,

        orders,
        createOrder,
        activeTrackingOrder,
        setActiveTrackingOrder,

        supportTickets,
        addSupportTicket,

        selectedProduct,
        setSelectedProduct,

        isCartOpen,
        setIsCartOpen,
        isAuthOpen,
        setIsAuthOpen,
        isProfileOpen,
        setIsProfileOpen,
        isHelpOpen,
        setIsHelpOpen,
        isCheckoutOpen,
        setIsCheckoutOpen,

        activeTab,
        setActiveTab,
        activeCategory,
        setActiveCategory,
        searchQuery,
        setSearchQuery,

        powerSurge,
        setPowerSurge,

        onomatopoeiaList,
        triggerSoundEffect
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
