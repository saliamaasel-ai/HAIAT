import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Seo from '@/components/Seo';
import CategoryIcon from '@/components/CategoryIcon';
import ProductCard from '@/components/ProductCard';
import { StarRating, StarPicker } from '@/components/StarRating';
import { Breadcrumb } from '../catalog';
import { PRODUCTS, CAT_LABELS, money, getProductById } from '@/data/products';
import { useStore } from '@/context/StoreContext';

export async function getStaticPaths() {
  return {
    paths: PRODUCTS.map((p) => ({ params: { id: String(p.id) } })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const product = getProductById(params.id);
  if (!product) return { notFound: true };
  return { props: { productId: product.id } };
}

export default function ProductPage({ productId }) {
  const router = useRouter();
  const { wishlist, toggleWishlist, addToCart, addReview, showToast } = useStore();
  const [, forceUpdate] = useState(0);
  const [qty, setQty] = useState(1);
  const [revName, setRevName] = useState('');
  const [revText, setRevText] = useState('');
  const [revStars, setRevStars] = useState(5);
  const [activeImg, setActiveImg] = useState(0);

  useEffect(() => { setActiveImg(0); }, [productId]);

  const product = getProductById(productId);
  if (!product) return null;

  const discount = product.old ? Math.round((1 - product.price / product.old) * 100) : 0;
  const related = PRODUCTS.filter((x) => x.cat === product.cat && x.id !== product.id).slice(0, 4);
  const isWished = wishlist.includes(product.id);
  const gallery = product.images || [];

  function submitReview(e) {
    e.preventDefault();
    if (!revText.trim()) {
      showToast('⚠️ Пікір мәтінін жазыңыз');
      return;
    }
    addReview(product.id, {
      name: revName.trim() || 'Аноним',
      rating: revStars,
      text: revText.trim(),
      date: new Date().toISOString().slice(0, 10),
    });
    setRevName(''); setRevText(''); setRevStars(5);
    showToast('✅ Пікіріңіз үшін рахмет!');
    forceUpdate((n) => n + 1);
  }

  function buyNow() {
    addToCart(product.id, qty);
    router.push('/checkout');
  }

  return (
    <div className="page-enter max-w-[1280px] mx-auto px-6 py-10">
      <Seo title={product.name} path={`/product/${product.id}`} description={product.desc} />
      <Breadcrumb items={[
        { label: 'Басты бет', href: '/' },
        { label: CAT_LABELS[product.cat], href: `/catalog?cat=${product.cat}` },
        { label: product.name },
      ]} />

      <div className="grid md:grid-cols-2 gap-12">
        <div className="md:sticky md:top-[96px] h-fit">
          <div className="aspect-square rounded-[28px] flex items-center justify-center bg-gradient-to-br from-brand-100 to-accent-100 overflow-hidden">
            {gallery.length ? (
              <img
                src={gallery[activeImg] || gallery[0]}
                alt={product.name}
                className="w-full h-full object-contain p-4"
              />
            ) : (
              <CategoryIcon category={product.cat} className="w-[40%] h-[40%] text-brand-600" />
            )}
          </div>
          {gallery.length > 1 && (
            <div className="flex gap-2.5 mt-3.5 overflow-x-auto pb-1">
              {gallery.map((src, i) => (
                <button
                  key={src}
                  onClick={() => setActiveImg(i)}
                  className={`w-16 h-16 shrink-0 rounded-xl overflow-hidden border-2 transition ${
                    i === activeImg ? 'border-brand-600' : 'border-transparent'
                  }`}
                  style={i !== activeImg ? { borderColor: 'var(--border)' } : {}}
                  aria-label={`${i + 1}-сурет`}
                >
                  <img src={src} alt={`${product.name} ${i + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        <div>
          <span className="text-[11.5px] font-bold text-brand-600 uppercase tracking-wide">{CAT_LABELS[product.cat]}</span>
          <h1 className="text-[24px] md:text-[32px] font-extrabold mb-2.5 mt-1">{product.name}</h1>
          <div className="flex items-center gap-2.5 flex-wrap text-sm text-dim mb-1">
            <StarRating rating={product.rating} /> <span>{product.rating} · {product.reviews.length} пікір</span>
            {product.isNew && <span className="tag tag-new">Жаңа</span>}
            {discount > 0 && <span className="tag tag-sale">-{discount}%</span>}
          </div>
          <div className="flex items-baseline gap-3 my-4">
            <span className="text-[30px] font-extrabold font-display">{money(product.price)}</span>
            {product.old && <span className="text-dim line-through text-[15px]">{money(product.old)}</span>}
          </div>
          <p className="text-dim text-[14.5px] mb-5 leading-[1.7]">
            {product.desc} Бұл өнім жоғары сапалы материалдардан жасалған, күнделікті қолдануға арналған және сатып алушылар тарапынан жоғары бағаланған.
          </p>

          <div className="flex items-center gap-3.5 my-5">
            <span className="font-bold text-[13.5px]">Саны:</span>
            <div className="flex items-center border rounded-xl overflow-hidden" style={{ borderColor: 'var(--border)' }}>
              <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="w-9 h-10 font-bold text-lg" style={{ background: 'var(--surface-2)' }}>−</button>
              <span className="w-10 text-center font-bold">{qty}</span>
              <button onClick={() => setQty((q) => q + 1)} className="w-9 h-10 font-bold text-lg" style={{ background: 'var(--surface-2)' }}>+</button>
            </div>
          </div>

          <div className="flex gap-3 flex-wrap mb-6">
            <button onClick={() => addToCart(product.id, qty)} className="btn-primary">Себетке қосу</button>
            <button onClick={buyNow} className="btn-accent">Қазір сатып алу</button>
            <button
              onClick={() => toggleWishlist(product.id)}
              className="w-11 h-11 rounded-2xl border flex items-center justify-center"
              style={{ borderColor: 'var(--border)' }}
            >
              <svg viewBox="0 0 24 24" width="18" height="18" fill={isWished ? '#EF4444' : 'none'} stroke={isWished ? '#EF4444' : 'currentColor'} strokeWidth="2">
                <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8z" />
              </svg>
            </button>
          </div>

          <div className="border-t" style={{ borderColor: 'var(--border)' }}>
            <SpecRow k="Санат" v={CAT_LABELS[product.cat]} />
            <SpecRow k="Кепілдік" v="12 ай" />
            <SpecRow k="Жеткізу" v="1-5 жұмыс күні" />
            <SpecRow k="Түс варианттары" v="Қара, ақ, көк" last />
          </div>
        </div>
      </div>

      {/* REVIEWS */}
      <div className="mt-14">
        <h3 className="font-extrabold text-xl mb-5">Пікірлер</h3>
        <div className="flex items-center gap-5 flex-wrap mb-6">
          <div className="text-[44px] font-extrabold font-display">{product.rating}</div>
          <div>
            <StarRating rating={product.rating} />
            <div className="text-dim text-[13px] mt-1">{product.reviews.length} пікір негізінде</div>
          </div>
        </div>

        <div className="mb-6">
          {product.reviews.length ? product.reviews.map((r, i) => (
            <div key={i} className="card p-[18px] mb-3">
              <div className="flex justify-between items-center mb-1.5">
                <b className="text-sm">{r.name}</b>
                <small className="text-dim text-xs">{r.date}</small>
              </div>
              <StarRating rating={r.rating} />
              <p className="mt-2 text-[13.5px] text-dim">{r.text}</p>
            </div>
          )) : (
            <p className="text-dim text-sm">Әзірге пікір жоқ. Бірінші болып пікір қалдырыңыз!</p>
          )}
        </div>

        <form onSubmit={submitReview} className="rounded-2xl p-5" style={{ background: 'var(--surface-2)' }}>
          <h4 className="font-bold mb-1.5">Пікір қалдыру</h4>
          <StarPicker value={revStars} onChange={setRevStars} />
          <div className="mb-3.5">
            <label className="block text-[13px] font-bold mb-1.5">Атыңыз</label>
            <input value={revName} onChange={(e) => setRevName(e.target.value)} type="text" placeholder="Атыңызды жазыңыз" className="input" />
          </div>
          <div className="mb-3.5">
            <label className="block text-[13px] font-bold mb-1.5">Пікіріңіз</label>
            <textarea value={revText} onChange={(e) => setRevText(e.target.value)} placeholder="Тауар туралы пікіріңізді жазыңыз..." className="input min-h-[90px]" />
          </div>
          <button type="submit" className="btn-primary">Пікір жіберу</button>
        </form>
      </div>

      {related.length > 0 && (
        <div className="mt-14">
          <h3 className="font-extrabold text-xl mb-5">Ұқсас тауарлар</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {related.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        </div>
      )}
    </div>
  );
}

function SpecRow({ k, v, last }) {
  return (
    <div className={`flex justify-between py-3 text-[13.5px] ${last ? '' : 'border-b'}`} style={{ borderColor: 'var(--border)' }}>
      <span className="text-dim">{k}</span><span>{v}</span>
    </div>
  );
}
