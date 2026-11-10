import type { Solution } from "../../types";

/**
 * English seed content for the offerings. Slugs, ids of related articles and
 * contact topics are shared with the Dutch seed; URLs are localised by the Link component.
 */

const caAssessment: Solution = {
  _id: "solution.conditional-access-assessment.en",
  slug: "conditional-access-assessment",
  status: "published",
  category: "assessment",
  order: 1,
  title: "Conditional Access Assessment",
  shortTitle: "Conditional Access Assessment",
  question: "Do your Conditional Access policies really give you the protection you expect?",
  summary:
    "An independent, read-only review of how your Conditional Access policies work together: assignments, exclusions, dependencies and the gaps in between.",
  outcome: "You know which access scenarios are covered, where there is doubt and what to address first.",
  audienceSummary: "For security engineers, Entra administrators and the IT manager or CISO who needs to explain how access is protected.",
  heroIntro:
    "Having policies is not the same as being protected. An exclusion for one group, a named location that is too broad or a device condition that relies on an outdated compliance signal: any detail can open a scenario nobody intended. We reconstruct what your policies do together, scenario by scenario.",
  primaryCta: { label: "Request a Conditional Access Assessment", href: "/contact?onderwerp=conditional-access-assessment", event: "assessment_cta_clicked" },
  secondaryCta: { label: "Book an intro call", href: "/contact?onderwerp=kennismaking", event: "scheduling_link_clicked" },
  serviceType: "Microsoft Entra Conditional Access assessment",
  relatedArticles: ["verborgen-risicos-conditional-access-exclusions", "conditional-access-verwachte-bescherming"],
  updatedAt: "2026-11-10",
  seo: {
    title: "Conditional Access Assessment for Microsoft Entra",
    description:
      "Independent, read-only Conditional Access Assessment: we map how your Entra policies work together, where exclusions open gaps and what to address first.",
  },
  sections: [
    {
      _type: "problemSection",
      _key: "problem",
      heading: "Why a working configuration still doesn't give certainty",
      intro:
        "Conditional Access decides again at every sign-in, based on all policies that apply. So protection doesn't live in one policy, but in the sum of them. That is exactly where the surprises come from.",
      points: [
        {
          _key: "p1",
          title: "Exclusions pile up",
          body: "A group once excluded temporarily for a migration, a service account that can't handle MFA. Each exclusion is defensible; together they can form a route nobody oversees anymore.",
        },
        {
          _key: "p2",
          title: "Policies rely on signals from elsewhere",
          body: "A requirement like 'device must be compliant' is only as strong as the compliance assignment in Intune. If a device falls outside that assignment, the signal Conditional Access relies on is no longer right.",
        },
        {
          _key: "p3",
          title: "Reports count policies, not scenarios",
          body: "An overview shows that twenty policies are enabled. It doesn't tell you whether an administrator on an unmanaged device from an unknown location can reach the admin portals.",
        },
      ],
    },
    {
      _type: "contrastSection",
      _key: "contrast",
      heading: "What an ordinary configuration review misses",
      intro:
        "Most reviews go through policies one by one and compare settings with a baseline. That is useful, but it doesn't answer the question that really matters.",
      ordinaryLabel: "A policy-by-policy review",
      ordinary: [
        "Checks whether MFA is enabled in a policy",
        "Reports that exclusions exist",
        "Compares settings with a list of recommendations",
        "Delivers a list of separate findings",
      ],
      contextualLabel: "The Conditional Access Assessment",
      contextual: [
        "Determines per scenario which combination of policies actually applies",
        "Follows each exclusion to the accounts and devices it affects",
        "Tests whether dependencies such as compliance and named locations deliver the expected signal",
        "Separates established gaps from questions you need to confirm",
      ],
    },
    {
      _type: "exampleInsightSection",
      _key: "example",
      heading: "What a finding looks like",
      intro: "A fictional but technically realistic example with synthetic data.",
      observation: "Policy 'CA012 – Require MFA for admins' is enabled and applies to all administrator roles.",
      observationSource: "What a standard check reports",
      chain: [
        { _key: "c1", kind: "fact", label: "Exclusion", detail: "The group 'GRP-Migration-2024' is excluded from CA012." },
        { _key: "c2", kind: "fact", label: "Membership", detail: "Two accounts in that group still hold the Intune Administrator role." },
        { _key: "c3", kind: "fact", label: "Other policies", detail: "No other policy requires MFA for these accounts at the admin portals." },
        { _key: "c4", kind: "effect", label: "Consequence", detail: "These two administrators can sign in to Intune with only a password." },
      ],
      insight: "The policy is configured correctly, but doesn't protect two administrators. The cause is a migration exclusion that was left in place.",
      validationQuestion: "To confirm with the customer: is the migration group still in use, and were these roles assigned deliberately?",
    },
    {
      _type: "scopeSection",
      _key: "scope",
      heading: "What we examine",
      intro: "We read the configuration read-only and analyse the parts in context.",
      groups: [
        {
          _key: "g1",
          title: "Policies and assignment",
          items: ["All Conditional Access policies and their state", "Scope, assignments and target apps", "Users, groups and roles", "Include and exclude logic"],
        },
        {
          _key: "g2",
          title: "Conditions and controls",
          items: ["Authentication requirements and authentication strengths", "Named locations", "Device and compliance dependencies", "Session settings"],
        },
        {
          _key: "g3",
          title: "Preconditions",
          items: ["Emergency access accounts", "Administrator roles", "Relevant licences", "Overlapping and conflicting policies"],
        },
        {
          _key: "g4",
          title: "Outcome",
          items: ["Scenarios covered as intended", "Gaps between intended and configured protection", "Ambiguities that need confirmation"],
        },
      ],
    },
    {
      _type: "deliverablesSection",
      _key: "deliverables",
      heading: "What you receive",
      intro: "A report that is useful to both the engineer and management, and a meeting to go through it.",
      items: [
        { _key: "d1", title: "Management summary", body: "The key risks and decisions on two pages, without jargon." },
        { _key: "d2", title: "Technical analysis", body: "Every finding linked to the policies, groups and scenarios it concerns." },
        { _key: "d3", title: "Gaps and uncertainties", body: "What is established is kept apart from what you still need to confirm. No assumptions dressed up as fact." },
        { _key: "d4", title: "Prioritised recommendations", body: "For each recommendation the reason, the impact and a suggested order." },
        { _key: "d5", title: "Target state and next steps", body: "What your Conditional Access setup should look like, and the route towards it." },
        { _key: "d6", title: "Review of the findings", body: "A 90-minute session with your team to go through the outcomes and choices." },
      ],
      sampleReportCta: { label: "See what you receive", href: "#wat-je-ontvangt", event: "sample_report_clicked" },
    },
    {
      _type: "processSection",
      _key: "process",
      heading: "How the assessment runs",
      steps: [
        { _key: "s1", title: "Intake and scoping", body: "We discuss your environment, your goals and what you want to know. You receive a confirmation of the scope." },
        { _key: "s2", title: "Read-only collection", body: "With read permissions we export the configuration. We change nothing in your tenant." },
        { _key: "s3", title: "Analysis and context", body: "We reconstruct scenarios and put open questions to you. What is intended is not reported as a mistake." },
        { _key: "s4", title: "Reporting", body: "You receive the report with summary, analysis and prioritised recommendations." },
        { _key: "s5", title: "Review and correction round", body: "We go through the findings together. Factual corrections are handled in one correction round." },
      ],
    },
    {
      _type: "audienceSection",
      _key: "audience",
      heading: "Who it's for",
      audiences: [
        { _key: "a1", role: "Security engineers and Entra administrators", need: "A second pair of eyes that double-checks the logic between policies, with references to the exact configuration." },
        { _key: "a2", role: "IT managers, CISOs and security officers", need: "A substantiated answer to how access is protected, and which decisions are needed." },
        { _key: "a3", role: "MSPs and IT service providers", need: "An independent specialist review of a customer environment, without us taking over management." },
      ],
    },
    {
      _type: "boundariesSection",
      _key: "boundaries",
      heading: "Scope and limitations",
      intro: "Clear about what the assessment is and isn't, so you know what the outcome is worth.",
      included: [
        "Read-only analysis of the Conditional Access configuration and direct dependencies",
        "Scenario analysis based on the exported configuration",
        "Separation of established findings and hypotheses to confirm",
        "Recommendations and a proposed target state",
      ],
      excluded: [
        "A full security audit or penetration test",
        "Actually testing every sign-in route",
        "A guarantee that every risk will be found",
        "A certification or statement of compliance",
        "Making changes in your tenant",
      ],
      note: "The analysis is as good as the data we get access to. Where information is missing, we say so explicitly.",
    },
    {
      _type: "faqSection",
      _key: "faq",
      heading: "Frequently asked questions",
      items: [
        { _key: "f1", question: "Do you change anything in our tenant?", answer: "No. We work with read permissions only. You implement all recommendations yourself or with your managed service provider." },
        { _key: "f2", question: "Which permissions do you need?", answer: "Read access to Conditional Access, directory objects and the dependencies we analyse. During the intake we agree on the exact permissions and the way of working, including how and for how long data is kept." },
        { _key: "f3", question: "Is this a penetration test?", answer: "No. We analyse the configuration and reason per scenario. We don't carry out attacks and don't test every sign-in route in practice." },
        { _key: "f4", question: "We already have a managed service provider. Does this still fit?", answer: "Yes. The assessment is an independent second look and complements existing management. We don't take over management, and you can pick up the outcomes together with your provider." },
        { _key: "f5", question: "What if we have a lot of policies?", answer: "Then we agree on the scope together during the intake, so you know in advance what the assessment covers." },
        { _key: "f6", question: "How long does the assessment take?", answer: "That depends on the size and on how quickly open questions are answered. After the intake you receive a planning." },
      ],
    },
    {
      _type: "ctaSection",
      _key: "cta",
      heading: "Know how your access is *really protected*",
      body: "Tell us briefly about your environment and your question. You'll get a personal reply with a proposal for the intake.",
      primary: { label: "Request a Conditional Access Assessment", href: "/contact?onderwerp=conditional-access-assessment", event: "assessment_cta_clicked" },
      secondary: { label: "Book an intro call", href: "/contact?onderwerp=kennismaking", event: "scheduling_link_clicked" },
    },
  ],
};

const intuneAssessment: Solution = {
  _id: "solution.intune-assessment.en",
  slug: "intune-assessment",
  status: "published",
  category: "assessment",
  order: 2,
  badge: "New",
  title: "Intune Assessment",
  shortTitle: "Intune Assessment",
  question: "Does your Intune environment do what you think it does?",
  summary:
    "An independent, read-only review of your Microsoft Intune setup: policies, assignments, filters, compliance and updates, looked at together.",
  outcome: "You know which devices are really covered by your policies, where conflicts and gaps are and what to address first.",
  audienceSummary: "For Intune engineers and workplace administrators, and for the IT manager who wants to know whether the workplace does what was agreed.",
  heroIntro:
    "In Intune, groups, filters and exclusions decide which device gets which setting. A policy that looks right in the console can still miss hundreds of devices or clash with another policy. We read your setup read-only and show what really applies per device group.",
  primaryCta: { label: "Request an Intune Assessment", href: "/contact?onderwerp=intune-assessment", event: "assessment_cta_clicked" },
  secondaryCta: { label: "Book an intro call", href: "/contact?onderwerp=kennismaking", event: "scheduling_link_clicked" },
  serviceType: "Microsoft Intune assessment",
  relatedArticles: ["wat-vertelt-een-intune-compliance-percentage"],
  updatedAt: "2026-11-10",
  seo: {
    title: "Intune Assessment: an independent Intune review",
    description:
      "Independent, read-only Intune Assessment: we map which devices are really covered by your policies, where assignments, filters and compliance deviate and what to address first.",
  },
  sections: [
    {
      _type: "problemSection",
      _key: "problem",
      heading: "A policy in the console is not yet a managed device",
      intro: "Intune works in layers: policy, assignment, filter, group and device. Only when every layer is right does a device get what you intended.",
      points: [
        { _key: "p1", title: "Assignments and filters", body: "A filter on OS version, a dynamic group on an attribute that is no longer right or a forgotten exclusion. Devices drop out of sight without anyone noticing." },
        { _key: "p2", title: "Conflicts and duplication", body: "Several profiles controlling the same setting, old policies left in place next to new ones. The result differs per device." },
        { _key: "p3", title: "Compliance that measures nothing", body: "A compliance percentage says little if devices without an assigned policy count as compliant. Conditional Access does rely on it." },
      ],
    },
    {
      _type: "scopeSection",
      _key: "scope",
      heading: "What we examine",
      intro: "We read the setup read-only through the Microsoft Graph API.",
      groups: [
        { _key: "g1", title: "Configuration", items: ["Configuration profiles and settings catalog", "Endpoint security policies", "Conflicts and overlap between policies", "Outdated and unused policies"] },
        { _key: "g2", title: "Assignment", items: ["Groups, filters and exclusions", "Which devices really get what", "Devices without assigned policies"] },
        { _key: "g3", title: "Compliance and access", items: ["Compliance policies and tenant settings", "Relationship with Conditional Access", "Grace periods and stale check-ins"] },
        { _key: "g4", title: "Management", items: ["Updates and apps", "Enrollment and Autopilot", "Roles, scope tags and naming"] },
      ],
    },
    {
      _type: "deliverablesSection",
      _key: "deliverables",
      heading: "What you receive",
      items: [
        { _key: "d1", title: "Management summary", body: "The state of the workplace setup and the main choices, without jargon." },
        { _key: "d2", title: "Assignment analysis", body: "Per device group what really applies, and which devices fall outside the intended policies." },
        { _key: "d3", title: "Findings with evidence", body: "Every finding with a status: established, indication or cannot be determined." },
        { _key: "d4", title: "Prioritised improvement plan", body: "What first, what next, and which steps depend on each other." },
        { _key: "d5", title: "Review meeting", body: "A session with your team to go through the outcomes and choices." },
      ],
    },
    {
      _type: "processSection",
      _key: "process",
      heading: "How the assessment runs",
      steps: [
        { _key: "s1", title: "Intake and scoping", body: "We discuss your environment and agree on the scope together." },
        { _key: "s2", title: "Read-only collection", body: "With read permissions we export the Intune configuration. We change nothing." },
        { _key: "s3", title: "Analysis and context", body: "We connect policies, assignments and devices, and put open questions to you." },
        { _key: "s4", title: "Reporting", body: "Summary, substantiated findings and an improvement plan." },
        { _key: "s5", title: "Review and follow-up", body: "We go through the outcomes and decide on the next steps." },
      ],
    },
    {
      _type: "boundariesSection",
      _key: "boundaries",
      heading: "Scope and limitations",
      included: ["Read-only analysis of the Intune setup", "Relationship with Entra groups and Conditional Access where relevant", "Separation of facts and indications", "A prioritised improvement plan"],
      excluded: ["Making changes", "Investigation on individual devices", "A guarantee that all problems will be found", "A certification or compliance statement"],
    },
    {
      _type: "faqSection",
      _key: "faq",
      heading: "Frequently asked questions",
      items: [
        { _key: "f1", question: "How does this differ from the Microsoft 365 Health Check?", answer: "The Intune Assessment goes deep on the workplace: policies, assignments and compliance in Intune. The Health Check is broader and looks at identity, security and management across the whole Microsoft 365 environment." },
        { _key: "f2", question: "Do you change anything?", answer: "No. We work read-only. You implement improvements yourself, with your managed service provider, or with us as a separate engagement." },
        { _key: "f3", question: "Which platforms do you include?", answer: "We decide that in the intake. Windows is usually central; macOS, iOS and Android can be in scope." },
      ],
    },
    {
      _type: "ctaSection",
      _key: "cta",
      heading: "Know what your workplaces *really get*",
      body: "Tell us briefly about your environment. You'll receive a proposal for the intake.",
      primary: { label: "Request an Intune Assessment", href: "/contact?onderwerp=intune-assessment", event: "assessment_cta_clicked" },
      secondary: { label: "Book an intro call", href: "/contact?onderwerp=kennismaking", event: "scheduling_link_clicked" },
    },
  ],
};

const healthScan: Solution = {
  _id: "solution.microsoft-365-health-check.en",
  slug: "microsoft-365-health-check",
  status: "published",
  category: "assessment",
  order: 3,
  title: "Microsoft 365 Health Check",
  shortTitle: "Microsoft 365 Health Check",
  question: "How healthy is your Microsoft 365 environment, when you look at the parts together?",
  summary:
    "An independent review of identity, Intune, security and manageability, in which findings from different domains are connected to each other.",
  outcome: "You get a substantiated picture of the state of your environment and a prioritised improvement route.",
  audienceSummary: "For IT teams who want a second opinion and for management that has to choose where to invest.",
  heroIntro:
    "A health score of 78% says little about where to start. We look at Entra, Intune and security as one system: which deviations are connected, what the cause is, and what that means for users, security and management.",
  primaryCta: { label: "Request a Health Check", href: "/contact?onderwerp=microsoft-365-health-check", event: "assessment_cta_clicked" },
  secondaryCta: { label: "Book an intro call", href: "/contact?onderwerp=kennismaking", event: "scheduling_link_clicked" },
  serviceType: "Microsoft 365 tenant assessment",
  relatedArticles: ["wat-vertelt-een-intune-compliance-percentage"],
  updatedAt: "2026-11-10",
  seo: {
    title: "Microsoft 365 Health Check: tenant assessment",
    description:
      "Independent Microsoft 365 Health Check: Entra, Intune and security reviewed together, with causes instead of separate findings and a prioritised improvement plan.",
  },
  sections: [
    {
      _type: "problemSection",
      _key: "problem",
      heading: "Separate findings tell half the story",
      intro:
        "Every admin console has its own dashboards. They show what deviates in that one part. But the cause of a problem often sits in a different part from where it becomes visible.",
      points: [
        { _key: "p1", title: "Symptoms in one domain, causes in another", body: "A drop in compliance can come from a filter, a group rule or a changed OS version. The compliance dashboard only shows the percentage." },
        { _key: "p2", title: "Configurations drift unnoticed", body: "Temporary exceptions, copied policies and abandoned test assignments. Every change made sense at the time; together they form technical debt." },
        { _key: "p3", title: "A score is not a priority", body: "A hundred recommendations with the same urgency help nobody. What counts is which deviation affects access, security or management effort." },
      ],
    },
    {
      _type: "contrastSection",
      _key: "contrast",
      heading: "From observation to cause",
      intro: "The same data, reported in two ways.",
      ordinaryLabel: "A traditional assessment",
      ordinary: ["“These devices are not compliant.”", "Recommendation: investigate the devices.", "Severity: high, like 40 other findings."],
      contextualLabel: "The Health Check",
      contextual: [
        "“These devices appear to fall outside the intended compliance assignment, because their properties no longer match the configured filter.”",
        "Possible effect: access decisions that rely on compliance work differently than intended for these devices.",
        "Status: indication, to be confirmed with the sign-in data.",
      ],
    },
    {
      _type: "scopeSection",
      _key: "scope",
      heading: "What we review",
      intro: "We tailor the exact scope to your question. Possible components:",
      groups: [
        { _key: "g1", title: "Identity and access", items: ["Microsoft Entra configuration", "Protection of identities and access", "Administrator roles and privileges"] },
        { _key: "g2", title: "Devices", items: ["Microsoft Intune configuration", "Device management and compliance", "Inconsistencies in assignments and filters"] },
        { _key: "g3", title: "Security", items: ["Gaps in the security configuration", "Deviations from relevant baselines and guidance"] },
        { _key: "g4", title: "Management and governance", items: ["Configuration drift and technical debt", "Maintainability and naming", "Licences and optimisation, if in scope"] },
      ],
    },
    {
      _type: "deliverablesSection",
      _key: "deliverables",
      heading: "What you receive",
      intro: "Not a raw export, but a review you can act on.",
      items: [
        { _key: "d1", title: "Management summary", body: "The state of the environment, the biggest risks and the choices ahead." },
        { _key: "d2", title: "Cross-domain findings", body: "Findings that are connected, grouped by cause rather than by console." },
        { _key: "d3", title: "Evidence and certainty per finding", body: "Every finding states what it rests on and whether it is established or an indication." },
        { _key: "d4", title: "Prioritised improvement route", body: "What first, what next, and which steps depend on each other." },
        { _key: "d5", title: "Review meeting", body: "A session with your technical team and, if desired, management." },
      ],
    },
    {
      _type: "processSection",
      _key: "process",
      heading: "How the assessment runs",
      steps: [
        { _key: "s1", title: "Intake and scoping", body: "Together we decide which domains are in scope and which questions need answering." },
        { _key: "s2", title: "Read-only collection", body: "We collect configuration data with read permissions. Nothing is changed." },
        { _key: "s3", title: "Analysis and context", body: "We connect findings across domains and test them against your context: what was set up this way on purpose?" },
        { _key: "s4", title: "Reporting", body: "Summary, substantiated findings and a prioritised improvement route." },
        { _key: "s5", title: "Review and follow-up", body: "We go through the outcomes and discuss which steps you take yourself, with your provider or with us." },
      ],
    },
    {
      _type: "audienceSection",
      _key: "audience",
      heading: "Who it's for",
      audiences: [
        { _key: "a1", role: "Microsoft 365 administrators and Intune engineers", need: "A thorough second opinion that points out causes, with technical substantiation." },
        { _key: "a2", role: "IT managers, CTOs and CISOs", need: "Insight into where risk and management effort sit, and where investment pays off most." },
        { _key: "a3", role: "MSPs and IT service providers", need: "An independent specialist assessment for a customer, complementary to their own management." },
      ],
    },
    {
      _type: "boundariesSection",
      _key: "boundaries",
      heading: "Scope and limitations",
      included: [
        "Read-only review of the agreed domains",
        "Connections between findings in different domains",
        "Explicit separation of facts and indications",
        "A prioritised improvement route",
      ],
      excluded: [
        "A health score or automated checklist as the end product",
        "Continuous monitoring or day-to-day management (see Tenant continuity for periodic improvement)",
        "A guarantee that all problems will be found",
        "A certification or compliance statement",
        "Making changes",
      ],
      note: "Possible effects of a finding are not proven outcomes. We state what evidence there is and what still needs confirmation.",
    },
    {
      _type: "faqSection",
      _key: "faq",
      heading: "Frequently asked questions",
      items: [
        { _key: "f1", question: "Does this replace our management tools?", answer: "No. The Health Check is an independent review and complements the tools and platforms you already use. It doesn't replace them." },
        { _key: "f2", question: "Do we get a score?", answer: "No, no single number. A score hides exactly the connections we want to make visible. You get substantiated findings with a priority." },
        { _key: "f3", question: "How does it differ from the Conditional Access Assessment?", answer: "The Conditional Access Assessment goes deep on one topic: access security in Entra. The Health Check is broader and connects identity, devices, security and management." },
        { _key: "f4", question: "Do you change anything in our environment?", answer: "No. We work read-only. You implement improvements yourself or with your provider; if you wish, we can support that as a separate engagement." },
        { _key: "f5", question: "How long does it take?", answer: "That depends on the scope. After the intake you receive a planning." },
      ],
    },
    {
      _type: "ctaSection",
      _key: "cta",
      heading: "Let's discuss your *environment*",
      body: "Briefly describe your situation and your question. We'll propose a suitable scope.",
      primary: { label: "Request a Health Check", href: "/contact?onderwerp=microsoft-365-health-check", event: "assessment_cta_clicked" },
      secondary: { label: "Book an intro call", href: "/contact?onderwerp=kennismaking", event: "scheduling_link_clicked" },
    },
  ],
};

const continuity: Solution = {
  _id: "solution.tenant-continuiteit.en",
  slug: "tenant-continuiteit",
  status: "published",
  category: "service",
  order: 4,
  title: "Tenant continuity",
  shortTitle: "Tenant continuity",
  question: "Does your Microsoft 365 environment keep up, even after the project?",
  summary:
    "A continuous improvement cycle for Microsoft 365, Entra ID and Intune: measure periodically, update configurations, check again and embed. Every cycle takes your tenant a step further.",
  outcome: "An environment that stays current, demonstrably matures and where you know what has changed.",
  audienceSummary: "For organisations and MSPs who don't want their Microsoft 365 setup to age after delivery.",
  heroIntro:
    "After a project or assessment, the real work begins. Microsoft keeps changing features and recommendations, baselines get new versions, and temporary exceptions stay in place. With a fixed plan, do, check, act cycle we keep your configuration current and measure how far you've come every round.",
  primaryCta: { label: "Discuss an improvement cycle", href: "/contact?onderwerp=tenant-continuiteit", event: "assessment_cta_clicked" },
  secondaryCta: { label: "Book an intro call", href: "/contact?onderwerp=kennismaking", event: "scheduling_link_clicked" },
  serviceType: "Microsoft 365 continuous improvement and configuration maintenance",
  relatedArticles: ["wat-vertelt-een-intune-compliance-percentage"],
  updatedAt: "2026-11-10",
  seo: {
    title: "Tenant continuity for Microsoft 365",
    description:
      "Continuous improvement of your Microsoft 365, Entra and Intune environment following plan, do, check, act: periodic updates, follow-up scans with a delta and a growing maturity level.",
  },
  sections: [
    {
      _type: "problemSection",
      _key: "problem",
      heading: "A good setup ages by itself",
      intro: "Not because anyone does something wrong, but because everything around the configuration keeps moving.",
      points: [
        { _key: "p1", title: "Microsoft doesn't stand still", body: "New settings, changed defaults and retired features. What was recommended last year may not be anymore." },
        { _key: "p2", title: "Temporary becomes permanent", body: "Exceptions for a migration, a test assignment, a quick fix for one department. Without a fixed moment to revisit them, they pile up." },
        { _key: "p3", title: "No measurement, no progress", body: "If you don't measure periodically, you don't know whether the environment is getting better, staying the same or slowly sliding." },
      ],
    },
    {
      _type: "cycleSection",
      _key: "cycle",
      heading: "The improvement cycle",
      intro: "Insight and analysis, (auto)remediation, monitoring and documentation, in a fixed rhythm following plan, do, check, act. We agree on the rhythm together.",
      centerLabel: "Tenant\nmaturity",
      steps: [
        {
          _key: "plan",
          letter: "P",
          title: "Insight & analysis",
          subtitle: "Plan",
          body: "We read out the environment through the Microsoft Graph API and connect the parts: what is configured, who is in scope, what it does together, and why. The scans are the measuring instrument here.",
          points: ["Scans as baseline and follow-up measurement", "Connections and causes, not just findings", "Maturity per layer and per domain", "Prioritised improvement route"],
        },
        {
          _key: "do",
          letter: "D",
          title: "(Auto)remediation",
          subtitle: "Do",
          body: "We fix deviations with automation: configuration as code, rolled out in phases and approved in advance. Where it is responsible to do so, remediation happens automatically.",
          points: ["Configuration as code with Graph and PowerShell", "Phased roll-out in rings", "Repeatable across multiple tenants", "Automatic remediation where responsible"],
        },
        {
          _key: "check",
          letter: "C",
          title: "Monitoring",
          subtitle: "Check",
          body: "We monitor whether reality keeps matching the agreed standard, and re-measure periodically.",
          points: ["Configuration drift and desired state", "Backup and comparison of configuration", "Follow-up scan with delta", "Signals from compliance and sign-in data"],
        },
        {
          _key: "act",
          letter: "A",
          title: "Documentation",
          subtitle: "Act",
          body: "What works becomes the standard and is recorded. That makes your environment explainable, transferable and demonstrable.",
          points: ["Design and operational documentation", "Decision log with rationale", "Change history", "Reporting for team and management"],
        },
      ],
    },
    {
      _type: "deliverablesSection",
      _key: "deliverables",
      heading: "What you receive each cycle",
      items: [
        { _key: "d1", title: "Measurement with delta", body: "The state of your environment per domain, compared with the previous measurement." },
        { _key: "d2", title: "Implemented improvements", body: "Updated configurations and baselines, with an overview of what changed and why." },
        { _key: "d3", title: "Drift overview", body: "What has moved outside the agreed standard since the previous cycle, and what was done about it." },
        { _key: "d4", title: "Updated roadmap", body: "The priorities for the next cycle, including relevant changes from Microsoft." },
        { _key: "d5", title: "Maturity overview", body: "How the maturity level develops across cycles, readable for management." },
        { _key: "d6", title: "Review meeting", body: "A fixed meeting per cycle to go through results and decisions." },
      ],
    },
    {
      _type: "audienceSection",
      _key: "audience",
      heading: "Who it's for",
      audiences: [
        { _key: "a1", role: "Organisations with their own IT team", need: "Specialist capacity to keep the Microsoft 365 setup current, alongside day-to-day work." },
        { _key: "a2", role: "IT managers and CISOs", need: "Demonstrable progress: what has improved, what is still open and where the risks are." },
        { _key: "a3", role: "MSPs and IT service providers", need: "A repeatable, automated improvement approach across multiple customer tenants." },
      ],
    },
    {
      _type: "boundariesSection",
      _key: "boundaries",
      heading: "Scope and agreements",
      included: [
        "Periodic scans and comparison with the previous measurement",
        "Updating configurations and baselines within the agreed domains",
        "Changes through an agreed change process, approved in advance",
        "Reporting and a review meeting per cycle",
      ],
      excluded: [
        "Day-to-day management, service desk or 24/7 monitoring",
        "Changes without approval",
        "A guarantee that no more incidents will occur",
        "A certification or compliance statement",
      ],
      note: "We only make changes with the permissions and approval agreed in advance. The scans themselves remain read-only.",
    },
    {
      _type: "faqSection",
      _key: "faq",
      heading: "Frequently asked questions",
      items: [
        { _key: "f1", question: "Do we need an assessment first?", answer: "It is the most logical start: the first scan is your baseline. If you already have a recent measurement, we can build on that." },
        { _key: "f2", question: "Is this the same as managed services?", answer: "No. Day-to-day management and the service desk stay with your own team or provider. We make sure, in fixed cycles, that the setup stays current and improves." },
        { _key: "f3", question: "How often does a cycle run?", answer: "We tailor that to your environment. A quarterly rhythm often works well, but it can be more or less frequent." },
        { _key: "f4", question: "How are changes implemented?", answer: "Following the change process we agree in advance: with approval, in phases and where possible automated and recorded as code, so every change can be traced and rolled back." },
      ],
    },
    {
      _type: "ctaSection",
      _key: "cta",
      heading: "Let your environment get *better every cycle*",
      body: "Tell us where you are now. We'll propose a suitable start and rhythm.",
      primary: { label: "Discuss an improvement cycle", href: "/contact?onderwerp=tenant-continuiteit", event: "assessment_cta_clicked" },
      secondary: { label: "Book an intro call", href: "/contact?onderwerp=kennismaking", event: "scheduling_link_clicked" },
    },
  ],
};

export const solutions: Solution[] = [caAssessment, intuneAssessment, healthScan, continuity];
