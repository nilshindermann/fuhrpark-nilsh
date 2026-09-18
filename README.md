# Fuhrpark

Private Website, die meine Fahrzeuge zeigt. Fahrzeuge zum Verkauf bekommen
Preis, Zustand und ein Kontaktformular.

Stack: Next.js 16 (App Router), React 19, Tailwind v4, shadcn/ui, TypeScript.
Deployment auf Cloudflare Workers via OpenNext. Die Regeln für Code und
Gestaltung stehen in `AGENTS.md`, das Design system in `src/design/`.

## Entwicklung

```bash
pnpm install
pnpm dev          # http://localhost:3000
pnpm lint
pnpm format
pnpm build
```

## Inhalte pflegen

- Fahrzeuge: `src/lib/vehicles.ts` (`forSale` schaltet das Verkaufs-UI).
- Fotos: Dateien unter `public/` ablegen und in `photos` eintragen, erstes
  Bild ist das Hauptfoto.
- Angaben zur Website (Ort, öffentliche E-Mail, Name fürs Impressum, Stand):
  `src/lib/site.ts`. Leere Felder werden nicht gerendert.

## Kontaktformular

Die Anfrage wird in einer Server Action via [Resend](https://resend.com)
verschickt. Dafür braucht es drei Secrets:

| Variable         | Bedeutung                                             |
| ---------------- | ----------------------------------------------------- |
| `RESEND_API_KEY` | API-Key aus dem Resend-Dashboard                      |
| `CONTACT_TO`     | Empfängeradresse (deine Mailbox)                      |
| `CONTACT_FROM`   | Absender, z. B. `Fuhrpark <fuhrpark@deine-domain.ch>` |

Lokal in `.dev.vars` ablegen (ist in `.gitignore`):

```
RESEND_API_KEY=re_...
CONTACT_TO=du@example.ch
CONTACT_FROM=Fuhrpark <fuhrpark@example.ch>
```

Für Produktion einmalig setzen:

```bash
wrangler secret put RESEND_API_KEY
wrangler secret put CONTACT_TO
wrangler secret put CONTACT_FROM
pnpm cf-typegen
```

Fehlen die Secrets, zeigt das Formular eine Fehlermeldung und sendet nichts.

## Deployment

```bash
pnpm preview   # OpenNext-Build lokal auf dem Workers-Runtime
pnpm deploy
```
