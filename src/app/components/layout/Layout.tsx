import React, { ReactNode } from "react";
import Header from "./Header";
import Footer from "./footer";
type LayoutProps = {
  children: ReactNode;
  isScrollMode?: boolean;
};

const Layout: React.FC<LayoutProps> = ({ children, isScrollMode = false }) => {
  return (
    <div>
      <div className="mx-auto pt-20" style={{width: 'var(--layout-width)'}}>
        <Header isScrollMode={isScrollMode} />
        <div className=" flex flex-col justify-between px-6 py-4 w-full">
          {children}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
