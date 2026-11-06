import type {
  A11yCopy,
  AnnouncementBarContent,
  BreadcrumbsCopy,
  CasesSection,
  ComparisonSection,
  CtaSection,
  FaqSection,
  FeaturesSection,
  FooterContent,
  Hero,
  InterfacesSection,
  ModulePageCopy,
  ModulesHubContent,
  ModulesMegaCopy,
  ModulesSection,
  Nav,
  PainsSection,
  PricingSection,
  RoleSwitcherSection,
  Site,
  StepsSection,
  TrustStripContent,
} from "@/content/types";

export const site: Site = {
  name: "Jupiter HR",
  title:
    "Jupiter HR — HR-система для компаний с филиалами: найм, табель, KPI, обучение",
  // ≤160 символов
  description:
    "Единая HR-система для сетей с филиалами: найм, табель, KPI, обучение и документооборот в одном контуре.",
  url: "https://jupiterhr.uz",
  // DEMO: подтвердить перед продом
  phone: { value: "+992 92 797 77 13" },
  // DEMO: подтвердить перед продом
  telegram: { value: "@jupiterhr", label: "Telegram" },
  // DEMO: подтвердить перед продом
  email: { value: "hello@jupiterhr.uz" },
};

/** Alias для страниц модулей и API. */
export const brand = {
  name: "Jupiter",
  product: "HR",
  full: site.name,
};

export const nav: Nav = {
  items: [
    { label: "Модули", href: "/modules", mega: "modules" },
    { label: "Интерфейсы", href: "/#interfaces" },
    { label: "Внедрение", href: "/#process" },
    { label: "Тарифы", href: "/#pricing" },
    { label: "FAQ", href: "/#faq" },
  ],
  cta: { label: "Запросить демо", href: "/#demo" },
  // DEMO: подтвердить URL входа перед продом
  login: { label: "Войти", href: "https://app.jupiterhr.uz" },
};

export const modulesMega: ModulesMegaCopy = {
  allLabel: "Все модули",
  allHref: "/modules",
  panelLabel: "Модули Jupiter HR",
};

export const a11y: A11yCopy = {
  navLabel: "Навигация",
  openMenu: "Открыть меню",
  closeMenu: "Закрыть меню",
  skipToContent: "Перейти к содержимому",
  backToTop: "Наверх",
};

/** DEMO: подтвердить текст объявления перед продом */
export const announcement: AnnouncementBarContent = {
  text: "Пилот Jupiter HR: покажем модули на ваших сценариях — запишитесь на демо.",
  dismissLabel: "Закрыть",
};

export const hero: Hero = {
  eyebrow: "HR-платформа для компаний с филиалами",
  title: "Jupiter HR убирает табель из Excel по всем филиалам",
  headlinePrefix: "Jupiter HR",
  headlineSuffix: "по всем филиалам",
  rotating: [
    "убирает табель из Excel",
    "собирает кадры в одном месте",
    "ведёт найм не в чатах",
    "снимает ручные отчёты",
  ],
  rotateMs: 3000,
  subtitle:
    "Единая база сотрудников для сетей с филиалами: админка, портал и мобильное приложение.",
  primaryCta: "Запросить демо",
  primaryHref: "/#demo",
  secondaryCta: "Смотреть модули",
  secondaryHref: "/modules",
  note: "Демо 30 минут на ваших сценариях · Без обязательств",
  facts: [
    "6 модулей на одной базе данных",
    "Доступы по филиалам и ролям",
    "Пилот без долгого внедрения",
  ],
  desktopCaption: "Админка · аналитика",
  mobileCaption: "Мобильный табель",
};

export const trustStrip: TrustStripContent = {
  id: "trust",
  // Логотипов клиентов нет — не выдумываем.
  logos: {
    placeholder: true,
    items: [],
  },
  facts: [
    {
      title: "Роли и доступы по филиалам",
      icon: "Shield",
    },
    {
      title: "Мобильное приложение для сотрудников",
      icon: "Smartphone",
    },
    // DEMO: подтвердить формулировку API перед продом
    {
      title: "Открытое API",
      icon: "Code2",
    },
    // DEMO: подтвердить формулировку про контроль данных
    {
      title: "Данные под вашим контролем",
      icon: "Lock",
    },
  ],
};

export const pains: PainsSection = {
  id: "pains",
  eyebrow: "Задачи HR",
  title: "Знакомые проблемы — решение в системе",
  text: "От Excel и чатов к единому контуру по филиалам.",
  wasLabel: "Было",
  becameLabel: "Стало",
  resultLabel: "Результат",
  moduleLinkPrefix: "Модуль «",
  moduleLinkSuffix: "» →",
  demoPrompt: "Узнали свои процессы? Покажем, как это выглядит в системе",
  demoCta: "Запросить демо",
  demoHref: "/#demo",
  items: [
    // DEMO: подтвердить формулировку result перед продом
    {
      was: "Табель и отпуска в Excel",
      became: "Учёт времени, заявки и согласования в системе",
      result: "Один табель по филиалам вместо свода таблиц в конце месяца",
      moduleSlug: "time",
      wasIcon: "FileSpreadsheet",
      becameIcon: "Clock",
    },
    {
      was: "Данные о людях в разных файлах",
      became: "Единая карточка сотрудника и оргструктура",
      result: "Единый реестр людей для HQ и локаций без сверки файлов",
      moduleSlug: "organization",
      wasIcon: "FolderX",
      becameIcon: "Network",
    },
    {
      was: "Найм в мессенджерах и таблицах",
      became: "Вакансии и воронка подбора в одном месте",
      result: "Статусы кандидатов не теряются между рекрутером и филиалом",
      moduleSlug: "recruiting",
      wasIcon: "MessageSquareX",
      becameIcon: "UserSearch",
    },
    {
      was: "Отчёты собирают вручную",
      became: "KPI и аналитика по отделам и филиалам",
      result: "Сводка по отделу рядом с фактом присутствия, без ручной сборки",
      moduleSlug: "time",
      wasIcon: "ClipboardList",
      becameIcon: "ChartColumn",
    },
  ],
};

export const roleSwitcher: RoleSwitcherSection = {
  id: "roles",
  eyebrow: "Роли",
  title: "Один продукт — разные сценарии",
  text: "Выберите роль, чтобы увидеть, что важно именно вам.",
  changeLabel: "Что меняется",
  demoDataCaption: "Демо-данные",
  autoIntervalMs: 7000,
  modulesHref: "/modules",
  roles: [
    {
      id: "hr",
      label: "HR-менеджер",
      description: "База людей, найм и процессы сети",
      headline: "Что получает HR-менеджер",
      icon: "Users",
      benefits: [
        {
          icon: "Network",
          text: "Единая база сотрудников и оргструктура по филиалам",
        },
        {
          icon: "UserSearch",
          text: "Вакансии и воронка подбора в одном контуре",
        },
        {
          icon: "Clock",
          text: "Табель, отпуска и заявки без свода Excel",
        },
        {
          icon: "GraduationCap",
          text: "Обучение и коммуникации на той же базе людей",
        },
      ],
      change: {
        before: "Справочники, найм и табель в разных файлах и чатах",
        after: "Один контур: люди, воронка и учёт времени",
      },
      moduleSlugs: [
        "organization",
        "recruiting",
        "time",
        "lms",
        "engagement",
        "tasks-docs",
      ],
      ctaLabel: "Запросить демо",
      ctaHref: "/#demo",
      modulesCtaLabel: "Модули для этой роли →",
    },
    {
      id: "manager",
      label: "Руководитель",
      description: "Команда, согласования и показатели отдела",
      headline: "Что получает руководитель",
      icon: "Briefcase",
      benefits: [
        {
          icon: "ChartColumn",
          text: "KPI и сводка по отделу рядом с присутствием команды",
        },
        {
          icon: "Shield",
          text: "Доступ только к своему филиалу или поддереву",
        },
        {
          icon: "ClipboardList",
          text: "Согласование заявок без цепочек в почте",
        },
        {
          icon: "Building2",
          text: "Оргсхема и задачи команды в одном продукте",
        },
      ],
      change: {
        before: "Согласования в переписке, KPI в отдельной таблице",
        after: "Заявки и показатели отдела в одном экране",
      },
      moduleSlugs: ["organization", "time", "recruiting", "tasks-docs"],
      ctaLabel: "Запросить демо",
      ctaHref: "/#demo",
      modulesCtaLabel: "Модули для этой роли →",
    },
    {
      id: "employee",
      label: "Сотрудник",
      description: "Отметки, отпуска и новости с телефона",
      headline: "Что получает сотрудник",
      icon: "User",
      benefits: [
        {
          icon: "Smartphone",
          text: "Отметка входа и выхода в мобильном приложении",
        },
        {
          icon: "Calendar",
          text: "Заявка на отпуск с понятным статусом согласования",
        },
        {
          icon: "Bell",
          text: "Новости компании в том же приложении",
        },
        {
          icon: "GraduationCap",
          text: "Курсы и материалы без отдельного логина",
        },
      ],
      change: {
        before: "Отметки в чате, отпуск через почту, новости в рассылках",
        after: "Табель, заявки и лента в одном приложении",
      },
      moduleSlugs: ["time", "engagement", "lms", "tasks-docs"],
      ctaLabel: "Запросить демо",
      ctaHref: "/#demo",
      modulesCtaLabel: "Модули для этой роли →",
    },
  ],
};

export const modules: ModulesSection = {
  id: "modules",
  eyebrow: "Продукт",
  title: "6 модулей на единой базе сотрудников",
  text: "Подключайте только то, что нужно сейчас. Остальное включается без повторного внедрения",
  schemaCenter: "Единая база сотрудников",
  demoPrompt: "Не знаете, с чего начать? Покажем на демо",
  demoCta: "Запросить демо",
  demoHref: "/#demo",
  cardCtaLabel: "Подробнее о модуле →",
  whyConnectLabel: "Почему подключить",
};

export const modulesHub: ModulesHubContent = {
  seo: {
    title: "Модули Jupiter HR — подбор по задачам и ролям",
    description:
      "Сравните модули Jupiter HR по задачам и ролям: организация, рекрутинг, табель, вовлечённость, обучение, задачи и документы.",
  },
  eyebrow: "Модули",
  title: "Подберите модули под задачи сети",
  text: "Шесть модулей на одной базе сотрудников. Подключайте нужное сейчас — остальное без повторного внедрения.",
  demoCta: "Подобрать набор на демо",
  demoHref: "/#demo",
  tasksEyebrow: "По задачам",
  tasksTitle: "Что хотите автоматизировать",
  tasksText: "Сопоставьте задачу с модулем и откройте подробную страницу.",
  tasksWantLabel: "Задача",
  tasksModuleLabel: "Модуль",
  tasks: [
    {
      want: "Хочу единую базу сотрудников и оргструктуру",
      moduleSlug: "organization",
    },
    {
      want: "Хочу вести найм без хаоса в таблицах",
      moduleSlug: "recruiting",
    },
    {
      want: "Хочу автоматизировать табель",
      moduleSlug: "time",
    },
    {
      want: "Хочу новости, идеи и заявки в одном месте",
      moduleSlug: "engagement",
    },
    {
      want: "Хочу курсы и развитие внутри платформы",
      moduleSlug: "lms",
    },
    {
      want: "Хочу задачи и документы в одном контуре",
      moduleSlug: "tasks-docs",
    },
  ],
  rolesEyebrow: "По роли",
  rolesTitle: "Какие модули полезны вашей роли",
  rolesText: "Набор опирается на аудиторию модулей — без выдуманных метрик.",
  roles: [
    {
      id: "hr",
      label: "HR и кадры",
      text: "База людей, найм, табель, обучение и коммуникации сети.",
      moduleSlugs: [
        "organization",
        "recruiting",
        "time",
        "lms",
        "engagement",
        "tasks-docs",
      ],
    },
    {
      id: "manager",
      label: "Руководитель",
      text: "Оргструктура, табель команды, вакансии и рабочие задачи.",
      moduleSlugs: ["organization", "time", "recruiting", "tasks-docs"],
    },
    {
      id: "employee",
      label: "Сотрудник",
      text: "Отпуска и отметки, новости, обучение и задачи в портале.",
      moduleSlugs: ["time", "engagement", "lms", "tasks-docs"],
    },
  ],
  openModuleLabel: "Открыть →",
  bottomDemoTitle: "Не уверены в наборе?",
  bottomDemoText:
    "На демо разберём структуру филиалов и подскажем, с каких модулей начать.",
  bottomDemoCta: "Подобрать набор на демо",
};

export const interfaces: InterfacesSection = {
  id: "interfaces",
  eyebrow: "Платформа",
  title: "Один контур — три интерфейса",
  text: "Админка, портал сотрудника и мобильное приложение работают на одной базе данных о людях.",
  demoCta: "Запросить демо",
  demoHref: "/#demo",
  items: [
    {
      id: "admin",
      label: "Админка",
      title: "Админка для HR и руководителей",
      description:
        "Рабочее место для HR и руководителей: реестр, найм, табель и аналитика по филиалам.",
      points: [
        "Реестр сотрудников",
        "Найм и воронка",
        "Табель и KPI",
        "Аналитика по филиалам",
      ],
    },
    {
      id: "portal",
      label: "Портал сотрудника",
      title: "Портал сотрудника",
      description:
        "Единый вход для сотрудников: профиль, рабочее время, задачи и обучение.",
      points: [
        "Профиль и коллеги",
        "Рабочее время",
        "Задачи и поручения",
        "Обучение и награды",
      ],
    },
    {
      id: "mobile",
      label: "Мобильное приложение",
      title: "Мобильное приложение",
      description:
        "Для сотрудников в поле и на смене: отметка, заявки и новости в телефоне.",
      points: [
        "Отметка времени",
        "Заявки и согласования",
        "Новости компании",
        "Профиль и уведомления",
      ],
      // TODO: убрать бейдж, когда приложение в сторах
      badge: "Скоро в App Store и Google Play",
    },
  ],
};

export const features: FeaturesSection = {
  id: "features",
  eyebrow: "Возможности",
  title: "Что важно для запуска",
  text: "Базовые возможности платформы для сетей с филиалами и ролями.",
  comingSoonLabel: "Скоро",
  facts: [
    { value: 6, label: "модулей" },
    { value: 3, label: "интерфейса" },
    { value: 1, label: "база сотрудников" },
  ],
  visualDemo: {
    rbac: { network: "Сеть", branch: "Филиал", dept: "Отдел" },
    audit: {
      lines: [
        "Сотрудник А изменил график · 10:42",
        "Сотрудник Б обновил карточку · 11:05",
        "Сотрудник В согласовал отпуск · 11:18",
      ],
    },
    import: { progressLabel: "Импорт справочника" },
    api: {
      lines: ["GET /v1/employees", "Authorization: Bearer ••••"],
    },
    kpi: { points: [4, 6, 5, 8, 7, 10, 12] },
    mobile: { checkLabel: "Готово" },
  },
  items: [
    {
      title: "Доступ по филиалам и ролям (RBAC)",
      text: "HQ видит сеть, филиал — своё поддерево.",
      icon: "Shield",
      visual: "rbac",
    },
    // DEMO: подтвердить аудит и бейдж «Скоро» перед продом
    {
      title: "Аудит действий",
      text: "Кто, что и когда изменил: история действий по записям",
      icon: "Lock",
      visual: "audit",
      badge: { label: "Скоро" },
    },
    // DEMO: подтвердить импорт и бейдж «Скоро» перед продом
    {
      title: "Импорт из Excel",
      text: "Загрузите сотрудников и справочники из таблиц без ручного ввода",
      icon: "FileStack",
      visual: "import",
      badge: { label: "Скоро" },
    },
    // DEMO: подтвердить API и бейдж «Скоро» перед продом
    {
      title: "Открытое API",
      text: "Подключайте учётные системы и аналитику через API",
      icon: "Code2",
      visual: "api",
      badge: { label: "Скоро" },
    },
    {
      title: "Отчёты и KPI",
      text: "Показатели по отделам и филиалам.",
      icon: "ChartColumn",
      visual: "kpi",
    },
    {
      title: "Мобильный доступ",
      text: "Отметка и заявки в приложении.",
      icon: "Smartphone",
      visual: "mobile",
    },
  ],
};

export const comparison: ComparisonSection = {
  id: "comparison",
  eyebrow: "Сравнение",
  title: "Excel и набор сервисов vs Jupiter HR",
  text: "Пять критериев, по которым обычно сравнивают контур HR.",
  criterionTitle: "Критерий",
  leftTitle: "Excel и набор сервисов",
  rightTitle: "Jupiter HR",
  // TODO: проверить формулировки сравнения по продукту
  rows: [
    {
      criterion: "Единая база сотрудников",
      // TODO: уточнить формулировку для Excel-колонки
      left: "Файлы и разные системы",
      right: "Одна карточка и оргструктура",
    },
    {
      criterion: "Доступы по филиалам и ролям",
      // TODO: проверить формулировку RBAC/scope
      left: "Вручную и по договорённости",
      right: "RBAC и scope по филиалам",
    },
    {
      criterion: "Табель, отпуска и заявки",
      // TODO: проверить формулировку процессов в системе
      left: "Таблицы и переписки",
      right: "Процессы в системе",
    },
    {
      criterion: "Найм и воронка",
      // TODO: проверить формулировку воронки
      left: "Мессенджеры и таблицы",
      right: "Вакансии и воронка в одном месте",
    },
    {
      criterion: "Отчёты и KPI",
      // TODO: проверить формулировку аналитики
      left: "Сбор вручную",
      right: "Аналитика по отделам и филиалам",
    },
  ],
};

export const steps: StepsSection = {
  id: "process",
  eyebrow: "Как внедряем",
  title: "Четыре шага до запуска",
  text: "Пилот за дни, не месяцы. Включаете только нужные модули.",
  items: [
    // DEMO: сроки приблизительные — подтвердить перед продом
    {
      title: "Демо",
      text: "Покажем сценарии на вашей структуре",
      timing: "30–60 минут",
    },
    {
      title: "Настройка",
      text: "Филиалы, роли, справочники, импорт",
      timing: "1–5 рабочих дней",
    },
    {
      title: "Запуск",
      text: "Включаем модули и открываем доступ",
      timing: "до 2 недель на пилот",
    },
    {
      title: "Поддержка",
      text: "Сопровождение и развитие процессов",
      timing: "по договору",
    },
  ],
};

export const cases: CasesSection = {
  id: "cases",
  eyebrow: "Кейсы",
  title: "Как компании запускают Jupiter HR",
  text: "Типовые сценарии сетей с филиалами. Детали разберём на демо.",
  taskLabel: "Задача",
  solutionLabel: "Решение",
  metricsLabel: "Результат",
  readCta: "Запросить похожий сценарий",
  // DEMO: анонимные сценарии без чужих брендов и точных метрик
  items: [
    {
      company: "Розничная сеть · 12 филиалов",
      task: "Собрать табель и отпуска из Excel по городам в один контур.",
      solution:
        "Запустили «Организацию» и «Учёт времени»: филиалы, роли и check-in в приложении.",
      metrics: [
        "Один табель для HQ и локаций",
        "Отпуска согласуются в системе",
        "Меньше переписки в чатах о присутствии",
      ],
      href: "/#demo",
    },
    {
      company: "Сервисная компания · несколько городов",
      task: "Убрать найм из таблиц и мессенджеров при росте штата.",
      solution:
        "Подключили рекрутинг на общей оргструктуре и вводные курсы в LMS после оффера.",
      metrics: [
        "Воронка вакансий в одном месте",
        "Кандидат быстрее попадает в базу сотрудников",
        "Онбординг стартует без смены системы",
      ],
      href: "/#demo",
    },
  ],
};

export const faq: FaqSection = {
  id: "faq",
  eyebrow: "Вопросы",
  title: "Частые вопросы",
  items: [
    {
      q: "Нужна ли отдельная система для сотрудников и для HR?",
      a: "Нет. Jupiter HR — единый продукт с тремя интерфейсами: административная панель, портал сотрудника и мобильное приложение.",
    },
    // DEMO: сроки приблизительные — подтвердить перед продом
    {
      q: "Сколько длится внедрение?",
      a: "Пилот обычно занимает от нескольких дней до пары недель: структура, роли, импорт сотрудников и включение модулей.",
    },
    {
      q: "Можно ли ограничить доступ по филиалам?",
      a: "Да. Роли и scope позволяют HQ видеть всё, а филиалам — только своё поддерево.",
    },
    // DEMO: подтвердить хранение и аудит перед продом
    {
      q: "Где хранятся данные и есть ли аудит?",
      a: "Данные ведутся в контуре платформы. Важные действия фиксируются в журнале, права — через роли и область видимости по филиалам.",
    },
    {
      q: "Можно ли перенести данные из Excel?",
      a: "Да, при запуске можно импортировать сотрудников и справочники. Состав полей согласуем на демо.",
    },
    {
      q: "Есть ли обучение сотрудников внутри системы?",
      a: "Да, встроенный LMS: курсы, категории, траектории и отчёты по прогрессу.",
    },
    // DEMO: подтвердить модель оплаты перед продом
    {
      q: "Как устроена оплата?",
      a: "Тарифы зависят от масштаба запуска и набора модулей. Детали согласуем после демо.",
    },
    {
      q: "Как запросить демо?",
      a: "Оставьте заявку в форме ниже — согласуем удобное время и сценарии под вашу компанию.",
    },
  ],
};

export const cta: CtaSection = {
  id: "demo",
  eyebrow: "Демо",
  title: "Покажем Jupiter HR на ваших сценариях",
  text: "Разберём структуру, модули и доступы. Ближайшие слоты ограничиваем, чтобы встреча оставалась предметной.",
  benefits: [
    "Покажем на ваших сценариях",
    "Ответим в течение рабочего дня",
    "Без обязательств",
  ],
  secondaryCta: "Смотреть модули",
  secondaryHref: "/modules",
  telegramCta: "Связаться в Telegram",
  telegramLeadTitle: "Заявка на демо Jupiter HR",
  form: {
    name: "Имя",
    contact: "Телефон или email",
    company: "Компания",
    companySize: "Размер компании",
    companySizeOptions: [
      { value: "lt50", label: "до 50" },
      { value: "50-200", label: "50–200" },
      { value: "200-1000", label: "200–1000" },
      { value: "gt1000", label: "более 1000" },
    ],
    consent:
      "Согласен на обработку персональных данных для связи по заявке на демо.",
    consentPrefix: "Согласен с",
    consentLinkLabel: "политикой конфиденциальности",
    submit: "Запросить демо",
    submitting: "Отправляем…",
    success: "Заявка принята. Мы свяжемся с вами в ближайшее время.",
    error: "Не удалось отправить заявку. Попробуйте ещё раз или напишите нам.",
    validationError: "Заполните обязательные поля и подтвердите согласие.",
    rateLimitError: "Слишком много заявок. Подождите немного и попробуйте снова.",
    namePlaceholder: "Анна",
    contactPlaceholder: "+992… или anna@company.com",
    companyPlaceholder: "Название компании",
    honeypotLabel: "Сайт",
  },
};

/** Alias для совместимости с Demo / Footer / API. */
export const demo = cta;

export const footer: FooterContent = {
  tagline:
    "Корпоративная HR-платформа: модули, роли и реальные процессы в одном контуре.",
  columns: [
    {
      title: "Продукт",
      links: [
        { label: "Модули", href: "/modules" },
        { label: "Интерфейсы", href: "/#interfaces" },
        { label: "Внедрение", href: "/#process" },
        { label: "Тарифы", href: "/#pricing" },
        { label: "FAQ", href: "/#faq" },
        { label: "Демо", href: "/#demo" },
      ],
    },
    {
      title: "Модули",
      fromModules: true,
      links: [],
    },
    {
      title: "Компания",
      links: [
        // DEMO: отдельной страницы ещё нет
        { label: "О компании", href: "/#process" },
        { label: "Контакты", href: "/#demo" },
      ],
    },
    {
      title: "Документы",
      links: [
        // DEMO: страниц документов ещё нет
        { label: "Политика конфиденциальности", href: "/#demo" },
        { label: "Оферта", href: "/#demo" },
      ],
    },
  ],
  rights: "Все права защищены.",
  // DEMO: реквизиты-заглушка — заменить перед продом
  legal: { text: "ООО «Jupiter» · Узбекистан" },
  privacy: {
    label: "Политика конфиденциальности",
    href: "/#demo",
  },
  offer: {
    label: "Оферта",
    href: "/#demo",
  },
};

export const pricing: PricingSection = {
  id: "pricing",
  eyebrow: "Тарифы",
  title: "Выберите масштаб запуска",
  text: "Подписка: лицензия и поддержка. Подключаете нужные модули и масштабируете по мере роста.",
  paymentNote:
    "Оплата — подписка за сотрудников: в тариф входят лицензия на платформу и поддержка. При оплате за год — скидка 20%. Детали и объём внедрения согласуем на демо.",
  matrixTitle: "Модули и функции по тарифам",
  matrixYes: "Включено",
  matrixNo: "Нет",
  matrixPartial: "По согласованию",
  billing: {
    monthLabel: "В месяц",
    yearLabel: "В год",
    yearDiscountPercent: 20,
    yearDiscountNote: "−20% при оплате за год",
    priceUnitMonth: "за сотрудника в месяц",
    priceUnitYear: "за сотрудника в год",
  },
  plans: [
    {
      id: "start",
      name: "Старт",
      audience: "Для пилота и небольших команд",
      // TODO: указать подтверждённую цену и валюту
      price: "Уточним на демо",
      priceUnit: "за сотрудника в месяц",
      features: [
        "База сотрудников и оргструктура",
        "Роли и доступ по филиалам",
        "Учёт рабочего времени",
        "Мобильное приложение",
        "Базовая поддержка",
        "Помощь при запуске пилота",
      ],
      cta: { label: "Начать пилот", href: "/#demo" },
    },
    {
      id: "business",
      name: "Бизнес",
      audience: "Для сетей с филиалами и HR-командой",
      // TODO: указать подтверждённую цену и валюту
      price: "Уточним на демо",
      priceUnit: "за сотрудника в месяц",
      badge: "Популярный",
      featured: true,
      features: [
        "Всё из тарифа «Старт»",
        "Рекрутинг и воронка найма",
        "Вовлечённость и коммуникации",
        "Обучение (LMS)",
        "Задачи и документооборот",
        "Отчёты и KPI по филиалам",
        "Расширенная поддержка",
      ],
      cta: { label: "Запросить демо", href: "/#demo" },
    },
    {
      id: "enterprise",
      name: "Enterprise",
      audience: "Для крупных организаций и кастомных процессов",
      price: "По запросу",
      priceUnit: "индивидуальные условия",
      features: [
        "Все модули платформы",
        "Индивидуальный состав и интеграции",
        "Приоритетная поддержка",
        "Согласованный SLA",
        "Онбординг и обучение команд",
        "Сопровождение внедрения",
        "Расширенные права и контуры",
      ],
      cta: { label: "Связаться с нами", href: "/#demo" },
    },
  ],
  // TODO: подтвердить состав модулей по тарифам с продуктом
  matrix: [
    {
      feature: "Организация и кадры",
      start: "yes",
      business: "yes",
      enterprise: "yes",
    },
    {
      feature: "Учёт времени",
      start: "yes",
      business: "yes",
      enterprise: "yes",
    },
    {
      feature: "Мобильное приложение",
      start: "yes",
      business: "yes",
      enterprise: "yes",
    },
    {
      feature: "Доступ по филиалам и ролям (RBAC)",
      start: "partial",
      business: "yes",
      enterprise: "yes",
    },
    {
      feature: "Рекрутинг",
      start: "no",
      business: "yes",
      enterprise: "yes",
    },
    {
      feature: "Вовлечённость",
      start: "no",
      business: "yes",
      enterprise: "yes",
    },
    {
      feature: "Обучение (LMS)",
      start: "no",
      business: "yes",
      enterprise: "yes",
    },
    {
      feature: "Задачи и документооборот",
      start: "no",
      business: "yes",
      enterprise: "yes",
    },
    {
      feature: "Индивидуальные интеграции",
      start: "no",
      business: "partial",
      enterprise: "yes",
    },
  ],
};

export const breadcrumbs: BreadcrumbsCopy = {
  ariaLabel: "Хлебные крошки",
  home: "Главная",
  homeHref: "/",
  modules: "Модули",
  modulesHref: "/modules",
};

export const modulePageCopy: ModulePageCopy = {
  problemEyebrow: "Проблемы",
  problemTitle: "Какие проблемы решает",
  solutionEyebrow: "Решение",
  solutionTitle: "Как работает в Jupiter HR",
  featuresEyebrow: "Возможности",
  featuresTitle: "Что есть в модуле",
  screensEyebrow: "Экраны системы",
  screensTitle: "Страницы модуля",
  rolesEyebrow: "Для кого",
  rolesTitle: "Кому помогает модуль",
  faqEyebrow: "FAQ модуля",
  faqTitlePrefix: "Вопросы по «",
  faqTitleSuffix: "»",
  relatedEyebrow: "Связанные модули",
  relatedTitle: "Смотрите также",
  relatedOpen: "Открыть →",
  demoTitlePrefix: "Разберём «",
  demoTitleSuffix: "» на демо",
  demoText:
    "Покажем экраны модуля на ваших сценариях и как он стыкуется с остальным контуром.",
  demoCta: "Запросить демо",
  allModulesCta: "Все модули",
  allModulesHref: "/modules",
  demoHref: "#demo",
  screenPlaceholderHint: "Превью экрана системы",
  wasLabel: "Было",
  becameLabel: "Стало",
  purposeEyebrow: "Зачем",
  purposeTitle: "Зачем нужен модуль",
  advantagesEyebrow: "Сильные стороны",
  advantagesTitle: "Преимущества",
  whyEyebrow: "Подключение",
  whyTitle: "Почему стоит подключить",
  whyResultTitle: "Ожидаемый результат",
  scenarioEyebrow: "Сценарий",
  scenarioTitleFallback: "Как это работает",
  integrationsEyebrow: "Экосистема",
  integrationsTitle: "Работает вместе с другими модулями",
  nextModuleLabel: "Следующий модуль →",
  stickyNavLabel: "Разделы страницы",
  stickyNav: [
    { id: "purpose", label: "Зачем" },
    { id: "problems", label: "Проблемы" },
    { id: "advantages", label: "Преимущества" },
    { id: "why", label: "Почему" },
    { id: "features", label: "Возможности" },
    { id: "scenario", label: "Сценарий" },
    { id: "integrations", label: "Связи" },
    { id: "faq", label: "FAQ" },
    { id: "demo", label: "Демо" },
  ],
};
