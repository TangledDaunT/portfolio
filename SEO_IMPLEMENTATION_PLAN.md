# SEO implementation plan

## Goal

Make `https://tangleddaunt.dpdns.org/` the authoritative result for branded searches such as:

- `TangledDaunT`
- `Shreyansh Misra developer`
- `Shreyansh Misra AI systems engineer`

The site cannot guarantee a first position. Google decides ranking from crawlability, relevance, quality, links, search intent, and ongoing trust signals. This plan maximizes the controllable signals and gives the owner the required Search Console steps.

## Audit baseline

Source: `Portfolio Audit/SEO-AUDIT-tangleddaunt.dpdns.org.pdf` (September 30, 2026; 83/100).

### Fixed in this implementation

1. Core SEO: canonical URL, longer intent-aligned description, robots directives, favicon, web manifest.
2. Social discovery: Open Graph and Twitter metadata, profile metadata, share image.
3. Entity understanding: `Person`, `WebSite`, and `ProfilePage` JSON-LD connected to GitHub and LinkedIn.
4. Content relevance: clear name, alias, job title, and developer specialisms in visible semantic copy.
5. Internal navigation: working `about`, `services`, `projects`, and `playground` fragment targets plus a skip link.
6. Security: Vercel response headers for HSTS, framing, MIME sniffing, referrer leakage, and browser permissions.
7. Discovery: `robots.txt` and an XML sitemap with the canonical domain.

### Remaining optimization backlog

1. Replace the placeholder `mailto:shreyansh@example.com` with the real public contact address.
2. Create a dedicated `/about` or `/contact` page only if there is substantial unique content; do not create thin pages for SEO.
3. Convert decorative marquee GIFs and the profile image to WebP/AVIF with explicit dimensions and responsive sources.
4. Add `fetchpriority="high"` to the real above-the-fold portrait once the production image URL is confirmed.
5. Review hosting compression and cache headers after deployment.
6. Earn independent mentions and links from GitHub profile/repositories, LinkedIn, résumé, university/employer pages, and relevant technical communities.

## Search Console launch checklist

1. Deploy the current branch to `https://tangleddaunt.dpdns.org/`.
2. In Google Search Console, add a **Domain property** for `tangleddaunt.dpdns.org` and complete DNS verification.
3. Submit `https://tangleddaunt.dpdns.org/sitemap.xml`.
4. Use URL Inspection on `https://tangleddaunt.dpdns.org/`, request indexing, and test the live URL.
5. Confirm the canonical selected by Google is the custom domain, not the GitHub Pages URL.
6. Repeat inspection after meaningful content/deployment changes; avoid repeated requests for the same unchanged URL.
7. Monitor Performance queries, Page indexing, Core Web Vitals, and Enhancements weekly for the first month.

## Content and authority checklist

- Keep the exact person name and `TangledDaunT` alias consistent across the website, GitHub, LinkedIn, résumé, and profile bios.
- Link those profiles back to the canonical homepage.
- Publish genuinely useful project case studies with problem, architecture, results, and implementation details.
- Keep project descriptions specific and factual; avoid repeating keywords unnaturally.
- Add a visible last-updated date whenever the portfolio content materially changes.
