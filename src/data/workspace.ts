export type UserRole = "developer" | "admin";

export type WorkspaceUser = {
  id: string;
  name: string;
  email: string;
  phone: string;
  photo: string;
  role: UserRole;
  stack: string;
  status: "Ativo" | "Pendente" | "Bloqueado";
};

export type KanbanStatus = "backlog" | "progress" | "review" | "done";

export type ProjectCard = {
  id: string;
  title: string;
  description: string;
  owner: string;
  priority: "Baixa" | "Media" | "Alta";
  status: KanbanStatus;
  dueDate?: string;
  updatedAt?: string;
  blocked?: boolean;
  type?: "Feature" | "Bug" | "Melhoria" | "Risco";
};

export type WorkspaceProject = {
  id: string;
  name: string;
  client: string;
  stack: string;
  deadline: string;
  startDate: string;
  estimate: string;
  members: string[];
  description: string;
  contractValue: number;
  monthlyCost: number;
  status: "No prazo" | "Em risco" | "Atrasado";
  priority: "Baixa" | "Media" | "Alta";
  contractStatus: "Ativo" | "Pendente" | "Encerrando";
  accountOwner: string;
  lastActivityAt: string;
  cards: ProjectCard[];
};

export type FinanceEntry = {
  id: string;
  label: string;
  amount: number;
  type: "received" | "incoming" | "expense";
  dueDate: string;
};

export const currentDeveloperId = "user-ana";

export const initialUsers: WorkspaceUser[] = [
  {
    id: "user-ana",
    name: "Ana Ribeiro",
    email: "ana@replysolutions.com",
    phone: "+55 21 98888-1001",
    photo: "AR",
    role: "developer",
    stack: "React, TypeScript, Node.js",
    status: "Ativo",
  },
  {
    id: "user-bruno",
    name: "Bruno Costa",
    email: "bruno@replysolutions.com",
    phone: "+55 21 98888-1002",
    photo: "BC",
    role: "developer",
    stack: "Python, Go, AWS",
    status: "Ativo",
  },
  {
    id: "user-marina",
    name: "Marina Lopes",
    email: "marina@replysolutions.com",
    phone: "+55 21 98888-1003",
    photo: "ML",
    role: "admin",
    stack: "Gestao, Financeiro, Produto",
    status: "Ativo",
  },
];

export const initialProjects: WorkspaceProject[] = [
  {
    id: "reply-nova",
    name: "NOVA",
    client: "Reply Solutions",
    stack: "Next.js, TypeScript, Python, Go",
    deadline: "2026-07-18",
    startDate: "2026-04-14",
    estimate: "12 semanas",
    members: ["Ana Ribeiro", "Bruno Costa"],
    description: "Produto local para revisao de vulnerabilidades antes do commit e consolidacao de indicadores tecnicos.",
    contractValue: 148000,
    monthlyCost: 32000,
    status: "No prazo",
    priority: "Alta",
    contractStatus: "Ativo",
    accountOwner: "Marina Lopes",
    lastActivityAt: "2026-05-22",
    cards: [
      {
        id: "card-policy-engine",
        title: "Motor de regras por stack",
        description: "Mapear regras base para Java, TypeScript, Python, Go e C#.",
        owner: "Ana Ribeiro",
        priority: "Alta",
        status: "progress",
        dueDate: "2026-05-30",
        updatedAt: "2026-05-22",
        type: "Feature",
      },
      {
        id: "card-local-agent",
        title: "Agente local pre-commit",
        description: "Executar analise incremental no diff antes do commit.",
        owner: "Bruno Costa",
        priority: "Alta",
        status: "review",
        dueDate: "2026-05-26",
        updatedAt: "2026-05-21",
        type: "Feature",
      },
      {
        id: "card-risk-dashboard",
        title: "Indicadores de risco por equipe",
        description: "Exibir achados, correcoes e recorrencia por membro.",
        owner: "Ana Ribeiro",
        priority: "Media",
        status: "backlog",
        dueDate: "2026-06-04",
        updatedAt: "2026-05-18",
        blocked: true,
        type: "Risco",
      },
    ],
  },
  {
    id: "nova-bank-portal",
    name: "Portal NovaBank",
    client: "NovaBank",
    stack: "React, Kotlin, PostgreSQL",
    deadline: "2026-08-05",
    startDate: "2026-03-25",
    estimate: "16 semanas",
    members: ["Ana Ribeiro"],
    description: "Portal operacional para suporte, auditoria e indicadores de atendimento.",
    contractValue: 196000,
    monthlyCost: 58000,
    status: "Em risco",
    priority: "Alta",
    contractStatus: "Ativo",
    accountOwner: "Marina Lopes",
    lastActivityAt: "2026-05-19",
    cards: [
      {
        id: "card-auth-flow",
        title: "Revisar fluxo de autenticacao",
        description: "Unificar login, MFA e recuperacao de sessao.",
        owner: "Ana Ribeiro",
        priority: "Alta",
        status: "progress",
        dueDate: "2026-05-24",
        updatedAt: "2026-05-19",
        blocked: true,
        type: "Bug",
      },
    ],
  },
];

export const initialFinanceEntries: FinanceEntry[] = [
  {
    id: "fin-001",
    label: "Entrada - NOVA",
    amount: 48500,
    type: "received",
    dueDate: "2026-05-10",
  },
  {
    id: "fin-002",
    label: "Parcela NovaBank",
    amount: 32000,
    type: "incoming",
    dueDate: "2026-06-03",
  },
  {
    id: "fin-003",
    label: "Infraestrutura cloud e ferramentas",
    amount: 11800,
    type: "expense",
    dueDate: "2026-05-22",
  },
];
