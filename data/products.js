export const CATEGORIES = [
  { slug: 'cases', label: 'Телефон қаптары' },
  { slug: 'glass', label: 'Қорғаныш әйнек' },
  { slug: 'cables', label: 'Кабельдер' },
  { slug: 'chargers', label: 'Зарядтағыштар' },
  { slug: 'powerbank', label: 'Power Bank' },
  { slug: 'headphones', label: 'Құлаққаптар' },
  { slug: 'holders', label: 'Автокөлік ұстағыштары' },
  { slug: 'speakers', label: 'Bluetooth колонкалар' },
  { slug: 'smartwatch', label: 'Smart Watch аксессуарлары' },
];

export const CAT_LABELS = CATEGORIES.reduce((acc, c) => {
  acc[c.slug] = c.label;
  return acc;
}, {});

export const PRODUCTS = [
  // ---- Телефон қаптары ----
  { id: 1, cat: 'cases', name: 'Силикон қап MagSafe iPhone 15', price: 6900, old: 9900, desc: 'Магнитті бекітілген жұмсақ силикон қап, соққыдан қорғайды.', isNew: true, rating: 4.7,
    reviews: [
      { name: 'Асем', rating: 5, text: 'Өте сапалы, магниті мықты ұстайды.', date: '2026-05-12' },
      { name: 'Ерлан', rating: 4, text: 'Түсі әдемі, бірақ жеңіл сызылады.', date: '2026-04-02' },
    ] },
  { id: 2, cat: 'cases', name: 'Кожа қап Samsung S24 Ultra', price: 8500, old: null, desc: 'Табиғи былғарыдан жасалған премиум қорғаныш қап.', isNew: false, rating: 4.5,
    reviews: [ { name: 'Данияр', rating: 5, text: 'Қолға жайлы, сапасы жоғары.', date: '2026-03-20' } ] },
  { id: 3, cat: 'cases', name: 'Соққыдан қорғайтын қап iPhone 14', price: 5400, old: 7200, desc: 'Әскери стандартқа сай соққыдан қорғау, мөлдір артқы панель.', isNew: false, rating: 4.3, reviews: [] },

  // ---- Қорғаныш әйнек ----
  { id: 4, cat: 'glass', name: '9D Қорғаныш шыны iPhone 15 Pro', price: 2500, old: 3500, desc: 'Толық экранды жабатын, 9D технологиямен жасалған шыны.', isNew: true, rating: 4.8,
    reviews: [ { name: 'Гүлнара', rating: 5, text: 'Орнату жиынтығымен келді, өте ыңғайлы.', date: '2026-06-01' } ] },
  { id: 5, cat: 'glass', name: 'Privacy шыны Samsung S23', price: 3200, old: null, desc: 'Қоршағандардан экранды жасыратын құпиялылық шынысы.', isNew: false, rating: 4.4, reviews: [] },
  { id: 6, cat: 'glass', name: 'Камера линза қорғанышы (2 дана)', price: 1800, old: 2400, desc: 'Артқы камера линзаларын сызықтардан қорғайтын шыны жиынтығы.', isNew: false, rating: 4.2, reviews: [] },

  // ---- Кабельдер ----
  { id: 7, cat: 'cables', name: 'USB-C to Lightning кабель 1м', price: 3400, old: 4200, desc: 'MFi сертификатталған, жылдам зарядтауды қолдайды.', isNew: false, rating: 4.6,
    reviews: [ { name: 'Марат', rating: 5, text: 'Жылдам зарядтайды, берік өрілген.', date: '2026-05-28' } ] },
  { id: 8, cat: 'cables', name: 'USB-C to USB-C кабель 100W 2м', price: 4100, old: null, desc: 'Ноутбук пен телефонды жылдам зарядтауға арналған қалың кабель.', isNew: true, rating: 4.7, reviews: [] },
  { id: 9, cat: 'cables', name: 'Magnetic 3-in-1 зарядтау кабелі', price: 5200, old: 6900, desc: 'Lightning, USB-C және Micro-USB үшін бір кабель.', isNew: false, rating: 4.1, reviews: [] },

  // ---- Зарядтағыштар ----
  { id: 10, cat: 'chargers', name: '20W USB-C желілік зарядтағыш', price: 4900, old: 6500, desc: 'Fast Charge технологиясы бар ықшам блок зарядтағыш.', isNew: false, rating: 4.5,
    reviews: [ { name: 'Айгерім', rating: 4, text: 'Тез қыздырады, бірақ жұмысын жақсы істейді.', date: '2026-02-14' } ] },
  { id: 11, cat: 'chargers', name: 'MagSafe сымсыз зарядтағыш 15W', price: 9800, old: 12500, desc: 'iPhone үшін магнитті сымсыз жылдам зарядтағыш.', isNew: true, rating: 4.9, reviews: [] },
  { id: 12, cat: 'chargers', name: 'GaN 65W желілік зарядтағыш 3-порт', price: 12900, old: null, desc: 'Ноутбук, планшет және телефонды бір мезгілде зарядтайды.', isNew: true, rating: 4.8, reviews: [] },

  // ---- Power Bank ----
  { id: 13, cat: 'powerbank', name: 'Power Bank 10000mAh Slim', price: 8900, old: 10900, desc: 'Жұқа дизайн, 2 порт, қалтаға оңай сияды.', isNew: false, rating: 4.4,
    reviews: [ { name: 'Бекзат', rating: 4, text: 'Ыңғайлы, толық зарядтайды.', date: '2026-04-19' } ] },
  { id: 14, cat: 'powerbank', name: 'Power Bank 20000mAh Fast Charge', price: 14500, old: 17900, desc: 'Жоғары сыйымдылық, 22.5W жылдам зарядтау қолдауы.', isNew: true, rating: 4.7, reviews: [] },
  { id: 15, cat: 'powerbank', name: 'MagSafe Power Bank 5000mAh', price: 11900, old: null, desc: 'iPhone артына магнитпен бекітілетін ықшам павербанк.', isNew: true, rating: 4.6, reviews: [] },

  // ---- Құлаққаптар ----
  { id: 16, cat: 'headphones', name: 'TWS Bluetooth құлаққап Pro', price: 13900, old: 18900, desc: 'Белсенді шуды басу (ANC) функциясы бар сымсыз құлаққап.', isNew: true, rating: 4.8,
    images: [
  "/images/photo_2026-07-11_14-28-59.jpg",
  "/images/photo_2026-07-11_14-29-10.jpg",
  "/images/photo_2026-07-11_14-29-14.jpg",
  "/images/photo_2026-07-11_14-29-19.jpg",
  "/images/photo_2026-07-11_14-29-23.jpg"
],
   reviews: [
      { name: 'Айдана', rating: 5, text: 'Дыбысы керемет, батареясы ұзақ жұмыс істейді.', date: '2026-06-10' },
      { name: 'Санжар', rating: 4, text: 'Құлаққа жайлы, бірақ қорап сапасы орташа.', date: '2026-05-02' },
    ] },
  { id: 17, cat: 'headphones', name: 'Sport сымсыз құлаққап су өтпейтін', price: 9400, old: 11900, desc: 'IPX7 қорғанышы бар спортқа арналған құлаққап.', isNew: false, rating: 4.3, reviews: [] },
  { id: 18, cat: 'headphones', name: 'Проводной құлаққап Type-C Hi-Res', price: 4200, old: null, desc: 'Жоғары дәлдіктегі дыбыс, микрофонмен жабдықталған.', isNew: false, rating: 4.0, reviews: [] },

  // ---- Автокөлік ұстағыштары ----
  { id: 19, cat: 'holders', name: 'Магнитті автокөлік ұстағышы', price: 5900, old: 7900, desc: 'Желдеткішке бекітілетін күшті магнитті ұстағыш.', isNew: false, rating: 4.5,
    reviews: [ { name: 'Нұрлан', rating: 5, text: 'Мықты ұстайды, орнату оңай.', date: '2026-03-11' } ] },
  { id: 20, cat: 'holders', name: 'Сымсыз зарядтағышы бар ұстағыш', price: 12900, old: 15900, desc: 'Жүру барысында телефонды автоматты зарядтайды.', isNew: true, rating: 4.6, reviews: [] },
  { id: 21, cat: 'holders', name: 'Айна артына ілінетін ұстағыш', price: 4300, old: null, desc: 'Артқы көру айнасына бекітілетін ықшам ұстағыш.', isNew: false, rating: 4.1, reviews: [] },

  // ---- Bluetooth колонкалар ----
  { id: 22, cat: 'speakers', name: 'Портативті Bluetooth колонка Mini', price: 9900, old: 13900, desc: 'Су өтпейтін корпус, 12 сағатқа дейінгі жұмыс уақыты.', isNew: true, rating: 4.7,
    reviews: [ { name: 'Жанар', rating: 5, text: 'Дыбысы қатты әрі таза, жинақы.', date: '2026-05-30' } ] },
  { id: 23, cat: 'speakers', name: 'RGB LED Bluetooth колонка Party', price: 15900, old: 19900, desc: 'Түрлі-түсті жарықтандыруы бар қуатты колонка.', isNew: false, rating: 4.4, reviews: [] },
  { id: 24, cat: 'speakers', name: 'Ықшам магниттелетін мини-колонка', price: 6900, old: null, desc: 'Кез келген металл бетке бекітілетін шағын колонка.', isNew: false, rating: 4.2, reviews: [] },

  // ---- Smart Watch аксессуарлары ----
  { id: 25, cat: 'smartwatch', name: 'Силикон белдік Apple Watch 44mm', price: 3900, old: 5200, desc: 'Тершеңдікке төзімді, ауыстырылатын спорт белдігі.', isNew: false, rating: 4.5, reviews: [] },
  { id: 26, cat: 'smartwatch', name: 'Қорғаныш қаптама Apple Watch', price: 2900, old: null, desc: 'Экран мен корпусты соққыдан қорғайтын бампер.', isNew: true, rating: 4.3, reviews: [] },
  { id: 27, cat: 'smartwatch', name: 'Металл белдік Samsung Watch', price: 7900, old: 9900, desc: 'Тот баспайтын болаттан жасалған премиум белдік.', isNew: false, rating: 4.6,
    reviews: [ { name: 'Тимур', rating: 4, text: 'Сапасы жақсы, бірақ біраз ауыр.', date: '2026-01-22' } ] },
];

export const DELIVERY_FREE_FROM = 20000;
export const DELIVERY_FEE = 1500;

export function getProductById(id) {
  return PRODUCTS.find((p) => p.id === Number(id));
}

export function money(n) {
  return n.toLocaleString('ru-RU').replace(/,/g, ' ') + ' ₸';
}

export function averageRating(reviews, fallback) {
  if (!reviews || !reviews.length) return fallback;
  return Math.round((reviews.reduce((s, r) => s + r.rating, 0) / reviews.length) * 10) / 10;
}
