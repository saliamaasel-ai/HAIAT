# NUR.kz — Телефон аксессуарлары интернет-дүкені

Next.js (Pages Router) + React + Tailwind CSS негізінде жасалған, толық функционалды, қазақ тіліндегі
телефон аксессуарлары интернет-дүкені. Apple стиліндегі минималистік дизайн, көк + сары түс палитрасы,
жылдам әрі мобильді құрылғыларға толық бейімделген.

## Мүмкіндіктер

- Басты бет, Каталог, Акциялар, Біз туралы, Байланыс, Жеткізу және төлем беттері
- 9 категория, 27 тауар (қаптар, әйнектер, кабельдер, зарядтағыштар, Power Bank, құлаққаптар,
  автокөлік ұстағыштары, Bluetooth колонкалар, Smart Watch аксессуарлары)
- Әр тауардың жеке беті: сипаттама, рейтинг, пікірлер, пікір қалдыру формасы
- Себет: сан өзгерту, өшіру, жеткізу ақысын автоматты есептеу, жалпы сома
- Checkout: аты-жөні, телефон, қала, мекенжай, пікір, тапсырысты растау
- Іздеу жүйесі және фильтрлер (баға, категория, жаңалары, арзандағандары)
- Wishlist (Таңдаулылар), Dark/Light Mode ауыстырғышы (localStorage-те сақталады)
- Аккаунт беті (кіру/тіркелу — демо режимде)
- Толық SEO: әр бетте meta title/description, Open Graph, sitemap.xml, robots.txt
- Барлық компоненттер React компоненттеріне бөлінген, Tailwind CSS қолданылған

## Жоба құрылымы

```
nur-store/
├── components/       # Header, Footer, ProductCard, CategoryIcon, StarRating, Seo, Toast
├── context/          # StoreContext.js — себет/таңдаулы/тема глобал стейті
├── data/             # products.js — тауарлар мен категориялар деректері
├── pages/            # Next.js беттері (файл негізді роутинг)
│   ├── product/[id].js
│   ├── index.js, catalog.js, promotions.js, about.js, contact.js,
│   │   delivery.js, cart.js, checkout.js, wishlist.js, account.js
│   ├── _app.js, _document.js, sitemap.xml.js
├── public/           # favicon.svg, robots.txt
├── styles/           # globals.css (Tailwind + CSS айнымалылары)
├── tailwind.config.js
├── next.config.js
└── package.json
```

## Жергілікті іске қосу

```bash
npm install
npm run dev
```

Сайт `http://localhost:3000` мекенжайында ашылады.

## Production build тексеру

```bash
npm run build
npm run start
```

## Vercel-ге жүктеу

### Нұсқа 1 — Vercel CLI арқылы

```bash
npm i -g vercel
vercel
```

Сұрақтарға жауап беріңіз (жоба атын растаңыз), содан кейін:

```bash
vercel --prod
```

### Нұсқа 2 — GitHub арқылы (ұсынылады)

1. Осы жобаны жаңа GitHub репозиторийіне жүктеңіз:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin <репозиторий-URL>
   git push -u origin main
   ```
2. [vercel.com](https://vercel.com) сайтына кіріп, "Add New Project" басыңыз.
3. GitHub репозиторийіңізді таңдаңыз — Vercel Next.js жобасын автоматты анықтайды.
4. "Deploy" батырмасын басыңыз. Ешқандай қосымша баптау қажет емес.

Деплой аяқталған соң сайт `https://<жоба-аты>.vercel.app` мекенжайында бірден қолжетімді болады.

## Ескертпелер

- Деректер қоры/бэкенд қосылмаған — тауарлар `data/products.js` файлында сақталған (демо деректер).
  Нақты дүкен үшін оны CMS немесе API-мен ауыстыруға болады.
- Себет, таңдаулылар, тема және аккаунт мәліметтері браузердің `localStorage`-інде сақталады.
- Тапсырыс беру (checkout) демо режимде жұмыс істейді — нақты төлем интеграциясы (Kaspi Pay, Stripe
  және т.б.) қосылмаған.
- Барлық тауар суреттерінің орнына SVG иконкалар қолданылған (жылдамдық пен PageSpeed көрсеткішін
  жақсарту үшін); қаласаңыз, `components/CategoryIcon.js` файлын нақты суреттерге ауыстыруға болады.
