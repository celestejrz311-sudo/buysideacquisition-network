import { Link } from 'wouter';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageProvider';
import { ButtonLink } from '@/components/site';

export function FinalCta() {
  const { t } = useLanguage();

  return (
    <section className="bg-[#34322d] text-[#f3efe7]">
      <div className="mx-auto max-w-[1280px] px-5 py-16 md:px-10 md:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-editorial text-4xl leading-tight tracking-[-.025em] md:text-5xl">
            {t('home.finalCtaTitle')}
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-[15px] leading-7 text-[#c1bcb2]">
            {t('home.finalCtaBody')}
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <ButtonLink href="/opportunities" className="w-full sm:w-auto" testId="button-final-explore">
              {t('home.ctaExplore')}
            </ButtonLink>
            <Link
              href="/post-request"
              className="inline-flex min-h-12 w-full items-center justify-center gap-2 border border-[#5a574e] px-6 text-[12px] uppercase tracking-[.1em] text-[#f3efe7] transition hover:border-[#827652] sm:w-auto"
              data-testid="button-final-post-need"
            >
              {t('home.ctaPostNeed')} <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
