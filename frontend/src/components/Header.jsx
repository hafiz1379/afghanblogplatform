import React, { useState, useEffect, useRef, useCallback, memo } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const NAV_LINKS = [
  { path: "/", label: "Home" },
  { path: "/about", label: "About" },
  { path: "/posts", label: "Posts" },
];

const AUTH_NAV_LINKS = [{ path: "/dashboard", label: "Dashboard" }];

const SCROLL_THRESHOLD = 10;
const AVATAR_SIZE = 36;

const Header = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const profileMenuRef = useRef(null);

  const handleLogout = useCallback(() => {
    logout();
    navigate("/");
    setIsProfileMenuOpen(false);
  }, [logout, navigate]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > SCROLL_THRESHOLD);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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

  useEffect(() => {
    setIsMenuOpen(false);
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const getAvatarUrl = useCallback(() => {
    if (!user?.name) return null;
    const sanitizedName = encodeURIComponent(user.name.trim());
    return `https://ui-avatars.com/api/?name=${sanitizedName}&background=random&color=fff&size=${AVATAR_SIZE}`;
  }, [user?.name]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out ${
        scrolled ? "bg-white/90 shadow-lg shadow-slate-200/50" : "bg-white/70"
      } backdrop-blur-2xl backdrop-saturate-150 border-b border-slate-200/60`}
    >
      <nav
        className="container mx-auto px-4 sm:px-6 lg:px-8"
        aria-label="Main Navigation"
      >
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link
            to="/"
            className="group relative flex items-center gap-2.5"
            aria-label="Afghan Blog Home"
          >
            <span className="absolute -inset-3 rounded-2xl bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-pink-500/20 opacity-0 blur-xl group-hover:opacity-100 transition-opacity duration-500"></span>

            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-[1.5px] shadow-lg shadow-indigo-500/25 group-hover:shadow-indigo-500/40 transition-shadow duration-300">
              <div className="flex items-center justify-center w-full h-full rounded-[10px] bg-white">
                <svg
                  className="w-5 h-5"
                  fill="url(#logoGradient)"
                  viewBox="0 0 20 20"
                  aria-hidden="true"
                >
                  <defs>
                    <linearGradient
                      id="logoGradient"
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="100%"
                    >
                      <stop offset="0%" stopColor="#6366f1" />
                      <stop offset="50%" stopColor="#a855f7" />
                      <stop offset="100%" stopColor="#ec4899" />
                    </linearGradient>
                  </defs>
                  <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
                </svg>
              </div>
            </div>

            <span className="relative text-xl font-bold tracking-tight bg-gradient-to-r from-slate-900 via-slate-700 to-slate-900 bg-clip-text text-transparent group-hover:from-indigo-600 group-hover:via-purple-600 group-hover:to-pink-600 transition-all duration-300">
              Afghan Blog
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map(({ path, label }) => (
              <NavLink
                key={path}
                path={path}
                label={label}
                isActive={location.pathname === path}
              />
            ))}

            {isAuthenticated &&
              AUTH_NAV_LINKS.map(({ path, label }) => (
                <NavLink
                  key={path}
                  path={path}
                  label={label}
                  isActive={location.pathname === path}
                />
              ))}

            <div className="w-px h-6 bg-slate-200 mx-3"></div>

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
            className="md:hidden relative flex items-center justify-center w-10 h-10 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-all duration-200"
            aria-label="Toggle mobile menu"
            aria-expanded={isMenuOpen}
          >
            <div className="relative w-5 h-5">
              <span
                className={`absolute left-0 block w-5 h-0.5 bg-current transform transition-all duration-300 ease-out ${
                  isMenuOpen ? "top-[9px] rotate-45" : "top-1"
                }`}
              ></span>
              <span
                className={`absolute left-0 top-[9px] block w-5 h-0.5 bg-current transition-all duration-300 ease-out ${
                  isMenuOpen ? "opacity-0 translate-x-2" : "opacity-100"
                }`}
              ></span>
              <span
                className={`absolute left-0 block w-5 h-0.5 bg-current transform transition-all duration-300 ease-out ${
                  isMenuOpen ? "top-[9px] -rotate-45" : "top-[17px]"
                }`}
              ></span>
            </div>
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
    </header>
  );
};

/* ---------- Subcomponents ---------- */

const NavLink = memo(({ path, label, isActive }) => (
  <Link
    to={path}
    className={`relative px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
      isActive
        ? "text-indigo-600 bg-indigo-50"
        : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
    }`}
    aria-current={isActive ? "page" : undefined}
  >
    {label}
    {isActive && (
      <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-indigo-500"></span>
    )}
  </Link>
));

const ProfileDropdown = memo(
  React.forwardRef(({ user, isOpen, onToggle, onLogout, avatarUrl }, ref) => {
    const userName = user?.name || "User";
    const userEmail = user?.email || "user@example.com";
    const userInitial = userName.charAt(0).toUpperCase();

    return (
      <div className="relative" ref={ref}>
        <button
          onClick={onToggle}
          className={`flex items-center gap-3 px-2 py-1.5 rounded-xl transition-all duration-200 ${
            isOpen ? "bg-slate-100" : "hover:bg-slate-100"
          }`}
          aria-expanded={isOpen}
          aria-haspopup="true"
        >
          {avatarUrl ? (
            <img
              className="h-8 w-8 rounded-lg object-cover ring-2 ring-white shadow-sm"
              src={avatarUrl}
              alt={userName}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src =
                  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='36' height='36' viewBox='0 0 24 24' fill='none' stroke='%239CA3AF' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2'%3E%3C/path%3E%3Ccircle cx='12' cy='7' r='4'%3E%3C/circle%3E%3C/svg%3E";
              }}
            />
          ) : (
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center ring-2 ring-white shadow-sm">
              <span className="text-sm font-semibold text-white">
                {userInitial}
              </span>
            </div>
          )}
          <span className="hidden lg:block text-sm font-medium text-slate-700 max-w-[100px] truncate">
            {userName}
          </span>
          <svg
            className={`h-4 w-4 text-slate-400 transition-transform duration-300 ${
              isOpen ? "rotate-180" : ""
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>

        {/* Dropdown Menu */}
        <div
          className={`absolute right-0 mt-2 w-64 origin-top-right transition-all duration-300 ease-out ${
            isOpen
              ? "opacity-100 scale-100 translate-y-0"
              : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
          }`}
          role="menu"
        >
          <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 ring-1 ring-slate-200/50 overflow-hidden">
            {/* User Info */}
            <div className="p-4 bg-gradient-to-br from-slate-50 to-slate-100/50">
              <div className="flex items-center gap-3">
                {avatarUrl ? (
                  <img
                    className="h-11 w-11 rounded-xl object-cover ring-2 ring-white shadow-sm"
                    src={avatarUrl}
                    alt={userName}
                  />
                ) : (
                  <div className="h-11 w-11 rounded-xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center ring-2 ring-white shadow-sm">
                    <span className="text-base font-semibold text-white">
                      {userInitial}
                    </span>
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-slate-900 truncate">
                    {userName}
                  </p>
                  <p className="text-xs text-slate-500 truncate">{userEmail}</p>
                </div>
              </div>
            </div>

            {/* Menu Items */}
            <div className="p-2">
              <Link
                to="/profile"
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors duration-200"
                onClick={onToggle}
                role="menuitem"
              >
                <svg
                  className="w-5 h-5 text-slate-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
                Your Profile
              </Link>

              <div className="my-2 border-t border-slate-100"></div>

              <button
                onClick={onLogout}
                className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm text-rose-600 hover:bg-rose-50 transition-colors duration-200"
                role="menuitem"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  />
                </svg>
                Sign out
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  })
);

const AuthButtons = memo(() => (
  <div className="flex items-center gap-2">
    <Link
      to="/login"
      className="px-4 py-2 rounded-xl text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-all duration-200"
    >
      Sign in
    </Link>
    <Link
      to="/register"
      className="relative group px-5 py-2.5 rounded-xl text-sm font-semibold text-white overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/25 hover:-translate-y-0.5"
    >
      <span className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></span>
      <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></span>
      <span className="relative">Get Started</span>
    </Link>
  </div>
));

const MobileMenu = memo(({ isOpen, isAuthenticated, user, handleLogout }) => {
  const userName = user?.name || "User";
  const userInitial = userName.charAt(0).toUpperCase();

  return (
    <div
      className={`md:hidden transition-all duration-400 ease-out ${
        isOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
      } overflow-hidden`}
      aria-hidden={!isOpen}
    >
      <div className="px-4 py-4 space-y-1 border-t border-slate-200/60 bg-white/50 backdrop-blur-xl">
        {/* User Info (if authenticated) */}
        {isAuthenticated && (
          <div className="flex items-center gap-3 px-3 py-3 mb-3 bg-slate-50 rounded-2xl">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center">
              <span className="text-sm font-semibold text-white">
                {userInitial}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-slate-900 truncate">
                {userName}
              </p>
              <p className="text-xs text-slate-500">Logged in</p>
            </div>
          </div>
        )}

        {/* Navigation Links */}
        {NAV_LINKS.map(({ path, label }) => (
          <Link
            key={path}
            to={path}
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-base font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 active:scale-[0.98] transition-all duration-200"
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
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-base font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 active:scale-[0.98] transition-all duration-200"
              >
                {label}
              </Link>
            ))}

            <Link
              to="/profile"
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-base font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 active:scale-[0.98] transition-all duration-200"
            >
              Your Profile
            </Link>

            <div className="my-2 border-t border-slate-200"></div>

            <button
              onClick={handleLogout}
              className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-base font-medium text-rose-600 hover:bg-rose-50 active:scale-[0.98] transition-all duration-200"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
              </svg>
              Sign out
            </button>
          </>
        )}

        {!isAuthenticated && (
          <div className="pt-3 space-y-2">
            <Link
              to="/login"
              className="flex items-center justify-center w-full px-4 py-3 rounded-xl text-base font-medium text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 active:scale-[0.98] transition-all duration-200"
            >
              Sign in
            </Link>
            <Link
              to="/register"
              className="relative flex items-center justify-center w-full px-4 py-3 rounded-xl text-base font-semibold text-white bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:shadow-lg hover:shadow-indigo-500/25 active:scale-[0.98] transition-all duration-200 overflow-hidden group"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></span>
              <span className="relative">Get Started</span>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
});

export default Header;
