import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { projects, type Project } from "./data/projects";
import { siteConfig } from "./siteConfig";
import { hasProjectDetail, loadProjectDetail, loadHonorDetail } from "./data/details";
import { posts, findPost } from "./blog/posts";
import { VectorField } from "./components/VectorField";
import { BilibiliEmbed } from "./components/BilibiliEmbed";
import { Reveal } from "./components/Reveal";
import { SectionHeader } from "./components/SectionHeader";
import { Sidebar } from "./components/Sidebar";
import { useRoute, type Route } from "./router/useRoute";
import profilePhoto from "../assets/photo.png";

type Lang = "zh" | "en";
type Theme = "day" | "night";

const ease = [0.22, 1, 0.36, 1] as const;

/* ─── i18n copy ────────────────────────────────────────────────── */

const copy = {
  zh: {
    sections: {
      direction: { id: "00", title: "个人方向", note: "我做什么、怎么思考。" },
      education: { id: "01", title: "学历", note: "我从哪里来。" },
      work: { id: "02", title: "项目", note: "做过的、能拿出来讲的几件事。" },
      honors: { id: "03", title: "荣誉", note: "比赛、奖项与一些反馈。" },
      blogIndex: { id: "B0", title: "博客", note: "做项目时落下来的一些想法。" },
    },
    hero: {
      callsign: "ZSQ-26 · GAME DESIGN",
      role: "游戏策划 / 互动叙事 / VR",
      ctaWork: "看项目",
      ctaBlog: "读博客",
      hint: "部分项目附 B 站演示。",
      idLabel: "ID-01",
    },
    cardLabels: { concept: "想做的", contribution: "我做了", outcomes: "结果" },
    workVideo: { label: "演示视频", open: "在 bilibili 打开 ↗" },
    detail: "查看详情 →",
    backHome: "← 回到主页",
    backWork: "← 回到项目",
    backHonors: "← 回到荣誉",
    backBlog: "← 返回博客",
    minutes: (n: number) => `${n} 分钟阅读`,
    readMore: "阅读 →",
    blogEmpty: "还没有发布博客文章。",
    blogNote: "博客由 Markdown 文件构建，每次合并到主分支会通过 GitHub Action 自动发布。",
    notFound: "找不到这条记录。",
    footer: { tagline: "Designed for play. Built with intent." },
  },
  en: {
    sections: {
      direction: { id: "00", title: "Direction", note: "What I make, and how I think about it." },
      education: { id: "01", title: "Education", note: "Where I come from." },
      work: { id: "02", title: "Work", note: "A handful of projects worth talking about." },
      honors: { id: "03", title: "Honors", note: "Awards, prizes, and a bit of reception." },
      blogIndex: { id: "B0", title: "Blog", note: "Notes left behind from making things." },
    },
    hero: {
      callsign: "ZSQ-26 · GAME DESIGN",
      role: "Game Design / Interactive Narrative / VR",
      ctaWork: "See work",
      ctaBlog: "Read blog",
      hint: "Some entries include a Bilibili demo.",
      idLabel: "ID-01",
    },
    cardLabels: { concept: "What it's about", contribution: "What I did", outcomes: "Outcome" },
    workVideo: { label: "Demo video", open: "Open on bilibili ↗" },
    detail: "Read full →",
    backHome: "← Back home",
    backWork: "← Back to work",
    backHonors: "← Back to honors",
    backBlog: "← Back to blog",
    minutes: (n: number) => `${n} min read`,
    readMore: "Read →",
    blogEmpty: "No posts published yet.",
    blogNote: "Posts are authored in Markdown and re-deployed automatically by GitHub Actions on every push.",
    notFound: "Entry not found.",
    footer: { tagline: "Designed for play. Built with intent." },
  },
} as const;

/* ─── helpers ──────────────────────────────────────────────────── */

function useStoredState<T extends string>(key: string, initial: T) {
  const [value, setValue] = useState<T>(() => {
    if (typeof window === "undefined") return initial;
    return (window.localStorage.getItem(key) as T | null) ?? initial;
  });
  useEffect(() => {
    window.localStorage.setItem(key, value);
  }, [key, value]);
  return [value, setValue] as const;
}

function formatDate(iso: string, lang: Lang) {
  const d = new Date(iso);
  if (Number.isNaN(d.valueOf())) return iso;
  if (lang === "zh") {
    return `${d.getFullYear()} 年 ${d.getMonth() + 1} 月 ${d.getDate()} 日`;
  }
  return d.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
}

/* ─── Hero (only on Home) ──────────────────────────────────────── */

function Hero({ lang }: { lang: Lang }) {
  const t = copy[lang];

  return (
    <section className="hero" id="top">
      <div className="hero__copy">
        <motion.div
          className="hero__plate"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease, delay: 0.05 }}
        >
          <span className="hero__plate-dot" />
          <span>{t.hero.callsign}</span>
        </motion.div>
        <motion.h1
          className="hero__title"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease, delay: 0.1 }}
        >
          {siteConfig.oneLiner[lang]}
        </motion.h1>
        <motion.p
          className="hero__role"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {t.hero.role}
        </motion.p>
        <motion.div
          className="hero__rule"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, ease, delay: 0.4 }}
        >
          <motion.span
            className="hero__rule-line"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.9, ease, delay: 0.45 }}
            style={{ transformOrigin: "left center" }}
          />
          <span className="hero__rule-tick">{siteConfig.location[lang]}</span>
        </motion.div>
        <motion.p
          className="hero__bio"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease, delay: 0.5 }}
        >
          {siteConfig.intro[lang]}
        </motion.p>
        <motion.div
          className="hero__cta"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          <button
            type="button"
            className="btn btn--primary"
            onClick={() => document.getElementById("work")?.scrollIntoView({ behavior: "smooth" })}
          >
            {t.hero.ctaWork}
          </button>
          <a className="btn btn--ghost" href="#/blog" onClick={(e) => { e.preventDefault(); window.location.hash = "#/blog"; }}>
            {t.hero.ctaBlog}
          </a>
          <span className="hero__hint">{t.hero.hint}</span>
        </motion.div>
      </div>

      <motion.aside
        className="hero-card sf-panel"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease, delay: 0.2 }}
      >
        <div className="hero-card__photo-wrap">
          <img className="hero-card__photo" src={profilePhoto} alt={lang === "zh" ? "庄舒晴的照片" : "Portrait of Shuqing Zhuang"} />
          <span className="hero-card__corner hero-card__corner--tl" />
          <span className="hero-card__corner hero-card__corner--tr" />
          <span className="hero-card__corner hero-card__corner--bl" />
          <span className="hero-card__corner hero-card__corner--br" />
        </div>
        <div className="hero-card__meta">
          <div className="hero-card__id">
            <span>{t.hero.idLabel}</span>
            <span className="hero-card__id-num">{siteConfig.callsign}</span>
          </div>
          <h2 className="hero-card__name">{siteConfig.nameZh}</h2>
          <p className="hero-card__name-en">{siteConfig.nameEn}</p>
          <p className="hero-card__line">{t.hero.role}</p>
        </div>
      </motion.aside>
    </section>
  );
}

/* ─── Direction & Education sections ───────────────────────────── */

function Direction({ lang }: { lang: Lang }) {
  const sec = copy[lang].sections.direction;
  return (
    <section className="section" id="direction">
      <SectionHeader id={sec.id} title={sec.title} note={sec.note} />
      <div className="directions__grid">
        {siteConfig.directions.map((d, i) => (
          <Reveal key={d.code} delay={i * 0.05}>
            <article className="direction sf-panel">
              <p className="direction__code">{d.code}</p>
              <h3>{lang === "zh" ? d.title : d.titleEn}</h3>
              <p className="direction__title-en">{lang === "zh" ? d.titleEn : d.title}</p>
              <p>{lang === "zh" ? d.body : d.bodyEn}</p>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function Education({ lang }: { lang: Lang }) {
  const sec = copy[lang].sections.education;
  const e = siteConfig.education;
  return (
    <section className="section" id="education">
      <SectionHeader id={sec.id} title={sec.title} note={sec.note} />
      <div className="edu">
        <Reveal>
          <div className="edu-card sf-panel">
            <p className="edu-card__period">
              <span className="edu-card__period-tick" />
              {e.undergraduatePeriod}
            </p>
            <p className="edu-card__role">{lang === "zh" ? "本科" : "Undergraduate"}</p>
            <h3 className="edu-card__school">{lang === "zh" ? e.undergraduate : e.undergraduateEn}</h3>
            <p className="edu-card__school-en">{lang === "zh" ? e.undergraduateEn : e.undergraduate}</p>
            <p className="edu-card__major">{lang === "zh" ? e.undergraduateMajor : e.undergraduateMajorEn}</p>
          </div>
        </Reveal>
        <Reveal delay={0.08}>
          <div className="edu-card sf-panel">
            <p className="edu-card__period">
              <span className="edu-card__period-tick" />
              {lang === "zh" ? e.graduatePeriod : e.graduatePeriodEn}
            </p>
            <p className="edu-card__role">{lang === "zh" ? "研究生" : "Graduate"}</p>
            <h3 className="edu-card__school">{lang === "zh" ? e.graduate : e.graduateEn}</h3>
            <p className="edu-card__school-en">{lang === "zh" ? e.graduateEn : e.graduate}</p>
            <p className="edu-card__major">{lang === "zh" ? e.graduateMajor : e.graduateMajorEn}</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ─── Project list (cards link to /work/<slug>) ────────────────── */

function ProjectCard({ project, index, lang }: { project: Project; index: number; lang: Lang }) {
  const t = copy[lang];
  const num = String(index + 1).padStart(2, "0");
  const view = lang === "zh" ? project : project.en;
  const hasDetail = hasProjectDetail(project.id);

  const open = (e: React.MouseEvent) => {
    e.preventDefault();
    window.location.hash = `#/work/${project.id}`;
  };

  return (
    <motion.a
      className="mission-card sf-panel"
      href={`#/work/${project.id}`}
      onClick={open}
      layout
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 0.65, ease, delay: 0.05 }}
    >
      <div className="mission-card__head">
        <span className="mission-card__num">#{num}</span>
        <span className="mission-card__period">{project.period}</span>
      </div>
      <h3 className="mission-card__title">
        {view.title}
        {view.titleEn ? <span> / {view.titleEn}</span> : null}
      </h3>
      <p className="mission-card__role">{view.role}</p>
      <p className="mission-card__summary">{view.summary}</p>
      <div className="mission-card__foot">
        <div className="mission-card__tags">
          {view.tags.slice(0, 3).map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>
        <span className="mission-card__cta">
          {hasDetail || project.bvid ? t.detail : t.detail}
        </span>
      </div>
    </motion.a>
  );
}

function WorkSection({ lang }: { lang: Lang }) {
  const sec = copy[lang].sections.work;
  return (
    <section className="section" id="work">
      <SectionHeader id={sec.id} title={sec.title} note={sec.note} />
      <div className="mission-grid">
        {projects.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} lang={lang} />
        ))}
      </div>
    </section>
  );
}

/* ─── Honors list (rows link to /honors/<slug>) ────────────────── */

function HonorRow({ honor, lang, idx }: { honor: typeof siteConfig.honors[number]; lang: Lang; idx: number }) {
  const t = copy[lang];
  const open = (e: React.MouseEvent) => {
    e.preventDefault();
    window.location.hash = `#/honors/${honor.slug}`;
  };

  return (
    <Reveal delay={idx * 0.05}>
      <a
        className="honor-row sf-panel"
        href={`#/honors/${honor.slug}`}
        onClick={open}
      >
        <span className="honor-row__date">{honor.date}</span>
        <div className="honor-row__main">
          <h3 className="honor-row__title">{lang === "zh" ? honor.title : honor.titleEn}</h3>
          <p className="honor-row__title-en">{lang === "zh" ? honor.titleEn : honor.title}</p>
          {(lang === "zh" ? honor.note : honor.noteEn) ? (
            <p className="honor-row__note">{lang === "zh" ? honor.note : honor.noteEn}</p>
          ) : null}
        </div>
        <span className="honor-row__source">{lang === "zh" ? honor.source : honor.sourceEn}</span>
        <span className="honor-row__cta">{t.detail}</span>
      </a>
    </Reveal>
  );
}

function HonorsSection({ lang }: { lang: Lang }) {
  const sec = copy[lang].sections.honors;
  return (
    <section className="section" id="honors">
      <SectionHeader id={sec.id} title={sec.title} note={sec.note} />
      <div className="honors">
        {siteConfig.honors.map((h, i) => (
          <HonorRow key={h.slug} honor={h} lang={lang} idx={i} />
        ))}
      </div>
    </section>
  );
}

/* ─── Pages ────────────────────────────────────────────────────── */

function HomePage({ lang }: { lang: Lang }) {
  return (
    <>
      <Hero lang={lang} />
      <Direction lang={lang} />
      <Education lang={lang} />
      <WorkSection lang={lang} />
      <HonorsSection lang={lang} />
    </>
  );
}

function WorkDetailPage({ slug, lang }: { slug: string; lang: Lang }) {
  const t = copy[lang];
  const project = projects.find((p) => p.id === slug);
  if (!project) return <NotFound lang={lang} />;
  const view = lang === "zh" ? project : project.en;
  const detail = loadProjectDetail(project.id);
  const num = String(projects.findIndex((p) => p.id === slug) + 1).padStart(2, "0");

  return (
    <article className="detail">
      <a className="detail__back" href="#/" onClick={(e) => { e.preventDefault(); window.location.hash = "#/"; }}>
        {t.backHome}
      </a>
      <header className="detail__header">
        <p className="detail__meta">
          <span className="detail__num">#{num}</span>
          <span>{project.period}</span>
          <span>{view.role}</span>
        </p>
        <h1>
          {view.title}
          {view.titleEn ? <span> / {view.titleEn}</span> : null}
        </h1>
        <p className="detail__summary">{view.summary}</p>
        <div className="detail__tags">
          {view.tags.map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>
      </header>

      <div className="detail__panel">
        <div className="detail__panel-cell">
          <p className="detail__panel-label">{t.cardLabels.concept}</p>
          <p>{view.concept}</p>
        </div>
        <div className="detail__panel-cell">
          <p className="detail__panel-label">{t.cardLabels.contribution}</p>
          <ul>
            {view.contribution.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
        </div>
        {view.outcomes ? (
          <div className="detail__panel-cell">
            <p className="detail__panel-label">{t.cardLabels.outcomes}</p>
            <ul>
              {view.outcomes.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>

      {project.bvid ? (
        <BilibiliEmbed
          bvid={project.bvid}
          title={view.title}
          startSec={project.videoStartSec}
          label={t.workVideo.label}
          openLabel={t.workVideo.open}
        />
      ) : null}

      {detail ? (
        <section className="detail__body">
          <div className="prose" dangerouslySetInnerHTML={{ __html: detail.html }} />
        </section>
      ) : null}
    </article>
  );
}

function HonorDetailPage({ slug, lang }: { slug: string; lang: Lang }) {
  const t = copy[lang];
  const honor = siteConfig.honors.find((h) => h.slug === slug);
  if (!honor) return <NotFound lang={lang} />;
  const detail = loadHonorDetail(honor.slug);

  return (
    <article className="detail">
      <a className="detail__back" href="#/" onClick={(e) => { e.preventDefault(); window.location.hash = "#/"; }}>
        {t.backHome}
      </a>
      <header className="detail__header">
        <p className="detail__meta">
          <span className="detail__num">{honor.date}</span>
          <span>{lang === "zh" ? honor.source : honor.sourceEn}</span>
        </p>
        <h1>{lang === "zh" ? honor.title : honor.titleEn}</h1>
        <p className="detail__title-en">{lang === "zh" ? honor.titleEn : honor.title}</p>
        {(lang === "zh" ? honor.note : honor.noteEn) ? (
          <p className="detail__summary">{lang === "zh" ? honor.note : honor.noteEn}</p>
        ) : null}
      </header>
      {detail ? (
        <section className="detail__body">
          <div className="prose" dangerouslySetInnerHTML={{ __html: detail.html }} />
        </section>
      ) : null}
    </article>
  );
}

function BlogPage({ lang }: { lang: Lang }) {
  const sec = copy[lang].sections.blogIndex;
  const t = copy[lang];

  return (
    <article className="detail">
      <a className="detail__back" href="#/" onClick={(e) => { e.preventDefault(); window.location.hash = "#/"; }}>
        {t.backHome}
      </a>
      <SectionHeader id={sec.id} title={sec.title} note={sec.note} />
      {posts.length === 0 ? (
        <p className="blog-empty">{t.blogEmpty}</p>
      ) : (
        <ul className="blog-list">
          {posts.map((post, i) => (
            <motion.li
              key={post.slug}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ duration: 0.55, ease, delay: i * 0.04 }}
              className="blog-item sf-panel"
            >
              <a className="blog-item__link" href={`#/blog/${post.slug}`}>
                <span className="blog-item__date">
                  <span className="blog-item__tick" aria-hidden />
                  {formatDate(post.date, lang)} · {t.minutes(post.readMinutes)}
                </span>
                <h3 className="blog-item__title">{post.title}</h3>
                <p className="blog-item__summary">{post.summary}</p>
                <div className="blog-item__foot">
                  <div className="blog-item__tags">
                    {post.tags.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                  <span className="blog-item__cta">{t.readMore}</span>
                </div>
              </a>
            </motion.li>
          ))}
        </ul>
      )}
      <p className="blog-note">{t.blogNote}</p>
    </article>
  );
}

function BlogPostPage({ slug, lang }: { slug: string; lang: Lang }) {
  const t = copy[lang];
  const post = findPost(slug);
  if (!post) return <NotFound lang={lang} />;

  return (
    <article className="detail">
      <a className="detail__back" href="#/blog" onClick={(e) => { e.preventDefault(); window.location.hash = "#/blog"; }}>
        {t.backBlog}
      </a>
      <header className="detail__header">
        <p className="detail__meta">
          <span className="detail__num">{formatDate(post.date, lang)}</span>
          <span>{t.minutes(post.readMinutes)}</span>
        </p>
        <h1>{post.title}</h1>
        {post.summary ? <p className="detail__summary">{post.summary}</p> : null}
        <div className="detail__tags">
          {post.tags.map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>
      </header>
      <section className="detail__body">
        <div className="prose" dangerouslySetInnerHTML={{ __html: post.html }} />
      </section>
    </article>
  );
}

function NotFound({ lang }: { lang: Lang }) {
  const t = copy[lang];
  return (
    <article className="detail">
      <a className="detail__back" href="#/" onClick={(e) => { e.preventDefault(); window.location.hash = "#/"; }}>
        {t.backHome}
      </a>
      <header className="detail__header">
        <p className="detail__meta"><span className="detail__num">404</span></p>
        <h1>{t.notFound}</h1>
      </header>
    </article>
  );
}

/* ─── Footer ───────────────────────────────────────────────────── */

function Footer({ lang }: { lang: Lang }) {
  const t = copy[lang];
  return (
    <footer className="footer">
      <div className="footer__row">
        <span>
          © {new Date().getFullYear()} {lang === "zh" ? siteConfig.nameZh : siteConfig.nameEn}
        </span>
        <span className="footer__sep">/</span>
        <span>{t.footer.tagline}</span>
      </div>
    </footer>
  );
}

/* ─── Theme sweep ──────────────────────────────────────────────── */

function ThemeSweep({ tick }: { tick: number }) {
  return (
    <AnimatePresence>
      <motion.div
        key={tick}
        className="theme-sweep"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.55, 0] }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8, ease }}
      />
    </AnimatePresence>
  );
}

/* ─── Router-driven main ───────────────────────────────────────── */

function PageContent({ route, lang }: { route: Route; lang: Lang }) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={routeKey(route)}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.4, ease }}
      >
        {route.name === "home" ? <HomePage lang={lang} /> : null}
        {route.name === "work-detail" ? <WorkDetailPage slug={route.slug} lang={lang} /> : null}
        {route.name === "honor-detail" ? <HonorDetailPage slug={route.slug} lang={lang} /> : null}
        {route.name === "blog" ? <BlogPage lang={lang} /> : null}
        {route.name === "blog-detail" ? <BlogPostPage slug={route.slug} lang={lang} /> : null}
        {/* Direct /work or /honors routes also fall back to home (we list on home) */}
        {route.name === "work" || route.name === "honors" ? <HomePage lang={lang} /> : null}
      </motion.div>
    </AnimatePresence>
  );
}

function routeKey(r: Route): string {
  switch (r.name) {
    case "home":
    case "work":
    case "honors":
    case "blog":
      return r.name;
    default:
      return `${r.name}:${r.slug}`;
  }
}

/* ─── Root ─────────────────────────────────────────────────────── */

export default function App() {
  const [lang, setLang] = useStoredState<Lang>("zsq-lang", "zh");
  const [theme, setTheme] = useStoredState<Theme>("zsq-theme", "night");
  const [sweepTick, setSweepTick] = useState(0);
  const route = useRoute();

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.documentElement.lang = lang === "zh" ? "zh-CN" : "en";
  }, [lang, theme]);

  const handleTheme = () => {
    setTheme(theme === "day" ? "night" : "day");
    setSweepTick((n) => n + 1);
  };

  return (
    <div className="page">
      <div className="page__bg" />
      <VectorField />
      <ThemeSweep tick={sweepTick} />

      <Sidebar
        route={route}
        lang={lang}
        theme={theme}
        onLang={() => setLang(lang === "zh" ? "en" : "zh")}
        onTheme={handleTheme}
      />

      <div className="shell">
        <main className="shell__main">
          <PageContent route={route} lang={lang} />
        </main>
        <Footer lang={lang} />
      </div>
    </div>
  );
}
