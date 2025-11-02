import React, { useState, useEffect, useRef, useCallback, memo } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// Constants for better maintainability
const NAV_LINKS = [
  { path: "/", label: "Home" },
  { path: "/posts", label: "Posts" },
];

const AUTH_NAV_LINKS = [{ path: "/dashboard", label: "Dashboard" }];

const SCROLL_THRESHOLD = 10;
const AVATAR_SIZE = 36; // in pixels

/**
 * Header component with navigation, authentication, and responsive design
 * @returns {JSX.Element} The rendered header component
 */
const Header = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const profileMenuRef = useRef(null);

  // Logout and close menu
  const handleLogout = useCallback(() => {
    logout();
    navigate("/");
    setIsProfileMenuOpen(false);
  }, [logout, navigate]);

  // Detect scroll for shadow effect
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > SCROLL_THRESHOLD);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        profileMenuRef.current &&
        !profileMenuRef.current.contains(event.target)
      ) {
        setIsProfileMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
    // Scroll to top when route changes
    window.scrollTo(0, 0);
  }, [location.pathname]);

  // Generate safe avatar URL
  const getAvatarUrl = useCallback(() => {
    if (!user?.name) return null;
    // Sanitize user input for URL
    const sanitizedName = encodeURIComponent(user.name.trim());
    return `https://ui-avatars.com/api/?name=${sanitizedName}&background=random&color=fff&size=${AVATAR_SIZE}`;
  }, [user?.name]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "shadow-lg" : ""
      }`}
    >
      {/* Glassmorphism background */}
      <div
        className={`bg-white/70 dark:bg-gray-900/70 backdrop-blur-lg border-b border-gray-200/50 dark:border-gray-700/50 transition-all duration-300 ${
          scrolled ? "bg-white/85 dark:bg-gray-900/85" : ""
        }`}
      >
        <nav
          className="container mx-auto px-4 sm:px-6 lg:px-8"
          aria-label="Main Navigation"
        >
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link
              to="/"
              className="group relative flex items-center gap-2 text-2xl font-extrabold tracking-tight"
              aria-label="Afghan Blog Home"
            >
              <span className="absolute -inset-1 rounded-lg bg-gradient-to-r from-blue-400 via-cyan-300 to-teal-400 opacity-20 blur-md group-hover:opacity-40 transition-opacity"></span>
              <svg
                className="relative w-8 h-8 text-blue-500 group-hover:text-cyan-400 transition-colors"
                fill="currentColor"
                viewBox="0 0 20 20"
                aria-hidden="true"
              >
                <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
              </svg>
              <span className="relative bg-gradient-to-r from-blue-500 via-cyan-400 to-teal-400 bg-clip-text text-transparent transition-all group-hover:opacity-90">
                Afghan Blog
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {NAV_LINKS.map(({ path, label }) => (
                <NavLink
                  key={path}
                  path={path}
                  label={label}
                  isActive={location.pathname === path}
                />
              ))}

              {/* Authenticated user links */}
              {isAuthenticated && (
                <>
                  {AUTH_NAV_LINKS.map(({ path, label }) => (
                    <NavLink
                      key={path}
                      path={path}
                      label={label}
                      isActive={location.pathname === path}
                    />
                  ))}
                </>
              )}

              {isAuthenticated ? (
                <ProfileDropdown
                  user={user}
                  isOpen={isProfileMenuOpen}
                  onToggle={() => setIsProfileMenuOpen((prev) => !prev)}
                  onLogout={handleLogout}
                  ref={profileMenuRef}
                  avatarUrl={getAvatarUrl()}
                />
              ) : (
                <AuthButtons />
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen((prev) => !prev)}
              className="md:hidden text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 p-2 rounded-lg hover:bg-gray-100/50 dark:hover:bg-gray-800/50 transition"
              aria-label="Toggle mobile menu"
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? (
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </nav>

        {/* Mobile Menu */}
        <MobileMenu
          isOpen={isMenuOpen}
          isAuthenticated={isAuthenticated}
          user={user}
          handleLogout={handleLogout}
        />
      </div>
    </header>
  );
};

/* ---------- Subcomponents ---------- */

const NavLink = memo(({ path, label, isActive }) => (
  <Link
    to={path}
    className={`relative text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-all group py-1 ${
      isActive ? "text-blue-600 dark:text-blue-400" : ""
    }`}
    aria-current={isActive ? "page" : undefined}
  >
    {label}
    <span
      className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-blue-500 to-teal-400 transition-all ${
        isActive ? "w-full" : "w-0 group-hover:w-full"
      }`}
    ></span>
  </Link>
));

const ProfileDropdown = memo(
  React.forwardRef(({ user, isOpen, onToggle, onLogout, avatarUrl }, ref) => {
    // Fallback for missing user data
    const userName = user?.name || "User";
    const userEmail = user?.email || "user@example.com";

    return (
      <div className="relative" ref={ref}>
        <button
          onClick={onToggle}
          className="flex items-center space-x-3 text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-all focus:outline-none rounded-full p-1 hover:bg-gray-100/50 dark:hover:bg-gray-800/50"
          aria-expanded={isOpen}
          aria-haspopup="true"
        >
          {avatarUrl ? (
            <img
              className="h-9 w-9 rounded-full object-cover border-2 border-white shadow-md"
              src={avatarUrl}
              alt={userName}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src =
                  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='36' height='36' viewBox='0 0 24 24' fill='none' stroke='%239CA3AF' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2'%3E%3C/path%3E%3Ccircle cx='12' cy='7' r='4'%3E%3C/circle%3E%3C/svg%3E";
              }}
            />
          ) : (
            <div className="h-9 w-9 rounded-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
            </div>
          )}
          <span className="hidden lg:block font-medium">{userName}</span>
          <svg
            className={`h-4 w-4 transition-transform ${
              isOpen ? "rotate-180" : ""
            }`}
            fill="currentColor"
            viewBox="0 0 20 20"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>

        <div
          className={`absolute right-0 mt-3 w-56 bg-white dark:bg-gray-800 rounded-xl shadow-2xl py-2 transform origin-top-right transition-all ${
            isOpen
              ? "opacity-100 scale-100"
              : "opacity-0 scale-95 pointer-events-none"
          }`}
          role="menu"
        >
          <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-700">
            <p className="text-sm font-medium text-gray-900 dark:text-white">
              {userName}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
              {userEmail}
            </p>
          </div>
          <Link
            to="/profile"
            className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
            onClick={onToggle}
            role="menuitem"
          >
            Your Profile
          </Link>
          <div className="border-t border-gray-100 dark:border-gray-700 my-1"></div>
          <button
            onClick={onLogout}
            className="flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
            role="menuitem"
          >
            Sign out
          </button>
        </div>
      </div>
    );
  })
);

const AuthButtons = memo(() => (
  <div className="flex items-center space-x-4">
    <Link
      to="/login"
      className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition font-medium"
    >
      Login
    </Link>
    <Link
      to="/register"
      className="bg-gradient-to-r from-blue-500 to-teal-400 hover:from-blue-600 hover:to-teal-500 text-white px-5 py-2 rounded-full transition transform hover:scale-105 shadow-md font-medium"
    >
      Register
    </Link>
  </div>
));

const MobileMenu = memo(({ isOpen, isAuthenticated, user, handleLogout }) => (
  <div
    className={`md:hidden transition-all duration-300 ease-in-out ${
      isOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0 overflow-hidden"
    }`}
    aria-hidden={!isOpen}
  >
    <div className="px-2 pt-2 pb-3 space-y-1 bg-white/90 dark:bg-gray-900/90 backdrop-blur-lg shadow-xl rounded-b-2xl mx-2 mb-2">
      {NAV_LINKS.map(({ path, label }) => (
        <Link
          key={path}
          to={path}
          className="block px-4 py-3 rounded-xl text-base font-medium text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
        >
          {label}
        </Link>
      ))}
      {isAuthenticated && (
        <>
          {AUTH_NAV_LINKS.map(({ path, label }) => (
            <Link
              key={path}
              to={path}
              className="block px-4 py-3 rounded-xl text-base font-medium text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
            >
              {label}
            </Link>
          ))}
          <button
            onClick={handleLogout}
            className="flex items-center w-full px-4 py-3 rounded-xl text-base font-medium text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
          >
            Logout
          </button>
        </>
      )}
      {!isAuthenticated && (
        <div className="space-y-2 px-4">
          <Link
            to="/login"
            className="block w-full text-center text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition font-medium py-3 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="block w-full text-center bg-gradient-to-r from-blue-500 to-teal-400 hover:from-blue-600 hover:to-teal-500 text-white px-5 py-3 rounded-full transition transform hover:scale-105 shadow-md font-medium"
          >
            Register
          </Link>
        </div>
      )}
    </div>
  </div>
));

export default Header;
