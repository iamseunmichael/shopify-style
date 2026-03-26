import Navbar from "@/components/landingPageUI/Nav";
import Hero from "@/components/landingPageUI/Hero"

export default function Home() {

  return (
    <main className="antialiased selection:bg-green-300">
      <Navbar />
      <Hero />
      {/* Add secondary content sections here */}
    </main>
  );
}
