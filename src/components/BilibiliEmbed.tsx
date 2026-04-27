/** bilibili 官方 iframe 播放器，仅在与项目绑定时使用 */

function playerUrl(bvid: string, startSec?: number) {
  const q = new URLSearchParams({
    bvid: bvid.trim(),
    page: "1",
    high_quality: "1",
    danmaku: "0",
    autoplay: "0",
  });
  if (startSec != null && startSec > 0) {
    q.set("t", String(startSec));
  }
  return `https://player.bilibili.com/player.html?${q.toString()}`;
}

export function bilibiliWatchUrl(bvid: string, startSec?: number) {
  const base = `https://www.bilibili.com/video/${bvid.trim()}/`;
  if (startSec != null && startSec > 0) {
    return `${base}?t=${startSec}`;
  }
  return base;
}

type Props = {
  bvid: string;
  title: string;
  startSec?: number;
};

export function BilibiliEmbed({ bvid, title, startSec }: Props) {
  return (
    <div className="work-item__video">
      <p className="work-item__video-label">演示视频</p>
      <div className="work-item__video-frame">
        <iframe
          title={title}
          src={playerUrl(bvid, startSec)}
          className="work-item__video-iframe"
          allow="fullscreen; autoplay; clipboard-write; encrypted-media"
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
      <a
        className="work-item__video-link"
        href={bilibiliWatchUrl(bvid, startSec)}
        target="_blank"
        rel="noreferrer noopener"
      >
        在 bilibili 打开 ↗
      </a>
    </div>
  );
}
