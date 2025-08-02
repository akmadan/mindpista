import { Button } from "@/components/ui/button";
import heroMeditation from "@/assets/hero-meditation.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-secondary/20 to-accent/10"></div>
      
      {/* Floating Background Shapes */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-primary/10 rounded-full blur-3xl float-animation"></div>
      <div className="absolute bottom-20 right-10 w-48 h-48 bg-accent/15 rounded-full blur-3xl float-animation-delayed"></div>
      <div className="absolute top-1/3 right-1/4 w-24 h-24 bg-secondary/20 rounded-full blur-2xl float-animation"></div>

      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Content */}
          <div className="text-center lg:text-left space-y-8 animate-fade-in-up">
            <div className="space-y-6">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-bold leading-tight">
                <span className="text-glow">40% off</span> a year of{" "}
                <span className="bg-gradient-to-r from-primary via-accent-foreground to-primary bg-clip-text text-transparent">
                  Mindpista
                </span>
              </h1>
              
              <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed max-w-2xl mx-auto lg:mx-0">
                Transform your mindset with guided meditations, stress-relief techniques, 
                sleep resources, and personalized wellness journeys.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button className="btn-hero text-lg px-8 py-4">
                Start Your Journey
              </Button>
              <Button className="btn-secondary text-lg px-8 py-4">
                Try Free for 14 Days
              </Button>
            </div>

            {/* Quick Categories */}
            <div className="pt-8">
              <p className="text-muted-foreground mb-4 font-medium">
                What kind of mindspace are you looking for?
              </p>
              <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
                {[
                  "Stress Less",
                  "Sleep Soundly", 
                  "Manage Anxiety",
                  "Process Thoughts",
                  "Practice Meditation",
                  "Start Therapy"
                ].map((category) => (
                  <Button
                    key={category}
                    variant="outline"
                    className="rounded-full bg-white/60 backdrop-blur-sm border-primary/20 hover:bg-primary/10 transition-all duration-300"
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative animate-scale-in">
            <div className="relative">
              <img
                src={heroMeditation}
                alt="Peaceful meditation scene"
                className="w-full max-w-lg mx-auto rounded-3xl shadow-strong"
              />
              
              {/* Floating Stats */}
              <div className="absolute -top-6 -left-6 card-float p-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">47M+</div>
                  <div className="text-sm text-muted-foreground">Downloads</div>
                </div>
              </div>
              
              <div className="absolute -bottom-6 -right-6 card-float p-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">298K+</div>
                  <div className="text-sm text-muted-foreground">Meditating</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;