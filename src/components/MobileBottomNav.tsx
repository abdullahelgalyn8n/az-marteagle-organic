import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Store, BookOpen, Heart, ShoppingCart } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const MobileBottomNav: React.FC = () => {
  const { totals, wishlistIds, setIsCartDrawerOpen } = useStore();

  const itemClass = ({ isActive }: { isActive: boolean }) =>
    `flex flex-col items-center justify-center gap-0.5 py-1.5 px-2 text-[11px] font-bold transition-colors whitespace-nowrap ${
      isActive
        ? 'text-[#0B24FB] dark:text-blue-400'
        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
    }`;

  return (
    <nav
      aria-label="شريط التنقل السفلي للجوال"
      className="md:hidden fixed bottom-0 inset-x-0 z-40 h-14 bg-white/95 dark:bg-[#0D1321]/95 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 grid grid-cols-5 items-center px-1 shadow-lg transition-colors duration-200"
    >
      <NavLink to="/" end className={itemClass}>
        <Home className="w-4 h-4" />
        <span>الرئيسية</span>
      </NavLink>

      <NavLink to="/shop" className={itemClass}>
        <Store className="w-4 h-4" />
        <span>المتجر</span>
      </NavLink>

      <NavLink to="/blog" className={itemClass}>
        <BookOpen className="w-4 h-4" />
        <span>المقالات</span>
      </NavLink>

      <NavLink to="/wishlist" className={itemClass}>
        <div className="relative">
          <Heart className="w-4 h-4" />
          {wishlistIds.length > 0 && (
            <span className="absolute -top-1.5 -right-2.5 min-w-[16px] h-4 px-1 rounded-full bg-[#B96B78] text-white text-[10px] font-extrabold flex items-center justify-center tabular-nums">
              {wishlistIds.length}
            </span>
          )}
        </div>
        <span>المفضلة</span>
      </NavLink>

      <button
        type="button"
        onClick={() => setIsCartDrawerOpen(true)}
        aria-label={`فتح السلة (${totals.itemCount})`}
        className="flex flex-col items-center justify-center gap-0.5 py-1.5 px-2 text-[11px] font-bold text-slate-600 dark:text-slate-300 hover:text-[#0B24FB] dark:hover:text-blue-400 cursor-pointer whitespace-nowrap"
      >
        <div className="relative">
          <ShoppingCart className="w-4 h-4 text-[#0B24FB] dark:text-blue-400" />
          {totals.itemCount > 0 && (
            <span className="absolute -top-1.5 -right-2.5 min-w-[16px] h-4 px-1 rounded-full bg-[#0B24FB] text-white text-[10px] font-extrabold flex items-center justify-center tabular-nums">
              {totals.itemCount}
            </span>
          )}
        </div>
        <span>السلة</span>
      </button>
    </nav>
  );
};
