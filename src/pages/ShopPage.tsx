import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams, Link } from 'react-router-dom';
import { Search, SlidersHorizontal, RotateCcw } from 'lucide-react';
import { PRODUCTS, CATEGORIES, CategorySlug } from '../data/products';
import { filterAndSortProducts, SortOption } from '../utils/storeLogic';
import { ProductCard } from '../components/ProductCard';

export const ShopPage: React.FC = () => {
  const { slug } = useParams<{ slug?: string }>();
  const [searchParams, setSearchParams] = useSearchParams();

  const initialQuery = searchParams.get('q') || '';
  const initialSort = (searchParams.get('sort') as SortOption) || 'default';

  const activeCategory: CategorySlug =
    slug && CATEGORIES.some((c) => c.slug === slug)
      ? (slug as CategorySlug)
      : 'all';

  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [sortBy, setSortBy] = useState<SortOption>(initialSort);
  const [maxPrice, setMaxPrice] = useState<number>(150);

  useEffect(() => {
    setSearchQuery(searchParams.get('q') || '');
  }, [searchParams]);

  const currentCategoryInfo =
    CATEGORIES.find((c) => c.slug === activeCategory) || CATEGORIES[0];

  const filteredProducts = filterAndSortProducts(PRODUCTS, {
    category: activeCategory,
    searchQuery,
    maxPrice,
    sortBy,
  });

  const handleResetFilters = () => {
    setSearchQuery('');
    setSortBy('default');
    setMaxPrice(150);
    setSearchParams({});
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Page Header & Breadcrumb */}
      <div className="bg-[#EEF7FF] dark:bg-[#111827] rounded-3xl border border-blue-100 dark:border-slate-800 p-6 sm:p-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-2xl">
          <nav aria-label="مسار الصفحة" className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-2">
            <Link to="/" className="hover:text-[#0B24FB] dark:hover:text-blue-400 transition-colors">
              الرئيسية
            </Link>
            <span aria-hidden="true">/</span>
            <Link to="/shop" className="hover:text-[#0B24FB] dark:hover:text-blue-400 transition-colors">
              المتجر
            </Link>
            {activeCategory !== 'all' && (
              <>
                <span aria-hidden="true">/</span>
                <span className="text-slate-900 dark:text-white font-semibold">{currentCategoryInfo.name}</span>
              </>
            )}
          </nav>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-950 dark:text-white">
            {activeCategory === 'all' ? 'متجر Marteagle العضوي الكامل' : currentCategoryInfo.name}
          </h1>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            {currentCategoryInfo.description}
          </p>
        </div>

        <div className="shrink-0 bg-white dark:bg-[#161F30] rounded-2xl p-4 border border-blue-200/80 dark:border-slate-700 text-center min-w-[160px] shadow-2xs">
          <span className="block text-xs text-slate-600 dark:text-slate-400">المنتجات المعروضة</span>
          <span className="text-2xl font-extrabold text-[#0B24FB] dark:text-blue-400 tabular-nums">
            {filteredProducts.length}
          </span>
          <span className="block text-xs text-slate-500 dark:text-slate-400">من إجمالي {PRODUCTS.length} منتجًا</span>
        </div>
      </div>

      {/* Category Route Navigation Tabs */}
      <div className="space-y-2.5">
        <div className="flex items-center justify-between">
          <h2 className="text-xs font-bold text-slate-600 dark:text-slate-400">تصفح حسب القسم (رابط مخصص لكل قسم):</h2>
        </div>
        <div className="flex items-center gap-2 overflow-x-auto pb-2">
          {CATEGORIES.map((cat) => {
            const isSelected = cat.slug === activeCategory;
            const targetUrl = cat.slug === 'all' ? '/shop' : `/category/${cat.slug}`;
            return (
              <Link
                key={cat.slug}
                to={targetUrl}
                className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap shrink-0 border ${
                  isSelected
                    ? 'bg-[#0B24FB] text-white border-[#0B24FB] shadow-xs'
                    : 'bg-white dark:bg-[#161F30] text-slate-700 dark:text-slate-300 border-slate-200/90 dark:border-slate-700 hover:border-[#0B24FB]/40 dark:hover:border-blue-400 hover:text-[#0B24FB] dark:hover:text-blue-400'
                }`}
              >
                {cat.name}
              </Link>
            );
          })}
        </div>
      </div>

      {/* Filter & Sort Toolbar */}
      <div className="bg-white dark:bg-[#161F30] rounded-2xl border border-slate-200/90 dark:border-slate-800 p-4 sm:p-5 grid grid-cols-1 md:grid-cols-12 gap-4 items-center shadow-2xs">
        {/* Search Input */}
        <div className="md:col-span-5 relative">
          <Search className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="ابحث باسم المنتج أو الوصف..."
            aria-label="ابحث في المتجر"
            className="w-full pr-10 pl-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-[#F8FAFC] dark:bg-[#1E293B] text-sm text-slate-900 dark:text-white placeholder:text-slate-500 dark:placeholder:text-slate-400 focus:outline-none focus:border-[#0B24FB] dark:focus:border-blue-400 focus:bg-white dark:focus:bg-[#111827]"
          />
        </div>

        {/* Max Price Filter */}
        <div className="md:col-span-4 flex items-center gap-3 px-2">
          <SlidersHorizontal className="w-4 h-4 text-slate-500 dark:text-slate-400 shrink-0" />
          <label htmlFor="price-range" className="text-xs font-semibold text-slate-700 dark:text-slate-300 whitespace-nowrap">
            السعر الأقصى: <span dir="ltr" className="font-bold text-[#0B24FB] dark:text-blue-400 tabular-nums">{maxPrice} EGP</span>
          </label>
          <input
            id="price-range"
            type="range"
            min={35}
            max={150}
            step={5}
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
            className="w-full accent-[#0B24FB] cursor-pointer"
          />
        </div>

        {/* Sort Select */}
        <div className="md:col-span-3 flex items-center gap-2">
          <label htmlFor="shop-sort" className="sr-only">
            نظام ترتيب المتجر
          </label>
          <select
            id="shop-sort"
            aria-label="نظام المتجر"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortOption)}
            className="w-full py-2.5 px-3.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-[#F8FAFC] dark:bg-[#1E293B] text-xs sm:text-sm font-semibold text-slate-900 dark:text-white focus:outline-none focus:border-[#0B24FB] dark:focus:border-blue-400 cursor-pointer"
          >
            <option value="default">الترتيب الافتراضي</option>
            <option value="popularity">ترتيب حسب الشهرة</option>
            <option value="rating">ترتيب حسب معدل التقييم</option>
            <option value="latest">ترتيب حسب الأحدث</option>
            <option value="price-asc">ترتيب حسب: الأدنى سعراً للأعلى</option>
            <option value="price-desc">ترتيب حسب: الأعلى سعراً للأدنى</option>
          </select>
        </div>
      </div>

      {/* Product Grid or Empty State */}
      {filteredProducts.length === 0 ? (
        <div className="bg-white dark:bg-[#161F30] rounded-3xl border border-slate-200 dark:border-slate-800 p-12 text-center space-y-4">
          <p className="text-lg font-extrabold text-slate-900 dark:text-white">
            لم يتم العثور على منتجات مطابقة لبحثك
          </p>
          <p className="text-sm text-slate-600 dark:text-slate-300 max-w-md mx-auto">
            جرب البحث بكلمات أخرى أو إعادة ضبط فلاتر السعر والقسم لعرض جميع منتجات Marteagle العضوية.
          </p>
          <button
            type="button"
            onClick={handleResetFilters}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#0B24FB] text-white text-xs font-bold hover:bg-[#081BC7] transition-colors cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            <span>إعادة ضبط الفلاتر</span>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};
