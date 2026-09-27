import React, { useState } from 'react';
import {
  X,
  Info,
  ShieldCheck,
  TrendingUp,
  Truck,
  Tractor,
  ShoppingBag,
  CheckCircle2,
  HelpCircle,
  Phone,
  Mail,
  MapPin,
  Sparkles,
  ArrowRight,
  DollarSign,
  Layers,
  Leaf,
  Scale,
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface PortalInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PortalInfoModal: React.FC<PortalInfoModalProps> = ({ isOpen, onClose }) => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<'overview' | 'economics' | 'coldchain' | 'faq'>('overview');
  const [simulatedAmount, setSimulatedAmount] = useState<number>(1000);

  if (!isOpen) return null;

  const farmerShare = simulatedAmount * 0.88;
  const logisticsShare = simulatedAmount * 0.07;
  const platformShare = simulatedAmount * 0.05;

  const traditionalFarmerShare = simulatedAmount * 0.32;
  const traditionalMiddlemanCut = simulatedAmount * 0.68;

  return (
    <div className="fixed inset-0 z-50 bg-neutral-950/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-150">
      <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-neutral-200 relative flex flex-col">
        {/* Modal Top Header */}
        <div className="sticky top-0 z-20 bg-white/95 backdrop-blur-md px-6 py-4 border-b border-neutral-200 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-700 to-teal-500 text-white flex items-center justify-center shadow-md">
              <Leaf className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-black text-neutral-900 tracking-tight flex items-center gap-2">
                <span>FarmDirect Portal Architecture &amp; System Info</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300">
                  v3.8 Open Platform
                </span>
              </h2>
              <p className="text-xs text-neutral-500">
                Direct Producer-to-Consumer Agricultural Collective &amp; Cold-Chain Ecosystem
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-full text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Sub-Navigation Tabs */}
        <div className="px-6 pt-4 border-b border-neutral-150 flex items-center gap-2 overflow-x-auto scrollbar-none">
          {[
            { id: 'overview', label: '1. Platform Mission & Flow', icon: Info },
            { id: 'economics', label: '2. 88% Economic Transparency', icon: Scale },
            { id: 'coldchain', label: '3. Cold-Chain & Nearest Pickup', icon: Truck },
            { id: 'faq', label: '4. FAQ & Helpline Support', icon: HelpCircle },
          ].map((tab) => {
            const Icon = tab.icon;
            const isSel = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id as any)}
                className={`pb-3 px-3 text-xs font-bold transition-all border-b-2 flex items-center gap-2 whitespace-nowrap cursor-pointer ${
                  isSel
                    ? 'border-emerald-600 text-emerald-800 font-black'
                    : 'border-transparent text-neutral-500 hover:text-neutral-800'
                }`}
              >
                <Icon className={`w-4 h-4 ${isSel ? 'text-emerald-700' : 'text-neutral-400'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Content Body */}
        <div className="p-6 space-y-6">
          {/* TAB 1: OVERVIEW & FLOW */}
          {activeTab === 'overview' && (
            <div className="space-y-6 animate-in fade-in duration-150">
              <div className="bg-gradient-to-r from-emerald-950 via-teal-950 to-neutral-900 text-white rounded-2xl p-5 border border-emerald-500/30">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 flex items-center justify-center flex-shrink-0">
                    <Sparkles className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white">
                      Eliminating Middlemen: Real-Time Decentralized Farm Commerce
                    </h3>
                    <p className="text-xs text-neutral-300 mt-1 leading-relaxed">
                      In the legacy APMC system, crops pass through 5 to 7 intermediaries (village traders, commission
                      agents, mandi brokers, wholesalers, and retail markups), taking 50% to 70% of consumer spend.
                      FarmDirect connects verified regional farmer collectives directly to consumers through cold-chain logistics.
                    </p>
                  </div>
                </div>
              </div>

              {/* 4-Step Visual Journey */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-500 mb-3">
                  How FarmDirect Works (4-Stage Quality Guarantee)
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  <div className="bg-neutral-50 border border-neutral-200 rounded-2xl p-4">
                    <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center text-xs font-bold mb-2">
                      01
                    </div>
                    <h5 className="font-bold text-xs text-neutral-900">Dawn Harvest</h5>
                    <p className="text-[11px] text-neutral-500 mt-1">
                      Farmers harvest vegetables and fruits between 4:30 AM and 6:30 AM at peak ripeness and moisture.
                    </p>
                  </div>

                  <div className="bg-neutral-50 border border-neutral-200 rounded-2xl p-4">
                    <div className="w-8 h-8 rounded-xl bg-blue-100 text-blue-800 flex items-center justify-center text-xs font-bold mb-2">
                      02
                    </div>
                    <h5 className="font-bold text-xs text-neutral-900">Hub Grading &amp; Audit</h5>
                    <p className="text-[11px] text-neutral-500 mt-1">
                      Local FPO consolidation centers test organic residue, grade produce (A+/A), and pack in eco-crates.
                    </p>
                  </div>

                  <div className="bg-neutral-50 border border-neutral-200 rounded-2xl p-4">
                    <div className="w-8 h-8 rounded-xl bg-purple-100 text-purple-800 flex items-center justify-center text-xs font-bold mb-2">
                      03
                    </div>
                    <h5 className="font-bold text-xs text-neutral-900">Electric Cold-Van Fleet</h5>
                    <p className="text-[11px] text-neutral-500 mt-1">
                      4°C to 8°C solar-refrigerated electric vehicles transport produce directly to regional hubs and homes.
                    </p>
                  </div>

                  <div className="bg-neutral-50 border border-neutral-200 rounded-2xl p-4">
                    <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center text-xs font-bold mb-2">
                      04
                    </div>
                    <h5 className="font-bold text-xs text-neutral-900">Doorstep or Mandi Pickup</h5>
                    <p className="text-[11px] text-neutral-500 mt-1">
                      Customers choose contactless doorstep delivery or instant self-pickup at nearest APMC cold hub.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: ECONOMICS */}
          {activeTab === 'economics' && (
            <div className="space-y-6 animate-in fade-in duration-150">
              <div className="bg-neutral-50 border border-neutral-200 rounded-2xl p-5">
                <h4 className="text-sm font-bold text-neutral-900 mb-2">
                  Interactive Revenue Distribution Calculator
                </h4>
                <p className="text-xs text-neutral-500 mb-4">
                  Adjust the cart order value below to witness mathematical escrow allocation:
                </p>

                <div className="flex items-center gap-4 mb-5">
                  <label className="text-xs font-bold text-neutral-700">Order Amount (₹):</label>
                  <input
                    type="range"
                    min="100"
                    max="10000"
                    step="50"
                    value={simulatedAmount}
                    onChange={(e) => setSimulatedAmount(Number(e.target.value))}
                    className="flex-1 accent-emerald-600 cursor-pointer"
                  />
                  <span className="font-mono text-base font-black text-emerald-800 bg-white px-3 py-1 rounded-xl border border-neutral-300">
                    ₹{simulatedAmount.toFixed(0)}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* FarmDirect Model */}
                  <div className="bg-emerald-50/80 border-2 border-emerald-500 rounded-2xl p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-black text-emerald-950 uppercase tracking-wider">
                        FarmDirect Model
                      </span>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-200 text-emerald-900">
                        Ethical Transparency
                      </span>
                    </div>

                    <div className="space-y-2 text-xs">
                      <div className="flex justify-between items-center p-2 rounded-lg bg-white border border-emerald-200">
                        <span className="font-bold text-emerald-900">Farmer Direct Payout (88%):</span>
                        <span className="font-mono font-black text-emerald-700 text-sm">
                          ₹{farmerShare.toFixed(2)}
                        </span>
                      </div>
                      <div className="flex justify-between items-center p-2 rounded-lg bg-white border border-neutral-200 text-neutral-700">
                        <span>Solar Cold-Chain Logistics (7%):</span>
                        <span className="font-mono font-semibold">₹{logisticsShare.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between items-center p-2 rounded-lg bg-white border border-neutral-200 text-neutral-700">
                        <span>Platform Ops &amp; Security (5%):</span>
                        <span className="font-mono font-semibold">₹{platformShare.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Traditional Mandi Model */}
                  <div className="bg-rose-50/70 border border-rose-300 rounded-2xl p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-black text-rose-950 uppercase tracking-wider">
                        Traditional Middleman System
                      </span>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-200 text-rose-900">
                        High Intermediary Markups
                      </span>
                    </div>

                    <div className="space-y-2 text-xs">
                      <div className="flex justify-between items-center p-2 rounded-lg bg-white border border-rose-200">
                        <span className="font-bold text-rose-900">Farmer Payout (~32%):</span>
                        <span className="font-mono font-bold text-rose-700 text-sm">
                          ₹{traditionalFarmerShare.toFixed(2)}
                        </span>
                      </div>
                      <div className="flex justify-between items-center p-2 rounded-lg bg-white border border-rose-200 text-rose-800">
                        <span>Middleman Commission (~68%):</span>
                        <span className="font-mono font-bold text-rose-600">₹{traditionalMiddlemanCut.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: COLD-CHAIN & PICKUP */}
          {activeTab === 'coldchain' && (
            <div className="space-y-4 animate-in fade-in duration-150">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-neutral-50 border border-neutral-200 rounded-2xl p-4 space-y-2">
                  <div className="flex items-center gap-2 text-emerald-800 font-bold text-sm">
                    <Truck className="w-5 h-5 text-emerald-600" />
                    <span>Option A: Doorstep Cold-Chain Delivery</span>
                  </div>
                  <p className="text-xs text-neutral-600 leading-relaxed">
                    Refrigerated electric vans deliver fresh dawn-harvested crates directly to your home address. Temperature is continuously tracked (4-8°C) to prevent spoilage. Live GPS tracking activates upon dispatch.
                  </p>
                </div>

                <div className="bg-neutral-50 border border-neutral-200 rounded-2xl p-4 space-y-2">
                  <div className="flex items-center gap-2 text-amber-800 font-bold text-sm">
                    <MapPin className="w-5 h-5 text-amber-600" />
                    <span>Option B: Self-Pickup from Nearest Agro Hub</span>
                  </div>
                  <p className="text-xs text-neutral-600 leading-relaxed">
                    Pick up your packed crates within 45 minutes at your regional APMC Cold Storage Terminal or Farmer Producer Depot. Zero delivery fee + an extra 5% direct discount applies!
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: FAQ & HELPLINE */}
          {activeTab === 'faq' && (
            <div className="space-y-4 animate-in fade-in duration-150">
              <div className="space-y-3">
                <div className="p-3.5 bg-neutral-50 border border-neutral-200 rounded-xl">
                  <h5 className="font-bold text-xs text-neutral-900 mb-1">
                    How do farmers receive their money?
                  </h5>
                  <p className="text-xs text-neutral-600 leading-relaxed">
                    Customer payments enter escrow. As soon as the customer or pickup terminal confirms receipt, 88% is transferred directly to the farmer's linked bank account via automated DBT/IMPS with zero commission deductions.
                  </p>
                </div>

                <div className="p-3.5 bg-neutral-50 border border-neutral-200 rounded-xl">
                  <h5 className="font-bold text-xs text-neutral-900 mb-1">
                    What if produce arrives damaged or unsatisfactory?
                  </h5>
                  <p className="text-xs text-neutral-600 leading-relaxed">
                    Every order has a 1-click "Report Issue" button with photo verification. Legitimate quality claims receive instant 100% refund or free re-delivery from the cooperative reserve fund.
                  </p>
                </div>
              </div>

              {/* 24/7 Helpline Banner */}
              <div className="p-4 bg-emerald-900 text-white rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-700 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 text-emerald-200" />
                  </div>
                  <div>
                    <h5 className="font-bold text-sm">Kisan &amp; Buyer Support Toll-Free Helpline</h5>
                    <p className="text-xs text-emerald-200">1800-425-FARM (1800-425-3276) · 24x7 Multi-Lingual Desk</p>
                  </div>
                </div>

                <a
                  href="tel:18004253276"
                  className="px-4 py-2 bg-white text-emerald-950 font-bold rounded-xl text-xs hover:bg-emerald-50 transition-colors"
                >
                  Call Help Desk
                </a>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="mt-auto px-6 py-4 bg-neutral-50 border-t border-neutral-200 flex items-center justify-between">
          <span className="text-xs text-neutral-500 font-medium">
            FarmDirect Central Integrity Ledger · PGS-India &amp; NPOP Compliant
          </span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-bold rounded-xl transition-colors cursor-pointer"
          >
            Got It, Close
          </button>
        </div>
      </div>
    </div>
  );
};
