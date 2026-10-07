import { Link } from 'wouter';
import { ArrowRight, Check } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageProvider';
import { Eyebrow } from '@/components/site';

const tiers = [
  { key: 'home.planFree', price: '$0' },
  { key: 'home.planBuyerPro', price: '$79' },
  { key: 'home.planProfessional', price: '$149' },
  { key: 'home.planPrivateNetwork', price: '$299' },
] as const;

export function MembershipPreview() {
  const { t } = useLanguage();

  return (
    <section className="border-b border-[#d8d1c5] bg-[#f5f2eb]">
      <div className="mx-auto max-w-[1280px] px-5 py-16 md:px-10 md:py-24">
        <div className="max-w-2xl">
          <Eyebrow>{t('home.membershipEyebrow')}</Eyebrow>
          <h2 className="font-editorial mt-4 text-4xl leading-tight tracking-[-.025em] md:text-5xl">
            {t('home.membershipTitle')}
          </h2>
          <p className="mt-5 max-w-xl text-[15px] leading-7 text-[#6b665d]">
            {t('home.membershipBody')}
          </p>
        </div>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {tiers.map((tier) => (
            <div key={tier.key} className="border border-[#cfc8bc] bg-[#f8f6f0] p-6">
              <div className="flex items-baseline justify-between">
                <p className="font-editorial text-xl">{t(tier.key)}</p>
                <p className="font-editorial text-2xl text-[#897649]">{tier.price}<span className="text-[12px] text-[#918a7c]">/mo</span></p>
              </div>
              <div className="mt-4 flex items-center gap-2 border-t border-[#e0d9ce] pt-3 text-[12px] text-[#706b61]">
                <Check size={14} className="text-[#b9a16d]" />
                <span>{tier.price === '$0' ? t('home.ctaExplore') : t('home.trustQualified')}</span>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-8">
          <Link
            href="/pricing"
            className="inline-flex min-h-12 items-center gap-2 bg-[#38352f] px-6 text-[12px] uppercase tracking-[.1em] text-[#f5f2eb] transition hover:bg-[#504b40]"
            data-testid="link-membership-view-plans"
          >
            {t('home.membershipCta')} <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}
