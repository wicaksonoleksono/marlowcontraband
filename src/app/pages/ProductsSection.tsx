"use client";

import React, { useState } from "react";
import ProductModal from "../components/ui/ProductModal";
import { getAllArticles, ArticleData } from "../config/articleLoader";
import { Project } from "../types/content";
import projectsData from "../data/projects.json";

const ProductsSection = () => {
  const [selectedProduct, setSelectedProduct] = useState<ArticleData | null>(
    null
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openProductModal = (product: ArticleData) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedProduct(null), 300);
  };
  const articles = getAllArticles();
  const projects: Project[] = projectsData;

  return (
    <>
      <section
        id="products"
        data-section="products"
        className="min-h-screen py-20 mt-100"
      >
        <div className=" mx-auto">
          <h2 className="text-5xl font-bold mb-8">Products & Projects</h2>
          <p className="text-xl text-[var(--color-text-light)] mb-12 max-w-4xl">
            Our propertiary software and pipelines can help your business from
            small to industrial size scale
          </p>

          {/* Products Section */}
          <div className="space-y-6 mb-16">
            <h3 className="text-3xl font-bold mb-6">Products</h3>
            {articles.map((article) => (
              <div
                key={article.id}
                className="border-b border-[var(--color-primary)] border-opacity-20 pb-6 cursor-pointer group transition-all duration-200 hover:border-opacity-40"
                onClick={() => openProductModal(article)}
              >
                <h4 className="text-2xl font-bold mb-3 group-hover:text-[var(--color-primary)] transition-colors">
                  {article.title}
                </h4>
                <p className="text-[var(--color-text-light)] leading-relaxed">
                  {article.description}
                </p>
              </div>
            ))}
          </div>

          {/* Opensource Projects Section */}
          <div className="my-100">
            <h3 className="text-3xl font-bold mb-6">Opensource Projects</h3>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {projects.map((project) => (
                <div
                  key={project.id}
                  className="p-6 border hover:shadow-lg transition-shadow backdrop-blur-md"
                >
                  <h4 className="text-xl font-bold mb-3">{project.title}</h4>
                  <p className="text-[var(--color-text-light)] mb-4">
                    {project.description}
                  </p>
                  <div className="flex gap-2 flex-wrap">
                    {project.stack.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 bg-[var(--color-primary)] text-[var(--tag-text)] text-sm rounded"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  {project.github && (
                    <div className="mt-4">
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[var(--color-primary)] hover:underline text-sm"
                      >
                        View on GitHub
                      </a>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <ProductModal
        product={selectedProduct}
        isOpen={isModalOpen}
        onClose={closeModal}
      />
    </>
  );
};

export default ProductsSection;
