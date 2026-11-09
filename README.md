# Anshu Prajapati — AI Engineer Portfolio

Next.js 15 (App Router) portfolio for [anshu.tech](https://anshu.tech). Every page is generated as static HTML, so it loads fast and search engines can read all of it.

## Run locally

```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm start   # production check
```

## Where things live

| What | File |
|---|---|
| All content: projects, jobs, badges, skills, links | `lib/data.ts` |
| Page markup (server-rendered, crawlable) | `app/page.tsx` |
| Animations and interactivity | `components/Effects.tsx` |
| Styles, light and dark themes | `app/globals.css` |
| SEO: metadata, sitemap, robots, OG image | `app/layout.tsx`, `app/sitemap.ts`, `app/robots.ts`, `app/opengraph-image.tsx` |
| Résumé downloads | `public/resume/` |

To update the résumé, replace the two files in `public/resume/` and keep the same file names.

## Deploy (Vercel)

1. Push this folder to a GitHub repo and import it in Vercel. No settings needed.
2. In Vercel → Domains, add `anshu.tech` and `www.anshu.tech`. Point `www` to the apex domain.
3. In [Google Search Console](https://search.google.com/search-console), add `anshu.tech` and submit `https://anshu.tech/sitemap.xml`.
4. Paste the Search Console verification token into `verification` in `app/layout.tsx`, then redeploy.

## Ranking checklist

- Put `https://anshu.tech` in the website field of your GitHub, LinkedIn, LeetCode, Kaggle, Hugging Face and X profiles. These backlinks plus the `sameAs` structured data tie your profiles to this site.
- Keep the page title and the H1 ("Anshu Prajapati, AI Engineer") as they are; they target the search "Anshu Prajapati AI Engineer".
