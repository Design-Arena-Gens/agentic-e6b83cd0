'use client';

import { useMemo, useState } from "react";

type MetricId =
  | "palette"
  | "contrast"
  | "texture"
  | "grid"
  | "hierarchy"
  | "motion"
  | "microcopy"
  | "sound"
  | "authenticity"
  | "accessibility"
  | "responsiveness"
  | "playfulness"
  | "materiality"
  | "iconography"
  | "data_density";

type MetricConfig = {
  id: MetricId;
  label: string;
  description: string;
  weight: number;
  minLabel: string;
  maxLabel: string;
  inspiration: string;
};

type CategoryConfig = {
  id: string;
  title: string;
  statement: string;
  accent: string;
  metrics: MetricConfig[];
};

const categories: CategoryConfig[] = [
  {
    id: "visuals",
    title: "Visual Brutality",
    statement:
      "Crank the vibrancy while maintaining impeccable balance between punch and polish.",
    accent: "from-[#ff8a00] to-[#f94fa5]",
    metrics: [
      {
        id: "palette",
        label: "Synthetic Color Palette",
        description:
          "How boldly your color system leans into high-voltage hues and unexpected duotones.",
        weight: 0.12,
        minLabel: "Muted",
        maxLabel: "Electric",
        inspiration:
          "Inject highlighter gradients and acid neutrals to channel classic brutalist posters.",
      },
      {
        id: "contrast",
        label: "Hyper Contrast & Shadows",
        description:
          "Depth created through hefty drop shadows, rigid outlines, and intentionally harsh layering.",
        weight: 0.09,
        minLabel: "Flat",
        maxLabel: "Deep Cut",
        inspiration:
          "Use offset shadows (12px+) and thick keylines to mimic printed risograph misregistration.",
      },
      {
        id: "texture",
        label: "Digital Texture & Noise",
        description:
          "Demand for glitch-inspired grain, halftones, and mesh gradients to disrupt cleanliness.",
        weight: 0.08,
        minLabel: "Sterile",
        maxLabel: "Beautifully Corrupted",
        inspiration:
          "Layer grain overlays and noisy gradients to keep surfaces tactile and raw.",
      },
    ],
  },
  {
    id: "structure",
    title: "Structural Signal",
    statement:
      "Neo-brutalism thrives on unapologetic grid systems and z-axis tensions.",
    accent: "from-[#4cd3ff] to-[#5478ff]",
    metrics: [
      {
        id: "grid",
        label: "Rigorous Grid Lock",
        description:
          "Commitment to confident modular grids, chunky spacing, and asymmetrical rhythm.",
        weight: 0.11,
        minLabel: "Loose",
        maxLabel: "Laser-Aligned",
        inspiration:
          "Run 8pt spacing with selective fractures to keep the composition lively but intentional.",
      },
      {
        id: "hierarchy",
        label: "Typographic Hierarchy",
        description:
          "Bold headline stacks, expressive font pairings, and weight distribution.",
        weight: 0.1,
        minLabel: "Flatline",
        maxLabel: "Controlled Chaos",
        inspiration:
          "Marry grotesque sans with techno monospace; let size jumps feel almost disorienting.",
      },
      {
        id: "materiality",
        label: "Tactile Surfaces",
        description:
          "Usage of components that feel like carved acrylic, industrial panels, or oversized stickers.",
        weight: 0.08,
        minLabel: "Paper Thin",
        maxLabel: "Chunky",
        inspiration:
          "Overlap rigid cards with bright outlines and clipped corners to add fabricated depth.",
      },
    ],
  },
  {
    id: "interaction",
    title: "Interaction Voltage",
    statement:
      "Micro-interactions should feel like lo-fi hardware underscored by precise digital feedback.",
    accent: "from-[#b0ff62] to-[#00ffa3]",
    metrics: [
      {
        id: "motion",
        label: "Motion Dynamics",
        description:
          "Snapback animations, magnetic hover states, and kinetic page transitions.",
        weight: 0.09,
        minLabel: "Static",
        maxLabel: "Kinetic",
        inspiration:
          "Opt for spring physics that overshoot slightly before settling for analog character.",
      },
      {
        id: "microcopy",
        label: "Microcopy Personality",
        description:
          "Voice & tone that balances utility with confident, human provocations.",
        weight: 0.06,
        minLabel: "Corporate",
        maxLabel: "Charismatic",
        inspiration:
          "Swap generic CTAs for winks of personality—just enough to feel self-aware.",
      },
      {
        id: "sound",
        label: "Sonic Feedback",
        description:
          "Use of haptic cues, UI bleeps, or implied audio textures in the visual language.",
        weight: 0.05,
        minLabel: "Silent",
        maxLabel: "Audiophonic",
        inspiration:
          "Translate synth arps into animated bars or subtle vibration cues for added immersion.",
      },
    ],
  },
  {
    id: "credibility",
    title: "Credibility Layer",
    statement:
      "Radical visuals still demand trust—ensure legibility, accessibility, and modular resilience.",
    accent: "from-[#ff5f6d] to-[#ffc371]",
    metrics: [
      {
        id: "authenticity",
        label: "Brand Authenticity",
        description:
          "Does the brutalist expression feel native to the brand's ethos and history?",
        weight: 0.07,
        minLabel: "Borrowed",
        maxLabel: "Innate",
        inspiration:
          "Document how the look riffs on brand lore—clients sign off faster when they see lineage.",
      },
      {
        id: "accessibility",
        label: "Accessibility Safeguards",
        description:
          "Color contrast, focus states, and keyboard navigation coexisting with brutal visuals.",
        weight: 0.07,
        minLabel: "Risky",
        maxLabel: "Inclusive",
        inspiration:
          "Calculate WCAG ratios, then inject alternative cues (icons, patterns) into the toolkit.",
      },
      {
        id: "responsiveness",
        label: "Responsive Playbook",
        description:
          "How well the system collapses onto smaller breakpoints without losing drama.",
        weight: 0.08,
        minLabel: "Fragile",
        maxLabel: "Adaptive",
        inspiration:
          "Prototype vertical scrolling hero moments that stack like a zine—mobile deserves theater.",
      },
      {
        id: "iconography",
        label: "Iconography Consistency",
        description:
          "Consistency and boldness of pictograms, stickers, and glyphs across surfaces.",
        weight: 0.08,
        minLabel: "Incoherent",
        maxLabel: "Systemic",
        inspiration:
          "Forge a modular icon grid with exaggerated boolean cuts and unforgiving angles.",
      },
      {
        id: "playfulness",
        label: "Playful Easter Eggs",
        description:
          "Surprising but purposeful moments that reward curiosity without harming clarity.",
        weight: 0.05,
        minLabel: "Sterile",
        maxLabel: "Delightful",
        inspiration:
          "Contextual surprises—like command palettes or ambient gradients reacting to cursor heat.",
      },
      {
        id: "data_density",
        label: "Information Density",
        description:
          "Balance between raw data, blunt typography, and breathing room.",
        weight: 0.07,
        minLabel: "Overloaded",
        maxLabel: "Curated",
        inspiration:
          "Segment data blocks with rigid frames; vary font scale to map importance instantly.",
      },
    ],
  },
];

const metricIdeaMap: Record<MetricId, string> = {
  palette:
    "Adopt tri-tone palettes with fluorescent primaries, muted offsets, and one panic color used sparingly.",
  contrast:
    "Increase depth by stacking three-layer shadows: solid, blurred, and colorized offset.",
  texture:
    "Export analog textures (grain, halftone) as transparent PNGs and blend them with CSS mix-blend-modes.",
  grid:
    "Lock in a 12-column grid with exaggerated gutters; allow only deliberate grid breaks to highlight hero content.",
  hierarchy:
    "Introduce a display face for H1s and pair with a rigid monospace for meta labels—size jumps should feel jarring.",
  motion:
    "Prototype spring animations with overshoot and quick snapback; keep durations under 260ms for immediacy.",
  microcopy:
    "Rewrite CTAs and helper text with provocative verbs; remove passive voice entirely.",
  sound:
    "Sketch a sonic palette—assign synth-like tones to success, neutral, and alert states to reinforce brand memory.",
  authenticity:
    "Back every bold visual with a rationale deck linking brutalist cues to brand milestones or cultural nods.",
  accessibility:
    "Run automated contrast audits, then layer patterns, icons, and alternative navigation to retain edge with empathy.",
  responsiveness:
    "Design mobile first with collapsible z-index stacks and sticky interaction layers to preserve drama on scroll.",
  playfulness:
    "Ship at least two hidden interactions such as magnetic buttons or hue shifts triggered by cursor velocity.",
  materiality:
    "Swap flat cards for pillowy slabs with inner shadows, bevels, and subtle 3D transforms during hover.",
  iconography:
    "Define a bold icon grid (4px stroke) and limit shapes to 45° angles and brutal cutouts for unity.",
  data_density:
    "Strategically gate information within accordion slabs so that density is opt-in, not overwhelming.",
};

const scoreLabel = (score: number) => {
  if (score >= 90) return "Exhibition Ready";
  if (score >= 80) return "Launch-Ready";
  if (score >= 70) return "Confident Prototype";
  if (score >= 55) return "Requires Amplification";
  return "Back to the War Room";
};

const scoreColor = (score: number) => {
  if (score >= 85) return "border-[#00f5d4] bg-[#00f5d4]/10 text-[#00f5d4]";
  if (score >= 70) return "border-[#f15bb5] bg-[#f15bb5]/10 text-[#f15bb5]";
  if (score >= 55) return "border-[#fee440] bg-[#fee440]/15 text-[#f9a826]";
  return "border-[#ff0054] bg-[#ff0054]/15 text-[#ff0054]";
};

const formatScore = (score: number) => Math.round(score);

const initialMetricState = categories
  .flatMap((category) => category.metrics)
  .reduce<Record<MetricId, number>>((acc, metric) => {
    acc[metric.id] = 70;
    return acc;
  }, {} as Record<MetricId, number>);

export default function Home() {
  const [scores, setScores] = useState<Record<MetricId, number>>(
    initialMetricState,
  );

  const weightedScore = useMemo(() => {
    const totalWeight = categories
      .flatMap((category) => category.metrics)
      .reduce((acc, metric) => acc + metric.weight, 0);

    return (
      categories
        .flatMap((category) => category.metrics)
        .reduce(
          (acc, metric) => acc + scores[metric.id] * metric.weight,
          0,
        ) / totalWeight
    );
  }, [scores]);

  const categoryBreakdown = useMemo(() => {
    return categories.map((category) => {
      const totalWeight = category.metrics.reduce(
        (acc, metric) => acc + metric.weight,
        0,
      );
      const score =
        category.metrics.reduce(
          (acc, metric) => acc + scores[metric.id] * metric.weight,
          0,
        ) / totalWeight;

      return {
        id: category.id,
        title: category.title,
        statement: category.statement,
        accent: category.accent,
        score,
      };
    });
  }, [scores]);

  const improvementAreas = useMemo(() => {
    return Object.entries(scores)
      .filter(([, score]) => score < 75)
      .sort((a, b) => a[1] - b[1])
      .slice(0, 4)
      .map(([metricId]) => ({
        id: metricId as MetricId,
        action: metricIdeaMap[metricId as MetricId],
        current: scores[metricId as MetricId],
      }));
  }, [scores]);

  return (
    <div className="min-h-screen bg-[#101010] text-[#0b0b0b]">
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -left-24 top-10 h-64 w-64 rotate-6 rounded-[3rem] border-4 border-black bg-gradient-to-r from-[#ff55ff] to-[#55ffff] shadow-[16px_16px_0_#0b0b0b]" />
        <div className="absolute -right-20 top-48 h-72 w-72 -rotate-12 rounded-[4rem] border-4 border-black bg-gradient-to-r from-[#ffea00] to-[#ff0077] shadow-[16px_16px_0_#0b0b0b]" />
        <div className="absolute bottom-0 left-1/4 h-96 w-[36rem] rounded-[4rem] border-4 border-black bg-gradient-to-br from-[#00f5d4] via-[#00bbf9] to-[#9b5de5] shadow-[16px_16px_0_#0b0b0b]" />
      </div>

      <main className="mx-auto flex min-h-screen max-w-6xl flex-col gap-12 px-6 pb-24 pt-20 md:px-10 lg:px-16">
        <header className="grid gap-6 rounded-[3rem] border-4 border-black bg-[#f8f8f8] p-10 shadow-[16px_16px_0_#0b0b0b]">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <span className="grid gap-1 uppercase tracking-[0.4em] text-xs text-[#0b0b0b]/70">
              Neo Brutalism Diagnostics
              <span className="text-[0.6rem]">Built for obsessive visual strategists</span>
            </span>
            <span
              className={[
                "inline-flex items-center rounded-full border-4 px-5 py-1 text-sm font-semibold uppercase tracking-widest",
                scoreColor(weightedScore),
              ].join(" ")}
            >
              {scoreLabel(weightedScore)}
            </span>
          </div>
          <h1 className="text-4xl font-black uppercase leading-tight tracking-tight text-black sm:text-5xl lg:text-[3.5rem]">
            Neo-Brutalism Aesthetics Maturity Calculator
          </h1>
          <p className="max-w-3xl text-lg leading-relaxed text-[#242424]">
            Measure how aggressively your interface leans into the neo-brutalist movement—balance industrial clarity with
            rebellious detail. Adjust each lever to instantly recalibrate your score and surface high-impact refinements.
          </p>
          <div className="grid gap-4 rounded-[2rem] border-4 border-dashed border-black bg-white p-6 shadow-[12px_12px_0_#0b0b0b] md:grid-cols-3">
            <div className="flex flex-col gap-2 border-b-4 border-black pb-4 md:border-b-0 md:border-r-4 md:pb-0 md:pr-6">
              <span className="text-sm uppercase tracking-[0.2em] text-[#0b0b0b]/60">
                Overall Voltage
              </span>
              <span className="text-4xl font-black text-[#0b0b0b]">
                {formatScore(weightedScore)}%
              </span>
            </div>
            <div className="flex flex-col gap-2 border-b-4 border-black pb-4 md:border-b-0 md:border-r-4 md:pb-0 md:pr-6">
              <span className="text-sm uppercase tracking-[0.2em] text-[#0b0b0b]/60">
                Brutalist Confidence
              </span>
              <span className="text-lg font-semibold uppercase tracking-[0.3em] text-[#0b0b0b]">
                {scoreLabel(weightedScore)}
              </span>
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-sm uppercase tracking-[0.2em] text-[#0b0b0b]/60">
                Recommended Focus Next Sprint
              </span>
              <span className="text-lg font-semibold text-[#0b0b0b]">
                {improvementAreas.length > 0
                  ? metricIdeaMap[improvementAreas[0].id].split(".")[0] + "."
                  : "Sustain the momentum—document the system as a brutalist design language kit."}
              </span>
            </div>
          </div>
        </header>

        <section className="grid gap-10 lg:grid-cols-[1.8fr_1fr]">
          <div className="grid gap-8">
            {categories.map((category) => (
              <article
                key={category.id}
                className="relative grid gap-6 rounded-[2.5rem] border-[5px] border-black bg-[#fefefe] p-8 shadow-[14px_14px_0_#0b0b0b]"
              >
                <div
                  className={`absolute -left-6 top-8 hidden h-12 w-24 rounded-full border-4 border-black bg-gradient-to-r ${category.accent} shadow-[6px_6px_0_#0b0b0b] lg:block`}
                />
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div className="max-w-2xl">
                    <h2 className="text-2xl font-black uppercase tracking-tight text-[#0b0b0b]">
                      {category.title}
                    </h2>
                    <p className="mt-2 text-sm leading-relaxed text-[#0b0b0b]/80">
                      {category.statement}
                    </p>
                  </div>
                  <span className="inline-flex items-center rounded-full border-4 border-black bg-[#0b0b0b] px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-white shadow-[6px_6px_0_#0b0b0b]">
                    {formatScore(
                      categoryBreakdown.find((item) => item.id === category.id)?.score ?? 0,
                    )}
                    %
                  </span>
                </div>

                <div className="grid gap-5">
                  {category.metrics.map((metric) => (
                    <div
                      key={metric.id}
                      className="grid gap-3 rounded-[1.5rem] border-4 border-black bg-white p-5 shadow-[10px_10px_0_#0b0b0b]"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <div>
                          <h3 className="text-lg font-bold uppercase tracking-tight text-[#0b0b0b]">
                            {metric.label}
                          </h3>
                          <p className="text-sm text-[#0b0b0b]/75">
                            {metric.description}
                          </p>
                        </div>
                        <span className="flex min-w-[92px] justify-end text-right text-3xl font-black text-[#0b0b0b]">
                          {formatScore(scores[metric.id])}
                        </span>
                      </div>

                      <div className="flex items-center gap-3">
                        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#0b0b0b]/60">
                          {metric.minLabel}
                        </span>
                        <input
                          type="range"
                          min={0}
                          max={100}
                          step={1}
                          value={scores[metric.id]}
                          onChange={(event) =>
                            setScores((prev) => ({
                              ...prev,
                              [metric.id]: Number(event.target.value),
                            }))
                          }
                          className="h-3 w-full cursor-pointer appearance-none rounded-full border-4 border-black bg-gradient-to-r from-[#ff7300] via-[#ff4faf] to-[#4d00ff] [accent-color:#0b0b0b]"
                        />
                        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#0b0b0b]/60">
                          {metric.maxLabel}
                        </span>
                      </div>

                      <div className="rounded-[1rem] border-4 border-dashed border-black/60 bg-[#f6f6f6] p-4 text-xs uppercase tracking-[0.2em] text-[#0b0b0b]/70">
                        {metric.inspiration}
                      </div>
                    </div>
                  ))}
                </div>
              </article>
            ))}
          </div>

          <aside className="sticky top-8 flex h-fit flex-col gap-6">
            <div className="grid gap-4 rounded-[2.5rem] border-[5px] border-black bg-[#f7f7f7] p-7 shadow-[14px_14px_0_#0b0b0b]">
              <h2 className="text-xl font-black uppercase tracking-tight text-[#0b0b0b]">
                Score Breakdown
              </h2>
              <div className="space-y-4">
                {categoryBreakdown.map((category) => (
                  <div
                    key={category.id}
                    className="grid gap-1 rounded-[1rem] border-4 border-black bg-white px-4 py-3 shadow-[8px_8px_0_#0b0b0b]"
                  >
                    <div className="flex items-center justify-between text-xs uppercase tracking-[0.2em] text-[#0b0b0b]/60">
                      <span>{category.title}</span>
                      <span>{formatScore(category.score)}%</span>
                    </div>
                    <div className="h-3 w-full rounded-full border-4 border-black bg-[#f0f0f0]">
                      <div
                        className={`h-full rounded-full border-r-4 border-black bg-gradient-to-r ${category.accent}`}
                        style={{ width: `${category.score}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid gap-4 rounded-[2.5rem] border-[5px] border-black bg-[#171717] p-7 text-[#f8f8f8] shadow-[14px_14px_0_#0b0b0b]">
              <h2 className="text-xl font-black uppercase tracking-tight">
                Priority Upgrades
              </h2>
              <p className="text-sm text-[#f8f8f8]/70">
                Focus on the lowest-scoring levers to push your brutalist system into cult-classic territory.
              </p>
              <div className="grid gap-3">
                {improvementAreas.length > 0 ? (
                  improvementAreas.map((item) => (
                    <div
                      key={item.id}
                      className="grid gap-2 rounded-[1.2rem] border-4 border-[#f8f8f8] bg-[#222] p-4 shadow-[6px_6px_0_#0b0b0b]"
                    >
                      <span className="text-xs uppercase tracking-[0.3em] text-[#f8f8f8]/60">
                        Current Score · {formatScore(item.current)}%
                      </span>
                      <p className="text-sm font-semibold leading-snug text-[#f8f8f8]">
                        {item.action}
                      </p>
                    </div>
                  ))
                ) : (
                  <p className="rounded-[1.2rem] border-4 border-[#f8f8f8] bg-[#222] p-4 text-sm font-semibold leading-snug text-[#f8f8f8] shadow-[6px_6px_0_#0b0b0b]">
                    Every metric is firing. Start choreographing high-drama release notes and broadcast the system.
                  </p>
                )}
              </div>
            </div>

            <div className="grid gap-3 rounded-[2.5rem] border-[5px] border-black bg-[#fefefe] p-7 shadow-[14px_14px_0_#0b0b0b]">
              <h2 className="text-xl font-black uppercase tracking-tight text-[#0b0b0b]">
                Export Checklist
              </h2>
              <ul className="grid gap-3 text-sm text-[#0b0b0b]/80">
                <li className="flex items-center gap-3">
                  <span className="grid h-8 w-8 place-items-center rounded-full border-4 border-black bg-[#fff] text-xs font-black shadow-[4px_4px_0_#0b0b0b]">
                    01
                  </span>
                  Version your palette, spacing, and typographic DNA as an open design spec.
                </li>
                <li className="flex items-center gap-3">
                  <span className="grid h-8 w-8 place-items-center rounded-full border-4 border-black bg-[#fff] text-xs font-black shadow-[4px_4px_0_#0b0b0b]">
                    02
                  </span>
                  Build a library of component slabs with hover/active states illustrated like hardware manuals.
                </li>
                <li className="flex items-center gap-3">
                  <span className="grid h-8 w-8 place-items-center rounded-full border-4 border-black bg-[#fff] text-xs font-black shadow-[4px_4px_0_#0b0b0b]">
                    03
                  </span>
                  Document motion primitives (duration, easing, offset) so engineers can implement without guesswork.
                </li>
              </ul>
            </div>
          </aside>
        </section>
      </main>
    </div>
  );
}
