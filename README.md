# jay malhotra, portfolio site

Source for my portfolio at https://justjay7.github.io. Built with [Astro](https://astro.build) as a static site: every page is plain HTML and CSS, with a few lines of JavaScript for the theme toggle, the AsOf demo and the scroll reveal.

## Run it locally

```
npm install
npm run dev
```

## Where things live

| Path | What it holds |
|---|---|
| `src/data/site.ts` | Name, headline, links, experience, education, stack |
| `src/data/projects.ts` | One entry per case study. The home page work list and the `/work/<slug>/` pages are generated from it |
| `src/pages/` | Home page, case-study template, 404 |
| `src/components/` | The hero rail, the work plates and their small illustrations, the AsOf date demo, the stack marquee |
| `src/styles/global.css` | All styling, with dark and light themes as CSS variables |
| `public/` | Headshot, favicon, social card |
| `tools/make_og.py` | Regenerates the social card (`public/og.png`) |

To add a project, add an entry to `src/data/projects.ts`. Nothing else needs to change.

## Deploying

Every push to `main` runs `.github/workflows/deploy.yml`, which builds the site and publishes it to GitHub Pages.
