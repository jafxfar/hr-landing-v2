import type { ProductScreenId } from "@/content/productScreens";

export type PlaceholderFlag = {
  placeholder?: boolean;
};

export type LucideIconName =
  | "Network"
  | "UserSearch"
  | "Clock"
  | "HeartHandshake"
  | "GraduationCap"
  | "FileStack"
  | "Shield"
  | "Smartphone"
  | "Code2"
  | "Lock"
  | "ChartColumn"
  | "FileSpreadsheet"
  | "FolderX"
  | "MessageSquareX"
  | "ClipboardList"
  | "Users"
  | "Briefcase"
  | "User"
  | "Calendar"
  | "Bell"
  | "Building2"
  | "CheckCircle2"
  | "Sparkles";

export type TrustLogo = {
  name: string;
  src: string;
  width: number;
  height: number;
};

export type TrustFact = PlaceholderFlag & {
  title: string;
  icon: LucideIconName;
};

export type TrustStripContent = PlaceholderFlag & {
  id: string;
  logos: PlaceholderFlag & { items: TrustLogo[] };
  facts: TrustFact[];
};

export type SiteContact = PlaceholderFlag & {
  /** // TODO: проверить и заполнить */
  value?: string;
  /** Visible label when value is a handle (e.g. Telegram). */
  label?: string;
};

export type Site = {
  name: string;
  title: string;
  description: string;
  /** Absolute site origin for canonical / OG, e.g. https://jupiterhr.uz */
  url?: string;
  phone: SiteContact;
  telegram: SiteContact;
  email: SiteContact;
};

export type NavItem = {
  label: string;
  href: string;
  /** Desktop mega-menu / mobile accordion content source */
  mega?: "modules";
};

export type Nav = {
  items: NavItem[];
  cta: { label: string; href: string };
  login: PlaceholderFlag & {
    label: string;
    /** // TODO: url входа */
    href?: string;
  };
};

export type Hero = {
  eyebrow: string;
  /** Static full headline for SEO / document title context */
  title: string;
  headlinePrefix: string;
  headlineSuffix: string;
  /** Middle line phrases — problems the product removes */
  rotating: string[];
  /** Rotation interval in ms */
  rotateMs: number;
  subtitle: string;
  primaryCta: string;
  primaryHref: string;
  secondaryCta: string;
  secondaryHref: string;
  note: string;
  facts: string[];
  desktopCaption: string;
  mobileCaption: string;
};

export type Pain = PlaceholderFlag & {
  was: string;
  became: string;
  /** Short benefit under the card; unverified → [TODO] + placeholder */
  result: string;
  moduleSlug: string;
  wasIcon: LucideIconName;
  becameIcon: LucideIconName;
};

export type PainsSection = {
  id: string;
  eyebrow: string;
  title: string;
  text: string;
  wasLabel: string;
  becameLabel: string;
  resultLabel: string;
  moduleLinkPrefix: string;
  moduleLinkSuffix: string;
  demoPrompt: string;
  demoCta: string;
  demoHref: string;
  items: Pain[];
};

export type RoleSwitcherRoleId = "hr" | "manager" | "employee";

export type RoleSwitcherBenefit = PlaceholderFlag & {
  icon: LucideIconName;
  text: string;
};

export type RoleSwitcherRole = {
  id: RoleSwitcherRoleId;
  label: string;
  description: string;
  headline: string;
  icon: LucideIconName;
  benefits: RoleSwitcherBenefit[];
  change: { before: string; after: string };
  moduleSlugs: string[];
  ctaLabel: string;
  ctaHref: string;
  modulesCtaLabel: string;
};

export type RoleSwitcherSection = {
  id: string;
  eyebrow: string;
  title: string;
  text: string;
  changeLabel: string;
  demoDataCaption: string;
  autoIntervalMs: number;
  modulesHref: string;
  roles: RoleSwitcherRole[];
};

export type ModulesSection = {
  id: string;
  eyebrow: string;
  title: string;
  text: string;
  schemaCenter: string;
  demoPrompt: string;
  demoCta: string;
  demoHref: string;
  cardCtaLabel: string;
  whyConnectLabel: string;
};

export type ModulesMegaCopy = {
  allLabel: string;
  allHref: string;
  panelLabel: string;
};

export type ModulesHubTask = {
  want: string;
  moduleSlug: string;
};

export type ModulesHubRole = {
  id: string;
  label: string;
  text: string;
  moduleSlugs: string[];
};

export type ModulesHubContent = {
  seo: {
    title: string;
    description: string;
  };
  eyebrow: string;
  title: string;
  text: string;
  demoCta: string;
  demoHref: string;
  tasksEyebrow: string;
  tasksTitle: string;
  tasksText: string;
  tasksWantLabel: string;
  tasksModuleLabel: string;
  tasks: ModulesHubTask[];
  rolesEyebrow: string;
  rolesTitle: string;
  rolesText: string;
  roles: ModulesHubRole[];
  openModuleLabel: string;
  bottomDemoTitle: string;
  bottomDemoText: string;
  bottomDemoCta: string;
};

export type InterfaceTab = PlaceholderFlag & {
  id: string;
  label: string;
  title: string;
  description: string;
  points: string[];
  badge?: string;
};

export type InterfacesSection = {
  id: string;
  eyebrow: string;
  title: string;
  text: string;
  demoCta: string;
  demoHref: string;
  items: InterfaceTab[];
};

export type FeatureVisualId =
  | "rbac"
  | "audit"
  | "import"
  | "api"
  | "kpi"
  | "mobile";

export type FeatureItem = {
  title: string;
  text: string;
  icon: LucideIconName;
  visual: FeatureVisualId;
  badge?: PlaceholderFlag & { label: string };
};

export type FeatureFact = {
  value: number;
  label: string;
};

export type FeaturesVisualDemo = {
  rbac: { network: string; branch: string; dept: string };
  audit: { lines: string[] };
  import: { progressLabel: string };
  api: { lines: string[] };
  kpi: { points: number[] };
  mobile: { checkLabel: string };
};

export type FeaturesSection = {
  id: string;
  eyebrow: string;
  title: string;
  text: string;
  comingSoonLabel: string;
  facts: FeatureFact[];
  visualDemo: FeaturesVisualDemo;
  items: FeatureItem[];
};

export type ComparisonRow = PlaceholderFlag & {
  criterion: string;
  left: string;
  right: string;
};

export type ComparisonSection = PlaceholderFlag & {
  id: string;
  eyebrow: string;
  title: string;
  text: string;
  criterionTitle: string;
  leftTitle: string;
  rightTitle: string;
  rows: ComparisonRow[];
};

export type Step = PlaceholderFlag & {
  title: string;
  text: string;
  /** // TODO: сроки внедрения — не выдумывать */
  timing?: string;
};

export type StepsSection = {
  id: string;
  eyebrow: string;
  title: string;
  text: string;
  items: Step[];
};

export type CaseStudy = PlaceholderFlag & {
  company: string;
  task: string;
  solution: string;
  /** 2–3 метрики; без выдуманных цифр */
  metrics: string[];
  href: string;
};

export type CasesSection = PlaceholderFlag & {
  id: string;
  eyebrow: string;
  title: string;
  text: string;
  taskLabel: string;
  solutionLabel: string;
  metricsLabel: string;
  readCta: string;
  items: CaseStudy[];
};

export type FaqItem = PlaceholderFlag & {
  q: string;
  a: string;
};

export type FaqSection = {
  id: string;
  eyebrow: string;
  title: string;
  items: FaqItem[];
};

export type CompanySizeOption = {
  value: string;
  label: string;
};

export type CtaSection = {
  id: string;
  eyebrow: string;
  title: string;
  text: string;
  benefits: string[];
  secondaryCta: string;
  secondaryHref: string;
  telegramCta: string;
  telegramLeadTitle: string;
  form: {
    name: string;
    contact: string;
    company: string;
    companySize: string;
    companySizeOptions: CompanySizeOption[];
    consent: string;
    consentPrefix: string;
    consentLinkLabel: string;
    submit: string;
    submitting: string;
    success: string;
    error: string;
    validationError: string;
    rateLimitError: string;
    namePlaceholder: string;
    contactPlaceholder: string;
    companyPlaceholder: string;
    honeypotLabel: string;
  };
};

export type FooterLink = PlaceholderFlag & {
  label: string;
  href?: string;
};

export type FooterColumn = {
  title: string;
  links: FooterLink[];
  /** Fill links from modulesCatalog at render time */
  fromModules?: boolean;
};

export type FooterContent = {
  tagline: string;
  columns: FooterColumn[];
  /** Suffix after «© {year} {site.name}. » */
  rights: string;
  /** // TODO: реквизиты */
  legal: PlaceholderFlag & { text?: string };
  privacy: FooterLink;
  offer: FooterLink;
};

export type PricingPlanId = "start" | "business" | "enterprise";

export type PricingPlan = {
  id: PricingPlanId;
  name: string;
  audience: string;
  price: string;
  priceUnit: string;
  badge?: string;
  featured?: boolean;
  features: string[];
  cta: { label: string; href: string };
};

export type PricingMatrixValue = "yes" | "no" | "partial";

export type PricingMatrixRow = {
  feature: string;
  start: PricingMatrixValue;
  business: PricingMatrixValue;
  enterprise: PricingMatrixValue;
};

export type PricingBillingCopy = {
  monthLabel: string;
  yearLabel: string;
  yearDiscountPercent: number;
  yearDiscountNote: string;
  priceUnitMonth: string;
  priceUnitYear: string;
};

export type PricingSection = PlaceholderFlag & {
  id: string;
  eyebrow: string;
  title: string;
  text: string;
  paymentNote: string;
  matrixTitle: string;
  matrixYes: string;
  matrixNo: string;
  matrixPartial: string;
  billing: PricingBillingCopy;
  plans: PricingPlan[];
  matrix: PricingMatrixRow[];
};

export type A11yCopy = {
  navLabel: string;
  openMenu: string;
  closeMenu: string;
  skipToContent: string;
  backToTop: string;
};

export type AnnouncementBarContent = PlaceholderFlag & {
  text: string;
  dismissLabel: string;
};

export type BreadcrumbsCopy = {
  ariaLabel: string;
  home: string;
  homeHref: string;
  modules: string;
  modulesHref: string;
};

export type ModuleNavItem = {
  id: string;
  label: string;
};

export type ModulePageCopy = {
  problemEyebrow: string;
  problemTitle: string;
  solutionEyebrow: string;
  solutionTitle: string;
  featuresEyebrow: string;
  featuresTitle: string;
  screensEyebrow: string;
  screensTitle: string;
  rolesEyebrow: string;
  rolesTitle: string;
  faqEyebrow: string;
  faqTitlePrefix: string;
  faqTitleSuffix: string;
  relatedEyebrow: string;
  relatedTitle: string;
  relatedOpen: string;
  demoTitlePrefix: string;
  demoTitleSuffix: string;
  demoText: string;
  demoCta: string;
  allModulesCta: string;
  allModulesHref: string;
  demoHref: string;
  screenPlaceholderHint: string;
  wasLabel: string;
  becameLabel: string;
  purposeEyebrow: string;
  purposeTitle: string;
  advantagesEyebrow: string;
  advantagesTitle: string;
  whyEyebrow: string;
  whyTitle: string;
  whyResultTitle: string;
  scenarioEyebrow: string;
  scenarioTitleFallback: string;
  integrationsEyebrow: string;
  integrationsTitle: string;
  nextModuleLabel: string;
  stickyNavLabel: string;
  stickyNav: ModuleNavItem[];
};

/** Token accent for module chrome (maps to CSS brand/accent vars). */
export type ModuleAccent =
  | "brand-500"
  | "brand-600"
  | "accent-500"
  | "accent-600";

export type ModuleScreenRef = {
  screenId: ProductScreenId;
  caption: string;
};

export type ModuleAudienceItem = PlaceholderFlag & {
  role: string;
  benefit: string;
};

export type ModulePoint = PlaceholderFlag & {
  title: string;
  text: string;
};

export type ModuleFeatureItem = PlaceholderFlag & {
  title: string;
  text: string;
};

export type ModuleFeatureGroup = {
  title: string;
  items: ModuleFeatureItem[];
  screenId?: ProductScreenId;
  mockId?: string;
};

export type ModuleProblem = PlaceholderFlag & {
  was: string;
  became: string;
};

export type ModuleScenario = {
  title?: string;
  steps: string[];
};

export type ModuleIntegration = {
  moduleSlug: string;
  text: string;
};

export type ModuleVisuals = {
  /** Keys from moduleMockById / mock component ids */
  mocks: string[];
  screens: ModuleScreenRef[];
};

export type ModuleFaqItem = PlaceholderFlag & {
  q: string;
  a: string;
};

export type ModuleSeo = {
  title: string;
  description: string;
  keywords: string[];
};

/**
 * Full product module page model.
 * Slugs: organization | recruiting | time | engagement | lms (learning) | tasks-docs (workflow).
 */
export type ProductModule = {
  slug: string;
  title: string;
  shortTitle: string;
  icon: LucideIconName;
  accent: ModuleAccent;
  /** Eyebrow above H1 on module page */
  eyebrow: string;
  tagline: string;
  purpose: string;
  audience: ModuleAudienceItem[];
  problems: ModuleProblem[];
  advantages: ModulePoint[];
  whyConnect: ModulePoint[];
  featureGroups: ModuleFeatureGroup[];
  scenario: ModuleScenario;
  integrations: ModuleIntegration[];
  visuals: ModuleVisuals;
  faq: ModuleFaqItem[];
  seo: ModuleSeo;
  related: string[];
  hubPreview: ProductScreenId;
};

