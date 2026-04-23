"""Windsor data client — fetches daily growth metrics from all connected sources."""

import httpx
from dataclasses import dataclass
from datetime import date


@dataclass
class DailyMetrics:
    date: str
    # Acquisition
    new_users: int
    cac: float
    paid_installs: int
    organic_installs: int
    ad_spend: float
    roas: float
    channel_breakdown: dict
    # Retention
    dau: int
    mau: int
    dau_mau_ratio: float
    day1_retention: float
    day7_retention: float
    day30_retention: float
    churn_rate: float
    avg_session_minutes: float
    # Monetization
    mrr: float
    arr: float
    arpu: float
    trial_to_paid_cvr: float
    new_mrr: float
    churned_mrr: float
    expansion_mrr: float
    payment_failure_rate: float
    # Product
    activation_rate: float
    feature_adoption: dict
    nps_score: float
    open_bugs: int
    time_to_value_hours: float
    onboarding_completion: float
    open_tickets: int


def format_for_agents(m: DailyMetrics) -> str:
    """Formats metrics as a clear structured briefing all agents share."""
    ch_str = "  |  ".join(f"{k}: {v:,}" for k, v in m.channel_breakdown.items())
    fa_str = "  |  ".join(f"{k}: {v:.0%}" for k, v in m.feature_adoption.items())
    net_mrr = m.new_mrr + m.expansion_mrr - m.churned_mrr

    return f"""=== DAILY GROWTH METRICS — {m.date} ===

ACQUISITION
  New Users:       {m.new_users:,}  (paid: {m.paid_installs:,}  |  organic: {m.organic_installs:,})
  CAC:             ${m.cac:.2f}  |  ROAS: {m.roas:.1f}x  |  Ad Spend: ${m.ad_spend:,.0f}
  Channels:        {ch_str}

RETENTION
  DAU / MAU:       {m.dau:,} / {m.mau:,}  →  DAU/MAU ratio: {m.dau_mau_ratio:.1%}
  Retention:       D1 {m.day1_retention:.0%}  |  D7 {m.day7_retention:.0%}  |  D30 {m.day30_retention:.0%}
  Churn Rate:      {m.churn_rate:.1%} monthly  ({m.churn_rate * 12:.1%} annualised)
  Engagement:      {m.avg_session_minutes:.1f} min avg session

MONETIZATION
  MRR / ARR:       ${m.mrr:,.0f}  /  ${m.arr:,.0f}
  ARPU:            ${m.arpu:.2f}
  MRR Movement:    +${m.new_mrr:,.0f} new  |  -${m.churned_mrr:,.0f} churned  |  +${m.expansion_mrr:,.0f} expansion  →  net {net_mrr:+,.0f}
  Trial→Paid CVR:  {m.trial_to_paid_cvr:.0%}
  Payment Fails:   {m.payment_failure_rate:.1%}

PRODUCT
  Activation Rate: {m.activation_rate:.0%}  |  Time to Value: {m.time_to_value_hours:.1f} hrs
  Feature Adoption:{fa_str}
  NPS:             {m.nps_score:.0f}  |  Onboarding Completion: {m.onboarding_completion:.0%}
  Open Issues:     {m.open_bugs} bugs  |  {m.open_tickets} support tickets"""


def fetch_metrics(api_key: str, base_url: str, target_date: str | None = None) -> DailyMetrics:
    """Fetches metrics from Windsor. Falls back to mock data if no API key is set."""
    if not target_date:
        target_date = date.today().isoformat()
    if not api_key:
        return _mock_metrics(target_date)
    return _fetch_from_windsor(api_key, base_url, target_date)


def _fetch_from_windsor(api_key: str, base_url: str, target_date: str) -> DailyMetrics:
    """
    Fetches marketing metrics from Windsor's unified connector API.

    Windsor aggregates data from all connected sources (Google Ads, Facebook Ads,
    GA4, Stripe, Mixpanel, etc.) into a single endpoint. The fields you can request
    depend on which connectors your account has enabled.

    Add additional Windsor connector calls here for retention, monetization, and
    product metrics if those are connected in your Windsor workspace.
    """
    with httpx.Client(timeout=30) as client:
        resp = client.get(
            f"{base_url}/all",
            params={
                "api_key": api_key,
                "date_preset": "yesterday",
                "fields": "source,clicks,spend,installs,revenue,sessions,users,conversions",
                "_renderer": "json",
            },
        )
        resp.raise_for_status()
        data = resp.json()

    rows = data.get("data", [])
    total_spend = sum(float(r.get("spend", 0)) for r in rows)
    total_installs = sum(int(r.get("installs", 0)) for r in rows)
    total_revenue = sum(float(r.get("revenue", 0)) for r in rows)

    channel_breakdown: dict = {}
    for row in rows:
        src = row.get("source", "Unknown")
        installs = int(row.get("installs", 0))
        if src and installs:
            channel_breakdown[src] = channel_breakdown.get(src, 0) + installs

    cac = total_spend / total_installs if total_installs else 0
    roas = total_revenue / total_spend if total_spend else 0

    # Windsor returns marketing data from paid channels.
    # Wire up your analytics (GA4/Mixpanel), billing (Stripe), and product
    # (Amplitude) connectors in Windsor to populate the remaining fields below.
    return DailyMetrics(
        date=target_date,
        new_users=total_installs,
        cac=cac,
        paid_installs=total_installs,
        organic_installs=0,
        ad_spend=total_spend,
        roas=roas,
        channel_breakdown=channel_breakdown,
        dau=0, mau=0, dau_mau_ratio=0,
        day1_retention=0, day7_retention=0, day30_retention=0,
        churn_rate=0, avg_session_minutes=0,
        mrr=0, arr=0, arpu=0,
        trial_to_paid_cvr=0, new_mrr=0, churned_mrr=0, expansion_mrr=0,
        payment_failure_rate=0,
        activation_rate=0, feature_adoption={}, nps_score=0,
        open_bugs=0, time_to_value_hours=0, onboarding_completion=0, open_tickets=0,
    )


def _mock_metrics(target_date: str) -> DailyMetrics:
    """Realistic mock data for running without a Windsor connection."""
    return DailyMetrics(
        date=target_date,
        new_users=1247,
        cac=23.50,
        paid_installs=832,
        organic_installs=415,
        ad_spend=19552.00,
        roas=2.8,
        channel_breakdown={
            "Google Ads": 612,
            "Facebook Ads": 220,
            "Organic Search": 285,
            "Referral": 130,
        },
        dau=28450,
        mau=89300,
        dau_mau_ratio=0.318,
        day1_retention=0.62,
        day7_retention=0.41,
        day30_retention=0.28,
        churn_rate=0.031,
        avg_session_minutes=8.4,
        mrr=284500.00,
        arr=3414000.00,
        arpu=3.19,
        trial_to_paid_cvr=0.18,
        new_mrr=12300.00,
        churned_mrr=8800.00,
        expansion_mrr=3200.00,
        payment_failure_rate=0.034,
        activation_rate=0.54,
        feature_adoption={
            "Core Feature": 0.82,
            "Analytics Dashboard": 0.44,
            "Collaboration": 0.31,
            "Integrations": 0.19,
        },
        nps_score=34.0,
        open_bugs=47,
        time_to_value_hours=2.3,
        onboarding_completion=0.67,
        open_tickets=128,
    )
