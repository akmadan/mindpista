import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ = () => {
  const faqs = [
    {
      question: "What is Mindpista?",
      answer: "Mindpista is a comprehensive mental wellness platform offering guided meditations, therapy sessions, sleep resources, stress-relief tools, and AI-powered personalized recommendations to support your mental health journey."
    },
    {
      question: "What is Mindpista's mission?",
      answer: "Our mission is to make mental wellness accessible, affordable, and effective for everyone. We believe that mental health support should be available whenever and wherever you need it, backed by science and delivered with care."
    },
    {
      question: "How do I download the Mindpista app?",
      answer: "You can download Mindpista from the App Store for iOS devices or Google Play Store for Android devices. Simply search for 'Mindpista' and look for our distinctive logo with the peaceful gradient design."
    },
    {
      question: "What is included in a Mindpista subscription?",
      answer: "Your subscription includes unlimited access to 1,000+ guided meditations, expert-led programs, sleep resources, stress-relief exercises, AI companion Sage, one-on-one therapy sessions (with eligible plans), and personalized wellness recommendations."
    },
    {
      question: "How much does Mindpista cost?",
      answer: "We offer flexible pricing plans starting at $9.99/month or $69.99/year. Students get 50% off, and we offer family plans for up to 6 members. Corporate and enterprise plans are also available for organizations."
    },
    {
      question: "Does my Mindpista subscription automatically renew?",
      answer: "Yes, subscriptions automatically renew unless you cancel at least 24 hours before the end of your current billing period. You can manage your subscription and turn off auto-renewal in your account settings or app store account."
    },
    {
      question: "How do I cancel my Mindpista subscription?",
      answer: "You can cancel your subscription anytime through your account settings in the app, or through your Apple App Store or Google Play Store account settings. Your access will continue until the end of your current billing period."
    },
    {
      question: "How can I support my team's mental health at work?",
      answer: "Mindpista for Business offers comprehensive mental health support including team meditation sessions, stress management workshops, one-on-one therapy access, mental health coaching, and detailed analytics to help you create a mentally healthy workplace."
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-background to-secondary/20">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
            Frequently asked{" "}
            <span className="bg-gradient-to-r from-primary to-accent-foreground bg-clip-text text-transparent">
              questions
            </span>
          </h2>
          <p className="text-xl text-muted-foreground">
            Everything you need to know about Mindpista and how it can support your wellness journey.
          </p>
        </div>

        <Accordion type="single" collapsible className="w-full space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem 
              key={index} 
              value={`item-${index}`}
              className="card-float px-6 border-none"
            >
              <AccordionTrigger className="text-left text-lg font-semibold hover:text-primary transition-colors hover:no-underline">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed pt-2">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-6">
            Still have questions? We're here to help.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="btn-secondary">
              Contact Support
            </button>
            <button className="btn-secondary">
              View Help Center
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;