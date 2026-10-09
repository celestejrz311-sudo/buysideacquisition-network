import { Link } from 'wouter';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageProvider';
import { demoCards, getDemoCard } from '@/data/demo-cards';
import { Eyebrow } from '@/components/site';

export function DemoShowcase() {
  const { lang, t } = useLanguage();

  return (
    <section className="border-b border-[#d8d1c5] bg-[#f5f2eb]">
      <div className="mx-auto max-w-[1280px] px-5 py-12 md:px-10 md:py-16">
        {/* Heading */}
        <div className="max-w-2xl">
          <Eyebrow>{t('dash.showcaseSectionTitle')}</Eyebrow>
          <h2 className="font-editorial mt-4 text-4xl leading-[1.08] tracking-[-.025em] md:text-5xl">
            {t('dash.showcaseHeading')}
          </h2>
          <p className="mt-4 max-w-xl text-[15px] leading-7 text-[#6b665d]">
            {t('dash.showcaseSubheading')}
          </p>
          <p className="mt-3 text-[13px] leading-6 text-[#8a8478]">
            {t('dash.showcaseSupportingCopy')}
          </p>
        </div>

        {/* Demo cards */}
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {demoCards.map((card) => {
            const d = getDemoCard(card, lang);
            return (
              <article
                key={card.id}
                className="flex flex-col border border-[#cfc8bc] bg-[#f8f6f0] p-6"
                data-testid={`card-demo-${card.id}`}
              >
                <div className="flex items-center justify-between">
                  <span className="border border-[#b9a16d] px-2 py-1 font-mono-label text-[9px] tracking-[.14em] text-[#78643a]">
                    {t('dash.demoLabel')}
                  </span>
                </div>
                <p className="mt-4 font-mono-label text-[10px] uppercase tracking-[.14em] text-[#897649]">
                  {d.category}
                </p>
                <h3 className="font-editorial mt-2 text-xl leading-tight">{d.title}</h3>
                <p className="mt-3 flex-1 text-[13px] leading-6 text-[#6b665d]">{d.description}</p>
                <div className="mt-4 border-t border-[#e0d9ce] pt-3 text-[12px] text-[#706b61]">
                  {d.budget && <span>{d.budget} · </span>}
                  <span>{d.location}</span>
                </div>
              </article>
            );
          })}
        </div>

        {/* CTA */}
        <div className="mt-10 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
          <p className="font-editorial text-2xl text-[#38352f]">{t('dash.showcaseCtaText')}</p>
          <Link
            href="/post-request"
            className="inline-flex min-h-12 items-center justify-center gap-2 bg-[#38352f] px-6 text-[12px] uppercase tracking-[.1em] text-[#f5f2eb] transition hover:bg-[#504b40]"
            data-testid="button-showcase-post-request"
          >
            {t('dash.showcaseCtaButton')} <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}
