# Fuhrpark — Handoff-Paket

Alles, was Claude Code braucht, um aus dem Entwurf eine echte Seite zu bauen.
Stand 26.09.2026 — enthält Dunkelmodus, die engeren Radien, `on-brand`, das
einheitliche Bildformat, die Bestands-Detailseite und das Foto-Vollbild.

## Inhalt

```
CLAUDE.md                          Designregeln fürs Repo — ins Wurzelverzeichnis
app/tokens.css                     Tokens als shadcn-Variablen, hell + dunkel
lib/vehicles.ts                    Typ Vehicle, Typ Photo, der Bestand (5 Fahrzeuge)
lib/format.ts                      Schweizer Formatierung: 180'000 km, CHF 4'999.–
design/landing-desktop.html        Entwurf Landingpage, 1440px
design/landing-mobile.html         Entwurf Landingpage, 390px
design/detail-verkauf-desktop.html Detailseite Verkaufsfahrzeug, 1440px
design/detail-verkauf-mobile.html  Detailseite Verkaufsfahrzeug, 390px
design/detail-bestand-desktop.html Detailseite Bestandsfahrzeug, 1440px
design/vollbild-desktop.html       Foto im Vollbild, 1440×900
design/tokens.json                 Quelle der Tokens (Design system "Fuhrpark")
design/design-system-README.md     Die Regeln des Design systems im Original
```

Die HTML-Dateien öffnest du direkt im Browser — sie sind eigenständig, ohne
Build, und untereinander verlinkt, du kannst also durchklicken. Sie sind
**Vorlage, nicht Code**: die Inline-Styles stammen aus dem Entwurfstool und
gehören nicht ins Projekt.

## Einbau

1. `CLAUDE.md` ins Wurzelverzeichnis des Repos. Existiert schon eines, den
   Inhalt anhängen statt überschreiben.
2. `design/` komplett ins Repo übernehmen (ruhig als `design/` auf oberster
   Ebene) — Claude Code liest dort nach, wie etwas aussehen soll.
3. Inhalt von `app/tokens.css` in `app/globals.css` übernehmen, nach dem
   Tailwind-Import und nach dem shadcn-Basis-Layer.
4. `lib/vehicles.ts` und `lib/format.ts` in dein `lib/`.

### Tailwind v3 statt v4

`tokens.css` ist für Tailwind v4 geschrieben (`@theme inline`). Bei v3 lässt du
diesen Block weg — `:root` und `.dark` bleiben unverändert — und ergänzt in
`tailwind.config.ts`:

```ts
darkMode: "class",
theme: {
  extend: {
    colors: {
      background: "var(--background)",
      foreground: "var(--foreground)",
      card: { DEFAULT: "var(--card)", foreground: "var(--card-foreground)" },
      popover: { DEFAULT: "var(--popover)", foreground: "var(--popover-foreground)" },
      primary: { DEFAULT: "var(--primary)", foreground: "var(--primary-foreground)" },
      secondary: { DEFAULT: "var(--secondary)", foreground: "var(--secondary-foreground)" },
      muted: { DEFAULT: "var(--muted)", foreground: "var(--muted-foreground)" },
      accent: { DEFAULT: "var(--accent)", foreground: "var(--accent-foreground)" },
      border: "var(--border)",
      input: "var(--input)",
      ring: "var(--ring)",
      "brand-text": "var(--brand-text)",
    },
    borderRadius: { sm: "4px", md: "8px", lg: "12px" },
    fontFamily: { sans: ["Inter", "system-ui", "sans-serif"] },
    aspectRatio: { photo: "3 / 2" },
  },
}
```

## Der erste Prompt

Wenn die Dateien liegen, in Claude Code im Projektverzeichnis:

> Lies CLAUDE.md und die Entwürfe in `design/`. Bau daraus die Landingpage, die
> Detailseite (beide Varianten) und das Foto-Vollbild mit React und shadcn/ui.
>
> Die HTML-Dateien sind die visuelle Spezifikation für Layout, Abstände und
> Hierarchie — übernimm sie nicht als Code. Verwende Card, Badge, Button, Input,
> Form und Dialog aus shadcn, die Tokens aus `app/globals.css` und die Daten aus
> `lib/vehicles.ts`. Zahlen und Daten immer über `lib/format.ts`.
>
> Fang mit den Komponenten an, die Seiten danach. Zeig mir nach den Komponenten
> kurz, was du gebaut hast, bevor du die Seiten zusammensetzt.

Danach in kleinen Schritten weiterarbeiten — eine Komponente oder eine Seite
pro Runde ist besser als "bau alles".

## Was dabei entstehen sollte

Komponenten:

- `VehicleCard` — zwei Varianten über `forSale`: mit Badge, Preis und CTA,
  oder ohne, mit dezentem Details-Link
- `VehicleGrid` — zweispaltig für Verkaufsfahrzeuge, dreispaltig für den
  Bestand, einspaltig auf Mobile
- `Hero` — Eyebrow, Titel, Lead, Meta-Zeile, ein primärer Button
- `PhotoFrame` — die 3:2-Fläche: Bild mit `object-fit: cover`, oder
  Platzhalter, wenn `photos` leer ist. Jede Bildfläche ausser dem Vollbild
  läuft darüber; so bleibt das Format an einer Stelle definiert.
- `VehicleGallery` — Hauptfoto plus Thumbnails, öffnet das Vollbild
- `PhotoLightbox` — shadcn `Dialog` auf dunklem Grund, Bild mit
  `object-fit: contain` im Originalformat, Zähler, Vorwärts/Zurück,
  Thumbnail-Leiste mit den echten Formaten; Escape schliesst, Pfeiltasten
  blättern, Fokus bleibt im Dialog
- `SpecTable` — die Eckdaten-Liste, überspringt leere Felder
- `FeatureList` — Ausstattung mit Häkchen, rendert nichts bei leerem Array
- `PricePanel` — Preis, Hinweis, CTA; auf Mobile über dem Inhalt, auf Desktop
  in der rechten Spalte
- `ContactForm` — Name, E-Mail, Telefon (optional), Nachricht
- `SiteHeader`, `SiteFooter`

Routen: `/` für die Landingpage, `/fahrzeuge/[slug]` für die Detailseite. Die
Detailseite entscheidet über `forSale`, welches der beiden Layouts sie rendert —
zwei Varianten einer Route, keine zwei Routen.

## Offene Punkte

Diese Dinge stehen im Entwurf als markierte Platzhalter und müssen von dir
kommen, bevor die Seite live geht:

- Fahrzeugfotos, mit `width`/`height` pro Bild (das Vollbild braucht die echten
  Masse, um Hochformat ohne Layout-Sprung einzupassen)
- Getriebe, Farbe, letzte MFK je Fahrzeug
- Ausstattung je Fahrzeug (im Entwurf `[AUSSTATTUNG 1–6]`)
- Ausführliche Zustandsbeschreibung der beiden Verkaufsfahrzeuge
- Kontakt-E-Mail, Ort, Impressum
- Wohin das Kontaktformular sendet — Resend, Formspree, eigene Route? Das
  entscheidet, ob die Detailseite eine Server Action braucht.

Technisch offen:

- `destructive` ist im Design system nicht definiert und bleibt vorerst auf dem
  shadcn-Default. Sobald es eine Fehlermeldung oder Löschaktion gibt, gehört
  die Farbe ins Design system, nicht ins Projekt.
- Der Dunkelmodus ist in den Tokens vollständig, aber **nicht gezeichnet** —
  nur das Vollbild nutzt die dunklen Werte. Landing- und Detailseite im
  Dunkelmodus sind ungeprüftes Gebiet: beim Bauen beide Modi durchklicken.
- Das Vollbild ist nur für Desktop entworfen. Auf Mobile braucht es eigene
  Entscheidungen (Wischen statt Pfeilbuttons, Thumbnails ein- oder ausblenden).
