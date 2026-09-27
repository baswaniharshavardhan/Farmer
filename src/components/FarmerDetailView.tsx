import React from 'react';
import {
  User,
  ShieldCheck,
  Building2,
  Landmark,
  MapPin,
  Calendar,
  FileText,
  BadgeCheck,
  CheckCircle2,
  Sparkles,
  Layers,
  Thermometer,
  Droplets,
  Wind,
  Phone,
  CreditCard,
  Award,
} from 'lucide-react';
import { Farm, User as UserType } from '../types';

interface FarmerDetailViewProps {
  farm: Farm;
  user: UserType;
  onOpenProfile: () => void;
  onOpenSchemes: () => void;
}

export const FarmerDetailView: React.FC<FarmerDetailViewProps> = ({
  farm,
  user,
  onOpenProfile,
  onOpenSchemes,
}) => {
  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Top Banner: Verification & Land Dossier */}
      <div className="bg-gradient-to-r from-emerald-950 via-teal-950 to-neutral-900 text-white rounded-3xl p-6 border-2 border-emerald-500/40 shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="relative w-20 h-20 rounded-2xl overflow-hidden border-2 border-amber-400 shadow-xl flex-shrink-0">
              <img
                src={farm.avatar}
                alt={farm.name}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute bottom-0 inset-x-0 bg-emerald-600 text-[9px] font-black text-center text-white py-0.5 tracking-wider">
                VERIFIED
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="font-display font-black text-2xl text-white tracking-tight">
                  {user.name} ({farm.name})
                </h3>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-400/20 text-emerald-300 border border-emerald-400/40 text-[11px] font-bold">
                  UIDAI e-KYC Verified
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/40 text-[11px] font-bold">
                  PGS-India Organic Certified
                </span>
              </div>

              <div className="flex items-center gap-3 mt-1 text-xs text-emerald-200/90 flex-wrap">
                <span>📍 Dindori Agro-Belt, Nashik, Maharashtra</span>
                <span>•</span>
                <span>Aadhaar: <strong className="font-mono text-white">5829-••••-4821</strong></span>
                <span>•</span>
                <span>Kisan ID: <strong className="font-mono text-white">MH-NSK-2024-8841</strong></span>
              </div>

              <div className="mt-2 flex items-center gap-2">
                <span className="text-xs bg-emerald-900/60 border border-emerald-600/40 px-2.5 py-1 rounded-lg text-emerald-100">
                  Total Cultivated Land: <strong>14.2 Acres (Khasra No. 42/B, Survey 118)</strong>
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onOpenProfile}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold transition-all shadow-md cursor-pointer"
            >
              Edit KYC &amp; Bank
            </button>
            <button
              type="button"
              onClick={onOpenSchemes}
              className="px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white rounded-xl text-xs font-bold transition-all cursor-pointer"
            >
              Govt Subsidy Dossier
            </button>
          </div>
        </div>
      </div>

      {/* Grid of Key Detail Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Card 1: Land & Soil Health Card */}
        <div className="bg-white rounded-2xl border border-neutral-200 p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-neutral-150">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center">
                <Award className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-bold text-neutral-900 text-sm">Soil Health Card</h4>
                <p className="text-[10px] text-neutral-500 font-mono">ICAR / KVK Tested</p>
              </div>
            </div>
            <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
              Optimal Grade
            </span>
          </div>

          <div className="space-y-2.5 text-xs">
            <div className="flex justify-between items-center py-1 border-b border-neutral-100">
              <span className="text-neutral-500">Soil pH Index:</span>
              <span className="font-bold text-neutral-800 font-mono">6.8 (Neutral Fertile)</span>
            </div>
            <div className="flex justify-between items-center py-1 border-b border-neutral-100">
              <span className="text-neutral-500">Organic Carbon (OC):</span>
              <span className="font-bold text-emerald-700 font-mono">1.12% (High Organic)</span>
            </div>
            <div className="flex justify-between items-center py-1 border-b border-neutral-100">
              <span className="text-neutral-500">NPK Nitrogen (N):</span>
              <span className="font-bold text-neutral-800 font-mono">140 kg/ha</span>
            </div>
            <div className="flex justify-between items-center py-1 border-b border-neutral-100">
              <span className="text-neutral-500">Phosphorus (P):</span>
              <span className="font-bold text-neutral-800 font-mono">48 kg/ha</span>
            </div>
            <div className="flex justify-between items-center py-1">
              <span className="text-neutral-500">Potassium (K):</span>
              <span className="font-bold text-neutral-800 font-mono">190 kg/ha</span>
            </div>
          </div>
        </div>

        {/* Card 2: Kisan Credit Card & Bank Status */}
        <div className="bg-white rounded-2xl border border-neutral-200 p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-neutral-150">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-blue-100 text-blue-800 flex items-center justify-center">
                <CreditCard className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-bold text-neutral-900 text-sm">Kisan Credit Card (KCC)</h4>
                <p className="text-[10px] text-neutral-500 font-mono">SBI Dindori Branch</p>
              </div>
            </div>
            <span className="px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 text-[10px] font-bold">
              Active Credit Line
            </span>
          </div>

          <div className="space-y-2.5 text-xs">
            <div className="flex justify-between items-center py-1 border-b border-neutral-100">
              <span className="text-neutral-500">Sanctioned Limit:</span>
              <span className="font-bold text-neutral-900 font-mono">₹4,50,000</span>
            </div>
            <div className="flex justify-between items-center py-1 border-b border-neutral-100">
              <span className="text-neutral-500">Subsidized Interest Rate:</span>
              <span className="font-bold text-emerald-700 font-mono">4.0% p.a. (Govt DBT)</span>
            </div>
            <div className="flex justify-between items-center py-1 border-b border-neutral-100">
              <span className="text-neutral-500">Bank Account:</span>
              <span className="font-bold text-neutral-800 font-mono">SBI ••••••••9842</span>
            </div>
            <div className="flex justify-between items-center py-1 border-b border-neutral-100">
              <span className="text-neutral-500">IFSC Code:</span>
              <span className="font-bold text-neutral-800 font-mono">SBIN0001234</span>
            </div>
            <div className="flex justify-between items-center py-1">
              <span className="text-neutral-500">Repayment Credit Score:</span>
              <span className="font-bold text-emerald-600 font-mono">98 / 100 (Flawless)</span>
            </div>
          </div>
        </div>

        {/* Card 3: IoT Sensor Telemetry & Weather */}
        <div className="bg-white rounded-2xl border border-neutral-200 p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-neutral-150">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
                <Thermometer className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-bold text-neutral-900 text-sm">Farm Microclimate IoT</h4>
                <p className="text-[10px] text-neutral-500 font-mono">Solar LoRa Station</p>
              </div>
            </div>
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
          </div>

          <div className="space-y-2.5 text-xs">
            <div className="flex justify-between items-center py-1 border-b border-neutral-100">
              <span className="text-neutral-500">Ambient Temperature:</span>
              <span className="font-bold text-neutral-800 font-mono">27.4°C</span>
            </div>
            <div className="flex justify-between items-center py-1 border-b border-neutral-100">
              <span className="text-neutral-500">Soil Moisture (Depth 15cm):</span>
              <span className="font-bold text-emerald-700 font-mono">28.5% (Adequate)</span>
            </div>
            <div className="flex justify-between items-center py-1 border-b border-neutral-100">
              <span className="text-neutral-500">Relative Humidity:</span>
              <span className="font-bold text-neutral-800 font-mono">62%</span>
            </div>
            <div className="flex justify-between items-center py-1 border-b border-neutral-100">
              <span className="text-neutral-500">Drip Irrigation Automation:</span>
              <span className="font-bold text-emerald-600">Active (Solar Powered)</span>
            </div>
            <div className="flex justify-between items-center py-1">
              <span className="text-neutral-500">PMFBY Crop Insurance:</span>
              <span className="font-bold text-neutral-800 font-mono">POL-2026-991204</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
