import React from "react";
import {
  FiHome,
  FiDisc,
  FiUsers,
  FiClock,
  FiHeart,
  FiPlus,
  FiSettings,
  FiActivity,
  FiList,
} from "react-icons/fi";
import { NavLink } from "react-router-dom";
import BrandLogo from "../assets/brand-logo2.png";

export const Sidebar = () => {
  const menuSections = [
    {
      title: "Menu",
      links: [
        { name: "Home", icon: <FiHome />, to: "/" },
        { name: "Albums", icon: <FiDisc />, to: "/albums" },
        { name: "Artists", icon: <FiUsers />, to: "/artists" },
      ],
    },
    {
      title: "Library",
      links: [
        { name: "Recently Added", icon: <FiClock />, to: "/recently-added" },
        { name: "Most Played", icon: <FiActivity />, to: "/most-played" },
      ],
    },
    {
      title: "Playlist and favorites",
      links: [
        { name: "Your Playlist", icon: <FiList />, to: "/your-playlists" },
        { name: "Your favorites", icon: <FiHeart />, to: "/your-favorites" },
        { name: "Add Playlist", icon: <FiPlus />, to: "/add-playlist" },
      ],
    },
    {
      title: "General",
      links: [{ name: "Settings", icon: <FiSettings />, to: "/settings" }],
    },
  ];

  return (
    <aside className="sidebar w-64 bg-surface h-screen text-text-secondary p-4 flex flex-col border-r  border-brand-light/30 overflow-y-auto ">
      <div className="app-logo mb-3 p-2 ">
        <img src={BrandLogo} alt="Ain Music" />
      </div>
      <div className="menu-section flex flex-col space-y-5">
        {menuSections.map((section, sIndex) => (
          <div key={sIndex}>
            <p className="text-xs font-semibold text-brand-light/60 uppercase tracking-widest mb-1 px-1">
              {section.title}
            </p>
            <ul className="space-y-1">
              {section.links.map((link, lIndex) => (
                <li key={lIndex}>
                  <NavLink
                    to={link.to}
                    end={link.to === "/"}
                    className={({ isActive }) =>
                      `flex items-center px-3 py-1.5 cursor-pointer transition-all duration-300 rounded-xl font-medium ${
                        isActive
                          ? "text-white bg-brand-primary shadow-lg shadow-brand-primary/30"
                          : "text-text-secondary hover:text-text-primary hover:bg-brand-light/30"
                      }`
                    }
                  >
                    <span className="mr-3 text-lg">{link.icon}</span>
                    {link.name}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </aside>
  );
};
