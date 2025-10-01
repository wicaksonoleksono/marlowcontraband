// Auto-discovery system for product articles
import AutomationPlatformArticle from "../pages/articles/AutomationPlatformArticle";
import LightRag from "../pages/articles/LightRag";
export interface ArticleData {
  id: string;
  title: string;
  description: string;
  content: React.ReactNode;
}

// Auto-discovered articles - just add your component here and it appears automatically
const articleComponents = {
  AutomationPlatformArticle,
  LightRag,
};

export function getAllArticles(): ArticleData[] {
  return Object.entries(articleComponents).map(([key, Component]) => {
    const articleData = Component();
    return {
      id: key
        .toLowerCase()
        .replace(/([A-Z])/g, "-$1")
        .slice(1), // Convert PascalCase to kebab-case
      title: articleData.title,
      description: articleData.description,
      content: articleData.content,
    };
  });
}

export function getArticleById(id: string): ArticleData | undefined {
  const articles = getAllArticles();
  return articles.find((article) => article.id === id);
}
