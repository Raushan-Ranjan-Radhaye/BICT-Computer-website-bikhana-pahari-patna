This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

---

## Enquiry emails (Nodemailer)

The enquiry form posts to `POST /api/enquiry`, which sends a formatted HTML +
plain-text email through Nodemailer (`src/app/lib/mailer.ts`).

### Setup

1. Copy `.env.example` to `.env.local` (`.env` also works locally).
2. Fill in the credentials:

   ```env
   GMAIL_USER=youremail@gmail.com
   GMAIL_APP_PASSWORD=xxxx xxxx xxxx xxxx   # 16-char Google App Password
   # optional
   ENQUIRY_TO_EMAIL=admissions@yourdomain.com
   ```

3. The App Password is **not** your Gmail password:
   Google Account → Security → 2-Step Verification → App passwords → generate
   one for "Mail". Use the password shown (spaces can stay or be removed).

Any other SMTP provider also works — set `SMTP_HOST`, `SMTP_PORT`,
`SMTP_SECURE`, `SMTP_USER`, `SMTP_PASS` and the Gmail preset is bypassed.

### Notes

- The transporter is created once and reused across requests.
- Failures are logged server-side with a readable reason (bad credentials,
  blocked SMTP port, rejected message) and the visitor always gets the phone
  number as a fallback.
- The route validates input, silently drops honeypot submissions, and rate
  limits to 5 requests per minute per IP.

### Test it

```bash
curl -X POST http://localhost:3000/api/enquiry \
  -H 'Content-Type: application/json' \
  -d '{"name":"Test User","phone":"7070885367","course":"ADCA"}'
```

## Notifications (all phones & browsers)

A bell button (**Get Alerts**) in the header, hero and enquiry form lets a
visitor allow notifications with a single tap.

- `src/app/lib/notifications.ts` — permission helpers, iOS detection,
  service-worker registration and notification display.
- `src/app/components/NotificationButton.tsx` — the button itself
  (`icon` variant in the header, `full` variant in the hero/enquiry form).
- `public/manifest.webmanifest` + `public/icons/*` — makes the site
  installable on Android, iOS, desktop Chrome/Edge.
- `public/sw.js` — service worker: displays notifications (page messages and
  web push) and handles taps. Registered with `?mode=dev` locally so it never
  caches anything during development.

### Device support

| Device / browser | Behaviour |
| --- | --- |
| Chrome, Edge, Firefox (desktop & Android) | Works directly on tap |
| Safari on macOS | Works directly on tap |
| Safari on iPhone / iPad (16.4+) | Requires **Add to Home Screen** first; the button explains exactly how |
| Older iOS Safari / plain HTTP | Button reports "not supported" |

> Notifications only work over **HTTPS** (or `localhost` in development), and
> iOS requires the site to be installed to the Home Screen.

Sonner toasts confirm the outcome of every tap, and a system notification is
also shown when a visitor submits the enquiry form.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
