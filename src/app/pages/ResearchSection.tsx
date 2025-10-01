import React from "react";
import { ResearchArea } from "../types/content";
import researchData from "../data/research.json";

const ResearchSection = () => {
  const researchAreas: ResearchArea[] = researchData;

  return (
    <section
      id="research"
      data-section="research"
      className="min-h-screen py-8"
    >
      <h1 className="text-4xl font-bold mb-8">Research !</h1>

      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Current Research Interests</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {researchAreas.map((area) => (
            <div
              key={area.id}
              className="p-6 border hover:shadow-lg transition-shadow backdrop-blur-md"
            >
              <h3 className="text-xl font-bold mb-2">{area.title}</h3>
              <div className="flex gap-2 flex-wrap mb-3">
                <span className="px-2 py-1 bg-[var(--color-primary)] text-[var(--tag-text)] text-sm rounded">
                  {area.group.toUpperCase()}
                </span>
              </div>
              <p className="text-[var(--color-text-light)]">
                {area.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ResearchSection;
