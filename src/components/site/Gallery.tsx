import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ChevronLeft, ChevronRight, Expand, X } from "lucide-react";
import { GALLERY } from "./data";
import { Reveal, SectionLabel } from "./Reveal";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const CATS = ["Todos", "SUV", "Sedan", "Picape", "Moto"] as const;

export function Gallery() {
  const [cat, setCat] = useState<(typeof CATS)[number]>("Todos");
  const [open, setOpen] = useState<number | null>(null);
  const items = cat === "Todos" ? GALLERY : GALLERY.filter((g) => g.cat === cat);

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
      if (e.key === "ArrowRight") setOpen((i) => i === null ? null : (i + 1) % items.length);
      if (e.key === "ArrowLeft") setOpen((i) => i === null ? null : (i - 1 + items.length) % items.length);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, items.length]);

  return (
    <section id="galeria" className="bg-background py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5">
        <Reveal className="mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <SectionLabel>Galeria</SectionLabel>
            <h2 className="font-display text-4xl font-black uppercase md:text-6xl">Trabalhos realizados</h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {CATS.map((c) => (
              <Button variant="outline" aria-pressed={cat === c}
                key={c}
                onClick={() => setCat(c)}
                className={cn(
                  "rounded-sm border px-4 py-2 text-sm font-semibold transition-colors",
                  cat === c ? "border-primary bg-primary text-primary-foreground" : "border-border text-muted-foreground hover:border-primary hover:text-foreground",
                )}
              >
                {c}
              </Button>
            ))}
          </div>
        </Reveal>

        <motion.div layout className="grid auto-rows-[220px] grid-cols-2 gap-3 md:auto-rows-[260px] md:grid-cols-4">
          <AnimatePresence mode="popLayout">
            {items.map((g, i) => (
              <motion.button
                layout
                key={g.title}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                onClick={() => setOpen(i)}
                className={cn(
                  "group relative overflow-hidden rounded-sm bg-card text-left",
                  items.length > 2 && i === 0 && "col-span-2 row-span-2",
                )}
              >
                <img src={g.src} alt={g.title} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent opacity-80" />
                <div className="absolute bottom-0 left-0 right-0 flex items-end justify-between p-4">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-widest text-primary">{g.cat}</p>
                    <p className="font-display text-lg font-extrabold">{g.title}</p>
                  </div>
                  <Expand className="h-5 w-5 opacity-0 transition-opacity group-hover:opacity-100" />
                </div>
              </motion.button>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      <AnimatePresence>
        {open !== null && items[open] && (
          <motion.div
            className="fixed inset-0 z-[60] flex items-center justify-center bg-background/95 p-4 backdrop-blur"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(null)}
            role="dialog"
            aria-label="Visualizar foto"
          >
            <button aria-label="Fechar" className="absolute right-5 top-5 rounded-full border border-border p-2 hover:border-primary" onClick={() => setOpen(null)}>
              <X className="h-5 w-5" />
            </button>
            <button aria-label="Anterior" className="absolute left-3 rounded-full border border-border p-3 hover:border-primary md:left-8" onClick={(e) => { e.stopPropagation(); setOpen((open - 1 + items.length) % items.length); }}>
              <ChevronLeft className="h-5 w-5" />
            </button>
            <motion.figure key={items[open].src} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl" onClick={(e) => e.stopPropagation()}>
              <img src={items[open].src} alt={items[open].title} className="max-h-[80vh] w-auto rounded-sm" />
              <figcaption className="mt-3 text-center font-display font-bold">{items[open].title}</figcaption>
            </motion.figure>
            <button aria-label="Próxima" className="absolute right-3 rounded-full border border-border p-3 hover:border-primary md:right-8" onClick={(e) => { e.stopPropagation(); setOpen((open + 1) % items.length); }}>
              <ChevronRight className="h-5 w-5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
