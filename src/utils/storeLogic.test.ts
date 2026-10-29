import test from 'node:test';
import assert from 'node:assert/strict';
import { PRODUCTS } from '../data/products';
import {
  filterAndSortProducts,
  addItemToCart,
  updateCartItemQuantity,
  calculateCartTotals,
  formatCurrencyEGP,
  buildWhatsAppOrderMessage,
  buildWhatsAppOrderUrl,
  buildSingleProductWhatsAppUrl,
  getNameInitial,
} from './storeLogic';

test('filterAndSortProducts returns all products by default', () => {
  const result = filterAndSortProducts(PRODUCTS, {});
  assert.equal(result.length, PRODUCTS.length);
});

test('filterAndSortProducts filters by category slug accurately', () => {
  const veggies = filterAndSortProducts(PRODUCTS, { category: 'vegetables' });
  assert.ok(veggies.length >= 2);
  assert.ok(veggies.every((p) => p.category === 'vegetables'));
});

test('filterAndSortProducts searches Arabic product names and descriptions', () => {
  const honeySearch = filterAndSortProducts(PRODUCTS, { searchQuery: 'عسل' });
  assert.ok(honeySearch.length >= 1);
  assert.ok(honeySearch.some((p) => p.slug === 'fresh-organic-honey'));
});

test('filterAndSortProducts sorts by price ascending and descending', () => {
  const asc = filterAndSortProducts(PRODUCTS, { sortBy: 'price-asc' });
  assert.ok(asc[0].price <= asc[asc.length - 1].price);

  const desc = filterAndSortProducts(PRODUCTS, { sortBy: 'price-desc' });
  assert.ok(desc[0].price >= desc[desc.length - 1].price);
});

test('cart state transitions and ORGANIC25 25% first-order discount work properly', () => {
  const eggs = PRODUCTS.find((p) => p.slug === 'farm-fresh-eggs')!;
  const honey = PRODUCTS.find((p) => p.slug === 'fresh-organic-honey')!;

  let cart = addItemToCart([], eggs, 2); // 2 * 44 = 88 EGP
  cart = addItemToCart(cart, honey, 3); // 3 * 44 = 132 EGP -> Subtotal 220 EGP

  const totalsNoCoupon = calculateCartTotals(cart);
  assert.equal(totalsNoCoupon.itemCount, 5);
  assert.equal(totalsNoCoupon.subtotal, 220);
  assert.equal(totalsNoCoupon.qualifiesForFreeShipping, true);
  assert.equal(totalsNoCoupon.shippingFee, 0);
  assert.equal(totalsNoCoupon.total, 220);

  const totalsWithCoupon = calculateCartTotals(cart, 'ORGANIC25');
  assert.equal(totalsWithCoupon.discountAmount, 55); // 25% of 220
  assert.equal(totalsWithCoupon.shippingFee, 35);
  assert.equal(totalsWithCoupon.total, 200);

  cart = updateCartItemQuantity(cart, eggs.id, 0);
  assert.equal(cart.length, 1);
  assert.equal(formatCurrencyEGP(44), '44,00 EGP');
});

test('WhatsApp order message and URL builders include itemized products, totals, and customer address', () => {
  const honey = PRODUCTS.find((p) => p.slug === 'fresh-organic-honey')!;
  const cart = addItemToCart([], honey, 2);
  const totals = calculateCartTotals(cart);

  const message = buildWhatsAppOrderMessage({
    orderNumber: 'ME-900100',
    customerName: 'أحمد محمد',
    phone: '01012345678',
    city: 'القاهرة',
    address: 'التجمع الخامس',
    paymentMethod: 'cod',
    items: cart,
    totals,
  });

  assert.ok(message.includes('ME-900100'));
  assert.ok(message.includes('عسل عضوي طازج'));
  assert.ok(message.includes('أحمد محمد'));
  assert.ok(message.includes('01012345678'));

  const url = buildWhatsAppOrderUrl({ items: cart, totals });
  assert.ok(url.startsWith('https://wa.me/201001234567?text='));

  const singleUrl = buildSingleProductWhatsAppUrl(honey, 3);
  assert.ok(singleUrl.startsWith('https://wa.me/201001234567?text='));
});

test('getNameInitial extracts first letter of customer and author names cleanly', () => {
  assert.equal(getNameInitial('سارة المنشاوي'), 'س');
  assert.equal(getNameInitial('م. أحمد عبد الرحمن'), 'أ');
  assert.equal(getNameInitial('د. سارة المنشاوي'), 'س');
  assert.equal(getNameInitial('Mike Sendler'), 'M');
});

