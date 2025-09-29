import React from "react";

const WritingsSection = () => {
  return (
    <section
      id="writings"
      data-section="writings"
      className="min-h-screen py-8"
    >
      <h1 className="text-4xl font-bold mb-8">Writings !</h1>
      
      <div className="mb-8">
        <div className="p-6 border hover:shadow-lg transition-shadow backdrop-blur-md">
          <h2 className="text-2xl font-bold mb-4">Coming Soon</h2>
          <p className="text-gray-600">
            This section will feature our latest writings, articles, and thought pieces on technology, research, and innovation.
          </p>
        </div>
      </div>
    </section>
  );
};

export default WritingsSection;