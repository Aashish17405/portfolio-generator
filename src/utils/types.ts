export type Step = 1 | 2 | 3 | 4 | 5

export interface PortfolioConfig {
  style: string;
  colorCombo: string;
  userDetails: any;
  pages: PageConfig[];
}

export interface PageConfig {
  id: string;
  name: string;
  enabled: boolean;
  icon: string;
  order: number;
}

export interface SectionConfig {
  id: string;
  name: string;
  enabled: boolean;
  pageId: string;
}

export const DEFAULT_PAGES: PageConfig[] = [
  {
    id: "home",
    name: "Home",
    enabled: true,
    icon: "home",
    order: 1,
  },
  {
    id: "about",
    name: "About",
    enabled: true,
    icon: "user",
    order: 2,
  },
  {
    id: "experience",
    name: "Experience",
    enabled: true,
    icon: "briefcase",
    order: 3,
  },
  {
    id: "projects",
    name: "Projects",
    enabled: true,
    icon: "folder",
    order: 4,
  },
  {
    id: "skills",
    name: "Skills",
    enabled: true,
    icon: "award",
    order: 5,
  },
  {
    id: "contact",
    name: "Contact",
    enabled: true,
    icon: "mail",
    order: 6,
  },
];
