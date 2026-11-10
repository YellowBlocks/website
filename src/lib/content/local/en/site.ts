import type { SiteSettings, SolutionCategoryDoc } from "../../types";
import { siteSettings as nl } from "../site";

/** English site settings. Facts, links and numbers are shared with the Dutch seed. */
export const siteSettings: SiteSettings = {
  ...nl,
  description:
    "YellowBlocks reviews Microsoft 365, Intune and Conditional Access environments as a whole: what is configured, why, and what that means in practice.",
  founder: {
    ...nl.founder,
    role: "founder",
    bio: [
      "Sander works with Microsoft Intune, Microsoft Entra, Microsoft 365 and the Microsoft Graph API every day. His background is in engineering and automation: understanding environments by reading them out, not by assumption.",
      "On rozemuller.com he has written for years about Intune, identity, Azure Virtual Desktop, monitoring and automation. He built Intune Assistant, a community platform for Intune administrators, and is a crew member of the Workplace Ninja User Group Netherlands.",
      "YellowBlocks brings that experience together in a fixed, repeatable method: connecting technical findings into insights an organisation can act on.",
    ],
    facts: [
      { label: "Microsoft MVP", href: "https://rozemuller.com" },
      { label: "Creator of Intune Assistant", href: "https://intuneassistant.cloud" },
      { label: "Crew member, Workplace Ninja User Group NL", href: "https://www.meetup.com/wpninjasnl/" },
      { label: "Author of the Az.Avd PowerShell module", href: "https://www.powershellgallery.com/packages/Az.Avd" },
    ],
  },
};

export const solutionCategories: SolutionCategoryDoc[] = [
  {
    slug: "assessment",
    title: "Assessments",
    description: "Scoped, read-only reviews with a report and a discussed improvement plan.",
    order: 1,
  },
  {
    slug: "product",
    title: "Products",
    description: "Software and tooling that administrators use themselves.",
    order: 2,
  },
  {
    slug: "service",
    title: "Specialist services",
    description: "Continuous improvement and specialist support, often as a follow-up to an assessment.",
    order: 3,
  },
];
