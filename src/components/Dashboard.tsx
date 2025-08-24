import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Plus, TrendingUp, Users, Calendar, ExternalLink, Edit2, Trash2, Bot, Sparkles } from "lucide-react";

interface Influencer {
  id: string;
  name: string;
  handle: string;
  platform: string;
  followers: string;
  avatar: string;
  lastPost: string;
  engagement: string;
}

interface ContentSummary {
  id: string;
  influencer: string;
  platform: string;
  summary: string;
  sentiment: "positive" | "neutral" | "negative";
  timestamp: string;
  link: string;
}

const mockContentSummaries: ContentSummary[] = [
  {
    id: "1",
    influencer: "Sarah Chen",
    platform: "LinkedIn",
    summary: "Discussed the latest AI marketing trends and their impact on brand strategy. Emphasized the importance of authentic storytelling in the digital age.",
    sentiment: "positive",
    timestamp: "2 hours ago",
    link: "#"
  },
  {
    id: "2", 
    influencer: "Tech Insider",
    platform: "Instagram",
    summary: "Shared insights about emerging social commerce features. Highlighted how brands are leveraging new Instagram shopping tools.",
    sentiment: "neutral",
    timestamp: "5 hours ago",
    link: "#"
  },
  {
    id: "3",
    influencer: "Digital Trends",
    platform: "YouTube",
    summary: "Reviewed the latest brand collaborations in the tech space. Provided analysis on successful influencer partnership strategies.",
    sentiment: "positive",
    timestamp: "1 day ago",
    link: "#"
  }
];

export const Dashboard = () => {
  const { toast } = useToast();
  const [influencers, setInfluencers] = useState<Influencer[]>([
    {
      id: "1",
      name: "Sarah Chen",
      handle: "@sarahchen",
      platform: "LinkedIn",
      followers: "125K",
      avatar: "/placeholder.svg",
      lastPost: "2 hours ago",
      engagement: "4.2%"
    },
    {
      id: "2",
      name: "Tech Insider",
      handle: "@techinsider",
      platform: "Instagram",
      followers: "2.1M",
      avatar: "/placeholder.svg",
      lastPost: "5 hours ago",
      engagement: "6.8%"
    },
    {
      id: "3",
      name: "Digital Trends",
      handle: "@digitaltrends",
      platform: "YouTube",
      followers: "890K",
      avatar: "/placeholder.svg",
      lastPost: "1 day ago",
      engagement: "3.1%"
    }
  ]);

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingInfluencer, setEditingInfluencer] = useState<Influencer | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  
  const [newInfluencer, setNewInfluencer] = useState({
    name: "",
    handle: "",
    platform: "",
    followers: "",
    engagement: ""
  });

  const resetForm = () => {
    setNewInfluencer({
      name: "",
      handle: "",
      platform: "",
      followers: "",
      engagement: ""
    });
  };

  const handleAddInfluencer = () => {
    if (!newInfluencer.name || !newInfluencer.handle || !newInfluencer.platform) {
      toast({
        title: "Missing Information",
        description: "Please fill in name, handle, and platform.",
        variant: "destructive"
      });
      return;
    }

    const influencer: Influencer = {
      id: Date.now().toString(),
      name: newInfluencer.name,
      handle: newInfluencer.handle.startsWith('@') ? newInfluencer.handle : `@${newInfluencer.handle}`,
      platform: newInfluencer.platform,
      followers: newInfluencer.followers || "0",
      avatar: "/placeholder.svg",
      lastPost: "Just added",
      engagement: newInfluencer.engagement || "0%"
    };

    setInfluencers(prev => [...prev, influencer]);
    setIsAddDialogOpen(false);
    resetForm();
    
    toast({
      title: "✨ Influencer Added",
      description: `${influencer.name} is now being monitored by our AI agent.`
    });

    // Simulate AI analysis
    setTimeout(() => {
      toast({
        title: "🤖 AI Analysis Complete",
        description: `Started monitoring ${influencer.handle} across ${influencer.platform}.`
      });
    }, 2000);
  };

  const handleEditInfluencer = () => {
    if (!editingInfluencer || !newInfluencer.name || !newInfluencer.handle || !newInfluencer.platform) {
      toast({
        title: "Missing Information",
        description: "Please fill in name, handle, and platform.",
        variant: "destructive"
      });
      return;
    }

    const updatedInfluencer: Influencer = {
      ...editingInfluencer,
      name: newInfluencer.name,
      handle: newInfluencer.handle.startsWith('@') ? newInfluencer.handle : `@${newInfluencer.handle}`,
      platform: newInfluencer.platform,
      followers: newInfluencer.followers || editingInfluencer.followers,
      engagement: newInfluencer.engagement || editingInfluencer.engagement
    };

    setInfluencers(prev => prev.map(inf => inf.id === editingInfluencer.id ? updatedInfluencer : inf));
    setIsEditDialogOpen(false);
    setEditingInfluencer(null);
    resetForm();
    
    toast({
      title: "✅ Influencer Updated",
      description: `${updatedInfluencer.name} profile has been updated.`
    });
  };

  const handleDeleteInfluencer = (id: string) => {
    const influencer = influencers.find(inf => inf.id === id);
    setInfluencers(prev => prev.filter(inf => inf.id !== id));
    
    toast({
      title: "🗑️ Influencer Removed",
      description: `${influencer?.name} is no longer being monitored.`
    });
  };

  const openEditDialog = (influencer: Influencer) => {
    setEditingInfluencer(influencer);
    setNewInfluencer({
      name: influencer.name,
      handle: influencer.handle,
      platform: influencer.platform,
      followers: influencer.followers,
      engagement: influencer.engagement
    });
    setIsEditDialogOpen(true);
  };

  const runAIAnalysis = () => {
    setIsAnalyzing(true);
    toast({
      title: "🤖 AI Agent Working",
      description: "Analyzing all influencer content for trends and insights..."
    });

    setTimeout(() => {
      setIsAnalyzing(false);
      toast({
        title: "✨ Analysis Complete",
        description: "New trend insights have been generated. Check your content feed!"
      });
    }, 3000);
  };

  const getSentimentColor = (sentiment: "positive" | "neutral" | "negative") => {
    switch (sentiment) {
      case "positive":
        return "bg-brand-success/10 text-brand-success border-brand-success/20";
      case "negative":
        return "bg-destructive/10 text-destructive border-destructive/20";
      default:
        return "bg-muted text-muted-foreground border-border";
    }
  };

  const getPlatformColor = (platform: string) => {
    switch (platform.toLowerCase()) {
      case "linkedin":
        return "bg-blue-500/10 text-blue-600 border-blue-500/20";
      case "instagram":
        return "bg-pink-500/10 text-pink-600 border-pink-500/20";
      case "youtube":
        return "bg-red-500/10 text-red-600 border-red-500/20";
      default:
        return "bg-muted text-muted-foreground border-border";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <div className="container mx-auto p-6 space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-brand-blue to-brand-purple bg-clip-text text-transparent">
              AI Influencer Monitor
            </h1>
            <p className="text-muted-foreground mt-1">
              Advanced AI agent tracking {influencers.length} influencers across platforms
            </p>
          </div>
          <div className="flex gap-3">
            <Button 
              variant="outline" 
              size="lg"
              onClick={runAIAnalysis}
              disabled={isAnalyzing}
            >
              {isAnalyzing ? (
                <>
                  <Sparkles className="h-4 w-4 animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Bot className="h-4 w-4" />
                  Run AI Analysis
                </>
              )}
            </Button>
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="brand" size="lg">
                  <Plus className="h-4 w-4" />
                  Add Influencer
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Influencer</DialogTitle>
                  <DialogDescription>
                    Add a new influencer to monitor with our AI agent.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">Name</Label>
                    <Input
                      id="name"
                      placeholder="Sarah Chen"
                      className="col-span-3"
                      value={newInfluencer.name}
                      onChange={(e) => setNewInfluencer(prev => ({ ...prev, name: e.target.value }))}
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="handle" className="text-right">Handle</Label>
                    <Input
                      id="handle"
                      placeholder="@sarahchen"
                      className="col-span-3"
                      value={newInfluencer.handle}
                      onChange={(e) => setNewInfluencer(prev => ({ ...prev, handle: e.target.value }))}
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="platform" className="text-right">Platform</Label>
                    <Select value={newInfluencer.platform} onValueChange={(value) => setNewInfluencer(prev => ({ ...prev, platform: value }))}>
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Select platform" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="LinkedIn">LinkedIn</SelectItem>
                        <SelectItem value="Instagram">Instagram</SelectItem>
                        <SelectItem value="YouTube">YouTube</SelectItem>
                        <SelectItem value="Twitter">Twitter</SelectItem>
                        <SelectItem value="TikTok">TikTok</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="followers" className="text-right">Followers</Label>
                    <Input
                      id="followers"
                      placeholder="125K"
                      className="col-span-3"
                      value={newInfluencer.followers}
                      onChange={(e) => setNewInfluencer(prev => ({ ...prev, followers: e.target.value }))}
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="engagement" className="text-right">Engagement</Label>
                    <Input
                      id="engagement"
                      placeholder="4.2%"
                      className="col-span-3"
                      value={newInfluencer.engagement}
                      onChange={(e) => setNewInfluencer(prev => ({ ...prev, engagement: e.target.value }))}
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleAddInfluencer}>Add Influencer</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="border-0 shadow-card bg-card/80 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Influencers</CardTitle>
              <Users className="h-4 w-4 text-brand-blue" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-brand-blue">{influencers.length}</div>
              <p className="text-xs text-muted-foreground">+{influencers.length - 3} from initial</p>
            </CardContent>
          </Card>
          
          <Card className="border-0 shadow-card bg-card/80 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Posts Analyzed</CardTitle>
              <TrendingUp className="h-4 w-4 text-brand-purple" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-brand-purple">847</div>
              <p className="text-xs text-muted-foreground">Last 48 hours</p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-card bg-card/80 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg Engagement</CardTitle>
              <TrendingUp className="h-4 w-4 text-brand-success" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-brand-success">4.8%</div>
              <p className="text-xs text-muted-foreground">+0.3% from average</p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-card bg-card/80 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">AI Status</CardTitle>
              <Bot className="h-4 w-4 text-brand-warning" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-brand-warning">Active</div>
              <p className="text-xs text-muted-foreground">Monitoring 24/7</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Influencer List */}
          <Card className="lg:col-span-1 border-0 shadow-card bg-card/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-brand-blue" />
                Tracked Influencers
              </CardTitle>
              <CardDescription>
                Manage your curated list of influencers
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                {influencers.map((influencer) => (
                  <div key={influencer.id} className="flex items-center gap-3 p-3 rounded-lg bg-gradient-subtle border border-border/50 hover:shadow-md transition-all">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={influencer.avatar} />
                      <AvatarFallback>{influencer.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm truncate">{influencer.name}</p>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <span>{influencer.handle}</span>
                        <Badge variant="outline" className={getPlatformColor(influencer.platform)}>
                          {influencer.platform}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-3 text-xs text-muted-foreground mt-1">
                        <span>{influencer.followers} followers</span>
                        <span>{influencer.engagement} eng.</span>
                      </div>
                    </div>
                    <div className="flex flex-col gap-1">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-6 w-6 p-0"
                        onClick={() => openEditDialog(influencer)}
                      >
                        <Edit2 className="h-3 w-3" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-6 w-6 p-0 text-destructive hover:text-destructive"
                        onClick={() => handleDeleteInfluencer(influencer.id)}
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Content Feed */}
          <Card className="lg:col-span-2 border-0 shadow-card bg-card/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bot className="h-5 w-5 text-brand-purple" />
                AI Content Analysis
              </CardTitle>
              <CardDescription>
                Real-time AI-powered insights and trend analysis
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {mockContentSummaries.map((content) => (
                <div key={content.id} className="p-4 rounded-lg bg-gradient-subtle border border-border/50 hover:shadow-md transition-all">
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-sm">{content.influencer}</span>
                      <Badge variant="outline" className={getPlatformColor(content.platform)}>
                        {content.platform}
                      </Badge>
                      <Badge variant="outline" className={getSentimentColor(content.sentiment)}>
                        {content.sentiment}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <span>{content.timestamp}</span>
                      <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                        <ExternalLink className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                  <p className="text-sm text-foreground leading-relaxed">{content.summary}</p>
                  <div className="flex items-center gap-1 mt-2 text-xs text-muted-foreground">
                    <Sparkles className="h-3 w-3" />
                    <span>AI-Generated Summary</span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Edit Dialog */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Influencer</DialogTitle>
              <DialogDescription>
                Update influencer information and monitoring settings.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-name" className="text-right">Name</Label>
                <Input
                  id="edit-name"
                  className="col-span-3"
                  value={newInfluencer.name}
                  onChange={(e) => setNewInfluencer(prev => ({ ...prev, name: e.target.value }))}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-handle" className="text-right">Handle</Label>
                <Input
                  id="edit-handle"
                  className="col-span-3"
                  value={newInfluencer.handle}
                  onChange={(e) => setNewInfluencer(prev => ({ ...prev, handle: e.target.value }))}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-platform" className="text-right">Platform</Label>
                <Select value={newInfluencer.platform} onValueChange={(value) => setNewInfluencer(prev => ({ ...prev, platform: value }))}>
                  <SelectTrigger className="col-span-3">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="LinkedIn">LinkedIn</SelectItem>
                    <SelectItem value="Instagram">Instagram</SelectItem>
                    <SelectItem value="YouTube">YouTube</SelectItem>
                    <SelectItem value="Twitter">Twitter</SelectItem>
                    <SelectItem value="TikTok">TikTok</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-followers" className="text-right">Followers</Label>
                <Input
                  id="edit-followers"
                  className="col-span-3"
                  value={newInfluencer.followers}
                  onChange={(e) => setNewInfluencer(prev => ({ ...prev, followers: e.target.value }))}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-engagement" className="text-right">Engagement</Label>
                <Input
                  id="edit-engagement"
                  className="col-span-3"
                  value={newInfluencer.engagement}
                  onChange={(e) => setNewInfluencer(prev => ({ ...prev, engagement: e.target.value }))}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => {
                setIsEditDialogOpen(false);
                setEditingInfluencer(null);
                resetForm();
              }}>
                Cancel
              </Button>
              <Button onClick={handleEditInfluencer}>Save Changes</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};