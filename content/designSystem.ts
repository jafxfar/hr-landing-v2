export const designSystem = {
  meta: {
    title: "Дизайн-система — Jupiter HR",
    description: "Токены и базовые UI-компоненты лендинга Jupiter HR.",
  },
  hero: {
    eyebrow: "Design system",
    title: "B2B SaaS дизайн-система",
    description:
      "Токены, типографика и базовые компоненты. Страница служебная и не индексируется.",
  },
  colors: {
    eyebrow: "Цвета",
    title: "Палитра",
    description: "Brand, accent и нейтрали. Hex задаются только в CSS-переменных.",
    brand: [
      { name: "brand-50", token: "bg-brand-50", value: "#EEF2FF" },
      { name: "brand-100", token: "bg-brand-100", value: "#E0E7FF" },
      { name: "brand-500", token: "bg-brand-500", value: "#4F46E5" },
      { name: "brand-600", token: "bg-brand-600", value: "#4338CA" },
      { name: "brand-700", token: "bg-brand-700", value: "#3730A3" },
    ],
    accent: [
      { name: "accent-50", token: "bg-accent-50", value: "#F0FDFA" },
      { name: "accent-500", token: "bg-accent-500", value: "#14B8A6" },
      { name: "accent-600", token: "bg-accent-600", value: "#0D9488" },
    ],
    neutrals: [
      { name: "ink", token: "bg-ink-base", value: "#0F172A" },
      { name: "ink-inverse", token: "bg-ink-inverse", value: "#F8FAFC" },
      { name: "muted", token: "bg-muted", value: "#475569" },
      { name: "muted-inverse", token: "bg-muted-inverse", value: "#A5B0CC" },
      { name: "line", token: "bg-line", value: "#E2E8F0" },
      { name: "surface", token: "bg-surface", value: "#F8FAFC" },
      { name: "dark", token: "bg-dark", value: "#0B1020" },
      { name: "dark-2", token: "bg-dark-2", value: "#121A33" },
    ],
  },
  typography: {
    eyebrow: "Типографика",
    title: "Шкала Onest",
    description: "Межстрочный интервал текста — 1.5. Display и body — один sans.",
    samples: [
      { label: "H1 · 48–56px", className: "text-h1 font-semibold text-ink", text: "Заголовок первого уровня" },
      { label: "H2 · 36–40px", className: "text-h2 font-semibold text-ink", text: "Заголовок второго уровня" },
      { label: "H3 · 20–24px", className: "text-h3 font-semibold text-ink", text: "Заголовок третьего уровня" },
      {
        label: "Body · 16–18px",
        className: "text-body leading-body text-muted",
        text: "Основной текст интерфейса. Деловой тон без метафор и пафоса.",
      },
      {
        label: "Small · 14px",
        className: "text-small text-muted",
        text: "Вторичные подписи, метки и служебные пояснения.",
      },
    ],
  },
  radiiShadows: {
    eyebrow: "Форма",
    title: "Радиусы и тени",
    description: "Радиусы 8 / 12 / 16 / 24. Тени мягкие и холодные.",
    radii: [
      { name: "sm · 8", className: "rounded-sm" },
      { name: "md · 12", className: "rounded-md" },
      { name: "lg · 16", className: "rounded-lg" },
      { name: "xl · 24", className: "rounded-xl" },
    ],
    shadows: [
      { name: "shadow-sm", className: "shadow-sm" },
      { name: "shadow-md", className: "shadow-md" },
      { name: "shadow-lg", className: "shadow-lg" },
    ],
  },
  buttons: {
    eyebrow: "Компоненты",
    title: "Button",
    description: "Варианты primary, secondary, ghost. Размеры md и lg. Min-height 44px.",
    primary: "Primary",
    secondary: "Secondary",
    ghost: "Ghost",
    link: "Как ссылка",
  },
  badges: {
    title: "Badge",
    brand: "Brand",
    accent: "Accent",
    neutral: "Neutral",
  },
  cards: {
    title: "Card",
    body: "Карточка на surface-card с border line, radius-lg и shadow-sm.",
  },
  headings: {
    title: "SectionHeading",
    eyebrow: "Секция",
    heading: "Заголовок секции",
    description: "Краткое описание блока для выравнивания left или center.",
  },
  sectionTones: {
    title: "Section · tone",
    sample: "Текст, карточка и кнопки наследуют цвет секции через CSS-переменные.",
    cardBody: "Карточка на --surface-card с рамкой --line.",
    items: [
      { tone: "white", label: "white" },
      { tone: "surface", label: "surface" },
      { tone: "brand-soft", label: "brand-soft" },
      { tone: "accent-soft", label: "accent-soft" },
      { tone: "gradient-soft", label: "gradient-soft" },
      { tone: "dark", label: "dark" },
      { tone: "brand", label: "brand" },
    ],
  },
  sectionPatterns: {
    title: "Section · pattern",
    sample: "Декор — абсолютный слой CSS без изображений.",
    items: [
      { pattern: "dots", label: "dots", tone: "surface" },
      { pattern: "grid", label: "grid", tone: "brand-soft" },
      { pattern: "diagonal", label: "diagonal", tone: "surface" },
      { pattern: "glow-top", label: "glow-top", tone: "white" },
      { pattern: "glow-side", label: "glow-side", tone: "dark" },
    ],
  },
  sectionGlow: {
    title: "GlowBlob",
    sample: "Размытое пятно brand или accent. Дрейф 24 с, только transform.",
  },
  sectionDividers: {
    title: "SectionDivider",
    sample: "Цвет заполнения берётся из следующего тона секции.",
    wave: "wave",
    curve: "curve",
    slant: "slant",
  },
  accordion: {
    title: "Accordion",
    items: [
      {
        title: "Что входит в дизайн-систему?",
        content:
          "Токены цвета, типографика, радиусы, тени и базовые UI-компоненты без привязки к маркетинговым секциям.",
      },
      {
        title: "Как устроены кнопки?",
        content:
          "Primary, secondary и ghost. Поддерживается href через next/link. Фокус видимый через ring brand.",
      },
      {
        title: "Почему страница noindex?",
        content:
          "Это служебная витрина для разработки. Её не нужно показывать в поисковой выдаче.",
      },
    ],
  },
  tabs: {
    title: "Tabs",
    items: [
      {
        id: "tokens",
        label: "Токены",
        content:
          "Цвета, радиусы и тени описаны CSS-переменными и проброшены в Tailwind theme.",
      },
      {
        id: "components",
        label: "Компоненты",
        content:
          "Container, Section, Button, Badge, Card, SectionHeading, Accordion и Tabs.",
      },
      {
        id: "a11y",
        label: "Доступность",
        content:
          "Accordion использует aria-expanded. Tabs — role=tablist и управление стрелками.",
      },
    ],
  },
  motion: {
    eyebrow: "Motion",
    title: "Анимация",
    description:
      "Примитивы появления, счётчики, marquee, spotlight и градиентная рамка. Уважают prefers-reduced-motion.",
    revealTitle: "Reveal",
    revealBody: "Блок появляется при входе в viewport: fade и сдвиг на 16px.",
    staggerTitle: "Stagger",
    staggerItems: ["Первый", "Второй", "Третий", "Четвёртый"],
    countTitle: "CountUp",
    countLabel: "Показатель",
    marqueeTitle: "Marquee",
    marqueeItems: ["Табель", "KPI", "Оргструктура", "Уведомления", "Отпуска"],
    spotlightTitle: "Spotlight",
    spotlightBody: "Подсветка следует за курсором на устройствах с hover.",
    gradientTitle: "GradientBorder",
    gradientBody: "Анимированная градиентная рамка на токенах brand и accent.",
    scrollTitle: "ScrollProgress",
    scrollBody: "Тонкая полоса прогресса чтения закреплена сверху страницы.",
    buttonTitle: "Button · hover",
    buttonLabel: "С бликом и стрелкой",
    cardTitle: "Card · hover",
    cardBody: "Подъём, тень md и смена цвета рамки при наведении.",
  },
  mocks: {
    eyebrow: "Mocks",
    title: "UI-макеты модулей",
    description:
      "Демонстрационные мини-интерфейсы на React и Tailwind. Данные выдуманные, анимация паузится вне viewport.",
  },
} as const;
