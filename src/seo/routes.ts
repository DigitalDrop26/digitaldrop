import agrovitHero from "@Immagini/Agrovit/Agrovit_hero.jpg?url";
import allevaHero from "@Immagini/Alleva PR/Magazzino_Parmigiano.jpg?url";
import anafibjHero from "@Immagini/Anafibj/Anafibj_hero.png?url";
import fieraHero from "@Immagini/Fiera Cremona/Fiera Cremona.jpg?url";
import dropHero from "@Immagini/Drop_hero.png?url";
import homeHero from "@Immagini/trattore.jpeg?url";

export const SITE_ORIGIN = "https://www.digitaldrop.eu";

export type PublicRoute = {
  path: string;
  title: string;
  description: string;
  ogImage: string;
};

/** Pagine pubbliche prerenderizzate, con title e description definitivi. */
export const publicRoutes: PublicRoute[] = [
  {
    path: "/",
    title: "Drop · Agenzia di marketing e comunicazione agroalimentare e filiere food del settore primario",
    description:
      "Drop è l'agenzia di comunicazione agroalimentare e zootecnica. Dal 1998 strategia, brand e digitale per aziende e filiere del settore primario.",
    ogImage: homeHero,
  },
  {
    path: "/chi-siamo/",
    title: "Chi siamo · Drop, comunicazione agroalimentare dal 1998",
    description:
      "Drop è un'agenzia di marketing e comunicazione agroalimentare con sede in Sardegna e Lombardia. Dal 1998 parliamo la lingua dell'agrifood e delle filiere.",
    ogImage: dropHero,
  },
  {
    path: "/projects/",
    title: "Caso studio di comunicazione agroalimentare · Drop",
    description:
      "Case history di comunicazione agroalimentare e zootecnica: Agrovit, Fiere di Cremona, Alleva PR e Anafibj. Identità, video content, campagne e digitale.",
    ogImage: dropHero,
  },
  {
    path: "/projects/agrovit/",
    title: "Agrovit: identità e comunicazione per la zootecnia · Drop",
    description:
      "Agrovit, partner tecnico degli allevatori: identità, contenuti e social per un brand zootecnico che parla alle persone.",
    ogImage: agrovitHero,
  },
  {
    path: "/projects/fiera-cremona/",
    title: "Fiere di Cremona: l'asta delle bovine da latte · Drop",
    description:
      "Fiere di Cremona: come abbiamo portato un nuovo format di comunicazione e innovazione per l'asta di vacche da latte, innovando un settore tradizionale della zootecnia.",
    ogImage: fieraHero,
  },
  {
    path: "/projects/alleva-pr/",
    title: "Alleva PR: la filiera del Parmigiano Reggiano · Drop",
    description:
      "Alleva PR riunisce allevatori e tecnici del Parmigiano Reggiano: connessioni e dialogo per ascoltare la filiera produttiva della DOP.",
    ogImage: allevaHero,
  },
  {
    path: "/projects/anafibj/",
    title: "Anafibj: in rete gli allevatori di tutta Italia · Drop",
    description:
      "Anafibj e la selezione genetica delle bovine da latte: come abbiamo messo in connessione gli allevatori di tutta Italia.",
    ogImage: anafibjHero,
  },
];

/** Pagina catch-all, scritta in dist/404.html. Fuori dalla sitemap. */
export const notFoundSeo = {
  title: "Pagina non trovata · Drop",
  description: "La pagina che cerchi non esiste o è stata spostata.",
} as const;

for (const route of publicRoutes) {
  if (route.path !== "/" && !route.path.endsWith("/")) {
    throw new Error(`Path senza slash finale: ${route.path}`);
  }
}

export function pageTitle(path: string): string {
  const normalized = path === "/" ? "/" : path.endsWith("/") ? path : `${path}/`;
  const route = publicRoutes.find((item) => item.path === normalized);
  if (!route) throw new Error(`Title SEO mancante per ${path}`);
  return route.title;
}
