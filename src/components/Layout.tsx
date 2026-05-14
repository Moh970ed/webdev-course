import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { chapters } from "@/data/courseData";
import { Sun, Moon, BookOpen, GraduationCap, Menu, X, ChevronRight, Award } from "lucide-react";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [dark, setDark] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("theme") === "dark";
    }
    return false;
  });
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    localStorage.setItem("theme", dark ? "dark" : "light");
  }, [dark]);

  const chapterColors: Record<string, string> = {
    blue: "text-blue-500",
    orange: "text-orange-500",
    purple: "text-purple-500",
    indigo: "text-indigo-500",
    yellow: "text-yellow-500",
  };

  const isActive = (path: string) => location === path || location.startsWith(path + "/");

  return (
    <div className="flex min-h-screen bg-background text-foreground">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full z-50 w-64 bg-sidebar text-sidebar-foreground flex flex-col
          transition-transform duration-300 ease-in-out
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0 lg:static lg:z-auto`}
      >
        {/* Logo */}
        <div className="flex items-center justify-between p-5 border-b border-sidebar-border">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <BookOpen size={16} className="text-white" />
            </div>
            <div>
              <div className="font-bold text-white text-sm leading-tight">WebDev</div>
              <div className="text-sidebar-foreground/60 text-xs">Course Platform</div>
            </div>
          </Link>
          <button
            className="lg:hidden text-sidebar-foreground/60 hover:text-white transition-colors"
            onClick={() => setSidebarOpen(false)}
          >
            <X size={18} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-3">
          {/* Overview */}
          <Link href="/">
            <div className={`flex items-center gap-2.5 px-3 py-2 rounded-lg mb-1 cursor-pointer transition-colors
              ${isActive("/") && location === "/"
                ? "bg-sidebar-accent text-white"
                : "text-sidebar-foreground/70 hover:bg-sidebar-accent/60 hover:text-white"
              }`}
            >
              <GraduationCap size={16} />
              <span className="text-sm font-medium">Course Overview</span>
            </div>
          </Link>

          {/* Chapters */}
          <div className="mt-3 mb-2 px-3">
            <span className="text-sidebar-foreground/40 text-xs uppercase tracking-wider font-semibold">Chapters</span>
          </div>

          {chapters.map((chapter) => (
            <div key={chapter.id}>
              <Link href={`/chapter/${chapter.slug}`}>
                <div className={`flex items-center gap-2.5 px-3 py-2 rounded-lg mb-0.5 cursor-pointer transition-colors
                  ${isActive(`/chapter/${chapter.slug}`)
                    ? "bg-sidebar-accent text-white"
                    : "text-sidebar-foreground/70 hover:bg-sidebar-accent/60 hover:text-white"
                  }`}
                  data-testid={`nav-chapter-${chapter.id}`}
                >
                  <span className="text-base">{chapter.icon}</span>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs text-sidebar-foreground/50">Ch. {chapter.id}</div>
                    <div className="text-sm font-medium leading-tight truncate">{chapter.title}</div>
                  </div>
                  {isActive(`/chapter/${chapter.slug}`) && (
                    <ChevronRight size={14} className="text-primary flex-shrink-0" />
                  )}
                </div>
              </Link>

              {/* Sub-navigation when active */}
              {isActive(`/chapter/${chapter.slug}`) && (
                <div className="ml-4 mb-1 space-y-0.5">
                  {[
                    { path: `/chapter/${chapter.slug}`, label: "Lessons" },
                    { path: `/chapter/${chapter.slug}/quiz`, label: "Quiz" },
                    { path: `/chapter/${chapter.slug}/challenges`, label: "Challenges" },
                    { path: `/chapter/${chapter.slug}/exam`, label: "Exam" },
                  ].map((item) => (
                    <Link key={item.path} href={item.path}>
                      <div className={`flex items-center gap-2 px-3 py-1.5 rounded-md cursor-pointer transition-colors text-xs
                        ${location === item.path
                          ? "bg-primary/20 text-primary font-medium"
                          : "text-sidebar-foreground/50 hover:text-sidebar-foreground/80"
                        }`}
                      >
                        {item.label}
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-sidebar-border">
          <div className="flex items-center gap-2 text-sidebar-foreground/50 text-xs">
            <Award size={12} />
            <span>5 Chapters • 50+ Topics • Exams</span>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen lg:ml-0">
        {/* Top Bar */}
        <header className="sticky top-0 z-30 bg-card border-b border-border px-4 py-3 flex items-center justify-between gap-4 shadow-xs">
          <button
            className="lg:hidden text-muted-foreground hover:text-foreground transition-colors p-1"
            onClick={() => setSidebarOpen(true)}
            data-testid="sidebar-toggle"
          >
            <Menu size={20} />
          </button>

          <div className="flex-1 text-sm text-muted-foreground hidden sm:block">
            {location === "/" ? (
              <span>Welcome to Web Development Course</span>
            ) : (
              <span>
                {chapters.find((c) => location.includes(c.slug))?.title ?? "Learning"}
              </span>
            )}
          </div>

          <button
            onClick={() => setDark(!dark)}
            className="p-2 rounded-lg hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
            data-testid="theme-toggle"
            title={dark ? "Switch to Light Mode" : "Switch to Dark Mode"}
          >
            {dark ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto">
          <div className="fade-in">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
