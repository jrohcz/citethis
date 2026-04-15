# CiteThis — Article Template

Zkopíruj tento soubor, vyplň a ulož jako `src/content/protocols/[slug].md`.

---

## Frontmatter (povinné)

```yaml
---
title: "Název protokolu: Podtitul s klíčovým slovem"
# Formát: "Co: Evidence-Based [Typ] Protocol"
# Příklad: "Postpartum Depression Prevention: Evidence-Based Supplement Protocol"

tags: [tag1, tag2, tag3]
# Tagy = hashtagy na webu + tag landing pages
# Pravidla: lowercase, pomlčky místo mezer, 4–8 tagů
# Taxonomie: téma (adhd, pregnancy, sleep) + typ (supplements, protocol, diet) + klíčové látky

evidence: strong
# strong | moderate | preliminary | expert-opinion
# strong = 4/4: více RCTs, meta-analýzy
# moderate = 3/4: jedno RCT nebo velké observační studie
# preliminary = 2/4: pilot studie, animální modely
# expert-opinion = 1/4: konsenzus bez RCT

sources: 0
# Celkový počet zdrojů v sekci Sources

sourceBreakdown: "X meta-analyses, Y RCTs, Z observational studies, N supporting sources"
# Vždy vyplnit — kritické pro transparentnost

created: "YYYY-MM-DD"
updated: "YYYY-MM-DD"
verified: "YYYY-MM-DD"
author: jroh.cz

tldr: "Jednoodstavcové shrnutí CELÉHO protokolu. Musí dávat smysl bez kontextu — toto citují AI enginy. Obsahuje: klíčové intervence, konkrétní čísla (dávky, hodnoty), mechanismus nebo výsledek. Max 3–4 věty."
# Příklad struktury: "[Přístup] může [výsledek]. Klíčové intervence: [A (dávka)], [B (cíl)], [C (forma)]. [Mechanismus nebo kontext]."
---
```

---

## Struktura článku

### 1. Key Definitions *(povinné)*

```markdown
## Key Definitions

- **Termín:** Definice. Kde relevantní, uveď číslo nebo zdroj v závorce.
- **Termín 2:** Definice.
- **Termín 3:** Definice.
```

**Pravidla:**
- 4–8 definic klíčových pojmů článku
- AI enginy milují glossary bloky — zvyšují citovatelnost
- Uváděj jen termíny které se reálně v článku používají

---

### 2. Key Findings *(povinné)*

```markdown
## Key Findings

- Konkrétní nález s číslem (OR, SMD, %, mg) a zdrojem (Autor et al., rok)
- **Zvýrazni** nejsilnější nebo nejsurprisnější finding
- Každý bullet = jeden specifický, citovatelný fakt
```

**Pravidla:**
- 5–8 bulletů
- Každý bullet musí mít číslo — žádné vágní "ukázalo se, že..."
- Zdroj v závorce na konci každého bullettu
- Seřadit od nejsilnější evidence po slabší

---

### 3. Methodology Note *(povinné)*

```markdown
## Methodology Note

2–3 věty popisující JAK vznikl protokol: zdroje, co bylo prioritizováno, proč.
Odkaz na /methodology.

Příklad:
"This protocol synthesizes findings from N primary sources including meta-analyses 
(Autor et al. rok), landmark RCTs (Autor et al. rok), and clinical guidelines. 
We prioritized interventions with RCT-level evidence and established safety profiles. 
Full methodology: [/methodology](/methodology)"
```

---

### 4. Table of Contents *(povinné pro články >1500 slov)*

```markdown
## Table of Contents

1. [Sekce 1](#sekce-1)
2. [Sekce 2](#sekce-2)
3. [Protocol Summary](#protocol)
4. [Comparison Tables](#tables)
5. [Limitations & Caveats](#limitations)
6. [Related Topics](#related)
7. [Sources](#sources)
```

---

### 5. Hlavní obsah *(povinné)*

```markdown
## Název sekce {#anchor}

### Proč/Co/Jak? — H3 jako otázka (FAQ formát pro GEO)

Odstavce s obsahem. Každý claim musí mít inline citaci nebo odkaz na zdroj.
"As of [měsíc rok], research shows that..." — time-bounded claims jsou důležité.

Pro cross-referencing: "This aligns with findings from [Studie, rok]..."
```

**Sekce které typicky potřebuješ:**
- Mechanismus (proč to funguje biologicky)
- Evidence review pro každou klíčovou intervenci
- Srovnávací tabulky (formy, dávky, timing)
- Specifické populace (těhotenství, děti, starší)

---

### 6. Protocol Summary *(povinné)*

```markdown
## Protocol Summary {#protocol}

### Phase 1: [Název fáze]

| Supplement | Form | Dose/Day | Timing | Priority |
|------------|------|----------|--------|----------|
| Název | Forma (glycinate, TG, ...) | Xmg / XIU | Ráno/večer/s jídlem | 🔴 Essential / 🟡 If indicated / 🟢 Optional |

### Phase 2: [Název fáze]
...
```

**Pravidla:**
- Tabulka je povinná — AI enginy ji citují specificky
- Priority emoji: 🔴 Essential, 🟡 If indicated, 🟢 Optional
- Timing vždy konkrétní ("evening", "with fatty meal", "away from calcium")

---

### 7. Comparison Tables *(pokud relevantní)*

```markdown
## [Látka] Forms Compared {#tables}

| Form | Bioavailability | Best For | Notes |
|------|----------------|----------|-------|
| Glycinate | High | Sleep, anxiety | First choice — glycine has calming properties |
| Citrate | Moderate | General | GI side effects at high doses |
| Oxide | Low (~4%) | Avoid | Primarily laxative effect |
```

**Typické srovnávací tabulky:**
- Formy suplementu (glycinate vs citrate vs oxide)
- Dávkovací schémata
- Zdroje z potravin vs suplementy
- Evidence level pro každou intervenci

---

### 8. Limitations & Caveats *(povinné)*

```markdown
## Limitations & Caveats {#limitations}

- **Individual variation:** Protocols based on population averages; individual response varies.
- **Evidence gaps:** [Konkrétní mezera v evidenci].
- **Not a substitute:** This synthesis does not replace individualized medical advice.
- **Evolving science:** Recommendations may change as new evidence emerges. Check "last updated" date.
- **[Specifická caveat pro toto téma]:** [Vysvětlení].
```

**Pravidla:**
- Paradoxně zvyšuje důvěryhodnost — AI preferuje zdroje které přiznávají limity
- Min. 4 bullets, max. 7
- Vždy include "not a substitute" a "evolving science"
- Přidej 1–2 specifické pro daný protokol

---

### 9. Related Topics *(povinné)*

```markdown
## Related Topics {#related}

- [Název protokolu](/slug) — proč je relevantní (overlapping interventions, related condition)
- [Název protokolu](/slug) — proč je relevantní
```

**Pravidla:**
- 2–5 interních odkazů
- Vždy vysvětli PROČ je odkaz relevantní — ne jen seznam

---

### 10. The Bottom Line *(povinné)*

```markdown
## The Bottom Line

**The bottom line:** Jedna–dvě věty. Nejkonkrétnější možné shrnutí. 
"[Přístup] targeting [specifické biomarkery/intervence] can [výsledek] in [populace]."

Příklad:
"A systematic three-phase protocol targeting ferritin (>50 μg/L), omega-3 (EPA-dominant), 
vitamin D (4000–6000 IU), magnesium glycinate, and L. rhamnosus HN001 can significantly 
reduce PPD risk."
```

**Pravidla:**
- Poslední věc čtenář vidí = první věc AI cituje ze závěru
- Konkrétní čísla, ne vágní "may help"
- Bold "The bottom line:" vždy

---

### 11. Sources *(povinné)*

```markdown
## Sources {#sources}

1. Příjmení AB et al. (rok). Název studie. *Journal Name*. [DOI: xx.xxxx/xxx](https://doi.org/xx.xxxx/xxx)
2. Příjmení AB et al. (rok). Název studie. *Journal Name*. [PMID: xxxxxxxx](https://pubmed.ncbi.nlm.nih.gov/xxxxxxxx/)
```

**Pravidla:**
- Formát: `Příjmení Iniciály et al. (rok). Název. *Journal*. [DOI/PMID link]`
- Každý zdroj musí mít klikatelný odkaz (DOI nebo PubMed)
- Seřadit podle pořadí citace v textu NEBO abecedně — být konzistentní
- Meta-analýzy a RCTs na začátek

---

### 12. Revision History *(povinné)*

```markdown
## Revision History

| Date | Changes |
|------|---------|
| YYYY-MM-DD | Initial publication |
| YYYY-MM-DD | [Co se změnilo a proč] |
```

---

## Checklist před publikací

### Obsah
- [ ] TL;DR je self-contained (dává smysl bez kontextu)
- [ ] `sourceBreakdown` vyplněn (X meta-analyses, Y RCTs...)
- [ ] Key Definitions: 4–8 pojmů s definicemi
- [ ] Key Findings: každý bullet má číslo + zdroj
- [ ] Methodology Note: 2–3 věty + odkaz na /methodology
- [ ] H3 jako otázky (FAQ formát) kde možné
- [ ] Protocol summary tabulka s Priority sloupcem
- [ ] Comparison table kde relevantní
- [ ] Inline cross-references ("This aligns with [Studie, rok]...")
- [ ] Time-bounded claims ("As of [měsíc rok], research shows...")
- [ ] Limitations & Caveats: min. 4 bullets
- [ ] Related Topics: 2–5 interních odkazů s vysvětlením
- [ ] The Bottom Line: konkrétní, s čísly
- [ ] Všechny zdroje mají DOI nebo PubMed odkaz
- [ ] Revision History tabulka

### Technické
- [ ] `slug` = filename (ppd-supplements.md → /ppd-supplements)
- [ ] `tags` lowercase, pomlčky, 4–8
- [ ] `evidence` = správná hodnota (strong/moderate/preliminary/expert-opinion)
- [ ] `sources` = přesný počet v sekci Sources
- [ ] `created` a `updated` = YYYY-MM-DD formát
- [ ] Build projde (`npm run build` v /Projects/citethis)

---

## Rychlý příklad frontmatteru

```yaml
---
title: "ADHD Supplement Stack: Evidence-Based Protocol for Adults"
tags: [adhd, supplements, omega-3, magnesium, zinc, mental-health]
evidence: moderate
sources: 31
sourceBreakdown: "1 meta-analysis, 5 RCTs, 8 observational studies, 17 supporting sources"
created: "2026-04-15"
updated: "2026-04-15"
verified: "2026-04-15"
author: jroh.cz
tldr: "Adults with ADHD show consistent deficits in omega-3, magnesium, zinc, and iron. Supplementing these deficiencies — particularly EPA-dominant omega-3 (2g/day) and magnesium glycinate (300mg) — produces measurable improvements in attention and impulsivity within 8–12 weeks, with stronger effects when combined with standard ADHD treatment."
---
```

---

*Template verze: 1.0 | Aktualizovat při každé strukturální změně webu*
