import { useSelector } from 'react-redux';
import { toRows } from '../offers';

function getMessage({ number, brands, selectedBrand, offers }) {
  if (offers.status === 'loading') return 'Загружаем предложения…';
  if (offers.status === 'succeeded') {
    const rows = toRows(offers.items).length;
    return rows
      ? `Найдено предложений: ${rows}`
      : `Для производителя ${selectedBrand} предложений нет`;
  }
  if (offers.status === 'failed') return '';
  if (brands.status === 'loading') return 'Ищем производителей…';
  if (brands.status === 'succeeded') {
    return brands.items.length
      ? `Найдено производителей: ${brands.items.length}`
      : `По артикулу «${number}» ничего не найдено`;
  }
  return '';
}

export default function LiveStatus() {
  const message = useSelector((s) => getMessage(s.parts));
  return (
    <div role="status" className="sr-only">
      {message}
    </div>
  );
}
