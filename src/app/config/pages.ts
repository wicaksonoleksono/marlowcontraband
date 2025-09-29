export interface PageConfig {
  id: string;
  route: string;
  displayName: string;
  anchor: string;
}

export const pagesConfig: PageConfig[] = [
  {
    id: "home",
    route: "/",
    displayName: "Home",
    anchor: "#home",
  },
  {
    id: "projects",
    route: "#projects",
    displayName: "Projects",
    anchor: "#projects",
  },
  {
    id: "research",
    route: "#research",
    displayName: "Research",
    anchor: "#research",
  },
  {
    id: "writings",
    route: "#writings",
    displayName: "writings",
    anchor: "#writings",
  },
];

export const getPageById = (id: string): PageConfig | undefined =>
  pagesConfig.find((page) => page.id === id);

export const getPageByRoute = (route: string): PageConfig | undefined =>
  pagesConfig.find((page) => page.route === route);
