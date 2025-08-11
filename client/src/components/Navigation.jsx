// client/src/components/Navigation.jsx
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Menu, User, LogOut } from "lucide-react";


export default function Navigation() {
  const { user, isAuthenticated, isLoading } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  // simple handlers
  const goToLogin = () => (window.location.href = "/api/login");
  const goToLogout = () => (window.location.href = "/api/logout");

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Left: Logo */}
          <div className="flex items-center">
            <Link href="/">
              <h1
                className="text-2xl font-bold text-navy cursor-pointer"
                data-testid="logo-load-n-go"
              >
                Load N Go
              </h1>
            </Link>
          </div>

          {/* Desktop nav */}
          <div className="hidden md:block">
            <div className="flex items-center space-x-4">
              {!isLoading && (
                <>
                  {!isAuthenticated ? (
                    <>
                      <Link href="/">
                        <Button
                          variant="ghost"
                          className="text-gray-custom hover:text-navy"
                          data-testid="nav-home"
                        >
                          Home
                        </Button>
                      </Link>

                      <Button
                        className="bg-orange text-white hover:bg-orange-600"
                        onClick={goToLogin}
                        data-testid="button-sign-in"
                      >
                        Sign In
                      </Button>
                    </>
                  ) : (
                    <>
                      <Link href="/">
                        <Button
                          variant="ghost"
                          className="text-gray-custom hover:text-navy"
                          data-testid="nav-dashboard"
                        >
                          {user?.role === "driver" ? "Drive & Earn" : "Send Package"}
                        </Button>
                      </Link>

                      {user?.role === "driver" && (
                        <Link href="/vehicle-management">
                          <Button
                            variant="ghost"
                            className="text-gray-custom hover:text-navy"
                            data-testid="nav-vehicle-management"
                          >
                            Vehicle Management
                          </Button>
                        </Link>
                      )}

                      {/* Inline user menu (no external Dropdown component required) */}
                      <div className="relative" onBlur={() => setUserMenuOpen(false)}>
                        <button
                          className="flex items-center space-x-2 bg-transparent border-none focus:outline-none"
                          onClick={() => setUserMenuOpen((s) => !s)}
                          aria-haspopup="true"
                          aria-expanded={userMenuOpen}
                          data-testid="button-user-menu"
                        >
                          {user?.profileImageUrl ? (
                            <img
                              src={user.profileImageUrl}
                              alt="Profile"
                              className="w-6 h-6 rounded-full object-cover"
                              data-testid="img-nav-profile"
                            />
                          ) : (
                            <User className="h-5 w-5 text-gray-custom" />
                          )}
                          <span className="text-gray-custom ml-2">{user?.firstName || "User"}</span>
                        </button>

                        {userMenuOpen && (
                          <div
                            className="absolute right-0 mt-2 w-44 bg-white border rounded-md shadow-lg py-1 z-40"
                            role="menu"
                            aria-label="User menu"
                          >
                            <Link href="/profile">
                              <a className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">
                                Profile
                              </a>
                            </Link>

                            <button
                              onClick={goToLogout}
                              className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
                              role="menuitem"
                              data-testid="button-logout"
                            >
                              <LogOut className="h-4 w-4" /> Sign Out
                            </button>
                          </div>
                        )}
                      </div>
                    </>
                  )}
                </>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <Button
              variant="ghost"
              size="sm"
              data-testid="button-mobile-menu"
              onClick={() => setMobileOpen((s) => !s)}
            >
              <Menu className="h-5 w-5 text-gray-custom" />
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu panel */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-gray-100">
          <div className="px-4 pt-3 pb-4 space-y-1">
            {!isLoading && !isAuthenticated && (
              <>
                <Link href="/">
                  <a className="block px-2 py-2 rounded hover:bg-gray-100">Home</a>
                </Link>
                <button
                  onClick={goToLogin}
                  className="w-full text-left px-2 py-2 rounded hover:bg-gray-100"
                >
                  Sign In
                </button>
              </>
            )}

            {!isLoading && isAuthenticated && (
              <>
                <Link href="/">
                  <a className="block px-2 py-2 rounded hover:bg-gray-100">
                    {user?.role === "driver" ? "Drive & Earn" : "Send Package"}
                  </a>
                </Link>

                {user?.role === "driver" && (
                  <Link href="/vehicle-management">
                    <a className="block px-2 py-2 rounded hover:bg-gray-100">Vehicle Management</a>
                  </Link>
                )}

                <Link href="/profile">
                  <a className="block px-2 py-2 rounded hover:bg-gray-100">Profile</a>
                </Link>

                <button
                  onClick={goToLogout}
                  className="w-full text-left px-2 py-2 rounded hover:bg-gray-100 flex items-center gap-2"
                >
                  <LogOut className="h-4 w-4" /> Sign Out
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
