import { useParams, Link } from "wouter";
import { chapters } from "@/data/courseData";
import ExamSection from "@/components/ExamSection";
import { ArrowLeft } from "lucide-react";

export default function ExamPage() {
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
        <span className="text-foreground font-medium">Exam</span>
      </div>

      <ExamSection exam={chapter.exam} chapterTitle={chapter.title} />

      {/* Bottom link */}
      <div className="mt-8 pt-6 border-t border-border">
        <Link href={`/chapter/${slug}/challenges`}>
          <button className="flex items-center gap-2 px-4 py-2.5 border border-border rounded-xl text-sm font-medium hover:bg-muted transition-colors">
            <ArrowLeft size={16} />
            Back to Challenges
          </button>
        </Link>
      </div>
    </div>
  );
}
