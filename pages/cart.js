import Link from 'next/link';
import Seo from '@/components/Seo';
import CategoryIcon from '@/components/CategoryIcon';
import { Breadcrumb } from './catalog';
import { PRODUCTS, money, DELIVERY_FREE_FROM } from '@/data/products';
import { useStore } from '@/context/StoreContext';

export default function Cart() {
  const { cart, setQty, removeFromCart, cartCount, cartSubtotal, deliveryFee, cartTotal } = useStore();
  const ids = Object.keys(cart);

  return (
    <div className="page-enter max-w-[1280px] mx-auto px-6 py-10">
      <Seo title="Себет" path="/cart" description="Себетіңіздегі тауарлар мен жалпы төлем сомасы." />
      <Breadcrumb items={[{ label: 'Басты бет', href: '/' }, { label: 'Себет' }]} />
      <div className="mb-9">
        <h2 className="text-[24px] md:text-[34px] font-extrabold">Себет</h2>
        <p className="text-dim mt-1.5 text-[15px]">{ids.length ? `${ids.length} түрлі тауар` : 'Себетіңіз бос'}</p>
      </div>

      {!ids.length ? (
        <div className="text-center py-16 px-5 text-dim">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-16 h-16 mx-auto mb-4 opacity-40">
            <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" /><path d="M1 1h4l2.7 13.4a2 2 0 0 0 2 1.6h9.7a2 2 0 0 0 2-1.6L23 6H6" />
          </svg>
          <h3 className="font-bold text-[var(--text)] mb-1">Себетіңіз бос</h3>
          <p className="mb-5">Каталогқа өтіп, ұнаған тауарды қосыңыз.</p>
          <Link href="/catalog" className="btn-primary">Каталогқа өту</Link>
        </div>
      ) : (
        <div className="grid lg:grid-cols-[1.6fr_1fr] gap-8 items-start">
          <div>
            {ids.map((id) => {
              const p = PRODUCTS.find((x) => x.id === Number(id));
              const q = cart[id];
              return (
                <div key={id} className="card flex gap-4 items-center p-3.5 mb-3">
                  <div className="w-[74px] h-[74px] rounded-xl shrink-0 bg-gradient-to-br from-brand-100 to-accent-100 flex items-center justify-center">
                    <CategoryIcon category={p.cat} className="w-[60%] h-[60%] text-brand-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <b className="block text-[14.5px] mb-0.5">{p.name}</b>
                    <span className="text-[12.5px] text-dim">{money(p.price)} / дана</span>
                  </div>
                  <div className="flex items-center border rounded-xl overflow-hidden shrink-0" style={{ borderColor: 'var(--border)' }}>
                    <button onClick={() => setQty(p.id, q - 1)} className="w-9 h-10 font-bold text-lg" style={{ background: 'var(--surface-2)' }}>−</button>
                    <span className="w-10 text-center font-bold">{q}</span>
                    <button onClick={() => setQty(p.id, q + 1)} className="w-9 h-10 font-bold text-lg" style={{ background: 'var(--surface-2)' }}>+</button>
                  </div>
                  <div className="font-extrabold font-display text-[15px] whitespace-nowrap shrink-0">{money(p.price * q)}</div>
                  <button onClick={() => removeFromCart(p.id)} aria-label="Өшіру" className="w-8 h-8 rounded-lg flex items-center justify-center text-dim hover:text-red-500 shrink-0" style={{}}>
                    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m3 0-1 14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2L4 6" /></svg>
                  </button>
                </div>
              );
            })}
          </div>

          <div className="card p-6 lg:sticky lg:top-[96px]">
            <h4 className="font-bold mb-4">Тапсырыс қорытындысы</h4>
            <div className="flex justify-between text-sm text-dim mb-3">
              <span>Тауарлар ({cartCount})</span><span>{money(cartSubtotal)}</span>
            </div>
            <div className="flex justify-between text-sm text-dim mb-3">
              <span>Жеткізу</span><span>{deliveryFee === 0 ? 'Тегін' : money(deliveryFee)}</span>
            </div>
            {cartSubtotal > 0 && cartSubtotal < DELIVERY_FREE_FROM && (
              <div className="text-sm text-brand-600 mb-3">Тегін жеткізуге дейін: {money(DELIVERY_FREE_FROM - cartSubtotal)}</div>
            )}
            <div className="flex justify-between text-lg font-extrabold border-t pt-3.5 mt-3.5" style={{ borderColor: 'var(--border)' }}>
              <span>Жалпы сома</span><span>{money(cartTotal)}</span>
            </div>
            <Link href="/checkout" className="btn-primary btn-block mt-5">Тапсырысты рәсімдеу</Link>
            <Link href="/catalog" className="btn-ghost btn-block mt-2.5">Сатып алуды жалғастыру</Link>
          </div>
        </div>
      )}
    </div>
  );
}
