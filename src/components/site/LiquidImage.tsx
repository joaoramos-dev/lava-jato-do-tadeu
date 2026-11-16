import { useEffect, useRef } from "react";

/**
 * Camada WebGL (OGL) sobre fotos reais: ondulação líquida que segue cursor/toque
 * e, opcionalmente, transição de dissolução líquida entre duas fotos ligada à rolagem.
 * A <img> original permanece como fallback; só é ocultada quando o shader está pronto.
 */
type Props = {
  src: string;
  next?: string;
  /** seletor do elemento cuja rolagem controla a transição (0→1) */
  scrollTarget?: string;
  /** elemento pai que recebe a classe gl-ready */
  readyTarget?: string;
  position?: [number, number];
};

const vertex = /* glsl */ `
attribute vec2 uv; attribute vec2 position; varying vec2 vUv;
void main(){ vUv = uv; gl_Position = vec4(position, 0., 1.); }`;

const fragment = /* glsl */ `
precision highp float;
uniform sampler2D tA; uniform sampler2D tB;
uniform vec2 uRes; uniform vec2 uSizeA; uniform vec2 uSizeB; uniform vec2 uPos;
uniform vec2 uMouse; uniform float uHover; uniform float uTime; uniform float uProgress;
varying vec2 vUv;

vec2 cover(vec2 uv, vec2 size){
  float rs = uRes.x / uRes.y, ri = size.x / size.y;
  vec2 scale = rs > ri ? vec2(1., ri / rs) : vec2(rs / ri, 1.);
  return (uv - uPos) * scale + uPos;
}
float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float noise(vec2 p){ vec2 i = floor(p), f = fract(p); f = f*f*(3.-2.*f);
  return mix(mix(hash(i), hash(i+vec2(1,0)), f.x), mix(hash(i+vec2(0,1)), hash(i+vec2(1,1)), f.x), f.y); }
float fbm(vec2 p){ float v = 0., a = .5; for(int i=0;i<4;i++){ v += a*noise(p); p *= 2.1; a *= .5; } return v; }

void main(){
  vec2 uv = vUv;
  float aspect = uRes.x / uRes.y;
  vec2 d = (uv - uMouse) * vec2(aspect, 1.);
  float dist = length(d);
  // ondas concêntricas como uma gota sobre verniz vitrificado
  float ripple = sin(dist * 38. - uTime * 4.) * exp(-dist * 6.) * uHover;
  vec2 offset = normalize(d + 1e-5) * ripple * 0.012;
  // leve escorrimento contínuo de água
  offset += (vec2(fbm(uv * 3. + uTime * .08), fbm(uv * 3. - uTime * .06)) - .5) * 0.006;

  // dissolução líquida entre fotos
  float n = fbm(uv * 4. + vec2(0., uTime * .05));
  float edge = smoothstep(uProgress * 1.4 - .2, uProgress * 1.4, n + (1. - uv.y) * .4);
  float wave = sin(edge * 3.14159) * .04;

  vec4 a = texture2D(tA, cover(uv + offset + wave, uSizeA));
  vec4 b = texture2D(tB, cover(uv + offset - wave, uSizeB));
  vec4 col = mix(b, a, edge);

  // brilho especular na crista das ondas e na borda da transição
  float spec = pow(max(ripple, 0.), 2.) * 1.2 + sin(edge * 3.14159) * .18;
  col.rgb += vec3(spec);
  gl_FragColor = col;
}`;

export function LiquidImage({ src, next, scrollTarget, readyTarget, position = [0.5, 0.5] }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = ref.current;
    if (!host) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let disposed = false;
    let cleanup = () => {};

    (async () => {
      const { Renderer, Program, Mesh, Triangle, Texture } = await import("ogl");
      if (disposed) return;
      let renderer: InstanceType<typeof Renderer>;
      try {
        renderer = new Renderer({ dpr: Math.min(window.devicePixelRatio, 1.75), alpha: false });
      } catch { return; }
      const gl = renderer.gl;
      if (!gl) return;
      const canvas = gl.canvas as HTMLCanvasElement;
      canvas.className = "absolute inset-0 h-full w-full";
      canvas.setAttribute("aria-hidden", "true");

      const load = (url: string) => new Promise<{ tex: InstanceType<typeof Texture>; w: number; h: number }>((res, rej) => {
        const img = new Image();
        img.crossOrigin = "anonymous";
        img.onload = () => res({ tex: new Texture(gl, { image: img, generateMipmaps: false }), w: img.naturalWidth, h: img.naturalHeight });
        img.onerror = rej;
        img.src = url;
      });

      let A, B;
      try { [A, B] = await Promise.all([load(src), next ? load(next) : load(src)]); } catch { return; }
      if (disposed) return;

      const uniforms = {
        tA: { value: A.tex }, tB: { value: B.tex },
        uSizeA: { value: [A.w, A.h] }, uSizeB: { value: [B.w, B.h] },
        uRes: { value: [1, 1] }, uPos: { value: position },
        uMouse: { value: [0.5, 0.5] }, uHover: { value: 0 }, uTime: { value: 0 },
        uProgress: { value: 0 },
      };
      const program = new Program(gl, { vertex, fragment, uniforms });
      const mesh = new Mesh(gl, { geometry: new Triangle(gl), program });
      host.appendChild(canvas);
      const ready = readyTarget ? host.closest(readyTarget) : host.parentElement;
      ready?.classList.add("gl-ready");

      const resize = () => {
        const r = host.getBoundingClientRect();
        renderer.setSize(r.width, r.height);
        uniforms.uRes.value = [r.width, r.height];
      };
      resize();
      const ro = new ResizeObserver(resize);
      ro.observe(host);

      const target = [0.5, 0.5];
      let hoverTarget = 0;
      const area = host.closest("section") ?? host;
      const onMove = (e: PointerEvent) => {
        const r = host.getBoundingClientRect();
        target[0] = (e.clientX - r.left) / r.width;
        target[1] = 1 - (e.clientY - r.top) / r.height;
        hoverTarget = 1;
      };
      const onLeave = () => { hoverTarget = 0; };
      area.addEventListener("pointermove", onMove as EventListener, { passive: true });
      area.addEventListener("pointerdown", onMove as EventListener, { passive: true });
      area.addEventListener("pointerleave", onLeave);

      const scrollEl = scrollTarget ? document.querySelector(scrollTarget) : null;
      let visible = true;
      const io = new IntersectionObserver(([en]) => { visible = !!en?.isIntersecting; });
      io.observe(host);

      let raf = 0;
      const start = performance.now();
      const loop = () => {
        raf = requestAnimationFrame(loop);
        if (!visible) return;
        const m = uniforms.uMouse.value;
        m[0] += (target[0]! - m[0]!) * 0.08;
        m[1] += (target[1]! - m[1]!) * 0.08;
        uniforms.uHover.value += (hoverTarget - uniforms.uHover.value) * 0.05;
        if (hoverTarget > 0) hoverTarget = Math.max(0, hoverTarget - 0.004);
        uniforms.uTime.value = (performance.now() - start) / 1000;
        if (scrollEl) {
          const r = scrollEl.getBoundingClientRect();
          const span = Math.max(1, r.height - window.innerHeight * 0.85);
          const p = Math.min(1, Math.max(0, (-r.top + window.innerHeight * 0.3) / span));
          uniforms.uProgress.value += (p - uniforms.uProgress.value) * 0.12;
        }
        renderer.render({ scene: mesh });
      };
      loop();

      cleanup = () => {
        cancelAnimationFrame(raf);
        ro.disconnect(); io.disconnect();
        area.removeEventListener("pointermove", onMove as EventListener);
        area.removeEventListener("pointerdown", onMove as EventListener);
        area.removeEventListener("pointerleave", onLeave);
        ready?.classList.remove("gl-ready");
        canvas.remove();
        gl.getExtension("WEBGL_lose_context")?.loseContext();
      };
    })();

    return () => { disposed = true; cleanup(); };
  }, [src, next, scrollTarget, readyTarget, position]);

  return <div ref={ref} className="pointer-events-none absolute inset-0" />;
}
