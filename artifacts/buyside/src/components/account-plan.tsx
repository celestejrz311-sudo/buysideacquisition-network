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

const roles: Array<{ value: MemberProfileInput["role"]; label: string }> = [
  { value: "buyer", label: "Buyer" },
  { value: "broker", label: "Broker" },
  { value: "business_owner", label: "Business Owner" },
  { value: "advisor", label: "Advisor" },
  { value: "deal_finder", label: "Deal Finder" },
];
type AccountRole = MemberProfileInput["role"] | "unset";

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
  const [role, setRole] = useState<AccountRole>("unset");

  useEffect(() => {
    if (profile.data?.role) setRole(profile.data.role);
  }, [profile.data?.role]);

  const planName = profile.isLoading
    ? "Loading plan"
    : profile.isError
      ? "Unavailable"
      : profile.data
        ? planNames[profile.data.plan]
        : "BuySide Free";

  function saveRole() {
    if (role === "unset") return;
    updateProfile.mutate(
      { data: { role } },
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
          Primary role
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
            <label className="sr-only" htmlFor="member-primary-role">
              Select your primary BuySide role
            </label>
            <select
              id="member-primary-role"
              value={role}
              disabled={profile.isLoading || updateProfile.isPending}
              onChange={(event) =>
                setRole(event.target.value as AccountRole)
              }
              className="mt-3 h-11 w-full border border-[#cfc8bc] bg-[#242521] px-3 text-sm text-[#eee9de] outline-none focus:border-[#b9a16d] disabled:opacity-60"
              data-testid="select-primary-role"
            >
              <option value="unset">Select a primary role</option>
              {roles.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <button
              type="button"
              onClick={saveRole}
              disabled={
                profile.isLoading || updateProfile.isPending || role === "unset"
              }
              className="mt-3 inline-flex items-center gap-2 border border-[#85734c] px-3 py-2 text-[10px] uppercase tracking-[.1em] text-[#c6b17b] transition-colors hover:bg-[#302f29] disabled:cursor-wait disabled:opacity-50"
              data-testid="button-save-role"
            >
              {updateProfile.isPending ? "Saving…" : "Save role"}
            </button>
            {updateProfile.isError && (
              <p className="mt-2 text-xs text-[#d4a08c]" role="alert">
                Your role could not be saved. Please try again.
              </p>
            )}
            {updateProfile.isSuccess && (
              <p
                className="mt-2 inline-flex items-center gap-1 text-xs text-[#b9a16d]"
                data-testid="status-role-saved"
              >
                <CheckCircle2 size={13} /> Profile updated
              </p>
            )}
            <p className="mt-3 text-[11px] leading-5 text-[#a39e91]">
              This is your self-selected primary role. It does not verify
              credentials or grant special access.
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