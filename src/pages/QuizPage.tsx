import { useParams, Link } from "wouter";
import { chapters } from "@/data/courseData";
import QuizSection from "@/components/QuizSection";
import { ArrowLeft, ArrowRight } from "lucide-react";

export default function QuizPage() {
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
    <div className="min-h-screen px-6 py-8 max-w-5xl mx-auto">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
        <Link href="/"><span className="hover:text-foreground cursor-pointer">Home</span></Link>
        <span>/</span>
        <Link href={`/chapter/${slug}`}><span className="hover:text-foreground cursor-pointer">{chapter.title}</span></Link>
        <span>/</span>
        <span className="text-foreground font-medium">Quiz</span>
      </div>

      {/* Chapter badge */}
      <div className="mb-6 flex items-center gap-3">
        <div className="text-3xl">{chapter.icon}</div>
        <div>
          <div className="text-xs text-muted-foreground">Chapter {chapter.id}</div>
          <div className="font-bold text-xl">{chapter.title} — Quiz</div>
        </div>
      </div>

      <QuizSection
        questions={chapter.quiz}
        title={`${chapter.title} Quiz`}
      />

      {/* Bottom navigation */}
      <div className="mt-10 pt-6 border-t border-border flex justify-between">
        <Link href={`/chapter/${slug}`}>
          <button className="flex items-center gap-2 px-4 py-2.5 border border-border rounded-xl text-sm font-medium hover:bg-muted transition-colors">
            <ArrowLeft size={16} />
            Back to Lessons
          </button>
        </Link>
        <Link href={`/chapter/${slug}/challenges`}>
          <button className="flex items-center gap-2 px-4 py-2.5 bg-primary text-white rounded-xl text-sm font-medium hover:bg-primary/90 transition-colors" data-testid="go-to-challenges-btn">
            Coding Challenges
            <ArrowRight size={16} />
          </button>
        </Link>
      </div>
    </div>
  );
}
