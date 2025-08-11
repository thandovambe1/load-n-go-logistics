import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";

// Adjusted to relative imports — update paths if your files are elsewhere
import { Toaster } from "./components/ui/toaster";
import { TooltipProvider } from "./components/ui/tooltip";
import { useAuth } from "./hooks/useAuth";

import NotFound from "./pages/not-found";
import Landing from "./pages/Landing.jsx";
import Home from "./pages/home";
import DriverDashboard from "./pages/driver-dashboard";
import DriverRegistration from "./pages/driver-registration";
import VehicleManagement from "./pages/vehicle-management";

function Router() {
  const { isAuthenticated, isLoading, user } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-orange"></div>
      </div>
    );
  }

  return (
    <Switch>
      {!isAuthenticated ? (
        <Route path="/" component={Landing} />
      ) : (
        <>
          {user?.role === "driver" ? (
            <>
              <Route path="/" component={DriverDashboard} />
              <Route path="/vehicle-management" component={VehicleManagement} />
            </>
          ) : (
            <Route path="/" component={Home} />
          )}
          <Route path="/driver-registration" component={DriverRegistration} />
        </>
      )}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
