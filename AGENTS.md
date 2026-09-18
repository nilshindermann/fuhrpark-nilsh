<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

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

In `design/` liegen ausserdem vier statische HTML-Entwürfe (Landingpage und
Detailseite, je Desktop und Mobile). Sie sind die visuelle Vorlage für Layout,
Abstände und Hierarchie — **nicht** zum Übernehmen: die Inline-Styles dort sind
Artefakt des Entwurfstools. Im Code wird das mit shadcn und Tailwind gebaut.

### Farben

- Seitenhintergrund ist `background` (surface), Karten und Panels sind `card`
  (surface-raised).
- Fliesstext und Titel in `foreground` (ink), Metadaten und Hilfetext in
  `muted-foreground` (ink-muted).
- `primary` (#66DA66) ist **Füllfarbe** für Buttons, aktive Zustände und
  Akzente — nie Textfarbe, der Kontrast reicht nicht.
- Text auf einer `primary`-Fläche ist `foreground` (dunkel), **nie weiss**.
- Für grünen Text, Links, Icons und Fokusringe gibt es `brand-text` (#167C36).
- `border` ist eine dezente Trennlinie für Karten und Listen, kein funktionaler
  Rand. Interaktive Ränder und Fokusringe nutzen `brand-text` / `ring`.
- Kein Dark Mode. Wenn einer dazukommt, wird er im Design system definiert,
  nicht hier erfunden.

### Form und Abstand

- Ecken gerundet, aber nie voll rund: `radius-sm` (6px) für Badges und Tags,
  `radius-md` (10px) für Buttons und Inputs, `radius-lg` (16px) für Karten und
  Panels. **Kein Element bekommt einen Pill-Radius.**
- Abstände 4/8/16/24px. Kartenpadding 16px, Abstand zwischen Karten 24px.
- Gruppen von Elementen mit flex/grid und `gap` layouten, nicht mit Margins
  pro Kind.

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
- Zahlen und Daten in Schweizer Formatierung: 12'450 km, 18.09.2026, CHF 89.–.
  Dafür gibt es `lib/format.ts` — Zahlen nie von Hand formatieren.
- Keine erfundenen Fahrzeugdaten. Fehlt eine Angabe (Getriebe, Farbe, MFK,
  Ausstattung), bleibt das Feld leer und der Abschnitt wird nicht gerendert —
  kein Platzhaltertext im Produktivcode.

## Datenmodell

`lib/vehicles.ts` hält Typ und Bestand. `forSale` ist der einzige Schalter, der
das Verkaufs-UI steuert: Badge, Preisblock, Preis-Panel und Kontaktformular auf
der Detailseite. Fahrzeuge ohne `forSale` zeigen nichts davon.

## Arbeitsweise

- Vor einer neuen Komponente prüfen, ob shadcn sie schon hat (Card, Badge,
  Button, Input, Form, Carousel …). Eigene Komponenten sind Zusammenbauten
  daraus, keine Neuimplementierungen.
- Zugänglichkeit ist nicht optional: echte `<button>`, `<a href>`, `<input>` mit
  `<label>`, `aria-label` auf Icon-Buttons, Touch-Ziele mindestens 44px.
- Kleine Änderungen bleiben klein — nicht ungefragt umbauen, was nicht Teil der
  Aufgabe ist.
