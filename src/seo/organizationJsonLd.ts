import { SITE_ORIGIN } from "./routes";

/**
 * LinkedIn, Facebook e Instagram non sono linkati nel sito: niente sameAs,
 * per non inventare URL.
 */
export const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Drop",
  legalName: "Drop S.r.l.",
  url: `${SITE_ORIGIN}/`,
  logo: `${SITE_ORIGIN}/logo-color.svg`,
  foundingDate: "1998",
  email: "info@digitaldrop.eu",
  vatID: "01253030959",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Strada 28 Ovest",
    postalCode: "09092",
    addressLocality: "Arborea",
    addressRegion: "OR",
    addressCountry: "IT",
  },
} as const;
