"""Growth Orchestrator — synthesises the debate into the daily brief."""

import anthropic
from datetime import date

MODEL = "claude-opus-4-7"

_SYSTEM = """You are the Growth Orchestrator — a senior growth leader who synthesises a daily debate between four specialist agents into clear, actionable priorities.

Your job is NOT to average or vote-count. You weigh:
  - Impact: what moves the needle most?
  - Urgency: what deteriorates fastest if ignored today?
  - Effort: what can actually be actioned in 24 hours?
  - Causality: what is root cause vs. symptom?
  - Consensus signal: when multiple agents agree, the evidence is stronger.

You read the room: sometimes the minority agent is right. Explain your reasoning. A brief that says "everyone agrees on X" every day loses trust — be willing to call the hard calls.

Output a structured brief the growth team can act on before the morning standup."""

_PROMPT = """\
Today's metrics and a full two-round debate between four growth specialists are below.

{data_context}

{debate_transcript}

────────────────────────────────────────────────────────────────────────

Synthesise this into today's Daily Growth Brief. Use exactly this structure:

## Daily Growth Brief — {today}

### Today's Story (2–3 sentences)
What does the data say at a glance? What is the single most important signal?

### What the Debate Revealed
- **Consensus:** (where did agents strongly agree?)
- **Key tension:** (where did they disagree — and who had the stronger argument?)
- **The insight that changed the picture:** (what emerged from Round 2 that wasn't obvious in Round 1?)

---

### TOP 3 PRIORITIES FOR TODAY

**Priority 1: [title]**
- **What:** one clear sentence
- **Why now:** cite the exact metric(s) that make this urgent
- **Action:** a specific, ownable task (name the function responsible)
- **Success signal:** what number should move by tomorrow?

**Priority 2: [title]**
[same structure]

**Priority 3: [title]**
[same structure]

---

### Metrics to Watch Today
List 4–5 metrics with their current value and what a good vs. bad signal looks like by end of day.

### On the Bench (Important but Not Top 3)
2–3 items raised in the debate that matter but don't make the cut today — and why they can wait.
"""


class GrowthOrchestrator:
    def __init__(self, client: anthropic.Anthropic):
        self.client = client
        self._system = [{"type": "text", "text": _SYSTEM, "cache_control": {"type": "ephemeral"}}]

    def synthesize(self, data_context: str, r1_transcript: str, r2_transcript: str) -> str:
        today = date.today().strftime("%B %d, %Y")
        debate_transcript = r1_transcript + "\n\n" + r2_transcript

        prompt = _PROMPT.format(
            data_context=data_context,
            debate_transcript=debate_transcript,
            today=today,
        )

        # Stream the output — adaptive thinking lets the orchestrator reason through
        # trade-offs before committing to the final brief.
        full_text: list[str] = []
        with self.client.messages.stream(
            model=MODEL,
            max_tokens=4096,
            thinking={"type": "adaptive"},
            system=self._system,
            messages=[{"role": "user", "content": prompt}],
        ) as stream:
            for text in stream.text_stream:
                print(text, end="", flush=True)
                full_text.append(text)

        print()  # newline after stream ends
        return "".join(full_text)
