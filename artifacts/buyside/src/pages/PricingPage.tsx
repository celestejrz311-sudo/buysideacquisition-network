import { useState } from 'react';
import { ArrowRight, Check, LockKeyhole, ShieldCheck, Loader2 } from 'lucide-react';
import { Link } from 'wouter';
import { useAuth, useClerk } from '@clerk/react';
import { PublicLayout, Eyebrow } from '@/components/site';
import { useLanguage } from '@/i18n/LanguageProvider';
import { useSeo } from '@/hooks/useSeo';
import type { Lang } from '@/i18n/translations';

type BillingPeriod = 'monthly' | 'annual';

const plans = [
  {
    id: 'explorer',
    name: { en: 'Explorer', es: 'Explorer' },
    price: { monthly: 0, annual: 0 },
    description: {
      en: 'A clear first step into the network.',
      es: 'Un primer paso claro hacia la red.',
    },
    benefits: {
      en: [
        'Post buyer requests',
        'Open 5 buyer request details per month',
        'Submit 1 matching business per month',
        'Basic profile',
      ],
      es: [
        'Publicar solicitudes de compra',
        'Abrir 5 detalles de solicitudes por mes',
        'Enviar 1 negocio coincidente por mes',
        'Perfil básico',
      ],
    },
    action: { en: 'Create a free account', es: 'Crear una cuenta gratuita' },
    free: true,
    popular: false,
  },
  {
    id: 'buyer-pro',
    name: { en: 'Buyer Pro', es: 'Buyer Pro' },
    price: { monthly: 79, annual: 63 },
    description: {
      en: 'For active buyers and deal finders.',
      es: 'Para compradores activos y buscadores de oportunidades.',
    },
    benefits: {
      en: [
        'Full access to buyer requests',
        'Unlimited matching submissions',
        'Direct introductions',
        'Saved requests',
        'Notifications for new matching buyer requests',
        'Professional profile',
      ],
      es: [
        'Acceso completo a solicitudes de compra',
        'Envíos de coincidencias ilimitados',
        'Presentaciones directas',
        'Solicitudes guardadas',
        'Notificaciones de nuevas solicitudes coincidentes',
        'Perfil profesional',
      ],
    },
    action: { en: 'Start with Buyer Pro', es: 'Comenzar con Buyer Pro' },
    free: false,
    popular: true,
  },
  {
    id: 'professional',
    name: { en: 'Professional', es: 'Professional' },
    price: { monthly: 149, annual: 119 },
    description: {
      en: 'For intermediaries building a consistent pipeline.',
      es: 'Para intermediarios que construyen un flujo constante.',
    },
    benefits: {
      en: [
        'Everything in Buyer Pro',
        'Verified Partner badge',
        'Priority placement',
        'Featured profile',
        'Early access to new buyer requests',
        'Advanced analytics',
        'Priority support',
      ],
      es: [
        'Todo lo de Buyer Pro',
        'Insignia de Socio Verificado',
        'Colocación prioritaria',
        'Perfil destacado',
        'Acceso anticipado a nuevas solicitudes',
        'Analíticas avanzadas',
        'Soporte prioritario',
      ],
    },
    action: { en: 'Choose Professional', es: 'Elegir Professional' },
    free: false,
    popular: false,
  },
  {
    id: 'private-network',
    name: { en: 'Private Network', es: 'Private Network' },
    price: { monthly: 299, annual: 239 },
    description: {
      en: 'For principals seeking private, off-market deal flow.',
      es: 'Para principales que buscan oportunidades privadas fuera de mercado.',
    },
    benefits: {
      en: [
        'Everything in Professional',
        'Private Network membership',
        'Exclusive off-market opportunities',
        'Private deal rooms',
        'Dedicated relationship manager',
        'Invitation-only introductions',
      ],
      es: [
        'Todo lo de Professional',
        'Membresía a Private Network',
        'Oportunidades exclusivas fuera de mercado',
        'Salas de negociación privadas',
        'Gerente de relaciones dedicado',
        'Presentaciones solo por invitación',
      ],
    },
    action: { en: 'Apply for Private Network', es: 'Solicitar Private Network' },
    free: false,
    popular: false,
  },
] as const;

const ui = {
  heroEyebrow: { en: 'Membership', es: 'Membresía' },
  heroTitle: {
    en: 'Clear terms for a more direct way to connect.',
    es: 'Términos claros para una forma más directa de conectar.',
  },
  heroBody: {
    en: 'Choose the access that fits your work. The monthly plan is separate from the one-time fee for an accepted introduction.',
    es: 'Elija el acceso que se ajuste a su trabajo. El plan mensual es independiente de la tarifa única por una presentación aceptada.',
  },
  comparePlans: { en: 'Compare plans', es: 'Comparar planes' },
  transparentPricing: { en: 'Transparent monthly pricing', es: 'Precios mensuales transparentes' },
  noPercentage: { en: 'No transaction percentage', es: 'Sin porcentaje de transacción' },
  privateIntroductions: { en: 'Private introductions', es: 'Presentaciones privadas' },

  plansEyebrow: { en: 'Membership', es: 'Membresía' },
  plansTitle: { en: 'Find your level of access.', es: 'Encuentre su nivel de acceso.' },
  plansNote: {
    en: 'Plans are billed monthly. The accepted-introduction fee is only charged when a buyer chooses to proceed.',
    es: 'Los planes se facturan mensualmente. La tarifa de presentación aceptada solo se cobra cuando un comprador decide continuar.',
  },
  monthly: { en: 'Monthly', es: 'Mensual' },
  annual: { en: 'Annual', es: 'Anual' },
  save20: { en: 'Save 20%', es: 'Ahorre 20%' },
  cadence: { en: '/month', es: '/mes' },
  mostPopular: { en: 'Most Popular', es: 'Más Popular' },
  off20: { en: '20% off', es: '20% desc.' },
  unavailable: { en: 'Unavailable', es: 'No disponible' },
  stripeNote: {
    en: 'Stripe checkout is not connected.',
    es: 'Stripe no está conectado.',
  },

  feeEyebrow: { en: 'One-time, only when accepted', es: 'Único, solo al ser aceptado' },
  feeTitle: { en: 'Accepted Introduction Fee', es: 'Tarifa de Presentación Aceptada' },
  feeBody: {
    en: 'Charged only when a buyer accepts a submitted business match and chooses to proceed with an introduction. BuySide does not charge a percentage of a final business transaction at this stage.',
    es: 'Se cobra solo cuando un comprador acepta una coincidencia enviada y decide continuar con una presentación. BuySide no cobra un porcentaje de la transacción comercial final en esta etapa.',
  },
  feeNote: {
    en: 'The fee is tied to an accepted introduction—not simply to submitting a match.',
    es: 'La tarifa está vinculada a una presentación aceptada, no simplemente a enviar una coincidencia.',
  },

  disclosureEyebrow: { en: 'Before you join', es: 'Antes de unirse' },
  disclosureTitle: {
    en: 'A straightforward model for serious conversations.',
    es: 'Un modelo directo para conversaciones serias.',
  },
  disclosureText: {
    en: '"BuySide provides technology and introductions. BuySide does not provide legal, financial, investment, or brokerage advice."',
    es: '"BuySide proporciona tecnología y presentaciones. BuySide no proporciona asesoramiento legal, financiero, de inversión ni de corretaje."',
  },
  disclosureLabel: { en: 'Platform disclosure', es: 'Aviso de la plataforma' },
} as const;

function formatPrice(value: number) {
  return value === 0 ? '$0' : `$${value}`;
}

export function PricingPage() {
  const [billing, setBilling] = useState<BillingPeriod>('monthly');
  const { lang, setLang } = useLanguage();
  const { isSignedIn } = useAuth();
  const { redirectToSignIn } = useClerk();
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null);
  useSeo('membership');

  async function handleCheckout(planId: string) {
    if (!isSignedIn) {
      redirectToSignIn({ redirectUrl: window.location.href });
      return;
    }
    setLoadingPlan(planId);
    try {
      const resp = await fetch('/api/stripe/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ plan: planId, billing }),
      });
      const data = await resp.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        alert(data.error || 'Unable to start checkout. Please try again.');
      }
    } catch {
      alert('Unable to start checkout. Please try again.');
    } finally {
      setLoadingPlan(null);
    }
  }

  return (
    <PublicLayout>
      <main className="page-enter">
        <section className="relative overflow-hidden border-b border-[#46453e]">
          <div className="pointer-events-none absolute -right-24 top-10 hidden h-[440px] w-[440px] rounded-full border border-[#34352f] md:block" />
          <div className="pointer-events-none absolute -right-8 top-26 hidden h-[310px] w-[310px] rounded-full border border-[#34352f] md:block" />
          <div className="mx-auto max-w-[1280px] px-5 pb-14 pt-16 md:px-10 md:pb-20 md:pt-24">
            <div className="max-w-3xl">
              <Eyebrow>{ui.heroEyebrow[lang]}</Eyebrow>
              <h1 className="font-editorial mt-5 max-w-[760px] text-[44px] leading-[1.02] tracking-[-.035em] text-[#eee9de] md:text-[68px]">
                {ui.heroTitle[lang]}
              </h1>
              <div className="mt-7 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
                <p className="max-w-xl text-[15px] leading-7 text-[#b9b5aa]">
                  {ui.heroBody[lang]}
                </p>
                <a
                  href="#plans"
                  className="group inline-flex shrink-0 items-center gap-3 border-b border-[#746747] pb-2 text-[11px] uppercase tracking-[.14em] text-[#c6b17b] transition-colors hover:text-[#eee9de]"
                  data-testid="link-view-plans"
                >
                  {ui.comparePlans[lang]} <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                </a>
              </div>
            </div>
            <div className="mt-12 flex flex-wrap gap-x-8 gap-y-3 border-t border-[#3b3c36] pt-5 font-mono-label text-[9px] uppercase tracking-[.15em] text-[#a39e91]">
              <span className="inline-flex items-center gap-2"><span className="size-1.5 bg-[#b9a16d]" />{ui.transparentPricing[lang]}</span>
              <span className="inline-flex items-center gap-2"><span className="size-1.5 bg-[#b9a16d]" />{ui.noPercentage[lang]}</span>
              <span className="inline-flex items-center gap-2"><LockKeyhole size={12} className="text-[#b9a16d]" />{ui.privateIntroductions[lang]}</span>
            </div>
          </div>
        </section>

        <section id="plans" className="mx-auto max-w-[1280px] px-5 py-14 md:px-10 md:py-20">
          <div className="mb-9 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <Eyebrow>{ui.plansEyebrow[lang]}</Eyebrow>
              <h2 className="font-editorial mt-3 text-3xl tracking-[-.025em] text-[#eee9de] md:text-[40px]">{ui.plansTitle[lang]}</h2>
            </div>
            <div className="flex flex-col gap-4 md:items-end">
              <div className="flex items-center gap-3">
                <div className="inline-flex items-center gap-1 border border-[#41423b] bg-[#232420] p-1" data-testid="toggle-language">
                  <button
                    type="button"
                    onClick={() => setLang('en')}
                    className={`px-3 py-1.5 font-mono-label text-[10px] uppercase tracking-[.12em] transition-colors ${lang === 'en' ? 'bg-[#b9a16d] text-[#25241f]' : 'text-[#a39e91] hover:text-[#eee9de]'}`}
                    data-testid="button-lang-en"
                  >
                    EN
                  </button>
                  <button
                    type="button"
                    onClick={() => setLang('es')}
                    className={`px-3 py-1.5 font-mono-label text-[10px] uppercase tracking-[.12em] transition-colors ${lang === 'es' ? 'bg-[#b9a16d] text-[#25241f]' : 'text-[#a39e91] hover:text-[#eee9de]'}`}
                    data-testid="button-lang-es"
                  >
                    ES
                  </button>
                </div>
                <div className="inline-flex items-center gap-1 border border-[#41423b] bg-[#232420] p-1" data-testid="toggle-billing-period">
                  <button
                    type="button"
                    onClick={() => setBilling('monthly')}
                    className={`px-4 py-2 font-mono-label text-[10px] uppercase tracking-[.12em] transition-colors ${billing === 'monthly' ? 'bg-[#b9a16d] text-[#25241f]' : 'text-[#a39e91] hover:text-[#eee9de]'}`}
                    data-testid="button-billing-monthly"
                  >
                    {ui.monthly[lang]}
                  </button>
                  <button
                    type="button"
                    onClick={() => setBilling('annual')}
                    className={`px-4 py-2 font-mono-label text-[10px] uppercase tracking-[.12em] transition-colors ${billing === 'annual' ? 'bg-[#b9a16d] text-[#25241f]' : 'text-[#a39e91] hover:text-[#eee9de]'}`}
                    data-testid="button-billing-annual"
                  >
                    {ui.annual[lang]} <span className={billing === 'annual' ? 'text-[#6b5e40]' : 'text-[#b9a16d]'}>{ui.save20[lang]}</span>
                  </button>
                </div>
              </div>
              <p className="max-w-md text-[13px] leading-6 text-[#a39e91]">
                {ui.plansNote[lang]}
              </p>
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
                    {ui.mostPopular[lang]}
                  </div>
                )}
                <div className="min-h-[110px]">
                  <p className="font-mono-label text-[10px] uppercase tracking-[.14em] text-[#c6b17b]">{plan.name[lang]}</p>
                  <p className="mt-3 text-[13px] leading-5 text-[#a39e91]">{plan.description[lang]}</p>
                </div>
                <div className="flex items-baseline gap-2 border-b border-[#41423b] pb-6">
                  <span className="font-editorial text-[52px] leading-none tracking-[-.045em] text-[#eee9de]" data-testid={`text-price-${index}`}>{formatPrice(plan.price[billing])}</span>
                  <span className="font-mono-label text-[10px] uppercase tracking-[.08em] text-[#a39e91]">{ui.cadence[lang]}</span>
                  {billing === 'annual' && plan.price.annual > 0 && (
                    <span className="ml-auto font-mono-label text-[9px] uppercase tracking-[.1em] text-[#b9a16d]" data-testid={`text-annual-savings-${index}`}>{ui.off20[lang]}</span>
                  )}
                </div>
                <ul className="mt-6 flex-1 space-y-4">
                  {plan.benefits[lang].map((benefit) => (
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
                    {plan.action[lang]}<ArrowRight size={15} />
                  </Link>
                ) : (
                  <div className="mt-8">
                    <button
                      type="button"
                      disabled={loadingPlan !== null}
                      onClick={() => handleCheckout(plan.id)}
                      data-plan-id={plan.id}
                      data-billing={billing}
                      data-status="available"
                      className="inline-flex min-h-12 w-full items-center justify-center gap-2 bg-[#b9a16d] px-4 text-[11px] uppercase tracking-[.1em] text-[#25241f] transition-colors hover:bg-[#c6b17b] disabled:opacity-60"
                      data-testid={`button-checkout-${index}`}
                    >
                      {loadingPlan === plan.id && <Loader2 size={14} className="animate-spin" />}
                      {loadingPlan === plan.id
                        ? (lang === 'es' ? 'Procesando...' : 'Processing...')
                        : plan.action[lang]}
                    </button>
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
              <Eyebrow>{ui.feeEyebrow[lang]}</Eyebrow>
              <div className="mt-5 flex flex-wrap items-baseline gap-x-5 gap-y-2">
                <h2 className="font-editorial text-[32px] leading-tight tracking-[-.025em] text-[#eee9de] md:text-[42px]">{ui.feeTitle[lang]}</h2>
                <span className="font-editorial text-[40px] tracking-[-.04em] text-[#c6b17b]" data-testid="text-introduction-fee">$99</span>
              </div>
              <p className="mt-5 max-w-2xl text-[14px] leading-7 text-[#c4c0b5]">
                {ui.feeBody[lang]}
              </p>
              <div className="mt-7 flex items-start gap-3 border-t border-[#444138] pt-5 text-[11px] leading-5 text-[#a39e91]">
                <LockKeyhole size={14} className="mt-0.5 shrink-0 text-[#c6b17b]" />
                <span>{ui.feeNote[lang]}</span>
              </div>
            </div>
          </div>
        </section>

        <section className="border-t border-[#3b3c36] bg-[#22231f]">
          <div className="mx-auto grid max-w-[1280px] gap-10 px-5 py-12 md:grid-cols-[1fr_1.2fr] md:px-10 md:py-16">
            <div>
              <Eyebrow>{ui.disclosureEyebrow[lang]}</Eyebrow>
              <h2 className="font-editorial mt-4 max-w-md text-3xl leading-tight tracking-[-.025em] text-[#eee9de] md:text-[38px]">{ui.disclosureTitle[lang]}</h2>
            </div>
            <div className="md:border-l md:border-[#41423b] md:pl-10">
              <p className="font-editorial text-xl leading-8 text-[#d6d1c5] md:text-2xl">
                {ui.disclosureText[lang]}
              </p>
              <p className="mt-5 font-mono-label text-[9px] uppercase tracking-[.14em] text-[#a39e91]" data-testid="text-platform-disclosure">{ui.disclosureLabel[lang]}</p>
            </div>
          </div>
        </section>
      </main>
    </PublicLayout>
  );
}

export default PricingPage;
