import SearchForm from './components/SearchForm';
import BrandList from './components/BrandList';
import OffersTable from './components/OffersTable';
import LiveStatus from './components/LiveStatus';

export default function App() {
  return (
    <main className="mx-auto max-w-3xl space-y-8 px-4 py-8">
      <h1 className="text-2xl font-semibold leading-[1.2] tracking-[-0.015em] text-balance">
        Поиск автозапчастей
      </h1>
      <SearchForm />
      <BrandList />
      <OffersTable />
      <LiveStatus />
    </main>
  );
}
