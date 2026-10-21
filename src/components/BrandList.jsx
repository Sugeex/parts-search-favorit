import { useDispatch, useSelector } from 'react-redux';
import { searchBrands, searchOffers } from '../store/partsSlice';
import Loader from './Loader';
import ErrorAlert from './ErrorAlert';

function CheckIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 20 20"
      className="size-5 shrink-0"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 10.5l4 4 8-9" />
    </svg>
  );
}

export default function BrandList() {
  const dispatch = useDispatch();
  const { number, brands, selectedBrand } = useSelector((s) => s.parts);

  if (brands.status === 'idle') return null;
  if (brands.status === 'loading') return <Loader text="Ищем производителей…" />;
  if (brands.status === 'failed') {
    return <ErrorAlert message={brands.error} onRetry={() => dispatch(searchBrands({ number }))} />;
  }
  if (brands.items.length === 0) {
    return (
      <p className="rounded-lg border border-line bg-surface p-4 text-pretty">
        По артикулу «{number}» ничего не найдено. Проверьте номер и повторите поиск.
      </p>
    );
  }

  return (
    <section aria-labelledby="brands-title">
      <h2 id="brands-title" className="mb-3 text-lg font-semibold leading-[1.3]">
        Выберите производителя
      </h2>
      <ul className="flex flex-col gap-2">
        {brands.items.map(({ brand, name }) => {
          const selected = brand === selectedBrand;
          return (
            <li key={brand}>
              <button
                type="button"
                aria-pressed={selected}
                onClick={() => dispatch(searchOffers({ number, brand }))}
                className={`flex min-h-11 w-full items-center justify-between gap-3 rounded-lg border px-4 py-2 text-start transition-[background-color] duration-150 hover:bg-subtle ${
                  selected ? 'border-accent bg-subtle ring-1 ring-accent' : 'border-line-control bg-surface'
                }`}
              >
                <span className="min-w-0">
                  <span className="font-semibold">{brand}</span>
                  {name && <span className="ms-2 wrap-break-word text-fg-muted">{name}</span>}
                </span>
                {selected && (
                  <span className="text-accent">
                    <CheckIcon />
                  </span>
                )}
              </button>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
