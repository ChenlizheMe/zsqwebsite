export type Project = {
  id: string;
  title: string;
  titleEn?: string;
  period: string;
  role: string;
  tags: string[];
  summary: string;
  highlights?: string[];
  concept: string;
  contribution: string[];
  outcomes?: string[];
  en: {
    title: string;
    titleEn?: string;
    role: string;
    tags: string[];
    summary: string;
    highlights?: string[];
    concept: string;
    contribution: string[];
    outcomes?: string[];
  };
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
    tags: ["VR", "解谜叙事", "章节结构"],
    summary:
      "改自刘慈欣同名小说的 VR 第一人称叙事。玩家从一场生日夜的失踪开始，跟着线索走过家、资料馆、医院和墓园——每个谜题都不是独立小游戏，而是把「求真」这件事推进一步的理由。",
    concept:
      "我想做的不是「看到球状闪电」，而是让玩家在 VR 里替主人公「还在找」。第一人称的身体感被用来强化失去与追寻——蹲下、回头、伸手都是叙事。",
    contribution: [
      "四章故事线（家 / 资料馆 / 医院 / 墓园）的结构、节奏与衔接。",
      "把量子玫瑰、观测坍缩、薛定谔的猫这些概念翻译成可被玩到的谜题。",
      "根据 playtest 反馈把对白压短，留住「父母是否以另一种方式存在」的悬念。",
    ],
    outcomes: ["B 站演示：3,576 播放、184 点赞、45 硬币、54 收藏。"],
    en: {
      title: "Ball Lightning",
      titleEn: "VR Narrative",
      role: "Solo Project · Design & Development",
      tags: ["VR", "Puzzle Narrative", "Chapter Design"],
      summary:
        "A first-person VR adaptation of Liu Cixin's Ball Lightning. Starting with a family disappearance, the player walks through a home, archive, hospital, and cemetery — each puzzle pushes the search forward instead of being a side mini-game.",
      concept:
        "I didn't want the player to 'see ball lightning'. I wanted them to keep searching for it, in the protagonist's body. First-person VR puts that loss into the player's posture: kneeling, turning, reaching.",
      contribution: [
        "Structure and pacing of the four chapters.",
        "Turning concepts like the quantum rose, observation collapse, and Schrodinger's cat into things you actually play.",
        "Cutting dialogue down after playtests while keeping the central mystery unresolved.",
      ],
      outcomes: ["Bilibili demo: 3,576 views, 184 likes, 45 coins, 54 favorites."],
    },
    bvid: "BV1ke411C7JK",
  },
  {
    id: "lingzhi",
    title: "战后废墟 · 灵智叙事",
    period: "2024.03 — 2024.05",
    role: "跨校合作 · 主策划（兼部分程序与美术）",
    tags: ["2D 冒险", "世界观", "AI 伦理"],
    summary:
      "一个关于 AI 身份的 2D 战后冒险。玩家扮演失忆女孩「灵芝」，和机器人小猫一起逃出战火、寻找避难所，最后发现自己也是 AI。",
    concept:
      "用儿童视角进 AI 伦理这件事——不是直接讲大道理，是通过小猫的陪伴、物资搜集、躲避士兵和遗迹细节，让玩家自己得出「人性可能不止属于人类」的结论。",
    contribution: [
      "主线章节（燃烧之城 / 地下之谜 / 废墟之城 / 祭坛）的策划与节奏。",
      "把「探索 + 搜集 + 潜行 + 对话选择」拼到同一条情绪线下不打架。",
      "和角色 / 场景美术对齐：清末文化元素 + 未来废墟的反差。",
    ],
    outcomes: ["Playtest 反馈：美术风格、角色设计、剧情节奏正面。"],
    en: {
      title: "Post-war Ruins: Lingzhi",
      role: "Cross-school Project · Lead Designer (also some art & code)",
      tags: ["2D Adventure", "Worldbuilding", "AI Ethics"],
      summary:
        "A 2D post-war adventure about AI identity. The player controls an amnesiac girl, Lingzhi, escaping with a robot cat companion before discovering she herself is artificial intelligence.",
      concept:
        "I wanted to enter AI ethics through a child's perspective — not by explaining anything, but by letting companionship, scavenging, stealth and lost civilization details make the player land on 'humanity might not belong only to humans'.",
      contribution: [
        "Chapter structure and pacing (Burning City / Underground / Ruined City / Altar).",
        "Wiring exploration, collection, stealth, and dialogue choices onto one emotional line.",
        "Working with art on the contrast between late-Qing motifs and a futuristic ruin.",
      ],
      outcomes: ["Playtests praised art style, characters, and pacing."],
    },
  },
  {
    id: "hollow-flowers",
    title: "镂花落影",
    titleEn: "Hollow Flowers Fall Shadows",
    period: "2024.03 — 2024.05",
    role: "双人课题 · 概念与交互设计",
    tags: ["互动装置", "空间体验", "展陈"],
    summary:
      "一组机械花 + 光影的互动装置，做的是「压力释放」这件事。观众远远走近，花苏醒；用手势和距离触发呼吸、探索；离开时整体回落到沉默——是一段被设计过的仪式。",
    concept:
      "我把压力释放当一种「仪式」来做——观众接近、触发、共鸣、告别。花不是装饰品，是一个和观众一起呼吸的角色。",
    contribution: [
      "观展故事板：进展厅 → 苏醒 → 共鸣 → 浅呼低语 → 探索 → 离开。",
      "规划四种模式（苏醒 / 感应 / 呼吸 / 探索）的体验差异和切换。",
      "把工程反馈翻译成普通观众能直觉读到的情绪语言。",
    ],
    outcomes: ["展陈视频可作为互动体验设计案例参考。"],
    en: {
      title: "Hollow Flowers Fall Shadows",
      role: "Course Project · Concept & Interaction",
      tags: ["Interactive Installation", "Spatial Experience", "Exhibition"],
      summary:
        "A mechanical-flower + light installation about stress release. Visitors approach from a distance and the flower wakes; gestures and proximity trigger breathing and exploration; leaving lets it fall back to silence.",
      concept:
        "I treated stress release as a ritual — approach, trigger, breathe-with, and farewell. The flower isn't decoration; it's a character that breathes with the visitor.",
      contribution: [
        "Visitor storyboard: entering → awakening → resonance → whispered breath → exploration → exit.",
        "The four interaction modes (awaken / sense / breathe / explore) and how they switch.",
        "Translating engineering feedback into emotional language any visitor can read.",
      ],
      outcomes: ["The video doubles as an interaction-design case study."],
    },
    bvid: "BV1rm411y7FL",
    videoStartSec: 22.2,
  },
  {
    id: "dong-dadong",
    title: "咚！哒咚！",
    period: "2025",
    role: "策划（完整案）· 与美术 / 程序协作",
    tags: ["节奏战斗", "Roguelite", "比赛"],
    summary:
      "3D 俯视角节奏动作 + Roguelite。玩家用鼓点召唤动物之灵和自然图腾，对抗名为「静默」的腐化力量。节奏既是操作，也是战斗资源。",
    concept:
      "命题是「与世界共舞」。我希望鼓点不是 UI 上的小提示，而是角色和世界之间唯一的语言——所以连击、召唤、敌人行动、Roguelite 构筑都被设计成围绕节奏运转。",
    contribution: [
      "完整策划案：One Page、核心循环、系统拆解、角色 / 敌人 / UI 与开发里程碑。",
      "节奏判定、连击等级、鼓点组合、灵体召唤、先祖遗物等系统设计。",
      "根据评委反馈打磨 UI、节奏环位置、音频同步、教程与战斗收益。",
    ],
    outcomes: ["2025 米哈游游戏策划大赛复赛一等奖。Demo：18.9w 播放、2.0w 点赞、1,015 硬币、2,714 收藏。"],
    en: {
      title: "Dong! Da-Dong!",
      role: "Designer (full pitch) · with art & code",
      tags: ["Rhythm Combat", "Roguelite", "Competition"],
      summary:
        "A top-down 3D rhythm-action Roguelite. Drumbeats summon animal spirits and nature totems against a corrupting force called Silence. Rhythm is both your input and your combat resource.",
      concept:
        "The brief was 'dance with the world'. So drumbeats aren't a HUD prompt — they're the only language between player, world, enemies, and growth. Combo, summoning, enemy timing, and the Roguelite build all rotate around the beat.",
      contribution: [
        "Full pitch: One-Pager, core loop, system breakdown, character / enemy / UI, milestone plan.",
        "Designed rhythm judgement, combo tiers, drum combinations, spirit summoning, and ancestral relics.",
        "Iterated UI, beat-ring placement, audio sync, tutorials, and combat rewards from judge feedback.",
      ],
      outcomes: ["First prize, semi-final of 2025 miHoYo Game Design Competition. Demo: 189k views, 20k likes, 1,015 coins, 2,714 favorites."],
    },
  },
  {
    id: "cosmic-echoes",
    title: "宇宙回响",
    titleEn: "Cosmic Echoes",
    period: "毕业设计",
    role: "毕业设计 · 叙事与体验",
    tags: ["VR 叙事", "沉浸感", "多感官"],
    summary:
      "毕业设计 VR 叙事。玩家从黑暗中苏醒，点亮太阳系、聆听地球与星云，在宇宙尺度里被问一个问题——「我们是孤独的听众，还是乐章本身」。",
    concept:
      "我希望尽量不用文字与菜单——让动作、声音和空间本身去叙事。这是一次把卡尔·萨根式的宇宙人文主义放进身体里的尝试。",
    contribution: [
      "章节结构：行星交响诗 / 暗淡蓝点 / 创世之茧 / 宇宙振动。",
      "锁定目标人群（沉浸探索 + 哲思型玩家），避免做成科普式信息倾倒。",
      "把手势、声音、旁白、镜头和场景切换组织起来，让玩家从「看」变成「在」。",
    ],
    outcomes: ["用户测试沉浸感 / 交互直觉 / 情绪共鸣均偏高，声音可视化进入下一轮优化。"],
    en: {
      title: "Cosmic Echoes",
      titleEn: "Graduation VR",
      role: "Graduation Project · Narrative & Experience",
      tags: ["VR Narrative", "Immersion", "Multisensory"],
      summary:
        "A VR narrative graduation project. The player wakes in darkness, lights up the solar system, listens to Earth and nebulae, and gets asked one question — are we lonely listeners, or are we the music itself.",
      concept:
        "I tried to keep menus and text out of it — let gesture, sound, and space do the storytelling. It's an attempt to put Carl-Sagan-style cosmic humanism into a body, in VR.",
      contribution: [
        "Chapter structure: Planet Symphony / Pale Blue Dot / Cocoon of Creation / Cosmic Vibration.",
        "Defined the target audience (immersive explorers + reflective players) and avoided turning it into an info dump.",
        "Wove gesture, voice, narration, camera, and scene transitions so the player shifts from watching to inhabiting.",
      ],
      outcomes: ["Playtests rated immersion, intuitive interaction, and emotional resonance highly; audio visualization went into next iteration."],
    },
  },
  {
    id: "ggj-2025",
    title: "2025 Global Game Jam",
    period: "2025",
    role: "策划 + 美术",
    tags: ["Game Jam", "双人对战", "社交玩法"],
    summary:
      "GGJ 主题 bubble 的双人小品。玩家在传送带词库里抢词、拼句、用气泡互怼——是一次「从想法到可玩原型」的 48 小时落地训练。",
    concept:
      "把「对线」可视化成气泡战斗：玩家不打字，而是在高速滑动的词库里抢词、拼句、发射情绪。",
    contribution: [
      "PVP 操作、词汇传送带、输入框、气泡堆叠和道具系统。",
      "搜索 / 积累 / 快攻三种节奏的平衡，双人可读性。",
      "角色选择、操作引导、结算文案。",
    ],
    en: {
      title: "2025 Global Game Jam",
      role: "Designer + Artist",
      tags: ["Game Jam", "PvP", "Social"],
      summary:
        "A two-player bubble duel on the GGJ 'bubble' theme. Players grab words from a conveyor belt, build phrases, and launch them as bubbles. A 48-hour drill on going from idea to playable prototype.",
      concept:
        "Online banter as visible bubble combat: players don't type freely, they grab words under pressure and weaponize assembled phrases.",
      contribution: [
        "PvP controls, word conveyor, input box, bubble stacking, and items.",
        "Balancing search vs. accumulate vs. rush, plus two-player readability.",
        "Character select, control guide, and end-game copy.",
      ],
    },
  },
];
