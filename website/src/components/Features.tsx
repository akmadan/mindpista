import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain, Moon, Shield, MessageCircle, Headphones, Video } from "lucide-react";
import stressIcon from "@/assets/stress-icon.jpg";
import sleepIcon from "@/assets/sleep-icon.jpg";

const Features = () => {
  const features = [
    {
      icon: Video,
      title: "Online Therapy",
      description: "Connect with licensed therapists for personalized mental health support",
      image: null,
      color: "from-primary to-primary-glow"
    },
    {
      icon: Headphones,
      title: "Guided Meditations", 
      description: "1,000+ expertly crafted meditations for every mood and moment",
      image: null,
      color: "from-accent to-accent/80"
    },
    {
      icon: MessageCircle,
      title: "AI Guidance",
      description: "Meet Sage, your empathetic AI companion for personalized recommendations",
      image: null,
      color: "from-secondary-foreground to-secondary-foreground/80"
    },
    {
      icon: Moon,
      title: "Sleep Resources",
      description: "Bedtime stories, soundscapes, and proven techniques for better rest",
      image: sleepIcon,
      color: "from-primary/80 to-accent"
    },
    {
      icon: Brain,
      title: "Expert-Led Programs",
      description: "Science-backed courses designed by mental health professionals",
      image: null,
      color: "from-accent-foreground to-primary"
    },
    {
      icon: Shield,
      title: "Stress Relief",
      description: "Quick exercises and breathing techniques for instant calm",
      image: stressIcon,
      color: "from-secondary-foreground to-accent-foreground"
    }
  ];

  return (
    <section id="features" className="py-20 section-gradient">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
            The mental health app for{" "}
            <span className="bg-gradient-to-r from-primary to-accent-foreground bg-clip-text text-transparent">
              every moment
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            From guided meditations to one-on-one therapy, our comprehensive platform 
            supports your mental wellness journey with tools designed by experts.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card 
              key={feature.title} 
              className="card-float group hover:scale-105 transition-all duration-500"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardHeader className="text-center pb-4">
                <div className="relative mx-auto mb-4">
                  {feature.image ? (
                    <div className="w-16 h-16 rounded-2xl overflow-hidden mx-auto mb-4">
                      <img 
                        src={feature.image} 
                        alt={feature.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ) : (
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${feature.color} flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      <feature.icon className="h-8 w-8 text-white" />
                    </div>
                  )}
                </div>
                <CardTitle className="text-xl font-semibold">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center text-muted-foreground">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;