// Windsor connector base URL for Meta Ads
const WINDSOR_URL = 'https://connectors.windsor.ai/meta';

// Fields to request from Windsor
const FIELDS = [
  'date', 'campaign_name',
  'impressions', 'clicks', 'spend',
  'ctr', 'cpc', 'cpm', 'reach',
  'conversions', 'conversion_value',
].join(',');

// ── State ────────────────────────────────────────────────────────────────────

const state = {
  apiKey:          localStorage.getItem('windsor_api_key') || '',
  datePreset:      localStorage.getItem('date_preset') || 'last_7d',
  refreshInterval: Number(localStorage.getItem('refresh_interval') || 300), // seconds
  data:            null,
  lastUpdated:     null,
  loading:         false,
};

let refreshTimeout  = null;
let countdownHandle = null;
let nextRefreshAt   = null;
let trendChart      = null;
let campaignChart   = null;

// ── Boot ─────────────────────────────────────────────────────────────────────

document.addEventListener('DOMContentLoaded', () => {
  // Sync controls from saved state
  document.getElementById('datePreset').value = state.datePreset;

  document.getElementById('datePreset').addEventListener('change', (e) => {
    state.datePreset = e.target.value;
    localStorage.setItem('date_preset', e.target.value);
    fetchData();
  });

  document.getElementById('refreshBtn').addEventListener('click', fetchData);
  document.getElementById('settingsBtn').addEventListener('click', openSettings);

  document.getElementById('settingsModal').addEventListener('click', (e) => {
    if (e.target === document.getElementById('settingsModal')) closeSettings();
  });

  if (state.apiKey) {
    fetchData();
  } else {
    showApiNotice();
  }
});

// ── Data Fetching ─────────────────────────────────────────────────────────────

async function fetchData() {
  if (!state.apiKey) { showApiNotice(); return; }

  setLoading(true);
  hideError();
  clearSchedule();

  try {
    const url = `${WINDSOR_URL}?api_key=${encodeURIComponent(state.apiKey)}&date_preset=${state.datePreset}&fields=${FIELDS}`;
    const res = await fetch(url);

    if (!res.ok) {
      let msg = `HTTP ${res.status}`;
      try { const j = await res.json(); msg = j.message || j.error || msg; } catch (_) {}
      throw new Error(msg);
    }

    const json = await res.json();
    state.data = json.data || [];
    state.lastUpdated = new Date();

    if (state.data.length === 0) {
      showError('No data returned for this date range. Try a broader range or check your Meta account activity.');
    } else {
      hideError();
    }

    hideApiNotice();
    renderDashboard();
    updateLastUpdated();
  } catch (err) {
    const msg = err.message.includes('Failed to fetch')
      ? 'Network error — check your connection or try disabling ad blockers (they can block Windsor requests).'
      : `API error: ${err.message}`;
    showError(msg);
  } finally {
    setLoading(false);
    scheduleNextRefresh();
  }
}

// ── Rendering ─────────────────────────────────────────────────────────────────

function renderDashboard() {
  const data = state.data;

  const totals   = aggregateMetrics(data);
  const daily    = getDailyData(data);
  const campaigns = getCampaignData(data);

  renderKPIs(totals);
  renderTrendChart(daily);
  renderCampaignChart(campaigns);
  renderTable(campaigns);

  document.getElementById('tableCount').textContent =
    `${campaigns.length} campaign${campaigns.length !== 1 ? 's' : ''}`;
}

// ── Aggregation helpers ───────────────────────────────────────────────────────

function aggregateMetrics(rows) {
  let spend = 0, impressions = 0, clicks = 0,
      conversions = 0, convValue = 0, reach = 0;

  rows.forEach(r => {
    spend       += num(r.spend);
    impressions += num(r.impressions);
    clicks      += num(r.clicks);
    conversions += num(r.conversions);
    convValue   += num(r.conversion_value);
    reach       += num(r.reach);
  });

  return {
    spend, impressions, clicks, conversions, convValue, reach,
    ctr:  impressions > 0 ? (clicks / impressions) * 100 : 0,
    cpc:  clicks > 0 ? spend / clicks : 0,
    cpm:  impressions > 0 ? (spend / impressions) * 1000 : 0,
    roas: spend > 0 ? convValue / spend : 0,
  };
}

function getDailyData(rows) {
  const byDate = {};
  rows.forEach(r => {
    const d = r.date || 'unknown';
    if (!byDate[d]) byDate[d] = { date: d, spend: 0, impressions: 0, clicks: 0, conversions: 0 };
    byDate[d].spend       += num(r.spend);
    byDate[d].impressions += num(r.impressions);
    byDate[d].clicks      += num(r.clicks);
    byDate[d].conversions += num(r.conversions);
  });
  return Object.values(byDate).sort((a, b) => a.date.localeCompare(b.date));
}

function getCampaignData(rows) {
  const byCampaign = {};
  rows.forEach(r => {
    const name = r.campaign_name || 'Unknown Campaign';
    if (!byCampaign[name]) byCampaign[name] = { name, spend: 0, impressions: 0, clicks: 0, conversions: 0 };
    byCampaign[name].spend       += num(r.spend);
    byCampaign[name].impressions += num(r.impressions);
    byCampaign[name].clicks      += num(r.clicks);
    byCampaign[name].conversions += num(r.conversions);
  });
  return Object.values(byCampaign).sort((a, b) => b.spend - a.spend);
}

function num(v) { return parseFloat(v) || 0; }

// ── KPI Cards ─────────────────────────────────────────────────────────────────

function renderKPIs(t) {
  set('kpi-spend',       fmtCurrency(t.spend));
  set('kpi-spend-sub',   `CPM: ${fmtCurrency(t.cpm)}`);

  set('kpi-impressions',     fmtCompact(t.impressions));
  set('kpi-impressions-sub', `Reach: ${fmtCompact(t.reach)}`);

  set('kpi-clicks',     fmtCompact(t.clicks));
  set('kpi-clicks-sub', `CTR: ${t.ctr.toFixed(2)}%`);

  set('kpi-ctr',     `${t.ctr.toFixed(2)}%`);
  set('kpi-ctr-sub', t.ctr >= 2 ? '✦ Above average' : t.ctr >= 1 ? 'Average' : 'Below average');

  set('kpi-cpc',     fmtCurrency(t.cpc));
  set('kpi-cpc-sub', 'Cost per click');

  set('kpi-conversions',     fmtCompact(t.conversions));
  set('kpi-conversions-sub', `ROAS: ${t.roas.toFixed(2)}×`);
}

// ── Chart helpers ─────────────────────────────────────────────────────────────

const CHART_FONT  = { size: 11, family: 'inherit' };
const GRID_COLOR  = '#1c2a3e';
const TICK_COLOR  = '#4d6380';
const TOOLTIP_BG  = '#0f1623';

function baseScales(leftFmt) {
  return {
    x: {
      grid:  { color: GRID_COLOR, drawBorder: false },
      ticks: { color: TICK_COLOR, font: CHART_FONT, maxRotation: 0 },
    },
    y: {
      grid:  { color: GRID_COLOR, drawBorder: false },
      ticks: { color: TICK_COLOR, font: CHART_FONT, callback: leftFmt },
    },
  };
}

// ── Trend Chart ───────────────────────────────────────────────────────────────

function renderTrendChart(daily) {
  const ctx = document.getElementById('trendChart').getContext('2d');
  if (trendChart) trendChart.destroy();

  const labels = daily.map(d => fmtDateLabel(d.date));

  trendChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels,
      datasets: [
        {
          label: 'Spend ($)',
          data: daily.map(d => +d.spend.toFixed(2)),
          borderColor: '#3b82f6',
          backgroundColor: 'rgba(59,130,246,0.08)',
          fill: true,
          tension: 0.4,
          borderWidth: 2,
          pointRadius: 3,
          pointHoverRadius: 5,
          yAxisID: 'y',
        },
        {
          label: 'Clicks',
          data: daily.map(d => d.clicks),
          borderColor: '#10b981',
          backgroundColor: 'transparent',
          tension: 0.4,
          borderWidth: 2,
          pointRadius: 3,
          pointHoverRadius: 5,
          yAxisID: 'y1',
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      interaction: { mode: 'index', intersect: false },
      plugins: {
        legend: {
          display: false, // legend is in the card header HTML
        },
        tooltip: {
          backgroundColor: TOOLTIP_BG,
          borderColor: GRID_COLOR,
          borderWidth: 1,
          titleColor: '#f0f4f8',
          bodyColor: '#8fa3be',
          padding: 10,
          callbacks: {
            label: ctx =>
              ctx.dataset.yAxisID === 'y'
                ? ` Spend: $${ctx.raw.toFixed(2)}`
                : ` Clicks: ${ctx.raw.toLocaleString()}`,
          },
        },
      },
      scales: {
        x: baseScales().x,
        y: {
          ...baseScales(v => `$${v}`).y,
          position: 'left',
        },
        y1: {
          grid:     { display: false },
          ticks:    { color: TICK_COLOR, font: CHART_FONT },
          position: 'right',
        },
      },
    },
  });
}

// ── Campaign Chart ────────────────────────────────────────────────────────────

function renderCampaignChart(campaigns) {
  const ctx = document.getElementById('campaignChart').getContext('2d');
  if (campaignChart) campaignChart.destroy();

  const top = campaigns.slice(0, 6);
  const COLORS = ['#3b82f6','#8b5cf6','#10b981','#f59e0b','#ef4444','#06b6d4'];

  campaignChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: top.map(c => truncate(c.name, 22)),
      datasets: [{
        label: 'Spend',
        data: top.map(c => +c.spend.toFixed(2)),
        backgroundColor: COLORS.map(c => c + 'cc'),
        borderRadius: 5,
        borderSkipped: false,
      }],
    },
    options: {
      indexAxis: 'y',
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: TOOLTIP_BG,
          borderColor: GRID_COLOR,
          borderWidth: 1,
          titleColor: '#f0f4f8',
          bodyColor: '#8fa3be',
          padding: 10,
          callbacks: {
            label: ctx => ` $${ctx.raw.toFixed(2)}`,
            title: (items) => campaigns[items[0].dataIndex]?.name || items[0].label,
          },
        },
      },
      scales: {
        x: {
          grid:  { color: GRID_COLOR, drawBorder: false },
          ticks: { color: TICK_COLOR, font: CHART_FONT, callback: v => `$${v}` },
        },
        y: {
          grid:  { display: false },
          ticks: { color: TICK_COLOR, font: CHART_FONT },
        },
      },
    },
  });
}

// ── Table ─────────────────────────────────────────────────────────────────────

function renderTable(campaigns) {
  const tbody = document.getElementById('campaignsBody');
  if (campaigns.length === 0) {
    tbody.innerHTML = '<tr><td colspan="7" class="table-empty">No campaign data available</td></tr>';
    return;
  }

  tbody.innerHTML = campaigns.map(c => {
    const ctr = c.impressions > 0 ? (c.clicks / c.impressions * 100).toFixed(2) : '0.00';
    const cpc = c.clicks > 0 ? (c.spend / c.clicks).toFixed(2) : '0.00';
    return `
      <tr>
        <td class="td-campaign" title="${esc(c.name)}">${esc(c.name)}</td>
        <td class="td-right td-spend">${fmtCurrency(c.spend)}</td>
        <td class="td-right">${fmtCompact(c.impressions)}</td>
        <td class="td-right">${fmtCompact(c.clicks)}</td>
        <td class="td-right">${ctr}%</td>
        <td class="td-right">$${cpc}</td>
        <td class="td-right">${fmtCompact(c.conversions)}</td>
      </tr>`;
  }).join('');
}

// ── Auto-Refresh ──────────────────────────────────────────────────────────────

function scheduleNextRefresh() {
  clearSchedule();
  nextRefreshAt = Date.now() + state.refreshInterval * 1000;
  refreshTimeout  = setTimeout(fetchData, state.refreshInterval * 1000);
  countdownHandle = setInterval(tickCountdown, 1000);
}

function clearSchedule() {
  clearTimeout(refreshTimeout);
  clearInterval(countdownHandle);
}

function tickCountdown() {
  const remaining = Math.max(0, nextRefreshAt - Date.now());
  const m = Math.floor(remaining / 60000);
  const s = Math.floor((remaining % 60000) / 1000);
  const el = document.getElementById('countdown');
  el.textContent = `Refreshes in ${m}:${String(s).padStart(2, '0')}`;
  el.classList.toggle('urgent', remaining < 60_000);
}

function updateLastUpdated() {
  if (!state.lastUpdated) return;
  document.getElementById('lastUpdated').textContent =
    `Updated ${state.lastUpdated.toLocaleTimeString()}`;
}

// ── UI helpers ────────────────────────────────────────────────────────────────

function setLoading(on) {
  state.loading = on;
  const btn = document.getElementById('refreshBtn');
  btn.disabled = on;
  btn.classList.toggle('refreshing', on);

  // Only show the full-page overlay before we've ever loaded data
  const overlay = document.getElementById('loadingOverlay');
  if (on && !state.data) {
    overlay.classList.remove('hidden');
  } else {
    overlay.classList.add('hidden');
  }
}

function showError(msg) {
  document.getElementById('errorMessage').textContent = msg;
  document.getElementById('errorBanner').classList.remove('hidden');
}

function hideError() {
  document.getElementById('errorBanner').classList.add('hidden');
}

function showApiNotice() {
  document.getElementById('apiNotice').classList.remove('hidden');
  document.getElementById('dashboard').classList.add('hidden');
}

function hideApiNotice() {
  document.getElementById('apiNotice').classList.add('hidden');
  document.getElementById('dashboard').classList.remove('hidden');
}

// ── Settings Modal ────────────────────────────────────────────────────────────

function openSettings() {
  const input = document.getElementById('apiKeyInput');
  input.value = state.apiKey;
  document.getElementById('refreshIntervalInput').value = String(state.refreshInterval);
  document.getElementById('settingsModal').classList.remove('hidden');
  setTimeout(() => input.focus(), 50);
}

function closeSettings() {
  document.getElementById('settingsModal').classList.add('hidden');
}

function saveSettings() {
  const key      = document.getElementById('apiKeyInput').value.trim();
  const interval = Number(document.getElementById('refreshIntervalInput').value);

  if (!key) {
    document.getElementById('apiKeyInput').focus();
    return;
  }

  state.apiKey          = key;
  state.refreshInterval = interval;
  localStorage.setItem('windsor_api_key', key);
  localStorage.setItem('refresh_interval', String(interval));

  closeSettings();
  fetchData();
}

// ── Formatters ────────────────────────────────────────────────────────────────

function fmtCurrency(v) {
  if (v >= 1_000_000) return `$${(v / 1_000_000).toFixed(2)}M`;
  if (v >= 1_000)     return `$${(v / 1_000).toFixed(1)}K`;
  return `$${v.toFixed(2)}`;
}

function fmtCompact(v) {
  if (v >= 1_000_000) return `${(v / 1_000_000).toFixed(1)}M`;
  if (v >= 1_000)     return `${(v / 1_000).toFixed(1)}K`;
  return Math.round(v).toLocaleString();
}

function fmtDateLabel(dateStr) {
  if (!dateStr || dateStr === 'unknown') return dateStr;
  const parts = dateStr.split('-');
  return parts.length === 3 ? `${parts[1]}/${parts[2]}` : dateStr;
}

function truncate(str, max) {
  return str.length > max ? str.slice(0, max - 1) + '…' : str;
}

function esc(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function set(id, text) {
  const el = document.getElementById(id);
  if (el) el.textContent = text;
}
