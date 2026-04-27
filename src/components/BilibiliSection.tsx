import { motion } from "framer-motion";
import { bilibiliSpace, bilibiliVideos, type BilibiliVideo } from "../data/bilibiliVideos";
import { Reveal } from "./Reveal";

const ease = [0.22, 1, 0.36, 1] as const;

function playerSrc(bvid: string) {
  const q = new URLSearchParams({
    bvid: bvid.trim(),
    page: "1",
    high_quality: "1",
    danmaku: "0",
    autoplay: "0",
  });
  return `https://player.bilibili.com/player.html?${q.toString()}`;
}

function VideoCard({ video, index }: { video: BilibiliVideo; index: number }) {
  return (
    <motion.div
      className="bili-card"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-8% 0px" }}
      transition={{ duration: 0.55, ease, delay: index * 0.06 }}
    >
      <div className="bili-card__title-row">
        <h3 className="bili-card__title">{video.title}</h3>
        {video.note ? <p className="bili-card__note">{video.note}</p> : null}
      </div>
      <div className="bili-card__frame">
        <iframe
          title={video.title}
          src={playerSrc(video.bvid)}
          className="bili-card__iframe"
          allow="fullscreen; autoplay; clipboard-write; encrypted-media"
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
      <a
        className="bili-card__link"
        href={`https://www.bilibili.com/video/${video.bvid}/`}
        target="_blank"
        rel="noreferrer noopener"
      >
        在 bilibili 打开此稿 ↗
      </a>
    </motion.div>
  );
}

export function BilibiliSection() {
  return (
    <section className="section section--bili" id="video">
      <Reveal>
        <h2 className="section__h">
          <span className="section__num">01</span>
          视频作品
        </h2>
        <p className="section__lead">
          使用 bilibili 官方播放器内嵌。更多演示、开发记录与未收录稿件请见
          <a href={bilibiliSpace.url} target="_blank" rel="noreferrer noopener" className="section__inline-link">
            个人空间
          </a>
          。
        </p>
      </Reveal>
      <div className="bili-grid">
        {bilibiliVideos.map((v, i) => (
          <VideoCard key={v.bvid} video={v} index={i} />
        ))}
      </div>
      <Reveal>
        <p className="bili-space-cta">
          <a
            className="bili-space-cta__btn"
            href={bilibiliSpace.url}
            target="_blank"
            rel="noreferrer noopener"
          >
            前往 bilibili 空间 @1996144345 ↗
          </a>
        </p>
      </Reveal>
    </section>
  );
}
