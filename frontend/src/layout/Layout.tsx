import React from "react";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    // global container
    <div className="min-h-screen w-full flex flex-col bg-blue-100   ">
      {children}
    </div>
  );
};

export default Layout;

