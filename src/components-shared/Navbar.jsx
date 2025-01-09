import { NavLink, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../provider/AuthProvider";
import axios from "axios";
import Swal from "sweetalert2";
import { title } from "framer-motion/client";
import { useLocation } from "react-router-dom"; 

const Navbar = () => {
  const location = useLocation();
  const [userDataToShowOnNavbar, setUserDataToShowOnNavbar] = useState(null);
  const { user, signOutUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [isProfileDropdownVisible, setIsProfileDropdownVisible] = useState(false);
  const [title, setTitle] = useState('Home');


  //this effect change the title based on path name 
  useEffect(() => {
    const pathname = location.pathname;
    switch (pathname) {
        case '/all-products':
            setTitle('All The artifacts');
            break;
        case '/add-item':
            setTitle('Add An Artifact here');
            break;
        case '/my-artifacts':
            setTitle('Artifacts you have added ');
            break;
        case '/liked-artifacts':
            setTitle('Artifacts You have liked');
            break;
        default:
            setTitle('Welcome to Artifact Atlas');
    }
}, [location.pathname]);


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
    Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out of your account.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, log me out!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.get(`${import.meta.env.VITE_CLIENT_PORT}/logout`, {
            withCredentials: true,
          });
          signOutUser();
          navigate("/login");
          Swal.fire("Logged Out!", "You have been logged out.", "success");
        } catch (error) {
          console.error("Error logging out:", error);
          Swal.fire("Error!", "Failed to log out. Please try again.", "error");
        }
      }
    });
  };

  return (
   

    <div> 

      {/* <h1 className="text-center shadow-lg text-purple-400">{title}</h1> */}
      
    <div className="navbar bg-black rounded-lg ">
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
          <NavLink to="/" className="block px-4 py-2 hover:bg-gray-200 rounded">
            Home
          </NavLink>
          <NavLink
            to="/all-products"
            className="block px-4 py-2 hover:bg-gray-200 rounded"
          >
            All Artifacts
          </NavLink>
          {user && (
            <>
              <NavLink
                to="/add-item"
                className="block px-4 py-2 hover:bg-gray-200 rounded"
              >
                Add Artifact
              </NavLink>
              <NavLink
                to="/my-artifacts"
                className="block px-4 py-2 hover:bg-gray-200 rounded"
              >
                My Artifacts
              </NavLink>
              <NavLink
                to="/liked-artifacts"
                className="block px-4 py-2 hover:bg-gray-200 rounded"
              >
                Liked Artifacts
              </NavLink>
            </>
          )}
        </ul>
      </div>
      <h1 className="text-blue-800 text-2xl md:text-4xl font-bold tracking-wide drop-shadow-lg bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 text-transparent bg-clip-text">
      <div className="flex justify-center items-center"> <img className="w-8 h-8 rounded-full" src="https://i.ibb.co/wrQYNvh/logo.png" alt="" />  Artifact Atlas </div>
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
  <>
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
    <NavLink
      to="/my-artifacts"
      className={({ isActive }) =>
        isActive
          ? "btn bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 text-white border-0"
          : "btn bg-blue-200 hover:bg-blue-300 text-black border-0"
      }
    >
      My Artifacts
    </NavLink>
    <NavLink
      to="/liked-artifacts"
      className={({ isActive }) =>
        isActive
          ? "btn bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 text-white border-0"
          : "btn bg-blue-200 hover:bg-blue-300 text-black border-0"
      }
    >
      Liked Artifacts
    </NavLink>
  </>
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
          {/* <li className="btn bg-violet-500 text-white">
            <NavLink to="/register">Register</NavLink>
          </li> */}
        </div>
      )}
    </div>
  </div>
 
  <h1 className="text-center shadow-lg text-purple-600 text-2xl font-serif ">{title}</h1>
  </div>



  );
};

export default Navbar;



