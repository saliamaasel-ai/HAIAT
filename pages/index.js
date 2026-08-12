import Link from 'next/link';
import Seo from '@/components/Seo';
import CategoryIcon from '@/components/CategoryIcon';
import ProductCard from '@/components/ProductCard';
import { StarRating } from '@/components/StarRating';
import { CATEGORIES } from '@/data/products';
import { useStore } from '@/context/StoreContext';

export default function Home() {
  const { products } = useStore();
  const featured = products.filter((p) => p.isNew).slice(0, 4);
  const sale = products.filter((p) => p.old).slice(0, 4);
