import { useState, useMemo, useCallback } from 'react';
import { Link } from 'wouter';
import { Search, SlidersHorizontal, X, Sparkles, ArrowRight, MapPin, DollarSign, Building2 } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageProvider';
import { PublicLayout, Eyebrow } from '@/components/site';
import { useSeo } from '@/hooks/useSeo';

type SearchResult = {
  id: string;
  title: string;
  industry: string;
  category: string;
  location: string;
  price: number | null;
  minPrice: number | null;
  description: string;
  privacy: string;
  isVerified: boolean;
  featured: boolean;
  createdAt: string;
  source: 'request' | 'listing' | 'match';
  href: string;
};

type SearchResponse = {
  results: SearchResult[];
  counts: { requests: number; listings: number; matches: number; total: number };
  suggestions: Array<{
    requestTitle: string;
    requestIndustry: string;
    listingTitle: string;
    listingPrice: number | null;
    reason: string;
  }>;
};

const field = 'h-11 w-full border border-[#cfc8bc] bg-[#fbfaf7] px-3 text-[13px] outline-none transition focus:border-[#9a8352]';
const label = 'mb-1.5 block font-mono-label text-[9px] uppercase tracking-[.12em] text-[#625d53]';

function money(n: number | null): string {
  if (n == null) return '—';
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `$${(n / 1_000).toFixed(0)}K`;
  return `$${n.toLocaleString()}`;
}

function sourceBadge(source: string, t: (k: string) => string) {
  if (source === 'request') return { label: t('search.sourceRequest'), cls: 'bg-[#e8e2d4] text-[#6b6248]' };
  if (source === 'listing') return { label: t('search.sourceListing'), cls: 'bg-[#e0dcc8] text-[#877446]' };
  return { label: t('search.sourceMatch'), cls: 'bg-[#dcd5c4] text-[#7a6b3e]' };
}

export function SmartSearchPage() {
  const { t } = useLanguage();
  useSeo('search');
  const [query, setQuery] = useState('');
  const [filters, setFilters] = useState({
    industry: '',
    location: '',
    minPrice: '',
    maxPrice: '',
    type: 'all' as 'all' | 'business' | 'service' | 'product',
    sort: 'newest' as 'newest' | 'price_high' | 'price_low',
  });
  const [showFilters, setShowFilters] = useState(false);
  const [data, setData] = useState<SearchResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const doSearch = useCallback(async () => {
    setLoading(true);
    setSearched(true);
    try {
      const params = new URLSearchParams();
      if (query.trim()) params.set('q', query.trim());
      if (filters.industry) params.set('industry', filters.industry);
      if (filters.location) params.set('location', filters.location);
      if (filters.minPrice) params.set('minPrice', filters.minPrice);
      if (filters.maxPrice) params.set('maxPrice', filters.maxPrice);
      if (filters.type !== 'all') params.set('type', filters.type);
      params.set('sort', filters.sort);
      const res = await fetch(`/api/search?${params.toString()}`);
      if (!res.ok) throw new Error('Search failed');
      setData(await res.json());
    } catch {
      setData(null);
    } finally {
      setLoading(false);
    }
  }, [query, filters]);

  const clearAll = () => {
    setQuery('');
    setFilters({ industry: '', location: '', minPrice: '', maxPrice: '', type: 'all', sort: 'newest' });
    setData(null);
    setSearched(false);
  };

  const hasActiveFilters = query || filters.industry || filters.location || filters.minPrice || filters.maxPrice || filters.type !== 'all';

  return (
    <PublicLayout>
      <div className="mx-auto max-w-[1280px] px-5 py-10 md:px-10 md:py-16">
        {/* Header */}
        <div>
          <Eyebrow>{t('search.eyebrow')}</Eyebrow>
          <h1 className="font-editorial mt-4 text-5xl tracking-[-.03em] md:text-6xl">{t('search.title')}</h1>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-[#6b665d]">{t('search.subtitle')}</p>
        </div>

        {/* Search bar */}
        <div className="mt-8 flex gap-2">
          <div className="relative flex-1">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#918a7c]" />
            <input
              className={`${field} h-12 pl-12 text-[15px]`}
              placeholder={t('search.placeholder')}
              value={query}
              onChange={e => setQuery(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && doSearch()}
              data-testid="input-smart-search"
            />
          </div>
          <button
            onClick={doSearch}
            className="inline-flex h-12 items-center gap-2 bg-[#38352f] px-6 text-[12px] uppercase tracking-wider text-[#f5f2eb] transition hover:bg-[#504b40]"
            disabled={loading}
            data-testid="button-search"
          >
            {loading ? '…' : t('search.button')}
          </button>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`inline-flex h-12 items-center gap-2 border px-4 text-[12px] uppercase tracking-wider transition ${showFilters ? 'border-[#9a8352] bg-[#f8f6f0] text-[#877446]' : 'border-[#cfc8bc] text-[#625d54] hover:border-[#9a8352]'}`}
            data-testid="button-toggle-filters"
          >
            <SlidersHorizontal size={15} /> {t('search.filters')}
          </button>
        </div>

        {/* Filters panel */}
        {showFilters && (
          <div className="mt-4 border border-[#d4cdc1] bg-[#f8f6f0] p-5">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <label>
                <span className={label}>{t('search.filterIndustry')}</span>
                <input className={field} placeholder={t('search.filterIndustryPlaceholder')} value={filters.industry} onChange={e => setFilters({ ...filters, industry: e.target.value })} data-testid="input-filter-industry" />
              </label>
              <label>
                <span className={label}>{t('search.filterLocation')}</span>
                <input className={field} placeholder={t('search.filterLocationPlaceholder')} value={filters.location} onChange={e => setFilters({ ...filters, location: e.target.value })} data-testid="input-filter-location" />
              </label>
              <label>
                <span className={label}>{t('search.filterMinPrice')}</span>
                <input className={field} type="number" min="0" placeholder="$0" value={filters.minPrice} onChange={e => setFilters({ ...filters, minPrice: e.target.value })} data-testid="input-filter-min-price" />
              </label>
              <label>
                <span className={label}>{t('search.filterMaxPrice')}</span>
                <input className={field} type="number" min="0" placeholder="$∞" value={filters.maxPrice} onChange={e => setFilters({ ...filters, maxPrice: e.target.value })} data-testid="input-filter-max-price" />
              </label>
              <label>
                <span className={label}>{t('search.filterType')}</span>
                <select className={field} value={filters.type} onChange={e => setFilters({ ...filters, type: e.target.value as typeof filters.type })} data-testid="select-filter-type">
                  <option value="all">{t('search.typeAll')}</option>
                  <option value="business">{t('search.typeBusiness')}</option>
                  <option value="service">{t('search.typeService')}</option>
                  <option value="product">{t('search.typeProduct')}</option>
                </select>
              </label>
              <label>
                <span className={label}>{t('search.filterSort')}</span>
                <select className={field} value={filters.sort} onChange={e => setFilters({ ...filters, sort: e.target.value as typeof filters.sort })} data-testid="select-sort">
                  <option value="newest">{t('search.sortNewest')}</option>
                  <option value="price_high">{t('search.sortPriceHigh')}</option>
                  <option value="price_low">{t('search.sortPriceLow')}</option>
                </select>
              </label>
            </div>
            {hasActiveFilters && (
              <button onClick={clearAll} className="mt-4 inline-flex items-center gap-1 text-[11px] uppercase tracking-wider text-[#877446] hover:text-[#6b5530]" data-testid="button-clear-filters">
                <X size={12} /> {t('search.clearFilters')}
              </button>
            )}
          </div>
        )}

        {/* Results */}
        {loading && <div className="mt-10 text-sm text-[#6b665d]">{t('search.loading')}</div>}

        {!loading && data && (
          <>
            {/* Counts */}
            <div className="mt-8 flex flex-wrap gap-4 border-b border-[#d4cdc1] pb-4">
              <span className="font-mono-label text-[10px] uppercase tracking-[.15em] text-[#8c8475]">{data.counts.total} {t('search.resultsCount')}</span>
              <span className="text-[11px] text-[#918a7c]">{t('search.sourceRequest')}: {data.counts.requests}</span>
              <span className="text-[11px] text-[#918a7c]">{t('search.sourceListing')}: {data.counts.listings}</span>
              <span className="text-[11px] text-[#918a7c]">{t('search.sourceMatch')}: {data.counts.matches}</span>
            </div>

            {/* Suggestions */}
            {data.suggestions.length > 0 && (
              <div className="mt-6 border border-[#d4cdc1] bg-[#f8f6f0] p-5">
                <div className="flex items-center gap-2"><Sparkles size={15} className="text-[#b9a16d]" /><span className="font-mono-label text-[10px] uppercase tracking-[.15em] text-[#897649]">{t('search.suggestions')}</span></div>
                <div className="mt-4 space-y-2">
                  {data.suggestions.map((s, i) => (
                    <div key={i} className="flex items-center gap-3 text-[13px] text-[#5f5a51]">
                      <span className="text-[#877446]">{s.requestTitle}</span>
                      <ArrowRight size={12} className="text-[#b9a16d]" />
                      <span className="text-[#5f5a51]">{s.listingTitle}</span>
                      {s.listingPrice != null && <span className="text-[11px] text-[#918a7c]">({money(s.listingPrice)})</span>}
                      <span className="ml-auto font-mono-label text-[9px] uppercase tracking-[.12em] text-[#b9a16d]">{s.reason}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Result cards */}
            <div className="mt-6 space-y-3">
              {data.results.length === 0 && (
                <div className="border border-dashed border-[#cfc8bc] py-16 text-center">
                  <p className="text-sm text-[#6b665d]">{t('search.noResults')}</p>
                  <button onClick={clearAll} className="mt-4 text-[11px] uppercase tracking-wider text-[#877446] hover:text-[#6b5530]">{t('search.clearFilters')}</button>
                </div>
              )}
              {data.results.map(r => {
                const badge = sourceBadge(r.source, t);
                return (
                  <Link key={`${r.source}-${r.id}`} href={r.href} className="block border border-[#d4cdc1] bg-[#fbfaf7] p-5 transition hover:border-[#9a8352]" data-testid={`result-${r.source}`}>
                    <div className="flex items-start justify-between gap-4">
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <span className={`inline-flex px-2 py-0.5 text-[9px] uppercase tracking-wider ${badge.cls}`}>{badge.label}</span>
                          {r.isVerified && <span className="inline-flex items-center gap-0.5 text-[9px] uppercase tracking-wider text-[#557165]">✓ {t('search.verified')}</span>}
                          {r.featured && <span className="inline-flex items-center gap-0.5 text-[9px] uppercase tracking-wider text-[#b9a16d]">★ {t('search.featured')}</span>}
                        </div>
                        <h3 className="font-editorial mt-2 text-lg leading-tight">{r.title}</h3>
                        {r.description && <p className="mt-1 line-clamp-2 text-[12px] leading-5 text-[#8a8478]">{r.description}</p>}
                        <div className="mt-3 flex flex-wrap gap-4 text-[11px] text-[#827968]">
                          <span className="inline-flex items-center gap-1"><Building2 size={12} /> {r.industry}</span>
                          <span className="inline-flex items-center gap-1"><MapPin size={12} /> {r.location}</span>
                          <span className="inline-flex items-center gap-1"><DollarSign size={12} /> {r.price != null ? money(r.price) : r.minPrice != null ? `${money(r.minPrice)}+` : '—'}</span>
                        </div>
                      </div>
                      <ArrowRight size={16} className="mt-1 shrink-0 text-[#b9a16d]" />
                    </div>
                  </Link>
                );
              })}
            </div>
          </>
        )}

        {!loading && !searched && (
          <div className="mt-10 border border-dashed border-[#cfc8bc] py-16 text-center">
            <Search size={28} className="mx-auto text-[#cfc8bc]" />
            <p className="mt-4 text-sm text-[#6b665d]">{t('search.startSearching')}</p>
          </div>
        )}
      </div>
    </PublicLayout>
  );
}
