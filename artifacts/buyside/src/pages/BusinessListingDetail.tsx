import { useEffect, useState } from 'react';
import { Link, useRoute } from 'wouter';
import { ArrowLeft, MapPin, Award, Check } from 'lucide-react';
import { PublicLayout, Eyebrow } from '@/components/site';
import { useLanguage } from '@/i18n/LanguageProvider';
import { useSeo } from '@/hooks/useSeo';
import { ReferBuyerModal } from '@/components/ReferBuyerModal';

type Listing = {
  id: string;
  title: string;
  description: string;
  category: string;
  location: string;
  askingPrice: number;
  annualRevenue: number;
  finderFee: number;
  isSample: boolean;
  isApproved: boolean;
};

const money = (v: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(v);

const gradients: Record<string, string> = {
  'Cleaning Services': 'linear-gradient(135deg, #2d4a3e, #1a3a2e)',
  'Events & Hospitality': 'linear-gradient(135deg, #4a3d2d, #3a2d1a)',
  'Beauty & Wellness': 'linear-gradient(135deg, #4a2d3e, #3a1a2e)',
  'E-Commerce': 'linear-gradient(135deg, #2d3a4a, #1a2a3a)',
};

export function BusinessListingDetail() {
  const [, params] = useRoute('/listings/:id');
  const id = params?.id || '';
  const { t } = useLanguage();
  useSeo('home');
  const [listing, setListing] = useState<Listing | null>(null);
  const [loading, setLoading] = useState(true);
  const [showReferral, setShowReferral] = useState(false);

  useEffect(() => {
    fetch(`/api/business-listings/${id}`)
      .then(r => r.ok ? r.json() : null)
      .then(data => { setListing(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, [id]);

  if (loading) return <PublicLayout><div className="mx-auto max-w-4xl px-5 py-20 text-sm text-[#6b665d]">Loading…</div></PublicLayout>;
  if (!listing) return <PublicLayout><div className="mx-auto max-w-4xl px-5 py-20"><Link href="/" className="inline-flex items-center gap-2 text-xs uppercase tracking-wider text-[#716956]"><ArrowLeft size={14} /> {t('listings.backHome')}</Link><p className="mt-8 text-sm text-[#6b665d]">{t('listings.notFound')}</p></div></PublicLayout>;

  return (
    <PublicLayout>
      <div className="mx-auto max-w-[1100px] px-5 py-10 md:px-10 md:py-16">
        <Link href="/" className="inline-flex items-center gap-2 text-xs uppercase tracking-wider text-[#716956]"><ArrowLeft size={14} /> {t('listings.backHome')}</Link>

        {listing.isSample && (
          <div className="mt-6 inline-flex items-center gap-2 border border-[#b9a16d] bg-[#f5efe0] px-3 py-1.5">
            <span className="font-mono-label text-[9px] uppercase tracking-[.12em] text-[#78643a]">{t('listings.sampleLabel')}</span>
          </div>
        )}

        {/* Hero image */}
        <div
          className="mt-6 h-48 overflow-hidden md:h-72"
          style={{ background: gradients[listing.category] || 'linear-gradient(135deg, #3a3a3a, #2a2a2a)' }}
        >
          <div className="h-full w-full opacity-30" style={{ backgroundImage: 'radial-gradient(circle at 70% 30%, rgba(185,161,109,.3), transparent 60%)' }} />
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_320px]">
          <article>
            <Eyebrow>{listing.category}</Eyebrow>
            <h1 className="font-editorial mt-4 text-4xl leading-tight tracking-[-.025em] md:text-6xl">{listing.title}</h1>
            <p className="mt-3 flex items-center gap-2 text-sm text-[#706b61]"><MapPin size={14} /> {listing.location}</p>
            <p className="mt-6 text-[15px] leading-7 text-[#625d53]">{listing.description}</p>

            {/* Finder's Fee badge */}
            <div className="mt-6 inline-flex items-center gap-2 border border-[#b9a16d] bg-[#f5efe0] px-4 py-2.5">
              <Award size={18} className="text-[#b9a16d]" />
              <span className="font-mono-label text-[10px] uppercase tracking-[.14em] text-[#8c794d]">{t('listings.finderFee')}</span>
              <span className="text-lg font-bold text-[#b9a16d]">{money(listing.finderFee)}</span>
            </div>

            {listing.isSample && (
              <div className="mt-6 border-l-2 border-[#b9a16d] bg-[#eeebe3] p-4 text-[12px] leading-6 text-[#625d53]">
                {t('listings.sampleDisclaimer')}
              </div>
            )}
          </article>

          <aside className="lg:pt-14">
            <div className="border border-[#d4cdc1] bg-[#f8f6f0] p-5">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="font-mono-label text-[9px] uppercase tracking-[.14em] text-[#8c8475]">{t('listings.askingPrice')}</div>
                  <div className="mt-1 font-editorial text-2xl">{money(listing.askingPrice)}</div>
                </div>
                <div>
                  <div className="font-mono-label text-[9px] uppercase tracking-[.14em] text-[#8c8475]">{t('listings.annualRevenue')}</div>
                  <div className="mt-1 font-editorial text-2xl">{money(listing.annualRevenue)}</div>
                </div>
              </div>
              <button
                onClick={() => setShowReferral(true)}
                className="mt-5 flex h-12 w-full items-center justify-center gap-2 bg-[#38352f] text-xs uppercase tracking-wider text-[#f5f2eb] transition hover:bg-[#504b40]"
              >
                {t('listings.referBuyer')}
              </button>
            </div>
          </aside>
        </div>
      </div>

      {showReferral && listing && (
        <ReferBuyerModal listing={listing} onClose={() => setShowReferral(false)} />
      )}
    </PublicLayout>
  );
}
