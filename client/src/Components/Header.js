
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import logo from "../assets/image/logo.png";
import { MdDarkMode } from "react-icons/md";
// import { MdOutlineDarkMode } from "react-icons/md";
import { FaSun } from "react-icons/fa";

import React, { useContext, useEffect, useState } from "react";
import { InputContext } from "../Context/inputContext";
import ProfileLogo from "../assets/image/ProfileLogo.png";
import { Link, useLocation } from "react-router-dom";
import {  HiSearch } from "react-icons/hi";

import { ChevronDownIcon } from "@heroicons/react/20/solid";

// import './Header.css'

const Header = () => {
  const {
    theme,
    toggleTheme,
    handleInput,
    search,
    handleKeyPress,
    user,
    setUser,
  } = useContext(InputContext);
  const [searchOpen, setSearchOpen] = useState(false); // Track search input visibility
 const location = useLocation() // To track the current route

 
  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to log out?");
    if (confirmLogout) {
      setUser(null); // Clear user state
      localStorage.removeItem("user"); // Remove user data from localStorage
    }
    
  };
  useEffect(() => {
    // Hide the search bar when the location changes (navigating to another page)
    setSearchOpen(false);
  }, [location]);


  return (
    <>
      <div className="relative flex h-16 justify-between items-center px-4 bg-slate-800 ">
        {/* Left Section: Logo and Navigation */}
        <div className="flex items-center space-x-4 ">
          {/* Logo */}
          <div className="topNavbar"><Link to="/">
            <img alt="Your Company" src={logo}  className="hidden md:block h-8 w-auto" />
          </Link>
          </div>

          {/* Navigation Links */}
        
          <Menu as="div" className="relative inline-block text-left ">
            <div>
              <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-gray-800 px-3 py-2 text-sm font-semibold text-white shadow-sm ring-1 ring-inset ring-gray-500 hover:bg-gray-900">
                Projects
                <ChevronDownIcon aria-hidden="true" className="-mr-1 size-5 " />
              </MenuButton>
            </div>

            <MenuItems
              transition
              className="absolute left-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
            >
              <div className="py-1">
                <MenuItem>
                  <Link
                    to="/"
                    className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 data-[focus]:outline-none"
                  >
                    Home
                  </Link>
                </MenuItem>
                <MenuItem>
                  <Link
                    to="/news"
                    className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 data-[focus]:outline-none"
                  >
                    News App
                  </Link>
                </MenuItem>
                <MenuItem>
                  <Link
                    to="/weather"
                    className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 data-[focus]:outline-none"
                  >
                    Weather App
                  </Link>
                </MenuItem>
                <MenuItem>
                  <Link
                    to="/notes"
                    className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 data-[focus]:outline-none"
                  >
                    Note App
                  </Link>
                </MenuItem>
                <MenuItem>
                  <Link
                    to="/movie"
                    className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 data-[focus]:outline-none"
                  >
                    Movie Search
                  </Link>
                </MenuItem>
                <MenuItem>
                  <Link
                    to="/downloader"
                    className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 data-[focus]:outline-none"
                  >
                    Instagram Reel Download
                  </Link>
                </MenuItem>
              </div>
            </MenuItems>
          </Menu>
        </div>

        {/* Right Section: Search Bar, Theme Icon, Profile */}
        <div className="flex items-center space-x-4">
          {/* Search Bar */}
          {/* <div className="searchBar">
            <input
              className={theme}
              
              type="text"
              placeholder="Search News"
              onChange={handleInput}
              value={search}
              onKeyDown={handleKeyPress}
              style={{
                padding: "8px",
                borderRadius: "4px",
                border: "1px solid #ccc",
                outline: "none",
                minWidth: "150px",
                // minHeight: "5px",
              }}
              // className="w-40 sm:w-64 rounded-md border border-gray-300 bg-gray-700 text-gray-200 px-3 py-1 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          
          </div> */}
          <button
            onClick={() => setSearchOpen(!searchOpen)} // Toggle the search input field
            className="p-2 rounded-full bg-gray-700 text-white hover:text-yellow-400 focus:outline-none"
          >
            <HiSearch size={24} />
          </button>
            {/* Conditional Search Input */}
            {searchOpen && (
            <input
              type="text"
              placeholder="Search News"
              className="px-3 py-2 rounded-md bg-gray-700 text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-blue-500"
              value={search}
              onChange={handleInput}
              onKeyDown={handleKeyPress}
            />
          )}

          {/* Theme Toggle */}
          <button
            type="button"
            className="p-2 rounded-full bg-gray-800 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white"
            onClick={toggleTheme}
          >
            {theme === "dark" ? <MdDarkMode size={24} /> : <FaSun size={24} />}
          </button>

          {/* Profile Dropdown */}
          <Menu as="div" className="relative">
            <MenuButton className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white">
              {!user ? (
                <img
                  src={ProfileLogo}
                  alt="Profile"
                  className="h-8 w-8 rounded-full "
                />
              ) : (
                <img
                  src={user?.picture}
                  alt="Profile"
                  className="h-8 w-8 rounded-full"
                />
              )}
              {/* <img
             
                src={user?.picture}
                alt="Profile"
                className="h-8 w-8 rounded-full"
              /> */}
            </MenuButton>
            <MenuItems className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5 focus:outline-none">
              <MenuItem>
                <Link
                  to="/login"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  {!user ? <> Guest User </> : <> Welcome, {user?.name}</>}
                </Link>
              </MenuItem>

              <MenuItem>
                <Link to="/login"
                
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  {!user ? <>Login</> : <></>}
                </Link>
              </MenuItem>
              <MenuItem>
                <Link
                  onClick={handleLogout}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  {!user ? <></> : <>Log Out</>}
                </Link>
              </MenuItem>
             
            </MenuItems>
          </Menu>
        </div>
      </div>
    </>
  );
};

export default Header;