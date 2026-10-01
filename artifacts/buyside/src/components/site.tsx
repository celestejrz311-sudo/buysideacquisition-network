import { Link, useLocation } from 'wouter';
import { ArrowRight, ArrowUpRight, LockKeyhole, Menu, Search, ShieldCheck, X } from 'lucide-react';
import { useState, type ReactNode } from 'react';
import { Show, useClerk } from '@clerk/react';
import type { BuyerRequest } from '@workspace/api-client-react';

export function Brand({ inverse = false }: { inverse?: boolean }) {
  return <Link href="/" className={`inline-flex items-center gap-3 ${inverse ? 'text-[#eee9de]' : 'text-[#332f29]'}`} data-testid="link-brand">
    <span className={`grid size-9 place-items-center border ${inverse ? 'border-[#716c60]' : 'border-[#aaa18f]'}`}>
      <span className="size-3 border border-[#b9a16d] rotate-45" />
    </span>
    <span className="text-[13px] font-semibold tracking-[.2em] uppercase">BuySide</span>
  </Link>;
}

const navLinks = [
  ['/requests', 'Buyer Requests'],
  ['/for-buyers', 'For Buyers'],
  ['/for-finders', 'For Finders'],
  ['/how-it-works', 'How It Works'],
  ['/private-network', 'Private Network'],
] as const;

export function Header() {
  const [open, setOpen] = useState(false);
  const [path] = useLocation();
  const { signOut } = useClerk();
  const homePath = import.meta.env.BASE_URL.replace(/\/$/, '') || '/';
  return <header className="relative z-20 border-b border-[#d8d1c5] bg-[#f5f2eb]">
    <div className="mx-auto flex h-[76px] max-w-[1280px] items-center justify-between px-5 md:px-10">
      <Brand />
      <nav className="hidden items-center gap-8 lg:flex">
        {navLinks.map(([href, label]) => <Link key={href} href={href} className={`text-[13px] transition-colors hover:text-[#877446] ${path === href ? 'text-[#877446]' : 'text-[#625d54]'}`}>{label}</Link>)}
      </nav>
      <div className="hidden items-center gap-5 lg:flex">
        <Show when="signed-out"><Link href="/sign-in" className="text-[13px] text-[#625d54] hover:text-[#332f29]">Sign In</Link></Show>
        <Show when="signed-in"><Link href="/dashboard" className="text-[13px] text-[#625d54] hover:text-[#332f29]">Workspace</Link><button type="button" onClick={() => signOut({ redirectUrl: homePath })} className="text-[13px] text-[#625d54] hover:text-[#332f29]">Sign out</button></Show>
        <Link href="/post-request" className="inline-flex items-center gap-2 bg-[#38352f] px-5 py-3 text-[12px] uppercase tracking-[.1em] text-[#f5f2eb] transition hover:bg-[#504b40]">POST A REQUEST <ArrowRight size={14} /></Link>
      </div>
      <button type="button" onClick={() => setOpen(!open)} className="grid size-10 place-items-center border border-[#d8d1c5] lg:hidden" aria-label="Toggle navigation" data-testid="button-menu">{open ? <X size={18} /> : <Menu size={18} />}</button>
    </div>
    {open && <nav className="absolute left-0 right-0 top-full border-b border-[#d8d1c5] bg-[#f5f2eb] px-5 pb-6 shadow-lg lg:hidden">
      <div className="mx-auto grid max-w-[1280px] gap-1">{navLinks.map(([href, label]) => <Link key={href} onClick={() => setOpen(false)} href={href} className="border-b border-[#e2ddd3] py-4 text-sm">{label}</Link>)}
        <div className="flex flex-wrap gap-x-5 gap-y-2 pt-5"><Show when="signed-out"><Link href="/sign-in" className="py-3 text-sm">Sign In</Link></Show><Show when="signed-in"><Link href="/dashboard" className="py-3 text-sm">Workspace</Link><button type="button" onClick={() => signOut({ redirectUrl: homePath })} className="py-3 text-sm">Sign out</button></Show><Link href="/post-request" className="bg-[#38352f] px-4 py-3 text-sm text-[#f5f2eb]">POST A REQUEST</Link></div>
      </div>
    </nav>}
  </header>;
}

export function Footer() {
  return <footer className="bg-[#302e29] text-[#d5d0c6]">
    <div className="mx-auto grid max-w-[1280px] gap-12 px-5 py-12 md:grid-cols-2 md:px-10 md:py-16 lg:grid-cols-[1.3fr_1fr_1fr_1fr]">
      <div><Brand inverse /><p className="mt-6 max-w-sm text-sm leading-6 text-[#aaa59a]">A quieter way to bring qualified acquisition intent and private opportunities together.</p></div>
      <div><p className="font-mono-label text-[10px] uppercase tracking-[.18em] text-[#b9a16d]">Explore</p><div className="mt-5 grid gap-3 text-sm text-[#d5d0c6]"><Link href="/requests">Buyer Requests</Link><Link href="/private-network">Private Network</Link><Link href="/how-it-works">How It Works</Link></div></div>
      <div><p className="font-mono-label text-[10px] uppercase tracking-[.18em] text-[#b9a16d]">Principles</p><div className="mt-5 grid gap-3 text-sm text-[#d5d0c6]"><Link href="/confidentiality">Confidentiality</Link><Link href="/for-buyers">For Buyers</Link><Link href="/for-finders">For Finders</Link></div></div>
      <div><p className="font-mono-label text-[10px] uppercase tracking-[.18em] text-[#b9a16d]">Legal & contact</p><div className="mt-5 grid gap-3 text-sm text-[#d5d0c6]"><Link href="/terms-of-use">Terms of Use</Link><Link href="/privacy-policy">Privacy Policy</Link><Link href="/finder-terms">Finder Terms</Link><Link href="/buyer-terms">Buyer Terms</Link><Link href="/disclaimer">Disclaimer</Link><Link href="/contact">Contact</Link></div></div>
    </div>
    <div className="border-t border-[#504d45] px-5 py-5 md:px-10"><div className="mx-auto flex max-w-[1280px] flex-col justify-between gap-3 text-[11px] leading-5 text-[#aaa59a] md:flex-row"><span>BuySide is a technology and introduction platform.</span><span>© {new Date().getFullYear()} BuySide</span></div></div>
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

export function RequestCard({ request, compact = false }: { request: BuyerRequest; compact?: boolean }) {
  const budget = request.maximumPurchasePrice ? `Up to ${money(request.maximumPurchasePrice)}` : request.minimumPurchasePrice ? `From ${money(request.minimumPurchasePrice)}` : 'Flexible acquisition range';
  const location = [request.city, request.region, request.country].filter(Boolean).join(', ');
  return <article className="group border-t border-[#cfc8bc] py-6 transition-colors hover:border-[#a58f5c]" data-testid={`card-request-${request.id}`}>
    <div className="flex flex-wrap items-center gap-2">
      {request.isExample && <span className="border border-[#b9a16d] px-2 py-1 font-mono-label text-[9px] tracking-[.14em] text-[#78643a]">EXAMPLE REQUEST</span>}
      {request.isVerified && <span className="inline-flex items-center gap-1.5 font-mono-label text-[9px] tracking-[.12em] text-[#557165]"><ShieldCheck size={12} /> VERIFIED</span>}
      <span className="font-mono-label ml-auto text-[10px] uppercase tracking-[.12em] text-[#938c7e]">{request.buyerType.replaceAll('_', ' ')}</span>
    </div>
    <Link href={`/requests/${request.id}`} className="mt-4 block">
      <h3 className="font-editorial max-w-2xl text-[26px] leading-tight transition-colors group-hover:text-[#806c42] md:text-[30px]">{request.title}</h3>
    </Link>
    <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-[12px] text-[#706b61]"><span>{request.industry} · {request.businessCategory}</span><span>{location || 'Location flexible'}{request.remoteAccepted ? ' · Remote considered' : ''}</span></div>
    {!compact && <p className="mt-4 line-clamp-2 max-w-3xl text-[13px] leading-6 text-[#6b665d]">{request.preferredProfile}</p>}
    <div className="mt-5 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
      <div><div className="font-mono-label text-[9px] uppercase tracking-[.15em] text-[#948c7b]">Purchase parameters</div><div className="mt-1 text-[13px] text-[#39362f]">{budget}{request.minimumRevenue ? ` · Revenue above ${money(request.minimumRevenue)}` : ''}</div></div>
      <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center">
        <Link href={`/requests/${request.id}`} className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[.12em] text-[#645b48] hover:text-[#917a49]" data-testid={`link-review-criteria-${request.id}`}>Review criteria <ArrowUpRight size={14} /></Link>
        <Link href={`/submit/${request.id}`} className="inline-flex min-h-11 w-full items-center justify-center gap-2 bg-[#38352f] px-4 py-3 text-center text-[10px] uppercase leading-4 tracking-[.08em] text-[#f5f2eb] transition hover:bg-[#504b40] sm:w-auto sm:whitespace-nowrap" data-testid={`link-submit-match-${request.id}`} aria-label={`Submit a matching business for ${request.title}`}>Submit a Matching Business <ArrowRight size={14} /></Link>
      </div>
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
  return <div className="border border-[#d7c3b8] bg-[#f8f2ed] p-7"><p className="font-mono-label text-[10px] uppercase tracking-[.15em] text-[#956452]">Unable to load this information</p><p className="mt-3 text-sm text-[#5c514a]">Please try again in a moment.</p><button onClick={onRetry} className="mt-5 border border-[#bfa99b] px-4 py-2 text-xs uppercase tracking-wider" data-testid="button-retry">Retry</button></div>;
}

export function PrivacyNote({ children }: { children?: ReactNode }) {
  return <div className="flex gap-3 border-l-2 border-[#b9a16d] bg-[#eeebe3] p-4 text-[12px] leading-5 text-[#625d53]"><LockKeyhole className="mt-0.5 shrink-0 text-[#8c794d]" size={15} /><p>{children || 'Information is shared only with the buyer in connection with this opportunity, subject to the stated privacy terms.'}</p></div>;
}

export function money(value: number | null | undefined) {
  if (value == null || !Number.isFinite(value)) return 'Not specified';
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', notation: value >= 1_000_000 ? 'compact' : 'standard', maximumFractionDigits: value >= 1_000_000 ? 1 : 0 }).format(value);
}