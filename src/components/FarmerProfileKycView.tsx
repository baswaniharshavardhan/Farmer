import React, { useState } from 'react';
import {
  User,
  Landmark,
  ShieldCheck,
  BadgeCheck,
  Building2,
  MapPin,
  Phone,
  Mail,
  CreditCard,
  Eye,
  EyeOff,
  Edit3,
  CheckCircle2,
  Fingerprint,
} from 'lucide-react';
import { useMarketplace } from '../context/MarketplaceContext';
import { useLanguage } from '../context/LanguageContext';
import { UserProfileModal } from './UserProfileModal';

export const FarmerProfileKycView: React.FC = () => {
  const { currentUser, activeFarm } = useMarketplace();
  const { t } = useLanguage();
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [showFullAadhaar, setShowFullAadhaar] = useState(false);

  const farmerAge = currentUser.age || 46;
  const farmerGender = currentUser.gender || 'Male';
  const rawAadhaar = currentUser.aadhaarNumber || '5829-4102-4821';
  const maskedAadhaar = rawAadhaar.length >= 4
    ? `••••-••••-${rawAadhaar.slice(-4)}`
    : '5829-••••-4821';
  const kisanId = 'MH-NSK-2024-8841';
  const farmerLocation =
    currentUser.farmLocation || activeFarm?.locationName || 'Dindori Agro-Belt, Nashik, Maharashtra';
  const fpoName = currentUser.fpoName || 'Sahyadri Farmers Producer Co. Ltd. (SFPC)';
  const fpoNumber = currentUser.fpoNumber || 'FPO-MH-2021-9842';
  const bankName = currentUser.bankName || 'State Bank of India';
  const accountHolderName = currentUser.accountHolderName || currentUser.name;
  const bankAccountNumber = currentUser.bankAccountNumber || '••••••••9842';
  const ifscCode = currentUser.ifscCode || 'SBIN0001234';
  const upiId = currentUser.upiId || `${(currentUser.email || 'farmer').split('@')[0]}@okhdfcbank`;

  return (
    <div className="space-y-6 animate-in fade-in duration-150" id="farmer-profile-kyc-view">
      {/* Top Header Banner */}
      <div className="bg-gradient-to-r from-emerald-950 via-teal-950 to-neutral-900 text-white rounded-3xl p-6 border-2 border-emerald-500/40 shadow-lg flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center flex-shrink-0">
            <ShieldCheck className="w-7 h-7 text-emerald-300" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="font-display font-black text-xl sm:text-2xl tracking-tight text-white">
                {t('Farmer Profile, Bank & KYC')}
              </h2>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-[11px] font-bold">
                UIDAI e-KYC Verified
              </span>
            </div>
            <p className="text-xs text-emerald-100/80 mt-1">
              Manage your personal farmer profile, verified Aadhaar &amp; Kisan ID credentials, and 88% direct payout bank account.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setIsProfileModalOpen(true)}
          className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold flex items-center gap-2 transition-all shadow-md cursor-pointer self-start sm:self-auto"
          id="btn-edit-farmer-kyc-bank"
        >
          <Edit3 className="w-4 h-4" />
          <span>Edit Profile, Bank &amp; KYC</span>
        </button>
      </div>

      {/* 3-Column Grid: Farmer Profile Details | Aadhaar & Kisan ID | Direct Payout Bank Account */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Card 1: Farmer Profile Details */}
        <div className="bg-white border border-neutral-200 rounded-2xl p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-neutral-150">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center">
                <User className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-neutral-900">Farmer Profile Details</h3>
                <p className="text-[11px] text-neutral-500">Registered Producer Demographics</p>
              </div>
            </div>
            <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" />
              Verified
            </span>
          </div>

          <div className="space-y-3 text-xs">
            <div className="flex justify-between items-center py-1.5 border-b border-neutral-100">
              <span className="text-neutral-500">Full Name:</span>
              <span className="font-bold text-neutral-900">{currentUser.name}</span>
            </div>
            <div className="flex justify-between items-center py-1.5 border-b border-neutral-100">
              <span className="text-neutral-500">Age &amp; Gender:</span>
              <span className="font-semibold text-neutral-800">
                {farmerAge} yrs · {farmerGender}
              </span>
            </div>
            <div className="flex justify-between items-center py-1.5 border-b border-neutral-100 gap-2">
              <span className="text-neutral-500 flex items-center gap-1 flex-shrink-0">
                <MapPin className="w-3.5 h-3.5 text-neutral-400" />
                Location:
              </span>
              <span className="font-semibold text-neutral-800 text-right">{farmerLocation}</span>
            </div>
            <div className="flex justify-between items-center py-1.5 border-b border-neutral-100 gap-2">
              <span className="text-neutral-500 flex items-center gap-1 flex-shrink-0">
                <Mail className="w-3.5 h-3.5 text-neutral-400" />
                Email:
              </span>
              <span className="font-mono text-neutral-700 truncate">{currentUser.email}</span>
            </div>
            {currentUser.phone && (
              <div className="flex justify-between items-center py-1.5 border-b border-neutral-100">
                <span className="text-neutral-500 flex items-center gap-1">
                  <Phone className="w-3.5 h-3.5 text-neutral-400" />
                  Mobile:
                </span>
                <span className="font-mono font-semibold text-neutral-800">{currentUser.phone}</span>
              </div>
            )}
            <div className="flex justify-between items-center py-1">
              <span className="text-neutral-500 flex items-center gap-1">
                <Building2 className="w-3.5 h-3.5 text-neutral-400" />
                FPO Collective:
              </span>
              <span className="font-semibold text-emerald-800 text-right">{fpoName}</span>
            </div>
          </div>
        </div>

        {/* Card 2: Aadhaar & Kisan ID Credentials */}
        <div className="bg-white border border-neutral-200 rounded-2xl p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-neutral-150">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
                <Fingerprint className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-neutral-900">Aadhaar &amp; Kisan ID</h3>
                <p className="text-[11px] text-neutral-500">Government Identity &amp; FPO KYC</p>
              </div>
            </div>
            <span className="px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 text-[10px] font-bold flex items-center gap-1">
              <BadgeCheck className="w-3 h-3" />
              e-KYC Active
            </span>
          </div>

          <div className="space-y-3 text-xs">
            <div className="p-3 rounded-xl bg-neutral-50 border border-neutral-200 flex items-center justify-between gap-2">
              <div>
                <div className="text-[10px] font-bold uppercase tracking-wider text-neutral-500">
                  Aadhaar Number (UIDAI)
                </div>
                <div className="font-mono text-sm font-black text-neutral-900 mt-0.5">
                  {showFullAadhaar ? rawAadhaar : maskedAadhaar}
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowFullAadhaar(!showFullAadhaar)}
                className="p-2 rounded-lg bg-white border border-neutral-200 text-neutral-600 hover:text-emerald-700 hover:border-emerald-300 transition-colors cursor-pointer"
                title={showFullAadhaar ? 'Mask Aadhaar' : 'Show Aadhaar'}
              >
                {showFullAadhaar ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>

            <div className="p-3 rounded-xl bg-emerald-50/70 border border-emerald-200 flex items-center justify-between gap-2">
              <div>
                <div className="text-[10px] font-bold uppercase tracking-wider text-emerald-800">
                  Official Kisan ID
                </div>
                <div className="font-mono text-sm font-black text-emerald-950 mt-0.5">
                  {kisanId}
                </div>
              </div>
              <span className="px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                Verified
              </span>
            </div>

            <div className="flex justify-between items-center py-1.5 border-b border-neutral-100">
              <span className="text-neutral-500">FPO Registration No:</span>
              <span className="font-mono font-bold text-neutral-800">{fpoNumber}</span>
            </div>
            <div className="flex justify-between items-center py-1">
              <span className="text-neutral-500">Organic Certification:</span>
              <span className="font-bold text-emerald-700">PGS-India Certified</span>
            </div>
          </div>
        </div>

        {/* Card 3: Direct Payout Bank Account */}
        <div className="bg-sky-50/50 border border-sky-200 rounded-2xl p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-sky-200/70">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-sky-100 text-sky-800 flex items-center justify-center">
                <Landmark className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-neutral-900">Direct Payout Bank Account</h3>
                <p className="text-[11px] text-neutral-500">Automated DBT Settlement</p>
              </div>
            </div>
            <span className="px-2 py-0.5 rounded-full bg-sky-100 text-sky-900 text-[10px] font-bold">
              88% Net Receiving
            </span>
          </div>

          <div className="space-y-3 text-xs">
            <div className="flex justify-between items-center py-1.5 border-b border-sky-200/60">
              <span className="text-neutral-600">Bank Name:</span>
              <span className="font-bold text-neutral-900">{bankName}</span>
            </div>
            <div className="flex justify-between items-center py-1.5 border-b border-sky-200/60">
              <span className="text-neutral-600">Account Holder:</span>
              <span className="font-semibold text-neutral-900">{accountHolderName}</span>
            </div>
            <div className="flex justify-between items-center py-1.5 border-b border-sky-200/60">
              <span className="text-neutral-600">Account Number:</span>
              <span className="font-mono font-bold text-neutral-900">{bankAccountNumber}</span>
            </div>
            <div className="flex justify-between items-center py-1.5 border-b border-sky-200/60">
              <span className="text-neutral-600">IFSC Code:</span>
              <span className="font-mono font-bold text-neutral-900">{ifscCode}</span>
            </div>
            <div className="flex justify-between items-center py-1.5 border-b border-sky-200/60">
              <span className="text-neutral-600">UPI ID:</span>
              <span className="font-mono font-semibold text-sky-800">{upiId}</span>
            </div>
            <div className="p-2.5 rounded-xl bg-white/80 border border-sky-200 flex items-center gap-2 text-[11px] text-sky-900">
              <CreditCard className="w-4 h-4 text-sky-600 flex-shrink-0" />
              <span>Instant escrow settlement enabled — 88% of gross sale settles directly here.</span>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      <UserProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
      />
    </div>
  );
};
