import ProductArticleLayout from "../../components/layout/ProductArticleLayout";
export default function LightRag() {
  return ProductArticleLayout({
    title: "mc-rag",
    description:
      "Multi-context graph based RAG",
    children: (
      <>
        <p className="text-xl mb-8">Multi-context graph based RAG</p>

        <p className="mb-6">A retrieval-augmented generation system that leverages multi-context graph structures for enhanced knowledge retrieval and reasoning.</p>

        <p className="text-center text-2xl font-bold mt-8">Coming soon!</p>
      </>
    ),
  });
}
