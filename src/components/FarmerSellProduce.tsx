import React, { useState } from 'react';
import {
  Tag,
  Sparkles,
  CheckCircle2,
  TrendingUp,
  AlertCircle,
  Package,
  Plus,
  Scale,
  Calendar,
  DollarSign,
  ShieldCheck,
  Building2,
  ArrowRight,
} from 'lucide-react';
import { Product } from '../types';

interface FarmerSellProduceProps {
  farmName: string;
  farmLocation: string;
  onAddProduct: (productData: Omit<Product, 'id' | 'farmId' | 'farmName'>) => void;
  onClose?: () => void;
}

const COMMON_CROP_PRESETS = [
  {
    name: 'Ratnagiri Alphonso Mango',
    category: 'Fruits' as Product['category'],
    suggestedPrice: 140,
    msp: 95,
    unit: 'kg',
    img: 'https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&w=600&q=80',
    desc: 'Sweet aromatic naturally ripened Alphonso mangoes from Devgad-Ratnagiri orchards.',
  },
  {
    name: 'Vine-Ripened Hybrid Tomatoes',
    category: 'Vegetables' as Product['category'],
    suggestedPrice: 35,
    msp: 18,
    unit: 'kg',
    img: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=600&q=80',
    desc: 'Firm, juicy crimson tomatoes harvested at dawn from drip-irrigated polyhouse.',
  },
  {
    name: 'Lasalgaon Red Onion',
    category: 'Vegetables' as Product['category'],
    suggestedPrice: 30,
    msp: 16,
    unit: 'kg',
    img: 'https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?auto=format&fit=crop&w=600&q=80',
    desc: 'High-pungency, sun-cured Nashik pink-red onions with long storage life.',
  },
  {
    name: 'Crisp Baby Spinach (Palak)',
    category: 'Greens & Herbs' as Product['category'],
    suggestedPrice: 25,
    msp: 12,
    unit: 'bunch',
    img: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&w=600&q=80',
    desc: 'Tender pesticide-free baby spinach cut fresh at sunrise.',
  },
];

export const FarmerSellProduce: React.FC<FarmerSellProduceProps> = ({
  farmName,
  farmLocation,
  onAddProduct,
  onClose,
}) => {
  const [cropName, setCropName] = useState('Ratnagiri Alphonso Mango');
  const [category, setCategory] = useState<Product['category']>('Fruits');
  const [description, setDescription] = useState(
    'Hand-picked Grade A+ chemical-free harvest packed in ventilated wooden crates.'
  );
  const [pricePerUnit, setPricePerUnit] = useState<number>(140);
  const [unit, setUnit] = useState<string>('kg');
  const [stockQuantity, setStockQuantity] = useState<number>(120);
  const [harvestDate, setHarvestDate] = useState<string>('Dawn Harvest (6:00 AM Today)');
  const [isOrganic, setIsOrganic] = useState<boolean>(true);
  const [imageUrl, setImageUrl] = useState<string>(
    'https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&w=600&q=80'
  );
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const farmerTakeHomePrice = pricePerUnit * 0.88;
  const mandiMspBenchmark = 95; // Benchmark MSP

  const handleSelectPreset = (p: (typeof COMMON_CROP_PRESETS)[0]) => {
    setCropName(p.name);
    setCategory(p.category);
    setPricePerUnit(p.suggestedPrice);
    setUnit(p.unit);
    setImageUrl(p.img);
    setDescription(p.desc);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!cropName.trim()) return;

    onAddProduct({
      name: cropName.trim(),
      category,
      description: description.trim() || 'Dawn harvested fresh produce from regional farmer.',
      pricePerUnit: Number(pricePerUnit) || 40,
      unit: unit.trim() || 'kg',
      stockQuantity: Number(stockQuantity) || 50,
      harvestDate: harvestDate.trim() || 'Today',
      location: farmLocation || 'Nashik Agro Belt, MH',
      imageUrl: imageUrl.trim(),
      organic: isOrganic,
      farmerSharePercentage: 88,
      logisticsSharePercentage: 7,
      platformSharePercentage: 5,
    });

    setSuccessMsg(`Successfully listed "${cropName}"! Live in central consumer marketplace.`);
    setTimeout(() => {
      setSuccessMsg(null);
      if (onClose) onClose();
    }, 1500);
  };

  return (
    <div className="bg-white rounded-3xl border-2 border-amber-500/30 p-6 shadow-md space-y-6 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-neutral-150 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-amber-100 text-amber-900">
              <Tag className="w-5 h-5" />
            </span>
            <div>
              <h3 className="font-display font-black text-xl text-neutral-900">
                Sell / List Harvest to Consumer Market
              </h3>
              <p className="text-xs text-neutral-500">
                Direct listing with live MSP comparison &amp; guaranteed 88% direct bank payouts.
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-xl bg-emerald-100 text-emerald-900 border border-emerald-300 text-xs font-bold font-mono">
            88% Net Escrow Guaranteed
          </span>
        </div>
      </div>

      {successMsg && (
        <div className="p-4 bg-emerald-50 border-2 border-emerald-400 rounded-2xl flex items-center gap-3 text-emerald-900 font-bold text-xs animate-in zoom-in-95">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      {/* Fast Crop Presets */}
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-neutral-500 mb-2">
          Quick 1-Click Harvest Presets:
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {COMMON_CROP_PRESETS.map((p) => (
            <button
              key={p.name}
              type="button"
              onClick={() => handleSelectPreset(p)}
              className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                cropName === p.name
                  ? 'bg-amber-50 border-amber-500 ring-2 ring-amber-400/40'
                  : 'bg-neutral-50 border-neutral-200 hover:bg-neutral-100'
              }`}
            >
              <div className="text-xs font-bold text-neutral-900 truncate">{p.name}</div>
              <div className="text-[11px] text-emerald-700 font-mono font-bold mt-0.5">
                ₹{p.suggestedPrice}/{p.unit}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Main Listing Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-neutral-700 mb-1">
              Crop Name &amp; Variety <span className="text-amber-600">*</span>
            </label>
            <input
              type="text"
              required
              value={cropName}
              onChange={(e) => setCropName(e.target.value)}
              className="w-full px-3 py-2 text-xs border border-neutral-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:outline-hidden"
              placeholder="e.g. Ratnagiri Alphonso Mango"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-neutral-700 mb-1">
              Produce Category <span className="text-amber-600">*</span>
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as any)}
              className="w-full px-3 py-2 text-xs border border-neutral-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:outline-hidden"
            >
              <option value="Vegetables">Vegetables</option>
              <option value="Fruits">Fruits</option>
              <option value="Greens & Herbs">Greens &amp; Herbs</option>
              <option value="Dairy & Eggs">Dairy &amp; Eggs</option>
              <option value="Honey & Pantry">Honey &amp; Pantry</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-semibold text-neutral-700 mb-1">
              Selling Price (₹ per unit) <span className="text-amber-600">*</span>
            </label>
            <div className="relative">
              <input
                type="number"
                step="0.5"
                min="1"
                required
                value={pricePerUnit}
                onChange={(e) => setPricePerUnit(Number(e.target.value))}
                className="w-full pl-7 pr-3 py-2 text-xs font-mono font-bold border border-neutral-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:outline-hidden"
              />
              <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-neutral-400 font-mono text-xs">
                ₹
              </span>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-neutral-700 mb-1">
              Measurement Unit
            </label>
            <select
              value={unit}
              onChange={(e) => setUnit(e.target.value)}
              className="w-full px-3 py-2 text-xs border border-neutral-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:outline-hidden"
            >
              <option value="kg">kg (Kilogram)</option>
              <option value="quintal">quintal (100 kg)</option>
              <option value="crate">crate (20 kg)</option>
              <option value="box">box</option>
              <option value="bunch">bunch</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-neutral-700 mb-1">
              Harvest Quantity Available <span className="text-amber-600">*</span>
            </label>
            <input
              type="number"
              min="1"
              required
              value={stockQuantity}
              onChange={(e) => setStockQuantity(Number(e.target.value))}
              className="w-full px-3 py-2 text-xs font-mono font-bold border border-neutral-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:outline-hidden"
              placeholder="Quantity in units"
            />
          </div>
        </div>

        {/* Live MSP & Take-Home Calculation Card */}
        <div className="p-4 bg-emerald-50/70 border border-emerald-300 rounded-2xl space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-emerald-950 flex items-center gap-1.5">
              <TrendingUp className="w-4 h-4 text-emerald-700" />
              Live Net Farmer Take-Home (88% Guaranteed):
            </span>
            <span className="font-mono text-base font-black text-emerald-800">
              ₹{farmerTakeHomePrice.toFixed(2)} / {unit}
            </span>
          </div>

          <div className="flex items-center justify-between text-[11px] text-neutral-600 pt-1 border-t border-emerald-200">
            <span>Govt Minimum Support Price (MSP) Benchmark:</span>
            <span className="font-mono font-bold text-neutral-700">₹{mandiMspBenchmark} / {unit}</span>
          </div>

          <p className="text-[10px] text-emerald-800">
            ✅ Your direct ask price provides <strong>+47% higher revenue</strong> than selling to mandi brokers!
          </p>
        </div>

        <div>
          <label className="block text-xs font-semibold text-neutral-700 mb-1">
            Produce Description &amp; Quality Notes
          </label>
          <textarea
            rows={2}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-3 py-2 text-xs border border-neutral-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:outline-hidden"
            placeholder="Describe harvest method, freshness, variety..."
          />
        </div>

        <div className="flex items-center gap-3">
          <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-neutral-800">
            <input
              type="checkbox"
              checked={isOrganic}
              onChange={(e) => setIsOrganic(e.target.checked)}
              className="w-4 h-4 text-emerald-600 accent-emerald-600 rounded"
            />
            <span>Certified Chemical-Free / Organic Harvest</span>
          </label>
        </div>

        <div className="pt-2 flex justify-end gap-2">
          {onClose && (
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 rounded-xl text-xs font-bold transition-colors cursor-pointer"
            >
              Cancel
            </button>
          )}

          <button
            type="submit"
            className="px-6 py-2.5 bg-amber-600 hover:bg-amber-500 text-white rounded-xl text-xs font-black shadow-md transition-all flex items-center gap-2 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>List Crop &amp; Publish Instantly to Market</span>
          </button>
        </div>
      </form>
    </div>
  );
};
