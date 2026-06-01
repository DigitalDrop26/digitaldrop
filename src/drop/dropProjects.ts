import aliveCaseBusStopSrc from "@Immagini/aliveX/Rebranding AliveXperiences_ Lusso Su Misura nel Travel Trade_files/medium_Free_Bus_Stop_Poster_at_Night_Mockup_db35d03013.png?url";
import giocoCar01 from "@Immagini/Gioco di squadra/01.png?url";
import { bundleResources } from "./bundleResources";

export type ProjectCategoryId =
  | "tutti"
  | "branding"
  | "strategy"
  | "communication"
  | "food"
  | "formazione";

export type ProjectCategory = Exclude<ProjectCategoryId, "tutti">;

export const PROJECT_CATEGORY_FILTERS: { id: ProjectCategoryId; label: string }[] = [
  { id: "tutti", label: "Tutti" },
  { id: "branding", label: "Branding & identity" },
  { id: "strategy", label: "Strategy" },
  { id: "communication", label: "Communication" },
  { id: "food", label: "Food & agro" },
  { id: "formazione", label: "Formazione" },
];

/** Label brevi delle categorie, usate come pill nell'anteprima delle card. */
export const PROJECT_CATEGORY_LABELS: Record<ProjectCategory, string> = {
  branding: "Branding",
  strategy: "Strategy",
  communication: "Communication",
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
    id: "caseificio-roero",
    client: "Caseificio Roero",
    title: "Un caseificio piemontese diventa brand nazionale",
    sector: "Food · DOP",
    year: "2024",
    img: bundleResources.imgCheese,
    categories: ["food", "branding"],
  },
  {
    id: "alive-xperiences",
    client: "branding, strategy",
    title: "Alive Xperiences",
    sector: "Travel · Luxury",
    year: "2024",
    img: aliveCaseBusStopSrc,
    categories: ["branding", "strategy"],
    detailPath: "/projects/alive",
  },
  {
    id: "gioco-di-squadra",
    client: "strategy, communication",
    title: "Gioco di Squadra",
    sector: "Animal Health · Pharma",
    year: "2025",
    img: giocoCar01,
    categories: ["strategy", "communication"],
    detailPath: "/projects/gioco-di-squadra",
  },
  {
    id: "its-agroalimentare",
    client: "ITS Agroalimentare",
    title: "Formazione AI per 600 studenti tra Parma e Modena",
    sector: "Formazione",
    year: "2024",
    img: bundleResources.imgCode1200,
    categories: ["formazione"],
  },
];

const featuredLayout: Record<string, { span: string; height: number }> = {
  "caseificio-roero": { span: "span 7", height: 560 },
  "alive-xperiences": { span: "span 5", height: 560 },
  "gioco-di-squadra": { span: "span 5", height: 420 },
  "its-agroalimentare": { span: "span 7", height: 420 },
};

export const HOMEPAGE_FEATURED_PROJECT_IDS = [
  "caseificio-roero",
  "alive-xperiences",
  "gioco-di-squadra",
  "its-agroalimentare",
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
