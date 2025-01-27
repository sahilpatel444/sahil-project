
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import logo from "../assets/image/logo.png";
import { MdDarkMode } from "react-icons/md";
// import { MdOutlineDarkMode } from "react-icons/md";
import { FaSun } from "react-icons/fa";

import React, { useContext } from "react";
import { InputContext } from "../Context/inputContext";
import ProfileLogo from "../assets/image/ProfileLogo.png";
import { Link } from "react-router-dom";

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

 
  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to log out?");
    if (confirmLogout) {
      setUser(null); // Clear user state
      localStorage.removeItem("user"); // Remove user data from localStorage
    }
  };
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
          <div className="searchBar">
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
          
          </div>

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
// import React, { useContext, useState } from "react";
// import { Link } from "react-router-dom";
// import { InputContext } from "../Context/inputContext";
// import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
// import { HiMenu, HiX } from "react-icons/hi";
// import { MdDarkMode } from "react-icons/md";
// import { FaSun } from "react-icons/fa";
// import logo from "../assets/image/logo.png";
// import ProfileLogo from "../assets/image/ProfileLogo.png";

// const Header = () => {
//   const {
//     theme,
//     toggleTheme,
//     handleInput,
//     search,
//     handleKeyPress,
//     user,
//     setUser,
//   } = useContext(InputContext);

//   const [menuOpen, setMenuOpen] = useState(false);

//   const handleLogout = () => {
//     const confirmLogout = window.confirm("Are you sure you want to log out?");
//     if (confirmLogout) {
//       setUser(null);
//       localStorage.removeItem("user");
//     }
//   };

//   return (
//     <header className="bg-slate-800 text-white shadow-md">
//       <div className="container mx-auto flex justify-between items-center px-4 py-3">
//         {/* Logo */}
//         <div className="flex items-center space-x-4">
//           <Link to="/">
//             <img src={logo} alt="Logo" className="h-8 w-auto" />
//           </Link>

//           {/* Mobile Menu Toggle */}
//           <button
//             onClick={() => setMenuOpen(!menuOpen)}
//             className="md:hidden text-2xl"
//           >
//             {menuOpen ? <HiX /> : <HiMenu />}
//           </button>
//         </div>

//         {/* Navigation Links */}
//         <nav
//           className={`${
//             menuOpen ? "block" : "hidden"
//           } md:flex space-x-6 absolute md:static top-16 left-0 w-full bg-slate-800 md:bg-transparent md:w-auto md:top-auto md:left-auto`}
//         >
//           <Link to="/" className="block px-4 py-2 md:px-0 md:py-0 hover:text-blue-400">
//             Home
//           </Link>
//           <Link to="/news" className="block px-4 py-2 md:px-0 md:py-0 hover:text-blue-400">
//             News App
//           </Link>
//           <Link to="/weather" className="block px-4 py-2 md:px-0 md:py-0 hover:text-blue-400">
//             Weather App
//           </Link>
//           <Link to="/notes" className="block px-4 py-2 md:px-0 md:py-0 hover:text-blue-400">
//             Note App
//           </Link>
//           <Link to="/movie" className="block px-4 py-2 md:px-0 md:py-0 hover:text-blue-400">
//             Movie Search
//           </Link>
//           <Link to="/downloader" className="block px-4 py-2 md:px-0 md:py-0 hover:text-blue-400">
//             Instagram Reel Download
//           </Link>
//         </nav>

//         {/* Right Section */}
//         <div className="flex items-center space-x-4">
//           {/* Search Bar */}
//           <input
//             type="text"
//             placeholder="Search News"
//             className="hidden md:block px-3 py-2 rounded-md bg-gray-700 text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-blue-500"
//             value={search}
//             onChange={handleInput}
//             onKeyDown={handleKeyPress}
//           />

//           {/* Theme Toggle */}
//           <button
//             onClick={toggleTheme}
//             className="p-2 rounded-full bg-gray-700 hover:text-yellow-400"
//           >
//             {theme === "dark" ? <MdDarkMode size={24} /> : <FaSun size={24} />}
//           </button>

//           {/* Profile */}
//           <Menu as="div" className="relative">
//             <MenuButton className="relative flex rounded-full bg-gray-800 text-sm">
//               <img
//                 src={user ? user.picture : ProfileLogo}
//                 alt="Profile"
//                 className="h-8 w-8 rounded-full"
//               />
//             </MenuButton>
//             <MenuItems className="absolute right-0 mt-2 w-48 bg-white text-black rounded-md shadow-lg">
//               <MenuItem>
//                 <Link
//                   to="/login"
//                   className="block px-4 py-2 hover:bg-gray-200"
//                 >
//                   {user ? `Welcome, ${user.name}` : "Guest User"}
//                 </Link>
//               </MenuItem>
//               {user && (
//                 <MenuItem>
//                   <button
//                     onClick={handleLogout}
//                     className="w-full text-left px-4 py-2 hover:bg-gray-200"
//                   >
//                     Logout
//                   </button>
//                 </MenuItem>
//               )}
//             </MenuItems>
//           </Menu>
//         </div>
//       </div>
//     </header>
//   );
// };

// export default Header;

