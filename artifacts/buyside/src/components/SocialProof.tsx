import { useLanguage } from '@/i18n/LanguageProvider';
import { Eyebrow } from '@/components/site';

/**
 * Social proof section — hidden until real data is available.
 * No fake numbers, names, or testimonials are shown.
 * When real metrics exist, set HAS_DATA to true and pass the values.
 */
const HAS_DATA = false;

export function SocialProof() {
  const { t } = useLanguage();

  if (!HAS_DATA) return null;

  return (
    <section className="border-b border-[#d8d1c5] bg-[#f5f2eb]">
      <div className="mx-auto max-w-[1280px] px-5 py-16 md:px-10 md:py-24">
        <div className="max-w-2xl">
          <Eyebrow>{t('home.socialEyebrow')}</Eyebrow>
          <h2 className="font-editorial mt-4 text-4xl leading-tight tracking-[-.025em] md:text-5xl">
            {t('home.socialTitle')}
          </h2>
        </div>
        {/* Metrics and testimonials will render here when real data is available */}
      </div>
    </section>
  );
}
