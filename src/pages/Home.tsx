import { Link } from "wouter";
import { chapters } from "@/data/courseData";
import { BookOpen, Code2, Trophy, Zap, CheckCircle, ArrowRight } from "lucide-react";

export default function Home() {
  const colorMap: Record<string, { bg: string; text: string; border: string }> = {
    blue: { bg: "bg-blue-50 dark:bg-blue-900/20", text: "text-blue-600 dark:text-blue-400", border: "border-blue-200 dark:border-blue-800" },
    orange: { bg: "bg-orange-50 dark:bg-orange-900/20", text: "text-orange-600 dark:text-orange-400", border: "border-orange-200 dark:border-orange-800" },
    purple: { bg: "bg-purple-50 dark:bg-purple-900/20", text: "text-purple-600 dark:text-purple-400", border: "border-purple-200 dark:border-purple-800" },
    indigo: { bg: "bg-indigo-50 dark:bg-indigo-900/20", text: "text-indigo-600 dark:text-indigo-400", border: "border-indigo-200 dark:border-indigo-800" },
    yellow: { bg: "bg-yellow-50 dark:bg-yellow-900/20", text: "text-yellow-600 dark:text-yellow-400", border: "border-yellow-200 dark:border-yellow-800" },
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-primary/10 via-background to-accent/30 border-b border-border px-6 py-16 text-center overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5" />
        <div className="relative max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary text-sm font-semibold px-4 py-1.5 rounded-full mb-6 border border-primary/20">
            <Zap size={14} />
            Complete Web Development Course
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-foreground mb-5 leading-tight" data-testid="home-title">
            Master Web
            <span className="text-primary"> Development</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            A comprehensive, interactive learning platform covering HTML5, CSS3, Bootstrap 5, and JavaScript — from complete beginner to job-ready.
          </p>
          <div className="flex flex-wrap gap-3 justify-center mb-10">
            <Link href="/chapter/intro">
              <button className="flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-xl font-semibold hover:bg-primary/90 transition-colors shadow-md" data-testid="start-learning-btn">
                Start Learning
                <ArrowRight size={16} />
              </button>
            </Link>
            <Link href="/chapter/intro/quiz">
              <button className="flex items-center gap-2 px-6 py-3 bg-card text-foreground rounded-xl font-semibold border border-border hover:bg-muted transition-colors">
                Take a Quiz
                <Trophy size={16} />
              </button>
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-4 gap-4 max-w-xl mx-auto">
            {[
              { label: "Chapters", value: "5" },
              { label: "Topics", value: "40+" },
              { label: "Quizzes", value: "50+" },
              { label: "Challenges", value: "15+" },
            ].map((stat) => (
              <div key={stat.label} className="bg-card/80 backdrop-blur border border-border rounded-xl p-3 text-center">
                <div className="text-2xl font-bold text-primary">{stat.value}</div>
                <div className="text-xs text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Features Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-16">
          {[
            { icon: BookOpen, title: "Deep Explanations", desc: "Every topic covered thoroughly with real-world examples, tips, and best practices.", color: "text-blue-500" },
            { icon: Code2, title: "Hands-on Coding", desc: "Code challenges, practice tasks, and mini-projects to build real skills.", color: "text-green-500" },
            { icon: Trophy, title: "Exam Mode", desc: "Simulate real exams with True/False, MCQ, and coding questions — auto-graded.", color: "text-yellow-500" },
          ].map(({ icon: Icon, title, desc, color }) => (
            <div key={title} className="bg-card border border-border rounded-xl p-6 shadow-xs">
              <Icon size={28} className={`${color} mb-4`} />
              <h3 className="font-bold text-lg mb-2">{title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>

        {/* Chapter Cards */}
        <div className="mb-4">
          <h2 className="text-2xl font-bold mb-1">Course Chapters</h2>
          <p className="text-muted-foreground">Five complete chapters — each with lessons, quiz, challenges, and exam.</p>
        </div>

        <div className="space-y-4">
          {chapters.map((chapter) => {
            const colors = colorMap[chapter.color] || colorMap.blue;
            return (
              <div
                key={chapter.id}
                className="bg-card border border-border rounded-xl overflow-hidden shadow-xs hover:shadow-md transition-shadow"
                data-testid={`chapter-card-${chapter.id}`}
              >
                <div className="flex flex-col md:flex-row">
                  {/* Chapter info */}
                  <div className="flex-1 p-6">
                    <div className="flex items-start gap-4">
                      <div className={`w-14 h-14 rounded-xl ${colors.bg} ${colors.border} border flex items-center justify-center text-2xl flex-shrink-0`}>
                        {chapter.icon}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${colors.bg} ${colors.text}`}>
                            Chapter {chapter.id}
                          </span>
                          <span className="text-xs text-muted-foreground">{chapter.topics.length} topics</span>
                        </div>
                        <h3 className="text-xl font-bold text-foreground mb-2">{chapter.title}</h3>
                        <p className="text-muted-foreground text-sm leading-relaxed mb-4">{chapter.description}</p>

                        {/* What's included */}
                        <div className="flex flex-wrap gap-2">
                          {[
                            `${chapter.topics.length} Lessons`,
                            `${chapter.quiz.length} Quiz Questions`,
                            `${chapter.challenges.length} Challenges`,
                            "Full Exam",
                            "Mini Project",
                          ].map((item) => (
                            <span
                              key={item}
                              className="flex items-center gap-1.5 text-xs bg-muted text-muted-foreground px-2.5 py-1 rounded-full"
                            >
                              <CheckCircle size={10} className="text-green-500" />
                              {item}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Quick links */}
                  <div className="border-t md:border-t-0 md:border-l border-border p-6 flex flex-col gap-2 min-w-[180px]">
                    <Link href={`/chapter/${chapter.slug}`}>
                      <button className="w-full text-left px-4 py-2.5 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors">
                        Start Chapter
                      </button>
                    </Link>
                    <Link href={`/chapter/${chapter.slug}/quiz`}>
                      <button className="w-full text-left px-4 py-2.5 bg-muted text-muted-foreground rounded-lg text-sm hover:bg-muted/80 transition-colors">
                        Take Quiz
                      </button>
                    </Link>
                    <Link href={`/chapter/${chapter.slug}/challenges`}>
                      <button className="w-full text-left px-4 py-2.5 bg-muted text-muted-foreground rounded-lg text-sm hover:bg-muted/80 transition-colors">
                        Challenges
                      </button>
                    </Link>
                    <Link href={`/chapter/${chapter.slug}/exam`}>
                      <button className="w-full text-left px-4 py-2.5 bg-muted text-muted-foreground rounded-lg text-sm hover:bg-muted/80 transition-colors">
                        Exam Mode
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 bg-gradient-to-r from-primary to-blue-600 rounded-2xl p-10 text-white text-center">
          <h2 className="text-3xl font-bold mb-3">Ready to Start Learning?</h2>
          <p className="text-blue-100 mb-6 text-lg">Begin your journey with Chapter 1 and work your way to building complete web applications.</p>
          <Link href="/chapter/intro">
            <button className="px-8 py-4 bg-white text-primary rounded-xl font-bold text-lg hover:bg-blue-50 transition-colors shadow-lg">
              Start Chapter 1: Intro to Web Dev
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
