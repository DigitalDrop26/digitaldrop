import agrovitHeroTestata from "@Immagini/Agrovit/adv stampa/agrovit_testata.png?url";
import allevaHero from "@Immagini/Alleva PR/AllevaPR_hero.png?url";
import anafibjHero from "@Immagini/Anafibj/Anafibj_hero.png?url";
import astaHero from "@Immagini/Fiera Cremona/Fiera Cremona.jpg?url";

export type ProjectCategoryId =
  | "tutti"
  | "branding"
  | "strategy"
  | "communication"
  | "visual"
  | "content"
  | "social"
  | "food"
  | "formazione";

export type ProjectCategory = Exclude<ProjectCategoryId, "tutti">;

const ALL_CATEGORY_FILTER_DEFINITIONS: { id: Exclude<ProjectCategoryId, "tutti">; label: string }[] = [
  { id: "branding", label: "Branding & identity" },
  { id: "strategy", label: "Strategy" },
  { id: "communication", label: "Communication" },
  { id: "visual", label: "Visual" },
  { id: "content", label: "Content" },
  { id: "social", label: "Social" },
  { id: "food", label: "Food & agro" },
  { id: "formazione", label: "Formazione" },
];

/** Label brevi delle categorie, usate come pill nell'anteprima delle card. */
export const PROJECT_CATEGORY_LABELS: Record<ProjectCategory, string> = {
  branding: "Branding",
  strategy: "Strategy",
  communication: "Communication",
  visual: "Visual",
  content: "Content",
  social: "Social",
  food: "Food & agro",
  formazione: "Formazione",
};

export type DropProject = {
  id: string;
  client: string;
  title: string;
  sector: string;
  year: string;
  img: string;
  categories: ProjectCategory[];
  detailPath?: string;
};

/** Progetti in evidenza sulla home — ordine e layout griglia asimmetrica. */
export type HomepageFeaturedProject = DropProject & {
  span: string;
  height: number;
};

export const DROP_PROJECTS: DropProject[] = [
  {
    id: "agrovit",
    client: "visual, content, social",
    title: "Agrovit",
    sector: "Agro · Brand World",
    year: "2025",
    img: agrovitHeroTestata,
    categories: ["visual", "content", "social"],
    detailPath: "/projects/agrovit",
  },
  {
    id: "fiera-cremona",
    client: "strategy, communication",
    title: "Fiera Zootecnica Internazionale di Cremona",
    sector: "Livestock · Events",
    year: "2023",
    img: astaHero,
    categories: ["strategy", "communication"],
    detailPath: "/projects/fiera-cremona",
  },
  {
    id: "alleva-pr",
    client: "Consorzio del Formaggio Parmigiano Reggiano",
    title: "Alleva PR",
    sector: "Food · Community",
    year: "2023",
    img: allevaHero,
    categories: ["communication", "strategy"],
    detailPath: "/projects/alleva-pr",
  },
  {
    id: "anafibj",
    client: "Associazione Nazionale Allevatori Frisona, Bruna e Jersey",
    title: "Anafibj",
    sector: "Livestock · Digital",
    year: "2023",
    img: anafibjHero,
    categories: ["strategy", "communication", "branding"],
    detailPath: "/projects/anafibj",
  },
];

/** Filtri archivio — solo categorie presenti almeno in un progetto. */
export const PROJECT_CATEGORY_FILTERS: { id: ProjectCategoryId; label: string }[] = [
  { id: "tutti", label: "Tutti" },
  ...ALL_CATEGORY_FILTER_DEFINITIONS.filter((definition) =>
    DROP_PROJECTS.some((project) => project.categories.includes(definition.id)),
  ),
];

const featuredLayout: Record<string, { span: string; height: number }> = {
  "agrovit": { span: "span 7", height: 560 },
  "fiera-cremona": { span: "span 5", height: 560 },
  "alleva-pr": { span: "span 5", height: 420 },
  "anafibj": { span: "span 7", height: 420 },
};

export const HOMEPAGE_FEATURED_PROJECT_IDS = [
  "agrovit",
  "fiera-cremona",
  "alleva-pr",
  "anafibj",
] as const;

export function getHomepageFeaturedProjects(): HomepageFeaturedProject[] {
  return HOMEPAGE_FEATURED_PROJECT_IDS.map((id) => {
    const project = DROP_PROJECTS.find((p) => p.id === id);
    if (!project) throw new Error(`Progetto in evidenza non trovato: ${id}`);
    return { ...project, ...featuredLayout[id] };
  });
}

export function filterProjectsByCategory(category: ProjectCategoryId): DropProject[] {
  if (category === "tutti") return DROP_PROJECTS;
  return DROP_PROJECTS.filter((p) => p.categories.includes(category));
}

export function getProjectsWithDetailPages(): (DropProject & { detailPath: string })[] {
  return DROP_PROJECTS.filter((p): p is DropProject & { detailPath: string } => Boolean(p.detailPath));
}

/** Prossimo progetto in ordine di archivio; al last item torna al primo. */
export function getNextProject(currentPath: string): (DropProject & { detailPath: string }) | null {
  const projects = getProjectsWithDetailPages();
  if (projects.length === 0) return null;
  const idx = projects.findIndex((p) => p.detailPath === currentPath);
  if (idx === -1) return projects[0];
  return projects[(idx + 1) % projects.length];
}

/** Progetto precedente in ordine di archivio; al first item torna all'ultimo. */
export function getPreviousProject(currentPath: string): (DropProject & { detailPath: string }) | null {
  const projects = getProjectsWithDetailPages();
  if (projects.length === 0) return null;
  const idx = projects.findIndex((p) => p.detailPath === currentPath);
  if (idx === -1) return projects[projects.length - 1];
  return projects[(idx - 1 + projects.length) % projects.length];
}
