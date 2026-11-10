import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "motion/react";
import {
  ArrowRight, Car, Clock, Droplets, Instagram, MapPin, Menu, MessageCircle, Phone, ShieldCheck, Sparkles, Star, Store, X,
} from "lucide-react";
import { ADDRESS, APPLE_MAPS, INSTAGRAM, LOGO, MAPS, OPENING_HOURS, PHONE_DISPLAY, PHOTOS, REVIEWS, WHATSAPP } from "@/components/site/data";
import { Reveal, SectionLabel } from "@/components/site/Reveal";
import { Gallery } from "@/components/site/Gallery";
import { ScrollFX } from "@/components/site/ScrollFX";
import { CinematicHero, FinishScene, ServiceStudio } from "@/components/site/Cinema";
import { MapLink } from "@/components/site/MapLink";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Lava Jato do Tadeu — Estética e Higienização Automotiva" },
      { name: "description", content: "Polimento, vitrificação, higienização interna e lavagem detalhada em Teresópolis - RJ. Agende pelo WhatsApp." },
      { property: "og:title", content: "Lava Jato do Tadeu — Estética Automotiva" },
      { property: "og:description", content: "Cuidado completo para carros e motos. Agende pelo WhatsApp (21) 97323-3825." },
      { property: "og:type", content: "website" },
      { property: "og:image", content: PHOTOS.haval },
      { name: "twitter:image", content: PHOTOS.haval },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const NAV = [
  ["Sobre", "#sobre"], ["Serviços", "#servicos"], ["Diferenciais", "#diferenciais"], ["Galeria", "#galeria"], ["Contato", "#contato"],
] as const;

function WhatsBtn({ children, msg, className = "" }: { children: React.ReactNode; msg?: string; className?: string }) {
  return (
    <motion.a
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.97 }}
      href={WHATSAPP(msg)}
      target="_blank"
      rel="noreferrer"
      className={`inline-flex items-center justify-center gap-2 rounded-sm bg-primary px-6 py-4 text-sm font-bold uppercase tracking-wider text-primary-foreground shadow-[0_10px_40px_-10px_var(--primary)] transition-colors hover:bg-primary/90 ${className}`}
    >
      <MessageCircle className="h-5 w-5" /> {children}
    </motion.a>
  );
}

function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header data-nav className="fixed inset-x-0 top-0 z-50 border-b border-transparent transition-all duration-500 [&.nav-scrolled]:border-border [&.nav-scrolled]:bg-background/85 [&.nav-scrolled]:backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 md:h-20">
        <a href="#topo" className="flex items-center gap-3">
          <img src={LOGO} alt="Lava Jato do Tadeu" className="h-10 w-10 rounded-sm bg-light object-contain p-0.5 md:h-12 md:w-12" />
          <span className="font-display text-sm font-black uppercase leading-tight tracking-wide">Lava Jato<br /><span className="text-primary">do Tadeu</span></span>
        </a>
        <nav className="hidden items-center gap-8 md:flex">
          {NAV.map(([l, h]) => (
            <a key={h} href={h} className="group relative text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground">
              {l}
              <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-primary transition-all group-hover:w-full" />
            </a>
          ))}
        </nav>
        <a href={WHATSAPP()} target="_blank" rel="noreferrer" className="hidden rounded-sm bg-primary px-5 py-2.5 text-sm font-bold text-primary-foreground hover:bg-primary/90 md:inline-flex">
          Agendar
        </a>
        <Button variant="ghost" size="icon" aria-label="Menu" aria-expanded={open} className="md:hidden" onClick={() => setOpen(!open)}>
          {open ? <X /> : <Menu />}
        </Button>
      </div>
      {open && (
        <motion.nav initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col gap-1 border-t border-border bg-background px-5 py-4 md:hidden">
          {NAV.map(([l, h]) => (
            <a key={h} href={h} onClick={() => setOpen(false)} className="py-3 font-display text-lg font-bold uppercase">{l}</a>
          ))}
          <WhatsBtn className="mt-3">Agendar no WhatsApp</WhatsBtn>
        </motion.nav>
      )}
    </header>
  );
}

function About() {
  return (
    <section id="sobre" className="bg-light py-24 text-light-foreground md:py-32">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 md:grid-cols-2">
        <Reveal className="relative">
          <div className="overflow-hidden rounded-sm"><img data-water src={PHOTOS.haval} alt="Haval com pintura espelhada no box do Lava Jato do Tadeu" loading="lazy" className="aspect-[4/5] w-full object-cover" /></div>
          <div className="absolute -bottom-6 -right-4 hidden w-48 overflow-hidden rounded-sm border-4 border-light md:block">
            <img data-water src={PHOTOS.triton} alt="Mitsubishi Triton" loading="lazy" className="aspect-square w-full object-cover" />
          </div>
        </Reveal>
        <Reveal delay={0.15}>
          <SectionLabel>Sobre nós</SectionLabel>
          <h2 className="font-display text-4xl font-black uppercase leading-none md:text-5xl">Cuidado automotivo levado a sério.</h2>
          <p className="mt-6 text-lg leading-relaxed opacity-80">
            O Lava Jato do Tadeu é especializado em estética e higienização automotiva. Tratamos cada veículo com atenção aos detalhes — da lavagem técnica à proteção da pintura — para que você receba seu carro ou moto limpo, protegido e com aparência renovada.
          </p>
          <p className="mt-4 text-lg leading-relaxed opacity-80">
            Atendemos na nossa loja física em Teresópolis, com box iluminado para inspeção minuciosa da pintura e estrutura completa para cuidar do seu veículo.
          </p>
          <div className="mt-8 grid grid-cols-2 gap-4">
            <MapLink className="border-t border-light-foreground/20 pt-5"><Store className="mb-3 h-6 w-6 text-primary" /><p className="font-display font-extrabold">Loja física</p><p className="text-sm opacity-70">Av. Feliciano Sodré, 171 · Várzea</p></MapLink>
            <div className="border-t border-light-foreground/20 pt-5"><Car className="mb-3 h-6 w-6 text-primary" /><p className="font-display font-extrabold">Carros e motos</p><p className="text-sm opacity-70">Atendemos todos os portes</p></div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

const DIFS = [
  { icon: Droplets, t: "Produtos adequados", d: "Produtos específicos para cada superfície do veículo." },
  { icon: Sparkles, t: "Atenção aos detalhes", d: "Box com iluminação para inspeção minuciosa da pintura." },
  { icon: MapPin, t: "Loja em Teresópolis", d: "Atendimento na Av. Feliciano Sodré, 171 - Várzea." },
  { icon: Car, t: "Carros e motos", d: "Do sedan à picape, passando pelas duas rodas." },
  { icon: ShieldCheck, t: "Proteção da pintura", d: "Vitrificação e cristalização para preservar o brilho." },
  { icon: MessageCircle, t: "Agendamento fácil", d: "Combine tudo rapidamente pelo WhatsApp." },
];

function Differentials() {
  return (
    <section id="diferenciais" className="border-y border-border bg-card py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5">
        <Reveal className="mb-14 text-center">
          <div className="flex justify-center"><SectionLabel>Diferenciais</SectionLabel></div>
          <h2 className="font-display text-4xl font-black uppercase md:text-5xl">Por que escolher o Tadeu</h2>
        </Reveal>
        <div data-scrub className="grid gap-px overflow-hidden rounded-sm border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
          {DIFS.map((d) => (
            <div key={d.t} className="group bg-card p-8 transition-colors hover:bg-secondary">
              <d.icon className="mb-5 h-8 w-8 text-primary transition-transform group-hover:-rotate-6 group-hover:scale-110" />
              <h3 className="font-display text-lg font-extrabold uppercase">{d.t}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{d.icon === MapPin ? <MapLink className="hover:text-primary">{d.d}</MapLink> : d.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  return (
    <section id="depoimentos" className="bg-light py-20 text-light-foreground md:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal className="mb-12 flex flex-wrap items-end justify-between gap-6">
          <div><SectionLabel>04 / Quem confia</SectionLabel><h2 className="font-display text-4xl font-black uppercase leading-none md:text-6xl">O brilho passa.<br />A confiança fica.</h2></div>
          <a href={MAPS} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-sm font-bold">Avaliações no Google <ArrowRight className="h-4 w-4" /></a>
        </Reveal>
        <div className="grid gap-x-10 gap-y-8 md:grid-cols-3">
          {REVIEWS.map((review, i) => (
            <Reveal key={review.name} delay={i * 0.05} className="border-t border-light-foreground/20 pt-6">
              <span aria-hidden="true" className="font-display text-6xl leading-none text-primary">“</span>
              <blockquote className="text-base leading-relaxed">{review.text}</blockquote>
              <p className="mt-6 font-bold">{review.name}</p>
              <p className="mt-1 text-xs opacity-60">{review.guide ? "Local Guide · " : ""}Avaliação no Google</p>
            </Reveal>
          ))}
        </div>
        <p className="mt-10 text-xs opacity-60">Trechos de avaliações do Google fornecidas pela loja.</p>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contato" className="relative overflow-hidden py-24 md:py-32">
      <div className="absolute inset-0 speed-lines opacity-30" />
      <div className="relative mx-auto grid max-w-7xl gap-12 px-5 md:grid-cols-2">
        <Reveal>
          <SectionLabel>Contato</SectionLabel>
          <h2 className="font-display text-4xl font-black uppercase leading-none md:text-6xl">Agende seu horário <span className="text-primary">agora.</span></h2>
          <p className="mt-6 max-w-md text-lg text-muted-foreground">Fale com a gente pelo WhatsApp para consultar valores, disponibilidade e agendar seu horário.</p>
          <WhatsBtn className="mt-10">Chamar no WhatsApp</WhatsBtn>
        </Reveal>
        <Reveal delay={0.15} className="space-y-3">
          {[
            { icon: Phone, l: "WhatsApp", v: PHONE_DISPLAY, h: WHATSAPP() },
            { icon: Instagram, l: "Instagram", v: "@lavajatodotadeu", h: INSTAGRAM },
            { icon: MapPin, l: "Loja física", v: ADDRESS, h: MAPS },
            { icon: Clock, l: "Horário", v: `Segunda a sábado: ${OPENING_HOURS.weekdays} · Domingo: ${OPENING_HOURS.sunday}` },
          ].map((c) => {
            const inner = (
              <>
                <c.icon className="h-6 w-6 shrink-0 text-primary" />
                <div><p className="text-xs uppercase tracking-widest text-muted-foreground">{c.l}</p><p className="font-display text-lg font-bold">{c.v}</p></div>
              </>
            );
            return c.icon === MapPin ? (
              <MapLink key={c.l} className="flex items-center gap-5 border-b border-border p-5 transition-colors hover:text-primary">{inner}</MapLink>
            ) : c.h ? (
              <a key={c.l} href={c.h} target="_blank" rel="noreferrer" className="flex items-center gap-5 border-b border-border p-5 transition-colors hover:text-primary">{inner}</a>
            ) : (
              <div key={c.l} className="flex items-center gap-5 border-b border-border p-5">{inner}</div>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 md:grid-cols-4">
        <div className="md:col-span-2">
          <img src={LOGO} alt="Lava Jato do Tadeu" className="h-20 w-20 rounded-sm bg-light object-contain p-1" />
          <p className="mt-4 max-w-sm text-sm text-muted-foreground">Estética e higienização automotiva em Teresópolis - RJ.</p>
          <MapLink className="mt-3 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary">
            <MapPin className="h-4 w-4 shrink-0 text-primary" /> {ADDRESS}
          </MapLink>
          <div className="mt-3 flex gap-5 text-xs text-muted-foreground"><a href={MAPS} target="_blank" rel="noreferrer" className="hover:text-primary">Google Maps ↗</a><a href={APPLE_MAPS} target="_blank" rel="noreferrer" className="hover:text-primary">Apple Maps ↗</a></div>
        </div>
        <div>
          <p className="mb-4 font-display font-extrabold uppercase">Navegação</p>
          <ul className="space-y-2 text-sm text-muted-foreground">{NAV.map(([l, h]) => <li key={h}><a href={h} className="hover:text-primary">{l}</a></li>)}</ul>
        </div>
        <div>
          <p className="mb-4 font-display font-extrabold uppercase">Contato</p>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><a href={WHATSAPP()} target="_blank" rel="noreferrer" className="hover:text-primary">{PHONE_DISPLAY}</a></li>
            <li><a href={INSTAGRAM} target="_blank" rel="noreferrer" className="hover:text-primary">@lavajatodotadeu</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border py-6 text-center text-xs text-muted-foreground">© {new Date().getFullYear()} Lava Jato do Tadeu · Car care</div>
    </footer>
  );
}

function Index() {
  return (
    <main className="bg-background text-foreground">
      <ScrollFX />
      <Header />
      <CinematicHero />
      <FinishScene />
      <About />
      <ServiceStudio />
      <Differentials />
      <Gallery />
      <Testimonials />
      <Contact />
      <Footer />
      <motion.a
        initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 1.5 }} whileHover={{ scale: 1.08 }}
        href={WHATSAPP()} target="_blank" rel="noreferrer" aria-label="WhatsApp"
        className="fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-[0_10px_30px_-5px_var(--primary)]"
      >
        <MessageCircle className="h-6 w-6" />
      </motion.a>
    </main>
  );
}
