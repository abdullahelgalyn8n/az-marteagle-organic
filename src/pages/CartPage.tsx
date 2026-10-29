import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus, ShoppingBag, ArrowLeft, Tag, Truck, MessageCircle } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import {
  formatCurrencyEGP,
  FREE_SHIPPING_THRESHOLD,
  buildWhatsAppOrderUrl,
} from '../utils/storeLogic';
import { ProductArtwork } from '../components/ProductArtwork';

export const CartPage: React.FC = () => {
  const {
    cart,
    totals,
    couponCode,
    setCouponCode,
    updateQuantity,
    clearCart,
    showToast,
  } = useStore();
  const [inputCode, setInputCode] = useState(couponCode);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    const code = inputCode.trim().toUpperCase();
    setCouponCode(code);
    if (code === 'ORGANIC25' || code === 'EAGLE25') {
      showToast('تم تطبيق كود الخصم بنسبة 25% بنجاح!');
    } else if (code === 'WELCOME10') {
      showToast('تم تطبيق كود الخصم بنسبة 10% بنجاح!');
    } else {
      showToast('كود الخصم غير صالح. جرب الكود ORGANIC25 للحصول على خصم 25%.');
    }
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-5">
        <div className="w-20 h-20 rounded-3xl bg-[#EEF7FF] dark:bg-slate-800 text-[#0B24FB] dark:text-blue-400 flex items-center justify-center mx-auto">
          <ShoppingBag className="w-10 h-10" />
        </div>
        <h1 className="text-3xl font-extrabold text-slate-950 dark:text-white">سلة التسوق فارغة</h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-md mx-auto">
          لم تقم بإضافة أي منتجات عضوية إلى سلتك بعد. تصفح متجر Marteagle لاختيار منتجاتك الطازجة من المزرعة.
        </p>
        <Link
          to="/shop"
          className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-[#0B24FB] text-white text-sm font-bold hover:bg-[#081BC7] transition-colors"
        >
          <span>تصفح المتجر الآن</span>
          <ArrowLeft className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  const remainingForFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - totals.subtotal);
  const whatsappCartUrl = buildWhatsAppOrderUrl({
    items: cart,
    totals,
    couponCode,
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-5">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-950 dark:text-white">سلة التسوق (Cart)</h1>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
            لديك {totals.itemCount} منتجات عضوية طازجة جاهزة للطلب
          </p>
        </div>
        <button
          type="button"
          onClick={clearCart}
          className="text-xs font-bold text-rose-700 dark:text-rose-400 hover:text-rose-900 self-start sm:self-auto cursor-pointer"
        >
          إفراغ السلة بالكامل
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Cart Items Table */}
        <div className="lg:col-span-8 space-y-4">
          {/* Free Shipping Banner */}
          <div className="rounded-2xl bg-[#0D1321] dark:bg-[#161F30] text-white p-4 flex items-center gap-3 text-xs sm:text-sm border border-slate-800">
            <Truck className="w-5 h-5 text-[#B96B78] shrink-0" />
            {totals.qualifiesForFreeShipping ? (
              <span className="font-bold">
                طلبك مؤهل للشحن المجاني السريع لباب المنزل!
              </span>
            ) : (
              <span>
                أضف منتجات بقيمة{' '}
                <strong dir="ltr" className="text-blue-300 tabular-nums">
                  {formatCurrencyEGP(remainingForFreeShipping)}
                </strong>{' '}
                إضافية للحصول على شحن مجاني!
              </span>
            )}
          </div>

          <div className="bg-white dark:bg-[#161F30] rounded-3xl border border-slate-200 dark:border-slate-800 divide-y divide-slate-200 dark:divide-slate-800 overflow-hidden">
            {cart.map(({ product, quantity }) => (
              <div
                key={product.id}
                className="p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="flex items-center gap-4">
                  <Link
                    to={`/product/${product.slug}`}
                    className="w-20 h-20 rounded-2xl border border-slate-200 dark:border-slate-700 bg-[#F4F6F9] dark:bg-[#1E293B] overflow-hidden shrink-0"
                  >
                    <ProductArtwork product={product} className="w-full h-full" />
                  </Link>
                  <div className="space-y-1">
                    <Link
                      to={`/product/${product.slug}`}
                      className="text-base font-extrabold text-slate-900 dark:text-white hover:text-[#0B24FB] dark:hover:text-blue-400 transition-colors"
                    >
                      {product.name}
                    </Link>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {product.categoryLabel} · {product.unit}
                    </p>
                    <p dir="ltr" className="text-xs font-bold text-slate-700 dark:text-slate-300 tabular-nums">
                      سعر الوحدة: {formatCurrencyEGP(product.price)}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-6 border-t sm:border-t-0 pt-3 sm:pt-0 border-slate-100 dark:border-slate-800">
                  <div className="inline-flex items-center rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800">
                    <button
                      type="button"
                      onClick={() => updateQuantity(product.id, quantity - 1)}
                      aria-label={`تقليل كمية ${product.name}`}
                      className="p-2 text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white cursor-pointer"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="px-3 text-sm font-extrabold text-slate-900 dark:text-white tabular-nums">
                      {quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => updateQuantity(product.id, quantity + 1)}
                      aria-label={`زيادة كمية ${product.name}`}
                      className="p-2 text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white cursor-pointer"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>

                  <span
                    dir="ltr"
                    className="text-base font-extrabold text-slate-900 dark:text-white tabular-nums min-w-[95px] text-left"
                  >
                    {formatCurrencyEGP(product.price * quantity)}
                  </span>

                  <button
                    type="button"
                    onClick={() => updateQuantity(product.id, 0)}
                    aria-label={`حذف ${product.name}`}
                    className="p-2 text-slate-400 hover:text-rose-500 transition-colors cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Order Summary & Coupon Sidebar */}
        <div className="lg:col-span-4 bg-white dark:bg-[#161F30] rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-7 space-y-6">
          <h2 className="text-lg font-extrabold text-slate-950 dark:text-white">ملخص الطلب</h2>

          {/* Coupon Form */}
          <form onSubmit={handleApplyCoupon} className="space-y-2">
            <label htmlFor="coupon-input" className="block text-xs font-bold text-slate-700 dark:text-slate-300">
              هل لديك كود خصم؟ (جرب ORGANIC25 لخصم 25%)
            </label>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Tag className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2" />
                <input
                  id="coupon-input"
                  type="text"
                  value={inputCode}
                  onChange={(e) => setInputCode(e.target.value)}
                  placeholder="ORGANIC25"
                  className="w-full pr-9 pl-3 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-mono uppercase text-slate-900 dark:text-white focus:outline-none focus:border-[#0B24FB] dark:focus:border-blue-400"
                />
              </div>
              <button
                type="submit"
                className="px-4 py-2.5 rounded-xl bg-[#0D1321] dark:bg-slate-800 text-white text-xs font-bold hover:bg-slate-800 dark:hover:bg-slate-700 transition-colors cursor-pointer whitespace-nowrap"
              >
                تطبيق
              </button>
            </div>
          </form>

          {/* Breakdown */}
          <div className="space-y-3 pt-4 border-t border-slate-200 dark:border-slate-800 text-sm">
            <div className="flex items-center justify-between text-slate-600 dark:text-slate-400">
              <span>المجموع الفرعي ({totals.itemCount} قطع)</span>
              <span dir="ltr" className="font-bold text-slate-900 dark:text-white tabular-nums">
                {formatCurrencyEGP(totals.subtotal)}
              </span>
            </div>

            {totals.discountAmount > 0 && (
              <div className="flex items-center justify-between text-[#0B24FB] dark:text-blue-400 font-bold">
                <span>خصم الكوبون ({couponCode})</span>
                <span dir="ltr" className="tabular-nums">
                  -{formatCurrencyEGP(totals.discountAmount)}
                </span>
              </div>
            )}

            <div className="flex items-center justify-between text-slate-600 dark:text-slate-400">
              <span>مصاريف الشحن المبرد</span>
              <span className="font-bold text-[#0B24FB] dark:text-blue-400">
                {totals.shippingFee === 0
                  ? 'شحن مجاني'
                  : formatCurrencyEGP(totals.shippingFee)}
              </span>
            </div>

            <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-lg font-extrabold text-slate-950 dark:text-white">
              <span>الإجمالي النهائي</span>
              <span dir="ltr" className="text-[#0B24FB] dark:text-blue-400 tabular-nums">
                {formatCurrencyEGP(totals.total)}
              </span>
            </div>
          </div>

          <div className="space-y-3">
            <a
              href={whatsappCartUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-4 px-6 rounded-xl bg-[#128C7E] hover:bg-[#075E54] text-white text-sm font-bold flex items-center justify-center gap-2 transition-colors shadow-xs"
            >
              <MessageCircle className="w-4 h-4" />
              <span>إرسال السلة مباشرة عبر واتساب</span>
            </a>

            <Link
              to="/checkout"
              className="w-full py-4 px-6 rounded-xl bg-[#0B24FB] text-white text-sm font-bold flex items-center justify-center gap-2 hover:bg-[#081BC7] transition-colors shadow-xs"
            >
              <span>إدخال العنوان وإتمام الطلب</span>
              <ArrowLeft className="w-4 h-4" />
            </Link>
          </div>

          <Link
            to="/shop"
            className="block text-center text-xs font-bold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
          >
            متابعة التسوق وإضافة المزيد
          </Link>
        </div>
      </div>
    </div>
  );
};
