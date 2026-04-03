
"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Menu, X, Database } from "lucide-react";

const tools = [
  { name: "Code Fixer", href: "/dashboard/code-fixer" },
  { name: "Smart Summarizer", href: "/dashboard/summarizer" },
  { name: "JSON Formatter", href: "/dashboard/json-tool" },
  { name: "Image Optimizer", href: "/dashboard/image-tool" },
  { name: "API Tester", href: "/dashboard/api-tester" },
  // { name: "Image Generator", href: "/dashboard/image-generator" },
  // { name: "PDF to DOCX", href: "/dashboard/pdf-to-docx" },
  { name: "Humanizer Content", href: "/dashboard/humanizeContex" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const closeMenu = () => setIsOpen(false);  

  return (
    <nav className="fixed w-full z-50 top-0 left-0 border-b border-white/10 bg-black/60 backdrop-blur-md">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        {/* Logo */}
        <Link href="/" className="flex items-center" onClick={closeMenu}>
          <div className="p-2 rounded-lg">
            <img src="/favicons.ico" alt="DevCortex Logo" className="w-6 h-6" />
          </div>
          <span className="text-2xl font-bold text-white tracking-tight">
            DevCortex<span className="text-indigo-500">.ai</span>
          </span>
        </Link>

        {/* Mobile Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="inline-flex items-center justify-center p-2 w-10 h-10 text-gray-400 rounded-lg md:hidden hover:bg-gray-800"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Menu */}
        <div className={`${isOpen ? "block" : "hidden"} w-full md:block md:w-auto`}>
          <ul className="flex flex-col md:flex-row md:space-x-8 items-center p-4 md:p-0 mt-4 md:mt-0 border border-gray-800 md:border-0 rounded-lg">
            <li>
              <Link
                href="/"
                className="block py-2 px-3 text-white hover:text-indigo-400 transition"
                onClick={closeMenu}
              >
                Home
              </Link>
            </li>

            {/* AI Tools Dropdown - Desktop */}
            <li className="relative group md:block hidden">
              <Link
                href="/dashboard"
                className="block py-2 px-3 text-gray-300 hover:text-indigo-400 transition"
              >
                AI Tools
              </Link>

              {/* Tools Dropdown */}
              <div className="absolute top-full left-0 mt-2 w-64 bg-black/90 backdrop-blur-md border border-gray-800 rounded-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <div className="p-4 grid grid-cols-2 gap-2">
                  {tools.map((tool) => (
                    <Link
                      key={tool.name}
                      href={tool.href}
                      className="block w-full px-3 py-2 rounded-lg bg-white/5 hover:bg-indigo-500/20 text-sm text-white text-left transition"
                    >
                      {tool.name}
                    </Link>
                  ))}
                </div>
              </div>
            </li>

            <li>
              <a
                href="#statssection"
                className="block py-2 px-3 text-gray-300 hover:text-indigo-400 transition"
                onClick={closeMenu}
              >
                Stats
              </a>
            </li>

            {/* Button */}
            <li>
              <Link href="/dashboard" onClick={closeMenu}>
                <button className="mt-2 md:mt-0 relative inline-flex items-center justify-center p-0.5 overflow-hidden text-sm font-medium text-white rounded-full bg-gradient-to-br from-purple-600 to-blue-500 hover:scale-105 transition">
                  <span className="px-5 py-2 bg-black rounded-full">
                    Get Started
                  </span>
                </button>
              </Link>
            </li>
          </ul>

          {/* AI Tools - Mobile Only */}
          <div
            className={`${
              isOpen ? "block mt-4" : "hidden"
            } md:hidden border-t border-gray-800 pt-4`}
          >
            <Link href="/dashboard" className="block w-full" onClick={closeMenu}>
              <div className="flex items-center space-x-3 p-4 bg-indigo-500/20 border border-indigo-500/30 rounded-xl mb-4 hover:bg-indigo-500/30 transition">
                <div className="p-2 bg-indigo-600 rounded-xl">
                  <Database className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-white font-semibold">AI Tools Dashboard</h3>
                  <p className="text-gray-400 text-sm">Access all tools</p>
                </div>
              </div>
            </Link>

            <h3 className="text-white font-semibold mb-2 px-2">Quick Tools</h3>
            <div className="max-h-72 overflow-y-auto pr-1 grid grid-cols-1 gap-3">
              {tools.map((tool) => (
                <Link
                  key={tool.name}
                  href={tool.href}
                  className="block w-full px-4 py-3 bg-gray-800/50 hover:bg-indigo-500/20 rounded-lg text-white font-medium text-sm transition"
                  onClick={closeMenu}
                >
                  {tool.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
