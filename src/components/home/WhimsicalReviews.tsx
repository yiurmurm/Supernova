import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Star, MessageSquarePlus, Sparkles, CheckCircle2 } from 'lucide-react';

interface ReviewItem {
  id: string;
  quote: string;
  author: string;
  role: string;
  itemUsed: string;
  stars: number;
}

export const WhimsicalReviews: React.FC = () => {
  const { triggerSoundEffect } = useApp();

  const [reviews, setReviews] = useState<ReviewItem[]>([
    {
      id: 'rev-1',
      quote: "I froze time for exactly 10 seconds to catch my hot chamomile mug mid-fall. Not a single drop was spilled on the rug!",
      author: "Maya Lin",
      role: "Verified Tea Enthusiast ★",
      itemUsed: "TimeLoop Bracelet",
      stars: 5
    },
    {
      id: 'rev-2',
      quote: "The CogniVision reading frames make late-night books so gentle on the eyes. Filtered harsh blue glare into warm honey glow.",
      author: "Alex V.",
      role: "Night Reader ★",
      itemUsed: "CogniVision Spectacles",
      stars: 5
    },
    {
      id: 'rev-3',
      quote: "Pip the Glow Moth is officially my favourite companion. Gently glows at night and sits peacefully on my bedside table.",
      author: "Sam 'Sparky'",
      role: "Cozy Hideout Owner ★",
      itemUsed: "Glow Moth Familiar",
      stars: 5
    },
    {
      id: 'rev-4',
      quote: "Opened a mini portal between my kitchen toaster and desk. Warm cinnamon toast delivered without getting out of my chair!",
      author: "Elena Rostova",
      role: "Gentle Teleport User ★",
      itemUsed: "PortalRing Starlight",
      stars: 5
    }
  ]);

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [newAuthor, setNewAuthor] = useState('');
  const [newRole, setNewRole] = useState('Friendly Neighbor ★');
  const [newItem, setNewItem] = useState('Voltaris Elixir');
  const [newQuote, setNewQuote] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newQuote || !newAuthor) return;

    const newRev: ReviewItem = {
      id: 'rev-' + Date.now(),
      quote: newQuote,
      author: newAuthor,
      role: newRole,
      itemUsed: newItem,
      stars: 5
    };

    setReviews([newRev, ...reviews]);
    setIsFormOpen(false);
    setNewQuote('');
    setNewAuthor('');
    triggerSoundEffect('FIELD MISSIVE LOGGED! ✦', undefined, undefined, '#4A90E2');
  };

  return (
    <section className="relative border-b-2 border-[#2F3E46] bg-[#FDFBF0] py-16 sm:py-24 halftone-bg">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 bg-white border-2 border-[#2F3E46] p-6 rounded-3xl shadow-[4px_4px_0px_#2F3E46]">
          <div>
            <div className="inline-flex items-center gap-1.5 rounded-full bg-[#EBF3FC] px-3 py-1 text-xs font-stability font-semibold text-[#4A90E2] border border-[#4A90E2]/30 mb-2 uppercase tracking-wider">
              <Sparkles className="h-3.5 w-3.5" />
              <span>COMMUNITY STORIES // DISPATCH TESTIMONIALS</span>
            </div>
            <h2 className="font-comfort text-3xl sm:text-4xl font-bold text-[#2F3E46] tracking-tight">
              Friendly Field Reports
            </h2>
            <p className="font-clean text-sm text-[#5C676D] mt-1 max-w-xl">
              Real notes from neighbors, tea lovers, and everyday heroes enjoying gentle supernatural comforts.
            </p>
          </div>

          <button
            onClick={() => setIsFormOpen(!isFormOpen)}
            className="flex items-center gap-2 rounded-2xl bg-[#FFC800] px-4 py-2.5 font-stability text-xs font-bold text-[#2F3E46] border border-[#2F3E46] shadow-[2px_2px_0px_#2F3E46] hover:bg-[#4A90E2] hover:text-white transition-all self-start sm:self-auto cursor-pointer"
          >
            <MessageSquarePlus className="h-4 w-4" />
            <span>{isFormOpen ? 'CLOSE FORM' : 'SUBMIT YOUR MISSIVE'}</span>
          </button>
        </div>

        {/* User Submission Form Drawer */}
        {isFormOpen && (
          <form onSubmit={handleSubmit} className="mb-10 rounded-3xl border-2 border-[#2F3E46] bg-white p-6 shadow-[4px_4px_0px_#2F3E46] space-y-4">
            <h3 className="font-comfort text-xl text-[#2F3E46]">Write a Friendly Field Note</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <input
                type="text"
                placeholder="Your Name or Alias"
                value={newAuthor}
                onChange={(e) => setNewAuthor(e.target.value)}
                required
                className="bg-[#FDFBF0] border-2 border-[#2F3E46] rounded-xl px-3 py-2 text-xs font-clean text-[#2F3E46]"
              />
              <input
                type="text"
                placeholder="Your Role (e.g. Tea Wizard, Balcony Aviator)"
                value={newRole}
                onChange={(e) => setNewRole(e.target.value)}
                className="bg-[#FDFBF0] border-2 border-[#2F3E46] rounded-xl px-3 py-2 text-xs font-clean text-[#2F3E46]"
              />
              <input
                type="text"
                placeholder="Product Used (e.g. Voltaris, PortalRing)"
                value={newItem}
                onChange={(e) => setNewItem(e.target.value)}
                className="bg-[#FDFBF0] border-2 border-[#2F3E46] rounded-xl px-3 py-2 text-xs font-clean text-[#2F3E46]"
              />
            </div>
            <textarea
              placeholder="How did this power make your morning more delightful or cozy?"
              value={newQuote}
              onChange={(e) => setNewQuote(e.target.value)}
              required
              rows={3}
              className="w-full bg-[#FDFBF0] border-2 border-[#2F3E46] rounded-xl p-3 text-xs font-clean text-[#2F3E46]"
            />
            <button
              type="submit"
              className="rounded-xl bg-[#4A90E2] text-white px-5 py-2 font-stability text-xs font-bold border border-[#2F3E46] shadow-[2px_2px_0px_#2F3E46] hover:bg-[#FFC800] hover:text-[#2F3E46] transition-all cursor-pointer"
            >
              SEND MISSIVE TO APOTHECARY
            </button>
          </form>
        )}

        {/* 4 Comic Review Balloons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className="rounded-3xl border-2 border-[#2F3E46] bg-white p-5 shadow-[3px_3px_0px_#2F3E46] flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-1 text-[#FFC800] mb-3">
                  {[...Array(rev.stars)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" />
                  ))}
                </div>

                <p className="font-handwritten text-base text-[#2F3E46] leading-snug">
                  &ldquo;{rev.quote}&rdquo;
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-[#F5F3E8]">
                <div className="font-expressive text-sm text-[#2F3E46]">{rev.author}</div>
                <div className="text-[11px] font-clean text-[#4A90E2] flex items-center gap-1 mt-0.5">
                  <CheckCircle2 className="h-3 w-3" />
                  <span>{rev.role}</span>
                </div>
                <div className="text-[10px] font-mono-code text-[#5C676D] mt-1">
                  Item: {rev.itemUsed}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
