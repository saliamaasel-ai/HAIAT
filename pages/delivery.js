import Seo from '@/components/Seo';
import { Breadcrumb } from './catalog';
import { money, DELIVERY_FEE, DELIVERY_FREE_FROM } from '@/data/products';

export default function Delivery() {
  return (
    <div className="page-enter max-w-[1280px] mx-auto px-6 py-10">
      <Seo title="Жеткізу және төлем" path="/delivery" description="NUR.kz дүкенінде жеткізу мерзімдері, тәсілдері және төлем әдістері туралы толық ақпарат." />
      <Breadcrumb items={[{ label: 'Басты бет', href: '/' }, { label: 'Жеткізу және төлем' }]} />
      <div className="mb-9">
        <h2 className="text-[24px] md:text-[34px] font-extrabold">Жеткізу және төлем</h2>
        <p className="text-dim mt-1.5 text-[15px]">Тапсырысыңыз қалай жеткізіледі және қалай төлеуге болады</p>
      </div>

      <h4 className="font-bold mb-4">Жеткізу қалай жүреді</h4>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
        <Step n="1" title="Тапсырыс беру" desc="Сайттан тауарды таңдап, себетке қосыңыз." />
        <Step n="2" title="Растау" desc="Менеджер қоңырау шалып тапсырысты растайды." />
        <Step n="3" title="Жіберу" desc="Тауар курьер немесе пошта арқылы жіберіледі." />
        <Step n="4" title="Жеткізу" desc="1-5 күн ішінде мекенжайыңызға жеткіземіз." />
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
        <FeatureRow emoji="🚗" title="Алматы қаласы" desc={`1-2 жұмыс күні, ${money(DELIVERY_FEE)} немесе ${money(DELIVERY_FREE_FROM)}+ тегін`} />
        <FeatureRow emoji="📦" title="Қазақстан бойынша" desc="3-5 жұмыс күні, Казпошта/CDEK арқылы" />
        <FeatureRow emoji="🏪" title="Дүкеннен алу" desc="Алматы қ., Абай даңғылы 10 мекенжайынан тегін" />
        <FeatureRow emoji="↩️" title="Қайтару" desc="30 күн ішінде тегін қайтару кепілдігі" />
      </div>

      <h4 className="font-bold mb-4">Төлем тәсілдері</h4>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {['💳 Банк картасы', '📱 Kaspi Pay', '💵 Қолма-қол (жеткізу кезінде)', '🏦 Kaspi Gold', '📄 Онлайн шот (В2В)', '🎁 Бонус баллдар'].map((t) => (
          <div key={t} className="card p-4 text-center font-bold text-[13.5px]">{t}</div>
        ))}
      </div>
    </div>
  );
}

function Step({ n, title, desc }) {
  return (
    <div className="card p-5">
      <div className="text-[26px] font-extrabold font-display text-brand-600 mb-2.5">{n}</div>
      <h5 className="font-bold mb-1.5">{title}</h5>
      <p className="text-dim text-[13px]">{desc}</p>
    </div>
  );
}

function FeatureRow({ emoji, title, desc }) {
  return (
    <div className="card p-5 flex gap-3.5 items-start">
      <div className="text-xl shrink-0">{emoji}</div>
      <div>
        <h5 className="text-[14.5px] font-extrabold mb-1">{title}</h5>
        <p className="text-[12.5px] text-dim">{desc}</p>
      </div>
    </div>
  );
}
