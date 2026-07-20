import Link from 'next/link';
import { useRouter } from 'next/router';
import CategoryIcon from './CategoryIcon';
import { StarRating } from './StarRating';
import { money, CAT_LABELS } from '@/data/products';
import { useStore } from '@/context/StoreContext';

const ICON_BG = {
  cases: 'from-brand-100 to-accent-100',
  glass: 'from-[#E7EFFE] to-[#EAF6FF]',
  cables: 'from-accent-100 to-[#FFF9E6]',
  chargers: 'from-brand-100 to-[#EDEBFF]',
  powerbank: 'from-[#FFF4D6] to-[#FFE9C2]',
  headphones: 'from-[#E7EFFE] to-[#DCE7FE]',
  holders: 'from-[#EAF6FF] to-brand-100',
  speakers: 'from-[#FFF4D6] to-[#FFF0BF]',
  smartwatch: 'from-brand-100 to-[#FFF4D6]',
};

export default function ProductCard({ product }) {
  const router = useRouter();
  const { wishlist, toggleWishlist, addToCart } = useStore();
  const isWished = wishlist.includes(product.id);
  const discount = product.old ? Math.round((1 - product.price / product.old) * 100) : 0;

  return (
    <div className="card overflow-hidden flex flex-col transition-transform hover:-translate-y-1.5 hover:shadow-card">
      <div className={`relative aspect-square flex items-center justify-center bg-gradient-to-br ${ICON_BG[product.cat]}`}>
        <div className="absolute top-2.5 left-2.5 flex gap-1.5 z-10">
          {product.isNew && <span className="tag tag-new">Жаңа</span>}
          {discount > 0 && <span className="tag tag-sale">-{discount}%</span>}
        </div>
        <button
          onClick={() => toggleWishlist(product.id)}
          aria-label="Таңдаулыға қосу"
          className="absolute top-2.5 right-2.5 z-10 w-9 h-9 rounded-full bg-white/70 dark:bg-black/40 backdrop-blur flex items-center justify-center hover:scale-110 transition"
        >
          <svg viewBox="0 0 24 24" width="17" height="17" fill={isWished ? '#EF4444' : 'none'} stroke={isWished ? '#EF4444' : 'currentColor'} strokeWidth="2">
            <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8z" />
          </svg>
        </button>
        <Link href={`/product/${product.id}`} className="w-full h-full flex items-center justify-center">
          {product.images?.[0] ? (
            <img
              src={product.images[0]}
              alt={product.name}
              className="w-full h-full object-contain p-4"
            />
          ) : (
            <CategoryIcon category={product.cat} className="w-[46%] h-[46%] text-brand-600" />
          )}
        </Link>
      </div>
      <div className="p-4 flex flex-col gap-2 flex-1">
        <span className="text-[11.5px] font-bold text-brand-600 uppercase tracking-wide">{CAT_LABELS[product.cat]}</span>
        <Link href={`/product/${product.id}`} className="text-[15px] font-bold leading-snug hover:text-brand-600">
          {product.name}
        </Link>
        <p className="text-[12.5px] text-dim flex-1">{product.desc}</p>
        <div className="flex items-center gap-1.5 text-xs text-dim">
          <StarRating rating={product.rating} /> <span>{product.rating} ({product.reviews.length})</span>
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-lg font-extrabold font-display">{money(product.price)}</span>
          {product.old && <span className="text-[13px] text-dim line-through">{money(product.old)}</span>}
        </div>
        <div className="flex gap-2 mt-1">
          <button onClick={() => addToCart(product.id)} className="btn-ghost flex-1 !px-2 text-[12.5px]">Себетке қосу</button>
          <button
            onClick={() => { addToCart(product.id); router.push('/checkout'); }}
            className="btn-accent flex-1 !px-2 text-[12.5px]"
          >
            Қазір сатып алу
          </button>
        </div>
      </div>
    </div>
  );
}
