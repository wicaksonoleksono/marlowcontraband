"use client";

import React, { Fragment } from "react";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import AutomationPlatformArticle from "../articles/AutomationPlatformArticle";
import { ProductConfig } from "../../config/products";

interface ProductModalProps {
  product: ProductConfig | null;
  isOpen: boolean;
  onClose: () => void;
}

const ProductArticles: Record<
  string,
  () => { title: string; description: string; content: React.ReactNode }
> = {
  AutomationPlatformArticle,
};

export default function ProductModal({
  product,
  isOpen,
  onClose,
}: ProductModalProps) {
  if (!product) return null;

  const ArticleComponent = ProductArticles[product.component];
  const articleData = ArticleComponent ? ArticleComponent() : null;

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        {/* Backdrop */}
        <TransitionChild
          as={Fragment}
          enter="transition-opacity duration-300 ease-out"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity duration-200 ease-in"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-[rgb(var(--bg-rgb))/0.6] backdrop-blur-md" />
        </TransitionChild>

        {/* Container for the panel */}
        <div className="fixed inset-0">
          <div className="flex min-h-full items-stretch justify-center">
            <TransitionChild
              as={Fragment}
              enter="transition-transform duration-500 ease-out"
              enterFrom="-translate-y-full"
              enterTo="translate-y-0"
              leave="transition-transform duration-300 ease-in"
              leaveFrom="translate-y-0"
              leaveTo="-translate-y-full"
            >
              {/* Full-screen sheet feel. You can make this max-w-4xl rounded if you prefer a centered modal */}
              <DialogPanel className="relative w-full min-h-screen bg-[rgb(var(--bg-rgb),_1)]/90 backdrop-blur-md">
                <div className="w-4/5 mx-auto py-8 max-h-screen overflow-y-auto scroll-smooth scrollbar-hide" data-lenis-prevent>
                  {/* Header */}
                  <div className="flex items-start justify-between mb-8">
                    <div className="flex-1">
                      <DialogTitle className="text-4xl font-bold mb-2">
                        {articleData?.title || "Article"}
                      </DialogTitle>
                      <p className="text-lg text-[var(--color-text-light)] opacity-90">
                        {articleData?.description || "No description available"}
                      </p>
                    </div>
                    <button
                      onClick={onClose}
                      className="text-2xl text-[var(--color-text-light)] hover:text-[var(--color-primary)] transition-opacity opacity-70 hover:opacity-100 ml-8"
                      aria-label="Close modal"
                    >
                      ×
                    </button>
                  </div>

                  {/* Content */}
                  <div>
                    {articleData ? (
                      articleData.content
                    ) : (
                      <div className="text-[var(--color-text-light)]">
                        Article component not found: {product.component}
                      </div>
                    )}
                  </div>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
