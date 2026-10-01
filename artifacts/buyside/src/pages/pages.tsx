import { useMemo, useState, type ReactNode } from 'react';
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
import {
  ButtonLink, EmptyState, ErrorState, Eyebrow, LoadingRows,
  PrivacyNote, PublicLayout, RequestCard, SectionTitle, money,
} from '@/components/site';

const field = 'h-12 w-full border border-[#cfc8bc] bg-[#fbfaf7] px-3 text-[14px] outline-none transition focus:border-[#9a8352] focus:ring-1 focus:ring-[#9a8352]';
const area = 'min-h-28 w-full border border-[#cfc8bc] bg-[#fbfaf7] px-3 py-3 text-[14px] outline-none transition focus:border-[#9a8352] focus:ring-1 focus:ring-[#9a8352]';
const label = 'mb-2 block font-mono-label text-[10px] uppercase tracking-[.12em] text-[#625d53]';

function PageFrame({ children, dark = false }: { children: ReactNode; dark?: boolean }) {
  return <PublicLayout><main className={dark ? 'bg-[#34322d] text-[#f3efe7]' : ''}>{children}</main></PublicLayout>;
}

function HeroVisual() {
  return <div className="relative min-h-[360px] overflow-hidden bg-[#36352f] md:min-h-[500px]">
    <div className="absolute inset-0 opacity-80" style={{ background: 'radial-gradient(ellipse at 56% 48%, rgba(185,161,109,.15), transparent 43%), linear-gradient(135deg,#393932 0%,#2c2d28 68%,#454239 100%)' }} />
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="relative aspect-square w-[75%] max-w-[370px]">
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
  const requests = useListBuyerRequests({ sort: 'newest' });
  const list = (requests.data || []).slice(0, 3);
  return <PageFrame>
    <section className="mx-auto grid max-w-[1280px] lg:min-h-[660px] lg:grid-cols-[1.08fr_.92fr]">
      <div className="flex flex-col justify-center px-5 py-16 md:px-10 md:py-24 lg:py-28">
        <Eyebrow>THE GLOBAL BUYER REQUEST NETWORK</Eyebrow>
        <h1 className="font-editorial mt-7 max-w-[780px] text-[46px] leading-[.99] tracking-[-.035em] md:text-[66px] lg:text-[76px]">Tell us what you want to buy. Let the network find it.</h1>
        <p className="mt-7 max-w-[560px] text-[15px] leading-7 text-[#6e685e]">BuySide connects serious buyers with brokers, business owners, advisors, and deal finders who can source businesses that match their acquisition criteria.</p>
        <div className="mt-9 flex flex-wrap gap-3"><ButtonLink href="/post-request">POST A BUYER REQUEST</ButtonLink><ButtonLink href="/requests" secondary>FIND A REQUEST TO MATCH</ButtonLink></div>
        <p className="mt-8 font-mono-label text-[10px] uppercase tracking-[.15em] text-[#918a7c]">Private opportunities. Qualified introductions. Success-based rewards.</p>
      </div>
      <HeroVisual />
    </section>
    <section className="mx-auto max-w-[1280px] px-5 py-20 md:px-10 md:py-28">
      <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end"><SectionTitle eyebrow="ACTIVE BUYER REQUESTS" title="What buyers are seeking" description="Current, published acquisition criteria. Example mandates are identified clearly." /><Link href="/requests" className="inline-flex items-center gap-2 pb-2 text-xs uppercase tracking-[.12em] text-[#655d4c] hover:text-[#9a8352]">Browse all demand <ArrowRight size={15} /></Link></div>
      <div className="mt-10">
        {requests.isLoading ? <LoadingRows /> : requests.isError ? <ErrorState onRetry={() => requests.refetch()} /> : list.length ? list.map(r => <RequestCard key={r.id} request={r} />) : <EmptyState title="No public criteria at the moment" body="New mandates appear here when buyers choose to publish them. You can still learn how the private network works." action={<ButtonLink href="/how-it-works" secondary>How it works</ButtonLink>} />}
      </div>
    </section>
    <section className="border-y border-[#d8d1c5] bg-[#ebe7dd]">
      <div className="mx-auto grid max-w-[1280px] gap-9 px-5 py-10 md:grid-cols-[.85fr_2fr] md:items-center md:px-10 md:py-12">
        <Eyebrow>One clear starting point</Eyebrow><p className="font-editorial max-w-3xl text-[25px] leading-[1.25] md:text-[32px]">BuySide is organized around acquisition criteria—not inventory. Share only what is needed to assess fit, then decide together what comes next.</p>
      </div>
    </section>
    <section className="bg-[#34322d] text-[#f3efe7]">
      <div className="mx-auto grid max-w-[1280px] gap-14 px-5 py-20 md:grid-cols-2 md:items-center md:px-10 md:py-28">
        <div><Eyebrow light>Intent before introduction</Eyebrow><h2 className="font-editorial mt-5 max-w-xl text-4xl leading-tight md:text-6xl">The right conversation begins with fit.</h2><p className="mt-6 max-w-lg text-sm leading-7 text-[#c1bcb2]">A buyer mandate gives owners and their advisors a discreet way to understand whether an opportunity is relevant before identity is shared.</p><div className="mt-8"><ButtonLink href="/how-it-works">Understand the process</ButtonLink></div></div>
        <div className="grid gap-0 border-y border-[#5a574e]">{[['01', 'Set the brief', 'Buyers publish the industries, size, geography and profile that matter.'], ['02', 'Introduce privately', 'Finders can submit a potential match with context and their relationship to it.'], ['03', 'Choose the next step', 'The buyer reviews a submission and decides whether to progress.']].map(([n, t, d]) => <div key={n} className="grid grid-cols-[50px_1fr] gap-4 border-b border-[#5a574e] py-6 last:border-0"><span className="font-mono-label text-xs text-[#b9a16d]">{n}</span><div><h3 className="font-editorial text-2xl">{t}</h3><p className="mt-2 text-sm leading-6 text-[#c1bcb2]">{d}</p></div></div>)}</div>
      </div>
    </section>
    <section className="mx-auto grid max-w-[1280px] gap-10 px-5 py-20 md:grid-cols-[.75fr_1.25fr] md:px-10 md:py-28"><div><Eyebrow>For the people who make a deal</Eyebrow><h2 className="font-editorial mt-5 text-4xl leading-tight md:text-5xl">Built for both sides of a thoughtful introduction.</h2></div><div className="grid gap-10 sm:grid-cols-2"><div className="border-t border-[#cfc8bc] pt-5"><h3 className="font-editorial text-2xl">Buyers</h3><p className="mt-3 text-sm leading-6 text-[#6b665d]">Make your criteria legible and receive relevant opportunities without broadcasting a wish list across the market.</p><Link className="mt-5 inline-flex items-center gap-2 text-xs uppercase tracking-wider" href="/for-buyers">Buyer approach <ArrowUpRight size={14} /></Link></div><div className="border-t border-[#cfc8bc] pt-5"><h3 className="font-editorial text-2xl">Finders</h3><p className="mt-3 text-sm leading-6 text-[#6b665d]">Bring qualified context to acquisition searches as a broker, advisor, owner or connected deal finder.</p><Link className="mt-5 inline-flex items-center gap-2 text-xs uppercase tracking-wider" href="/for-finders">Finder eligibility <ArrowUpRight size={14} /></Link></div></div></section>
    <Compliance />
  </PageFrame>;
}

export function RequestMarketplace() {
  const [filters, setFilters] = useState({ search: '', industry: '', country: '', region: '', city: '', minBudget: '', maxBudget: '', verifiedOnly: false, sort: 'newest' as 'newest' | 'highest_budget' | 'highest_reward' | 'closing_soon' });
  const params = useMemo(() => ({
    ...(filters.search ? { search: filters.search } : {}), ...(filters.industry ? { industry: filters.industry } : {}),
    ...(filters.country ? { country: filters.country } : {}), ...(filters.region ? { region: filters.region } : {}),
    ...(filters.city ? { city: filters.city } : {}), ...(filters.minBudget ? { minBudget: Number(filters.minBudget) } : {}),
    ...(filters.maxBudget ? { maxBudget: Number(filters.maxBudget) } : {}), ...(filters.verifiedOnly ? { verifiedOnly: true } : {}),
    sort: filters.sort,
  }), [filters]);
  const query = useListBuyerRequests(params);
  const requests = query.data || [];
  return <PageFrame><div className="mx-auto max-w-[1280px] px-5 py-12 md:px-10 md:py-20">
    <div className="grid gap-8 md:grid-cols-[1fr_auto] md:items-end"><div><Eyebrow>Request marketplace</Eyebrow><h1 className="font-editorial mt-4 text-5xl tracking-[-.03em] md:text-7xl">Buyer demand</h1><p className="mt-5 max-w-xl text-sm leading-7 text-[#6b665d]">Search public acquisition criteria. Private requests are not listed here.</p></div><Link href="/post-request" className="inline-flex h-12 items-center justify-center gap-2 bg-[#38352f] px-5 text-xs uppercase tracking-wider text-[#f5f2eb]">Publish a mandate <ArrowRight size={15} /></Link></div>
    <div className="mt-10 border-y border-[#d4cdc1] py-5">
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <label className="sm:col-span-2"><span className={label}>Search criteria</span><span className="relative block"><Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#918a7c]" /><input className={`${field} pl-10`} placeholder="Industry, title or profile" value={filters.search} onChange={e => setFilters({ ...filters, search: e.target.value })} data-testid="input-search-requests" /></span></label>
        {(['industry', 'country', 'region', 'city'] as const).map(key => <label key={key}><span className={label}>{key}</span><input className={field} placeholder={`Any ${key}`} value={filters[key]} onChange={e => setFilters({ ...filters, [key]: e.target.value })} data-testid={`input-filter-${key}`} /></label>)}
        <label><span className={label}>Minimum budget</span><input className={field} type="number" min="0" placeholder="USD" value={filters.minBudget} onChange={e => setFilters({ ...filters, minBudget: e.target.value })} data-testid="input-min-budget" /></label>
        <label><span className={label}>Maximum budget</span><input className={field} type="number" min="0" placeholder="USD" value={filters.maxBudget} onChange={e => setFilters({ ...filters, maxBudget: e.target.value })} data-testid="input-max-budget" /></label>
        <label><span className={label}>Sort by</span><select className={field} value={filters.sort} onChange={e => setFilters({ ...filters, sort: e.target.value as typeof filters.sort })} data-testid="select-sort"><option value="newest">Recently published</option><option value="highest_budget">Highest budget</option><option value="highest_reward">Potential finder reward</option><option value="closing_soon">Closing soon</option></select></label>
      </div>
      <label className="mt-4 flex cursor-pointer items-center gap-2 text-xs text-[#5f5a51]"><input type="checkbox" checked={filters.verifiedOnly} onChange={e => setFilters({ ...filters, verifiedOnly: e.target.checked })} data-testid="checkbox-verified" /> Verified buyers only</label>
    </div>
    <div className="mb-3 mt-8 flex items-center justify-between"><Eyebrow>{query.isLoading ? 'Retrieving published criteria' : `${requests.length} published ${requests.length === 1 ? 'mandate' : 'mandates'}`}</Eyebrow><Link href="/confidentiality" className="inline-flex items-center gap-1 text-[11px] text-[#786b52]"><LockKeyhole size={13} /> Privacy principles</Link></div>
    {query.isLoading ? <LoadingRows count={4} /> : query.isError ? <ErrorState onRetry={() => query.refetch()} /> : requests.length ? requests.map(r => <RequestCard request={r} key={r.id} />) : <EmptyState title="No criteria match these filters" body="Try a broader location or budget, or clear a search term to see more buyer demand." action={<button onClick={() => setFilters({ search: '', industry: '', country: '', region: '', city: '', minBudget: '', maxBudget: '', verifiedOnly: false, sort: 'newest' })} className="border border-[#cfc8bc] px-4 py-2 text-xs uppercase tracking-wider" data-testid="button-clear-filters">Clear filters</button>} />}
  </div></PageFrame>;
}

export function RequestDetail() {
  const [, params] = useRoute('/requests/:requestId');
  const id = params?.requestId || '';
  const query = useGetBuyerRequest(id, { query: { enabled: !!id, queryKey: getGetBuyerRequestQueryKey(id) } });
  const auth = useAuth();
  const savedRequests = useListMySavedRequests({ query: { enabled: !!auth.isSignedIn, queryKey: getListMySavedRequestsQueryKey() } });
  const save = useSaveBuyerRequest();
  const client = useQueryClient();
  const request = query.data;
  const isSaved = savedRequests.data?.some(item => item.id === request?.id) ?? false;
  return <PageFrame>{query.isLoading ? <div className="mx-auto max-w-4xl px-5 py-20"><LoadingRows /></div> : query.isError || !request ? <div className="mx-auto max-w-4xl px-5 py-20"><ErrorState onRetry={() => query.refetch()} /></div> : <div className="mx-auto max-w-[1100px] px-5 py-10 md:px-10 md:py-16">
    <Link href="/requests" className="inline-flex items-center gap-2 text-xs uppercase tracking-wider text-[#716956]"><ArrowLeft size={14} /> All buyer demand</Link>
    <div className="mt-10 grid gap-12 lg:grid-cols-[1fr_300px]">
      <article><div className="flex flex-wrap gap-2">{request.isExample && <span className="border border-[#b9a16d] px-2 py-1 font-mono-label text-[9px] tracking-wider text-[#78643a]">EXAMPLE REQUEST</span>}{request.isVerified && <span className="inline-flex items-center gap-1 font-mono-label text-[9px] tracking-wider text-[#557165]"><ShieldCheck size={12} /> VERIFIED</span>}</div>
      <Eyebrow>Acquisition criteria</Eyebrow><h1 className="font-editorial mt-4 text-4xl leading-tight tracking-[-.025em] md:text-6xl">{request.title}</h1>
      <p className="mt-5 text-sm text-[#6b665d]">{request.industry} · {request.businessCategory} · {request.buyerType.replaceAll('_', ' ')}</p>
      <div className="mt-10 grid grid-cols-2 gap-x-8 gap-y-7 border-y border-[#d4cdc1] py-7">
        <DetailValue label="Geography" value={[request.city, request.region, request.country].filter(Boolean).join(', ') || 'Flexible'} /><DetailValue label="Purchase range" value={`${money(request.minimumPurchasePrice)} – ${money(request.maximumPurchasePrice)}`} />
        <DetailValue label="Minimum revenue" value={money(request.minimumRevenue)} /><DetailValue label="Minimum EBITDA" value={money(request.minimumEbitda)} />
        <DetailValue label="Cash flow" value={money(request.minimumCashFlow)} /><DetailValue label="Timing" value={request.timeline || 'Not specified'} />
      </div>
      <DetailText title="Preferred profile" content={request.preferredProfile} /><DetailText title="Exclusions" content={request.dealExclusions} />
      {request.rewardDisclosure && <section className="mt-8"><Eyebrow>Potential finder reward</Eyebrow><p className="mt-3 whitespace-pre-line text-sm leading-7 text-[#625d53]">{request.rewardDisclosure}</p><p className="mt-2 text-xs leading-5 text-[#81796c]">Any reward is potential only and subject to qualifications, buyer acceptance, applicable law and a separate agreement. It is not guaranteed.</p></section>}
      <DetailText title="Confidentiality" content={`Request privacy: ${request.privacy.replaceAll('_', ' ')}. ${request.remoteAccepted ? 'Remote or location-flexible opportunities may be considered.' : 'Geography should align with the stated criteria.'}`} />
      </article>
      <aside className="lg:pt-14"><div className="border border-[#d4cdc1] bg-[#f8f6f0] p-5"><Eyebrow>Have a relevant opportunity?</Eyebrow><p className="font-editorial mt-3 text-2xl leading-tight">A private introduction starts here.</p><p className="mt-3 text-xs leading-5 text-[#6b665d]">Share the business profile and your relationship to it. Identifying details can remain confidential at submission.</p><Link href={`/submit/${request.id}`} className="mt-6 flex h-12 items-center justify-center gap-2 bg-[#38352f] px-4 text-[11px] uppercase tracking-wider text-[#f5f2eb]">Submit a potential match <ArrowRight size={14} /></Link>
      <Show when="signed-in"><button disabled={save.isPending} onClick={() => save.mutate({ requestId: request.id, data: { saved: !isSaved } }, { onSuccess: () => { client.invalidateQueries({ queryKey: getListMySavedRequestsQueryKey() }); client.invalidateQueries({ queryKey: getGetMySummaryQueryKey() }); } })} className="mt-3 h-11 w-full border border-[#cfc8bc] text-[11px] uppercase tracking-wider disabled:opacity-50" data-testid="button-save-request">{save.isPending ? 'Saving…' : isSaved ? 'Remove saved criteria' : 'Save criteria'}</button></Show>
      <Show when="signed-out"><Link href="/sign-in" className="mt-3 flex h-11 w-full items-center justify-center border border-[#cfc8bc] text-[11px] uppercase tracking-wider">Sign in to save</Link></Show>
      <div className="mt-5"><PrivacyNote>Do not include identifiable information in an initial submission unless you are authorized to share it and the owner has agreed.</PrivacyNote></div></div></aside>
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
  const requestQuery = useGetBuyerRequest(id, { query: { enabled: !!id, queryKey: getGetBuyerRequestQueryKey(id) } });
  const submit = useSubmitMatch();
  const queryClient = useQueryClient();
  const [sent, setSent] = useState(false);
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
  if (sent) return <PageFrame><div className="mx-auto max-w-3xl px-5 py-24 text-center"><div className="mx-auto grid size-14 place-items-center border border-[#b9a16d] text-[#8a7547]"><Check size={22} /></div><Eyebrow>Submission received</Eyebrow><h1 className="font-editorial mt-4 text-5xl">Your introduction is in review.</h1><p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-[#6b665d]">The buyer can review your submission against their criteria. Any next step will depend on their review.</p><div className="mt-8"><ButtonLink href="/dashboard">Go to dashboard</ButtonLink></div></div></PageFrame>;
  const request = requestQuery.data;
  return <PageFrame><div className="mx-auto max-w-[920px] px-5 py-10 md:px-10 md:py-16"><Link href={`/requests/${id}`} className="inline-flex items-center gap-2 text-xs uppercase tracking-wider text-[#716956]"><ArrowLeft size={14} /> Review buyer criteria</Link>
    <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_280px]">
      <div><Eyebrow>Private match submission</Eyebrow><h1 className="font-editorial mt-4 text-5xl tracking-[-.03em]">Introduce an opportunity.</h1><p className="mt-4 text-sm leading-7 text-[#6b665d]">Share enough context for the buyer to assess fit. Do not disclose confidential information without authorization.</p>
      <Form {...form}><form onSubmit={onSubmit} className="mt-8 space-y-7">
        <fieldset className="grid gap-4 sm:grid-cols-2"><legend className="mb-4 font-editorial text-2xl">Business overview</legend><label><span className={label}>Business name <span className="normal-case text-[#918a7c]">(optional)</span></span><input className={field} {...val('businessName')} data-testid="input-business-name" /></label><label><span className={label}>Industry</span><input required className={field} {...val('industry', { required: true })} data-testid="input-business-industry" /></label><label><span className={label}>Location</span><input required className={field} {...val('location', { required: true })} data-testid="input-business-location" /></label><label><span className={label}>Asking price (USD)</span><input className={field} type="number" min="0" {...val('askingPrice', { valueAsNumber: true })} data-testid="input-asking-price" /></label><label><span className={label}>Annual revenue</span><input className={field} type="number" min="0" {...val('annualRevenue', { valueAsNumber: true })} data-testid="input-revenue" /></label><label><span className={label}>EBITDA</span><input className={field} type="number" {...val('ebitda', { valueAsNumber: true })} data-testid="input-ebitda" /></label><label><span className={label}>Cash flow</span><input className={field} type="number" {...val('cashFlow', { valueAsNumber: true })} data-testid="input-cash-flow" /></label><label><span className={label}>Employees</span><input className={field} type="number" min="0" {...val('employeeCount', { valueAsNumber: true })} data-testid="input-employee-count" /></label><label><span className={label}>Years operating</span><input className={field} type="number" min="0" {...val('yearsOperating', { valueAsNumber: true })} data-testid="input-years-operating" /></label></fieldset>
        <label className="block"><span className={label}>Short business description</span><textarea required minLength={10} className={area} {...val('shortDescription', { required: true, minLength: 10 })} data-testid="input-description" /></label>
        <label className="block"><span className={label}>Why this fits the buyer's criteria</span><textarea required minLength={10} className={area} {...val('matchRationale', { required: true, minLength: 10 })} data-testid="input-match-rationale" /></label>
        <fieldset className="grid gap-4 sm:grid-cols-2"><legend className="mb-4 font-editorial text-2xl">Your relationship</legend><label><span className={label}>Your relationship to the opportunity</span><input className={field} placeholder="Broker, advisor, owner, other" {...val('relationship')} data-testid="input-relationship" /></label><label><span className={label}>Owner contact status</span><input className={field} placeholder="Describe current contact" {...val('ownerContactStatus')} data-testid="input-owner-contact" /></label><label><span className={label}>Broker status</span><input className={field} placeholder="Describe representation, if any" {...val('brokerStatus')} data-testid="input-broker-status" /></label></fieldset>
        <label className="flex items-start gap-3 text-[12px] leading-5 text-[#625d53]"><input type="checkbox" className="mt-1" checked={form.watch('confidentialIdentity')} onChange={e => form.setValue('confidentialIdentity', e.target.checked)} data-testid="checkbox-confidential-identity" />Keep the business identity confidential in this initial submission.</label>
        {submit.isError && <p className="border border-[#d7c3b8] bg-[#f8f2ed] p-3 text-sm text-[#815d4f]" role="alert">We could not submit this introduction. Review the form and try again.</p>}
        <button disabled={submit.isPending} className="flex h-12 w-full items-center justify-center gap-2 bg-[#38352f] text-xs uppercase tracking-wider text-[#f5f2eb] disabled:opacity-50 sm:w-auto sm:px-8" type="submit" data-testid="button-submit-match">{submit.isPending ? 'Submitting securely…' : 'Submit private introduction'} <ArrowRight size={14} /></button>
      </form></Form>
      </div>
      <aside className="lg:pt-12"><div className="border border-[#d4cdc1] bg-[#f8f6f0] p-5"><Eyebrow>Buyer criteria</Eyebrow><h2 className="font-editorial mt-3 text-2xl">{request.title}</h2>{request.isExample && <div className="mt-3 inline-block border border-[#b9a16d] px-2 py-1 font-mono-label text-[9px] tracking-wider text-[#78643a]">EXAMPLE REQUEST</div>}<p className="mt-3 text-xs leading-5 text-[#6b665d]">{request.industry} · {request.businessCategory}</p><Link href={`/requests/${id}`} className="mt-5 inline-flex items-center gap-2 text-[11px] uppercase tracking-wider">See full criteria <ArrowRight size={13} /></Link></div><div className="mt-4"><PrivacyNote>Potential finder rewards are subject to the request's disclosure, eligibility, buyer acceptance and any separate agreement. No reward is guaranteed.</PrivacyNote></div></aside>
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
  return <EditorialPage eyebrow="For acquisition buyers" title="Make your criteria work harder." intro="BuySide gives serious buyers a clear, discreet way to describe the businesses they want to acquire—and a place for relevant opportunities to find them." cta={{ label: 'Publish acquisition criteria', href: '/post-request' }}>
    <EditorialBlock n="01" title="Be specific, not exposed">Set the sectors, business profile, geography, financial parameters and timing you are genuinely prepared to consider. Publish only at the privacy level that fits.</EditorialBlock>
    <EditorialBlock n="02" title="Receive context with the introduction">Submissions can include the business profile, fit rationale and the submitter's relationship to the opportunity. Review what is shared before deciding whether to engage.</EditorialBlock>
    <EditorialBlock n="03" title="Stay in control">Your mandate is not a public listing of your identity or investment capacity. You decide whether a potential fit should move forward, and what information to request next.</EditorialBlock>
    <div className="border-l-2 border-[#b9a16d] bg-[#eeebe3] p-5 text-xs leading-6 text-[#625d53]">BuySide does not represent buyers, negotiate transactions, or provide investment, legal, tax or accounting advice. All acquisition decisions remain yours.</div>
  </EditorialPage>;
}

export function ForFindersPage() {
  return <EditorialPage eyebrow="For brokers, owners & deal finders" title="A well-placed introduction can matter." intro="Bring forward opportunities that fit a buyer's stated criteria. BuySide is designed for informed, relationship-aware introductions—not anonymous lead generation." cta={{ label: 'Explore buyer demand', href: '/requests' }}>
    <EditorialBlock n="01" title="Who may submit">Business owners, brokers, M&A advisors, accountants, attorneys and other deal finders may submit a potential match when they are authorized to share the information and can explain their connection.</EditorialBlock>
    <EditorialBlock n="02" title="Confidentiality comes first">Start with non-identifying business context unless the owner has authorized disclosure. Avoid sharing personal information, client materials or confidential documents without permission.</EditorialBlock>
    <EditorialBlock n="03" title="A potential success-based reward">Qualified introductions that result in completed transactions may earn a success-based reward of up to 8% of the final transaction value, subject to applicable terms, transaction structure, licensing requirements, and jurisdiction.</EditorialBlock>
    <div className="border-l-2 border-[#b9a16d] bg-[#eeebe3] p-5 text-sm font-semibold leading-6 text-[#625d53]">No closing. No finder reward.</div>
    <p className="text-xs leading-6 text-[#6b665d]">Reward eligibility, amount, payment timing, and legal requirements vary by transaction, structure, jurisdiction, and participant status. Terms must be confirmed before an introduction or submission.</p>
    <p className="text-xs leading-6 text-[#6b665d]">No reward is promised or guaranteed. Any compensation depends on applicable terms, transaction structure, licensing requirements, jurisdiction and a separate agreement.</p>
  </EditorialPage>;
}

export function HowItWorksPage() {
  return <EditorialPage eyebrow="How it works" title="A measured path from criteria to conversation." intro="The process begins with a buyer's actual acquisition intent. Each party can assess relevance before deciding whether to share more." cta={{ label: 'See current buyer demand', href: '/requests' }}>
    <EditorialBlock n="01" title="A buyer publishes a mandate">Buyers define the industry, business profile, geographic preference, financial range and timing. Privacy settings determine how the request is presented.</EditorialBlock>
    <EditorialBlock n="02" title="A finder submits a possible match">The submitter provides business context, explains why the opportunity may fit and states their relationship to it. Initial identity details can be kept confidential.</EditorialBlock>
    <EditorialBlock n="03" title="The buyer reviews the submission">Buyers review potential matches against the criteria they published. Submissions are not endorsements, verified financials or a promise of follow-up.</EditorialBlock>
    <EditorialBlock n="04" title="Participants decide what comes next">If there is mutual interest, the parties can establish appropriate confidentiality, confirm representation and agree directly on next steps. BuySide does not negotiate the transaction.</EditorialBlock>
  </EditorialPage>;
}

export function PrivateNetworkPage() {
  return <EditorialPage eyebrow="A private network" title="A better setting for serious intent." intro="BuySide connects stated acquisition demand with people who may know a relevant business. It is not an open directory of businesses, buyers or intermediaries." cta={{ label: 'Review published criteria', href: '/requests' }} tone="dark">
    <EditorialBlock dark n="01" title="Acquisition buyers">Strategic acquirers, individual buyers, private equity firms, search funds and other qualified buyers may describe their criteria, subject to platform access and request settings.</EditorialBlock>
    <EditorialBlock dark n="02" title="Owners and operators">Owners can learn whether a buyer's stated criteria align before choosing to share information or enter a conversation.</EditorialBlock>
    <EditorialBlock dark n="03" title="Brokers and advisors">Intermediaries can surface a relevant mandate to a client opportunity when authorized, while keeping roles and relationships clear.</EditorialBlock>
    <EditorialBlock dark n="04" title="Connected deal finders">People with a legitimate connection to a business may submit a potential match when they have permission to share appropriate information.</EditorialBlock>
  </EditorialPage>;
}

export function ConfidentialityPage() {
  return <EditorialPage eyebrow="Confidentiality" title="Share deliberately. Keep control of identity." intro="Private introductions only work when information is handled with care. BuySide is designed to support selective disclosure—not to replace consent, legal agreements or professional judgment." cta={{ label: 'Explore buyer demand', href: '/requests' }}>
    <EditorialBlock n="01" title="Start with non-identifying context">A first submission can describe the sector, location, business scale and fit without naming a company or owner. Only include information you are authorized to share.</EditorialBlock>
    <EditorialBlock n="02" title="Consent before sensitive disclosure">Do not upload or transmit trade secrets, personal data, financial records or confidential client materials without the necessary permission and safeguards. Use an NDA when appropriate.</EditorialBlock>
    <EditorialBlock n="03" title="Privacy settings have limits">Public, members-only, NDA-required and private request settings affect visibility. They do not guarantee anonymity or replace a signed confidentiality agreement.</EditorialBlock>
    <EditorialBlock n="04" title="Make introductions with care">Participants are responsible for confirming authority, representation, permissions and applicable disclosure obligations before sharing information or proceeding.</EditorialBlock>
    <Compliance />
  </EditorialPage>;
}

function Compliance() {
  return <section className="mx-auto max-w-[1280px] px-5 pb-12 pt-4 md:px-10 md:pb-16"><div className="border-t border-[#d8d1c5] pt-5"><p className="max-w-4xl text-[11px] leading-5 text-[#847d70]">BuySide is a technology and introduction platform. Certain activities, transactions, referral compensation, business brokerage, real estate transactions, securities transactions, financing activities, and other regulated activities may require licensed professionals depending on the transaction structure and jurisdiction. BuySide does not represent that every user or transaction is eligible for finder compensation.</p></div></section>;
}

const platformDisclaimer = 'BuySide is a technology and introduction platform. Certain activities, transactions, referral compensation, business brokerage, real estate transactions, securities transactions, financing activities, and other regulated activities may require licensed professionals depending on the transaction structure and jurisdiction. BuySide does not represent that every user or transaction is eligible for finder compensation.';
const draftStatus = 'This page is an initial draft and should be reviewed by counsel where appropriate before being relied upon as a complete policy or agreement.';

function LegalDocument({ eyebrow, title, intro, sections, showDisclaimer = true }: { eyebrow: string; title: string; intro: string; sections: { title: string; text: string }[]; showDisclaimer?: boolean }) {
  return <PageFrame><div className="mx-auto max-w-[980px] px-5 py-14 md:px-10 md:py-20">
    <Eyebrow>{eyebrow}</Eyebrow><h1 className="font-editorial mt-5 text-5xl tracking-[-.03em] md:text-7xl">{title}</h1><p className="mt-6 max-w-3xl text-sm leading-7 text-[#b9b5aa]">{intro}</p>
    <div className="mt-8 border-l-2 border-[#b9a16d] bg-[#eeebe3] p-5 text-sm leading-6 text-[#625d53]"><strong className="font-mono-label text-[10px] uppercase tracking-wider">Draft status</strong><p className="mt-2">{draftStatus}</p></div>
    <div className="mt-10 divide-y divide-[#46453e] border-y border-[#46453e]">{sections.map((section, i) => <section key={section.title} className="grid gap-4 py-6 md:grid-cols-[190px_1fr]"><h2 className="font-editorial text-2xl">{section.title}</h2><p className="max-w-2xl text-sm leading-7 text-[#b9b5aa]">{section.text}</p></section>)}</div>
    {showDisclaimer && <div className="mt-10 border border-[#46453e] p-5"><Eyebrow>Platform disclaimer</Eyebrow><p className="mt-3 text-sm leading-7 text-[#b9b5aa]">{platformDisclaimer}</p></div>}
  </div></PageFrame>;
}

export function TermsOfUsePage() {
  return <LegalDocument eyebrow="Legal · initial draft" title="Terms of Use" intro="A high-level draft for the BuySide technology and introduction platform. It is not a complete set of user terms." sections={[
    { title: 'Platform purpose', text: 'BuySide lets buyers publish acquisition criteria and lets other participants submit potential business matches. The current interface supports public request browsing, private submissions, request visibility settings and member workspaces.' },
    { title: 'Participant decisions', text: 'The product does not promise a response, transaction, verification, eligibility decision or outcome. The scope and conditions of a complete user agreement remain to be established and reviewed.' },
    { title: 'Completion needed', text: 'Operator identity, account rules, content handling, dispute procedures, governing law and other legal terms have not been drafted here. No additional terms are implied by this summary.' },
  ]} />;
}

export function PrivacyPolicyPage() {
  return <LegalDocument eyebrow="Legal · initial draft" title="Privacy Policy" intro="This draft intentionally does not make claims about data practices that are not specified in the product brief." sections={[
    { title: 'Information in the product', text: 'The interface collects the mandate and opportunity details participants submit, along with account access managed through Clerk. Request visibility and identity-confidentiality choices appear in the product.' },
    { title: 'Details still to be confirmed', text: 'The operator must document actual data retention, processors, sharing, deletion, security controls, jurisdictional rights and contact procedures before this draft can serve as a complete privacy policy.' },
    { title: 'No certification claims', text: 'This draft makes no representation about certifications, security standards, storage locations, encryption practices or compliance status.' },
  ]} />;
}

export function FinderTermsPage() {
  return <LegalDocument eyebrow="Legal · initial draft" title="Finder Terms" intro="A concise draft for people introducing potential business opportunities to a buyer request." sections={[
    { title: 'Authorized introductions', text: 'A finder should submit only information they are authorized to share and should describe their relationship to the opportunity. The platform does not determine licensing eligibility or approve a participant to perform regulated activity.' },
    { title: 'Potential reward', text: 'Qualified introductions that result in completed transactions may earn a success-based reward of up to 8% of the final transaction value, subject to applicable terms, transaction structure, licensing requirements, and jurisdiction.' },
    { title: 'Caution', text: 'Reward eligibility, amount, payment timing, and legal requirements vary by transaction, structure, jurisdiction, and participant status. Terms must be confirmed before an introduction or submission. No closing. No finder reward.' },
  ]} />;
}

export function BuyerTermsPage() {
  return <LegalDocument eyebrow="Legal · initial draft" title="Buyer Terms" intro="A high-level draft for buyers publishing acquisition criteria and reviewing potential introductions." sections={[
    { title: 'Buyer criteria', text: 'A buyer provides acquisition criteria and selects the request visibility available in the product. Buyers are responsible for the criteria and other information they submit.' },
    { title: 'Review and next steps', text: 'A submission is a potential match, not a verification, endorsement or promise of follow-up. Buyers decide whether to engage and are responsible for their own diligence and professional advice.' },
    { title: 'Completion needed', text: 'Eligibility, account responsibilities, information use, transaction process and other complete buyer terms remain to be established and reviewed. No additional obligations are implied by this summary.' },
  ]} />;
}

export function DisclaimerPage() {
  return <LegalDocument eyebrow="Legal · initial draft" title="Disclaimer" intro="Important context about the scope of the BuySide platform." sections={[
    { title: 'Technology and introductions', text: 'BuySide provides a technology and introduction platform. It does not promise transaction outcomes or determine whether an activity is legally permitted for a particular participant.' },
    { title: 'Independent review', text: 'Participants should assess their own circumstances, transaction structure and jurisdiction and seek advice from qualified professionals where appropriate.' },
  ]} />;
}

export function ContactPage() {
  return <LegalDocument eyebrow="Platform information" title="Contact" intro="Official contact details are not published on this page." sections={[
    { title: 'Contact route', text: 'A verified contact channel has not been provided for this product. This page does not invent an email address, telephone number or contact form. It will need an official platform contact route before publication.' },
    { title: 'Sensitive information', text: 'Do not send confidential business, personal, financial or transaction information to an unverified address or channel.' },
  ]} showDisclaimer={false} />;
}

export function PostRequestPage() {
  const [step, setStep] = useState(1);
  const [error, setError] = useState('');
  const [businessProfileDetails, setBusinessProfileDetails] = useState('');
  const [dealPreferences, setDealPreferences] = useState('');
  const [additionalNotes, setAdditionalNotes] = useState('');
  const [, setLocation] = useLocation();
  const queryClient = useQueryClient();
  const create = useCreateBuyerRequest();
  const form = useForm<BuyerRequestInput>({ defaultValues: { title: '', industry: '', businessCategory: '', buyerType: 'individual', country: '', region: '', city: '', radiusMiles: null, remoteAccepted: false, minimumPurchasePrice: null, maximumPurchasePrice: null, minimumRevenue: null, minimumEbitda: null, minimumCashFlow: null, preferredProfile: '', dealExclusions: '', timeline: '', rewardDisclosure: '', privacy: 'members_only' } });
  const r = form.register;
  const send = form.handleSubmit(values => {
    const numberOrNull = (v: unknown) => v === '' || v === null || v === undefined || (typeof v === 'number' && Number.isNaN(v)) ? null : Number(v);
    const compose = (base: string, heading: string, extra: string) => [base.trim(), extra.trim() ? `${heading}\n${extra.trim()}` : ''].filter(Boolean).join('\n\n');
    const data: BuyerRequestInput = {
      ...values,
      preferredProfile: compose(values.preferredProfile, 'Additional business-profile details', businessProfileDetails) + (additionalNotes.trim() ? `\n\nAdditional notes\n${additionalNotes.trim()}` : ''),
      dealExclusions: compose(values.dealExclusions, 'Deal preferences', dealPreferences),
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
    }, onError: () => setError('Your request could not be published. Please review the fields and try again.') });
  });
  const stepLabels = ['Acquisition Type', 'Location', 'Financial Criteria', 'Business Profile', 'Deal Preferences', 'Additional Notes', 'Finder Reward', 'Privacy'];
  const next = async () => {
    const names: (keyof BuyerRequestInput)[] = step === 1
      ? ['title', 'industry', 'businessCategory', 'buyerType', 'timeline']
      : step === 2 ? ['country'] : step === 4 ? ['preferredProfile'] : [];
    if (names.length && !(await form.trigger(names))) return;
    setStep(Math.min(8, step + 1));
  };
  return <PageFrame><div className="mx-auto max-w-[960px] px-5 py-10 md:px-10 md:py-16"><div className="flex items-center justify-between"><Link href="/for-buyers" className="inline-flex items-center gap-2 text-xs uppercase tracking-wider text-[#716956]"><ArrowLeft size={14} /> For buyers</Link><span className="font-mono-label text-[10px] uppercase tracking-wider text-[#8f8675]">Mandate · 0{step} / 08</span></div>
    <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_275px]"><div><Eyebrow>Publish acquisition criteria</Eyebrow><p className="mt-4 font-mono-label text-[10px] uppercase tracking-[.16em] text-[#a58f5c]">{stepLabels[step - 1]}</p><h1 className="font-editorial mt-3 text-5xl tracking-[-.03em] md:text-6xl">{stepLabels[step - 1]}</h1><p className="mt-4 max-w-xl text-sm leading-7 text-[#6b665d]">A useful mandate is specific about fit and thoughtful about what it discloses.</p>
      <Form {...form}><form onSubmit={step === 8 ? send : event => event.preventDefault()} className="mt-8 space-y-6">
        {step === 1 && <div className="grid gap-5 sm:grid-cols-2">
          <label className="sm:col-span-2"><span className={label}>Mandate title</span><input className={field} required {...r('title', { required: 'Add a short title', minLength: 3, maxLength: 120 })} placeholder="For example: Established regional services company" data-testid="input-request-title" /></label>
          <label><span className={label}>Industry</span><input className={field} required {...r('industry', { required: true })} data-testid="input-industry" /></label>
          <label><span className={label}>Business category</span><input className={field} required {...r('businessCategory', { required: true })} data-testid="input-business-category" /></label>
          <label><span className={label}>Buyer type</span><select className={field} {...r('buyerType')} data-testid="select-buyer-type"><option value="individual">Individual buyer</option><option value="strategic">Strategic buyer</option><option value="private_equity">Private equity</option><option value="search_fund">Search fund</option><option value="other">Other</option></select></label>
          <label><span className={label}>Acquisition timeline</span><input className={field} required {...r('timeline', { required: true })} placeholder="For example: Actively evaluating" data-testid="input-timeline" /></label>
        </div>}
        {step === 2 && <div className="grid gap-5 sm:grid-cols-2">
          <label><span className={label}>Country</span><input className={field} required {...r('country', { required: true })} data-testid="input-country" /></label>
          <label><span className={label}>Region or state</span><input className={field} {...r('region')} data-testid="input-region" /></label>
          <label><span className={label}>City</span><input className={field} {...r('city')} data-testid="input-city" /></label>
          <label><span className={label}>Preferred radius in miles</span><input className={field} type="number" min="0" max="5000" {...r('radiusMiles', { valueAsNumber: true })} data-testid="input-radius" /></label>
          <label className="flex items-center gap-3 text-sm sm:col-span-2"><input type="checkbox" {...r('remoteAccepted')} data-testid="checkbox-remote" /> Consider remote or location-flexible businesses</label>
        </div>}
        {step === 3 && <div className="grid gap-5 sm:grid-cols-2">
          <label><span className={label}>Minimum purchase price (USD)</span><input className={field} type="number" min="0" {...r('minimumPurchasePrice', { valueAsNumber: true })} data-testid="input-min-price" /></label>
          <label><span className={label}>Maximum purchase price (USD)</span><input className={field} type="number" min="0" {...r('maximumPurchasePrice', { valueAsNumber: true })} data-testid="input-max-price" /></label>
          <label><span className={label}>Minimum annual revenue</span><input className={field} type="number" min="0" {...r('minimumRevenue', { valueAsNumber: true })} data-testid="input-min-revenue" /></label>
          <label><span className={label}>Minimum EBITDA</span><input className={field} type="number" {...r('minimumEbitda', { valueAsNumber: true })} data-testid="input-min-ebitda" /></label>
          <label><span className={label}>Minimum cash flow</span><input className={field} type="number" {...r('minimumCashFlow', { valueAsNumber: true })} data-testid="input-min-cashflow" /></label>
        </div>}
        {step === 4 && <div className="space-y-5">
          <label className="block"><span className={label}>Preferred business profile</span><textarea className={area} required minLength={10} maxLength={1600} {...r('preferredProfile', { required: true, minLength: 10, maxLength: 1600 })} placeholder="Describe the business that best fits your acquisition." data-testid="input-profile" /></label>
          <label className="block"><span className={label}>Additional business-profile details</span><textarea className={area} maxLength={700} value={businessProfileDetails} onChange={e => setBusinessProfileDetails(e.target.value)} placeholder="Operating model, customer mix, team, owner involvement, or other fit details" data-testid="input-business-profile-details" /></label>
        </div>}
        {step === 5 && <div className="space-y-5">
          <label className="block"><span className={label}>Deal exclusions</span><textarea className={area} maxLength={1000} {...r('dealExclusions', { maxLength: 1000 })} placeholder="Industries, operating models, or circumstances that are not a fit" data-testid="input-exclusions" /></label>
          <label className="block"><span className={label}>Deal preferences</span><textarea className={area} maxLength={700} value={dealPreferences} onChange={e => setDealPreferences(e.target.value)} placeholder="Preferred deal structure, transition, seller involvement, or other deal preferences" data-testid="input-deal-preferences" /></label>
        </div>}
        {step === 6 && <div className="space-y-4">
          <label className="block"><span className={label}>Additional notes</span><textarea className={area} maxLength={500} value={additionalNotes} onChange={e => setAdditionalNotes(e.target.value)} placeholder="Anything else a potential introduction should know?" data-testid="input-additional-notes" /></label>
          <p className="text-xs leading-5 text-[#81796c]">Notes are saved with your preferred business profile. Keep sensitive information out of the mandate.</p>
        </div>}
        {step === 7 && <div className="space-y-5">
          <label className="block"><span className={label}>Potential finder reward disclosure <span className="normal-case text-[#918a7c]">(optional)</span></span><textarea className={area} maxLength={500} {...r('rewardDisclosure', { maxLength: 500 })} placeholder="Describe any potential reward and its conditions. A reward is not guaranteed." data-testid="input-reward" /></label>
          <PrivacyNote>Any reward is potential only and subject to applicable terms, transaction structure, licensing requirements and jurisdiction.</PrivacyNote>
        </div>}
        {step === 8 && <div className="space-y-5">
          <label className="block"><span className={label}>Request visibility</span><select className={field} {...r('privacy')} data-testid="select-privacy"><option value="public">Public — appears in marketplace</option><option value="members_only">Members only</option><option value="nda_required">NDA required</option><option value="private">Private — not listed publicly</option></select></label>
          <PrivacyNote>Publishing does not verify the buyer or guarantee a transaction. Do not include personal contact details or confidential material in the mandate.</PrivacyNote>
        </div>}
        {error && <p role="alert" className="border border-[#d7c3b8] bg-[#f8f2ed] p-3 text-sm text-[#815d4f]">{error}</p>}
        <div className="flex flex-wrap justify-between gap-3 border-t border-[#d4cdc1] pt-5">{step > 1 ? <button type="button" onClick={() => setStep(step - 1)} className="inline-flex h-12 items-center gap-2 border border-[#cfc8bc] px-5 text-xs uppercase tracking-wider" data-testid="button-previous"><ArrowLeft size={14} /> Previous</button> : <span />}
          {step < 8 ? <button type="button" onClick={next} className="inline-flex h-12 items-center gap-2 bg-[#38352f] px-6 text-xs uppercase tracking-wider text-[#f5f2eb]" data-testid="button-next">Continue <ArrowRight size={14} /></button> : <button disabled={create.isPending} type="submit" className="inline-flex h-12 items-center gap-2 bg-[#38352f] px-6 text-xs uppercase tracking-wider text-[#f5f2eb] disabled:opacity-50" data-testid="button-publish-request">{create.isPending ? 'Publishing…' : 'Publish mandate'} <ArrowRight size={14} /></button>}</div>
      </form></Form>
    </div><aside className="border border-[#d4cdc1] bg-[#f8f6f0] p-5 lg:mt-12"><Eyebrow>Mandate notes</Eyebrow><ul className="mt-4 space-y-4 text-xs leading-5 text-[#6b665d]"><li className="flex gap-2"><ShieldCheck size={15} className="shrink-0 text-[#887649]" />Choose a visibility level that fits your search.</li><li className="flex gap-2"><CircleHelp size={15} className="shrink-0 text-[#887649]" />You can leave financial thresholds blank if flexible.</li><li className="flex gap-2"><LockKeyhole size={15} className="shrink-0 text-[#887649]" />Avoid including personal or confidential information.</li></ul><div className="mt-6 border-t border-[#d4cdc1] pt-4 text-[10px] uppercase leading-5 tracking-wider text-[#827968]">Progress is saved when you publish.</div></aside></div></div></PageFrame>;
}

function Metric({ title, value, note }: { title: string; value?: number; note: string }) {
  return <div className="border-t border-[#d4cdc1] pt-4"><div className="font-mono-label text-[9px] uppercase tracking-[.15em] text-[#8c8475]">{title}</div><div className="font-editorial mt-3 text-4xl">{value ?? '—'}</div><div className="mt-2 text-[11px] text-[#81796c]">{note}</div></div>;
}

function MatchReview({ request }: { request: BuyerRequest }) {
  const matches = useListRequestMatches(request.id, { query: { queryKey: getListRequestMatchesQueryKey(request.id) } });
  return <div className="mt-4 border-l border-[#c9bea9] pl-4">
    <div className="flex items-center justify-between gap-3"><p className="font-mono-label text-[9px] uppercase tracking-[.14em] text-[#81796c]">Private introductions</p><span className="font-mono-label text-[10px] text-[#827968]">{matches.isLoading ? '…' : matches.data?.length ?? 0}</span></div>
    {matches.isLoading ? <div className="mt-3 h-8 animate-pulse bg-[#e9e4da]" /> : matches.isError ? <button onClick={() => matches.refetch()} className="mt-3 text-xs text-[#8c624f]" data-testid={`button-retry-matches-${request.id}`}>Could not load introductions. Retry.</button> : matches.data?.length ? <div className="mt-3 space-y-3">{matches.data.map(m => <div key={m.id} className="border-t border-[#e0d9ce] pt-3"><div className="flex justify-between gap-3"><span className="text-sm">{m.confidentialIdentity ? 'Identity withheld' : m.businessName || 'Identity withheld'}</span><span className="font-mono-label text-[9px] uppercase text-[#857b69]">{m.status.replaceAll('_', ' ')}</span></div><p className="mt-1 text-xs leading-5 text-[#6d675d]">{m.matchRationale}</p><p className="mt-2 text-[10px] text-[#8a8274]">{m.industry}{m.confidentialIdentity ? '' : ` · ${m.location}`}</p></div>)}</div> : <p className="mt-2 text-xs leading-5 text-[#81796c]">No introductions are available for review yet.</p>}
  </div>;
}

function SavedRequestRow({ request }: { request: BuyerRequest }) {
  const save = useSaveBuyerRequest();
  const client = useQueryClient();
  return <div><RequestCard request={request} compact /><div className="-mt-3 flex justify-end pb-5"><button type="button" disabled={save.isPending} onClick={() => save.mutate({ requestId: request.id, data: { saved: false } }, { onSuccess: () => {
    client.invalidateQueries({ queryKey: getListMySavedRequestsQueryKey() });
    client.invalidateQueries({ queryKey: getGetMySummaryQueryKey() });
  } })} className="border border-[#cfc8bc] px-3 py-2 text-[10px] uppercase tracking-wider text-[#6b665d] disabled:opacity-50" data-testid={`button-unsave-${request.id}`}>{save.isPending ? 'Removing…' : 'Remove saved'}</button></div></div>;
}

export function DashboardPage() {
  const summary = useGetMySummary();
  const requests = useListMyBuyerRequests();
  const submissions = useListMySubmissions();
  const saved = useListMySavedRequests();
  const [tab, setTab] = useState<'buyer' | 'finder' | 'saved'>('buyer');
  return <PageFrame><div className="mx-auto max-w-[1280px] px-5 py-10 md:px-10 md:py-16">
    <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end"><div><Eyebrow>Member dashboard</Eyebrow><h1 className="font-editorial mt-4 text-5xl tracking-[-.03em] md:text-6xl">Your workspace.</h1><p className="mt-3 text-sm text-[#6b665d]">Buyer mandates, private introductions and saved criteria.</p></div><Link href="/post-request" className="inline-flex h-12 items-center justify-center gap-2 bg-[#38352f] px-5 text-xs uppercase tracking-wider text-[#f5f2eb]">Publish criteria <ArrowRight size={14} /></Link></div>
    {summary.isError && <div className="mt-8"><ErrorState onRetry={() => summary.refetch()} /></div>}
    <div className="mt-9 grid grid-cols-2 gap-7 border-y border-[#d4cdc1] py-6 md:grid-cols-4">{summary.isLoading ? Array.from({ length: 4 }, (_, i) => <div key={i} className="animate-pulse"><div className="h-2 w-20 bg-[#e4ded3]" /><div className="mt-4 h-8 w-12 bg-[#e4ded3]" /></div>) : <><Metric title="Buyer requests" value={summary.data?.requestCount} note="Published criteria" /><Metric title="Submissions" value={summary.data?.submissionCount} note="Introductions shared" /><Metric title="Saved" value={summary.data?.savedCount} note="Buyer criteria" /><Metric title="Reviews" value={summary.data?.reviewCount} note="Items needing attention" /></>}</div>
    <div className="mt-10 flex flex-wrap gap-2 border-b border-[#d4cdc1]">
      {([['buyer', 'Buyer mandates'], ['finder', 'My submissions'], ['saved', 'Saved criteria']] as const).map(([key, text]) => <button type="button" onClick={() => setTab(key)} key={key} className={`border-b-2 px-4 py-3 text-xs uppercase tracking-wider ${tab === key ? 'border-[#a58f5c] text-[#4b453a]' : 'border-transparent text-[#8b8478]'}`} data-testid={`tab-${key}`}>{text}</button>)}
    </div>
    {tab === 'buyer' && <section className="mt-8">
      {requests.isLoading ? <LoadingRows /> : requests.isError ? <ErrorState onRetry={() => requests.refetch()} /> : requests.data?.length ? <div className="divide-y divide-[#d4cdc1]">{requests.data.map(request => <div key={request.id} className="grid gap-5 py-6 md:grid-cols-[1fr_320px]"><div><div className="flex flex-wrap gap-2">{request.isExample && <span className="border border-[#b9a16d] px-2 py-1 font-mono-label text-[9px] tracking-wider text-[#78643a]">EXAMPLE REQUEST</span>}<span className="font-mono-label text-[9px] uppercase tracking-wider text-[#827968]">{request.privacy.replaceAll('_', ' ')}</span></div><Link href={`/requests/${request.id}`} className="font-editorial mt-3 block text-2xl hover:text-[#806c42]">{request.title}</Link><p className="mt-2 text-xs text-[#777064]">{request.industry} · {request.businessCategory} · {request.country}</p><p className="mt-3 line-clamp-2 text-sm leading-6 text-[#6b665d]">{request.preferredProfile}</p><Link href={`/requests/${request.id}`} className="mt-4 inline-flex items-center gap-2 text-[10px] uppercase tracking-wider">View request <ArrowRight size={13} /></Link></div><MatchReview request={request} /></div>)}</div> : <EmptyState title="No buyer mandates yet" body="Publish acquisition criteria when you are ready to receive relevant opportunities." action={<ButtonLink href="/post-request">Publish criteria</ButtonLink>} />}
    </section>}
    {tab === 'finder' && <section className="mt-8">{submissions.isLoading ? <LoadingRows /> : submissions.isError ? <ErrorState onRetry={() => submissions.refetch()} /> : submissions.data?.length ? <div className="divide-y divide-[#d4cdc1]">{submissions.data.map(item => <div key={item.id} className="py-6"><div className="flex flex-wrap items-center justify-between gap-3"><h2 className="font-editorial text-2xl">{item.businessName || 'Confidential opportunity'}</h2><span className="border border-[#cfc8bc] px-2 py-1 font-mono-label text-[9px] uppercase tracking-wider text-[#726956]">{item.status.replaceAll('_', ' ')}</span></div><p className="mt-2 text-xs text-[#777064]">{item.industry} · {item.location} · Submitted {new Date(item.createdAt).toLocaleDateString()}</p><p className="mt-3 max-w-3xl text-sm leading-6 text-[#6b665d]">{item.matchRationale}</p><p className="mt-2 text-xs text-[#847d70]">Buyer request: <Link href={`/requests/${item.requestId}`} className="underline underline-offset-2">View criteria</Link></p></div>)}</div> : <EmptyState title="No introductions submitted" body="Find a request that fits an opportunity you are authorized to share." action={<ButtonLink href="/requests">Explore buyer demand</ButtonLink>} />}</section>}
    {tab === 'saved' && <section className="mt-8">{saved.isLoading ? <LoadingRows /> : saved.isError ? <ErrorState onRetry={() => saved.refetch()} /> : saved.data?.length ? saved.data.map(request => <SavedRequestRow key={request.id} request={request} />) : <EmptyState title="No saved criteria" body="Save a buyer request when you want to return to it later." action={<ButtonLink href="/requests">Browse criteria</ButtonLink>} />}</section>}
    <section className="mt-12"><PrivacyNote>Request visibility and submission statuses are shown as returned by the platform. Any progress depends on participants and is not guaranteed.</PrivacyNote></section>
  </div></PageFrame>;
}
