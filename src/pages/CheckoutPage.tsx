import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  CheckCircle2,
  ShieldCheck,
  Truck,
  Banknote,
  CreditCard,
  ArrowLeft,
  MessageCircle,
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { formatCurrencyEGP, buildWhatsAppOrderUrl } from '../utils/storeLogic';

export const CheckoutPage: React.FC = () => {
  const { cart, totals, couponCode, lastOrder, placeOrder } = useStore();

  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('القاهرة');
  const [address, setAddress] = useState('');
  const [notes, setNotes] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'card'>('cod');
  const [formError, setFormError] = useState<string | null>(null);

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim() || !phone.trim() || !address.trim()) {
      setFormError('يرجى إدخال الاسم الكامل ورقم الهاتف وعنوان التوصيل بالتفصيل لإتمام الطلب.');
      return;
    }
    setFormError(null);
    placeOrder({
      customerName: customerName.trim(),
      phone: phone.trim(),
      city,
      address: address.trim(),
      notes: notes.trim(),
      paymentMethod,
    });
  };

  const liveWhatsAppUrl = buildWhatsAppOrderUrl({
    customerName: customerName.trim() || undefined,
    phone: phone.trim() || undefined,
    city,
    address: address.trim() || undefined,
    notes: notes.trim() || undefined,
    paymentMethod,
    items: cart,
    totals,
    couponCode,
  });

  // Post-Order Confirmation View
  if (lastOrder && cart.length === 0) {
    const confirmedWhatsAppUrl = buildWhatsAppOrderUrl({
      orderNumber: lastOrder.orderNumber,
      customerName: lastOrder.customerName,
      phone: lastOrder.phone,
      city: lastOrder.city,
      address: lastOrder.address,
      notes: lastOrder.notes,
      paymentMethod: lastOrder.paymentMethod,
      items: lastOrder.items,
      totals: lastOrder.totals,
    });

    return (
      <div className="max-w-3xl mx-auto px-4 py-12">
        <div className="bg-white dark:bg-[#161F30] rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-10 space-y-6 shadow-xs">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-[#EEF7FF] dark:bg-slate-800 text-[#0B24FB] dark:text-blue-400 flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <div>
              <span className="text-xs font-bold text-[#0B24FB] dark:text-blue-400">
                تم تسجيل الطلب بنجاح · جاهز للإرسال عبر واتساب لتأكيد الموعد
              </span>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-950 dark:text-white">
                شكرًا لثقتك في Marteagle، {lastOrder.customerName}!
              </h1>
            </div>
          </div>

          {/* Primary WhatsApp Dispatch Callout */}
          <div className="p-5 rounded-2xl bg-[#EEF7FF] dark:bg-[#111827] border border-blue-200 dark:border-slate-700 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="space-y-1 text-center sm:text-right">
              <h2 className="text-sm font-extrabold text-slate-950 dark:text-white">
                خطوة سريعة لتأكيد الشحن الفوري عبر واتساب
              </h2>
              <p className="text-xs text-slate-600 dark:text-slate-300">
                اضغط على الزر لإرسال تفاصيل فاتورتك ورقم الطلب <strong className="font-mono">{lastOrder.orderNumber}</strong> إلى خدمة عملاء Marteagle على واتساب.
              </p>
            </div>
            <a
              href={confirmedWhatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#128C7E] hover:bg-[#075E54] text-white text-xs sm:text-sm font-extrabold transition-colors whitespace-nowrap shrink-0 shadow-xs"
            >
              <MessageCircle className="w-4 h-4" />
              <span>إرسال تفاصيل الطلب على واتساب</span>
            </a>
          </div>

          <div className="bg-slate-50 dark:bg-[#111827] rounded-2xl p-5 border border-slate-200 dark:border-slate-700 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
            <div>
              <span className="text-slate-500 dark:text-slate-400 block">رقم الطلب</span>
              <strong className="font-mono text-sm text-slate-900 dark:text-white">{lastOrder.orderNumber}</strong>
            </div>
            <div>
              <span className="text-slate-500 dark:text-slate-400 block">تاريخ الطلب</span>
              <strong className="text-slate-900 dark:text-white">{lastOrder.createdAt}</strong>
            </div>
            <div>
              <span className="text-slate-500 dark:text-slate-400 block">طريقة الدفع</span>
              <strong className="text-[#0B24FB] dark:text-blue-400">
                {lastOrder.paymentMethod === 'cod' ? 'الدفع عند الاستلام (COD)' : 'بطاقة بنكية'}
              </strong>
            </div>
            <div>
              <span className="text-slate-500 dark:text-slate-400 block">الإجمالي المستحق</span>
              <strong dir="ltr" className="text-slate-900 dark:text-white tabular-nums text-sm">
                {formatCurrencyEGP(lastOrder.totals.total)}
              </strong>
            </div>
          </div>

          <div className="space-y-2">
            <h2 className="text-sm font-bold text-slate-900 dark:text-white">عنوان التوصيل المسجل:</h2>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300">
              {lastOrder.city} — {lastOrder.address} (هاتف: <span dir="ltr">{lastOrder.phone}</span>)
            </p>
          </div>

          <div className="space-y-3 border-t border-slate-200 dark:border-slate-800 pt-4">
            <h2 className="text-sm font-bold text-slate-900 dark:text-white">المنتجات المطلوبة:</h2>
            <ul className="divide-y divide-slate-100 dark:divide-slate-800 text-xs sm:text-sm">
              {lastOrder.items.map(({ product, quantity }) => (
                <li key={product.id} className="py-2.5 flex items-center justify-between">
                  <span>
                    {product.name} × <strong className="tabular-nums">{quantity}</strong>
                  </span>
                  <span dir="ltr" className="font-bold tabular-nums">
                    {formatCurrencyEGP(product.price * quantity)}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="pt-4 flex flex-wrap items-center justify-between gap-4">
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#0B24FB] text-white text-xs sm:text-sm font-bold hover:bg-[#081BC7] transition-colors"
            >
              <span>العودة للمتجر ومواصلة التسوق</span>
              <ArrowLeft className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center space-y-4">
        <h1 className="text-2xl font-extrabold text-slate-950 dark:text-white">لا توجد منتجات لإتمام الطلب</h1>
        <p className="text-sm text-slate-600 dark:text-slate-400">يرجى إضافة منتجات إلى سلة التسوق أولًا.</p>
        <Link
          to="/shop"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#0B24FB] text-white text-xs font-bold"
        >
          <span>الذهاب إلى المتجر</span>
          <ArrowLeft className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div>
        <h1 className="text-3xl font-extrabold text-slate-950 dark:text-white">إتمام الطلب (Checkout)</h1>
        <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
          أدخل بيانات التوصيل الخاصة بك لتأكيد الطلب أو إرساله مباشرة عبر واتساب.
        </p>
      </div>

      <form onSubmit={handleSubmitOrder} noValidate className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Customer Verification & Shipping Address Form */}
        <div className="lg:col-span-7 bg-white dark:bg-[#161F30] rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 space-y-6">
          <h2 className="text-lg font-extrabold text-slate-950 dark:text-white">1. بيانات العميل وعنوان التوصيل</h2>

          {formError && (
            <div role="alert" className="p-4 rounded-xl bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-800 text-xs font-bold text-rose-800 dark:text-rose-200">
              {formError}
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label htmlFor="cust-name" className="block text-xs font-bold text-slate-800 dark:text-slate-200">
                الاسم بالكامل *
              </label>
              <input
                id="cust-name"
                type="text"
                required
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder="مثال: محمد أحمد علي"
                className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-[#0B24FB] dark:focus:border-blue-400"
              />
            </div>

            <div className="space-y-1.5">
              <label htmlFor="cust-phone" className="block text-xs font-bold text-slate-800 dark:text-slate-200">
                رقم الهاتف المحمول (لتأكيد المندوب) *
              </label>
              <input
                id="cust-phone"
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="01012345678"
                className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-[#0B24FB] dark:focus:border-blue-400"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-1.5">
              <label htmlFor="cust-city" className="block text-xs font-bold text-slate-800 dark:text-slate-200">
                المحافظة *
              </label>
              <select
                id="cust-city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full px-3.5 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-[#0B24FB] dark:focus:border-blue-400"
              >
                <option value="القاهرة">القاهرة</option>
                <option value="الجيزة">الجيزة</option>
                <option value="الإسكندرية">الإسكندرية</option>
                <option value="المنصورة">المنصورة</option>
                <option value="طنطا">طنطا</option>
                <option value="الفيوم">الفيوم</option>
              </select>
            </div>

            <div className="sm:col-span-2 space-y-1.5">
              <label htmlFor="cust-address" className="block text-xs font-bold text-slate-800 dark:text-slate-200">
                العنوان بالتفصيل (الحي، الشارع، رقم العقار والشقة) *
              </label>
              <input
                id="cust-address"
                type="text"
                required
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="مثال: التجمع الخامس، شارع التسعين، عمارة 14، شقة 5"
                className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-[#0B24FB] dark:focus:border-blue-400"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label htmlFor="cust-notes" className="block text-xs font-bold text-slate-800 dark:text-slate-200">
              ملاحظات إضافية للمندوب (اختياري)
            </label>
            <textarea
              id="cust-notes"
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="مواعيد التواجد المفضلة أو علامة مميزة للعنوان..."
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-[#0B24FB] dark:focus:border-blue-400"
            />
          </div>

          {/* Payment Method Selection */}
          <div className="pt-4 border-t border-slate-200 dark:border-slate-800 space-y-3">
            <h2 className="text-lg font-extrabold text-slate-950 dark:text-white">2. طريقة الدفع</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setPaymentMethod('cod')}
                className={`p-4 rounded-2xl border text-right flex items-start gap-3 transition-all cursor-pointer ${
                  paymentMethod === 'cod'
                    ? 'border-[#0B24FB] dark:border-blue-400 bg-[#EEF7FF] dark:bg-slate-800 text-slate-950 dark:text-white'
                    : 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-[#111827] text-slate-700 dark:text-slate-300'
                }`}
              >
                <Banknote className="w-5 h-5 text-[#0B24FB] dark:text-blue-400 shrink-0 mt-0.5" />
                <div>
                  <span className="block text-sm font-bold">الدفع عند الاستلام (COD)</span>
                  <span className="block text-xs text-slate-600 dark:text-slate-400 mt-0.5">
                    ادفع نقدًا للمندوب عند استلام وفحص منتجاتك العضوية
                  </span>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('card')}
                className={`p-4 rounded-2xl border text-right flex items-start gap-3 transition-all cursor-pointer ${
                  paymentMethod === 'card'
                    ? 'border-[#0B24FB] dark:border-blue-400 bg-[#EEF7FF] dark:bg-slate-800 text-slate-950 dark:text-white'
                    : 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-[#111827] text-slate-700 dark:text-slate-300'
                }`}
              >
                <CreditCard className="w-5 h-5 text-[#0B24FB] dark:text-blue-400 shrink-0 mt-0.5" />
                <div>
                  <span className="block text-sm font-bold">البطاقة البنكية / محفظة إلكترونية</span>
                  <span className="block text-xs text-slate-600 dark:text-slate-400 mt-0.5">
                    فيزا، ماستركارد، ميزة، أو فودافون كاش عند التوصيل
                  </span>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Order Summary Column */}
        <div className="lg:col-span-5 bg-white dark:bg-[#161F30] rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 space-y-6">
          <h2 className="text-lg font-extrabold text-slate-950 dark:text-white">ملخص المنتجات ({totals.itemCount})</h2>

          <div className="divide-y divide-slate-200 dark:divide-slate-800 max-h-72 overflow-y-auto pr-1">
            {cart.map(({ product, quantity }) => (
              <div key={product.id} className="py-3 flex items-center justify-between gap-3 text-sm">
                <div>
                  <span className="font-bold text-slate-900 dark:text-white">{product.name}</span>
                  <span className="text-xs text-slate-500 dark:text-slate-400 block">
                    الكمية: {quantity} × {formatCurrencyEGP(product.price)}
                  </span>
                </div>
                <span dir="ltr" className="font-bold text-slate-900 dark:text-white tabular-nums shrink-0">
                  {formatCurrencyEGP(product.price * quantity)}
                </span>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-slate-200 dark:border-slate-800 space-y-2.5 text-sm">
            <div className="flex justify-between text-slate-600 dark:text-slate-400">
              <span>المجموع الفرعي</span>
              <span dir="ltr" className="font-bold text-slate-900 dark:text-white tabular-nums">
                {formatCurrencyEGP(totals.subtotal)}
              </span>
            </div>
            {totals.discountAmount > 0 && (
              <div className="flex justify-between text-[#0B24FB] dark:text-blue-400 font-bold">
                <span>خصم الكوبون</span>
                <span dir="ltr" className="tabular-nums">
                  -{formatCurrencyEGP(totals.discountAmount)}
                </span>
              </div>
            )}
            <div className="flex justify-between text-slate-600 dark:text-slate-400">
              <span>الشحن المبرد</span>
              <span className="font-bold text-[#0B24FB] dark:text-blue-400">
                {totals.shippingFee === 0 ? 'مجاني' : formatCurrencyEGP(totals.shippingFee)}
              </span>
            </div>
            <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex justify-between text-lg font-extrabold text-slate-950 dark:text-white">
              <span>الإجمالي المطلوب</span>
              <span dir="ltr" className="text-[#0B24FB] dark:text-blue-400 tabular-nums">
                {formatCurrencyEGP(totals.total)}
              </span>
            </div>
          </div>

          <div className="space-y-3">
            <button
              type="submit"
              className="w-full py-4 px-6 rounded-xl bg-[#0B24FB] text-white text-base font-extrabold hover:bg-[#081BC7] transition-colors cursor-pointer shadow-xs"
            >
              تأكيد الطلب الآن ({formatCurrencyEGP(totals.total)})
            </button>

            <a
              href={liveWhatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3.5 px-6 rounded-xl bg-[#128C7E] hover:bg-[#075E54] text-white text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-colors shadow-xs"
            >
              <MessageCircle className="w-4 h-4" />
              <span>إرسال الطلب والبيانات مباشرة عبر واتساب</span>
            </a>
          </div>

          <div className="flex items-center justify-center gap-4 text-xs text-slate-500 dark:text-slate-400 pt-2">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-4 h-4 text-[#0B24FB] dark:text-blue-400" />
              ضمان عضوي 100%
            </span>
            <span>·</span>
            <span className="flex items-center gap-1">
              <Truck className="w-4 h-4 text-[#0B24FB] dark:text-blue-400" />
              توصيل سريع ومبرد
            </span>
          </div>
        </div>
      </form>
    </div>
  );
};
