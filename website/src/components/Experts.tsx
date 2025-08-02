import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const Experts = () => {
  const experts = [
    {
      name: "Dr. Sarah Chen",
      title: "Board-Certified Psychiatrist and Medical Director",
      specialty: "Anxiety & Depression"
    },
    {
      name: "Michael Rodriguez",
      title: "Meditation and Mindfulness Teacher, Director of Practice",
      specialty: "Mindfulness"
    },
    {
      name: "Dr. Aisha Patel",
      title: "Licensed Clinical Psychologist",
      specialty: "Trauma Therapy"
    },
    {
      name: "Jordan Kim",
      title: "Meditation and Mindfulness Teacher",
      specialty: "Sleep & Stress"
    },
    {
      name: "Dr. Emma Thompson",
      title: "Licensed Marriage and Family Therapist",
      specialty: "Relationships"
    },
    {
      name: "Carlos Mendoza",
      title: "Board-Certified Psychiatrist and Mental Health Advocate",
      specialty: "Addiction Recovery"
    },
    {
      name: "Dr. Priya Sharma",
      title: "Meditation and Mindfulness Teacher",
      specialty: "Corporate Wellness"
    },
    {
      name: "Alex Rivera",
      title: "Certified Mental Health Coach",
      specialty: "Life Transitions"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-secondary/20 to-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
            Designed by experts,{" "}
            <span className="bg-gradient-to-r from-primary to-accent-foreground bg-clip-text text-transparent">
              delivered with care
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            From guided meditations to one-on-one coaching, our team of clinical experts 
            and trained coaches work together to bring you science-backed care.
          </p>
        </div>

        {/* Scrolling Expert Cards */}
        <div className="relative overflow-hidden">
          <div className="flex space-x-6" style={{ 
            animation: 'expertScroll 30s linear infinite',
            width: 'max-content'
          }}>
            {[...experts, ...experts].map((expert, index) => (
              <Card 
                key={`${expert.name}-${index}`}
                className="card-float min-w-[300px] hover:scale-105 transition-all duration-300"
              >
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-primary to-accent rounded-full mx-auto mb-4 flex items-center justify-center">
                    <span className="text-white font-bold text-xl">
                      {expert.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{expert.name}</h3>
                  <p className="text-sm text-muted-foreground mb-3">{expert.title}</p>
                  <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                    {expert.specialty}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experts;