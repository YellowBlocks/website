import type { Solution } from "../types";

/**
 * Seed content for the two launch offerings. In production these documents live
 * in Sanity (type "solution"); this file is the fallback and the import source.
 */

const caAssessment: Solution = {
  _id: "solution.conditional-access-assessment",
  slug: "conditional-access-assessment",
  status: "published",
  category: "assessment",
  order: 1,
  title: "Conditional Access Assessment",
  shortTitle: "Conditional Access Assessment",
  question: "Bieden je Conditional Access-policies echt de bescherming die je verwacht?",
  summary:
    "Een onafhankelijk, read-only onderzoek naar hoe je Conditional Access-policies samenwerken: toewijzingen, uitzonderingen, afhankelijkheden en de gaten daartussen.",
  outcome: "Je weet welke toegangsscenario's afgedekt zijn, waar twijfel zit en wat je eerst aanpakt.",
  audienceSummary: "Voor security engineers, Entra-beheerders en de IT-manager of CISO die moet kunnen uitleggen hoe toegang beschermd is.",
  heroIntro:
    "Policies hebben is iets anders dan beschermd zijn. Een uitsluiting voor één groep, een named location die te ruim is of een device-voorwaarde die op een verouderd compliance-signaal leunt: elk detail kan een scenario openzetten dat niemand bedoeld heeft. Wij reconstrueren wat je policies samen doen, per scenario.",
  primaryCta: { label: "Vraag een Conditional Access Assessment aan", href: "/contact?onderwerp=conditional-access-assessment", event: "assessment_cta_clicked" },
  secondaryCta: { label: "Plan een kennismaking", href: "/contact?onderwerp=kennismaking", event: "scheduling_link_clicked" },
  serviceType: "Microsoft Entra Conditional Access assessment",
  relatedArticles: ["verborgen-risicos-conditional-access-exclusions", "conditional-access-verwachte-bescherming"],
  updatedAt: "2026-11-01",
  seo: {
    title: "Conditional Access Assessment voor Microsoft Entra",
    description:
      "Onafhankelijke, read-only Conditional Access Assessment: we brengen in kaart hoe je Entra-policies samenwerken, waar uitzonderingen gaten openen en wat je eerst aanpakt.",
  },
  sections: [
    {
      _type: "problemSection",
      _key: "problem",
      heading: "Waarom een werkende configuratie nog geen zekerheid geeft",
      intro:
        "Conditional Access beslist bij elke aanmelding opnieuw, op basis van alle policies die van toepassing zijn. De bescherming zit dus niet in één policy, maar in de optelsom. Juist daar ontstaan de verrassingen.",
      points: [
        {
          _key: "p1",
          title: "Uitzonderingen stapelen zich op",
          body: "Een groep die ooit tijdelijk is uitgesloten voor een migratie, een serviceaccount dat MFA niet aankan. Elke uitzondering is verdedigbaar; samen kunnen ze een route vormen die niemand meer overziet.",
        },
        {
          _key: "p2",
          title: "Policies leunen op signalen van elders",
          body: "Een eis als 'apparaat moet compliant zijn' is zo sterk als de compliance-toewijzing in Intune. Valt een apparaat buiten die toewijzing, dan klopt het signaal waar Conditional Access op vertrouwt niet meer.",
        },
        {
          _key: "p3",
          title: "Rapportages tellen policies, geen scenario's",
          body: "Een overzicht laat zien dat er twintig policies aanstaan. Het vertelt niet of een beheerder op een onbeheerd apparaat vanaf een onbekende locatie bij de beheerportalen kan.",
        },
      ],
    },
    {
      _type: "contrastSection",
      _key: "contrast",
      heading: "Wat een gewone configuratiereview mist",
      intro:
        "De meeste reviews lopen policies één voor één langs en vergelijken instellingen met een baseline. Dat is nuttig, maar het beantwoordt niet de vraag die er werkelijk toe doet.",
      ordinaryLabel: "Een policy-voor-policy review",
      ordinary: [
        "Controleert of MFA in een policy aanstaat",
        "Meldt dat er uitzonderingen bestaan",
        "Vergelijkt instellingen met een lijst aanbevelingen",
        "Levert een lijst losse bevindingen op",
      ],
      contextualLabel: "Het Conditional Access Assessment",
      contextual: [
        "Bepaalt per scenario welke combinatie van policies werkelijk geldt",
        "Volgt elke uitzondering tot de accounts en apparaten die erdoor vallen",
        "Toetst of afhankelijkheden zoals compliance en named locations het verwachte signaal leveren",
        "Onderscheidt vastgestelde gaten van vragen die jij moet bevestigen",
      ],
    },
    {
      _type: "exampleInsightSection",
      _key: "example",
      heading: "Zo ziet een bevinding eruit",
      intro: "Een fictief, maar technisch realistisch voorbeeld met synthetische gegevens.",
      observation: "Policy 'CA012 – Require MFA for admins' staat aan en is van toepassing op alle beheerdersrollen.",
      observationSource: "Wat een standaardcontrole rapporteert",
      chain: [
        { _key: "c1", kind: "fact", label: "Uitsluiting", detail: "De groep 'GRP-Migratie-2024' is uitgesloten van CA012." },
        { _key: "c2", kind: "fact", label: "Lidmaatschap", detail: "Twee accounts in die groep hebben nog de rol Intune Administrator." },
        { _key: "c3", kind: "fact", label: "Andere policies", detail: "Geen andere policy vereist MFA voor deze accounts bij de beheerportalen." },
        { _key: "c4", kind: "effect", label: "Gevolg", detail: "Deze twee beheerders kunnen zich met alleen een wachtwoord aanmelden bij Intune." },
      ],
      insight: "De policy is correct ingesteld, maar beschermt twee beheerders niet. De oorzaak ligt in een migratie-uitzondering die is blijven staan.",
      validationQuestion: "Te bevestigen met de klant: is de migratiegroep nog in gebruik, en zijn deze rollen bewust toegekend?",
    },
    {
      _type: "scopeSection",
      _key: "scope",
      heading: "Wat we onderzoeken",
      intro: "We lezen de configuratie read-only uit en analyseren de onderdelen in samenhang.",
      groups: [
        {
          _key: "g1",
          title: "Policies en toewijzing",
          items: ["Alle Conditional Access-policies en hun status", "Scope, toewijzingen en doel-apps", "Gebruikers, groepen en rollen", "In- en uitsluitingslogica"],
        },
        {
          _key: "g2",
          title: "Voorwaarden en controls",
          items: ["Authenticatie-eisen en authentication strengths", "Named locations", "Apparaat- en compliance-afhankelijkheden", "Sessie-instellingen"],
        },
        {
          _key: "g3",
          title: "Randvoorwaarden",
          items: ["Emergency access-accounts", "Beheerdersrollen", "Relevante licenties", "Overlappende en conflicterende policies"],
        },
        {
          _key: "g4",
          title: "Uitkomst",
          items: ["Scenario's die afgedekt zijn zoals bedoeld", "Gaten tussen bedoelde en ingestelde bescherming", "Onduidelijkheden die bevestiging vragen"],
        },
      ],
    },
    {
      _type: "deliverablesSection",
      _key: "deliverables",
      heading: "Wat je ontvangt",
      intro: "Een rapport dat zowel voor de engineer als voor het management bruikbaar is, en een gesprek om het door te nemen.",
      items: [
        { _key: "d1", title: "Managementsamenvatting", body: "De belangrijkste risico's en besluiten op twee pagina's, zonder vakjargon." },
        { _key: "d2", title: "Technische analyse", body: "Elke bevinding gekoppeld aan de policies, groepen en scenario's waar het om gaat." },
        { _key: "d3", title: "Gaten en onzekerheden", body: "Wat vaststaat staat apart van wat jij nog moet bevestigen. Geen aannames verpakt als feit." },
        { _key: "d4", title: "Geprioriteerde aanbevelingen", body: "Per aanbeveling de reden, de impact en een voorgestelde volgorde." },
        { _key: "d5", title: "Doelbeeld en vervolgstappen", body: "Hoe je Conditional Access-inrichting eruit zou moeten zien, en de route ernaartoe." },
        { _key: "d6", title: "Bespreking van de bevindingen", body: "Een sessie van 90 minuten met je team om de uitkomsten en keuzes door te nemen." },
      ],
      sampleReportCta: { label: "Bekijk wat je ontvangt", href: "#wat-je-ontvangt", event: "sample_report_clicked" },
    },
    {
      _type: "processSection",
      _key: "process",
      heading: "Hoe het assessment verloopt",
      steps: [
        { _key: "s1", title: "Intake en afbakening", body: "We bespreken je omgeving, je doelen en wat je wilt weten. Je ontvangt een bevestiging van de scope." },
        { _key: "s2", title: "Read-only uitlezen", body: "Met leesrechten exporteren we de configuratie. We wijzigen niets in je tenant." },
        { _key: "s3", title: "Analyse en context", body: "We reconstrueren scenario's en leggen open vragen aan je voor. Wat bedoeld is, wordt niet als fout gemeld." },
        { _key: "s4", title: "Rapportage", body: "Je ontvangt het rapport met samenvatting, analyse en geprioriteerde aanbevelingen." },
        { _key: "s5", title: "Bespreking en correctieronde", body: "We nemen de bevindingen samen door. Feitelijke correcties verwerken we in één correctieronde." },
      ],
    },
    {
      _type: "audienceSection",
      _key: "audience",
      heading: "Voor wie",
      audiences: [
        { _key: "a1", role: "Security engineers en Entra-beheerders", need: "Een tweede paar ogen dat de logica tussen policies narekent, met verwijzingen naar de exacte configuratie." },
        { _key: "a2", role: "IT-managers, CISO's en security officers", need: "Een onderbouwd antwoord op de vraag hoe toegang beschermd is, en welke besluiten nodig zijn." },
        { _key: "a3", role: "MSP's en IT-dienstverleners", need: "Een onafhankelijke specialistische toets voor een klantomgeving, zonder dat wij het beheer overnemen." },
      ],
    },
    {
      _type: "boundariesSection",
      _key: "boundaries",
      heading: "Scope en beperkingen",
      intro: "Duidelijk over wat het assessment wel en niet is, zodat je weet wat de uitkomst waard is.",
      included: [
        "Read-only analyse van de Conditional Access-configuratie en directe afhankelijkheden",
        "Scenario-analyse op basis van de geëxporteerde configuratie",
        "Onderscheid tussen vastgestelde bevindingen en te bevestigen hypotheses",
        "Aanbevelingen en een voorgesteld doelbeeld",
      ],
      excluded: [
        "Een volledige security-audit of penetratietest",
        "Het daadwerkelijk testen van elke aanmeldroute",
        "Een garantie dat elk risico wordt gevonden",
        "Een certificering of verklaring van compliance",
        "Het doorvoeren van wijzigingen in je tenant",
      ],
      note: "De analyse is zo goed als de gegevens waartoe we toegang krijgen. Waar informatie ontbreekt, benoemen we dat expliciet.",
    },
    {
      _type: "faqSection",
      _key: "faq",
      heading: "Veelgestelde vragen",
      items: [
        { _key: "f1", question: "Wijzigen jullie iets in onze tenant?", answer: "Nee. We werken uitsluitend met leesrechten. Alle aanbevelingen voer je zelf of met je beheerpartij door." },
        { _key: "f2", question: "Welke rechten hebben jullie nodig?", answer: "Leesrechten op Conditional Access, directory-objecten en de afhankelijkheden die we analyseren. Tijdens de intake stemmen we de precieze rechten en de werkwijze af, inclusief hoe en hoe lang gegevens worden bewaard." },
        { _key: "f3", question: "Is dit een penetratietest?", answer: "Nee. We analyseren de configuratie en redeneren per scenario. We voeren geen aanvallen uit en testen niet elke aanmeldroute in de praktijk." },
        { _key: "f4", question: "We hebben al een beheerpartij of MSP. Past dit dan nog?", answer: "Ja. Het assessment is een onafhankelijke tweede blik en vult bestaand beheer aan. We nemen het beheer niet over en de uitkomsten kun je samen met je beheerpartij oppakken." },
        { _key: "f5", question: "Wat als we veel policies hebben?", answer: "Dan bepalen we tijdens de intake samen de scope, zodat je vooraf weet wat het assessment omvat." },
        { _key: "f6", question: "Hoe lang duurt het assessment?", answer: "Dat hangt af van de omvang en van hoe snel open vragen beantwoord worden. Na de intake ontvang je een planning." },
      ],
    },
    {
      _type: "ctaSection",
      _key: "cta",
      heading: "Weet hoe je toegang werkelijk beschermd is",
      body: "Vertel kort over je omgeving en je vraag. Je krijgt een persoonlijke reactie met een voorstel voor de intake.",
      primary: { label: "Vraag een Conditional Access Assessment aan", href: "/contact?onderwerp=conditional-access-assessment", event: "assessment_cta_clicked" },
      secondary: { label: "Plan een kennismaking", href: "/contact?onderwerp=kennismaking", event: "scheduling_link_clicked" },
    },
  ],
};

const intuneAssessment: Solution = {
  _id: "solution.intune-assessment",
  slug: "intune-assessment",
  status: "published",
  category: "assessment",
  order: 2,
  badge: "Nieuw",
  title: "Intune Assessment",
  shortTitle: "Intune Assessment",
  question: "Doet je Intune-omgeving wat je denkt dat ze doet?",
  summary:
    "Een onafhankelijk, read-only onderzoek naar je Microsoft Intune-inrichting: policies, toewijzingen, filters, compliance en updates, in samenhang bekeken.",
  outcome: "Je weet welke apparaten echt onder je policies vallen, waar conflicten en gaten zitten en wat je eerst aanpakt.",
  audienceSummary: "Voor Intune-engineers en werkplekbeheerders, en voor de IT-manager die wil weten of de werkplek doet wat is afgesproken.",
  heroIntro:
    "In Intune bepalen groepen, filters en uitsluitingen welk apparaat welke instelling krijgt. Een policy die in de console klopt, kan toch honderden apparaten missen of botsen met een andere policy. We lezen je inrichting read-only uit en laten zien wat er per apparaatgroep werkelijk geldt.",
  primaryCta: { label: "Vraag een Intune Assessment aan", href: "/contact?onderwerp=intune-assessment", event: "assessment_cta_clicked" },
  secondaryCta: { label: "Plan een kennismaking", href: "/contact?onderwerp=kennismaking", event: "scheduling_link_clicked" },
  serviceType: "Microsoft Intune assessment",
  relatedArticles: ["wat-vertelt-een-intune-compliance-percentage"],
  updatedAt: "2026-11-09",
  seo: {
    title: "Intune Assessment: onafhankelijke Intune-check",
    description:
      "Onafhankelijk, read-only Intune Assessment: we brengen in kaart welke apparaten echt onder je policies vallen, waar toewijzingen, filters en compliance afwijken en wat je eerst aanpakt.",
  },
  sections: [
    {
      _type: "problemSection",
      _key: "problem",
      heading: "Een policy in de console is nog geen beheerd apparaat",
      intro: "Intune werkt met lagen: policy, toewijzing, filter, groep en apparaat. Pas als alle lagen kloppen, krijgt een apparaat wat je bedoelde.",
      points: [
        { _key: "p1", title: "Toewijzingen en filters", body: "Een filter op OS-versie, een dynamische groep op een attribuut dat niet meer klopt of een vergeten uitsluiting. Apparaten vallen buiten beeld zonder dat iemand het merkt." },
        { _key: "p2", title: "Conflicten en dubbel werk", body: "Meerdere profielen die dezelfde instelling sturen, oude policies die blijven staan naast nieuwe. Het resultaat verschilt per apparaat." },
        { _key: "p3", title: "Compliance die niets meet", body: "Een compliance-percentage zegt weinig als apparaten zonder toegewezen policy als compliant meetellen. Conditional Access vertrouwt daar wel op." },
      ],
    },
    {
      _type: "scopeSection",
      _key: "scope",
      heading: "Wat we onderzoeken",
      intro: "We lezen de inrichting read-only uit via de Microsoft Graph API.",
      groups: [
        { _key: "g1", title: "Configuratie", items: ["Configuratieprofielen en settings catalog", "Endpoint security-policies", "Conflicten en overlap tussen policies", "Verouderde en ongebruikte policies"] },
        { _key: "g2", title: "Toewijzing", items: ["Groepen, filters en uitsluitingen", "Welke apparaten wat werkelijk krijgen", "Apparaten zonder toegewezen policies"] },
        { _key: "g3", title: "Compliance en toegang", items: ["Compliance-policies en tenantinstellingen", "Samenhang met Conditional Access", "Grace periods en verouderde check-ins"] },
        { _key: "g4", title: "Beheer", items: ["Updates en apps", "Enrollment en Autopilot", "Rollen, scope tags en naamgeving"] },
      ],
    },
    {
      _type: "deliverablesSection",
      _key: "deliverables",
      heading: "Wat je ontvangt",
      items: [
        { _key: "d1", title: "Managementsamenvatting", body: "De staat van de werkplekinrichting en de belangrijkste keuzes, zonder vakjargon." },
        { _key: "d2", title: "Toewijzingsanalyse", body: "Per apparaatgroep wat er werkelijk geldt, en welke apparaten buiten de bedoelde policies vallen." },
        { _key: "d3", title: "Bevindingen met bewijs", body: "Elke bevinding met status: vastgesteld, aanwijzing of niet vast te stellen." },
        { _key: "d4", title: "Geprioriteerd verbeterplan", body: "Wat eerst, wat daarna, en welke stappen van elkaar afhangen." },
        { _key: "d5", title: "Bespreking", body: "Een sessie met je team om de uitkomsten en keuzes door te nemen." },
      ],
    },
    {
      _type: "processSection",
      _key: "process",
      heading: "Hoe het assessment verloopt",
      steps: [
        { _key: "s1", title: "Intake en afbakening", body: "We bespreken je omgeving en bepalen samen de scope." },
        { _key: "s2", title: "Read-only uitlezen", body: "Met leesrechten exporteren we de Intune-configuratie. We wijzigen niets." },
        { _key: "s3", title: "Analyse en context", body: "We verbinden policies, toewijzingen en apparaten, en leggen open vragen aan je voor." },
        { _key: "s4", title: "Rapportage", body: "Samenvatting, onderbouwde bevindingen en een verbeterplan." },
        { _key: "s5", title: "Bespreking en vervolg", body: "We nemen de uitkomsten door en bepalen de volgende stappen." },
      ],
    },
    {
      _type: "boundariesSection",
      _key: "boundaries",
      heading: "Scope en beperkingen",
      included: ["Read-only analyse van de Intune-inrichting", "Samenhang met Entra-groepen en Conditional Access waar relevant", "Onderscheid tussen vaststellingen en aanwijzingen", "Een geprioriteerd verbeterplan"],
      excluded: ["Het doorvoeren van wijzigingen", "Onderzoek op individuele apparaten", "Een garantie dat alle problemen worden gevonden", "Een certificering of compliance-verklaring"],
    },
    {
      _type: "faqSection",
      _key: "faq",
      heading: "Veelgestelde vragen",
      items: [
        { _key: "f1", question: "Wat is het verschil met de Microsoft 365 Health Check?", answer: "Het Intune Assessment gaat diep op de werkplek: policies, toewijzingen en compliance in Intune. De Health Check is breder en kijkt naar identity, security en beheer in de hele Microsoft 365-omgeving." },
        { _key: "f2", question: "Wijzigen jullie iets?", answer: "Nee. We werken read-only. Verbeteringen voer je zelf door, met je beheerpartij, of met ons als aparte opdracht." },
        { _key: "f3", question: "Welke platformen nemen jullie mee?", answer: "Dat bepalen we in de intake. Windows staat meestal centraal; macOS, iOS en Android kunnen in scope." },
      ],
    },
    {
      _type: "ctaSection",
      _key: "cta",
      heading: "Weet wat je werkplekken werkelijk krijgen",
      body: "Vertel kort over je omgeving. Je krijgt een voorstel voor de intake.",
      primary: { label: "Vraag een Intune Assessment aan", href: "/contact?onderwerp=intune-assessment", event: "assessment_cta_clicked" },
      secondary: { label: "Plan een kennismaking", href: "/contact?onderwerp=kennismaking", event: "scheduling_link_clicked" },
    },
  ],
};

const healthScan: Solution = {
  _id: "solution.microsoft-365-health-check",
  slug: "microsoft-365-health-check",
  status: "published",
  category: "assessment",
  order: 3,
  title: "Microsoft 365 Health Check",
  shortTitle: "Microsoft 365 Health Check",
  question: "Hoe gezond is je Microsoft 365-omgeving, als je de onderdelen in samenhang bekijkt?",
  summary:
    "Een onafhankelijke beoordeling van identity, Intune, security en beheerbaarheid, waarin bevindingen uit verschillende domeinen met elkaar worden verbonden.",
  outcome: "Je krijgt een onderbouwd beeld van de staat van je omgeving en een geprioriteerde verbeterroute.",
  audienceSummary: "Voor IT-teams die een second opinion willen en voor management dat moet kiezen waar het in investeert.",
  heroIntro:
    "Een gezondheidsscore van 78% zegt weinig over waar je moet beginnen. Wij kijken naar Entra, Intune en security als één systeem: welke afwijkingen hangen samen, wat is de oorzaak, en wat heeft dat voor gevolgen voor gebruikers, beveiliging en beheer.",
  primaryCta: { label: "Vraag een Health Check aan", href: "/contact?onderwerp=microsoft-365-health-check", event: "assessment_cta_clicked" },
  secondaryCta: { label: "Plan een kennismaking", href: "/contact?onderwerp=kennismaking", event: "scheduling_link_clicked" },
  serviceType: "Microsoft 365 tenant assessment",
  relatedArticles: ["wat-vertelt-een-intune-compliance-percentage"],
  updatedAt: "2026-11-01",
  seo: {
    title: "Microsoft 365 Health Check: tenant-assessment",
    description:
      "Onafhankelijke Microsoft 365 Health Check: Entra, Intune en security in samenhang beoordeeld, met oorzaken in plaats van losse bevindingen en een geprioriteerd verbeterplan.",
  },
  sections: [
    {
      _type: "problemSection",
      _key: "problem",
      heading: "Losse bevindingen vertellen het halve verhaal",
      intro:
        "Elke beheerconsole heeft zijn eigen dashboards. Ze tonen wat er in dat ene onderdeel afwijkt. Maar de oorzaak van een probleem zit vaak in een ander onderdeel dan waar het zichtbaar wordt.",
      points: [
        { _key: "p1", title: "Symptomen in het ene domein, oorzaken in het andere", body: "Een daling in compliance kan voortkomen uit een filter, een groepsregel of een gewijzigde OS-versie. Het compliance-dashboard laat alleen het percentage zien." },
        { _key: "p2", title: "Configuraties verschuiven ongemerkt", body: "Tijdelijke uitzonderingen, gekopieerde policies en verlaten testtoewijzingen. Elke wijziging klopte op het moment zelf; samen vormen ze technische schuld." },
        { _key: "p3", title: "Een score is geen prioriteit", body: "Honderd aanbevelingen met dezelfde urgentie helpen niemand. Wat telt is welke afwijking gevolgen heeft voor toegang, beveiliging of beheerlast." },
      ],
    },
    {
      _type: "contrastSection",
      _key: "contrast",
      heading: "Van waarneming naar oorzaak",
      intro: "Hetzelfde gegeven, op twee manieren gerapporteerd.",
      ordinaryLabel: "Een traditioneel assessment",
      ordinary: ["“Deze apparaten zijn niet compliant.”", "Aanbeveling: onderzoek de apparaten.", "Ernst: hoog, net als 40 andere bevindingen."],
      contextualLabel: "De Health Check",
      contextual: [
        "“Deze apparaten lijken buiten de bedoelde compliance-toewijzing te vallen, omdat hun eigenschappen niet meer overeenkomen met het ingestelde filter.”",
        "Mogelijk effect: toegangsbeslissingen die op compliance leunen, werken voor deze apparaten anders dan bedoeld.",
        "Status: aanwijzing, te bevestigen met de sign-in-gegevens.",
      ],
    },
    {
      _type: "scopeSection",
      _key: "scope",
      heading: "Wat we beoordelen",
      intro: "De exacte scope stemmen we af op je vraag. Mogelijke onderdelen:",
      groups: [
        { _key: "g1", title: "Identity en toegang", items: ["Microsoft Entra-configuratie", "Bescherming van identiteiten en toegang", "Beheerdersrollen en privileges"] },
        { _key: "g2", title: "Apparaten", items: ["Microsoft Intune-configuratie", "Apparaatbeheer en compliance", "Inconsistenties in toewijzingen en filters"] },
        { _key: "g3", title: "Security", items: ["Gaten in de securityconfiguratie", "Afwijkingen van relevante baselines en richtlijnen"] },
        { _key: "g4", title: "Beheer en governance", items: ["Configuratiedrift en technische schuld", "Onderhoudbaarheid en naamgeving", "Licenties en optimalisatie, indien in scope"] },
      ],
    },
    {
      _type: "deliverablesSection",
      _key: "deliverables",
      heading: "Wat je ontvangt",
      intro: "Geen ruwe export, maar een beoordeling waar je mee verder kunt.",
      items: [
        { _key: "d1", title: "Managementsamenvatting", body: "De staat van de omgeving, de grootste risico's en de keuzes die voorliggen." },
        { _key: "d2", title: "Domeinoverstijgende bevindingen", body: "Bevindingen die met elkaar samenhangen, gegroepeerd naar oorzaak in plaats van naar console." },
        { _key: "d3", title: "Bewijs en zekerheid per bevinding", body: "Bij elke bevinding staat waarop die rust en of het een vaststelling of een aanwijzing is." },
        { _key: "d4", title: "Geprioriteerde verbeterroute", body: "Wat eerst, wat daarna, en welke stappen van elkaar afhankelijk zijn." },
        { _key: "d5", title: "Bespreking", body: "Een sessie met je technische team en, desgewenst, management." },
      ],
    },
    {
      _type: "processSection",
      _key: "process",
      heading: "Hoe het assessment verloopt",
      steps: [
        { _key: "s1", title: "Intake en afbakening", body: "We bepalen samen welke domeinen in scope zijn en welke vragen beantwoord moeten worden." },
        { _key: "s2", title: "Read-only uitlezen", body: "We verzamelen configuratiegegevens met leesrechten. Er wordt niets gewijzigd." },
        { _key: "s3", title: "Analyse en context", body: "We verbinden bevindingen over domeinen heen en toetsen ze aan jouw context: wat is bewust zo ingericht?" },
        { _key: "s4", title: "Rapportage", body: "Samenvatting, onderbouwde bevindingen en een geprioriteerde verbeterroute." },
        { _key: "s5", title: "Bespreking en vervolg", body: "We nemen de uitkomsten door en bespreken welke stappen je zelf, met je beheerpartij of met ons zet." },
      ],
    },
    {
      _type: "audienceSection",
      _key: "audience",
      heading: "Voor wie",
      audiences: [
        { _key: "a1", role: "Microsoft 365-beheerders en Intune-engineers", need: "Een grondige second opinion die oorzaken aanwijst, met technische onderbouwing." },
        { _key: "a2", role: "IT-managers, CTO's en CISO's", need: "Inzicht in waar risico en beheerlast zitten, en waar investeren het meest oplevert." },
        { _key: "a3", role: "MSP's en IT-dienstverleners", need: "Een onafhankelijk specialistisch assessment voor een klant, aanvullend op het eigen beheer." },
      ],
    },
    {
      _type: "boundariesSection",
      _key: "boundaries",
      heading: "Scope en beperkingen",
      included: [
        "Read-only beoordeling van de afgesproken domeinen",
        "Verbanden tussen bevindingen in verschillende domeinen",
        "Expliciet onderscheid tussen vaststellingen en aanwijzingen",
        "Een geprioriteerde verbeterroute",
      ],
      excluded: [
        "Een gezondheidsscore of geautomatiseerde checklist als eindproduct",
        "Doorlopende monitoring of dagelijks beheer (zie Tenant-continuïteit voor periodieke verbetering)",
        "Een garantie dat alle problemen worden gevonden",
        "Een certificering of compliance-verklaring",
        "Het doorvoeren van wijzigingen",
      ],
      note: "Mogelijke effecten van een bevinding zijn geen bewezen uitkomsten. We geven aan welk bewijs er is en wat nog bevestigd moet worden.",
    },
    {
      _type: "faqSection",
      _key: "faq",
      heading: "Veelgestelde vragen",
      items: [
        { _key: "f1", question: "Is dit een vervanging van onze beheertools?", answer: "Nee. De Health Check is een onafhankelijke beoordeling en vult tools en platforms aan die je al gebruikt. Hij vervangt ze niet." },
        { _key: "f2", question: "Krijgen we een score?", answer: "Nee, geen enkel cijfer. Een score verbergt juist de samenhang die we zichtbaar willen maken. Je krijgt onderbouwde bevindingen met een prioriteit." },
        { _key: "f3", question: "Wat is het verschil met het Conditional Access Assessment?", answer: "Het Conditional Access Assessment gaat diep op één onderwerp: toegangsbeveiliging in Entra. De Health Check is breder en verbindt identity, apparaten, security en beheer." },
        { _key: "f4", question: "Wijzigen jullie iets in onze omgeving?", answer: "Nee. We werken read-only. Verbeteringen voer je zelf of met je beheerpartij door; desgewenst ondersteunen we daarbij als aparte opdracht." },
        { _key: "f5", question: "Hoe lang duurt het?", answer: "Dat hangt af van de scope. Na de intake ontvang je een planning." },
      ],
    },
    {
      _type: "ctaSection",
      _key: "cta",
      heading: "Bespreek je omgeving",
      body: "Beschrijf kort je situatie en je vraag. We stellen een passende scope voor.",
      primary: { label: "Vraag een Health Check aan", href: "/contact?onderwerp=microsoft-365-health-check", event: "assessment_cta_clicked" },
      secondary: { label: "Plan een kennismaking", href: "/contact?onderwerp=kennismaking", event: "scheduling_link_clicked" },
    },
  ],
};

const continuity: Solution = {
  _id: "solution.tenant-continuiteit",
  slug: "tenant-continuiteit",
  status: "published",
  category: "service",
  order: 4,
  title: "Tenant-continuïteit",
  shortTitle: "Tenant-continuïteit",
  question: "Blijft je Microsoft 365-omgeving bij, ook na het project?",
  summary:
    "Een doorlopende verbetercyclus voor Microsoft 365, Entra ID en Intune: periodiek meten, configuraties bijwerken, opnieuw controleren en borgen. Elke cyclus brengt je tenant een stap verder.",
  outcome: "Een omgeving die actueel blijft, aantoonbaar volwassener wordt en waarvan je weet wat er veranderd is.",
  audienceSummary: "Voor organisaties en MSP's die hun Microsoft 365-inrichting niet willen laten verouderen na de oplevering.",
  heroIntro:
    "Na een project of assessment begint het eigenlijke werk. Microsoft wijzigt doorlopend functies en aanbevelingen, baselines krijgen nieuwe versies, en tijdelijke uitzonderingen blijven staan. Met een vaste cyclus van plan, do, check, act houden we je configuratie actueel en meten we elke ronde hoe ver je bent.",
  primaryCta: { label: "Bespreek een verbetercyclus", href: "/contact?onderwerp=tenant-continuiteit", event: "assessment_cta_clicked" },
  secondaryCta: { label: "Plan een kennismaking", href: "/contact?onderwerp=kennismaking", event: "scheduling_link_clicked" },
  serviceType: "Microsoft 365 continuous improvement and configuration maintenance",
  relatedArticles: ["wat-vertelt-een-intune-compliance-percentage"],
  updatedAt: "2026-11-01",
  seo: {
    title: "Tenant-continuïteit voor Microsoft 365",
    description:
      "Doorlopende verbetering van je Microsoft 365-, Entra- en Intune-omgeving volgens plan, do, check, act: periodieke updates, vervolgscans met delta en een groeiend volwassenheidsniveau.",
  },
  sections: [
    {
      _type: "problemSection",
      _key: "problem",
      heading: "Een goede inrichting veroudert vanzelf",
      intro: "Niet omdat iemand iets fout doet, maar omdat alles om de configuratie heen blijft bewegen.",
      points: [
        { _key: "p1", title: "Microsoft staat niet stil", body: "Nieuwe instellingen, gewijzigde standaardwaarden en vervallen functies. Wat vorig jaar de aanbeveling was, is dat nu misschien niet meer." },
        { _key: "p2", title: "Tijdelijk wordt blijvend", body: "Uitzonderingen voor een migratie, een testtoewijzing, een snelle oplossing voor één afdeling. Zonder vast moment om ze terug te zien, stapelen ze zich op." },
        { _key: "p3", title: "Zonder meting geen voortgang", body: "Als je niet periodiek meet, weet je niet of de omgeving beter wordt, gelijk blijft of langzaam afglijdt." },
      ],
    },
    {
      _type: "cycleSection",
      _key: "cycle",
      heading: "De verbetercyclus",
      intro: "Inzicht en analyse, (auto)remediatie, monitoring en vastlegging, in een vast ritme volgens plan, do, check, act. Het ritme stemmen we samen af.",
      centerLabel: "Tenant-\nvolwassenheid",
      steps: [
        {
          _key: "plan",
          letter: "P",
          title: "Inzicht en analyse",
          subtitle: "Plan",
          body: "We lezen de omgeving uit via de Microsoft Graph API en verbinden de onderdelen: wat is er ingesteld, wie valt eronder, wat doet het samen, en waarom. De scans zijn hier het meetinstrument.",
          points: ["Scans als nulmeting en vervolgmeting", "Samenhang en oorzaken, niet alleen bevindingen", "Volwassenheid per laag en per domein", "Geprioriteerde verbeterroute"],
        },
        {
          _key: "do",
          letter: "D",
          title: "(Auto)remediatie",
          subtitle: "Do",
          body: "Afwijkingen herstellen we met automatisering: configuratie als code, gefaseerd uitgerold en met akkoord vooraf. Waar het verantwoord kan, gebeurt herstel automatisch.",
          points: ["Configuratie als code via Graph en PowerShell", "Gefaseerde uitrol in ringen", "Herhaalbaar over meerdere tenants", "Automatisch herstel waar dat verantwoord is"],
        },
        {
          _key: "check",
          letter: "C",
          title: "Monitoring",
          subtitle: "Check",
          body: "We bewaken of de werkelijkheid blijft overeenkomen met de afgesproken standaard, en meten periodiek opnieuw.",
          points: ["Configuratiedrift en desired state", "Back-up en vergelijking van configuratie", "Vervolgscan met delta", "Signalen uit compliance- en sign-in-gegevens"],
        },
        {
          _key: "act",
          letter: "A",
          title: "Vastlegging",
          subtitle: "Act",
          body: "Wat werkt, wordt de standaard en wordt vastgelegd. Zo is je omgeving uit te leggen, over te dragen en aantoonbaar.",
          points: ["Ontwerp- en beheerdocumentatie", "Besluitenlog met onderbouwing", "Wijzigingshistorie", "Rapportage voor team en management"],
        },
      ],
    },
    {
      _type: "deliverablesSection",
      _key: "deliverables",
      heading: "Wat je per cyclus ontvangt",
      items: [
        { _key: "d1", title: "Meting met delta", body: "De stand van je omgeving per domein, vergeleken met de vorige meting." },
        { _key: "d2", title: "Doorgevoerde verbeteringen", body: "Bijgewerkte configuraties en baselines, met een overzicht van wat er is gewijzigd en waarom." },
        { _key: "d3", title: "Driftoverzicht", body: "Wat er sinds de vorige cyclus buiten de afgesproken standaard is veranderd, en wat ermee is gedaan." },
        { _key: "d4", title: "Bijgewerkte roadmap", body: "De prioriteiten voor de volgende cyclus, inclusief relevante wijzigingen van Microsoft." },
        { _key: "d5", title: "Volwassenheidsoverzicht", body: "Hoe het volwassenheidsniveau zich over de cycli ontwikkelt, leesbaar voor management." },
        { _key: "d6", title: "Bespreking", body: "Een vast overleg per cyclus om resultaten en besluiten door te nemen." },
      ],
    },
    {
      _type: "audienceSection",
      _key: "audience",
      heading: "Voor wie",
      audiences: [
        { _key: "a1", role: "Organisaties met een eigen IT-team", need: "Specialistische capaciteit om de Microsoft 365-inrichting actueel te houden, naast het dagelijkse werk." },
        { _key: "a2", role: "IT-managers en CISO's", need: "Aantoonbare voortgang: wat is er verbeterd, wat staat er nog open en waar zitten de risico's." },
        { _key: "a3", role: "MSP's en IT-dienstverleners", need: "Een herhaalbare, geautomatiseerde verbeteraanpak over meerdere klanttenants heen." },
      ],
    },
    {
      _type: "boundariesSection",
      _key: "boundaries",
      heading: "Scope en afspraken",
      included: [
        "Periodieke scans en vergelijking met de vorige meting",
        "Bijwerken van configuraties en baselines binnen de afgesproken domeinen",
        "Wijzigingen via een afgesproken change-proces, met akkoord vooraf",
        "Rapportage en bespreking per cyclus",
      ],
      excluded: [
        "Dagelijks beheer, servicedesk of 24/7 bewaking",
        "Wijzigingen zonder akkoord",
        "Een garantie dat er geen incidenten meer optreden",
        "Een certificering of compliance-verklaring",
      ],
      note: "Wijzigingen voeren we alleen door met de rechten en het akkoord die vooraf zijn afgesproken. De scans zelf blijven read-only.",
    },
    {
      _type: "faqSection",
      _key: "faq",
      heading: "Veelgestelde vragen",
      items: [
        { _key: "f1", question: "Moeten we eerst een assessment doen?", answer: "Het is de meest logische start: de eerste scan is je nulmeting. Heb je al een recente meting, dan kunnen we daarop voortbouwen." },
        { _key: "f2", question: "Is dit hetzelfde als beheer?", answer: "Nee. Dagelijks beheer en de servicedesk blijven bij je eigen team of beheerpartij. Wij zorgen in vaste cycli dat de inrichting actueel blijft en verbetert." },
        { _key: "f3", question: "Hoe vaak loopt een cyclus?", answer: "Dat stemmen we af op je omgeving. Een ritme per kwartaal werkt vaak goed, maar het kan ook vaker of minder vaak." },
        { _key: "f4", question: "Hoe worden wijzigingen doorgevoerd?", answer: "Volgens het change-proces dat we vooraf afspreken: met akkoord, gefaseerd en waar mogelijk geautomatiseerd en als code vastgelegd, zodat elke wijziging terug te vinden en terug te draaien is." },
      ],
    },
    {
      _type: "ctaSection",
      _key: "cta",
      heading: "Laat je omgeving elke cyclus beter worden",
      body: "Vertel waar je nu staat. We stellen een passende start en een ritme voor.",
      primary: { label: "Bespreek een verbetercyclus", href: "/contact?onderwerp=tenant-continuiteit", event: "assessment_cta_clicked" },
      secondary: { label: "Plan een kennismaking", href: "/contact?onderwerp=kennismaking", event: "scheduling_link_clicked" },
    },
  ],
};

export const solutions: Solution[] = [caAssessment, intuneAssessment, healthScan, continuity];
