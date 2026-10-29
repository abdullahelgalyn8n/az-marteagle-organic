import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Heart, Star, Plus, Minus, MessageCircle } from 'lucide-react';
import { Product } from '../data/products';
import { formatCurrencyEGP, buildSingleProductWhatsAppUrl } from '../utils/storeLogic';
import { useStore } from '../context/StoreContext';
import { ProductArtwork } from './ProductArtwork';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { cart, addToCart, updateQuantity, wishlistIds, toggleWishlist } = useStore();
  const isWishlisted = wishlistIds.includes(product.id);
  const cartItem = cart.find((item) => item.product.id === product.id);
  const quantityInCart = cartItem ? cartItem.quantity : 0;

  const whatsappQuickUrl = buildSingleProductWhatsAppUrl(product, Math.max(1, quantityInCart));

  return (
    <article
      className="group relative flex flex-col h-full bg-white dark:bg-[#161F30] rounded-2xl border border-slate-200/90 dark:border-slate-800 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:border-[#0B24FB]/40 dark:hover:border-blue-500/50 overflow-hidden"
    >
      {/* Product Image Area */}
      <div className="relative aspect-square w-full overflow-hidden bg-[#F4F6F9] dark:bg-[#1E293B] border-b border-slate-100 dark:border-slate-800">
        <Link
          to={`/product/${product.slug}`}
          className="block w-full h-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0B24FB]"
          aria-label={`عرض تفاصيل ${product.name}`}
        >
          <ProductArtwork product={product} className="w-full h-full !bg-[#F4F6F9] dark:!bg-[#1E293B]" />
        </Link>

        {/* Wishlist Toggle Button */}
        <button
          type="button"
          onClick={() => toggleWishlist(product.id)}
          aria-label={isWishlisted ? `إزالة ${product.name} من المفضلة` : `إضافة ${product.name} إلى المفضلة`}
          className={`absolute top-3 left-3 z-10 w-9 h-9 rounded-xl flex items-center justify-center transition-all cursor-pointer shadow-xs ${
            isWishlisted
              ? 'bg-[#B96B78] text-white border border-[#B96B78] scale-105'
              : 'bg-white/95 dark:bg-slate-900/90 text-slate-700 dark:text-slate-200 hover:bg-white dark:hover:bg-slate-900 hover:text-[#B96B78] border border-slate-200/80 dark:border-slate-700'
          }`}
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-white' : ''}`} />
        </button>

        {product.isBestSeller && (
          <span className="absolute top-3 right-3 text-[11px] font-bold text-[#0D1321] dark:text-white bg-white/95 dark:bg-slate-900/90 px-2.5 py-1 rounded-lg border border-slate-200/80 dark:border-slate-700 shadow-2xs">
            الأكثر مبيعًا
          </span>
        )}
      </div>

      {/* Card Body */}
      <div className="flex flex-col flex-1 p-4 sm:p-5 justify-between gap-4">
        <div className="space-y-2">
          {/* Category + Rating Row */}
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
            <Link
              to={`/category/${product.category}`}
              className="hover:text-[#0B24FB] dark:hover:text-blue-400 transition-colors font-semibold truncate max-w-[70%]"
            >
              {product.categoryLabel}
            </Link>
            <span className="flex items-center gap-1 text-amber-600 dark:text-amber-400 font-bold tabular-nums shrink-0">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              {product.rating.toFixed(1)}
            </span>
          </div>

          {/* Product Title (Aligned 2-line slot) */}
          <h3 className="text-base font-extrabold text-slate-900 dark:text-white leading-snug line-clamp-2 min-h-[2.6rem] group-hover:text-[#0B24FB] dark:group-hover:text-blue-400 transition-colors">
            <Link to={`/product/${product.slug}`} className="focus-visible:outline-none">
              {product.name}
            </Link>
          </h3>

          {/* Unit & Certification Metadata */}
          <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 truncate">
            <span className="font-medium text-slate-700 dark:text-slate-300">{product.unit}</span>
            <span aria-hidden="true">·</span>
            <span className="truncate">{product.certification}</span>
          </div>
        </div>

        {/* Price + Organized Action Bar */}
        <div className="pt-3.5 border-t border-slate-100 dark:border-slate-800 space-y-3">
          {/* Price Row */}
          <div className="flex items-baseline justify-between gap-2">
            <span className="text-xs text-slate-500 dark:text-slate-400">السعر:</span>
            <div className="flex items-baseline gap-2">
              {product.originalPrice && (
                <span
                  dir="ltr"
                  className="text-xs text-slate-400 dark:text-slate-500 line-through tabular-nums"
                >
                  {formatCurrencyEGP(product.originalPrice)}
                </span>
              )}
              <span
                dir="ltr"
                className="text-base font-extrabold text-slate-950 dark:text-white tabular-nums"
              >
                {formatCurrencyEGP(product.price)}
              </span>
            </div>
          </div>

          {/* Unified Action Row: Royal Blue Add-to-Cart + Compact WhatsApp Direct Order */}
          <div className="flex items-center gap-2">
            {quantityInCart > 0 ? (
              <div className="flex-1 inline-flex items-center justify-between rounded-xl border border-[#0B24FB]/30 dark:border-blue-500/40 bg-[#EEF7FF] dark:bg-slate-800 p-1">
                <button
                  type="button"
                  onClick={() => updateQuantity(product.id, quantityInCart - 1)}
                  aria-label={`تقليل كمية ${product.name}`}
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-[#0B24FB] dark:text-blue-400 hover:bg-white dark:hover:bg-slate-700 transition-colors cursor-pointer"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="px-2 text-xs font-extrabold text-slate-950 dark:text-white tabular-nums">
                  {quantityInCart} بالسلة
                </span>
                <button
                  type="button"
                  onClick={() => updateQuantity(product.id, quantityInCart + 1)}
                  aria-label={`زيادة كمية ${product.name}`}
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-[#0B24FB] dark:text-blue-400 hover:bg-white dark:hover:bg-slate-700 transition-colors cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => addToCart(product, 1)}
                aria-label={`إضافة إلى السلة: ${product.name}`}
                className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 px-3.5 rounded-xl bg-[#0B24FB] text-white text-xs font-bold hover:bg-[#081BC7] active:scale-[0.99] transition-all whitespace-nowrap cursor-pointer shadow-xs"
              >
                <ShoppingCart className="w-3.5 h-3.5 shrink-0" />
                <span>إضافة إلى السلة</span>
              </button>
            )}

            <a
              href={whatsappQuickUrl}
              target="_blank"
              rel="noopener noreferrer"
              title={`اطلب ${product.name} عبر واتساب`}
              aria-label={`اطلب ${product.name} مباشرة عبر واتساب`}
              className="w-10 h-10 rounded-xl bg-[#F8FAFC] dark:bg-slate-800 hover:bg-[#128C7E] dark:hover:bg-[#128C7E] text-[#128C7E] dark:text-emerald-400 hover:text-white border border-slate-200 dark:border-slate-700 hover:border-[#128C7E] flex items-center justify-center transition-colors shrink-0"
            >
              <MessageCircle className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </article>
  );
};
