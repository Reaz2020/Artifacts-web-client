import { NavLink, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../provider/AuthProvider";
import axios from "axios";



const Navbar = () => {
  const [userDataToShowOnNavbar, setUserDataToShowOnNavbar] = useState(null);
  const { user, signOutUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [isProfileDropdownVisible, setIsProfileDropdownVisible] = useState(false);

  useEffect(() => {
    if (user) {
      setUserDataToShowOnNavbar({
        photo: user.photoURL,
        name: user.displayName,
        email: user.email,
      });
    }
  }, [user]);

  const handleLogout = async () => {
    try {
      await axios.get(`${import.meta.env.VITE_CLIENT_PORT}/logout`, {
        withCredentials: true,
      });
      signOutUser()
      navigate("/login");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <div className="navbar bg-base-100">
      <div className="navbar-start">
        <div className="dropdown">
          <button
            tabIndex={0}
            className="btn btn-ghost lg:hidden"
            aria-label="Menu"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </button>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            <li><a href="#">Item 1</a></li>
            <li tabIndex={0}>
              <a href="#">Parent</a>
              <ul className="p-2">
                <li><a href="#">Submenu 1</a></li>
                <li><a href="#">Submenu 2</a></li>
              </ul>
            </li>
            <li><a href="#">Item 3</a></li>
          </ul>
        </div>
        <h1 className="text-blue-800 text-2xl md:text-4xl font-bold tracking-wide drop-shadow-lg bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 text-transparent bg-clip-text">
          Artifact Atlas
        </h1>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 flex gap-4">
          <NavLink
            to="/all-products"
            className={({ isActive }) =>
              isActive
                ? "btn bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 text-white border-0"
                : "btn bg-blue-200 hover:bg-blue-300 text-black border-0"
            }
          >
            All-Artifacts
          </NavLink>
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "btn bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 text-white border-0"
                : "btn bg-blue-200 hover:bg-blue-300 text-black border-0"
            }
          >
            Home
          </NavLink>
          {user && (
            <NavLink
              to="/add-item"
              className={({ isActive }) =>
                isActive
                  ? "btn bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 text-white border-0"
                  : "btn bg-blue-200 hover:bg-blue-300 text-black border-0"
              }
            >
              Add Artifact
            </NavLink>
          )}
        </ul>
      </div>

      <div className="navbar-end">
        {user ? (
          <div
            className="relative flex items-center"
            onMouseEnter={() => setIsDropdownVisible(true)}
            onMouseLeave={() => setIsDropdownVisible(false)}
          >
            <img
              className="h-10 w-10 border-2 rounded-full bg-slate-400 cursor-pointer"
              src={userDataToShowOnNavbar?.photo}
              alt="User"
            />
            {isDropdownVisible && (
              <div className="absolute top-10 right-0 w-48 bg-white border shadow-lg rounded-md p-2">
                <p className="text-sm font-semibold text-purple-500">{userDataToShowOnNavbar?.name}</p>
                <button
                  className="block w-full px-4 py-2 text-sm text-left text-purple-500 hover:bg-blue-100 rounded-md"
                  onClick={() => setIsProfileDropdownVisible(!isProfileDropdownVisible)}
                >
                  My Profile
                </button>
                {/* Nested Profile Dropdown */}
                {isProfileDropdownVisible && (
                  <div className="mt-2 bg-white border shadow-lg rounded-md w-48">
                    <NavLink
                      to="/my-artifacts"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-100 rounded-md"
                    >
                      My Artifacts
                    </NavLink>
                    <NavLink
                      to="/liked-artifacts"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-100 rounded-md"
                    >
                      Liked Artifacts
                    </NavLink>
                  </div>
                )}
                <button
                  className="btn bg-violet-500 text-white mt-2 w-full"
                  onClick={handleLogout}
                >
                  Log Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="flex gap-2">
            <li className="btn bg-violet-500 text-white">
              <NavLink to="/login">Login</NavLink>
            </li>
            <li className="btn bg-violet-500 text-white">
              <NavLink to="/register">Register</NavLink>
            </li>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
