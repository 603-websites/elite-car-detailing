# Elite Detailing — Static Marketing Site

Luxury auto detailing marketing site for the New England area. The site is **for-sale inventory** as of 2026-05-17 — the original Supabase-backed booking and SMS-reminder backend has been removed and the site is now a fully static React (Vite) SPA hosted on Cloudflare Pages.

## What's here

- React 19 + Vite SPA: services, pricing, gallery, team, booking calculator, contact.
- Booking form: collects service / date / time / customer details and opens the user's email client (`mailto:` to `info@elitedetailing.team`) prefilled with the request. No backend.
- Contact form: same `mailto:` pattern.
- Tailwind CSS, Framer Motion, React Router, react-datepicker.

## What was removed in the static migration

- `api/*` — Vercel serverless functions for bookings, SMS, email, Telnyx webhook.
- `src/lib/{supabase,bookingService,email}.js`.
- `@supabase/supabase-js`, `resend`, `validator` deps.
- `vercel.json`, `debug-env.js`, `test-supabase.js`, `.env.example`.
- Setup docs and DB schema SQL.

## Run locally

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # outputs to dist/
npm run preview  # serve dist/ locally
```

## Deploy

Pushing to `main` triggers `.github/workflows/deploy.yml`, which builds the SPA and deploys `dist/` to Cloudflare Pages (project: `elite-car-detailing`).

Required GitHub Actions secrets on the repo:

- `CLOUDFLARE_API_TOKEN` — create at <https://dash.cloudflare.com/profile/api-tokens> using the "Edit Cloudflare Workers" template.
- `CLOUDFLARE_ACCOUNT_ID` — found in the Cloudflare dashboard sidebar.

Security headers and SPA fallback are configured via root-level `_headers` and `_redirects`, copied into `dist/` during the deploy step.

## For the buyer

If you've acquired this codebase: the booking flow is intentionally email-based (no server required). To re-add a real backend, the cleanest path is Cloudflare Workers + D1/KV/Hyperdrive — there is no Vercel- or Supabase-specific coupling left in this repo.
