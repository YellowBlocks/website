/**
 * Domain types for all CMS-managed content.
 * Field names match the Sanity schemas in /studio/schemas one-to-one, so the
 * local seed content and the CMS share a single shape.
 */

export type PublicationStatus = "published" | "draft" | "planned";
export type SolutionCategory = "assessment" | "product" | "service";

export interface Cta {
  label: string;
  href: string;
  /** Analytics event fired on click. */
  event?: AnalyticsEventName;
}

export type AnalyticsEventName =
  | "assessment_cta_clicked"
  | "scheduling_link_clicked"
  | "sample_report_clicked"
  | "contact_cta_clicked";

export interface Seo {
  title: string;
  description: string;
  noIndex?: boolean;
  ogImage?: string;
}

/* ---------- Portable Text (subset) ---------- */
export interface PtSpan {
  _type: "span";
  _key: string;
  text: string;
  marks?: string[];
}
export interface PtLinkDef {
  _type: "link";
  _key: string;
  href: string;
}
export interface PtBlock {
  _type: "block";
  _key: string;
  style: "normal" | "h2" | "h3" | "blockquote";
  listItem?: "bullet" | "number";
  level?: number;
  children: PtSpan[];
  markDefs: PtLinkDef[];
}
export type PortableText = PtBlock[];

/* ---------- Reusable page sections ---------- */
export interface TitledText {
  _key: string;
  title: string;
  body: string;
}

export interface ProblemSection {
  _type: "problemSection";
  _key: string;
  heading: string;
  intro?: string;
  points: TitledText[];
}

export interface ContrastSection {
  _type: "contrastSection";
  _key: string;
  heading: string;
  intro?: string;
  ordinaryLabel: string;
  ordinary: string[];
  contextualLabel: string;
  contextual: string[];
}

export interface ScopeSection {
  _type: "scopeSection";
  _key: string;
  heading: string;
  intro?: string;
  groups: { _key: string; title: string; items: string[] }[];
}

export interface DeliverablesSection {
  _type: "deliverablesSection";
  _key: string;
  heading: string;
  intro?: string;
  items: TitledText[];
  sampleReportCta?: Cta;
}

export interface ProcessSection {
  _type: "processSection";
  _key: string;
  heading: string;
  intro?: string;
  steps: (TitledText & { note?: string })[];
}

export interface AudienceSection {
  _type: "audienceSection";
  _key: string;
  heading: string;
  intro?: string;
  audiences: { _key: string; role: string; need: string }[];
}

export interface BoundariesSection {
  _type: "boundariesSection";
  _key: string;
  heading: string;
  intro?: string;
  included: string[];
  excluded: string[];
  note?: string;
}

export interface PricingSection {
  _type: "pricingSection";
  _key: string;
  heading: string;
  model: "fixed" | "quote";
  /** Amount in euro, excluding VAT. Only for model "fixed". */
  amount?: number;
  priceLabel: string;
  vatNote?: string;
  scope: string[];
  note?: string;
  /** False until the commercial terms are formally approved. */
  approved: boolean;
  cta: Cta;
}

export interface FaqSection {
  _type: "faqSection";
  _key: string;
  heading: string;
  items: { _key: string; question: string; answer: string }[];
}

export interface ExampleInsightSection {
  _type: "exampleInsightSection";
  _key: string;
  heading: string;
  intro?: string;
  observation: string;
  observationSource: string;
  chain: { _key: string; label: string; detail: string; kind: "fact" | "hypothesis" | "effect" }[];
  insight: string;
  validationQuestion: string;
}

export interface RichTextSection {
  _type: "richTextSection";
  _key: string;
  heading: string;
  body: PortableText;
}

export interface CtaSection {
  _type: "ctaSection";
  _key: string;
  heading: string;
  body?: string;
  primary: Cta;
  secondary?: Cta;
}

/** Lists all published solutions automatically. */
export interface SolutionsSection {
  _type: "solutionsSection";
  _key: string;
  heading: string;
  intro?: string;
  /** Limit to one category (e.g. only assessments). */
  category?: SolutionCategory;
}

/** Two (or more) main lines of business, side by side. */
export interface PillarsSection {
  _type: "pillarsSection";
  _key: string;
  heading: string;
  intro?: string;
  pillars: { _key: string; title: string; lead: string; body: string; points: string[]; cta?: Cta }[];
}

/** The Reality / Context / Knowledge method. */
export interface ApproachSection {
  _type: "approachSection";
  _key: string;
  heading: string;
  intro?: string;
  dimensions: { _key: string; title: string; question: string; body: string }[];
  note?: string;
}

/** Founder and expertise, from site settings. */
export interface FounderSection {
  _type: "founderSection";
  _key: string;
  heading: string;
  intro?: string;
}

/** Latest articles plus selected external writing. */
export interface InsightsSection {
  _type: "insightsSection";
  _key: string;
  heading: string;
  intro?: string;
  limit?: number;
}

/** Real, approved testimonials only (verified must be true to render). */
export interface TestimonialsSection {
  _type: "testimonialsSection";
  _key: string;
  heading: string;
  items: { quote: string; name: string; role: string; company: string; verified: boolean }[];
}

/** Areas of expertise, grouped (e.g. domains vs. engineering disciplines). */
export interface CapabilitiesSection {
  _type: "capabilitiesSection";
  _key: string;
  heading: string;
  intro?: string;
  groups: {
    _key: string;
    title: string;
    description?: string;
    items: { _key: string; title: string; lead: string; points: string[]; link?: Cta }[];
  }[];
}

/** Ways to work together (assessment, project, tooling …). */
export interface EngagementSection {
  _type: "engagementSection";
  _key: string;
  heading: string;
  intro?: string;
  items: { _key: string; title: string; body: string; cta?: Cta; needsApproval?: boolean }[];
}

/** Recurring improvement cycle (Plan, Do, Check, Act). */
export interface CycleSection {
  _type: "cycleSection";
  _key: string;
  heading: string;
  intro?: string;
  centerLabel: string;
  steps: { _key: string; letter: string; title: string; subtitle: string; body: string; points: string[] }[];
  note?: string;
  cta?: Cta;
}

/** The core problem, broken into causes, each paired with what YellowBlocks does about it. */
export interface ProblemSolutionSection {
  _type: "problemSolutionSection";
  _key: string;
  heading: string;
  intro?: string;
  items: { _key: string; problem: string; problemBody: string; answer: string; answerBody: string; links: Cta[] }[];
}

/** The layers between "ingesteld" and "geregeld", each with the work that addresses it. */
export interface LayersSection {
  _type: "layersSection";
  _key: string;
  heading: string;
  intro?: string;
  topLabel: string;
  layers: { _key: string; name: string; question: string; body: string; capabilities: string[] }[];
  note?: string;
}

export type PageSection =
  | PillarsSection
  | LayersSection
  | ProblemSolutionSection
  | CycleSection
  | CapabilitiesSection
  | EngagementSection
  | TestimonialsSection
  | SolutionsSection
  | ApproachSection
  | FounderSection
  | InsightsSection
  | ProblemSection
  | ContrastSection
  | ScopeSection
  | DeliverablesSection
  | ProcessSection
  | AudienceSection
  | BoundariesSection
  | PricingSection
  | FaqSection
  | ExampleInsightSection
  | RichTextSection
  | CtaSection;

/* ---------- Documents ---------- */
export interface SolutionCategoryDoc {
  slug: SolutionCategory;
  title: string;
  description: string;
  order: number;
}

export interface Solution {
  _id: string;
  slug: string;
  status: PublicationStatus;
  category: SolutionCategory;
  order: number;
  title: string;
  /** Short name for navigation and the contact topic list. */
  shortTitle: string;
  /** The question the offering answers, used as the hero heading. */
  question: string;
  summary: string;
  outcome: string;
  audienceSummary: string;
  heroIntro: string;
  primaryCta: Cta;
  secondaryCta?: Cta;
  /** Shown on listings when there is a fixed starting price. */
  priceHint?: string;
  /** Short label on listings, e.g. "Nieuw". */
  badge?: string;
  sections: PageSection[];
  relatedArticles?: string[];
  seo: Seo;
  /** Service type for Service JSON-LD. */
  serviceType: string;
  updatedAt: string;
}

export interface Page {
  _id: string;
  slug: string;
  title: string;
  intro?: string;
  /** Home only: hero copy and calls to action. */
  hero?: {
    heading: string;
    intro: string;
    primaryCta: Cta;
    secondaryCta?: Cta;
    /** Layer names bottom-up for the hero stack, and the label on top. */
    stack?: { layers: string[]; topLabel: string; caption?: string };
  };
  sections: PageSection[];
  seo: Seo;
  updatedAt: string;
}

export interface Author {
  name: string;
  role: string;
  url?: string;
}

export interface Article {
  _id: string;
  slug: string;
  status: PublicationStatus;
  title: string;
  excerpt: string;
  topics: string[];
  author: Author;
  publishedAt: string;
  updatedAt: string;
  readingMinutes: number;
  body: PortableText;
  relatedSolutions?: string[];
  seo: Seo;
}

export interface ExternalArticle {
  title: string;
  url: string;
  publishedAt: string;
}

export interface SiteSettings {
  name: string;
  legalName: string;
  tagline: string;
  description: string;
  phone: string;
  phoneHref: string;
  kvk: string;
  vat: string;
  social: { label: string; href: string }[];
  founder: {
    name: string;
    /** Path or URL of the portrait photo. */
    photo?: string;
    role: string;
    bio: string[];
    facts: { label: string; href?: string }[];
    blogUrl: string;
    linkedIn: string;
    github: string;
  };
  externalWriting: ExternalArticle[];
}
