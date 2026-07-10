import { PRODUCTS } from '@/data/products';

const SITE_URL = 'https://nur-kz-store.vercel.app';

function generateSiteMap() {
  const staticRoutes = [
    '', 'catalog', 'promotions', 'about', 'contact', 'delivery', 'cart', 'checkout', 'wishlist', 'account',
  ];
  const productRoutes = PRODUCTS.map((p) => `product/${p.id}`);
  const all = [...staticRoutes, ...productRoutes];

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${all.map((route) => `
  <url>
    <loc>${SITE_URL}/${route}</loc>
    <changefreq>daily</changefreq>
    <priority>${route === '' ? '1.0' : '0.7'}</priority>
  </url>`).join('')}
</urlset>`;
}

export async function getServerSideProps({ res }) {
  const sitemap = generateSiteMap();
  res.setHeader('Content-Type', 'text/xml');
  res.write(sitemap);
  res.end();
  return { props: {} };
}

export default function SiteMap() {
  return null;
}
