#!/usr/bin/env python3
"""
Growth Agents Debate — daily runner.

Usage:
    python main.py              # runs for today
    python main.py 2024-01-23   # runs for a specific date (uses mock data)

Requires ANTHROPIC_API_KEY in environment (or .env file).
Set WINDSOR_API_KEY to pull live data; omit to use built-in mock data.
"""

import sys
from datetime import date
from pathlib import Path

import anthropic

import config
import windsor
from agents import build_agents
from debate import run_debate
from orchestrator import GrowthOrchestrator


def run(target_date: str | None = None) -> None:
    label = target_date or date.today().isoformat()

    print()
    print("╔══════════════════════════════════════════════════════════════════════╗")
    print("║              GROWTH AGENTS DEBATE  ·  DAILY BRIEF                   ║")
    print(f"║  Date: {label:<62}║")
    print("╚══════════════════════════════════════════════════════════════════════╝")

    # 1. Fetch daily metrics via Windsor ──────────────────────────────────────
    print("\n📊  Fetching daily metrics from Windsor...")
    metrics = windsor.fetch_metrics(config.WINDSOR_API_KEY, config.WINDSOR_BASE_URL, target_date)
    if not config.WINDSOR_API_KEY:
        print("     ⚠  No WINDSOR_API_KEY set — running on mock data.")
    data_context = windsor.format_for_agents(metrics)
    print("     ✓  Metrics loaded.\n")
    print(data_context)

    # 2. Initialise agents ────────────────────────────────────────────────────
    client = anthropic.Anthropic(api_key=config.ANTHROPIC_API_KEY)
    agents = build_agents(client)

    # 3. Run debate ───────────────────────────────────────────────────────────
    r1_transcript, r2_transcript = run_debate(agents, data_context)

    # 4. Orchestrator synthesis ───────────────────────────────────────────────
    print("\n\n🧠  Growth Orchestrator synthesising...\n")
    print("─" * 70)
    orchestrator = GrowthOrchestrator(client)
    brief = orchestrator.synthesize(data_context, r1_transcript, r2_transcript)
    print("─" * 70)

    # 5. Save full record ─────────────────────────────────────────────────────
    out_path = Path(f"daily_brief_{metrics.date}.md")
    out_path.write_text(
        "\n".join([
            f"# Growth Agents Daily Brief — {metrics.date}",
            "",
            "## Raw Metrics",
            "```",
            data_context,
            "```",
            "",
            r1_transcript,
            "",
            r2_transcript,
            "",
            "---",
            "",
            brief,
        ]),
        encoding="utf-8",
    )
    print(f"\n📝  Full record saved → {out_path}")


if __name__ == "__main__":
    target = sys.argv[1] if len(sys.argv) > 1 else None
    run(target)
