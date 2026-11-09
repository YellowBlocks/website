# Te bevestigen vóór livegang

Alles hieronder staat in de site, maar is niet door YellowBlocks bevestigd of hangt af van externe gegevens. In ontwikkel- en previewomgevingen zijn deze punten zichtbaar gemarkeerd ("Ter goedkeuring"). Zet `NEXT_PUBLIC_SHOW_REVIEW_MARKERS=1` om ze ook op een productie-build te zien.

## Commercieel
- [x] **Prijzen verwijderd** (9 nov 2026). De diensten tonen geen prijs of "op offerte" meer, alleen "Neem contact op". Het prijsblok (pricingSection) blijft beschikbaar in de CMS voor later.
- [ ] Opleveringen van beide assessments: klopt de lijst met wat je echt levert?
- [ ] FAQ-antwoorden over doorlooptijd ("na de intake een planning") en rechten ("leesrechten, af te stemmen tijdens intake").

## Update 9 november 2026
- [ ] **Slogan "Stay in control"**: staat in de hero, de paginatitel, de footer en het deelplaatje (OG).
- [ ] **Namen van de diensten**: Conditional Access Assessment, Intune Assessment en Microsoft 365 Health Check. De URL's zijn mee veranderd; de oude adressen sturen door.
- [ ] **Intune Assessment** (nieuw, label "Nieuw"): inhoud, scope, opleveringen en prijsmodel (op offerte) nalezen.
- [ ] **Privacyverklaring voor de assessments**: de tekst uit de Conditional Access-chat aanleveren. Die chat valt buiten dit project, dus de tekst is nog niet verwerkt.
- [ ] **Logo**: het officiële logo staat erin. Op de donkere achtergrond is het grijs van "Yellow" (#404040) opgehelderd naar #E6E6E6. Het siteaccent is gelijkgetrokken met het logogeel (#FEC61F).

## Homepage en diensten
- [ ] **Het lagenmodel op de homepage** nalezen: de vijf lagen (Ingesteld, Toegewezen, Werkzaam, Actueel, Aantoonbaar), de koppeling aan inzicht, analyse, (auto)remediatie, monitoring en vastlegging, en de vier stappen van de cyclus.
- [ ] **Automatisch herstel**: de site noemt "automatisch herstel waar dat verantwoord is". Bevestigen dat je dit aanbiedt.
- [ ] **Tenant-continuïteit** (werknaam): naam, inhoud per cyclus, voorgesteld ritme (per kwartaal als voorbeeld) en prijsmodel (vaste prijs per cyclus na intake) bevestigen.
- [ ] Het begrip **volwassenheidsniveau**: de site belooft een meting per domein over de cycli heen. Bevestig dat de scans dat (gaan) opleveren, of zwak de tekst af.
- [ ] **Automatisering als opdracht** (de link "Bespreek je automatiseringsvraag"): bevestigen dat je dit als dienst aanbiedt.
- [ ] Onderwerpen per vakgebied nalopen, vooral App Control for Business, Azure Virtual Desktop, back-up van configuratie en multi-tenant beheer voor MSP's. Alleen laten staan wat je actief aanbiedt.

## Feiten over de oprichter
- [ ] Microsoft MVP: categorie(ën) en jaren toevoegen, of de vermelding zo laten.
- [ ] Bio-teksten (Over YellowBlocks en de homepage).
- [x] Portretfoto aangeleverd (9 nov 2026), staat op de homepage en Over YellowBlocks.
- [ ] Spreekbeurten: niet vermeld, omdat ze niet te verifiëren waren. Aanvullen als je ze wilt tonen.

## Merk
- [ ] Officieel logo (vector) aanleveren. Vervang `src/components/visuals/Wordmark.tsx` en `src/app/icon.svg`. Het huidige merkteken is een tijdelijke interpretatie.
- [ ] Donker thema (neutraal grijs met geel, 5px hoeken) bevestigen, ook in combinatie met het officiële logo: dat moet op een donkere achtergrond werken.
- [ ] Lettertype bevestigen: Figtree als web-alternatief voor Avenir Next. Avenir Next kan via een webfontlicentie in `src/fonts/` worden geplaatst.

## Inhoud
- [ ] De drie artikelen in /inzichten nalezen. Ze zijn nieuw geschreven in Sanders naam.
- [ ] Voorbeeldbevindingen: technisch nalezen (synthetische gegevens, als illustratief gelabeld).
- [ ] Optioneel: een geanonimiseerd voorbeeldrapport (PDF), te activeren met `NEXT_PUBLIC_SAMPLE_REPORT_URL`.

## Juridisch
- [ ] Privacyverklaring, cookieverklaring en voorwaarden juridisch laten controleren. Open plekken zijn **[aanvullen]**: e-maildienst en doorgifte, bewaartermijn, hostingpartij, analytics, vestigingsadres en algemene voorwaarden.
- [ ] Verwerkersovereenkomst met de e-maildienst en de analyticsdienst.

## Configuratie
- [ ] Contactformulier: `RESEND_API_KEY`, `CONTACT_TO_EMAIL` en `CONTACT_FROM_EMAIL` (geverifieerd domein). Zonder deze waarden weigert het formulier in productie te verzenden en toont het het telefoonnummer.
- [ ] Optioneel: een boekingslink (`NEXT_PUBLIC_SCHEDULING_URL`).
- [ ] Analytics-keuze en de bijbehorende tekst in de cookieverklaring.
- [ ] `security.txt`: vervaldatum en contactkanaal bevestigen.
