import React from "react";
import { ResearchArea } from "../../types/content";
import researchData from "../../data/research.json";

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
        <div className="space-y-4">
          {researchAreas.map((area) => (
            <div key={area.id} className="p-6 border rounded-lg">
              <h3 className="text-xl font-bold mb-2">{area.title}</h3>
              <p className="text-gray-600">{area.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-orange-50 p-6 rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Collaboration</h2>
        <p className="mb-4">
          I'm always open to collaborating on interesting research projects.
          Whether you're working on cutting-edge technology, need help with
          analysis, or want to explore new ideas together, let's connect!
        </p>
        <div className="flex gap-4">
          <button className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 transition-colors">
            Contact us
          </button>
          <button className="px-4 py-2 border border-orange-500 text-orange-500 rounded hover:bg-orange-50 transition-colors">
            View Publications
          </button>
        </div>
      </div>
    </section>
  );
};

export default ResearchSection;
