import { Outlet } from "react-router-dom";
import { Sidebar } from "./Sidebar";
import { Navbar } from "./Navbar";
import { Player } from "./Player";

export const Layout = () => {
  return (
    <div className="flex flex-col h-screen bg-bg text-text-primary overflow-hidden">
      <div className="flex flex-1 overflow-hidden">
        <div className="w-64 shrink-0">
<Sidebar />
        </div>
        <div className="flex-1 flex flex-col h-full relative overflow-hidden">
          <Navbar />
          <main className="flex-1 overflow-y-auto">
            <Outlet />
          </main>
        </div>
      </div>
      <Player />
    </div>
  );
};

export default Layout;
