/**
 * B 站稿件内嵌：使用官方 player 页。
 * 可在空间页挑选更多稿件，把 BV 号与标题补进本列表：
 * https://space.bilibili.com/1996144345
 */
export const bilibiliSpace = {
  /** 个人空间（更多作品） */
  url: "https://space.bilibili.com/1996144345",
  uid: "1996144345",
} as const;

export type BilibiliVideo = {
  bvid: string;
  title: string;
  note?: string;
};

/** 与站内项目对应或可代表能力的演示，可按空间最新稿件增删 */
export const bilibiliVideos: BilibiliVideo[] = [
  {
    bvid: "BV1ke411C7JK",
    title: "《球状闪电》VR 演示",
    note: "个人项目 · 解谜叙事",
  },
  {
    bvid: "BV1rm411y7FL",
    title: "《镂花落影》装置展示",
    note: "互动与情感体验",
  },
];
