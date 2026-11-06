export type ProductScreen = {
  id: string;
  src: string;
  alt: string;
  kind: "desktop" | "mobile";
};

export const productScreens = {
  adminRecruiting: {
    id: "admin-recruiting",
    src: "/screenshots/admin-recruiting.png",
    alt: "Админка: рекрутинг",
    kind: "desktop",
  },
  adminTimesheet: {
    id: "admin-timesheet",
    src: "/screenshots/admin-timesheet.png",
    alt: "Админка: табель учёта времени",
    kind: "desktop",
  },
  adminBranches: {
    id: "admin-branches",
    src: "/screenshots/admin-branches.png",
    alt: "Админка: филиалы",
    kind: "desktop",
  },
  adminConstructor: {
    id: "admin-constructor",
    src: "/screenshots/admin-constructor.png",
    alt: "Админка: конструктор брендинга",
    kind: "desktop",
  },
  adminRequests: {
    id: "admin-requests",
    src: "/screenshots/admin-requests.png",
    alt: "Админка: заявки сотрудников",
    kind: "desktop",
  },
  adminStats: {
    id: "admin-stats",
    src: "/screenshots/admin-stats.webp",
    alt: "Админка: аналитика Insights Engine",
    kind: "desktop",
  },
  platformHome: {
    id: "platform-home",
    src: "/screenshots/platform-home-dark.png",
    alt: "Портал сотрудника: главная",
    kind: "desktop",
  },
  platformColleagues: {
    id: "platform-colleagues",
    src: "/screenshots/platform-colleagues.png",
    alt: "Портал сотрудника: коллеги",
    kind: "desktop",
  },
  platformOrg: {
    id: "platform-org",
    src: "/screenshots/platform-org.png",
    alt: "Портал сотрудника: оргструктура",
    kind: "desktop",
  },
  platformTasks: {
    id: "platform-tasks",
    src: "/screenshots/platform-tasks.png",
    alt: "Портал сотрудника: задачи",
    kind: "desktop",
  },
  mobileHome: {
    id: "mobile-home",
    src: "/screenshots/mobile-home.webp",
    alt: "Мобильное приложение: главная и табель",
    kind: "mobile",
  },
  mobileLogin: {
    id: "mobile-login",
    src: "/screenshots/mobile-login.png",
    alt: "Мобильное приложение: вход",
    kind: "mobile",
  },
  mobileColleagues: {
    id: "mobile-colleagues",
    src: "/screenshots/mobile-colleagues.png",
    alt: "Мобильное приложение: коллеги",
    kind: "mobile",
  },
  mobileCompany: {
    id: "mobile-company",
    src: "/screenshots/mobile-company.png",
    alt: "Мобильное приложение: компания",
    kind: "mobile",
  },
  mobileCourses: {
    id: "mobile-courses",
    src: "/screenshots/mobile-courses.png",
    alt: "Мобильное приложение: каталог курсов",
    kind: "mobile",
  },
  mobileCourseModules: {
    id: "mobile-course-modules",
    src: "/screenshots/mobile-course-modules.png",
    alt: "Мобильное приложение: модули курса",
    kind: "mobile",
  },
  mobileTasks: {
    id: "mobile-tasks",
    src: "/screenshots/mobile-tasks.png",
    alt: "Мобильное приложение: доска задач",
    kind: "mobile",
  },
  mobileIdeas: {
    id: "mobile-ideas",
    src: "/screenshots/mobile-ideas.png",
    alt: "Мобильное приложение: банк идей",
    kind: "mobile",
  },
  mobileProfile: {
    id: "mobile-profile",
    src: "/screenshots/mobile-profile.png",
    alt: "Мобильное приложение: профиль",
    kind: "mobile",
  },
  mobileEmployeeEdit: {
    id: "mobile-employee-edit",
    src: "/screenshots/mobile-employee-edit.png",
    alt: "Мобильное приложение: данные сотрудника",
    kind: "mobile",
  },
  adminLoginMobile: {
    id: "admin-login-mobile",
    src: "/screenshots/admin-login-mobile.png",
    alt: "Jupiter Admin: вход",
    kind: "mobile",
  },
} as const satisfies Record<string, ProductScreen>;

export type ProductScreenId = keyof typeof productScreens;
