import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Play, Heart, Moon, Brain, Sparkles } from "lucide-react";

const ContentLibrary = () => {
  const featuredContent = [
    {
      title: "Meet Sage",
      description: "Get personalized content recommendations with Sage",
      duration: "Always Available",
      badge: "New",
      icon: Sparkles,
      type: "AI Companion"
    },
    {
      title: "Mindful Families Collection",
      description: "Bring your attention to all interactions with your children",
      duration: "15 sessions",
      badge: null,
      icon: Heart,
      type: "Family"
    },
    {
      title: "Stress-Free Workdays",
      description: "Stress-relieving tools for busy professionals",
      duration: "10 min",
      badge: "New",
      icon: Brain,
      type: "Workplace"
    },
    {
      title: "Deep Sleep Journey",
      description: "A complete program for better rest",
      duration: "21 days",
      badge: "Trending",
      icon: Moon,
      type: "Sleep"
    },
    {
      title: "Mental Strength Training",
      description: "Stay present and in control in high-pressure situations",
      duration: "8 sessions",
      badge: "New",
      icon: Brain,
      type: "Performance"
    },
    {
      title: "Confidence Building",
      description: "Bring your best, most confident self to any situation",
      duration: "12 min",
      badge: null,
      icon: Sparkles,
      type: "Personal Growth"
    }
  ];

  const categories = [
    { id: "featured", label: "Featured", icon: Sparkles },
    { id: "popular", label: "Popular", icon: Heart },
    { id: "sleep", label: "Sleep", icon: Moon },
    { id: "stress", label: "Stress Relief", icon: Brain },
    { id: "meditation", label: "Meditation", icon: Play }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-secondary/20 to-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
            Explore our{" "}
            <span className="bg-gradient-to-r from-primary to-accent-foreground bg-clip-text text-transparent">
              wellness library
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Discover 1,000+ guided meditations, expert-led programs, and personalized content 
            designed to support your mental wellness journey.
          </p>
        </div>

        {/* Content Categories */}
        <Tabs defaultValue="featured" className="w-full">
          <TabsList className="grid w-full grid-cols-5 mb-12 bg-white/50 backdrop-blur-sm">
            {categories.map((category) => (
              <TabsTrigger 
                key={category.id} 
                value={category.id}
                className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                <category.icon className="h-4 w-4" />
                <span className="hidden sm:inline">{category.label}</span>
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value="featured" className="space-y-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredContent.map((content, index) => (
                <Card 
                  key={content.title}
                  className="card-float group hover:scale-105 transition-all duration-500 cursor-pointer"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-r from-primary to-accent flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                        <content.icon className="h-6 w-6 text-white" />
                      </div>
                      {content.badge && (
                        <Badge 
                          variant="secondary" 
                          className="bg-primary/10 text-primary border-primary/20"
                        >
                          {content.badge}
                        </Badge>
                      )}
                    </div>
                    <CardTitle className="text-lg font-semibold group-hover:text-primary transition-colors">
                      {content.title}
                    </CardTitle>
                    <p className="text-sm text-muted-foreground">{content.type}</p>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">{content.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-primary">{content.duration}</span>
                      <Button size="sm" variant="ghost" className="group-hover:bg-primary/10">
                        <Play className="h-4 w-4 mr-1" />
                        Start
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Other tab contents would be similar */}
          {categories.slice(1).map((category) => (
            <TabsContent key={category.id} value={category.id} className="space-y-8">
              <div className="text-center py-12">
                <category.icon className="h-16 w-16 mx-auto mb-4 text-primary/50" />
                <h3 className="text-2xl font-semibold mb-2">Coming Soon</h3>
                <p className="text-muted-foreground">
                  Curated {category.label.toLowerCase()} content is being prepared for you.
                </p>
              </div>
            </TabsContent>
          ))}
        </Tabs>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <h3 className="text-2xl font-semibold mb-4">
            Ready to find some mindspace?
          </h3>
          <p className="text-muted-foreground mb-8">
            Start your journey with a personalized wellness experience.
          </p>
          <Button className="btn-hero text-lg px-8 py-4">
            Explore Full Library
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ContentLibrary;
