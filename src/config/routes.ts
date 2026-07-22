export const appRoutes = {
  home: "/",
  softwareDevelopment: "/software-development",
  pentest: "/pentest",
  login: "/login",
  dashboard: "/dashboard",
  projects: "/projects",
  admin: "/admin",
  adminRisks: "/admin/risks",
  adminProductivity: "/admin/productivity",
  adminFinance: "/admin/finance",
  adminContracts: "/admin/contracts",
  adminUsers: "/admin/users",
  adminAudit: "/admin/audit",
} as const;

export const sectionRoutes = {
  services: "/#services",
  technologies: "/#technologies",
  about: "/#about",
  contact: "/#contact",
} as const;
