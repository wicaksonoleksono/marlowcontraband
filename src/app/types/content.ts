export interface Project {
  id: string;
  title: string;
  description: string;
  stack: string[];
  github?: string;
}

export interface ResearchArea {
  id: string;
  title: string;
  description: string;
  group: string;
}

export interface HomeContent {
  title: string;
  subtitle: string;
  description: string;
}