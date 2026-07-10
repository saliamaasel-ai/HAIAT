import Link from 'next/link';
import Seo from '@/components/Seo';
import CategoryIcon from '@/components/CategoryIcon';
import ProductCard from '@/components/ProductCard';
import { StarRating } from '@/components/StarRating';
import { PRODUCTS, CATEGORIES } from '@/data/products';

export default function Home() {
  const featured = PRODUCTS.filter((p) => p.isNew).slice(0, 4);
  const sale = PRODUCTS.filter((p) => p.old).slice(0, 4);

  return (
    <div className="page-enter">
      <Seo path="/" />

      {/* HERO */}
      <section className="relative overflow-hidden pt-16 pb-10">
        <div className="absolute w-[420px] h-[420px] rounded-full bg-brand-500 blur-[70px] opacity-50 -top-36 -right-24" />
        <div className="absolute w-[340px] h-[340px] rounded-full bg-accent-400 blur-[70px] opacity-50 -bottom-40 -left-20" />
        <div className="relative max-w-[1280px] mx-auto px-6 grid md:grid-cols-[1.1fr_.9fr] gap-10 items-center">
          <div>
            <span className="eyebrow">Жаңа коллекция 2026</span>
            <h1 className="text-[34px] md:text-[58px] font-extrabold leading-[1.05] mb-5">
              Телефоныңызға{' '}
              <span className="bg-gradient-to-r from-brand-600 to-accent-500 bg-clip-text text-transparent">
                лайықты
              </span>{' '}
              аксессуарлар
            </h1>
            <p className="text-[17px] text-dim max-w-[480px] mb-7">
              Қаптар, зарядтағыштар, құлаққаптар және т.б. — сапалы, заманауи әрі қолжетімді бағамен. Алматы бойынша жеткізу 1 күнде.
            </p>
            <div className="flex gap-3 flex-wrap">
              <Link href="/catalog" className="btn-primary">Каталогты қарау</Link>
              <Link href="/promotions" className="btn-ghost">Акцияларды көру</Link>
            </div>
            <div className="flex gap-7 mt-10">
              <Stat value="27+" label="Тауар түрі" />
              <Stat value="4.6★" label="Орташа баға" />
              <Stat value="1-2 күн" label="Жеткізу мерзімі" />
            </div>
          </div>
          <div className="relative flex items-center justify-center order-first md:order-last mb-6 md:mb-0">
            <div className="w-[280px] h-[280px] rounded-[36px] bg-gradient-to-br from-brand-100 to-accent-100 flex items-center justify-center">
              <CategoryIcon category="headphones" className="w-[55%] h-[55%] text-brand-600" />
            </div>
            <div className="hidden sm:flex absolute top-[8%] -left-[4%] card px-4 py-3 items-center gap-2.5 text-[13px] font-bold animate-floaty">
              <CategoryIcon category="chargers" className="w-5 h-5 text-accent-500" /> Fast Charge 65W
            </div>
            <div className="hidden sm:flex absolute bottom-[14%] -right-[6%] card px-4 py-3 items-center gap-2 text-[13px] font-bold animate-floaty" style={{ animationDelay: '1.2s' }}>
              <StarRating rating={5} /> 4.9 рейтинг
            </div>
          </div>
        </div>
      </section>

      {/* FEATURE STRIP */}
      <section className="max-w-[1280px] mx-auto px-6 py-10">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <Feature title="Жылдам жеткізу" desc="Алматы бойынша 1-2 күнде, облыстарға 3-5 күн." icon="🚚" />
          <Feature title="Сапаға кепілдік" desc="Барлық тауарға 30 күндік қайтару кепілдігі." icon="🛡️" />
          <Feature title="Ыңғайлы төлем" desc="Картамен, қолма-қол немесе Kaspi арқылы." icon="💳" />
          <Feature title="24/7 қолдау" desc="Кез келген уақытта WhatsApp арқылы хабарласыңыз." icon="💬" />
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="max-w-[1280px] mx-auto px-6 py-14">
        <SectionHead title="Категориялар" subtitle="Керек аксессуарды жылдам табыңыз" />
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3.5">
          {CATEGORIES.map((c) => (
            <Link
              key={c.slug}
              href={`/catalog?cat=${c.slug}`}
              className="card p-5 text-center hover:-translate-y-1.5 hover:shadow-card transition"
            >
              <div className="w-[52px] h-[52px] mx-auto mb-3 rounded-2xl bg-gradient-to-br from-brand-100 to-accent-100 flex items-center justify-center">
                <CategoryIcon category={c.slug} className="w-6 h-6 text-brand-600" />
              </div>
              <p className="text-[13.5px] font-bold">{c.label}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* NEW PRODUCTS */}
      <section className="max-w-[1280px] mx-auto px-6 py-14">
        <SectionHead title="Жаңа түскен тауарлар" subtitle="Ассортименттегі соңғы жаңалықтар" cta />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {featured.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>

      {/* PROMO BANNER */}
      <section className="max-w-[1280px] mx-auto px-6 py-6">
        <div className="rounded-3xl p-10 text-white relative overflow-hidden" style={{ background: 'linear-gradient(120deg, #12357A, #1554D6 55%, #F5B301)' }}>
          <h3 className="text-2xl md:text-[32px] font-extrabold mb-2.5">Жазғы жеңілдіктер — 30% дейін!</h3>
          <p className="opacity-90 max-w-[480px] mb-5">Таңдаулы аксессуарларға үлкен жеңілдіктер. Қорда болғанша асығыңыз.</p>
          <Link href="/promotions" className="btn-accent">Акцияны көру</Link>
        </div>
      </section>

      {/* SALE PRODUCTS */}
      <section className="max-w-[1280px] mx-auto px-6 py-14">
        <SectionHead title="Арзандаған тауарлар" subtitle="Ең тиімді бағамен сатып алыңыз" cta />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {sale.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>
    </div>
  );
}

function Stat({ value, label }) {
  return (
    <div>
      <b className="block text-2xl font-extrabold font-display">{value}</b>
      <span className="text-[13px] text-dim">{label}</span>
    </div>
  );
}

function Feature({ title, desc, icon }) {
  return (
    <div className="card p-5 flex gap-3.5 items-start">
      <div className="w-[42px] h-[42px] rounded-xl bg-brand-100 flex items-center justify-center text-xl shrink-0">{icon}</div>
      <div>
        <h5 className="text-[14.5px] font-extrabold mb-1">{title}</h5>
        <p className="text-[12.5px] text-dim">{desc}</p>
      </div>
    </div>
  );
}

function SectionHead({ title, subtitle, cta }) {
  return (
    <div className="flex items-end justify-between gap-5 flex-wrap mb-9">
      <div>
        <h2 className="text-[24px] md:text-[34px] font-extrabold">{title}</h2>
        <p className="text-dim mt-1.5 text-[15px]">{subtitle}</p>
      </div>
      {cta && <Link href="/catalog" className="btn-ghost btn-sm">Барлығын көру</Link>}
    </div>
  );
}
