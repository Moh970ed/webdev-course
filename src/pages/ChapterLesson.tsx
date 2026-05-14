import { useParams, Link } from "wouter";
import { chapters } from "@/data/courseData";
import CodeBlock from "@/components/CodeBlock";
import { BookOpen, ArrowRight, ArrowLeft, Lightbulb, AlertTriangle, Star, Globe } from "lucide-react";
import { useState } from "react";

export default function ChapterLesson() {
  const { slug } = useParams<{ slug: string }>();
  const chapter = chapters.find((c) => c.slug === slug);
  const [activeTopic, setActiveTopic] = useState(0);

  if (!chapter) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Chapter not found</h2>
          <Link href="/"><button className="text-primary hover:underline">Go to overview</button></Link>
        </div>
      </div>
    );
  }

  const topic = chapter.topics[activeTopic];
  const chapterIndex = chapters.findIndex((c) => c.slug === slug);
  const prevChapter = chapterIndex > 0 ? chapters[chapterIndex - 1] : null;
  const nextChapter = chapterIndex < chapters.length - 1 ? chapters[chapterIndex + 1] : null;

  const colorMap: Record<string, string> = {
    blue: "bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800",
    orange: "bg-orange-50 dark:bg-orange-900/20 text-orange-700 dark:text-orange-300 border-orange-200 dark:border-orange-800",
    purple: "bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-800",
    indigo: "bg-indigo-50 dark:bg-indigo-900/20 text-indigo-700 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800",
    yellow: "bg-yellow-50 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-300 border-yellow-200 dark:border-yellow-800",
  };
  const chapterColor = colorMap[chapter.color] || colorMap.blue;

  const renderContent = (content: string) => {
    const lines = content.split("\n");
    const elements: React.ReactNode[] = [];
    let currentList: string[] = [];
    let listType: "ul" | "ol" | "table" | null = null;
    let tableRows: string[][] = [];
    let inCodeBlock = false;
    let codeLines: string[] = [];
    let codeLanguage = "";

    const flushList = () => {
      if (currentList.length > 0) {
        if (listType === "ul") {
          elements.push(
            <ul key={elements.length} className="list-disc list-outside ml-5 space-y-1.5 my-3 text-foreground">
              {currentList.map((item, i) => (
                <li key={i} className="text-sm leading-relaxed">{item}</li>
              ))}
            </ul>
          );
        } else if (listType === "ol") {
          elements.push(
            <ol key={elements.length} className="list-decimal list-outside ml-5 space-y-1.5 my-3 text-foreground">
              {currentList.map((item, i) => (
                <li key={i} className="text-sm leading-relaxed">{item}</li>
              ))}
            </ol>
          );
        }
        currentList = [];
        listType = null;
      }
      if (tableRows.length > 0) {
        elements.push(
          <div key={elements.length} className="overflow-x-auto my-4 rounded-xl border border-border">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-muted/50">
                  {tableRows[0].map((cell, ci) => (
                    <th key={ci} className="px-4 py-2.5 text-left font-semibold border-b border-border text-foreground">{cell.trim()}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {tableRows.slice(2).map((row, ri) => (
                  <tr key={ri} className="border-b border-border last:border-0 hover:bg-muted/30">
                    {row.map((cell, ci) => (
                      <td key={ci} className="px-4 py-2.5 text-muted-foreground">{cell.trim()}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
        tableRows = [];
      }
    };

    const renderInline = (text: string): React.ReactNode => {
      const parts = text.split(/(`[^`]+`|\*\*[^*]+\*\*|\*[^*]+\*)/g);
      return parts.map((part, i) => {
        if (part.startsWith("**") && part.endsWith("**")) {
          return <strong key={i} className="font-semibold text-foreground">{part.slice(2, -2)}</strong>;
        }
        if (part.startsWith("*") && part.endsWith("*")) {
          return <em key={i}>{part.slice(1, -1)}</em>;
        }
        if (part.startsWith("`") && part.endsWith("`")) {
          return <code key={i} className="font-mono text-xs bg-muted px-1.5 py-0.5 rounded text-primary">{part.slice(1, -1)}</code>;
        }
        return part;
      });
    };

    lines.forEach((line, index) => {
      // Fenced code blocks
      if (line.startsWith("```")) {
        if (!inCodeBlock) {
          flushList();
          inCodeBlock = true;
          codeLanguage = line.slice(3).trim() || "code";
          codeLines = [];
        } else {
          inCodeBlock = false;
          elements.push(
            <CodeBlock key={elements.length} code={codeLines.join("\n")} language={codeLanguage} />
          );
        }
        return;
      }
      if (inCodeBlock) { codeLines.push(line); return; }

      // Table
      if (line.startsWith("|")) {
        tableRows.push(line.split("|").filter((_, i, a) => i > 0 && i < a.length - 1));
        return;
      }
      if (tableRows.length > 0 && !line.startsWith("|")) {
        flushList();
      }

      // Headings
      if (line.startsWith("### ")) {
        flushList();
        elements.push(<h3 key={elements.length} className="text-lg font-bold mt-5 mb-2 text-foreground">{renderInline(line.slice(4))}</h3>);
      } else if (line.startsWith("## ")) {
        flushList();
        elements.push(<h2 key={elements.length} className="text-xl font-bold mt-6 mb-3 text-foreground">{renderInline(line.slice(3))}</h2>);
      } else if (line.startsWith("# ")) {
        flushList();
        elements.push(<h1 key={elements.length} className="text-2xl font-bold mt-6 mb-3 text-foreground">{renderInline(line.slice(2))}</h1>);
      }
      // Lists
      else if (line.match(/^- /)) {
        if (listType !== "ul") { flushList(); listType = "ul"; }
        currentList.push(line.slice(2));
      } else if (line.match(/^\d+\. /)) {
        if (listType !== "ol") { flushList(); listType = "ol"; }
        currentList.push(line.replace(/^\d+\. /, ""));
      }
      // Empty line
      else if (line.trim() === "") {
        flushList();
      }
      // Paragraph
      else if (line.trim()) {
        flushList();
        elements.push(
          <p key={elements.length} className="text-sm leading-relaxed text-foreground/90 mb-3">
            {renderInline(line)}
          </p>
        );
      }
    });
    flushList();
    return elements;
  };

  return (
    <div className="flex min-h-screen">
      {/* Topic Sidebar */}
      <div className="hidden md:block w-56 lg:w-64 flex-shrink-0 border-r border-border bg-card">
        <div className={`p-4 border-b border-border ${chapterColor} bg-opacity-50`}>
          <div className="text-2xl mb-1">{chapter.icon}</div>
          <div className="font-bold text-sm leading-tight">{chapter.title}</div>
          <div className="text-xs mt-1 opacity-70">{chapter.topics.length} lessons</div>
        </div>
        <nav className="p-2">
          {chapter.topics.map((t, i) => (
            <button
              key={t.id}
              onClick={() => setActiveTopic(i)}
              className={`w-full text-left px-3 py-2.5 rounded-lg text-xs transition-colors mb-0.5
                ${activeTopic === i
                  ? "bg-primary/10 text-primary font-semibold"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              data-testid={`topic-nav-${i}`}
            >
              <div className="font-semibold text-[10px] opacity-60 mb-0.5">{t.id}</div>
              <div className="leading-tight">{t.title}</div>
            </button>
          ))}

          {/* Section links */}
          <div className="mt-4 pt-4 border-t border-border space-y-0.5">
            {[
              { href: `/chapter/${slug}/quiz`, label: "📝 Quiz" },
              { href: `/chapter/${slug}/challenges`, label: "💻 Challenges" },
              { href: `/chapter/${slug}/exam`, label: "🎓 Exam" },
            ].map(({ href, label }) => (
              <Link key={href} href={href}>
                <div className="w-full text-left px-3 py-2 rounded-lg text-xs text-muted-foreground hover:bg-muted hover:text-foreground transition-colors cursor-pointer">
                  {label}
                </div>
              </Link>
            ))}
          </div>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 max-w-4xl px-6 py-8">
        {/* Topic nav (mobile) */}
        <div className="md:hidden mb-4">
          <select
            value={activeTopic}
            onChange={(e) => setActiveTopic(Number(e.target.value))}
            className="w-full bg-card border border-border rounded-lg px-3 py-2 text-sm text-foreground"
          >
            {chapter.topics.map((t, i) => (
              <option key={t.id} value={i}>{t.id}: {t.title}</option>
            ))}
          </select>
        </div>

        {/* Topic header */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-2">
            <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${chapterColor}`}>
              {chapter.icon} {chapter.title}
            </span>
            <span className="text-xs text-muted-foreground">Topic {topic.id}</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground" data-testid="topic-title">
            {topic.title}
          </h1>
        </div>

        {/* Content */}
        <div className="prose-sm max-w-none mb-8">
          {renderContent(topic.content)}
        </div>

        {/* Code Example */}
        {topic.codeExample && (
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-3">
              <BookOpen size={16} className="text-primary" />
              <span className="font-semibold text-sm">Code Example</span>
            </div>
            <CodeBlock
              code={topic.codeExample.code}
              language={topic.codeExample.language}
              explanation={topic.codeExample.explanation}
            />
          </div>
        )}

        {/* Tips, Mistakes, Best Practices, Real World */}
        <div className="grid grid-cols-1 gap-4 mb-8">
          {topic.tips && topic.tips.length > 0 && (
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-5">
              <div className="flex items-center gap-2 mb-3">
                <Lightbulb size={16} className="text-blue-600 dark:text-blue-400" />
                <span className="font-semibold text-blue-700 dark:text-blue-300 text-sm">Pro Tips</span>
              </div>
              <ul className="space-y-2">
                {topic.tips.map((tip, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-blue-800 dark:text-blue-300">
                    <span className="text-blue-400 mt-0.5">→</span>
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {topic.commonMistakes && topic.commonMistakes.length > 0 && (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-5">
              <div className="flex items-center gap-2 mb-3">
                <AlertTriangle size={16} className="text-red-600 dark:text-red-400" />
                <span className="font-semibold text-red-700 dark:text-red-300 text-sm">Common Mistakes to Avoid</span>
              </div>
              <ul className="space-y-2">
                {topic.commonMistakes.map((m, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-red-800 dark:text-red-300">
                    <span className="text-red-400 mt-0.5">✗</span>
                    <span>{m}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {topic.bestPractices && topic.bestPractices.length > 0 && (
            <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-5">
              <div className="flex items-center gap-2 mb-3">
                <Star size={16} className="text-green-600 dark:text-green-400" />
                <span className="font-semibold text-green-700 dark:text-green-300 text-sm">Best Practices</span>
              </div>
              <ul className="space-y-2">
                {topic.bestPractices.map((p, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-green-800 dark:text-green-300">
                    <span className="text-green-500 mt-0.5">✓</span>
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {topic.realWorldExample && (
            <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-xl p-5">
              <div className="flex items-center gap-2 mb-3">
                <Globe size={16} className="text-purple-600 dark:text-purple-400" />
                <span className="font-semibold text-purple-700 dark:text-purple-300 text-sm">Real-World Example</span>
              </div>
              <p className="text-sm text-purple-800 dark:text-purple-300 leading-relaxed">{topic.realWorldExample}</p>
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between pt-6 border-t border-border">
          <button
            onClick={() => activeTopic > 0 && setActiveTopic(activeTopic - 1)}
            disabled={activeTopic === 0}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-border text-sm font-medium transition-colors disabled:opacity-40 disabled:cursor-not-allowed hover:bg-muted"
          >
            <ArrowLeft size={16} />
            Previous
          </button>

          <span className="text-sm text-muted-foreground">
            {activeTopic + 1} / {chapter.topics.length}
          </span>

          {activeTopic < chapter.topics.length - 1 ? (
            <button
              onClick={() => setActiveTopic(activeTopic + 1)}
              className="flex items-center gap-2 px-4 py-2.5 bg-primary text-white rounded-xl text-sm font-medium hover:bg-primary/90 transition-colors"
              data-testid="next-topic-btn"
            >
              Next
              <ArrowRight size={16} />
            </button>
          ) : (
            <Link href={`/chapter/${slug}/quiz`}>
              <button className="flex items-center gap-2 px-4 py-2.5 bg-primary text-white rounded-xl text-sm font-medium hover:bg-primary/90 transition-colors">
                Take Quiz
                <ArrowRight size={16} />
              </button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
