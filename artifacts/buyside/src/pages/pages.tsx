import { useEffect, useMemo, useState, type ReactNode } from 'react';
import { useForm } from 'react-hook-form';
import { useQueryClient } from '@tanstack/react-query';
import { Link, useLocation, useRoute } from 'wouter';
import { Show, useAuth } from '@clerk/react';
import { ArrowLeft, ArrowRight, ArrowUpRight, Check, CircleHelp, LockKeyhole, Search, ShieldCheck } from 'lucide-react';
import {
  useCreateBuyerRequest, useGetBuyerRequest, useGetMySummary, useListBuyerRequests,
  useListMyBuyerRequests, useListMySavedRequests, useListMySubmissions,
  useListRequestMatches, useSaveBuyerRequest, useSubmitMatch,
  getListBuyerRequestsQueryKey, getListMyBuyerRequestsQueryKey, getListMySavedRequestsQueryKey,
  getGetMySummaryQueryKey, getListMySubmissionsQueryKey, getListRequestMatchesQueryKey,
  getGetBuyerRequestQueryKey, type BuyerRequest, type BuyerRequestInput, type MatchSubmissionInput,
} from '@workspace/api-client-react';
import { Form } from '@/components/ui/form';
import { AccountPlanPanel } from '@/components/account-plan';
import {
  ButtonLink, EmptyState, ErrorState, Eyebrow, FinderFeeField, LoadingRows,
  PrivacyNote, PublicLayout, RequestCard, RequestStatusBadges, SectionTitle, money,
} from '@/components/site';
import { useLanguage } from '@/i18n/LanguageProvider';
import { useSeo } from '@/hooks/useSeo';
import { DemoShowcase } from '@/components/DemoShowcase';
import { FeaturedOpportunities } from '@/components/FeaturedOpportunities';
import { TrustSection } from '@/components/TrustSection';
import { SocialProof } from '@/components/SocialProof';
import { FinalCta } from '@/components/FinalCta';
import { MembershipPreview } from '@/components/MembershipPreview';
import { BusinessOpportunities } from '@/components/BusinessOpportunities';

const field = 'h-12 w-full border border-[#cfc8bc] bg-[#fbfaf7] px-3 text-[14px] outline-none transition focus:border-[#9a8352] focus:ring-1 focus:ring-[#9a8352]';
const area = 'min-h-28 w-full border border-[#cfc8bc] bg-[#fbfaf7] px-3 py-3 text-[14px] outline-none transition focus:border-[#9a8352] focus:ring-1 focus:ring-[#9a8352]';
const label = 'mb-2 block font-mono-label text-[10px] uppercase tracking-[.12em] text-[#625d53]';
function PageFrame({ children, dark = false }: { children: ReactNode; dark?: boolean }) {
  return <PublicLayout><main className={dark ? 'bg-[#34322d] text-[#f3efe7]' : ''}>{children}</main></PublicLayout>;
}

function HeroVisual() {
  return <div className="relative min-h-[180px] overflow-hidden bg-[#36352f] sm:min-h-[220px] md:min-h-[300px] lg:min-h-[500px]">
    <div className="absolute inset-0 opacity-80" style={{ background: 'radial-gradient(ellipse at 56% 48%, rgba(185,161,109,.15), transparent 43%), linear-gradient(135deg,#393932 0%,#2c2d28 68%,#454239 100%)' }} />
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="relative aspect-square w-[54%] max-w-[200px] sm:w-[62%] sm:max-w-[260px] md:w-[70%] md:max-w-[320px] lg:w-[75%] lg:max-w-[370px]">
        <div className="absolute inset-[8%] rotate-45 border border-[#b9a16d]/50" />
        <div className="absolute inset-[21%] rotate-45 border border-[#b9a16d]/35" />
        <div className="absolute inset-[34%] rotate-45 border border-[#b9a16d]/25" />
        <div className="absolute left-1/2 top-0 h-full border-l border-[#b9a16d]/20" />
        <div className="absolute left-0 top-1/2 w-full border-t border-[#b9a16d]/20" />
        <div className="absolute left-1/2 top-1/2 size-2 -translate-x-1/2 -translate-y-1/2 rotate-45 bg-[#c2ac78]" />
        <div className="absolute bottom-[10%] right-[2%] font-mono-label text-[9px] uppercase tracking-[.18em] text-[#c4b88f]">Private by design</div>
      </div>
    </div>
    <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between text-[10px] uppercase tracking-[.15em] text-[#c3bfb1] md:bottom-8 md:left-8 md:right-8"><span>Acquisition intent<br />without the noise</span><span className="font-mono-label text-[#b9a16d]">01 / 04</span></div>
  </div>;
}

export function HomePage() {
  const { t } = useLanguage();
  useSeo('home');
  return <PageFrame>
    {/* Hero */}
    <section className="mx-auto grid max-w-[1280px] lg:min-h-[560px] lg:grid-cols-[1.08fr_.92fr]">
      <div className="flex flex-col justify-center px-5 py-10 sm:px-8 sm:py-12 md:px-10 md:py-14 lg:py-16">
        <Eyebrow>{t('home.eyebrow')}</Eyebrow>
        <h1 className="font-editorial mt-5 max-w-[680px] text-[clamp(2.25rem,7.2vw,4.25rem)] leading-[1.02] tracking-[-.035em]">{t('home.heroTitleNew')}</h1>
        <p className="mt-5 max-w-[560px] text-[15px] leading-7 text-[#6e685e]">{t('home.heroSub')}</p>
        <div className="mt-6 grid w-full max-w-[620px] grid-cols-1 gap-3 sm:grid-cols-2">
          <ButtonLink href="/opportunities" className="w-full" testId="button-explore-opportunities">{t('home.ctaExplore')}</ButtonLink>
          <ButtonLink href="/post-request" secondary className="w-full" testId="button-post-what-you-need">{t('home.ctaPostNeed')}</ButtonLink>
        </div>
        <p className="mt-5 max-w-[560px] font-mono-label text-[10px] uppercase leading-5 tracking-[.15em] text-[#918a7c]">{t('home.heroFootnote')}</p>
      </div>
      <div className="hidden lg:block"><HeroVisual /></div>
    </section>

    <div className="lg:hidden"><HeroVisual /></div>

    {/* Business Opportunities (for-sale listings) */}
    <BusinessOpportunities />

    {/* Featured Opportunities */}
    <FeaturedOpportunities />

    {/* Marketplace Categories — What are you looking for? */}
    <section className="mx-auto max-w-[1280px] px-5 py-12 md:px-10 md:py-20">
      <SectionTitle eyebrow={t('home.whatEyebrow')} title={t('home.whatTitle')} description={t('home.whatDesc')} />
      <div className="mt-10 grid gap-5 md:grid-cols-3">
        {[
          { num: '01', title: t('home.findBusiness'), desc: t('home.findBusinessDesc'), examples: ['HVAC company in Florida', 'Restaurant in Miami', 'E-commerce brand', 'Manufacturing company', 'Cash-flowing business'], cta: t('home.findBusiness'), href: '/post-request?category=business', testId: 'card-find-business' },
          { num: '02', title: t('home.findService'), desc: t('home.findServiceDesc'), examples: ['Business broker', 'Attorney', 'Accountant', 'Financing', 'Due diligence', 'Marketing', 'Cleaning company', 'Contractors', 'Consultants'], cta: t('home.findService'), href: '/post-request?category=service', testId: 'card-find-service' },
          { num: '03', title: t('home.findProduct'), desc: t('home.findProductDesc'), examples: ['Wholesale inventory', 'Electronics', 'Equipment', 'Commercial supplies', 'Bulk products', 'Manufacturers and suppliers'], cta: t('home.findProduct'), href: '/post-request?category=product', testId: 'card-find-product' },
        ].map(card => (
          <article key={card.num} className="flex flex-col border border-[#cfc8bc] bg-[#f8f6f0] p-7" data-testid={card.testId}>
            <div className="font-mono-label text-[10px] uppercase tracking-[.14em] text-[#897649]">{card.num}</div>
            <h3 className="font-editorial mt-4 text-2xl">{card.title}</h3>
            <p className="mt-3 text-[13px] leading-6 text-[#6b665d]">{card.desc}</p>
            <div className="mt-5 flex-1 border-t border-[#e0d9ce] pt-4">
              <p className="font-mono-label text-[9px] uppercase tracking-[.12em] text-[#948c7b]">{t('home.examples')}</p>
              <ul className="mt-2 space-y-1 text-[12px] leading-5 text-[#8a8478]">
                {card.examples.map(ex => <li key={ex}>{ex}</li>)}
              </ul>
            </div>
            <Link href={card.href} className="mt-6 inline-flex min-h-11 items-center justify-center gap-2 bg-[#38352f] px-4 text-[11px] uppercase tracking-[.1em] text-[#f5f2eb] transition hover:bg-[#504b40]">{card.cta} <ArrowRight size={14} /></Link>
          </article>
        ))}
      </div>
    </section>

    {/* Have Something People Are Looking For? */}
    <section className="bg-[#34322d] text-[#f3efe7]">
      <div className="mx-auto max-w-[1280px] px-5 py-16 md:px-10 md:py-24">
        <Eyebrow light>{t('home.offerEyebrow')}</Eyebrow>
        <h2 className="font-editorial mt-5 max-w-2xl text-4xl leading-tight md:text-5xl">{t('home.offerTitle')}</h2>
        <p className="mt-5 max-w-xl text-sm leading-7 text-[#c1bcb2]">{t('home.offerBody')}</p>
        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {[
            { title: t('home.aBusiness'), desc: t('home.aBusinessDesc') },
            { title: t('home.aService'), desc: t('home.aServiceDesc') },
            { title: t('home.aProduct'), desc: t('home.aProductDesc') },
          ].map(item => (
            <div key={item.title} className="border border-[#5a574e] p-5"><h3 className="font-editorial text-xl">{item.title}</h3><p className="mt-2 text-[12px] leading-5 text-[#c1bcb2]">{item.desc}</p></div>
          ))}
        </div>
        <div className="mt-8"><ButtonLink href="/requests" testId="button-list-what-you-offer-dark">{t('home.ctaList')}</ButtonLink></div>
      </div>
    </section>

    {/* How it works */}
    <section className="border-y border-[#d8d1c5] bg-[#ebe7dd]">
      <div className="mx-auto max-w-[1280px] px-5 py-12 md:px-10 md:py-16">
        <SectionTitle eyebrow={t('home.howEyebrow')} title={t('home.howTitle')} />
        <div className="mt-10 grid gap-0 border-y border-[#d4cdc1]">
          {[
            ['01', t('home.step1TitleNew'), t('home.step1DescNew')],
            ['02', t('home.step2TitleNew'), t('home.step2DescNew')],
            ['03', t('home.step3TitleNew'), t('home.step3DescNew')],
            ['04', t('home.step4TitleNew'), t('home.step4DescNew')],
          ].map(([n, title, desc]) => (
            <div key={n} className="grid grid-cols-[50px_1fr] gap-4 border-b border-[#d4cdc1] py-6 last:border-0">
              <span className="font-mono-label text-xs text-[#b9a16d]">{n}</span>
              <div><h3 className="font-editorial text-2xl">{title}</h3><p className="mt-2 text-sm leading-6 text-[#6b665d]">{desc}</p></div>
            </div>
          ))}
        </div>
        <div className="mt-6 border-l-2 border-[#b9a16d] bg-[#eeebe3] p-4 text-[13px] leading-6 text-[#625d53]">{t('home.introFeeNote')}</div>
      </div>
    </section>

    {/* Trust & Confidentiality */}
    <TrustSection />

    {/* Membership preview */}
    <MembershipPreview />

    {/* Social proof (hidden until real data) */}
    <SocialProof />

    {/* Final CTA */}
    <FinalCta />

    <Compliance />
  </PageFrame>;
}

export function RequestMarketplace() {
  const { t } = useLanguage();
  useSeo('requests');
  const [filters, setFilters] = useState({ search: '', industry: '', country: '', region: '', city: '', minBudget: '', maxBudget: '', buyerType: '' as '' | BuyerRequest['buyerType'], verifiedOnly: false, sort: 'newest' as 'newest' | 'highest_budget' | 'highest_reward' | 'closing_soon' });
  const params = useMemo(() => ({
    ...(filters.search ? { search: filters.search } : {}), ...(filters.industry ? { industry: filters.industry } : {}),
    ...(filters.country ? { country: filters.country } : {}), ...(filters.region ? { region: filters.region } : {}),
    ...(filters.city ? { city: filters.city } : {}), ...(filters.minBudget ? { minBudget: Number(filters.minBudget) } : {}),
    ...(filters.maxBudget ? { maxBudget: Number(filters.maxBudget) } : {}), ...(filters.verifiedOnly ? { verifiedOnly: true } : {}),
    sort: filters.sort,
  }), [filters]);
  const query = useListBuyerRequests(params);
  const requests = (query.data || []).filter(request => !filters.buyerType || request.buyerType === filters.buyerType);
  return <PageFrame><div className="mx-auto max-w-[1280px] px-5 py-12 md:px-10 md:py-20">
    <div className="grid gap-8 md:grid-cols-[1fr_auto] md:items-end"><div><Eyebrow>{t('requests.eyebrow')}</Eyebrow><h1 className="font-editorial mt-4 text-5xl tracking-[-.03em] md:text-7xl">{t('requests.title')}</h1><p className="mt-5 max-w-xl text-sm leading-7 text-[#6b665d]">{t('requests.intro')}</p></div><Link href="/post-request" className="inline-flex h-12 items-center justify-center gap-2 bg-[#38352f] px-5 text-xs uppercase tracking-wider text-[#f5f2eb]">{t('requests.postRequest')} <ArrowRight size={15} /></Link></div>
    <div className="mt-10 border-y border-[#d4cdc1] py-5">
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <label className="sm:col-span-2"><span className={label}>{t('requests.searchLabel')}</span><span className="relative block"><Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#918a7c]" /><input className={`${field} pl-10`} placeholder={t('requests.searchPlaceholder')} value={filters.search} onChange={e => setFilters({ ...filters, search: e.target.value })} data-testid="input-search-requests" /></span></label>
        <label><span className={label}>{t('requests.industry')}</span><input className={field} placeholder={t('requests.industryPlaceholder')} value={filters.industry} onChange={e => setFilters({ ...filters, industry: e.target.value })} data-testid="input-filter-industry" /></label>
        <div className="sm:col-span-2"><span className={label}>{t('requests.location')}</span><div className="grid grid-cols-3 gap-2">
          {(['country', 'region', 'city'] as const).map(key => <label key={key}><span className="sr-only">{key}</span><input className={field} placeholder={`Any ${key}`} value={filters[key]} onChange={e => setFilters({ ...filters, [key]: e.target.value })} data-testid={`input-filter-${key}`} /></label>)}
        </div></div>
        <fieldset className="sm:col-span-2"><legend className={label}>{t('requests.purchasePrice')}</legend><div className="grid grid-cols-2 gap-2">
          <label><span className="sr-only">Minimum purchase price</span><input className={field} type="number" min="0" placeholder="Minimum" value={filters.minBudget} onChange={e => setFilters({ ...filters, minBudget: e.target.value })} data-testid="input-min-budget" /></label>
          <label><span className="sr-only">Maximum purchase price</span><input className={field} type="number" min="0" placeholder="Maximum" value={filters.maxBudget} onChange={e => setFilters({ ...filters, maxBudget: e.target.value })} data-testid="input-max-budget" /></label>
        </div></fieldset>
        <label><span className={label}>{t('requests.buyerType')}</span><select className={field} value={filters.buyerType} onChange={e => setFilters({ ...filters, buyerType: e.target.value as typeof filters.buyerType })} data-testid="select-filter-buyer-type"><option value="">{t('requests.anyBuyerType')}</option><option value="individual">Individual</option><option value="strategic">Strategic buyer</option><option value="search_fund">Search fund</option><option value="private_equity">Private equity</option><option value="other">Other</option></select></label>
        <label><span className={label}>{t('requests.sortBy')}</span><select className={field} value={filters.sort} onChange={e => setFilters({ ...filters, sort: e.target.value as typeof filters.sort })} data-testid="select-sort"><option value="newest">{t('requests.sortNewest')}</option><option value="highest_budget">{t('requests.sortHighestBudget')}</option><option value="highest_reward">{t('requests.sortHighestReward')}</option><option value="closing_soon">{t('requests.sortClosingSoon')}</option></select></label>
      </div>
      <label className="mt-4 flex cursor-pointer items-center gap-2 text-xs text-[#5f5a51]"><input type="checkbox" checked={filters.verifiedOnly} onChange={e => setFilters({ ...filters, verifiedOnly: e.target.checked })} data-testid="checkbox-verified" /> {t('requests.verifiedOnly')}</label>
    </div>
    <div className="mb-3 mt-8 flex items-center justify-between"><Eyebrow>{query.isLoading ? t('requests.retrieving') : `${requests.length} ${requests.length === 1 ? 'request' : 'requests'}`}</Eyebrow><Link href="/confidentiality" className="inline-flex items-center gap-1 text-[11px] text-[#786b52]"><LockKeyhole size={13} /> {t('requests.privacyPrinciples')}</Link></div>
    {query.isLoading ? <LoadingRows count={4} /> : query.isError ? <ErrorState onRetry={() => query.refetch()} /> : requests.length ? requests.map(r => <RequestCard request={r} key={r.id} />) : <EmptyState title={t('requests.noMatch')} body={t('requests.noMatchBody')} action={<button onClick={() => setFilters({ search: '', industry: '', country: '', region: '', city: '', minBudget: '', maxBudget: '', buyerType: '', verifiedOnly: false, sort: 'newest' })} className="border border-[#cfc8bc] px-4 py-2 text-xs uppercase tracking-wider" data-testid="button-clear-filters">{t('requests.clearFilters')}</button>} />}
  </div></PageFrame>;
}

export function OpportunitiesPage() {
  const { t } = useLanguage();
  useSeo('opportunities');
  return <PageFrame><div className="mx-auto max-w-[1280px] px-5 py-12 md:px-10 md:py-20">
    <div className="grid gap-8 md:grid-cols-[1fr_auto] md:items-end">
      <div><Eyebrow>{t('opportunities.eyebrow')}</Eyebrow><h1 className="font-editorial mt-4 text-5xl tracking-[-.03em] md:text-7xl">{t('opportunities.title')}</h1><p className="mt-5 max-w-2xl text-sm leading-7 text-[#6b665d]">{t('opportunities.intro')}</p></div>
      <Link href="/requests" className="inline-flex h-12 items-center justify-center gap-2 border border-[#bdb5a6] px-5 text-xs uppercase tracking-wider text-[#38352f]">{t('opportunities.browseRequests')} <ArrowRight size={15} /></Link>
    </div>
    <div className="mt-10">
      <EmptyState title={t('opportunities.noneYet')} body={t('opportunities.noneYetBody')} action={<ButtonLink href="/requests" secondary>{t('opportunities.browseRequests')}</ButtonLink>} />
    </div>
  </div><Compliance /></PageFrame>;
}

export function RequestDetail() {
  const [, params] = useRoute('/requests/:requestId');
  const id = params?.requestId || '';
  const { t } = useLanguage();
  const query = useGetBuyerRequest(id, { query: { enabled: !!id, queryKey: getGetBuyerRequestQueryKey(id) } });
  const auth = useAuth();
  const savedRequests = useListMySavedRequests({ query: { enabled: !!auth.isSignedIn, queryKey: getListMySavedRequestsQueryKey() } });
  const save = useSaveBuyerRequest();
  const client = useQueryClient();
  const request = query.data;
  const monthlyViewLimitReached =
    query.isError &&
    query.error?.message.includes('Free plan limit of 5 distinct buyer request views');
  const isSaved = savedRequests.data?.some(item => item.id === request?.id) ?? false;
  useEffect(() => {
    if (request && auth.isSignedIn) {
      void client.invalidateQueries({ queryKey: getGetMySummaryQueryKey() });
    }
  }, [request?.id, auth.isSignedIn, client]);
  return <PageFrame>{query.isLoading ? <div className="mx-auto max-w-4xl px-5 py-20"><LoadingRows /></div> : query.isError || !request ? <div className="mx-auto max-w-4xl px-5 py-20">{monthlyViewLimitReached ? <div className="border border-[#85734c] bg-[#242521] p-6 md:p-9"><Eyebrow>{t('requestDetail.monthlyLimit')}</Eyebrow><h1 className="font-editorial mt-4 text-3xl tracking-[-.025em] md:text-4xl" data-testid="text-request-view-limit">{t('requestDetail.limitTitle')}</h1><p className="mt-4 max-w-2xl text-sm leading-6 text-[#b9b5aa]">{t('requestDetail.limitBody')}</p><Link href="/pricing" className="mt-6 inline-flex min-h-11 items-center gap-2 bg-[#b9a16d] px-5 text-[10px] uppercase tracking-wider text-[#25241f]" data-testid="link-request-limit-pricing">{t('requestDetail.viewPlans')} <ArrowRight size={14} /></Link></div> : <ErrorState onRetry={() => query.refetch()} />}</div> : <div className="mx-auto max-w-[1100px] px-5 py-10 md:px-10 md:py-16">
    <Link href="/requests" className="inline-flex items-center gap-2 text-xs uppercase tracking-wider text-[#716956]"><ArrowLeft size={14} /> {t('requestDetail.allRequests')}</Link>
     <div className="mt-8 grid gap-8 lg:mt-10 lg:grid-cols-[1fr_300px] lg:gap-12">
      <article><div className="flex flex-wrap gap-2"><RequestStatusBadges request={request} /></div>
      <Eyebrow>{t('requestDetail.details')}</Eyebrow><h1 className="font-editorial mt-4 text-4xl leading-tight tracking-[-.025em] md:text-6xl">{request.title}</h1>
      <p className="mt-5 text-sm text-[#6b665d]">{request.industry} · {request.businessCategory} · {request.buyerType.replaceAll('_', ' ')}</p>
       <Link href={`/submit/${request.id}`} className="mt-6 flex min-h-12 w-full items-center justify-center gap-2 bg-[#38352f] px-4 py-3 text-center text-[11px] uppercase tracking-wider text-[#f5f2eb] lg:hidden" data-testid={`link-submit-match-mobile-${request.id}`}>{t('card.submitMatch')} <ArrowRight size={14} /></Link>
       <div className="mt-8 grid grid-cols-1 gap-x-8 gap-y-6 border-y border-[#d4cdc1] py-6 sm:grid-cols-2 sm:gap-y-7 sm:py-7">
        <DetailValue label={t('requestDetail.geography')} value={[request.city, request.region, request.country].filter(Boolean).join(', ') || t('requestDetail.flexible')} /><DetailValue label={t('requestDetail.purchaseRange')} value={`${money(request.minimumPurchasePrice)} – ${money(request.maximumPurchasePrice)}`} />
         <DetailValue label={t('requestDetail.targetRevenue')} value={request.minimumRevenue != null ? `${money(request.minimumRevenue)}+` : t('requestDetail.flexible')} /><DetailValue label={t('requestDetail.ebitdaReq')} value={request.minimumEbitda != null ? `${money(request.minimumEbitda)}+` : t('requestDetail.notSpecified')} />
        <DetailValue label={t('requestDetail.cashFlow')} value={money(request.minimumCashFlow)} /><DetailValue label={t('requestDetail.timing')} value={request.timeline || t('requestDetail.notSpecified')} />
      </div>
       <DetailText title={t('requestDetail.detailsText')} content={request.preferredProfile} /><DetailText title={t('requestDetail.exclusions')} content={request.dealExclusions} />
        <FinderFeeField request={request} detail />
        <p className="mt-3 text-xs leading-5 text-[#81796c]">{t('finderFee.disclaimer')}</p>
      <DetailText title={t('requestDetail.confidentiality')} content={`Request privacy: ${request.privacy.replaceAll('_', ' ')}. ${request.remoteAccepted ? 'Remote or location-flexible opportunities may be considered.' : 'Geography should align with the stated criteria.'}`} />
      </article>
       <aside className="lg:pt-14"><div className="border border-[#d4cdc1] bg-[#f8f6f0] p-5 sm:p-6"><Eyebrow>{t('requestDetail.haveMatch')}</Eyebrow><p className="font-editorial mt-3 text-2xl leading-tight">{t('requestDetail.submitMatchTo')}</p><p className="mt-3 text-xs leading-5 text-[#6b665d]">{t('requestDetail.submitMatchDesc')}</p><Link href={`/submit/${request.id}`} className="mt-6 hidden min-h-12 w-full items-center justify-center gap-2 bg-[#38352f] px-4 py-3 text-center text-[11px] uppercase tracking-wider text-[#f5f2eb] lg:flex" data-testid={`link-submit-match-${request.id}`}>{t('card.submitMatch')} <ArrowRight size={14} /></Link>
      <Show when="signed-in"><button disabled={save.isPending} onClick={() => save.mutate({ requestId: request.id, data: { saved: !isSaved } }, { onSuccess: () => { client.invalidateQueries({ queryKey: getListMySavedRequestsQueryKey() }); client.invalidateQueries({ queryKey: getGetMySummaryQueryKey() }); } })} className="mt-3 h-11 w-full border border-[#cfc8bc] text-[11px] uppercase tracking-wider disabled:opacity-50" data-testid="button-save-request">{save.isPending ? t('requestDetail.saving') : isSaved ? t('requestDetail.removeSaved') : t('requestDetail.saveCriteria')}</button></Show>
      <Show when="signed-out"><Link href="/sign-in" className="mt-3 flex h-11 w-full items-center justify-center border border-[#cfc8bc] text-[11px] uppercase tracking-wider">{t('requestDetail.signInToSave')}</Link></Show>
      <div className="mt-5"><PrivacyNote>{t('privacy.noteSubmit')}</PrivacyNote></div></div></aside>
    </div>
    <Compliance />
  </div>}</PageFrame>;
}

function DetailValue({ label: title, value }: { label: string; value: string }) {
  return <div><div className="font-mono-label text-[9px] uppercase tracking-[.14em] text-[#8c8475]">{title}</div><div className="mt-2 text-sm text-[#38352f]">{value}</div></div>;
}
function DetailText({ title, content }: { title: string; content: string }) {
  if (!content?.trim()) return null;
  return <section className="mt-8"><Eyebrow>{title}</Eyebrow><p className="mt-3 whitespace-pre-line text-sm leading-7 text-[#625d53]">{content}</p></section>;
}

export function SubmitMatchPage() {
  const [, params] = useRoute('/submit/:requestId');
  const id = params?.requestId || '';
  const { t } = useLanguage();
  const requestQuery = useGetBuyerRequest(id, { query: { enabled: !!id, queryKey: getGetBuyerRequestQueryKey(id) } });
  const submit = useSubmitMatch();
  const queryClient = useQueryClient();
  const [sent, setSent] = useState(false);
  const submissionLimitReached =
    submit.isError &&
    submit.error?.message.includes('Free plan limit of 1 match submission');
  const form = useForm<MatchSubmissionInput>({ defaultValues: { businessName: '', industry: '', location: '', askingPrice: null, annualRevenue: null, ebitda: null, cashFlow: null, employeeCount: null, yearsOperating: null, shortDescription: '', matchRationale: '', relationship: '', ownerContactStatus: '', brokerStatus: '', confidentialIdentity: true } });
  const val = form.register;
  const onSubmit = form.handleSubmit(data => {
    const numeric = (v: unknown) => v === '' || v === null || v === undefined || (typeof v === 'number' && Number.isNaN(v)) ? null : Number(v);
    submit.mutate({ requestId: id, data: { ...data, askingPrice: numeric(data.askingPrice), annualRevenue: numeric(data.annualRevenue), ebitda: numeric(data.ebitda), cashFlow: numeric(data.cashFlow), employeeCount: numeric(data.employeeCount), yearsOperating: numeric(data.yearsOperating) } }, { onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: getListMySubmissionsQueryKey() });
      queryClient.invalidateQueries({ queryKey: getGetMySummaryQueryKey() });
      queryClient.invalidateQueries({ queryKey: getListRequestMatchesQueryKey(id) });
      setSent(true);
    } });
  });
  if (requestQuery.isLoading) return <PageFrame><div className="mx-auto max-w-3xl px-5 py-20"><LoadingRows /></div></PageFrame>;
  if (requestQuery.isError || !requestQuery.data) return <PageFrame><div className="mx-auto max-w-3xl px-5 py-20"><ErrorState onRetry={() => requestQuery.refetch()} /></div></PageFrame>;
  if (sent) return <PageFrame><div className="mx-auto max-w-3xl px-5 py-24 text-center"><div className="mx-auto grid size-14 place-items-center border border-[#b9a16d] text-[#8a7547]"><Check size={22} /></div><Eyebrow>{t('submitMatch.submitted')}</Eyebrow><h1 className="font-editorial mt-4 text-5xl">{t('submitMatch.submittedTitle')}</h1><p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-[#6b665d]">{t('submitMatch.submittedBody')}</p><div className="mt-8"><ButtonLink href="/dashboard">{t('submitMatch.goToDashboard')}</ButtonLink></div></div></PageFrame>;
  const request = requestQuery.data;
  return <PageFrame><div className="mx-auto max-w-[920px] px-5 py-10 md:px-10 md:py-16"><Link href={`/requests/${id}`} className="inline-flex items-center gap-2 text-xs uppercase tracking-wider text-[#716956]"><ArrowLeft size={14} /> {t('submitMatch.reviewRequest')}</Link>
    <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_280px]">
      <div><Eyebrow>{t('submitMatch.eyebrow')}</Eyebrow><h1 className="font-editorial mt-4 text-5xl tracking-[-.03em]">{t('submitMatch.title')}</h1><p className="mt-4 text-sm leading-7 text-[#6b665d]">{t('submitMatch.intro')}</p>
      <Form {...form}><form onSubmit={onSubmit} className="mt-8 space-y-7">
        <fieldset className="grid gap-4 sm:grid-cols-2"><legend className="mb-4 font-editorial text-2xl">{t('submitMatch.businessOverview')}</legend><label><span className={label}>{t('submitMatch.businessName')} <span className="normal-case text-[#918a7c]">{t('submitMatch.businessNameOptional')}</span></span><input className={field} {...val('businessName')} data-testid="input-business-name" /></label><label><span className={label}>{t('submitMatch.industry')}</span><input required className={field} {...val('industry', { required: true })} data-testid="input-business-industry" /></label><label><span className={label}>{t('submitMatch.location')}</span><input required className={field} {...val('location', { required: true })} data-testid="input-business-location" /></label><label><span className={label}>{t('submitMatch.askingPrice')}</span><input className={field} type="number" min="0" {...val('askingPrice', { valueAsNumber: true })} data-testid="input-asking-price" /></label><label><span className={label}>{t('submitMatch.annualRevenue')}</span><input className={field} type="number" min="0" {...val('annualRevenue', { valueAsNumber: true })} data-testid="input-revenue" /></label><label><span className={label}>{t('submitMatch.ebitda')}</span><input className={field} type="number" {...val('ebitda', { valueAsNumber: true })} data-testid="input-ebitda" /></label><label><span className={label}>{t('submitMatch.cashFlow')}</span><input className={field} type="number" {...val('cashFlow', { valueAsNumber: true })} data-testid="input-cash-flow" /></label><label><span className={label}>{t('submitMatch.employees')}</span><input className={field} type="number" min="0" {...val('employeeCount', { valueAsNumber: true })} data-testid="input-employee-count" /></label><label><span className={label}>{t('submitMatch.yearsOperating')}</span><input className={field} type="number" min="0" {...val('yearsOperating', { valueAsNumber: true })} data-testid="input-years-operating" /></label></fieldset>
        <label className="block"><span className={label}>{t('submitMatch.shortDesc')}</span><textarea required minLength={10} className={area} {...val('shortDescription', { required: true, minLength: 10 })} data-testid="input-description" /></label>
        <label className="block"><span className={label}>{t('submitMatch.matchRationale')}</span><textarea required minLength={10} className={area} {...val('matchRationale', { required: true, minLength: 10 })} data-testid="input-match-rationale" /></label>
        <fieldset className="grid gap-4 sm:grid-cols-2"><legend className="mb-4 font-editorial text-2xl">{t('submitMatch.yourRelationship')}</legend><label><span className={label}>{t('submitMatch.relationship')}</span><input className={field} placeholder="Broker, advisor, owner, other" {...val('relationship')} data-testid="input-relationship" /></label><label><span className={label}>{t('submitMatch.ownerContact')}</span><input className={field} placeholder="Describe current contact" {...val('ownerContactStatus')} data-testid="input-owner-contact" /></label><label><span className={label}>{t('submitMatch.brokerStatus')}</span><input className={field} placeholder="Describe representation, if any" {...val('brokerStatus')} data-testid="input-broker-status" /></label></fieldset>
        <label className="flex items-start gap-3 text-[12px] leading-5 text-[#625d53]"><input type="checkbox" className="mt-1" checked={form.watch('confidentialIdentity')} onChange={e => form.setValue('confidentialIdentity', e.target.checked)} data-testid="checkbox-confidential-identity" />{t('submitMatch.confidential')}</label>
        {submit.isError && <p className="border border-[#d7c3b8] bg-[#f8f2ed] p-3 text-sm leading-6 text-[#815d4f]" role="alert">{submissionLimitReached ? <>{t('submitMatch.submittedBody')} <Link href="/pricing" className="underline underline-offset-2" data-testid="link-submission-limit-pricing">{t('requestDetail.viewPlans')}</Link></> : t('error.unableToLoad')}</p>}
        <button disabled={submit.isPending} className="flex h-12 w-full items-center justify-center gap-2 bg-[#38352f] text-xs uppercase tracking-wider text-[#f5f2eb] disabled:opacity-50 sm:w-auto sm:px-8" type="submit" data-testid="button-submit-match">{submit.isPending ? t('submitMatch.submitting') : t('submitMatch.submit')} <ArrowRight size={14} /></button>
      </form></Form>
      </div>
      <aside className="lg:pt-12"><div className="border border-[#d4cdc1] bg-[#f8f6f0] p-5"><Eyebrow>{t('submitMatch.requestDetails')}</Eyebrow><h2 className="font-editorial mt-3 text-2xl">{request.title}</h2>{request.isExample && <div className="mt-3 inline-block border border-[#b9a16d] px-2 py-1 font-mono-label text-[9px] tracking-wider text-[#78643a]">{t('submitMatch.sampleRequest')}</div>}<p className="mt-3 text-xs leading-5 text-[#6b665d]">{request.industry} · {request.businessCategory}</p><Link href={`/requests/${id}`} className="mt-5 inline-flex items-center gap-2 text-[11px] uppercase tracking-wider">{t('submitMatch.seeFullCriteria')} <ArrowRight size={13} /></Link></div><div className="mt-4"><PrivacyNote>{t('privacy.noteReward')}</PrivacyNote></div></aside>
    </div><Compliance /></div></PageFrame>;
}

function EditorialPage({ eyebrow, title, intro, children, cta, tone = 'light' }: { eyebrow: string; title: string; intro: string; children: ReactNode; cta?: { label: string; href: string }; tone?: 'light' | 'dark' }) {
  const dark = tone === 'dark';
  return <PageFrame dark={dark}><div className={`mx-auto max-w-[1100px] px-5 py-16 md:px-10 md:py-24 ${dark ? '' : ''}`}>
    <div className="max-w-4xl"><Eyebrow light={dark}>{eyebrow}</Eyebrow><h1 className="font-editorial mt-5 text-[48px] leading-[1.03] tracking-[-.035em] md:text-[72px]">{title}</h1><p className={`mt-7 max-w-3xl text-[16px] leading-8 ${dark ? 'text-[#c1bcb2]' : 'text-[#6b665d]'}`}>{intro}</p></div>
    <div className={`mt-14 grid gap-10 border-t pt-10 md:grid-cols-[.75fr_1.25fr] md:pt-14 ${dark ? 'border-[#5a574e]' : 'border-[#d4cdc1]'}`}><div className="font-mono-label text-[10px] uppercase tracking-[.15em] text-[#b19c6e]">A considered approach</div><div className="space-y-10">{children}</div></div>
    {cta && <div className={`mt-16 border-t pt-8 ${dark ? 'border-[#5a574e]' : 'border-[#d4cdc1]'}`}><ButtonLink href={cta.href}>{cta.label}</ButtonLink></div>}
  </div></PageFrame>;
}

function EditorialBlock({ n, title, children, dark = false }: { n: string; title: string; children: ReactNode; dark?: boolean }) {
  return <section className="grid gap-3 sm:grid-cols-[48px_1fr]"><span className="font-mono-label pt-1 text-[10px] text-[#a58f5c]">{n}</span><div><h2 className="font-editorial text-[28px] leading-tight">{title}</h2><div className={`mt-3 max-w-2xl text-sm leading-7 ${dark ? 'text-[#c1bcb2]' : 'text-[#6b665d]'}`}>{children}</div></div></section>;
}

export function ForBuyersPage() {
  const { t } = useLanguage();
  useSeo('forBuyers');
  return <EditorialPage eyebrow={t('forBuyers.eyebrow')} title={t('forBuyers.title')} intro={t('forBuyers.intro')} cta={{ label: t('forBuyers.cta'), href: '/post-request' }}>
    <EditorialBlock n="01" title={t('forBuyers.b1Title')}>{t('forBuyers.b1Body')}</EditorialBlock>
    <EditorialBlock n="02" title={t('forBuyers.b2Title')}>{t('forBuyers.b2Body')}</EditorialBlock>
    <EditorialBlock n="03" title={t('forBuyers.b3Title')}>{t('forBuyers.b3Body')}</EditorialBlock>
    <div className="border-l-2 border-[#b9a16d] bg-[#eeebe3] p-5 text-xs leading-6 text-[#625d53]">{t('forBuyers.disclaimer')}</div>
  </EditorialPage>;
}

export function ForFindersPage() {
  const { t } = useLanguage();
  useSeo('forFinders');
  return <EditorialPage eyebrow={t('forFinders.eyebrow')} title={t('forFinders.title')} intro={t('forFinders.intro')} cta={{ label: t('forFinders.cta'), href: '/requests' }}>
    <EditorialBlock n="01" title={t('forFinders.b1Title')}>{t('forFinders.b1Body')}</EditorialBlock>
    <EditorialBlock n="02" title={t('forFinders.b2Title')}>{t('forFinders.b2Body')}</EditorialBlock>
    <EditorialBlock n="03" title={t('forFinders.b3Title')}>{t('forFinders.b3Body')}</EditorialBlock>
    <div className="border-l-2 border-[#b9a16d] bg-[#eeebe3] p-5 text-sm font-semibold leading-6 text-[#625d53]">{t('forFinders.noClosing')}</div>
    <p className="text-xs leading-6 text-[#6b665d]">{t('forFinders.caution1')}</p>
    <p className="text-xs leading-6 text-[#6b665d]">{t('forFinders.caution2')}</p>
  </EditorialPage>;
}

export function HowItWorksPage() {
  const { t } = useLanguage();
  useSeo('howItWorks');
  return <EditorialPage eyebrow={t('howItWorks.eyebrow')} title={t('howItWorks.title')} intro={t('howItWorks.intro')} cta={{ label: t('howItWorks.cta'), href: '/requests' }}>
    <EditorialBlock n="01" title={t('home.step1TitleNew')}>{t('home.step1DescNew')}</EditorialBlock>
    <EditorialBlock n="02" title={t('home.step2TitleNew')}>{t('home.step2DescNew')}</EditorialBlock>
    <EditorialBlock n="03" title={t('home.step3TitleNew')}>{t('home.step3DescNew')}</EditorialBlock>
    <EditorialBlock n="04" title={t('home.step4TitleNew')}>{t('home.step4DescNew')}</EditorialBlock>
    <div className="border-l-2 border-[#b9a16d] bg-[#eeebe3] p-5 text-[13px] leading-6 text-[#625d53]">{t('home.introFeeNote')}</div>
  </EditorialPage>;
}

export function PrivateNetworkPage() {
  const { t } = useLanguage();
  useSeo('privateNetwork');
  return <EditorialPage eyebrow={t('privateNetwork.eyebrow')} title={t('privateNetwork.title')} intro={t('privateNetwork.intro')} cta={{ label: t('privateNetwork.cta'), href: '/requests' }} tone="dark">
    <EditorialBlock dark n="01" title={t('privateNetwork.b1Title')}>{t('privateNetwork.b1Body')}</EditorialBlock>
    <EditorialBlock dark n="02" title={t('privateNetwork.b2Title')}>{t('privateNetwork.b2Body')}</EditorialBlock>
    <EditorialBlock dark n="03" title={t('privateNetwork.b3Title')}>{t('privateNetwork.b3Body')}</EditorialBlock>
    <EditorialBlock dark n="04" title={t('privateNetwork.b4Title')}>{t('privateNetwork.b4Body')}</EditorialBlock>
  </EditorialPage>;
}

export function ConfidentialityPage() {
  const { t } = useLanguage();
  useSeo('confidentiality');
  return <EditorialPage eyebrow={t('confidentiality.eyebrow')} title={t('confidentiality.title')} intro={t('confidentiality.intro')} cta={{ label: t('confidentiality.cta'), href: '/requests' }}>
    <EditorialBlock n="01" title={t('confidentiality.b1Title')}>{t('confidentiality.b1Body')}</EditorialBlock>
    <EditorialBlock n="02" title={t('confidentiality.b2Title')}>{t('confidentiality.b2Body')}</EditorialBlock>
    <EditorialBlock n="03" title={t('confidentiality.b3Title')}>{t('confidentiality.b3Body')}</EditorialBlock>
    <EditorialBlock n="04" title={t('confidentiality.b4Title')}>{t('confidentiality.b4Body')}</EditorialBlock>
    <Compliance />
  </EditorialPage>;
}

function Compliance() {
  const { t } = useLanguage();
  return <section className="mx-auto max-w-[1280px] px-5 pb-12 pt-4 md:px-10 md:pb-16"><div className="border-t border-[#d8d1c5] pt-5"><p className="max-w-4xl text-[11px] leading-5 text-[#847d70]">{t('compliance.text')}</p></div></section>;
}

const platformDisclaimer = 'BuySide is a technology and introduction platform. Certain activities, transactions, referral compensation, business brokerage, real estate transactions, securities transactions, financing activities, and other regulated activities may require licensed professionals depending on the transaction structure and jurisdiction. BuySide does not represent that every user or transaction is eligible for finder compensation.';
const draftStatus = 'This page is an initial draft and should be reviewed by counsel where appropriate before being relied upon as a complete policy or agreement.';

function LegalDocument({ eyebrow, title, intro, sections, showDisclaimer = true }: { eyebrow: string; title: string; intro: string; sections: { title: string; text: string }[]; showDisclaimer?: boolean }) {
  const { t } = useLanguage();
  return <PageFrame><div className="mx-auto max-w-[980px] px-5 py-14 md:px-10 md:py-20">
    <Eyebrow>{eyebrow}</Eyebrow><h1 className="font-editorial mt-5 text-5xl tracking-[-.03em] md:text-7xl">{title}</h1><p className="mt-6 max-w-3xl text-sm leading-7 text-[#b9b5aa]">{intro}</p>
    <div className="mt-8 border-l-2 border-[#b9a16d] bg-[#eeebe3] p-5 text-sm leading-6 text-[#625d53]"><strong className="font-mono-label text-[10px] uppercase tracking-wider">{t('legal.draftStatus')}</strong><p className="mt-2">{t('legal.draftStatusText')}</p></div>
    <div className="mt-10 divide-y divide-[#46453e] border-y border-[#46453e]">{sections.map((section, i) => <section key={section.title} className="grid gap-4 py-6 md:grid-cols-[190px_1fr]"><h2 className="font-editorial text-2xl">{section.title}</h2><p className="max-w-2xl text-sm leading-7 text-[#b9b5aa]">{section.text}</p></section>)}</div>
    {showDisclaimer && <div className="mt-10 border border-[#46453e] p-5"><Eyebrow>{t('legal.platformDisclaimer')}</Eyebrow><p className="mt-3 text-sm leading-7 text-[#b9b5aa]">{t('legal.platformDisclaimerText')}</p></div>}
  </div></PageFrame>;
}

export function TermsOfUsePage() {
  const { t } = useLanguage();
  return <LegalDocument eyebrow={t('terms.eyebrow')} title={t('terms.title')} intro={t('terms.intro')} sections={[
    { title: t('terms.s1Title'), text: t('terms.s1Text') },
    { title: t('terms.s2Title'), text: t('terms.s2Text') },
    { title: t('terms.s3Title'), text: t('terms.s3Text') },
  ]} />;
}

export function PrivacyPolicyPage() {
  const { t } = useLanguage();
  return <LegalDocument eyebrow={t('privacy.eyebrow')} title={t('privacy.title')} intro={t('privacy.intro')} sections={[
    { title: t('privacy.s1Title'), text: t('privacy.s1Text') },
    { title: t('privacy.s2Title'), text: t('privacy.s2Text') },
    { title: t('privacy.s3Title'), text: t('privacy.s3Text') },
  ]} />;
}

export function FinderTermsPage() {
  const { t } = useLanguage();
  return <LegalDocument eyebrow={t('finderTerms.eyebrow')} title={t('finderTerms.title')} intro={t('finderTerms.intro')} sections={[
    { title: t('finderTerms.s1Title'), text: t('finderTerms.s1Text') },
    { title: t('finderTerms.s2Title'), text: t('finderTerms.s2Text') },
    { title: t('finderTerms.s3Title'), text: t('finderTerms.s3Text') },
  ]} />;
}

export function BuyerTermsPage() {
  const { t } = useLanguage();
  return <LegalDocument eyebrow={t('buyerTerms.eyebrow')} title={t('buyerTerms.title')} intro={t('buyerTerms.intro')} sections={[
    { title: t('buyerTerms.s1Title'), text: t('buyerTerms.s1Text') },
    { title: t('buyerTerms.s2Title'), text: t('buyerTerms.s2Text') },
    { title: t('buyerTerms.s3Title'), text: t('buyerTerms.s3Text') },
  ]} />;
}

export function DisclaimerPage() {
  const { t } = useLanguage();
  return <LegalDocument eyebrow={t('disclaimer.eyebrow')} title={t('disclaimer.title')} intro={t('disclaimer.intro')} sections={[
    { title: t('disclaimer.s1Title'), text: t('disclaimer.s1Text') },
    { title: t('disclaimer.s2Title'), text: t('disclaimer.s2Text') },
  ]} />;
}

export function ContactPage() {
  const { t } = useLanguage();
  return <LegalDocument eyebrow={t('contact.eyebrow')} title={t('contact.title')} intro={t('contact.intro')} sections={[
    { title: t('contact.s1Title'), text: t('contact.s1Text') },
    { title: t('contact.s2Title'), text: t('contact.s2Text') },
  ]} showDisclaimer={false} />;
}

export function PostRequestPage() {
  const { t } = useLanguage();
  useSeo('requests');
  const [error, setError] = useState('');
  const [step, setStep] = useState(1);
  const [, setLocation] = useLocation();
  const queryClient = useQueryClient();
  const create = useCreateBuyerRequest();
  const categoryParam = typeof window !== 'undefined' ? new URLSearchParams(window.location.search).get('category') : null;
  const defaultIndustry = categoryParam === 'business' ? 'Business' : categoryParam === 'service' ? 'Service' : categoryParam === 'product' ? 'Product' : '';
  const form = useForm<BuyerRequestInput>({ defaultValues: { title: '', industry: defaultIndustry, businessCategory: '', buyerType: 'individual', country: '', region: '', city: '', radiusMiles: null, remoteAccepted: false, minimumPurchasePrice: null, maximumPurchasePrice: null, minimumRevenue: null, minimumEbitda: null, minimumCashFlow: null, preferredProfile: '', dealExclusions: '', timeline: '', rewardDisclosure: '', privacy: 'members_only' } });
  const r = form.register;
  const send = form.handleSubmit(values => {
    const numberOrNull = (v: unknown) => v === '' || v === null || v === undefined || (typeof v === 'number' && Number.isNaN(v)) ? null : Number(v);
    const data: BuyerRequestInput = {
      ...values,
      businessCategory: values.businessCategory || values.industry,
      radiusMiles: numberOrNull(values.radiusMiles),
      minimumPurchasePrice: numberOrNull(values.minimumPurchasePrice),
      maximumPurchasePrice: numberOrNull(values.maximumPurchasePrice),
      minimumRevenue: numberOrNull(values.minimumRevenue),
      minimumEbitda: numberOrNull(values.minimumEbitda),
      minimumCashFlow: numberOrNull(values.minimumCashFlow),
    };
    setError('');
    create.mutate({ data }, { onSuccess: (created: BuyerRequest) => {
      queryClient.invalidateQueries({ queryKey: getListMyBuyerRequestsQueryKey() });
      queryClient.invalidateQueries({ queryKey: getListBuyerRequestsQueryKey() });
      queryClient.invalidateQueries({ queryKey: getGetMySummaryQueryKey() });
      setLocation(`/requests/${created.id}`);
    }, onError: () => setError(t('postRequest.error')) });
  });

  const stepLabels = [t('postRequest.step1'), t('postRequest.step2'), t('postRequest.step3')];
  const canProceed = () => {
    if (step === 1) return form.getValues('title')?.trim()?.length >= 3;
    return true;
  };

  return <PageFrame><div className="mx-auto max-w-[960px] px-5 py-10 md:px-10 md:py-16"><Link href="/" className="inline-flex items-center gap-2 text-xs uppercase tracking-wider text-[#716956]"><ArrowLeft size={14} /> {t('postRequest.backHome')}</Link>
    <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_275px]"><div><Eyebrow>{t('postRequest.eyebrow')}</Eyebrow><h1 className="font-editorial mt-3 text-5xl tracking-[-.03em] md:text-6xl">{t('postRequest.title')}</h1><p className="mt-4 max-w-xl text-sm leading-7 text-[#6b665d]">{t('postRequest.intro')}</p>

      {/* Step indicator */}
      <div className="mt-8 flex items-center gap-3">
        {stepLabels.map((label, i) => (
          <div key={i} className="flex items-center gap-3">
            <div className={`flex size-8 items-center justify-center border font-mono-label text-[11px] ${step > i + 1 ? 'border-[#b9a16d] bg-[#b9a16d] text-[#25241f]' : step === i + 1 ? 'border-[#b9a16d] text-[#b9a16d]' : 'border-[#cfc8bc] text-[#918a7c]'}`} data-testid={`step-indicator-${i + 1}`}>
              {step > i + 1 ? <Check size={14} /> : i + 1}
            </div>
            <span className={`text-[12px] ${step === i + 1 ? 'text-[#38352f]' : 'text-[#918a7c]'}`}>{label}</span>
            {i < stepLabels.length - 1 && <div className={`h-px w-8 ${step > i + 1 ? 'bg-[#b9a16d]' : 'bg-[#d4cdc1]'}`} />}
          </div>
        ))}
      </div>
      <p className="mt-3 font-mono-label text-[10px] uppercase tracking-[.12em] text-[#918a7c]">{t('postRequest.stepLabel')} {step} {t('postRequest.of')} 3 — {stepLabels[step - 1]}</p>

      <Form {...form}><form onSubmit={send} className="mt-6 space-y-7">
        {/* Step 1: What do you need? */}
        {step === 1 && <div className="space-y-5">
          <label className="block"><span className={label}>{t('postRequest.titleLabel')}</span><input className={field} required {...r('title', { required: 'Add a short title', minLength: 3, maxLength: 120 })} placeholder={t('postRequest.titlePlaceholder')} data-testid="input-request-title" /></label>
          <label className="block"><span className={label}>{t('postRequest.category')}</span><select className={field} {...r('industry')} data-testid="input-category"><option value="">{t('postRequest.selectCategory')}</option><option value="Business">Business</option><option value="Service">Service</option><option value="Product">Product</option><option value="Other">Other</option></select></label>
          <button type="button" onClick={() => { if (canProceed()) setStep(2); }} className="inline-flex h-12 items-center gap-2 bg-[#38352f] px-6 text-xs uppercase tracking-wider text-[#f5f2eb] transition hover:bg-[#504b40]" data-testid="button-step-next">{t('postRequest.next')} <ArrowRight size={14} /></button>
        </div>}

        {/* Step 2: Details */}
        {step === 2 && <div className="space-y-7">
          <fieldset className="grid gap-5 sm:grid-cols-2"><legend className="mb-4 font-editorial text-2xl">{t('postRequest.location')}</legend><label><span className={label}>{t('postRequest.country')}</span><input className={field} {...r('country')} data-testid="input-country" /></label><label><span className={label}>{t('postRequest.region')}</span><input className={field} {...r('region')} data-testid="input-region" /></label><label><span className={label}>{t('postRequest.city')}</span><input className={field} {...r('city')} data-testid="input-city" /></label><label className="flex items-center gap-3 text-sm sm:col-span-2"><input type="checkbox" {...r('remoteAccepted')} data-testid="checkbox-remote" /> {t('postRequest.remote')}</label></fieldset>
          <fieldset className="grid gap-5 sm:grid-cols-2"><legend className="mb-4 font-editorial text-2xl">{t('postRequest.budget')}</legend><label><span className={label}>{t('postRequest.minimum')}</span><input className={field} type="number" min="0" {...r('minimumPurchasePrice', { valueAsNumber: true })} data-testid="input-min-price" /></label><label><span className={label}>{t('postRequest.maximum')}</span><input className={field} type="number" min="0" {...r('maximumPurchasePrice', { valueAsNumber: true })} data-testid="input-max-price" /></label></fieldset>
          <label className="block"><span className={label}>{t('postRequest.description')}</span><textarea className={area} required minLength={10} maxLength={1600} {...r('preferredProfile', { required: true, minLength: 10, maxLength: 1600 })} placeholder={t('postRequest.descriptionPlaceholder')} data-testid="input-description" /></label>
          <label className="block"><span className={label}>{t('postRequest.timeline')}</span><input className={field} {...r('timeline')} placeholder={t('postRequest.timelinePlaceholder')} data-testid="input-timeline" /></label>
          <div className="flex gap-3">
            <button type="button" onClick={() => setStep(1)} className="inline-flex h-12 items-center gap-2 border border-[#cfc8bc] px-6 text-xs uppercase tracking-wider text-[#38352f] transition hover:border-[#9a8352]" data-testid="button-step-back">{t('postRequest.back')}</button>
            <button type="button" onClick={() => setStep(3)} className="inline-flex h-12 items-center gap-2 bg-[#38352f] px-6 text-xs uppercase tracking-wider text-[#f5f2eb] transition hover:bg-[#504b40]" data-testid="button-step-next-2">{t('postRequest.next')} <ArrowRight size={14} /></button>
          </div>
        </div>}

        {/* Step 3: Contact */}
        {step === 3 && <div className="space-y-7">
          <label className="block"><span className={label}>{t('postRequest.contactPrefs')}</span><select className={field} {...r('privacy')} data-testid="select-privacy"><option value="public">{t('postRequest.privacyPublic')}</option><option value="members_only">{t('postRequest.privacyMembers')}</option><option value="nda_required">{t('postRequest.privacyNda')}</option><option value="private">{t('postRequest.privacyPrivate')}</option></select></label>
          {error && <p role="alert" className="border border-[#d7c3b8] bg-[#f8f2ed] p-3 text-sm text-[#815d4f]">{error}</p>}
          <div className="flex gap-3">
            <button type="button" onClick={() => setStep(2)} className="inline-flex h-12 items-center gap-2 border border-[#cfc8bc] px-6 text-xs uppercase tracking-wider text-[#38352f] transition hover:border-[#9a8352]" data-testid="button-step-back-2">{t('postRequest.back')}</button>
            <button disabled={create.isPending} type="submit" className="inline-flex h-12 items-center gap-2 bg-[#38352f] px-6 text-xs uppercase tracking-wider text-[#f5f2eb] disabled:opacity-50" data-testid="button-publish-request">{create.isPending ? t('postRequest.publishing') : form.watch('privacy') === 'private' ? t('postRequest.submitPrivate') : t('postRequest.publish')} <ArrowRight size={14} /></button>
          </div>
        </div>}
      </form></Form>
    </div><aside className="border border-[#d4cdc1] bg-[#f8f6f0] p-5 lg:mt-12"><Eyebrow>{t('postRequest.tips')}</Eyebrow><ul className="mt-4 space-y-4 text-xs leading-5 text-[#6b665d]"><li className="flex gap-2"><ShieldCheck size={15} className="shrink-0 text-[#887649]" />{t('postRequest.tip1')}</li><li className="flex gap-2"><CircleHelp size={15} className="shrink-0 text-[#887649]" />{t('postRequest.tip2')}</li><li className="flex gap-2"><LockKeyhole size={15} className="shrink-0 text-[#887649]" />{t('postRequest.tip3')}</li></ul></aside></div></div></PageFrame>;
}

function Metric({ title, value, note }: { title: string; value?: number | string; note: string }) {
  return <div className="border-t border-[#d4cdc1] pt-4"><div className="font-mono-label text-[9px] uppercase tracking-[.15em] text-[#8c8475]">{title}</div><div className="font-editorial mt-3 text-4xl">{value ?? '—'}</div><div className="mt-2 text-[11px] text-[#81796c]">{note}</div></div>;
}

function MatchReview({ request }: { request: BuyerRequest }) {
  const matches = useListRequestMatches(request.id, { query: { queryKey: getListRequestMatchesQueryKey(request.id) } });
  const { t } = useLanguage();
  return <div className="mt-4 border-l border-[#c9bea9] pl-4">
    <div className="flex items-center justify-between gap-3"><p className="font-mono-label text-[9px] uppercase tracking-[.14em] text-[#81796c]">{t('dashReview.privateIntroductions')}</p><span className="font-mono-label text-[10px] text-[#827968]">{matches.isLoading ? '…' : matches.data?.length ?? 0}</span></div>
    {matches.isLoading ? <div className="mt-3 h-8 animate-pulse bg-[#e9e4da]" /> : matches.isError ? <button onClick={() => matches.refetch()} className="mt-3 text-xs text-[#8c624f]" data-testid={`button-retry-matches-${request.id}`}>{t('dashReview.couldNotLoad')}</button> : matches.data?.length ? <div className="mt-3 space-y-3">{matches.data.map(m => <div key={m.id} className="border-t border-[#e0d9ce] pt-3"><div className="flex justify-between gap-3"><span className="text-sm">{m.confidentialIdentity ? t('dashReview.identityWithheld') : m.businessName || t('dashReview.identityWithheld')}</span><span className="font-mono-label text-[9px] uppercase text-[#857b69]">{m.status.replaceAll('_', ' ')}</span></div><p className="mt-1 text-xs leading-5 text-[#6d675d]">{m.matchRationale}</p><p className="mt-2 text-[10px] text-[#8a8274]">{m.industry}{m.confidentialIdentity ? '' : ` · ${m.location}`}</p></div>)}</div> : <p className="mt-2 text-xs leading-5 text-[#81796c]">{t('dashReview.noIntroductions')}</p>}
  </div>;
}

function SavedRequestRow({ request }: { request: BuyerRequest }) {
  const save = useSaveBuyerRequest();
  const client = useQueryClient();
  const { t } = useLanguage();
  return <div><RequestCard request={request} compact /><div className="-mt-3 flex justify-end pb-5"><button type="button" disabled={save.isPending} onClick={() => save.mutate({ requestId: request.id, data: { saved: false } }, { onSuccess: () => {
    client.invalidateQueries({ queryKey: getListMySavedRequestsQueryKey() });
    client.invalidateQueries({ queryKey: getGetMySummaryQueryKey() });
  } })} className="border border-[#cfc8bc] px-3 py-2 text-[10px] uppercase tracking-wider text-[#6b665d] disabled:opacity-50" data-testid={`button-unsave-${request.id}`}>{save.isPending ? t('dashReview.removing') : t('dashReview.removeSaved')}</button></div></div>;
}

export function DashboardPage() {
  const summary = useGetMySummary();
  const requests = useListMyBuyerRequests();
  const submissions = useListMySubmissions();
  const saved = useListMySavedRequests();
  const [tab, setTab] = useState<'buyer' | 'finder' | 'saved'>('buyer');
  const { t } = useLanguage();
  return <PageFrame>
    <DemoShowcase />
    <div className="mx-auto max-w-[1280px] px-5 py-10 md:px-10 md:py-16">
    <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end"><div><Eyebrow>{t('dash.eyebrow')}</Eyebrow><h1 className="font-editorial mt-4 text-5xl tracking-[-.03em] md:text-6xl">{t('dash.title')}</h1><p className="mt-3 text-sm text-[#6b665d]">{t('dash.subtitle')}</p></div><Link href="/post-request" className="inline-flex h-12 items-center justify-center gap-2 bg-[#38352f] px-5 text-xs uppercase tracking-wider text-[#f5f2eb]">{t('dash.createRequest')} <ArrowRight size={14} /></Link></div>
    {summary.isError && <div className="mt-8"><ErrorState onRetry={() => summary.refetch()} /></div>}
    <div className="mt-9 grid grid-cols-2 gap-7 border-y border-[#d4cdc1] py-6 md:grid-cols-5">{summary.isLoading ? Array.from({ length: 5 }, (_, i) => <div key={i} className="animate-pulse"><div className="h-2 w-20 bg-[#e4ded3]" /><div className="mt-4 h-8 w-12 bg-[#e4ded3]" /></div>) : <><Metric title={t('dash.metricRequests')} value={summary.data?.requestCount} note={t('dash.metricRequestsNote')} /><Metric title={t('dash.metricMatches')} value={summary.data?.submissionCount} note={t('dash.metricMatchesNote')} /><Metric title={t('dash.metricSaved')} value={summary.data?.savedCount} note={t('dash.metricSavedNote')} /><Metric title={t('dash.metricReviews')} value={summary.data?.reviewCount} note={t('dash.metricReviewsNote')} /><Metric title={t('dash.metricIntroductions')} value="—" note={t('dash.metricIntroductionsNote')} /></>}</div>
    <AccountPlanPanel requestViewsUsed={summary.data?.requestViewsUsedThisMonth} submissionsUsed={summary.data?.submissionsUsedThisMonth} />
    <div className="mt-10 flex flex-wrap gap-2 border-b border-[#d4cdc1]">
      {([['buyer', t('dash.tabMyRequests')], ['finder', t('dash.tabMyMatches')], ['saved', t('dash.tabSaved')]] as const).map(([key, text]) => <button type="button" onClick={() => setTab(key)} key={key} className={`border-b-2 px-4 py-3 text-xs uppercase tracking-wider ${tab === key ? 'border-[#a58f5c] text-[#4b453a]' : 'border-transparent text-[#8b8478]'}`} data-testid={`tab-${key}`}>{text}</button>)}
    </div>
    {tab === 'buyer' && <section className="mt-8">
      {requests.isLoading ? <LoadingRows /> : requests.isError ? <ErrorState onRetry={() => requests.refetch()} /> : requests.data?.length ? <div className="divide-y divide-[#d4cdc1]">{requests.data.map(request => <div key={request.id} className="grid gap-5 py-6 md:grid-cols-[1fr_320px]"><div><div className="flex flex-wrap gap-2">{request.isExample && <span className="border border-[#b9a16d] px-2 py-1 font-mono-label text-[9px] tracking-wider text-[#78643a]">{t('dashReview.submitted')}</span>}<span className="font-mono-label text-[9px] uppercase tracking-wider text-[#827968]">{request.privacy.replaceAll('_', ' ')}</span></div><Link href={`/requests/${request.id}`} className="font-editorial mt-3 block text-2xl hover:text-[#806c42]">{request.title}</Link><p className="mt-2 text-xs text-[#777064]">{request.industry} · {request.businessCategory} · {request.country}</p><p className="mt-3 line-clamp-2 text-sm leading-6 text-[#6b665d]">{request.preferredProfile}</p><Link href={`/requests/${request.id}`} className="mt-4 inline-flex items-center gap-2 text-[10px] uppercase tracking-wider">{t('dashReview.viewRequest')} <ArrowRight size={13} /></Link></div><MatchReview request={request} /></div>)}</div> : <EmptyState title={t('dash.noRequests')} body={t('dash.noRequestsBody')} action={<ButtonLink href="/post-request">{t('dash.createRequest')}</ButtonLink>} />}
    </section>}
    {tab === 'finder' && <section className="mt-8">{submissions.isLoading ? <LoadingRows /> : submissions.isError ? <ErrorState onRetry={() => submissions.refetch()} /> : submissions.data?.length ? <div className="divide-y divide-[#d4cdc1]">{submissions.data.map(item => <div key={item.id} className="py-6"><div className="flex flex-wrap items-center justify-between gap-3"><h2 className="font-editorial text-2xl">{item.businessName || t('dashReview.confidentialOpp')}</h2><span className="border border-[#cfc8bc] px-2 py-1 font-mono-label text-[9px] uppercase tracking-wider text-[#726956]">{item.status.replaceAll('_', ' ')}</span></div><p className="mt-2 text-xs text-[#777064]">{item.industry} · {item.location} · {t('dashReview.submitted')} {new Date(item.createdAt).toLocaleDateString()}</p><p className="mt-3 max-w-3xl text-sm leading-6 text-[#6b665d]">{item.matchRationale}</p><p className="mt-2 text-xs text-[#847d70]">{t('dashReview.request')} <Link href={`/requests/${item.requestId}`} className="underline underline-offset-2">{t('dashReview.viewRequest')}</Link></p></div>)}</div> : <EmptyState title={t('dash.noMatches')} body={t('dash.noMatchesBody')} action={<ButtonLink href="/requests">{t('forFinders.cta')}</ButtonLink>} />}</section>}
    {tab === 'saved' && <section className="mt-8">{saved.isLoading ? <LoadingRows /> : saved.isError ? <ErrorState onRetry={() => saved.refetch()} /> : saved.data?.length ? saved.data.map(request => <SavedRequestRow key={request.id} request={request} />) : <EmptyState title={t('dash.noSaved')} body={t('dash.noSavedBody')} action={<ButtonLink href="/requests">{t('forFinders.cta')}</ButtonLink>} />}</section>}
    <section className="mt-12"><PrivacyNote>{t('privacy.noteDashboard')}</PrivacyNote></section>
  </div></PageFrame>;
}
