interface ProductArticleLayoutProps {
  title: string;
  description: string;
  children: React.ReactNode;
}

export default function ProductArticleLayout({ title, description, children }: ProductArticleLayoutProps) {
  return {
    title,
    description,
    content: (
      <div className="prose prose-lg max-w-none text-[var(--foreground)]">
        {children}
      </div>
    )
  };
}