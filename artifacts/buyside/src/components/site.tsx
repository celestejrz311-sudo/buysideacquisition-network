import { Link, useLocation } from 'wouter';
import { ArrowRight, ArrowUpRight, LockKeyhole, Menu, Search, ShieldCheck, X } from 'lucide-react';
import { useState, type ReactNode } from 'react';
import { Show, useClerk } from '@clerk/react';
import type { BuyerRequest } from '@workspace/api-client-react';
import type { DemoOpportunity } from '@/data/demo-opportunities';
import { useLanguage } from '@/i18n/LanguageProvider';
import { LanguageSelector } from '@/components/LanguageSelector';
import type { TranslationKey } from '@/i18n/translations';

export function Brand({ inverse = false }: { inverse?: boolean }) {
  return <Link href="/" className={`inline-flex items-center gap-3 ${inverse ? 'text-[#eee9de]' : 'text-[#332f29]'}`} data-testid="link-brand">
    <span className={`grid size-9 place-items-center border ${inverse ? 'border-[#716c60]' : 'border-[#aaa18f]'}`}>
      <span className="size-3 border border-[#b9a16d] rotate-45" />
    </span>
    <span className="text-[13px] font-semibold tracking-[.2em] uppercase">BuySide</span>
  </Link>;
}

const navLinks: [string, TranslationKey][] = [
  ['/search', 'nav.search'],
  ['/opportunities', 'nav.opportunities'],
  ['/requests', 'nav.requests'],
  ['/for-buyers', 'nav.forBuyers'],
  ['/for-finders', 'nav.forFinders'],
  ['/pricing', 'nav.membership'],
  ['/how-it-works', 'nav.howItWorks'],
  ['/private-network', 'nav.privateNetwork'],
];

export function Header() {
  const [open, setOpen] = useState(false);
  const [path] = useLocation();
  const { signOut } = useClerk();
  const { t } = useLanguage();
  const homePath = import.meta.env.BASE_URL.replace(/\/$/, '') || '/';
  return <header className="relative z-20 border-b border-[#d8d1c5] bg-[#f5f2eb]">
    <div className="mx-auto flex h-[76px] max-w-[1280px] items-center justify-between px-5 md:px-10">
      <Brand />
      <nav className="hidden items-center gap-8 lg:flex">
        {navLinks.map(([href, key]) => <Link key={href} href={href} className={`text-[13px] transition-colors hover:text-[#877446] ${path === href ? 'text-[#877446]' : 'text-[#625d54]'}`}>{t(key)}</Link>)}
      </nav>
      <div className="hidden items-center gap-5 lg:flex">
        <LanguageSelector />
        <Show when="signed-out"><Link href="/sign-in" className="text-[13px] text-[#625d54] hover:text-[#332f29]">{t('nav.signIn')}</Link></Show>
        <Show when="signed-in"><Link href="/dashboard" className="text-[13px] text-[#625d54] hover:text-[#332f29]">{t('nav.workspace')}</Link><button type="button" onClick={() => signOut({ redirectUrl: homePath })} className="text-[13px] text-[#625d54] hover:text-[#332f29]">{t('nav.signOut')}</button></Show>
        <Link href="/post-request" className="inline-flex items-center gap-2 bg-[#38352f] px-5 py-3 text-[12px] uppercase tracking-[.1em] text-[#f5f2eb] transition hover:bg-[#504b40]">{t('nav.postRequest')} <ArrowRight size={14} /></Link>
      </div>
      <button type="button" onClick={() => setOpen(!open)} className="grid size-10 place-items-center border border-[#d8d1c5] lg:hidden" aria-label="Toggle navigation" data-testid="button-menu">{open ? <X size={18} /> : <Menu size={18} />}</button>
    </div>
    {open && <nav className="absolute left-0 right-0 top-full border-b border-[#d8d1c5] bg-[#f5f2eb] px-5 pb-6 shadow-lg lg:hidden">
      <div className="mx-auto grid max-w-[1280px] gap-1">{navLinks.map(([href, key]) => <Link key={href} onClick={() => setOpen(false)} href={href} className="border-b border-[#e2ddd3] py-4 text-sm">{t(key)}</Link>)}
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 pt-5"><LanguageSelector /><Show when="signed-out"><Link href="/sign-in" className="py-3 text-sm">{t('nav.signIn')}</Link></Show><Show when="signed-in"><Link href="/dashboard" className="py-3 text-sm">{t('nav.workspace')}</Link><button type="button" onClick={() => signOut({ redirectUrl: homePath })} className="py-3 text-sm">{t('nav.signOut')}</button></Show><Link href="/post-request" className="bg-[#38352f] px-4 py-3 text-sm text-[#f5f2eb]">{t('nav.postRequest')}</Link></div>
      </div>
    </nav>}
  </header>;
}

export function Footer() {
  const { t } = useLanguage();
  return <footer className="bg-[#302e29] text-[#d5d0c6]">
    <div className="mx-auto grid max-w-[1280px] gap-12 px-5 py-12 md:grid-cols-2 md:px-10 md:py-16 lg:grid-cols-[1.3fr_1fr_1fr_1fr]">
      <div><Brand inverse /><p className="mt-6 max-w-sm text-sm leading-6 text-[#aaa59a]">{t('footer.tagline')}</p></div>
      <div><p className="font-mono-label text-[10px] uppercase tracking-[.18em] text-[#b9a16d]">{t('footer.explore')}</p><div className="mt-5 grid gap-3 text-sm text-[#d5d0c6]"><Link href="/opportunities">{t('footer.acquisitionOpportunities')}</Link><Link href="/requests">{t('nav.requests')}</Link><Link href="/private-network">{t('nav.privateNetwork')}</Link><Link href="/how-it-works">{t('nav.howItWorks')}</Link><Link href="/pricing">{t('nav.membership')}</Link></div></div>
      <div><p className="font-mono-label text-[10px] uppercase tracking-[.18em] text-[#b9a16d]">{t('footer.principles')}</p><div className="mt-5 grid gap-3 text-sm text-[#d5d0c6]"><Link href="/confidentiality">{t('footer.confidentiality')}</Link><Link href="/for-buyers">{t('nav.forBuyers')}</Link><Link href="/for-finders">{t('nav.forFinders')}</Link></div></div>
      <div><p className="font-mono-label text-[10px] uppercase tracking-[.18em] text-[#b9a16d]">{t('footer.legalContact')}</p><div className="mt-5 grid gap-3 text-sm text-[#d5d0c6]"><Link href="/terms-of-use">{t('footer.termsOfUse')}</Link><Link href="/privacy-policy">{t('footer.privacyPolicy')}</Link><Link href="/finder-terms">{t('footer.finderTerms')}</Link><Link href="/buyer-terms">{t('footer.buyerTerms')}</Link><Link href="/disclaimer">{t('footer.disclaimer')}</Link><Link href="/contact">{t('footer.contact')}</Link></div></div>
    </div>
    <div className="border-t border-[#504d45] px-5 py-5 md:px-10"><div className="mx-auto flex max-w-[1280px] flex-col justify-between gap-3 text-[11px] leading-5 text-[#aaa59a] md:flex-row"><span>{t('footer.platformDisclaimer')}</span><span>© {new Date().getFullYear()} BuySide</span></div></div>
  </footer>;
}

export function PublicLayout({ children }: { children: ReactNode }) {
  return <div className="grain min-h-[100dvh] bg-background"><Header />{children}<Footer /></div>;
}

export function Eyebrow({ children, light = false }: { children: ReactNode; light?: boolean }) {
  return <div className={`font-mono-label text-[10px] uppercase tracking-[.18em] ${light ? 'text-[#c5ad79]' : 'text-[#897649]'}`}>{children}</div>;
}

export function ButtonLink({ href, children, secondary = false, className = '', testId }: { href: string; children: ReactNode; secondary?: boolean; className?: string; testId?: string }) {
  return <Link href={href} data-testid={testId} className={`inline-flex min-h-12 items-center justify-center gap-3 px-5 text-[12px] uppercase tracking-[.1em] transition ${secondary ? 'border border-[#bdb5a6] text-[#38352f] hover:border-[#827652]' : 'bg-[#38352f] text-[#f5f2eb] hover:bg-[#504b40]'} ${className}`}>{children}<ArrowRight size={15} /></Link>;
}

export function SectionTitle({ eyebrow, title, description }: { eyebrow: string; title: string; description?: string }) {
  return <div className="max-w-2xl"><Eyebrow>{eyebrow}</Eyebrow><h2 className="font-editorial mt-4 text-4xl leading-[1.08] tracking-[-.025em] md:text-5xl">{title}</h2>{description && <p className="mt-5 max-w-xl text-[15px] leading-7 text-[#6b665d]">{description}</p>}</div>;
}

export function RequestStatusBadges({ request }: { request: BuyerRequest }) {
  const { t } = useLanguage();
  const isVerifiedBuyer = request.isVerified && !request.isExample;
  return <>
    {request.isExample && <span className="border border-[#b9a16d] px-2 py-1 font-mono-label text-[9px] tracking-[.12em] text-[#78643a]">{t('card.sampleRequest')}</span>}
    {isVerifiedBuyer && <>
      <span className="inline-flex items-center gap-1.5 border border-[#b9a16d] px-2 py-1 font-mono-label text-[9px] tracking-[.1em] text-[#78643a]"><ShieldCheck size={12} /> {t('card.activeBuyer')}</span>
      <span className="inline-flex items-center gap-1.5 border border-[#b8c5b8] bg-[#eef2ec] px-2 py-1 font-mono-label text-[9px] tracking-[.1em] text-[#557165]"><span className="size-1.5 rounded-full bg-[#557165]" />{t('card.activelySearching')}</span>
    </>}
  </>;
}

export function FinderFeeField({ request, detail = false }: { request: BuyerRequest; detail?: boolean }) {
  const { t } = useLanguage();
  const disclosure = request.rewardDisclosure?.trim() || t('finderFee.default');
  return <div className={`border-l-2 border-[#b9a16d] bg-[#eeebe3] ${detail ? 'mt-8 p-5' : 'mt-4 px-4 py-3'}`} data-testid={`field-finder-fee-${request.id}`}>
    <div className="font-mono-label text-[10px] uppercase tracking-[.14em] text-[#8c794d]">{t('finderFee.label')}</div>
    <p className={`mt-1 font-semibold text-[#39362f] ${detail ? 'text-sm leading-6' : 'text-[12px] leading-5'}`}>{disclosure}</p>
  </div>;
}

export function RequestCard({ request, compact = false }: { request: BuyerRequest; compact?: boolean }) {
  const { t } = useLanguage();
  const budget = request.minimumPurchasePrice != null && request.maximumPurchasePrice != null
    ? `${money(request.minimumPurchasePrice)} – ${money(request.maximumPurchasePrice)}`
    : request.maximumPurchasePrice != null
      ? `${t('card.upTo')} ${money(request.maximumPurchasePrice)}`
      : request.minimumPurchasePrice != null
        ? `${t('card.from')} ${money(request.minimumPurchasePrice)}`
        : t('card.flexibleRange');
  const location = [request.city, request.region, request.country].filter(Boolean).join(', ');
  return <article className="group border-t border-[#cfc8bc] py-6 transition-colors hover:border-[#a58f5c]" data-testid={`card-request-${request.id}`}>
    <div className="flex flex-wrap items-center gap-2">
      <RequestStatusBadges request={request} />
      <span className="font-mono-label ml-auto text-[10px] uppercase tracking-[.12em] text-[#938c7e]">{request.buyerType.replaceAll('_', ' ')}</span>
    </div>
    <Link href={`/requests/${request.id}`} className="mt-4 block">
      <h3 className="font-editorial max-w-2xl text-[26px] leading-tight transition-colors group-hover:text-[#806c42] md:text-[30px]">{request.title}</h3>
    </Link>
    <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-[12px] text-[#706b61]"><span>{request.industry} · {request.businessCategory}</span><span>{location || t('card.locationFlexible')}{request.remoteAccepted ? ` · ${t('card.remoteConsidered')}` : ''}</span></div>
    <FinderFeeField request={request} />
    {!compact && <div className="mt-4 grid gap-x-6 gap-y-3 border-y border-[#e0d9ce] py-4 text-[12px] sm:grid-cols-2 lg:grid-cols-4">
      <div><div className="font-mono-label text-[9px] uppercase tracking-[.15em] text-[#948c7b]">{t('card.purchasePrice')}</div><div className="mt-1 text-[#39362f]">{budget}</div></div>
      <div><div className="font-mono-label text-[9px] uppercase tracking-[.15em] text-[#948c7b]">{t('card.targetRevenue')}</div><div className="mt-1 text-[#39362f]">{request.minimumRevenue != null ? `${money(request.minimumRevenue)}+` : t('requestDetail.flexible')}</div></div>
      <div><div className="font-mono-label text-[9px] uppercase tracking-[.15em] text-[#948c7b]">{t('card.ebitdaSde')}</div><div className="mt-1 text-[#39362f]">{request.minimumEbitda != null ? `${money(request.minimumEbitda)}+` : t('card.notSpecified')}</div></div>
      <div><div className="font-mono-label text-[9px] uppercase tracking-[.15em] text-[#948c7b]">{t('card.timeline')}</div><div className="mt-1 text-[#39362f]">{request.timeline}</div></div>
    </div>}
    {!compact && <div className="mt-4 grid gap-4 text-[13px] leading-6 text-[#6b665d] sm:grid-cols-2">
      <p><span className="font-mono-label mr-2 text-[9px] uppercase tracking-[.12em] text-[#948c7b]">{t('card.keyCriteria')}</span>{request.preferredProfile}</p>
      <p><span className="font-mono-label mr-2 text-[9px] uppercase tracking-[.12em] text-[#948c7b]">{t('card.exclusions')}</span>{request.dealExclusions || t('card.noneSpecified')}</p>
    </div>}
    <div className="mt-5 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
      <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center">
        <Link href={`/requests/${request.id}`} className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[.12em] text-[#645b48] hover:text-[#917a49]" data-testid={`link-review-criteria-${request.id}`}>{t('card.viewFullRequest')} <ArrowUpRight size={14} /></Link>
        <Link href={`/submit/${request.id}`} className="inline-flex min-h-11 w-full items-center justify-center gap-2 bg-[#38352f] px-4 py-3 text-center text-[10px] uppercase leading-4 tracking-[.08em] text-[#f5f2eb] transition hover:bg-[#504b40] sm:w-auto sm:whitespace-nowrap" data-testid={`link-submit-match-${request.id}`} aria-label={`${t('card.submitMatch')} for ${request.title}`}>{t('card.submitMatch')} <ArrowRight size={14} /></Link>
      </div>
    </div>
  </article>;
}

const exactCurrency = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
});

export function DemoOpportunityCard({ opportunity }: { opportunity: DemoOpportunity }) {
  const { t } = useLanguage();
  const margin = (opportunity.normalizedEarnings / opportunity.ttmRevenue) * 100;
  const multipleDenominator = opportunity.valuationBasis === 'TTM revenue'
    ? opportunity.ttmRevenue
    : opportunity.normalizedEarnings;
  const multipleBasisLabel = opportunity.valuationBasis === 'TTM revenue'
    ? 'TTM Revenue'
    : opportunity.earningsLabel;
  const multiple = opportunity.askingPrice / multipleDenominator;
  const metrics = [
    ['TTM Revenue', exactCurrency.format(opportunity.ttmRevenue)],
    [opportunity.earningsLabel, exactCurrency.format(opportunity.normalizedEarnings)],
    [opportunity.earningsLabel === 'SDE' ? 'SDE Margin' : 'EBITDA Margin', `${margin.toFixed(1)}%`],
    ['Asking Price', exactCurrency.format(opportunity.askingPrice)],
    ['Valuation Multiple', `${multiple.toFixed(1)}× ${multipleBasisLabel}`],
    ['Employees', String(opportunity.employees)],
    ['Year Established', String(opportunity.yearEstablished)],
    ['Recurring Revenue', `${opportunity.recurringRevenuePercent}%`],
    ['Customer Concentration', `Top customer ${opportunity.largestCustomerPercent}%`],
  ];

  return <article className="group border-t border-[#cfc8bc] py-6 transition-colors hover:border-[#a58f5c]" data-testid={`card-demo-opportunity-${opportunity.id}`}>
    <div className="flex flex-wrap items-center gap-2">
      <span className="border border-[#b9a16d] px-2 py-1 font-mono-label text-[9px] tracking-[.14em] text-[#78643a]">{t('dash.demoLabel')}</span>
      <span className="font-mono-label ml-auto text-[10px] uppercase tracking-[.12em] text-[#938c7e]">{opportunity.industry}</span>
    </div>
    <h2 className="font-editorial mt-4 max-w-3xl text-[26px] leading-tight text-[#38352f] md:text-[30px]">{opportunity.title}</h2>
    <p className="mt-3 text-[12px] text-[#706b61]">{opportunity.city}, {opportunity.state}</p>
    <div className="mt-4 grid gap-x-6 gap-y-3 border-y border-[#e0d9ce] py-4 text-[12px] sm:grid-cols-2 lg:grid-cols-3">
      {metrics.map(([label, value]) => <div key={label}>
        <div className="font-mono-label text-[9px] uppercase tracking-[.15em] text-[#948c7b]">{label}</div>
        <div className="mt-1 text-[#39362f]">{value}</div>
      </div>)}
    </div>
    <div className="mt-4 grid gap-4 text-[13px] leading-6 text-[#6b665d] sm:grid-cols-2">
      <p><span className="font-mono-label mr-2 text-[9px] uppercase tracking-[.12em] text-[#948c7b]">Seller Financing</span>{opportunity.sellerFinancing}</p>
      <p><span className="font-mono-label mr-2 text-[9px] uppercase tracking-[.12em] text-[#948c7b]">Reason for Sale</span>{opportunity.reasonForSale}</p>
      <p className="sm:col-span-2"><span className="font-mono-label mr-2 text-[9px] uppercase tracking-[.12em] text-[#948c7b]">Deal Structure</span>{opportunity.dealStructure}</p>
    </div>
    <div className="mt-4 border-l-2 border-[#b9a16d] bg-[#eeebe3] p-4 text-[13px] leading-6 text-[#625d53]">
      <div className="font-mono-label text-[9px] uppercase tracking-[.14em] text-[#8c794d]">Confidential Business Summary</div>
      <p className="mt-2">{opportunity.confidentialSummary}</p>
    </div>
  </article>;
}

export function LoadingRows({ count = 3 }: { count?: number }) {
  return <div className="divide-y divide-[#e0d9ce]">{Array.from({ length: count }, (_, i) => <div key={i} className="animate-pulse py-7"><div className="h-2 w-24 bg-[#e4ded3]" /><div className="mt-5 h-6 w-2/3 bg-[#e4ded3]" /><div className="mt-4 h-3 w-1/3 bg-[#e4ded3]" /><div className="mt-6 h-3 w-full max-w-xl bg-[#e4ded3]" /></div>)}</div>;
}

export function EmptyState({ title, body, action }: { title: string; body: ReactNode; action?: ReactNode }) {
  return <div className="border border-dashed border-[#cfc8bc] bg-[#f8f6f0] px-6 py-12 text-center"><div className="mx-auto grid size-11 place-items-center border border-[#d7cebe] text-[#8b7952]"><Search size={17} /></div><h3 className="font-editorial mt-5 text-2xl">{title}</h3><p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[#706b61]">{body}</p>{action && <div className="mt-6">{action}</div>}</div>;
}

export function ErrorState({ onRetry }: { onRetry: () => void }) {
  const { t } = useLanguage();
  return <div className="border border-[#d7c3b8] bg-[#f8f2ed] p-7"><p className="font-mono-label text-[10px] uppercase tracking-[.15em] text-[#956452]">{t('error.unableToLoad')}</p><p className="mt-3 text-sm text-[#5c514a]">{t('error.tryAgain')}</p><button onClick={onRetry} className="mt-5 border border-[#bfa99b] px-4 py-2 text-xs uppercase tracking-wider" data-testid="button-retry">{t('error.retry')}</button></div>;
}

export function PrivacyNote({ children }: { children?: ReactNode }) {
  const { t } = useLanguage();
  return <div className="flex gap-3 border-l-2 border-[#b9a16d] bg-[#eeebe3] p-4 text-[12px] leading-5 text-[#625d53]"><LockKeyhole className="mt-0.5 shrink-0 text-[#8c794d]" size={15} /><p>{children || t('privacy.note')}</p></div>;
}

export function money(value: number | null | undefined) {
  if (value == null || !Number.isFinite(value)) return 'Not specified';
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', notation: value >= 1_000_000 ? 'compact' : 'standard', maximumFractionDigits: value >= 1_000_000 ? 1 : 0 }).format(value);
}