// This is our navbar component that conditionally renders links based on user authentication status and the page context (landing or internal).

import { Link, useNavigate } from 'react-router-dom';
import { getCurrentUser, logout } from '../utils/auth';
import { useEffect, useState } from 'react';

export default function Navbar({ isLanding = false }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();


  useEffect(() => {
    setIsLoggedIn(!!getCurrentUser());
  }, []);

  const handleLogout = () => {
    logout();
    setIsLoggedIn(false);
    navigate('/', { replace: true });
  };

  // Determine text & bg colors based on context
  const textColor = isLanding ? 'text-white' : 'text-gray-800';
  const hoverTextColor = isLanding ? 'hover:text-blue-200' : 'hover:text-blue-600';

  return (
    <header className="w-full p-4">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">
          {isLanding ? (
            <span className="text-white drop-shadow-md">ShopEasy</span>
          ) : (
            <Link to="/products" className={`${textColor} ${hoverTextColor} transition`}>
              ShopEasy
            </Link>

          )}
        </h1>

        <nav>
          <div className="flex items-center space-x-3 sm:space-x-4">
            {isLoggedIn ? (
              <button
                onClick={handleLogout}
                className={`px-3 py-2 text-sm font-medium rounded-md transition ${
                  isLanding
                    ? 'text-white hover:text-pink-200'
                    : 'text-white  bg-red-600'
                }`}
                aria-label="Log out"
              >
                Logout
              </button>
            ) : (
              <>
                
                <Link
                  to="/about"
                  className={`px-3 py-2 text-sm font-medium rounded-md transition ${
                    isLanding
                      ? 'bg-white/20 text-white hover:bg-white/30 backdrop-blur-sm'
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}
                >
                  About Us
                </Link>
              </>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}