import Seo from '@/components/Seo';
import CategoryIcon from '@/components/CategoryIcon';
import { Breadcrumb } from './catalog';

export default function About() {
  return (
    <div className="page-enter max-w-[1280px] mx-auto px-6 py-10">
      <Seo title="Біз туралы" path="/about" description="NUR.kz — 2019 жылдан бері телефон аксессуарларын жеткізіп келе жатқан сенімді интернет-дүкен." />
      <Breadcrumb items={[{ label: 'Басты бет', href: '/' }, { label: 'Біз туралы' }]} />

      <div className="grid md:grid-cols-2 gap-10 items-center mb-14">
        <div>
          <span className="eyebrow">2019 жылдан бері</span>
          <h2 className="text-[26px] md:text-[38px] font-extrabold mb-4">
            NUR.kz — телефон аксессуарлары бойынша сенімді серіктес
          </h2>
          <p className="text-dim text-[15px] leading-[1.8]">
            Біз 2019 жылдан бері Қазақстан бойынша телефон аксессуарларын жеткіземіз. Мақсатымыз — әр
            клиентке сапалы өнімді қолжетімді бағамен, жылдам әрі ыңғайлы түрде жеткізу. Бүгінде бізде
            27-ден астам түрлі санаттағы тауарлар және мыңдаған қанағаттанған тұтынушылар бар.
          </p>
        </div>
        <div className="flex items-center justify-center">
          <div className="w-full max-w-[340px] aspect-square rounded-[32px] bg-gradient-to-br from-brand-100 to-accent-100 flex items-center justify-center">
            <CategoryIcon category="smartwatch" className="w-[40%] h-[40%] text-brand-600" />
          </div>
        </div>
      </div>

      <div className="grid sm:grid-cols-3 gap-5">
        <Value emoji="🎯" title="Миссиямыз" desc="Әр адамға сапалы аксессуарды қолжетімді ету." />
        <Value emoji="✅" title="Сапа кепілдігі" desc="Барлық тауар тексеруден өтеді, 30 күн қайтару." />
        <Value emoji="🚀" title="Жылдамдық" desc="Тапсырыс 1-2 күн ішінде жеткізіледі." />
      </div>
    </div>
  );
}

function Value({ emoji, title, desc }) {
  return (
    <div className="card p-6">
      <h4 className="font-bold mb-2">{emoji} {title}</h4>
      <p className="text-dim text-[13.5px]">{desc}</p>
    </div>
  );
}
