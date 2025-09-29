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
    displayName: "Opensource Projects",
    anchor: "#projects",
  },
  {
    id: "products",
    route: "#products",
    displayName: "Products",
    anchor: "#products",
  },
  {
    id: "research",
    route: "#research",
    displayName: "research",
    anchor: "#research",
  },
  {
    id: "contact",
    route: "#contact",
    displayName: "Contact",
    anchor: "#contact",
  },
];

export const getPageById = (id: string): PageConfig | undefined =>
  pagesConfig.find((page) => page.id === id);

export const getPageByRoute = (route: string): PageConfig | undefined =>
  pagesConfig.find((page) => page.route === route);
