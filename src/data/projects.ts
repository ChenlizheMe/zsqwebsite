export type Project = {
  id: string;
  title: string;
  titleEn?: string;
  period: string;
  role: string;
  tags: string[];
  summary: string;
  highlights?: string[];
  links?: { label: string; href: string }[];
};

export const projects: Project[] = [
  {
    id: "ball-lightning",
    title: "球状闪电",
    titleEn: "Ball Lightning",
    period: "2023.11 — 2023.12",
    role: "个人项目 · 策划与开发",
    tags: ["Unity 3D", "VR", "Google Cardboard", "解谜叙事"],
    summary:
      "灵感来自刘慈欣《球状闪电》。玩家在分章节的 VR 体验中追寻球闪真相，融合量子玫瑰、薛定谔的猫等意象，探讨亲情与观测。含资料馆密码、量子井字格与量子迷宫拼图等玩法。",
    highlights: [
      "第一人称 VR，强调沉浸与交互直观",
      "核心主题：量子态、人性与亲情",
      "用户测试反馈：关卡与资料馆彩蛋代入感强",
    ],
    links: [
      {
        label: "演示视频",
        href: "https://www.bilibili.com/video/BV1ke411C7JK/",
      },
    ],
  },
  {
    id: "lingzhi",
    title: "战后废墟 · 灵智叙事",
    period: "2024.03 — 2024.05",
    role: "跨校合作 · 游戏策划、部分程序与美术",
    tags: ["Unity 2D", "像素", "冒险解谜", "AI 伦理"],
    summary:
      "人类为火力优势发展「灵智」，世界沦为废墟。玩家扮演失忆少女，与 AI 宠物「小猫」逃离战火、探索文明遗迹，在结局发现自身亦为人工智能，引发对伦理与人性的反思。美术融合清末元素与科幻。",
    highlights: [
      "探索、解谜、潜行与生存玩法结合",
      "多章节：燃烧之城、地下之谜、废墟之城、神秘祭坛",
      "角色包含灵芝、大小猫形态、Dr.A / Dr.B 等",
    ],
  },
  {
    id: "hollow-flowers",
    title: "镂花落影",
    titleEn: "Hollow Flowers Fall Shadows",
    period: "2024.03 — 2024.05",
    role: "双人课程作业 · 设计与开发",
    tags: ["装置艺术", "Arduino", "Python", "OpenCV", "情感疗愈"],
    summary:
      "回应现代人群压力与心理健康议题，以绣球花与机械光影模拟花的生长与绽放。结合人体红外、超声波、手势识别与声光反馈，支持苏醒、感应、呼吸与探索多种模式。",
    highlights: [
      "Arduino Mega + L298N + 减速电机 + WS2812 等",
      "Python 与 Arduino 串口通讯（JSON）",
      "OpenCV 手势识别与花开合、灯效联动",
    ],
    links: [
      {
        label: "展示视频",
        href: "https://www.bilibili.com/video/BV1rm411y7FL?t=22.2",
      },
    ],
  },
  {
    id: "dong-dadong",
    title: "咚！哒咚！",
    period: "2025",
    role: "游戏策划 · UI / 3D / 音效协作",
    tags: ["3D 俯视角", "节奏动作", "Roguelite", "米哈游大赛"],
    summary:
      "以鼓点为唯一交互语言，召唤灵体对抗「静默」腐化，重建世界和谐。融合非洲鼓、图腾与低多边形美术。含节奏判定、连击、召唤与 Roguelite 构筑等系统。",
    highlights: [
      "2025 米哈游游戏策划大赛 · 复赛一等奖",
      "主角鼓灵者「哇啦啦」与动物之灵、自然图腾",
    ],
  },
  {
    id: "cosmic-echoes",
    title: "宇宙回响",
    titleEn: "Cosmic Echoes",
    period: "毕业设计",
    role: "个人毕业设计 · 设计与开发",
    tags: ["VR 叙事", "Unity", "XR", "手势", "语音可视化"],
    summary:
      "在 138 亿年的宇宙振动中，探讨我们是「孤独的听众」还是「乐章本身」。无菜单、以手势与声音驱动交互，结合 TTS、粒子、URP 与叙事化章节（如行星交响诗、暗淡蓝点、宇宙振动）。",
    highlights: [
      "XR Interaction Toolkit 手势、FFT 音频粒子、DoTween 过场",
      "用户测试：沉浸感、交互直觉与情绪共鸣反馈良好",
    ],
  },
  {
    id: "ggj-2025",
    title: "2025 Global Game Jam",
    period: "2025",
    role: "策划 + 美术",
    tags: ["Game Jam", "双人对战", "词汇组合"],
    summary:
      "主题 bubble：双人在限定时间内从词汇传送带抓取词语，组句并以气泡互「怼」，核心体验为快速搜索与快攻节奏。",
  },
];
