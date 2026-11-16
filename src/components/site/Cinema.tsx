import { useState } from "react";
import { motion } from "motion/react";
import { ArrowDown, ArrowRight, MapPin, MessageCircle, Plus, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PHOTOS, PHONE_DISPLAY, SERVICES, WHATSAPP } from "./data";
import { MapLink } from "./MapLink";
import { LiquidImage } from "./LiquidImage";

const FINISH_POS: [number, number] = [0.5, 0.42];

export function CinematicHero() {
  return (
    <section id="topo" className="cinema-hero relative isolate overflow-hidden">
      <div data-hero-image className="absolute inset-0 -z-20">
        <img src={PHOTOS.haval} fetchPriority="high" alt="Haval com acabamento espelhado no Lava Jato do Tadeu" className="hero-photo h-full w-full object-cover" />
      </div>
      <div className="cinema-grade absolute inset-0 -z-10" />
      <div className="cinema-frame pointer-events-none absolute inset-5 top-28 hidden border border-foreground/15 md:block" />
      <div className="relative mx-auto flex h-full max-w-[1440px] flex-col justify-end px-6 pb-24 pt-36 md:px-14 md:pb-28">
        <div data-hero-copy className="max-w-2xl">
          <p className="mb-7 flex items-center gap-3 text-xs font-semibold uppercase text-foreground/80"><span className="h-px w-10 bg-primary" /> Estética automotiva · Teresópolis</p>
          <h1 className="font-display text-5xl font-black uppercase leading-[0.95] sm:text-7xl lg:text-8xl">Lava Jato<br /><span className="text-primary">do Tadeu.</span></h1>
          <p className="mt-6 max-w-sm text-lg text-foreground/85">O cuidado está nos detalhes.<br />O resultado, em cada reflexo.</p>
          <div className="mt-8 flex flex-wrap items-center gap-5">
            <Button asChild className="h-14 px-6 font-bold"><motion.a whileTap={{ scale: 0.97 }} href={WHATSAPP()} target="_blank" rel="noreferrer"><MessageCircle /> Agendar meu cuidado <ArrowRight /></motion.a></Button>
            <Button asChild variant="link" className="text-foreground"><a href="#servicos">Explorar serviços <ArrowDown /></a></Button>
          </div>
        </div>
        <div className="absolute inset-x-6 bottom-7 flex items-end justify-between gap-5 border-t border-foreground/20 pt-5 md:inset-x-14">
          <MapLink className="flex max-w-[65%] items-center gap-2 text-xs text-foreground/85"><MapPin className="h-4 w-4 shrink-0 text-primary" />Av. Feliciano Sodré, 171 · Teresópolis - RJ</MapLink>
          <a href={WHATSAPP()} target="_blank" rel="noreferrer" className="text-right text-xs font-semibold sm:text-sm">{PHONE_DISPLAY}<span className="mt-1 block text-[10px] font-normal uppercase text-foreground/60">WhatsApp</span></a>
        </div>
      </div>
      <div className="absolute right-7 top-32 hidden text-xs uppercase text-foreground/60 md:block">Detalhe / Proteção / Brilho</div>
    </section>
  );
}

export function FinishScene() {
  return (
    <section data-finish className="finish-scene relative">
      <div data-finish-stage className="finish-stage relative isolate overflow-hidden">
        <img src={PHOTOS.bmw} alt="BMW Série 3 com pintura iluminada no box" className="finish-photo absolute inset-0 -z-20 h-full w-full object-cover" loading="lazy" />
        <img data-finish-next src={PHOTOS.triton} alt="Mitsubishi Triton preta com acabamento espelhado" className="finish-photo absolute inset-0 -z-20 h-full w-full object-cover opacity-0" loading="lazy" />
        <div className="absolute inset-0 -z-20"><LiquidImage src={PHOTOS.bmw} next={PHOTOS.triton} scrollTarget="[data-finish]" readyTarget="[data-finish-stage]" position={FINISH_POS} /></div>
        <div className="scene-grade absolute inset-0 -z-10" />
        <div className="relative mx-auto flex h-full max-w-[1440px] items-end px-6 pb-16 md:px-14 md:pb-20">
          <div className="max-w-xl">
            <p className="mb-5 text-xs font-bold uppercase text-foreground/70">01 / O acabamento</p>
            <h2 data-finish-title className="font-display text-5xl font-black uppercase leading-none md:text-7xl">Não é só<br />limpar.<br /><span className="text-primary">É revelar.</span></h2>
            <p className="mt-6 max-w-sm text-base text-foreground/80">Pintura com profundidade. Superfícies cuidadas. Seu veículo em sua melhor versão.</p>
          </div>
        </div>
        <div className="absolute bottom-0 inset-x-0 h-1 bg-foreground/15"><div data-finish-progress className="h-full origin-left scale-x-0 bg-primary" /></div>
      </div>
    </section>
  );
}

export function ServiceStudio() {
  const [active, setActive] = useState(0);
  const service = SERVICES[active];
  if (!service) return null;
  return (
    <section id="servicos" className="bg-background py-20 md:py-28">
      <div className="mx-auto max-w-[1440px] px-6 md:px-14">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-6 border-b border-border pb-8">
          <div><p className="mb-5 text-xs font-bold uppercase text-primary">02 / Cuidado sob medida</p><h2 className="font-display text-4xl font-black uppercase leading-none md:text-6xl">Cada detalhe.<br />Um tratamento.</h2></div>
          <p className="max-w-xs text-sm text-muted-foreground">Da lavagem à proteção da pintura, o cuidado que seu carro ou moto merece.</p>
        </div>
        <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="relative overflow-hidden aspect-[4/3] lg:sticky lg:top-28 lg:aspect-[4/5]">
            <motion.img key={service.img} initial={{ opacity: 0.5, scale: 1.04 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6 }} src={service.img} alt={service.name} className="h-full w-full object-cover" loading="lazy" />
            <div className="absolute inset-x-0 bottom-0 bg-background/85 p-5"><p className="text-xs uppercase text-muted-foreground">Lava Jato do Tadeu / Trabalhos reais</p><p className="mt-1 font-display text-xl font-bold">{service.name}</p></div>
          </div>
          <div>{SERVICES.map((s, i) => <article key={s.name} className="border-b border-border">
            <Button variant="ghost" aria-expanded={active === i} aria-controls={`service-${i}`} onClick={() => setActive(i)} className="h-auto min-h-20 w-full justify-between gap-4 whitespace-normal rounded-none px-0 py-5 text-left hover:bg-transparent hover:text-primary">
              <span className="flex items-center gap-5"><span className="text-xs text-muted-foreground">{String(i + 1).padStart(2, "0")}</span><span className={`font-display text-lg font-extrabold uppercase md:text-xl ${active === i ? "text-primary" : ""}`}>{s.name}</span></span>{active === i ? <Minus /> : <Plus />}
            </Button>
            <div id={`service-${i}`} hidden={active !== i} className="pb-7 pl-9"><p className="max-w-md text-sm leading-relaxed text-muted-foreground">{s.desc}</p><Button asChild variant="link" className="mt-4 px-0 font-bold"><a href={WHATSAPP(`Olá! Gostaria de saber valores e disponibilidade para: ${s.name}.`)} target="_blank" rel="noreferrer">Consultar pelo WhatsApp <ArrowRight /></a></Button></div>
          </article>)}</div>
        </div>
      </div>
    </section>
  );
}