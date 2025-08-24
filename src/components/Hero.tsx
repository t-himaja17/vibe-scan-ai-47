import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { TrendingUp, Users, Zap, BarChart3, Clock, Shield, Play, Sparkles, CheckCircle } from "lucide-react";
import heroImage from "@/assets/hero-dashboard.jpg";

interface HeroProps {
  onNavigateToDashboard: () => void;
}

export const Hero = ({ onNavigateToDashboard }: HeroProps) => {
  const { toast } = useToast();
  const [isTrialDialogOpen, setIsTrialDialogOpen] = useState(false);
  const [isDemoPlaying, setIsDemoPlaying] = useState(false);

  const handleStartMonitoring = () => {
    toast({
      title: "🚀 Welcome to VibeTracker!",
      description: "Redirecting you to the dashboard to start monitoring influencers..."
    });
    
    setTimeout(() => {
      onNavigateToDashboard();
    }, 1500);
  };

  const handleViewDemo = () => {
    setIsDemoPlaying(true);
    toast({
      title: "🎬 Demo Starting",
      description: "Watch how our AI monitors influencers in real-time"
    });

    setTimeout(() => {
      setIsDemoPlaying(false);
      toast({
        title: "✨ Demo Complete",
        description: "Ready to start monitoring? Click 'Start Monitoring' to begin!"
      });
    }, 3000);
  };

  const handleStartTrial = () => {
    setIsTrialDialogOpen(true);
  };

  const handleTrialSignup = () => {
    setIsTrialDialogOpen(false);
    toast({
      title: "🎉 Trial Activated!",
      description: "Your 14-day free trial has started. Redirecting to dashboard..."
    });
    
    setTimeout(() => {
      onNavigateToDashboard();
    }, 2000);
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/30 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,hsl(var(--brand-blue)/0.1),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,hsl(var(--brand-purple)/0.1),transparent_50%)]" />
      
      <div className="container mx-auto px-6 py-12 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4 bg-white/80 backdrop-blur-sm border-brand-blue/20">
            <Zap className="h-3 w-3 mr-1 text-brand-blue" />
            AI-Powered Monitoring
          </Badge>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-brand-blue via-brand-purple to-brand-blue bg-clip-text text-transparent leading-tight">
            Influencer
            <br />
            Intelligence
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Track what influencers and competitors are saying about your niche. 
            Get AI-powered insights delivered every 48 hours.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <Button 
              variant="brand" 
              size="lg" 
              className="text-lg px-8 py-6"
              onClick={handleStartMonitoring}
            >
              <Sparkles className="h-5 w-5 mr-2" />
              Start Monitoring
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="text-lg px-8 py-6"
              onClick={handleViewDemo}
              disabled={isDemoPlaying}
            >
              {isDemoPlaying ? (
                <>
                  <div className="animate-spin h-5 w-5 mr-2 border-2 border-current border-t-transparent rounded-full" />
                  Playing Demo...
                </>
              ) : (
                <>
                  <Play className="h-5 w-5 mr-2" />
                  View Demo
                </>
              )}
            </Button>
          </div>
        </div>

        {/* Hero Dashboard Preview */}
        <div className="relative max-w-6xl mx-auto mb-16">
          <div className="absolute inset-0 bg-gradient-to-r from-brand-blue/20 to-brand-purple/20 rounded-2xl blur-3xl scale-105" />
          <Card className={`relative border-0 shadow-2xl bg-white/95 backdrop-blur-sm overflow-hidden transition-all duration-500 ${isDemoPlaying ? 'scale-105 shadow-glow' : ''}`}>
            <CardContent className="p-0 relative">
              <img 
                src={heroImage} 
                alt="Influencer monitoring dashboard"
                className={`w-full h-auto rounded-lg transition-all duration-500 ${isDemoPlaying ? 'brightness-110' : ''}`}
              />
              {isDemoPlaying && (
                <div className="absolute inset-0 bg-gradient-to-r from-brand-blue/30 to-brand-purple/30 flex items-center justify-center">
                  <div className="bg-white/90 backdrop-blur-sm rounded-lg p-6 text-center">
                    <div className="animate-spin h-8 w-8 mx-auto mb-2 border-2 border-brand-blue border-t-transparent rounded-full" />
                    <p className="text-sm font-medium">AI Analyzing Content...</p>
                  </div>
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <div className="flex flex-wrap gap-3">
                  <Badge className="bg-white/20 backdrop-blur-sm text-white border-white/30 hover:bg-white/30 transition-all cursor-pointer"
                         onClick={() => toast({ title: "📊 Real-time Analytics", description: "847 posts analyzed in the last 48 hours" })}>
                    <TrendingUp className="h-3 w-3 mr-1" />
                    847 Posts Analyzed
                  </Badge>
                  <Badge className="bg-white/20 backdrop-blur-sm text-white border-white/30 hover:bg-white/30 transition-all cursor-pointer"
                         onClick={() => toast({ title: "👥 Influencer Network", description: "12 top influencers actively monitored" })}>
                    <Users className="h-3 w-3 mr-1" />
                    12 Influencers Tracked
                  </Badge>
                  <Badge className="bg-white/20 backdrop-blur-sm text-white border-white/30 hover:bg-white/30 transition-all cursor-pointer"
                         onClick={() => toast({ title: "⚡ Live Updates", description: "Content analyzed within minutes of posting" })}>
                    <Clock className="h-3 w-3 mr-1" />
                    Real-time Updates
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <Card className="border-0 shadow-card bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300 group cursor-pointer"
                onClick={() => toast({ title: "🤖 AI Content Analysis", description: "Our advanced AI processes thousands of posts daily to identify trends and sentiment patterns." })}>
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-brand-blue to-brand-purple rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">AI Content Analysis</h3>
              <p className="text-muted-foreground">
                Advanced AI summarizes posts, identifies trends, and tracks sentiment across all platforms.
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-card bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300 group cursor-pointer"
                onClick={() => toast({ title: "📈 Trend Intelligence", description: "Predictive analytics help you stay ahead of viral content and emerging topics." })}>
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-brand-purple to-brand-blue rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <BarChart3 className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Trend Intelligence</h3>
              <p className="text-muted-foreground">
                Identify emerging trends in your niche before they go mainstream with predictive analytics.
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-card bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300 group cursor-pointer"
                onClick={() => toast({ title: "📧 Automated Briefs", description: "Comprehensive reports delivered every 48 hours with actionable insights." })}>
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-gradient-to-r from-brand-blue to-brand-purple rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Automated Briefs</h3>
              <p className="text-muted-foreground">
                Receive comprehensive trend reports every 48 hours, delivered straight to your inbox.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16 p-8 rounded-2xl bg-gradient-to-r from-brand-blue/10 to-brand-purple/10 border border-brand-blue/20">
          <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-brand-blue to-brand-purple bg-clip-text text-transparent">
            Ready to stay ahead of the trends?
          </h2>
          <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
            Join leading brands who trust our AI to monitor their competitive landscape and discover new opportunities.
          </p>
          <Button 
            variant="brand" 
            size="lg" 
            className="text-lg px-8 py-6"
            onClick={handleStartTrial}
          >
            <Zap className="h-5 w-5 mr-2" />
            Start Your Free Trial
          </Button>
        </div>

        {/* Trial Signup Dialog */}
        <Dialog open={isTrialDialogOpen} onOpenChange={setIsTrialDialogOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="text-center">Start Your 14-Day Free Trial</DialogTitle>
              <DialogDescription className="text-center">
                Get full access to VibeTracker's AI-powered influencer monitoring
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm">
                  <CheckCircle className="h-4 w-4 text-brand-success" />
                  <span>Monitor unlimited influencers</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <CheckCircle className="h-4 w-4 text-brand-success" />
                  <span>AI-powered content analysis</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <CheckCircle className="h-4 w-4 text-brand-success" />
                  <span>48-hour trend reports</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <CheckCircle className="h-4 w-4 text-brand-success" />
                  <span>Real-time notifications</span>
                </div>
              </div>
              <div className="flex gap-3">
                <Button variant="outline" className="flex-1" onClick={() => setIsTrialDialogOpen(false)}>
                  Maybe Later
                </Button>
                <Button variant="brand" className="flex-1" onClick={handleTrialSignup}>
                  <Sparkles className="h-4 w-4 mr-2" />
                  Activate Trial
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};