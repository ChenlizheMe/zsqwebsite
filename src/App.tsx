import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { projects } from "./data/projects";
import { siteConfig } from "./siteConfig";
import { VectorField } from "./components/VectorField";
import { Reveal, stagger, item } from "./components/Reveal";

const focusAreas = [
  "VR 叙事与沉浸",
  "Unity 游戏与关卡",
  "互动装置 · Arduino",
  "科技与人文主题",
];

const ease = [0.22, 1, 0.36, 1] as const;

function Nav() {
  const [scrolled, setScrolled] = useState(false);
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
    <motion.header
      className={`nav ${scrolled ? "nav--scrolled" : ""}`}
      initial={{ y: -16, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease }}
    >
      <button type="button" className="nav__brand" onClick={() => go("top")}>
        <span className="nav__name">{siteConfig.nameZh}</span>
        <span className="nav__name-en">{siteConfig.nameEn}</span>
      </button>
      <nav className="nav__links" aria-label="页面内导航">
        {[
          ["关于", "about"],
          ["项目", "work"],
          ["联系", "contact"],
        ].map(([label, id]) => (
          <button key={id} type="button" className="nav__link" onClick={() => go(id)}>
            {label}
          </button>
        ))}
      </nav>
    </motion.header>
  );
}

function Hero() {
  return (
    <section className="hero" id="top">
      <motion.p
        className="hero__eyebrow"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease, delay: 0.1 }}
      >
        {siteConfig.eyebrow}
      </motion.p>
      <motion.h1
        className="hero__title"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease, delay: 0.15 }}
      >
        <span className="hero__title-zh">{siteConfig.nameZh}</span>
        <span className="hero__dot" aria-hidden>
          ·
        </span>
        <span className="hero__title-en">{siteConfig.nameEn}</span>
      </motion.h1>
      <motion.p
        className="hero__role"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.35 }}
      >
        互动媒体 · 游戏与虚拟现实
      </motion.p>
      <motion.div
        className="hero__rule"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.9, ease, delay: 0.45 }}
        style={{ transformOrigin: "left center" }}
        role="presentation"
      />
      <motion.p
        className="hero__bio"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65, ease, delay: 0.5 }}
      >
        你好，欢迎来这里。本科就读于{siteConfig.education.undergraduate}
        ，目前在{siteConfig.education.graduate}
        继续攻读研究生。创作涵盖虚拟现实叙事、Unity
        游戏、科技互动装置与赛题 / Game Jam，关注科幻意象、伦理叙事与多感官体验。
      </motion.p>
      <motion.div
        className="hero__chips"
        variants={stagger}
        initial="hidden"
        animate="show"
      >
        {focusAreas.map((t) => (
          <motion.span key={t} className="chip" variants={item}>
            {t}
          </motion.span>
        ))}
      </motion.div>
      <motion.div
        className="hero__cta"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.85 }}
      >
        <button type="button" className="btn btn--primary" onClick={() => document.getElementById("work")?.scrollIntoView({ behavior: "smooth" })}>
          浏览作品
        </button>
      </motion.div>
    </section>
  );
}

function Education() {
  return (
    <Reveal>
      <div className="edu">
        <div className="edu__col">
          <span className="edu__label">本科</span>
          <p className="edu__school">{siteConfig.education.undergraduate}</p>
        </div>
        <div className="edu__line" aria-hidden />
        <div className="edu__col">
          <span className="edu__label">研究生</span>
          <p className="edu__school">{siteConfig.education.graduate}</p>
        </div>
      </div>
    </Reveal>
  );
}

function About() {
  return (
    <section className="section" id="about">
      <Reveal>
        <h2 className="section__h">
          <span className="section__num">00</span>
          关于
        </h2>
      </Reveal>
      <Education />
      <div className="about__grid">
        <Reveal delay={0.05}>
          <div className="panel">
            <h3 className="panel__h">创作线索</h3>
            <p className="panel__p">
              从《球状闪电》式科幻到「灵智」与人工智能伦理，从公共空间的机械花装置到宇宙尺度的
              VR
              哲思——在引擎、硬件与完整策划案之间来回切换，让交互成为叙事的语法。
            </p>
          </div>
        </Reveal>
        <Reveal delay={0.12}>
          <div className="panel">
            <h3 className="panel__h">常用能力</h3>
            <ul className="panel__list">
              {["Unity / VR / XR", "C# 与游戏逻辑", "Arduino & 互动硬件", "Python & OpenCV", "关卡与叙事设计"].map(
                (x) => (
                  <li key={x}>{x}</li>
                )
              )}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function ProjectBlock({
  project,
  index,
}: {
  project: (typeof projects)[0];
  index: number;
}) {
  const num = String(index + 1).padStart(2, "0");
  return (
    <motion.article
      className="work-item"
      id={project.id}
      layout
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 0.65, ease, delay: 0.05 }}
    >
      <div className="work-item__index">{num}</div>
      <div className="work-item__body">
        <p className="work-item__meta">
          <span>{project.period}</span>
          <span className="work-item__sep" aria-hidden>
            ·
          </span>
          <span>{project.role}</span>
        </p>
        <h3 className="work-item__title">
          {project.title}
          {project.titleEn ? <span className="work-item__en"> / {project.titleEn}</span> : null}
        </h3>
        <p className="work-item__summary">{project.summary}</p>
        {project.highlights ? (
          <ul className="work-item__hl">
            {project.highlights.map((h) => (
              <li key={h}>{h}</li>
            ))}
          </ul>
        ) : null}
        <div className="work-item__tags">
          {project.tags.map((t) => (
            <span key={t} className="tag">
              {t}
            </span>
          ))}
        </div>
        {project.links ? (
          <div className="work-item__links">
            {project.links.map((l) => (
              <a key={l.href} className="link-external" href={l.href} target="_blank" rel="noreferrer noopener">
                {l.label} ↗
              </a>
            ))}
          </div>
        ) : null}
      </div>
    </motion.article>
  );
}

function Work() {
  return (
    <section className="section section--work" id="work">
      <Reveal>
        <h2 className="section__h">
          <span className="section__num">01</span>
          作品与项目
        </h2>
        <p className="section__lead">编号仅作版式索引，同系列作品在 PDF 作品集中有完整说明。</p>
      </Reveal>
      <div className="work-list">
        {projects.map((p, i) => (
          <ProjectBlock key={p.id} project={p} index={i} />
        ))}
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section className="section section--contact" id="contact">
      <Reveal>
        <h2 className="section__h">
          <span className="section__num">02</span>
          联系
        </h2>
        <div className="contact">
          <p className="contact__text">合作、参展或学术交流，可来信说明来意与时间段。</p>
          <a className="contact__mail" href={`mailto:${siteConfig.email}`}>
            {siteConfig.email}
          </a>
        </div>
      </Reveal>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <p>
        © {new Date().getFullYear()} {siteConfig.nameZh} · {siteConfig.nameEn}
      </p>
    </footer>
  );
}

export default function App() {
  return (
    <div className="page">
      <div className="page__bg" />
      <VectorField />
      <div className="page__content">
        <Nav />
        <main>
          <Hero />
          <About />
          <Work />
          <Contact />
        </main>
        <Footer />
      </div>
    </div>
  );
}
