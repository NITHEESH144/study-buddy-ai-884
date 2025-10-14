import { Button } from "@/components/ui/button";
import { Brain, FileText, Sparkles, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-bg.jpg";

const Landing = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden px-6 py-20 md:py-32" style={{ background: "var(--gradient-hero)" }}>
        <div className="absolute inset-0 opacity-10">
          <img src={heroImage} alt="" className="h-full w-full object-cover" />
        </div>
        <div className="container relative mx-auto max-w-6xl text-center">
          <h1 className="mb-6 text-5xl font-bold text-primary-foreground md:text-7xl">
            Study Smarter, Not Harder
          </h1>
          <p className="mb-10 text-xl text-primary-foreground/90 md:text-2xl">
            AI-powered insights from your notes and question papers to help you ace your exams
          </p>
          <Link to="/auth">
            <Button size="lg" variant="secondary" className="text-lg px-8 py-6 shadow-lg hover:shadow-xl transition-all">
              Get Started Free
            </Button>
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="px-6 py-20 bg-background">
        <div className="container mx-auto max-w-6xl">
          <h2 className="mb-16 text-center text-4xl font-bold">How It Works</h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <FeatureCard
              icon={<FileText className="h-10 w-10" />}
              title="Upload Notes"
              description="Upload your study materials and previous question papers"
            />
            <FeatureCard
              icon={<Brain className="h-10 w-10" />}
              title="AI Analysis"
              description="Our AI extracts key topics and creates summaries"
            />
            <FeatureCard
              icon={<Sparkles className="h-10 w-10" />}
              title="Smart Insights"
              description="Get suggested questions and answers for practice"
            />
            <FeatureCard
              icon={<TrendingUp className="h-10 w-10" />}
              title="Study Better"
              description="Focus on high-priority topics to maximize results"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

const FeatureCard = ({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) => (
  <div className="rounded-xl border bg-card p-6 text-center transition-all hover:shadow-lg" style={{ boxShadow: "var(--shadow-soft)" }}>
    <div className="mb-4 inline-flex rounded-full bg-primary/10 p-4 text-primary">{icon}</div>
    <h3 className="mb-2 text-xl font-semibold">{title}</h3>
    <p className="text-muted-foreground">{description}</p>
  </div>
);

export default Landing;
