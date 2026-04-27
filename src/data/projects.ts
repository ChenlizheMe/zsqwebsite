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
    tags: ["VR", "解谜叙事", "章节结构", "情感主题"],
    summary:
      "把刘慈欣式科幻转译成可玩的 VR 调查。玩家从生日夜的失踪事件出发，在资料馆、医院与墓园中追索球闪真相；每一次解谜都承担叙事功能，而不是独立小游戏。",
    highlights: [
      "分章节叙事：家—资料馆—医院—墓园的情感递进",
      "谜题与主题绑定：量子玫瑰、观测坍缩、薛定谔的猫都被转化为玩法线索",
      "用户测试反馈：资料馆彩蛋「量子之爱」带来明显惊喜与代入感",
    ],
    concept:
      "核心不是展示球状闪电，而是让玩家相信「求真」是一条带着亲情牵引的旅程。VR 的第一人称视角用于强化失去与追寻的在场感。",
    contribution: [
      "搭建四章节故事线与界面交互流：家、资料馆、医院、墓园。",
      "设计量子井字格、密码解锁、拼图迷宫等关卡，使谜题与球闪 / 量子主题互相解释。",
      "根据用户测试压缩对话长度，保留父母是否以另一种形式存在的悬念。",
    ],
    outcomes: ["B 站演示获得 3576 次播放、184 个点赞、45 枚硬币、54 个收藏。"],
    en: {
      title: "Ball Lightning",
      titleEn: "VR Narrative Prototype",
      role: "Solo Project · Game Design & Development",
      tags: ["VR", "Puzzle Narrative", "Chapter Design", "Emotional Arc"],
      summary:
        "A VR investigation adapted from Liu Cixin's Ball Lightning. The player starts with a family disappearance and follows clues through a home, archive, hospital, and cemetery. Every puzzle is designed as narrative evidence, not a detached mini-game.",
      highlights: [
        "Four-chapter emotional progression: home, archive, hospital, cemetery.",
        "Quantum rose, observation collapse, and Schrodinger's cat are translated into playable clues.",
        "Playtesters singled out the archive easter egg as memorable and immersive.",
      ],
      concept:
        "The core fantasy is not simply seeing ball lightning, but feeling that the search for truth is pulled forward by family love. First-person VR heightens that sense of loss and pursuit.",
      contribution: [
        "Built the chapter structure and interaction flow.",
        "Designed the quantum tic-tac-toe, password lock, and puzzle maze around the same thematic vocabulary.",
        "Iterated dialogue density after playtests while preserving the mystery around the parents' existence.",
      ],
      outcomes: ["Bilibili demo: 3,576 views, 184 likes, 45 coins, 54 favorites."],
    },
    bvid: "BV1ke411C7JK",
  },
  {
    id: "lingzhi",
    title: "战后废墟 · 灵智叙事",
    period: "2024.03 — 2024.05",
    role: "跨校合作 · 主策划，兼部分程序与美术",
    tags: ["2D 冒险", "世界观", "角色弧光", "AI 伦理"],
    summary:
      "一个关于 AI 身份与战后废墟的 2D 冒险。玩家扮演失忆女孩「灵芝」，和机器人伙伴小猫逃离战火、寻找避难所，最终发现自己也是人工智能。",
    highlights: [
      "多区域叙事：城市场景与地下基地的情绪对比",
      "探索 + 解谜 + 潜行：用玩法支撑「逃离—反思」体验",
      "结局反转与主题收束：关于「何为人」的策划表达",
    ],
    concept:
      "用一个儿童视角进入沉重的 AI 伦理议题：不是直接讲大道理，而是通过小猫的陪伴、物资收集、士兵躲避与文明遗迹，让玩家逐步感到「人性」并不只属于人类。",
    contribution: [
      "参与主线章节策划：燃烧之城、地下之谜、废墟之城、神秘祭坛。",
      "拆解探索、搜集、潜行、射箭机关、对话选择等玩法节点。",
      "协同角色与场景美术，强化清末文化元素与未来废墟的反差。",
    ],
    outcomes: ["用户测试中，美术风格、角色设计与剧情节奏得到积极反馈。"],
    en: {
      title: "Post-war Ruins: Spiritual Intelligence",
      role: "Cross-school Collaboration · Lead Planning, Partial Art & Implementation",
      tags: ["2D Adventure", "Worldbuilding", "Character Arc", "AI Ethics"],
      summary:
        "A 2D adventure about AI identity in a war-torn world. The player controls an amnesiac girl, Lingzhi, escaping with a robot cat companion before discovering that she herself is artificial intelligence.",
      highlights: [
        "Contrasting moods between ruined streets, shelters, and underground bases.",
        "Exploration, puzzle-solving, stealth, and survival support the escape-to-reflection arc.",
        "The ending reframes the entire journey around what it means to be human.",
      ],
      concept:
        "The story approaches AI ethics through a child's perspective. Companionship, resource collection, stealth, and traces of lost civilization make the question of humanity felt rather than explained.",
      contribution: [
        "Planned the chapter flow: Burning City, Underground Mystery, Ruined City, and Mysterious Altar.",
        "Broke the experience into exploration, collection, stealth, archery triggers, and dialogue choices.",
        "Worked with art direction to blend late-Qing cultural motifs with a futuristic ruined world.",
      ],
      outcomes: ["Playtests praised the visual style, character design, and story pacing."],
    },
  },
  {
    id: "hollow-flowers",
    title: "镂花落影",
    titleEn: "Hollow Flowers Fall Shadows",
    period: "2024.03 — 2024.05",
    role: "双人课题 · 概念与交互设计",
    tags: ["互动艺术", "情绪叙事", "空间体验", "公开展示"],
    summary:
      "一个以机械花与光影回应压力议题的互动装置。观众从远处靠近，花朵苏醒；再通过手势与距离触发呼吸、探索和离场回落，形成一段安静的情绪体验。",
    highlights: [
      "多模式体验：苏醒、感应、呼吸与探索的层次设计",
      "叙事目标：让技术与自然意象共同服务于「放松与共鸣」",
      "展陈与观众行为：从动线到反馈的一体化策划",
    ],
    concept:
      "把压力释放做成一段可被观看、接近、触发和告别的仪式。花不是装饰物，而是和观众共同呼吸的角色。",
    contribution: [
      "设计观展故事板：来到展厅、装置苏醒、人花共鸣、浅呼低语、趣味探索、离开展厅。",
      "规划四种模式的体验差异：苏醒、感应、呼吸、探索。",
      "将交互反馈整理成面向普通观众可理解的情绪语言。",
    ],
    outcomes: ["展示视频对应项目演示，适合作为互动体验设计案例。"],
    en: {
      title: "Hollow Flowers Fall Shadows",
      role: "Course Project · Concept & Interaction Design",
      tags: ["Interactive Art", "Emotional Experience", "Spatial Journey", "Exhibition"],
      summary:
        "An interactive installation where mechanical flowers and light respond to stress and recovery. Visitors approach from a distance, wake the flowers, trigger breathing and exploration modes, then leave as the installation returns to silence.",
      highlights: [
        "Layered modes: awakening, sensing, breathing, and exploration.",
        "Technology and nature are framed around relaxation and resonance rather than hardware display.",
        "The visitor journey is planned from entrance to farewell.",
      ],
      concept:
        "Stress relief is staged as a ritual of approaching, triggering, breathing with, and leaving. The flower becomes a character that breathes with the visitor.",
      contribution: [
        "Designed the storyboard: entering, awakening, resonance, whispering breath, exploration, and exit.",
        "Planned the experiential difference between the four interaction modes.",
        "Translated technical feedback into an emotional language for public audiences.",
      ],
      outcomes: ["The embedded video demonstrates the installation as an interaction design case."],
    },
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
      "3D 俯视角节奏动作 + Roguelite。玩家以鼓点召唤动物之灵与自然图腾，对抗名为「静默」的腐化力量；节奏既是输入方式，也是战斗资源。",
    highlights: [
      "2025 米哈游游戏策划大赛 · 复赛一等奖",
      "系统层：节奏判定、连击资源、召唤与 Roguelite 遗物闭环",
      "世界观与角色：图腾、灵体与 Boss 战与主题对齐",
    ],
    concept:
      "命题是「与世界共舞」。因此鼓点不是 UI 提示，而是角色与世界沟通的唯一语言；连击、召唤、敌人行动和成长构筑都围绕节奏组织。",
    contribution: [
      "输出 One Page、核心循环、系统拆解、角色 / 敌人 / UI 设计与开发里程碑。",
      "设计节奏判定、连击等级、鼓点组合、灵体召唤、先祖遗物等系统。",
      "根据评委反馈调整 UI、节奏环位置、音频同步、教程与战斗收益。",
    ],
    outcomes: ["2025 米哈游游戏策划大赛复赛一等奖；Demo 数据：18.9w 播放、2.0w 点赞、1015 硬币、2714 收藏。"],
    en: {
      title: "Dong! Da-Dong!",
      role: "Game Designer · Full Design Pitch & Team Collaboration",
      tags: ["Rhythm Combat", "Roguelite Build", "Combat Pacing", "Competition"],
      summary:
        "A top-down 3D rhythm-action Roguelite where drumbeats summon animal spirits and nature totems against a corrupting force called Silence. Rhythm is both the input method and the combat resource.",
      highlights: [
        "First prize in the semi-final round of the 2025 miHoYo Game Design Competition.",
        "System loop: rhythm judgement, combo as resource, summoning, and Roguelite relics.",
        "Worldbuilding, spirits, totems, and boss mechanics reinforce the core theme.",
      ],
      concept:
        "The theme is dancing with the world. Drumbeats are therefore not just prompts, but the only language connecting the player, spirits, enemies, and growth system.",
      contribution: [
        "Produced the One Pager, core loop, system breakdown, character/enemy/UI design, and milestone plan.",
        "Designed rhythm judgement, combo tiers, beat combinations, spirit summoning, and ancestral relics.",
        "Iterated UI, beat ring placement, audio sync, tutorials, and combat rewards based on feedback.",
      ],
      outcomes: ["miHoYo competition semi-final first prize. Demo metrics: 189k views, 20k likes, 1,015 coins, 2,714 favorites."],
    },
  },
  {
    id: "cosmic-echoes",
    title: "宇宙回响",
    titleEn: "Cosmic Echoes",
    period: "毕业设计",
    role: "毕业设计 · 叙事与体验设计",
    tags: ["VR 叙事", "沉浸感", "哲学主题", "多感官"],
    summary:
      "毕业设计 VR 叙事：玩家从黑暗虚空中苏醒，点亮太阳系、聆听地球与星云，在宇宙尺度里追问「我们是孤独的听众，还是乐章本身」。",
    highlights: [
      "沉浸叙事：空间探索与旁白节奏的配合",
      "测试结论：沉浸感、交互直觉与情绪共鸣突出",
      "主题表达：科学意象与人文提问的结合方式",
    ],
    concept:
      "用最少文字与菜单，让动作、声音和空间成为叙事语言。项目将卡尔·萨根式宇宙人文主义转译为可被身体感知的 VR 旅程。",
    contribution: [
      "设计章节结构：行星交响诗、暗淡蓝点、创世之茧、宇宙振动。",
      "规划目标用户：沉浸式探索者与哲思型玩家，避免科普式信息过载。",
      "组织手势、声音、旁白、镜头和场景切换，使玩家从观察者变成参与者。",
    ],
    outcomes: ["用户测试显示沉浸感、交互直觉性与情绪共鸣指标较高；部分声音可视化细节进入后续优化。"],
    en: {
      title: "Cosmic Echoes",
      titleEn: "Graduation VR Narrative",
      role: "Graduation Project · Narrative & Experience Design",
      tags: ["VR Narrative", "Immersion", "Philosophy", "Multisensory"],
      summary:
        "A VR narrative in which the player awakens in darkness, lights up the solar system, listens to Earth and nebulae, and asks whether we are lonely listeners or part of the cosmic music itself.",
      highlights: [
        "Spatial narrative and voice-over pacing are designed as one experience.",
        "User testing showed strong immersion, intuitive interaction, and emotional resonance.",
        "Scientific imagery is reshaped into a humanistic question about existence.",
      ],
      concept:
        "The design removes menu-heavy interaction and lets gesture, voice, and space carry the story. It translates Carl Sagan-like cosmic humanism into a bodily VR journey.",
      contribution: [
        "Designed the chapter structure: Planet Symphony, Pale Blue Dot, Cocoon of Creation, and Cosmic Vibration.",
        "Defined target users as immersive explorers and philosophical players, avoiding information overload.",
        "Coordinated gesture, voice, narration, camera movement, and scene transitions so the player becomes a participant.",
      ],
      outcomes: ["User tests rated immersion, interaction intuitiveness, and emotional resonance highly; audio visualization was marked for further polishing."],
    },
  },
  {
    id: "ggj-2025",
    title: "2025 Global Game Jam",
    period: "2025",
    role: "策划 + 美术",
    tags: ["Game Jam", "双人对战", "社交玩法", "节奏"],
    summary:
      "围绕主题 bubble 设计的双人对抗小品：在传送带词库中快速组句、用「气泡」互怼，强调短局节奏、搜索压力与社交笑点，锻炼从创意到可玩原型的快速落地。",
    concept:
      "把「对线」做成可视化的气泡战斗：玩家不是打字，而是在高速滑动的词库中抢词、拼句、发射情绪。",
    contribution: [
      "设计 PVP 操作、词汇传送带、输入框、气泡堆叠与道具系统。",
      "平衡快速搜寻、积累 / 快攻选择与双人可读性。",
      "参与角色界面、操作指引与结算文案设计。",
    ],
    en: {
      title: "2025 Global Game Jam",
      role: "Game Designer + Artist",
      tags: ["Game Jam", "PvP", "Social Play", "Word Puzzle"],
      summary:
        "A two-player bubble-themed duel where players rapidly collect words from a conveyor belt, complete phrases, and launch text bubbles at each other. The focus is short-session pressure and social comedy.",
      concept:
        "Online banter becomes visible bubble combat: players do not type freely, but grab words under pressure and weaponize assembled phrases.",
      contribution: [
        "Designed the PvP controls, word conveyor, input box, bubble stacking, and item systems.",
        "Balanced quick search, accumulation versus rush, and two-player readability.",
        "Worked on character select, control guide, and settlement copy.",
      ],
    },
  },
];
