"use client";

import { motion } from "framer-motion";
import { FlaskConical, Github, Shield, Terminal } from "lucide-react";
import SectionHeading from "@/components/shared/section-heading";

const LabsSection = () => {
  const labs = [
    {
      icon: Terminal,
      title: "Ferramentas internas",
      desc: "Criamos automações, scanners, scripts e ferramentas próprias para acelerar auditorias, testes e desenvolvimento seguro.",
    },
    {
      icon: Shield,
      title: "Pesquisa em segurança",
      desc: "Estudo contínuo de vulnerabilidades, técnicas ofensivas, hardening e novas superfícies de ataque.",
    },
    {
      icon: Github,
      title: "Open source",
      desc: "Projetos públicos, experimentos e contribuições que ajudam a comunidade e mostram como pensamos na prática.",
    },
    {
      icon: FlaskConical,
      title: "Experimentos",
      desc: "Testes com novas tecnologias, arquiteturas, stacks e ideias que ainda não chegaram em produção.",
    },
  ] as const;

  return (
    <section id="labs" className="section-space relative overflow-hidden border-t border-border/50">
      <div className="absolute inset-0 bg-grid opacity-20" />

      <div className="container section-shell relative z-10">
        <SectionHeading
          eyebrow="[ LABS ]"
          title={
            <>
              Pesquisa, ferramentas
              <br />
              e experimentação
              <br />
              contínua
            </>
          }
        />

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mt-6 max-w-2xl text-muted-foreground leading-relaxed"
        >
          Nem tudo que construímos nasce dentro de projetos de clientes.
          Mantemos um laboratório ativo onde estudamos segurança, criamos
          ferramentas próprias, testamos ideias e exploramos tecnologias novas.
          Esse ambiente é o que mantém nosso trabalho afiado e atualizado.
        </motion.p>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {labs.map((lab, index) => {
            const Icon = lab.icon;

            return (
              <motion.div
                key={lab.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group rounded-lg border border-border/60 bg-card/70 p-6 backdrop-blur-md transition hover:border-accent/40"
              >
                <div className="mb-4 inline-flex rounded-lg bg-accent/10 p-3 text-accent">
                  <Icon className="h-5 w-5" />
                </div>

                <h4 className="mb-2 font-semibold text-foreground">{lab.title}</h4>

                <p className="text-sm text-muted-foreground leading-relaxed">{lab.desc}</p>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-16 rounded-lg border border-border/60 bg-card/70 p-8 text-center backdrop-blur-md"
        >
          <h4 className="text-lg font-semibold mb-2">Parte dos nossos experimentos é pública</h4>
          <p className="text-muted-foreground mb-6">
            Explore nossos repositórios e veja o que estamos construindo.
          </p>

          <a
            href="/#contato"
            className="inline-flex items-center gap-2 rounded-sm bg-foreground px-7 py-3.5 font-mono text-xs uppercase tracking-[0.15em] text-background transition-all duration-300 hover:bg-foreground/90"
          >
            <Github className="h-4 w-4" />
            Falar com a Reply
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default LabsSection;
