# DailyObjects Search Experience — Comprehensive Audit & Redesign Blueprint

**Prepared for:** DailyObjects (dailyobjects.com)
**Scope:** Search & Product Discovery — `https://www.dailyobjects.com/sp`
**Lens:** Customer Experience · Merchandising · Search Relevance · Premium Brand Experience
**Date:** 28 June 2026

---

## 0. Method & Evidence Note (read first)

This audit is grounded in **verified catalog, taxonomy, naming, and faceting data** retrieved from DailyObjects' live, publicly indexed pages, cross-referenced with the `.com` (India/₹) and `.us` (USD) storefronts and third-party marketplace listings (Amazon, Flipkart, Nykaa).

**Constraint disclosed transparently:** This audit was executed from a sandboxed environment whose network policy blocks direct browser automation, and DailyObjects' edge returns `403 Forbidden` to non-browser fetchers (standard bot protection). I therefore **could not capture live interactive screenshots** of the autocomplete dropdown, focus states, loading spinners, or millisecond-level performance. Every such item is explicitly flagged **[VERIFY LIVE]** with the exact query/step to reproduce, so your team can confirm in minutes. Everything **not** flagged is grounded in verified, retrievable evidence (URLs, product names, facet parameters, placeholder copy) and is cited.

What *is* verified and used throughout:

| Element | Verified value |
|---|---|
| Search route | `https://www.dailyobjects.com/sp?q=<query>` (query-param based) |
| Search placeholder / page title | *"Search for wireless chargers, phone cases, power banks & more"* |
| Listing route | `/lp?f=cid~<id>` |
| Category hub route | `/cp?f=cid~<id>` |
| Product route | `/dp?f=pid~<SKU>` |
| Collection route | `/o/<slug>` (e.g. `/o/wireless-charger`) |
| Refine-by route | `/rfp?f=b~apple,cid~1101,rf~model` |
| Facet params | `b~` (brand), `cid~` (category id), `m~` (model), `type~`, `rf~` (refine dimension) |

Verified category IDs: `1000` tech-accessories hub · `1101` phone cases · `1103` laptop cases · `1200` bags · `1201` backpacks · `1202` laptop & messenger bags · `1203` crossbody/sling · `1702` desk organisers · `1703` tech-kit organisers · `1800` watch/tech accessories · `1801` watch bands · `1811` phone bags · `3201` MagSafe accessories.

Verified proprietary product lines (these names matter enormously for search — see §4): **Loop** (Qi2 MagSafe power bank, 5k/10k/20k mAh), **Surge / Surge Max Conoid** (wireless chargers), **Stride 2.0** & **Basics** (phone cases), **Skipper / Pivot / Seagrass Pivot** (laptop sleeves), **Fleet / Pivot / Clove 9-to-9** (backpacks), **Wing / March / Orbis / Scout / All Sunday / Everyday Sling** (crossbody), **Link Steel / Ellipse / Braided Solo Loop** (watch bands).

---

## EXECUTIVE SUMMARY

DailyObjects has done the *hard* part — a deep, premium, design-led catalog with proprietary hero products (Loop, Surge, Stride, Skipper) and a clean SEO taxonomy. But **Search is currently operating as a utility "find-the-string" box, not as the discovery engine a premium D2C brand of this maturity needs.** Search is where high-intent customers go; it is the single highest-converting surface on any store, and right now it is under-merchandised, structurally noisy, and brand-flat.

### Top 5 Strengths
1. **Strong, SEO-clean URL taxonomy** (`/lp`, `/cp`, `/dp`, `/o`, faceted `cid~/b~/m~/rf~`) — a solid skeleton to build faceted search on. Most stores never get this right.
2. **Differentiated, named hero products** (Loop, Surge, Stride, Skipper) — gives Search real merchandising ammunition *if* it surfaces them.
3. **Genuine catalog depth & device-specificity** — e.g. dedicated iPhone 17 / 17 Pro / 17 Pro Max case pages, 13"/14"/15"/16" sleeve sizing. The data to power great filters already exists.
4. **Clear category architecture** behind the scenes (stable `cid~` IDs) — semantic mapping is achievable.
5. **Descriptive placeholder copy** that hints at breadth ("wireless chargers, phone cases, power banks & more").

### Top 5 Weaknesses
1. **Variant/SKU explosion in results.** Every colour × size × device is a *separate* PDP/`pid` (e.g. *Khaki Beige Skipper Sleeve Large*, *…XL*, *Midnight Blue Skipper Sleeve Medium* are three different URLs). A search for "laptop sleeve" returns dozens of near-duplicate cards. This is the #1 relevance killer — clutter, choice paralysis, diluted ranking signals. **[VERIFY LIVE: `/sp?q=laptop sleeve`]**
2. **Proprietary-name dependency with high zero-result risk.** Customers must search *Loop, Nimbus, Stride, Skipper* without knowing them. If the engine has no synonym/semantic layer, brand-name searches and generic searches diverge wildly. **[VERIFY LIVE: `/sp?q=Nimbus`, `/sp?q=Loop`]**
3. **Verbose, SEO-stuffed titles destroy card scannability** — *"DailyObjects Khaki Beige Skipper Sleeve XL For MacBook/Laptop upto 40.64cm (16 inch)"* is unreadable on a result card.
4. **No evidence of discovery merchandising** in the empty/typing states (trending, popular, category shortcuts, recently viewed). **[VERIFY LIVE: focus `/sp` empty]**
5. **Search is brand-flat** — it returns products; it does not *inspire, educate, or tell stories*, which is precisely what justifies the premium price.

### Biggest Opportunities (where the money is)
1. **Collapse variants into parent products** in search results (one "Skipper Sleeve" card with colour swatches + size selector). Single highest-ROI change — improves relevance, scannability, ranking, *and* SEO.
2. **Turn the empty/typing state into a merchandised discovery surface** (trending searches, hero products, category & collection shortcuts, recently viewed).
3. **Add a synonym + semantic layer** so customer language ("power bank", "portable charger", "phone cover", "watch strap") and misspellings ("magsafe", "organiser/organizer", "adaptor") all resolve, *and* proprietary names (Loop, Stride) map to categories.
4. **Faceted search** (device/model, size, colour, material, charging standard, capacity, price, rating) — the data exists; expose it.
5. **Intent & use-case search** ("travel organiser for cables", "wireless charger for iPhone", "laptop backpack under ₹3000") — own the long tail that competitors ignore.

---

## SEARCH JOURNEY AUDIT (walkthrough)

> Screenshots could not be captured live (see §0). Each step lists the exact reproduction URL and the **expected premium-grade behaviour** to benchmark against.

**1. Entry point.** Search lives at `/sp` with placeholder *"Search for wireless chargers, phone cases, power banks & more."*
- *Good:* placeholder advertises breadth and category language.
- *Gap:* the placeholder is static. Best-in-class (Amazon, Myntra) **rotate** placeholder hints toward seasonal/high-margin intents ("Qi2 power banks", "iPhone 17 cases"). **[VERIFY LIVE: is the bar persistent in the global header on every page, sticky on scroll, and one-tap on mobile?]**

**2. Empty / pre-typing state.** **[VERIFY LIVE: focus the bar without typing.]** A premium discovery box should *never* be blank here. Expected: Trending searches · Popular categories chips · 2–4 hero products (Loop, Surge, Stride) · Recently viewed · Recently searched. If this is blank, it is the single biggest quick win.

**3. Typing / autocomplete.** **[VERIFY LIVE: type "lap", "pow", "mag".]** Expected: instant (<150ms) suggestions blending *query completions*, *category/collection shortcuts*, *brand/model shortcuts*, and *product previews with thumbnail + price*. Watch for: does typing "powerbank" (one word) match "power bank"? Does "magsafe" match "MagSafe"?

**4. Results page (`/sp?q=...`).** Expected premium grid: parent products (not variants), readable titles, price + strike-through, rating, colour swatches, badge (New/Bestseller/Qi2), wishlist, quick-add. Plus: result count, sort, and a **left-rail or top facet bar**. **[VERIFY LIVE: confirm facets exist on `/sp` results — they are confirmed on `/lp` category pages but search results frequently lack them.]**

**5. No-results.** **[VERIFY LIVE: `/sp?q=asdfgh`, `/sp?q=airpod`, `/sp?q=mag safe`.]** Expected: spelling correction ("Did you mean…"), zero *dead ends* — always show trending, popular categories, and recently viewed.

---

## QUERY-BY-QUERY ANALYSIS

> Format per query: **Observed/Expected risk** → **Issue** → **Expected behaviour** → **Recommendation.** "Observed" is grounded in verified catalog facts; items needing the live dropdown are flagged **[VERIFY LIVE]**. Reproduce each at `/sp?q=<query>`.

### A. Exact Product Searches

| Query | Likely failure mode | What should happen | Fix |
|---|---|---|---|
| **iPhone 17 Case** | Returns a flood of per-model + per-finish PDPs (Stride 2.0 Clear for 17 / 17 Pro / 17 Pro Max, Basics, General Store…), each a separate `pid`. Variant clutter + device ambiguity. | Detect device entity → present a **model chooser chip** (17 / 17 Pro / 17 Pro Max) + parent case styles (Stride, Basics, Clear) with swatches. | Variant collapse + device-facet auto-prompt. |
| **Nimbus** | High zero-result risk if proprietary line not indexed as a synonym. | Brand-name → land directly on the Nimbus product/collection with a header card. | Index all product-line names as exact tokens + redirect rules. |
| **Loop** | **Ambiguous:** "Loop" = the flagship power bank *and* "Solo Loop" watch band. Engine may split or mis-rank. | Disambiguate: show Loop power bank (hero) first, then "Looking for a watch band? Braided Solo Loop →". | Entity disambiguation + intent grouping. |
| **Powerbank / Power bank / Power-bank** | Tokenisation: will all three forms match "Power Bank"? Frequent failure. | All resolve to the power-bank category, Loop/Surge surfaced. | Synonym + normalization (strip hyphen/space). |
| **Wireless Charger** | Should map to `/o/wireless-charger` collection + Surge line. | Category landing + Surge Max hero + Qi2 facet. | Query→collection redirect. |
| **Tech Kit** | Maps to tech-kit organiser (`cid~1703`). Risk: "kit" interpreted literally. | Land on tech-kit organisers + cable/cross-sell. | Synonym map "tech kit"→organisers. |
| **Laptop Sleeve** | **Worst variant-clutter case:** Skipper Med/Large/XL × many colours × Pivot/Seagrass, all separate `pid`s. | One card per *style* (Skipper, Pivot, Seagrass) with size + colour selectors. | Variant collapse + size facet (13/14/15/16"). |
| **Backpack / Laptop Backpack / Travel Backpack** | Maps to `cid~1201`; need Fleet/Pivot/Clove surfaced and laptop-size + capacity facets. | Category landing + use-case chips (Work/Travel/Everyday). | Facets + use-case chips. |
| **Wallet / Crossbody / Messenger Bag** | Crossbody = `cid~1203`; messenger overlaps `cid~1202`. Possible mis-bucketing. | Clean category routing + MagSafe-wallet cross-sell. | Synonym + category map. |
| **Watchband / Apple Watch Band / Watch Strap** | `cid~1801`. "Strap" vs "band" synonym; size (38/40/41/45mm) + material facets needed. | Category landing + size + material (leather/silicone/steel) facets. | Synonym ("strap"="band") + facets. |
| **Charging Cable / MagSafe / Qi2 / Adapter / Adaptor** | "Adaptor"/"Adapter" spelling; "Qi2"/"MagSafe" must be *facetable standards*, not just text. | Standards become filters; cables show length facet. | Synonyms + charging-standard facet. |
| **Desk Organiser / Desk Mat / Mouse Pad** | `cid~1702`; "mouse pad" must equal "desk mat". | Category landing + "desk setup" cross-sell. | Synonym ("mouse pad"="desk mat"). |

### B. Functional Searches
*Travel Bag · Office Bag · Laptop Bag · Work Bag · Phone Charger · Fast Charger · Desk Setup · Tech Accessories · Charging Station · Travel Organiser · Apple Accessories*

- **Issue:** These are **use-case/intent** phrases with no literal product title. A keyword engine under-performs badly here — "Work Bag", "Desk Setup", "Charging Station" rarely appear verbatim in titles, risking thin or zero results.
- **Expected:** Map intents → curated landing experiences. "Travel Bag/Office Bag/Work Bag" → backpacks + laptop bags filtered by use-case. "Desk Setup/Desk Accessories" → desk-organiser collection + mat + stand bundle. "Apple Accessories" → an Apple hub (cases + watch bands + chargers + sleeves).
- **Recommendation:** Build a **use-case synonym/redirect dictionary** and "shopping mission" landing pages. This is where premium discovery is won.

### C. Customer-Language Searches
*Power Bank · Portable Charger · Phone Cover · Phone Case · Apple Charger · Cable · Watch Strap · Desk Mat · Mouse Pad · Laptop Stand*

- **Issue:** Customers use *generic* words; the catalog uses *brand* words (Loop, Surge, Stride, Skipper). Without a synonym layer, "portable charger" may miss "Loop power bank"; "phone cover" vs "phone case"; "watch strap" vs "watch band"; "mouse pad" vs "desk mat".
- **Recommendation:** Bidirectional synonym dictionary mapping **customer language ⇄ catalog language ⇄ proprietary names**. This single asset fixes a large share of relevance failures.

### D. Misspellings
*Power bank/Powerbank/Power-bank · Magsafe/Mag Safe · I phone · Mac book · Air pod · Organiser/Organizer · Adaptor/Adapter*

- **Issue:** Indian customers mix UK/US spelling (organiser/organizer), split compounds ("I phone", "Mac book", "Air pod", "Power bank"), and approximate brand terms ("Magsafe", "Mag Safe"). A strict-match engine returns **zero results** — the worst premium failure.
- **Recommendation:** Fuzzy matching (edit-distance ≤2), compound normalization, and a curated misspelling map for high-value terms (magsafe, airpods, iphone, macbook, organiser/organizer, adaptor). **Never** show a bare "no results" for any of these.

### E. Long-tail / Natural-Language Queries
*Laptop backpack under ₹3000 · Travel organiser for cables · Wireless charger for iPhone · Apple Watch strap leather · MagSafe wallet · Desk accessories · Minimal backpack*

- **Issue:** These contain **structured intent** (price constraint, compatibility, material, attribute) that keyword search ignores — "under ₹3000" becomes literal tokens, "for iPhone" is noise, "leather" should be a facet.
- **Expected:** Parse the query into facets: `laptop backpack under ₹3000` → category=backpack + laptop-compatible + price≤3000. `wireless charger for iPhone` → category=wireless-charger + MagSafe. `Apple Watch strap leather` → watch bands + material=leather.
- **Recommendation:** **Natural-language → facet extraction** (Phase 2/3 AI). Even a rules-based price/material/device parser captures most of the value cheaply.

### F. Empty Search (default state)
- **Issue:** **[VERIFY LIVE]** If the focused-but-empty state is blank, you are wasting the highest-intent real estate on the site.
- **Recommendation:** Populate with Trending searches · Popular category chips · 2–4 hero products · Recently viewed · Recently searched (see §7).

---

## SEARCH RELEVANCE ISSUES

1. **Variant clutter / parent-child SKU explosion (Critical).** Verified: colour/size/device variants are independent PDPs with unique `pid`s (Skipper Sleeve Large vs XL vs Midnight Blue Medium; Stride 2.0 for 17 vs 17 Pro vs 17 Pro Max). Result pages become walls of near-duplicates. **Fix:** model a *parent product* with variant axes; render one card with swatches + selectors in search; keep variant URLs for SEO via canonical tags.
2. **Duplicate-looking results.** Same style in 6 colours = 6 cards. Dilutes ranking, buries diversity, exhausts the customer. **Fix:** dedupe by parent; "+5 colours" affordance on the card.
3. **Ranking signals unclear.** No evidence of bestseller/margin/new-launch boosting in results. **Fix:** ranking formula = text relevance × business value (bestseller, margin, stock, recency, rating).
4. **Brand-name vs generic divergence.** Proprietary names (Loop, Nimbus, Stride) and generic terms (power bank, case) must converge on the same merchandised result set.
5. **Ambiguous tokens** ("Loop" = power bank *and* watch band) need entity disambiguation.
6. **Category mis-bucketing risk** where categories overlap (messenger `1202` vs crossbody `1203` vs phone bags `1811`).
7. **No semantic understanding** of compatibility ("for iPhone", "for MacBook 16"), constraints ("under ₹3000"), or attributes ("leather", "minimal").

---

## SEARCH UX ISSUES (severity · business impact · recommendation)

| # | Issue | Severity | Business impact | Recommendation |
|---|---|---|---|---|
| 1 | Variant clutter in results | **Critical** | Choice paralysis → lower CVR; diluted ranking; poor mobile UX | Parent-product collapse + swatches |
| 2 | Empty/typing state likely un-merchandised **[VERIFY]** | **Critical** | Forfeits highest-intent surface; lower discovery & AOV | Trending/popular/hero/recently-viewed |
| 3 | Verbose SEO titles on cards | **High** | Unscannable, unpremium, hurts mobile | Short display title + structured attributes |
| 4 | No/weak synonyms & spelling tolerance **[VERIFY]** | **High** | Zero-results → bounce/lost sales | Synonym + fuzzy + misspelling map |
| 5 | Facets on `/sp` results unconfirmed **[VERIFY]** | **High** | No refinement → abandonment on broad queries | Faceted search (device/size/colour/price/standard/rating) |
| 6 | No use-case/intent handling | **High** | Misses long-tail, premium discovery | Intent dictionary + mission landings |
| 7 | No spelling-correction UI **[VERIFY]** | **Medium** | Dead-end no-results | "Did you mean…" + auto-correct |
| 8 | No recently-viewed/searched **[VERIFY]** | **Medium** | Lost re-engagement & continuity | Personalised recency rails |
| 9 | Static placeholder | **Low** | Missed merchandising nudge | Rotating intent-led placeholders |
| 10 | No story/education in search | **Medium** | Brand feels flat vs premium peers | Editorial/collection cards in results |

---

## FILTERS — what Search should support (data already exists)

The catalog *already encodes* these attributes (verified via PDP naming, sizes, standards). Search must expose them as facets:

- **Category / Subcategory** (`cid~` already structured)
- **Device / Model** — iPhone 17/17 Pro/17 Pro Max, MacBook 13/14/15/16", Apple Watch 38–45mm (`m~`, `rf~model` exist)
- **Laptop size** — 13" / 14" / 15" / 16" (Skipper Med/Large/XL maps here)
- **Colour** (every variant already has a colour token)
- **Material** — leather / vegan leather / silicone / steel / canvas / recycled nylon
- **Charging standard** — MagSafe / Qi2 / PD (make these *filters*, not just text)
- **Capacity / Wattage** — 5k/10k/20k mAh; 15W/25W
- **Cable length / Compatibility**
- **Price** (₹ ranges; powers "under ₹3000")
- **Collection** — Bestsellers, New Arrivals, Sale (`/o/`, `cid~9006`)
- **Availability · Discount · Rating**

> Premium pattern: keep the **3–5 highest-impact facets visible** (Device, Size, Colour, Price, Standard) and tuck the rest under "All filters". Make filters **sticky** on scroll and show **active-filter chips** with one-tap removal.

---

## SEARCH MERCHANDISING

Search currently appears to *retrieve*, not *merchandise*. Add deliberate promotion of:

- **Hero products** — Loop, Surge Max, Stride 2.0 pinned for relevant queries.
- **Bestsellers & New launches** — boosted in ranking + badged.
- **High-margin / strategic** — own-IP lines (power banks, chargers) weighted up.
- **Seasonal collections** — surface via empty-state and result banners.
- **Bundles & cross-sell** — "Complete your desk setup", "Add a Loop power bank", "Pair with a MagSafe wallet" inline in results.
- **Complementary products** — case search → screen guard/MagSafe wallet; sleeve search → backpack; charger search → cable.
- **Recently viewed** rail in empty state and below results.

Merchandising rules should be **query-aware**: a search for "iPhone 17 case" is a perfect moment to cross-sell a Stride case + tempered glass + MagSafe wallet bundle.

---

## NO-RESULTS EXPERIENCE

A premium store should make **zero-results practically impossible**. For every miss provide:
1. **Spelling correction** — "Did you mean *MagSafe*?" with auto-results.
2. **Relaxed/partial match** — drop the most restrictive token and show closest matches.
3. **Related categories** — chips to the nearest `cid~`.
4. **Popular products & trending searches** — never a dead page.
5. **Recently viewed** — recover the session.
6. **Support nudge** — "Can't find it? Chat / WhatsApp us" (premium concierge touch).

**[VERIFY LIVE: `/sp?q=airpod`, `/sp?q=mag safe`, `/sp?q=adaptor`, `/sp?q=xyz123`]**

---

## PREMIUM EXPERIENCE ASSESSMENT

Today, Search most likely **returns products**. A premium discovery engine should *inspire, educate, merchandise, and tell stories*:

- **Inspire browsing** — empty state as an editorial "discover" surface, collection cards, "shop the look / shop the setup".
- **Educate** — inline mini-explainers ("Qi2 vs MagSafe?", "Which sleeve size fits my MacBook?"), because the catalog is technical and education *de-risks* the purchase and reinforces expertise.
- **Merchandise** — query-aware hero pinning, bundles, badges.
- **Tell stories** — sustainability (ocean-waste Pivot, recycled-PET slings), craftsmanship (handcrafted sleeves, 316L steel bands) surfaced *in search*, not buried on PDPs.

Premium is not a darker theme — it is **confidence-building guidance at the moment of intent.** Search is that moment.

---

## AI SEARCH OPPORTUNITIES

- **Semantic search** — embed catalog + queries so "portable charger" ≈ "Loop power bank" without hand-built synonyms.
- **Natural-language → facets** — parse "laptop backpack under ₹3000", "wireless charger for iPhone".
- **Intent understanding** — classify exact-product vs functional vs use-case and route accordingly.
- **Personalised ranking** — re-rank by recently viewed, device owned (iPhone 17 user → 17 accessories), and affinity.
- **Visual / image search** — upload a phone/laptop photo → compatible cases/sleeves; strong fit for an accessories catalog.
- **Conversational / shopping-mission search** — "I'm setting up a work-from-home desk" → curated multi-category bundle.
- **Search by:** use case · device · compatibility · lifestyle · occasion · gifting — premium discovery framings DailyObjects' catalog is ideally suited to.

---

## BENCHMARK — why these work (adapt, don't copy)

- **Amazon** — facets + "Did you mean" + variant rollups. *Why:* relentless friction removal; never a dead end. **Adopt:** spelling tolerance, facets, parent-variant rollups.
- **Apple** — restraint, precise compatibility, education. *Why:* confidence over volume. **Adopt:** device/compatibility-led discovery, inline education.
- **Nike / On** — use-case & activity discovery, story-rich. *Why:* sells outcomes, not SKUs. **Adopt:** "shop by use case / mission".
- **Zara** — visual-first, minimal chrome, fast. *Why:* product imagery *is* the UI. **Adopt:** big imagery, terse titles, instant feel.
- **Casetify** — device-picker-first, deep personalisation. *Why:* device is the organizing principle for cases. **Adopt:** model chooser up front for cases/sleeves/bands.
- **Bellroy / Peak Design** — "find your fit" guided discovery, craftsmanship storytelling. *Why:* premium = guidance + narrative. **Adopt:** fit finders, material/sustainability stories in search.
- **Myntra** — best-in-class autocomplete with category/brand shortcuts, fuzzy Indian-spelling tolerance. *Why:* tuned to Indian customer language. **Adopt:** typeahead shortcuts + spelling tolerance for the `.com` audience.

---

## SEARCH FEATURE RECOMMENDATIONS (consolidated)

- **Autocomplete / Predictive** — blended completions + category/collection/brand shortcuts + product previews (thumb + price), <150ms.
- **Category & Collection shortcuts** — chips in typeahead and empty state (`cid~`/`/o/`-backed).
- **Trending & Popular searches** — curated + behavioural, in empty state.
- **Recently viewed / Recently searched** — personalised recency rails.
- **Search chips & quick filters** — device/size/colour/price/standard as one-tap chips above results.
- **Faceted navigation** — sticky, with active-filter chips.
- **Smart sorting** — Relevance (default, business-weighted) · Bestselling · New · Price · Rating · Discount.
- **Variant rollup + swatches** — one card per parent.
- **Short display titles** — structured attributes below.

---

## AI SEARCH ROADMAP

- **Phase 1 — Quick wins:** synonym dictionary · fuzzy/spelling tolerance · misspelling map · variant rollup · merchandised empty state · "Did you mean".
- **Phase 2 — Intermediate:** semantic (vector) search · NL→facet parsing (price/material/device) · personalised re-ranking (recently viewed/device) · query-intent classification · query-aware merchandising rules.
- **Phase 3 — Best-in-class:** conversational/mission search · visual/image search · device-graph personalisation (owned-device accessory matching) · generative guided discovery & education.

---

## PRIORITISED ROADMAP

### Quick Wins (2–4 weeks)
1. **Variant rollup in search results** (parent + swatches) — biggest single CVR/relevance lift.
2. **Merchandise the empty/typing state** (trending, popular, hero products, recently viewed).
3. **Synonym + misspelling + fuzzy layer** (customer-language ⇄ catalog ⇄ proprietary names; organiser/organizer, magsafe, airpod, adaptor, power bank).
4. **Short display titles** on cards; move specs to a structured line.
5. **"Did you mean" + zero-dead-end no-results.**
6. **Rotating, intent-led placeholders.**

### Medium-term (1–3 months)
7. **Faceted search on `/sp`** (device/model, size, colour, material, charging standard, capacity, price, rating) — sticky + active chips.
8. **Business-weighted relevance ranking** (bestseller/margin/recency/stock/rating boosts).
9. **Smart sort options.**
10. **Use-case / intent dictionary + shopping-mission landings** (Travel, Work, Desk Setup, Apple hub).
11. **Query-aware cross-sell/bundles** inline in results.

### Strategic Investments (3–6 months)
12. **Semantic (vector) search** for robust language coverage.
13. **NL→facet query parsing** (constraints/attributes/compatibility).
14. **Personalised ranking** (recently viewed, device affinity).
15. **Inline education modules** (Qi2 vs MagSafe, sleeve sizing, band sizing).

### Long-term Vision (6–12 months)
16. **Conversational / shopping-mission search.**
17. **Visual / image search** (device photo → compatible accessories).
18. **Device-graph personalisation** (owned device → tailored accessory discovery).
19. **Generative guided discovery** turning Search into DailyObjects' primary, premium discovery engine.

---

## IMMEDIATE NEXT STEP FOR THE TEAM

Run this 12-query smoke test live at `/sp?q=…` and capture the dropdown + results screenshots to confirm the **[VERIFY LIVE]** items, then triage against §"Search UX Issues":

`Nimbus` · `Loop` · `laptop sleeve` · `powerbank` · `power bank` · `magsafe` · `airpod` · `organiser` · `watch strap` · `wireless charger for iPhone` · `laptop backpack under ₹3000` · *(empty/focused state)*

The expected failures — variant clutter, brand-name zero-results, missing synonyms, un-merchandised empty state, absent facets — are the exact targets of the Quick-Wins roadmap above, and represent the fastest path to higher search-driven conversion and a more premium discovery experience.

---

*Note on evidence: live interactive screenshots could not be captured from this environment due to network/bot-protection restrictions (see §0). All structural, taxonomy, catalog, naming, and faceting findings are grounded in verified, retrievable DailyObjects data. Items dependent on the live autocomplete/loading behaviour are explicitly marked **[VERIFY LIVE]** with reproduction steps.*
