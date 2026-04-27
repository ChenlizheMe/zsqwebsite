export type Project = {
  id: string;
  title: string;
  titleEn?: string;
  period: string;
  role: string;
  tags: string[];
  summary: string;
  highlights?: string[];
  /** 有对应 bilibili 稿件时填写，页面内嵌播放器；无则不要设 */
  bvid?: string;
  /** 与 B 站稿件「跳转到指定时间」一致，选填 */
  videoStartSec?: number;
  /** 非视频类外链；有 bvid 时一般不必再填 B 站链接 */
  links?: { label: string; href: string }[];
};

export const projects: Project[] = [
  {
    id: "ball-lightning",
    title: "球状闪电",
    titleEn: "Ball Lightning",
    period: "2023.11 — 2023.12",
    role: "个人项目 · 策划与开发",
    tags: ["VR", "解谜叙事", "章节结构", "情感主题"],
    summary:
      "改编自刘慈欣《球状闪电》的 VR 叙事：以分章节推进调查线，用「量子玫瑰」「观测」等意象组织谜题与情绪节奏，探讨亲情与真相。侧重点是关卡节奏、信息投放与玩家动机，而非技术实现细节。",
    highlights: [
      "分章节叙事：家—资料馆—医院—墓园的情感递进",
      "谜题与剧情绑定：密码、小游戏与主题一致",
      "测试反馈：资料馆彩蛋与代入感突出",
    ],
    bvid: "BV1ke411C7JK",
  },
  {
    id: "lingzhi",
    title: "战后废墟 · 灵智叙事",
    period: "2024.03 — 2024.05",
    role: "跨校合作 · 主策划，兼部分程序与美术",
    tags: ["2D 冒险", "世界观", "角色弧光", "AI 伦理"],
    summary:
      "末世设定下，玩家与 AI 伙伴「小猫」在废墟中寻找记忆与出路，核心转折指向身份与伦理命题。负责主线任务拆解、NPC 与关卡节奏，以及与世界观一致的美术方向协同。",
    highlights: [
      "多区域叙事：城市场景与地下基地的情绪对比",
      "探索 + 解谜 + 潜行：用玩法支撑「逃离—反思」体验",
      "结局反转与主题收束：关于「何为人」的策划表达",
    ],
  },
  {
    id: "hollow-flowers",
    title: "镂花落影",
    titleEn: "Hollow Flowers Fall Shadows",
    period: "2024.03 — 2024.05",
    role: "双人课题 · 概念与交互设计",
    tags: ["互动艺术", "情绪叙事", "空间体验", "公开展示"],
    summary:
      "面向情绪疗愈与公共空间的互动装置：以花的开合作隐喻呼吸与释放，设计观展动线（靠近—感应—共呼吸—探索模式），强调观众情绪曲线与仪式感的营造，而非工程清单式展示。",
    highlights: [
      "多模式体验：苏醒、感应、呼吸与探索的层次设计",
      "叙事目标：让技术与自然意象共同服务于「放松与共鸣」",
      "展陈与观众行为：从动线到反馈的一体化策划",
    ],
    bvid: "BV1rm411y7FL",
    videoStartSec: 22.2,
  },
  {
    id: "dong-dadong",
    title: "咚！哒咚！",
    period: "2025",
    role: "游戏策划（完整案）· 与美术 / 程序协作",
    tags: ["节奏战斗", "Roguelite 构筑", "关卡节奏", "米哈游大赛"],
    summary:
      "鼓点即交互语言的 3D 俯视角节奏动作游戏：围绕「与世界共舞」定义核心循环，设计鼓点组合、灵体召唤、敌人节奏与成长构筑，形成可宣讲、可拆系统的策划文档与迭代里程碑。",
    highlights: [
      "2025 米哈游游戏策划大赛 · 复赛一等奖",
      "系统层：节奏判定、连击资源、召唤与 Roguelite 遗物闭环",
      "世界观与角色：图腾、灵体与 Boss 战与主题对齐",
    ],
  },
  {
    id: "cosmic-echoes",
    title: "宇宙回响",
    titleEn: "Cosmic Echoes",
    period: "毕业设计",
    role: "毕业设计 · 叙事与体验设计",
    tags: ["VR 叙事", "沉浸感", "哲学主题", "多感官"],
    summary:
      "宇宙尺度的沉浸式叙事：无 UI 堆叠，强调手势与声音作为「语言」，用章节化旅程讨论存在与倾听。策划重心在沉浸路径、情绪曲线与直觉交互，使哲学命题可被体验而非说教。",
    highlights: [
      "沉浸叙事：空间探索与旁白节奏的配合",
      "测试结论：沉浸感、交互直觉与情绪共鸣突出",
      "主题表达：科学意象与人文提问的结合方式",
    ],
  },
  {
    id: "ggj-2025",
    title: "2025 Global Game Jam",
    period: "2025",
    role: "策划 + 美术",
    tags: ["Game Jam", "双人对战", "社交玩法", "节奏"],
    summary:
      "围绕主题 bubble 设计的双人对抗小品：在传送带词库中快速组句、用「气泡」互怼，强调短局节奏、搜索压力与社交笑点，锻炼从创意到可玩原型的快速落地。",
  },
];
