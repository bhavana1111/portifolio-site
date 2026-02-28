import React, { useMemo, useState } from "react";

const LINKS = {
  github: "https://github.com/bhavana1111",
  linkedin: "https://www.linkedin.com/in/bhavanakondeti/",
  email: "mailto:bhavanakondeti2000@email.com",
  resume: "/Bhavana_K_Resume.pdf",
};

// ---------- UI primitives ----------
function cx(...classes) {
  return classes.filter(Boolean).join(" ");
}

function Container({ children }) {
  return <div className="mx-auto w-full max-w-6xl px-4">{children}</div>;
}

function Badge({ children, tone = "neutral" }) {
  const styles =
    tone === "brand"
      ? "border-indigo-200 bg-indigo-50 text-indigo-700"
      : tone === "good"
        ? "border-emerald-200 bg-emerald-50 text-emerald-700"
        : tone === "warm"
          ? "border-amber-200 bg-amber-50 text-amber-700"
          : "border-slate-200 bg-white/70 text-slate-700";
  return (
    <span
      className={cx(
        "inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium",
        styles,
      )}
    >
      {children}
    </span>
  );
}

function Card({ children, className = "" }) {
  return (
    <div
      className={cx(
        "rounded-2xl border border-slate-200 bg-white/80 shadow-sm backdrop-blur",
        className,
      )}
    >
      {children}
    </div>
  );
}

function ButtonLink({
  href,
  children,
  variant = "primary",
  target,
  rel,
  download,
}) {
  const base =
    "inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-medium transition focus:outline-none focus:ring-2 focus:ring-offset-2";
  const styles =
    variant === "primary"
      ? "bg-slate-900 text-white hover:bg-slate-800 focus:ring-slate-900"
      : variant === "soft"
        ? "bg-indigo-50 text-indigo-700 hover:bg-indigo-100 focus:ring-indigo-300"
        : "border border-slate-200 bg-white text-slate-900 hover:bg-slate-50 focus:ring-slate-300";
  return (
    <a
      className={cx(base, styles)}
      href={href}
      target={target ?? (href?.startsWith("http") ? "_blank" : undefined)}
      rel={rel ?? "noreferrer"}
      download={download}
    >
      {children}
    </a>
  );
}

function Section({ id, title, subtitle, children }) {
  return (
    <section id={id} className="scroll-mt-24 py-12">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold tracking-tight text-slate-900 md:text-3xl">
          {title}
        </h2>
        {subtitle ? (
          <p className="mt-2 max-w-3xl text-slate-600">{subtitle}</p>
        ) : null}
      </div>
      {children}
    </section>
  );
}

function Divider() {
  return <div className="h-px w-full bg-slate-200" />;
}

/** Resume modal (opens PDF inside the same website) */
function ResumeModal({ open, onClose }) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[999] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
    >
      {/* backdrop */}
      <button
        type="button"
        aria-label="Close resume preview"
        onClick={onClose}
        className="absolute inset-0 bg-black/50"
      />

      {/* modal */}
      <div className="relative z-[1000] w-full max-w-5xl overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl">
        <div className="flex items-center justify-between border-b border-slate-200 px-4 py-3">
          <div className="text-sm font-semibold text-slate-900">
            Resume Preview
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm font-medium text-slate-900 hover:bg-slate-50"
          >
            Close
          </button>
        </div>

        <div className="h-[75vh] bg-slate-50">
          <iframe
            title="Bhavana Resume"
            src={LINKS.resume}
            className="h-full w-full"
          />
        </div>

        <div className="flex items-center justify-end gap-2 border-t border-slate-200 px-4 py-3">
          <a
            href={LINKS.resume}
            download
            className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800"
          >
            Download
          </a>
        </div>
      </div>
    </div>
  );
}

/** Reusable Resume buttons: Preview (modal) + Download */
function ResumeButtons({ size = "md", onPreview }) {
  const gap = size === "sm" ? "gap-2" : "gap-2";
  const pad =
    size === "sm"
      ? "px-3 py-1.5 text-xs rounded-lg"
      : "px-4 py-2 text-sm rounded-xl";

  const base =
    "inline-flex items-center justify-center font-medium transition focus:outline-none focus:ring-2 focus:ring-offset-2";
  const preview =
    "border border-slate-200 bg-white text-slate-900 hover:bg-slate-50 focus:ring-slate-300";
  const download =
    "bg-slate-900 text-white hover:bg-slate-800 focus:ring-slate-900";

  return (
    <div className={cx("flex items-center", gap)}>
      <button
        type="button"
        onClick={onPreview}
        className={cx(base, preview, pad)}
      >
        Preview Resume
      </button>
    </div>
  );
}

// ---------- Content ----------
const NAV = [
  { label: "Overview", href: "#top" },
  { label: "Experience", href: "#experience" },
  { label: "Work", href: "#work" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

const IMPACT = [
  {
    label: "Enterprise Experience",
    value: "Paycom",
    note: "Production-scale SaaS systems",
  },
  {
    label: "Research",
    value: "ICSE 2026 • NIER",
    note: "First Author — EvaDroid",
  },
  {
    label: "Founder",
    value: "IIM-V Incubated",
    note: "15+ vendors onboarded globally",
  },
];

const EXPERIENCE = [
  {
    company: "Paycom",
    role: "Software Engineer (Full-Stack)",
    time: "2024 – 2026",
    tags: [
      "Enterprise SaaS",
      "SQL Optimization",
      "Unit Testing",
      "Code Reviews",
    ],
    highlights: [
      "Built centralized Import Center framework to standardize data ingestion and reduce duplicated logic across modules.",
      "Optimized SQL queries to improve response times for expense reporting workflows.",
      "Improved reliability with shared utilities, unit tests, and production debugging on legacy systems.",
    ],
    details: [
      "Actively participated in peer code reviews to maintain quality and enforce best practices.",
      "Worked on legacy codebases: refactoring, improving maintainability, and reducing duplication via shared components/utilities.",
      "Handled large customer report datasets and cross-module workflows to improve customer experience and stability.",
    ],
    stack: ["React", "JavaScript/TypeScript", "PHP", "SQL", "REST APIs"],
  },
  {
    company: "Apxor",
    role: "Software Engineer",
    time: "2022 – 2023",
    tags: ["Product SaaS", "Client-facing", "Onboarding", "Troubleshooting"],
    highlights: [
      "Collaborated directly with client teams to onboard apps and drive product adoption.",
      "Guided integration/configuration workflows and resolved issues impacting onboarding.",
      "Contributed to customer-facing features across frontend/backend areas for analytics + engagement flows.",
    ],
    details: [
      "Acted as a bridge between customer teams and engineering to troubleshoot issues and clarify product behavior.",
      "Helped improve reliability of onboarding flows by identifying recurring customer friction points.",
    ],
    stack: ["React", "JavaScript", "APIs", "Product Engineering", "Analytics"],
  },
  {
    company: "TraditionOnWay",
    role: "Founder",
    time: "2020 – 2021",
    tags: ["IIM-V Incubated", "Founder", "Vendor Onboarding", "Growth"],
    highlights: [
      "Founded a platform to help local vendors build a global online presence and sell products digitally (COVID period).",
      "Incubated at IIM Visakhapatnam (IIM-V); youngest founder in the cohort.",
      "Onboarded 15 vendors across multiple states via direct outreach and relationship building.",
    ],
    details: [
      "Built and launched an MVP with a small team/friend support and iterated based on vendor feedback.",
      "Helped vendors digitize catalogs and transition from offline to online sales workflows.",
    ],
    stack: ["Product", "Execution", "Customer Development"],
  },
  {
    company: "Independent",
    role: "Freelance Web Developer",
    time: "2020 – 2022",
    tags: ["Small business websites", "Client collaboration"],
    highlights: [
      "Built responsive websites for small/local businesses to establish an online presence during COVID.",
      "Worked directly with business owners to gather requirements and deliver maintainable solutions.",
    ],
    details: [],
    stack: ["HTML", "CSS", "JavaScript", "React"],
  },
  {
    company: "UTSA",
    role: "Research Assistant",
    time: "2023 – 2024",
    tags: ["ICSE 2026 • NIER", "First Author", "LLM + RAG", "Android"],
    highlights: [
      "First author: ICSE 2026 (NIER) paper on LLM + RAG-based Android UI exploration/testing.",
      "Built EvaDroid end-to-end (agents + orchestration + automation).",
      "Implemented robust exception handling and recovery to prevent abrupt failures during long runs.",
    ],
    details: [
      "Designed pipeline integrating Vision → Retrieval → Decision → Execution; improved exploration beyond random baselines.",
      "Built UI state/action representation and retrieval pipelines; added guardrails for edge cases and runtime instability.",
    ],
    stack: ["Python", "LLMs", "RAG", "Vector Retrieval", "ADB", "Android"],
  },
];

// Projects redesigned as “Work” case studies
const FEATURED_WORK = [
  {
    title: "Influencer CRM / Pipeline (Jira-style)",
    subtitle:
      "Workflow product • Scouting → Outreach → Onboarded → Campaign metrics",
    problem:
      "Teams struggle to track influencers across scouting, outreach, negotiation, and campaigns — info is scattered and repeated work happens when teammates join.",
    solution:
      "Built a pipeline-style system with statuses, assignments, notes, creator profiles, and campaign performance tracking (CPA/ROAS/CPL).",
    impact: [
      "Cleaner team workflow",
      "Single source of truth for creators",
      "Faster onboarding for new teammates",
    ],
    tags: ["React", "APIs", "Postgres", "Dashboard"],
    links: [{ label: "Spec", href: "#" }],
  },
];

const OTHER_WORK = [
  {
    title: "Vector Search Playground (RAG)",
    desc: "Embedding ingestion + metadata filters + top-k retrieval + reranking experiments.",
    tags: ["Python", "Vector DB", "RAG"],
    links: [{ label: "Code", href: "#" }],
  },
];

const SKILLS = {
  "Backend & APIs": [
    "Java",
    "PHP",
    "Python",
    "REST APIs",
    "Validation",
    "Error Handling",
  ],
  Frontend: ["React", "Next.js", "TypeScript", "Tailwind"],
  Databases: ["PostgreSQL", "MySQL", "MongoDB", "Query Optimization"],
  "Cloud & DevOps": ["AWS", "Docker", "CI/CD", "GitHub Actions"],
  "AI / Research": [
    "LLMs",
    "RAG",
    "Vector Retrieval",
    "Agentic Workflows",
    "Android UI Testing",
  ],
};

// ---------- Components ----------
function ImpactStrip() {
  return (
    <Card className="overflow-hidden border-0 shadow-lg">
      {/* gradient header */}
      <div className="relative overflow-hidden rounded-t-2xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-cyan-500 px-6 py-5 text-white">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_top_right,white,transparent_60%)]" />
        <div className="relative">
          <div className="text-sm font-medium text-indigo-100">
            Career Highlights
          </div>
          <div className="mt-1 text-lg font-semibold">
            Engineering • Research • Founder Impact
          </div>
        </div>
      </div>

      {/* impact grid */}
      <div className="grid gap-4 p-6 sm:grid-cols-1 lg:grid-cols-3">
        {IMPACT.map((i) => (
          <div
            key={i.label}
            className="group rounded-xl border border-slate-200 bg-white p-5 transition hover:shadow-md hover:-translate-y-1"
          >
            <div className="text-xs font-medium uppercase tracking-wide text-slate-500">
              {i.label}
            </div>

            <div className="mt-2 text-1xl font-semibold text-slate-900 group-hover:text-indigo-600 transition">
              {i.value}
            </div>

            <div className="mt-1 text-sm text-slate-600">{i.note}</div>
          </div>
        ))}
      </div>
    </Card>
  );
}

function ExperienceRow({ item }) {
  const [open, setOpen] = useState(false);

  return (
    <Card className="overflow-hidden">
      <div className="flex flex-col gap-4 p-6 md:flex-row md:items-start md:justify-between">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <div className="text-lg font-semibold text-slate-900">
              {item.role}
            </div>
            {item.tags?.slice(0, 2).map((t) => (
              <Badge key={t} tone="brand">
                {t}
              </Badge>
            ))}
          </div>
          <div className="mt-1 text-slate-600">{item.company}</div>
          <div className="mt-1 text-sm text-slate-500">{item.time}</div>

          <ul className="mt-4 list-disc space-y-2 pl-5 text-slate-600">
            {item.highlights.map((h) => (
              <li key={h}>{h}</li>
            ))}
          </ul>

          <div className="mt-4 flex flex-wrap gap-2">
            {item.stack.map((s) => (
              <Badge key={s}>{s}</Badge>
            ))}
          </div>
        </div>

        <div className="shrink-0">
          {item.details?.length ? (
            <button
              onClick={() => setOpen((v) => !v)}
              className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-900 hover:bg-slate-50"
            >
              {open ? "Hide details" : "View details"}
            </button>
          ) : (
            <div className="text-sm text-slate-400">—</div>
          )}
        </div>
      </div>

      {item.details?.length && open ? (
        <div className="border-t border-slate-200 bg-slate-50 px-6 py-5">
          <div className="text-sm font-semibold text-slate-900">
            More details
          </div>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-slate-600">
            {item.details.map((d) => (
              <li key={d}>{d}</li>
            ))}
          </ul>
        </div>
      ) : null}
    </Card>
  );
}

function CaseStudyCard({ w }) {
  return (
    <Card className="p-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <div className="text-lg font-semibold text-slate-900">{w.title}</div>
          <div className="mt-1 text-sm text-slate-600">{w.subtitle}</div>
        </div>
        <div className="flex flex-wrap gap-2">
          {w.tags.slice(0, 3).map((t) => (
            <Badge key={t} tone="warm">
              {t}
            </Badge>
          ))}
        </div>
      </div>

      <div className="mt-5 grid gap-4 md:grid-cols-3">
        <div>
          <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Problem
          </div>
          <p className="mt-2 text-sm text-slate-600">{w.problem}</p>
        </div>
        <div>
          <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Solution
          </div>
          <p className="mt-2 text-sm text-slate-600">{w.solution}</p>
        </div>
        <div>
          <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Impact
          </div>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-600">
            {w.impact.map((i) => (
              <li key={i}>{i}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        {w.links.map((l) => (
          <ButtonLink key={l.label} href={l.href} variant="secondary">
            {l.label}
          </ButtonLink>
        ))}
      </div>
    </Card>
  );
}

function OtherWorkRow({ p }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white/70 p-5 shadow-sm">
      <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
        <div>
          <div className="font-semibold text-slate-900">{p.title}</div>
          <div className="mt-1 text-sm text-slate-600">{p.desc}</div>
          <div className="mt-3 flex flex-wrap gap-2">
            {p.tags.map((t) => (
              <Badge key={t}>{t}</Badge>
            ))}
          </div>
        </div>
        <div className="flex gap-2">
          {p.links?.map((l) => (
            <ButtonLink key={l.label} href={l.href} variant="secondary">
              {l.label}
            </ButtonLink>
          ))}
        </div>
      </div>
    </div>
  );
}

// ---------- App ----------
export default function App() {
  const [q, setQ] = useState("");
  const [resumeOpen, setResumeOpen] = useState(false);

  const filteredOther = useMemo(() => {
    const query = q.trim().toLowerCase();
    if (!query) return OTHER_WORK;
    return OTHER_WORK.filter((p) =>
      `${p.title} ${p.desc} ${p.tags.join(" ")}`.toLowerCase().includes(query),
    );
  }, [q]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {/* PDF opens inside the same website */}
      <ResumeModal open={resumeOpen} onClose={() => setResumeOpen(false)} />

      {/* soft premium background */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-white via-slate-50 to-slate-100" />
        <div className="absolute -top-28 left-[-12%] h-[28rem] w-[28rem] rounded-full bg-indigo-200/55 blur-3xl" />
        <div className="absolute top-20 right-[-12%] h-[28rem] w-[28rem] rounded-full bg-cyan-200/45 blur-3xl" />
      </div>

      {/* header */}
      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/80 backdrop-blur">
        <Container>
          <div className="flex items-center justify-between py-3">
            <a href="#top" className="font-semibold tracking-tight">
              Bhavana Kondeti{" "}
              <span className="ml-2 hidden rounded-full bg-slate-100 px-2 py-1 text-xs font-medium text-slate-700 sm:inline">
                Full-Stack • Product SaaS • LLM/RAG • Founder
              </span>
            </a>

            <nav className="hidden gap-6 md:flex">
              {NAV.map((n) => (
                <a
                  key={n.href}
                  href={n.href}
                  className="text-sm text-slate-700 hover:text-slate-900"
                >
                  {n.label}
                </a>
              ))}
            </nav>

            {/* UPDATED: Preview opens modal */}
            <div className="flex items-center gap-2">
              <ResumeButtons size="sm" onPreview={() => setResumeOpen(true)} />
              <ButtonLink href={LINKS.linkedin} variant="primary">
                LinkedIn
              </ButtonLink>
            </div>
          </div>
        </Container>
      </header>

      <main id="top">
        <Container>
          {/* hero */}
          <div className="grid gap-8 py-12 md:grid-cols-12 md:items-center">
            <div className="md:col-span-7">
              <div className="flex flex-wrap gap-2">
                <Badge tone="brand">ICSE 2026 • NIER (First Author)</Badge>
                <Badge tone="good">IIM-V Incubated Founder</Badge>
                <Badge>Client-facing Product SaaS</Badge>
              </div>

              <h1 className="mt-5 text-4xl font-semibold tracking-tight text-slate-900 md:text-5xl">
                I build scalable software &{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-cyan-600">
                  reliable AI-assisted systems
                </span>
                .
              </h1>

              <p className="mt-4 max-w-2xl text-lg text-slate-600">
                Full-Stack engineer with enterprise SaaS experience (Paycom),
                product engineering + client onboarding experience (Apxor),
                founder background (IIM-V incubated), and applied AI research
                (LLM + RAG) for Android UI testing.
              </p>

              <div className="mt-7 flex flex-wrap gap-3">
                <ButtonLink href={LINKS.email} variant="secondary">
                  Email
                </ButtonLink>
                <ButtonLink href={LINKS.github} variant="secondary">
                  GitHub
                </ButtonLink>

                {/* UPDATED: Preview opens modal */}
                <ResumeButtons onPreview={() => setResumeOpen(true)} />
              </div>
            </div>

            <div className="md:col-span-5">
              <ImpactStrip />
            </div>
          </div>

          <Divider />

          {/* experience */}
          <Section
            id="experience"
            title="Experience"
            subtitle="Short highlights first. Expand for details only if needed — less content heavy, more recruiter-friendly."
          >
            <div className="space-y-5">
              {EXPERIENCE.map((e) => (
                <ExperienceRow key={`${e.company}-${e.role}`} item={e} />
              ))}
            </div>
          </Section>

          <Divider />

          {/* work/projects redesigned */}
          <Section id="work" title="Selected work">
            <div className="grid gap-5">
              {FEATURED_WORK.map((w) => (
                <CaseStudyCard key={w.title} w={w} />
              ))}
            </div>

            <div className="mt-8">
              <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
                <div>
                  <div className="text-sm font-semibold text-slate-900">
                    Other builds
                  </div>
                </div>

                <input
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="Search…"
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-300 md:w-72"
                />
              </div>

              <div className="mt-4 grid gap-4">
                {filteredOther.map((p) => (
                  <OtherWorkRow key={p.title} p={p} />
                ))}
              </div>
            </div>
          </Section>

          <Divider />

          {/* skills */}
          <Section id="skills" title="Skills">
            <div className="grid gap-5 md:grid-cols-2">
              {Object.entries(SKILLS).map(([group, items]) => (
                <Card key={group} className="p-6">
                  <div className="text-lg font-semibold text-slate-900">
                    {group}
                  </div>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {items.map((i) => (
                      <Badge key={i}>{i}</Badge>
                    ))}
                  </div>
                </Card>
              ))}
            </div>
          </Section>

          <Divider />

          {/* contact */}
          <Section id="contact" title="Contact">
            <Card className="p-6">
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <div className="text-lg font-semibold text-slate-900">
                    Bhavana Kondeti
                  </div>
                  <div className="mt-1 text-slate-600">
                    Full-Stack • Product SaaS • LLM/RAG • Founder
                  </div>
                  <div className="mt-2 text-sm text-slate-500">
                    Best way to reach me: Email.
                  </div>
                </div>

                {/* UPDATED: Preview opens modal */}
                <div className="flex flex-wrap gap-2">
                  <ButtonLink href={LINKS.email} variant="primary">
                    Email
                  </ButtonLink>
                  <ButtonLink href={LINKS.linkedin} variant="secondary">
                    LinkedIn
                  </ButtonLink>
                  <ButtonLink href={LINKS.github} variant="secondary">
                    GitHub
                  </ButtonLink>
                  <ResumeButtons onPreview={() => setResumeOpen(true)} />
                </div>
              </div>

              <div className="mt-6 text-sm text-slate-500">
                © {new Date().getFullYear()} Bhavana Kondeti • Built with React
                + Tailwind
              </div>
            </Card>
          </Section>

          <div className="pb-16" />
        </Container>
      </main>
    </div>
  );
}
