import logo from "@/assets/logo.png.asset.json";
import haval from "@/assets/haval.png.asset.json";
import porsche from "@/assets/porsche-macan.png.asset.json";
import triton from "@/assets/mitsubishi-triton.png.asset.json";
import bmw from "@/assets/bmw-serie3.png.asset.json";
import yamaha from "@/assets/yamaha-moto.png.asset.json";

export const LOGO = logo.url;
export const PHONE_DISPLAY = "(21) 97323-3825";
export const WHATSAPP = (msg = "Olá! Gostaria de agendar um serviço no Lava Jato do Tadeu.") =>
  `https://wa.me/5521973233825?text=${encodeURIComponent(msg)}`;
export const INSTAGRAM = "https://instagram.com/lavajatodotadeu";
export const ADDRESS = "Av. Feliciano Sodré, 171 - Várzea, Teresópolis - RJ, 25963-083";
export const MAPS = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(ADDRESS)}`;

export const PHOTOS = {
  haval: haval.url,
  porsche: porsche.url,
  triton: triton.url,
  bmw: bmw.url,
  yamaha: yamaha.url,
};

export const SERVICES = [
  { name: "Polimento", desc: "Correção de pintura que remove riscos superficiais e devolve brilho e profundidade à cor.", img: PHOTOS.bmw },
  { name: "Vitrificação", desc: "Camada de proteção que realça o brilho e facilita a limpeza do dia a dia.", img: PHOTOS.haval },
  { name: "Higienização interna", desc: "Limpeza de bancos, carpetes, painel e forros para um interior limpo e renovado.", img: PHOTOS.triton },
  { name: "Cristalização", desc: "Proteção da pintura com efeito espelhado e acabamento uniforme.", img: PHOTOS.porsche },
  { name: "Descontaminação de pintura", desc: "Remoção de resíduos aderidos e chuva ácida, preparando a superfície.", img: PHOTOS.bmw },
  { name: "Lavagem de motor", desc: "Limpeza cuidadosa do cofre do motor com produtos adequados.", img: PHOTOS.triton },
  { name: "Lavagem técnica e detalhada", desc: "Lavagem minuciosa de cada detalhe — de carros a motos.", img: PHOTOS.yamaha },
];

export type GalleryItem = { src: string; title: string; cat: "SUV" | "Sedan" | "Picape" | "Moto" };
export const GALLERY: GalleryItem[] = [
  { src: PHOTOS.porsche, title: "Porsche Macan", cat: "SUV" },
  { src: PHOTOS.bmw, title: "BMW Série 3", cat: "Sedan" },
  { src: PHOTOS.haval, title: "Haval", cat: "SUV" },
  { src: PHOTOS.triton, title: "Mitsubishi Triton", cat: "Picape" },
  { src: PHOTOS.yamaha, title: "Yamaha XJ6", cat: "Moto" },
];
