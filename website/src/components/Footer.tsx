import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

const Footer = () => {
  const footerSections = [
    {
      title: "Get some Mindspace",
      links: [
        "Try 14-days free",
        "Our plans",
        "Mental health coaching",
        "Family plan",
        "Student Plan", 
        "For educators",
        "For teens",
        "Send a gift",
        "Redeem a code",
        "Share Mindpista"
      ]
    },
    {
      title: "For Business",
      links: [
        "Mindpista for business",
        "Administrator portal login",
        "Enterprise solutions",
        "Team wellness programs"
      ]
    },
    {
      title: "Our Content",
      links: [
        "Meditation app",
        "Meditation articles",
        "Beginning meditation",
        "Quick meditations",
        "Meditation courses",
        "Sleep app",
        "Sleep articles",
        "Sleep music",
        "White noise",
        "Mindfulness app",
        "Mental health support"
      ]
    },
    {
      title: "About Us",
      links: [
        "About Mindpista",
        "About the app",
        "Leadership",
        "Press",
        "Careers",
        "Sitemap"
      ]
    },
    {
      title: "Support",
      links: [
        "Help",
        "Contact us", 
        "Mental health resources",
        "Accessibility Statement",
        "Security",
        "Cookie policy"
      ]
    }
  ];

  return (
    <footer className="bg-gradient-to-b from-secondary/30 to-secondary/50 pt-20 pb-8">
      <div className="container mx-auto px-4">
        
        {/* Newsletter Section */}
        <div className="text-center mb-16">
          <div className="max-w-2xl mx-auto card-float p-8">
            <h3 className="text-2xl font-display font-semibold mb-4">
              Stay in the loop
            </h3>
            <p className="text-muted-foreground mb-6">
              Be the first to get updates on our latest content, special offers, and new features.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <Input 
                type="email" 
                placeholder="Email address"
                className="flex-1 bg-white/80 border-primary/20"
              />
              <Button className="btn-hero">
                Get some Mindspace
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-4">
              By signing up, you're agreeing to receive marketing emails from Mindpista. 
              You can unsubscribe at any time. For more details, check out our Privacy Policy.
            </p>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {footerSections.map((section) => (
            <div key={section.title}>
              <h4 className="font-semibold text-foreground mb-4">
                {section.title}
              </h4>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link}>
                    <a 
                      href="#" 
                      className="text-muted-foreground hover:text-primary transition-colors text-sm"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <Separator className="my-8 bg-border/50" />

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-primary to-accent rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">M</span>
            </div>
            <span className="text-xl font-display font-semibold">Mindpista</span>
          </div>

          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <span>© 2025 Mindpista Inc.</span>
            <a href="#" className="hover:text-primary transition-colors">Terms & conditions</a>
            <a href="#" className="hover:text-primary transition-colors">Privacy policy</a>
            <a href="#" className="hover:text-primary transition-colors">Consumer Health Data</a>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Get the app:</span>
              <Button variant="outline" size="sm" className="bg-white/60">
                📱 iOS
              </Button>
              <Button variant="outline" size="sm" className="bg-white/60">
                📱 Android
              </Button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;