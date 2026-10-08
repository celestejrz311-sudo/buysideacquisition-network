import { useEffect, useRef, type ReactNode } from 'react';
import { QueryClient, QueryClientProvider, useQueryClient } from '@tanstack/react-query';
import { ClerkProvider, Show, SignIn, SignUp, useClerk } from '@clerk/react';
import { publishableKeyFromHost } from '@clerk/react/internal';
import { shadcn } from '@clerk/themes';
import { Route, Switch, Redirect, Link, useLocation, Router as WouterRouter } from 'wouter';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import { LanguageProvider } from '@/i18n/LanguageProvider';
import NotFound from '@/pages/not-found';
import { PricingPage } from '@/pages/PricingPage';
import { AdminPage } from '@/pages/AdminPage';
import {
  BuyerTermsPage, ConfidentialityPage, ContactPage, DashboardPage, DisclaimerPage,
  FinderTermsPage, ForBuyersPage, ForFindersPage,
  HowItWorksPage, HomePage, OpportunitiesPage, PostRequestPage, PrivacyPolicyPage, PrivateNetworkPage,
  RequestDetail, RequestMarketplace, SubmitMatchPage,
  TermsOfUsePage,
} from '@/pages/pages';

const queryClient = new QueryClient();
const basePath = import.meta.env.BASE_URL.replace(/\/$/, '');

// Resolve the key by hostname so one build can serve multiple Clerk domains.
const clerkPubKey = publishableKeyFromHost(window.location.hostname, import.meta.env.VITE_CLERK_PUBLISHABLE_KEY);
// Empty in development by design; automatically populated for production proxying.
const clerkProxyUrl = import.meta.env.VITE_CLERK_PROXY_URL;

function stripBase(path: string): string {
  return basePath && path.startsWith(basePath) ? path.slice(basePath.length) || '/' : path;
}

if (!clerkPubKey) throw new Error('Missing VITE_CLERK_PUBLISHABLE_KEY in .env file');

const clerkAppearance = {
  theme: shadcn,
  cssLayerName: 'clerk',
  options: {
    logoPlacement: 'inside' as const,
    logoLinkUrl: basePath || '/',
    logoImageUrl: `${window.location.origin}${basePath}/logo.svg`,
    socialButtonsPlacement: 'top' as const,
    socialButtonsVariant: 'blockButton' as const,
  },
  variables: {
    colorPrimary: '#b9a16d', colorForeground: '#eee9de', colorMutedForeground: '#b9b5aa',
    colorDanger: '#bf7864', colorBackground: '#242521', colorInput: '#242521',
    colorInputForeground: '#eee9de', colorNeutral: '#46453e',
    fontFamily: 'DM Sans, sans-serif', borderRadius: '2px',
  },
  elements: {
    rootBox: 'w-full flex justify-center',
    cardBox: 'bg-[#fbfaf7] rounded-none w-[440px] max-w-full overflow-hidden border border-[#d8d1c5]',
    card: '!shadow-none !border-0 !bg-transparent !rounded-none',
    footer: '!shadow-none !border-0 !bg-transparent !rounded-none',
    headerTitle: 'text-[#332f29] font-serif tracking-tight',
    headerSubtitle: 'text-[#706b61]',
    socialButtonsBlockButtonText: 'text-[#38352f]',
    formFieldLabel: 'text-[#625d53]',
    footerActionLink: 'text-[#75633e]',
    footerActionText: 'text-[#706b61]',
    dividerText: 'text-[#81796c]',
    identityPreviewEditButton: 'text-[#75633e]',
    formFieldSuccessText: 'text-[#557165]',
    alertText: 'text-[#8b5147]',
    logoBox: 'mb-3',
    logoImage: 'max-h-9',
    socialButtonsBlockButton: 'border-[#cfc8bc] rounded-none',
    formButtonPrimary: 'bg-[#38352f] hover:bg-[#504b40] rounded-none shadow-none',
    formFieldInput: 'bg-[#fbfaf7] border-[#cfc8bc] rounded-none text-[#332f29]',
    footerAction: 'border-t border-[#e4ded3]',
    dividerLine: 'bg-[#ded8cc]',
    alert: 'rounded-none',
    otpCodeFieldInput: 'rounded-none border-[#cfc8bc]',
    formFieldRow: 'gap-2',
    main: 'gap-5',
  },
};

function HomeRedirect() {
  return <><Show when="signed-in"><Redirect to="/dashboard" /></Show><Show when="signed-out"><HomePage /></Show></>;
}

function DashboardRoute() {
  return <><Show when="signed-in"><DashboardPage /></Show><Show when="signed-out"><Redirect to="/" /></Show></>;
}

function MemberOnly({ children, signOutTo = '/sign-in' }: { children: ReactNode; signOutTo?: string }) {
  return <><Show when="signed-in">{children}</Show><Show when="signed-out"><Redirect to={signOutTo} /></Show></>;
}

function PostRequestRoute() {
  return <MemberOnly signOutTo="/sign-up"><PostRequestPage /></MemberOnly>;
}

function AdminRoute() {
  return <MemberOnly><AdminPage /></MemberOnly>;
}

function SubmitMatchRoute() {
  return <MemberOnly><SubmitMatchPage /></MemberOnly>;
}

function SignInPage() {
  return <div className="grain flex min-h-[100dvh] flex-col bg-[#f5f2eb]">
    <div className="px-5 py-6"><Link href="/" className="inline-flex items-center gap-3 text-[#332f29]"><span className="grid size-9 place-items-center border border-[#aaa18f]"><span className="size-3 rotate-45 border border-[#b9a16d]" /></span><span className="text-[13px] font-semibold uppercase tracking-[.2em]">BuySide</span></Link></div>
    <div className="grid flex-1 items-center gap-10 px-5 pb-12 md:grid-cols-2 md:px-10">
      <div className="mx-auto max-w-md"><p className="font-mono-label text-[10px] uppercase tracking-[.18em] text-[#897649]">Member access</p><h1 className="font-editorial mt-5 text-5xl leading-tight">Private work, in the right company.</h1><p className="mt-5 text-sm leading-7 text-[#6b665d]">Sign in to review buyer mandates, saved criteria and introductions shared with you.</p></div>
      <div className="mx-auto w-full max-w-[440px]">
        <SignIn routing="path" path={`${basePath}/sign-in`} signUpUrl={`${basePath}/sign-up`} />
      </div>
    </div>
  </div>;
}

function SignUpPage() {
  return <div className="grain flex min-h-[100dvh] flex-col bg-[#f5f2eb]">
    <div className="px-5 py-6"><Link href="/" className="inline-flex items-center gap-3 text-[#332f29]"><span className="grid size-9 place-items-center border border-[#aaa18f]"><span className="size-3 rotate-45 border border-[#b9a16d]" /></span><span className="text-[13px] font-semibold uppercase tracking-[.2em]">BuySide</span></Link></div>
    <div className="grid flex-1 items-center gap-10 px-5 pb-12 md:grid-cols-2 md:px-10">
      <div className="mx-auto max-w-md"><p className="font-mono-label text-[10px] uppercase tracking-[.18em] text-[#897649]">Join the network</p><h1 className="font-editorial mt-5 text-5xl leading-tight">Start with a clear point of view.</h1><p className="mt-5 text-sm leading-7 text-[#6b665d]">Create a member account to publish acquisition criteria or privately introduce a potential match.</p></div>
      <div className="mx-auto w-full max-w-[440px]">
        <SignUp routing="path" path={`${basePath}/sign-up`} signInUrl={`${basePath}/sign-in`} />
      </div>
    </div>
  </div>;
}

function ClerkQueryClientCacheInvalidator() {
  const { addListener } = useClerk();
  const client = useQueryClient();
  const previousUser = useRef<string | null | undefined>(undefined);
  useEffect(() => {
    const unsubscribe = addListener(({ user }) => {
      const userId = user?.id ?? null;
      if (previousUser.current !== undefined && previousUser.current !== userId) client.clear();
      previousUser.current = userId;
    });
    return unsubscribe;
  }, [addListener, client]);
  return null;
}

function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

function RoutedPages() {
  const [, setLocation] = useLocation();
  return <ClerkProvider
    publishableKey={clerkPubKey}
    proxyUrl={clerkProxyUrl}
    appearance={clerkAppearance}
    signInUrl={`${basePath}/sign-in`}
    signUpUrl={`${basePath}/sign-up`}
    localization={{
      signIn: { start: { title: 'Welcome back', subtitle: 'Sign in to access your BuySide workspace.' } },
      signUp: { start: { title: 'Join BuySide', subtitle: 'Create a discreet acquisition network account.' } },
    }}
    routerPush={to => setLocation(stripBase(to))}
    routerReplace={to => setLocation(stripBase(to), { replace: true })}
  >
    <ClerkQueryClientCacheInvalidator />
    <RoutedErrorBoundary><Switch>
      <Route path="/" component={HomeRedirect} />
      <Route path="/opportunities" component={OpportunitiesPage} />
      <Route path="/requests" component={RequestMarketplace} />
      <Route path="/requests/:requestId" component={RequestDetail} />
      <Route path="/for-buyers" component={ForBuyersPage} />
      <Route path="/for-finders" component={ForFindersPage} />
      <Route path="/how-it-works" component={HowItWorksPage} />
      <Route path="/pricing" component={PricingPage} />
      <Route path="/private-network" component={PrivateNetworkPage} />
      <Route path="/confidentiality" component={ConfidentialityPage} />
      <Route path="/terms-of-use" component={TermsOfUsePage} />
      <Route path="/privacy-policy" component={PrivacyPolicyPage} />
      <Route path="/finder-terms" component={FinderTermsPage} />
      <Route path="/buyer-terms" component={BuyerTermsPage} />
      <Route path="/disclaimer" component={DisclaimerPage} />
      <Route path="/contact" component={ContactPage} />
      <Route path="/post-request" component={PostRequestRoute} />
      <Route path="/submit/:requestId" component={SubmitMatchRoute} />
      <Route path="/dashboard" component={DashboardRoute} />
      <Route path="/admin" component={AdminRoute} />
      {/* This optional wildcard is required for Clerk OAuth callback paths. */}
      <Route path="/sign-in/*?" component={SignInPage} />
      <Route path="/sign-up/*?" component={SignUpPage} />
      <Route component={NotFound} />
    </Switch></RoutedErrorBoundary>
  </ClerkProvider>;
}

function App() {
  return <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <TooltipProvider><WouterRouter base={basePath}><RoutedPages /></WouterRouter><Toaster /></TooltipProvider>
    </LanguageProvider>
  </QueryClientProvider>;
}

export default App;