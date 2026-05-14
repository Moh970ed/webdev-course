import { useParams, Link } from "wouter";
import { chapters } from "@/data/courseData";
import CodeChallenge from "@/components/CodeChallenge";
import { ArrowLeft, ArrowRight, Code2 } from "lucide-react";

export default function ChallengesPage() {
  const { slug } = useParams<{ slug: string }>();
  const chapter = chapters.find((c) => c.slug === slug);

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

  return (
    <div className="min-h-screen px-6 py-8 max-w-4xl mx-auto">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
        <Link href="/"><span className="hover:text-foreground cursor-pointer">Home</span></Link>
        <span>/</span>
        <Link href={`/chapter/${slug}`}><span className="hover:text-foreground cursor-pointer">{chapter.title}</span></Link>
        <span>/</span>
        <span className="text-foreground font-medium">Challenges</span>
      </div>

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-3">
          <div className="text-3xl">{chapter.icon}</div>
          <div>
            <div className="text-xs text-muted-foreground">Chapter {chapter.id}</div>
            <h1 className="text-2xl font-bold">{chapter.title} — Coding Challenges</h1>
          </div>
        </div>
        <p className="text-muted-foreground">
          Practice your skills with these {chapter.challenges.length} challenges. Type your solution in the editor and click "Check Solution" to verify.
        </p>
      </div>

      {/* Difficulty summary */}
      <div className="flex flex-wrap gap-3 mb-6">
        {["easy", "medium", "hard"].map((diff) => {
          const count = chapter.challenges.filter((c) => c.difficulty === diff).length;
          if (count === 0) return null;
          const colors = {
            easy: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
            medium: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
            hard: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
          }[diff]!;
          return (
            <span key={diff} className={`text-xs font-semibold px-3 py-1.5 rounded-full capitalize ${colors}`}>
              {count} {diff}
            </span>
          );
        })}
      </div>

      {/* Challenges */}
      <div className="space-y-3 mb-10">
        {chapter.challenges.map((challenge, i) => (
          <CodeChallenge key={challenge.id} challenge={challenge} index={i} />
        ))}
      </div>

      {/* Mini Project */}
      <div className="bg-gradient-to-br from-primary/10 to-accent/30 border border-primary/20 rounded-xl p-6 mb-10">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center flex-shrink-0">
            <Code2 size={24} className="text-primary" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-bold bg-primary text-white px-2 py-0.5 rounded-full">MINI PROJECT</span>
            </div>
            <h3 className="text-xl font-bold mb-2">{chapter.miniProject.title}</h3>
            <p className="text-muted-foreground text-sm mb-4 leading-relaxed">{chapter.miniProject.description}</p>

            <div className="mb-4">
              <div className="text-sm font-semibold mb-2">Project Steps:</div>
              <ol className="space-y-1.5">
                {chapter.miniProject.steps.map((step, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                    <span className="w-5 h-5 rounded-full bg-primary/20 text-primary text-xs flex items-center justify-center flex-shrink-0 mt-0.5 font-bold">
                      {i + 1}
                    </span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </div>

            <div className="relative">
              <div className="flex items-center justify-between px-4 py-2 bg-[hsl(222,47%,8%)] rounded-t-lg border-b border-[hsl(222,40%,18%)]">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
                </div>
                <span className="text-xs text-slate-400">Starter Code</span>
              </div>
              <pre className="code-block rounded-t-none border-0 border-x border-b border-[hsl(222,40%,18%)] rounded-b-lg text-xs">
                <code>{chapter.miniProject.starterCode}</code>
              </pre>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom navigation */}
      <div className="pt-6 border-t border-border flex justify-between">
        <Link href={`/chapter/${slug}/quiz`}>
          <button className="flex items-center gap-2 px-4 py-2.5 border border-border rounded-xl text-sm font-medium hover:bg-muted transition-colors">
            <ArrowLeft size={16} />
            Back to Quiz
          </button>
        </Link>
        <Link href={`/chapter/${slug}/exam`}>
          <button className="flex items-center gap-2 px-4 py-2.5 bg-primary text-white rounded-xl text-sm font-medium hover:bg-primary/90 transition-colors" data-testid="go-to-exam-btn">
            Take Exam
            <ArrowRight size={16} />
          </button>
        </Link>
      </div>
    </div>
  );
}
