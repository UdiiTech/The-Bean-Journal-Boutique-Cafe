import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { maps, site } from "./src/data/site.js";

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function seoPlugin() {
  return {
    name: "bean-journal-seo",
    transformIndexHtml(html) {
      const knownUrl = site.seo.url !== "TODO";
      const canonical = knownUrl
        ? `${site.seo.url.replace(/\/$/, "")}/`
        : "/";
      const ogImage = knownUrl
        ? new URL(site.seo.ogImage, canonical).href
        : site.seo.ogImage;

      const structuredData = {
        "@context": "https://schema.org",
        "@type": "CafeOrCoffeeShop",
        name: site.name,
        address: {
          "@type": "PostalAddress",
          streetAddress: site.address.line1,
          addressLocality: site.address.city,
          addressRegion: site.address.state,
          postalCode: site.address.pin,
          addressCountry: "IN",
        },
        telephone: site.phone.tel,
        servesCuisine: site.cuisine.split(" and "),
        hasMap: maps.hasMap,
      };

      if (knownUrl) structuredData.url = canonical;
      if (Array.isArray(site.hours) && site.hours.length > 0) {
        structuredData.openingHoursSpecification = site.hours.map((entry) => ({
          "@type": "OpeningHoursSpecification",
          dayOfWeek: `https://schema.org/${entry.day}`,
          opens: entry.open,
          closes: entry.close,
        }));
      }

      const tags = `
    <title>${escapeHtml(site.seo.title)}</title>
    <meta name="description" content="${escapeHtml(site.seo.description)}" />
    <meta name="robots" content="index, follow" />
    <link rel="canonical" href="${escapeHtml(canonical)}" />
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="${escapeHtml(site.name)}" />
    <meta property="og:title" content="${escapeHtml(site.seo.title)}" />
    <meta property="og:description" content="${escapeHtml(site.seo.description)}" />
    <meta property="og:locale" content="en_IN" />
    <meta property="og:url" content="${escapeHtml(canonical)}" />
    <meta property="og:image" content="${escapeHtml(ogImage)}" />
    <meta property="og:image:alt" content="${escapeHtml(site.hero.image.alt)}" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${escapeHtml(site.seo.title)}" />
    <meta name="twitter:description" content="${escapeHtml(site.seo.description)}" />
    <meta name="twitter:image" content="${escapeHtml(ogImage)}" />
    <script type="application/ld+json">${JSON.stringify(structuredData).replaceAll("<", "\\u003c")}</script>`;

      return html.replace("<!-- SEO -->", tags);
    },
  };
}

export default defineConfig({
  plugins: [react(), tailwindcss(), seoPlugin()],
});
