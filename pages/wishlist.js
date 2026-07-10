import Link from 'next/link';
import Seo from '@/components/Seo';
import ProductCard from '@/components/ProductCard';
import { Breadcrumb, EmptyState } from './catalog';
import { PRODUCTS } from '@/data/products';
import { useStore } from '@/context/StoreContext';

export default function Wishlist() {
  const { wishlist } = useStore();
  const items = PRODUCTS.filter((p) => wishlist.includes(p.id));

  return (
    <div className="page-enter max-w-[1280px] mx-auto px-6 py-10">
      <Seo title="Таңдаулылар" path="/wishlist" description="Сіздің таңдаулы тауарларыңыздың тізімі." />
      <Breadcrumb items={[{ label: 'Басты бет', href: '/' }, { label: 'Таңдаулылар' }]} />
      <div className="mb-9">
        <h2 className="text-[24px] md:text-[34px] font-extrabold">Таңдаулылар</h2>
        <p className="text-dim mt-1.5 text-[15px]">{items.length ? `${items.length} тауар` : 'Тізім бос'}</p>
      </div>

      {items.length ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {items.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      ) : (
        <EmptyState
          title="Таңдаулылар тізімі бос"
          subtitle="Ұнаған тауарларды жүрекше арқылы қосыңыз."
          cta={<Link href="/catalog" className="btn-primary">Каталогқа өту</Link>}
        />
      )}
    </div>
  );
}
