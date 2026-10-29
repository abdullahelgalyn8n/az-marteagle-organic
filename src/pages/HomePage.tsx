import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ShoppingCart,
  Truck,
  ShieldCheck,
  Wallet,
  RotateCcw,
  Search,
  ArrowLeft,
  Star,
  Copy,
  Check,
  BookOpen,
  Clock,
  CheckCircle2,
} from 'lucide-react';
import { PRODUCTS, CATEGORIES, TESTIMONIALS } from '../data/products';
import { ARTICLES } from '../data/articles';
import { ProductCard } from '../components/ProductCard';
import { useStore } from '../context/StoreContext';
import { getNameInitial } from '../utils/storeLogic';

export const HomePage: React.FC = () => {
  const [searchInput, setSearchInput] = useState('');
  const [copiedCoupon, setCopiedCoupon] = useState(false);
  const navigate = useNavigate();
  const { setCouponCode, showToast } = useStore();

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      navigate(`/shop?q=${encodeURIComponent(searchInput.trim())}`);
    } else {
      navigate('/shop');
    }
  };

  const handleApplyPromoCoupon = () => {
    setCouponCode('ORGANIC25');
    setCopiedCoupon(true);
    showToast('تم تفعيل كود الخصم ORGANIC25 (خصم 25% على طلبك الأول)');
    setTimeout(() => setCopiedCoupon(false), 3000);
  };

  const bestSellers = PRODUCTS.filter((p) => p.isBestSeller).slice(0, 4);
  const trendingProducts = PRODUCTS.filter((p) => p.isTrending).slice(0, 4);

  const featuredCategories = CATEGORIES.filter((c) =>
    ['fruits', 'vegetables', 'legumes-grains'].includes(c.slug)
  );

  const previewArticles = ARTICLES.slice(0, 3);

  return (
    <div className="bg-white dark:bg-[#0B0F19] transition-colors duration-200">
      {/* TOP SEARCH & QUICK CATEGORY BAR */}
      <div className="bg-white dark:bg-[#0B0F19] border-b border-slate-200/80 dark:border-slate-800 py-3.5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-3.5">
          <form
            onSubmit={handleSearchSubmit}
            role="search"
            aria-label="بحث في Marteagle"
            className="w-full md:max-w-xl flex items-center rounded-xl border border-slate-300 dark:border-slate-700 bg-[#F8FAFC] dark:bg-[#161F30] overflow-hidden focus-within:bg-white dark:focus-within:bg-[#1E293B] focus-within:border-[#0B24FB] dark:focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-[#0B24FB]/15 transition-all"
          >
            <input
              type="search"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="ابحث في منتجات Marteagle (عسل عضوي، بيض بلدي، خضروات...)"
              aria-label="بحث..."
              className="w-full py-2.5 px-4 text-xs sm:text-sm text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-400 bg-transparent focus:outline-none"
            />
            <button
              type="submit"
              aria-label="بحث"
              className="px-5 py-2.5 bg-[#0B24FB] hover:bg-[#081BC7] text-white flex items-center justify-center gap-1.5 text-xs font-bold transition-colors cursor-pointer shrink-0"
            >
              <Search className="w-4 h-4" />
              <span className="hidden sm:inline">بحث</span>
            </button>
          </form>

          {/* Quick Category Links */}
          <div className="hidden lg:flex items-center gap-2 text-xs text-slate-600 dark:text-slate-300 shrink-0">
            <span className="font-bold text-slate-400 dark:text-slate-500">أقسام سريعة:</span>
            <Link to="/category/fruits" className="px-2.5 py-1 rounded-lg hover:bg-[#EEF7FF] dark:hover:bg-slate-800 hover:text-[#0B24FB] dark:hover:text-blue-400 font-semibold transition-colors">
              فواكه طازجة
            </Link>
            <Link to="/category/vegetables" className="px-2.5 py-1 rounded-lg hover:bg-[#EEF7FF] dark:hover:bg-slate-800 hover:text-[#0B24FB] dark:hover:text-blue-400 font-semibold transition-colors">
              خضروات عضوية
            </Link>
            <Link to="/category/honey-oils" className="px-2.5 py-1 rounded-lg hover:bg-[#EEF7FF] dark:hover:bg-slate-800 hover:text-[#0B24FB] dark:hover:text-blue-400 font-semibold transition-colors">
              عسل وزيوت
            </Link>
            <Link to="/category/dairy-eggs" className="px-2.5 py-1 rounded-lg hover:bg-[#EEF7FF] dark:hover:bg-slate-800 hover:text-[#0B24FB] dark:hover:text-blue-400 font-semibold transition-colors">
              بيض ومشتقاته
            </Link>
          </div>
        </div>
      </div>

      {/* SECTION 1: Ice-Blue / Dark Midnight Hero + Midnight Navy 4-Pillar Trust Strip */}
      <section className="bg-[#EEF7FF] dark:bg-[#111827] transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Hero Image Column */}
            <div className="lg:col-span-6 flex items-center justify-center order-2 lg:order-1">
              <div className="relative w-full max-w-lg flex items-center justify-center">
                <img
                  src="/images/ui/hero-organic.webp"
                  alt="حول منزلك إلى جنة من الراحة — Marteagle"
                  className="w-full max-h-[420px] object-contain drop-shadow-xl"
                />
              </div>
            </div>

            {/* Hero Text & CTA Column */}
            <div className="lg:col-span-6 flex flex-col items-center lg:items-start text-center lg:text-right space-y-5 order-1 lg:order-2">
              <div className="inline-flex items-center gap-2 text-sm sm:text-base font-bold text-slate-700 dark:text-slate-200 bg-white/80 dark:bg-[#161F30] px-3.5 py-1.5 rounded-xl border border-blue-100 dark:border-slate-700">
                <img
                  src="/images/ui/logo-leaf.webp"
                  alt=""
                  className="w-6 h-4 object-contain"
                />
                <span>أفضل المنتجات ذات الجودة العالية</span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-950 dark:text-white leading-[1.2] tracking-tight">
                انضم إلى الحركة العضوية!
              </h1>

              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed max-w-xl">
                في <strong dir="ltr" className="text-slate-900 dark:text-white">Marteagle</strong> نجمع لك بين الراحة المنزلية والمنتجات العضوية والطبيعية المختارة بعناية من المزرعة مباشرة بأعلى جودة وأفضل سعر في مصر.
              </p>

              <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-3.5">
                <Link
                  to="/shop"
                  className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl bg-[#0B24FB] text-white text-sm sm:text-base font-bold hover:bg-[#081BC7] transition-all shadow-md whitespace-nowrap shrink-0"
                >
                  <span>تسوق الان</span>
                  <ShoppingCart className="w-4 h-4" />
                </Link>

                <Link
                  to="/blog"
                  className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-white dark:bg-[#161F30] text-slate-900 dark:text-white border border-slate-300 dark:border-slate-700 text-xs sm:text-sm font-bold hover:border-[#0B24FB] dark:hover:border-blue-400 hover:text-[#0B24FB] dark:hover:text-blue-400 transition-colors whitespace-nowrap shrink-0"
                >
                  <BookOpen className="w-4 h-4 text-[#0B24FB] dark:text-blue-400" />
                  <span>مدونة ومقالات الموقع</span>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Midnight Navy 4-Pillar Trust Strip (#0D1321 with aligned horizontal RTL cards) */}
        <div className="bg-[#0D1321] py-8 sm:py-10 border-y border-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              <div className="bg-[#2E3748] rounded-2xl p-5 flex items-center gap-4 border border-slate-700/70">
                <div className="w-12 h-12 rounded-xl bg-[#0D1321]/60 flex items-center justify-center shrink-0">
                  <Truck className="w-6 h-6 text-[#B96B78]" />
                </div>
                <div className="text-right">
                  <h2 className="text-base font-extrabold text-white">الشحن مجانًا</h2>
                  <p className="text-xs text-slate-300 mt-0.5">فوق 5 دولار فقط (200 ج.م)</p>
                </div>
              </div>

              <div className="bg-[#2E3748] rounded-2xl p-5 flex items-center gap-4 border border-slate-700/70">
                <div className="w-12 h-12 rounded-xl bg-[#0D1321]/60 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-6 h-6 text-[#B96B78]" />
                </div>
                <div className="text-right">
                  <h2 className="text-base font-extrabold text-white">عضوي معتمد</h2>
                  <p className="text-xs text-slate-300 mt-0.5">ضمان نقاء وجودة 100%</p>
                </div>
              </div>

              <div className="bg-[#2E3748] rounded-2xl p-5 flex items-center gap-4 border border-slate-700/70">
                <div className="w-12 h-12 rounded-xl bg-[#0D1321]/60 flex items-center justify-center shrink-0">
                  <Wallet className="w-6 h-6 text-[#B96B78]" />
                </div>
                <div className="text-right">
                  <h2 className="text-base font-extrabold text-white">وفورات ضخمة</h2>
                  <p className="text-xs text-slate-300 mt-0.5">بأقل سعر من المزرعة</p>
                </div>
              </div>

              <div className="bg-[#2E3748] rounded-2xl p-5 flex items-center gap-4 border border-slate-700/70">
                <div className="w-12 h-12 rounded-xl bg-[#0D1321]/60 flex items-center justify-center shrink-0">
                  <RotateCcw className="w-6 h-6 text-[#B96B78]" />
                </div>
                <div className="text-right">
                  <h2 className="text-base font-extrabold text-white">إرجاع سهل</h2>
                  <p className="text-xs text-slate-300 mt-0.5">لا توجد أسئلة مطروحة</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: Best Selling Products + 3 Category Cards + 25% Promo + Trending Products */}
      <section className="py-16 space-y-20">
        {/* Best Selling Products */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-2 text-xs font-bold text-[#0B24FB] dark:text-blue-400">
                <img src="/images/ui/logo-leaf.webp" alt="" className="w-5 h-3.5 object-contain" />
                <span>مختارات المزرعة الأكثر طلبًا</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950 dark:text-white">
                أفضل المنتجات مبيعا
              </h2>
            </div>
            <Link
              to="/shop?sort=popularity"
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#0B24FB] dark:text-blue-400 hover:underline"
            >
              <span>عرض كل الأكثر مبيعًا</span>
              <ArrowLeft className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {bestSellers.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>

        {/* 3 Farm Category Cards */}
        <div className="bg-[#EEF7FF] dark:bg-[#111827] py-16 border-y border-blue-100/80 dark:border-slate-800 transition-colors duration-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
            <div className="text-center space-y-2">
              <span className="text-xs font-bold text-[#0B24FB] dark:text-blue-400">تسوق حسب التصنيف</span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950 dark:text-white">
                أقسام Marteagle الرئيسية
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
              {featuredCategories.map((cat) => (
                <div
                  key={cat.slug}
                  className="bg-white dark:bg-[#161F30] rounded-3xl p-6 sm:p-7 flex flex-col justify-between gap-6 border border-slate-200/90 dark:border-slate-800 shadow-xs hover:shadow-md hover:border-[#0B24FB]/35 dark:hover:border-blue-500/40 transition-all"
                >
                  <div className="space-y-3 text-right">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xl sm:text-2xl font-extrabold text-slate-950 dark:text-white">
                        {cat.name}
                      </h3>
                      <span className="text-xs font-bold text-[#0B24FB] dark:text-blue-400">
                        {cat.itemCount} منتجات
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                      {cat.description}
                    </p>
                    <div className="pt-1">
                      <Link
                        to={`/category/${cat.slug}`}
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#0B24FB] text-white text-xs font-bold hover:bg-[#081BC7] transition-colors whitespace-nowrap"
                      >
                        <span>تسوق القسم الآن</span>
                        <ShoppingCart className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>

                  <Link
                    to={`/category/${cat.slug}`}
                    className="bg-[#F4F6F9] dark:bg-[#1E293B] rounded-2xl h-48 p-5 flex items-center justify-center overflow-hidden border border-slate-100 dark:border-slate-700/70 group"
                  >
                    <img
                      src={cat.image}
                      alt={cat.name}
                      className="max-h-full object-contain group-hover:scale-105 transition-transform duration-300"
                    />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 25% First Purchase Banner (#0D1321 Dark Navy + Sub-bar) */}
        <div>
          <div className="bg-[#0D1321] text-white py-10 px-4 border-t border-slate-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="space-y-1 text-center md:text-right">
                <span className="text-xs font-bold text-blue-300">عرض ترحيبي حصري لعملاء Marteagle</span>
                <h2 className="text-xl sm:text-3xl font-extrabold text-white">
                  احصل على خصم 25% على عملية الشراء الأولى الخاصة بك!
                </h2>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
                <button
                  type="button"
                  onClick={handleApplyPromoCoupon}
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#0B24FB] text-white text-xs sm:text-sm font-bold hover:bg-[#081BC7] transition-colors cursor-pointer whitespace-nowrap shadow-sm"
                >
                  {copiedCoupon ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>تم تفعيل الكود ORGANIC25</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      <span>تفعيل كود خصم 25% (ORGANIC25)</span>
                    </>
                  )}
                </button>
                <Link
                  to="/shop"
                  className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-white text-slate-950 text-xs sm:text-sm font-bold hover:bg-slate-100 transition-colors whitespace-nowrap"
                >
                  <span>تسوق الان</span>
                  <ShoppingCart className="w-4 h-4 text-[#0B24FB]" />
                </Link>
              </div>
            </div>
          </div>
          <div className="bg-[#F3F4F6] dark:bg-[#161F30] py-3.5 px-4 text-center border-b border-slate-200 dark:border-slate-800">
            <p className="text-sm sm:text-base font-extrabold text-slate-900 dark:text-slate-100">
              جربه مجانًا. لا حاجة للتسجيل — اطلب مباشرة عبر الموقع أو واتساب.
            </p>
          </div>
        </div>

        {/* Trending Products (المنتجات الرائجة) */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-2 text-xs font-bold text-[#0B24FB] dark:text-blue-400">
                <img src="/images/ui/logo-leaf.webp" alt="" className="w-5 h-3.5 object-contain" />
                <span>تشكيلة الأسبوع المختارة</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950 dark:text-white">
                المنتجات الرائجة
              </h2>
            </div>
            <Link
              to="/shop"
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#0B24FB] dark:text-blue-400 hover:underline"
            >
              <span>تصفح المتجر الكامل ({PRODUCTS.length} منتجًا)</span>
              <ArrowLeft className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {trendingProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 3: Verified Customer Testimonials (First-Letter Initial Monograms, NO Customer Photos) + Organic Articles */}
      <section className="space-y-16 pb-16">
        {/* Testimonials + Center Peppers Deal Card */}
        <div className="bg-[#EEF7FF] dark:bg-[#111827] py-16 border-y border-blue-100/80 dark:border-slate-800 transition-colors duration-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
            <div className="text-center space-y-2">
              <span className="text-xs font-bold text-[#0B24FB] dark:text-blue-400">ثقة عملائنا في كل طلب</span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950 dark:text-white">
                تجارب وآراء عملاء Marteagle
              </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
              {/* Review 1 — First Letter Monogram Avatar (NO photo) */}
              <div className="bg-white dark:bg-[#161F30] rounded-3xl border border-slate-200/90 dark:border-slate-800 p-7 flex flex-col justify-between gap-6 shadow-xs">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-amber-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[#0B24FB] dark:text-blue-400">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      عميل موثق
                    </span>
                  </div>

                  <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed text-right">
                    "{TESTIMONIALS[0].comment}"
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center gap-3.5">
                  <div
                    aria-hidden="true"
                    className="w-12 h-12 rounded-2xl bg-[#0B24FB] text-white font-extrabold text-lg flex items-center justify-center shrink-0 shadow-xs"
                  >
                    {getNameInitial(TESTIMONIALS[0].name)}
                  </div>
                  <div className="text-right min-w-0">
                    <h3 className="text-sm font-extrabold text-slate-950 dark:text-white truncate">
                      {TESTIMONIALS[0].name}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                      {TESTIMONIALS[0].role} · {TESTIMONIALS[0].location}
                    </p>
                  </div>
                </div>
              </div>

              {/* Center Bell Peppers Card with Royal Blue CTA */}
              <div className="relative rounded-3xl overflow-hidden min-h-[340px] flex flex-col items-center justify-center p-8 text-center text-white border border-slate-200/80 dark:border-slate-700 shadow-md">
                <img
                  src="/images/ui/peppers-banner.webp"
                  alt="محاصيل Marteagle الطازجة"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-slate-950/65" />
                <div className="relative z-10 space-y-4 max-w-xs">
                  <span className="text-xs font-bold text-blue-300 block">طازج من المزرعة يوميًا</span>
                  <h3 className="text-2xl font-extrabold text-white leading-snug">
                    صفقة المزرعة اليومية: خصم 15% على الخضروات الطازجة
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                    اطلب سلتك المتكاملة الآن وتواصل معنا عبر واتساب للتوصيل الفوري في نفس اليوم.
                  </p>
                  <Link
                    to="/shop"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#0B24FB] text-white text-xs sm:text-sm font-bold hover:bg-[#081BC7] transition-colors whitespace-nowrap shadow-sm"
                  >
                    <span>تسوق الان</span>
                    <ShoppingCart className="w-4 h-4" />
                  </Link>
                </div>
              </div>

              {/* Review 2 — First Letter Monogram Avatar (NO photo) */}
              <div className="bg-white dark:bg-[#161F30] rounded-3xl border border-slate-200/90 dark:border-slate-800 p-7 flex flex-col justify-between gap-6 shadow-xs">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-amber-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[#0B24FB] dark:text-blue-400">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      عميل موثق
                    </span>
                  </div>

                  <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed text-right">
                    "{TESTIMONIALS[1].comment}"
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center gap-3.5">
                  <div
                    aria-hidden="true"
                    className="w-12 h-12 rounded-2xl bg-[#0D1321] dark:bg-blue-600 text-white font-extrabold text-lg flex items-center justify-center shrink-0 shadow-xs"
                  >
                    {getNameInitial(TESTIMONIALS[1].name)}
                  </div>
                  <div className="text-right min-w-0">
                    <h3 className="text-sm font-extrabold text-slate-950 dark:text-white truncate">
                      {TESTIMONIALS[1].name}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                      {TESTIMONIALS[1].role} · {TESTIMONIALS[1].location}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Articles Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b border-slate-200 dark:border-slate-800 pb-4">
            <div>
              <span className="text-xs font-bold text-[#0B24FB] dark:text-blue-400 flex items-center gap-1.5">
                <BookOpen className="w-4 h-4" />
                مدونة Marteagle للتغذية الصحية
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950 dark:text-white mt-1">
                أحدث المقالات والنصائح الغذائية
              </h2>
            </div>
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#0B24FB] dark:text-blue-400 hover:underline"
            >
              <span>تصفح جميع المقالات ({ARTICLES.length})</span>
              <ArrowLeft className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {previewArticles.map((article) => (
              <article
                key={article.id}
                className="group bg-white dark:bg-[#161F30] rounded-2xl border border-slate-200/90 dark:border-slate-800 overflow-hidden flex flex-col justify-between hover:shadow-lg hover:border-[#0B24FB]/35 dark:hover:border-blue-500/40 transition-all"
              >
                <div>
                  <Link
                    to={`/blog/${article.slug}`}
                    className="block h-44 bg-[#F4F6F9] dark:bg-[#1E293B] p-5 flex items-center justify-center overflow-hidden border-b border-slate-100 dark:border-slate-800"
                  >
                    <img
                      src={article.heroImage}
                      alt={article.title}
                      className="max-h-full object-contain group-hover:scale-105 transition-transform duration-300"
                    />
                  </Link>
                  <div className="p-5 space-y-2.5">
                    <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                      <span className="font-bold text-[#0B24FB] dark:text-blue-400">{article.category}</span>
                      <span aria-hidden="true">·</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {article.readTime}
                      </span>
                    </div>
                    <h3 className="text-base font-extrabold text-slate-900 dark:text-white leading-snug group-hover:text-[#0B24FB] dark:group-hover:text-blue-400 transition-colors">
                      <Link to={`/blog/${article.slug}`}>{article.title}</Link>
                    </h3>
                    <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed">
                      {article.excerpt}
                    </p>
                  </div>
                </div>

                <div className="px-5 py-3.5 bg-slate-50 dark:bg-[#111827] border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span
                      aria-hidden="true"
                      className="w-6 h-6 rounded-lg bg-[#EEF7FF] dark:bg-slate-800 text-[#0B24FB] dark:text-blue-400 font-extrabold text-[11px] flex items-center justify-center border border-blue-200/80 dark:border-slate-700"
                    >
                      {getNameInitial(article.author.name)}
                    </span>
                    <span className="text-slate-700 dark:text-slate-300 font-semibold">{article.author.name}</span>
                  </div>
                  <Link
                    to={`/blog/${article.slug}`}
                    className="font-bold text-[#0B24FB] dark:text-blue-400 hover:underline inline-flex items-center gap-1"
                  >
                    <span>اقرأ المقال</span>
                    <ArrowLeft className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
