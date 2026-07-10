import { useState } from 'react';
import Link from 'next/link';
import Seo from '@/components/Seo';
import { Breadcrumb, EmptyState } from './catalog';
import { PRODUCTS, money } from '@/data/products';
import { useStore } from '@/context/StoreContext';

const CITIES = ['Алматы', 'Астана', 'Шымкент', 'Атырау', 'Ақтөбе', 'Басқа'];

export default function Checkout() {
  const { cart, cartSubtotal, deliveryFee, cartTotal, clearCart, showToast } = useStore();
  const ids = Object.keys(cart);
  const [order, setOrder] = useState(null);
  const [form, setForm] = useState({ name: '', phone: '', city: CITIES[0], address: '', comment: '' });

  function submitOrder(e) {
    e.preventDefault();
    if (!form.name.trim() || !form.phone.trim() || !form.address.trim()) {
      showToast('⚠️ Міндетті өрістерді толтырыңыз');
      return;
    }
    const num = Math.floor(100000 + Math.random() * 900000);
    setOrder({ num, total: cartTotal });
    clearCart();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  return (
    <div className="page-enter max-w-[1280px] mx-auto px-6 py-10">
      <Seo title="Тапсырысты рәсімдеу" path="/checkout" description="Тапсырысты рәсімдеу — жеткізу деректерін толтырыңыз." />

      {order ? (
        <div className="text-center py-16 px-5">
          <div className="w-[84px] h-[84px] rounded-full bg-brand-100 text-brand-600 flex items-center justify-center mx-auto mb-5 animate-pop">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M20 6 9 17l-5-5" /></svg>
          </div>
          <h2 className="font-extrabold text-2xl mb-2.5">Тапсырыс қабылданды!</h2>
          <p className="text-dim mb-1.5">Тапсырыс нөмірі: <b>#{order.num}</b></p>
          <p className="text-dim mb-6">Жалпы сома: <b>{money(order.total)}</b>. Менеджер жақын арада хабарласады.</p>
          <Link href="/" className="btn-primary">Басты бетке оралу</Link>
        </div>
      ) : !ids.length ? (
        <>
          <Breadcrumb items={[{ label: 'Басты бет', href: '/' }, { label: 'Себет', href: '/cart' }, { label: 'Рәсімдеу' }]} />
          <EmptyState title="Себет бос" subtitle="Тапсырыс беру үшін алдымен тауар қосыңыз." cta={<Link href="/catalog" className="btn-primary">Каталогқа өту</Link>} />
        </>
      ) : (
        <>
          <Breadcrumb items={[{ label: 'Басты бет', href: '/' }, { label: 'Себет', href: '/cart' }, { label: 'Рәсімдеу' }]} />
          <div className="mb-9">
            <h2 className="text-[24px] md:text-[34px] font-extrabold">Тапсырысты рәсімдеу</h2>
            <p className="text-dim mt-1.5 text-[15px]">Деректеріңізді толтырыңыз</p>
          </div>
          <div className="grid lg:grid-cols-[1.3fr_1fr] gap-8 items-start">
            <form onSubmit={submitOrder}>
              <Field label="Аты-жөні *">
                <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} type="text" placeholder="Мысалы: Асан Асанов" className="input" />
              </Field>
              <Field label="Телефон нөмірі *">
                <input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} type="tel" placeholder="+7 ___ ___ __ __" className="input" />
              </Field>
              <Field label="Қала *">
                <select value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} className="input">
                  {CITIES.map((c) => <option key={c}>{c}</option>)}
                </select>
              </Field>
              <Field label="Мекенжай *">
                <input value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} type="text" placeholder="Көше, үй, пәтер" className="input" />
              </Field>
              <Field label="Пікір / қосымша ақпарат">
                <textarea value={form.comment} onChange={(e) => setForm({ ...form, comment: e.target.value })} placeholder="Курьерге ескертулер, қалаған жеткізу уақыты т.б." className="input min-h-[90px]" />
              </Field>
              <button type="submit" className="btn-primary btn-block">Тапсырысты растау</button>
            </form>

            <div className="card p-6 lg:sticky lg:top-[96px]">
              <h4 className="font-bold mb-3.5">Тапсырыс</h4>
              {ids.map((id) => {
                const p = PRODUCTS.find((x) => x.id === Number(id));
                return (
                  <div key={id} className="flex justify-between text-[13.5px] py-2 border-b" style={{ borderColor: 'var(--border)' }}>
                    <span>{p.name} × {cart[id]}</span><span>{money(p.price * cart[id])}</span>
                  </div>
                );
              })}
              <div className="flex justify-between text-sm text-dim mt-3.5">
                <span>Тауарлар</span><span>{money(cartSubtotal)}</span>
              </div>
              <div className="flex justify-between text-sm text-dim mt-3">
                <span>Жеткізу</span><span>{deliveryFee === 0 ? 'Тегін' : money(deliveryFee)}</span>
              </div>
              <div className="flex justify-between text-lg font-extrabold border-t pt-3.5 mt-3.5" style={{ borderColor: 'var(--border)' }}>
                <span>Барлығы</span><span>{money(cartTotal)}</span>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

function Field({ label, children }) {
  return (
    <div className="mb-3.5">
      <label className="block text-[13px] font-bold mb-1.5">{label}</label>
      {children}
    </div>
  );
}
