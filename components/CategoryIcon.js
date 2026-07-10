const PATHS = {
  cases: (
    <>
      <rect x="6" y="2" width="12" height="20" rx="3" />
      <circle cx="12" cy="18.5" r="1" />
      <rect x="9" y="4.2" width="6" height="1.4" rx="0.7" fill="currentColor" stroke="none" />
    </>
  ),
  glass: (
    <>
      <rect x="5" y="2.5" width="14" height="19" rx="3" />
      <path d="M8 6h8M8 9h8" strokeOpacity="0.5" />
    </>
  ),
  cables: (
    <>
      <path d="M6 4v4a4 4 0 0 0 4 4h4a4 4 0 0 1 4 4v4" />
      <circle cx="6" cy="3" r="1.4" fill="currentColor" stroke="none" />
      <circle cx="18" cy="21" r="1.4" fill="currentColor" stroke="none" />
    </>
  ),
  chargers: (
    <>
      <rect x="7" y="2" width="10" height="7" rx="2" />
      <path d="M13 11l-4 6h3l-1 5 5-7h-3l1-4z" fill="currentColor" stroke="none" />
    </>
  ),
  powerbank: (
    <>
      <rect x="5" y="3" width="14" height="18" rx="3" />
      <rect x="9" y="0.5" width="6" height="2.6" rx="1" />
      <path d="M13 8l-3.2 5h2.4L11 18l4.2-6h-2.4z" fill="currentColor" stroke="none" />
    </>
  ),
  headphones: (
    <>
      <path d="M4 14v-2a8 8 0 0 1 16 0v2" />
      <rect x="2.5" y="13" width="4" height="7" rx="1.6" />
      <rect x="17.5" y="13" width="4" height="7" rx="1.6" />
    </>
  ),
  holders: (
    <>
      <path d="M12 22s6-5.7 6-11a6 6 0 0 0-12 0c0 5.3 6 11 6 11z" />
      <rect x="9" y="7.5" width="6" height="8.5" rx="1.3" fill="currentColor" stroke="none" />
    </>
  ),
  speakers: (
    <>
      <rect x="6" y="2" width="12" height="20" rx="4" />
      <circle cx="12" cy="9" r="3" />
      <circle cx="12" cy="17" r="1.4" fill="currentColor" stroke="none" />
    </>
  ),
  smartwatch: (
    <>
      <rect x="7" y="7" width="10" height="10" rx="3" />
      <path d="M9 7V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v3M9 17v3a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1v-3" />
      <path d="M12 10v2l1.3 1.3" />
    </>
  ),
};

export default function CategoryIcon({ category, className = 'w-8 h-8' }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className={className}>
      {PATHS[category] || null}
    </svg>
  );
}
