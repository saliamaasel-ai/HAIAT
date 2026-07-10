import { useState } from 'react';
import Seo from '@/components/Seo';
import { Breadcrumb } from './catalog';
import { useStore } from '@/context/StoreContext';

export default function Account() {
  const { account, setAccount, wishlist, cartCount, showToast } = useStore();
  const [tab, setTab] = useState('login');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  function login(e) {
    e.preventDefault();
    setAccount({ name: 'Қонақ', phone: phone || '+7 700 000 00 00' });
    showToast('✅ Сәтті кірдіңіз');
  }

  function register(e) {
    e.preventDefault();
    setAccount({ name: name || 'Жаңа қолданушы', phone: phone || '+7 700 000 00 00' });
    showToast('✅ Тіркелу сәтті өтті');
  }

  return (
    <div className="page-enter max-w-[1280px] mx-auto px-6 py-10">
      <Seo title="Аккаунт" path="/account" description="Аккаунтыңызға кіру немесе тіркелу." />
      <Breadcrumb items={[{ label: 'Басты бет', href: '/' }, { label: 'Аккаунт' }]} />

      <div className="max-w-[420px] mx-auto card p-8">
        {account ? (
          <>
            <h3 className="font-extrabold text-xl mb-5">Сәлем, {account.name}! 👋</h3>
            <Row label="Аты-жөні" value={account.name} />
            <Row label="Телефон" value={account.phone} />
            <Row label="Таңдаулылар" value={`${wishlist.length} тауар`} />
            <Row label="Себеттегі тауар" value={`${cartCount} дана`} last />
            <button onClick={() => setAccount(null)} className="btn-ghost btn-block mt-5">Шығу</button>
          </>
        ) : (
          <>
            <div className="flex gap-1.5 p-1 rounded-xl mb-5" style={{ background: 'var(--surface-2)' }}>
              <button
                onClick={() => setTab('login')}
                className={`flex-1 py-2.5 rounded-lg font-bold text-[13.5px] ${tab === 'login' ? 'shadow-cardsm' : 'text-dim'}`}
                style={tab === 'login' ? { background: 'var(--surface)' } : {}}
              >
                Кіру
              </button>
              <button
                onClick={() => setTab('reg')}
                className={`flex-1 py-2.5 rounded-lg font-bold text-[13.5px] ${tab === 'reg' ? 'shadow-cardsm' : 'text-dim'}`}
                style={tab === 'reg' ? { background: 'var(--surface)' } : {}}
              >
                Тіркелу
              </button>
            </div>

            <form onSubmit={tab === 'login' ? login : register}>
              {tab === 'reg' && (
                <div className="mb-3.5">
                  <label className="block text-[13px] font-bold mb-1.5">Аты-жөні</label>
                  <input value={name} onChange={(e) => setName(e.target.value)} type="text" placeholder="Атыңызды жазыңыз" className="input" />
                </div>
              )}
              <div className="mb-3.5">
                <label className="block text-[13px] font-bold mb-1.5">Телефон нөмірі</label>
                <input value={phone} onChange={(e) => setPhone(e.target.value)} type="tel" placeholder="+7 ___ ___ __ __" className="input" />
              </div>
              <div className="mb-3.5">
                <label className="block text-[13px] font-bold mb-1.5">Құпия сөз</label>
                <input type="password" placeholder="••••••••" className="input" />
              </div>
              <button type="submit" className="btn-primary btn-block">{tab === 'login' ? 'Кіру' : 'Тіркелу'}</button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

function Row({ label, value, last }) {
  return (
    <div className={`flex justify-between py-3.5 text-sm ${last ? '' : 'border-b'}`} style={{ borderColor: 'var(--border)' }}>
      <span>{label}</span><b>{value}</b>
    </div>
  );
}
