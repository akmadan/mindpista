import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      {/* Promotional Banner */}
      <div className="bg-gradient-to-r from-primary to-primary-glow text-primary-foreground py-3 px-4 text-center font-medium">
        <span className="text-sm md:text-base">
          🎯 Get 40% off for a limited time →
        </span>
      </div>

      {/* Main Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-white/20">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-primary to-accent rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">M</span>
              </div>
              <span className="text-2xl font-display font-semibold text-foreground">
                Mindpista
              </span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-foreground hover:text-primary transition-colors font-medium">
                For You
              </a>
              <a href="#business" className="text-foreground hover:text-primary transition-colors font-medium">
                For Business
              </a>
              <a href="#providers" className="text-foreground hover:text-primary transition-colors font-medium">
                For Providers
              </a>
              <a href="#plans" className="text-foreground hover:text-primary transition-colors font-medium">
                Our Plans
              </a>
              <a href="#resources" className="text-foreground hover:text-primary transition-colors font-medium">
                Resources
              </a>
              <a href="#about" className="text-foreground hover:text-primary transition-colors font-medium">
                About
              </a>
            </div>

            {/* CTA Buttons */}
            <div className="hidden md:flex items-center space-x-4">
              <Button variant="ghost" className="text-foreground hover:text-primary">
                Help
              </Button>
              <Button className="btn-hero">
                Start Free Trial
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X /> : <Menu />}
            </Button>
          </nav>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden mt-4 py-4 border-t border-border/20">
              <div className="flex flex-col space-y-4">
                <a href="#features" className="text-foreground hover:text-primary transition-colors font-medium">
                  For You
                </a>
                <a href="#business" className="text-foreground hover:text-primary transition-colors font-medium">
                  For Business
                </a>
                <a href="#providers" className="text-foreground hover:text-primary transition-colors font-medium">
                  For Providers
                </a>
                <a href="#plans" className="text-foreground hover:text-primary transition-colors font-medium">
                  Our Plans
                </a>
                <a href="#resources" className="text-foreground hover:text-primary transition-colors font-medium">
                  Resources
                </a>
                <a href="#about" className="text-foreground hover:text-primary transition-colors font-medium">
                  About
                </a>
                <div className="pt-4 space-y-2">
                  <Button variant="ghost" className="w-full justify-start">
                    Help
                  </Button>
                  <Button className="btn-hero w-full">
                    Start Free Trial
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </header>
    </>
  );
};

export default Header;