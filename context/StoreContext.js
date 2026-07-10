import { createContext, useContext, useEffect, useState, useCallback, useMemo } from 'react';
import { PRODUCTS, DELIVERY_FEE, DELIVERY_FREE_FROM } from '@/data/products';

const StoreContext = createContext(null);

function safeParse(json, fallback) {
  try {
    const v = JSON.parse(json);
    return v ?? fallback;
  } catch {
    return fallback;
  }
}

export function StoreProvider({ children }) {
  const [cart, setCart] = useState({});
  const [wishlist, setWishlist] = useState([]);
  const [theme, setTheme] = useState('light');
  const [account, setAccount] = useState(null);
  const [toast, setToast] = useState(null);
  const [hydrated, setHydrated] = useState(false);

  // Load persisted state on first mount (client only)
  useEffect(() => {
    if (typeof window === 'undefined') return;
    setCart(safeParse(localStorage.getItem('nur_cart'), {}));
    setWishlist(safeParse(localStorage.getItem('nur_wishlist'), []));
    setAccount(safeParse(localStorage.getItem('nur_account'), null));
    const savedTheme = localStorage.getItem('nur_theme') || 'light';
    setTheme(savedTheme);
    document.documentElement.classList.toggle('dark', savedTheme === 'dark');
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem('nur_cart', JSON.stringify(cart));
  }, [cart, hydrated]);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem('nur_wishlist', JSON.stringify(wishlist));
  }, [wishlist, hydrated]);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem('nur_account', JSON.stringify(account));
  }, [account, hydrated]);

  const showToast = useCallback((msg) => {
    setToast(msg);
    window.clearTimeout(window.__toastTimer);
    window.__toastTimer = window.setTimeout(() => setToast(null), 2200);
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => {
      const next = prev === 'light' ? 'dark' : 'light';
      document.documentElement.classList.toggle('dark', next === 'dark');
      localStorage.setItem('nur_theme', next);
      return next;
    });
  }, []);

  const addToCart = useCallback((id, qty = 1) => {
    setCart((prev) => ({ ...prev, [id]: (prev[id] || 0) + qty }));
    const p = PRODUCTS.find((x) => x.id === id);
    showToast(`✅ "${p?.name}" себетке қосылды`);
  }, [showToast]);

  const setQty = useCallback((id, qty) => {
    setCart((prev) => {
      const next = { ...prev };
      if (qty <= 0) delete next[id];
      else next[id] = qty;
      return next;
    });
  }, []);

  const removeFromCart = useCallback((id) => {
    setCart((prev) => {
      const next = { ...prev };
      delete next[id];
      return next;
    });
  }, []);

  const clearCart = useCallback(() => setCart({}), []);

  const toggleWishlist = useCallback((id) => {
    setWishlist((prev) => {
      if (prev.includes(id)) return prev.filter((x) => x !== id);
      showToast('❤️ Таңдаулыларға қосылды');
      return [...prev, id];
    });
  }, [showToast]);

  const cartCount = useMemo(() => Object.values(cart).reduce((a, b) => a + b, 0), [cart]);
  const cartSubtotal = useMemo(
    () => Object.entries(cart).reduce((s, [id, q]) => {
      const p = PRODUCTS.find((x) => x.id === Number(id));
      return s + (p ? p.price * q : 0);
    }, 0),
    [cart]
  );
  const deliveryFee = useMemo(() => {
    if (cartSubtotal === 0) return 0;
    return cartSubtotal >= DELIVERY_FREE_FROM ? 0 : DELIVERY_FEE;
  }, [cartSubtotal]);
  const cartTotal = cartSubtotal + deliveryFee;

  const addReview = useCallback((productId, review) => {
    const p = PRODUCTS.find((x) => x.id === productId);
    if (!p) return;
    p.reviews.unshift(review);
    p.rating = Math.round((p.reviews.reduce((s, r) => s + r.rating, 0) / p.reviews.length) * 10) / 10;
  }, []);

  const value = {
    cart, setQty, addToCart, removeFromCart, clearCart, cartCount, cartSubtotal, deliveryFee, cartTotal,
    wishlist, toggleWishlist,
    theme, toggleTheme,
    account, setAccount,
    toast, showToast,
    addReview,
    hydrated,
  };

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error('useStore must be used within StoreProvider');
  return ctx;
}
