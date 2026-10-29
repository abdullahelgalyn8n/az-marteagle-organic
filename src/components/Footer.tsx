import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer id="brx-footer" className="bg-[#0D1321] text-slate-200 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Col 1: Authentic Marteagle Brand Mark & Mission */}
          <div className="space-y-4">
            <Link to="/" className="inline-flex items-center gap-3.5 text-xl font-extrabold text-white">
              <img
                src="/images/ui/icon-1.png"
                alt="Marteagle Logo"
                className="w-11 h-11 object-contain shrink-0 rounded-md"
              />
              <span dir="ltr" className="text-2xl font-extrabold tracking-tight">
                Marteagle
              </span>
            </Link>
            <p className="text-sm text-slate-300 leading-relaxed">
              منصتك الأولى للمنتجات العضوية والطبيعية الطازجة في مصر. نصل مائدتك ومنزلك مباشرة بأفضل المنتجات المختارة بعناية لضمان أعلى معايير الجودة والراحة.
            </p>
          </div>

          {/* Col 2: Quick Store Links */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-white tracking-wide">
              روابط المتجر السريعة
            </h3>
            <ul className="space-y-2.5 text-sm text-slate-300">
              <li>
                <Link to="/shop" className="hover:text-blue-400 transition-colors">
                  جميع المنتجات (Shop)
                </Link>
              </li>
              <li>
                <Link to="/category/fruits" className="hover:text-blue-400 transition-colors">
                  فواكه طازجة من المزرعة
                </Link>
              </li>
              <li>
                <Link to="/category/vegetables" className="hover:text-blue-400 transition-colors">
                  خضروات عضوية مختارة
                </Link>
              </li>
              <li>
                <Link to="/category/legumes-grains" className="hover:text-blue-400 transition-colors">
                  البقوليات والحبوب العضوية
                </Link>
              </li>
              <li>
                <Link to="/blog" className="hover:text-blue-400 transition-colors">
                  مدونة ومقالات التغذية
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Customer Care & Policies */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-white tracking-wide">
              خدمة العملاء والسياسات
            </h3>
            <ul className="space-y-2.5 text-sm text-slate-300">
              <li>
                <Link to="/wishlist" className="hover:text-blue-400 transition-colors">
                  قائمة المفضلة المحفوظة
                </Link>
              </li>
              <li>
                <Link to="/cart" className="hover:text-blue-400 transition-colors">
                  سلة التسوق والطلب عبر واتساب
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-blue-400 transition-colors">
                  من نحن ومعايير الجودة
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-blue-400 transition-colors">
                  تواصل معنا والدعم الفني
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="hover:text-blue-400 transition-colors">
                  سياسة الخصوصية والشروط
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact Info */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-white tracking-wide">
              تواصل معنا مباشرة
            </h3>
            <div className="space-y-3 text-sm text-slate-300">
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-[#B96B78] shrink-0" />
                <div>
                  <span className="block text-xs text-slate-400">Call us (اتصل بنا)</span>
                  <a href="tel:+201001234567" dir="ltr" className="font-mono font-semibold text-white hover:text-blue-400">
                    +20 100 123 4567
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-[#B96B78] shrink-0" />
                <div>
                  <span className="block text-xs text-slate-400">Email us (البريد الإلكتروني)</span>
                  <a href="mailto:hello@marteagle.shop" className="font-mono text-white hover:text-blue-400">
                    hello@marteagle.shop
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-[#B96B78] shrink-0" />
                <div>
                  <span className="block text-xs text-slate-400">المقر الرئيسي</span>
                  <span className="text-white">القاهرة الجديدة · مزارع الفيوم</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Copyright & Legal Links */}
        <div className="mt-12 pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p><a href="https://azagency.online/" target="_blank" rel="noopener noreferrer" className="hover:underline">جميع الحقوق محفوظة. A.Z Agency 2026 ©</a></p>
          <div className="flex items-center gap-6">
            <Link to="/privacy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link to="/privacy" className="hover:text-white transition-colors">
              Terms of Service
            </Link>
            <Link to="/privacy" className="hover:text-white transition-colors">
              Disclaimer
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
