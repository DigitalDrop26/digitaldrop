import { homeHash } from "./sitePaths";

export type DropContactLink = {
  href: string;
  label: string;
};

/** Link colonna Contatti — condivisi tra footer e menu burger. */
export function getDropContactLinks(anchorsResolveHome = false): DropContactLink[] {
  const h = (fragmentId: string) =>
    anchorsResolveHome ? homeHash(fragmentId) : `#${fragmentId.replace(/^#/, "")}`;

  return [
    { href: "mailto:info@digitaldrop.eu", label: "info@digitaldrop.eu" },
    { href: "tel:+393475571187", label: "+39 347 557 1187" },
    { href: h("instagram"), label: "Instagram" },
    { href: h("linkedin"), label: "LinkedIn" },
  ];
}
