import { useEffect, useState, type AnchorHTMLAttributes } from "react";
import { MAP_LINK, MAPS } from "./data";

export function MapLink(props: AnchorHTMLAttributes<HTMLAnchorElement>) {
  const [href, setHref] = useState(MAPS);
  useEffect(() => { setHref(MAP_LINK(navigator.userAgent)); }, []);
  return <a {...props} href={href} target="_blank" rel="noreferrer" />;
}