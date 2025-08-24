import { useState } from "react";
import { Hero } from "@/components/Hero";
import { Dashboard } from "@/components/Dashboard";
import { Button } from "@/components/ui/button";
import { BarChart3, Home } from "lucide-react";

const Index = () => {
  const [view, setView] = useState<"hero" | "dashboard">("hero");

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-sm border-b border-border/50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-r from-brand-blue to-brand-purple rounded-lg flex items-center justify-center">
                <BarChart3 className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-brand-blue to-brand-purple bg-clip-text text-transparent">
                VibeTracker
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Button 
                variant={view === "hero" ? "brand" : "ghost"} 
                size="sm"
                onClick={() => setView("hero")}
              >
                <Home className="h-4 w-4" />
                Home
              </Button>
              <Button 
                variant={view === "dashboard" ? "brand" : "ghost"} 
                size="sm"
                onClick={() => setView("dashboard")}
              >
                <BarChart3 className="h-4 w-4" />
                Dashboard
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="pt-20">
        {view === "hero" ? <Hero onNavigateToDashboard={() => setView("dashboard")} /> : <Dashboard />}
      </div>
    </div>
  );
};

export default Index;
