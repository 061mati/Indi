import React, { useState, useEffect } from 'react';
import { LayoutDashboard, CreditCard, LogOut, Menu, X, Eye, Edit3, Languages } from 'lucide-react';
import SmartParticles from './components/visuals/SmartParticles';
import CardPreview from './components/preview/CardPreview';
import CardEditor from './components/editor/CardEditor';
import Dashboard from './components/dashboard/Dashboard';
import ShareModal from './components/modals/ShareModal';
import PricingModal from './components/modals/PricingModal';
import { DigitalCard, Language } from './types';
import { getStoredCards, saveCardToStorage, deleteCardFromStorage, createNewCardTemplate } from './services/storageService';
import { translations } from './lib/i18n';

type ViewState = 'dashboard' | 'editor' | 'live';

function App() {
  // Start in Editor mode by default as requested
  const [currentView, setCurrentView] = useState<ViewState>('editor');
  
  // State for Data Management
  const [cards, setCards] = useState<DigitalCard[]>([]);
  const [selectedCardId, setSelectedCardId] = useState<string | null>(null);
  const [cardToUpgrade, setCardToUpgrade] = useState<DigitalCard | null>(null);
  
  // Language State - Default to Spanish ('es')
  const [language, setLanguage] = useState<Language>('es');

  // Computed property for the active card being edited/viewed
  // If no card is selected, we use a fallback template to avoid crashes
  const activeCard = cards.find(c => c.id === selectedCardId) || createNewCardTemplate();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showMobilePreview, setShowMobilePreview] = useState(false);
  
  // Publishing State
  const [isPublishing, setIsPublishing] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [showPricingModal, setShowPricingModal] = useState(false);

  const t = translations[language].nav;

  // Load cards on mount and ensure we have an active card for the editor
  useEffect(() => {
    const storedCards = getStoredCards();
    setCards(storedCards);

    // If there are stored cards, select the first one to edit immediately
    if (storedCards.length > 0) {
      setSelectedCardId(storedCards[0].id);
    } else {
      // If no cards exist, we let the UI handle the "New Template" state via the fallback
      // But to be cleaner, we can initialize one:
      const newCard = createNewCardTemplate();
      const updated = saveCardToStorage(newCard);
      setCards(updated);
      setSelectedCardId(newCard.id);
    }
  }, []);

  // Navigation Handlers
  const handleCreateCard = () => {
    const newCard = createNewCardTemplate();
    const updatedCards = saveCardToStorage(newCard);
    setCards(updatedCards);
    setSelectedCardId(newCard.id);
    setCurrentView('editor');
  };

  const handleEditCard = (card: DigitalCard) => {
    setSelectedCardId(card.id);
    setCurrentView('editor');
  };

  const handleDeleteCard = (id: string) => {
    if (!id) return;
    const updatedCards = deleteCardFromStorage(id);
    // Important: Create a new array reference to ensure React detects the change
    setCards([...updatedCards]);
    
    // If we deleted the active card, go back to dashboard
    if (selectedCardId === id) {
      setSelectedCardId(null);
      setCurrentView('dashboard');
    }
  };

  const handleViewLive = (card: DigitalCard) => {
    setSelectedCardId(card.id);
    setCurrentView('live');
  };

  const handleGoToDashboard = () => {
    setCurrentView('dashboard');
    setIsMobileMenuOpen(false);
  };

  const handleGoToEditor = () => {
    // If no card selected, pick the first one or create new
    if (!selectedCardId && cards.length > 0) {
        setSelectedCardId(cards[0].id);
    } else if (cards.length === 0) {
        handleCreateCard();
        return;
    }
    setCurrentView('editor');
    setIsMobileMenuOpen(false);
  };

  // Editor Actions
  const handleSaveCard = (cardToSave: DigitalCard) => {
    // Optimistic update
    setCards(prev => prev.map(c => c.id === cardToSave.id ? cardToSave : c));
    saveCardToStorage(cardToSave);
  };

  const handlePublish = () => {
    setIsPublishing(true);
    // Simulate API call
    setTimeout(() => {
      setIsPublishing(false);
      const uniqueId = Math.random().toString(36).substring(7);
      const publishedUrl = `https://indi.app/c/${activeCard.firstName.toLowerCase()}-${uniqueId}`;
      
      const publishedCard = {
        ...activeCard,
        isPublished: true,
        publishedUrl: publishedUrl
      };
      
      handleSaveCard(publishedCard);
      setShowShareModal(true);
    }, 1500);
  };

  // Upgrade Flow
  const handleUpgradeClick = (card: DigitalCard) => {
    setCardToUpgrade(card);
    setShowPricingModal(true);
  };

  const handleUpgradeSuccess = () => {
    if (cardToUpgrade) {
      const upgradedCard: DigitalCard = {
        ...cardToUpgrade,
        subscriptionStatus: 'active',
        planType: 'pro'
      };
      handleSaveCard(upgradedCard);
    }
    setShowPricingModal(false);
    setCardToUpgrade(null);
  };

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'es' ? 'en' : 'es');
  };

  // Render Theme Config for Particles
  const themeColor = activeCard.themeConfig?.brandColor || '#10b981';

  // --- LIVE MODE RENDER ---
  if (currentView === 'live') {
    return (
      <div className="min-h-screen bg-black">
        <CardPreview card={activeCard} mode="live" language={language} />
        
        {/* Floating Action Button to Return to Editor */}
        <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
            <button 
            onClick={() => setCurrentView('editor')}
            className="flex items-center gap-2 px-5 py-3 bg-slate-900/80 backdrop-blur-md border border-slate-700 rounded-full shadow-2xl text-white font-medium hover:bg-slate-800 transition-all"
            >
            <Edit3 size={18} />
            <span>{language === 'es' ? 'Editar Tarjeta' : 'Edit Card'}</span>
            </button>
            <button 
            onClick={handleGoToDashboard}
            className="flex items-center justify-center w-12 h-12 bg-black/50 backdrop-blur-md border border-slate-700 rounded-full shadow-2xl text-white hover:bg-slate-900 transition-all"
            >
            <LayoutDashboard size={18} />
            </button>
        </div>
      </div>
    );
  }

  // --- APP SHELL RENDER ---
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 overflow-hidden font-sans">
      
      {/* Dynamic Background Effect */}
      <SmartParticles color={themeColor} intensity="subtle" />

      {/* Navigation */}
      <nav className="fixed top-0 w-full h-24 border-b border-slate-800 bg-slate-950/80 backdrop-blur-md z-50 flex items-center justify-between px-8">
        <div className="flex items-center cursor-pointer group" onClick={handleGoToEditor}>
           {/* Text Only Logo */}
           <span className="font-black text-5xl tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-600 drop-shadow-lg hover:opacity-90 transition-opacity pb-1">
              INDI
            </span>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-6">
          
          {/* Dashboard Button */}
          <button 
            onClick={handleGoToDashboard}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-full transition-all text-sm font-bold tracking-wide border ${
              currentView === 'dashboard' 
                ? 'bg-slate-800 text-emerald-400 border-slate-700 shadow-lg shadow-emerald-900/20' 
                : 'text-slate-400 border-transparent hover:text-white hover:bg-slate-800/50'
            }`}
          >
            <LayoutDashboard size={18} />
            {t.dashboard}
          </button>

          <div className="h-8 w-px bg-slate-800"></div>

          <button 
            onClick={toggleLanguage}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900 border border-slate-800 text-slate-300 hover:text-white transition-colors text-xs font-bold uppercase tracking-wider"
          >
            <Languages size={16} />
            {language}
          </button>

          <div className="flex items-center gap-3 px-4 py-2 rounded-full bg-slate-900 border border-slate-800 shadow-sm">
            <img src={activeCard.avatarUrl} alt="User" className="w-8 h-8 rounded-full border border-slate-600 object-cover" />
            <span className="text-sm font-semibold text-slate-200 truncate max-w-[120px]">{activeCard.firstName}</span>
          </div>
        </div>

        {/* Mobile Toggle */}
        <div className="flex items-center gap-4 md:hidden">
          <button 
            onClick={toggleLanguage}
            className="flex items-center gap-1 px-3 py-1.5 rounded bg-slate-900 border border-slate-800 text-slate-300 text-xs font-bold uppercase"
          >
            {language}
          </button>
          <button className="p-2 text-slate-300 hover:text-white transition-colors" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="fixed top-24 left-0 w-full bg-slate-900/95 backdrop-blur-xl border-b border-slate-800 z-40 p-6 md:hidden animate-fade-in flex flex-col gap-4 shadow-2xl">
           <button 
            onClick={handleGoToDashboard}
            className="flex items-center gap-3 px-4 py-4 rounded-xl bg-slate-800 text-white font-bold"
           >
             <LayoutDashboard size={24} /> {t.dashboard}
           </button>
           <button 
            onClick={handleGoToEditor}
            className="flex items-center gap-3 px-4 py-4 rounded-xl hover:bg-slate-800 text-slate-300 font-bold"
           >
             <Edit3 size={24} /> {t.editor}
           </button>
        </div>
      )}

      {/* Main Content Layout */}
      <main className="pt-32 pb-12 px-6 h-screen flex flex-col md:flex-row gap-8 mx-auto z-10 relative">
        
        {currentView === 'editor' ? (
          <>
            {/* Editor Panel */}
            <div className="flex-1 min-w-0 bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col animate-slide-up">
              <div className="p-4 border-b border-slate-800 bg-slate-900/40 flex justify-between items-center md:hidden">
                  <h2 className="text-sm font-semibold text-white">Editor</h2>
                  <button onClick={() => setShowMobilePreview(true)} className="flex items-center gap-2 px-3 py-1 bg-emerald-600/20 text-emerald-400 rounded-full text-xs border border-emerald-600/30">
                    <Eye size={12} /> {language === 'es' ? 'Vista Previa' : 'Preview'}
                  </button>
              </div>
              <CardEditor 
                card={activeCard} 
                setCard={(updater) => {
                    const updatedCard = typeof updater === 'function' ? updater(activeCard) : updater;
                    handleSaveCard(updatedCard);
                }}
                onPublish={handlePublish}
                isPublishing={isPublishing}
                language={language}
              />
            </div>

            {/* Preview Panel (Desktop) */}
            <div className="flex-1 hidden lg:flex items-center justify-center bg-slate-900/30 rounded-2xl border border-slate-800/50 relative group">
              <CardPreview card={activeCard} scale={1.0} mode="preview" language={language} />
            </div>
          </>
        ) : (
          /* Dashboard View - Now Full Width */
          <div className="w-full h-full overflow-y-auto scrollbar-hide">
            <Dashboard 
              cards={cards} 
              onCreateNew={handleCreateCard} 
              onEdit={handleEditCard}
              onDelete={handleDeleteCard}
              onViewLive={handleViewLive}
              onUpgrade={handleUpgradeClick}
              language={language}
            />
          </div>
        )}
      </main>

      {/* Mobile Preview Overlay */}
      {showMobilePreview && currentView === 'editor' && (
        <div className="fixed inset-0 z-[60] bg-slate-950/95 backdrop-blur-xl flex flex-col items-center justify-center animate-fade-in p-4 lg:hidden">
          <div className="absolute top-4 right-4 z-50">
            <button onClick={() => setShowMobilePreview(false)} className="p-3 bg-slate-800 rounded-full text-white border border-slate-700 shadow-xl">
              <X size={24} />
            </button>
          </div>
          <div className="scale-[0.85] sm:scale-100 origin-center transition-transform">
             <CardPreview card={activeCard} mode="preview" language={language} />
          </div>
        </div>
      )}

      {/* Share Modal */}
      {showShareModal && (
        <ShareModal 
          isOpen={showShareModal} 
          onClose={() => setShowShareModal(false)} 
          url={activeCard.publishedUrl || ''} 
          onOpenLive={() => {
              setShowShareModal(false);
              setCurrentView('live');
          }}
          language={language}
        />
      )}

      {/* Pricing Modal */}
      {showPricingModal && (
        <PricingModal 
          isOpen={showPricingModal} 
          onClose={() => setShowPricingModal(false)}
          onSuccess={handleUpgradeSuccess}
          language={language}
        />
      )}

      {/* Global Styles */}
      <style>{`
        @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slide-up { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fade-in { animation: fade-in 0.5s ease-out; }
        .animate-slide-up { animation: slide-up 0.5s ease-out; }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
}

export default App;