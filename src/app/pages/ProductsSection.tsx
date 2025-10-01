"use client";

import React, { useState } from "react";
import ProductModal from "../components/ui/ProductModal";
import { getAllArticles, ArticleData } from "../config/articleLoader";

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
  return (
    <>
      <section
        id="products"
        data-section="products"
        className="min-h-screen py-20"
      >
        <div className=" mx-auto">
          <h2 className="text-5xl font-bold mb-8">Products</h2>
          <p className="text-xl text-[var(--color-text-light)] mb-12 max-w-4xl">
            Our propertiary software and pipelines can help your business from
            small to industrial size scale
          </p>

          <div className="space-y-6 mb-12">
            {articles.map((article) => (
              <div
                key={article.id}
                className="border-b border-[var(--color-primary)] border-opacity-20 pb-6 cursor-pointer group transition-all duration-200 hover:border-opacity-40"
                onClick={() => openProductModal(article)}
              >
                <h3 className="text-2xl font-bold mb-3 group-hover:text-[var(--color-primary)] transition-colors">
                  {article.title}
                </h3>
                <p className="text-[var(--color-text-light)] leading-relaxed">
                  {article.description}
                </p>
              </div>
            ))}
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
