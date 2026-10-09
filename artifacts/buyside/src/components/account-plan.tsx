import { useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { Link } from "wouter";
import {
  getGetMyProfileQueryKey,
  useGetMyProfile,
  useUpdateMyProfile,
  type MemberProfileInput,
} from "@workspace/api-client-react";
import { ArrowRight, CheckCircle2, CircleAlert } from "lucide-react";

const interestOptions: Array<{ value: string; label: string }> = [
  { value: "buy", label: "I'm looking to buy" },
  { value: "sell", label: "I'm looking to sell" },
  { value: "service", label: "I offer a service" },
  { value: "products", label: "I sell products" },
  { value: "broker", label: "I'm a broker / finder" },
  { value: "investor", label: "I'm an investor" },
];

const planNames = {
  free: "BuySide Free",
  pro: "BuySide Pro",
  partner: "BuySide Partner",
};

export function AccountPlanPanel({
  requestViewsUsed,
  submissionsUsed,
}: {
  requestViewsUsed?: number;
  submissionsUsed?: number;
}) {
  const profile = useGetMyProfile();
  const updateProfile = useUpdateMyProfile();
  const queryClient = useQueryClient();
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);

  useEffect(() => {
    if (profile.data?.interests) {
      setSelectedInterests(profile.data.interests.split(",").filter(Boolean));
    }
  }, [profile.data?.interests]);

  const planName = profile.isLoading
    ? "Loading plan"
    : profile.isError
      ? "Unavailable"
      : profile.data
        ? planNames[profile.data.plan]
        : "BuySide Free";

  function toggleInterest(value: string) {
    setSelectedInterests((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value],
    );
  }

  function saveInterests() {
    const role = selectedInterests.includes("buy")
      ? "buyer"
      : selectedInterests.includes("broker")
        ? "broker"
        : selectedInterests.includes("sell")
          ? "business_owner"
          : selectedInterests.includes("service")
            ? "advisor"
            : selectedInterests.includes("investor")
              ? "buyer"
              : "deal_finder";
    updateProfile.mutate(
      { data: { role, interests: selectedInterests.join(",") } },
      {
        onSuccess: () => {
          void queryClient.invalidateQueries({
            queryKey: getGetMyProfileQueryKey(),
          });
        },
      },
    );
  }

  return (
    <section
      className="mt-8 grid gap-5 border-y border-[#d4cdc1] py-6 lg:grid-cols-[1fr_1fr_1.2fr]"
      data-testid="section-account-plan"
    >
      <div>
        <p className="font-mono-label text-[9px] uppercase tracking-[.15em] text-[#8c8475]">
          How do you use BuySide?
        </p>
        {profile.isError ? (
          <div className="mt-3 text-xs text-[#d4a08c]">
            <p>Could not load your member profile.</p>
            <button
              type="button"
              onClick={() => profile.refetch()}
              className="mt-2 underline underline-offset-2"
              data-testid="button-retry-profile"
            >
              Retry
            </button>
          </div>
        ) : (
          <>
            <fieldset
              className="mt-3 space-y-2"
              data-testid="fieldset-interests"
            >
              <legend className="sr-only">Select how you use BuySide</legend>
              {interestOptions.map((option) => {
                const checked = selectedInterests.includes(option.value);
                return (
                  <label
                    key={option.value}
                    className="flex cursor-pointer items-center gap-2 text-sm text-[#eee9de]"
                  >
                    <input
                      type="checkbox"
                      checked={checked}
                      disabled={profile.isLoading || updateProfile.isPending}
                      onChange={() => toggleInterest(option.value)}
                      className="size-4 accent-[#b9a16d]"
                      data-testid={`checkbox-interest-${option.value}`}
                    />
                    {option.label}
                  </label>
                );
              })}
            </fieldset>
            <button
              type="button"
              onClick={saveInterests}
              disabled={profile.isLoading || updateProfile.isPending}
              className="mt-3 inline-flex items-center gap-2 border border-[#85734c] px-3 py-2 text-[10px] uppercase tracking-[.1em] text-[#c6b17b] transition-colors hover:bg-[#302f29] disabled:cursor-wait disabled:opacity-50"
              data-testid="button-save-interests"
            >
              {updateProfile.isPending ? "Saving…" : "Save interests"}
            </button>
            {updateProfile.isError && (
              <p className="mt-2 text-xs text-[#d4a08c]" role="alert">
                Your interests could not be saved. Please try again.
              </p>
            )}
            {updateProfile.isSuccess && (
              <p
                className="mt-2 inline-flex items-center gap-1 text-xs text-[#b9a16d]"
                data-testid="status-interests-saved"
              >
                <CheckCircle2 size={13} /> Profile updated
              </p>
            )}
            <p className="mt-3 text-[11px] leading-5 text-[#a39e91]">
              Select all that apply. This helps personalize your dashboard.
            </p>
          </>
        )}
      </div>

      <div className="border-t border-[#d4cdc1] pt-4 lg:border-l lg:border-t-0 lg:pl-5 lg:pt-0">
        <p className="font-mono-label text-[9px] uppercase tracking-[.15em] text-[#8c8475]">
          Current plan
        </p>
        <p className="font-editorial mt-3 text-2xl" data-testid="text-current-plan">
          {planName}
        </p>
        <p className="mt-2 text-xs leading-5 text-[#a39e91]">
          {profile.data?.plan === "free"
            ? `Monthly Free allowance: ${requestViewsUsed ?? "—"}/5 request details opened · ${submissionsUsed ?? "—"}/1 matching business submission used.`
            : "Paid plan entitlements are not active until billing is connected."}
        </p>
        <Link
          href="/pricing"
          className="mt-4 inline-flex items-center gap-2 text-[10px] uppercase tracking-[.1em] text-[#c6b17b] hover:text-[#eee9de]"
          data-testid="link-dashboard-pricing"
        >
          View plan details <ArrowRight size={13} />
        </Link>
      </div>

      <div className="border-t border-[#d4cdc1] pt-4 lg:border-l lg:border-t-0 lg:pl-5 lg:pt-0">
        <div className="flex items-center gap-2 text-[#d4a08c]">
          <CircleAlert size={15} />
          <p
            className="font-mono-label text-[9px] uppercase tracking-[.15em]"
            data-testid="status-billing-unavailable"
          >
            Billing unavailable
          </p>
        </div>
        <p className="mt-3 text-xs leading-5 text-[#b9b5aa]">
          Stripe is not connected. Paid-plan checkout, upgrades, cancellations,
          the billing portal, payment history, and the $99 introduction fee
          cannot be processed. No payment will be collected.
        </p>
        <div className="mt-4 grid gap-4 border-t border-[#d4cdc1] pt-3 sm:grid-cols-2">
          <div>
            <p className="font-mono-label text-[9px] uppercase tracking-[.12em] text-[#8c8475]">
              Subscription management
            </p>
            <p
              className="mt-2 text-xs leading-5 text-[#a39e91]"
              data-testid="status-subscription-management"
            >
              Upgrade and cancellation controls are unavailable.
            </p>
          </div>
          <div>
            <p className="font-mono-label text-[9px] uppercase tracking-[.12em] text-[#8c8475]">
              Payment history
            </p>
            <p
              className="mt-2 text-xs leading-5 text-[#a39e91]"
              data-testid="status-payment-history"
            >
              Not available until Stripe billing is connected.
            </p>
          </div>
        </div>
        <div className="mt-4 border-t border-[#d4cdc1] pt-3">
          <p className="font-mono-label text-[9px] uppercase tracking-[.12em] text-[#8c8475]">
            Accepted introductions
          </p>
          <p
            className="mt-2 text-xs leading-5 text-[#a39e91]"
            data-testid="status-accepted-introductions"
          >
            The $99 fee applies only after a buyer accepts a submitted match and
            chooses to proceed. Acceptance and checkout are not active, so these
            introductions are not being recorded here.
          </p>
        </div>
      </div>
    </section>
  );
}