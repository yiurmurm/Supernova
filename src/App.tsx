import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { PromoBanner } from './components/common/PromoBanner';
import { Header } from './components/common/Header';
import { Footer } from './components/common/Footer';
import { CursorParticles } from './components/common/CursorParticles';
import { FriendlyLoadingScreen } from './components/common/FriendlyLoadingScreen';

import { HeroSection } from './components/home/HeroSection';
import { PowerCompanionWidget } from './components/home/PowerCompanionWidget';
import { CategoryShowcase } from './components/home/CategoryShowcase';
import { ProductLineGrid } from './components/home/ProductLineGrid';
import { PowerQuizSection } from './components/home/PowerQuizSection';
import { WhimsicalReviews } from './components/home/WhimsicalReviews';

import { CatalogView } from './components/catalog/CatalogView';
import { LocalDeliveryPage } from './components/delivery/LocalDeliveryPage';
import { OrderTrackingView } from './components/orders/OrderTrackingView';

import { ProductDetailModal } from './components/pdp/ProductDetailModal';
import { UtilityBeltCart } from './components/cart/UtilityBeltCart';
import { TeleportCheckoutModal } from './components/checkout/TeleportCheckoutModal';
import { HeroProfileModal } from './components/profile/HeroProfileModal';
import { SupportCenterModal } from './components/support/SupportCenterModal';
import { AuthModal } from './components/auth/AuthModal';

const MainContent: React.FC = () => {
  const { activeTab } = useApp();

  return (
    <div className="min-h-screen bg-[#FDFBF0] text-[#333333] flex flex-col font-clean selection:bg-[#FFF6D6] selection:text-[#2F3E46] halftone-bg">
      {/* Friendly Manga-Style Pulsing Loading Screen (Screen 1 Requirement) */}
      <FriendlyLoadingScreen />

      {/* Whimsical Star Trails & Floating Comic Badges */}
      <CursorParticles />

      {/* Top Banner Alert */}
      <PromoBanner />

      {/* Whimsical Comic Header */}
      <Header />

      {/* Dynamic View Router */}
      <main className="flex-1">
        {activeTab === 'home' && (
          <>
            {/* Hero Section (Z-pattern, Franklin Gothic stability logo, Baskerville comfort headline, cozy tea hero illustration) */}
            <HeroSection />

            {/* Interactive Break 1: Power Companion Widget (Pet Mascot Selection) */}
            <PowerCompanionWidget />

            {/* Category Medium Showcase */}
            <CategoryShowcase />

            {/* Themed Product Lines: Jewelry, Eyewear, Potions, Insects & Sprays */}
            <ProductLineGrid />

            {/* Whimsical Aptitude Quiz (Dynamic Product Border calibration) */}
            <PowerQuizSection />

            {/* Friendly Community Field Reports */}
            <WhimsicalReviews />
          </>
        )}

        {(activeTab === 'shop' || activeTab === 'bestsellers' || activeTab === 'new-arrivals') && (
          <CatalogView />
        )}

        {activeTab === 'delivery' && (
          <LocalDeliveryPage />
        )}

        {activeTab === 'quiz' && (
          <div className="py-8">
            <PowerQuizSection />
          </div>
        )}

        {activeTab === 'orders' && (
          <OrderTrackingView />
        )}
      </main>

      {/* Global Modals & Drawers */}
      <ProductDetailModal />
      <UtilityBeltCart />
      <TeleportCheckoutModal />
      <HeroProfileModal />
      <SupportCenterModal />
      <AuthModal />

      {/* Whimsical Comic Footer */}
      <Footer />
    </div>
  );
};

export function App() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}

export default App;
