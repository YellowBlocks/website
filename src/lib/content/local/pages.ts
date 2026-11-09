import type { Page } from "../types";
import { pt } from "./pt";

const home: Page = {
  _id: "page.home",
  slug: "home",
  title: "Home",
  updatedAt: "2026-11-09",
  seo: {
    title: "YellowBlocks – Stay in control",
    description:
      "YellowBlocks helpt organisaties in control te blijven over Microsoft 365, identity en modern work, met consultancy en vaste diensten: Conditional Access Assessment, Intune Assessment en Microsoft 365 Health Check.",
  },
  hero: {
    heading: "Stay in control.",
    intro:
      "YellowBlocks helpt organisaties grip te houden op Microsoft 365, identity en modern work. Met consultancy voor ontwerp, inrichting en automatisering, en met vaste diensten die je omgeving onafhankelijk doorlichten.",
    primaryCta: { label: "Bekijk onze diensten", href: "#diensten" },
    secondaryCta: { label: "Plan een kennismaking", href: "/contact?onderwerp=kennismaking", event: "scheduling_link_clicked" },
    stack: {
      layers: ["Ingesteld", "Toegewezen", "Werkzaam", "Actueel", "Aantoonbaar"],
      topLabel: "In control",
      caption: "Illustratief: hoe hoger de laag, hoe vaker er een kloof zit.",
    },
  },
  sections: [
    {
      _type: "pillarsSection",
      _key: "pillars",
      heading: "Wat YellowBlocks doet",
      intro: "Twee manieren om met ons te werken, met hetzelfde doel: een Microsoft-omgeving die doet wat bedoeld is, en zo blijft.",
      pillars: [
        {
          _key: "consultancy",
          title: "Consultancy",
          lead: "Specialistische kennis, precies waar je die nodig hebt.",
          body: "Advies, ontwerp en uitvoering in Microsoft 365, Entra ID en Intune. Naast je eigen team of beheerpartij, voor een project of doorlopend.",
          points: [
            "Ontwerp en inrichting van identity, Conditional Access en Intune",
            "Automatisering en (auto)remediatie via Microsoft Graph en PowerShell",
            "Monitoring en continuïteit: periodiek bijwerken en opnieuw meten",
            "Vastlegging: ontwerp, beheerdocumentatie en besluiten",
          ],
          cta: { label: "Bespreek je vraagstuk", href: "/contact?onderwerp=kennismaking", event: "contact_cta_clicked" },
        },
        {
          _key: "diensten",
          title: "Dienstverlening",
          lead: "Vaste assessments met een vaste werkwijze.",
          body: "Afgebakende, read-only onderzoeken met een vooraf afgesproken scope. Je krijgt een onderbouwd rapport en een geprioriteerd verbeterplan.",
          points: ["Conditional Access Assessment", "Intune Assessment", "Microsoft 365 Health Check"],
          cta: { label: "Bekijk de diensten", href: "#diensten", event: "assessment_cta_clicked" },
        },
      ],
    },
    {
      _type: "solutionsSection",
      _key: "services",
      heading: "Onze diensten",
      intro: "Onafhankelijk, read-only en met een vaste werkwijze. Kies de diepte op één onderwerp, of de breedte van je hele omgeving.",
      category: "assessment",
    },
    {
      _type: "layersSection",
      _key: "layers",
      heading: "Waarom: ingesteld is nog niet hetzelfde als geregeld",
      intro:
        "In control zijn betekent meer dan een instelling hebben. Een instelling is pas de onderste laag. Of je omgeving geregeld is, hangt af van alles wat erop gestapeld is. De meeste overzichten stoppen bij laag één; de verrassingen zitten in de lagen erboven.",
      topLabel: "Geregeld",
      note: "Alle vijf lagen op orde, in elk domein, en zo dat het blijft. Daar werken we naartoe.",
      layers: [
        { _key: "l1", name: "Ingesteld", question: "Bestaat de configuratie?", body: "De policy, baseline of instelling is aangemaakt. Hier stoppen de meeste dashboards en rapportages.", capabilities: ["Inzicht"] },
        { _key: "l2", name: "Toegewezen", question: "Bereikt het de juiste gebruikers en apparaten?", body: "Groepen, filters en uitsluitingen bepalen wie er echt onder valt. Eén verouderd filter zet honderden apparaten ongemerkt buiten de toewijzing.", capabilities: ["Inzicht", "Analyse"] },
        { _key: "l3", name: "Werkzaam", question: "Doet het samen wat bedoeld is?", body: "Conditional Access leunt op compliance, compliance op toewijzing, toewijzing op attributen. Alleen in samenhang zie je of de bescherming echt klopt.", capabilities: ["Analyse"] },
        { _key: "l4", name: "Actueel", question: "Klopt het vandaag nog?", body: "Microsoft wijzigt doorlopend, tijdelijke uitzonderingen blijven staan en configuraties verschuiven. Wat bij oplevering klopte, hoeft dat nu niet meer te doen.", capabilities: ["Monitoring", "(Auto)remediatie"] },
        { _key: "l5", name: "Aantoonbaar", question: "Kun je het uitleggen en bewijzen?", body: "Ontwerp, besluiten en wijzigingen zijn vastgelegd. Zo hangen beheer, audit en opvolging niet af van het geheugen van één persoon.", capabilities: ["Vastlegging"] },
      ],
    },
    {
      _type: "cycleSection",
      _key: "cycle",
      heading: "Hoe we je in control houden",
      intro:
        "Of het nu om consultancy of een van onze diensten gaat: we werken volgens dezelfde verbetercyclus. Plan, do, check, act. Elke ronde komt je omgeving een laag verder.",
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
      note: "Je kunt op elk punt instappen: met een assessment, met één concreet vraagstuk of met de volledige cyclus.",
      cta: { label: "Bekijk Tenant-continuïteit", href: "/oplossingen/tenant-continuiteit", event: "assessment_cta_clicked" },
    },
    {
      _type: "founderSection",
      _key: "founder",
      heading: "Engineering-gedreven, uit de praktijk",
    },
    {
      _type: "insightsSection",
      _key: "insights",
      heading: "Inzichten",
      intro: "Technische achtergrond bij de vragen die we in omgevingen tegenkomen.",
      limit: 3,
    },
    {
      _type: "faqSection",
      _key: "faq",
      heading: "Veelgestelde vragen",
      items: [
        { _key: "f1", question: "Wat is het verschil tussen consultancy en jullie diensten?", answer: "De diensten zijn vaste assessments met een vaste werkwijze en een vooraf afgesproken scope. Consultancy is maatwerk: advies, ontwerp, implementatie of automatisering voor jouw vraagstuk." },
        { _key: "f2", question: "Welk assessment past bij ons?", answer: "Gaat je vraag over toegang en identity, kies dan het Conditional Access Assessment. Gaat het om je werkplekken en Intune, kies het Intune Assessment. Wil je een breed beeld van je hele Microsoft 365-omgeving, kies de Microsoft 365 Health Check." },
        { _key: "f3", question: "Nemen jullie het dagelijks beheer over?", answer: "Nee, geen dagelijks beheer of servicedesk. We werken naast je eigen team of beheerpartij, met advies, verbeteringen en periodieke cycli." },
        { _key: "f4", question: "Hebben jullie schrijfrechten nodig?", answer: "Voor de assessments niet: die zijn read-only. Bij consultancy-opdrachten spreken we vooraf af welke rechten nodig zijn en hoe wijzigingen worden goedgekeurd." },
      ],
    },
    {
      _type: "ctaSection",
      _key: "cta",
      heading: "Bespreek je omgeving",
      body: "Vertel waar je tegenaan loopt of wat je wilt bereiken. We denken mee over een passende aanpak, ook als het antwoord is dat je ons niet nodig hebt.",
      primary: { label: "Plan een kennismaking", href: "/contact?onderwerp=kennismaking", event: "scheduling_link_clicked" },
      secondary: { label: "Bekijk de assessments", href: "/oplossingen", event: "assessment_cta_clicked" },
    },
  ],
};

const methodology: Page = {
  _id: "page.werkwijze",
  slug: "werkwijze",
  title: "Een vaste werkwijze, van uitlezen tot besluit",
  intro:
    "Elk assessment volgt dezelfde route: read-only gegevens verzamelen, bevindingen in samenhang analyseren, toetsen aan jouw context en vertalen naar een verbeterplan. Zo is de uitkomst herhaalbaar en controleerbaar.",
  updatedAt: "2026-11-01",
  seo: {
    title: "Werkwijze: onafhankelijk, read-only, onderbouwd",
    description:
      "Hoe YellowBlocks Microsoft 365-omgevingen onderzoekt: read-only uitlezen, bevindingen verbinden, vaststellingen scheiden van aanwijzingen en vertalen naar een geprioriteerd plan.",
  },
  sections: [
    {
      _type: "approachSection",
      _key: "approach",
      heading: "Drie lijnen van onderzoek",
      intro: "Een bevinding is pas bruikbaar als je weet wat er is, waarom het zo is en hoe het zich verhoudt tot goede praktijk.",
      dimensions: [
        { _key: "d1", title: "Werkelijkheid", question: "Wat is er echt ingesteld en waargenomen?", body: "Configuraties, toewijzingen, filters, uitsluitingen en groepslidmaatschappen, uitgelezen via de Microsoft Graph API en beheerportalen." },
        { _key: "d2", title: "Context", question: "Waarom is het zo ingericht?", body: "Organisatie, licenties, eerdere keuzes en uitzonderingen. Wat bewust is, behandelen we als besluit, niet als fout." },
        { _key: "d3", title: "Kennis", question: "Hoe verhoudt het zich tot richtlijnen?", body: "Microsoft-documentatie, onafhankelijke expertise en control frameworks, gewogen naar wat in jouw situatie relevant is." },
      ],
    },
    {
      _type: "richTextSection",
      _key: "evidence",
      heading: "Bewijs boven aannames",
      body: pt(`
Elke bevinding in een rapport krijgt een status. Zo zie je direct hoe stevig een conclusie is.

- **Vastgesteld.** Direct aantoonbaar in de configuratie of de gegevens.
- **Aanwijzing.** Volgt logisch uit de gegevens, maar vraagt bevestiging, bijvoorbeeld uit sign-in logs of van een beheerder.
- **Niet vast te stellen.** De beschikbare gegevens zijn onvoldoende. We benoemen welke informatie nodig is.

Mogelijke gevolgen van een bevinding presenteren we als mogelijk, niet als bewezen. Liever een eerlijke open vraag dan een stellige conclusie die niet klopt.
`),
    },
    {
      _type: "exampleInsightSection",
      _key: "example",
      heading: "Van waarneming naar oorzaak",
      intro: "Een fictief voorbeeld met synthetische gegevens, zoals het in een rapport zou staan.",
      observationSource: "Wat een dashboard laat zien",
      observation: "15% van de Windows-apparaten (312 van 2.080) is niet compliant.",
      chain: [
        { _key: "c1", kind: "fact", label: "Gedeelde eigenschap", detail: "Alle 312 apparaten draaien Windows 11 build 10.0.26100." },
        { _key: "c2", kind: "fact", label: "Toewijzing", detail: "De compliance-policy is toegewezen met een filter op osVersion 10.0.22*. Build 26100 valt erbuiten." },
        { _key: "c3", kind: "hypothesis", label: "Context", detail: "De apparaten lijken in juni naar 24H2 te zijn geüpgraded; het filter is daarna niet aangepast." },
        { _key: "c4", kind: "effect", label: "Gevolg", detail: "Conditional Access-policies die een compliant apparaat vereisen, beoordelen deze apparaten anders dan bedoeld." },
      ],
      insight: "Niet 312 losse problemen, maar één toewijzingsfilter dat de Windows-upgrade niet heeft gevolgd.",
      validationQuestion: "Te bevestigen met de klant: was de upgrade gepland, en moet het filter versies uitsluiten of juist niet?",
    },
    {
      _type: "processSection",
      _key: "process",
      heading: "Het verloop",
      steps: [
        { _key: "s1", title: "Scope en intake", body: "Doel, vragen, domeinen en randvoorwaarden. Je ontvangt een bevestiging van scope en planning." },
        { _key: "s2", title: "Read-only uitlezen", body: "Met leesrechten verzamelen we de configuratie. Afspraken over toegang, opslag en verwijdering van gegevens leggen we vooraf vast." },
        { _key: "s3", title: "Analyse en context", body: "We reconstrueren samenhang en scenario's, en leggen open vragen aan je voor voordat iets als bevinding wordt opgenomen." },
        { _key: "s4", title: "Geprioriteerd rapport", body: "Managementsamenvatting, technische onderbouwing, statussen per bevinding en een verbeterroute in logische volgorde." },
        { _key: "s5", title: "Bespreking en vervolg", body: "We nemen de uitkomsten door met de mensen die erover beslissen en die het uitvoeren." },
      ],
    },
    {
      _type: "richTextSection",
      _key: "what-it-is",
      heading: "Wat een assessment is, en wat niet",
      body: pt(`
Het helpt om de begrippen scherp te houden.

- **Assessment.** Een afgebakend, onafhankelijk onderzoek op een moment in de tijd, met een rapport en een bespreking. Dit is wat YellowBlocks aanbiedt.
- **Advies en begeleiding.** Hulp bij het doorvoeren van verbeteringen. Mogelijk als aparte opdracht na een assessment.
- **Software en tooling.** Een product dat je zelf gebruikt. Een assessment is geen tool die je installeert.
- **Continuïteit en monitoring.** Doorlopend bijhouden en verbeteren van je omgeving in vaste cycli. Een assessment is daarin het meetmoment; [Tenant-continuïteit](/oplossingen/tenant-continuiteit) is de cyclus eromheen.

We werken naast bestaande beheertools, MSP's en platforms. We vervangen ze niet en nemen geen dagelijks beheer over.
`),
    },
    {
      _type: "ctaSection",
      _key: "cta",
      heading: "Benieuwd hoe dit uitpakt voor jouw omgeving?",
      body: "In een kennismaking bespreken we je vraag en welke aanpak past.",
      primary: { label: "Plan een kennismaking", href: "/contact?onderwerp=kennismaking", event: "scheduling_link_clicked" },
      secondary: { label: "Bekijk de assessments", href: "/oplossingen", event: "assessment_cta_clicked" },
    },
  ],
};

const about: Page = {
  _id: "page.over-ons",
  slug: "over-ons",
  title: "Een specialist in Microsoft-omgevingen, met een methode",
  intro:
    "YellowBlocks is een Nederlands technologiebedrijf, gespecialiseerd in Microsoft cloud, modern workplace, security en automatisering. We helpen organisaties begrijpen wat hun configuratie werkelijk doet.",
  updatedAt: "2026-11-01",
  seo: {
    title: "Over YellowBlocks en Sander Rozemuller",
    description:
      "YellowBlocks is opgericht door Sander Rozemuller, specialist in Microsoft Intune, Entra, Microsoft 365 en de Graph API, en maker van Intune Assistant.",
  },
  sections: [
    {
      _type: "richTextSection",
      _key: "why",
      heading: "Waarom YellowBlocks",
      body: pt(`
Microsoft 365-omgevingen worden complexer, en de hoeveelheid dashboards, scores en aanbevelingen groeit mee. Wat ontbreekt is vaak niet meer informatie, maar samenhang: welke bevindingen horen bij elkaar, wat is de oorzaak, en wat moet je eerst doen.

YellowBlocks is opgericht om die vertaalslag te maken. Niet met nog een dashboard, maar met een vaste werkwijze die technische complexiteit omzet in begrijpelijke, onderbouwde inzichten.

De naam zegt het: losse blokken, die pas betekenis krijgen als je ziet hoe ze samenhangen.
`),
    },
    {
      _type: "founderSection",
      _key: "founder",
      heading: "De oprichter",
    },
    {
      _type: "richTextSection",
      _key: "philosophy",
      heading: "Hoe we werken",
      body: pt(`
- **Uitlezen, niet aannemen.** We baseren conclusies op de configuratie zoals die is, verzameld via de Microsoft Graph API.
- **Onafhankelijk.** We verkopen geen licenties en nemen geen beheer over. Ons advies hangt niet af van wat er daarna verkocht wordt.
- **Eerlijk over zekerheid.** We scheiden vaststellingen van aanwijzingen en benoemen wat we niet kunnen vaststellen.
- **Herhaalbaar.** Dezelfde werkwijze voor elke omgeving, zodat uitkomsten vergelijkbaar en controleerbaar zijn.
- **Aanvullend.** We werken naast je eigen team, je MSP en de tools die je gebruikt, zoals beheerplatforms voor multi-tenant omgevingen.
`),
    },
    {
      _type: "ctaSection",
      _key: "cta",
      heading: "Kennismaken?",
      body: "Een gesprek over je omgeving en je vraag, zonder verplichtingen.",
      primary: { label: "Plan een kennismaking", href: "/contact?onderwerp=kennismaking", event: "scheduling_link_clicked" },
    },
  ],
};

const LEGAL_NOTE = "Concepttekst. Laat deze pagina juridisch controleren voordat de site live gaat.";

const privacy: Page = {
  _id: "page.privacy",
  slug: "privacy",
  title: "Privacyverklaring",
  intro: LEGAL_NOTE,
  updatedAt: "2026-11-01",
  seo: { title: "Privacyverklaring", description: "Hoe YellowBlocks omgaat met persoonsgegevens die via deze website worden verwerkt." },
  sections: [
    {
      _type: "richTextSection",
      _key: "body",
      heading: "Persoonsgegevens op deze website",
      body: pt(`
YellowBlocks (KvK 93533985) is verantwoordelijk voor de verwerking van persoonsgegevens via deze website.

## Contactformulier

Als je het contactformulier invult, verwerken we je naam, zakelijk e-mailadres, bedrijfsnaam, het onderwerp en je bericht. We gebruiken deze gegevens alleen om je vraag te beantwoorden en een eventueel vervolg af te stemmen. Grondslag: je verzoek om contact (precontractuele maatregelen) en ons gerechtvaardigd belang om op vragen te reageren.

Het formulier wordt per e-mail afgeleverd via een transactionele e-maildienst. **[Aanvullen: naam van de dienst, vestigingsland en doorgiftegrondslag.]**

We bewaren contactverzoeken niet langer dan nodig, en uiterlijk **[aanvullen: termijn]** na het laatste contact, tenzij er een opdracht uit voortkomt.

## Klantgegevens uit assessments

Via de website verzamelen we geen configuratie- of omgevingsgegevens. Gegevens voor een assessment worden alleen verwerkt binnen een opdracht, op basis van vooraf gemaakte afspraken en een verwerkersovereenkomst waar dat nodig is.

## Websitestatistieken

**[Aanvullen op basis van de gekozen analytics-configuratie.]** Analytische cookies worden alleen geplaatst na toestemming. Zie de [cookieverklaring](/cookies).

## Hosting en logbestanden

De website wordt gehost bij **[aanvullen: hostingpartij]**. Daarbij worden technische gegevens zoals IP-adressen tijdelijk verwerkt voor beveiliging en het voorkomen van misbruik.

## Je rechten

Je kunt ons vragen om inzage, correctie of verwijdering van je gegevens, en bezwaar maken tegen de verwerking. Neem daarvoor contact op via het [contactformulier](/contact). Je hebt ook het recht een klacht in te dienen bij de Autoriteit Persoonsgegevens.
`),
    },
  ],
};

const cookies: Page = {
  _id: "page.cookies",
  slug: "cookies",
  title: "Cookieverklaring",
  intro: LEGAL_NOTE,
  updatedAt: "2026-11-01",
  seo: { title: "Cookieverklaring", description: "Welke cookies yellowblocks.nl gebruikt en hoe je je voorkeuren beheert." },
  sections: [
    {
      _type: "richTextSection",
      _key: "body",
      heading: "Welke cookies we gebruiken",
      body: pt(`
## Functionele cookies

- \`yb_consent\` onthoudt je keuze over analytische cookies, maximaal 180 dagen. Alleen aanwezig als analytische cookies zijn ingeschakeld op deze site.
- \`__prerender_bypass\` wordt alleen geplaatst bij redacteuren die conceptinhoud bekijken.

## Analytische cookies

Analytische cookies plaatsen we alleen na je toestemming. Weiger je, dan wordt er niets geladen. Je kunt je keuze altijd wijzigen via "Cookie-instellingen" onderaan elke pagina.

**[Aanvullen op basis van de gekozen analytics-configuratie: dienst, cookienamen en bewaartermijnen.]**

## Geen marketingcookies

Deze website gebruikt geen advertentie- of trackingcookies van derden.
`),
    },
  ],
};

const terms: Page = {
  _id: "page.voorwaarden",
  slug: "voorwaarden",
  title: "Voorwaarden en juridische informatie",
  intro: LEGAL_NOTE,
  updatedAt: "2026-11-01",
  seo: { title: "Voorwaarden en juridische informatie", description: "Bedrijfsgegevens van YellowBlocks, de voorwaarden voor opdrachten en hoe prijzen op deze website bedoeld zijn." },
  sections: [
    {
      _type: "richTextSection",
      _key: "body",
      heading: "Bedrijfsgegevens",
      body: pt(`
- Handelsnaam: YellowBlocks
- KvK-nummer: 93533985
- Btw-nummer: NL005026448B28
- Telefoon: +31 6 55 108 372
- Vestigingsadres: **[aanvullen]**

## Opdrachten

Op opdrachten zijn de voorwaarden van toepassing die bij de offerte worden meegestuurd. **[Aanvullen: verwijzing naar of tekst van de algemene voorwaarden.]**

## Inhoud van deze website

De informatie op deze website is met zorg samengesteld, maar is algemeen van aard en geen advies voor een specifieke situatie. Voorbeelden van bevindingen zijn illustratief en gebaseerd op fictieve gegevens.
`),
    },
  ],
};

export const pages: Page[] = [home, methodology, about, privacy, cookies, terms];
