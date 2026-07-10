import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Seo from '@/components/Seo';
import ProductCard from '@/components/ProductCard';
import { PRODUCTS, CATEGORIES } from '@/data/products';

export default function Catalog() {
  const router = useRouter();
  const [q, setQ] = useState('');
  const [cats, setCats] = useState(new Set());
  const [min, setMin] = useState('');
  const [max, setMax] = useState('');
  const [sort, setSort] = useState('default');
  const [ready, setReady] = useState(false);

  // Sync from URL query params (?q=, ?cat=)
  useEffect(() => {
    if (!router.isReady) return;
    const { q: qq, cat } = router.query;
    if (qq) setQ(String(qq));
    if (cat) setCats(new Set([String(cat)]));
    setReady(true);
  }, [router.isReady, router.query]);

  const list = useMemo(() => {
    let items = PRODUCTS.slice();
    if (q) items = items.filter((p) => p.name.toLowerCase().includes(q.toLowerCase()) || p.desc.toLowerCase().includes(q.toLowerCase()));
    if (cats.size) items = items.filter((p) => cats.has(p.cat));
    if (min !== '') items = items.filter((p) => p.price >= Number(min));
    if (max !== '') items = items.filter((p) => p.price <= Number(max));
    if (sort === 'price-asc') items.sort((a, b) => a.price - b.price);
    else if (sort === 'price-desc') items.sort((a, b) => b.price - a.price);
    else if (sort === 'new') items = items.filter((p) => p.isNew);
    else if (sort === 'sale') items = items.filter((p) => p.old).sort((a, b) => (1 - b.price / b.old) - (1 - a.price / a.old));
    return items;
  }, [q, cats, min, max, sort]);

  function toggleCat(slug) {
    setCats((prev) => {
      const next = new Set(prev);
      next.has(slug) ? next.delete(slug) : next.add(slug);
      return next;
    });
  }

  function resetFilters() {
    setQ(''); setCats(new Set()); setMin(''); setMax(''); setSort('default');
  }

  if (!ready) return null;

  return (
    <div className="page-enter max-w-[1280px] mx-auto px-6 py-10">
      <Seo title="Каталог" path="/catalog" description="Телефон аксессуарларының толық каталогы: қаптар, зарядтағыштар, құлаққаптар, Power Bank және т.б." />
      <Breadcrumb items={[{ label: 'Басты бет', href: '/' }, { label: 'Каталог' }]} />
      <div className="mb-9">
        <h2 className="text-[24px] md:text-[34px] font-extrabold">Каталог</h2>
        <p className="text-dim mt-1.5 text-[15px]">Барлық телефон аксессуарлары бір жерде</p>
      </div>

      <div className="grid md:grid-cols-[260px_1fr] gap-8 items-start">
        <aside className="card p-5 md:sticky md:top-[96px]">
          <h4 className="text-sm font-extrabold mb-3">Іздеу</h4>
          <div className="relative mb-1">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-dim">
              <circle cx="11" cy="11" r="7" /><path d="m21 21-4.3-4.3" />
            </svg>
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Тауар іздеу..." className="input pl-10" />
          </div>

          <h4 className="text-sm font-extrabold mt-5 mb-3">Категория</h4>
          {CATEGORIES.map((c) => (
            <label key={c.slug} className={`flex items-center gap-2 py-2 text-[13.5px] font-semibold cursor-pointer ${cats.has(c.slug) ? '' : 'text-dim'}`}>
              <input type="checkbox" checked={cats.has(c.slug)} onChange={() => toggleCat(c.slug)} className="accent-brand-600 w-4 h-4" />
              {c.label}
            </label>
          ))}

          <h4 className="text-sm font-extrabold mt-5 mb-3">Бағасы, ₸</h4>
          <div className="flex gap-2">
            <input type="number" placeholder="Мин" value={min} onChange={(e) => setMin(e.target.value)} className="input" />
            <input type="number" placeholder="Макс" value={max} onChange={(e) => setMax(e.target.value)} className="input" />
          </div>

          <h4 className="text-sm font-extrabold mt-5 mb-3">Жылдам сүзгі</h4>
          <RadioRow label="Жаңалары" checked={sort === 'new'} onChange={() => setSort('new')} />
          <RadioRow label="Арзандағандары" checked={sort === 'sale'} onChange={() => setSort('sale')} />
          <RadioRow label="Барлығы" checked={sort === 'default'} onChange={() => setSort('default')} />

          <button onClick={resetFilters} className="btn-ghost btn-sm btn-block mt-4">Сүзгіні тазарту</button>
        </aside>

        <div>
          <div className="flex justify-between items-center flex-wrap gap-2.5 mb-5">
            <span className="text-[13.5px] text-dim">{list.length} тауар табылды</span>
            <select value={sort} onChange={(e) => setSort(e.target.value)} className="input !w-auto font-semibold text-[13.5px] rounded-xl">
              <option value="default">Ұсынылатын</option>
              <option value="price-asc">Бағасы: арзаннан қымбатқа</option>
              <option value="price-desc">Бағасы: қымбаттан арзанға</option>
              <option value="new">Жаңалары</option>
              <option value="sale">Арзандағандары</option>
            </select>
          </div>
          {list.length ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {list.map((p) => <ProductCard key={p.id} product={p} />)}
            </div>
          ) : (
            <EmptyState title="Тауар табылмады" subtitle="Сүзгіні өзгертіп көріңіз." />
          )}
        </div>
      </div>
    </div>
  );
}

function RadioRow({ label, checked, onChange }) {
  return (
    <label className={`flex items-center gap-2 py-2 text-[13.5px] font-semibold cursor-pointer ${checked ? '' : 'text-dim'}`}>
      <input type="radio" name="quickfilter" checked={checked} onChange={onChange} className="accent-brand-600 w-4 h-4" />
      {label}
    </label>
  );
}

export function Breadcrumb({ items }) {
  return (
    <div className="flex gap-1.5 text-[13px] text-dim mb-5 flex-wrap">
      {items.map((it, i) => (
        <span key={i} className="flex gap-1.5">
          {it.href ? <Link href={it.href} className="hover:text-brand-600">{it.label}</Link> : <span>{it.label}</span>}
          {i < items.length - 1 && <span>/</span>}
        </span>
      ))}
    </div>
  );
}

export function EmptyState({ title, subtitle, cta }) {
  return (
    <div className="text-center py-16 px-5 text-dim col-span-full">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-16 h-16 mx-auto mb-4 opacity-40">
        <circle cx="11" cy="11" r="7" /><path d="m21 21-4.3-4.3" />
      </svg>
      <h3 className="font-bold text-[var(--text)] mb-1">{title}</h3>
      <p className="mb-5">{subtitle}</p>
      {cta}
    </div>
  );
}
