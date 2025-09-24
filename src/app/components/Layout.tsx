import React, { ReactNode } from "react";
import Header from "./presist/Header";
import Footer from "./presist/footer";

type LayoutProps = {
  children: ReactNode;
  isScrollMode?: boolean;
};

const Layout: React.FC<LayoutProps> = ({ children, isScrollMode = false }) => {
  return (
    <div>
      <Header isScrollMode={isScrollMode} />
      <div className="w-[65vw] mx-auto pt-20">
        <div className=" flex flex-col justify-between px-6 py-4 w-full">
          {children}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
