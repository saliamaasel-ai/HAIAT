import Link from 'next/link';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-16 text-[#E9EDF7]" style={{ background: '#0B1E45' }}>
      <div className="max-w-[1280px] mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 py-14">
        <div className="col-span-2 md:col-span-1">
          <div className="flex items-center gap-2.5 font-display font-extrabold text-xl text-white mb-3.5">
            <span className="w-[34px] h-[34px] rounded-[10px] bg-gradient-to-br from-brand-600 to-accent-500 flex items-center justify-center text-white text-base">N</span>
            NUR.kz
          </div>
          <p className="text-[13.5px] text-[#B7C0D8] max-w-[280px] mb-4">
            Телефон аксессуарларының жетекші интернет-дүкені. Сапалы тауар, жылдам жеткізу, қолжетімді баға.
          </p>
          <div className="flex gap-2.5">
            <SocialLink href="https://wa.me/77001234567" label="WhatsApp">
              <path d="M17.5 14.4c-.3-.1-1.7-.8-2-1-.3-.1-.5-.1-.6.1-.2.3-.7 1-.9 1.1-.2.2-.3.2-.6.1-.3-.1-1.2-.5-2.3-1.5-.9-.8-1.4-1.7-1.6-2-.2-.3 0-.5.1-.6.1-.1.3-.3.4-.5.1-.1.2-.3.2-.4.1-.2 0-.3 0-.5s-.6-1.6-.9-2.2c-.2-.5-.5-.5-.6-.5h-.5c-.2 0-.5.1-.7.3-.2.3-1 1-1 2.3 0 1.4 1 2.7 1.1 2.9.1.2 2 3.1 4.9 4.3.7.3 1.2.5 1.6.6.7.2 1.3.2 1.8.1.5-.1 1.7-.7 1.9-1.4.2-.6.2-1.2.2-1.3-.1-.2-.3-.2-.6-.4z" />
              <path d="M12 2a10 10 0 0 0-8.5 15.2L2 22l4.9-1.5A10 10 0 1 0 12 2zm0 18.2a8.2 8.2 0 0 1-4.2-1.1l-.3-.2-3 .9.9-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2z" />
            </SocialLink>
            <SocialLink href="https://instagram.com/nur.kz" label="Instagram" outline>
              <rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" />
            </SocialLink>
            <SocialLink href="https://t.me/nurkz" label="Telegram">
              <path d="M21.9 4.3 2.6 11.8c-1.3.5-1.3 1.2-.2 1.5l4.9 1.5 1.9 5.8c.2.6.4.9.9.9.4 0 .6-.2.9-.5l2.2-2.1 4.6 3.4c.8.5 1.4.2 1.6-.8l3-14c.3-1.3-.4-1.8-1.5-1.2z" />
            </SocialLink>
          </div>
        </div>

        <FooterCol title="Дүкен" links={[
          { href: '/', label: 'Басты бет' },
          { href: '/catalog', label: 'Каталог' },
          { href: '/promotions', label: 'Акциялар' },
          { href: '/wishlist', label: 'Таңдаулылар' },
        ]} />
        <FooterCol title="Ақпарат" links={[
          { href: '/about', label: 'Біз туралы' },
          { href: '/delivery', label: 'Жеткізу және төлем' },
          { href: '/contact', label: 'Байланыс' },
          { href: '/account', label: 'Аккаунт' },
        ]} />
        <div>
          <h5 className="text-sm font-extrabold text-white mb-4">Байланыс</h5>
          <a href="tel:+77001234567" className="block text-[13.5px] text-[#B7C0D8] py-1.5 hover:text-white">+7 700 123 45 67</a>
          <a href="mailto:info@nur.kz" className="block text-[13.5px] text-[#B7C0D8] py-1.5 hover:text-white">info@nur.kz</a>
          <Link href="/contact" className="block text-[13.5px] text-[#B7C0D8] py-1.5 hover:text-white">Алматы қ., Абай даңғылы 10</Link>
        </div>
      </div>
      <div className="border-t border-white/10 py-5 text-center text-[12.5px] text-[#8B93AC]">
        © {year} NUR.kz — Барлық құқықтар қорғалған.
      </div>
    </footer>
  );
}

function FooterCol({ title, links }) {
  return (
    <div>
      <h5 className="text-sm font-extrabold text-white mb-4">{title}</h5>
      {links.map((l) => (
        <Link key={l.href} href={l.href} className="block text-[13.5px] text-[#B7C0D8] py-1.5 hover:text-white">
          {l.label}
        </Link>
      ))}
    </div>
  );
}

function SocialLink({ href, label, children, outline }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="w-[38px] h-[38px] rounded-[11px] bg-white/10 flex items-center justify-center hover:bg-accent-500 hover:text-[#1B1400] transition"
    >
      <svg viewBox="0 0 24 24" width="18" height="18" fill={outline ? 'none' : 'currentColor'} stroke={outline ? 'currentColor' : 'none'} strokeWidth={outline ? 2 : 0}>
        {children}
      </svg>
    </a>
  );
}
