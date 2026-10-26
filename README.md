# DraftsRush

**DraftsRush** is a screenwriting and video-production resource hub for writers, filmmakers, editors, and short-form creators. It combines browser-based writing tools, practical production utilities, filmmaking templates, screenwriting education, and film-scene analysis.

- **Website:** https://www.draftsrush.com/
- **Tools directory:** https://www.draftsrush.com/tools
- **Screenwriting guides:** https://www.draftsrush.com/writers-room
- **Scene analysis:** https://www.draftsrush.com/scene-analysis-library
- **XML sitemap:** https://www.draftsrush.com/sitemap.xml

> This README documents the repository and the sitemap currently on `main`. Keyword suggestions are intent-led recommendations, not claims of verified search volume or ranking data. Validate demand and performance in Google Search Console or a keyword research platform before making volume-based decisions.

## What the site offers

### Writing and production tools

DraftsRush includes browser-based tools for screenplay drafting, script timing, hook development, dialogue editing, AV formatting, B-roll planning, video retention, titles, CTAs, teleprompter delivery, and pre-production.

### Screenwriting and filmmaking education

The Writer's Room includes guides to screenplay format, story structure, dialogue, villains, endings, and writing scripts for specific video formats. The site also provides filmmaking templates and a scene analysis library for learning from film craft.

### Film and scene analysis

Editorial pages cover plot-twist films, psychological thrillers, horror, disturbing cinema, movie endings, and individual scene breakdowns. These pages should connect film analysis to useful writing, directing, cinematography, editing, or storytelling lessons.

### Scriptwriting services

The site presents short-form script packages, longer video-essay writing, and partnership options for agencies and production teams.

## Repository structure

The project is a static HTML site with client-side JavaScript and Tailwind CSS. Routes generally map to root-level HTML files or dedicated files under `tools/`.

```text
DraftsRush/
├── index.html
├── script-editor.html
├── tools.html
├── writers-room.html
├── scene-analysis-library.html
├── scripts.html
├── templates.html
├── free-filmmaking-templates.html
├── retention-teardowns.html
├── about.html
├── contact.html
├── partner.html
├── privacy.html
├── terms.html
├── sitemap.html
├── sitemap.xml
├── sitemap.xsl
├── robots.txt
├── README.md
├── package.json
├── tailwind.config.cjs
├── cookie-consent.js
├── drlogo.png
├── favicon.png
├── assets/
│   ├── tailwind-input.css
│   └── tailwind-generated.css
├── scripts/
│   └── audit-sitewide-css.cjs
├── tools/
│   ├── script-timer.html
│   ├── hook-generator.html
│   ├── hook-analyzer.html
│   ├── dialogue-pruner.html
│   ├── format-converter.html
│   ├── broll-generator.html
│   ├── photography-lab.html
│   ├── cinematography-lab.html
│   ├── thumbnail-preview.html
│   ├── av-teleprompter.html
│   ├── retention-simulator.html
│   ├── cta-checker.html
│   ├── shorts-splitter.html
│   ├── title-checker.html
│   ├── screenplay-calculator.html
│   ├── speech-trainer.html
│   ├── timestamp-maker.html
│   ├── character-name-generator.html
│   ├── youtube-tag-generator.html
│   ├── video-script-generator.html
│   └── script-breakdown-sheet.html
└── .github/
```

The repository also contains standalone editorial pages covering movie lists, scene breakdowns, screenwriting advice, filmmaking resources, and video-script formats. This tree highlights the principal site architecture rather than reproducing every editorial filename.

## Sitemap audit

The current `sitemap.xml` contains **93 URLs** across six groups. The sitemap is the best current inventory of intended search-engine landing pages, but it should be reconciled with the live site and Search Console periodically.

| Sitemap group | URLs | Main purpose |
|---|---:|---|
| Core studio, apps, and commercial hubs | 12 | Homepage, editor, tool directory, services, templates, contact |
| Curated cinema pillars | 6 | Movie-list discovery and genre intent |
| Movie endings and scene breakdowns | 18 | Film-specific analysis and scene-level search intent |
| Interactive creator and screenwriting tools | 21 | Utility and task-based searches |
| Craft manuals, format guides, and articles | 33 | Educational and long-tail informational searches |
| Sitemap and legal pages | 3 | Navigation, privacy, and terms |
| **Total** | **93** | |

### Sitemap findings

- The 93 sitemap URLs map to existing files or routes in the repository; no missing sitemap targets were found in the repository file inventory.
- `index.html` represents the homepage route `/`; it does not need a separate `/index.html` sitemap entry if the canonical homepage is `/`.
- Four HTML files are not listed as separate sitemap URLs: `carousel.html`, `draftsrush-brand-system.html`, `example.html`, and `instagram.html`. Confirm whether each is an intentional utility/demo, an internal brand resource, or a public search landing page. Add only pages that are canonical, useful to visitors, and intended for indexing; otherwise keep them out of the sitemap and apply appropriate canonical/noindex rules.
- The sitemap includes `/tools/hook-generator` and the newer production tools. Keep their URLs consistent with canonical tags, internal links, and actual deployment routes.
- Several `lastmod` values are older than recent repository changes. Update a page's `lastmod` only when its meaningful content changes; do not bulk-set every date to today's date.
- Sitemap priority values are hints at most and are not a substitute for internal linking, content quality, canonical consistency, or crawlable navigation.
- The sitemap's XML structure and URLs should be validated after edits. Keep the sitemap declaration in `robots.txt` pointing to `https://www.draftsrush.com/sitemap.xml`.

## SEO content architecture and keyword map

The keyword themes below are mapped from the live URL slugs and the site's stated purpose, then refined around common search intent. They are **primary-topic recommendations**, not verified volume, difficulty, or traffic forecasts. Assign one primary query theme to each page and use close variants naturally in the title, H1, introduction, subheadings, image alt text where relevant, and internal-link anchors.

| Cluster | Primary keyword themes | Search intent | Priority pages |
|---|---|---|---|
| Screenwriting software | free online screenplay editor, screenplay writing software, script editor online | Use a tool / compare solutions | `/script-editor`, `/best-free-screenwriting-software` |
| Scriptwriting education | how to write a script, screenplay format guide, screenplay formatting mistakes | Learn / solve a problem | `/how-to-write-a-script`, `/screenplay-format-guide`, `/screenplay-formatting-mistakes` |
| Story structure | three-act structure, Freytag's pyramid, story structure frameworks, how to end a story | Learn a craft concept | `/how-many-acts-are-in-a-movie-three-act-structure`, `/parts-of-a-story-freytags-pyramid`, `/story-structure-frameworks`, `/how-to-end-a-story` |
| Dialogue and characters | how to write realistic dialogue, how to write a villain, character name generator | Learn / use a tool | `/write-realistic-dialogue`, `/how-to-write-a-villain`, `/tools/character-name-generator` |
| Video hooks and retention | video hook formulas, hook generator, hook analyzer, audience retention, curiosity gap examples | Learn / use a tool | `/50-video-hook-formulas-cheatsheet`, `/40-script-open-loops-and-curiosity-gap-formulas`, `/tools/hook-generator`, `/tools/hook-analyzer`, `/tools/retention-simulator` |
| Short-form video scripts | YouTube Shorts script, Instagram Reels script, TikTok short drama script, faceless YouTube script | Learn / create | `/how-to-write-a-faceless-youtube-channel-script`, `/how-to-write-a-tiktok-short-drama-script`, `/tools/shorts-splitter`, `/tools/video-script-generator` |
| Production documents | script breakdown sheet, shot list template, free filmmaking templates, AV script format | Download / use a tool | `/script-breakdown-sheet`, `/shot-list-template`, `/free-filmmaking-templates`, `/tools/format-converter`, `/tools/script-breakdown-sheet` |
| B-roll and visual planning | B-roll shot list, B-roll ideas for video, cinematography tools, photography tools | Use a tool / plan a shoot | `/tools/broll-generator`, `/tools/cinematography-lab`, `/tools/photography-lab`, `/30-visual-pattern-interrupts-for-video-editors` |
| On-camera and delivery tools | online teleprompter, speech pace calculator, screenplay runtime calculator | Use a tool | `/tools/av-teleprompter`, `/tools/speech-trainer`, `/tools/script-timer`, `/tools/screenplay-calculator` |
| Film scene analysis | [film title] ending explained, [film title] scene breakdown, best plot twist movies, psychological thriller movies | Discover / understand a film | Scene breakdown URLs and cinema pillar pages |
| Horror and disturbing cinema | most disturbing movies ever made, underrated horror movies, horror movies based on true stories | Discover / compare films | `/most-disturbing-movies-ever-made-ranked`, `/10-most-underrated-horror-movies`, `/best-horror-movies-based-on-true-stories` |
| Filmmaking resources | best screenwriting books, best cinematography books, filmmaking podcasts, websites to read movie scripts | Research / compare resources | Matching resource-list pages in the repository |

### On-page content and metadata standard

For every indexable landing page:

1. **Title tag:** Use a distinct, readable title that leads with the page's primary topic and communicates its specific value. Avoid repeating the same generic title across tools.
2. **Meta description:** Write a unique, accurate summary that includes the topic naturally and gives the searcher a reason to visit. Treat it as a click-through aid, not a direct ranking guarantee.
3. **One clear H1:** Match the actual page intent. Use H2/H3 headings to answer related sub-questions and organise the page for readers.
4. **Useful opening copy:** Explain what the page helps the visitor do before adding background. Tool pages should describe inputs, outputs, practical use cases, and meaningful limitations.
5. **Keyword coverage:** Use natural variants and entities rather than keyword stuffing. Do not create near-duplicate pages targeting the same intent without a clear difference.
6. **Internal links:** Link tool pages to relevant guides and templates; link guides to the tools they recommend; link film breakdowns to the relevant craft lessons and scene-analysis hub.
7. **Structured data:** Use only schema types that accurately describe visible page content. Validate JSON-LD and keep structured data consistent with the page.
8. **Canonical and indexability:** Use a self-referencing canonical on indexable pages, consistent HTTPS and hostname, and no accidental `noindex` on intended landing pages.
9. **Images and accessibility:** Use descriptive filenames and meaningful alt text for informative images. Keep decorative images' alt text empty.
10. **Freshness:** Update factual or time-sensitive articles when evidence changes. Update sitemap `lastmod` when meaningful edits are made.

Do not add a visible "SEO tags" keyword list to the body just to fit terms. Search engines and readers benefit more from focused page content, descriptive headings, relevant internal links, and a clear user task.

## Recommended internal-link trees

Use these as navigation and topical-authority models. They are recommendations, not claims that every link is already implemented.

### 1. Screenwriting and story craft

- `/writers-room`
  - `/how-to-write-a-script`
  - `/screenplay-format-guide`
  - `/screenplay-formatting-mistakes`
  - `/story-structure-frameworks`
  - `/how-many-acts-are-in-a-movie-three-act-structure`
  - `/parts-of-a-story-freytags-pyramid`
  - `/how-to-end-a-story`
  - `/write-realistic-dialogue`
  - `/how-to-write-a-villain`

### 2. Creator tools and video scripting

- `/tools`
  - Hook research: `/tools/hook-generator`, `/tools/hook-analyzer`
  - Script development: `/script-editor`, `/tools/script-timer`, `/tools/dialogue-pruner`
  - Production planning: `/tools/format-converter`, `/tools/broll-generator`, `/tools/script-breakdown-sheet`
  - Recording and delivery: `/tools/av-teleprompter`, `/tools/speech-trainer`
  - Packaging and publishing: `/tools/title-checker`, `/tools/youtube-tag-generator`, `/tools/thumbnail-preview`
  - Retention and calls to action: `/tools/retention-simulator`, `/tools/cta-checker`

### 3. Filmmaking templates and pre-production

- `/free-filmmaking-templates`
  - `/templates`
  - `/shot-list-template`
  - `/script-breakdown-sheet`
  - `/tools/format-converter`
  - `/tools/script-breakdown-sheet`

### 4. Film analysis and craft learning

- `/scene-analysis-library`
  - Film-specific ending explanations
  - Film-specific scene breakdowns
  - `/visual-comparisons`
  - Relevant craft guides from `/writers-room`

### 5. Cinema discovery

- Relevant movie-list pillar
  - Link to each film's own scene or ending breakdown when available
  - Link to a craft article only when it genuinely explains a technique used in the film

Keep anchor text descriptive and varied. Avoid forcing every page to link to every other page.

## Sitemap and crawl maintenance

- Maintain one canonical hostname: `https://www.draftsrush.com`.
- Ensure every sitemap URL returns a successful response, is indexable, and has the expected canonical.
- Keep redirects, query parameters, and duplicate routes out of the sitemap.
- `robots.txt` currently disallows query-string URLs with `Disallow: /*?*`, disallows `/api/`, and declares the sitemap. Verify that no required canonical content relies on query parameters.
- Review the four HTML files not separately listed in the sitemap and decide their intended indexing status.
- Reconcile tool names, URLs, footer links, sitemap entries, and canonical tags whenever a route is added or renamed.
- Check Search Console for indexing exclusions, duplicate canonicals, crawl errors, impressions, CTR, and query-to-page alignment. Do not infer ranking or traffic performance from the sitemap alone.

## Development

The repository currently declares these npm scripts:

```bash
npm install
npm run build:css
npm run audit:css
```

- `build:css` generates a minified Tailwind stylesheet from `assets/tailwind-input.css`.
- `audit:css` runs the sitewide CSS audit in `scripts/audit-sitewide-css.cjs`.

Deployments are managed through Vercel and source changes are tracked in GitHub. Preview branches should be reviewed before merging into `main`.

## Keyword research notes

This repository's sitemap and filenames reveal topic coverage, but they do **not** provide search volume, keyword difficulty, clicks, impressions, or conversion data. The keyword map above is a practical starting hypothesis. Prioritise the next content updates using:

1. Search Console queries with impressions but low CTR (improve titles and descriptions when they accurately reflect the page).
2. Queries ranking near page one where the page genuinely satisfies the intent (strengthen the page and relevant internal links).
3. Queries that map to an existing useful tool or guide but are not addressed clearly on the page.
4. Pages with overlapping intent that should be differentiated, consolidated, or linked as parent and child topics.
5. Actual engagement and tool usage, not traffic alone.

Use the Search Console and analytics exports to turn this initial topical map into a measured content plan. Do not publish made-up search volumes or promise rankings.

## License and ownership

This repository is maintained as the DraftsRush website. No open-source license is declared in the repository root; do not assume that the code or content is licensed for reuse without permission.
