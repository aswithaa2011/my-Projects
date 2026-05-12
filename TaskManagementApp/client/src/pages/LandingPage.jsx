import { Link } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-brand-bg flex flex-col relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-brand-pink/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-brand-sidebar/20 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <header className="px-8 py-6 relative z-10 flex justify-between items-center max-w-7xl mx-auto w-full">
        <h1 className="text-3xl font-bold tracking-tight text-brand-sidebar">
          Taski<span className="text-brand-pink text-4xl leading-none">.</span>
        </h1>
        <div className="flex items-center gap-4">
          <Link
            to="/login"
            className="text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors"
          >
            Sign In
          </Link>
          <Link
            to="/signup"
            className="px-5 py-2.5 bg-brand-sidebar text-white text-sm font-bold rounded-xl hover:bg-brand-sidebar-hover transition-all"
          >
            Get Started
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 relative z-10 text-center">
        <h2 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tight max-w-4xl leading-[1.1] mb-6">
          The task manager for <br className="hidden md:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-sidebar to-brand-pink">
            ambitious developers.
          </span>
        </h2>
        
        <p className="text-lg md:text-xl text-slate-500 max-w-2xl mb-10">
          Organize your projects, track your learning progress, and launch VS Code right from your dashboard. A full-stack solution built for you.
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            to="/signup"
            className="px-8 py-4 bg-brand-sidebar hover:bg-brand-sidebar-hover text-white text-lg font-bold rounded-2xl transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1 flex items-center justify-center gap-2"
          >
            Start Building Free <FiArrowRight />
          </Link>
          <Link
            to="/login"
            className="px-8 py-4 bg-white border-2 border-slate-200 hover:border-slate-300 text-slate-700 text-lg font-bold rounded-2xl transition-all flex items-center justify-center"
          >
            Go to Dashboard
          </Link>
        </div>

        {/* Feature Teasers */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20 max-w-5xl mx-auto px-4 w-full">
          {[
            {
              icon: "🚀",
              title: "Project Workspaces",
              desc: "Create unlimited workspaces to organize your labs, tutorials, and apps.",
            },
            {
              icon: "💻",
              title: "VS Code Integration",
              desc: "One click opens the folder directly in your editor. Never lose your place.",
            },
            {
              icon: "📊",
              title: "Visual Progress",
              desc: "Track completed tasks with dynamic progress rings and stats.",
            },
          ].map((f, i) => (
            <div key={i} className="bg-white/60 backdrop-blur-sm p-6 rounded-3xl border border-white text-left">
              <div className="text-4xl mb-4">{f.icon}</div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">{f.title}</h3>
              <p className="text-slate-600">{f.desc}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
