import { Outlet } from "react-router-dom";
import { useState } from "react";
import { Sidebar } from "./Sidebar";
import { Navbar } from "./Navbar";
import { Player } from "./Player";
import { Footer } from "./Footer";

export const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const onMenuClick = () => {
    setSidebarOpen(true);
  };

  const onClose = () => {
    setSidebarOpen(false);
  };

  return (
    <div className="flex flex-col h-screen bg-bg text-text-primary overflow-hidden">
      <div className="flex flex-1 overflow-hidden">
        <Sidebar
          isOpen={sidebarOpen}
          onClose={onClose}
        />
        <div className="flex-1 flex flex-col h-full relative overflow-hidden">
          <Navbar onMenuClick={onMenuClick} />
          <main className="flex-1 overflow-y-auto">
            <Outlet />
            <Footer />
          </main>
        </div>
      </div>
      <Player />
    </div>
  );
};

export default Layout;
