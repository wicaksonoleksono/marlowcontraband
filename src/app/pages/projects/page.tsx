import Layout from "../../components/Layout";

const ProjectsPage = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">Projects</h1>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div className="p-6 border rounded-lg hover:shadow-lg transition-shadow">
            <h2 className="text-xl font-bold mb-3">Project 1</h2>
            <p className="text-gray-600 mb-4">
              Description of your awesome project goes here.
            </p>
            <div className="flex gap-2">
              <span className="px-2 py-1 bg-orange-100 text-orange-800 text-sm rounded">
                React
              </span>
              <span className="px-2 py-1 bg-orange-100 text-orange-800 text-sm rounded">
                Next.js
              </span>
            </div>
          </div>

          <div className="p-6 border rounded-lg hover:shadow-lg transition-shadow">
            <h2 className="text-xl font-bold mb-3">Project 2</h2>
            <p className="text-gray-600 mb-4">
              Another cool project with different technologies.
            </p>
            <div className="flex gap-2">
              <span className="px-2 py-1 bg-orange-100 text-orange-800 text-sm rounded">
                Python
              </span>
              <span className="px-2 py-1 bg-orange-100 text-orange-800 text-sm rounded">
                AI
              </span>
            </div>
          </div>

          <div className="p-6 border rounded-lg hover:shadow-lg transition-shadow">
            <h2 className="text-xl font-bold mb-3">Project 3</h2>
            <p className="text-gray-600 mb-4">
              Work in progress project, coming soon.
            </p>
            <div className="flex gap-2">
              <span className="px-2 py-1 bg-orange-100 text-orange-800 text-sm rounded">
                TypeScript
              </span>
              <span className="px-2 py-1 bg-orange-100 text-orange-800 text-sm rounded">
                Node.js
              </span>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProjectsPage;
