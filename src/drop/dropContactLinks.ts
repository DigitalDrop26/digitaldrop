export const DROP_WHATSAPP_URL = "https://wa.me/393475571187";

export type DropContactLink = {
  label: string;
  href?: string;
  to?: { pathname: string; hash?: string };
  external?: boolean;
};

/** Link colonna Contatti — condivisi tra footer e menu burger. */
export function getDropContactLinks(): DropContactLink[] {
  return [
    { href: "mailto:info@digitaldrop.eu", label: "info@digitaldrop.eu" },
    { href: "tel:+393475571187", label: "+39 347 557 1187" },
    { href: DROP_WHATSAPP_URL, label: "Scrivici su WhatsApp", external: true },
    { to: { pathname: "/", hash: "#contatti" }, label: "Iniziamo un progetto" },
  ];
}
