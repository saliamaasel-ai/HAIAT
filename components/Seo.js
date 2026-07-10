import Head from 'next/head';

const SITE_NAME = 'NUR.kz';
const SITE_URL = 'https://nur-kz-store.vercel.app';

export default function Seo({
  title,
  description = 'NUR.kz — Қазақстандағы телефон аксессуарларының №1 интернет-дүкені. Қаптар, зарядтағыштар, құлаққаптар, Power Bank және т.б.',
  path = '/',
  image = '/og-image.png',
}) {
  const fullTitle = title ? `${title} | ${SITE_NAME}` : `${SITE_NAME} — Телефон аксессуарлары дүкені`;
  const url = `${SITE_URL}${path}`;
  return (
    <Head>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
      <link rel="canonical" href={url} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={`${SITE_URL}${image}`} />
      <meta property="og:locale" content="kk_KZ" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
    </Head>
  );
}
