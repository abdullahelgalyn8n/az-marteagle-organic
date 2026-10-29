import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, Trash2, ArrowLeft, MessageCircle } from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { useStore } from '../context/StoreContext';
import { ProductCard } from '../components/ProductCard';
import { buildWhatsAppOrderUrl, calculateCartTotals } from '../utils/storeLogic';

export const WishlistPage: React.FC = () => {
  const { wishlistIds, clearWishlist, moveAllWishlistToCart } = useStore();

  const wishlistedProducts = PRODUCTS.filter((p) => wishlistIds.includes(p.id));

  const wishlistAsItems = wishlistedProducts.map((product) => ({
    product,
    quantity: 1,
  }));
  const wishlistTotals = calculateCartTotals(wishlistAsItems);
  const whatsappWishlistUrl = buildWhatsAppOrderUrl({
    items: wishlistAsItems,
    totals: wishlistTotals,
  });

  if (wishlistedProducts.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-5">
        <div className="w-20 h-20 rounded-3xl bg-rose-50 dark:bg-slate-800 text-[#B96B78] flex items-center justify-center mx-auto border border-rose-100 dark:border-slate-700">
          <Heart className="w-10 h-10" />
        </div>
        <h1 className="text-3xl font-extrabold text-slate-950 dark:text-white">قائمة المفضلة فارغة</h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-md mx-auto">
          لم تقم بحفظ أي منتجات في قائمة المفضلة بعد. اضغط على أيقونة القلب على أي منتج عضوي لحفظه والرجوع إليه في أي وقت.
        </p>
        <Link
          to="/shop"
          className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-[#0B24FB] text-white text-sm font-bold hover:bg-[#081BC7] transition-colors"
        >
          <span>استكشف المنتجات العضوية</span>
          <ArrowLeft className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header & Dynamic Batch Actions */}
      <div className="bg-[#EEF7FF] dark:bg-[#111827] rounded-3xl border border-blue-100 dark:border-slate-800 p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-2 text-xs font-bold text-[#B96B78]">
            <Heart className="w-4 h-4 fill-[#B96B78]" />
            <span>قائمتك المحفوظة في Marteagle</span>
          </div>
          <h1 className="text-3xl font-extrabold text-slate-950 dark:text-white">
            المنتجات المفضلة ({wishlistedProducts.length})
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-300">
            يمكنك نقل جميع منتجاتك المفضلة إلى السلة بضغطة واحدة أو طلبها مباشرة عبر واتساب.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={moveAllWishlistToCart}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#0B24FB] text-white text-xs sm:text-sm font-bold hover:bg-[#081BC7] transition-colors cursor-pointer whitespace-nowrap shadow-xs"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>إضافة الكل إلى السلة ({wishlistedProducts.length})</span>
          </button>

          <a
            href={whatsappWishlistUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#0D1321] dark:bg-slate-800 text-white text-xs sm:text-sm font-bold hover:bg-slate-800 dark:hover:bg-slate-700 transition-colors whitespace-nowrap"
          >
            <MessageCircle className="w-4 h-4 text-emerald-400" />
            <span>طلب القائمة عبر واتساب</span>
          </a>

          <button
            type="button"
            onClick={clearWishlist}
            aria-label="إفراغ قائمة المفضلة"
            className="inline-flex items-center gap-1.5 px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#161F30] text-slate-700 dark:text-slate-200 hover:text-rose-700 dark:hover:text-rose-400 hover:border-rose-200 text-xs font-bold transition-colors cursor-pointer whitespace-nowrap"
          >
            <Trash2 className="w-4 h-4" />
            <span>مسح القائمة</span>
          </button>
        </div>
      </div>

      {/* Wishlisted Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7">
        {wishlistedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};
