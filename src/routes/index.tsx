import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowRight,
  Award,
  BarChart3,
  Braces,
  Brain,
  Briefcase,
  Building2,
  Calendar,
  CheckCircle2,
  Code2,
  Database,
  Download,
  ExternalLink,
  Eye,
  FileText,
  Github,
  GraduationCap,
  LineChart,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Send,
  Sparkles,
  Target,
  Wrench,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
import profileAsset from "@/assets/sunil-profile.jpg.asset.json";
import projHrAsset from "@/assets/proj-hr.jpg";
import projBlinkitAsset from "@/assets/proj-blinkit.jpg";

export const Route = createFileRoute("/")({
  component: PortfolioPage,
});

const RESUME_URL =
  "https://drive.google.com/file/d/1srr_GFqwh3mpk1uJfGNGZIDZlMfIy_7Y/view?usp=sharing";
const RESUME_DOWNLOAD_URL =
  "https://drive.google.com/uc?export=download&id=1srr_GFqwh3mpk1uJfGNGZIDZlMfIy_7Y";
const GITHUB_URL = "https://github.com/Sunil18v";
const LINKEDIN_URL = "https://www.linkedin.com/in/sunil-kumar-b77365319/";
const EMAIL = "sunilkumarkambar205@gmail.com";
const PHONE = "+91 9353896944";
const BUILDER_URL = "https://vinodbavage.dev";

const ROLES = ["Data Analyst", "ML Engineer", "Data Scientist"];

const SKILL_GROUPS: { title: string; icon: React.ReactNode; items: string[] }[] = [
  {
    title: "Programming & Querying",
    icon: <Code2 className="h-5 w-5" />,
    items: ["Python", "SQL"],
  },
  {
    title: "Machine Learning",
    icon: <Brain className="h-5 w-5" />,
    items: [
      "Supervised Learning",
      "Unsupervised Learning",
      "Feature Engineering",
      "Model Evaluation",
      "Model Tuning",
    ],
  },
  {
    title: "Deep Learning",
    icon: <Sparkles className="h-5 w-5" />,
    items: ["CNNs", "Transfer Learning", "TensorFlow", "Keras"],
  },
  {
    title: "Data Analysis & Visualization",
    icon: <BarChart3 className="h-5 w-5" />,
    items: ["Pandas", "NumPy", "Matplotlib", "Seaborn", "Power BI", "Tableau"],
  },
  {
    title: "Tools & Platforms",
    icon: <Wrench className="h-5 w-5" />,
    items: ["Git", "GitHub", "Jupyter", "Google Colab", "VS Code", "Streamlit"],
  },
];

const FEATURED_PROJECTS = [
  {
    title: "HR Analytics Dashboard",
    period: "Apr 2026 – May 2026",
    image: projHrAsset,
    repo: "https://github.com/Sunil18v/HR-Analytices",
    tags: ["Power BI", "DAX", "Power Query"],
    summary:
      "Interactive Power BI dashboard to analyze employee attrition, workforce demographics and key HR performance metrics.",
    bullets: [
      "Built DAX measures and KPI cards tracking attrition rate, headcount and department performance.",
      "Cleaned and modelled data with Power Query for accurate, high-quality reporting.",
      "Designed slicers, drill-through and filters enabling data-driven HR decisions.",
    ],
  },
  {
    title: "Blinkit Sales Analysis Dashboard",
    period: "Oct 2025 – Nov 2025",
    image: projBlinkitAsset,
    repo: "https://github.com/Sunil18v/blinkit",
    tags: ["Power BI", "SQL", "DAX"],
    summary:
      "End-to-end sales analytics on Blinkit data to surface customer behaviour, top products and outlet performance.",
    bullets: [
      "Extracted, cleaned and modelled multi-source data for an optimized reporting layer.",
      "Built KPIs: Total Sales, Orders, AOV, Ratings, Category-wise Sales.",
      "Delivered insights on top products, outlets and customer purchase patterns.",
    ],
  },
];

const EXPERIENCE = [
  {
    role: "Data Analyst Intern",
    company: "ExcelR Solutions Pvt. Ltd.",
    location: "Bengaluru, India",
    period: "Jun 2025 – Feb 2026",
    points: [
      "Analyzed business data with SQL to identify trends and drive data-informed decisions.",
      "Built interactive Power BI dashboards using DAX, Power Query and data modelling to track KPIs.",
      "Performed cleaning, transformation and validation ensuring accurate, consistent reporting.",
      "Automated recurring reports, reducing manual reporting effort by 20%.",
    ],
  },
  {
    role: "AI / Machine Learning Engineer Intern",
    company: "Roman Technologies Pvt. Ltd.",
    location: "Remote",
    period: "6 months",
    points: [
      "Studied core ML algorithms in depth — regression, classification, clustering, ensembles and evaluation techniques.",
      "Applied algorithms to real-world datasets, iterating on feature engineering and hyperparameter tuning.",
      "Built end-to-end pipelines covering data ingestion, preprocessing, model training and evaluation.",
      "Collaborated on production-oriented projects, learning deployment patterns and reproducibility practices.",
    ],
  },
];

const CERTIFICATIONS = [
  {
    title: "Data Analyst Certification",
    issuer: "ExcelR — Rising Excellence",
    date: "28 Aug 2025",
    location: "Bengaluru",
  },
  {
    title: "Data Science Intern Certificate",
    issuer: "AI Variant",
    date: "Issued 01 Jan 2026",
    location: "31 Mar 2025 – 31 Dec 2025",
  },
];

function useRotatingType(words: string[], typeSpeed = 90, pauseMs = 1400) {
  const [text, setText] = useState("");
  const [idx, setIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[idx % words.length];
    let timeout: ReturnType<typeof setTimeout>;
    if (!deleting && text === current) {
      timeout = setTimeout(() => setDeleting(true), pauseMs);
    } else if (deleting && text === "") {
      setDeleting(false);
      setIdx((i) => (i + 1) % words.length);
    } else {
      timeout = setTimeout(
        () => {
          setText((t) =>
            deleting ? current.slice(0, t.length - 1) : current.slice(0, t.length + 1),
          );
        },
        deleting ? 40 : typeSpeed,
      );
    }
    return () => clearTimeout(timeout);
  }, [text, deleting, idx, words, typeSpeed, pauseMs]);

  return text;
}

function useReveal<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setShown(true);
            io.disconnect();
          }
        });
      },
      { threshold: 0.12 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return { ref, shown };
}

function Section({
  id,
  eyebrow,
  title,
  children,
}: {
  id: string;
  eyebrow?: string;
  title: string;
  children: React.ReactNode;
}) {
  const { ref, shown } = useReveal<HTMLDivElement>();
  return (
    <section id={id} className="relative py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div
          ref={ref}
          className={`mb-12 transition-all duration-700 ${
            shown ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
          }`}
        >
          {eyebrow && (
            <div className="mb-3 inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.2em] text-primary">
              <span className="h-px w-8 bg-primary" />
              {eyebrow}
            </div>
          )}
          <h2 className="font-display text-3xl font-bold tracking-tight md:text-5xl">
            {title}
          </h2>
        </div>
        {children}
      </div>
    </section>
  );
}

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 20);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  const links = [
    ["About", "about"],
    ["Skills", "skills"],
    ["Projects", "projects"],
    ["Experience", "experience"],
    ["Contact", "contact"],
  ];
  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-all duration-300 ${
        scrolled
          ? "border-b border-border/60 bg-background/70 backdrop-blur-xl"
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a href="#top" className="group flex items-center gap-2">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-primary to-accent font-display text-sm font-bold text-primary-foreground shadow-[var(--shadow-glow)]">
            SK
          </span>
          <span className="font-display text-sm font-semibold tracking-tight">
            Sunil Kumar
          </span>
        </a>
        <ul className="hidden items-center gap-8 md:flex">
          {links.map(([label, id]) => (
            <li key={id}>
              <a
                href={`#${id}`}
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {label}
              </a>
            </li>
          ))}
        </ul>
        <Button asChild size="sm" variant="default" className="rounded-full">
          <a href="#contact">
            Let's talk <ArrowRight className="ml-1 h-4 w-4" />
          </a>
        </Button>
      </nav>
    </header>
  );
}

function Hero({ onResume }: { onResume: () => void }) {
  const rotating = useRotatingType(ROLES);
  return (
    <section id="top" className="relative overflow-hidden pt-32 md:pt-40">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(60% 40% at 20% 10%, oklch(0.72 0.17 200 / 0.15), transparent 60%), radial-gradient(50% 40% at 90% 20%, oklch(0.75 0.18 60 / 0.12), transparent 60%)",
        }}
      />
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-6 pb-20 md:grid-cols-[1.1fr_0.9fr] md:pb-32">
        <div className="animate-[fade-in_0.8s_ease-out]">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-3 py-1.5 text-xs text-muted-foreground backdrop-blur">
            <span className="relative flex h-2 w-2">
              <span
                className="absolute inline-flex h-full w-full rounded-full opacity-75 animate-blink"
                style={{ backgroundColor: "var(--success)" }}
              />
              <span
                className="relative inline-flex h-2 w-2 rounded-full"
                style={{ backgroundColor: "var(--success)" }}
              />
            </span>
            Available for opportunities · Bengaluru
          </div>
          <h1 className="font-display text-5xl font-bold leading-[1.05] tracking-tight md:text-7xl">
            Hi, I'm <span className="text-foreground">Sunil</span>
            <br />
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage: "var(--gradient-hero)",
                backgroundSize: "200% 200%",
                animation: "gradientShift 8s ease infinite",
              }}
            >
              {rotating || "\u00A0"}
              <span className="ml-1 inline-block h-[0.9em] w-[3px] translate-y-1 bg-primary align-middle animate-caret" />
            </span>
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
            I turn messy datasets into decisions. Entry-level Data Analyst with hands-on
            experience across Python, SQL, Power BI and end-to-end machine learning
            pipelines — passionate about shipping data products that move the needle.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button asChild size="lg" className="rounded-full shadow-[var(--shadow-glow)]">
              <a href="#projects">
                View my work <ArrowRight className="ml-1 h-4 w-4" />
              </a>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="rounded-full border-border bg-card/50 backdrop-blur"
              onClick={onResume}
            >
              <FileText className="mr-1 h-4 w-4" /> Resume
            </Button>
          </div>
          <div className="mt-10 flex items-center gap-6 text-xs text-muted-foreground">
            <span className="flex items-center gap-2">
              <MapPin className="h-3.5 w-3.5" /> Bengaluru, IN
            </span>
            <span className="flex items-center gap-2">
              <Mail className="h-3.5 w-3.5" /> {EMAIL}
            </span>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-md">
          <div
            aria-hidden
            className="absolute -inset-6 -z-10 rounded-[2rem] opacity-70 blur-2xl"
            style={{ background: "var(--gradient-hero)" }}
          />
          <div className="relative overflow-hidden rounded-[1.75rem] border border-border bg-card shadow-[var(--shadow-soft)]">
            <img
              src={profileAsset.url}
              alt="Sunil Kumar portrait"
              width={1240}
              height={1240}
              className="aspect-[4/5] w-full object-cover"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between rounded-2xl border border-border/70 bg-background/70 px-4 py-3 backdrop-blur-md">
              <div>
                <p className="text-xs text-muted-foreground">Currently</p>
                <p className="font-display text-sm font-semibold">Open to work</p>
              </div>
              <span
                className="grid h-9 w-9 place-items-center rounded-full"
                style={{ backgroundColor: "color-mix(in oklab, var(--success) 20%, transparent)" }}
              >
                <span
                  className="h-2.5 w-2.5 rounded-full animate-blink"
                  style={{ backgroundColor: "var(--success)" }}
                />
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function QuickActions({ onResume }: { onResume: () => void }) {
  const items = [
    {
      label: "Resume",
      desc: "View or download",
      icon: <FileText className="h-5 w-5" />,
      onClick: onResume,
    },
    {
      label: "GitHub",
      desc: "Code & projects",
      icon: <Github className="h-5 w-5" />,
      href: GITHUB_URL,
    },
    {
      label: "LinkedIn",
      desc: "Connect with me",
      icon: <Linkedin className="h-5 w-5" />,
      href: LINKEDIN_URL,
    },
  ];
  return (
    <div className="mx-auto -mt-8 max-w-6xl px-6 md:-mt-16">
      <div className="grid gap-4 md:grid-cols-3">
        {items.map((it) => {
          const Comp: any = it.href ? "a" : "button";
          const props: any = it.href
            ? { href: it.href, target: "_blank", rel: "noreferrer noopener" }
            : { onClick: it.onClick, type: "button" };
          return (
            <Comp
              key={it.label}
              {...props}
              className="group relative flex items-center justify-between overflow-hidden rounded-2xl border border-border bg-card p-5 text-left shadow-[var(--shadow-soft)] transition-all hover:-translate-y-1 hover:border-primary/60 hover:shadow-[var(--shadow-glow)]"
            >
              <div className="flex items-center gap-4">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 text-primary">
                  {it.icon}
                </span>
                <div>
                  <p className="font-display font-semibold">{it.label}</p>
                  <p className="text-xs text-muted-foreground">{it.desc}</p>
                </div>
              </div>
              <ArrowRight className="h-4 w-4 text-muted-foreground transition-all group-hover:translate-x-1 group-hover:text-primary" />
            </Comp>
          );
        })}
      </div>
    </div>
  );
}

function About() {
  return (
    <Section id="about" eyebrow="About" title="Data-driven, delivery-focused.">
      <div className="grid gap-10 md:grid-cols-[1.3fr_1fr]">
        <div className="space-y-5 text-base leading-relaxed text-muted-foreground md:text-lg">
          <p>
            I'm an entry-level Data Analyst who loves turning raw data into stories that
            drive decisions. My toolkit spans Python (Pandas, NumPy, Scikit-learn), SQL,
            and Power BI, and I'm equally comfortable building an ML pipeline as I am
            wiring up a dashboard for a stakeholder review.
          </p>
          <p>
            I've shipped analytics and ML work across internships at ExcelR and Roman
            Technologies — automating reports, tuning models, and translating fuzzy
            business questions into crisp, measurable answers.
          </p>
        </div>
        <div className="space-y-4">
          <Card className="border-border bg-card p-5">
            <div className="mb-2 flex items-center gap-2 text-xs uppercase tracking-widest text-primary">
              <Target className="h-4 w-4" /> Career Focus
            </div>
            <p className="text-sm text-muted-foreground">
              Building high-signal dashboards and production-ready ML systems that convert
              data into measurable business outcomes.
            </p>
          </Card>
          <Card className="border-border bg-card p-5">
            <div className="mb-2 flex items-center gap-2 text-xs uppercase tracking-widest text-primary">
              <Sparkles className="h-4 w-4" /> What I'm Looking For
            </div>
            <p className="text-sm text-muted-foreground">
              A full-time Data Analyst, ML Engineer or Data Scientist role on a team that
              values curiosity, ownership and shipping — where I can grow alongside senior
              practitioners on real, high-impact problems.
            </p>
          </Card>
        </div>
      </div>
    </Section>
  );
}

function Education() {
  return (
    <Section id="education" eyebrow="Education" title="Where I trained.">
      <Card className="flex flex-col gap-4 border-border bg-card p-6 md:flex-row md:items-center md:justify-between md:p-8">
        <div className="flex items-start gap-4">
          <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 text-primary">
            <GraduationCap className="h-6 w-6" />
          </span>
          <div className="min-w-0">
            <p className="font-display text-lg font-semibold">
              B.E. in Artificial Intelligence & Machine Learning
            </p>
            <p className="text-sm text-muted-foreground">
              Bheemanna Khandre Institute of Technology, Bhalki, Karnataka
            </p>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
          <Badge variant="secondary" className="rounded-full">
            2021 – 2025
          </Badge>
          <Badge className="rounded-full bg-primary/15 text-primary hover:bg-primary/20">
            Graduated 2025
          </Badge>
        </div>
      </Card>
    </Section>
  );
}

function Skills() {
  return (
    <Section id="skills" eyebrow="Skills" title="Tools I reach for.">
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {SKILL_GROUPS.map((g) => (
          <Card
            key={g.title}
            className="group relative overflow-hidden border-border bg-card p-6 transition-all hover:-translate-y-1 hover:border-primary/50 hover:shadow-[var(--shadow-glow)]"
          >
            <div
              aria-hidden
              className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full opacity-0 blur-2xl transition-opacity group-hover:opacity-60"
              style={{ background: "var(--gradient-hero)" }}
            />
            <div className="mb-4 flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-lg bg-primary/15 text-primary">
                {g.icon}
              </span>
              <h3 className="font-display font-semibold">{g.title}</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {g.items.map((s) => (
                <span
                  key={s}
                  className="rounded-full border border-border bg-secondary/60 px-3 py-1 text-xs text-secondary-foreground transition-colors hover:border-primary/60 hover:text-primary"
                >
                  {s}
                </span>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </Section>
  );
}

function Projects() {
  return (
    <Section id="projects" eyebrow="Projects" title="Selected work.">
      <div className="grid gap-8">
        {FEATURED_PROJECTS.map((p, i) => (
          <Card
            key={p.title}
            className={`group grid grid-cols-1 overflow-hidden border-border bg-card md:grid-cols-2 ${
              i % 2 ? "md:[&>div:first-child]:order-2" : ""
            }`}
          >
            <div className="relative aspect-[16/10] overflow-hidden md:aspect-auto">
              <img
                src={p.image}
                alt={p.title}
                loading="lazy"
                width={1280}
                height={800}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent md:bg-gradient-to-r" />
            </div>
            <div className="flex flex-col justify-center gap-4 p-6 md:p-10">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Calendar className="h-3.5 w-3.5" /> {p.period}
              </div>
              <h3 className="font-display text-2xl font-bold tracking-tight md:text-3xl">
                {p.title}
              </h3>
              <p className="text-sm text-muted-foreground md:text-base">{p.summary}</p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                {p.bullets.map((b) => (
                  <li key={b} className="flex gap-2">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
              <div className="flex flex-wrap gap-2 pt-1">
                {p.tags.map((t) => (
                  <Badge
                    key={t}
                    variant="secondary"
                    className="rounded-full bg-secondary/70"
                  >
                    {t}
                  </Badge>
                ))}
              </div>
              <div className="pt-2">
                <Button asChild className="rounded-full">
                  <a href={p.repo} target="_blank" rel="noreferrer noopener">
                    <Github className="mr-2 h-4 w-4" />
                    View on GitHub
                    <ExternalLink className="ml-2 h-3.5 w-3.5" />
                  </a>
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </Section>
  );
}

function Experience() {
  return (
    <Section id="experience" eyebrow="Experience" title="Where I've worked.">
      <div className="relative space-y-6 border-l border-border/70 pl-6 md:pl-10">
        {EXPERIENCE.map((e) => (
          <div key={e.company} className="relative">
            <span className="absolute -left-[31px] top-2 grid h-6 w-6 place-items-center rounded-full border border-border bg-background md:-left-[43px]">
              <span className="h-2 w-2 rounded-full bg-primary" />
            </span>
            <Card className="border-border bg-card p-6 md:p-8">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="min-w-0">
                  <h3 className="font-display text-lg font-semibold md:text-xl">
                    {e.role}
                  </h3>
                  <p className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Building2 className="h-3.5 w-3.5" /> {e.company} · {e.location}
                  </p>
                </div>
                <Badge variant="secondary" className="rounded-full">
                  <Calendar className="mr-1 h-3 w-3" /> {e.period}
                </Badge>
              </div>
              <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                {e.points.map((p) => (
                  <li key={p} className="flex gap-2">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </div>
        ))}
      </div>
    </Section>
  );
}

function Certifications() {
  return (
    <Section id="certifications" eyebrow="Certifications" title="Verified credentials.">
      <div className="grid gap-5 md:grid-cols-2">
        {CERTIFICATIONS.map((c) => (
          <Card
            key={c.title}
            className="group relative overflow-hidden border-border bg-card p-6 transition-all hover:-translate-y-1 hover:border-primary/50 hover:shadow-[var(--shadow-glow)]"
          >
            <div className="flex items-start gap-4">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-primary/25 to-accent/25 text-primary">
                <Award className="h-6 w-6" />
              </span>
              <div className="min-w-0">
                <h3 className="font-display text-lg font-semibold">{c.title}</h3>
                <p className="text-sm text-muted-foreground">{c.issuer}</p>
                <div className="mt-3 flex flex-wrap gap-2 text-xs text-muted-foreground">
                  <span className="inline-flex items-center gap-1 rounded-full bg-secondary/60 px-2.5 py-1">
                    <Calendar className="h-3 w-3" /> {c.date}
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-full bg-secondary/60 px-2.5 py-1">
                    <MapPin className="h-3 w-3" /> {c.location}
                  </span>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </Section>
  );
}

function Contact() {
  const [sending, setSending] = useState(false);
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") || "");
    const email = String(data.get("email") || "");
    const message = String(data.get("message") || "");
    if (!name || !email || !message) {
      toast.error("Please fill in all fields.");
      return;
    }
    setSending(true);
    const subject = encodeURIComponent(`Portfolio inquiry from ${name}`);
    const body = encodeURIComponent(`${message}\n\n— ${name} (${email})`);
    window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`;
    setTimeout(() => {
      setSending(false);
      toast.success("Opening your email client…");
      form.reset();
    }, 400);
  };

  return (
    <Section id="contact" eyebrow="Contact" title="Let's build something.">
      <div className="grid gap-8 md:grid-cols-[0.9fr_1.1fr]">
        <div className="space-y-3">
          <p className="text-muted-foreground">
            I'm actively looking for full-time roles and interesting freelance work. The
            fastest way to reach me is email — I usually reply within a day.
          </p>
          <div className="mt-4 space-y-3">
            <a
              href={`mailto:${EMAIL}`}
              className="flex items-center gap-3 rounded-xl border border-border bg-card p-4 transition-colors hover:border-primary/60"
            >
              <Mail className="h-5 w-5 text-primary" />
              <div className="min-w-0">
                <p className="text-xs uppercase tracking-widest text-muted-foreground">
                  Email
                </p>
                <p className="truncate text-sm font-medium">{EMAIL}</p>
              </div>
            </a>
            <a
              href={`tel:${PHONE.replace(/\s/g, "")}`}
              className="flex items-center gap-3 rounded-xl border border-border bg-card p-4 transition-colors hover:border-primary/60"
            >
              <Phone className="h-5 w-5 text-primary" />
              <div>
                <p className="text-xs uppercase tracking-widest text-muted-foreground">
                  Phone
                </p>
                <p className="text-sm font-medium">{PHONE}</p>
              </div>
            </a>
            <div className="flex items-center gap-3 rounded-xl border border-border bg-card p-4">
              <MapPin className="h-5 w-5 text-primary" />
              <div>
                <p className="text-xs uppercase tracking-widest text-muted-foreground">
                  Location
                </p>
                <p className="text-sm font-medium">Bengaluru, India</p>
              </div>
            </div>
          </div>
        </div>
        <Card className="border-border bg-card p-6 md:p-8">
          <form onSubmit={onSubmit} className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-xs uppercase tracking-widest text-muted-foreground">
                  Name
                </label>
                <Input name="name" placeholder="Jane Doe" required />
              </div>
              <div>
                <label className="mb-1.5 block text-xs uppercase tracking-widest text-muted-foreground">
                  Email
                </label>
                <Input name="email" type="email" placeholder="jane@company.com" required />
              </div>
            </div>
            <div>
              <label className="mb-1.5 block text-xs uppercase tracking-widest text-muted-foreground">
                Message
              </label>
              <Textarea
                name="message"
                rows={5}
                placeholder="Tell me about the role or project…"
                required
              />
            </div>
            <Button
              type="submit"
              size="lg"
              className="w-full rounded-full shadow-[var(--shadow-glow)]"
              disabled={sending}
            >
              <Send className="mr-2 h-4 w-4" />
              {sending ? "Sending…" : "Send message"}
            </Button>
          </form>
        </Card>
      </div>
    </Section>
  );
}

function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-border/70 bg-card/40">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-14 md:grid-cols-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-primary to-accent font-display text-sm font-bold text-primary-foreground">
              SK
            </span>
            <span className="font-display text-base font-semibold">Sunil Kumar</span>
          </div>
          <p className="mt-3 max-w-xs text-sm text-muted-foreground">
            Data Analyst · ML Engineer · Data Scientist. Based in Bengaluru, working
            globally.
          </p>
        </div>
        <div>
          <p className="mb-3 text-xs uppercase tracking-widest text-muted-foreground">
            Quick Links
          </p>
          <ul className="space-y-2 text-sm">
            {[
              ["About", "about"],
              ["Skills", "skills"],
              ["Projects", "projects"],
              ["Experience", "experience"],
              ["Contact", "contact"],
            ].map(([l, id]) => (
              <li key={id}>
                <a href={`#${id}`} className="text-muted-foreground hover:text-foreground">
                  {l}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="mb-3 text-xs uppercase tracking-widest text-muted-foreground">
            Connect
          </p>
          <div className="flex flex-wrap gap-2">
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noreferrer noopener"
              aria-label="GitHub"
              className="grid h-10 w-10 place-items-center rounded-full border border-border bg-secondary/60 transition-colors hover:border-primary/60 hover:text-primary"
            >
              <Github className="h-4 w-4" />
            </a>
            <a
              href={LINKEDIN_URL}
              target="_blank"
              rel="noreferrer noopener"
              aria-label="LinkedIn"
              className="grid h-10 w-10 place-items-center rounded-full border border-border bg-secondary/60 transition-colors hover:border-primary/60 hover:text-primary"
            >
              <Linkedin className="h-4 w-4" />
            </a>
            <a
              href={`mailto:${EMAIL}`}
              aria-label="Email"
              className="grid h-10 w-10 place-items-center rounded-full border border-border bg-secondary/60 transition-colors hover:border-primary/60 hover:text-primary"
            >
              <Mail className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
      <div className="border-t border-border/60">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-6 py-6 text-xs text-muted-foreground md:flex-row">
          <p>© {year} Sunil Kumar. All rights reserved.</p>
          <p>
            Built by{" "}
            <a
              href={BUILDER_URL}
              target="_blank"
              rel="noreferrer noopener"
              className="underline underline-offset-4 hover:text-foreground"
            >
              Vinod Bavage
            </a>
            .
          </p>
        </div>
      </div>
    </footer>
  );
}

function ResumeDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-display">My Resume</DialogTitle>
          <DialogDescription>
            View it inline or download a copy — your call.
          </DialogDescription>
        </DialogHeader>
        <div className="mt-2 grid gap-3">
          <Button asChild size="lg" className="rounded-full">
            <a href={RESUME_URL} target="_blank" rel="noreferrer noopener">
              <Eye className="mr-2 h-4 w-4" /> View Resume
            </a>
          </Button>
          <Button asChild size="lg" variant="outline" className="rounded-full">
            <a href={RESUME_DOWNLOAD_URL} target="_blank" rel="noreferrer noopener">
              <Download className="mr-2 h-4 w-4" /> Download Resume
            </a>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function PortfolioPage() {
  const [resumeOpen, setResumeOpen] = useState(false);
  return (
    <div className="min-h-screen bg-background font-sans text-foreground antialiased">
      <Toaster theme="dark" />
      <Nav />
      <main>
        <Hero onResume={() => setResumeOpen(true)} />
        <QuickActions onResume={() => setResumeOpen(true)} />
        <About />
        <Education />
        <Skills />
        <Projects />
        <Experience />
        <Certifications />
        <Contact />
      </main>
      <Footer />
      <ResumeDialog open={resumeOpen} onOpenChange={setResumeOpen} />
    </div>
  );
}