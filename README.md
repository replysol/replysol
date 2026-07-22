# Reply Solutions

Site institucional da Reply Solutions, desenvolvido com Next.js, React, TypeScript e Tailwind CSS.

O projeto inclui a landing page principal, paginas de servicos e internacionalizacao via cookie/deteccao de pais.
Tambem inclui um workspace mockado com login, dashboard do desenvolvedor, projetos, kanban, admin, financeiro e usuarios.

## Stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS
- Radix UI
- Lucide React
- Framer Motion
- Jest + Testing Library
- Playwright

## Funcionalidades

- Landing page responsiva da Reply Solutions
- Pagina dedicada a desenvolvimento de software
- Pagina dedicada a pentest e seguranca ofensiva
- Multi-idioma em `pt-br` e `en` sem prefixo de rota
- Deteccao inicial de idioma por pais via headers de geolocalizacao
- Preferencia de idioma persistida em cookie
- Alternancia de tema claro/escuro
- Workspace interno mockado com perfis de desenvolvedor e admin
- Projetos com prazo, stack, tempo estimado e kanban editavel
- Admin com financeiro e gestao de usuarios
- Sitemap, robots, manifest e metadata
- Testes unitarios para metadata e componentes principais

## Rotas

- `/` - Site principal
- `/software-development` - Pagina de desenvolvimento de software
- `/pentest` - Pagina de pentest e seguranca ofensiva
- `/login` - Acesso mockado ao workspace
- `/dashboard` - Dashboard do desenvolvedor
- `/projects` - Lista e criacao de projetos
- `/projects/[projectId]` - Kanban do projeto
- `/admin` - Dashboard administrativo
- `/admin/risks` - Saude dos projetos, riscos e alertas
- `/admin/productivity` - Fluxo do kanban e carga da equipe
- `/admin/finance` - Financeiro
- `/admin/contracts` - Clientes, contratos, valores e responsaveis
- `/admin/users` - Gestao de usuarios
- `/admin/audit` - Atividade recente e auditoria

## Multi-idioma

O idioma e definido por cookie:

```text
reply_locale=pt-br
reply_locale=en
```

Na primeira visita, o proxy tenta detectar o pais pelos headers:

- `x-vercel-ip-country`
- `cf-ipcountry`
- `x-country-code`

Se o pais for `BR`, o site inicia em portugues. Para outros paises, inicia em ingles. Se nao houver header de pais, o fallback e `pt-br`.

Os textos ficam centralizados em:

```text
src/i18n/dictionaries.ts
```

## Como rodar

Instale as dependencias:

```bash
npm install
```

Rode em desenvolvimento:

```bash
npm run dev
```

Build de producao:

```bash
npm run build
```

Inicie o build:

```bash
npm start
```

## Qualidade

Lint:

```bash
npm run lint
```

Testes:

```bash
npm test
```

TypeScript:

```bash
npx tsc --noEmit
```

## Estrutura principal

```text
app/                         Rotas do Next App Router
src/components/              Componentes de UI e secoes da landing
src/components/shared/       Navbar, brand, tema e elementos compartilhados
src/i18n/                    Configuracao e dicionarios de idioma
src/data/                    Dados mockados do workspace
src/lib/                     Helpers de metadata e utils
src/views/                   Views de paginas mais complexas
src/test/                    Testes automatizados
src/assets/                  Imagens e assets usados no site
```

## Observacoes

- O projeto usa `npm` como gerenciador principal.
- Os lockfiles do Bun foram removidos para evitar divergencia com `package-lock.json`.
- O formulario de contato envia para o endpoint `/api/contact`, que repassa a mensagem para um webhook do Discord configurado em `DISCORD_CONTACT_WEBHOOK_URL`.

## Variaveis de ambiente

Crie um arquivo `.env.local` com:

```bash
DISCORD_CONTACT_WEBHOOK_URL="https://discord.com/api/webhooks/..."
```
