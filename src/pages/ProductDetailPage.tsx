import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  ShoppingCart,
  Heart,
  Star,
  Plus,
  Minus,
  Truck,
  RotateCcw,
  ArrowRight,
  Check,
  MessageCircle,
} from 'lucide-react';
import { PRODUCTS } from '../data/products';
import {
  formatCurrencyEGP,
  buildSingleProductWhatsAppUrl,
} from '../utils/storeLogic';
import { useStore } from '../context/StoreContext';
import { ProductArtwork } from '../components/ProductArtwork';
import { ProductCard } from '../components/ProductCard';

export const ProductDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { addToCart, wishlistIds, toggleWishlist } = useStore();
  const [quantity, setQuantity] = useState<number>(1);

  const product = PRODUCTS.find((p) => p.slug === slug);

  if (!product) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center space-y-4">
        <h1 className="text-2xl font-extrabold text-slate-950 dark:text-white">المنتج غير موجود</h1>
        <p className="text-sm text-slate-600 dark:text-slate-400">
          عذرًا، لم نتمكن من العثور على المنتج المطلوب. يمكنك تصفح كافة المنتجات العضوية في المتجر.
        </p>
        <Link
          to="/shop"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#0B24FB] text-white text-xs font-bold"
        >
          <ArrowRight className="w-4 h-4" />
          <span>العودة إلى المتجر</span>
        </Link>
      </div>
    );
  }

  const isWishlisted = wishlistIds.includes(product.id);
  const relatedProducts = PRODUCTS.filter(
    (p) => p.category === product.category && p.id !== product.id
  ).slice(0, 4);

  const handleBuyNow = () => {
    addToCart(product, quantity);
    navigate('/checkout');
  };

  const whatsappDirectUrl = buildSingleProductWhatsAppUrl(product, quantity);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 space-y-16">
      {/* Breadcrumb Navigation */}
      <nav aria-label="مسار المنتج" className="text-xs text-slate-500 dark:text-slate-400 flex flex-wrap items-center gap-2">
        <Link to="/" className="hover:text-[#0B24FB] dark:hover:text-blue-400 transition-colors">
          الرئيسية
        </Link>
        <span aria-hidden="true">/</span>
        <Link to="/shop" className="hover:text-[#0B24FB] dark:hover:text-blue-400 transition-colors">
          المتجر
        </Link>
        <span aria-hidden="true">/</span>
        <Link
          to={`/category/${product.category}`}
          className="hover:text-[#0B24FB] dark:hover:text-blue-400 transition-colors"
        >
          {product.categoryLabel}
        </Link>
        <span aria-hidden="true">/</span>
        <span className="text-slate-900 dark:text-white font-bold">{product.name}</span>
      </nav>

      {/* Contiguous Purchase Module */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Product Artwork Gallery */}
        <div className="lg:col-span-6 bg-white dark:bg-[#161F30] rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-10">
          <div className="aspect-square rounded-2xl overflow-hidden bg-[#F4F6F9] dark:bg-[#1E293B]">
            <ProductArtwork product={product} className="w-full h-full" />
          </div>

          <div className="mt-6 pt-5 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-600 dark:text-slate-400">
            <span>المصدر: <strong className="text-slate-900 dark:text-white">{product.origin}</strong></span>
            <span aria-hidden="true">·</span>
            <span>الاعتماد: <strong className="text-[#0B24FB] dark:text-blue-400">{product.certification}</strong></span>
            <span aria-hidden="true">·</span>
            <span>الحالة: <strong className="text-[#0B24FB] dark:text-blue-400">متوفر وطازج اليوم</strong></span>
          </div>
        </div>

        {/* Contiguous Purchase Column */}
        <div className="lg:col-span-6 bg-white dark:bg-[#161F30] rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-10 space-y-6">
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-600 dark:text-slate-400">
              <Link
                to={`/category/${product.category}`}
                className="font-bold text-[#0B24FB] dark:text-blue-400 hover:underline"
              >
                {product.categoryLabel}
              </Link>
              <span className="flex items-center gap-1.5 text-amber-600 dark:text-amber-400 font-bold tabular-nums">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                {product.rating.toFixed(1)} ({product.reviewsCount} تقييم موثق)
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-950 dark:text-white leading-tight">
              {product.name}
            </h1>
            <p className="text-xs font-mono text-slate-500 dark:text-slate-400">{product.englishName}</p>
          </div>

          {/* Pricing Block */}
          <div className="py-4 border-y border-slate-200 dark:border-slate-800 flex items-baseline gap-4">
            <span
              dir="ltr"
              className="text-3xl font-extrabold text-slate-950 dark:text-white tabular-nums"
            >
              {formatCurrencyEGP(product.price)}
            </span>
            {product.originalPrice && (
              <span
                dir="ltr"
                className="text-base text-slate-400 dark:text-slate-500 line-through tabular-nums"
              >
                {formatCurrencyEGP(product.originalPrice)}
              </span>
            )}
            <span className="text-xs text-slate-600 dark:text-slate-400 mr-auto">
              العبوة القياسية: <strong className="text-slate-900 dark:text-white">{product.unit}</strong>
            </span>
          </div>

          {/* Full Editorial Description */}
          <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed">
            {product.description}
          </p>

          {/* Nutritional & Organic Facts Table */}
          <div className="bg-[#EEF7FF] dark:bg-[#111827] rounded-2xl p-4 border border-blue-100 dark:border-slate-700">
            <h2 className="text-xs font-bold text-slate-900 dark:text-white mb-3">
              القيمة الغذائية ومعايير النقاء:
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div className="bg-white dark:bg-[#161F30] p-3 rounded-xl border border-blue-100 dark:border-slate-700">
                <span className="block text-slate-500 dark:text-slate-400">الطاقة</span>
                <strong className="text-slate-900 dark:text-white tabular-nums mt-0.5 block">
                  {product.nutritionFacts.calories}
                </strong>
              </div>
              <div className="bg-white dark:bg-[#161F30] p-3 rounded-xl border border-blue-100 dark:border-slate-700">
                <span className="block text-slate-500 dark:text-slate-400">البروتين</span>
                <strong className="text-slate-900 dark:text-white tabular-nums mt-0.5 block">
                  {product.nutritionFacts.protein}
                </strong>
              </div>
              <div className="bg-white dark:bg-[#161F30] p-3 rounded-xl border border-blue-100 dark:border-slate-700">
                <span className="block text-slate-500 dark:text-slate-400">الألياف</span>
                <strong className="text-slate-900 dark:text-white tabular-nums mt-0.5 block">
                  {product.nutritionFacts.fiber}
                </strong>
              </div>
              <div className="bg-white dark:bg-[#161F30] p-3 rounded-xl border border-blue-100 dark:border-slate-700">
                <span className="block text-slate-500 dark:text-slate-400">النقاء العضوي</span>
                <strong className="text-[#0B24FB] dark:text-blue-400 mt-0.5 block">
                  {product.nutritionFacts.organicPurity}
                </strong>
              </div>
            </div>
          </div>

          {/* Quantity Stepper & Primary Add to Cart + Direct WhatsApp Order Actions */}
          <div className="pt-2 space-y-3">
            <div className="flex flex-wrap items-center gap-3">
              {/* Quantity selector */}
              <div className="inline-flex items-center rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 p-1">
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  aria-label="تقليل الكمية"
                  className="w-10 h-10 rounded-lg flex items-center justify-center text-slate-700 dark:text-slate-200 hover:bg-white dark:hover:bg-slate-700 hover:text-slate-950 dark:hover:text-white transition-colors cursor-pointer"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-12 text-center text-base font-extrabold text-slate-900 dark:text-white tabular-nums">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity((q) => q + 1)}
                  aria-label="زيادة الكمية"
                  className="w-10 h-10 rounded-lg flex items-center justify-center text-slate-700 dark:text-slate-200 hover:bg-white dark:hover:bg-slate-700 hover:text-slate-950 dark:hover:text-white transition-colors cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              {/* Add to Cart Button in Marteagle Royal Blue */}
              <button
                type="button"
                onClick={() => addToCart(product, quantity)}
                className="flex-1 inline-flex items-center justify-center gap-2.5 py-3.5 px-5 rounded-xl bg-[#0B24FB] text-white text-xs sm:text-sm font-bold hover:bg-[#081BC7] transition-colors cursor-pointer whitespace-nowrap shadow-xs"
              >
                <ShoppingCart className="w-4 h-4 shrink-0" />
                <span>إضافة إلى السلة ({formatCurrencyEGP(product.price * quantity)})</span>
              </button>

              {/* Wishlist Toggle */}
              <button
                type="button"
                onClick={() => toggleWishlist(product.id)}
                aria-label={isWishlisted ? 'إزالة من المفضلة' : 'إضافة إلى المفضلة'}
                className={`p-3.5 rounded-xl border transition-colors cursor-pointer ${
                  isWishlisted
                    ? 'bg-[#B96B78] border-[#B96B78] text-white'
                    : 'bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700'
                }`}
              >
                <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-white' : ''}`} />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <a
                href={whatsappDirectUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="py-3.5 px-5 rounded-xl bg-[#128C7E] hover:bg-[#075E54] text-white text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-colors whitespace-nowrap shadow-xs"
              >
                <MessageCircle className="w-4 h-4 shrink-0" />
                <span>اطلب الآن عبر واتساب</span>
              </a>

              <button
                type="button"
                onClick={handleBuyNow}
                className="py-3.5 px-5 rounded-xl bg-[#0D1321] dark:bg-slate-800 text-white text-xs sm:text-sm font-bold hover:bg-slate-800 dark:hover:bg-slate-700 transition-colors cursor-pointer whitespace-nowrap"
              >
                شراء فوري والدفع عند الاستلام
              </button>
            </div>
          </div>

          {/* Trust & Delivery Guarantees */}
          <div className="pt-4 border-t border-slate-200 dark:border-slate-800 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-slate-700 dark:text-slate-300">
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-[#0B24FB] dark:text-blue-400 shrink-0" />
              <span>مفحوص ومعتمد عضويًا 100%</span>
            </div>
            <div className="flex items-center gap-2">
              <Truck className="w-4 h-4 text-[#0B24FB] dark:text-blue-400 shrink-0" />
              <span>توصيل مبرد خلال 24 ساعة</span>
            </div>
            <div className="flex items-center gap-2">
              <RotateCcw className="w-4 h-4 text-[#0B24FB] dark:text-blue-400 shrink-0" />
              <span>ضمان استرجاع مجاني</span>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="space-y-6 pt-8 border-t border-slate-200 dark:border-slate-800">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-extrabold text-slate-950 dark:text-white">
              منتجات مشابهة في قسم {product.categoryLabel}
            </h2>
            <Link
              to={`/category/${product.category}`}
              className="text-xs font-bold text-[#0B24FB] dark:text-blue-400 hover:underline"
            >
              عرض كل القسم
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((rel) => (
              <ProductCard key={rel.id} product={rel} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
