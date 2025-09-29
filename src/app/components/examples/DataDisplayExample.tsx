import React from "react";
import KeyValueDisplay from "../common/KeyValueDisplay";
import homeData from "../../data/home.json";
import projectsData from "../../data/projects.json";
import researchData from "../../data/research.json";

const DataDisplayExample = () => {
  return (
    <div className="space-y-8 p-6">
      <div>
        <h3 className="text-xl font-bold mb-4">Home Data</h3>
        <div className="p-4 border hover:shadow-lg transition-shadow backdrop-blur-md">
          <KeyValueDisplay data={homeData} />
        </div>
      </div>

      <div>
        <h3 className="text-xl font-bold mb-4">Projects</h3>
        <div className="grid gap-4">
          {projectsData.map((project) => (
            <div key={project.id} className="p-4 border hover:shadow-lg transition-shadow backdrop-blur-md">
              <KeyValueDisplay data={project} />
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-xl font-bold mb-4">Research Areas</h3>
        <div className="grid gap-4">
          {researchData.map((research) => (
            <div key={research.id} className="p-4 border hover:shadow-lg transition-shadow backdrop-blur-md">
              <KeyValueDisplay data={research} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DataDisplayExample;