import React from "react";
import { Project } from "../../types/content";
import projectsData from "../../data/projects.json";

const ProjectsSection = () => {
  const projects: Project[] = projectsData;

  return (
    <section id="projects" data-section="projects" className="min-h-screen py-8">
      <h1 className="text-4xl font-bold mb-8">Projects</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <div key={project.id} className="p-6 border rounded-lg hover:shadow-lg transition-shadow">
            <h2 className="text-xl font-bold mb-3">{project.title}</h2>
            <p className="text-gray-600 mb-4">{project.description}</p>
            <div className="flex gap-2 flex-wrap">
              {project.stack.map((tech) => (
                <span key={tech} className="px-2 py-1 bg-orange-100 text-orange-800 text-sm rounded">
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
    </section>
  );
};

export default ProjectsSection;