# The Bean Journal Boutique Café

A single-page website for The Bean Journal Boutique Café, 50 Lamb Rd, Latasil, Uzan Bazar, Guwahati, Assam 781001. Built with React, Vite and Tailwind CSS, and intended to be deployed as a static site on Cloudflare Pages.

## Run locally

Requires Node.js 20.19+ or 22.12+.

```bash
npm install
npm run dev
```

Useful checks:

```bash
npm run lint
npm run build
npm run preview
npm run check-todos
```

`npm run check-todos` lists every value in `src/data/site.js` that is still the exact string `TODO`.

## Edit the business details

Everything the café may need to change lives in `src/data/site.js`. Do not edit individual components for business content.

- Name, address, phone, cuisine and rating are already filled in.
- Replace each `TODO` with confirmed information, then run `npm run check-todos`.
- In development, unknown values show as small yellow `TODO` badges.
- In the production build, unknown links and sections are hidden, and missing menu items or reviews are not shown. Never publish the site with `TODO` values that are needed for launch.

Key fields:

| Field | What to enter |
| --- | --- |
| `whatsapp` | Full international number, digits only or with `+`, e.g. `+919864023095` |
| `hours` | Array of `{ day, open, close }` using 24-hour times, e.g. `{ day: "Monday", open: "09:00", close: "22:00" }` |
| `hoursNote` | Optional note such as last seating time |
| `order.zomato`, `order.swiggy` | Full restaurant-page URLs |
| `social[]` | Instagram and Facebook profile URLs |
| `fssai` | FSSAI licence number |
| `reservation.endpoint` | URL that accepts the reservation POST |
| `menu.categories[].items[]` | Item name, description, price, diet (`veg` or `non-veg`) and photo |
| `reviews.items[]` | Real Google review quotes, author names, ratings and dates |
| `about.ownerName`, `about.story`, `assameseGreeting` | Optional story content |
| `credit.name`, `credit.url` | Website credit |
| `seo.url` | Final production URL, e.g. `https://thebeanjournal.in` |

### Reservation form

The form POSTs JSON to `site.reservation.endpoint` with `name`, `phone`, `date`, `time`, `guests`, `notes`, `source` and `submittedAt`. Any `2xx` response is treated as success. A `TODO` endpoint falls back to WhatsApp when `whatsapp` is set; otherwise it shows the phone fallback.

The form includes client-side validation, a honeypot field and a 15-second request timeout. No booking service is included.

## Photos

Photos live in `public/images/`. To replace one, overwrite the file and keep the same filename, or update the path, `width`, `height` and `alt` text in `src/data/site.js`. The hero image is eager-loaded; menu and gallery photos are lazy-loaded.

## Deploy to Cloudflare Pages

1. Push this project to a Git repository.
2. In the Cloudflare dashboard, open **Workers & Pages → Create → Pages → Connect to Git**.
3. Use these build settings:
   - Framework preset: `Vite`
   - Build command: `npm run build`
   - Build output directory: `dist`
   - Node version: `22` or newer (set `NODE_VERSION=22` if needed)
4. Deploy. There is no server-side code and no environment variables are required.
5. Set `site.seo.url` to the final domain and redeploy so the canonical URL, Open Graph URL and structured data are absolute.
6. Update the placeholder domain in `public/robots.txt` and `public/sitemap.xml`.

Optional Cloudflare Web Analytics: create a site in Cloudflare, then paste the beacon snippet into the commented slot near the bottom of `index.html`.

## Before launch

- Replace all launch-blocking `TODO` values and run `npm run check-todos`.
- Test the Zomato and Swiggy links, WhatsApp link, reservation endpoint and phone links on a real phone.
- Confirm opening hours, FSSAI number, social links and the Google reviews link.
- Replace `public/robots.txt` and `public/sitemap.xml` placeholder URLs.
- Run `npm run lint` and `npm run build`.
- Do a final check of the site on a narrow phone, a tablet and a desktop.

## Project notes

- `src/data/site.js` is the single source of truth for business content.
- `vite.config.js` injects the page title, description, canonical, Open Graph/Twitter tags and `CafeOrCoffeeShop` structured data from `site.js`.
- Modals use native `<dialog>` elements for focus trapping and Escape handling.
- The phone, WhatsApp and order actions are plain links; no tracking scripts are included by default.
- The rating is shown as a plain fact and is not marked up as an `aggregateRating` in structured data.
