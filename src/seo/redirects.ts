export type SiteRedirect = {
  from: string;
  to: string;
};

/** Vecchi URL → destinazione. Il prerender scrive un HTML minimo, senza il template del sito. */
export const redirects: SiteRedirect[] = [
  { from: "/1998/", to: "/chi-siamo/" },
  { from: "/inspire/", to: "/" },
  { from: "/action/", to: "/" },
  { from: "/projects/alivexperiences/", to: "/projects/" },
  { from: "/projects/u-team/", to: "/projects/" },
  { from: "/projects/ast@-cr/", to: "/projects/" },
  { from: "/projects/arienti/", to: "/projects/" },
];
