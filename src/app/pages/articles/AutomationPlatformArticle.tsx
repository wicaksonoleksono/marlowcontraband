import ProductArticleLayout from "../../components/layout/ProductArticleLayout";
export default function AutomationPlatformArticle() {
  return ProductArticleLayout({
    title: "togetherbase",
    description:
      "Connecting learners with tutors on multidisciplinary courses.",
    children: (
      <>
        <p className="text-xl mb-8">
          A platform that brings together passionate learners and expert tutors across diverse disciplines.
        </p>

        <p className="mb-6">
          Whether you&apos;re looking to master a new skill or share your expertise, togetherbase creates meaningful connections in a learning community built on curiosity and collaboration.
        </p>

        {/* Placeholder for carousel */}
        <div className="my-12 p-12 border-2 border-dashed border-[var(--color-primary)] border-opacity-30 rounded-lg bg-[var(--color-primary)] bg-opacity-5 flex items-center justify-center">
          <p className="text-[var(--color-text-light)] text-center">
            [Carousel placeholder - UI coming soon]
          </p>
        </div>

        <p className="text-center text-2xl font-bold mt-8">Coming soon!</p>
      </>
    ),
  });
}
