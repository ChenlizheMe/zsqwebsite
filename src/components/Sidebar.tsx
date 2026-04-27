import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { siteConfig } from "../siteConfig";
import { type Route } from "../router/useRoute";

type Lang = "zh" | "en";
type Theme = "day" | "night";

type NavItem = { id: string; label: string; href: string; match: (r: Route) => boolean };

const ease = [0.22, 1, 0.36, 1] as const;

const labels = {
  zh: {
    home: "主页",
    work: "项目",
    honors: "荣誉",
    blog: "博客",
    contact: "联系",
    email: "邮件",
    wechat: "微信",
    bilibili: "B 站",
    callsign: "呼号",
    section: "导航",
  },
  en: {
    home: "Home",
    work: "Work",
    honors: "Honors",
    blog: "Blog",
    contact: "Contact",
    email: "Email",
    wechat: "WeChat",
    bilibili: "Bilibili",
    callsign: "Callsign",
    section: "Index",
  },
} as const;

function Sigil() {
  return (
    <svg viewBox="0 0 32 32" aria-hidden>
      <circle cx="16" cy="16" r="14" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.5" />
      <circle cx="16" cy="16" r="9" fill="none" stroke="currentColor" strokeWidth="1" />
      <path d="M2 16 H7 M25 16 H30 M16 2 V7 M16 25 V30" stroke="currentColor" strokeWidth="1" />
      <circle cx="16" cy="16" r="2" fill="currentColor" />
    </svg>
  );
}

export function Sidebar({
  route,
  lang,
  theme,
  onLang,
  onTheme,
}: {
  route: Route;
  lang: Lang;
  theme: Theme;
  onLang: () => void;
  onTheme: () => void;
}) {
  const t = labels[lang];
  const [mobileOpen, setMobileOpen] = useState(false);
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 30_000);
    return () => clearInterval(id);
  }, []);

  // 路由切换时关闭移动端面板
  useEffect(() => { setMobileOpen(false); }, [route]);

  const items: NavItem[] = [
    { id: "home", label: t.home, href: "#/", match: (r) => r.name === "home" },
    { id: "work", label: t.work, href: "#/", match: (r) => r.name === "work" || r.name === "work-detail" },
    { id: "honors", label: t.honors, href: "#/", match: (r) => r.name === "honors" || r.name === "honor-detail" },
    { id: "blog", label: t.blog, href: "#/blog", match: (r) => r.name === "blog" || r.name === "blog-detail" },
  ];

  const onNavClick = (item: NavItem) => (e: React.MouseEvent) => {
    e.preventDefault();
    if (item.id === "home") {
      window.location.hash = "#/";
      return;
    }
    if (item.id === "blog") {
      window.location.hash = "#/blog";
      return;
    }
    // work / honors → 回首页并滚动到 section
    if (window.location.hash && window.location.hash !== "#/") {
      window.location.hash = "#/";
      setTimeout(() => {
        document.getElementById(item.id)?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 60);
      return;
    }
    document.getElementById(item.id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const utc = `${now.getUTCHours().toString().padStart(2, "0")}:${now.getUTCMinutes().toString().padStart(2, "0")} UTC`;

  return (
    <>
      {/* 移动端顶栏 */}
      <header className="topbar">
        <button type="button" className="topbar__brand" onClick={() => (window.location.hash = "#/")}>
          <span className="topbar__sigil"><Sigil /></span>
          <span className="topbar__name">{siteConfig.nameZh}</span>
          <span className="topbar__cs">{siteConfig.callsign}</span>
        </button>
        <button
          type="button"
          className={`topbar__menu ${mobileOpen ? "topbar__menu--open" : ""}`}
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle navigation"
        >
          <span /><span /><span />
        </button>
      </header>

      <motion.aside
        className={`sidebar ${mobileOpen ? "sidebar--open" : ""}`}
        initial={{ x: -24, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease }}
      >
        <div className="sidebar__inner">
          {/* Brand block */}
          <a className="sidebar__brand" href="#/" onClick={(e) => { e.preventDefault(); window.location.hash = "#/"; }}>
            <span className="sidebar__sigil"><Sigil /></span>
            <span className="sidebar__brand-text">
              <span className="sidebar__name">{siteConfig.nameZh}</span>
              <span className="sidebar__name-en">{siteConfig.nameEn}</span>
            </span>
          </a>

          <div className="sidebar__plate">
            <span className="sidebar__plate-key">{t.callsign}</span>
            <span className="sidebar__plate-val">{siteConfig.callsign}</span>
          </div>

          {/* Nav */}
          <nav className="sidebar__nav" aria-label="primary">
            <p className="sidebar__heading">{t.section}</p>
            <ul>
              {items.map((it, i) => {
                const active = it.match(route);
                const num = String(i + 1).padStart(2, "0");
                return (
                  <li key={it.id}>
                    <a
                      href={it.href}
                      className={`sidebar__link ${active ? "sidebar__link--active" : ""}`}
                      onClick={onNavClick(it)}
                    >
                      <span className="sidebar__link-num">{num}</span>
                      <span className="sidebar__link-label">{it.label}</span>
                      <span className="sidebar__link-mark" aria-hidden />
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Contact */}
          <div className="sidebar__contact">
            <p className="sidebar__heading">{t.contact}</p>
            <a className="sidebar__contact-row" href={`mailto:${siteConfig.email}`}>
              <span className="sidebar__contact-key">{t.email}</span>
              <span className="sidebar__contact-val">{siteConfig.email}</span>
            </a>
            <div className="sidebar__contact-row sidebar__contact-row--static">
              <span className="sidebar__contact-key">{t.wechat}</span>
              <span className="sidebar__contact-val">{siteConfig.wechat}</span>
            </div>
            <a
              className="sidebar__contact-row"
              href={siteConfig.bilibiliSpace}
              target="_blank"
              rel="noreferrer noopener"
            >
              <span className="sidebar__contact-key">{t.bilibili}</span>
              <span className="sidebar__contact-val">space ↗</span>
            </a>
          </div>

          {/* Status / toggles */}
          <div className="sidebar__status">
            <div className="sidebar__status-row">
              <span className="sidebar__status-tick" />
              <span className="sidebar__status-text">{utc}</span>
            </div>
            <div className="sidebar__toggles">
              <button type="button" className="sidebar__toggle" onClick={onTheme}>
                {theme === "day" ? "NIGHT" : "DAY"}
              </button>
              <button type="button" className="sidebar__toggle" onClick={onLang}>
                {lang === "zh" ? "EN" : "中"}
              </button>
            </div>
          </div>
        </div>
      </motion.aside>

      {mobileOpen ? <div className="sidebar__scrim" onClick={() => setMobileOpen(false)} aria-hidden /> : null}
    </>
  );
}
