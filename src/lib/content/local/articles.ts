import type { Article, Author } from "../types";
import { pt } from "./pt";

const sander: Author = {
  name: "Sander Rozemuller",
  role: "oprichter van YellowBlocks",
  url: "https://rozemuller.com",
};

/**
 * Seed articles. Written for YellowBlocks as original content (not copied from
 * rozemuller.com). Review before publishing: see docs/approval-checklist.md.
 */
export const articles: Article[] = [
  {
    _id: "article.conditional-access-verwachte-bescherming",
    slug: "conditional-access-verwachte-bescherming",
    status: "published",
    title: "Waarom een Conditional Access-configuratie niet altijd de verwachte bescherming biedt",
    excerpt:
      "Conditional Access beoordeelt bij elke aanmelding alle policies die van toepassing zijn. De bescherming zit in de optelsom, en die optelsom is lastiger te overzien dan de lijst policies doet vermoeden.",
    topics: ["Conditional Access", "Microsoft Entra"],
    author: sander,
    publishedAt: "2026-11-01",
    updatedAt: "2026-11-01",
    readingMinutes: 6,
    relatedSolutions: ["conditional-access-assessment"],
    seo: {
      title: "Waarom Conditional Access niet altijd beschermt",
      description:
        "Conditional Access-policies werken samen, niet los van elkaar. Over uitzonderingen, afhankelijkheden en het verschil tussen policies hebben en beschermd zijn.",
    },
    body: pt(`
Wie het Conditional Access-overzicht in Microsoft Entra opent, ziet een lijst policies. Elk met een naam, een status en een handvol voorwaarden. Het is verleidelijk om die lijst te lezen als een checklist: MFA voor beheerders, staat aan. Legacy authentication blokkeren, staat aan. Compliant apparaat voor Microsoft 365, staat aan.

Maar zo werkt Conditional Access niet. Bij elke aanmelding verzamelt Entra alle policies die op dat moment van toepassing zijn, op basis van gebruiker, applicatie, locatie, apparaat en risico. Een blokkade wint altijd. Voor de overige policies geldt dat aan alle grant controls voldaan moet worden. De bescherming die een gebruiker ervaart, is dus het resultaat van een combinatie. Niet van één policy.

## Policies zijn regels, scenario's zijn de werkelijkheid

Een nuttiger vraag dan "welke policies hebben we?" is: "wat gebeurt er als deze gebruiker, vanaf dit apparaat, op deze plek, deze applicatie opent?" Dat is een scenario. En scenario's laten zich niet aflezen uit één scherm.

Neem een beheerder die vanaf een privélaptop de Intune-beheerportal opent. Welke policies zijn van toepassing? Hangt af van de rol, de groepslidmaatschappen, of de beheerportal als doel-app is opgenomen, of de locatie als vertrouwd geldt en of er ergens een uitsluiting tussen zit. Pas als je al die variabelen combineert, weet je of MFA wordt afgedwongen, of een compliant apparaat vereist is, of geen van beide.

## Drie plekken waar de verwachting en de werkelijkheid uit elkaar lopen

### Uitzonderingen

Uitsluitingen gaan in Conditional Access altijd voor op insluitingen. Een account in een uitgesloten groep valt buiten de policy, ook als het via een andere groep wel binnen de scope valt. Uitzonderingen zijn soms terecht: emergency access-accounts horen bijvoorbeeld buiten de meeste policies te vallen. Maar elke uitzondering verdient een eigenaar, een reden en een einddatum.

### Afhankelijkheden

Een eis als "apparaat moet als compliant gemarkeerd zijn" verplaatst de vraag naar Intune. Is de compliance-policy aan het juiste apparaat toegewezen? Hoe gaat de tenant om met apparaten zonder compliance-policy? Voldoet een apparaat dat buiten elke toewijzing valt toch? Conditional Access vertrouwt op dat signaal, en het signaal is zo goed als de inrichting erachter.

### Named locations

Een named location die als vertrouwd is gemarkeerd, wordt vaak gebruikt om MFA op kantoor over te slaan. Klopt de IP-reeks nog na een verhuizing, een nieuwe provider of de overstap naar een cloudproxy? Een te ruime reeks maakt van een gemaksfunctie een opening.

## Wat je zelf kunt doen

- Beschrijf je belangrijkste scenario's in gewone taal, voordat je naar policies kijkt.
- Gebruik de **What If**-tool in Entra om een scenario na te lopen voor een specifieke gebruiker en context.
- Zet nieuwe of gewijzigde policies eerst in **report-only** en kijk in de sign-in logs wat het effect zou zijn.
- Houd bij elke uitzondering bij waarom die bestaat, en controleer periodiek of de reden nog geldt.

> Een policy die aanstaat is een intentie. Pas als je weet welke scenario's die intentie werkelijk afdekt, weet je hoe beschermd je bent.

## Waar een onafhankelijke blik helpt

Wie een omgeving dagelijks beheert, kent de geschiedenis van elke policy. Dat is waardevol, maar maakt het ook lastig om de optelsom fris te bekijken. Een externe analyse begint bij de configuratie zoals die is, niet zoals die bedoeld was, en maakt de verschillen bespreekbaar. Daarvoor is het [Conditional Access Assessment](/oplossingen/conditional-access-assessment) bedoeld.
`),
  },
  {
    _id: "article.verborgen-risicos-conditional-access-exclusions",
    slug: "verborgen-risicos-conditional-access-exclusions",
    status: "published",
    title: "De verborgen risico's van Conditional Access-exclusions",
    excerpt:
      "Uitzonderingen in Conditional Access zijn vaak terecht en bijna altijd tijdelijk bedoeld. Wat er gebeurt als ze blijven staan, en hoe je ze beheersbaar houdt.",
    topics: ["Conditional Access", "Governance"],
    author: sander,
    publishedAt: "2026-10-20",
    updatedAt: "2026-11-01",
    readingMinutes: 5,
    relatedSolutions: ["conditional-access-assessment"],
    seo: {
      title: "Risico's van Conditional Access-exclusions",
      description:
        "Waarom uitzonderingen in Conditional Access zich opstapelen, hoe ze onbedoelde toegangsroutes openen en hoe je ze beheersbaar houdt.",
    },
    body: pt(`
Bijna elke Conditional Access-omgeving heeft ze: groepen en accounts die buiten een policy vallen. Een migratiegroep, een serviceaccount voor een oude koppeling, een paar gebruikers die op reis problemen hadden met MFA. Op het moment zelf was elke uitzondering verdedigbaar.

Het probleem is niet de uitzondering. Het probleem is dat niemand haar terugziet.

## Uitsluiten gaat voor insluiten

In Conditional Access wint een uitsluiting altijd. Als een gebruiker via een groep binnen de scope van een policy valt, maar via een andere groep is uitgesloten, dan geldt de policy niet. Dat maakt uitsluitingen krachtig, en het maakt het effect van groepslidmaatschap lastig te overzien.

Een groep die ooit is aangemaakt voor tien migratieaccounts, kan twee jaar later dertig leden hebben. Sommige daarvan hebben inmiddels een beheerdersrol gekregen. In het Conditional Access-scherm is daar niets van te zien: de policy toont nog steeds dezelfde uitgesloten groep.

## Drie patronen die we vaak tegenkomen

- **Tijdelijke uitzonderingen zonder einddatum.** Bedoeld voor een project, nooit opgeruimd.
- **Uitzonderingen per policy in plaats van per scenario.** Dezelfde groep is uitgesloten van MFA, van de apparaat-eis en van de locatie-policy. Opgeteld valt die groep buiten vrijwel alle bescherming.
- **Geneste groepen.** De uitgesloten groep bevat andere groepen, waardoor het werkelijke aantal accounts moeilijk zichtbaar is.

## Terechte uitzonderingen

Niet elke uitzondering is een risico. Emergency access-accounts horen buiten de meeste policies te vallen, zodat je niet buitengesloten raakt als een policy verkeerd uitpakt. Ook sommige technische accounts hebben een aparte aanpak nodig. Het verschil zit in de onderbouwing: een terechte uitzondering is gedocumenteerd, beperkt en wordt bewaakt. Voor emergency access-accounts betekent dat onder meer monitoring op elke aanmelding.

## Uitzonderingen beheersbaar houden

1. Geef elke uitsluiting een eigenaar en een reden, vastgelegd buiten het Conditional Access-scherm.
2. Gebruik toegewezen groepen met een duidelijke naam per uitzondering, geen bestaande organisatiegroepen.
3. Plan een periodieke review van het lidmaatschap, bijvoorbeeld met access reviews.
4. Controleer bij elke rolwijziging of het account in een uitgesloten groep zit.

> De vraag is niet of je uitzonderingen hebt, maar of je weet wie erdoor valt en waarom.

Wil je weten welke accounts in jouw omgeving buiten de bedoelde bescherming vallen? De [Conditional Access Assessment](/oplossingen/conditional-access-assessment) volgt elke uitzondering tot de accounts en scenario's die erdoor geraakt worden.
`),
  },
  {
    _id: "article.wat-vertelt-een-intune-compliance-percentage",
    slug: "wat-vertelt-een-intune-compliance-percentage",
    status: "published",
    title: "Wat vertelt een Intune compliance-percentage eigenlijk?",
    excerpt:
      "85% compliant klinkt redelijk. Maar het percentage zegt niets over de apparaten die buiten de meting vallen, en weinig over de reden dat de rest afwijkt.",
    topics: ["Microsoft Intune", "Compliance"],
    author: sander,
    publishedAt: "2026-10-06",
    updatedAt: "2026-11-01",
    readingMinutes: 5,
    relatedSolutions: ["microsoft-365-health-check"],
    seo: {
      title: "Wat zegt een Intune compliance-percentage?",
      description:
        "Een compliance-percentage in Intune is een begin, geen conclusie. Over apparaten buiten de meting, toewijzingsfilters en de vraag waarom apparaten afwijken.",
    },
    body: pt(`
Het Intune-dashboard meldt dat 85% van de Windows-apparaten compliant is. Is dat goed? Het eerlijke antwoord: dat weet je pas als je weet wat er gemeten wordt, en waarom de overige 15% afwijkt.

## Wat er in de noemer zit

Een percentage heeft een teller en een noemer. De noemer is het aantal apparaten dat Intune beoordeelt. Apparaten die geen compliance-policy toegewezen hebben gekregen, worden niet tegen jouw eisen getoetst. Hoe Intune ze vervolgens markeert, hangt af van de tenantinstelling voor apparaten zonder toegewezen compliance-policy. Staat die op compliant, dan tellen ze mee als in orde, zonder dat er iets is gecontroleerd.

Sander schreef eerder uitgebreid over hoe je dit onderzoekt: [Why does this Intune device have no compliance policy assigned](https://rozemuller.com/why-does-this-intune-device-have-no-compliance-policy-assigned/).

## Waarom apparaten afwijken

Het dashboard toont dat een apparaat niet compliant is, en welke instelling niet voldoet. De reden waarom zit vaak ergens anders:

- **Toewijzingsfilters.** Een filter op OS-versie of model sluit apparaten uit die je wel bedoelde mee te nemen, of juist niet.
- **Dynamische groepen.** Een regel op een apparaatattribuut dat na een herinstallatie of naamswijziging niet meer klopt.
- **Conflicterende policies.** Twee compliance-policies met verschillende eisen voor dezelfde apparaten.
- **Grace periods en verouderde check-ins.** Apparaten die lang niet zijn ingecheckt, met een status die niet meer actueel is.

## Van percentage naar oorzaak

Vijftien procent niet-compliant kan één oorzaak hebben of vijftien verschillende. Als honderden apparaten dezelfde OS-build delen en allemaal net buiten een filter vallen, is dat één bevinding met één oplossing. Een lijst van honderden losse apparaten verbergt dat.

> Een percentage is een waarneming. De vraag die ertoe doet is waarom, en wat het gevolg is.

En dat gevolg reikt verder dan Intune. Als Conditional Access een compliant apparaat vereist, bepaalt dit signaal wie toegang krijgt tot Microsoft 365. Een apparaat dat ten onrechte als compliant telt, krijgt toegang die je niet bedoelde. Een apparaat dat ten onrechte niet compliant is, levert een gebruiker op die niet kan werken.

## Wat je zelf kunt controleren

1. Controleer hoe de tenant apparaten zonder compliance-policy markeert.
2. Vergelijk het totaal aantal beheerde apparaten met het aantal dat een compliance-policy heeft.
3. Groepeer niet-compliant apparaten op OS-versie, model en toewijzing, in plaats van ze één voor één te bekijken.
4. Kijk welke Conditional Access-policies op compliance leunen, en voor welke gebruikers.

Wil je dit soort verbanden voor je hele omgeving in beeld? Daarvoor is de [Microsoft 365 Health Check](/oplossingen/microsoft-365-health-check).
`),
  },
];
