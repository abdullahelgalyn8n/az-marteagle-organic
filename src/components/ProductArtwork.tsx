import React, { useState } from 'react';
import { Product } from '../data/products';

interface ProductArtworkProps {
  product: Product;
  className?: string;
}

export const ProductArtwork: React.FC<ProductArtworkProps> = ({ product, className = '' }) => {
  const [imgError, setImgError] = useState(false);

  // If the product specifies a bespoke artisanal SVG illustration type or if image fails to load,
  // render a studio-grade organic packaging/produce illustration so every product has a unique visual
  if (product.svgIllustrationType || imgError) {
    switch (product.svgIllustrationType) {
      case 'coffee':
        return (
          <div className={`relative flex items-center justify-center bg-[#F4EFE6] overflow-hidden ${className}`}>
            <svg viewBox="0 0 320 320" className="w-4/5 h-4/5 drop-shadow-md" role="img" aria-label={product.name}>
              <rect x="85" y="50" width="150" height="215" rx="14" fill="#5C3A21" />
              <path d="M85 85 H235 V230 H85 Z" fill="#3E2514" />
              <rect x="105" y="105" width="110" height="95" rx="8" fill="#FAF6F0" />
              <circle cx="160" cy="140" r="18" fill="#15803D" opacity="0.15" />
              <ellipse cx="160" cy="140" rx="11" ry="7" transform="rotate(-30 160 140)" fill="#4A2C18" />
              <path d="M152 144 Q160 138 168 136" stroke="#FAF6F0" strokeWidth="1.8" fill="none" />
              <text x="160" y="176" textAnchor="middle" fill="#1E293B" fontSize="13" fontWeight="700" fontFamily="sans-serif">ORGANIC</text>
              <text x="160" y="191" textAnchor="middle" fill="#15803D" fontSize="10" fontWeight="600" fontFamily="sans-serif">ARABICA COFFEE</text>
              <ellipse cx="75" cy="255" rx="12" ry="8" transform="rotate(-20 75 255)" fill="#3E2514" />
              <ellipse cx="100" cy="268" rx="11" ry="7" transform="rotate(15 100 268)" fill="#4A2C18" />
              <ellipse cx="242" cy="258" rx="12" ry="8" transform="rotate(25 242 258)" fill="#3E2514" />
            </svg>
          </div>
        );
      case 'avocado':
        return (
          <div className={`relative flex items-center justify-center bg-[#EFF6EE] overflow-hidden ${className}`}>
            <svg viewBox="0 0 320 320" className="w-4/5 h-4/5 drop-shadow-md" role="img" aria-label={product.name}>
              {/* Whole Avocado behind */}
              <path d="M140 60 C115 60 95 110 90 165 C85 215 115 250 150 250 C185 250 210 215 205 165 C200 110 165 60 140 60 Z" fill="#1E3F20" />
              {/* Halved Avocado front */}
              <path d="M185 85 C160 85 138 135 133 185 C128 235 158 268 193 268 C228 268 255 235 250 185 C245 135 210 85 185 85 Z" fill="#2E5A31" />
              <path d="M185 96 C164 96 146 140 142 185 C138 228 163 257 193 257 C223 257 245 228 241 185 C237 140 206 96 185 96 Z" fill="#D9ED92" />
              <path d="M185 108 C168 108 154 146 151 185 C148 220 168 245 193 245 C218 245 235 220 232 185 C229 146 202 108 185 108 Z" fill="#FEF9C3" />
              <circle cx="192" cy="196" r="28" fill="#78350F" />
              <circle cx="184" cy="188" r="8" fill="#92400E" opacity="0.6" />
            </svg>
          </div>
        );
      case 'dates':
        return (
          <div className={`relative flex items-center justify-center bg-[#FBF5EB] overflow-hidden ${className}`}>
            <svg viewBox="0 0 320 320" className="w-4/5 h-4/5 drop-shadow-md" role="img" aria-label={product.name}>
              <ellipse cx="160" cy="215" rx="105" ry="42" fill="#D97706" opacity="0.18" />
              <path d="M65 185 Q160 250 255 185 L235 235 Q160 270 85 235 Z" fill="#92400E" />
              {/* Medjool dates cluster */}
              <ellipse cx="120" cy="175" rx="34" ry="20" transform="rotate(-15 120 175)" fill="#5C2409" />
              <ellipse cx="165" cy="165" rx="36" ry="21" transform="rotate(8 165 165)" fill="#78350F" />
              <ellipse cx="202" cy="180" rx="33" ry="19" transform="rotate(20 202 180)" fill="#451A03" />
              <ellipse cx="145" cy="192" rx="35" ry="20" transform="rotate(-5 145 192)" fill="#652B0E" />
              <ellipse cx="185" cy="195" rx="33" ry="19" transform="rotate(12 185 195)" fill="#5C2409" />
              <text x="160" y="95" textAnchor="middle" fill="#78350F" fontSize="14" fontWeight="700" fontFamily="sans-serif">SIWA MEDJOOL DATES</text>
              <text x="160" y="115" textAnchor="middle" fill="#B45309" fontSize="11" fontWeight="600" fontFamily="sans-serif">100% ORGANIC ROYAL HARVEST</text>
            </svg>
          </div>
        );
      case 'almonds':
        return (
          <div className={`relative flex items-center justify-center bg-[#F7F3EB] overflow-hidden ${className}`}>
            <svg viewBox="0 0 320 320" className="w-4/5 h-4/5 drop-shadow-md" role="img" aria-label={product.name}>
              <rect x="85" y="55" width="150" height="210" rx="16" fill="#E6D7C3" stroke="#C8B294" strokeWidth="2" />
              <rect x="102" y="95" width="116" height="115" rx="10" fill="#FFFFFF" />
              <path d="M160 115 C145 130 142 152 160 165 C178 152 175 130 160 115 Z" fill="#B45309" />
              <text x="160" y="185" textAnchor="middle" fill="#1E293B" fontSize="12" fontWeight="700" fontFamily="sans-serif">RAW ALMONDS</text>
              <text x="160" y="200" textAnchor="middle" fill="#15803D" fontSize="10" fontWeight="600" fontFamily="sans-serif">100% UNSALTED ORGANIC</text>
            </svg>
          </div>
        );
      case 'lentils':
        return (
          <div className={`relative flex items-center justify-center bg-[#FFF7ED] overflow-hidden ${className}`}>
            <svg viewBox="0 0 320 320" className="w-4/5 h-4/5 drop-shadow-md" role="img" aria-label={product.name}>
              <rect x="85" y="55" width="150" height="210" rx="14" fill="#D97706" opacity="0.15" />
              <rect x="92" y="62" width="136" height="196" rx="12" fill="#FFFBEB" stroke="#F59E0B" strokeWidth="2" />
              <circle cx="160" cy="145" r="42" fill="#EA580C" opacity="0.9" />
              <circle cx="145" cy="135" r="5" fill="#FDBA74" />
              <circle cx="170" cy="150" r="6" fill="#FED7AA" />
              <circle cx="155" cy="160" r="5" fill="#FDBA74" />
              <text x="160" y="215" textAnchor="middle" fill="#7C2D12" fontSize="13" fontWeight="700" fontFamily="sans-serif">ORGANIC RED LENTILS</text>
              <text x="160" y="232" textAnchor="middle" fill="#EA580C" fontSize="10" fontWeight="600" fontFamily="sans-serif">PREMIUM HARVEST · 1KG</text>
            </svg>
          </div>
        );
      case 'goat-cheese':
        return (
          <div className={`relative flex items-center justify-center bg-[#F0F9FF] overflow-hidden ${className}`}>
            <svg viewBox="0 0 320 320" className="w-4/5 h-4/5 drop-shadow-md" role="img" aria-label={product.name}>
              <rect x="85" y="85" width="150" height="155" rx="18" fill="#FFFFFF" stroke="#BAE6FD" strokeWidth="3" />
              <rect x="78" y="68" width="164" height="26" rx="8" fill="#0284C7" />
              <rect x="100" y="115" width="120" height="90" rx="10" fill="#F0F9FF" />
              <text x="160" y="152" textAnchor="middle" fill="#0C4A6E" fontSize="14" fontWeight="700" fontFamily="sans-serif">GOAT FETA</text>
              <text x="160" y="172" textAnchor="middle" fill="#0284C7" fontSize="11" fontWeight="600" fontFamily="sans-serif">100% ORGANIC MILK</text>
              <text x="160" y="190" textAnchor="middle" fill="#15803D" fontSize="10" fontWeight="600" fontFamily="sans-serif">FARM ARTISANAL</text>
            </svg>
          </div>
        );
      default:
        break;
    }
  }

  return (
    <div className={`relative flex items-center justify-center bg-[#F4F6F9] dark:bg-[#1E293B] overflow-hidden ${className}`}>
      <img
        src={product.image}
        alt={product.name}
        referrerPolicy="no-referrer"
        onError={() => setImgError(true)}
        className="w-full h-full object-contain p-4 transition-transform duration-300 group-hover:scale-105"
      />
    </div>
  );
};
