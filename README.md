# Reply Solutions

Site institucional da Reply Solutions, desenvolvido com Next.js, React, TypeScript e Tailwind CSS.

O projeto inclui a landing page principal, uma pagina de produto para o **IA Code Reviewer Security** e internacionalizacao via cookie/deteccao de pais.

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
- Sitemap, robots, manifest e metadata
- Testes unitarios para metadata e componentes principais

## Rotas

- `/` - Site principal
- `/ia-code-reviewer-security` - Pagina do produto IA Code Reviewer Security

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
src/lib/                     Helpers de metadata e utils
src/views/                   Views de paginas mais complexas
src/test/                    Testes automatizados
src/assets/                  Imagens e assets usados no site
```

## Observacoes

- O projeto usa `npm` como gerenciador principal.
- Os lockfiles do Bun foram removidos para evitar divergencia com `package-lock.json`.
- A pagina de contato atualmente usa `mailto:`.
