import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { BookOpen, Clock, ArrowLeft, ArrowRight, CheckCircle2, Share2 } from 'lucide-react';
import { ARTICLES } from '../data/articles';
import { PRODUCTS } from '../data/products';
import { ProductCard } from '../components/ProductCard';
import { useStore } from '../context/StoreContext';
import { getNameInitial } from '../utils/storeLogic';

export const BlogPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('الكل');

  const categories = ['الكل', ...Array.from(new Set(ARTICLES.map((a) => a.category)))];
  const filteredArticles =
    selectedCategory === 'الكل'
      ? ARTICLES
      : ARTICLES.filter((a) => a.category === selectedCategory);

  const featuredArticle = ARTICLES[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-14">
      {/* Page Header */}
      <div className="bg-[#EEF7FF] dark:bg-[#111827] rounded-3xl border border-blue-100 dark:border-slate-800 p-6 sm:p-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-2 text-xs font-bold text-[#0B24FB] dark:text-blue-400">
            <BookOpen className="w-4 h-4" />
            <span>مدونة Marteagle للتغذية العضوية</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-950 dark:text-white">
            مقالات ودليل الحياة الصحية والمنتجات العضوية
          </h1>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            اكتشف نصائح أخصائيي التغذية حول فوائد المحاصيل العضوية، طرق التفرقة بين المنتجات الطبيعية والمصنعة، ووصفات صحية لعائلتك.
          </p>
        </div>

        {/* Category Filter Buttons */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 shrink-0">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-colors whitespace-nowrap shrink-0 cursor-pointer border ${
                selectedCategory === cat
                  ? 'bg-[#0B24FB] text-white border-[#0B24FB]'
                  : 'bg-white dark:bg-[#161F30] text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-[#0B24FB]/40'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Featured Article Hero Card */}
      <article className="bg-white dark:bg-[#161F30] rounded-3xl border border-slate-200 dark:border-slate-800 overflow-hidden grid grid-cols-1 lg:grid-cols-12 items-stretch shadow-xs">
        <div className="lg:col-span-5 bg-[#F4F6F9] dark:bg-[#1E293B] p-8 flex items-center justify-center">
          <img
            src={featuredArticle.heroImage}
            alt={featuredArticle.title}
            className="max-h-72 object-contain drop-shadow-md"
          />
        </div>
        <div className="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-between gap-6">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
              <span className="font-bold text-[#0B24FB] dark:text-blue-400">{featuredArticle.category}</span>
              <span aria-hidden="true">·</span>
              <span>{featuredArticle.publishedAt}</span>
              <span aria-hidden="true">·</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {featuredArticle.readTime}
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950 dark:text-white leading-snug">
              <Link
                to={`/blog/${featuredArticle.slug}`}
                className="hover:text-[#0B24FB] dark:hover:text-blue-400 transition-colors"
              >
                {featuredArticle.title}
              </Link>
            </h2>

            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
              {featuredArticle.excerpt}
            </p>
          </div>

          <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-4">
            {/* First-Letter Monogram Avatar */}
            <div className="flex items-center gap-3">
              <div
                aria-hidden="true"
                className="w-10 h-10 rounded-xl bg-[#0B24FB] text-white font-extrabold text-sm flex items-center justify-center shrink-0"
              >
                {getNameInitial(featuredArticle.author.name)}
              </div>
              <div>
                <span className="block text-xs font-bold text-slate-900 dark:text-white">
                  {featuredArticle.author.name}
                </span>
                <span className="block text-[11px] text-slate-500 dark:text-slate-400">
                  {featuredArticle.author.role}
                </span>
              </div>
            </div>

            <Link
              to={`/blog/${featuredArticle.slug}`}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#0B24FB] text-white text-xs font-bold hover:bg-[#081BC7] transition-colors whitespace-nowrap"
            >
              <span>اقرأ المقال كاملًا</span>
              <ArrowLeft className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </article>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filteredArticles.map((article) => (
          <article
            key={article.id}
            className="group bg-white dark:bg-[#161F30] rounded-3xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col justify-between hover:shadow-lg hover:border-[#0B24FB]/30 dark:hover:border-blue-500/40 transition-all"
          >
            <div>
              <Link
                to={`/blog/${article.slug}`}
                className="block h-56 bg-[#F4F6F9] dark:bg-[#1E293B] p-6 flex items-center justify-center overflow-hidden border-b border-slate-100 dark:border-slate-800"
              >
                <img
                  src={article.heroImage}
                  alt={article.title}
                  className="max-h-full object-contain group-hover:scale-105 transition-transform duration-300"
                />
              </Link>

              <div className="p-6 sm:p-7 space-y-3">
                <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                  <span className="font-bold text-[#0B24FB] dark:text-blue-400">{article.category}</span>
                  <span aria-hidden="true">·</span>
                  <span>{article.publishedAt}</span>
                  <span aria-hidden="true">·</span>
                  <span>{article.readTime}</span>
                </div>

                <h3 className="text-xl font-extrabold text-slate-950 dark:text-white leading-snug group-hover:text-[#0B24FB] dark:group-hover:text-blue-400 transition-colors">
                  <Link to={`/blog/${article.slug}`}>{article.title}</Link>
                </h3>

                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-3">
                  {article.excerpt}
                </p>
              </div>
            </div>

            <div className="px-6 sm:px-7 py-4 bg-slate-50 dark:bg-[#111827] border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span
                  aria-hidden="true"
                  className="w-7 h-7 rounded-lg bg-[#EEF7FF] dark:bg-slate-800 text-[#0B24FB] dark:text-blue-400 font-extrabold text-xs flex items-center justify-center border border-blue-200 dark:border-slate-700"
                >
                  {getNameInitial(article.author.name)}
                </span>
                <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  {article.author.name}
                </span>
              </div>
              <Link
                to={`/blog/${article.slug}`}
                className="inline-flex items-center gap-1.5 text-xs font-extrabold text-[#0B24FB] dark:text-blue-400 hover:underline"
              >
                <span>قراءة التفاصيل</span>
                <ArrowLeft className="w-3.5 h-3.5" />
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export const ArticleDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { showToast } = useStore();
  const article = ARTICLES.find((a) => a.slug === slug);

  if (!article) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center space-y-4">
        <h1 className="text-2xl font-extrabold text-slate-950 dark:text-white">المقال غير موجود</h1>
        <p className="text-sm text-slate-600 dark:text-slate-400">
          يمكنك تصفح كافة المقالات الغذائية والصحية في مدونة Marteagle.
        </p>
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#0B24FB] text-white text-xs font-bold"
        >
          <ArrowRight className="w-4 h-4" />
          <span>العودة إلى المدونة</span>
        </Link>
      </div>
    );
  }

  const relatedProducts = PRODUCTS.filter((p) =>
    article.relatedProductSlugs.includes(p.slug)
  );

  const handleShare = () => {
    try {
      navigator.clipboard?.writeText(window.location.href);
    } catch {
      // ignore
    }
    showToast('تم نسخ رابط المقال لمشاركته!');
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-14">
      {/* Breadcrumb */}
      <nav aria-label="مسار المقال" className="text-xs text-slate-500 dark:text-slate-400 flex flex-wrap items-center gap-2">
        <Link to="/" className="hover:text-[#0B24FB] dark:hover:text-blue-400">
          الرئيسية
        </Link>
        <span aria-hidden="true">/</span>
        <Link to="/blog" className="hover:text-[#0B24FB] dark:hover:text-blue-400">
          المقالات والمدونة
        </Link>
        <span aria-hidden="true">/</span>
        <span className="text-slate-900 dark:text-white font-bold">{article.title}</span>
      </nav>

      {/* Main Article Container */}
      <article className="bg-white dark:bg-[#161F30] rounded-3xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-xs">
        <div className="p-6 sm:p-10 lg:p-12 space-y-6 border-b border-slate-100 dark:border-slate-800">
          <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
            <span className="font-bold text-[#0B24FB] dark:text-blue-400">{article.category}</span>
            <span aria-hidden="true">·</span>
            <span>{article.publishedAt}</span>
            <span aria-hidden="true">·</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {article.readTime}
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-950 dark:text-white leading-tight">
            {article.title}
          </h1>

          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
            {article.excerpt}
          </p>

          <div className="pt-2 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div
                aria-hidden="true"
                className="w-11 h-11 rounded-2xl bg-[#0B24FB] text-white font-extrabold text-base flex items-center justify-center shrink-0"
              >
                {getNameInitial(article.author.name)}
              </div>
              <div>
                <span className="block text-sm font-bold text-slate-900 dark:text-white">
                  {article.author.name}
                </span>
                <span className="block text-xs text-slate-500 dark:text-slate-400">
                  {article.author.role}
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={handleShare}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <Share2 className="w-4 h-4" />
              <span>مشاركة المقال</span>
            </button>
          </div>
        </div>

        {/* Hero Artwork Banner */}
        <div className="bg-[#EEF7FF] dark:bg-[#1E293B] py-10 px-6 flex items-center justify-center border-b border-blue-100 dark:border-slate-800">
          <img
            src={article.heroImage}
            alt={article.title}
            className="max-h-72 object-contain drop-shadow-md"
          />
        </div>

        {/* Article Sections */}
        <div className="p-6 sm:p-10 lg:p-12 space-y-8">
          {article.sections.map((sec, idx) => (
            <section key={idx} className="space-y-4">
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">
                {sec.heading}
              </h2>
              <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed">
                {sec.body}
              </p>
              {sec.tips && sec.tips.length > 0 && (
                <div className="bg-[#EEF7FF] dark:bg-[#111827] rounded-2xl p-5 border border-blue-100 dark:border-slate-700 space-y-2.5">
                  <span className="text-xs font-extrabold text-[#0B24FB] dark:text-blue-400 block">
                    نصائح عملية من خبراء Marteagle:
                  </span>
                  <ul className="space-y-2">
                    {sec.tips.map((tip, tIdx) => (
                      <li key={tIdx} className="flex items-start gap-2.5 text-sm text-slate-700 dark:text-slate-300">
                        <CheckCircle2 className="w-4 h-4 text-[#0B24FB] dark:text-blue-400 shrink-0 mt-1" />
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </section>
          ))}
        </div>
      </article>

      {/* Related Organic Products Mentioned in the Article */}
      {relatedProducts.length > 0 && (
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-[#0B24FB] dark:text-blue-400">تسوق ما قرأت عنه</span>
              <h2 className="text-2xl font-extrabold text-slate-950 dark:text-white">
                منتجات عضوية مرتبطة بهذا المقال
              </h2>
            </div>
            <Link to="/shop" className="text-xs font-bold text-[#0B24FB] dark:text-blue-400 hover:underline">
              عرض المتجر الكامل
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
