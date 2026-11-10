import type { Page } from "../../types";
import { pt } from "../pt";

/*
 * English pages. Internal links use the Dutch internal paths ("/oplossingen/...");
 * the Link component turns them into English public URLs ("/en/solutions/...").
 */

const home: Page = {
  _id: "page.home.en",
  slug: "home",
  title: "Home",
  updatedAt: "2026-11-10",
  seo: {
    title: "YellowBlocks – Stay in control",
    description:
      "YellowBlocks helps organisations stay in control of Microsoft 365, identity and modern work, with consultancy and fixed services: Conditional Access Assessment, Intune Assessment and Microsoft 365 Health Check.",
  },
  hero: {
    heading: "Stay *in control.*",
    intro:
      "YellowBlocks helps organisations keep a grip on Microsoft 365, identity and modern work. With consultancy for design, implementation and automation, and with fixed services that review your environment independently.",
    primaryCta: { label: "Explore our services", href: "#diensten" },
    secondaryCta: { label: "Book an intro call", href: "/contact?onderwerp=kennismaking", event: "scheduling_link_clicked" },
    stack: {
      layers: ["Configured", "Assigned", "Effective", "Current", "Demonstrable"],
      topLabel: "In control",
      caption: "Illustrative: the higher the layer, the more often there is a gap.",
    },
  },
  sections: [
    {
      _type: "pillarsSection",
      _key: "pillars",
      heading: "What YellowBlocks *does*",
      intro: "Two ways to work with us, with the same goal: a Microsoft environment that does what it is meant to do, and keeps doing it.",
      pillars: [
        {
          _key: "consultancy",
          title: "Consultancy",
          lead: "Specialist knowledge, exactly where you need it.",
          body: "Advice, design and delivery in Microsoft 365, Entra ID and Intune. Alongside your own team or managed service provider, for a project or on an ongoing basis.",
          points: [
            "Design and implementation of identity, Conditional Access and Intune",
            "Automation and (auto)remediation with Microsoft Graph and PowerShell",
            "Monitoring and continuity: periodic updates and re-measurement",
            "Documentation: design, operational documentation and decisions",
          ],
          cta: { label: "Discuss your challenge", href: "/contact?onderwerp=kennismaking", event: "contact_cta_clicked" },
        },
        {
          _key: "diensten",
          title: "Services",
          lead: "Fixed assessments with a fixed method.",
          body: "Scoped, read-only reviews with a scope agreed in advance. You receive a substantiated report and a prioritised improvement plan.",
          points: ["Conditional Access Assessment", "Intune Assessment", "Microsoft 365 Health Check"],
          cta: { label: "View the services", href: "#diensten", event: "assessment_cta_clicked" },
        },
      ],
    },
    {
      _type: "solutionsSection",
      _key: "services",
      heading: "Our *services*",
      intro: "Independent, read-only and with a fixed method. Choose depth on one topic, or breadth across your whole environment.",
      category: "assessment",
    },
    {
      _type: "layersSection",
      _key: "layers",
      heading: "Configured is not the same as *in control*",
      intro:
        "Being in control takes more than having a setting. A setting is only the bottom layer. Whether your environment is truly under control depends on everything stacked on top of it. Most overviews stop at layer one; the surprises are in the layers above.",
      topLabel: "In control",
      note: "All five layers in order, in every domain, and in a way that lasts. That is what we work towards.",
      layers: [
        { _key: "l1", name: "Configured", question: "Does the configuration exist?", body: "The policy, baseline or setting has been created. This is where most dashboards and reports stop.", capabilities: ["Insight"] },
        { _key: "l2", name: "Assigned", question: "Does it reach the right users and devices?", body: "Groups, filters and exclusions decide who is really in scope. One outdated filter can silently put hundreds of devices outside the assignment.", capabilities: ["Insight", "Analysis"] },
        { _key: "l3", name: "Effective", question: "Does it work together as intended?", body: "Conditional Access relies on compliance, compliance on assignment, assignment on attributes. Only by looking at them together can you see whether protection really holds.", capabilities: ["Analysis"] },
        { _key: "l4", name: "Current", question: "Is it still right today?", body: "Microsoft changes continuously, temporary exceptions stay in place and configurations drift. What was right at delivery need not be right now.", capabilities: ["Monitoring", "(Auto)remediation"] },
        { _key: "l5", name: "Demonstrable", question: "Can you explain and prove it?", body: "Design, decisions and changes are recorded. So operations, audits and follow-up don't depend on one person's memory.", capabilities: ["Documentation"] },
      ],
    },
    {
      _type: "cycleSection",
      _key: "cycle",
      heading: "How we keep you *in control*",
      intro:
        "Whether it is consultancy or one of our services, we follow the same improvement cycle. Plan, do, check, act. Every round takes your environment one layer further.",
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
      note: "You can start at any point: with an assessment, with one specific question or with the full cycle.",
      cta: { label: "View Tenant continuity", href: "/oplossingen/tenant-continuiteit", event: "assessment_cta_clicked" },
    },
    {
      _type: "founderSection",
      _key: "founder",
      heading: "Engineering-driven, *from practice*",
    },
    {
      _type: "insightsSection",
      _key: "insights",
      heading: "Insights",
      intro: "Technical background on the questions we come across in environments.",
      limit: 3,
    },
    {
      _type: "faqSection",
      _key: "faq",
      heading: "Frequently asked questions",
      items: [
        { _key: "f1", question: "What is the difference between consultancy and your services?", answer: "The services are fixed assessments with a fixed method and a scope agreed in advance. Consultancy is tailored: advice, design, implementation or automation for your specific challenge." },
        { _key: "f2", question: "Which assessment suits us?", answer: "If your question is about access and identity, choose the Conditional Access Assessment. If it is about your workplaces and Intune, choose the Intune Assessment. If you want a broad picture of your whole Microsoft 365 environment, choose the Microsoft 365 Health Check." },
        { _key: "f3", question: "Do you take over day-to-day management?", answer: "No, no day-to-day management or service desk. We work alongside your own team or managed service provider, with advice, improvements and periodic cycles." },
        { _key: "f4", question: "Do you need write permissions?", answer: "Not for the assessments: they are read-only. For consultancy engagements we agree in advance which permissions are needed and how changes are approved." },
      ],
    },
    {
      _type: "ctaSection",
      _key: "cta",
      heading: "Let's discuss your *environment*",
      body: "Tell us what you're running into or what you want to achieve. We'll think along about a suitable approach, even if the answer is that you don't need us.",
      primary: { label: "Book an intro call", href: "/contact?onderwerp=kennismaking", event: "scheduling_link_clicked" },
      secondary: { label: "View the assessments", href: "/oplossingen", event: "assessment_cta_clicked" },
    },
  ],
};

const methodology: Page = {
  _id: "page.werkwijze.en",
  slug: "werkwijze",
  title: "A fixed method, *from read-out to decision*",
  intro:
    "Every assessment follows the same route: collect read-only data, analyse findings in context, test them against your situation and translate them into an improvement plan. That makes the outcome repeatable and verifiable.",
  updatedAt: "2026-11-10",
  seo: {
    title: "Approach: independent, read-only, substantiated",
    description:
      "How YellowBlocks reviews Microsoft 365 environments: read-only data collection, connecting findings, separating facts from indications, and translating them into a prioritised plan.",
  },
  sections: [
    {
      _type: "approachSection",
      _key: "approach",
      heading: "Three lines of enquiry",
      intro: "A finding is only useful when you know what is there, why it is that way and how it relates to good practice.",
      dimensions: [
        { _key: "d1", title: "Reality", question: "What is actually configured and observed?", body: "Configurations, assignments, filters, exclusions and group memberships, read out through the Microsoft Graph API and admin portals." },
        { _key: "d2", title: "Context", question: "Why was it set up this way?", body: "Organisation, licences, earlier choices and exceptions. What is deliberate we treat as a decision, not as a mistake." },
        { _key: "d3", title: "Knowledge", question: "How does it compare to guidance?", body: "Microsoft documentation, independent expertise and control frameworks, weighted by what is relevant in your situation." },
      ],
    },
    {
      _type: "richTextSection",
      _key: "evidence",
      heading: "Evidence over assumptions",
      body: pt(`
Every finding in a report gets a status. That way you can see at a glance how solid a conclusion is.

- **Established.** Directly demonstrable in the configuration or the data.
- **Indication.** Follows logically from the data, but needs confirmation, for example from sign-in logs or from an administrator.
- **Cannot be determined.** The available data is insufficient. We state which information is needed.

We present possible consequences of a finding as possible, not as proven. An honest open question beats a firm conclusion that turns out to be wrong.
`),
    },
    {
      _type: "exampleInsightSection",
      _key: "example",
      heading: "From observation to cause",
      intro: "A fictional example with synthetic data, as it would appear in a report.",
      observationSource: "What a dashboard shows",
      observation: "15% of Windows devices (312 of 2,080) are not compliant.",
      chain: [
        { _key: "c1", kind: "fact", label: "Shared property", detail: "All 312 devices run Windows 11 build 10.0.26100." },
        { _key: "c2", kind: "fact", label: "Assignment", detail: "The compliance policy is assigned with a filter on osVersion 10.0.22*. Build 26100 falls outside it." },
        { _key: "c3", kind: "hypothesis", label: "Context", detail: "The devices appear to have been upgraded to 24H2 in June; the filter was not updated afterwards." },
        { _key: "c4", kind: "effect", label: "Consequence", detail: "Conditional Access policies that require a compliant device evaluate these devices differently than intended." },
      ],
      insight: "Not 312 separate problems, but one assignment filter that did not follow the Windows upgrade.",
      validationQuestion: "To confirm with the customer: was the upgrade planned, and should the filter exclude versions or not?",
    },
    {
      _type: "processSection",
      _key: "process",
      heading: "How it runs",
      steps: [
        { _key: "s1", title: "Scope and intake", body: "Goal, questions, domains and preconditions. You receive a confirmation of scope and planning." },
        { _key: "s2", title: "Read-only collection", body: "With read permissions we collect the configuration. Agreements on access, storage and deletion of data are recorded in advance." },
        { _key: "s3", title: "Analysis and context", body: "We reconstruct connections and scenarios, and put open questions to you before anything is recorded as a finding." },
        { _key: "s4", title: "Prioritised report", body: "Management summary, technical substantiation, a status per finding and an improvement route in a logical order." },
        { _key: "s5", title: "Review and follow-up", body: "We go through the outcomes with the people who decide on them and who carry them out." },
      ],
    },
    {
      _type: "richTextSection",
      _key: "what-it-is",
      heading: "What an assessment is, and what it isn't",
      body: pt(`
It helps to keep the terms sharp.

- **Assessment.** A scoped, independent review at a point in time, with a report and a review meeting. This is what YellowBlocks offers.
- **Advice and guidance.** Help with implementing improvements. Possible as a separate engagement after an assessment.
- **Software and tooling.** A product you use yourself. An assessment is not a tool you install.
- **Continuity and monitoring.** Ongoing upkeep and improvement of your environment in fixed cycles. The assessment is the measuring moment; [Tenant continuity](/oplossingen/tenant-continuiteit) is the cycle around it.

We work alongside existing management tools, MSPs and platforms. We don't replace them and don't take over day-to-day management.
`),
    },
    {
      _type: "ctaSection",
      _key: "cta",
      heading: "Curious how this works out for *your environment?*",
      body: "In an intro call we discuss your question and which approach fits.",
      primary: { label: "Book an intro call", href: "/contact?onderwerp=kennismaking", event: "scheduling_link_clicked" },
      secondary: { label: "View the assessments", href: "/oplossingen", event: "assessment_cta_clicked" },
    },
  ],
};

const about: Page = {
  _id: "page.over-ons.en",
  slug: "over-ons",
  title: "A specialist in Microsoft environments, *with a method*",
  intro:
    "YellowBlocks is a Dutch technology company specialising in Microsoft cloud, modern workplace, security and automation. We help organisations understand what their configuration really does.",
  updatedAt: "2026-11-10",
  seo: {
    title: "About YellowBlocks and Sander Rozemuller",
    description:
      "YellowBlocks was founded by Sander Rozemuller, specialist in Microsoft Intune, Entra, Microsoft 365 and the Graph API, and creator of Intune Assistant.",
  },
  sections: [
    {
      _type: "richTextSection",
      _key: "why",
      heading: "Why YellowBlocks",
      body: pt(`
Microsoft 365 environments keep getting more complex, and the number of dashboards, scores and recommendations grows with them. What is often missing is not more information, but coherence: which findings belong together, what is the cause, and what should you do first.

YellowBlocks was founded to make that translation. Not with yet another dashboard, but with a fixed method that turns technical complexity into clear, substantiated insights.

The name says it: separate blocks, which only gain meaning once you see how they fit together.
`),
    },
    {
      _type: "founderSection",
      _key: "founder",
      heading: "The founder",
    },
    {
      _type: "richTextSection",
      _key: "philosophy",
      heading: "How we work",
      body: pt(`
- **Read, don't assume.** We base conclusions on the configuration as it is, collected through the Microsoft Graph API.
- **Independent.** We don't sell licences and don't take over management. Our advice doesn't depend on what is sold afterwards.
- **Honest about certainty.** We separate facts from indications and state what we cannot determine.
- **Repeatable.** The same method for every environment, so outcomes are comparable and verifiable.
- **Complementary.** We work alongside your own team, your MSP and the tools you use, such as management platforms for multi-tenant environments.
`),
    },
    {
      _type: "ctaSection",
      _key: "cta",
      heading: "*Get acquainted?*",
      body: "A conversation about your environment and your question, with no obligations.",
      primary: { label: "Book an intro call", href: "/contact?onderwerp=kennismaking", event: "scheduling_link_clicked" },
    },
  ],
};

const LEGAL_NOTE =
  "Draft text. This is a courtesy translation; the Dutch version is leading. Have this page legally reviewed before the site goes live.";

const privacy: Page = {
  _id: "page.privacy.en",
  slug: "privacy",
  title: "Privacy statement",
  intro: LEGAL_NOTE,
  updatedAt: "2026-11-10",
  seo: { title: "Privacy statement", description: "How YellowBlocks handles personal data processed through this website." },
  sections: [
    {
      _type: "richTextSection",
      _key: "body",
      heading: "Personal data on this website",
      body: pt(`
YellowBlocks (Dutch Chamber of Commerce 93533985) is responsible for processing personal data through this website.

## Contact form

When you fill in the contact form, we process your name, work email address, company name, the topic and your message. We only use this data to answer your question and to arrange any follow-up. Legal basis: your request for contact (pre-contractual measures) and our legitimate interest in responding to questions.

The form is delivered by email through a transactional email service. **[To complete: name of the service, country of establishment and transfer basis.]**

We keep contact requests no longer than necessary, and at most **[to complete: period]** after the last contact, unless an engagement follows.

## Customer data from assessments

We don't collect configuration or environment data through the website. Data for an assessment is only processed within an engagement, based on agreements made in advance and a data processing agreement where required.

## Website statistics

**[To complete based on the chosen analytics configuration.]** Analytics cookies are only set after consent. See the [cookie statement](/cookies).

## Hosting and log files

The website is hosted by **[to complete: hosting provider]**. Technical data such as IP addresses is processed temporarily for security and to prevent abuse.

## Your rights

You can ask us for access to, correction or deletion of your data, and object to its processing. Contact us through the [contact form](/contact). You also have the right to lodge a complaint with the Dutch Data Protection Authority (Autoriteit Persoonsgegevens).
`),
    },
  ],
};

const cookies: Page = {
  _id: "page.cookies.en",
  slug: "cookies",
  title: "Cookie statement",
  intro: LEGAL_NOTE,
  updatedAt: "2026-11-10",
  seo: { title: "Cookie statement", description: "Which cookies yellowblocks.nl uses and how to manage your preferences." },
  sections: [
    {
      _type: "richTextSection",
      _key: "body",
      heading: "Which cookies we use",
      body: pt(`
## Functional cookies

- \`yb_consent\` remembers your choice about analytics cookies, for up to 180 days. Only present when analytics cookies are enabled on this site.
- \`__prerender_bypass\` is only set for editors viewing draft content.

## Analytics cookies

We only set analytics cookies after your consent. If you decline, nothing is loaded. You can change your choice at any time through "Cookie settings" at the bottom of every page.

**[To complete based on the chosen analytics configuration: service, cookie names and retention periods.]**

## No marketing cookies

This website does not use third-party advertising or tracking cookies.
`),
    },
  ],
};

const terms: Page = {
  _id: "page.voorwaarden.en",
  slug: "voorwaarden",
  title: "Terms and legal information",
  intro: LEGAL_NOTE,
  updatedAt: "2026-11-10",
  seo: { title: "Terms and legal information", description: "Company details of YellowBlocks and the terms that apply to engagements." },
  sections: [
    {
      _type: "richTextSection",
      _key: "body",
      heading: "Company details",
      body: pt(`
- Trade name: YellowBlocks
- Chamber of Commerce (KvK): 93533985
- VAT number: NL005026448B28
- Phone: +31 6 55 108 372
- Business address: **[to complete]**

## Engagements

Engagements are subject to the terms sent with the quotation. **[To complete: reference to or text of the general terms and conditions.]**

## Content of this website

The information on this website has been compiled with care, but is general in nature and not advice for a specific situation. Examples of findings are illustrative and based on fictional data.
`),
    },
  ],
};

export const pages: Page[] = [home, methodology, about, privacy, cookies, terms];
