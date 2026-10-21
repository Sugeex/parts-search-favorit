import { useDispatch, useSelector } from 'react-redux';
import { searchOffers } from '../store/partsSlice';
import { formatCount, formatPrice, getPrice, toRows } from '../offers';
import Loader from './Loader';
import ErrorAlert from './ErrorAlert';

export default function OffersTable() {
  const dispatch = useDispatch();
  const { number, selectedBrand, offers } = useSelector((s) => s.parts);

  if (offers.status === 'idle') return null;
  if (offers.status === 'loading') return <Loader text="Загружаем предложения…" />;
  if (offers.status === 'failed') {
    return (
      <ErrorAlert
        message={offers.error}
        onRetry={() => dispatch(searchOffers({ number, brand: selectedBrand }))}
      />
    );
  }

  const rows = toRows(offers.items);
  if (rows.length === 0) {
    return (
      <p className="rounded-lg border border-line bg-surface p-4 text-pretty">
        Для производителя {selectedBrand} предложений нет. Выберите другого производителя.
      </p>
    );
  }

  return (
    <section aria-labelledby="offers-title">
      <h2 id="offers-title" className="text-lg font-semibold leading-[1.3]">
        Аналоги и предложения
      </h2>
      <p className="mb-3 text-fg-muted">
        Артикул {number}, производитель {selectedBrand}
      </p>
      <div className="overflow-x-auto rounded-lg border border-line bg-surface">
        <table className="w-full border-collapse text-start">
          <caption className="sr-only">
            Аналоги и предложения для артикула {number}, производитель {selectedBrand}
          </caption>
          <thead>
            <tr className="border-b border-line text-sm text-fg-muted">
              <th scope="col" className="px-3 py-3 text-start font-medium sm:px-4">
                Название / Производитель
              </th>
              <th scope="col" className="px-3 py-3 text-end font-medium sm:px-4">
                Цена
              </th>
              <th scope="col" className="hidden px-4 py-3 text-end font-medium sm:table-cell">
                Остаток
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => {
              const price = getPrice(row);
              const stock = row.count > 0 ? `${formatCount(row.count)} шт.` : 'нет в наличии';
              return (
                <tr key={`${row.goodsID}-${i}`} className="border-b border-line last:border-b-0">
                  <td className="px-3 py-3 align-top sm:px-4">
                    <div className="wrap-anywhere">{row.name}</div>
                    <div className="mt-1 flex flex-wrap items-center gap-x-2 text-sm text-fg-muted">
                      <span>{row.brand}</span>
                      <span>{row.number}</span>
                      {row.isAnalogue ? (
                        <span className="rounded bg-subtle px-2 py-0.5 text-xs">Аналог</span>
                      ) : (
                        <span className="rounded border border-accent px-2 py-0.5 text-xs text-accent">Искомая деталь</span>
                      )}
                    </div>
                    <div className="mt-1 text-sm tabular-nums sm:hidden">Остаток: {stock}</div>
                  </td>
                  <td className="px-3 py-3 text-end align-top whitespace-nowrap tabular-nums sm:px-4">
                    {price === null ? (
                      <>
                        <span aria-hidden="true">—</span>
                        <span className="sr-only">цена не указана</span>
                      </>
                    ) : (
                      formatPrice(price)
                    )}
                  </td>
                  <td className="hidden px-4 py-3 text-end align-top tabular-nums first-letter:uppercase sm:table-cell">
                    {stock}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}
