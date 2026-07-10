import { useStore } from '@/context/StoreContext';

export default function Toast() {
  const { toast } = useStore();
  return (
    <div
      className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-[999] px-5 py-3.5 rounded-2xl text-sm font-bold shadow-card transition-transform duration-300 ${
        toast ? 'translate-y-0' : 'translate-y-[140%]'
      }`}
      style={{ background: 'var(--text)', color: 'var(--bg)' }}
    >
      {toast}
    </div>
  );
}
