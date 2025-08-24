import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Plus, TrendingUp, Users, Calendar, ExternalLink } from "lucide-react";

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

const mockInfluencers: Influencer[] = [
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
];

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
  const [influencers, setInfluencers] = useState<Influencer[]>(mockInfluencers);
  const [newInfluencer, setNewInfluencer] = useState("");

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
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/30">
      <div className="container mx-auto p-6 space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-brand-blue to-brand-purple bg-clip-text text-transparent">
              Influencer Monitoring
            </h1>
            <p className="text-muted-foreground mt-1">
              Track and analyze content from key influencers in your niche
            </p>
          </div>
          <Button variant="brand" size="lg">
            <Plus className="h-4 w-4" />
            Add Influencer
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="border-0 shadow-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Influencers</CardTitle>
              <Users className="h-4 w-4 text-brand-blue" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-brand-blue">12</div>
              <p className="text-xs text-muted-foreground">+2 from last week</p>
            </CardContent>
          </Card>
          
          <Card className="border-0 shadow-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Posts Analyzed</CardTitle>
              <TrendingUp className="h-4 w-4 text-brand-purple" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-brand-purple">847</div>
              <p className="text-xs text-muted-foreground">Last 48 hours</p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg Engagement</CardTitle>
              <TrendingUp className="h-4 w-4 text-brand-success" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-brand-success">4.8%</div>
              <p className="text-xs text-muted-foreground">+0.3% from average</p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Next Brief</CardTitle>
              <Calendar className="h-4 w-4 text-brand-warning" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-brand-warning">18h</div>
              <p className="text-xs text-muted-foreground">Tomorrow 9:00 AM</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Influencer List */}
          <Card className="lg:col-span-1 border-0 shadow-card">
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
              <div className="flex gap-2">
                <Input 
                  placeholder="Add influencer handle..."
                  value={newInfluencer}
                  onChange={(e) => setNewInfluencer(e.target.value)}
                />
                <Button size="sm" variant="outline">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="space-y-3">
                {influencers.map((influencer) => (
                  <div key={influencer.id} className="flex items-center gap-3 p-3 rounded-lg bg-gradient-subtle border border-border/50">
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
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Content Feed */}
          <Card className="lg:col-span-2 border-0 shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-brand-purple" />
                Recent Content Analysis
              </CardTitle>
              <CardDescription>
                AI-powered summaries of latest posts and trends
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
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};