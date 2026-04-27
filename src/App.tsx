import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { projects } from "./data/projects";
import { siteConfig } from "./siteConfig";
import { VectorField } from "./components/VectorField";
import { BilibiliSection } from "./components/BilibiliSection";
import { Reveal, stagger, item } from "./components/Reveal";

const focusAreas = [
  "系统与关卡策划",
  "叙事与世界观",
  "玩法原型与文档",
  "VR / 互动体验设计",
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
          ["视频", "video"],
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
        {siteConfig.roleLine}
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
        你好。目标岗位为游戏策划。本科毕业于{siteConfig.education.undergraduate}
        ，现于{siteConfig.education.graduate}
        就读。习惯把主题落进可玩的系统与关卡：从 VR
        叙事、完整赛题案到展陈与 Game Jam
        原型，关注节奏、动机与情绪曲线，并保留清晰的文档与迭代说明以便协作。
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
        <button type="button" className="btn btn--primary" onClick={() => document.getElementById("video")?.scrollIntoView({ behavior: "smooth" })}>
          看视频作品
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
            <h3 className="panel__h">策划侧重</h3>
            <p className="panel__p">
              从科幻改编、AI
              伦理到宇宙哲思，习惯先定「玩家动机与情绪曲线」，再落到关卡与系统：谜题如何服务主题、节奏何时给信息、结局如何收束命题。商业赛题与毕业设计侧重可讲清楚的系统案与迭代记录。
            </p>
          </div>
        </Reveal>
        <Reveal delay={0.12}>
          <div className="panel">
            <h3 className="panel__h">能力与工具</h3>
            <ul className="panel__list">
              {[
                "系统与关卡：循环、难度曲线、任务与事件",
                "叙事与文档：世界观、One Pager、迭代里程碑",
                "Unity / VR 原型：能跟程序对齐需求与验收",
                "展陈与互动：观展动线与体验目标（非硬件清单）",
              ].map((x) => (
                <li key={x}>{x}</li>
              ))}
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
          <span className="section__num">02</span>
          作品与项目
        </h2>
        <p className="section__lead">以下为策划向摘要，详案与视频演示见各条链接及上方内嵌稿件。</p>
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
          <span className="section__num">03</span>
          联系
        </h2>
        <div className="contact">
          <p className="contact__text">游戏策划岗位、合作或试玩邀约，欢迎邮件附岗位与时间段，可随信附作品链接。</p>
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
          <BilibiliSection />
          <Work />
          <Contact />
        </main>
        <Footer />
      </div>
    </div>
  );
}
