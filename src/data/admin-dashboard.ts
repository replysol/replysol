import type { LucideIcon } from "lucide-react";
import {
  BellRing,
  BriefcaseBusiness,
  CircleDollarSign,
  Rocket,
  ShieldCheck,
  Target,
} from "lucide-react";
import type { ChartConfig } from "@/components/ui/chart";

export type OverviewCard = {
  title: string;
  value: string;
  change: string;
  icon: LucideIcon;
};

export type PipelineStage = {
  stage: string;
  count: number;
  progress: number;
};

export type RecentProject = {
  client: string;
  project: string;
  owner: string;
  status: "Em andamento" | "QA" | "Descoberta" | "Entregue";
  priority: "Alta" | "Média" | "Baixa";
};

export type ActivityItem = {
  title: string;
  description: string;
  time: string;
};

export type TeamCapacityItem = {
  name: string;
  role: string;
  load: number;
};

export type PerformanceItem = {
  month: string;
  entradas: number;
  entregas: number;
};

export type HighlightItem = {
  title: string;
  description: string;
  icon: LucideIcon;
};

export const overviewCards: OverviewCard[] = [
  {
    title: "Leads em negociação",
    value: "38",
    change: "+12% na última semana",
    icon: Target,
  },
  {
    title: "Projetos ativos",
    value: "12",
    change: "4 em desenvolvimento agora",
    icon: BriefcaseBusiness,
  },
  {
    title: "Deploys no mês",
    value: "27",
    change: "Janela média de 14 min",
    icon: Rocket,
  },
  {
    title: "Receita prevista",
    value: "R$ 128k",
    change: "92% da meta do mês",
    icon: CircleDollarSign,
  },
];

export const performanceData: PerformanceItem[] = [
  { month: "Jan", entradas: 18, entregas: 10 },
  { month: "Fev", entradas: 24, entregas: 16 },
  { month: "Mar", entradas: 21, entregas: 15 },
  { month: "Abr", entradas: 32, entregas: 20 },
  { month: "Mai", entradas: 28, entregas: 24 },
  { month: "Jun", entradas: 35, entregas: 27 },
];

export const performanceChartConfig: ChartConfig = {
  entradas: {
    label: "Entradas",
    color: "hsl(var(--accent))",
  },
  entregas: {
    label: "Entregas",
    color: "hsl(var(--foreground) / 0.75)",
  },
};

export const projectStages: PipelineStage[] = [
  { stage: "Descoberta", count: 6, progress: 75 },
  { stage: "Planejamento", count: 4, progress: 56 },
  { stage: "Desenvolvimento", count: 7, progress: 82 },
  { stage: "QA / Homologação", count: 3, progress: 43 },
];

export const recentProjects: RecentProject[] = [
  {
    client: "NovaBank",
    project: "Portal de onboarding",
    owner: "Marina",
    status: "Em andamento",
    priority: "Alta",
  },
  {
    client: "FleetOps",
    project: "Painel de logística",
    owner: "Victor",
    status: "QA",
    priority: "Média",
  },
  {
    client: "PetCare",
    project: "App de agendamento",
    owner: "Camila",
    status: "Descoberta",
    priority: "Alta",
  },
  {
    client: "BuildFlow",
    project: "Integração ERP",
    owner: "João",
    status: "Entregue",
    priority: "Baixa",
  },
];

export const activityFeed: ActivityItem[] = [
  {
    title: "Deploy em produção concluído",
    description: "Painel do cliente NovaBank publicado sem rollback.",
    time: "há 18 min",
  },
  {
    title: "Novo lead entrou no pipeline",
    description: "Startup HealthOS pediu orçamento para plataforma web + mobile.",
    time: "há 42 min",
  },
  {
    title: "QA abriu novos apontamentos",
    description: "3 bugs críticos encontrados no fluxo de checkout do projeto FleetOps.",
    time: "há 1h",
  },
  {
    title: "Escopo revisado com cliente",
    description: "BuildFlow aprovou fase 2 com dashboard financeiro e alertas.",
    time: "há 2h",
  },
];

export const teamCapacity: TeamCapacityItem[] = [
  { name: "Victor", role: "Backend / Arquitetura", load: 84 },
  { name: "Camila", role: "Frontend / UX", load: 72 },
  { name: "Marina", role: "Produto / QA", load: 67 },
  { name: "João", role: "Mobile / Integrações", load: 91 },
];

export const highlightItems: HighlightItem[] = [
  {
    title: "Alerta interno",
    description: "Cliente FleetOps pediu antecipação da entrega mobile para sexta-feira.",
    icon: BellRing,
  },
  {
    title: "Próximo deploy",
    description: "Janela de publicação programada para hoje às 22:30 com rollback preparado.",
    icon: Rocket,
  },
  {
    title: "Observação",
    description: "Dashboard e autenticação estão mockados para fluxo interno e apresentação visual.",
    icon: ShieldCheck,
  },
];

export const statusVariantMap = {
  "Em andamento": "default",
  QA: "secondary",
  Descoberta: "outline",
  Entregue: "secondary",
} as const;
