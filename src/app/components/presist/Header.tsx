import React from "react";
import Link from "next/link";
import { pagesConfig } from "../../config/pages";

interface HeaderProps {
  isScrollMode?: boolean;
}

const Header: React.FC<HeaderProps> = ({ isScrollMode = false }) => {
  return (
    <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-[65vw]">
      <div className="flex items-center justify-between px-6 py-4">
        <Link href="/">
          <h1 className="text-2xl font-bold hover:text-[var(--color-primary)] transition-colors cursor-pointer">
            Marlows Contrabands
          </h1>
        </Link>
        <nav className="flex gap-6 overflow-x-auto" id="navbar-list">
          {pagesConfig.map((page) => (
            <Link
              key={page.id}
              href={isScrollMode ? page.anchor : page.route}
              className="font-bold hover:text-[var(--color-primary)] transition-colors whitespace-nowrap px-3 py-2 rounded-md"
              data-section={page.id}
            >
              {page.displayName}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default Header;
