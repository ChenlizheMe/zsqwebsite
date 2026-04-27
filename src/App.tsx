import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { projects } from "./data/projects";
import { siteConfig } from "./siteConfig";
import { VectorField } from "./components/VectorField";
import { BilibiliEmbed } from "./components/BilibiliEmbed";
import { Reveal, item, stagger } from "./components/Reveal";
import profilePhoto from "../assets/photo.png";

type Lang = "zh" | "en";
type Theme = "day" | "night";

const ease = [0.22, 1, 0.36, 1] as const;

const copy = {
  zh: {
    nav: { about: "关于", systems: "技能", work: "作品", contact: "联系" },
    eyebrow: "游戏策划 · 个人网站",
    role: siteConfig.roleLine,
    target: siteConfig.target,
    heroTitle: "用关卡和系统，把想表达的东西做成玩家愿意玩下去的样子。",
    heroBody:
      "我是庄舒晴，正在找游戏策划相关的机会。本科在华南理工大学，研究生在清华大学深圳国际研究生院。做过 VR 叙事、2D 冒险、互动装置、赛题案和 Game Jam——平时琢磨最多的是：玩家这一步为什么要继续玩下去。",
    ctaWork: "看作品",
    ctaVideo: "部分条目含 B 站演示",
    heroCardCaption: "游戏策划",
    aboutTitle: "关于我",
    aboutNote: "教育背景与近期方向",
    education: "教育背景",
    focusTitle: "最近在做什么",
    focusBody:
      "写策划案、拆关卡节奏、和程序美术对齐需求，也会用 Unity / VR 做小验证。兴趣偏叙事和系统叠在一起的项目，商业赛题和校园项目都做过一些。",
    systemsTitle: "技能与工具",
    systemsNote: "不堆概念，只列实际协作里常用的",
    workTitle: "作品",
    workNote: "每个项目一段说明，含个人参与点；有演示视频就放在同一条目里。",
    workLead: "下面按时间线大致倒序，点开即可看文字与视频（如有）。",
    contactTitle: "联系",
    contactNote: "邮件或 B 站私信都可以",
    contactText: "招聘、实习、合作或单纯想聊聊项目，都欢迎发邮件，说明来意即可。",
    videoLabel: "演示视频",
    openVideo: "在 bilibili 打开 ↗",
    visitBili: "B 站主页 ↗",
    themeDay: "日间",
    themeNight: "夜间",
    langSwitch: "EN",
    contribution: "我做了什么",
    outcomes: "结果或数据",
    concept: "想表达什么",
    location: "广州 / 深圳",
    available: "接受策划岗位沟通",
    undergradLabel: "本科",
    gradLabel: "研究生",
  },
  en: {
    nav: { about: "About", systems: "Skills", work: "Work", contact: "Contact" },
    eyebrow: "Game design portfolio",
    role: siteConfig.roleLineEn,
    target: siteConfig.targetEn,
    heroTitle: "Design levels and systems so the idea stays fun to play, not just fun to describe.",
    heroBody:
      "I’m Shuqing Zhuang, looking for game design opportunities. I studied at South China University of Technology and I’m a graduate student at Tsinghua SIGS. I’ve worked on VR narrative, 2D adventure, an interactive piece, competition pitches, and game jams. Most of my energy goes into one question: why would a player take the next step.",
    ctaWork: "See projects",
    ctaVideo: "Some entries include a demo",
    heroCardCaption: "Game design",
    aboutTitle: "About",
    aboutNote: "Background and what I care about",
    education: "Education",
    focusTitle: "What I’m up to",
    focusBody:
      "Design docs, pacing, alignment with art and code, and small Unity or VR tests when I need to check feel. I like projects where story and systems reinforce each other.",
    systemsTitle: "Skills and tools",
    systemsNote: "Practical, day-to-day collaboration",
    workTitle: "Work",
    workNote: "Narrative for each project and my part in it, plus video when available.",
    workLead: "Roughly most recent first. Each card is self contained.",
    contactTitle: "Contact",
    contactNote: "Email or Bilibili",
    contactText: "Hiring, internships, collaboration, or a quick chat about a project are all welcome. A short note about context helps.",
    videoLabel: "Video",
    openVideo: "Open on bilibili ↗",
    visitBili: "Bilibili profile ↗",
    themeDay: "Light",
    themeNight: "Dark",
    langSwitch: "中文",
    contribution: "What I did",
    outcomes: "Outcomes",
    concept: "What it’s about",
    location: "Guangzhou / Shenzhen",
    available: "Open to design roles",
    undergradLabel: "Undergraduate",
    gradLabel: "Graduate",
  },
} as const;

const focusAreas = {
  zh: ["关卡与系统", "叙事与体验", "Unity / VR 原型", "策划文档与沟通"],
  en: ["Level & systems", "Narrative & feel", "Unity / VR prototypes", "Docs & collaboration"],
} as const;

const systems = {
  zh: [
    { id: "s1", title: "把想法拆成可玩结构", text: "从主题到目标、压力、节奏，尽量一句话能说清“玩家在这一段要干嘛”。" },
    { id: "s2", title: "信息怎么给", text: "线索、剧情、教学关什么时候出现，试着避免一次性倒设定。" },
    { id: "s3", title: "和组里对齐", text: "用流程图、界面草图、里程碑把需求说具体，减少口头往返。" },
    { id: "s4", title: "用原型试一遍", text: "复杂手感或节奏问题，会倾向先做小场景或 Game Jam 式验证。" },
  ],
  en: [
    { id: "s1", title: "Structure the idea", text: "From theme to goals, pressure, and pacing, keep the player beat readable." },
    { id: "s2", title: "Pacing what players learn", text: "Clues, story beats, and tutorials staged so it does not feel like a lore dump." },
    { id: "s3", title: "Alignment", text: "Flowcharts, rough UI, and milestones so requests stay concrete for art and code." },
    { id: "s4", title: "Prototypes", text: "For tricky feel or cadence, small scenes or a jam build first." },
  ],
} as const;

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

function Nav({ lang, theme, onLang, onTheme }: { lang: Lang; theme: Theme; onLang: () => void; onTheme: () => void }) {
  const [scrolled, setScrolled] = useState(false);
  const t = copy[lang];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <motion.header className={`nav ${scrolled ? "nav--scrolled" : ""}`} initial={{ y: -16, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.6, ease }}>
      <button type="button" className="nav__brand" onClick={() => go("top")}>
        <span className="nav__name">{siteConfig.nameZh}</span>
        <span className="nav__name-en">{siteConfig.nameEn}</span>
      </button>
      <nav className={`nav__links ${lang === "en" ? "nav__links--caps" : ""}`} aria-label="section navigation">
        {[
          [t.nav.about, "about"],
          [t.nav.systems, "systems"],
          [t.nav.work, "work"],
          [t.nav.contact, "contact"],
        ].map(([label, id]) => (
          <button key={id} type="button" className="nav__link" onClick={() => go(id)}>
            {label}
          </button>
        ))}
      </nav>
      <div className="nav__controls" aria-label="display controls">
        <button type="button" className="nav__toggle" onClick={onTheme}>
          {theme === "day" ? t.themeNight : t.themeDay}
        </button>
        <button type="button" className="nav__toggle" onClick={onLang}>
          {t.langSwitch}
        </button>
      </div>
    </motion.header>
  );
}

function Hero({ lang }: { lang: Lang }) {
  const t = copy[lang];

  return (
    <section className="hero" id="top">
      <div className="hero__copy">
        <motion.p className="hero__eyebrow" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease, delay: 0.1 }}>
          {t.eyebrow}
        </motion.p>
        <motion.h1 className="hero__title" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease, delay: 0.15 }}>
          {t.heroTitle}
        </motion.h1>
        <motion.p className="hero__role" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.35 }}>
          {t.role}
        </motion.p>
        <motion.div className="hero__rule" initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.9, ease, delay: 0.45 }} style={{ transformOrigin: "left center" }} role="presentation" />
        <motion.p className="hero__bio" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, ease, delay: 0.5 }}>
          {t.heroBody}
        </motion.p>
        <motion.div className="hero__chips" variants={stagger} initial="hidden" animate="show">
          {focusAreas[lang].map((label) => (
            <motion.span key={label} className="chip" variants={item}>
              {label}
            </motion.span>
          ))}
        </motion.div>
        <motion.div className="hero__cta" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.85 }}>
          <button type="button" className="btn btn--primary" onClick={() => document.getElementById("work")?.scrollIntoView({ behavior: "smooth" })}>
            {t.ctaWork}
          </button>
          <span className="hero__hint">{t.ctaVideo}</span>
        </motion.div>
      </div>
        <motion.aside className="hero-card sf-panel" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, ease, delay: 0.2 }}>
        <div className="hero-card__geo" aria-hidden />
        <img className="hero-card__photo" src={profilePhoto} alt={lang === "zh" ? "庄舒晴的照片" : "Portrait of Shuqing Zhuang"} />
        <div className="hero-card__meta">
          <p className="hero-card__label">{lang === "zh" ? "个人照片" : "Photo"}</p>
          <h2>{siteConfig.nameZh}</h2>
          <p className="hero-card__en">{siteConfig.nameEn}</p>
          <p className="hero-card__line">{t.heroCardCaption}</p>
          <p className="hero-card__sub">{t.location} · {t.available}</p>
        </div>
      </motion.aside>
    </section>
  );
}

function SectionHeader({ title, note }: { title: string; note?: string }) {
  return (
    <Reveal>
      <div className="section-head">
        {note ? <p className="section-head__note">{note}</p> : null}
        <h2>{title}</h2>
      </div>
    </Reveal>
  );
}

function About({ lang }: { lang: Lang }) {
  const t = copy[lang];
  const undergraduate = lang === "zh" ? siteConfig.education.undergraduate : siteConfig.education.undergraduateEn;
  const graduate = lang === "zh" ? siteConfig.education.graduate : siteConfig.education.graduateEn;

  return (
    <section className="section dossier" id="about">
      <SectionHeader title={t.aboutTitle} note={t.aboutNote} />
      <div className="dossier__grid">
        <Reveal>
          <div className="dossier-card dossier-card--wide sf-panel">
            <p className="dossier-card__label">{t.education}</p>
            <div className="timeline">
              <div>
                <span>{t.undergradLabel}</span>
                <strong>{undergraduate}</strong>
              </div>
              <div>
                <span>{t.gradLabel}</span>
                <strong>{graduate}</strong>
              </div>
            </div>
          </div>
        </Reveal>
        <Reveal delay={0.08}>
          <div className="dossier-card sf-panel">
            <p className="dossier-card__label">{t.focusTitle}</p>
            <p>{t.focusBody}</p>
          </div>
        </Reveal>
        <Reveal delay={0.16}>
          <div className="dossier-card dossier-card--status sf-panel">
            <p className="dossier-card__label">{lang === "zh" ? "求职意向" : "Focus"}</p>
            <strong>{t.target}</strong>
            <span>{t.location}</span>
            <span>{t.available}</span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Systems({ lang }: { lang: Lang }) {
  const t = copy[lang];
  return (
    <section className="section systems" id="systems">
      <SectionHeader title={t.systemsTitle} note={t.systemsNote} />
      <div className="systems__grid">
        {systems[lang].map((system, index) => (
          <Reveal key={system.id} delay={index * 0.04}>
            <article className="system-card sf-panel">
              <h3>{system.title}</h3>
              <p>{system.text}</p>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function ProjectBlock({ project, index, lang }: { project: (typeof projects)[0]; index: number; lang: Lang }) {
  const t = copy[lang];
  const num = String(index + 1).padStart(2, "0");
  const view = lang === "zh" ? project : project.en;

  return (
    <motion.article className="mission sf-panel" id={project.id} layout initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-10% 0px" }} transition={{ duration: 0.65, ease, delay: 0.05 }}>
      <div className="mission__index">#{num}</div>
      <div className="mission__body">
        <p className="mission__meta">
          <span>{project.period}</span>
          <span className="mission__role">{view.role}</span>
        </p>
        <h3>
          {view.title}
          {view.titleEn ? <span> / {view.titleEn}</span> : null}
        </h3>
        <p className="mission__summary">{view.summary}</p>
        <div className="mission__panel">
          <div>
            <p className="mission__label">{t.concept}</p>
            <p>{view.concept}</p>
          </div>
          <div>
            <p className="mission__label">{t.contribution}</p>
            <ul>
              {view.contribution.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          </div>
          {view.outcomes ? (
            <div>
              <p className="mission__label">{t.outcomes}</p>
              <ul>
                {view.outcomes.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
        {view.highlights ? (
          <ul className="mission__highlights">
            {view.highlights.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
        ) : null}
        <div className="mission__tags">
          {view.tags.map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>
        {project.bvid ? (
          <BilibiliEmbed bvid={project.bvid} title={view.title} startSec={project.videoStartSec} label={t.videoLabel} openLabel={t.openVideo} />
        ) : null}
      </div>
    </motion.article>
  );
}

function Work({ lang }: { lang: Lang }) {
  const t = copy[lang];
  return (
    <section className="section work" id="work">
      <SectionHeader title={t.workTitle} note={t.workNote} />
      <Reveal>
        <p className="section__lead">{t.workLead}</p>
      </Reveal>
      <div className="mission-list">
        {projects.map((project, index) => (
          <ProjectBlock key={project.id} project={project} index={index} lang={lang} />
        ))}
      </div>
    </section>
  );
}

function Contact({ lang }: { lang: Lang }) {
  const t = copy[lang];
  return (
    <section className="section contact-section" id="contact">
      <SectionHeader title={t.contactTitle} note={t.contactNote} />
      <Reveal>
        <div className="contact-panel sf-panel">
          <p>{t.contactText}</p>
          <a className="contact-panel__mail" href={`mailto:${siteConfig.email}`}>
            {siteConfig.email}
          </a>
          <a className="contact-panel__link" href={siteConfig.bilibiliSpace} target="_blank" rel="noreferrer noopener">
            {t.visitBili}
          </a>
        </div>
      </Reveal>
    </section>
  );
}

function Footer({ lang }: { lang: Lang }) {
  return (
    <footer className="footer">
      <p>
        © {new Date().getFullYear()} {lang === "zh" ? siteConfig.nameZh : siteConfig.nameEn}
      </p>
    </footer>
  );
}

export default function App() {
  const [lang, setLang] = useStoredState<Lang>("zsq-lang", "zh");
  const [theme, setTheme] = useStoredState<Theme>("zsq-theme", "night");

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.documentElement.lang = lang === "zh" ? "zh-CN" : "en";
  }, [lang, theme]);

  return (
    <div className="page">
      <div className="page__bg" />
      <VectorField />
      <div className="page__content">
        <Nav lang={lang} theme={theme} onLang={() => setLang(lang === "zh" ? "en" : "zh")} onTheme={() => setTheme(theme === "day" ? "night" : "day")} />
        <main>
          <Hero lang={lang} />
          <About lang={lang} />
          <Systems lang={lang} />
          <Work lang={lang} />
          <Contact lang={lang} />
        </main>
        <Footer lang={lang} />
      </div>
    </div>
  );
}
