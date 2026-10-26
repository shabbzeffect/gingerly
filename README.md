# Gingerly Designs and Fabrics

Bespoke bridal and occasion wear atelier, Nairobi. Built with Next.js 14+, TypeScript, Tailwind CSS, and Prisma.

## Overview

Gingerly Designs and Fabrics is Nairobi's celebrated bespoke fashion house. This website is her digital home — serving Kenyan clients and diaspora brides in London, Sydney, and beyond through virtual consultations and fittings.

## Tech stack

| Layer | Technology |
|-------|------------|
| Framework | Next.js 14 (App Router), React, TypeScript |
| Styling | Tailwind CSS |
| ORM / DB | Prisma + PostgreSQL |
| Auth | Custom session-based admin auth (httpOnly cookies) |
| Email | Resend / SMTP / log (configurable) |
| Storage | Local filesystem or S3-compatible object storage |
| Forms | Zod validation + server actions (API routes) |

## Getting started

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment

Copy `.env.example` to `.env.local` and fill in your values:

```bash
cp .env.example .env.local
```

Required variables:

| Variable | Description |
|----------|-------------|
| `DATABASE_URL` | PostgreSQL connection string |
| `NEXTAUTH_SECRET` | Random string for session signing |
| `NEXTAUTH_URL` | Your site URL (e.g. `http://localhost:3000`) |
| `ADMIN_EMAIL` | Admin login email |
| `ADMIN_PASSWORD` | Admin login password |
| `EMAIL_PROVIDER` | `log` (default), `resend`, `smtp`, or `none` |
| `RESEND_API_KEY` | Required if using Resend |
| `ATELIER_EMAIL` | Email address that receives enquiries |
| `STORAGE_BACKEND` | `local` (default) or `s3` |
| `S3_*` | Only required if using S3 storage |
| `WHATSAPP_NUMBER` | Country code without `+` (used in WhatsApp links) |
| `BRAND_EMAIL`, `BRAND_PHONE`, `STUDIO_LOCATION` | Contact details |

All contact details, WhatsApp number, and service settings are editable in the admin area at `/admin/settings` — they are **not** hardcoded as real business facts.

### 3. Set up the database

```bash
# Generate Prisma client
npx prisma generate

# Push schema to database
npx prisma db push

# Seed with sample content (clearly marked as sample)
npx tsx scripts/seed.ts
```

### 4. Create the first admin

```bash
npx tsx -e "
import { createAdmin } from './src/lib/auth';
createAdmin(process.env.ADMIN_EMAIL!, process.env.ADMIN_PASSWORD!, 'Administrator');
"
```

Or set `ADMIN_EMAIL` and `ADMIN_PASSWORD` in `.env.local` and run the seed script.

### 5. Run the dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project structure

```
src/
  app/                  # Next.js App Router pages
    page.tsx            # Homepage
    lookbook/           # Lookbook listing + [slug] project pages
    services/           # Bespoke services
    book/               # Multi-step consultation booking
    virtual-fittings/   # Virtual fitting suite
    rentals/            # Rental catalogue / enquiry
    about/              # About the atelier
    journal/            # Editorial blog
    contact/            # Contact page
    privacy/            # Privacy policy (template)
    terms/              # Terms & conditions (template)
    not-found.tsx       # 404 page
    admin/              # Admin atelier (protected by middleware)
      login/            # Admin sign in
      dashboard/        # Stats overview
      enquiries/        # Consultation enquiry management
      lookbook/         # Lookbook project management
      services/         # Service management
      faqs/             # FAQ management
      rentals/          # Rental item management
      settings/         # Brand & contact settings
    api/                # API routes
      enquiry/          # POST consultation enquiry
      virtual-fitting/  # POST virtual fitting submission
      upload/           # POST private file upload
      contact/          # POST contact message
      rental-enquiry/   # POST rental enquiry
      auth/             # login, logout, session
      storage/private/  # Private file access (admin only)
      admin/            # Admin data API
  components/
    layout/             # Header, footer, admin layout
    sections/           # Homepage sections (hero, collections, craftsmanship, etc.)
    ui/                 # shadcn-style primitives (button, card, dialog, etc.)
  lib/
    prisma.ts           # Prisma client singleton
    auth.ts             # Session-based admin auth (bcrypt replacement: crypto.scrypt)
    storage.ts          # Private file upload (local / S3)
    email.ts            # Transactional email (Resend / SMTP / log / none)
    validations.ts      # Zod schemas
    utils.ts            # cn(), formatKes(), slugify(), timeZones(), formatEventDate()
    admin-auth.ts       # Server-side admin auth middleware helper
prisma/
  schema.prisma         # Database schema
scripts/
  seed.ts               # Sample data seed (marked sample/inspiration)
```

## Key design decisions

### Admin auth (not NextAuth)

A custom session-based auth system is used for the admin atelier. Sessions are stored in PostgreSQL with httpOnly cookies. Passwords are hashed using Node's built-in `crypto.scrypt` (no bcrypt dependency required). Middleware at `src/middleware.ts` protects `/admin/*` routes.

### Private file storage

Client reference images and measurement files are uploaded to private storage (`storage/private/` by default, or S3). Access is restricted to authenticated admins via signed/private URLs. Public clients never see direct file paths.

### Time-zone intelligence

The booking form captures the client's time zone (Nairobi, London, Sydney, New York) and displays times in the visitor's local time. No calendar slots are double-booked server-side when live availability is configured.

### M-Pesa first

M-Pesa (Daraja API) support is configured via environment variables but not wired into payment buttons by default. No nonfunctional payment buttons are displayed. Enable in `.env.local` with `MPESA_*` credentials when ready.

### Sample content vs. verified content

All seed data (lookbook images, ceremony descriptions, FAQs, rental items) is clearly marked as **sample/inspiration content**. It must be replaced with authentic brand photography and owner-verified information before launch. Rental items default to `active: false` and `available: false`.

### Accessibility

WCAG 2.2 AA targets: keyboard navigation, visible focus states, labelled controls, sufficient contrast, reduced-motion support (`prefers-reduced-motion`), and semantic HTML.

## Admin access

- URL: `/admin/login`
- Credentials: the email/password set via `ADMIN_EMAIL` / `ADMIN_PASSWORD` environment variables (or created via `createAdmin`)
- Role-based: `ADMIN` (full access) and `EDITOR` roles supported in schema

## Image replacement

Replace files in `public/images/`:
- `placeholder-hero.svg` — homepage hero
- `placeholder-collection.svg` — collection cards / lookbook fallback
- `placeholder-atelier.svg` — atelier workspace

Lookbook images uploaded via the admin are stored privately and served through `/api/storage/private/[...path]`.

## Integrations (enable when credentials are verified)

| Integration | Env vars | Notes |
|-------------|----------|-------|
| M-Pesa (Daraja) | `MPESA_CONSUMER_KEY`, `MPESA_CONSUMER_SECRET`, `MPESA_SHORTCODE`, `MPESA_PASSKEY`, `MPESA_ENVIRONMENT` | STK push for local payments |
| Stripe | `STRIPE_SECRET_KEY` | Diaspora deposits |
| PayPal | `PAYPAL_CLIENT_ID`, `PAYPAL_SECRET` | Diaspora deposits |
| Resend | `RESEND_API_KEY`, `RESEND_FROM` | Transactional email |
| SMTP | `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS` | Alternative email |
| WhatsApp | `WHATSAPP_NUMBER` | Click-to-chat links |
| Zoom | `ZOOM_ACCOUNT_ID`, `ZOOM_CLIENT_ID`, `ZOOM_CLIENT_SECRET` | Virtual fitting video calls |
| Cal.com | `CAL_COM_API_KEY`, `CAL_COM_EVENT_TYPE_ID` | Calendar availability |

## Testing

- Enquiry flow: submit a consultation at `/book` — check it appears in `/admin/enquiries`
- Booking conflict prevention: server-side validation in `/api/enquiry`
- Time-zone behaviour: select London/Sydney in the booking form — times display in local time
- Admin permissions: log out, try accessing `/admin/dashboard` — should redirect to `/admin/login`
- Private file access: upload a reference image via enquiry — verify it's not publicly accessible without admin session

## Deployment

### Vercel

```bash
vercel
```

Set all environment variables in the Vercel dashboard. Add a PostgreSQL database (Vercel Postgres or external).

### Docker / self-hosted

Build with `npm run build` and start with `npm start`. Ensure `DATABASE_URL` points to a provisioned PostgreSQL instance.

## Pre-launch checklist

### Fully functional
- [ ] Homepage with hero, collections, craftsmanship, commission process, virtual fittings CTA
- [ ] Lookbook with filtering and lightbox
- [ ] Consultation booking wizard (multi-step, validation, success state)
- [ ] Virtual fittings page with measurement guide
- [ ] Contact form
- [ ] Admin atelier: login, dashboard, enquiries, lookbook, services, FAQs, rentals, settings
- [ ] Private file upload with authorization
- [ ] Email notifications (when provider configured)
- [ ] Middleware protecting admin routes
- [ ] WCAG-focused markup, focus states, reduced-motion support

### Needs credentials or authentic brand assets
- [ ] Replace `public/images/placeholder-*.svg` with real photography
- [ ] Configure `RESEND_API_KEY` or SMTP for email
- [ ] Configure `MPESA_*` for M-Pesa payments
- [ ] Configure `STRIPE_*` / `PAYPAL_*` for diaspora deposits
- [ ] Configure `WHATSAPP_NUMBER` with a real number
- [ ] Replace all seed content with owner-verified lookbook images, ceremony descriptions, and FAQs

### Business must confirm before launch
- [ ] Rental availability, pricing, deposits, and terms (currently disabled by default)
- [ ] Consultation fee model (free vs paid — admin configurable)
- [ ] Physical studio address (currently "By appointment, Nairobi, Kenya")
- [ ] Phone number and email (currently placeholder values in `.env.example`)
- [ ] Privacy policy and terms reviewed by legal counsel (templates provided)
- [ ] Kenyan data protection compliance review (measurements, photos, personal data)
- [ ] Calendar availability integration (Cal.com or custom scheduler)

## License

Proprietary — Gingerly Designs and Fabrics.