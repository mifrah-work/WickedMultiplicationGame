import React from 'react';

const Header = () => {
  return (
    <header className="bg-blue-600 text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <h1 className="text-xl font-bold">React + Tailwind</h1>
          </div>
          
          <nav className="hidden md:block">
            <div className="flex space-x-4">
              <a href="#" className="hover:text-blue-200 px-3 py-2 rounded-md text-sm font-medium">
                Home
              </a>
              <a href="#" className="hover:text-blue-200 px-3 py-2 rounded-md text-sm font-medium">
                About
              </a>
              <a href="#" className="hover:text-blue-200 px-3 py-2 rounded-md text-sm font-medium">
                Contact
              </a>
            </div>
          </nav>
          
          <div className="md:hidden">
            <button className="text-white hover:text-blue-200 focus:outline-none">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;