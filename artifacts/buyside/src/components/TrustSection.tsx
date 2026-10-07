import { ShieldCheck, LockKeyhole, Eye, Handshake } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageProvider';
import { Eyebrow } from '@/components/site';

export function TrustSection() {
  const { t } = useLanguage();

  const pillars = [
    { icon: ShieldCheck, label: t('home.trustVerified'), desc: t('home.trustVerifiedDesc') },
    { icon: LockKeyhole, label: t('home.trustPrivateInfo'), desc: t('home.trustPrivateDesc') },
    { icon: Eye, label: t('home.trustQualified'), desc: t('home.trustQualifiedDesc') },
    { icon: Handshake, label: t('home.trustControlled'), desc: t('home.trustControlledDesc') },
  ];

  return (
    <section className="border-y border-[#d8d1c5] bg-[#34322d] text-[#f3efe7]">
      <div className="mx-auto max-w-[1280px] px-5 py-16 md:px-10 md:py-24">
        <div className="max-w-2xl">
          <Eyebrow light>{t('home.trustEyebrow')}</Eyebrow>
          <h2 className="font-editorial mt-5 text-4xl leading-tight tracking-[-.025em] md:text-5xl">
            {t('home.trustTitle')}
          </h2>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {pillars.map(({ icon: Icon, label, desc }) => (
            <div key={label} className="border border-[#5a574e] p-6">
              <Icon size={24} className="text-[#b9a16d]" strokeWidth={1.5} />
              <h3 className="font-editorial mt-4 text-xl">{label}</h3>
              <p className="mt-3 text-[13px] leading-6 text-[#c1bcb2]">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
