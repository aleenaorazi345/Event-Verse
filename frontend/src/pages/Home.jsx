import { Link } from "react-router-dom";
import { Calendar, Ticket, Users, ArrowRight, Sparkles } from "lucide-react";

const Home = () => {
  return (
    <div className="min-h-screen bg-ink-800 text-white font-sans flex flex-col">
      {/* NAVBAR */}
      <nav className="bg-ink-800/80 backdrop-blur-md border-b border-ink-700 px-6 py-4 flex items-center justify-between sticky top-0 z-50">
        <h1 className="text-2xl font-bold neon-text">EventVerse</h1>
        <div className="flex items-center gap-4">
          <Link to="/login" className="text-sm font-medium text-ink-200 hover:text-white transition">
            Sign In
          </Link>
          <Link to="/register" className="btn-primary text-sm py-2 px-5">
            Get Started
          </Link>
        </div>
      </nav>

      {/* HERO SECTION */}
      <main className="flex-1 flex flex-col items-center justify-center text-center px-4 relative overflow-hidden">
        {/* Background Glow */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-pink-500/20 blur-[120px] rounded-full pointer-events-none"></div>

        <div className="relative z-10 max-w-4xl mx-auto py-24">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-500/10 border border-pink-500/30 text-pink-400 text-sm font-medium mb-6">
            <Sparkles size={14} /> The #1 University Event Platform
          </div>
          
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6">
            Discover Your Next <br className="hidden md:block" />
            <span className="neon-text">Campus Experience</span>
          </h1>
          
          <p className="text-lg md:text-xl text-ink-300 mb-10 max-w-2xl mx-auto leading-relaxed">
            EventVerse brings all university events into one place. From hackathons and workshops to sports and societies — find it, register for it, and live it.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/register" className="btn-primary flex items-center justify-center gap-2 w-full sm:w-auto text-lg px-8 py-3">
              Browse Events <ArrowRight size={20} />
            </Link>
            <Link to="/login" className="w-full sm:w-auto px-8 py-3 rounded-lg font-semibold border border-ink-500 hover:border-pink-500/50 hover:bg-ink-700 transition">
              Organizer Login
            </Link>
          </div>
        </div>
      </main>

      {/* FEATURES SECTION */}
      <section className="bg-ink-900 border-t border-ink-700 py-20 px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Everything you need, in one place</h2>
            <p className="text-ink-300">Built for students. Designed for organizers.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="card text-center flex flex-col items-center">
              <div className="w-14 h-14 rounded-full bg-pink-500/10 flex items-center justify-center text-pink-400 mb-6">
                <Calendar size={28} />
              </div>
              <h3 className="text-xl font-bold mb-3">Never Miss Out</h3>
              <p className="text-ink-300 text-sm leading-relaxed">
                Browse all upcoming events, filter by categories, and see exactly what's happening on campus this week.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="card text-center flex flex-col items-center">
              <div className="w-14 h-14 rounded-full bg-pink-500/10 flex items-center justify-center text-pink-400 mb-6">
                <Ticket size={28} />
              </div>
              <h3 className="text-xl font-bold mb-3">Instant Registration</h3>
              <p className="text-ink-300 text-sm leading-relaxed">
                One click to register. Get an automated email ticket sent straight to your inbox.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="card text-center flex flex-col items-center">
              <div className="w-14 h-14 rounded-full bg-pink-500/10 flex items-center justify-center text-pink-400 mb-6">
                <Users size={28} />
              </div>
              <h3 className="text-xl font-bold mb-3">For Organizers</h3>
              <p className="text-ink-300 text-sm leading-relaxed">
                Create events, track registrations in real-time, and manage your attendees with a powerful dashboard.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-ink-900 border-t border-ink-700 py-6 text-center text-ink-400 text-sm">
        <p>© {new Date().getFullYear()} EventVerse. Built for University Students.</p>
      </footer>
    </div>
  );
};

export default Home;