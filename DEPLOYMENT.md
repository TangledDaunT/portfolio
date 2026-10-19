# Deployment Guide — TangledDaunT Portfolio

This guide covers deploying the portfolio site to Vercel, Netlify, and GitHub Pages.

## Prerequisitesites

- Node.js 18+ installed
- Git installed
- A GitHub/GitLab/Bitbucket account with the repository pushed

---

## Deploy to Vercel (Recommended)

The site is already configured for Vercel deployment.

### Option A: Git Integration (Auto-Deploy)

1. Push your code to a GitHub/GitLab/Bitbucket repository
2. Go to [vercel.com](https://vercel.com) and sign in
3. Click **"Add New Project"** and import your repository
4. Vercel auto-detects Vite — no configuration needed
5. Click **Deploy**
6. Every push to `main` auto-deploys; PRs get preview URLs

### Option B: Vercel CLI

```bash
npm i -g vercel
cd /home/shreyansh/portfolio
vercel          # first run — follow prompts
vercel --prod   # deploy to production
```

### Custom Domain (tangleddaunt.dpdns.org)

1. In Vercel dashboard → Project → Settings → Domains
2. Add `tangleddaunt.dpdns.org`
3. Configure DNS records at your registrar:
   - **A record**: `76.76.21.21` (Vercel IP)
   - **CNAME**: `cname.vercel-dns.com`
4. SSL is automatic via Let's Encrypt

---

## Deploy to Netlify

### Option A: Git Integration

1. Push code to your Git provider
2. Go to [netlify.com](https://netlify.com) → **"Add new site"** → **"Import an existing project"**
3. Select your repository
4. Build settings (auto-detected):
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
5. Click **Deploy**

### Option B: Netlify CLI

```bash
npm i -g netlify-cli
cd /home/shreyansh/portfolio
netlify login
netlify init          # link to existing site or create new
netlify deploy --prod
```

### Custom Domain

1. Netlify dashboard → Site settings → Domain management
2. Add custom domain: `tangleddaunt.dpdns.org`
3. Update DNS at your registrar:
   - **A record**: `75.2.60.5` (Netlify load balancer)
   - Or **CNAME**: `your-site.netlify.app`
4. HTTPS is automatic

---

## Deploy to GitHub Pages

### Option A: GitHub Actions (Recommended)

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm ci
      - run: npm run build
      - uses: actions/upload-pages-artifact@v3
        with:
          path: dist
  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - id: deployment
        uses: actions/deploy-pages@v4
```

Then: Settings → Pages → Source: **GitHub Actions**

### Option B: Manual Deploy

```bash
cd /home/shreyansh/portfolio
npm run build
npx gh-pages -d dist
```

### Custom Domain

1. Create a `CNAME` file in `public/` with: `tangleddaunt.dpdns.org`
2. Settings → Pages → Custom domain
3. Add DNS records at your registrar:
   - **A records** (GitHub Pages IPs):
     - `185.199.108.153`
     - `185.199.109.153`
     - `185.199.110.153`
     - `185.199.111.153`

---

## Environment Variables

No environment variables are required for the portfolio site.

If you add a contact form or analytics later, add them in:
- **Vercel**: Project → Settings → Environment Variables
- **Netlify**: Site settings → Environment variables
- **GitHub Pages**: Settings → Secrets and variables → Actions

---

## Post-Deployment Checklist

- [ ] Verify site loads at your domain
- [ ] Check [Google Search Console](https://search.google.com/search-console) — add property & submit sitemap
- [ ] Verify `https://tangleddaunt.dpdns.org/sitemap.xml` is accessible
- [ ] Verify `https://tangleddaunt.dpdns.org/robots.txt` is accessible
- [ ] Verify `https://tangleddaunt.dpdns.org/llms.txt` is accessible
- [ ] Submit to [IndexNow](https://www.indexnow.org/) for faster indexing
- [ ] Run [PageSpeed Insights](https://pagespeed.web.dev/) and fix any issues
- [ ] Test on mobile devices
- [ ] Verify all internal links work (privacy, terms, case studies)
