"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Check,
  CheckCircle2,
  ChevronDown,
  CircleDollarSign,
  Clock3,
  Globe2,
  LayoutTemplate,
  MessageCircleMore,
  MousePointerClick,
  Paintbrush,
  Search,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Store,
  Target,
  Zap,
} from "lucide-react";
import Brand from "@/components/shared/brand";
import { appRoutes } from "@/config/routes";
import { useI18n } from "@/i18n/locale-provider";
import type { Locale } from "@/i18n/config";
import { cn } from "@/lib/utils";

type SubmitState = "idle" | "sending" | "success" | "error";

const deliveryIcons = [
  LayoutTemplate,
  Paintbrush,
  Smartphone,
  MessageCircleMore,
  Search,
  Globe2,
] as const;

const benefitIcons = [Store, MousePointerClick, ShieldCheck] as const;

const content = {
  "pt-br": {
    header: {
      response: "Retorno em até 1 dia útil",
      cta: "Pedir orçamento",
      language: "Mudar idioma",
    },
    hero: {
      eyebrow: "Seu primeiro site profissional",
      title: "Seu negócio já existe.",
      titleAccent: "Agora ele precisa ser encontrado.",
      description:
        "Criamos uma presença digital clara e profissional para sua empresa transmitir confiança, apresentar seus serviços e receber novos contatos.",
      priceLabel: "Condição promocional",
      originalPrice: "De R$ 1.000 a R$ 2.000",
      price: "R$ 600 a R$ 1.500",
      priceNote: "conforme o escopo",
      savings: "Economize até R$ 500",
      primaryCta: "Quero receber um orçamento",
      secondaryCta: "Ver o que está incluso",
      assurances: ["Sem compromisso", "Escopo explicado antes de começar", "Acompanhamento em cada etapa"],
    },
    form: {
      eyebrow: "Orçamento gratuito",
      title: "Conte um pouco sobre o seu negócio.",
      description: "Com essas informações, conseguimos orientar o melhor formato para o seu primeiro site.",
      name: "Seu nome",
      namePlaceholder: "Como podemos chamar você?",
      phone: "WhatsApp",
      phonePlaceholder: "(00) 00000-0000",
      email: "Seu melhor e-mail",
      emailPlaceholder: "voce@exemplo.com",
      goal: "O que você gostaria de divulgar?",
      goalPlaceholder: "Ex.: meus serviços, cardápio, catálogo ou agenda...",
      submit: "Receber orçamento gratuito",
      sending: "Enviando...",
      privacy: "Seus dados serão usados apenas para responder a esta solicitação.",
      successTitle: "Recebemos seu pedido!",
      successDescription: "Nossa equipe vai analisar as informações e retornar em até 1 dia útil.",
      submitAnother: "Enviar outro pedido",
      error: "Não foi possível enviar agora. Tente novamente em instantes.",
    },
    benefits: [
      ["Pare de depender só das redes sociais", "Tenha um endereço próprio para apresentar sua empresa com mais liberdade e credibilidade."],
      ["Transforme visitas em conversas", "Organize as informações certas e facilite o caminho até o WhatsApp ou formulário."],
      ["Passe confiança desde o primeiro acesso", "Mostre profissionalismo com uma experiência rápida, organizada e segura."],
    ],
    situation: {
      eyebrow: "Uma base digital para o seu negócio",
      title: "Rede social ajuda. Um site profissional consolida sua presença.",
      description:
        "Seu cliente procura informações antes de entrar em contato. Uma página própria reúne tudo o que ele precisa para entender, confiar e dar o próximo passo.",
      beforeLabel: "Quando falta um site",
      before: [
        "Informações importantes ficam espalhadas",
        "O cliente depende do algoritmo para encontrar você",
        "A empresa pode parecer menos estruturada",
        "Pedidos se perdem em caminhos confusos",
      ],
      afterLabel: "Com seu site no ar",
      after: [
        "Serviços, diferenciais e contatos em um só lugar",
        "Um endereço que pode ser compartilhado sempre",
        "Apresentação profissional em qualquer dispositivo",
        "Chamadas claras para gerar novos contatos",
      ],
    },
    delivery: {
      eyebrow: "O que você recebe",
      title: "O essencial para começar bem, sem comprar complexidade que não precisa.",
      description:
        "Cada projeto é ajustado ao momento do negócio. Você recebe uma página objetiva, fácil de navegar e preparada para apresentar sua empresa.",
      items: [
        ["Site de uma página", "Conteúdo organizado em seções para apresentar empresa, serviços, diferenciais e contato."],
        ["Visual personalizado", "Cores, tipografia e composição alinhadas à identidade e ao perfil do seu público."],
        ["Versão para celular", "Layout responsivo para funcionar bem em smartphones, tablets e computadores."],
        ["Canais de contato", "Botões e formulários que facilitam pedidos, dúvidas e solicitações de orçamento."],
        ["SEO essencial", "Títulos, descrições e estrutura básica para ajudar buscadores a entenderem seu site."],
        ["Publicação orientada", "Apoio para colocar o projeto no ar e configurar os pontos essenciais de acesso."],
      ],
    },
    pricing: {
      eyebrow: "Investimento sem surpresa",
      title: "Um primeiro site compatível com o tamanho do seu negócio.",
      description:
        "Você recebe uma proposta clara antes do início. O valor final depende do volume de conteúdo e das funcionalidades necessárias.",
      label: "Faixa de investimento",
      originalLabel: "Valor original",
      originalPrice: "R$ 1.000 a R$ 2.000",
      offerLabel: "Oferta para novos projetos",
      from: "R$ 600",
      toLabel: "até",
      to: "R$ 1.500",
      savings: "Economia de até R$ 500",
      includedTitle: "O que define o orçamento",
      included: [
        "Quantidade de seções e volume de conteúdo",
        "Formulários e integrações necessárias",
        "Materiais já disponíveis, como textos e imagens",
        "Necessidade de apoio extra na organização do conteúdo",
      ],
      note: "Domínio, hospedagem e serviços de terceiros são apresentados separadamente quando necessários.",
      cta: "Descobrir quanto fica meu site",
    },
    process: {
      eyebrow: "Como funciona",
      title: "Do primeiro contato à publicação, sem complicação.",
      steps: [
        ["01", "Entendemos o negócio", "Você conta o que faz, quem quer alcançar e quais informações precisa divulgar."],
        ["02", "Definimos o formato", "Organizamos conteúdo, seções, identidade visual, prazo e investimento em uma proposta clara."],
        ["03", "Criamos e validamos", "Desenvolvemos a página e você acompanha o resultado para aprovar os principais pontos."],
        ["04", "Colocamos no ar", "Publicamos o site e orientamos você sobre os acessos e próximos passos."],
      ],
    },
    audience: {
      eyebrow: "Feito para quem está começando",
      title: "Uma boa escolha se você quer profissionalizar sua presença digital.",
      description:
        "Ideal para negócios que precisam explicar rapidamente o que fazem e abrir um caminho simples para novos clientes.",
      items: [
        "Prestadores de serviços",
        "Profissionais autônomos",
        "Lojas e comércios locais",
        "Consultórios e espaços de atendimento",
        "Restaurantes, cafés e delivery",
        "Negócios que hoje dependem só das redes sociais",
      ],
      callout: "Não sabe se esse formato atende você?",
      calloutDescription: "Conte sua ideia. A análise inicial é gratuita e sem compromisso.",
    },
    faq: {
      eyebrow: "Dúvidas frequentes",
      title: "Tudo claro antes de começar.",
      items: [
        ["Por que a oferta varia de R$ 600 a R$ 1.500?", "A faixa promocional muda conforme a quantidade de seções, o volume de conteúdo, os formulários, as integrações e o apoio necessário. Antes de começar, você recebe uma proposta com o valor fechado para o escopo combinado."],
        ["Domínio e hospedagem estão incluídos?", "Domínio, hospedagem e ferramentas de terceiros têm custos próprios e são apresentados separadamente quando necessários. Ajudamos você a escolher e configurar uma opção adequada ao projeto."],
        ["Preciso ter textos e fotos prontos?", "Não obrigatoriamente. Podemos trabalhar com os materiais que você já tem e orientar a organização do conteúdo. Caso seja necessária uma produção mais ampla de textos ou imagens, isso será indicado na proposta."],
        ["Em quanto tempo o site fica pronto?", "O prazo depende do escopo e da disponibilidade dos materiais. O cronograma é definido na proposta para que você saiba as etapas e a previsão de publicação antes do início."],
        ["O site funciona bem no celular?", "Sim. A página é desenvolvida para se adaptar a celulares, tablets e computadores, mantendo leitura, navegação e contato fáceis em diferentes telas."],
        ["Posso adicionar novas páginas depois?", "Sim. O primeiro site pode ser a base para uma presença digital maior. Novas páginas, integrações ou funcionalidades podem ser planejadas como uma evolução do projeto."],
      ],
    },
    final: {
      eyebrow: "Dê o primeiro passo",
      title: "Seu próximo cliente pode estar procurando exatamente o que você oferece.",
      description: "Apresente seu negócio com clareza e transforme essa procura em uma conversa.",
      cta: "Quero meu primeiro site",
      note: "Orçamento gratuito · Sem compromisso",
    },
    footer: {
      text: "Sites profissionais para negócios que estão prontos para crescer.",
      rights: "Todos os direitos reservados.",
    },
  },
  en: {
    header: {
      response: "Response within 1 business day",
      cta: "Request a quote",
      language: "Change language",
    },
    hero: {
      eyebrow: "Your first professional website",
      title: "Your business already exists.",
      titleAccent: "Now it needs to be found.",
      description:
        "We create a clear, professional digital presence so your business can build trust, present its services and receive new inquiries.",
      priceLabel: "Promotional offer",
      originalPrice: "Was BRL 1,000 to BRL 2,000",
      price: "BRL 600 to BRL 1,500",
      priceNote: "depending on scope",
      savings: "Save up to BRL 500",
      primaryCta: "Request a quote",
      secondaryCta: "See what is included",
      assurances: ["No commitment", "Scope explained before work begins", "Guidance at every stage"],
    },
    form: {
      eyebrow: "Free quote",
      title: "Tell us a little about your business.",
      description: "With this information, we can recommend the best format for your first website.",
      name: "Your name",
      namePlaceholder: "What should we call you?",
      phone: "WhatsApp",
      phonePlaceholder: "+55 (00) 00000-0000",
      email: "Your best email",
      emailPlaceholder: "you@example.com",
      goal: "What would you like to promote?",
      goalPlaceholder: "E.g. services, menu, catalog or bookings...",
      submit: "Get a free quote",
      sending: "Sending...",
      privacy: "Your information will only be used to respond to this request.",
      successTitle: "We received your request!",
      successDescription: "Our team will review the information and reply within 1 business day.",
      submitAnother: "Send another request",
      error: "We could not send your request. Please try again shortly.",
    },
    benefits: [
      ["Stop relying only on social media", "Get your own address to present your business with greater freedom and credibility."],
      ["Turn visits into conversations", "Organize the right information and make the path to WhatsApp or a form effortless."],
      ["Build trust from the first visit", "Show professionalism through a fast, organized and secure experience."],
    ],
    situation: {
      eyebrow: "A digital foundation for your business",
      title: "Social media helps. A professional website consolidates your presence.",
      description:
        "Customers look for information before getting in touch. Your own page brings together everything they need to understand, trust and take the next step.",
      beforeLabel: "Without a website",
      before: [
        "Important information is scattered",
        "Customers depend on algorithms to find you",
        "The business may look less established",
        "Inquiries get lost along confusing paths",
      ],
      afterLabel: "With your website online",
      after: [
        "Services, benefits and contact details in one place",
        "An address you can always share",
        "A professional presence on every device",
        "Clear calls to action that generate inquiries",
      ],
    },
    delivery: {
      eyebrow: "What you receive",
      title: "Everything you need to start well, without buying complexity you do not need.",
      description:
        "Each project fits the current stage of the business. You receive a straightforward page that is easy to navigate and ready to present your company.",
      items: [
        ["One-page website", "Content organized into sections presenting your business, services, advantages and contact channels."],
        ["Custom visual design", "Colors, typography and composition aligned with your identity and audience."],
        ["Mobile version", "Responsive layout that works well on smartphones, tablets and computers."],
        ["Contact channels", "Buttons and forms that make inquiries, questions and quote requests easier."],
        ["Essential SEO", "Titles, descriptions and basic structure to help search engines understand your website."],
        ["Assisted publishing", "Support to put the project online and configure essential access points."],
      ],
    },
    pricing: {
      eyebrow: "No-surprise investment",
      title: "A first website that fits the size of your business.",
      description:
        "You receive a clear proposal before work begins. The final price depends on the amount of content and required functionality.",
      label: "Investment range",
      originalLabel: "Original price",
      originalPrice: "BRL 1,000 to BRL 2,000",
      offerLabel: "Offer for new projects",
      from: "BRL 600",
      toLabel: "to",
      to: "BRL 1,500",
      savings: "Save up to BRL 500",
      includedTitle: "What defines the quote",
      included: [
        "Number of sections and amount of content",
        "Required forms and integrations",
        "Available materials, such as text and images",
        "Additional help organizing the content",
      ],
      note: "Domain, hosting and third-party services are presented separately when required.",
      cta: "Find out how much my website costs",
    },
    process: {
      eyebrow: "How it works",
      title: "From first contact to publishing, without complexity.",
      steps: [
        ["01", "We understand the business", "You tell us what you do, who you want to reach and what information you need to share."],
        ["02", "We define the format", "We organize content, sections, visual identity, timeline and investment into a clear proposal."],
        ["03", "We create and validate", "We develop the page and you follow the result to approve the key decisions."],
        ["04", "We put it online", "We publish the website and guide you through access and next steps."],
      ],
    },
    audience: {
      eyebrow: "Made for businesses getting started",
      title: "A good choice when you want to professionalize your digital presence.",
      description:
        "Ideal for businesses that need to explain what they do quickly and create a simple path for new customers.",
      items: [
        "Service providers",
        "Independent professionals",
        "Stores and local businesses",
        "Clinics and service spaces",
        "Restaurants, cafés and delivery",
        "Businesses currently relying only on social media",
      ],
      callout: "Not sure whether this format works for you?",
      calloutDescription: "Tell us your idea. The initial assessment is free and comes with no commitment.",
    },
    faq: {
      eyebrow: "Frequently asked questions",
      title: "Everything is clear before we begin.",
      items: [
        ["Why does the offer range from BRL 600 to BRL 1,500?", "The promotional range depends on the number of sections, amount of content, forms, integrations and required assistance. Before we start, you receive a proposal with a fixed price for the agreed scope."],
        ["Are domain and hosting included?", "Domain, hosting and third-party tools have their own costs and are presented separately when needed. We help you select and configure a suitable option."],
        ["Do I need to have text and photos ready?", "Not necessarily. We can work with the materials you already have and guide content organization. If broader text or image production is required, it will be outlined in the proposal."],
        ["How long does the website take?", "The timeline depends on scope and material availability. It is defined in the proposal so you know the stages and expected publication date before work begins."],
        ["Does it work well on mobile?", "Yes. The page adapts to phones, tablets and computers, keeping reading, navigation and contact easy across screen sizes."],
        ["Can I add more pages later?", "Yes. Your first website can be the foundation for a larger digital presence. New pages, integrations and features can be planned as the project evolves."],
      ],
    },
    final: {
      eyebrow: "Take the first step",
      title: "Your next customer may be looking for exactly what you offer.",
      description: "Present your business clearly and turn that search into a conversation.",
      cta: "I want my first website",
      note: "Free quote · No commitment",
    },
    footer: {
      text: "Professional websites for businesses ready to grow.",
      rights: "All rights reserved.",
    },
  },
} as const;

const FirstWebsitePageView = () => {
  const { locale, setLocale } = useI18n();
  const page = content[locale];
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    goal: "",
  });

  const handleLocaleChange = () => {
    setLocale((locale === "pt-br" ? "en" : "pt-br") as Locale);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitState("sending");
    setFeedbackMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          company: "",
          message:
            locale === "pt-br"
              ? `[Landing page — Primeiro site]\nObjetivo: ${formData.goal || "Não informado"}`
              : `[Landing page — First website]\nGoal: ${formData.goal || "Not provided"}`,
        }),
      });

      const data = (await response.json().catch(() => null)) as {
        ok?: boolean;
        error?: string;
        fieldErrors?: Record<string, string[] | undefined>;
      } | null;

      if (!response.ok || !data?.ok) {
        const fieldError = data?.fieldErrors
          ? Object.values(data.fieldErrors).flat().find(Boolean)
          : undefined;
        throw new Error(fieldError || data?.error || page.form.error);
      }

      setSubmitState("success");
      setFormData({ name: "", phone: "", email: "", goal: "" });
    } catch (error) {
      setSubmitState("error");
      setFeedbackMessage(error instanceof Error ? error.message : page.form.error);
    }
  };

  return (
    <div className="min-h-dvh bg-white text-[#071b2d]">
      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#061827]/95 text-white backdrop-blur">
        <div className="section-shell flex h-[72px] items-center justify-between gap-4">
          <Brand inverse textClassName="hidden text-sm sm:block" />
          <div className="flex items-center gap-2 sm:gap-4">
            <span className="hidden items-center gap-2 text-xs font-semibold text-slate-300 md:flex">
              <Clock3 className="h-4 w-4 text-cyan-300" />
              {page.header.response}
            </span>
            <button
              type="button"
              onClick={handleLocaleChange}
              className="flex h-10 items-center gap-2 border border-white/20 px-3 text-xs font-bold transition hover:border-cyan-300 hover:text-cyan-300"
              aria-label={page.header.language}
            >
              <Globe2 className="h-4 w-4" />
              {locale === "pt-br" ? "EN" : "PT"}
            </button>
            <a
              href="#orcamento"
              className="flex h-10 items-center bg-cyan-300 px-3 text-xs font-bold text-[#061827] transition hover:bg-white sm:px-5"
            >
              {page.header.cta}
            </a>
          </div>
        </div>
      </header>

      <main>
        <section className="relative overflow-hidden bg-[#061827] pb-16 pt-12 text-white sm:pb-20 sm:pt-16 lg:pb-24 lg:pt-20">
          <div
            aria-hidden="true"
            className="absolute inset-0 opacity-40 [background-image:linear-gradient(rgba(103,232,249,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(103,232,249,0.08)_1px,transparent_1px)] [background-size:64px_64px]"
          />
          <div aria-hidden="true" className="absolute -left-40 top-20 h-96 w-96 rounded-full bg-cyan-400/10 blur-3xl" />
          <div className="section-shell relative grid gap-12 lg:grid-cols-[1.06fr_0.94fr] lg:items-center lg:gap-16">
            <div>
              <p className="flex items-center gap-3 text-[0.72rem] font-bold uppercase tracking-[0.13em] text-cyan-300">
                <Sparkles className="h-4 w-4" />
                {page.hero.eyebrow}
              </p>
              <h1 className="mt-6 max-w-3xl text-[clamp(2.65rem,5.3vw,5rem)] font-semibold leading-[0.98] tracking-[-0.055em]">
                {page.hero.title}{" "}
                <span className="text-cyan-300">{page.hero.titleAccent}</span>
              </h1>
              <p className="mt-7 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg sm:leading-8">
                {page.hero.description}
              </p>

              <div className="mt-8 inline-flex flex-col border border-cyan-300/35 bg-white/[0.05] px-5 py-4 sm:flex-row sm:items-end sm:gap-5">
                <div>
                  <p className="text-[0.66rem] font-bold uppercase tracking-[0.11em] text-slate-400">
                    {page.hero.priceLabel}
                  </p>
                  <p className="mt-2 text-sm font-semibold text-slate-500 line-through decoration-slate-500">
                    {page.hero.originalPrice}
                  </p>
                  <p className="mt-1 font-mono text-2xl font-semibold tracking-[-0.04em] text-cyan-300">
                    {page.hero.price}
                  </p>
                </div>
                <div className="mt-3 flex flex-col items-start gap-2 sm:mt-0 sm:border-l sm:border-white/15 sm:pl-5">
                  <span className="bg-cyan-300 px-2.5 py-1 text-[0.65rem] font-extrabold uppercase tracking-[0.05em] text-[#061827]">
                    {page.hero.savings}
                  </span>
                  <span className="text-xs text-slate-400">{page.hero.priceNote}</span>
                </div>
              </div>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  href="#orcamento"
                  className="group flex min-h-12 items-center justify-center gap-3 bg-cyan-300 px-6 text-sm font-bold text-[#061827] transition hover:bg-white"
                >
                  {page.hero.primaryCta}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </a>
                <a
                  href="#entregaveis"
                  className="flex min-h-12 items-center justify-center border border-white/20 px-6 text-sm font-bold text-white transition hover:border-white hover:bg-white/5"
                >
                  {page.hero.secondaryCta}
                </a>
              </div>

              <div className="mt-7 flex flex-wrap gap-x-5 gap-y-3">
                {page.hero.assurances.map((item) => (
                  <span key={item} className="flex items-center gap-2 text-xs text-slate-400">
                    <Check className="h-3.5 w-3.5 text-cyan-300" />
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <div id="orcamento" className="scroll-mt-28 border-t-4 border-cyan-300 bg-white p-6 text-[#071b2d] shadow-[0_32px_100px_rgba(0,0,0,0.28)] sm:p-8 lg:p-9">
              {submitState === "success" ? (
                <div className="flex min-h-[30rem] flex-col items-center justify-center text-center">
                  <span className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                    <CheckCircle2 className="h-8 w-8" />
                  </span>
                  <h2 className="mt-6 text-2xl font-semibold tracking-[-0.03em]">{page.form.successTitle}</h2>
                  <p className="mt-3 max-w-sm text-sm leading-6 text-slate-600">{page.form.successDescription}</p>
                  <button
                    type="button"
                    onClick={() => setSubmitState("idle")}
                    className="mt-7 text-sm font-bold text-cyan-700 underline underline-offset-4"
                  >
                    {page.form.submitAnother}
                  </button>
                </div>
              ) : (
                <>
                  <p className="text-[0.68rem] font-bold uppercase tracking-[0.12em] text-cyan-700">{page.form.eyebrow}</p>
                  <h2 className="mt-3 text-2xl font-semibold tracking-[-0.035em] sm:text-3xl">{page.form.title}</h2>
                  <p className="mt-3 text-sm leading-6 text-slate-600">{page.form.description}</p>

                  <form onSubmit={handleSubmit} className="mt-7 space-y-4">
                    <label className="block">
                      <span className="mb-2 block text-xs font-bold text-slate-700">{page.form.name}</span>
                      <input
                        type="text"
                        required
                        autoComplete="name"
                        value={formData.name}
                        onChange={(event) => setFormData((previous) => ({ ...previous, name: event.target.value }))}
                        placeholder={page.form.namePlaceholder}
                        className="h-12 w-full rounded-none border border-slate-300 bg-slate-50 px-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-cyan-600 focus:ring-2 focus:ring-cyan-600/15"
                      />
                    </label>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <label className="block">
                        <span className="mb-2 block text-xs font-bold text-slate-700">{page.form.phone}</span>
                        <input
                          type="tel"
                          required
                          autoComplete="tel"
                          value={formData.phone}
                          onChange={(event) => setFormData((previous) => ({ ...previous, phone: event.target.value }))}
                          placeholder={page.form.phonePlaceholder}
                          className="h-12 w-full rounded-none border border-slate-300 bg-slate-50 px-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-cyan-600 focus:ring-2 focus:ring-cyan-600/15"
                        />
                      </label>
                      <label className="block">
                        <span className="mb-2 block text-xs font-bold text-slate-700">{page.form.email}</span>
                        <input
                          type="email"
                          required
                          autoComplete="email"
                          value={formData.email}
                          onChange={(event) => setFormData((previous) => ({ ...previous, email: event.target.value }))}
                          placeholder={page.form.emailPlaceholder}
                          className="h-12 w-full rounded-none border border-slate-300 bg-slate-50 px-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-cyan-600 focus:ring-2 focus:ring-cyan-600/15"
                        />
                      </label>
                    </div>
                    <label className="block">
                      <span className="mb-2 block text-xs font-bold text-slate-700">{page.form.goal}</span>
                      <textarea
                        rows={3}
                        value={formData.goal}
                        onChange={(event) => setFormData((previous) => ({ ...previous, goal: event.target.value }))}
                        placeholder={page.form.goalPlaceholder}
                        className="min-h-24 w-full resize-none rounded-none border border-slate-300 bg-slate-50 px-4 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-cyan-600 focus:ring-2 focus:ring-cyan-600/15"
                      />
                    </label>
                    <button
                      type="submit"
                      disabled={submitState === "sending"}
                      className="group flex min-h-12 w-full items-center justify-center gap-3 bg-[#087bb9] px-5 text-sm font-bold text-white transition hover:bg-[#065f8f] disabled:cursor-wait disabled:opacity-60"
                    >
                      {submitState === "sending" ? page.form.sending : page.form.submit}
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </button>
                    <p className="flex items-start gap-2 text-[0.68rem] leading-5 text-slate-500">
                      <ShieldCheck className="mt-0.5 h-3.5 w-3.5 shrink-0 text-cyan-700" />
                      {page.form.privacy}
                    </p>
                    {feedbackMessage && (
                      <p className="text-xs leading-5 text-red-700" aria-live="polite">{feedbackMessage}</p>
                    )}
                  </form>
                </>
              )}
            </div>
          </div>
        </section>

        <section className="border-b border-slate-200 bg-white">
          <div className="section-shell grid md:grid-cols-3">
            {page.benefits.map(([title, description], index) => {
              const Icon = benefitIcons[index] ?? Target;
              return (
                <article key={title} className="border-b border-slate-200 py-8 md:border-b-0 md:border-r md:px-8 md:first:pl-0 md:last:border-r-0 md:last:pr-0">
                  <Icon className="h-6 w-6 text-cyan-700" />
                  <h2 className="mt-4 text-base font-bold tracking-[-0.02em]">{title}</h2>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{description}</p>
                </article>
              );
            })}
          </div>
        </section>

        <section className="section-space bg-[#f5f8fa]">
          <div className="section-shell grid gap-12 lg:grid-cols-[0.72fr_1.28fr] lg:items-center lg:gap-20">
            <div>
              <p className="text-[0.72rem] font-bold uppercase tracking-[0.12em] text-cyan-700">{page.situation.eyebrow}</p>
              <h2 className="mt-4 text-[clamp(2rem,3.6vw,3.4rem)] font-semibold leading-[1.06] tracking-[-0.045em]">
                {page.situation.title}
              </h2>
              <p className="mt-6 text-base leading-7 text-slate-600">{page.situation.description}</p>
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="border border-slate-200 bg-white p-6 sm:p-7">
                <p className="text-xs font-bold uppercase tracking-[0.1em] text-slate-500">{page.situation.beforeLabel}</p>
                <ul className="mt-6 space-y-4">
                  {page.situation.before.map((item) => (
                    <li key={item} className="flex gap-3 text-sm leading-6 text-slate-600">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-slate-300" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="border border-cyan-700 bg-[#08283e] p-6 text-white shadow-[0_24px_60px_rgba(8,40,62,0.15)] sm:p-7">
                <p className="text-xs font-bold uppercase tracking-[0.1em] text-cyan-300">{page.situation.afterLabel}</p>
                <ul className="mt-6 space-y-4">
                  {page.situation.after.map((item) => (
                    <li key={item} className="flex gap-3 text-sm leading-6 text-slate-200">
                      <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-cyan-300" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section id="entregaveis" className="section-space scroll-mt-24 bg-white">
          <div className="section-shell">
            <div className="grid gap-6 lg:grid-cols-[0.9fr_0.7fr] lg:items-end">
              <div>
                <p className="text-[0.72rem] font-bold uppercase tracking-[0.12em] text-cyan-700">{page.delivery.eyebrow}</p>
                <h2 className="mt-4 max-w-3xl text-[clamp(2rem,3.6vw,3.4rem)] font-semibold leading-[1.06] tracking-[-0.045em]">
                  {page.delivery.title}
                </h2>
              </div>
              <p className="max-w-xl text-base leading-7 text-slate-600 lg:justify-self-end">{page.delivery.description}</p>
            </div>

            <div className="mt-12 grid border-l border-t border-slate-200 sm:grid-cols-2 lg:grid-cols-3">
              {page.delivery.items.map(([title, description], index) => {
                const Icon = deliveryIcons[index] ?? Zap;
                return (
                  <article key={title} className="border-b border-r border-slate-200 p-6 sm:p-8">
                    <span className="flex h-11 w-11 items-center justify-center bg-cyan-50 text-cyan-700">
                      <Icon className="h-5 w-5" />
                    </span>
                    <h3 className="mt-6 text-lg font-bold tracking-[-0.025em]">{title}</h3>
                    <p className="mt-3 text-sm leading-6 text-slate-600">{description}</p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="section-space relative overflow-hidden bg-[#eaf7fa]">
          <div aria-hidden="true" className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-cyan-300/25 blur-3xl" />
          <div className="section-shell relative grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-20">
            <div>
              <p className="text-[0.72rem] font-bold uppercase tracking-[0.12em] text-cyan-700">{page.pricing.eyebrow}</p>
              <h2 className="mt-4 text-[clamp(2rem,3.6vw,3.4rem)] font-semibold leading-[1.06] tracking-[-0.045em]">
                {page.pricing.title}
              </h2>
              <p className="mt-6 max-w-xl text-base leading-7 text-slate-600">{page.pricing.description}</p>
              <div className="mt-8 border-l-2 border-cyan-600 pl-5">
                <p className="text-xs font-bold uppercase tracking-[0.1em] text-slate-500">{page.pricing.label}</p>
                <p className="mt-4 text-[0.68rem] font-bold uppercase tracking-[0.09em] text-slate-500">{page.pricing.originalLabel}</p>
                <p className="mt-1 font-mono text-lg font-semibold text-slate-500 line-through decoration-slate-400">
                  {page.pricing.originalPrice}
                </p>
                <p className="mt-5 text-[0.68rem] font-bold uppercase tracking-[0.09em] text-cyan-800">{page.pricing.offerLabel}</p>
                <p className="mt-2 font-mono text-[clamp(2.2rem,4vw,3.5rem)] font-semibold leading-none tracking-[-0.055em] text-[#08283e]">
                  {page.pricing.from}
                </p>
                <p className="my-2 text-sm font-bold text-cyan-700">{page.pricing.toLabel}</p>
                <p className="font-mono text-[clamp(2.2rem,4vw,3.5rem)] font-semibold leading-none tracking-[-0.055em] text-cyan-700">
                  {page.pricing.to}
                </p>
                <p className="mt-5 inline-flex bg-[#08283e] px-3 py-1.5 text-xs font-bold uppercase tracking-[0.05em] text-cyan-300">
                  {page.pricing.savings}
                </p>
              </div>
            </div>
            <div className="border border-cyan-900/10 bg-white p-7 shadow-[0_28px_80px_rgba(8,47,73,0.12)] sm:p-9">
              <div className="flex items-center gap-3">
                <CircleDollarSign className="h-6 w-6 text-cyan-700" />
                <h3 className="text-lg font-bold tracking-[-0.025em]">{page.pricing.includedTitle}</h3>
              </div>
              <ul className="mt-6 space-y-4">
                {page.pricing.included.map((item) => (
                  <li key={item} className="flex gap-3 text-sm leading-6 text-slate-700">
                    <Check className="mt-1 h-4 w-4 shrink-0 text-cyan-700" />
                    {item}
                  </li>
                ))}
              </ul>
              <p className="mt-7 border-t border-slate-200 pt-5 text-xs leading-5 text-slate-500">{page.pricing.note}</p>
              <a
                href="#orcamento"
                className="group mt-7 flex min-h-12 items-center justify-between bg-[#087bb9] px-5 text-sm font-bold text-white transition hover:bg-[#065f8f]"
              >
                {page.pricing.cta}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
            </div>
          </div>
        </section>

        <section className="section-space bg-[#061827] text-white">
          <div className="section-shell">
            <p className="text-[0.72rem] font-bold uppercase tracking-[0.12em] text-cyan-300">{page.process.eyebrow}</p>
            <h2 className="mt-4 max-w-3xl text-[clamp(2rem,3.6vw,3.4rem)] font-semibold leading-[1.06] tracking-[-0.045em]">
              {page.process.title}
            </h2>
            <div className="mt-12 grid border-l border-t border-white/15 sm:grid-cols-2 lg:grid-cols-4">
              {page.process.steps.map(([number, title, description]) => (
                <article key={number} className="border-b border-r border-white/15 p-6 sm:p-7">
                  <span className="font-mono text-xs text-cyan-300">{number}</span>
                  <div className="mt-5 h-0.5 w-8 bg-cyan-300" />
                  <h3 className="mt-5 text-lg font-bold tracking-[-0.025em]">{title}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-400">{description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section-space bg-white">
          <div className="section-shell grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-center lg:gap-20">
            <div>
              <p className="text-[0.72rem] font-bold uppercase tracking-[0.12em] text-cyan-700">{page.audience.eyebrow}</p>
              <h2 className="mt-4 text-[clamp(2rem,3.6vw,3.4rem)] font-semibold leading-[1.06] tracking-[-0.045em]">
                {page.audience.title}
              </h2>
              <p className="mt-6 text-base leading-7 text-slate-600">{page.audience.description}</p>
            </div>
            <div>
              <div className="grid gap-3 sm:grid-cols-2">
                {page.audience.items.map((item) => (
                  <div key={item} className="flex min-h-16 items-center gap-3 border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold">
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-cyan-700" />
                    {item}
                  </div>
                ))}
              </div>
              <div className="mt-5 bg-[#eaf7fa] p-5 sm:flex sm:items-center sm:justify-between sm:gap-6">
                <div>
                  <p className="text-sm font-bold">{page.audience.callout}</p>
                  <p className="mt-1 text-xs leading-5 text-slate-600">{page.audience.calloutDescription}</p>
                </div>
                <a href="#orcamento" className="mt-4 inline-flex shrink-0 items-center gap-2 text-sm font-bold text-cyan-800 sm:mt-0">
                  {page.header.cta}
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="section-space border-t border-slate-200 bg-[#f5f8fa]">
          <div className="section-shell grid gap-12 lg:grid-cols-[0.72fr_1.28fr] lg:gap-20">
            <div>
              <p className="text-[0.72rem] font-bold uppercase tracking-[0.12em] text-cyan-700">{page.faq.eyebrow}</p>
              <h2 className="mt-4 text-[clamp(2rem,3.6vw,3.4rem)] font-semibold leading-[1.06] tracking-[-0.045em]">
                {page.faq.title}
              </h2>
            </div>
            <div className="border border-slate-200 bg-white">
              {page.faq.items.map(([question, answer], index) => {
                const isOpen = openFaq === index;
                return (
                  <div key={question} className="border-b border-slate-200 last:border-b-0">
                    <button
                      type="button"
                      onClick={() => setOpenFaq(isOpen ? null : index)}
                      className="flex w-full items-center justify-between gap-5 px-5 py-6 text-left sm:px-6"
                      aria-expanded={isOpen}
                    >
                      <span className="font-semibold leading-6">{question}</span>
                      <ChevronDown className={cn("h-5 w-5 shrink-0 text-cyan-700 transition-transform", isOpen && "rotate-180")} />
                    </button>
                    <div className={cn("grid transition-all duration-300", isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]")}>
                      <div className="overflow-hidden">
                        <p className="border-t border-slate-200 bg-slate-50 px-5 py-5 text-sm leading-7 text-slate-600 sm:px-6">
                          {answer}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden bg-cyan-300 py-16 sm:py-20">
          <div aria-hidden="true" className="absolute -bottom-24 -right-10 h-72 w-72 rounded-full border-[40px] border-white/20" />
          <div className="section-shell relative text-center">
            <p className="text-[0.72rem] font-bold uppercase tracking-[0.12em] text-cyan-900">{page.final.eyebrow}</p>
            <h2 className="mx-auto mt-4 max-w-4xl text-[clamp(2.2rem,4.5vw,4rem)] font-semibold leading-[1.03] tracking-[-0.05em] text-[#061827]">
              {page.final.title}
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-cyan-950/75">{page.final.description}</p>
            <a
              href="#orcamento"
              className="group mx-auto mt-8 flex min-h-12 w-fit items-center gap-3 bg-[#061827] px-7 text-sm font-bold text-white transition hover:bg-[#0b3450]"
            >
              {page.final.cta}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
            <p className="mt-4 text-xs font-semibold text-cyan-950/65">{page.final.note}</p>
          </div>
        </section>
      </main>

      <footer className="bg-[#04121d] pb-20 text-white md:pb-0">
        <div className="section-shell flex flex-col gap-6 py-10 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <Brand inverse />
            <p className="mt-3 text-xs text-slate-400">{page.footer.text}</p>
          </div>
          <div className="text-left text-xs text-slate-500 sm:text-right">
            <Link href={appRoutes.home} className="font-semibold text-slate-300 transition hover:text-cyan-300">
              replysolutions.com
            </Link>
            <p className="mt-2">© {new Date().getFullYear()} Reply Solutions. {page.footer.rights}</p>
          </div>
        </div>
      </footer>

      <div className="fixed inset-x-0 bottom-0 z-50 border-t border-slate-200 bg-white p-3 shadow-[0_-12px_30px_rgba(6,24,39,0.12)] md:hidden">
        <a
          href="#orcamento"
          className="flex min-h-12 items-center justify-center gap-3 bg-[#087bb9] px-5 text-sm font-bold text-white"
        >
          {page.header.cta}
          <ArrowRight className="h-4 w-4" />
        </a>
      </div>
    </div>
  );
};

export default FirstWebsitePageView;
