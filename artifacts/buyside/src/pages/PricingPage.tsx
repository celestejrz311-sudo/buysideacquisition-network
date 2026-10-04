import { useState } from 'react';
import { ArrowRight, Check, LockKeyhole, ShieldCheck } from 'lucide-react';
import { Link } from 'wouter';
import { PublicLayout, Eyebrow } from '@/components/site';

type BillingPeriod = 'monthly' | 'annual';

const plans = [
  {
    id: 'explorer',
    name: 'Explorer',
    price: { monthly: 0, annual: 0 },
    cadence: '/month',
    description: 'A clear first step into the network.',
    benefits: [
      'Post buyer requests',
      'Open 5 buyer request details per month',
      'Submit 1 matching business per month',
      'Basic profile',
    ],
    action: 'Create a free account',
    free: true,
  },
  {
    id: 'buyer-pro',
    name: 'Buyer Pro',
    price: { monthly: 79, annual: 63 },
    cadence: '/month',
    description: 'For active buyers and deal finders.',
    benefits: [
      'Full access to buyer requests',
      'Unlimited matching submissions',
      'Direct introductions',
      'Saved requests',
      'Notifications for new matching buyer requests',
      'Professional profile',
    ],
    action: 'Start with Buyer Pro',
    free: false,
    popular: true,
  },
  {
    id: 'professional',
    name: 'Professional',
    price: { monthly: 149, annual: 119 },
    cadence: '/month',
    description: 'For intermediaries building a consistent pipeline.',
    benefits: [
      'Everything in Buyer Pro',
      'Verified Partner badge',
      'Priority placement',
      'Featured profile',
      'Early access to new buyer requests',
      'Advanced analytics',
      'Priority support',
    ],
    action: 'Choose Professional',
    free: false,
  },
  {
    id: 'private-network',
    name: 'Private Network',
    price: { monthly: 299, annual: 239 },
    cadence: '/month',
    description: 'For principals seeking private, off-market deal flow.',
    benefits: [
      'Everything in Professional',
      'Private Network membership',
      'Exclusive off-market opportunities',
      'Private deal rooms',
      'Dedicated relationship manager',
      'Invitation-only introductions',
    ],
    action: 'Apply for Private Network',
    free: false,
  },
];

function formatPrice(value: number) {
  return value === 0 ? '$0' : `$${value}`;
}

export function PricingPage() {
  const [billing, setBilling] = useState<BillingPeriod>('monthly');

  return (
    <PublicLayout>
      <main className="page-enter">
        <section className="relative overflow-hidden border-b border-[#46453e]">
          <div className="pointer-events-none absolute -right-24 top-10 hidden h-[440px] w-[440px] rounded-full border border-[#34352f] md:block" />
          <div className="pointer-events-none absolute -right-8 top-26 hidden h-[310px] w-[310px] rounded-full border border-[#34352f] md:block" />
          <div className="mx-auto max-w-[1280px] px-5 pb-14 pt-16 md:px-10 md:pb-20 md:pt-24">
            <div className="max-w-3xl">
              <Eyebrow>Membership</Eyebrow>
              <h1 className="font-editorial mt-5 max-w-[760px] text-[44px] leading-[1.02] tracking-[-.035em] text-[#eee9de] md:text-[68px]">
                Clear terms for a more direct way to connect.
              </h1>
              <div className="mt-7 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
                <p className="max-w-xl text-[15px] leading-7 text-[#b9b5aa]">
                  Choose the access that fits your work. The monthly plan is
                  separate from the one-time fee for an accepted introduction.
                </p>
                <a
                  href="#plans"
                  className="group inline-flex shrink-0 items-center gap-3 border-b border-[#746747] pb-2 text-[11px] uppercase tracking-[.14em] text-[#c6b17b] transition-colors hover:text-[#eee9de]"
                  data-testid="link-view-plans"
                >
                  Compare plans <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                </a>
              </div>
            </div>
            <div className="mt-12 flex flex-wrap gap-x-8 gap-y-3 border-t border-[#3b3c36] pt-5 font-mono-label text-[9px] uppercase tracking-[.15em] text-[#a39e91]">
              <span className="inline-flex items-center gap-2"><span className="size-1.5 bg-[#b9a16d]" />Transparent monthly pricing</span>
              <span className="inline-flex items-center gap-2"><span className="size-1.5 bg-[#b9a16d]" />No transaction percentage</span>
              <span className="inline-flex items-center gap-2"><LockKeyhole size={12} className="text-[#b9a16d]" />Private introductions</span>
            </div>
          </div>
        </section>

        <section id="plans" className="mx-auto max-w-[1280px] px-5 py-14 md:px-10 md:py-20">
          <div className="mb-9 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <Eyebrow>Membership</Eyebrow>
              <h2 className="font-editorial mt-3 text-3xl tracking-[-.025em] text-[#eee9de] md:text-[40px]">Find your level of access.</h2>
            </div>
            <div className="flex flex-col gap-4 md:items-end">
              <p className="max-w-md text-[13px] leading-6 text-[#a39e91]">
                Plans are billed monthly. The accepted-introduction fee is only
                charged when a buyer chooses to proceed.
              </p>
              <div className="inline-flex items-center gap-1 border border-[#41423b] bg-[#232420] p-1" data-testid="toggle-billing-period">
                <button
                  type="button"
                  onClick={() => setBilling('monthly')}
                  className={`px-4 py-2 font-mono-label text-[10px] uppercase tracking-[.12em] transition-colors ${billing === 'monthly' ? 'bg-[#b9a16d] text-[#25241f]' : 'text-[#a39e91] hover:text-[#eee9de]'}`}
                  data-testid="button-billing-monthly"
                >
                  Monthly
                </button>
                <button
                  type="button"
                  onClick={() => setBilling('annual')}
                  className={`px-4 py-2 font-mono-label text-[10px] uppercase tracking-[.12em] transition-colors ${billing === 'annual' ? 'bg-[#b9a16d] text-[#25241f]' : 'text-[#a39e91] hover:text-[#eee9de]'}`}
                  data-testid="button-billing-annual"
                >
                  Annual <span className={billing === 'annual' ? 'text-[#6b5e40]' : 'text-[#b9a16d]'}>Save 20%</span>
                </button>
              </div>
            </div>
          </div>

          <div className="grid items-stretch gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {plans.map((plan, index) => (
              <article
                key={plan.id}
                className={`relative flex flex-col border p-6 md:p-7 ${
                  plan.popular
                    ? 'border-[#85734c] bg-[#292a25] lg:-translate-y-2 lg:pb-9'
                    : 'border-[#41423b] bg-[#232420]'
                }`}
                data-testid={`card-plan-${index}`}
              >
                {plan.popular && (
                  <div className="absolute right-0 top-0 bg-[#b9a16d] px-3 py-2 font-mono-label text-[9px] uppercase tracking-[.14em] text-[#25241f]" data-testid={`badge-popular-${index}`}>
                    Most Popular
                  </div>
                )}
                <div className="min-h-[110px]">
                  <p className="font-mono-label text-[10px] uppercase tracking-[.14em] text-[#c6b17b]">{plan.name}</p>
                  <p className="mt-3 text-[13px] leading-5 text-[#a39e91]">{plan.description}</p>
                </div>
                <div className="flex items-baseline gap-2 border-b border-[#41423b] pb-6">
                  <span className="font-editorial text-[52px] leading-none tracking-[-.045em] text-[#eee9de]" data-testid={`text-price-${index}`}>{formatPrice(plan.price[billing])}</span>
                  <span className="font-mono-label text-[10px] uppercase tracking-[.08em] text-[#a39e91]">{plan.cadence}</span>
                  {billing === 'annual' && plan.price.annual > 0 && (
                    <span className="ml-auto font-mono-label text-[9px] uppercase tracking-[.1em] text-[#b9a16d]" data-testid={`text-annual-savings-${index}`}>20% off</span>
                  )}
                </div>
                <ul className="mt-6 flex-1 space-y-4">
                  {plan.benefits.map((benefit) => (
                    <li key={benefit} className="flex gap-3 text-[13px] leading-5 text-[#d2cec3]">
                      <Check size={15} className="mt-0.5 shrink-0 text-[#b9a16d]" strokeWidth={1.8} />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
                {plan.free ? (
                  <Link
                    href="/sign-up"
                    className="mt-8 inline-flex min-h-12 items-center justify-center gap-3 bg-[#b9a16d] px-4 text-[11px] uppercase tracking-[.1em] text-[#25241f] transition-colors hover:bg-[#c6b17b]"
                    data-testid="link-sign-up-free"
                  >
                    {plan.action}<ArrowRight size={15} />
                  </Link>
                ) : (
                  <div className="mt-8">
                    <button
                      type="button"
                      disabled
                      aria-describedby={`stripe-note-${index}`}
                      data-plan-id={plan.id}
                      data-billing={billing}
                      data-status="unavailable"
                      className="inline-flex min-h-12 w-full cursor-not-allowed items-center justify-center border border-[#55564e] bg-[#30312c] px-4 text-[11px] uppercase tracking-[.1em] text-[#979387]"
                      data-testid={`button-unavailable-${index}`}
                    >
                      {plan.action} · Unavailable
                    </button>
                    <p id={`stripe-note-${index}`} className="mt-3 text-center text-[11px] leading-5 text-[#a39e91]" data-testid={`status-stripe-${index}`}>
                      Stripe checkout is not connected.
                    </p>
                  </div>
                )}
              </article>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-[1280px] px-5 pb-16 md:px-10 md:pb-24">
          <div className="relative overflow-hidden border border-[#6b5e40] bg-[#292a25]">
            <div className="absolute inset-y-0 right-0 hidden w-[31%] border-l border-[#444138] md:block">
              <div className="absolute inset-0 opacity-50" style={{ backgroundImage: 'linear-gradient(135deg, transparent 49.7%, #62583f 50%, transparent 50.3%)', backgroundSize: '28px 28px' }} />
              <div className="absolute bottom-7 right-8 grid size-14 place-items-center border border-[#85734c]">
                <ShieldCheck size={22} className="text-[#c6b17b]" strokeWidth={1.3} />
              </div>
            </div>
            <div className="max-w-3xl px-6 py-8 md:px-10 md:py-10">
              <Eyebrow>One-time, only when accepted</Eyebrow>
              <div className="mt-5 flex flex-wrap items-baseline gap-x-5 gap-y-2">
                <h2 className="font-editorial text-[32px] leading-tight tracking-[-.025em] text-[#eee9de] md:text-[42px]">Accepted Introduction Fee</h2>
                <span className="font-editorial text-[40px] tracking-[-.04em] text-[#c6b17b]" data-testid="text-introduction-fee">$99</span>
              </div>
              <p className="mt-5 max-w-2xl text-[14px] leading-7 text-[#c4c0b5]">
                Charged only when a buyer accepts a submitted business match and
                chooses to proceed with an introduction. BuySide does not charge
                a percentage of a final business transaction at this stage.
              </p>
              <div className="mt-7 flex items-start gap-3 border-t border-[#444138] pt-5 text-[11px] leading-5 text-[#a39e91]">
                <LockKeyhole size={14} className="mt-0.5 shrink-0 text-[#c6b17b]" />
                <span>The fee is tied to an accepted introduction—not simply to submitting a match.</span>
              </div>
            </div>
          </div>
        </section>

        <section className="border-t border-[#3b3c36] bg-[#22231f]">
          <div className="mx-auto grid max-w-[1280px] gap-10 px-5 py-12 md:grid-cols-[1fr_1.2fr] md:px-10 md:py-16">
            <div>
              <Eyebrow>Before you join</Eyebrow>
              <h2 className="font-editorial mt-4 max-w-md text-3xl leading-tight tracking-[-.025em] text-[#eee9de] md:text-[38px]">A straightforward model for serious conversations.</h2>
            </div>
            <div className="md:border-l md:border-[#41423b] md:pl-10">
              <p className="font-editorial text-xl leading-8 text-[#d6d1c5] md:text-2xl">
                "BuySide provides technology and introductions. BuySide does not provide legal, financial, investment, or brokerage advice."
              </p>
              <p className="mt-5 font-mono-label text-[9px] uppercase tracking-[.14em] text-[#a39e91]" data-testid="text-platform-disclosure">Platform disclosure</p>
            </div>
          </div>
        </section>
      </main>
    </PublicLayout>
  );
}

export default PricingPage;
