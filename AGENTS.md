# Fuhrpark

Private Website, die meine Fahrzeuge zeigt. Fahrzeuge, die zum Verkauf stehen,
bekommen zusätzlich Preis, Zustand und ein Kontaktformular.

Stack: Next.js, React, Tailwind, shadcn/ui, TypeScript.

## Design system

Verbindlich ist das Design system "Fuhrpark". Die Tokens liegen als
shadcn-Variablen in `app/globals.css`, die Quelle daneben in
`design/tokens.json`. Neue Komponenten verwenden diese Variablen und die
shadcn-Primitives — keine eigenen Hexwerte, keine eigenen Radien, keine
eigenen Schriftgrössen.

In `design/` liegen ausserdem sechs statische HTML-Entwürfe (Landingpage
Desktop und Mobile, Detailseite eines Verkaufsfahrzeugs Desktop und Mobile,
Detailseite eines Bestandsfahrzeugs, Foto-Vollbild). Sie sind die visuelle
Vorlage für Layout, Abstände und Hierarchie — **nicht** zum Übernehmen: die
Inline-Styles dort sind Artefakt des Entwurfstools. Im Code wird das mit shadcn
und Tailwind gebaut.

### Farben

- Seitenhintergrund ist `background` (surface), Karten und Panels sind `card`
  (surface-raised) — im Dunkelmodus etwas heller als der Hintergrund, damit sie
  sich abheben.
- Fliesstext und Titel in `foreground` (ink), Metadaten und Hilfetext in
  `muted-foreground` (ink-muted).
- `primary` (#66DA66) ist **Füllfarbe** für Buttons, aktive Zustände und
  Akzente — nie Textfarbe, der Kontrast reicht nicht. Die Füllung bleibt in
  Hell und Dunkel gleich hell.
- Text auf einer `primary`-Fläche ist `primary-foreground` (on-brand, #12241A) —
  **nicht `foreground` und nicht weiss**, in beiden Modi gleich dunkel.
- Für grünen Text, Links, Icons und Fokusringe gibt es `brand-text` — im
  Hellmodus dunkelgrün, im Dunkelmodus heller.
- `border` ist eine dezente Trennlinie für Karten und Listen, kein funktionaler
  Rand. Interaktive Ränder und Fokusringe nutzen `brand-text` / `ring`.
- **Hell- und Dunkelmodus sind beide definiert.** Jede Komponente muss in
  beiden funktionieren: nur Tokens verwenden, nie eine Farbe hart schreiben.

### Form und Abstand

- Ecken gerundet, aber knapp: `rounded-sm` (4px) für Badges und Tags,
  `rounded-md` (8px) für Buttons und Inputs, `rounded-lg` (12px) für Karten und
  Panels. **Kein Element bekommt einen Pill-Radius.**
- Abstände 4/8/16/24px. Kartenpadding 16px, Abstand zwischen Karten 24px.
- Gruppen von Elementen mit flex/grid und `gap` layouten, nicht mit Margins
  pro Kind.

### Fotos

- **In Karten, Galerien und Thumbnails haben alle Fotos dasselbe
  Seitenverhältnis: 3:2** (`aspect-photo` bzw. `--photo-ratio`), über
  `aspect-ratio` und `object-fit: cover` — nie über fixe Pixelhöhen, damit die
  Fläche mit der Spaltenbreite mitwächst und über alle Seiten gleich aussieht.
- **Im Vollbild gilt das nicht**: dort behält das Foto sein Originalformat,
  auch Hochformat. Es wird eingepasst (`object-fit: contain`), nie
  beschnitten, auf dunklem Grund. Dafür trägt jedes `Photo` seine echten
  `width`/`height` mit.
- Bilder mit `rounded-lg`, keine eigene Umrandung.

### Schrift

Durchgehend Inter. Die Stufen heissen `heading-xl`, `heading-lg`, `heading-md`,
`body`, `body-sm`, `label`, `caption` und stehen als Utility-Klassen bereit
(`text-heading-lg` usw.). Keine Ad-hoc-Grössen wie `text-[19px]`.

Ausnahme aus dem Entwurf: die Hero-Überschrift der Landingpage läuft mit 52px
(Desktop) bzw. 34px (Mobile) bewusst über `heading-xl` hinaus — sie ist der
einzige Ort, an dem das erlaubt ist.

### Icons

Lucide, Strichstärke 2, in `muted-foreground`; aktive oder ausgewählte Icons in
`brand-text`. Automarken-Logos aus Simple Icons, einfarbig. Kein gefülltes oder
buntes Icon-Set. **Keine Emojis in der Oberfläche.**

## Inhalt und Ton

- Alles auf Deutsch, in der Du-Form: "Deine Fahrzeuge im Überblick", nicht
  "Ihre Fahrzeuge".
- Kurz und sachlich, keine Marketing-Sprache. Ein Status heisst "Bereit" oder
  "Service fällig", nicht "Alles im grünen Bereich!".
- Zahlen und Daten in Schweizer Formatierung: 12'450 km, 26.09.2026, CHF 89.–.
  Dafür gibt es `lib/format.ts` — Zahlen nie von Hand formatieren.
- Keine erfundenen Fahrzeugdaten. Fehlt eine Angabe (Getriebe, Farbe, MFK,
  Ausstattung), bleibt das Feld leer und der Abschnitt wird nicht gerendert —
  kein Platzhaltertext im Produktivcode.

## Datenmodell

`lib/vehicles.ts` hält Typ und Bestand. `forSale` ist der einzige Schalter, der
das Verkaufs-UI steuert: Badge, Preisblock, Preis-Panel und Kontaktformular auf
der Detailseite. Bestandsfahrzeuge haben ein eigenes Detail-Layout — Galerie
über die ganze Breite, darunter Eckdaten und Ausstattung nebeneinander — und
eine ruhige Zeile "Dieses Fahrzeug steht nicht zum Verkauf".

## Arbeitsweise

- Vor einer neuen Komponente prüfen, ob shadcn sie schon hat (Card, Badge,
  Button, Input, Form, Carousel, Dialog …). Eigene Komponenten sind
  Zusammenbauten daraus, keine Neuimplementierungen.
- Zugänglichkeit ist nicht optional: echte `<button>`, `<a href>`, `<input>` mit
  `<label>`, `aria-label` auf Icon-Buttons, Touch-Ziele mindestens 44px. Das
  Vollbild braucht Fokusfalle, Escape zum Schliessen und Pfeiltasten zum
  Blättern.
- Kleine Änderungen bleiben klein — nicht ungefragt umbauen, was nicht Teil der
  Aufgabe ist.
