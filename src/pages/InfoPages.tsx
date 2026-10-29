import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Sprout, Award, Phone, Mail, MapPin, CheckCircle2 } from 'lucide-react';

export const AboutPage: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      <div className="bg-white dark:bg-[#161F30] rounded-3xl border border-slate-200 dark:border-slate-800 p-8 sm:p-12 space-y-6">
        <span className="text-xs font-bold text-[#0B24FB] dark:text-blue-400">قصتنا ومعاييرنا في Marteagle</span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-950 dark:text-white leading-tight">
          نزرع الثقة ونحصد الصحة: رحلتنا نحو غذاء عضوي نقي 100%
        </h1>
        <p className="text-base sm:text-lg text-slate-700 dark:text-slate-300 leading-relaxed max-w-3xl">
          انطلقت <strong dir="ltr" className="text-slate-900 dark:text-white">Marteagle</strong> من رؤية واضحة: توفير غذاء طبيعي صادق لكل أسرة مصرية، خالٍ تمامًا من المبيدات الحشرية، الأسمدة الكيميائية، والمواد الحافظة، وبأسعار عادلة مباشرة من المزرعة.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
          <div className="p-6 rounded-2xl bg-[#EEF7FF] dark:bg-[#111827] border border-blue-100 dark:border-slate-700 space-y-3">
            <Sprout className="w-7 h-7 text-[#0B24FB] dark:text-blue-400" />
            <h2 className="text-lg font-extrabold text-slate-900 dark:text-white">01. زراعة حيوية نظيفة</h2>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              نتعاون مع أكثر من 25 مزرعة عضوية في الفيوم، سيوة، والإسماعيلية تعتمد الدورات الزراعية الطبيعية والسماد العضوي النقي.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#EEF7FF] dark:bg-[#111827] border border-blue-100 dark:border-slate-700 space-y-3">
            <ShieldCheck className="w-7 h-7 text-[#0B24FB] dark:text-blue-400" />
            <h2 className="text-lg font-extrabold text-slate-900 dark:text-white">02. فحص معملي دوري</h2>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              تخضع كافة دفعات العسل، الزيوت، البيض، والحبوب لاختبارات جودة للتأكد من خلوها التام من أي متبقيات كيميائية.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#EEF7FF] dark:bg-[#111827] border border-blue-100 dark:border-slate-700 space-y-3">
            <Award className="w-7 h-7 text-[#0B24FB] dark:text-blue-400" />
            <h2 className="text-lg font-extrabold text-slate-900 dark:text-white">03. من المزرعة لباب منزلك</h2>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              لا نخزن الخضروات أو الفاكهة لفترات طويلة؛ يتم القطف والتعبئة فجرًا والتوصيل بسيارات مبردة للحفاظ على القيمة الغذائية.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export const ContactPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) {
      setError('يرجى ملء جميع الحقول المطلوبة لإرسال رسالتك.');
      return;
    }
    setError(null);
    setSubmitted(true);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-5 space-y-6">
          <span className="text-xs font-bold text-[#0B24FB] dark:text-blue-400">خدمة العملاء والدعم</span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-950 dark:text-white">
            تواصل مع فريق Marteagle
          </h1>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            فريقنا متواجد يوميًا من الساعة 8 صباحًا حتى 11 مساءً للرد على استفساراتكم حول المنتجات العضوية، الطلبات الخاصة، أو متابعة الشحنات.
          </p>

          <div className="space-y-4 pt-2">
            <div className="p-4 rounded-2xl bg-white dark:bg-[#161F30] border border-slate-200 dark:border-slate-800 flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-[#EEF7FF] dark:bg-slate-800 text-[#0B24FB] dark:text-blue-400 flex items-center justify-center shrink-0">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <span className="block text-xs text-slate-500 dark:text-slate-400">الخط الساخن والواتساب</span>
                <strong dir="ltr" className="text-sm font-mono text-slate-900 dark:text-white">+20 100 123 4567</strong>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-white dark:bg-[#161F30] border border-slate-200 dark:border-slate-800 flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-[#EEF7FF] dark:bg-slate-800 text-[#0B24FB] dark:text-blue-400 flex items-center justify-center shrink-0">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <span className="block text-xs text-slate-500 dark:text-slate-400">البريد الإلكتروني</span>
                <strong className="text-sm font-mono text-slate-900 dark:text-white">hello@marteagle.shop</strong>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-white dark:bg-[#161F30] border border-slate-200 dark:border-slate-800 flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-[#EEF7FF] dark:bg-slate-800 text-[#0B24FB] dark:text-blue-400 flex items-center justify-center shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <span className="block text-xs text-slate-500 dark:text-slate-400">المنفذ الرئيسي</span>
                <strong className="text-sm text-slate-900 dark:text-white">القاهرة الجديدة، التجمع الخامس، مصر</strong>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7 bg-white dark:bg-[#161F30] rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8">
          {submitted ? (
            <div className="py-12 text-center space-y-4">
              <CheckCircle2 className="w-12 h-12 text-[#0B24FB] dark:text-blue-400 mx-auto" />
              <h2 className="text-xl font-extrabold text-slate-950 dark:text-white">
                تم استلام رسالتك بنجاح!
              </h2>
              <p className="text-sm text-slate-600 dark:text-slate-300 max-w-md mx-auto">
                شكرًا لتواصلك معنا يا {name}. سيقوم أحد ممثلي خدمة العملاء في Marteagle بالرد عليك عبر البريد الإلكتروني أو الهاتف خلال ساعات قليلة.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSubmitted(false);
                  setName('');
                  setEmail('');
                  setSubject('');
                  setMessage('');
                }}
                className="px-5 py-2.5 rounded-xl bg-[#0B24FB] text-white text-xs font-bold cursor-pointer"
              >
                إرسال رسالة أخرى
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="space-y-5">
              <h2 className="text-lg font-extrabold text-slate-950 dark:text-white">أرسل لنا رسالة مباشرة</h2>

              {error && (
                <div role="alert" className="p-3.5 rounded-xl bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-800 text-xs font-bold text-rose-800 dark:text-rose-200">
                  {error}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label htmlFor="contact-name" className="block text-xs font-bold text-slate-800 dark:text-slate-200">
                    الاسم *
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-[#0B24FB] dark:focus:border-blue-400"
                  />
                </div>
                <div className="space-y-1.5">
                  <label htmlFor="contact-email" className="block text-xs font-bold text-slate-800 dark:text-slate-200">
                    البريد الإلكتروني *
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-[#0B24FB] dark:focus:border-blue-400"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label htmlFor="contact-subject" className="block text-xs font-bold text-slate-800 dark:text-slate-200">
                  الموضوع
                </label>
                <input
                  id="contact-subject"
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-[#0B24FB] dark:focus:border-blue-400"
                />
              </div>

              <div className="space-y-1.5">
                <label htmlFor="contact-msg" className="block text-xs font-bold text-slate-800 dark:text-slate-200">
                  رسالتك أو استفسارك *
                </label>
                <textarea
                  id="contact-msg"
                  rows={4}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-[#0B24FB] dark:focus:border-blue-400"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 px-6 rounded-xl bg-[#0B24FB] text-white text-sm font-bold hover:bg-[#081BC7] transition-colors cursor-pointer"
              >
                إرسال الرسالة
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export const PrivacyPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="bg-white dark:bg-[#161F30] rounded-3xl border border-slate-200 dark:border-slate-800 p-8 sm:p-10 space-y-6">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-950 dark:text-white">
          سياسة الخصوصية وشروط الاستخدام والاسترجاع
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          في متجر <strong dir="ltr">Marteagle</strong>، نلتزم بحماية بيانات عملائنا وضمان تجربة تسوق آمنة وموثوقة بنسبة 100%.
        </p>
        <div className="space-y-4 text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          <h2 className="text-base font-bold text-slate-900 dark:text-white">1. ضمان الاسترجاع والاستبدال بدون أسئلة</h2>
          <p>
            يحق للعميل فحص جميع المنتجات العضوية فور وصول المندوب، وفي حال عدم الرضا عن مستوى النضارة أو التغليف يمكن استبدال المنتج أو استرداد قيمته بالكامل دون أي رسوم إضافية.
          </p>
          <h2 className="text-base font-bold text-slate-900 dark:text-white">2. سرية البيانات الشخصية</h2>
          <p>
            تُستخدم بيانات الاسم ورقم الهاتف والعنوان حصريًا لتوصيل الطلبات وتأكيد مواعيد الشحن، ولا يتم مشاركتها مع أي أطراف خارجية.
          </p>
        </div>
        <div className="pt-4">
          <Link to="/shop" className="text-xs font-bold text-[#0B24FB] dark:text-blue-400 hover:underline">
            العودة إلى المتجر
          </Link>
        </div>
      </div>
    </div>
  );
};
