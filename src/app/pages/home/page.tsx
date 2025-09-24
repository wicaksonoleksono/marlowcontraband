import React from "react";
import Layout from "@/app/components/Layout";
const HomePage: React.FC = () => {
  return (
    <Layout>
      <section id="home" data-section="home" className="min-h-screen ">
        <h1 className="text-4xl font-bold ">Welcome</h1>
        <p>Home page content goes here.</p>
      </section>
    </Layout>
  );
};

export default HomePage;
