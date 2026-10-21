const priceFormat = new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB' });
const countFormat = new Intl.NumberFormat('ru-RU');

export const formatPrice = (value) => priceFormat.format(value);
export const formatCount = (value) => countFormat.format(value);

export function getPrice(item) {
  const prices = (item.warehouses || []).filter((w) => w.stock > 0).map((w) => w.price);
  return prices.length ? Math.min(...prices) : null;
}

export function toRows(goods) {
  const rows = [];
  goods.forEach((g) => {
    rows.push({ ...g, isAnalogue: false });
    (g.analogues || []).forEach((a) => a.number && rows.push({ ...a, isAnalogue: true }));
  });
  return rows;
}
