import React, { useState } from 'react';
import {
  ShoppingBag,
  Tractor,
  ShieldCheck,
  Lock,
  Mail,
  Key,
  ArrowRight,
  AlertCircle,
  Leaf,
  UserPlus,
  CheckCircle2,
  Eye,
  EyeOff,
  Globe,
  Info,
} from 'lucide-react';
import { useMarketplace } from '../context/MarketplaceContext';
import { UserRole } from '../types';
import { SignUpForms } from './SignUpForms';
import { useLanguage } from '../context/LanguageContext';
import { PortalInfoModal } from './PortalInfoModal';

export const LoginPortal: React.FC = () => {
  const { login } = useMarketplace();
  const { language, setLanguage, t, languages } = useLanguage();

  const [activeTab, setActiveTab] = useState<'login' | 'signup'>('login');
  const [selectedRole, setSelectedRole] = useState<UserRole>('consumer');
  const [emailInput, setEmailInput] = useState('elena.rostova@sfbay.org');
  const [passwordInput, setPasswordInput] = useState('Password123!');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isPortalInfoOpen, setIsPortalInfoOpen] = useState(false);
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);

  // Demo accounts for quick 1-click autofill
  const demoAccounts = [
    {
      role: 'consumer' as UserRole,
      label: 'Sample Normal Buyer',
      name: 'Elena Rostova',
      email: 'elena.rostova@sfbay.org',
      password: 'Password123!',
      icon: ShoppingBag,
      color: 'emerald',
    },
    {
      role: 'farmer' as UserRole,
      label: 'Farmer (Kisan)',
      name: 'Harish Patil',
      email: 'contact@sunriseorchards.farm',
      password: 'FarmerPass123!',
      icon: Tractor,
      color: 'amber',
      fpoCode: 'MH-NSK-FPO-042',
    },
    {
      role: 'admin' as UserRole,
      label: 'Admin',
      name: 'Sarah Chen',
      email: 'sarah.chen@farmdirect.co',
      password: 'AdminSecure999!',
      icon: ShieldCheck,
      color: 'purple',
    },
  ];

  const handleSelectRole = (role: UserRole) => {
    setSelectedRole(role);
    setErrorMessage(null);
    const demo = demoAccounts.find((d) => d.role === role);
    if (demo) {
      setEmailInput(demo.email);
      setPasswordInput(demo.password);
    }
  };

  const handleQuickFill = (acc: (typeof demoAccounts)[0]) => {
    setSelectedRole(acc.role);
    setEmailInput(acc.email);
    setPasswordInput(acc.password);
    setErrorMessage(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput.trim()) {
      setErrorMessage('Please enter an email address.');
      return;
    }
    if (!passwordInput.trim()) {
      setErrorMessage('Please enter your password.');
      return;
    }

    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const res = await login(selectedRole, emailInput.trim(), passwordInput.trim());
      if (!res.success && res.error) {
        setErrorMessage(res.error);
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'Authentication failed.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col justify-center items-center p-4 sm:p-6 selection:bg-emerald-500 selection:text-white">
      <div
        className={`w-full my-auto transition-all duration-300 ${
          activeTab === 'signup' ? 'max-w-3xl' : 'max-w-md'
        }`}
      >
        {/* Top Floating Helper Controls (Language + Portal Info) */}
        <div className="flex items-center justify-between mb-4 px-1 gap-2">
          <button
            type="button"
            onClick={() => setIsPortalInfoOpen(true)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-neutral-300 hover:text-white text-xs font-bold transition-all shadow-xs cursor-pointer"
            id="btn-login-portal-info"
          >
            <Info className="w-3.5 h-3.5 text-emerald-400" />
            <span>{t('portalInfo')}</span>
          </button>

          <div className="flex items-center gap-2">
            {/* Quick English Switch Button when in another language */}
            {language !== 'en' && (
              <button
                type="button"
                onClick={() => setLanguage('en')}
                className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-emerald-500/60 text-emerald-300 hover:text-white text-xs font-bold transition-all shadow-xs cursor-pointer animate-in fade-in"
                title="Switch to English / अंग्रेजी में बदलें"
                id="btn-login-quick-switch-en"
              >
                <span>🇬🇧</span>
                <span>English</span>
              </button>
            )}

            {/* Language Selector */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-neutral-200 text-xs font-bold transition-all shadow-xs cursor-pointer"
                id="btn-login-lang-switcher"
              >
                <Globe className="w-3.5 h-3.5 text-emerald-400" />
                <span>{languages.find((l) => l.code === language)?.flag}</span>
                <span>{languages.find((l) => l.code === language)?.nativeName}</span>
              </button>

              {isLangMenuOpen && (
                <div className="absolute right-0 mt-2 w-52 bg-neutral-900 border border-neutral-700 rounded-2xl p-2 shadow-2xl z-50 animate-in fade-in zoom-in-95 duration-100">
                  <div className="text-[10px] font-bold text-neutral-400 px-2 py-1 uppercase tracking-wider">
                    Select Language / भाषा
                  </div>

                  {/* Prominent English Button */}
                  <button
                    type="button"
                    onClick={() => {
                      setLanguage('en');
                      setIsLangMenuOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-2.5 py-2 mb-1 rounded-xl text-xs font-bold transition-all text-left cursor-pointer border ${
                      language === 'en'
                        ? 'bg-emerald-600 text-white border-emerald-400 shadow-xs'
                        : 'bg-neutral-950 text-neutral-200 border-neutral-800 hover:bg-neutral-800'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <span className="text-base">🇬🇧</span>
                      <div>
                        <div className="font-bold text-white">English</div>
                        <div className="text-[10px] text-neutral-400 font-normal">Default Language</div>
                      </div>
                    </span>
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-md bg-neutral-800 text-neutral-300 font-bold">
                      EN
                    </span>
                  </button>

                  <div className="text-[9px] font-bold text-neutral-400 px-2 pt-1 pb-0.5 uppercase tracking-wider">
                    Regional Languages / भाषाएं
                  </div>

                  <div className="space-y-1 mt-0.5 max-h-56 overflow-y-auto">
                    {languages.filter((l) => l.code !== 'en').map((l) => (
                      <button
                        key={l.code}
                        type="button"
                        onClick={() => {
                          setLanguage(l.code);
                          setIsLangMenuOpen(false);
                        }}
                        className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-xl text-xs font-medium transition-all text-left cursor-pointer ${
                          language === l.code
                            ? 'bg-emerald-600 text-white font-bold'
                            : 'text-neutral-300 hover:bg-neutral-800'
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          <span>{l.flag}</span>
                          <span>{l.nativeName}</span>
                        </span>
                        <span className="text-[10px] text-neutral-400 font-mono">{l.code.toUpperCase()}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Brand Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-500 text-white shadow-xl shadow-emerald-950/60 mb-3 border border-emerald-400/20">
            <Leaf className="w-7 h-7" />
          </div>
          <h1 className="theme-heading font-serif-harvest text-3xl sm:text-4xl font-black tracking-tight text-white">
            FarmDirect
          </h1>
          <p className="text-xs sm:text-sm text-neutral-400 mt-0.5 font-sans">
            {t('tagline')}
          </p>
          <div className="mt-1">
            <span className="font-script text-lg text-amber-300 font-bold drop-shadow-xs">
              ✨ {t('88% Direct to Producer')}
            </span>
          </div>
        </div>

        {/* Main Auth Container */}
        <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 sm:p-8 shadow-2xl">
          {/* Top Auth Navigation Tabs */}
          <div className="flex bg-neutral-950 p-1 rounded-xl border border-neutral-800 mb-6 text-xs font-bold">
            <button
              type="button"
              onClick={() => {
                setActiveTab('login');
                setErrorMessage(null);
              }}
              className={`flex-1 py-2 rounded-lg transition-all text-center cursor-pointer ${
                activeTab === 'login'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-neutral-400 hover:text-white'
              }`}
              id="tab-auth-login"
            >
              {t('signIn')}
            </button>
            <button
              type="button"
              onClick={() => {
                setActiveTab('signup');
                setErrorMessage(null);
              }}
              className={`flex-1 py-2 rounded-lg transition-all text-center flex items-center justify-center gap-1.5 cursor-pointer ${
                activeTab === 'signup'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-neutral-400 hover:text-white'
              }`}
              id="tab-auth-signup"
            >
              <UserPlus className="w-3.5 h-3.5" />
              <span>{t('signUp')}</span>
            </button>
          </div>

          {/* TAB 1: LOGIN */}
          {activeTab === 'login' && (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Role Selection */}
              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-2">
                  {t('Select Role')}
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {demoAccounts.map((acc) => {
                    const Icon = acc.icon;
                    const isSelected = selectedRole === acc.role;
                    return (
                      <button
                        key={acc.role}
                        type="button"
                        onClick={() => handleSelectRole(acc.role)}
                        className={`py-2 px-2 rounded-xl text-xs font-bold flex flex-col items-center gap-1 transition-all border cursor-pointer ${
                          isSelected
                            ? acc.role === 'consumer'
                              ? 'bg-emerald-950/80 border-emerald-500 text-emerald-300'
                              : acc.role === 'farmer'
                              ? 'bg-amber-950/80 border-amber-500 text-amber-300'
                              : 'bg-purple-950/80 border-purple-500 text-purple-300'
                            : 'bg-neutral-950/60 border-neutral-800 text-neutral-400 hover:text-neutral-200 hover:border-neutral-700'
                        }`}
                        id={`btn-role-select-${acc.role}`}
                      >
                        <Icon className="w-4 h-4" />
                        <span>{t(acc.label)}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Quick 1-Click Demo Fill Chips */}
              <div>
                <div className="text-[11px] text-neutral-400 mb-1.5 flex items-center justify-between">
                  <span>{t('quickFill')}:</span>
                </div>
                <div className="flex gap-1.5">
                  {demoAccounts.map((acc) => (
                    <button
                      key={acc.role}
                      type="button"
                      onClick={() => handleQuickFill(acc)}
                      className={`flex-1 py-1 px-2 text-[11px] rounded-lg border font-medium transition-all text-center truncate cursor-pointer ${
                        selectedRole === acc.role
                          ? 'bg-neutral-800 border-neutral-600 text-white font-bold'
                          : 'bg-neutral-950 border-neutral-800 text-neutral-400 hover:text-neutral-300'
                      }`}
                    >
                      {acc.name ? acc.name.split(' ')[0] : t(acc.label)}
                    </button>
                  ))}
                </div>
              </div>

              {/* FARMER 3D VISUAL SHOWCASE: Added directly when Farmer role is selected */}
              {selectedRole === 'farmer' && (
                <div className="rounded-2xl overflow-hidden border-2 border-amber-500/50 bg-gradient-to-br from-amber-950/70 via-neutral-900 to-black p-3.5 shadow-[0_12px_30px_rgba(245,158,11,0.25)] relative transition-all animate-in fade-in zoom-in-95 duration-200">
                  <div className="flex items-center gap-3.5">
                    <div className="relative w-16 h-16 rounded-xl overflow-hidden border-2 border-amber-400 flex-shrink-0 shadow-lg">
                      <img
                        src="/farmer-portrait.jpg"
                        alt="Harish Patil - Kisan Mitra"
                        className="w-full h-full object-cover object-top"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute bottom-0 inset-x-0 bg-amber-500 text-[9px] font-black text-center text-neutral-950 py-0.5 tracking-wider">
                        PRODUCER
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5">
                        <h4 className="font-display font-black text-white text-sm truncate">
                          Harish Patil &amp; Family
                        </h4>
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                      </div>
                      <p className="text-[11px] text-amber-200/90 font-medium">
                        FPO Code: <span className="font-mono text-white font-bold px-1.5 py-0.2 rounded-sm bg-black/40 border border-amber-500/40">MH-NSK-FPO-042</span>
                      </p>
                      <div className="flex items-center gap-2 mt-1 text-[11px] text-neutral-300">
                        <span className="text-emerald-400 font-bold">₹ 88% Direct Payout</span>
                        <span>•</span>
                        <span className="text-neutral-400">Nashik Agro Cluster</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Error Message Display */}
              {errorMessage && (
                <div className="p-3 rounded-xl bg-rose-950/80 border border-rose-800 text-rose-300 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Email Input */}
              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                  {t('emailAddress')}
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-neutral-500 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="email"
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    placeholder="name@example.com"
                    required
                    className="w-full bg-neutral-950 border border-neutral-800 focus:border-emerald-500 rounded-xl py-2.5 pl-9 pr-3 text-xs text-white placeholder:text-neutral-600 focus:outline-hidden transition-colors"
                    id="input-login-email"
                  />
                </div>
              </div>

              {/* Password Input with Visibility Toggle */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-semibold text-neutral-300">
                    {t('password')}
                  </label>
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-[11px] text-neutral-400 hover:text-emerald-400 flex items-center gap-1 cursor-pointer transition-colors"
                    id="btn-toggle-password-visibility"
                    aria-label="Toggle password visibility"
                  >
                    {showPassword ? (
                      <>
                        <EyeOff className="w-3.5 h-3.5" />
                        <span>{t('hidePassword')}</span>
                      </>
                    ) : (
                      <>
                        <Eye className="w-3.5 h-3.5" />
                        <span>{t('seePassword')}</span>
                      </>
                    )}
                  </button>
                </div>
                <div className="relative">
                  <Key className="w-4 h-4 text-neutral-500 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={passwordInput}
                    onChange={(e) => setPasswordInput(e.target.value)}
                    placeholder="Enter password"
                    required
                    className="w-full bg-neutral-950 border border-neutral-800 focus:border-emerald-500 rounded-xl py-2.5 pl-9 pr-10 text-xs text-white placeholder:text-neutral-600 focus:outline-hidden transition-colors font-mono"
                    id="input-login-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-200 p-1 cursor-pointer"
                    title={showPassword ? t('hidePassword') : t('seePassword')}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-3 rounded-xl text-xs font-bold text-white shadow-lg flex items-center justify-center gap-2 transition-all cursor-pointer ${
                    selectedRole === 'consumer'
                      ? 'bg-emerald-600 hover:bg-emerald-500 shadow-emerald-950/40'
                      : selectedRole === 'farmer'
                      ? 'bg-amber-600 hover:bg-amber-500 shadow-amber-950/40'
                      : 'bg-purple-600 hover:bg-purple-500 shadow-purple-950/40'
                  } ${isSubmitting ? 'opacity-70 cursor-wait' : ''}`}
                  id="btn-login-submit"
                >
                  <Lock className="w-4 h-4" />
                  <span>
                    {isSubmitting
                      ? t('Signing In...')
                      : `${t('signIn')} (${
                          selectedRole === 'consumer'
                            ? t('normalBuyer')
                            : selectedRole === 'farmer'
                            ? t('farmerKisan')
                            : t('adminGov')
                        })`}
                  </span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </button>
              </div>

              {/* Link to Sign Up */}
              <div className="pt-2 text-center text-xs text-neutral-400">
                {t("Don't have an account?")}{' '}
                <button
                  type="button"
                  onClick={() => setActiveTab('signup')}
                  className="text-emerald-400 hover:text-emerald-300 font-bold underline cursor-pointer"
                >
                  {t('signUp')}
                </button>
              </div>
            </form>
          )}

          {/* TAB 2: SIGN UP */}
          {activeTab === 'signup' && (
            <div className="space-y-4">
              <SignUpForms
                initialRole={selectedRole === 'farmer' ? 'farmer' : 'consumer'}
                onSwitchToLogin={() => setActiveTab('login')}
              />
              <div className="pt-2 text-center text-xs text-neutral-400 border-t border-neutral-800">
                Already have an account?{' '}
                <button
                  type="button"
                  onClick={() => setActiveTab('login')}
                  className="text-emerald-400 hover:text-emerald-300 font-bold underline cursor-pointer"
                >
                  Sign In
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Minimal Footer */}
        <div className="mt-6 text-center text-[11px] text-neutral-500">
          Protected &bull; Direct Farm-to-Consumer Food Network
        </div>
      </div>

      {/* Portal Info Educational Modal */}
      <PortalInfoModal
        isOpen={isPortalInfoOpen}
        onClose={() => setIsPortalInfoOpen(false)}
      />
    </div>
  );
};
