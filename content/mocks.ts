/** Демо-фикстуры для UI-моков. Данные выдуманные, без реальных ФИО. */

export const mockOrgChart = {
  levels: [
    [{ id: "ceo", initials: "Р. Д.", label: "Руководитель", tone: "brand" as const }],
    [
      { id: "hr", initials: "А. К.", label: "HR", tone: "brand" as const },
      { id: "ops", initials: "М. С.", label: "Операции", tone: "neutral" as const },
    ],
    [
      { id: "sales", initials: "Е. В.", label: "Продажи", tone: "neutral" as const },
      { id: "support", initials: "И. Н.", label: "Поддержка", tone: "neutral" as const },
      { id: "fin", initials: "О. П.", label: "Финансы", tone: "neutral" as const },
    ],
  ],
  highlightOrder: ["ceo", "hr", "sales", "ops", "support", "fin"],
} as const;

export const mockTimesheet = {
  days: ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"],
  legend: {
    work: "Работал",
    vacation: "Отпуск",
    sick: "Больничный",
  },
  rows: [
    {
      initials: "А. К.",
      cells: ["work", "work", "vacation", "vacation", "work", "off", "off"] as const,
    },
    {
      initials: "М. С.",
      cells: ["work", "work", "work", "sick", "sick", "off", "off"] as const,
    },
    {
      initials: "Е. В.",
      cells: ["work", "work", "work", "work", "work", "off", "off"] as const,
    },
  ],
} as const;

export const mockKpi = {
  cards: [
    {
      label: "Найм",
      value: "18",
      suffix: "",
      points: [4, 6, 5, 8, 7, 10, 12],
    },
    {
      label: "Текучесть",
      value: "4.2",
      suffix: "%",
      points: [8, 7, 7, 6, 5, 5, 4],
    },
    {
      label: "Онбординг",
      value: "92",
      suffix: "%",
      points: [70, 74, 78, 82, 86, 90, 92],
    },
  ],
} as const;

export const mockRecruit = {
  columns: [
    { id: "new", title: "Новые", count: 4 },
    { id: "screen", title: "Скрининг", count: 4 },
    { id: "interview", title: "Интервью", count: 3 },
    { id: "offer", title: "Оффер", count: 3 },
  ],
  cards: [
    {
      id: "c1",
      column: "new",
      title: "Кандидат 1",
      meta: "Продажи · филиал",
      tag: "Новый",
      initials: "К1",
      lines: 2,
    },
    {
      id: "c2",
      column: "new",
      title: "Кандидат 2",
      meta: "Поддержка",
      tag: "Резюме",
      initials: "К2",
      lines: 1,
    },
    {
      id: "c3",
      column: "new",
      title: "Кандидат 3",
      meta: "Склад",
      tag: "Новый",
      initials: "К3",
      lines: 2,
    },
    {
      id: "c4",
      column: "screen",
      title: "Кандидат 4",
      meta: "HR",
      tag: "Звонок",
      initials: "К4",
      lines: 1,
    },
    {
      id: "c5",
      column: "screen",
      title: "Кандидат 5",
      meta: "IT",
      tag: "Тест",
      initials: "К5",
      lines: 3,
    },
    {
      id: "c6",
      column: "screen",
      title: "Кандидат 6",
      meta: "Финансы",
      tag: "Звонок",
      initials: "К6",
      lines: 1,
    },
    {
      id: "c7",
      column: "interview",
      title: "Кандидат 7",
      meta: "Операции",
      tag: "1-й этап",
      initials: "К7",
      lines: 2,
    },
    {
      id: "c8",
      column: "interview",
      title: "Кандидат 8",
      meta: "Продажи",
      tag: "2-й этап",
      initials: "К8",
      lines: 1,
    },
    {
      id: "c9",
      column: "offer",
      title: "Кандидат 9",
      meta: "Поддержка",
      tag: "Оффер",
      initials: "К9",
      lines: 2,
    },
    {
      id: "c10",
      column: "offer",
      title: "Кандидат 10",
      meta: "IT",
      tag: "Согласование",
      initials: "К10",
      lines: 1,
    },
    {
      id: "moving",
      column: "new",
      title: "Кандидат 11",
      meta: "Операции",
      tag: "В работе",
      initials: "К11",
      lines: 2,
    },
  ],
  movingPath: ["new", "screen", "interview", "offer"] as const,
} as const;

export const mockManagerApprovals = {
  title: "Заявки на согласование",
  approveLabel: "Согласовать",
  items: [
    {
      id: "a1",
      title: "Заявка · Отпуск",
      meta: "Сотрудник А · 5 дней",
      status: "Ожидает",
      statusTone: "warn" as const,
    },
    {
      id: "a2",
      title: "Заявка · Удалённый день",
      meta: "Сотрудник Б · пятница",
      status: "Ожидает",
      statusTone: "warn" as const,
    },
    {
      id: "a3",
      title: "Заявка · Перенос смены",
      meta: "Сотрудник В · филиал",
      status: "Согласовано",
      statusTone: "ok" as const,
    },
    {
      id: "a4",
      title: "Заявка · Отгул",
      meta: "Сотрудник Г · 1 день",
      status: "Ожидает",
      statusTone: "warn" as const,
    },
  ],
} as const;

export const mockEmployeePhone = {
  checkIn: {
    label: "Отметка прихода",
    status: "Вы на месте",
    time: "09:12",
    action: "Отметить выход",
  },
  leave: {
    label: "Заявка на отпуск",
    dates: "12–16 мая",
    status: "На согласовании",
  },
  feedTitle: "Новости",
  feed: [
    { id: "n1", title: "Обновление графика смен", meta: "Сегодня" },
    { id: "n2", title: "Напоминание о курсе онбординга", meta: "Вчера" },
    { id: "n3", title: "Итоги недели по филиалу", meta: "Пн" },
  ],
} as const;

export const mockLearning = {
  coverLabel: "Курс",
  title: "Онбординг руководителя филиала",
  badge: "В процессе",
  progressLabel: "Прогресс",
  progress: 68,
  modulesDone: "5 из 8 модулей",
} as const;

export const mockTasks = {
  items: [
    { id: "t1", title: "Согласовать отпуск", assignee: "А. К." },
    { id: "t2", title: "Проверить табель филиала", assignee: "М. С." },
    { id: "t3", title: "Назначить курс онбординга", assignee: "Е. В." },
    { id: "t4", title: "Обновить карточку должности", assignee: "И. Н." },
  ],
} as const;

export const mockEngage = {
  posts: [
    {
      id: "p1",
      author: "Команда HR",
      text: "Запуск программы наставничества в филиалах.",
      reactions: ["12", "4"],
    },
    {
      id: "p2",
      author: "Операции",
      text: "Итоги квартала: лучшие практики смены.",
      reactions: ["9", "6"],
    },
  ],
  awardLabel: "Награда получена",
  awardText: "Значок «Наставник месяца»",
} as const;
