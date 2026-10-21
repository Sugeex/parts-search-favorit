import { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { searchBrands } from '../store/partsSlice';

export default function SearchForm() {
  const dispatch = useDispatch();
  const loading = useSelector((s) => s.parts.brands.status === 'loading');
  const [value, setValue] = useState('');
  const [error, setError] = useState('');
  const inputRef = useRef(null);

  const submit = (e) => {
    e.preventDefault();
    if (loading) return; 
    const number = value.trim();
    if (!number) {
      setError('Введите артикул детали');
      inputRef.current.focus();
      return;
    }
    setError('');
    dispatch(searchBrands({ number }));
  };

  return (
    <form onSubmit={submit} noValidate>
      <label htmlFor="number" className="mb-1 block font-medium">
        Артикул
      </label>
      <p id="number-hint" className="mb-2 text-sm text-fg-muted">
        Покажем производителей, которые выпускают деталь с этим номером.
      </p>
      <div className="flex gap-3">
        <input
          ref={inputRef}
          id="number"
          name="number"
          type="search"
          autoComplete="off"
          spellCheck="false"
          placeholder="7160500039S"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          aria-invalid={error ? 'true' : undefined}
          aria-describedby={error ? 'number-hint number-error' : 'number-hint'}
          className="min-h-11 min-w-0 flex-1 rounded-lg border border-line-control bg-surface px-3 text-base placeholder:text-fg-muted"
        />
        <button
          type="submit"
          aria-disabled={loading}
          className="inline-flex min-h-11 items-center gap-2 rounded-lg bg-accent px-5 font-medium text-on-accent transition-[scale,background-color] duration-150 ease-out hover:bg-accent-hover aria-disabled:cursor-progress aria-disabled:opacity-80 motion-safe:not-aria-disabled:active:scale-[0.96]"
        >
          {loading && (
            <span
              aria-hidden="true"
              className="size-4 rounded-full border-2 border-current border-t-transparent animate-spin motion-reduce:animate-pulse"
            />
          )}
          Найти
        </button>
      </div>
      {error && (
        <p id="number-error" className="mt-2 text-sm font-medium text-danger-fg">
          {error}
        </p>
      )}
    </form>
  );
}
