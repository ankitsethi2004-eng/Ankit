# DailyObjects — Birthday Campaign Weekend Revenue Spike
## Root Cause Analysis

**Author:** Head of Growth & Analytics
**Date:** 29 June 2026
**Window analysed:** Campaign weekend **Fri 26 – Sun 28 June** vs comparison periods
**Data sources used:** Daily MIS Report (`Daily_MIS_Report_1.xlsx` — June 2026 daily sheet + Traffic Sheet, all platforms), Website line-item sales dump (`website_sales_29th_june.xlsx` — 172,240 order lines, Apr–Jun, order/SKU/sub-category/qty level), CRM campaign performance snapshot (WhatsApp / Push / Email).

> **Calendar note:** 1 June 2026 = Monday. Therefore campaign launch Friday = **26 Jun**, weekend = **27–28 Jun**. The cleanest counterfactual is the **same weekday one week earlier (19–21 Jun)**, which I use throughout.

---

## 0. The one-sentence answer

> **Revenue spiked because ~50% more *orders* were placed, and that order growth was ~75% a conversion-rate jump and ~25% a traffic increase — both ignited by the Birthday campaign turning the freebie into a near-universal "free birthday gift with every order" and amplifying it through a heavy WhatsApp/Email/Push CRM blitz and scaled-but-more-efficient paid media. Basket size and AOV did *not* drive the spike; the apparent "basket doubling" is an accounting artefact of the free gift being logged as a ₹0 line item.**

The single most important and counter-intuitive finding: **paid units-per-order stayed flat at ~1.5 all month, including the spike days.** Anyone reading the raw MIS would conclude "basket size doubled from 1.4 → 2.7." It did not. See §2 and §9.

---

# 1. Executive Summary — Top 10 Insights

| # | Insight | Evidence | Confidence |
|---|---------|----------|-----------|
| 1 | **The spike is an order-volume / conversion event, not a basket or AOV event.** | Weekend orders 4,830 vs prior weekend 3,222 (**+49.9%**); revenue +49.5%; AOV essentially flat (₹2,693 vs ₹2,701). | **High** |
| 2 | **"Basket size doubled" is an artefact.** The free gift is booked as a ₹0–₹47 line item. **Paid** units/order = 1.50 / 1.51 / 1.52 on Jun 26-28 — identical to the ~1.45–1.55 baseline. | Raw line-item dump, gift SKUs excluded. | **High** |
| 3 | **The campaign's real mechanical change: the gift went from threshold-gated to near-universal.** Orders receiving a gift: ~19% (Jun 20-25, the ₹4,499 freebie) → **79% → 99% → 99.9%** (Jun 26-28). | Raw dump, % orders with gift/₹0 line. | **High** |
| 4 | **Conversion did the heavy lifting (~75% of growth).** Weekend conv ~0.66% vs prior weekend ~0.52% (**+27%**); orders/session +35%. Traffic only +10.8%. | MIS Traffic Sheet. | **High** |
| 5 | **The ₹4,499 threshold caused measurable basket bunching.** Orders in ₹4,000–4,498 (just below) fell 166→74; orders in ₹4,499–4,999 (just above) jumped 98→229. Customers added items to qualify. | Raw dump, order-value histogram. | **High** |
| 6 | **Premium MagSafe Qi2 power-banks were the qualification engine.** Top 4 revenue-gaining SKUs are 20000/10000mAh power-banks (₹5k–9k each); three 20000mAh variants went **0 → ₹271k / ₹200k / ₹160k** (new launches). Wireless Charger category = **+₹1.01M, 23% of all growth**. | Raw SKU/category dump. | **High** |
| 7 | **CRM was a major amplifier.** Birthday WhatsApp + Push + Email drove **₹1.16M click-through revenue / 353 orders** over the campaign (WhatsApp alone ₹0.87M, ROMS 3.2). This is the warm-intent fuel behind the conversion jump. | CRM snapshot. | **Medium-High** |
| 8 | **Paid media was scaled *and* got more efficient — not just scaled.** Saturday Meta: spend +21%, revenue +51%, **ROAS 3.07 → 3.82 (+24%)**. Google: spend +22%, revenue +62%, **ROAS 4.55 → 6.04 (+33%)**. Efficiency improvement signals a genuine demand/offer effect, not just budget. | MIS Ads block. | **High** |
| 9 | **Launch-day (Fri) was warm, not wide.** Friday traffic actually *dipped* (193k vs 266k Thu) yet conversion was the month's highest (0.68%) — a smaller, hotter, CRM-primed audience. The spike is quality of demand, not just quantity. | MIS Traffic Sheet. | **High** |
| 10 | **AOV was flat-to-slightly-down despite a "premium" narrative.** Price-per-paid-unit fell ~₹1,600→₹1,000 because a flood of cheap attach units (Phone Lanyards 44 → 5,437 units, ~₹63 each) entered baskets. Volume, not value, carried the weekend. | Raw dump, rev-per-unit distribution. | **High** |

---

# 2. Step 1 — Revenue Overview (Daily June Trend)

Daily totals (all platforms; orders/revenue/units from line-item dump, sessions & conversion from MIS Traffic Sheet):

| Date | Day | Sessions | Orders | Conv% | Revenue ₹ | Units | AOV ₹ | Units/Ord (reported) | **Paid Units/Ord** |
|------|-----|---------:|-------:|------:|----------:|------:|------:|---------------------:|-------------------:|
| Jun 16 | Tue | 187,131 | 1,067 | 0.59% | 2,476,820 | 1,556 | 2,321 | 1.46 | 1.46 |
| Jun 17 | Wed | 173,572 | 1,047 | 0.62% | 2,333,501 | 1,457 | 2,229 | 1.39 | 1.39 |
| Jun 18 | Thu | 188,949 | 1,047 | 0.58% | 2,432,435 | 1,445 | 2,323 | 1.38 | 1.38 |
| **Jun 19** | **Fri** | 184,088 | 1,036 | 0.58% | 2,497,230 | 1,489 | 2,410 | 1.44 | 1.41 |
| **Jun 20** | **Sat** | 231,494 | 1,050 | 0.46% | 3,025,550 | 1,937 | 2,881 | 1.84 | 1.63 |
| **Jun 21** | **Sun** | 225,071 | 1,136 | 0.51% | 3,180,350 | 2,008 | 2,800 | 1.77 | 1.57 |
| Jun 22 | Mon | 208,679 | 1,146 | 0.57% | 3,078,263 | 2,044 | 2,686 | 1.78 | 1.60 |
| Jun 23 | Tue | 245,628 | 1,074 | 0.44% | 2,954,578 | 1,879 | 2,751 | 1.75 | 1.57 |
| Jun 24 | Wed | 270,560 | 1,131 | 0.42% | 3,475,961 | 2,155 | 3,073 | 1.91 | 1.71 |
| Jun 25 | Thu | 266,493 | 1,266 | 0.48% | 3,614,271 | 2,287 | 2,855 | 1.81 | 1.61 |
| **🎂 Jun 26** | **Fri** | **193,029** | **1,304** | **0.68%** | **3,451,602** | **3,177** | **2,647** | **2.44** | **1.50** |
| **🎂 Jun 27** | **Sat** | **258,690** | **1,720** | **0.64%** | **4,603,129** | **4,623** | **2,676** | **2.69** | **1.51** |
| **🎂 Jun 28** | **Sun** | **258,390** | **1,806** | **0.65%** | **4,958,705** | **4,900** | **2,746** | **2.71** | **1.52** |

### Spike day vs baselines (same-weekday is the honest comparison)

| Metric | **Sat 27 Jun** | Prior Sat (20 Jun) | Δ vs same wkday | Prev-7-day avg | Prev-14-day avg | MTD avg |
|--------|---------:|---------:|:---:|---------:|---------:|---------:|
| Revenue | ₹4.60M | ₹3.03M | **+52%** | ₹3.12M (+47%) | ₹2.84M (+62%) | ₹2.77M (+66%) |
| Orders | 1,720 | 1,050 | **+64%** | 1,120 (+54%) | 1,086 (+58%) | 1,072 (+60%) |
| AOV | ₹2,676 | ₹2,881 | **−7%** | ₹2,784 (−4%) | ₹2,612 (+2%) | ₹2,587 (+3%) |

| Metric | **Sun 28 Jun** | Prior Sun (21 Jun) | Δ vs same wkday |
|--------|---------:|---------:|:---:|
| Revenue | ₹4.96M | ₹3.18M | **+56%** |
| Orders | 1,806 | 1,136 | **+59%** |
| AOV | ₹2,746 | ₹2,800 | **−2%** |

**Read:** Across every baseline the pattern is identical — revenue up 47–66%, **orders up 54–64%, AOV flat-to-negative.** Revenue growth ≈ order growth. That alone rules out "people bought bigger baskets" and points the investigation squarely at *why more orders closed.*

---

# 3. Step 2 — Growth Decomposition

Weekend (26-28 Jun) vs prior weekend (19-21 Jun), the clean same-weekday counterfactual:

```
Revenue   = Sessions × (Orders/Session) × AOV
Δ Revenue: 8.70M → 13.01M   = +49.5%
Δ Sessions:        640,653 → 710,109   = +10.8%
Δ Conversion:      0.503%  → 0.680%    = +35.3%  (orders/session)
Δ AOV:             2,701   → 2,693     = −0.6%
Check: 1.108 × 1.353 × 0.994 = 1.492  ✓ (+49.2% ≈ observed +49.5%)
```

### Contribution of each driver (log-share attribution of the +49.5%)

| Driver | Est. share of growth | Est. ₹ contribution | Confidence | Why |
|--------|:---:|---:|:---:|-----|
| **Conversion-rate improvement** | **~74%** | **~₹3.2M** | High | Orders/session +35% on flat AOV; the dominant lever. |
| **Traffic increase** | **~26%** | **~₹1.1M** | High | Sessions +10.8%; real but secondary. |
| AOV / basket value | ~−1% | −₹0.05M | High | Flat-to-down. **Did not contribute.** |

### Why did *conversion* improve? (the second "why")

The +35% conversion lift is the real prize. Decomposing the *causes* of conversion (these overlap; ranges reflect attribution uncertainty without a holdout):

| Conversion sub-driver | Est. share of the conversion lift | Confidence | Evidence |
|-----------------------|:---:|:---:|----------|
| **Free "Birthday gift with every order" offer + messaging** (the repackaged freebie, now near-universal) | **40–55%** | Medium-High | Gift attach 19%→99%; offer is the single biggest changed variable; threshold bunching proves the gift mechanic changed behaviour (§6). |
| **CRM blitz (WhatsApp/Email/Push)** driving warm, ready-to-buy intent | **20–30%** | Medium-High | ₹1.16M CRM click-through revenue, 353 orders; Friday's warm-but-small audience (§9). |
| **Paid-media efficiency** (Meta/Google ROAS +24–33% at scaled spend) | **15–25%** | Medium | Better creative/offer lifted on-site CVR of paid clicks, not just more clicks. |
| **New premium SKU launches** (Qi2 power-banks) giving high-AOV reasons to buy/qualify | **5–10%** | Medium | Top-4 revenue gainers; 0→₹630k combined. |

> **Observation vs Conclusion:** That conversion drove the spike is a **data-backed conclusion** (High). The *split of conversion across offer/CRM/paid* is a **hypothesis-with-evidence** (Medium) — it cannot be cleanly separated without a geo/audience holdout (see §9 recommendations).

---

# 4. Step 3 — Traffic Analysis

Platform-level (the dataset provides platform, not marketing-channel, session splits — see data gap below):

| Platform | Wknd Sessions | Prior-wknd | Δ | Wknd Conv% | Prior Conv% |
|----------|------:|------:|:--:|---:|---:|
| Total | 710,109 | 640,653 | **+10.8%** | 0.66% | 0.52% |
| Website (desktop+mweb) | 673,741 | 612,029 | +10.1% | ~0.51% | ~0.39% |
| Android app | 8,731 | 6,816 | +28% | ~2.5% | ~2.6% |
| iOS app | 27,637 | 20,808 | +33% | ~3.7% | ~2.8% |

**Two things stand out:**
1. **Traffic grew far less than orders** (+11% vs +50%) → confirms conversion, not reach, drove revenue.
2. **App traffic grew fastest (+28–33%)** and apps convert ~6–7× the website — a meaningful, under-credited contributor. App users are the existing/loyal base most reachable by CRM (push + WhatsApp).

### Marketing-channel attribution (from MIS Ads block)

| Channel | Wknd Spend | Wknd Revenue | Wknd ROAS | Prior ROAS | ROAS Δ |
|---------|------:|------:|---:|---:|:--:|
| **Meta** | ₹2.52M | ₹8.43M | 3.34 | 2.83 | **+18%** |
| **Google** | ₹0.81M | ₹4.80M | 5.90 | 4.91 | **+20%** |
| **CRM (WA+Push+Email)** | n/a (owned) | ₹1.16M click-thru | ROMS 3.2 (WA) | — | new |

> **Data gap (flagged honestly):** The files do **not** contain a GA4 channel-grouping breakdown (Organic / Direct / Referral / Affiliate / Influencer / Display / Social sessions). I can attribute Meta, Google and CRM precisely; the residual traffic lift (~+11% sessions on roughly flat non-paid spend) is most consistent with **CRM-driven direct/organic returning users** plus paid click volume, but I will not invent channel-level session numbers. **Recommendation: connect GA4 channel export for the next event.**

---

# 5. Step 4 — Performance Marketing RCA

**Same-weekday detail (Sat 27 vs Sat 20):**

| | Meta Sat 27 | Meta Sat 20 | Δ | Google Sat 27 | Google Sat 20 | Δ |
|--|---:|---:|:--:|---:|---:|:--:|
| Spend | ₹895k | ₹739k | +21% | ₹291k | ₹238k | +22% |
| Revenue | ₹3.42M | ₹2.27M | **+51%** | ₹1.76M | ₹1.09M | **+62%** |
| ROAS | 3.82 | 3.07 | **+24%** | 6.04 | 4.55 | **+33%** |

**What changed in Meta?** Spend was scaled a modest +21%, but revenue rose +51% → **the incremental rupee was more productive, not just more numerous.** A 24% ROAS lift at increased spend (normally ROAS *decays* as you scale) is the signature of a stronger **offer + creative** (Birthday gift) raising landing-page→purchase conversion, plus warmer retargeting pools primed by CRM.

**What changed in Google?** Even sharper efficiency gain (+33% ROAS). Google's blended ROAS (~6) reflects brand/PMAX harvesting demand *created* by the campaign and CRM — classic "Google catches the intent that Meta/CRM generate."

**Causal verdict:**
- "Revenue rose because Meta spend rose." → **Confidence: Low** (spend only +21%, can't explain +50%).
- "Revenue rose because the offer lifted on-site conversion of existing paid + CRM traffic, so the *same-ish* spend converted far better." → **Confidence: High.**

Existing campaigns were **scaled AND improved**; the improvement (efficiency) is the larger, more durable effect.

---

# 6. Step 9 — Free Gift / ₹4,499 Threshold Analysis *(answered early — it's the crux)*

### 6a. The gift mechanic changed, and it's logged as ₹0

| Period | % orders with a gift line | Gift unit price | Mechanic |
|--------|:--:|:--:|--------|
| Jun 1–14 (old freebie) | 8–14% | ~₹0 | Legacy freebie |
| Jun 15–18 (gap) | ~0% | — | Freebie paused |
| Jun 20–25 (₹4,499 freebie) | ~19% | ~₹0 | Threshold-gated |
| **Jun 26–28 (Birthday)** | **79% → 99% → 99.9%** | ~₹0–47 | **Repackaged "gift with (almost) every order"** |

The Birthday repackaging effectively **universalised** the gift. `SURP-GIFT-BDAY` (~1,500 units/day) and `BRTHDY-MYSTRY-GIFT` (~290/day) are booked at a token value, which is exactly why **reported units/order doubled while paid units/order and AOV stayed flat.**

### 6b. The threshold *did* move money — bunching is unambiguous

Order-value histogram, 3-day totals:

| Order-value band | Prior weekend | Campaign weekend | Δ |
|------------------|:--:|:--:|:--:|
| ₹3,500–3,999 | 99 | 122 | +23 |
| **₹4,000–4,498 (just below)** | **166** | **74** | **−92** |
| **₹4,499–4,999 (just above ★)** | **98** | **229** | **+131** |
| ₹5,000–5,499 | 69 | 122 | +53 |
| ₹5,500–5,999 | 117 | 178 | +61 |

The "just-below" band **collapsed** and the "just-above" band **more than doubled** — customers added items to clear ₹4,499. This is causal, not correlational.

### 6c. What they added: premium power-banks

Top revenue-gaining SKUs are MagSafe Qi2 power-banks (₹5k–9k), three 20000mAh variants launched **0 → ₹271k / ₹200k / ₹160k** over the weekend. Wireless Charger category **+₹1.01M (23% of total growth)**. The threshold + new premium launches = a deliberate, working "trade-up to qualify" engine.

### 6d. Incremental revenue from the threshold mechanic

Conservative estimate — the basket-value lift from bunching + premium attach attributable to the threshold:
- Net ~92 orders/weekend shifted from below to above ₹4,499, plus +114 orders in the ₹5,000–5,999 bands, at ~₹500–1,200 marginal uplift each ≈ **₹0.4–0.7M**.
- This is **~10–16% of the +₹4.31M weekend growth**. The threshold is a real but **secondary** driver versus the conversion/order-count effect.

> **Cost flag:** Giving a gift on **99.9%** of orders (not just ≥₹4,499) is a large unbudgeted COGS line and dilutes the threshold's trade-up incentive. The gift's *job* is to lift conversion (which it did); but as a near-universal giveaway it is no longer a margin-efficient AOV lever. See recommendations.

---

# 7. Step 7 — Category RCA

Campaign weekend vs prior weekend, +₹4.31M (+49.5%) total:

| Category | Wknd Rev | Prior Rev | Δ ₹ | % of growth | Verdict |
|----------|------:|------:|------:|:--:|--------|
| **Wireless Charger** (power-banks) | 3.71M | 2.71M | **+1,007,742** | **23.4%** | ★ Threshold trade-up engine |
| **Designer Cases** (hero) | 2.62M | 1.79M | **+831,287** | **19.3%** | ★ Broad-based core demand, qty +45% |
| Backpacks | 0.86M | 0.50M | +357,644 | 8.3% | High-AOV qualifier |
| Organisers | 0.92M | 0.63M | +291,239 | 6.8% | Attach |
| **Phone Lanyards** | 0.34M | 0.06M | +282,483 | 6.6% | Cheap (~₹63) attach, qty **44→5,437** |
| Laptop Bags/Sleeves | 0.49M | 0.27M | +218,619 | 5.1% | High-AOV qualifier |
| Watch Straps | 0.50M | 0.32M | +186,325 | 4.3% | Attach |
| Desks | 0.53M | 0.35M | +179,716 | 4.2% | High-AOV qualifier |
| Tote / Messenger / Tablet | ~1.15M | ~0.72M | +438k | ~10% | Bags broadly up |
| **Decliners** | | | | | Pouches −34.6k, Diwali Bundles −7k, AirTag −5.2k |

**Read:** Growth is **broad-based** (a true demand event, not one hero SKU), but **concentrated at the two poles**: high-AOV qualification products (power-banks, bags, desks → cross ₹4,499) and cheap attach items (lanyards, cable protectors → pad the basket / ride the gift). The flat middle and small decliners (Pouches, seasonal bundles) confirm there was **no sitewide-discount-led churn of low-margin volume** — consistent with the "no discount" campaign design.

---

# 8. Step 8 — SKU RCA

| Theme | Finding |
|-------|---------|
| **Top revenue gainers** | TITNM/BLUE/BLK-LOP-MAGSF-QI2-PWR-BNK-20000MH (₹271k/200k/160k, all 0→launch), BLUE-...10000MH (+₹102k). Power-banks own the leaderboard. |
| **Fastest-growing by units** | Phone Lanyards (44→5,437), `SURP-GIFT-BDAY` gift (0→1,496/day), `BRTHDY-MYSTRY-GIFT` (0→288/day). |
| **Highest-AOV products driving qualification** | 20000mAh power-banks (~₹9k), Daypacks/Backpacks (~₹3.5k), Tech Kits, Loft Charging Station 65W. |
| **Natural bundles / attachment** | iPhone 17 Pro leather MagSafe cases + power-bank + lanyard appear together in qualifying baskets; "case + charger + cheap attach" is the recurring weekend basket shape. |
| **Free-gift threshold pulling premium?** | **Yes — directly.** Power-bank launches are the #1 revenue gainers and the #1 reason marginal baskets cross ₹4,499 (§6b bunching). |

---

# 9. Step 5 & 10 — Funnel & Customer Behaviour

### Funnel (the data resolves to sessions → orders; intermediate PDP/ATC/checkout steps are not in these files)

```
                    Prior weekend      Campaign weekend     Δ
Sessions            640,653            710,109             +10.8%
│                                                          (modest)
▼
Orders (purchase)   3,222              4,830               +49.9%
│                                                          ★ THE STEP THAT MOVED
▼
Session→Order CVR   0.503%             0.680%              +35.3%
▼
Revenue             ₹8.70M             ₹13.01M             +49.5%
```

**Where the funnel improved:** overwhelmingly at the **session→purchase** step (CVR +35%). Reach (sessions) barely moved. Because granular PDP/ATC/checkout steps aren't in the dataset, I flag this as a **data gap** — *connect GA4 funnel events to localise whether the lift was at ATC (offer-driven desire) vs checkout (gift removing last-mile hesitation). Hypothesis: ATC, given the offer is the changed variable.*

### Customer behaviour
- **Paid basket flat (1.5 units), AOV flat:** existing buying patterns held; the campaign **converted more of the same kind of customer**, it did not change what each customer buys.
- **Price-per-unit fell ₹1,600→₹1,000:** driven entirely by cheap attach + ₹0 gift units, not discounting of core SKUs.
- **App share rising (+28–33% app sessions, 6–7× CVR):** the loyal/returning base (most CRM-reachable) over-indexed in the lift.
- **Payment mix stable:** Prepaid ~76–78%, COD ~22–24% across the weekend — no quality-of-order degradation.

> **Data gap:** No customer-ID field → **New vs Returning, repeat-purchase, session duration, pages/session, search usage** cannot be computed from these files. *Recommend exporting GA4 user-type + a customer-keyed order export for the next RCA.* Directional inference (app-share + CRM revenue) points to **returning customers** as the disproportionate driver — **Confidence: Medium.**

---

# 10. Step 6 — CRM RCA

| Channel | Click-through Revenue | Delivered | Orders | Conv | Notes |
|---------|------:|------:|---:|---:|------|
| **WhatsApp (Birthday O1/O2/O3 ± stores)** | **₹874,205** | 304,115 | 279 | 1.2% | ROMS 3.2; O3+ & O1/RNB segments CTR 7.9–9.7% (very strong); O3+ ₹261,843 top |
| **Push (Live / Collectible / Mystery / Sale-ending)** | **₹187,280** | — | 47 | 0.7% | "Birthday Live" ₹59,938 best |
| **Email (O2/O3+ & O1/RNB)** | **₹102,714** | 204,897 | 27 | 0.8% | O2/O3+ open 28%, ₹93,860; O1/RNB weak (11% open) |
| **CRM Total** | **₹1,164,199** | ~700k+ | **353** | — | — |

**How much revenue did CRM influence?** ₹1.16M is the **last-click CRM-attributed** figure (~9% of weekend revenue directly). Its true influence is larger because CRM **primed the audiences that paid media then retargeted** — the most plausible explanation for Meta/Google ROAS rising at scaled spend, and for Friday's small-but-hot, high-CVR audience.

**Best performer:** **WhatsApp O3+/O1 segments** — highest CTR (8–10%) and ROMS, clearly the CRM workhorse. **Worst:** Email to O1/RNB (11% open) and Push Mystery Gift-2 (0.8% CTR) — low-value, candidates to cut.

**Did CRM amplify paid traffic?** **Yes (Medium-High).** The sequence — CRM blast → warm users return direct/app → Meta/Google retarget the same warm pool at higher CVR → ROAS up — is the most coherent read of (a) flat-ish spend with +50% paid revenue and (b) app-session over-indexing.

---

# 11. Step 11 — Merchandising

The dataset has no on-site behavioural/merchandising telemetry (banner clicks, collection CTR, recommendation attach), so this is **hypothesis-with-circumstantial-support, not proof:**
- **Birthday branding/hero banners + a dedicated "free gift" collection** are consistent with the broad-based category lift (every major category up) and the CVR jump — a coordinated storewide message tends to lift conversion globally, which is what we see.
- **Product sequencing toward power-banks/qualifiers** is consistent with power-banks topping the gainer list.
- **Confidence: Medium-Low** until merchandising/clickstream data is connected.

---

# 12. Step 12 — Attribution: Correlation vs Causation

| Claim | Verdict | Confidence | Reasoning |
|-------|---------|:--:|-----------|
| Revenue rose because traffic rose | Partly — minority driver | High (it's only ~26%) | Sessions +11% vs revenue +50%. |
| Revenue rose because Meta/Google spend rose | **Mostly false** | High | Spend +21%; can't explain +50%. |
| Revenue rose because **conversion improved** | **True — primary** | High | Orders/session +35% on flat AOV. |
| Conversion improved because of the **free-gift offer + birthday messaging** | True — largest single cause | Medium-High | Only major changed variable; threshold bunching proves the mechanic changed behaviour. |
| Conversion improved because **CRM drove warm intent** | True — major amplifier | Medium-High | ₹1.16M CRM revenue; app-session over-index; Friday warm-audience signature. |
| Paid media got **more efficient** (not just bigger) | True | High | ROAS +24–33% at scaled spend. |
| **₹4,499 threshold** lifted basket value | True — secondary (~10–16%) | High | Below-band collapsed, above-band doubled. |
| "Basket size doubled" | **FALSE — artefact** | High | Paid units/order flat at 1.5; the gift is a ₹0 line. |
| AOV drove the spike | **FALSE** | High | AOV flat-to-down across all baselines. |

---

# 13. Final Deliverables

## 13.2 Growth Driver Table

| Driver | Est. Revenue Contribution | Confidence | Evidence |
|--------|:--:|:--:|----------|
| **Conversion-rate lift (offer + CRM + creative)** | **~₹3.0–3.2M (~70–74%)** | High | Orders/session +35%, AOV flat |
| **Traffic increase** | **~₹1.0–1.1M (~25%)** | High | Sessions +10.8% |
| ↳ of which **free-gift offer/messaging** (within conversion) | ~₹1.4–1.8M | Medium-High | Gift attach 19%→99.9%; bunching |
| ↳ of which **CRM blitz** (within conv + traffic) | ~₹0.8–1.2M | Medium-High | ₹1.16M click-thru; app over-index |
| ↳ of which **paid-media efficiency** | ~₹0.6–1.0M | Medium | ROAS +24–33% at scaled spend |
| **₹4,499 threshold basket trade-up** | ~₹0.4–0.7M (~10–16%) | High | Histogram bunching, power-bank surge |
| AOV / basket value | ~₹0 (slightly negative) | High | Flat-to-down |
| *(Total weekend growth)* | **+₹4.31M (+49.5%)** | — | 8.70M→13.01M |

*(Sub-driver ranges overlap because offer, CRM and paid jointly produced the conversion lift; they sum to more than the conversion line and cannot be cleanly separated without a holdout.)*

## 13.8 What Worked — ranked by impact
1. **Universal "free birthday gift" offer + messaging** — biggest conversion lever.
2. **CRM blitz (WhatsApp O3+/O1 the workhorse)** — warm-intent fuel + paid amplifier.
3. **More efficient paid media** (ROAS up at scale).
4. **₹4,499 threshold + new premium power-bank launches** — basket trade-up engine.
5. **App channel** (high-CVR returning base) over-indexing.
6. (Did *not* work as a lever: basket size, AOV, sitewide discounting — by design there was none.)

---

# 14. Recommendations / Next-Campaign Actions

**Immediate / repeat:**
1. **Keep the "free gift" as a conversion device — but re-gate it.** It clearly lifts CVR, but giving it on 99.9% of orders is unbudgeted COGS and kills the trade-up incentive. **Re-anchor it to a threshold** (test ₹2,999 vs ₹4,499) so it lifts CVR *and* AOV.
2. **Double down on WhatsApp O3+/O1 segments** (ROMS 3.2, CTR 8–10%). **Cut** Email-to-O1/RNB (11% open) and Push "Mystery Gift-2" (0.8% CTR).
3. **Pre-load premium SKU launches (power-banks/qualifiers) just above the threshold** — they were the top revenue gainers and the qualification engine. Merchandise a "₹X more for a free gift" nudge on PDP/cart.
4. **Hold the warm-then-scale sequence:** CRM blast Friday → let Meta/Google retarget the warmed pool. The ROAS gains came from converting warm demand, not buying cold reach.

**Make standard playbook:**
- Always report **paid units/order** alongside reported units/order; never let ₹0 gift lines masquerade as basket growth.
- Always benchmark spike days against **same-weekday prior week**, not just trailing averages.

**Experiments for the next sale (to convert Medium-confidence into High):**
1. **Geo / audience holdout** on the free-gift offer to *measure incrementality* of the gift on CVR (the single biggest open question).
2. **Threshold A/B** (₹2,999 vs ₹3,999 vs ₹4,499) to find the CVR-vs-AOV-vs-margin optimum.
3. **CRM holdout** (suppress 10% of WhatsApp O3+) to quantify true CRM incrementality vs last-click.
4. **Connect GA4** channel + funnel + user-type exports so the next RCA can resolve New-vs-Returning, ATC-vs-checkout, and channel-level traffic (the three gaps in this analysis).

---

# 🎂 Birthday Campaign Playbook (repeatable learnings)

| Lever | Learning | Tactic to repeat |
|-------|----------|------------------|
| **Offer** | A near-free "gift with order" lifts **conversion**, not basket. | Use a gift to lift CVR; **gate it on a threshold** to also lift AOV. |
| **Measurement** | ₹0 gift lines fake "basket doubling." | Track **paid units/order**; compare **same-weekday**. |
| **CRM** | WhatsApp high-value segments (O3+/O1) are the revenue engine and paid amplifier. | Lead with WhatsApp to warm audiences **before** scaling paid. |
| **Paid** | Efficiency (ROAS↑) beats raw spend↑. | Scale into demonstrated demand; let Google/PMAX harvest CRM-created intent. |
| **Merch** | Premium "qualifier" launches (power-banks) just above the threshold drive trade-up. | Time hero launches to the campaign; nudge "₹X to unlock the gift." |
| **Margin** | Universal giveaways are costly. | Budget the gift COGS; cap with a threshold. |
| **Discipline** | The spike was *order volume*, achievable **without sitewide discounts**. | Protect margin — drive volume via offer+CRM, not price cuts. |

---

### Appendix — Method & honesty notes
- **Total-business figures** use the line-item dump (172,240 rows; reconciles to MIS total orders within <1% — e.g. Sat 27: raw 1,720 vs MIS 1,708, the gap being cancellations).
- **Sessions/conversion** from MIS Traffic Sheet (all platforms).
- **Same-weekday counterfactual (19-21 Jun)** used to neutralise weekend seasonality.
- **Stated data gaps** (not estimated/invented): GA4 channel-grouping sessions, PDP→ATC→checkout funnel steps, customer-ID-keyed New-vs-Returning/repeat, and on-site merchandising telemetry. Conclusions touching these are explicitly marked Medium/Low confidence.
