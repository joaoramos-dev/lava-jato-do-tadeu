import { useEffect } from "react";

/**
 * Lenis = smooth scroll global. GSAP + ScrollTrigger = storytelling ligado à rolagem
 * (water reveal, navbar, scrub). Motion cuida só de estados/microinterações.
 */
export function ScrollFX() {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let cleanup = () => {};
    let cancelled = false;

    (async () => {
      const [{ gsap }, { ScrollTrigger }, { default: Lenis }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
        import("lenis"),
      ]);
      if (cancelled) return;
      gsap.registerPlugin(ScrollTrigger);

      let lenis: InstanceType<typeof Lenis> | null = null;
      const tick = (t: number) => lenis?.raf(t * 1000);
      if (!reduce) {
        lenis = new Lenis({ duration: 1.1, smoothWheel: true, anchors: { offset: -80 } });
        lenis.on("scroll", ScrollTrigger.update);
        gsap.ticker.add(tick);
        gsap.ticker.lagSmoothing(0);
      }

      const ctx = gsap.context(() => {
        const nav = document.querySelector("[data-nav]");
        if (nav) {
          ScrollTrigger.create({
            start: 80,
            onToggle: (s) => nav.classList.toggle("nav-scrolled", s.isActive),
          });
        }
        if (reduce) return;

        const heroImage = document.querySelector("[data-hero-image]");
        const heroCopy = document.querySelector("[data-hero-copy]");
        if (heroImage && heroCopy) {
          gsap.from(heroCopy.children, { y: 35, opacity: 0, stagger: 0.14, duration: 1.1, ease: "power3.out" });
          gsap.fromTo(heroImage, { scale: 1.08 }, { scale: 1, duration: 2, ease: "power2.out" });
          gsap.to(heroImage, { yPercent: 18, ease: "none", scrollTrigger: { trigger: "#topo", start: "top top", end: "bottom top", scrub: true } });
          gsap.to(heroCopy, { y: -70, ease: "none", scrollTrigger: { trigger: "#topo", start: "top top", end: "bottom top", scrub: true } });
        }

        const mm = gsap.matchMedia();
        mm.add("(min-width: 768px)", () => {
          const scene = document.querySelector("[data-finish]");
          const stage = document.querySelector("[data-finish-stage]");
          if (!scene || !stage) return;
          const timeline = gsap.timeline({ scrollTrigger: { trigger: scene, start: "top top", end: "+=100%", pin: stage, scrub: 0.7, anticipatePin: 1 } });
          timeline.to("[data-finish-next]", { opacity: 1, duration: 0.5 }, 0.15)
            .fromTo("[data-finish-next]", { scale: 1.06 }, { scale: 1, duration: 1 }, 0)
            .to("[data-finish-progress]", { scaleX: 1, duration: 1, ease: "none" }, 0);
          return () => timeline.kill();
        });
        mm.add("(max-width: 767px)", () => {
          gsap.to("[data-finish-progress]", { scaleX: 1, ease: "none", scrollTrigger: { trigger: "[data-finish]", start: "top 80%", end: "bottom 20%", scrub: true } });
        });

        gsap.utils.toArray<HTMLElement>("[data-water]").forEach((el) => {
          gsap.fromTo(
            el,
            { clipPath: "circle(8% at 50% 60%)", scale: 1.08 },
            {
              clipPath: "circle(75% at 50% 50%)",
              scale: 1,
              ease: "none",
              scrollTrigger: { trigger: el, start: "top 90%", end: "center 55%", scrub: 0.6 },
            },
          );
        });

        gsap.utils.toArray<HTMLElement>("[data-scrub]").forEach((wrap) => {
          gsap.from(wrap.children, {
            y: 60,
            opacity: 0,
            stagger: 0.12,
            ease: "power2.out",
            scrollTrigger: { trigger: wrap, start: "top 85%", end: "bottom 75%", scrub: 0.8 },
          });
        });
      });

      cleanup = () => {
        ctx.revert();
        gsap.ticker.remove(tick);
        lenis?.destroy();
      };
      requestAnimationFrame(() => ScrollTrigger.refresh());
    })();

    return () => {
      cancelled = true;
      cleanup();
    };
  }, []);
  return null;
}
