import type { SiteSettings, SolutionCategoryDoc } from "../types";

/**
 * Verified facts only. Sources (checked 1 Nov 2026):
 * - yellowblocks.nl: phone, KvK, BTW, GitHub/LinkedIn/X links
 * - rozemuller.com and rozemuller.com/about: Microsoft MVP banner, WP Ninjas NL crew,
 *   Az.Avd PowerShell module, Intune CLI, IntuneAssistant, blog topics, recent articles
 * Items still requiring approval are listed in docs/approval-checklist.md.
 */
export const siteSettings: SiteSettings = {
  name: "YellowBlocks",
  legalName: "YellowBlocks",
  tagline: "Stay in control",
  description:
    "YellowBlocks onderzoekt Microsoft 365-, Intune- en Conditional Access-omgevingen in samenhang: wat er is ingesteld, waarom, en wat dat in de praktijk betekent.",
  phone: "+31 6 55 108 372",
  phoneHref: "tel:+31655108372",
  kvk: "93533985",
  vat: "NL005026448B28",
  social: [
    { label: "LinkedIn", href: "https://linkedin.com/in/sanderrozemuller" },
    { label: "GitHub", href: "https://github.com/srozemuller" },
    { label: "Blog", href: "https://rozemuller.com" },
  ],
  founder: {
    name: "Sander Rozemuller",
    photo: "/brand/sander-rozemuller.jpg",
    role: "oprichter",
    bio: [
      "Sander werkt dagelijks met Microsoft Intune, Microsoft Entra, Microsoft 365 en de Microsoft Graph API. Zijn achtergrond ligt in engineering en automatisering: omgevingen begrijpen door ze uit te lezen, niet door aannames.",
      "Op rozemuller.com schrijft hij al jaren over Intune, identity, Azure Virtual Desktop, monitoring en automatisering. Hij bouwde Intune Assistant, een communityplatform voor Intune-beheerders, en is crewlid van de Workplace Ninja User Group Netherlands.",
      "YellowBlocks bundelt die ervaring in een vaste, herhaalbare werkwijze: technische bevindingen verbinden tot inzichten waarop een organisatie kan besluiten.",
    ],
    facts: [
      { label: "Microsoft MVP", href: "https://rozemuller.com" },
      { label: "Maker van Intune Assistant", href: "https://intuneassistant.cloud" },
      { label: "Crewlid Workplace Ninja User Group NL", href: "https://www.meetup.com/wpninjasnl/" },
      { label: "Auteur van de Az.Avd PowerShell-module", href: "https://www.powershellgallery.com/packages/Az.Avd" },
    ],
    blogUrl: "https://rozemuller.com",
    linkedIn: "https://linkedin.com/in/sanderrozemuller",
    github: "https://github.com/srozemuller",
  },
  externalWriting: [
    {
      title: "Why does this Intune device have no compliance policy assigned",
      url: "https://rozemuller.com/why-does-this-intune-device-have-no-compliance-policy-assigned/",
      publishedAt: "2026-08-26",
    },
    {
      title: "Don't let Multi Admin Approval break your Intune automation",
      url: "https://rozemuller.com/avoid-automation-breaks-with-intune-multi-admin-approval/",
      publishedAt: "2026-06-26",
    },
    {
      title: "Monitoring compliance policy desired state in Intune with Unified Tenant Configuration Management",
      url: "https://rozemuller.com/use-utcm-to-monitor-intune-compliance-policy-desired-state/",
      publishedAt: "2026-01-28",
    },
  ],
};

export const solutionCategories: SolutionCategoryDoc[] = [
  {
    slug: "assessment",
    title: "Assessments",
    description: "Afgebakende, read-only onderzoeken met een rapport en een besproken verbeterplan.",
    order: 1,
  },
  {
    slug: "product",
    title: "Producten",
    description: "Software en tooling die beheerders zelf gebruiken.",
    order: 2,
  },
  {
    slug: "service",
    title: "Specialistische diensten",
    description: "Doorlopende verbetering en specialistische ondersteuning, vaak als vervolg op een assessment.",
    order: 3,
  },
];
