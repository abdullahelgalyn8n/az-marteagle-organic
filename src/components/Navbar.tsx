import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { ShoppingCart, Sun, Moon } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { formatCurrencyEGP } from '../utils/storeLogic';

export const Navbar: React.FC = () => {
  const { totals, setIsCartDrawerOpen, wishlistIds, isDarkMode, toggleDarkMode } = useStore();

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `text-sm font-bold transition-colors whitespace-nowrap shrink-0 py-1 border-b-2 ${
      isActive
        ? 'text-[#0B24FB] dark:text-blue-400 border-[#0B24FB] dark:border-blue-400'
        : 'text-slate-700 dark:text-slate-300 border-transparent hover:text-[#0B24FB] dark:hover:text-blue-400 hover:border-[#0B24FB]/40'
    }`;

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 dark:bg-[#0B0F19]/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-18 flex items-center justify-between gap-6">
        {/* Zone 1: Authentic Marteagle Geometric Blue Brand Logo + English Wordmark "Marteagle" */}
        <Link
          to="/"
          className="inline-flex items-center gap-3 text-lg sm:text-xl font-extrabold tracking-tight text-slate-950 dark:text-white whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0B24FB] rounded-lg"
        >
          <img
            src="/images/ui/icon-1.png"
            alt="Marteagle Logo"
            className="w-9 h-9 sm:w-10 sm:h-10 object-contain shrink-0 rounded-md"
          />
          <span dir="ltr" className="font-extrabold tracking-tight text-xl sm:text-2xl">
            Marteagle
          </span>
        </Link>

        {/* Zone 2: 5 Concise Single-Line Navigation Links */}
        <nav aria-label="التنقل الرئيسي" className="hidden md:flex items-center gap-7">
          <NavLink to="/" end className={navLinkClass}>
            الرئيسية
          </NavLink>
          <NavLink to="/shop" className={navLinkClass}>
            المتجر
          </NavLink>
          <NavLink to="/blog" className={navLinkClass}>
            المقالات
          </NavLink>
          <NavLink to="/wishlist" className={navLinkClass}>
            المفضلة ({wishlistIds.length})
          </NavLink>
          <NavLink to="/contact" className={navLinkClass}>
            تواصل معنا
          </NavLink>
        </nav>

        {/* Zone 3: Theme Toggle + Primary Cart Action */}
        <div className="flex items-center gap-2.5 shrink-0">
          <button
            type="button"
            onClick={toggleDarkMode}
            aria-label={isDarkMode ? 'تفعيل الوضع النهاري' : 'تفعيل الوضع الليلي'}
            title={isDarkMode ? 'الوضع النهاري (Light Mode)' : 'الوضع الليلي (Dark Mode)'}
            className="w-10 h-10 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-[#161F30] text-slate-700 dark:text-amber-300 hover:border-[#0B24FB] dark:hover:border-blue-400 flex items-center justify-center transition-colors cursor-pointer shrink-0"
          >
            {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          <button
            type="button"
            onClick={() => setIsCartDrawerOpen(true)}
            aria-label={`فتح سلة التسوق (${totals.itemCount} منتجات)`}
            className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-[#0B24FB] text-white text-xs sm:text-sm font-bold hover:bg-[#081BC7] transition-colors whitespace-nowrap shrink-0 cursor-pointer shadow-xs"
          >
            <ShoppingCart className="w-4 h-4 shrink-0" />
            <span>السلة ({totals.itemCount})</span>
            <span className="hidden sm:inline text-blue-200" aria-hidden="true">|</span>
            <span dir="ltr" className="hidden sm:inline tabular-nums font-mono text-xs">
              {formatCurrencyEGP(totals.total)}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};
