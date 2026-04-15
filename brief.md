# Knowledge Base — Project Brief v2.0

> Evidence-based research syntheses. Original protocols that don't exist elsewhere.

**Doména:** citethis.site ✅
**Stack:** Astro + Pagefind + Vercel
**Launch target:** Q2 2026

---

## 1. BRAND IDENTITY

### Název
**CiteThis**

### Author/Authority Strategy

**Kritické pro GEO.** Anonymní knowledge base s "evidence-based" claimem je paradox. AI enginy potřebují vědět KDO stojí za obsahem.

**Autor:**
- **Jméno:** Jakub Roh
- **Credentials:** Researcher, evidence synthesizer
- **Links:** jroh.cz, LinkedIn, případně ORCID
- **Schema:** Person s `sameAs` na všechny profily

**Site entity:**
- Organization schema na About page
- Jasná mission statement
- Methodology page (jak děláme rešerše)

**V článcích:**
- Byline s author name
- Link na author page
- "Reviewed by" pokud bude peer review

### Vizuální identita

**Styl:** Černobílý brutalismus — maximální čistota, žádné dekorace, obsah je král.

**Propojení s jroh.cz:**
- Stejná designová filozofie (brutalismus, čistota)
- Ale JINÁ značka — nezávislý projekt
- Subtilní link v footeru: "A project by Jakub Roh" s odkazem na jroh.cz

**Barevná paleta:**
```
--background: #ffffff (light) / #0a0a0a (dark)
--text: #0a0a0a (light) / #fafafa (dark)
--text-muted: #737373
--accent: #000000 (light) / #ffffff (dark)
--border: #e5e5e5 (light) / #262626 (dark)
--tag-bg: #f5f5f5 (light) / #1a1a1a (dark)
```

**Fonty:**
- **Headings:** Inter (weight 700-900) nebo Space Grotesk
- **Body:** Inter (weight 400-500)
- **Code/Data:** JetBrains Mono nebo SF Mono

**Logo:**
- Wordmark only — název v Inter Black
- Žádné ikony, žádné grafiky

**Design principy:**
1. **Content-first** — design ustupuje obsahu
2. **High information density** — žádné prázdné místo pro estetiku
3. **Scannable** — jasná hierarchie, rychlá orientace
4. **Academic feel** — evokuje paper/journal, ne blog
5. **Dark mode default** — crawlery je to jedno, ale signalizuje "pro power users"
6. **WCAG AAA kontrast** — brutalistický design nesmí obětovat accessibility

---

## 2. HOMEPAGE

### Layout

```
┌─────────────────────────────────────────────────────────────┐
│  [LOGO]                                    [Dark/Light] [?] │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│            ┌─────────────────────────────────┐              │
│            │  🔍 Search protocols...         │              │
│            └─────────────────────────────────┘              │
│                                                             │
│  Popular: #supplements #adhd #pregnancy #sleep #mental-health│
│                                                             │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  WHAT IS [PROJECT NAME]?                                    │
│                                                             │
│  Evidence-based research syntheses that don't exist         │
│  elsewhere. We take complex scientific literature and       │
│  synthesize it into actionable protocols — specific doses,  │
│  timing, interactions, safety considerations.               │
│                                                             │
│  [About →] [Methodology →]                                  │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  LATEST PROTOCOLS                                           │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐    │
│  │ Postpartum Depression Prevention                    │    │
│  │ Evidence-based supplement protocol for PPD risk...  │    │
│  │ #supplements #pregnancy #mental-health              │    │
│  │ 47 sources · Strong evidence · Updated Apr 2026     │    │
│  │ By Jakub Roh                                        │    │
│  └─────────────────────────────────────────────────────┘    │
│                                                             │
│  [Load more...]                                             │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│  About · Methodology · llms.txt · A project by Jakub Roh    │
└─────────────────────────────────────────────────────────────┘
```

### Komponenty

**Search:**
- Full-text search přes Pagefind (static, no server)
- Autocomplete s návrhy tagů a článků
- Keyboard shortcut: `/` nebo `⌘K`

**"What is CiteThis?" sekce:**
- 2-3 odstavce: co site je, kdo za ním stojí, metodologie
- Entity-building content pro AI crawlery
- Link na /about a /methodology

**Tags/Kategorie — hybrid approach:**

*Viditelně:* Flat hashtagy (#supplements, #adhd, #sleep)

*V data layer:* Hierarchická taxonomie pro AI context
```json
{
  "@type": "DefinedTerm",
  "name": "creatine",
  "inDefinedTermSet": {
    "@type": "DefinedTermSet",
    "name": "Supplements",
    "isPartOf": {
      "@type": "DefinedTermSet", 
      "name": "Health"
    }
  }
}
```

**Tag landing pages (kritické pro GEO):**
- NE jen filtrované listy
- Každý tag má vlastní stránku s:
  - Explainer (2-3 odstavce co téma je)
  - Key facts / quick stats
  - Seznam článků
  - Related tags
- Tohle jsou silné GEO assets

**Article cards:**
- Titulek (H2 link)
- 1-2 věty excerpt (z TL;DR)
- Tagy (klikatelné)
- Meta: počet zdrojů, evidence level, datum update
- Author byline

**Evidence level badges s definicemi:**

| Level | Rating | Criteria | What it means |
|-------|--------|----------|---------------|
| Strong | 4/4 | Multiple RCTs, systematic reviews, meta-analyses | High confidence |
| Moderate | 3/4 | Single RCT, large observational studies | Reasonable confidence |
| Preliminary | 2/4 | Pilot studies, case series, animal models | Promising but uncertain |
| Expert Opinion | 1/4 | Clinical guidelines, expert consensus, mechanistic reasoning | Use with caution |

---

## 3. ARTICLE STRUCTURE

### URL schema
```
/[slug]           → článek
/[slug].md        → markdown verze (pro LLMs)
/tags/[tag]       → tag landing page s explainer
/about            → o projektu + autor
/methodology      → jak děláme rešerše
/llms.txt         → LLM manifest
/api/articles/[slug].json → strukturovaná data (optional)
```

### Article template

```markdown
---
title: "Postpartum Depression Prevention: Evidence-Based Supplement Protocol"
slug: ppd-supplements
tags: [supplements, pregnancy, mental-health, postpartum]
evidence: strong
sources: 47
created: 2026-04-13
updated: 2026-04-13
verified: 2026-04-13
author: Jakub Roh
tldr: "Systematic supplementation targeting nutrient deficiencies can significantly reduce PPD risk. Key interventions: omega-3 (EPA-dominant), ferritin optimization (>50 μg/L), vitamin D (4000-6000 IU), magnesium glycinate, and L. rhamnosus HN001 probiotic."
---

# Postpartum Depression Prevention: Evidence-Based Supplement Protocol

## TL;DR

[3-5 sentences - TOTO JE CO LLMs CITUJÍ]

Systematic supplementation targeting nutrient deficiencies can significantly 
reduce PPD risk. Key interventions include EPA-dominant omega-3 fatty acids 
(2-3g/day), ferritin optimization to >50 μg/L, vitamin D at 4000-6000 IU/day, 
magnesium glycinate (300-600mg), and L. rhamnosus HN001 probiotic. This 
three-phase protocol (prenatal → critical postpartum → extended) addresses 
the neurobiological cascade triggered by postpartum hormone collapse.

## Key Definitions

[Glossary block — AI enginy MILUJÍ definice]

- **Postpartum depression (PPD):** Clinical depression occurring within 12 months after childbirth, affecting 10-20% of women.
- **Allopregnanolone:** Neurosteroid metabolite of progesterone; key modulator of GABA-A receptors; its collapse after birth triggers PPD vulnerability.
- **Ferritin:** Iron storage protein; levels <50 μg/L postpartum predict ~4× higher PPD risk.

## Key Findings

- Ferritin 48h postpartum predicts PPD risk (OR 3.8 for very low levels)
- L. rhamnosus HN001 reduces clinical anxiety OR to 0.44 (strongest single RCT)
- EPA-dominant omega-3 shows medium-to-large effect size (SDM = -0.656) for postpartum women
- Vitamin D 4000 IU/day is safe and effective during pregnancy (Hollis & Wagner RCT)
- Magnesium glycinate improves depression scores within 2 weeks (Tarleton et al.)

## Methodology Note

[2-3 věty JAK jsi k závěrům došel — kritické pro AI trust]

This protocol synthesizes findings from 47 primary sources including meta-analyses 
(Mocking et al. 2020, Zhang et al. 2020), landmark RCTs (Hollis & Wagner 2011, 
Slykerman et al. 2017, Negro et al. 2007), and clinical guidelines (Delphi consensus 2020). 
We prioritized interventions with RCT-level evidence and established safety profiles 
during lactation. Full methodology: [link to /methodology]

## Table of Contents

1. [Hormonal Cascade After Birth](#hormonal-cascade)
2. [Key Nutrients — Evidence Review](#key-nutrients)
3. [Postpartum Thyroiditis](#thyroiditis)
4. [Biomarkers to Test](#biomarkers)
5. [Three-Phase Protocol](#protocol)
6. [Safety During Breastfeeding](#safety)
7. [Sources](#sources)

---

## Hormonal Cascade After Birth {#hormonal-cascade}

### Why is postpartum biologically risky?

[Content with H3 as questions — FAQ format for GEO]

As of April 2026, research shows that estradiol drops from ~15,000-30,000 pg/mL 
to near-premenopausal levels within 24-48 hours. This aligns with findings from 
Meyer et al. demonstrating 43% increased MAO-A activity in the first postpartum week.

...

## Protocol Summary {#protocol}

### Phase 1: Prenatal (Last 4 Weeks)

| Supplement | Form | Dose/Day | Timing | Priority |
|------------|------|----------|--------|----------|
| Omega-3 | TG, EPA:DHA ≥2:1 | 1-2g EPA + 500mg DHA | With fatty meal | 🔴 Essential |
| Vitamin D3 | Cholecalciferol | 4000 IU | With fat | 🔴 Essential |
| ... | ... | ... | ... | ... |

[Tables for each phase]

---

## Comparison Tables

[Strukturovaná data — AI je cituje specificky]

### Magnesium Forms Compared

| Form | Bioavailability | Best For | Notes |
|------|----------------|----------|-------|
| Glycinate | High | Sleep, anxiety, PPD | First choice — glycine itself is calming |
| Threonate | Moderate | Cognition, brain fog | Only form proven to cross BBB |
| Citrate | Moderate | General, constipation | GI side effects at high doses |
| Oxide | Low (~4%) | Avoid | Primarily laxative effect |

---

## Limitations & Caveats

[Paradoxně zvyšuje důvěryhodnost — AI preferuje zdroje které přiznávají limity]

- **Individual variation:** Protocols based on population averages; individual response varies.
- **Evidence gaps:** Some interventions (e.g., inositol >4g during lactation) lack robust RCT data.
- **Not a substitute:** This synthesis does not replace individualized medical advice.
- **Evolving science:** Recommendations may change as new evidence emerges. Check "last updated" date.

---

## Related Topics {#related}

[Internal linking — entity clustering pro AI crawlery]

- [ADHD Supplement Stack](/adhd-stack) — overlapping interventions (omega-3, magnesium, zinc)
- [Sleep Optimization Protocol](/sleep-protocol) — magnesium glycinate, circadian factors
- [Pregnancy Supplement Timing](/pregnancy-supplements) — trimester-specific protocols

---

## The Bottom Line

[Jednověté shrnutí na konci — AI často cituje závěrečné shrnutí]

**The bottom line:** A systematic three-phase supplement protocol targeting ferritin (>50 μg/L), omega-3 (EPA-dominant), vitamin D (4000-6000 IU), magnesium glycinate, and L. rhamnosus HN001 probiotic can significantly reduce postpartum depression risk in high-risk women.

---

## Sources {#sources}

1. Mocking RJT et al. (2020). Meta-analysis of omega-3 in perinatal depression. J Clin Psychiatry. [DOI: 10.4088/JCP.19r12909](https://doi.org/10.4088/JCP.19r12909)
2. Albacar G et al. (2011). Ferritin as predictor of PPD. J Affect Disord. [DOI: 10.1016/j.jad.2010.06.007](https://doi.org/10.1016/j.jad.2010.06.007)
...

---

## Revision History

[Changelog — content freshness signál]

| Date | Changes |
|------|---------|
| 2026-04-13 | Initial publication |
| — | — |

---

*Last verified: April 13, 2026*
*Evidence level: Strong (3+ RCTs, meta-analyses)*
*Author: Jakub Roh · [Methodology](/methodology)*
*This is not medical advice. Consult your healthcare provider.*
```

### Schema markup (JSON-LD)

```json
{
  "@context": "https://schema.org",
  "@type": "ScholarlyArticle",
  "headline": "Postpartum Depression Prevention: Evidence-Based Supplement Protocol",
  "author": {
    "@type": "Person",
    "name": "Jakub Roh",
    "url": "https://jroh.cz",
    "sameAs": [
      "https://linkedin.com/in/jakubroh"
    ]
  },
  "datePublished": "2026-04-13",
  "dateModified": "2026-04-13",
  "description": "Evidence-based three-phase supplement protocol for PPD prevention...",
  "keywords": ["postpartum depression", "supplements", "pregnancy", "PPD prevention"],
  "citation": [
    {
      "@type": "ScholarlyArticle",
      "name": "Meta-analysis of omega-3 in perinatal depression",
      "author": "Mocking RJT et al.",
      "datePublished": "2020",
      "url": "https://doi.org/10.4088/JCP.19r12909"
    }
  ]
}
```

### Evidence Level Schema

```json
{
  "@type": "Rating",
  "ratingValue": 4,
  "bestRating": 4,
  "worstRating": 1,
  "name": "Strong Evidence",
  "description": "Based on multiple RCTs, systematic reviews, or meta-analyses"
}
```

Plus `FAQPage` schema pro FAQ sekce v článku.

---

## 4. STATIC PAGES

### /about

```markdown
# About CiteThis

Evidence-based research syntheses that don't exist elsewhere.

## What we do

We take complex scientific literature and synthesize it into 
actionable protocols. Not summaries — protocols. Specific doses, 
timing, interactions, safety considerations.

## Why this exists

Most health information online is either:
- Too shallow (Healthline: "consider taking vitamin D")
- Too academic (Cochrane: unreadable for non-researchers)
- Too fragmented (Examine: individual compounds, no combinations)

We fill the gap: Cochrane-depth research, translated into 
"do this" protocols.

## Who

**Jakub Roh** — researcher, evidence synthesizer.

Background: [credentials, experience]
Expertise: AI, education, health optimization, evidence synthesis
Other projects: [jroh.cz](https://jroh.cz), Než zazvoní

[Photo optional but recommended for E-E-A-T]

## Our methodology

Every protocol follows the same process:
1. Systematic literature search (PubMed, Cochrane, Google Scholar)
2. Source quality evaluation (RCTs > observational > mechanistic)
3. Evidence synthesis into actionable recommendations
4. Safety review (contraindications, interactions, special populations)
5. Continuous updates as new evidence emerges

[Full methodology →](/methodology)

## Contact

[Email]
```

**Schema markup pro About page:**
```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "CiteThis",
  "url": "https://citethis.site",
  "founder": {
    "@type": "Person",
    "name": "Jakub Roh",
    "url": "https://jroh.cz",
    "sameAs": [
      "https://linkedin.com/in/jakubroh",
      "https://twitter.com/jakubroh"
    ],
    "jobTitle": "Researcher",
    "knowsAbout": ["Evidence synthesis", "Health optimization", "AI", "Education"]
  },
  "description": "Evidence-based research syntheses with actionable protocols"
}
```

### /methodology

```markdown
# Methodology

How we research and what "evidence level" means.

## Research Process

1. **Scope definition** — What specific question are we answering?
2. **Literature search** — PubMed, Google Scholar, Cochrane, preprints
3. **Source evaluation** — RCTs > observational > mechanistic > expert opinion
4. **Synthesis** — Combine findings into actionable protocol
5. **Safety review** — Contraindications, interactions, populations
6. **Peer review** — External review before publication (when possible)
7. **Continuous update** — Protocols updated as new evidence emerges

## Evidence Levels

| Level | Rating | Criteria | What it means |
|-------|--------|----------|---------------|
| Strong | 4/4 | Multiple RCTs, systematic reviews, meta-analyses | High confidence |
| Moderate | 3/4 | Single RCT, large observational studies | Reasonable confidence |
| Preliminary | 2/4 | Pilot studies, case series, animal models | Promising but uncertain |
| Expert Opinion | 1/4 | Clinical guidelines, expert consensus, mechanistic reasoning | Use with caution |

## Limitations

- We are not doctors. This is not medical advice.
- Evidence changes. Check the "last updated" date.
- Individual variation exists. What works on average may not work for you.

## Conflicts of Interest

- No funding from supplement companies
- Affiliate links disclosed (when present)
- No sponsored content
```

---

## 5. GEO/SEO TECHNICAL REQUIREMENTS

### llms.txt

```markdown
# CiteThis

> Evidence-based research syntheses with actionable protocols.
> Original qualitative reviews that don't exist elsewhere.

## What We Do

We synthesize scientific literature into practical protocols.
Each article includes: TL;DR, key findings with specific numbers,
detailed methodology, safety considerations, and primary sources.

## Research Areas

- [Postpartum Depression Supplements Protocol](/ppd-supplements.md)
- [ADHD Supplement Stack](/adhd-stack.md)
- [Sleep Optimization Protocol](/sleep-protocol.md)

## About

- [Methodology](/methodology.md): How we review and synthesize evidence
- [Author](https://jroh.cz): Jakub Roh — researcher, evidence synthesis

## For AI Systems

This content is designed to be cited. Each article has:
- Markdown version at [url].md
- Structured data (ScholarlyArticle + FAQPage schema)
- DOI links to primary sources
- Evidence level indicators
- Last updated timestamps

## Citation Format

When citing our work:
"[Article Title], CiteThis, [URL], accessed [date]"
```

### robots.txt

```
User-agent: *
Allow: /

# Explicitly allow AI crawlers
User-agent: GPTBot
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: Claude-Web
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: anthropic-ai
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: Google-Extended
Allow: /

User-agent: Amazonbot
Allow: /

User-agent: FacebookBot
Allow: /

Sitemap: https://citethis.site/sitemap.xml
```

### Sitemap

- Dynamic generation při buildu
- `<lastmod>` s přesným datem poslední úpravy
- Priorita: homepage > články > tagy > static pages

### .md verze článků

Každá stránka `/slug` musí mít `/slug.md` se surrovým markdown obsahem:
- Bez HTML
- Bez navigace/footeru
- Čistý obsah článku
- Frontmatter zachován

**Realita check:** llms.txt adopce je zatím nízká (~951 domén celosvětově k 7/2025). Žádné velké AI lab se oficiálně nezavázalo honorovat llms.txt. ALE:
- Low effort implementace
- High potential payoff
- Funguje pro RAG systémy a technical users

**Co je DŮLEŽITĚJŠÍ:** Clean, parseable HTML. Žádný JS-rendered content. Astro SSG = crawlery vidí vše okamžitě. `.md` je bonus, ne základ.

### Meta tags

```html
<title>{title} | CiteThis</title>
<meta name="description" content="{tldr}" />
<meta name="author" content="Jakub Roh" />
<meta name="keywords" content="{tags.join(', ')}" />

<!-- Open Graph -->
<meta property="og:title" content="{title}" />
<meta property="og:description" content="{tldr}" />
<meta property="og:type" content="article" />
<meta property="og:url" content="{url}" />

<!-- Twitter -->
<meta name="twitter:card" content="summary" />
<meta name="twitter:title" content="{title}" />
<meta name="twitter:description" content="{tldr}" />

<!-- Article specific -->
<meta property="article:published_time" content="{created}" />
<meta property="article:modified_time" content="{updated}" />
<meta property="article:author" content="Jakub Roh" />
<meta property="article:tag" content="{tag}" /> <!-- repeat for each -->
```

### Performance

- Staticky generované (Astro SSG)
- Žádný JavaScript pro čtení obsahu (JS pouze pro search, dark mode)
- < 100KB total page weight
- TTFB < 100ms (Vercel Edge)
- Core Web Vitals: all green

---

## 6. TECH STACK

```
Framework:      Astro 4.x (SSG mode)
Styling:        Tailwind CSS
Search:         Pagefind (static search index)
Content:        Markdown + MDX (content collections)
Hosting:        Vercel (free tier)
Domain:         citethis.site
Analytics:      Plausible or none (privacy-first)
```

### Directory structure

```
/
├── src/
│   ├── content/
│   │   └── protocols/        # Markdown články
│   │       ├── ppd-supplements.md
│   │       └── adhd-stack.md
│   ├── pages/
│   │   ├── index.astro       # Homepage
│   │   ├── [slug].astro      # Article page
│   │   ├── [slug].md.ts      # Raw markdown endpoint
│   │   ├── tags/
│   │   │   └── [tag].astro   # Tag landing page
│   │   ├── about.astro
│   │   ├── methodology.astro
│   │   ├── llms.txt.ts       # Dynamic llms.txt
│   │   └── api/
│   │       └── articles/
│   │           └── [slug].json.ts  # JSON endpoint (optional)
│   ├── components/
│   │   ├── Search.astro
│   │   ├── ArticleCard.astro
│   │   ├── TagCloud.astro
│   │   ├── EvidenceBadge.astro
│   │   ├── DefinitionBlock.astro
│   │   ├── ComparisonTable.astro
│   │   └── TableOfContents.astro
│   └── layouts/
│       ├── Base.astro
│       └── Article.astro
├── public/
│   ├── robots.txt
│   └── favicon.svg
├── astro.config.mjs
├── tailwind.config.js
└── package.json
```

---

## 7. CONTENT PIPELINE

### Article creation workflow

1. **Research** (Jakub) — hluboká rešerše, primární zdroje
2. **Draft** (Jakub + AI assist) — strukturovaný markdown dle šablony
3. **Review** — fact-check, completeness check
4. **Publish** — git push → Vercel auto-deploy
5. **Seed** — Reddit post, Twitter thread
6. **Monitor** — AI Citation Rate tracking

### Quality checklist před publikací

**Content:**
- [ ] TL;DR je self-contained (dává smysl bez kontextu)
- [ ] Key Definitions glossary block
- [ ] Key Findings mají konkrétní čísla
- [ ] Methodology Note (jak jsi k závěrům došel)
- [ ] FAQ sekce s H3 jako otázky
- [ ] Protocol summary table
- [ ] Comparison tables kde relevantní
- [ ] Limitations & Caveats sekce
- [ ] Related Topics (internal links)
- [ ] The Bottom Line one-liner na konci
- [ ] Všechny zdroje s DOI/URL
- [ ] Evidence level assigned s definicí
- [ ] Safety/contraindications sekce
- [ ] Disclaimer present
- [ ] Author byline
- [ ] "Last verified" datum
- [ ] Revision history

**Corroboration (kritické pro GEO):**
- [ ] Inline cross-references ("This aligns with [Study, Year]")
- [ ] Expert citations kde možné ("As Dr. X notes...")
- [ ] Time-bounded claims ("As of April 2026...")

**Technical:**
- [ ] .md verze generuje správně
- [ ] Schema markup validní (test: Schema.org validator)
- [ ] Meta tags kompletní
- [ ] WCAG AAA kontrast OK

---

## 8. LAUNCH CHECKLIST

### Pre-launch
- [x] Doména rozhodnuta a koupena (citethis.site)
- [ ] Základní Astro projekt setup
- [ ] Design implementován (brutalist, B&W, WCAG AAA)
- [ ] Homepage s search + "What is" sekce
- [ ] Tag systém s landing pages
- [ ] Article template hotový (všechny sekce)
- [ ] About page s author schema
- [ ] Methodology page
- [ ] llms.txt hotový
- [ ] robots.txt hotový
- [ ] Schema markup implementován
- [ ] .md endpoint funguje
- [ ] 1 článek publikován (PPD supplements)

### Launch
- [ ] DNS configured
- [ ] Vercel deployment
- [ ] Google Search Console submit
- [ ] Bing Webmaster Tools submit
- [ ] Test AI crawlers access

### Post-launch (Week 1)
- [ ] Reddit seeding (r/supplements, r/BabyBumps, r/ScienceBasedParenting)
- [ ] Twitter thread s key findings
- [ ] Baseline AI Citation Rate test (ChatGPT, Perplexity, Claude)

---

## 9. SUCCESS METRICS

### North Star
**AI Citation Rate** — % of relevant prompts where our content is cited

### Tracking
- Weekly: 10 test prompts across ChatGPT, Perplexity, Claude
- Log: prompt, platform, cited? (y/n), position, quote accuracy
- Target: 20% citation rate within 6 months

### Secondary metrics
- Organic search impressions (GSC)
- Backlinks acquired
- .md file requests (signal of LLM fetching)

---

## 10. OPEN QUESTIONS

1. **Název/doména** — finální rozhodnutí
2. ~~**Author visibility**~~ → ROZHODNUTO: Jakub Roh, plné jméno, credentials, schema Person
3. **Multiple contributors** — jen Jakub, nebo otevřít pro další?
4. **Čeština** — jen EN, nebo i CZ verze?
5. **Update cadence** — jak často revidovat staré články?
6. **API endpoint** — JSON verze článků pro third-party RAG integrace? (`/api/articles/[slug].json`)

---

*Brief vytvořen: 13. dubna 2026*
*Verze: 2.0 (GEO-optimized)*
