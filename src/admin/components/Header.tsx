import React from "react";

const Header = ({ title }: { title: string }) => {
  return (
    <div className="backdrop-blur shadow-lg border-b border-gray-300">
      <div className="max-w-7xl mx-auto py-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-semibold text-gray-700">{title}</h1>
      </div>
    </div>
  );
};

export default Header;
