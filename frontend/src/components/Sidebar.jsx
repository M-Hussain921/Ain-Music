import React from "react";
import {
  FiHome,
  FiDisc,
  FiUsers,
  FiHeart,
  FiList,
} from "react-icons/fi";
import { NavLink } from "react-router-dom";
import BrandLogo from "../assets/brand-logo.png";
import { useClickOutside } from "../hooks/useClickOutside.js";
import { useRef } from "react";

export const Sidebar = ({ isOpen, onClose, setSidebarOpen }) => {
  const sidebarRef = useRef(null);
  useClickOutside(sidebarRef, onClose, isOpen);

  const menuSections = [
    {
      links: [
        { name: "Home", icon: <FiHome />, to: "/" },
        { name: "Albums", icon: <FiDisc />, to: "/albums" },
        { name: "Artists", icon: <FiUsers />, to: "/artists" },
        { name: "My Playlist", icon: <FiList />, to: "/your-playlists" },
        { name: "My Favorites", icon: <FiHeart />, to: "/your-favorites" },
      ],
    },
  ];

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 z-[900] lg:hidden" />
      )}

      <aside
        ref={sidebarRef}
        className={`w-44 sm:w-60 bg-surface h-screen h-dvh text-text-secondary p-2.5 sm:p-4 flex flex-col border-r border-brand-light/30 overflow-y-auto 
          fixed top-0 left-0 z-[1001] transition-transform duration-300
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          md:static md:translate-x-0 md:z-auto`}
      >
        <div className="mb-3 p-2">
          <img src={BrandLogo} alt="Ain Music" className="w-55 sm:w-full h-auto mx-auto" />
        </div>
        <div className="flex flex-col space-y-3 sm:space-y-5">
          {menuSections.map((section, sIndex) => (
            <div key={sIndex}>
              <ul className="space-y-1">
                {section.links.map((link, lIndex) => (
                  <li key={lIndex}>
                    <NavLink
                      to={link.to}
                      end={link.to === "/"}
                      onClick={onClose}
                      className={({ isActive }) =>
                        `flex items-center px-2.5 sm:px-3 py-1 sm:py-1.5 text-xs sm:text-sm md:text-base truncate cursor-pointer transition-all duration-300 rounded-xl font-medium ${
                          isActive
                            ? "text-white "
                            : "text-text-secondary hover:text-text-primary "
                        }`
                      }
                    >
                      <span className="mr-2 sm:mr-3 text-base sm:text-lg">{link.icon}</span>
                      {link.name}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </aside>
    </>
  );
};
