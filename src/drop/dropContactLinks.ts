import { homeHash } from "./sitePaths";

export const DROP_WHATSAPP_URL = "https://wa.me/393475571187";

export type DropContactLink = {
  href: string;
  label: string;
  external?: boolean;
};

/** Link colonna Contatti — condivisi tra footer e menu burger. */
export function getDropContactLinks(anchorsResolveHome = false): DropContactLink[] {
  const h = (fragmentId: string) =>
    anchorsResolveHome ? homeHash(fragmentId) : `#${fragmentId.replace(/^#/, "")}`;

  return [
    { href: "mailto:info@digitaldrop.eu", label: "info@digitaldrop.eu" },
    { href: "tel:+393475571187", label: "+39 347 557 1187" },
    { href: DROP_WHATSAPP_URL, label: "Scrivici su WhatsApp", external: true },
    { href: h("contatti"), label: "Iniziamo un progetto" },
  ];
}
