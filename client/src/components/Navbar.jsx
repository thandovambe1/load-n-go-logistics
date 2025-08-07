import { useAuth } from "@/hooks/useAuth"
import { Button } from "@/components/ui/button"
import { Link } from "wouter"
import { Menu, User, LogOut } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function Navigation() {
  const { user, isAuthenticated, isLoading } = useAuth()

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Link href="/">
                <h1 className="text-2xl font-bold text-navy cursor-pointer" data-testid="logo-load-n-go">
                  Load N Go
                </h1>
              </Link>
            </div>
          </div>
          
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
                        onClick={() => window.location.href = '/api/login'}
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
                          {user?.role === 'driver' ? 'Drive & Earn' : 'Send Package'}
                        </Button>
                      </Link>
                      
                      {user?.role === 'driver' && (
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
                      
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button 
                            variant="ghost" 
                            className="flex items-center space-x-2"
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
                              <User className="h-5 w-5" />
                            )}
                            <span className="text-gray-custom">
                              {user?.firstName || 'User'}
                            </span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem 
                            onClick={() => window.location.href = '/api/logout'}
                            data-testid="button-logout"
                          >
                            <LogOut className="mr-2 h-4 w-4" />
                            Sign Out
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </>
                  )}
                </>
              )}
            </div>
          </div>
          
          <div className="md:hidden">
            <Button variant="ghost" size="sm" data-testid="button-mobile-menu">
              <Menu className="h-5 w-5 text-gray-custom" />
            </Button>
          </div>
        </div>
      </div>
    </nav>
  )
}
