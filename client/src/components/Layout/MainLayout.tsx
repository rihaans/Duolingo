import React from 'react';
import Sidebar from '../Dashboard/Sidebar';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      {/* Main content with padding for sidebar */}
      <div className="flex-1 md:ml-20 lg:ml-64 mb-16 md:mb-0">
        {children}
      </div>
    </div>
  );
};

export default MainLayout;
