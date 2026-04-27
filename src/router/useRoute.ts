import { useEffect, useState } from "react";

/**
 * 极简 hash 路由：
 *   #/                 -> { name: "home" }
 *   #/work             -> { name: "work" }
 *   #/work/<slug>      -> { name: "work-detail", slug }
 *   #/honors           -> { name: "honors" }
 *   #/honors/<slug>    -> { name: "honor-detail", slug }
 *   #/blog             -> { name: "blog" }
 *   #/blog/<slug>      -> { name: "blog-detail", slug }
 */
export type Route =
  | { name: "home" }
  | { name: "work" }
  | { name: "work-detail"; slug: string }
  | { name: "honors" }
  | { name: "honor-detail"; slug: string }
  | { name: "blog" }
  | { name: "blog-detail"; slug: string };

function parse(hash: string): Route {
  const path = hash.replace(/^#/, "").replace(/^\//, "");
  if (!path || path === "/") return { name: "home" };

  const parts = path.split("/").filter(Boolean);
  const [seg, slug] = parts;

  if (seg === "work") {
    if (slug) return { name: "work-detail", slug: decodeURIComponent(slug) };
    return { name: "work" };
  }
  if (seg === "honors") {
    if (slug) return { name: "honor-detail", slug: decodeURIComponent(slug) };
    return { name: "honors" };
  }
  if (seg === "blog") {
    if (slug) return { name: "blog-detail", slug: decodeURIComponent(slug) };
    return { name: "blog" };
  }
  return { name: "home" };
}

function getHash() {
  if (typeof window === "undefined") return "";
  return window.location.hash;
}

export function useRoute(): Route {
  const [route, setRoute] = useState<Route>(() => parse(getHash()));

  useEffect(() => {
    const onHash = () => setRoute(parse(getHash()));
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  // 路由变更时滚动回顶部
  useEffect(() => {
    if (typeof window === "undefined") return;
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, [route]);

  return route;
}

export function navigate(to: string) {
  if (typeof window === "undefined") return;
  window.location.hash = to;
}

