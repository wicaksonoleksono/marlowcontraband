import ProductArticleLayout from "../../components/layout/ProductArticleLayout";
export default function LightRag() {
  return ProductArticleLayout({
    title: "mm-rag",
    description:
      "Enterprise-grade automation platform that handles complex workflows, integrates with existing systems, and scales with your operations.",
    children: (
      <>
        <p className="text-xl mb-8">Multi-modal easy graph rag</p>

        <p className="mb-6">multimodal-graph rag</p>

        <p>Available now. Deployment in weeks, not months.</p>
      </>
    ),
  });
}
