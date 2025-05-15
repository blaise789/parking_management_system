// Home.tsx
import Header from "@/components/Header";
import SideBar from "@/components/SideBar";
import React from "react";

const Home: React.FC = () => {
  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Sidebar container */}
      <div className="hidden md:block">
        <SideBar />
      </div>
      
      {/* Main content container */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        
        <Header />
        
        {/* Main content area */}
        <main className="flex-1 p-4 sm:p-6 bg-gray-200 min-h-screen overflow-y-auto">
          {/* Your dashboard content will go here */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-800">Dashboard Overview</h2>
            {/* Add your dashboard components here */}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Home;