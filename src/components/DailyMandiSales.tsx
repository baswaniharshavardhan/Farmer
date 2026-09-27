import React, { useState } from 'react';
import {
  TrendingUp,
  TrendingDown,
  Building2,
  Calendar,
  Sparkles,
  ArrowRight,
  Info,
  CheckCircle2,
  Scale,
  RefreshCw,
  Search,
  Percent,
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export interface MandiSaleRecord {
  id: string;
  commodity: string;
  category: string;
  variety: string;
  mandiName: string;
  state: string;
  arrivalsTodayQuintals: number;
  minPricePerKg: number;
  maxPricePerKg: number;
  modalPricePerKg: number;
  farmDirectPricePerKg: number;
  farmerTakeHomePct: number;
  trendPct: number;
  grade: 'A+' | 'A' | 'B';
  lastUpdated: string;
}

const MANDI_DATA: MandiSaleRecord[] = [
  {
    id: 'm-1',
    commodity: 'Ratnagiri Alphonso Mango',
    category: 'Fruits',
    variety: 'Hapus Grade A',
    mandiName: 'Vashi APMC (Navi Mumbai)',
    state: 'Maharashtra',
    arrivalsTodayQuintals: 420,
    minPricePerKg: 130,
    maxPricePerKg: 195,
    modalPricePerKg: 165,
    farmDirectPricePerKg: 140,
    farmerTakeHomePct: 88,
    trendPct: 4.8,
    grade: 'A+',
    lastUpdated: '10:45 AM Today',
  },
  {
    id: 'm-2',
    commodity: 'Nashik Red Onion',
    category: 'Vegetables',
    variety: 'Gavran Lasalgaon Special',
    mandiName: 'Lasalgaon APMC Mandi',
    state: 'Maharashtra',
    arrivalsTodayQuintals: 1850,
    minPricePerKg: 24,
    maxPricePerKg: 38,
    modalPricePerKg: 32,
    farmDirectPricePerKg: 30,
    farmerTakeHomePct: 88,
    trendPct: -2.1,
    grade: 'A',
    lastUpdated: '11:15 AM Today',
  },
  {
    id: 'm-3',
    commodity: 'Vine-Ripened Tomatoes',
    category: 'Vegetables',
    variety: 'Abhinav Hybrid',
    mandiName: 'Pimpalgaon APMC Market',
    state: 'Maharashtra',
    arrivalsTodayQuintals: 920,
    minPricePerKg: 28,
    maxPricePerKg: 46,
    modalPricePerKg: 38,
    farmDirectPricePerKg: 35,
    farmerTakeHomePct: 88,
    trendPct: 6.2,
    grade: 'A+',
    lastUpdated: '09:30 AM Today',
  },
  {
    id: 'm-4',
    commodity: 'Baby Spinach (Palak)',
    category: 'Greens & Herbs',
    variety: 'All Green Desi',
    mandiName: 'Gultekdi APMC (Pune)',
    state: 'Maharashtra',
    arrivalsTodayQuintals: 310,
    minPricePerKg: 20,
    maxPricePerKg: 36,
    modalPricePerKg: 28,
    farmDirectPricePerKg: 25,
    farmerTakeHomePct: 88,
    trendPct: 1.5,
    grade: 'A+',
    lastUpdated: '10:00 AM Today',
  },
  {
    id: 'm-5',
    commodity: 'Dindori Organic Strawberries',
    category: 'Fruits',
    variety: 'Winter Dawn Sweet',
    mandiName: 'Nashik Dindori Naka APMC',
    state: 'Maharashtra',
    arrivalsTodayQuintals: 165,
    minPricePerKg: 110,
    maxPricePerKg: 175,
    modalPricePerKg: 145,
    farmDirectPricePerKg: 130,
    farmerTakeHomePct: 88,
    trendPct: 3.4,
    grade: 'A+',
    lastUpdated: '11:30 AM Today',
  },
  {
    id: 'm-6',
    commodity: 'Sharbati Wheat (Grain)',
    category: 'Honey & Pantry',
    variety: 'Sehore Golden Amber',
    mandiName: 'Khandwa APMC Terminal',
    state: 'Madhya Pradesh',
    arrivalsTodayQuintals: 3400,
    minPricePerKg: 34,
    maxPricePerKg: 48,
    modalPricePerKg: 42,
    farmDirectPricePerKg: 44,
    farmerTakeHomePct: 88,
    trendPct: 0.8,
    grade: 'A+',
    lastUpdated: '08:50 AM Today',
  },
];

interface DailyMandiSalesProps {
  onSelectCommodity?: (commodityName: string) => void;
}

export const DailyMandiSales: React.FC<DailyMandiSalesProps> = ({ onSelectCommodity }) => {
  const { t } = useLanguage();
  const [selectedMandi, setSelectedMandi] = useState<string>('all');
  const [searchFilter, setSearchFilter] = useState<string>('');
  const [isRefreshing, setIsRefreshing] = useState(false);

  const mandis = ['all', 'Vashi APMC', 'Lasalgaon APMC', 'Pimpalgaon APMC', 'Gultekdi APMC', 'Nashik Dindori Naka'];

  const filteredSales = MANDI_DATA.filter((item) => {
    const matchesMandi = selectedMandi === 'all' || item.mandiName.toLowerCase().includes(selectedMandi.toLowerCase());
    const matchesSearch =
      item.commodity.toLowerCase().includes(searchFilter.toLowerCase()) ||
      item.variety.toLowerCase().includes(searchFilter.toLowerCase()) ||
      item.mandiName.toLowerCase().includes(searchFilter.toLowerCase());
    return matchesMandi && matchesSearch;
  });

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 600);
  };

  const totalArrivalsToday = MANDI_DATA.reduce((acc, curr) => acc + curr.arrivalsTodayQuintals, 0);

  return (
    <div className="bg-white border-2 border-emerald-900/10 rounded-3xl p-5 sm:p-6 shadow-sm space-y-5 animate-in fade-in duration-200">
      {/* Header with Live Ticker */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-neutral-150 pb-4">
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-bold border border-emerald-200 uppercase tracking-wider">
              Live Mandi Ticker
            </span>
            <span className="text-xs text-neutral-400 font-mono">
              Today: {new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
            </span>
          </div>
          <h3 className="font-display font-black text-xl sm:text-2xl text-neutral-900 mt-1">
            {t('dailyMandiArrivals')}
          </h3>
          <p className="text-xs text-neutral-500 mt-0.5">
            Transparent comparison of daily APMC wholesale auction rates vs 88% Direct-to-Farmer pricing.
          </p>
        </div>

        {/* Stats Overview Pill */}
        <div className="flex items-center gap-3">
          <div className="bg-emerald-50 border border-emerald-200 rounded-2xl px-4 py-2 text-right">
            <span className="text-[10px] uppercase font-bold text-emerald-700 block">Total Arrivals Monitored</span>
            <span className="font-mono font-black text-emerald-950 text-base">
              {totalArrivalsToday.toLocaleString()} Quintals
            </span>
          </div>

          <button
            type="button"
            onClick={handleRefresh}
            className="p-2.5 rounded-xl border border-neutral-200 bg-neutral-50 hover:bg-neutral-100 text-neutral-600 hover:text-neutral-900 transition-all cursor-pointer"
            title="Refresh Mandi Auction Telemetry"
          >
            <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin text-emerald-600' : ''}`} />
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search Alphonso, Onion, Tomato..."
            value={searchFilter}
            onChange={(e) => setSearchFilter(e.target.value)}
            className="w-full pl-9 pr-3 py-2 bg-neutral-50 border border-neutral-200 rounded-xl text-xs text-neutral-800 focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0 scrollbar-none">
          {mandis.map((m) => (
            <button
              key={m}
              type="button"
              onClick={() => setSelectedMandi(m)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                selectedMandi === m
                  ? 'bg-neutral-900 text-white shadow-xs'
                  : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
              }`}
            >
              {m === 'all' ? 'All Regional APMCs' : m}
            </button>
          ))}
        </div>
      </div>

      {/* Mandi Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredSales.map((item) => {
          const isUp = item.trendPct >= 0;
          return (
            <div
              key={item.id}
              className="bg-neutral-50/60 border border-neutral-200/90 rounded-2xl p-4 hover:border-emerald-400 hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider font-mono">
                      {item.category} · {item.grade}
                    </span>
                    <h4 className="font-bold text-neutral-900 text-sm">{item.commodity}</h4>
                    <p className="text-[11px] text-neutral-500">{item.variety}</p>
                  </div>

                  <span
                    className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold font-mono ${
                      isUp ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                    }`}
                  >
                    {isUp ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                    {isUp ? `+${item.trendPct}%` : `${item.trendPct}%`}
                  </span>
                </div>

                <div className="mt-2 text-[11px] text-neutral-600 flex items-center gap-1.5">
                  <Building2 className="w-3.5 h-3.5 text-neutral-400 flex-shrink-0" />
                  <span className="truncate">{item.mandiName}</span>
                </div>

                {/* Mandi Rate vs FarmDirect Rate Comparison Box */}
                <div className="mt-3 p-2.5 rounded-xl bg-white border border-neutral-200 space-y-1.5 text-xs">
                  <div className="flex justify-between items-center text-neutral-500 text-[11px]">
                    <span>Mandi Modal Rate:</span>
                    <span className="font-mono font-semibold text-neutral-700">₹{item.modalPricePerKg}/kg</span>
                  </div>
                  <div className="flex justify-between items-center text-neutral-500 text-[11px]">
                    <span>Mandi Range (Min-Max):</span>
                    <span className="font-mono text-neutral-600">₹{item.minPricePerKg} - ₹{item.maxPricePerKg}/kg</span>
                  </div>
                  <div className="flex justify-between items-center pt-1 border-t border-neutral-100 font-bold">
                    <span className="text-emerald-800 flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-emerald-600" />
                      FarmDirect Direct Rate:
                    </span>
                    <span className="font-mono text-emerald-700 text-sm">₹{item.farmDirectPricePerKg}/kg</span>
                  </div>
                </div>

                <div className="mt-2.5 flex items-center justify-between text-[11px] text-neutral-500">
                  <span>Arrivals: <strong>{item.arrivalsTodayQuintals} Quintals</strong></span>
                  <span className="text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                    88% Direct Payout
                  </span>
                </div>
              </div>

              {onSelectCommodity && (
                <button
                  type="button"
                  onClick={() => onSelectCommodity(item.commodity)}
                  className="mt-3.5 w-full py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span>Order Direct From Verified Farmers</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
