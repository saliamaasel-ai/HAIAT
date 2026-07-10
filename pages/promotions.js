import Seo from '@/components/Seo';
import ProductCard from '@/components/ProductCard';
import { Breadcrumb } from './catalog';
import { PRODUCTS } from '@/data/products';

export default function Promotions() {
  const sale = PRODUCTS.filter((p) => p.old);
  return (
    <div className="page-enter max-w-[1280px] mx-auto px-6 py-10">
      <Seo title="Акциялар" path="/promotions" description="Телефон аксессуарларына жеңілдіктер мен акциялар. 30%-ға дейін үнемдеңіз." />
      <Breadcrumb items={[{ label: 'Басты бет', href: '/' }, { label: 'Акциялар' }]} />

      <div className="rounded-3xl p-10 text-white mb-9" style={{ background: 'linear-gradient(120deg, #12357A, #1554D6 55%, #F5B301)' }}>
        <h3 className="text-2xl md:text-[32px] font-extrabold mb-2.5">Жазғы супер жеңілдіктер</h3>
        <p className="opacity-90 max-w-[480px]">Таңдаулы санаттарға арнайы бағалар. Ұсыныс шектеулі уақытқа дейін жарамды.</p>
      </div>

      <div className="grid sm:grid-cols-3 gap-5 mb-12">
        <PromoCard pct="-30%" title="Құлаққаптарға" desc="TWS және спорт құлаққаптарына жеңілдік." />
        <PromoCard pct="-25%" title="Зарядтау құрылғыларына" desc="Power Bank, зарядтағыштар мен кабельдер." />
        <PromoCard pct="-20%" title="Қаптар мен әйнектерге" desc="Барлық үлгідегі қорғаныш аксессуарлар." />
      </div>

      <div className="mb-9">
        <h2 className="text-[24px] md:text-[34px] font-extrabold">Жеңілдіктегі тауарлар</h2>
        <p className="text-dim mt-1.5 text-[15px]">{sale.length} тауар акцияда</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {sale.map((p) => <ProductCard key={p.id} product={p} />)}
      </div>
    </div>
  );
}

function PromoCard({ pct, title, desc }) {
  return (
    <div className="card p-6 flex flex-col gap-2">
      <span className="text-[32px] font-extrabold font-display text-brand-600">{pct}</span>
      <h4 className="font-bold">{title}</h4>
      <p className="text-dim text-[13.5px]">{desc}</p>
    </div>
  );
}
