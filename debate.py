"""Debate engine — runs two rounds of structured cross-agent debate."""

from agents import GrowthAgent, AgentPosition

_DIVIDER = "─" * 60


def _format_positions(positions: list[AgentPosition], round_label: str) -> str:
    lines = [f"\n{'═' * 70}", f"  {round_label}", f"{'═' * 70}"]
    for pos in positions:
        lines += [f"\n{_DIVIDER}", f"  {pos.name}  ·  {pos.role}", _DIVIDER, "", pos.text, ""]
    return "\n".join(lines)


def _build_debate_context(positions: list[AgentPosition]) -> str:
    return "\n\n".join(
        f"[{p.name} — {p.role}]\n{p.text}"
        for p in positions
    )


def run_debate(
    agents: list[GrowthAgent],
    data_context: str,
    verbose: bool = True,
) -> tuple[str, str]:
    """
    Runs two rounds of debate between all agents.

    Round 1: each agent presents an independent analysis and their top 3 priorities.
    Round 2: each agent reads all Round 1 positions and responds — agreeing,
             challenging, and updating their priorities based on what they heard.

    Returns (round1_transcript, round2_transcript).
    """
    # ── Round 1: Initial positions ────────────────────────────────────────────
    if verbose:
        print("\n🎙  ROUND 1 — Initial Positions\n")

    r1_positions: list[AgentPosition] = []
    for agent in agents:
        if verbose:
            print(f"     {agent.name} analysing...", end="", flush=True)
        pos = agent.initial_position(data_context)
        r1_positions.append(pos)
        if verbose:
            print(" ✓")

    r1_transcript = _format_positions(r1_positions, "ROUND 1 — INITIAL POSITIONS")

    # ── Round 2: Cross-examination ────────────────────────────────────────────
    debate_context = _build_debate_context(r1_positions)

    if verbose:
        print("\n🎙  ROUND 2 — Cross-Examination\n")

    r2_positions: list[AgentPosition] = []
    for agent in agents:
        if verbose:
            print(f"     {agent.name} responding...", end="", flush=True)
        pos = agent.debate_response(data_context, debate_context)
        r2_positions.append(pos)
        if verbose:
            print(" ✓")

    r2_transcript = _format_positions(r2_positions, "ROUND 2 — CROSS-EXAMINATION")

    return r1_transcript, r2_transcript
