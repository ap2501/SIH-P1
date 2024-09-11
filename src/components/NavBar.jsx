import { NavLink, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';

const NavBar = () => {
  const location = useLocation();
  const [active, setActive] = useState(location.pathname);

  useEffect(() => {
    setActive(location.pathname);
  }, [location.pathname]);

  return (
    <nav className="w-full bg-gray-900/80 backdrop-blur-lg shadow-md fixed top-0 left-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between py-4 px-6">
        <div className="text-3xl font-bold text-white">
          Swachhta Dashboard
        </div>
        <ul className="flex space-x-8 text-lg font-medium">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) => 
                `px-4 py-2 transition duration-300 ease-in-out ${
                  isActive ? "text-white border-b-2 border-yellow-500" : "text-gray-300 hover:text-white"
                }`
              }
            >
              Enter PostOffice ID
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
