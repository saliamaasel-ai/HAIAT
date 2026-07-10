import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useStore } from '@/context/StoreContext';

const NAV = [
  { href: '/', label: 'Басты бет' },
  { href: '/catalog', label: 'Каталог' },
  { href: '/promotions', label: 'Акциялар' },
  { href: '/about', label: 'Біз туралы' },
  { href: '/contact', label: 'Байланыс' },
  { href: '/delivery', label: 'Жеткізу және төлем' },
];

export default function Header() {
  const router = useRouter();
  const { cartCount, wishlist, theme, toggleTheme } = useStore();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [q, setQ] = useState('');

  function submitSearch(e) {
    e.preventDefault();
    if (q.trim()) {
      router.push(`/catalog?q=${encodeURIComponent(q.trim())}`);
      setDrawerOpen(false);
    }
  }

  return (
    <>
      <header
        className="sticky top-0 z-[100] h-[76px] border-b backdrop-blur-md"
        style={{ background: 'color-mix(in srgb, var(--surface) 82%, transparent)', borderColor: 'var(--border)' }}
      >
        <div className="max-w-[1280px] mx-auto px-6 h-full flex items-center gap-5">
          <Link href="/" className="flex items-center gap-2.5 font-display font-extrabold text-xl shrink-0">
            <span className="w-[34px] h-[34px] rounded-[10px] bg-gradient-to-br from-brand-600 to-accent-500 flex items-center justify-center text-white text-base font-extrabold">N</span>
            NUR<span className="text-accent-500">.kz</span>
          </Link>

          <nav className="hidden lg:flex gap-1 flex-1">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`px-3.5 py-2.5 rounded-[10px] text-[14.5px] font-semibold transition ${
                  router.pathname === item.href ? 'bg-[var(--surface-2)] text-[var(--text)]' : 'text-dim hover:bg-[var(--surface-2)] hover:text-[var(--text)]'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <form onSubmit={submitSearch} className="hidden lg:block relative flex-1 max-w-[340px]">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-dim">
              <circle cx="11" cy="11" r="7" /><path d="m21 21-4.3-4.3" />
            </svg>
            <input
              type="text"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Іздеу..."
              className="input pl-10 rounded-full py-2.5"
            />
          </form>

          <div className="flex items-center gap-1.5 shrink-0 ml-auto lg:ml-0">
            <button onClick={toggleTheme} aria-label="Тема ауыстыру" className="h-[26px] w-[44px] rounded-full border relative shrink-0" style={{ background: 'var(--surface-2)', borderColor: 'var(--border)' }}>
              <span
                className={`absolute top-0.5 w-5 h-5 rounded-full flex items-center justify-center text-white transition-all ${theme === 'dark' ? 'left-[20px] bg-accent-500 text-[#1B1400]' : 'left-0.5 bg-brand-600'}`}
              >
                {theme === 'dark' ? (
                  <svg viewBox="0 0 24 24" width="12" height="12" fill="currentColor"><path d="M21 12.8A9 9 0 1 1 11.2 3 7 7 0 0 0 21 12.8z" /></svg>
                ) : (
                  <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" /></svg>
                )}
              </span>
            </button>

            <IconLink href="/wishlist" count={wishlist.length} label="Таңдаулылар">
              <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8z" />
            </IconLink>
            <IconLink href="/cart" count={cartCount} label="Себет">
              <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" /><path d="M1 1h4l2.7 13.4a2 2 0 0 0 2 1.6h9.7a2 2 0 0 0 2-1.6L23 6H6" />
            </IconLink>
            <Link href="/account" className="w-10 h-10 rounded-xl hidden sm:flex items-center justify-center hover:bg-[var(--surface-2)]" aria-label="Аккаунт">
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="8" r="4" /><path d="M4 21c0-4 3.6-7 8-7s8 3 8 7" /></svg>
            </Link>
            <button onClick={() => setDrawerOpen(true)} className="w-10 h-10 rounded-xl flex items-center justify-center lg:hidden" aria-label="Мәзір">
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 7h16M4 12h16M4 17h16" /></svg>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      <div
        className={`fixed inset-0 bg-black/40 z-[200] transition-opacity ${drawerOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setDrawerOpen(false)}
      />
      <div
        className={`fixed top-0 right-0 h-full w-[82%] max-w-[340px] z-[201] p-6 overflow-y-auto transition-transform duration-300 ${drawerOpen ? 'translate-x-0' : 'translate-x-full'}`}
        style={{ background: 'var(--surface)' }}
      >
        <form onSubmit={submitSearch} className="relative mb-4">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-dim">
            <circle cx="11" cy="11" r="7" /><path d="m21 21-4.3-4.3" />
          </svg>
          <input type="text" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Іздеу..." className="input pl-10 rounded-full" />
        </form>
        {[...NAV, { href: '/wishlist', label: 'Таңдаулылар' }, { href: '/cart', label: 'Себет' }, { href: '/account', label: 'Аккаунт' }].map((item) => (
          <Link key={item.href} href={item.href} onClick={() => setDrawerOpen(false)} className="block py-3.5 font-bold text-base border-b" style={{ borderColor: 'var(--border)' }}>
            {item.label}
          </Link>
        ))}
      </div>
    </>
  );
}

function IconLink({ href, count, label, children }) {
  return (
    <Link href={href} className="relative w-10 h-10 rounded-xl flex items-center justify-center hover:bg-[var(--surface-2)]" aria-label={label}>
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">{children}</svg>
      {count > 0 && (
        <span className="absolute top-0.5 right-0.5 min-w-[16px] h-4 px-1 rounded-lg bg-accent-500 text-[#1B1400] text-[10px] font-extrabold flex items-center justify-center">
          {count}
        </span>
      )}
    </Link>
  );
}
