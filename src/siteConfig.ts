/** 站点配置 — 文案、个人信息、荣誉等内容集中维护 */

export type Honor = {
  /** URL slug，对应 content/honors/<slug>.md（可选） */
  slug: string;
  /** 时间，自由文本即可 */
  date: string;
  /** 主标题（中文） */
  title: string;
  /** 主标题（英文） */
  titleEn: string;
  /** 颁发机构 / 来源（中文） */
  source: string;
  /** 颁发机构 / 来源（英文） */
  sourceEn: string;
  /** 简短补充说明（中文） */
  note?: string;
  noteEn?: string;
};

export type Direction = {
  /** 序号代码，类似仪表铭牌：DIR-01 */
  code: string;
  title: string;
  titleEn: string;
  body: string;
  bodyEn: string;
};

export const siteConfig = {
  nameZh: "庄舒晴",
  nameEn: "Shuqing Zhuang",
  /** 顶部 callsign，类似 Apollo 的 "CDR / LMP" 铭牌 */
  callsign: "ZSQ-26",
  email: "zhuangshuqing@example.com",
  /** 微信号 — 仅在侧边栏展示，无法点跳 */
  wechat: "zhuang_shuqing",
  bilibiliSpace: "https://space.bilibili.com/1996144345",
  /** 自我陈述式的一句话（不再说求职） */
  oneLiner: {
    zh: "我是庄舒晴，做游戏策划与互动叙事。",
    en: "I'm Shuqing Zhuang. I design games and interactive stories.",
  },
  /** 第二句，简单地说自己在做什么 */
  intro: {
    zh: "本科在华南理工，研究生在清华深圳国际研究生院。我做关卡、系统、剧情、VR 和互动装置，也写策划案、画原型、推动一支小团队把想法落到屏幕上。",
    en: "I studied at South China University of Technology and I'm a graduate student at Tsinghua SIGS. My work moves between levels, systems, narrative, VR, and interactive installations — from design docs to prototypes to shipping with a small team.",
  },
  location: {
    zh: "广州 / 深圳",
    en: "Guangzhou / Shenzhen",
  },
  education: {
    undergraduate: "华南理工大学",
    graduate: "清华大学深圳国际研究生院",
    undergraduateEn: "South China University of Technology",
    graduateEn: "Tsinghua University Shenzhen International Graduate School",
    undergraduatePeriod: "2020 — 2024",
    graduatePeriod: "2024 — 至今",
    graduatePeriodEn: "2024 — Present",
    undergraduateMajor: "工业设计",
    undergraduateMajorEn: "Industrial Design",
    graduateMajor: "信息艺术设计 · 游戏方向",
    graduateMajorEn: "Information Art & Design · Games Track",
  },
  /** 个人方向（不是技能罗列，是"我做什么"） */
  directions: [
    {
      code: "DIR-01",
      title: "关卡与系统",
      titleEn: "Levels & Systems",
      body: "把一个想法拆成节奏、目标、压力与回报。让玩家这一分钟想做什么、下一分钟为什么愿意继续——这件事我做得最多。",
      bodyEn: "Breaking an idea into beats, goals, pressure, and reward. The work I spend the most time on is making sure the next minute earns the previous one.",
    },
    {
      code: "DIR-02",
      title: "互动叙事",
      titleEn: "Interactive Narrative",
      body: "对剧情和玩法谁服务谁感兴趣。喜欢通过谜题、空间、节奏让故事被玩出来，而不是被讲出来。",
      bodyEn: "Interested in stories told through puzzles, spaces, and pacing rather than long cutscenes — narrative that you play, not watch.",
    },
    {
      code: "DIR-03",
      title: "VR & 互动装置",
      titleEn: "VR & Installations",
      body: "做过几个 VR 与展陈装置项目。喜欢把身体姿态、空间动线和情绪一起设计进去。",
      bodyEn: "Several VR pieces and an exhibition installation. I like designing for body, space, and emotion at once.",
    },
    {
      code: "DIR-04",
      title: "节奏与战斗手感",
      titleEn: "Rhythm & Combat Feel",
      body: "节奏 / Roguelite / 动作里反复打磨手感曲线、判定窗口与构筑闭环——比起堆数值，更想找到「这下打到了」那一秒钟。",
      bodyEn: "On rhythm, action, and roguelite projects: tuning feel curves, judgement windows, and the build loop — chasing the second when a hit reads as a hit.",
    },
  ] satisfies Direction[],
  /** 荣誉 / 奖项 — 想写长文详情就在 content/honors/<slug>.md 创建文件 */
  honors: [
    {
      slug: "mihoyo-2025",
      date: "2025",
      title: "米哈游游戏策划大赛 · 复赛一等奖",
      titleEn: "miHoYo Game Design Competition · Semi-final First Prize",
      source: "米哈游",
      sourceEn: "miHoYo",
      note: "作品《咚！哒咚！》—— 鼓点节奏 + Roguelite 构筑。",
      noteEn: "Project Dong! Da-Dong! — rhythm-action with Roguelite building.",
    },
    {
      slug: "graduation-2024",
      date: "2024",
      title: "毕业设计 · 优秀作品",
      titleEn: "Graduation Design · Distinguished Work",
      source: "华南理工大学",
      sourceEn: "South China University of Technology",
      note: "作品《宇宙回响》VR 叙事，沉浸感与情绪共鸣获用户测试肯定。",
      noteEn: "Cosmic Echoes — a VR narrative, recognized for immersion and emotional resonance in user tests.",
    },
    {
      slug: "ball-lightning-demo",
      date: "2024",
      title: "球状闪电 VR · 演示反响",
      titleEn: "Ball Lightning VR · Demo Reception",
      source: "B 站",
      sourceEn: "Bilibili",
      note: "演示视频 3,576 播放、184 点赞、45 硬币、54 收藏。",
      noteEn: "Demo: 3,576 views, 184 likes, 45 coins, 54 favorites.",
    },
  ] satisfies Honor[],
} as const;
