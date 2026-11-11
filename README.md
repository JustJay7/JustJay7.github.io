# jay malhotra, portfolio site

Source for my portfolio at https://justjay7.github.io. Built with [Astro](https://astro.build) as a static site: every page is plain HTML and CSS, and the only JavaScript is the theme toggle and the AsOf demo.

## Run it locally

```
npm install
npm run dev
```

## Where things live

| Path | What it holds |
|---|---|
| `src/data/site.ts` | Name, headline, links, experience, education, stack |
| `src/data/projects.ts` | One entry per case study. The home page ledger and the `/work/<slug>/` pages are generated from it |
| `src/pages/` | Home page, case-study template, 404 |
| `src/components/` | The work ledger, the AsOf date demo, case-study illustrations |
| `src/styles/global.css` | All styling, with dark and light themes as CSS variables |
| `public/` | Headshot, favicon, social card |
| `tools/make_og.py` | Regenerates the social card (`public/og.png`) |

To add a project, add an entry to `src/data/projects.ts`. Nothing else needs to change.

## Deploying

Every push to `main` runs `.github/workflows/deploy.yml`, which builds the site and publishes it to GitHub Pages.
