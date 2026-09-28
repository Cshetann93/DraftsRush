# DraftsRush

DraftsRush is an independent screenplay studio, browser-based creator tool suite, and storytelling knowledge base. The platform produces high-retention video screenplays for YouTube, Shorts, and Reels while providing free, client-side production software and craft guides for writers and video teams.

Live site: [draftsrush.com](https://www.draftsrush.com)

---

## What DraftsRush Delivers

### 1. In-Browser Creative Software (100% Free & Client-Side)

* **Online Screenplay Editor:** In-browser screenwriting canvas with element switching via dropdown, automatic tab-stop cycling, and export to TXT, Fountain, or print-ready PDF.
* **Story-to-Script Auto Converter:** Algorithmic parser that converts narrative prose into standard script sluglines, action descriptions, and dialogue blocks.
* **Production Tool Matrix:**
* *Script Pacing Timer:* Calculates runtime mapped against 130–160 WPM delivery rates.
* *5-Second Hook Analyzer:* Audits opening lines for curiosity loops and drop-off risks.
* *Dialogue Word Pruner:* Isolates exposition and removes unnecessary conversational fluff.
* *Dual-Column AV Converter:* Converts script blocks into camera-ready audio/visual tables.
* *B-Roll Cutaway Generator, Shorts Splitter, Title Checker, and Speech Trainer.*



### 2. The Writer's Room (Knowledge Base & Educational Hub)

* **Technical Guides:** Industry standard formatting manuals, Courier 12pt tab stop breakdowns, and downloadable spec script `.docx` templates.
* **Story Mechanics:** Deep-dive craft blueprints on story resolution archetypes, antagonist construction, and non-linear narrative techniques.
* **Retention Breakdowns:** Case studies on video essay pacing, drop-off resets, and retention anchors.

### 3. Scriptwriting Services & Production Studio

* **Short-Form Script Packs:** Vertical video scripts engineered with 3-second opening hook variations, B-roll notes, and on-screen text directions.


* **Long-Form Video Essays:** Researched 8- to 20-minute explainer and documentary screenplays built around 90-second retention resets.
* **Agency Partnerships:** White-label scriptwriting, overflow drafting, and custom briefs executed under strict NDAs.



---

## Design System & Tech Stack

* **Architecture:** Static HTML5 enhanced with client-side JavaScript and Schema.org semantic metadata.


* **Styling:** Neo-brutalist UI system featuring high-contrast borders (`border-4 border-black`), offset hard drop shadows (`.brutal-box`), and canary yellow accents (`#F8D000`).


* **Typography:**
* Brand & Headers: `Space Grotesk`

* Body Prose: `Inter`

* Screenplay Text: `Courier Prime` / `Courier New`
* Code & Metadata: `JetBrains Mono`


* **Hosting & Infrastructure:** Deployed via Vercel with GitHub version control.



---

## Repository Structure

```text
├── index.html                                    # Main studio homepage, editor feature, and tool directory
├── script-editor.html                            # In-browser script writer and plain-text story converter
├── writers-room.html                             # Educational hub, craft directory, and master guides
├── tools.html                                    # Free client-side video tools directory
├── scripts.html                                  # Commission services, package tiers, and deliverable specs
├── about.html                                    # Studio methodology, story philosophy, and background
├── partner.html                                  # Agency overflow desk and white-label partnerships
├── contact.html                                  # Direct project inquiry desk and brief intake form
├── templates.html                                # Free production script templates (.DOCX, Final Draft)
├── screenplay-format-guide.html                  # Master screenplay format guide and element glossary
├── how-to-end-a-story.html                       # Guide to resolution models and narrative payoffs
├── how-to-write-a-villain.html                   # Breakdown of compelling antagonists and archetypes
├── narrative-techniques.html                     # Non-linear storytelling and dramatic devices
├── storytelling-blueprints.html                  # Visual diagrams of structural frameworks
├── script-breakdown-sheet.html                   # Pre-production asset tracking sheets
├── privacy.html                                  # Privacy policy
├── terms.html                                    # Terms of service
├── sitemap.xml                                   # Verified search engine XML sitemap
├── drlogo.png                                    # Brand identity logo asset
└── tools/                                        # Dedicated tool routes
    ├── script-timer.html                         # Word count to spoken pacing calculator
    ├── hook-analyzer.html                        # Opening line hook and curiosity auditor
    ├── dialogue-pruner.html                      # Dialogue tightening and fluff removal tool
    ├── format-converter.html                     # Standard script to dual-column AV table converter
    ├── retention-simulator.html                  # Audience drop-off modeling engine
    ├── hook-generator.html                       # Viral short-form video hook formulas
    ├── broll-generator.html                      # Visual cutaway and asset prompt planner
    ├── shorts-splitter.html                      # Long transcript into vertical cut parser
    ├── title-checker.html                        # Video CTR and title curiosity rater
    ├── screenplay-calculator.html                # Page-to-minute runtime estimator
    ├── speech-trainer.html                       # Voiceover delivery speed coach
    └── timestamp-maker.html                      # YouTube chapter marker formatter

```
