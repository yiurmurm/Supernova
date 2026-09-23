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
      quote: "I froze time for exactly 10 seconds and still somehow managed to be late.",
      author: "Maya",
      role: "Verified Wizard ✦",
      itemUsed: "TimeLoop Bracelet",
      stars: 5
    },
    {
      id: 'rev-2',
      quote: "The Aura Vision glasses are mildly terrifying. 10/10.",
      author: "Alex",
      role: "Verified Customer ✦",
      itemUsed: "SpectraSight Aviators",
      stars: 5
    },
    {
      id: 'rev-3',
      quote: "The Glow Moth is officially my favourite roommate. Doesn't complain, eats ambient static, and glows purple at 3 AM.",
      author: "Sam",
      role: "Verified Customer ✦",
      itemUsed: "Firefly Core Capsule",
      stars: 5
    },
    {
      id: 'rev-4',
      quote: "Accidentally opened a portal into my refrigerator from my office desk. Productivity has plummeted; snack consumption is up 400%.",
      author: "Elena Rostova",
      role: "Quantum Courier ✦",
      itemUsed: "PortalRing",
      stars: 5
    }
  ]);

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [newAuthor, setNewAuthor] = useState('');
  const [newRole, setNewRole] = useState('Rookie Hero ✦');
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
    triggerSoundEffect('FIELD REPORT LOGGED! ★');
  };

  return (
    <section className="relative border-b border-[#2A2938] bg-[#161521] py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12 border-b border-[#2A2938] pb-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono-code text-[#F59E0B] mb-2 uppercase tracking-wider">
              <Sparkles className="h-3.5 w-3.5" />
              <span>FIELD REPORTS & TRANSMISSIONS</span>
            </div>
            <h2 className="font-display text-4xl sm:text-5xl text-white tracking-wide">
              WHIMSICAL HERO REVIEWS
            </h2>
            <p className="text-zinc-400 text-sm mt-1 max-w-xl">
              Real testimonials from active operators, sorcerers, and ordinary citizens navigating extraordinary abilities.
            </p>
          </div>

          <button
            onClick={() => setIsFormOpen(!isFormOpen)}
            className="flex items-center gap-2 rounded-lg bg-[#0B0A10] px-4 py-2.5 text-xs font-display text-white border-2 border-black hover:border-[#00F0FF] shadow-[3px_3px_0px_#000000] transition-all self-start sm:self-auto"
          >
            <MessageSquarePlus className="h-4 w-4 text-[#00F0FF]" />
            <span>SUBMIT TRANSMISSION</span>
          </button>
        </div>

        {/* Modal / In-line Form for New Review */}
        {isFormOpen && (
          <form
            onSubmit={handleSubmit}
            className="mb-10 rounded-xl border-3 border-black bg-[#0B0A10] p-6 shadow-[5px_5px_0px_#000000] space-y-4 max-w-xl mx-auto"
          >
            <div className="font-display text-lg text-white">
              TRANSMIT NEW FIELD REPORT
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-mono-code text-zinc-400 mb-1">
                  HERO ALIAS / NAME
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Agent Phoenix"
                  value={newAuthor}
                  onChange={(e) => setNewAuthor(e.target.value)}
                  className="w-full bg-[#161521] border border-[#2A2938] rounded px-3 py-2 text-xs text-white"
                />
              </div>
              <div>
                <label className="block text-[11px] font-mono-code text-zinc-400 mb-1">
                  FACTION / CLASS
                </label>
                <input
                  type="text"
                  value={newRole}
                  onChange={(e) => setNewRole(e.target.value)}
                  className="w-full bg-[#161521] border border-[#2A2938] rounded px-3 py-2 text-xs text-white"
                />
              </div>
            </div>
            <div>
              <label className="block text-[11px] font-mono-code text-zinc-400 mb-1">
                SUPERPOWER ARTIFACT USED
              </label>
              <input
                type="text"
                value={newItem}
                onChange={(e) => setNewItem(e.target.value)}
                className="w-full bg-[#161521] border border-[#2A2938] rounded px-3 py-2 text-xs text-white"
              />
            </div>
            <div>
              <label className="block text-[11px] font-mono-code text-zinc-400 mb-1">
                FIELD EXPERIENCE (KEEP IT WHIMSICAL)
              </label>
              <textarea
                required
                rows={3}
                placeholder="What happened when you activated this superpower?"
                value={newQuote}
                onChange={(e) => setNewQuote(e.target.value)}
                className="w-full bg-[#161521] border border-[#2A2938] rounded px-3 py-2 text-xs text-white"
              />
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setIsFormOpen(false)}
                className="px-3 py-1.5 text-xs text-zinc-400 hover:text-white"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-1.5 rounded bg-[#F59E0B] text-black font-display text-sm border border-black shadow-[2px_2px_0px_#000000]"
              >
                BROADCAST REVIEW
              </button>
            </div>
          </form>
        )}

        {/* Reviews Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className="relative flex flex-col justify-between rounded-xl border-2 border-black bg-[#0B0A10] p-6 shadow-[4px_4px_0px_#000000] hover:shadow-[6px_6px_0px_#F59E0B] transition-all hover:-translate-y-1"
            >
              {/* Star Rating */}
              <div className="flex items-center gap-1 mb-4 text-[#F59E0B]">
                {[...Array(rev.stars)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-current" />
                ))}
              </div>

              {/* Quote */}
              <blockquote className="font-heading text-sm text-zinc-200 italic leading-relaxed mb-6 flex-1">
                “{rev.quote}”
              </blockquote>

              {/* Author & Item */}
              <div className="border-t border-[#2A2938] pt-3">
                <div className="flex items-center justify-between">
                  <div className="font-display text-base text-white tracking-wide">
                    {rev.author}
                  </div>
                  <CheckCircle2 className="h-3.5 w-3.5 text-[#00F0FF]" />
                </div>
                <div className="text-[11px] font-mono-code text-[#00F0FF]">
                  {rev.role}
                </div>
                <div className="text-[10px] font-mono-code text-zinc-400 mt-1">
                  Equipped: {rev.itemUsed}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
