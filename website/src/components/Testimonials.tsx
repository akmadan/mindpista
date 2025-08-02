import { Card, CardContent } from "@/components/ui/card";
import { Star, Quote } from "lucide-react";

const Testimonials = () => {
  const testimonials = [
    {
      quote: "I appreciate the consistent reminders to be kind and patient with myself as I learn and practice daily habits that are helping me find a calmer daily space.",
      category: "Member on forming more helpful habits",
      rating: 5
    },
    {
      quote: "Mindpista helped me begin the process of stepping back from toxic thinking and being a part of something bigger than my own personal grievances.",
      category: "Member on learning to think in more helpful ways",
      rating: 5
    },
    {
      quote: "The strategies in the courses allow me to work on a part of myself that I am struggling with. Mindpista changed the relationship I have with myself.",
      category: "Member on working through their feelings",
      rating: 5
    }
  ];

  const stats = [
    { number: "4.8", label: "App Store Rating", icon: "⭐" },
    { number: "47M+", label: "Downloads", icon: "📱" },
    { number: "203M+", label: "Minutes Meditated", icon: "🧘" },
    { number: "298K+", label: "Active Members", icon: "👥" }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-background to-secondary/30">
      <div className="container mx-auto px-4">
        
        {/* Stats Section */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-12">
            Join the millions who use{" "}
            <span className="bg-gradient-to-r from-primary to-accent-foreground bg-clip-text text-transparent">
              Mindpista
            </span>{" "}
            every day
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div 
                key={stat.label}
                className="text-center animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="text-4xl mb-2">{stat.icon}</div>
                <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                  {stat.number}
                </div>
                <div className="text-muted-foreground font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonials Section */}
        <div className="text-center mb-12">
          <h3 className="text-3xl md:text-4xl font-display font-bold mb-6">
            Members are enjoying{" "}
            <span className="bg-gradient-to-r from-primary to-accent-foreground bg-clip-text text-transparent">
              happier and healthier
            </span>{" "}
            lives
          </h3>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card 
              key={index}
              className="card-float hover:scale-105 transition-all duration-500"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <CardContent className="p-8">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-primary text-primary" />
                  ))}
                </div>
                
                <Quote className="h-8 w-8 text-primary/30 mb-4" />
                
                <blockquote className="text-foreground mb-6 leading-relaxed">
                  "{testimonial.quote}"
                </blockquote>
                
                <cite className="text-sm text-muted-foreground italic">
                  — {testimonial.category}
                </cite>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Corporate Clients */}
        <div className="mt-20 text-center">
          <h3 className="text-2xl font-semibold mb-8 text-muted-foreground">
            Over 4,000 leading organizations choose Mindpista
          </h3>
          <p className="text-lg text-muted-foreground mb-8">
            Support your team today with mindfulness, coaching, therapy, and mental health resources.
          </p>
          
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
            {[
              "TechCorp", "HealthPlus", "FinanceFirst", "EduLearn", 
              "RetailMax", "StartupLab", "ConsultPro", "MediaFlow",
              "BuildCo", "DataDriven", "CloudNext", "InnovateNow"
            ].map((company, index) => (
              <div 
                key={company}
                className="text-xl font-semibold text-muted-foreground hover:text-primary transition-colors cursor-pointer"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {company}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;