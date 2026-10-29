import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowLeft, Truck, MessageCircle } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import {
  formatCurrencyEGP,
  FREE_SHIPPING_THRESHOLD,
  buildWhatsAppOrderUrl,
} from '../utils/storeLogic';
import { ProductArtwork } from './ProductArtwork';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    totals,
    couponCode,
    updateQuantity,
    isCartDrawerOpen,
    setIsCartDrawerOpen,
  } = useStore();
  const navigate = useNavigate();

  if (!isCartDrawerOpen) return null;

  const remainingForFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - totals.subtotal);
  const whatsappOrderUrl = buildWhatsAppOrderUrl({
    items: cart,
    totals,
    couponCode,
  });

  return (
    <div
      className="fixed inset-0 z-50 overflow-hidden"
      role="dialog"
      aria-modal="true"
      aria-label="سلة التسوق المصغرة"
    >
      {/* Backdrop */}
      <div
        onClick={() => setIsCartDrawerOpen(false)}
        className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs transition-opacity"
      />

      <div className="fixed inset-y-0 left-0 max-w-full flex pl-0 sm:pl-6">
        <div className="w-screen max-w-md bg-white dark:bg-[#111827] shadow-2xl flex flex-col justify-between border-r border-slate-200 dark:border-slate-800">
          {/* Drawer Header */}
          <div className="p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-[#F8FAFC] dark:bg-[#0D1321]">
            <div className="flex items-center gap-2.5">
              <ShoppingBag className="w-5 h-5 text-[#0B24FB] dark:text-blue-400" />
              <h2 className="text-lg font-extrabold text-slate-900 dark:text-white">
                سلة التسوق ({totals.itemCount})
              </h2>
            </div>
            <button
              type="button"
              onClick={() => setIsCartDrawerOpen(false)}
              aria-label="إغلاق سلة التسوق"
              className="p-2 rounded-lg text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Bar */}
          <div className="px-5 py-3 bg-[#0D1321] dark:bg-[#161F30] text-white text-xs flex items-center gap-2.5 border-b border-slate-800">
            <Truck className="w-4 h-4 text-[#B96B78] shrink-0" />
            {totals.qualifiesForFreeShipping && totals.subtotal > 0 ? (
              <span className="font-semibold">
                تهانينا! طلبك مؤهل للشحن المجاني السريع.
              </span>
            ) : (
              <span>
                أضف منتجات بقيمة{' '}
                <strong dir="ltr" className="text-blue-300 tabular-nums">
                  {formatCurrencyEGP(remainingForFreeShipping)}
                </strong>{' '}
                للحصول على شحن مجاني!
              </span>
            )}
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-5 divide-y divide-slate-200 dark:divide-slate-800">
            {cart.length === 0 ? (
              <div className="py-16 text-center space-y-4">
                <div className="w-16 h-16 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 flex items-center justify-center mx-auto">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <div className="space-y-1">
                  <p className="text-base font-bold text-slate-900 dark:text-white">
                    سلة التسوق فارغة حاليًا
                  </p>
                  <p className="text-xs text-slate-600 dark:text-slate-400 max-w-xs mx-auto">
                    استكشف تشكيلتنا الطازجة من المنتجات العضوية في Marteagle وأضف ما يناسبك إلى السلة.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setIsCartDrawerOpen(false);
                    navigate('/shop');
                  }}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#0B24FB] text-white text-xs font-bold hover:bg-[#081BC7] transition-colors cursor-pointer"
                >
                  <span>تصفح المتجر الآن</span>
                  <ArrowLeft className="w-4 h-4" />
                </button>
              </div>
            ) : (
              cart.map(({ product, quantity }) => (
                <div key={product.id} className="py-4 flex items-center gap-4">
                  <Link
                    to={`/product/${product.slug}`}
                    onClick={() => setIsCartDrawerOpen(false)}
                    className="w-16 h-16 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden shrink-0"
                  >
                    <ProductArtwork product={product} className="w-full h-full" />
                  </Link>

                  <div className="flex-1 min-w-0">
                    <Link
                      to={`/product/${product.slug}`}
                      onClick={() => setIsCartDrawerOpen(false)}
                      className="text-sm font-bold text-slate-900 dark:text-white hover:text-[#0B24FB] dark:hover:text-blue-400 transition-colors block truncate"
                    >
                      {product.name}
                    </Link>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{product.unit}</p>
                    <div className="mt-2 flex items-center justify-between">
                      <div className="inline-flex items-center rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800">
                        <button
                          type="button"
                          onClick={() => updateQuantity(product.id, quantity - 1)}
                          aria-label={`تقليل كمية ${product.name}`}
                          className="p-1.5 text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white cursor-pointer"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="px-2.5 text-xs font-bold text-slate-900 dark:text-white tabular-nums">
                          {quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(product.id, quantity + 1)}
                          aria-label={`زيادة كمية ${product.name}`}
                          className="p-1.5 text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white cursor-pointer"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <span
                        dir="ltr"
                        className="text-sm font-extrabold text-slate-900 dark:text-white tabular-nums"
                      >
                        {formatCurrencyEGP(product.price * quantity)}
                      </span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => updateQuantity(product.id, 0)}
                    aria-label={`حذف ${product.name} من السلة`}
                    className="p-2 text-slate-400 hover:text-rose-500 transition-colors cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Drawer Footer */}
          {cart.length > 0 && (
            <div className="p-5 bg-[#F8FAFC] dark:bg-[#0D1321] border-t border-slate-200 dark:border-slate-800 space-y-3.5">
              <div className="space-y-1.5 text-sm">
                <div className="flex items-center justify-between text-slate-600 dark:text-slate-400">
                  <span>المجموع الفرعي</span>
                  <span dir="ltr" className="font-bold text-slate-900 dark:text-white tabular-nums">
                    {formatCurrencyEGP(totals.subtotal)}
                  </span>
                </div>
                <div className="flex items-center justify-between text-slate-600 dark:text-slate-400">
                  <span>الشحن والتوصيل</span>
                  <span className="font-semibold text-[#0B24FB] dark:text-blue-400">
                    {totals.shippingFee === 0
                      ? 'مجاني'
                      : formatCurrencyEGP(totals.shippingFee)}
                  </span>
                </div>
                <div className="pt-2 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-base font-extrabold text-slate-900 dark:text-white">
                  <span>الإجمالي الكلي</span>
                  <span dir="ltr" className="tabular-nums text-[#0B24FB] dark:text-blue-400">
                    {formatCurrencyEGP(totals.total)}
                  </span>
                </div>
              </div>

              <a
                href={whatsappOrderUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 rounded-xl bg-[#128C7E] hover:bg-[#075E54] text-white text-xs font-bold flex items-center justify-center gap-2 transition-colors whitespace-nowrap shadow-xs"
              >
                <MessageCircle className="w-4 h-4" />
                <span>إرسال الطلب فورًا عبر واتساب</span>
              </a>

              <div className="grid grid-cols-2 gap-2.5">
                <Link
                  to="/cart"
                  onClick={() => setIsCartDrawerOpen(false)}
                  className="py-2.5 px-4 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#161F30] text-slate-900 dark:text-white text-xs font-bold text-center hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors whitespace-nowrap"
                >
                  عرض السلة الكاملة
                </Link>
                <Link
                  to="/checkout"
                  onClick={() => setIsCartDrawerOpen(false)}
                  className="py-2.5 px-4 rounded-xl bg-[#0B24FB] text-white text-xs font-bold text-center hover:bg-[#081BC7] transition-colors whitespace-nowrap"
                >
                  إتمام الطلب والعنوان
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
