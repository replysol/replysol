"use client";

import Link from "next/link";
import type { DragEvent, ReactNode } from "react";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  AlertTriangle,
  ArrowLeft,
  BarChart3,
  CalendarClock,
  CheckCircle2,
  CircleDollarSign,
  Clock3,
  FolderKanban,
  Gauge,
  GripVertical,
  LayoutDashboard,
  LogIn,
  LogOut,
  Pencil,
  Plus,
  ShieldCheck,
  TrendingDown,
  TrendingUp,
  Trash2,
  UserCheck,
  WalletCards,
  UsersRound,
} from "lucide-react";
import Brand from "@/components/shared/brand";
import ThemeToggle from "@/components/shared/theme-toggle";
import { appRoutes } from "@/config/routes";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  currentDeveloperId,
  initialFinanceEntries,
  initialProjects,
  initialUsers,
  type FinanceEntry,
  type KanbanStatus,
  type ProjectCard,
  type UserRole,
  type WorkspaceProject,
  type WorkspaceUser,
} from "@/data/workspace";

type WorkspaceView =
  | "login"
  | "developer-dashboard"
  | "projects"
  | "project-kanban"
  | "admin-dashboard"
  | "admin-risks"
  | "admin-productivity"
  | "admin-contracts"
  | "admin-audit"
  | "finance"
  | "users";

type WorkspaceAppProps = {
  view: WorkspaceView;
  projectId?: string;
};

const storageKeys = {
  projects: "reply.workspace.projects",
  users: "reply.workspace.users",
  finance: "reply.workspace.finance",
  session: "reply.workspace.session",
} as const;

const kanbanColumns: { id: KanbanStatus; label: string }[] = [
  { id: "backlog", label: "Backlog" },
  { id: "progress", label: "Em andamento" },
  { id: "review", label: "Revisao" },
  { id: "done", label: "Concluido" },
];

const financeTypeMeta = {
  received: {
    label: "Ja entrou",
    tone: "text-emerald-500",
    bar: "bg-emerald-500",
    surface: "bg-emerald-500/10 border-emerald-500/25",
  },
  incoming: {
    label: "Vai entrar",
    tone: "text-accent",
    bar: "bg-accent",
    surface: "bg-accent/10 border-accent/25",
  },
  expense: {
    label: "Ja saiu",
    tone: "text-destructive",
    bar: "bg-destructive",
    surface: "bg-destructive/10 border-destructive/25",
  },
} as const;

const currencyFormatter = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
  maximumFractionDigits: 0,
});

const compactCurrencyFormatter = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
  notation: "compact",
  maximumFractionDigits: 1,
});

function createId(prefix: string) {
  return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`;
}

function daysUntil(date: string) {
  const target = new Date(`${date}T12:00:00`);
  const today = new Date();
  target.setHours(12, 0, 0, 0);
  today.setHours(12, 0, 0, 0);

  return Math.ceil((target.getTime() - today.getTime()) / 86_400_000);
}

function projectProgress(project: WorkspaceProject) {
  if (!project.cards.length) {
    return 0;
  }

  return Math.round((project.cards.filter((card) => card.status === "done").length / project.cards.length) * 100);
}

function readStorage<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") {
    return fallback;
  }

  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function writeStorage<T>(key: string, value: T) {
  if (typeof window !== "undefined") {
    window.localStorage.setItem(key, JSON.stringify(value));
  }
}

function SummaryCard({ label, value, detail }: { label: string; value: string; detail: string }) {
  return (
    <div className="rounded-lg border border-border/60 bg-card/75 p-5 backdrop-blur-md">
      <p className="eyebrow-label">{label}</p>
      <p className="mt-3 text-2xl font-semibold tracking-tight text-foreground">{value}</p>
      <p className="mt-2 text-sm text-muted-foreground">{detail}</p>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: string;
}) {
  return (
    <label className="block">
      <span className="mb-2 block meta-label">{label}</span>
      <input
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="h-11 w-full rounded-sm border border-border/70 bg-background/70 px-3 text-sm text-foreground outline-none transition focus:border-accent/70"
      />
    </label>
  );
}

function TextArea({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}) {
  return (
    <label className="block">
      <span className="mb-2 block meta-label">{label}</span>
      <textarea
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        rows={4}
        className="w-full resize-none rounded-sm border border-border/70 bg-background/70 px-3 py-3 text-sm text-foreground outline-none transition focus:border-accent/70"
      />
    </label>
  );
}

function SelectField<T extends string>({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: T;
  onChange: (value: T) => void;
  options: readonly T[];
}) {
  return (
    <label className="block">
      <span className="mb-2 block meta-label">{label}</span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value as T)}
        className="h-11 w-full rounded-sm border border-border/70 bg-background/70 px-3 text-sm text-foreground outline-none transition focus:border-accent/70"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}

function AppShell({
  children,
  role,
  view,
}: {
  children: ReactNode;
  role: UserRole;
  view: WorkspaceView;
}) {
  const router = useRouter();
  const nav = [
    { label: "Dashboard", href: role === "admin" ? appRoutes.admin : appRoutes.dashboard, icon: LayoutDashboard, active: view.includes("dashboard") },
    { label: "Projects", href: appRoutes.projects, icon: FolderKanban, active: view === "projects" || view === "project-kanban" },
    ...(role === "admin"
      ? [
          { label: "Risks", href: appRoutes.adminRisks, icon: AlertTriangle, active: view === "admin-risks" },
          { label: "Productivity", href: appRoutes.adminProductivity, icon: BarChart3, active: view === "admin-productivity" },
          { label: "Finance", href: appRoutes.adminFinance, icon: CircleDollarSign, active: view === "finance" },
          { label: "Contracts", href: appRoutes.adminContracts, icon: WalletCards, active: view === "admin-contracts" },
          { label: "Users", href: appRoutes.adminUsers, icon: UsersRound, active: view === "users" },
          { label: "Audit", href: appRoutes.adminAudit, icon: ShieldCheck, active: view === "admin-audit" },
        ]
      : []),
  ];

  const logout = () => {
    if (typeof window !== "undefined") {
      window.localStorage.removeItem(storageKeys.session);
    }
    router.push(appRoutes.login);
  };

  return (
    <div className="min-h-dvh bg-background">
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-72 border-r border-border/60 bg-card/75 p-5 backdrop-blur-xl lg:block">
        <Brand href={role === "admin" ? "/admin" : "/dashboard"} textClassName="text-xs" />
        <div className="mt-8 rounded-lg border border-border/60 bg-background/55 p-4">
          <p className="meta-label">Workspace</p>
          <p className="mt-2 text-sm font-medium text-foreground">{role === "admin" ? "Admin Reply" : "Developer"}</p>
          <p className="mt-1 text-xs text-muted-foreground">Dados mockados para operacao interna</p>
        </div>
        <nav className="mt-6 space-y-2">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-sm border px-3 py-3 font-mono text-xs uppercase tracking-[0.14em] transition",
                item.active
                  ? "border-accent/40 bg-accent/10 text-foreground"
                  : "border-transparent text-muted-foreground hover:border-border hover:text-foreground",
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </Link>
          ))}
        </nav>
      </aside>

      <header className="sticky top-0 z-30 border-b border-border/60 bg-background/90 backdrop-blur-xl lg:ml-72">
        <div className="flex min-h-16 items-center justify-between gap-3 px-4 sm:px-6">
          <div className="lg:hidden">
            <Brand href={role === "admin" ? "/admin" : "/dashboard"} textClassName="text-xs" />
          </div>
          <div className="hidden min-w-0 lg:block">
            <p className="eyebrow-label">Reply Operations</p>
          </div>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Button variant="outline" size="sm" onClick={logout} className="gap-2 rounded-sm font-mono text-xs">
              <LogOut className="h-4 w-4" />
              Sair
            </Button>
          </div>
        </div>
        <div className="flex gap-2 overflow-x-auto px-4 pb-3 lg:hidden">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "inline-flex shrink-0 items-center gap-2 rounded-sm border px-3 py-2 font-mono text-xs uppercase tracking-[0.14em]",
                item.active ? "border-accent/40 bg-accent/10 text-foreground" : "border-border/60 text-muted-foreground",
              )}
            >
              <item.icon className="h-3.5 w-3.5" />
              {item.label}
            </Link>
          ))}
        </div>
      </header>

      <main className="px-4 py-6 sm:px-6 lg:ml-72 lg:p-8">{children}</main>
    </div>
  );
}

export default function WorkspaceApp({ view, projectId }: WorkspaceAppProps) {
  const router = useRouter();
  const [projects, setProjects] = useState<WorkspaceProject[]>(() => readStorage(storageKeys.projects, initialProjects));
  const [users, setUsers] = useState<WorkspaceUser[]>(() => readStorage(storageKeys.users, initialUsers));
  const [financeEntries, setFinanceEntries] = useState<FinanceEntry[]>(() =>
    readStorage(storageKeys.finance, initialFinanceEntries),
  );
  const [sessionRole, setSessionRole] = useState<UserRole>(() => readStorage(storageKeys.session, "developer" as UserRole));
  const currentDeveloper = users.find((user) => user.id === currentDeveloperId) ?? users[0];
  const adminViews: WorkspaceView[] = ["admin-dashboard", "admin-risks", "admin-productivity", "admin-contracts", "admin-audit", "finance", "users"];
  const effectiveRole: UserRole = adminViews.includes(view) ? "admin" : sessionRole;

  const persistProjects = (nextProjects: WorkspaceProject[]) => {
    setProjects(nextProjects);
    writeStorage(storageKeys.projects, nextProjects);
  };

  const persistUsers = (nextUsers: WorkspaceUser[]) => {
    setUsers(nextUsers);
    writeStorage(storageKeys.users, nextUsers);
  };

  const persistFinance = (nextEntries: FinanceEntry[]) => {
    setFinanceEntries(nextEntries);
    writeStorage(storageKeys.finance, nextEntries);
  };

  if (view === "login") {
    return (
      <LoginView
        onLogin={(role) => {
          setSessionRole(role);
          writeStorage(storageKeys.session, role);
          router.push(role === "admin" ? "/admin" : "/dashboard");
        }}
      />
    );
  }

  const visibleProjects =
    effectiveRole === "admin"
      ? projects
      : projects.filter((project) => project.members.includes(currentDeveloper.name));

  const selectedProject = projects.find((project) => project.id === projectId) ?? visibleProjects[0];

  return (
    <AppShell role={effectiveRole} view={view}>
      {view === "developer-dashboard" && (
        <DeveloperDashboard projects={visibleProjects} currentDeveloper={currentDeveloper} />
      )}
      {view === "admin-dashboard" && (
        <AdminDashboard projects={projects} users={users} financeEntries={financeEntries} />
      )}
      {view === "admin-risks" && (
        <AdminRisksView projects={projects} users={users} />
      )}
      {view === "admin-productivity" && (
        <AdminProductivityView projects={projects} users={users} />
      )}
      {view === "admin-contracts" && (
        <AdminContractsView projects={projects} />
      )}
      {view === "admin-audit" && (
        <AdminAuditView projects={projects} />
      )}
      {view === "projects" && (
        <ProjectsView
          projects={visibleProjects}
          users={users}
          canCreate={effectiveRole === "admin" || sessionRole === "developer"}
          onCreateProject={(project) => persistProjects([project, ...projects])}
        />
      )}
      {view === "project-kanban" && selectedProject && (
        <ProjectKanbanView
          project={selectedProject}
          users={users}
          onSaveProject={(nextProject) =>
            persistProjects(projects.map((project) => (project.id === nextProject.id ? nextProject : project)))
          }
        />
      )}
      {view === "finance" && (
        <FinanceView entries={financeEntries} onChange={persistFinance} />
      )}
      {view === "users" && (
        <UsersView users={users} onChange={persistUsers} />
      )}
    </AppShell>
  );
}

function LoginView({ onLogin }: { onLogin: (role: UserRole) => void }) {
  const [role, setRole] = useState<UserRole>("developer");

  return (
    <div className="min-h-dvh bg-background">
      <div className="absolute inset-0 bg-grid opacity-30" />
      <main className="relative mx-auto grid min-h-dvh w-full max-w-6xl items-center gap-10 px-4 py-10 sm:px-6 lg:grid-cols-[0.9fr_1.1fr]">
        <section>
          <Brand />
          <p className="mt-10 eyebrow-label">Acesso interno</p>
          <h1 className="mt-4 max-w-2xl text-4xl font-bold leading-tight tracking-tight text-gradient sm:text-6xl">
            Gestao de projetos, kanban e operacao em um unico painel.
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground">
            Entre como desenvolvedor para acompanhar projetos e cards, ou como admin para acessar projetos, financeiro e usuarios.
          </p>
        </section>

        <section className="rounded-lg border border-border/70 bg-card/80 p-5 shadow-[0_28px_80px_hsl(var(--foreground)/0.08)] backdrop-blur-md sm:p-7">
          <div className="mb-6 flex items-center justify-between border-b border-border/60 pb-5">
            <div>
              <p className="eyebrow-label">Login demo</p>
              <h2 className="mt-2 text-2xl font-semibold tracking-tight text-foreground">Escolha seu perfil</h2>
            </div>
            <ShieldCheck className="h-6 w-6 text-accent" />
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {(["developer", "admin"] as const).map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => setRole(option)}
                className={cn(
                  "rounded-lg border p-4 text-left transition",
                  role === option ? "border-accent/50 bg-accent/10" : "border-border/60 bg-background/55 hover:border-border",
                )}
              >
                <p className="font-mono text-xs uppercase tracking-[0.18em] text-foreground">
                  {option === "admin" ? "Admin" : "Developer"}
                </p>
                <p className="mt-2 text-sm text-muted-foreground">
                  {option === "admin" ? "Projects, finance and users." : "Projects and team kanban."}
                </p>
              </button>
            ))}
          </div>

          <Button onClick={() => onLogin(role)} className="mt-6 h-12 w-full gap-2 rounded-sm font-mono text-xs uppercase tracking-[0.16em]">
            <LogIn className="h-4 w-4" />
            Entrar no workspace
          </Button>
          <p className="mt-4 text-center text-xs text-muted-foreground">Fluxo mockado, pronto para conectar com autenticacao real.</p>
        </section>
      </main>
    </div>
  );
}

function DeveloperDashboard({
  projects,
  currentDeveloper,
}: {
  projects: WorkspaceProject[];
  currentDeveloper: WorkspaceUser;
}) {
  const myCards = projects.flatMap((project) => project.cards.filter((card) => card.owner === currentDeveloper.name));
  const doneCards = myCards.filter((card) => card.status === "done").length;

  return (
    <div className="space-y-6">
      <header className="flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
        <div>
          <p className="eyebrow-label">Dashboard do desenvolvedor</p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Projetos e entregas do time</h1>
        </div>
        <Link href={appRoutes.projects} className="inline-flex items-center justify-center gap-2 rounded-sm bg-foreground px-5 py-3 font-mono text-xs uppercase tracking-[0.14em] text-background">
          <FolderKanban className="h-4 w-4" />
          Ver projetos
        </Link>
      </header>

      <div className="grid gap-4 md:grid-cols-3">
        <SummaryCard label="Projetos ativos" value={String(projects.length)} detail="Projetos com sua participacao" />
        <SummaryCard label="Cards atribuidos" value={String(myCards.length)} detail={`${doneCards} concluidos`} />
        <SummaryCard label="Stack principal" value={currentDeveloper.stack.split(",")[0]} detail={currentDeveloper.stack} />
      </div>

      <section className="rounded-lg border border-border/60 bg-card/75 p-5 backdrop-blur-md">
        <div className="mb-5 flex items-center justify-between gap-4">
          <div>
            <p className="eyebrow-label">Atividade</p>
            <h2 className="mt-2 text-xl font-semibold text-foreground">Cards em andamento</h2>
          </div>
          <Gauge className="h-5 w-5 text-accent" />
        </div>
        <div className="grid gap-3 lg:grid-cols-2">
          {myCards.map((card) => (
            <div key={card.id} className="rounded-lg border border-border/60 bg-background/60 p-4">
              <p className="text-sm font-semibold text-foreground">{card.title}</p>
              <p className="mt-2 text-sm text-muted-foreground">{card.description}</p>
              <p className="mt-4 font-mono text-xs uppercase tracking-[0.18em] text-accent">{card.status}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

function AdminDashboard({
  projects,
  users,
  financeEntries,
}: {
  projects: WorkspaceProject[];
  users: WorkspaceUser[];
  financeEntries: FinanceEntry[];
}) {
  const metrics = getAdminMetrics(projects, users, financeEntries);
  const shortcuts = [
    { title: "Risks and health", href: appRoutes.adminRisks, icon: AlertTriangle, detail: "Prazos, bloqueios, cards vencidos e projetos sem movimentacao." },
    { title: "Productivity", href: appRoutes.adminProductivity, icon: BarChart3, detail: "Fluxo do kanban, cards por etapa e carga por desenvolvedor." },
    { title: "Finance", href: appRoutes.adminFinance, icon: CircleDollarSign, detail: "Receita realizada, previsoes, custos e lancamentos." },
    { title: "Contracts", href: appRoutes.adminContracts, icon: WalletCards, detail: "Clientes, valores, custos, status e responsaveis." },
    { title: "Users", href: appRoutes.adminUsers, icon: UsersRound, detail: "Criar, editar e remover usuarios e perfis." },
    { title: "Audit", href: appRoutes.adminAudit, icon: ShieldCheck, detail: "Historico de atualizacoes de projetos e cards." },
  ];

  return (
    <div className="space-y-6">
      <header className="flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
        <div>
          <p className="eyebrow-label">Dashboard admin</p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Resumo executivo</h1>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            Uma visao curta da operacao. As analises completas ficam separadas nas paginas do menu.
          </p>
        </div>
        <div className={cn("rounded-lg border p-4 backdrop-blur-md", metrics.projectedBalance >= 0 ? "border-emerald-500/25 bg-emerald-500/10" : "border-destructive/25 bg-destructive/10")}>
          <p className="meta-label">Saldo projetado</p>
          <p className={cn("mt-2 text-2xl font-semibold", metrics.projectedBalance >= 0 ? "text-emerald-500" : "text-destructive")}>
            {currencyFormatter.format(metrics.projectedBalance)}
          </p>
        </div>
      </header>

      <div className="grid gap-4 md:grid-cols-4">
        <SummaryCard label="Projetos em risco" value={String(metrics.projectsAtRisk)} detail={`${projects.length} projetos monitorados`} />
        <SummaryCard label="Cards bloqueados" value={String(metrics.blockedCards)} detail={`${metrics.overdueCards} vencidos ou atrasados`} />
        <SummaryCard label="Equipe ativa" value={String(metrics.activeUsers)} detail={`${metrics.pendingUsers} pendentes ou bloqueados`} />
        <SummaryCard label="Margem estimada" value={`${metrics.estimatedMargin}%`} detail={`${compactCurrencyFormatter.format(metrics.totalContractValue)} contratado`} />
      </div>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {shortcuts.map((item) => (
          <Link key={item.href} href={item.href} className="rounded-lg border border-border/60 bg-card/75 p-5 backdrop-blur-md transition hover:border-accent/40">
            <item.icon className="mb-6 h-5 w-5 text-accent" />
            <h2 className="text-lg font-semibold text-foreground">{item.title}</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.detail}</p>
          </Link>
        ))}
      </section>
    </div>
  );
}

function getAdminMetrics(projects: WorkspaceProject[], users: WorkspaceUser[], financeEntries: FinanceEntry[]) {
  const received = financeEntries.filter((entry) => entry.type === "received").reduce((sum, entry) => sum + entry.amount, 0);
  const incoming = financeEntries.filter((entry) => entry.type === "incoming").reduce((sum, entry) => sum + entry.amount, 0);
  const expenses = financeEntries.filter((entry) => entry.type === "expense").reduce((sum, entry) => sum + entry.amount, 0);
  const allCards = projects.flatMap((project) => project.cards.map((card) => ({ ...card, projectName: project.name })));
  const blockedCards = allCards.filter((card) => card.blocked).length;
  const overdueCards = allCards.filter((card) => card.dueDate && daysUntil(card.dueDate) < 0 && card.status !== "done").length;
  const projectsAtRisk = projects.filter((project) => project.status === "Em risco" || project.status === "Atrasado").length;
  const activeUsers = users.filter((user) => user.status === "Ativo").length;
  const pendingUsers = users.filter((user) => user.status !== "Ativo").length;
  const totalContractValue = projects.reduce((sum, project) => sum + (project.contractValue ?? 0), 0);
  const totalMonthlyCost = projects.reduce((sum, project) => sum + (project.monthlyCost ?? 0), 0);

  return {
    received,
    incoming,
    expenses,
    allCards,
    blockedCards,
    overdueCards,
    projectsAtRisk,
    activeUsers,
    pendingUsers,
    projectedBalance: received + incoming - expenses,
    totalContractValue,
    totalMonthlyCost,
    estimatedMargin: totalContractValue > 0 ? Math.round(((totalContractValue - totalMonthlyCost) / totalContractValue) * 100) : 0,
  };
}

function AdminRisksView({ projects, users }: { projects: WorkspaceProject[]; users: WorkspaceUser[] }) {
  const metrics = getAdminMetrics(projects, users, []);
  const projectRisks = projects.map((project) => {
    const daysLeft = daysUntil(project.deadline);
    const progress = projectProgress(project);
    const blocked = project.cards.filter((card) => card.blocked).length;
    const staleCards = project.cards.filter((card) => card.updatedAt && daysUntil(card.updatedAt) < -4 && card.status !== "done").length;

    return {
      project,
      daysLeft,
      progress,
      blocked,
      staleCards,
      riskScore: (project.status === "Atrasado" ? 3 : project.status === "Em risco" ? 2 : 0) + blocked + staleCards + (daysLeft < 14 ? 1 : 0),
    };
  });

  return (
    <div className="space-y-6">
      <header>
        <p className="eyebrow-label">Riscos e saude</p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Prazo, bloqueios e alertas</h1>
      </header>
      <div className="grid gap-4 md:grid-cols-4">
        <SummaryCard label="Projetos em risco" value={String(metrics.projectsAtRisk)} detail={`${projects.length} projetos monitorados`} />
        <SummaryCard label="Cards vencidos" value={String(metrics.overdueCards)} detail="Atrasados e nao concluidos" />
        <SummaryCard label="Cards bloqueados" value={String(metrics.blockedCards)} detail="Dependem de desbloqueio" />
        <SummaryCard label="Usuarios pendentes" value={String(metrics.pendingUsers)} detail="Acessos para revisar" />
      </div>
      <section className="grid gap-6 xl:grid-cols-[1.25fr_0.75fr]">
        <div className="rounded-lg border border-border/60 bg-card/75 p-5 backdrop-blur-md">
          <div className="mb-5 flex items-center justify-between gap-4">
            <div>
              <p className="eyebrow-label">Saude dos projetos</p>
              <h2 className="mt-2 text-xl font-semibold text-foreground">Prazo, progresso e risco</h2>
            </div>
            <AlertTriangle className="h-5 w-5 text-accent" />
          </div>
          <div className="space-y-4">
            {projectRisks.map(({ project, daysLeft, progress, blocked, staleCards, riskScore }) => (
              <Link key={project.id} href={`${appRoutes.projects}/${project.id}`} className="block rounded-lg border border-border/60 bg-background/60 p-4 transition hover:border-accent/40">
                <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-start">
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className={cn(
                        "rounded-sm border px-2 py-1 font-mono text-xs uppercase tracking-[0.16em]",
                        project.status === "No prazo" && "border-emerald-500/25 bg-emerald-500/10 text-emerald-500",
                        project.status === "Em risco" && "border-accent/25 bg-accent/10 text-accent",
                        project.status === "Atrasado" && "border-destructive/25 bg-destructive/10 text-destructive",
                      )}>
                        {project.status ?? "No prazo"}
                      </span>
                      <span className="meta-label">{project.client}</span>
                    </div>
                    <h3 className="mt-3 text-base font-semibold text-foreground">{project.name}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">
                      {daysLeft >= 0 ? `${daysLeft} dias ate o deadline` : `${Math.abs(daysLeft)} dias atrasado`} · {blocked} bloqueados · {staleCards} sem movimentacao
                    </p>
                  </div>
                  <div className="text-left sm:text-right">
                    <p className="font-mono text-lg font-semibold text-foreground">{progress}%</p>
                    <p className="meta-label">score {riskScore}</p>
                  </div>
                </div>
                <div className="mt-4 h-2 overflow-hidden rounded-full bg-muted">
                  <div className="h-full rounded-full bg-accent" style={{ width: `${progress}%` }} />
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="rounded-lg border border-border/60 bg-card/75 p-5 backdrop-blur-md">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <p className="eyebrow-label">Alertas</p>
              <h2 className="mt-2 text-xl font-semibold text-foreground">Itens que exigem acao</h2>
            </div>
            <Clock3 className="h-5 w-5 text-accent" />
          </div>
          <div className="space-y-3">
            {[
              { label: "Cards vencidos", value: metrics.overdueCards, detail: "Atrasados e nao concluidos" },
              { label: "Cards bloqueados", value: metrics.blockedCards, detail: "Dependem de decisao ou desbloqueio" },
              { label: "Projetos em risco", value: metrics.projectsAtRisk, detail: "Prazo, status ou atividade critica" },
              { label: "Usuarios pendentes", value: metrics.pendingUsers, detail: "Acessos que precisam revisao" },
            ].map((item) => (
              <div key={item.label} className="rounded-lg border border-border/60 bg-background/60 p-4">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm font-semibold text-foreground">{item.label}</p>
                    <p className="mt-1 text-xs text-muted-foreground">{item.detail}</p>
                  </div>
                  <p className={cn("font-mono text-2xl font-semibold", item.value > 0 ? "text-destructive" : "text-emerald-500")}>{item.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

function AdminProductivityView({ projects, users }: { projects: WorkspaceProject[]; users: WorkspaceUser[] }) {
  const metrics = getAdminMetrics(projects, users, []);
  const doneCards = metrics.allCards.filter((card) => card.status === "done").length;
  const cardsByStatus = kanbanColumns.map((column) => ({
    ...column,
    count: metrics.allCards.filter((card) => card.status === column.id).length,
  }));
  const cardsByUser = users.filter((user) => user.role === "developer").map((user) => {
    const assigned = metrics.allCards.filter((card) => card.owner === user.name);

    return {
      user,
      assigned: assigned.length,
      completed: assigned.filter((card) => card.status === "done").length,
      blocked: assigned.filter((card) => card.blocked).length,
    };
  });

  return (
    <div className="space-y-6">
      <header>
        <p className="eyebrow-label">Produtividade</p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Fluxo, gargalos e carga da equipe</h1>
      </header>
      <section className="grid gap-6 xl:grid-cols-2">
        <div className="rounded-lg border border-border/60 bg-card/75 p-5 backdrop-blur-md">
          <div className="mb-5 flex items-center justify-between gap-4">
            <div>
              <p className="eyebrow-label">Kanban</p>
              <h2 className="mt-2 text-xl font-semibold text-foreground">Cards por etapa</h2>
            </div>
            <BarChart3 className="h-5 w-5 text-accent" />
          </div>
          <div className="space-y-4">
            {cardsByStatus.map((item) => {
              const width = metrics.allCards.length ? Math.max((item.count / metrics.allCards.length) * 100, item.count ? 8 : 0) : 0;

              return (
                <div key={item.id}>
                  <div className="mb-2 flex justify-between gap-3">
                    <p className="font-mono text-xs uppercase tracking-[0.16em] text-muted-foreground">{item.label}</p>
                    <p className="font-mono text-sm text-foreground">{item.count}</p>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-muted">
                    <div className="h-full rounded-full bg-accent" style={{ width: `${width}%` }} />
                  </div>
                </div>
              );
            })}
            <p className="pt-2 text-sm text-muted-foreground">{doneCards} cards concluidos de {metrics.allCards.length} no total.</p>
          </div>
        </div>

        <div className="rounded-lg border border-border/60 bg-card/75 p-5 backdrop-blur-md">
          <div className="mb-5 flex items-center justify-between gap-4">
            <div>
              <p className="eyebrow-label">Equipe</p>
              <h2 className="mt-2 text-xl font-semibold text-foreground">Carga por desenvolvedor</h2>
            </div>
            <UserCheck className="h-5 w-5 text-accent" />
          </div>
          <div className="space-y-3">
            {cardsByUser.map(({ user, assigned, completed, blocked }) => (
              <div key={user.id} className="rounded-lg border border-border/60 bg-background/60 p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold text-foreground">{user.name}</p>
                    <p className="mt-1 text-xs text-muted-foreground">{user.stack}</p>
                  </div>
                  <span className="rounded-sm border border-border/60 px-2 py-1 font-mono text-xs uppercase tracking-[0.16em] text-accent">
                    {assigned} cards
                  </span>
                </div>
                <p className="mt-3 text-xs text-muted-foreground">{completed} concluidos · {blocked} bloqueados</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

function AdminContractsView({ projects }: { projects: WorkspaceProject[] }) {
  return (
    <div className="space-y-6">
      <header>
        <p className="eyebrow-label">Contratos</p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Clientes, valores e margem</h1>
      </header>
      <div className="rounded-lg border border-border/60 bg-card/75 p-5 backdrop-blur-md">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] text-left text-sm">
            <thead className="border-b border-border/60 meta-label">
              <tr>
                <th className="py-3 pr-4 font-medium">Cliente</th>
                <th className="py-3 pr-4 font-medium">Projeto</th>
                <th className="py-3 pr-4 font-medium">Contrato</th>
                <th className="py-3 pr-4 font-medium">Custo</th>
                <th className="py-3 pr-4 font-medium">Status</th>
                <th className="py-3 font-medium">Responsavel</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {projects.map((project) => (
                <tr key={project.id}>
                  <td className="py-4 pr-4 text-muted-foreground">{project.client}</td>
                  <td className="py-4 pr-4 font-medium text-foreground">{project.name}</td>
                  <td className="py-4 pr-4 font-mono text-foreground">{currencyFormatter.format(project.contractValue ?? 0)}</td>
                  <td className="py-4 pr-4 font-mono text-muted-foreground">{currencyFormatter.format(project.monthlyCost ?? 0)}</td>
                  <td className="py-4 pr-4">
                    <span className="rounded-sm border border-border/60 px-2 py-1 font-mono text-xs uppercase tracking-[0.16em] text-accent">
                      {project.contractStatus ?? "Ativo"}
                    </span>
                  </td>
                  <td className="py-4 text-muted-foreground">{project.accountOwner ?? "Reply Solutions"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function AdminAuditView({ projects }: { projects: WorkspaceProject[] }) {
  const allCards = projects.flatMap((project) => project.cards.map((card) => ({ ...card, projectName: project.name })));
  const recentActivity = [
    ...projects.map((project) => ({
      id: `project-${project.id}`,
      label: `${project.name} atualizado`,
      actor: project.accountOwner ?? "Reply Solutions",
      date: project.lastActivityAt ?? project.deadline,
      detail: `${project.cards.length} cards · ${project.status ?? "No prazo"}`,
    })),
    ...allCards.slice(0, 8).map((card) => ({
      id: `card-${card.id}`,
      label: `${card.title} movido para ${kanbanColumns.find((column) => column.id === card.status)?.label ?? card.status}`,
      actor: card.owner,
      date: card.updatedAt ?? "2026-05-20",
      detail: card.projectName,
    })),
  ].sort((a, b) => b.date.localeCompare(a.date));

  return (
    <div className="space-y-6">
      <header>
        <p className="eyebrow-label">Auditoria</p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Historico de atividade</h1>
      </header>
      <div className="grid gap-3 lg:grid-cols-2">
        {recentActivity.map((item) => (
          <div key={item.id} className="rounded-lg border border-border/60 bg-card/75 p-5 backdrop-blur-md">
            <p className="text-sm font-semibold text-foreground">{item.label}</p>
            <p className="mt-2 text-xs text-muted-foreground">{item.detail}</p>
            <p className="mt-3 font-mono text-xs uppercase tracking-[0.18em] text-accent">
              {item.actor} · {item.date}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

function ProjectsView({
  projects,
  users,
  canCreate,
  onCreateProject,
}: {
  projects: WorkspaceProject[];
  users: WorkspaceUser[];
  canCreate: boolean;
  onCreateProject: (project: WorkspaceProject) => void;
}) {
  const [form, setForm] = useState({
    name: "",
    client: "",
    stack: "",
    deadline: "",
    estimate: "",
    description: "",
  });

  const createProject = () => {
    if (!form.name.trim()) {
      return;
    }

    onCreateProject({
      id: createId("project"),
      name: form.name,
      client: form.client || "Cliente interno",
      stack: form.stack || "TypeScript",
      deadline: form.deadline || "2026-12-31",
      startDate: new Date().toISOString().slice(0, 10),
      estimate: form.estimate || "4 semanas",
      members: users.filter((user) => user.role === "developer").map((user) => user.name).slice(0, 2),
      description: form.description || "Projeto criado pela dashboard.",
      contractValue: 0,
      monthlyCost: 0,
      status: "No prazo",
      priority: "Media",
      contractStatus: "Pendente",
      accountOwner: users.find((user) => user.role === "admin")?.name ?? "Reply Solutions",
      lastActivityAt: new Date().toISOString().slice(0, 10),
      cards: [],
    });

    setForm({ name: "", client: "", stack: "", deadline: "", estimate: "", description: "" });
  };

  return (
    <div className="grid gap-6 xl:grid-cols-[1fr_360px]">
      <section className="space-y-4">
        <header>
          <p className="eyebrow-label">Projetos</p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Projetos da equipe</h1>
        </header>
        <div className="grid gap-4 lg:grid-cols-2">
          {projects.map((project) => (
            <Link key={project.id} href={`${appRoutes.projects}/${project.id}`} className="rounded-lg border border-border/60 bg-card/75 p-5 backdrop-blur-md transition hover:border-accent/40">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="meta-label">{project.client}</p>
                  <h2 className="mt-3 text-xl font-semibold text-foreground">{project.name}</h2>
                </div>
                <CalendarClock className="h-5 w-5 shrink-0 text-accent" />
              </div>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{project.description}</p>
              <div className="mt-5 grid gap-3 sm:grid-cols-3">
                <span className="rounded-sm border border-border/60 bg-background/55 p-3 text-xs text-muted-foreground">{project.estimate}</span>
                <span className="rounded-sm border border-border/60 bg-background/55 p-3 text-xs text-muted-foreground">{project.deadline}</span>
                <span className="rounded-sm border border-border/60 bg-background/55 p-3 text-xs text-muted-foreground">{project.cards.length} cards</span>
              </div>
              <p className="mt-4 font-mono text-xs uppercase tracking-[0.18em] text-accent">{project.stack}</p>
            </Link>
          ))}
        </div>
      </section>

      {canCreate && (
        <aside className="rounded-lg border border-border/60 bg-card/75 p-5 backdrop-blur-md">
          <p className="eyebrow-label">Novo projeto</p>
          <div className="mt-5 space-y-4">
            <Field label="Nome" value={form.name} onChange={(name) => setForm({ ...form, name })} />
            <Field label="Cliente" value={form.client} onChange={(client) => setForm({ ...form, client })} />
            <Field label="Stack" value={form.stack} onChange={(stack) => setForm({ ...form, stack })} placeholder="Next.js, Go, PostgreSQL" />
            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-1">
              <Field label="Prazo" type="date" value={form.deadline} onChange={(deadline) => setForm({ ...form, deadline })} />
              <Field label="Tempo" value={form.estimate} onChange={(estimate) => setForm({ ...form, estimate })} placeholder="8 semanas" />
            </div>
            <TextArea label="Descricao" value={form.description} onChange={(description) => setForm({ ...form, description })} />
            <Button onClick={createProject} className="w-full gap-2 rounded-sm font-mono text-xs uppercase tracking-[0.14em]">
              <Plus className="h-4 w-4" />
              Criar projeto
            </Button>
          </div>
        </aside>
      )}
    </div>
  );
}

function ProjectKanbanView({
  project,
  users,
  onSaveProject,
}: {
  project: WorkspaceProject;
  users: WorkspaceUser[];
  onSaveProject: (project: WorkspaceProject) => void;
}) {
  const developerNames = users.filter((user) => user.role === "developer").map((user) => user.name);
  const [editingCardId, setEditingCardId] = useState<string | null>(null);
  const [form, setForm] = useState({
    title: "",
    description: "",
    owner: developerNames[0] ?? "Equipe",
    priority: "Media" as ProjectCard["priority"],
    status: "backlog" as KanbanStatus,
  });
  const [draggedCardId, setDraggedCardId] = useState<string | null>(null);

  const editingCard = project.cards.find((card) => card.id === editingCardId);

  const resetForm = () => {
    setEditingCardId(null);
    setForm({ title: "", description: "", owner: developerNames[0] ?? "Equipe", priority: "Media", status: "backlog" });
  };

  const saveCard = () => {
    if (!form.title.trim()) {
      return;
    }

    if (editingCard) {
      onSaveProject({
        ...project,
        cards: project.cards.map((card) => (card.id === editingCard.id ? { ...card, ...form } : card)),
      });
      resetForm();
      return;
    }

    onSaveProject({
      ...project,
      cards: [{ id: createId("card"), ...form }, ...project.cards],
    });
    resetForm();
  };

  const editCard = (card: ProjectCard) => {
    setEditingCardId(card.id);
    setForm({
      title: card.title,
      description: card.description,
      owner: card.owner,
      priority: card.priority,
      status: card.status,
    });
  };

  const deleteCard = (cardId: string) => {
    onSaveProject({ ...project, cards: project.cards.filter((card) => card.id !== cardId) });
    if (editingCardId === cardId) {
      resetForm();
    }
  };

  const startCardDrag = (event: DragEvent<HTMLElement>, cardId: string) => {
    event.dataTransfer.effectAllowed = "move";
    event.dataTransfer.setData("text/plain", cardId);
    setDraggedCardId(cardId);
  };

  const allowCardDrop = (event: DragEvent<HTMLElement>) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  };

  const dropCard = (event: DragEvent<HTMLElement>, nextStatus: KanbanStatus, targetCardId?: string) => {
    event.preventDefault();
    event.stopPropagation();
    const cardId = event.dataTransfer.getData("text/plain") || draggedCardId;

    if (!cardId) {
      return;
    }

    const draggedCard = project.cards.find((card) => card.id === cardId);

    if (!draggedCard || targetCardId === cardId) {
      setDraggedCardId(null);
      return;
    }

    const movedCard = { ...draggedCard, status: nextStatus };
    const remainingCards = project.cards.filter((card) => card.id !== cardId);
    const targetIndex = targetCardId ? remainingCards.findIndex((card) => card.id === targetCardId) : -1;
    const nextCards =
      targetIndex >= 0
        ? [...remainingCards.slice(0, targetIndex), movedCard, ...remainingCards.slice(targetIndex)]
        : [movedCard, ...remainingCards];

    onSaveProject({ ...project, cards: nextCards });
    setDraggedCardId(null);
  };

  return (
    <div className="space-y-6">
      <header className="flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
        <div>
          <Link href={appRoutes.projects} className="mb-4 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-4 w-4" />
            Projects
          </Link>
          <p className="eyebrow-label">{project.client}</p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">{project.name}</h1>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted-foreground">{project.description}</p>
        </div>
        <div className="rounded-lg border border-border/60 bg-card/75 p-4">
          <p className="meta-label">Stack</p>
          <p className="mt-2 text-sm text-foreground">{project.stack}</p>
        </div>
      </header>

      <section className="grid gap-6 xl:grid-cols-[1fr_360px]">
        <div className="grid gap-4 lg:grid-cols-4">
          {kanbanColumns.map((column) => (
            <div
              key={column.id}
              onDragOver={allowCardDrop}
              onDrop={(event) => dropCard(event, column.id)}
              className={cn(
                "min-h-96 rounded-lg border border-border/60 bg-card/60 p-4 backdrop-blur-md transition",
                draggedCardId && "border-accent/35 bg-accent/5",
              )}
            >
              <div className="mb-4 flex items-center justify-between">
                <h2 className="font-mono text-xs uppercase tracking-[0.18em] text-foreground">{column.label}</h2>
                <span className="rounded-full border border-border/60 px-2 py-1 text-xs text-muted-foreground">
                  {project.cards.filter((card) => card.status === column.id).length}
                </span>
              </div>
              <div className="space-y-3">
                {project.cards
                  .filter((card) => card.status === column.id)
                  .map((card) => (
                    <article
                      key={card.id}
                      draggable
                      onDragStart={(event) => startCardDrag(event, card.id)}
                      onDragEnd={() => setDraggedCardId(null)}
                      onDragOver={allowCardDrop}
                      onDrop={(event) => dropCard(event, column.id, card.id)}
                      className={cn(
                        "cursor-grab rounded-lg border border-border/60 bg-background/70 p-4 transition active:cursor-grabbing",
                        draggedCardId === card.id && "scale-[0.98] border-accent/50 opacity-60",
                      )}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex min-w-0 gap-2">
                          <GripVertical className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
                          <h3 className="text-sm font-semibold text-foreground">{card.title}</h3>
                        </div>
                        <span
                          className={cn(
                            "rounded-sm px-2 py-1 font-mono text-xs uppercase tracking-[0.14em]",
                            card.priority === "Alta" && "bg-destructive/10 text-destructive",
                            card.priority === "Media" && "bg-accent/10 text-accent",
                            card.priority === "Baixa" && "bg-emerald-500/10 text-emerald-500",
                          )}
                        >
                          {card.priority}
                        </span>
                      </div>
                      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{card.description}</p>
                      <div className="mt-4 flex items-center justify-between gap-3">
                        <p className="text-xs text-muted-foreground">{card.owner}</p>
                        <p className="meta-label">Arraste</p>
                      </div>
                      <div className="mt-4 flex gap-2">
                        <Button size="sm" variant="outline" onClick={() => editCard(card)} className="h-8 gap-2 rounded-sm text-xs">
                          <Pencil className="h-3.5 w-3.5" />
                          Editar
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => deleteCard(card.id)} className="h-8 gap-2 rounded-sm text-xs">
                          <Trash2 className="h-3.5 w-3.5" />
                          Apagar
                        </Button>
                      </div>
                    </article>
                  ))}
              </div>
            </div>
          ))}
        </div>

        <aside className="rounded-lg border border-border/60 bg-card/75 p-5 backdrop-blur-md">
          <p className="eyebrow-label">
            {editingCard ? "Editar card" : "Novo card"}
          </p>
          <div className="mt-5 space-y-4">
            <Field label="Titulo" value={form.title} onChange={(title) => setForm({ ...form, title })} />
            <TextArea label="Informacoes" value={form.description} onChange={(description) => setForm({ ...form, description })} />
            <SelectField label="Responsavel" value={form.owner} onChange={(owner) => setForm({ ...form, owner })} options={developerNames.length ? developerNames : ["Equipe"]} />
            <SelectField label="Prioridade" value={form.priority} onChange={(priority) => setForm({ ...form, priority })} options={["Baixa", "Media", "Alta"] as const} />
            <SelectField label="Coluna" value={form.status} onChange={(status) => setForm({ ...form, status })} options={kanbanColumns.map((column) => column.id)} />
            <div className="flex gap-2">
              <Button onClick={saveCard} className="flex-1 gap-2 rounded-sm font-mono text-xs uppercase tracking-[0.14em]">
                <CheckCircle2 className="h-4 w-4" />
                Salvar
              </Button>
              {editingCard && (
                <Button variant="outline" onClick={resetForm} className="rounded-sm">
                  Cancelar
                </Button>
              )}
            </div>
          </div>
        </aside>
      </section>
    </div>
  );
}

function FinanceView({
  entries,
  onChange,
}: {
  entries: FinanceEntry[];
  onChange: (entries: FinanceEntry[]) => void;
}) {
  const [form, setForm] = useState({
    label: "",
    amount: "",
    type: "incoming" as FinanceEntry["type"],
    dueDate: "",
  });

  const totals = useMemo(
    () => ({
      received: entries.filter((entry) => entry.type === "received").reduce((sum, entry) => sum + entry.amount, 0),
      incoming: entries.filter((entry) => entry.type === "incoming").reduce((sum, entry) => sum + entry.amount, 0),
      expense: entries.filter((entry) => entry.type === "expense").reduce((sum, entry) => sum + entry.amount, 0),
    }),
    [entries],
  );
  const grossFlow = totals.received + totals.incoming + totals.expense;
  const projectedBalance = totals.received + totals.incoming - totals.expense;
  const realizedMargin = totals.received > 0 ? Math.round(((totals.received - totals.expense) / totals.received) * 100) : 0;
  const maxEntryAmount = Math.max(...entries.map((entry) => entry.amount), 1);
  const distribution = (["received", "incoming", "expense"] as const).map((type) => ({
    type,
    value: totals[type],
    percentage: grossFlow > 0 ? Math.round((totals[type] / grossFlow) * 100) : 0,
    ...financeTypeMeta[type],
  }));

  const addEntry = () => {
    if (!form.label.trim()) {
      return;
    }

    onChange([
      { id: createId("fin"), label: form.label, amount: Number(form.amount) || 0, type: form.type, dueDate: form.dueDate || "2026-12-31" },
      ...entries,
    ]);
    setForm({ label: "", amount: "", type: "incoming", dueDate: "" });
  };

  return (
    <div className="space-y-6">
      <header className="flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
        <div>
          <p className="eyebrow-label">Financeiro</p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Fluxo financeiro da operacao</h1>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            Acompanhe receita realizada, previsoes de entrada, custos registrados e saldo projetado.
          </p>
        </div>
        <div className="rounded-lg border border-border/60 bg-card/75 p-4 backdrop-blur-md">
          <p className="meta-label">Saldo projetado</p>
          <p className={cn("mt-2 text-2xl font-semibold", projectedBalance >= 0 ? "text-emerald-500" : "text-destructive")}>
            {currencyFormatter.format(projectedBalance)}
          </p>
        </div>
      </header>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-lg border border-emerald-500/25 bg-emerald-500/10 p-5 backdrop-blur-md">
          <TrendingUp className="mb-5 h-5 w-5 text-emerald-500" />
          <p className="eyebrow-label">Ja entrou</p>
          <p className="mt-3 text-2xl font-semibold text-foreground">{currencyFormatter.format(totals.received)}</p>
          <p className="mt-2 text-sm text-muted-foreground">Receita realizada</p>
        </div>
        <div className="rounded-lg border border-accent/25 bg-accent/10 p-5 backdrop-blur-md">
          <WalletCards className="mb-5 h-5 w-5 text-accent" />
          <p className="eyebrow-label">Vai entrar</p>
          <p className="mt-3 text-2xl font-semibold text-foreground">{currencyFormatter.format(totals.incoming)}</p>
          <p className="mt-2 text-sm text-muted-foreground">Receita prevista</p>
        </div>
        <div className="rounded-lg border border-destructive/25 bg-destructive/10 p-5 backdrop-blur-md">
          <TrendingDown className="mb-5 h-5 w-5 text-destructive" />
          <p className="eyebrow-label">Ja saiu</p>
          <p className="mt-3 text-2xl font-semibold text-foreground">{currencyFormatter.format(totals.expense)}</p>
          <p className="mt-2 text-sm text-muted-foreground">Custos registrados</p>
        </div>
        <div className="rounded-lg border border-border/60 bg-card/75 p-5 backdrop-blur-md">
          <BarChart3 className="mb-5 h-5 w-5 text-accent" />
          <p className="eyebrow-label">Margem realizada</p>
          <p className={cn("mt-3 text-2xl font-semibold", realizedMargin >= 0 ? "text-foreground" : "text-destructive")}>
            {realizedMargin}%
          </p>
          <p className="mt-2 text-sm text-muted-foreground">Entrou menos saiu</p>
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[1fr_380px]">
        <div className="space-y-6">
          <div className="rounded-lg border border-border/60 bg-card/75 p-5 backdrop-blur-md">
            <div className="mb-6 flex items-center justify-between gap-4">
              <div>
                <p className="eyebrow-label">Distribuicao</p>
                <h2 className="mt-2 text-xl font-semibold text-foreground">Composicao do fluxo</h2>
              </div>
              <CircleDollarSign className="h-5 w-5 text-accent" />
            </div>
            <div className="space-y-4">
              {distribution.map((item) => (
                <div key={item.type}>
                  <div className="mb-2 flex items-center justify-between gap-3">
                    <p className="font-mono text-xs uppercase tracking-[0.16em] text-muted-foreground">{item.label}</p>
                    <p className={cn("font-mono text-sm", item.tone)}>
                      {currencyFormatter.format(item.value)} · {item.percentage}%
                    </p>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-muted">
                    <div className={cn("h-full rounded-full", item.bar)} style={{ width: `${Math.max(item.percentage, item.value > 0 ? 4 : 0)}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-lg border border-border/60 bg-card/75 p-5 backdrop-blur-md">
            <div className="mb-5 flex items-center justify-between gap-4">
              <div>
                <p className="eyebrow-label">Lancamentos</p>
                <h2 className="mt-2 text-xl font-semibold text-foreground">Historico financeiro</h2>
              </div>
              <span className="rounded-full border border-border/60 px-3 py-1 text-xs text-muted-foreground">
                {entries.length} itens
              </span>
            </div>
            <div className="space-y-3">
              {entries.map((entry) => {
                const meta = financeTypeMeta[entry.type];
                const width = Math.max(Math.round((entry.amount / maxEntryAmount) * 100), 8);

                return (
                  <div key={entry.id} className="rounded-lg border border-border/60 bg-background/60 p-4">
                    <div className="grid gap-3 sm:grid-cols-[1fr_150px_42px] sm:items-center">
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className={cn("rounded-sm border px-2 py-1 font-mono text-xs uppercase tracking-[0.16em]", meta.surface, meta.tone)}>
                            {meta.label}
                          </span>
                          <span className="meta-label">{entry.dueDate}</span>
                        </div>
                        <p className="mt-3 text-sm font-semibold text-foreground">{entry.label}</p>
                      </div>
                      <p className={cn("font-mono text-sm font-semibold sm:text-right", meta.tone)}>
                        {currencyFormatter.format(entry.amount)}
                      </p>
                      <Button size="icon" variant="outline" onClick={() => onChange(entries.filter((item) => item.id !== entry.id))} className="h-9 w-9 rounded-sm">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-muted">
                      <div className={cn("h-full rounded-full", meta.bar)} style={{ width: `${width}%` }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <aside className="rounded-lg border border-border/60 bg-card/75 p-5 backdrop-blur-md xl:sticky xl:top-24 xl:self-start">
          <p className="eyebrow-label">Novo lancamento</p>
          <h2 className="mt-2 text-xl font-semibold text-foreground">Registrar valor</h2>
          <div className="mt-5 space-y-4">
            <Field label="Descricao" value={form.label} onChange={(label) => setForm({ ...form, label })} />
            <Field label="Valor" type="number" value={form.amount} onChange={(amount) => setForm({ ...form, amount })} />
            <Field label="Data" type="date" value={form.dueDate} onChange={(dueDate) => setForm({ ...form, dueDate })} />
            <SelectField label="Tipo" value={form.type} onChange={(type) => setForm({ ...form, type })} options={["received", "incoming", "expense"] as const} />
            <div className={cn("rounded-lg border p-4", financeTypeMeta[form.type].surface)}>
              <p className="meta-label">Previa</p>
              <p className={cn("mt-2 text-lg font-semibold", financeTypeMeta[form.type].tone)}>
                {currencyFormatter.format(Number(form.amount) || 0)}
              </p>
              <p className="mt-1 text-sm text-muted-foreground">{financeTypeMeta[form.type].label}</p>
            </div>
            <Button onClick={addEntry} className="w-full gap-2 rounded-sm font-mono text-xs uppercase tracking-[0.14em]">
              <Plus className="h-4 w-4" />
              Adicionar lancamento
            </Button>
          </div>
        </aside>
      </section>
    </div>
  );
}

function UsersView({
  users,
  onChange,
}: {
  users: WorkspaceUser[];
  onChange: (users: WorkspaceUser[]) => void;
}) {
  const emptyForm = {
    name: "",
    email: "",
    phone: "",
    photo: "",
    role: "developer" as UserRole,
    stack: "",
    status: "Ativo" as WorkspaceUser["status"],
  };
  const [editingUserId, setEditingUserId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);
  const editingUser = users.find((user) => user.id === editingUserId);

  const saveUser = () => {
    if (!form.name.trim() || !form.email.trim()) {
      return;
    }

    if (editingUser) {
      onChange(users.map((user) => (user.id === editingUser.id ? { ...user, ...form, photo: form.photo || initials(form.name) } : user)));
      setEditingUserId(null);
      setForm(emptyForm);
      return;
    }

    onChange([{ id: createId("user"), ...form, photo: form.photo || initials(form.name) }, ...users]);
    setForm(emptyForm);
  };

  const editUser = (user: WorkspaceUser) => {
    setEditingUserId(user.id);
    setForm({
      name: user.name,
      email: user.email,
      phone: user.phone,
      photo: user.photo,
      role: user.role,
      stack: user.stack,
      status: user.status,
    });
  };

  return (
    <div className="grid gap-6 xl:grid-cols-[1fr_380px]">
      <section className="space-y-5">
        <header>
          <p className="eyebrow-label">Usuarios</p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">Equipe e acessos</h1>
        </header>
        <div className="grid gap-4 lg:grid-cols-2">
          {users.map((user) => (
            <article key={user.id} className="rounded-lg border border-border/60 bg-card/75 p-5 backdrop-blur-md">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border border-border/60 bg-background/70 font-mono text-sm text-foreground">
                  {user.photo}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-semibold text-foreground">{user.name}</p>
                  <p className="mt-1 break-all text-sm text-muted-foreground">{user.email}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{user.phone}</p>
                </div>
              </div>
              <p className="mt-4 text-sm text-muted-foreground">{user.stack}</p>
              <div className="mt-5 flex flex-wrap items-center gap-2">
                <span className="rounded-sm border border-border/60 px-2 py-1 font-mono text-xs uppercase tracking-[0.18em] text-accent">{user.role}</span>
                <span className="rounded-sm border border-border/60 px-2 py-1 meta-label">{user.status}</span>
                <Button size="sm" variant="outline" onClick={() => editUser(user)} className="ml-auto h-8 gap-2 rounded-sm text-xs">
                  <Pencil className="h-3.5 w-3.5" />
                  Editar
                </Button>
                <Button size="sm" variant="outline" onClick={() => onChange(users.filter((item) => item.id !== user.id))} className="h-8 gap-2 rounded-sm text-xs">
                  <Trash2 className="h-3.5 w-3.5" />
                  Apagar
                </Button>
              </div>
            </article>
          ))}
        </div>
      </section>

      <aside className="rounded-lg border border-border/60 bg-card/75 p-5 backdrop-blur-md">
        <p className="eyebrow-label">
          {editingUser ? "Editar usuario" : "Novo usuario"}
        </p>
        <div className="mt-5 space-y-4">
          <Field label="Nome" value={form.name} onChange={(name) => setForm({ ...form, name })} />
          <Field label="Email" type="email" value={form.email} onChange={(email) => setForm({ ...form, email })} />
          <Field label="Telefone" value={form.phone} onChange={(phone) => setForm({ ...form, phone })} />
          <Field label="Foto ou iniciais" value={form.photo} onChange={(photo) => setForm({ ...form, photo })} placeholder="AR ou URL futura" />
          <Field label="Stack / funcao" value={form.stack} onChange={(stack) => setForm({ ...form, stack })} />
          <SelectField label="Perfil" value={form.role} onChange={(role) => setForm({ ...form, role })} options={["developer", "admin"] as const} />
          <SelectField label="Status" value={form.status} onChange={(status) => setForm({ ...form, status })} options={["Ativo", "Pendente", "Bloqueado"] as const} />
          <div className="flex gap-2">
            <Button onClick={saveUser} className="flex-1 gap-2 rounded-sm font-mono text-xs uppercase tracking-[0.14em]">
              <CheckCircle2 className="h-4 w-4" />
              Salvar
            </Button>
            {editingUser && (
              <Button
                variant="outline"
                onClick={() => {
                  setEditingUserId(null);
                  setForm(emptyForm);
                }}
                className="rounded-sm"
              >
                Cancelar
              </Button>
            )}
          </div>
        </div>
      </aside>
    </div>
  );
}

function initials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}
