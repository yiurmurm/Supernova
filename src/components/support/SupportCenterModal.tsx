import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  X, 
  HelpCircle, 
  Sparkles, 
  Send, 
  ChevronDown, 
  ChevronUp, 
  Search, 
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';

export const SupportCenterModal: React.FC = () => {
  const { 
    isHelpOpen, 
    setIsHelpOpen, 
    orders, 
    supportTickets, 
    addSupportTicket, 
    triggerSoundEffect 
  } = useApp();

  const [activeTab, setActiveTab] = useState<'wizard' | 'faq' | 'tickets'>('wizard');

  // Wizard state
  const [selectedCategory, setSelectedCategory] = useState<string>('Track Order');
  const [selectedOrderId, setSelectedOrderId] = useState<string>(orders[0]?.id || '');
  const [ticketSubject, setTicketSubject] = useState<string>('');
  const [ticketMessage, setTicketMessage] = useState<string>('');
  const [latestResolution, setLatestResolution] = useState<{ id: string; advice: string } | null>(null);

  // FAQ state
  const [faqSearch, setFaqSearch] = useState('');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const categories = [
    'Track Order',
    'Return Product',
    'Request Refund',
    'Payment Failed',
    'Product Question',
    'Damaged Product',
    'Account Issue',
    'Gift Card Issue'
  ];

  const faqs = [
    {
      q: "How do I activate my superpower?",
      a: "Depending on your artifact class: Potions require oral consumption (take effect in 10-15 seconds); Sprays are misted onto wrists or temples; Accessories synchronize with natural biometric pulses within 3 minutes; Insects respond to gentle tactile communion."
    },
    {
      q: "Are the superpowers permanent or temporary?",
      a: "Unless explicitly designated as 'Omega-Class Permanent Bio-Infusion', all powers range from 15 minutes (Potions & Sprays) to indefinitely wearable as long as the jewelry or glasses remain equipped."
    },
    {
      q: "What happens if a superpower doesn't work?",
      a: "In 99.8% of cases, failure is caused by an electromagnetic or kinetic dampener nearby. Ensure you are at least 15 meters from government radar antennas. If still unresponsive, our Support Witch will perform an astral recalibration."
    },
    {
      q: "Can I return a potion after opening the vial?",
      a: "Once the cryogenic quantum seal has been broken, the active mana decays into harmless sparkling water within 48 hours. Broken seals cannot be returned, but defective or cracked vials are replaced immediately."
    },
    {
      q: "Is shipping really done via teleportation?",
      a: "Yes! Our high-frequency wormhole emitters at Citadel Vault 42 materialize standard packages inside your registered hideout lockbox within 0.1 seconds of dispatch authorization."
    },
    {
      q: "What if I accidentally freeze time forever?",
      a: "Do not panic. All chronokinetic devices operate on a biological heartbeat countdown (maximum 60-second intervals) to prevent perpetual spacetime lockouts. The universe will resume automatically."
    }
  ];

  if (!isHelpOpen) return null;

  const handleWizardSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ticketMessage) return;

    const ticket = addSupportTicket(
      selectedCategory,
      ticketSubject || `${selectedCategory} Assistance`,
      ticketMessage,
      selectedOrderId
    );

    setLatestResolution({
      id: ticket.id,
      advice: ticket.witchAdvice || 'The Support Witch has cast a resolution ward over your request.'
    });

    setTicketSubject('');
    setTicketMessage('');
  };

  const filteredFaqs = faqs.filter(f => 
    f.q.toLowerCase().includes(faqSearch.toLowerCase()) || 
    f.a.toLowerCase().includes(faqSearch.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-3 sm:p-6 overflow-y-auto">
      
      <div className="relative w-full max-w-3xl rounded-2xl border-4 border-black bg-[#0B0A10] p-6 sm:p-8 shadow-[10px_10px_0px_#000000,14px_14px_0px_#FF0055] my-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b-2 border-black pb-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#FF0055] text-white border-2 border-black shadow-[2px_2px_0px_#000000]">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-display text-2xl text-white tracking-wide">
                ASK THE SUPPORT WITCH & ORACLE
              </h3>
              <p className="text-xs font-mono-code text-zinc-400">
                CITADEL INTERACTIVE RESOLUTION WIZARD & KNOWLEDGE BASE
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsHelpOpen(false)}
            className="flex h-8 w-8 items-center justify-center rounded border border-[#2A2938] text-zinc-400 hover:text-white"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 border-b border-[#2A2938] pb-3 mb-6 text-xs font-display">
          <button
            onClick={() => setActiveTab('wizard')}
            className={`px-4 py-2 rounded-lg border-2 border-black transition-all ${
              activeTab === 'wizard' ? 'bg-[#FF0055] text-white shadow-[2px_2px_0px_#000000]' : 'bg-[#161521] text-zinc-300'
            }`}
          >
            ★ INTERACTIVE WIZARD
          </button>
          <button
            onClick={() => setActiveTab('faq')}
            className={`px-4 py-2 rounded-lg border-2 border-black transition-all ${
              activeTab === 'faq' ? 'bg-[#FF0055] text-white shadow-[2px_2px_0px_#000000]' : 'bg-[#161521] text-zinc-300'
            }`}
          >
            GRIMOIRE FAQ ({faqs.length})
          </button>
          <button
            onClick={() => setActiveTab('tickets')}
            className={`px-4 py-2 rounded-lg border-2 border-black transition-all ${
              activeTab === 'tickets' ? 'bg-[#FF0055] text-white shadow-[2px_2px_0px_#000000]' : 'bg-[#161521] text-zinc-300'
            }`}
          >
            ACTIVE MISSIVES ({supportTickets.length})
          </button>
        </div>

        {/* TAB 1: INTERACTIVE WIZARD */}
        {activeTab === 'wizard' && (
          <div className="space-y-6">
            
            {latestResolution ? (
              <div className="rounded-xl border-2 border-black bg-[#161521] p-6 shadow-[4px_4px_0px_#000000] text-center space-y-4">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#10B981]/20 border border-[#10B981] text-[#10B981]">
                  <CheckCircle2 className="h-6 w-6" />
                </div>
                <div>
                  <div className="text-xs font-mono-code text-[#00F0FF]">
                    CASE TRANSMISSION: {latestResolution.id}
                  </div>
                  <h4 className="font-display text-2xl text-white mt-1">
                    THE WITCH ORACLE HAS SPOKEN
                  </h4>
                </div>
                <div className="rounded-lg bg-[#0B0A10] border border-[#2A2938] p-4 text-xs font-mono-code text-zinc-200 leading-relaxed text-left">
                  🔮 {latestResolution.advice}
                </div>
                <button
                  onClick={() => setLatestResolution(null)}
                  className="rounded-lg bg-[#00F0FF] text-black font-display text-xs px-5 py-2.5 border border-black shadow-[2px_2px_0px_#000000]"
                >
                  START ANOTHER CONSULTATION
                </button>
              </div>
            ) : (
              <form onSubmit={handleWizardSubmit} className="space-y-4">
                
                {/* Step 1: Category selection */}
                <div>
                  <label className="block text-xs font-mono-code text-[#00F0FF] mb-2">
                    STEP 1: WHAT ISSUE CAN THE WITCH DIVINE FOR YOU?
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {categories.map((cat) => (
                      <button
                        type="button"
                        key={cat}
                        onClick={() => {
                          setSelectedCategory(cat);
                          triggerSoundEffect('CLICK!');
                        }}
                        className={`p-2 rounded-lg text-xs font-mono-code border transition-all text-left truncate ${
                          selectedCategory === cat
                            ? 'bg-[#FF0055] text-white border-black shadow-[2px_2px_0px_#000000] font-bold'
                            : 'bg-[#161521] text-zinc-400 border-[#2A2938] hover:text-white'
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Step 2: Contextual Details */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div>
                    <label className="block text-xs font-mono-code text-zinc-400 mb-1">
                      LINKED TELEPORT ORDER REF
                    </label>
                    <select
                      value={selectedOrderId}
                      onChange={(e) => setSelectedOrderId(e.target.value)}
                      className="w-full bg-[#161521] border border-[#2A2938] rounded-lg px-3 py-2 text-xs text-white font-mono-code"
                    >
                      {orders.map(o => (
                        <option key={o.id} value={o.id}>{o.id} ({o.date})</option>
                      ))}
                      <option value="GENERAL">No specific order / General Inquiry</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-mono-code text-zinc-400 mb-1">
                      BRIEF SUBJECT / PHENOMENON
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Teleport portal frequency calibration"
                      value={ticketSubject}
                      onChange={(e) => setTicketSubject(e.target.value)}
                      className="w-full bg-[#161521] border border-[#2A2938] rounded-lg px-3 py-2 text-xs text-white"
                    />
                  </div>
                </div>

                {/* Step 3: Message / Description */}
                <div>
                  <label className="block text-xs font-mono-code text-zinc-400 mb-1">
                    EXPLAIN THE SITUATION TO THE WITCH
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Describe your question or difficulty with this superpower..."
                    value={ticketMessage}
                    onChange={(e) => setTicketMessage(e.target.value)}
                    className="w-full bg-[#161521] border border-[#2A2938] rounded-lg px-3 py-2 text-xs text-white"
                  />
                </div>

                <div className="flex justify-end pt-2">
                  <button
                    type="submit"
                    className="flex items-center gap-2 rounded-xl bg-[#FF0055] px-6 py-3 font-display text-sm text-white border-2 border-black shadow-[3px_3px_0px_#000000] hover:bg-[#FF0033]"
                  >
                    <Send className="h-4 w-4" />
                    <span>CONSULT THE WITCH ORACLE</span>
                  </button>
                </div>
              </form>
            )}

          </div>
        )}

        {/* TAB 2: FAQ ACCORDION */}
        {activeTab === 'faq' && (
          <div className="space-y-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-zinc-400" />
              <input
                type="text"
                placeholder="Search the Ancient Grimoire FAQ..."
                value={faqSearch}
                onChange={(e) => setFaqSearch(e.target.value)}
                className="w-full bg-[#161521] border border-[#2A2938] rounded-lg pl-9 pr-3 py-2 text-xs text-white placeholder-zinc-500"
              />
            </div>

            {/* Accordion List */}
            <div className="space-y-2">
              {filteredFaqs.map((faq, idx) => {
                const isOpen = openFaqIndex === idx;
                return (
                  <div
                    key={idx}
                    className="rounded-xl border border-black bg-[#161521] overflow-hidden shadow-[2px_2px_0px_#000000]"
                  >
                    <button
                      onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                      className="w-full p-3.5 text-left flex items-center justify-between font-display text-sm text-white hover:text-[#00F0FF] transition-colors"
                    >
                      <span>{faq.q}</span>
                      {isOpen ? <ChevronUp className="h-4 w-4 text-[#00F0FF]" /> : <ChevronDown className="h-4 w-4 text-zinc-400" />}
                    </button>
                    {isOpen && (
                      <div className="px-3.5 pb-3.5 text-xs text-zinc-300 leading-relaxed border-t border-[#2A2938] pt-2">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 3: TICKETS */}
        {activeTab === 'tickets' && (
          <div className="space-y-3">
            {supportTickets.map((t) => (
              <div
                key={t.id}
                className="rounded-xl border border-black bg-[#161521] p-4 shadow-[2px_2px_0px_#000000] space-y-2"
              >
                <div className="flex items-center justify-between">
                  <div className="font-mono-code text-xs font-bold text-[#00F0FF]">
                    {t.id} · {t.category}
                  </div>
                  <span className="text-[10px] font-mono-code bg-[#10B981]/20 text-[#10B981] px-2 py-0.5 rounded">
                    {t.status}
                  </span>
                </div>
                <div className="font-display text-base text-white">{t.subject}</div>
                <div className="text-xs text-zinc-400">{t.message}</div>
                {t.witchAdvice && (
                  <div className="mt-2 bg-[#0B0A10] p-2.5 rounded border border-[#2A2938] text-[11px] font-mono-code text-[#F59E0B]">
                    🔮 Oracle Response: {t.witchAdvice}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
};
