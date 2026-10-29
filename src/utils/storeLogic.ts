import { Product, CategorySlug } from '../data/products';

export interface CartItem {
  product: Product;
  quantity: number;
}

export type SortOption =
  | 'default'
  | 'popularity'
  | 'rating'
  | 'latest'
  | 'price-asc'
  | 'price-desc';

export interface FilterOptions {
  category?: CategorySlug;
  searchQuery?: string;
  minPrice?: number;
  maxPrice?: number;
  onlyInStock?: boolean;
  sortBy?: SortOption;
}

export const STORE_WHATSAPP_NUMBER = '201001234567';

export function filterAndSortProducts(
  products: Product[],
  options: FilterOptions
): Product[] {
  const {
    category = 'all',
    searchQuery = '',
    minPrice,
    maxPrice,
    onlyInStock = false,
    sortBy = 'default',
  } = options;

  const normalizedQuery = searchQuery.trim().toLowerCase();

  const filtered = products.filter((item) => {
    if (category && category !== 'all' && item.category !== category) {
      return false;
    }

    if (onlyInStock && !item.inStock) {
      return false;
    }

    if (typeof minPrice === 'number' && item.price < minPrice) {
      return false;
    }

    if (typeof maxPrice === 'number' && item.price > maxPrice) {
      return false;
    }

    if (normalizedQuery.length > 0) {
      const matchesName = item.name.toLowerCase().includes(normalizedQuery);
      const matchesEnglish = item.englishName.toLowerCase().includes(normalizedQuery);
      const matchesCategory = item.categoryLabel.toLowerCase().includes(normalizedQuery);
      const matchesDesc = item.shortDescription.toLowerCase().includes(normalizedQuery);
      if (!matchesName && !matchesEnglish && !matchesCategory && !matchesDesc) {
        return false;
      }
    }

    return true;
  });

  const sorted = [...filtered];

  switch (sortBy) {
    case 'popularity':
      sorted.sort((a, b) => b.reviewsCount - a.reviewsCount);
      break;
    case 'rating':
      sorted.sort((a, b) => b.rating - a.rating || b.reviewsCount - a.reviewsCount);
      break;
    case 'price-asc':
      sorted.sort((a, b) => a.price - b.price);
      break;
    case 'price-desc':
      sorted.sort((a, b) => b.price - a.price);
      break;
    case 'latest':
      sorted.reverse();
      break;
    case 'default':
    default:
      break;
  }

  return sorted;
}

export function addItemToCart(
  cart: CartItem[],
  product: Product,
  quantityToAdd: number = 1
): CartItem[] {
  if (quantityToAdd <= 0) return cart;
  const existingIndex = cart.findIndex((item) => item.product.id === product.id);
  if (existingIndex > -1) {
    return cart.map((item, idx) =>
      idx === existingIndex
        ? { ...item, quantity: item.quantity + quantityToAdd }
        : item
    );
  }
  return [...cart, { product, quantity: quantityToAdd }];
}

export function updateCartItemQuantity(
  cart: CartItem[],
  productId: string,
  newQuantity: number
): CartItem[] {
  if (newQuantity <= 0) {
    return cart.filter((item) => item.product.id !== productId);
  }
  return cart.map((item) =>
    item.product.id === productId ? { ...item, quantity: newQuantity } : item
  );
}

export interface CartTotals {
  subtotal: number;
  discountAmount: number;
  shippingFee: number;
  total: number;
  itemCount: number;
  qualifiesForFreeShipping: boolean;
}

export const FREE_SHIPPING_THRESHOLD = 200; // 200 EGP (~5 USD)
export const STANDARD_SHIPPING_FEE = 35;

export function calculateCartTotals(
  cart: CartItem[],
  couponCode?: string
): CartTotals {
  const itemCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const subtotal = cart.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );

  const normalizedCoupon = (couponCode || '').trim().toUpperCase();
  let discountRate = 0;
  if (normalizedCoupon === 'ORGANIC25' || normalizedCoupon === 'EAGLE25') {
    discountRate = 0.25;
  } else if (normalizedCoupon === 'WELCOME10') {
    discountRate = 0.1;
  }

  const discountAmount = Math.round(subtotal * discountRate);
  const discountedSubtotal = Math.max(0, subtotal - discountAmount);
  const qualifiesForFreeShipping =
    discountedSubtotal >= FREE_SHIPPING_THRESHOLD || subtotal === 0;
  const shippingFee =
    subtotal === 0 ? 0 : qualifiesForFreeShipping ? 0 : STANDARD_SHIPPING_FEE;
  const total = discountedSubtotal + shippingFee;

  return {
    subtotal,
    discountAmount,
    shippingFee,
    total,
    itemCount,
    qualifiesForFreeShipping,
  };
}

export function formatCurrencyEGP(amount: number): string {
  return `${amount.toFixed(2).replace('.', ',')} EGP`;
}

export interface WhatsAppOrderInput {
  orderNumber?: string;
  customerName?: string;
  phone?: string;
  city?: string;
  address?: string;
  notes?: string;
  paymentMethod?: 'cod' | 'card';
  items: CartItem[];
  totals: CartTotals;
  couponCode?: string;
}

export function buildWhatsAppOrderMessage(input: WhatsAppOrderInput): string {
  const lines: string[] = [];
  lines.push('🌿 *طلب جديد من متجر Marteagle* 🌿');
  if (input.orderNumber) {
    lines.push(`رقم الطلب: *${input.orderNumber}*`);
  }
  lines.push('──────────────────');
  lines.push('*المنتجات المطلوبة:*');
  input.items.forEach(({ product, quantity }, idx) => {
    lines.push(
      `${idx + 1}. ${product.name} (${product.unit}) × ${quantity} = ${formatCurrencyEGP(
        product.price * quantity
      )}`
    );
  });
  lines.push('──────────────────');
  lines.push(`المجموع الفرعي: ${formatCurrencyEGP(input.totals.subtotal)}`);
  if (input.totals.discountAmount > 0) {
    lines.push(
      `الخصم (${input.couponCode || 'كوبون'}): -${formatCurrencyEGP(
        input.totals.discountAmount
      )}`
    );
  }
  lines.push(
    `الشحن المبرد: ${
      input.totals.shippingFee === 0
        ? 'مجاني'
        : formatCurrencyEGP(input.totals.shippingFee)
    }`
  );
  lines.push(`*الإجمالي المطلوب: ${formatCurrencyEGP(input.totals.total)}*`);

  if (input.customerName || input.phone || input.address) {
    lines.push('──────────────────');
    lines.push('*بيانات التوصيل:*');
    if (input.customerName) lines.push(`الاسم: ${input.customerName}`);
    if (input.phone) lines.push(`الهاتف: ${input.phone}`);
    if (input.city || input.address) {
      lines.push(
        `العنوان: ${[input.city, input.address].filter(Boolean).join(' - ')}`
      );
    }
    if (input.paymentMethod) {
      lines.push(
        `طريقة الدفع: ${
          input.paymentMethod === 'cod' ? 'الدفع عند الاستلام (COD)' : 'بطاقة بنكية / محفظة'
        }`
      );
    }
    if (input.notes) lines.push(`ملاحظات: ${input.notes}`);
  }

  return lines.join('\n');
}

export function buildWhatsAppOrderUrl(
  input: WhatsAppOrderInput,
  whatsappPhone: string = STORE_WHATSAPP_NUMBER
): string {
  const message = buildWhatsAppOrderMessage(input);
  return `https://wa.me/${whatsappPhone}?text=${encodeURIComponent(message)}`;
}

export function buildSingleProductWhatsAppUrl(
  product: Product,
  quantity: number = 1,
  whatsappPhone: string = STORE_WHATSAPP_NUMBER
): string {
  const total = product.price * quantity;
  const lines = [
    '🌿 *طلب سريع من متجر Marteagle* 🌿',
    `المنتج: *${product.name}* (${product.unit})`,
    `الكمية: *${quantity}*`,
    `السعر الإجمالي: *${formatCurrencyEGP(total)}*`,
    'يرجى تأكيد التوفر وموعد التوصيل.',
  ];
  return `https://wa.me/${whatsappPhone}?text=${encodeURIComponent(
    lines.join('\n')
  )}`;
}

export function getNameInitial(name: string): string {
  const cleaned = name
    .replace(/^(د\.|م\.|أ\.|دكتور|مهندس)\s*/u, '')
    .trim();
  return cleaned.length > 0 ? cleaned.charAt(0).toUpperCase() : 'م';
}

