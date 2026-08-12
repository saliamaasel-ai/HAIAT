import { supabase } from './supabaseClient';
import { CATEGORIES } from '@/data/products';

const LABEL_TO_SLUG = CATEGORIES.reduce((acc, c) => {
  acc[c.label] = c.slug;
  return acc;
}, {});

function mapRow(row) {
  const images = Array.isArray(row.image_urls) && row.image_urls.length
    ? row.image_urls
    : (row.image_url ? [row.image_url] : []);

  return {
    id: row.id,
    cat: LABEL_TO_SLUG[row.category] || 'cases',
    name: row.name || '',
    price: row.price || 0,
    old: null,
    desc: row.description || '',
    isNew: false,
    rating: 5,
    images,
    reviews: [],
  };
}

export async function fetchProducts() {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .order('created_at', { ascending: false });

  if (error || !data) return [];
  return data.map(mapRow);
}
