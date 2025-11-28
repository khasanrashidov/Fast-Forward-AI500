import Hero from "@/components/Hero";
import ProblemSolution from "@/components/ProblemSolution";
import Team from "@/components/Team";
import WhyUs from "@/components/WhyUs";
import Roadmap from "@/components/Roadmap";
import Methodology from "@/components/Methodology";

export default function Home() {
  return (
    <main className="min-h-screen bg-white selection:bg-emerald-100 selection:text-emerald-900">
      <Hero />
      <ProblemSolution />
      <WhyUs />
      <Roadmap />
      <Methodology />
      <Team />

      <footer className="py-8 text-center text-gray-500 text-sm bg-gray-50 border-t border-gray-100">
        <p>© 2025 Moliyachi. Built for Agrobank AI500 Hackathon.</p>
      </footer>
    </main>
  );
}
