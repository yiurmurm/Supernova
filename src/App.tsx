import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { PromoBanner } from './components/common/PromoBanner';
import { Header } from './components/common/Header';
import { Footer } from './components/common/Footer';
import { CursorParticles } from './components/common/CursorParticles';

import { HeroSection } from './components/home/HeroSection';
import { CategoryShowcase } from './components/home/CategoryShowcase';
import { ProductLineGrid } from './components/home/ProductLineGrid';
import { PowerQuizSection } from './components/home/PowerQuizSection';
import { WhimsicalReviews } from './components/home/WhimsicalReviews';

import { CatalogView } from './components/catalog/CatalogView';
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
    <div className="min-h-screen bg-[#0B0A10] text-white flex flex-col font-sans selection:bg-[#00F0FF] selection:text-black">
      {/* Sparkling Star Particle Trails & Comic Popups */}
      <CursorParticles />

      {/* Top Banner Alert */}
      <PromoBanner />

      {/* Sticky High-Octane Navigation */}
      <Header />

      {/* Dynamic View Router */}
      <main className="flex-1">
        {activeTab === 'home' && (
          <>
            <HeroSection />
            <CategoryShowcase />
            <ProductLineGrid />
            <PowerQuizSection />
            <WhimsicalReviews />
          </>
        )}

        {(activeTab === 'shop' || activeTab === 'bestsellers' || activeTab === 'new-arrivals') && (
          <CatalogView />
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

      {/* Comic Halftone Panel Footer */}
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
