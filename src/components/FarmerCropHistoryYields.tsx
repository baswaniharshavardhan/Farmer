import React, { useState } from 'react';
import {
  Sprout,
  TrendingUp,
  Award,
  Calendar,
  Layers,
  Sparkles,
  Scale,
  Leaf,
  Droplets,
  AlertCircle,
  CheckCircle2,
  Filter,
} from 'lucide-react';

interface CropHistoryRecord {
  id: string;
  season: 'Kharif 2025' | 'Rabi 2025-26' | 'Zaid 2026' | 'Standing Crop (Current)';
  cropName: string;
  variety: string;
  acresSown: number;
  sowDate: string;
  harvestDate: string;
  totalYieldQuintals: number;
  yieldPerAcreQuintals: number;
  regionalBenchmarkQuintals: number;
  revenueGenerated: number;
  profitMarginPct: number;
  soilHealthRating: 'Excellent' | 'Good';
  organicCertified: boolean;
}

const HISTORICAL_CROPS: CropHistoryRecord[] = [
  {
    id: 'ch-1',
    season: 'Rabi 2025-26',
    cropName: 'Sharbati Amber Wheat',
    variety: 'Sehore Golden C-306',
    acresSown: 8.0,
    sowDate: '12 Nov 2025',
    harvestDate: '18 Mar 2026',
    totalYieldQuintals: 192,
    yieldPerAcreQuintals: 24.0,
    regionalBenchmarkQuintals: 18.5,
    revenueGenerated: 844800,
    profitMarginPct: 76,
    soilHealthRating: 'Excellent',
    organicCertified: true,
  },
  {
    id: 'ch-2',
    season: 'Kharif 2025',
    cropName: 'Nashik Red Onion',
    variety: 'Gavran Lasalgaon Special',
    acresSown: 6.5,
    sowDate: '15 Jun 2025',
    harvestDate: '24 Sep 2025',
    totalYieldQuintals: 122,
    yieldPerAcreQuintals: 18.7,
    regionalBenchmarkQuintals: 14.8,
    revenueGenerated: 390400,
    profitMarginPct: 71,
    soilHealthRating: 'Excellent',
    organicCertified: true,
  },
  {
    id: 'ch-3',
    season: 'Zaid 2026',
    cropName: 'Vine-Ripened Tomatoes & Spinach',
    variety: 'Abhinav Hybrid & Palak',
    acresSown: 4.2,
    sowDate: '02 Apr 2026',
    harvestDate: '12 Jul 2026',
    totalYieldQuintals: 104,
    yieldPerAcreQuintals: 24.8,
    regionalBenchmarkQuintals: 20.0,
    revenueGenerated: 364000,
    profitMarginPct: 82,
    soilHealthRating: 'Excellent',
    organicCertified: true,
  },
  {
    id: 'ch-4',
    season: 'Standing Crop (Current)',
    cropName: 'Ratnagiri Alphonso Mango & Strawberries',
    variety: 'Hapus & Winter Dawn',
    acresSown: 7.5,
    sowDate: 'Perennial Orchard',
    harvestDate: 'Harvesting Active (Daily Dawn)',
    totalYieldQuintals: 148,
    yieldPerAcreQuintals: 19.7,
    regionalBenchmarkQuintals: 15.2,
    revenueGenerated: 1480000,
    profitMarginPct: 88,
    soilHealthRating: 'Excellent',
    organicCertified: true,
  },
];

export const FarmerCropHistoryYields: React.FC = () => {
  const [selectedSeason, setSelectedSeason] = useState<string>('all');

  const filteredHistory = HISTORICAL_CROPS.filter(
    (c) => selectedSeason === 'all' || c.season === selectedSeason
  );

  const totalQuintalsHarvested = HISTORICAL_CROPS.reduce((acc, c) => acc + c.totalYieldQuintals, 0);
  const totalHistoricalRevenue = HISTORICAL_CROPS.reduce((acc, c) => acc + c.revenueGenerated, 0);
  const avgYieldPerAcre = (
    HISTORICAL_CROPS.reduce((acc, c) => acc + c.yieldPerAcreQuintals, 0) / HISTORICAL_CROPS.length
  ).toFixed(1);

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Top Banner: Yield Analytics & Performance */}
      <div className="bg-gradient-to-r from-emerald-950 via-teal-950 to-neutral-900 text-white rounded-3xl p-6 border-2 border-emerald-500/40 shadow-xl relative overflow-hidden">
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-4 gap-6 items-center">
          <div className="md:col-span-2 space-y-2">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping" />
              <span className="text-xs uppercase font-mono tracking-wider text-amber-300 font-bold">
                Seasonal Yield Performance &amp; History
              </span>
            </div>
            <h3 className="font-display font-black text-2xl text-white tracking-tight">
              Crop History &amp; Productivity Yields
            </h3>
            <p className="text-xs text-neutral-300 max-w-xl leading-relaxed">
              Tracking multi-season crop rotations, acreage productivity (Quintals/Acre), and historical revenue yields across your verified 14.2 acre farm holding.
            </p>
          </div>

          <div className="bg-emerald-900/60 border border-emerald-400/40 rounded-2xl p-4 text-center">
            <span className="text-[11px] uppercase tracking-wider text-emerald-300 font-semibold block">
              Average Yield / Acre
            </span>
            <div className="font-mono font-black text-2xl text-emerald-300 mt-1">
              {avgYieldPerAcre} <span className="text-sm font-normal text-emerald-200">Q/Acre</span>
            </div>
            <span className="text-[10px] text-emerald-200 block mt-0.5">
              +26% vs Nashik Regional Average
            </span>
          </div>

          <div className="bg-amber-900/40 border border-amber-400/40 rounded-2xl p-4 text-center">
            <span className="text-[11px] uppercase tracking-wider text-amber-300 font-semibold block">
              Lifetime Harvest
            </span>
            <div className="font-mono font-black text-2xl text-amber-300 mt-1">
              {totalQuintalsHarvested} <span className="text-sm font-normal text-amber-200">Quintals</span>
            </div>
            <span className="text-[10px] text-amber-200 block mt-0.5">
              Total ₹{(totalHistoricalRevenue / 100000).toFixed(1)} Lakhs Harvest Value
            </span>
          </div>
        </div>
      </div>

      {/* Filter by Season */}
      <div className="flex items-center justify-between gap-3">
        <h4 className="font-bold text-neutral-900 text-sm">Historical Seasons &amp; Standing Crops</h4>

        <div className="flex items-center gap-1.5 overflow-x-auto">
          {['all', 'Standing Crop (Current)', 'Rabi 2025-26', 'Kharif 2025', 'Zaid 2026'].map((season) => (
            <button
              key={season}
              type="button"
              onClick={() => setSelectedSeason(season)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                selectedSeason === season
                  ? 'bg-neutral-900 text-white shadow-xs'
                  : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
              }`}
            >
              {season === 'all' ? 'All Seasons' : season}
            </button>
          ))}
        </div>
      </div>

      {/* Season Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredHistory.map((record) => {
          const yieldAdvantage = (
            ((record.yieldPerAcreQuintals - record.regionalBenchmarkQuintals) /
              record.regionalBenchmarkQuintals) *
            100
          ).toFixed(0);

          return (
            <div
              key={record.id}
              className="bg-white rounded-3xl border border-neutral-200 p-5 shadow-xs hover:border-emerald-400 hover:shadow-md transition-all space-y-4"
            >
              <div className="flex items-start justify-between gap-2 border-b border-neutral-150 pb-3">
                <div>
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                    {record.season}
                  </span>
                  <h4 className="font-display font-black text-neutral-900 text-base mt-1.5">
                    {record.cropName}
                  </h4>
                  <p className="text-xs text-neutral-500">{record.variety}</p>
                </div>

                <div className="text-right">
                  <span className="text-[10px] uppercase text-neutral-400 block font-semibold">Total Yield</span>
                  <span className="font-mono font-black text-emerald-900 text-base">
                    {record.totalYieldQuintals} Quintals
                  </span>
                </div>
              </div>

              {/* Metric Breakdown Table */}
              <div className="grid grid-cols-3 gap-3 p-3 bg-neutral-50 rounded-2xl text-xs">
                <div>
                  <span className="text-[10px] text-neutral-400 block">Cultivated Land</span>
                  <strong className="text-neutral-800 font-mono text-xs">{record.acresSown} Acres</strong>
                </div>

                <div>
                  <span className="text-[10px] text-neutral-400 block">Yield / Acre</span>
                  <strong className="text-emerald-700 font-mono text-xs">
                    {record.yieldPerAcreQuintals} Q/Acre
                  </strong>
                </div>

                <div>
                  <span className="text-[10px] text-neutral-400 block">Regional Benchmark</span>
                  <strong className="text-neutral-600 font-mono text-xs">
                    {record.regionalBenchmarkQuintals} Q/Acre
                  </strong>
                </div>
              </div>

              {/* Performance Indicator Bar */}
              <div className="p-3 bg-emerald-50/70 border border-emerald-200 rounded-2xl flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-emerald-700" />
                  <span className="text-emerald-900 font-bold">
                    +{yieldAdvantage}% Productivity Advantage
                  </span>
                </div>
                <span className="font-mono font-black text-emerald-800">
                  ₹{(record.revenueGenerated / 1000).toFixed(0)}k Gross
                </span>
              </div>

              <div className="flex items-center justify-between text-[11px] text-neutral-500 pt-1">
                <span>Sown: <strong>{record.sowDate}</strong></span>
                <span>Harvest: <strong>{record.harvestDate}</strong></span>
                <span className="text-emerald-700 font-bold">PGS-Organic</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
