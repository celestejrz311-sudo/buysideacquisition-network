export type DemoOpportunity = {
  id: string;
  title: string;
  industry: string;
  city: string;
  state: string;
  ttmRevenue: number;
  earningsLabel: "Adjusted EBITDA" | "SDE";
  normalizedEarnings: number;
  askingPrice: number;
  valuationBasis: "normalized earnings" | "TTM revenue";
  employees: number;
  yearEstablished: number;
  recurringRevenuePercent: number;
  largestCustomerPercent: number;
  sellerFinancing: string;
  reasonForSale: string;
  dealStructure: string;
  confidentialSummary: string;
};

export const demoOpportunities: DemoOpportunity[] = [
  {
    id: "commercial-cleaning-south-florida",
    title: "Commercial Janitorial Services",
    industry: "Commercial Cleaning",
    city: "Fort Lauderdale",
    state: "FL",
    ttmRevenue: 1184732,
    earningsLabel: "SDE",
    normalizedEarnings: 247890,
    askingPrice: 895000,
    valuationBasis: "normalized earnings",
    employees: 17,
    yearEstablished: 2013,
    recurringRevenuePercent: 74,
    largestCustomerPercent: 19,
    sellerFinancing:
      "Seller is open to a 10% subordinated note for a qualified buyer, subject to diligence.",
    reasonForSale:
      "Founder is planning retirement and will support a defined transition period.",
    dealStructure:
      "Asset sale; normalized working capital and assignment of the operating lease to be negotiated.",
    confidentialSummary:
      "Anonymized South Florida operator serving 46 office, medical, and light-industrial sites. TTM revenue grew 3.4%, while overtime and substitute-labor costs compressed the latest quarter's margin. The largest account renews within 12 months; a field supervisor handles nightly scheduling.",
  },
  {
    id: "hvac-central-florida",
    title: "Central Florida HVAC Contractor",
    industry: "HVAC",
    city: "Orlando",
    state: "FL",
    ttmRevenue: 4872641,
    earningsLabel: "Adjusted EBITDA",
    normalizedEarnings: 613418,
    askingPrice: 3875000,
    valuationBasis: "normalized earnings",
    employees: 34,
    yearEstablished: 2006,
    recurringRevenuePercent: 29,
    largestCustomerPercent: 17,
    sellerFinancing:
      "A seller note of up to 5% may be considered alongside third-party senior financing.",
    reasonForSale:
      "Founder is relocating out of state; the service manager is expected to remain.",
    dealStructure:
      "Asset purchase preferred; vehicles, dispatch software, and service agreements included, with real estate leased separately.",
    confidentialSummary:
      "Residential and light-commercial service contractor with a 62% service and replacement mix. Revenue increased 6.1% year over year, but technician overtime and parts inflation reduced gross margin. The buyer will need a recruiting plan for licensed technicians before expanding the current service area.",
  },
  {
    id: "plumbing-tampa-bay",
    title: "Bay Area Plumbing & Drain Contractor",
    industry: "Plumbing",
    city: "Tampa",
    state: "FL",
    ttmRevenue: 2734819,
    earningsLabel: "Adjusted EBITDA",
    normalizedEarnings: 416708,
    askingPrice: 2075000,
    valuationBasis: "normalized earnings",
    employees: 22,
    yearEstablished: 2009,
    recurringRevenuePercent: 36,
    largestCustomerPercent: 18,
    sellerFinancing:
      "Seller may carry up to 8% of consideration, subject to buyer qualifications and note subordination.",
    reasonForSale:
      "The two active shareholders are pursuing a partner buyout and separate post-close plans.",
    dealStructure:
      "Asset sale with a customary working-capital true-up; seller expects to remain available for customer introductions.",
    confidentialSummary:
      "A 22-person plumbing contractor with residential service, drain work, and a modest commercial maintenance book. TTM revenue declined 4.2% after two property-management contracts were rebid. Dispatch still relies on owner review, leaving a clear systems-improvement need for a buyer.",
  },
  {
    id: "logistics-memphis",
    title: "Regional 3PL & Dedicated Fleet Operator",
    industry: "Logistics",
    city: "Memphis",
    state: "TN",
    ttmRevenue: 42680913,
    earningsLabel: "Adjusted EBITDA",
    normalizedEarnings: 2386451,
    askingPrice: 12850000,
    valuationBasis: "normalized earnings",
    employees: 118,
    yearEstablished: 2011,
    recurringRevenuePercent: 82,
    largestCustomerPercent: 31,
    sellerFinancing:
      "No seller financing indicated; seller will consider a short transition services agreement.",
    reasonForSale:
      "Current owner is exiting a non-core regional platform following a portfolio review.",
    dealStructure:
      "Stock purchase contemplated on a cash-free, debt-free basis with a normalized net-working-capital peg; property is excluded.",
    confidentialSummary:
      "Asset-light 3PL with dedicated fleet capacity and recurring shipper contracts across the Mid-South. TTM revenue is down 8.4% from the prior period after a large retail lane was reduced. The largest customer contributes 31% of sales, and two contracts renew in the next 18 months.",
  },
  {
    id: "ecommerce-austin",
    title: "Specialty Outdoor Goods E-commerce Brand",
    industry: "E-commerce",
    city: "Austin",
    state: "TX",
    ttmRevenue: 8724196,
    earningsLabel: "Adjusted EBITDA",
    normalizedEarnings: 723440,
    askingPrice: 3415000,
    valuationBasis: "normalized earnings",
    employees: 14,
    yearEstablished: 2017,
    recurringRevenuePercent: 47,
    largestCustomerPercent: 16,
    sellerFinancing:
      "Seller is not currently offering a note; inventory will be valued separately at closing.",
    reasonForSale:
      "The founders want to redeploy capital into a different consumer-products venture.",
    dealStructure:
      "Asset sale excluding cash and funded debt; finished-goods inventory and open purchase orders subject to a closing true-up.",
    confidentialSummary:
      "Multi-channel brand with direct-to-consumer sales and a small wholesale program. TTM revenue fell 9.6% as paid-media spend was reduced; contribution margin improved, but marketplace sales remain an important channel. Buyer diligence should test return rates, advertising attribution, and aged inventory.",
  },
  {
    id: "saas-compliance-denver",
    title: "Vertical Compliance SaaS Platform",
    industry: "SaaS",
    city: "Denver",
    state: "CO",
    ttmRevenue: 18624771,
    earningsLabel: "Adjusted EBITDA",
    normalizedEarnings: 3725463,
    askingPrice: 51750000,
    valuationBasis: "TTM revenue",
    employees: 106,
    yearEstablished: 2012,
    recurringRevenuePercent: 96,
    largestCustomerPercent: 8,
    sellerFinancing:
      "No seller note indicated; rollover equity may be discussed with a strategic or sponsor buyer.",
    reasonForSale:
      "Founder and early institutional investors are evaluating a liquidity event.",
    dealStructure:
      "Equity sale contemplated, subject to customer-consent review, a quality-of-earnings process, and customary escrow and indemnity terms.",
    confidentialSummary:
      "Subscription platform serving regulated mid-market customers, with 96% recurring revenue and a broad customer base. Revenue grew 14.8% year over year, but net revenue retention is 101% and product investment has moderated EBITDA growth. The buyer should diligence renewal cohorts, implementation capacity, and deferred-revenue obligations.",
  },
  {
    id: "automotive-oklahoma-city",
    title: "Independent Auto Repair & Light Collision Shop",
    industry: "Automotive",
    city: "Oklahoma City",
    state: "OK",
    ttmRevenue: 1592384,
    earningsLabel: "SDE",
    normalizedEarnings: 168310,
    askingPrice: 575000,
    valuationBasis: "normalized earnings",
    employees: 9,
    yearEstablished: 2008,
    recurringRevenuePercent: 16,
    largestCustomerPercent: 22,
    sellerFinancing:
      "Seller may consider a 12% standby note for a buyer with relevant operating experience.",
    reasonForSale:
      "Owner is stepping back for health reasons and is available for a limited handoff.",
    dealStructure:
      "Asset sale including shop equipment and customer records; building is leased from an unrelated landlord.",
    confidentialSummary:
      "Single-location repair shop with general mechanical work and a small light-collision book. TTM revenue was essentially flat, and normalized earnings include owner labor adjustments that require buyer verification. Two lifts are nearing replacement and the largest fleet account represents 22% of sales.",
  },
  {
    id: "construction-charlotte",
    title: "Commercial Electrical & Tenant-Improvement Contractor",
    industry: "Construction",
    city: "Charlotte",
    state: "NC",
    ttmRevenue: 11824301,
    earningsLabel: "Adjusted EBITDA",
    normalizedEarnings: 481207,
    askingPrice: 1925000,
    valuationBasis: "normalized earnings",
    employees: 37,
    yearEstablished: 2010,
    recurringRevenuePercent: 14,
    largestCustomerPercent: 39,
    sellerFinancing:
      "Seller financing is not indicated; bonding capacity and backlog assumptions are subject to buyer approval.",
    reasonForSale:
      "The founder is seeking a succession solution after a difficult project cycle.",
    dealStructure:
      "Asset sale; open contracts, bonding support, retainage, and work-in-progress to be reviewed project by project.",
    confidentialSummary:
      "Regional contractor with a mix of electrical upgrades and tenant-improvement projects. TTM revenue declined 12.7% after a major project reached completion, and labor overruns compressed adjusted EBITDA to 4.1% of sales. One general-contractor relationship represents 39% of revenue; backlog conversion is a key diligence item.",
  },
  {
    id: "manufacturing-grand-rapids",
    title: "Precision Machined Components Manufacturer",
    industry: "Manufacturing",
    city: "Grand Rapids",
    state: "MI",
    ttmRevenue: 32146250,
    earningsLabel: "Adjusted EBITDA",
    normalizedEarnings: 2346887,
    askingPrice: 13875000,
    valuationBasis: "normalized earnings",
    employees: 126,
    yearEstablished: 1998,
    recurringRevenuePercent: 68,
    largestCustomerPercent: 26,
    sellerFinancing:
      "The owners may consider a 5% equity rollover; no seller note is currently indicated.",
    reasonForSale:
      "Second-generation ownership has no identified family successor.",
    dealStructure:
      "Stock or asset structure is open to discussion; equipment condition, environmental review, and normalized working capital are material.",
    confidentialSummary:
      "Custom machining and short-run components supplier with repeat OEM programs. Revenue grew 4.7%, while EBITDA margin eased to 7.3% as scrap and expedited freight increased. The plant requires an estimated $1.1M of near-term maintenance capex, and the three largest programs contribute 54% of sales.",
  },
  {
    id: "distribution-phoenix",
    title: "Industrial Safety & MRO Distributor",
    industry: "Distribution",
    city: "Phoenix",
    state: "AZ",
    ttmRevenue: 49843612,
    earningsLabel: "Adjusted EBITDA",
    normalizedEarnings: 2574169,
    askingPrice: 13850000,
    valuationBasis: "normalized earnings",
    employees: 62,
    yearEstablished: 2004,
    recurringRevenuePercent: 55,
    largestCustomerPercent: 21,
    sellerFinancing:
      "A 10% standby note may be considered after inventory quality and borrowing-base diligence.",
    reasonForSale:
      "Majority shareholder is pursuing retirement; minority management is open to a new equity partner.",
    dealStructure:
      "Stock purchase contemplated with a cash-free, debt-free peg and a detailed inventory-count and obsolescence adjustment.",
    confidentialSummary:
      "Multi-branch distributor of industrial safety and maintenance products. TTM sales declined 3.8% after two customer sites consolidated. Gross margin is pressured by freight and rebate timing, and approximately 16% of on-hand inventory is slow-moving and requires a valuation review.",
  },
  {
    id: "healthcare-richmond",
    title: "Multi-Site Outpatient Therapy Practice",
    industry: "Healthcare",
    city: "Richmond",
    state: "VA",
    ttmRevenue: 18654813,
    earningsLabel: "Adjusted EBITDA",
    normalizedEarnings: 2885700,
    askingPrice: 21875000,
    valuationBasis: "normalized earnings",
    employees: 123,
    yearEstablished: 2016,
    recurringRevenuePercent: 64,
    largestCustomerPercent: 26,
    sellerFinancing:
      "A small retention-based note may be discussed; no amount or terms have been agreed.",
    reasonForSale:
      "Clinician founders want to reduce administrative responsibilities while preserving clinical roles.",
    dealStructure:
      "Equity transaction subject to provider, payer, and regulatory consents; founder employment and clinical coverage require negotiation.",
    confidentialSummary:
      "Four-site outpatient therapy group with repeat patient plans and a diversified referral network. Adjusted EBITDA margin is 15.5%, but payer reimbursement delays increased receivables and the largest commercial payer represents 26% of collections. Two open clinician positions are limiting appointment capacity.",
  },
  {
    id: "home-services-atlanta",
    title: "Residential Pest & Property Services",
    industry: "Home Services",
    city: "Atlanta",
    state: "GA",
    ttmRevenue: 1734289,
    earningsLabel: "SDE",
    normalizedEarnings: 281544,
    askingPrice: 1025000,
    valuationBasis: "normalized earnings",
    employees: 15,
    yearEstablished: 2016,
    recurringRevenuePercent: 41,
    largestCustomerPercent: 19,
    sellerFinancing:
      "Owner may carry up to 10% of consideration, contingent on customer retention and note subordination.",
    reasonForSale:
      "Owner is relocating and no longer wants to manage field operations.",
    dealStructure:
      "Asset sale including vehicles, route records, and assignable service agreements; a short transition is available.",
    confidentialSummary:
      "Local operator combining pest-control routes with seasonal property-maintenance work. TTM revenue declined 7.8% after the owner stopped taking after-hours jobs. Recurring plans support visibility, but customer records are split across two systems and several technician roles need to be backfilled.",
  },
];