"use client";

import React, { useState } from "react";
import Button from "../ui/Button";
import ProductModal from "../ui/ProductModal";
import { productsConfig, ProductConfig } from "../../config/products";
import AutomationPlatformArticle from "../articles/AutomationPlatformArticle";

const ProductArticles: Record<
  string,
  () => { title: string; description: string; content: React.ReactNode }
> = {
  AutomationPlatformArticle,
};

const ProductsSection = () => {
  const [selectedProduct, setSelectedProduct] = useState<ProductConfig | null>(
    null
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openProductModal = (product: ProductConfig) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedProduct(null), 300);
  };

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
            Our propertiary pipelines can help your business from industrial
            implementation to small business
          </p>

          <div className="space-y-6 mb-12">
            {productsConfig.map((product) => {
              const ArticleComponent = ProductArticles[product.component];
              const articleData = ArticleComponent ? ArticleComponent() : null;

              return (
                <div
                  key={product.id}
                  className="border-b border-[var(--color-primary)] border-opacity-20 pb-6 cursor-pointer group transition-all duration-200 hover:border-opacity-40"
                  onClick={() => openProductModal(product)}
                >
                  <h3 className="text-2xl font-bold mb-3 group-hover:text-[var(--color-primary)] transition-colors">
                    {articleData?.title || "Untitled Product"}
                  </h3>
                  <p className="text-[var(--color-text-light)] leading-relaxed">
                    {articleData?.description || "No description available"}
                  </p>
                </div>
              );
            })}
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
