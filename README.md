# Reply Solutions

Site institucional da Reply Solutions, desenvolvido com Next.js, React, TypeScript e Tailwind CSS.

O projeto inclui a landing page principal, uma pagina de produto para o **IA Code Reviewer Security**, internacionalizacao via cookie/deteccao de pais e uma area administrativa demonstrativa com dados mockados.

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
- Pagina dedicada ao produto IA Code Reviewer Security
- Multi-idioma em `pt-br` e `en` sem prefixo de rota
- Deteccao inicial de idioma por pais via headers de geolocalizacao
- Preferencia de idioma persistida em cookie
- Alternancia de tema claro/escuro
- Area admin demonstrativa com login mockado
- Sitemap, robots, manifest e metadata
- Testes unitarios para autenticacao/admin/metadata

## Rotas

- `/` - Site principal
- `/ia-code-reviewer-security` - Pagina do produto IA Code Reviewer Security
- `/admin` - Entrada administrativa
- `/admin/login` - Login administrativo mockado
- `/admin/dashboard` - Alias de dashboard
- `/dashboard/admin` - Dashboard administrativo mockado

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

## Admin mockado

O fluxo administrativo e apenas demonstrativo. As credenciais mockadas ficam em:

```text
src/lib/admin-auth.ts
```

Esse fluxo usa `localStorage` e nao deve ser tratado como autenticacao real de producao.

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
src/components/admin/        Componentes da area administrativa
src/components/shared/       Navbar, brand, tema e elementos compartilhados
src/i18n/                    Configuracao e dicionarios de idioma
src/lib/                     Helpers de metadata, autenticacao mockada e utils
src/views/                   Views de paginas mais complexas
src/test/                    Testes automatizados
src/assets/                  Imagens e assets usados no site
```

## Observacoes

- O projeto usa `npm` como gerenciador principal.
- Os lockfiles do Bun foram removidos para evitar divergencia com `package-lock.json`.
- A pagina de contato atualmente usa `mailto:`.
- A dashboard administrativa e uma demonstracao visual com dados mockados.
