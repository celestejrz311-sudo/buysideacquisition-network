import { Link } from 'wouter';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageProvider';
import { Eyebrow } from '@/components/site';

type FeaturedItem = {
  id: string;
  category: { en: string; es: string };
  title: { en: string; es: string };
  description: { en: string; es: string };
  location: { en: string; es: string };
  isRequest?: boolean;
};

const featuredItems: FeaturedItem[] = [
  {
    id: 'feat-hvac',
    category: { en: 'Business for Sale', es: 'Negocio en Venta' },
    title: { en: 'Central Florida HVAC Contractor', es: 'Contratista HVAC de Florida Central' },
    description: {
      en: 'Established residential and light-commercial HVAC company with recurring service contracts and a trained technician team.',
      es: 'Empresa HVAC residencial y comercial ligero establecida con contratos de servicio recurrentes y un equipo de técnicos capacitados.',
    },
    location: { en: 'Orlando, FL', es: 'Orlando, FL' },
  },
  {
    id: 'feat-cleaning',
    category: { en: 'Business for Sale', es: 'Negocio en Venta' },
    title: { en: 'Commercial Janitorial Services', es: 'Servicios de Limpieza Comercial' },
    description: {
      en: 'South Florida janitorial operator serving office, medical, and light-industrial sites with recurring contracts.',
      es: 'Operador de limpieza del sur de Florida que sirve sitios de oficinas, médicos e industriales ligeros con contratos recurrentes.',
    },
    location: { en: 'Fort Lauderdale, FL', es: 'Fort Lauderdale, FL' },
  },
  {
    id: 'feat-hospitality',
    category: { en: 'Product Sourcing', es: 'Búsqueda de Productos' },
    title: { en: 'Hospitality Furniture Supplier', es: 'Proveedor de Mobiliario para Hospitalidad' },
    description: {
      en: 'Looking for a U.S. supplier of premium furniture for hospitality projects across Florida.',
      es: 'Buscando un proveedor en EE.UU. de mobiliario premium para proyectos de hospitalidad en Florida.',
    },
    location: { en: 'South Florida', es: 'Sur de Florida' },
    isRequest: true,
  },
  {
    id: 'feat-buyer-miami',
    category: { en: 'Buyer Request', es: 'Solicitud de Comprador' },
    title: { en: 'Buyer for Miami Service Business', es: 'Comprador para Empresa de Servicios en Miami' },
    description: {
      en: 'Seeking qualified buyers for an established Miami-based service company with strong cash flow.',
      es: 'Buscando compradores calificados para una empresa de servicios establecida en Miami con buen flujo de caja.',
    },
    location: { en: 'Miami, FL', es: 'Miami, FL' },
    isRequest: true,
  },
];

export function FeaturedOpportunities() {
  const { lang, t } = useLanguage();

  return (
    <section className="border-b border-[#d8d1c5] bg-[#f5f2eb]">
      <div className="mx-auto max-w-[1280px] px-5 py-12 md:px-10 md:py-16">
        <div className="max-w-2xl">
          <Eyebrow>{t('home.featuredEyebrow')}</Eyebrow>
          <h2 className="font-editorial mt-4 text-4xl leading-[1.08] tracking-[-.025em] md:text-5xl">
            {t('home.featuredTitle')}
          </h2>
          <p className="mt-4 max-w-xl text-[15px] leading-7 text-[#6b665d]">
            {t('home.featuredSub')}
          </p>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {featuredItems.map((item) => (
            <article
              key={item.id}
              className="flex flex-col border border-[#cfc8bc] bg-[#f8f6f0] p-6"
              data-testid={`card-featured-${item.id}`}
            >
              {!item.isRequest && <span className="inline-flex w-fit border border-[#b9a16d] px-2 py-1 font-mono-label text-[9px] tracking-[.14em] text-[#78643a]">{t('home.sampleLabel')}</span>}
              <p className="mt-4 font-mono-label text-[10px] uppercase tracking-[.14em] text-[#897649]">
                {item.category[lang]}
              </p>
              <h3 className="font-editorial mt-2 text-xl leading-tight">{item.title[lang]}</h3>
              <p className="mt-3 flex-1 text-[13px] leading-6 text-[#6b665d]">{item.description[lang]}</p>
              <div className="mt-4 border-t border-[#e0d9ce] pt-3 text-[12px] text-[#706b61]">
                {item.location[lang]}
              </div>
            </article>
          ))}
        </div>

        <div className="mt-8">
          <Link
            href="/opportunities"
            className="inline-flex min-h-12 items-center gap-2 border border-[#bdb5a6] px-6 text-[12px] uppercase tracking-[.1em] text-[#38352f] transition hover:border-[#827652]"
            data-testid="link-view-all-opportunities"
          >
            {t('home.viewAllOpportunities')} <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}
