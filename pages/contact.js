import { useState } from 'react';
import Seo from '@/components/Seo';
import { Breadcrumb } from './catalog';
import { useStore } from '@/context/StoreContext';

export default function Contact() {
  const { showToast } = useStore();
  const [form, setForm] = useState({ name: '', contact: '', message: '' });

  function submit(e) {
    e.preventDefault();
    showToast('✅ Хабарламаңыз жіберілді!');
    setForm({ name: '', contact: '', message: '' });
  }

  return (
    <div className="page-enter max-w-[1280px] mx-auto px-6 py-10">
      <Seo title="Байланыс" path="/contact" description="NUR.kz дүкенімен байланысу: телефон, email, мекенжай және хабарлама формасы." />
      <Breadcrumb items={[{ label: 'Басты бет', href: '/' }, { label: 'Байланыс' }]} />
      <div className="mb-9">
        <h2 className="text-[24px] md:text-[34px] font-extrabold">Байланыс</h2>
        <p className="text-dim mt-1.5 text-[15px]">Сұрақтарыңыз болса, бізбен хабарласыңыз</p>
      </div>

      <div className="grid md:grid-cols-2 gap-10">
        <div>
          <InfoRow icon={<path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3.1-8.7A2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.3 1.8.6 2.7a2 2 0 0 1-.4 2.1L8 9.9a16 16 0 0 0 6 6l1.4-1.4a2 2 0 0 1 2.1-.4c.9.3 1.8.5 2.7.6a2 2 0 0 1 1.8 2z" />} title="Телефон" value="+7 700 123 45 67" />
          <InfoRow icon={<><rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 6-10 7L2 6" /></>} title="Email" value="info@nur.kz" />
          <InfoRow icon={<><path d="M21 10c0 6-9 12-9 12s-9-6-9-12a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></>} title="Мекенжай" value="Алматы қ., Абай даңғылы 10" />
          <InfoRow icon={<><path d="M12 8v4l3 3" /><circle cx="12" cy="12" r="9" /></>} title="Жұмыс уақыты" value="Дүйсенбі–Жексенбі, 09:00–21:00" last />
          <div className="aspect-[16/10] rounded-2xl mt-4 flex items-center justify-center text-dim border" style={{ background: 'var(--surface-2)', borderColor: 'var(--border)' }}>
            Карта орналасуы (Алматы қ., Абай даңғылы 10)
          </div>
        </div>

        <form onSubmit={submit}>
          <h4 className="font-bold mb-4">Хабарлама жіберу</h4>
          <div className="mb-3.5">
            <label className="block text-[13px] font-bold mb-1.5">Аты-жөні</label>
            <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} type="text" placeholder="Атыңызды жазыңыз" className="input" />
          </div>
          <div className="mb-3.5">
            <label className="block text-[13px] font-bold mb-1.5">Телефон / Email</label>
            <input value={form.contact} onChange={(e) => setForm({ ...form, contact: e.target.value })} type="text" placeholder="+7 ___ ___ __ __" className="input" />
          </div>
          <div className="mb-3.5">
            <label className="block text-[13px] font-bold mb-1.5">Хабарлама</label>
            <textarea value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} placeholder="Сұрағыңызды жазыңыз..." className="input min-h-[90px]" />
          </div>
          <button type="submit" className="btn-primary btn-block">Жіберу</button>
        </form>
      </div>
    </div>
  );
}

function InfoRow({ icon, title, value, last }) {
  return (
    <div className={`flex gap-3.5 items-center py-4 ${last ? '' : 'border-b'}`} style={{ borderColor: 'var(--border)' }}>
      <div className="w-[42px] h-[42px] rounded-xl bg-brand-100 text-brand-600 flex items-center justify-center shrink-0">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">{icon}</svg>
      </div>
      <div>
        <b className="block">{title}</b>
        <span className="text-dim text-sm">{value}</span>
      </div>
    </div>
  );
}
