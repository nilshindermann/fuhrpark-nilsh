## Inhalt & Ton

- Alles auf Deutsch, in der Du-Form: "Deine Fahrzeuge im Überblick" statt "Ihre Fahrzeuge".
- Kurz und sachlich, keine Marketing-Sprache. Ein Status heisst "Bereit" oder "Service fällig", nicht "Alles im grünen Bereich!".
- Zahlen und Daten in Schweizer Formatierung: 12'450 km, 18.09.2026, CHF 89.–.
- Keine Emojis in der Oberfläche.

## Visuelle Grundlagen

- Seitenhintergrund ist `surface`; Karten, Panels und andere erhöhte Flächen sind `surface-raised`.
- Primärtext (Fliesstext, Titel) steht in `ink`; sekundärer Text (Metadaten, Labels, Hilfetext) in `ink-muted`.
- `brand` (#66DA66) ist die Füllfarbe für Buttons, aktive Zustände und Akzente — nie als Textfarbe, dafür ist der Kontrast zu gering.
- `brand-text` ist das dunklere Grün für Links, Icons und Fokusringe auf `surface` und `surface-raised` — hier reicht der Kontrast für Text.
- Text auf einer `brand`-Fläche bleibt `ink` (dunkel), nie Weiss.
- `border` ist eine dezente Trennlinie für Karten und Listen, kein funktionaler Rand. Interaktive Elemente (Buttons, Inputs, Fokusringe) nutzen stattdessen `brand-text`, das genug Kontrast trägt.
- Ecken sind gerundet, aber nie voll rund: `radius-sm` für kleine Elemente wie Badges und Tags, `radius-md` als Standard für Buttons und Inputs, `radius-lg` für Karten und Panels. Kein Element bekommt einen vollen Pill-Radius.
- Abstände folgen `space-1` bis `space-4` (4/8/16/24px); Kartenpadding ist `space-3`, Abstand zwischen Karten `space-4`.
- Schrift ist durchgehend Inter (`sans`): Überschriften mit `heading-xl` / `heading-lg` / `heading-md`, Fliesstext mit `body`, Metadaten mit `body-sm` oder `caption`, Formular-Labels mit `label`.

## Icons

- Automarken-Logos aus [Simple Icons](https://simpleicons.org/), einfarbig in `ink-muted`; bei Hervorhebung (z. B. aktiver Filter) in `brand-text`.
- Alle übrigen UI-Icons aus [Lucide](https://lucide.dev/), Linienstärke 2px (Lucide-Standard) — in `ink-muted`, aktive oder ausgewählte Icons in `brand-text`.
- Kein gefülltes oder buntes Icon-Set — das würde nicht zur reduzierten Palette passen.

## Umsetzung

- Die Website wird mit React und [shadcn/ui](https://ui.shadcn.com/) gebaut. Shadcn-Komponenten (Card, Badge, Carousel, Form …) übernehmen die Farb-, Typografie- und Radius-Tokens oben statt eigener Werte.
- Fahrzeugfotos laufen in einem Carousel (shadcn `Carousel`); Bilder mit `radius-lg`, keine eigene Umrandung.

## Verkaufsstatus

Ist ein Fahrzeug als "zu verkaufen" markiert, zeigt die Detailseite zusätzliche Informationen (z. B. Preis, Zustand) sowie ein Kontaktformular. Für Status-Badge, Info-Panel und Kontaktformular gibt es noch keine eigenen Komponenten — die kommen, sobald reale Screens dafür vorliegen.
