import { useEffect, useState } from 'react';
import { Link } from 'wouter';
import { ArrowRight, MapPin, DollarSign, TrendingUp, Award } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageProvider';
import { Eyebrow } from '@/components/site';
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
};

const money = (v: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(v);

// Category-based gradient backgrounds for sample listing cards
const gradients: Record<string, string> = {
  'Cleaning Services': 'linear-gradient(135deg, #2d4a3e, #1a3a2e)',
  'Events & Hospitality': 'linear-gradient(135deg, #4a3d2d, #3a2d1a)',
  'Beauty & Wellness': 'linear-gradient(135deg, #4a2d3e, #3a1a2e)',
  'E-Commerce': 'linear-gradient(135deg, #2d3a4a, #1a2a3a)',
};

export function BusinessOpportunities() {
  const { t } = useLanguage();
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);
  const [referralListing, setReferralListing] = useState<Listing | null>(null);

  useEffect(() => {
    fetch('/api/business-listings')
      .then(r => r.json())
      .then(data => { setListings(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  return (
    <section className="border-y border-[#d8d1c5] bg-[#ebe7dd]">
      <div className="mx-auto max-w-[1280px] px-5 py-12 md:px-10 md:py-20">
        <div className="max-w-2xl">
          <Eyebrow>{t('listings.eyebrow')}</Eyebrow>
          <h2 className="font-editorial mt-4 text-4xl leading-[1.08] tracking-[-.025em] md:text-5xl">{t('listings.title')}</h2>
          <p className="mt-5 max-w-xl text-[15px] leading-7 text-[#6b665d]">{t('listings.subtitle')}</p>
        </div>

        {loading ? (
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 4 }, (_, i) => (
              <div key={i} className="h-[360px] animate-pulse border border-[#cfc8bc] bg-[#f8f6f0]" />
            ))}
          </div>
        ) : (
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {listings.map(listing => (
              <article
                key={listing.id}
                className="group flex flex-col overflow-hidden border border-[#cfc8bc] bg-[#f8f6f0] transition-colors hover:border-[#a58f5c]"
              >
                {/* Image area */}
                <div
                  className="relative h-32 overflow-hidden"
                  style={{ background: gradients[listing.category] || 'linear-gradient(135deg, #3a3a3a, #2a2a2a)' }}
                >
                  <div className="absolute inset-0 opacity-30" style={{ backgroundImage: 'radial-gradient(circle at 70% 30%, rgba(185,161,109,.3), transparent 60%)' }} />
                  <span className="absolute bottom-3 right-3 font-mono-label text-[9px] uppercase tracking-[.12em] text-[#c6b17b]/80">
                    {listing.category}
                  </span>
                </div>

                {/* Content */}
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="font-editorial text-xl leading-tight tracking-[-.01em]">{listing.title}</h3>
                  <p className="mt-1.5 flex items-center gap-1.5 text-[12px] text-[#706b61]">
                    <MapPin size={12} className="text-[#918a7c]" /> {listing.location}
                  </p>
                  <p className="mt-3 line-clamp-2 text-[12px] leading-5 text-[#6b665d]">{listing.description}</p>

                  {/* Metrics */}
                  <div className="mt-4 grid grid-cols-2 gap-3 border-t border-[#e0d9ce] pt-3">
                    <div>
                      <div className="font-mono-label text-[8px] uppercase tracking-[.12em] text-[#948c7b]">{t('listings.askingPrice')}</div>
                      <div className="mt-0.5 text-[13px] font-semibold text-[#38352f]">{money(listing.askingPrice)}</div>
                    </div>
                    <div>
                      <div className="font-mono-label text-[8px] uppercase tracking-[.12em] text-[#948c7b]">{t('listings.annualRevenue')}</div>
                      <div className="mt-0.5 text-[13px] font-semibold text-[#38352f]">{money(listing.annualRevenue)}</div>
                    </div>
                  </div>

                  {/* Finder's Fee badge */}
                  <div className="mt-3 inline-flex items-center gap-1.5 border border-[#b9a16d] bg-[#f5efe0] px-2.5 py-1.5">
                    <Award size={13} className="text-[#b9a16d]" />
                    <span className="font-mono-label text-[9px] uppercase tracking-[.12em] text-[#8c794d]">{t('listings.finderFee')}</span>
                    <span className="text-[13px] font-bold text-[#b9a16d]">{money(listing.finderFee)}</span>
                  </div>

                  {/* Buttons */}
                  <div className="mt-auto flex gap-2 pt-4">
                    <Link
                      href={`/listings/${listing.id}`}
                      className="flex-1 inline-flex h-10 items-center justify-center gap-1.5 border border-[#cfc8bc] text-[10px] uppercase tracking-[.1em] text-[#38352f] transition hover:border-[#9a8352]"
                    >
                      {t('listings.viewDetails')}
                    </Link>
                    <button
                      onClick={() => setReferralListing(listing)}
                      className="flex-1 inline-flex h-10 items-center justify-center gap-1.5 bg-[#38352f] text-[10px] uppercase tracking-[.1em] text-[#f5f2eb] transition hover:bg-[#504b40]"
                    >
                      {t('listings.referBuyer')}
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

        {referralListing && (
          <ReferBuyerModal
            listing={referralListing}
            onClose={() => setReferralListing(null)}
          />
        )}
      </div>
    </section>
  );
}
