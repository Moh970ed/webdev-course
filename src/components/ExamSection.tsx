import { useState } from "react";
import type { Exam } from "@/data/courseData";
import { CheckCircle, XCircle, Trophy, RotateCcw, Code2 } from "lucide-react";

interface ExamSectionProps {
  exam: Exam;
  chapterTitle: string;
}

type ExamPhase = "intro" | "truefalse" | "mcq" | "coding" | "results";

export default function ExamSection({ exam, chapterTitle }: ExamSectionProps) {
  const [phase, setPhase] = useState<ExamPhase>("intro");
  const [tfAnswers, setTfAnswers] = useState<Record<string, boolean | null>>({});
  const [mcqAnswers, setMcqAnswers] = useState<Record<string, number>>({});
  const [codingAnswer, setCodingAnswer] = useState(exam.codingQuestion.starterCode);
  const [tfSubmitted, setTfSubmitted] = useState(false);
  const [mcqSubmitted, setMcqSubmitted] = useState(false);
  const [codingResult, setCodingResult] = useState<"correct" | "partial" | "wrong" | null>(null);
  const [showResults, setShowResults] = useState(false);

  const tfScore = tfSubmitted
    ? exam.trueFalse.filter((q) => tfAnswers[q.id] === q.answer).length
    : 0;

  const mcqScore = mcqSubmitted
    ? exam.mcq.filter((q) => mcqAnswers[q.id] === q.correctIndex).length
    : 0;

  const checkCodingAnswer = () => {
    const lower = codingAnswer.toLowerCase();
    const found = exam.codingQuestion.expectedKeywords.filter((kw) =>
      lower.includes(kw.toLowerCase())
    );
    const ratio = found.length / exam.codingQuestion.expectedKeywords.length;
    if (ratio >= 0.8) setCodingResult("correct");
    else if (ratio >= 0.5) setCodingResult("partial");
    else setCodingResult("wrong");
  };

  const submitTF = () => {
    if (Object.keys(tfAnswers).length < exam.trueFalse.length) {
      alert("Answer all True/False questions first.");
      return;
    }
    setTfSubmitted(true);
  };

  const submitMCQ = () => {
    if (Object.keys(mcqAnswers).length < exam.mcq.length) {
      alert("Answer all MCQ questions first.");
      return;
    }
    setMcqSubmitted(true);
  };

  const finishExam = () => {
    checkCodingAnswer();
    setShowResults(true);
    setPhase("results");
  };

  const reset = () => {
    setPhase("intro");
    setTfAnswers({});
    setMcqAnswers({});
    setCodingAnswer(exam.codingQuestion.starterCode);
    setTfSubmitted(false);
    setMcqSubmitted(false);
    setCodingResult(null);
    setShowResults(false);
  };

  const totalScore = tfScore + mcqScore;
  const totalMax = exam.trueFalse.length + exam.mcq.length;
  const codingBonus = codingResult === "correct" ? 2 : codingResult === "partial" ? 1 : 0;
  const finalScore = totalScore + codingBonus;
  const finalMax = totalMax + 2;
  const percentage = Math.round((finalScore / finalMax) * 100);

  if (phase === "intro") {
    return (
      <div className="max-w-2xl mx-auto text-center py-12 px-4" data-testid="exam-intro">
        <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <Trophy size={40} className="text-primary" />
        </div>
        <h2 className="text-3xl font-bold mb-3">Chapter Exam</h2>
        <p className="text-muted-foreground text-lg mb-2">{chapterTitle}</p>
        <div className="grid grid-cols-3 gap-4 my-8 text-center">
          <div className="bg-card border border-border rounded-xl p-4">
            <div className="text-2xl font-bold text-primary">{exam.trueFalse.length}</div>
            <div className="text-sm text-muted-foreground">True/False</div>
          </div>
          <div className="bg-card border border-border rounded-xl p-4">
            <div className="text-2xl font-bold text-primary">{exam.mcq.length}</div>
            <div className="text-sm text-muted-foreground">MCQ</div>
          </div>
          <div className="bg-card border border-border rounded-xl p-4">
            <div className="text-2xl font-bold text-primary">1</div>
            <div className="text-sm text-muted-foreground">Coding</div>
          </div>
        </div>
        <p className="text-sm text-muted-foreground mb-8">
          Complete all three parts to receive your exam score. The exam simulates a real assessment.
        </p>
        <button
          onClick={() => setPhase("truefalse")}
          className="px-8 py-4 bg-primary text-white rounded-xl font-semibold text-lg hover:bg-primary/90 transition-colors shadow-md"
          data-testid="start-exam-btn"
        >
          Start Exam
        </button>
      </div>
    );
  }

  if (phase === "results") {
    const getGrade = () => {
      if (percentage >= 90) return { letter: "A", label: "Excellent!", color: "text-green-600 dark:text-green-400" };
      if (percentage >= 80) return { letter: "B", label: "Great Work!", color: "text-blue-600 dark:text-blue-400" };
      if (percentage >= 70) return { letter: "C", label: "Good Job!", color: "text-yellow-600 dark:text-yellow-400" };
      if (percentage >= 60) return { letter: "D", label: "Keep Practicing", color: "text-orange-600 dark:text-orange-400" };
      return { letter: "F", label: "Study More", color: "text-red-600 dark:text-red-400" };
    };
    const grade = getGrade();

    return (
      <div className="max-w-2xl mx-auto py-12 px-4 text-center fade-in" data-testid="exam-results">
        <Trophy size={60} className={`mx-auto mb-4 ${grade.color}`} />
        <div className={`text-7xl font-black mb-2 ${grade.color}`}>{grade.letter}</div>
        <div className="text-3xl font-bold mb-1">{percentage}%</div>
        <div className="text-xl text-muted-foreground mb-8">{grade.label}</div>

        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-card border border-border rounded-xl p-4">
            <div className="text-2xl font-bold">{tfScore}/{exam.trueFalse.length}</div>
            <div className="text-sm text-muted-foreground">True/False</div>
          </div>
          <div className="bg-card border border-border rounded-xl p-4">
            <div className="text-2xl font-bold">{mcqScore}/{exam.mcq.length}</div>
            <div className="text-sm text-muted-foreground">MCQ</div>
          </div>
          <div className="bg-card border border-border rounded-xl p-4">
            <div className="text-2xl font-bold">{codingBonus}/2</div>
            <div className="text-sm text-muted-foreground">Coding</div>
          </div>
        </div>

        <button
          onClick={reset}
          className="flex items-center gap-2 mx-auto px-6 py-3 bg-primary text-white rounded-xl font-semibold hover:bg-primary/90 transition-colors"
          data-testid="retake-exam-btn"
        >
          <RotateCcw size={18} />
          Retake Exam
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4" data-testid="exam-content">
      {/* Progress bar */}
      <div className="flex gap-2 mb-8">
        {(["truefalse", "mcq", "coding"] as const).map((p, i) => (
          <div key={p} className={`flex-1 h-2 rounded-full transition-all ${
            phase === p ? "bg-primary" :
            (p === "mcq" && (phase === "coding")) || (p === "truefalse" && phase !== "truefalse") ? "bg-primary/40" :
            "bg-border"
          }`} />
        ))}
      </div>

      {/* Part 1: True/False */}
      {phase === "truefalse" && (
        <div>
          <h2 className="text-2xl font-bold mb-2">Part 1: True / False</h2>
          <p className="text-muted-foreground mb-6">{exam.trueFalse.length} questions — Determine if each statement is True or False.</p>

          <div className="space-y-4">
            {exam.trueFalse.map((q, i) => {
              const selected = tfAnswers[q.id];
              const isCorrect = tfSubmitted && selected === q.answer;
              const isWrong = tfSubmitted && selected !== undefined && selected !== q.answer;

              return (
                <div key={q.id} className={`bg-card border rounded-xl p-5 transition-all ${
                  tfSubmitted && isCorrect ? "border-green-400" :
                  tfSubmitted && isWrong ? "border-red-400" : "border-border"
                }`} data-testid={`tf-question-${i}`}>
                  <div className="flex items-start gap-3 mb-4">
                    <span className="w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                      {i + 1}
                    </span>
                    <p className="font-medium text-foreground">{q.statement}</p>
                  </div>

                  <div className="flex gap-3 pl-9">
                    {[true, false].map((val) => (
                      <button
                        key={String(val)}
                        onClick={() => !tfSubmitted && setTfAnswers((p) => ({ ...p, [q.id]: val }))}
                        disabled={tfSubmitted}
                        className={`flex-1 py-3 rounded-lg border-2 font-semibold text-sm transition-all
                          ${selected === val
                            ? tfSubmitted
                              ? val === q.answer ? "answer-correct border-green-400" : "answer-wrong border-red-400"
                              : "border-primary bg-accent text-foreground"
                            : tfSubmitted && val === q.answer
                            ? "answer-correct border-green-400"
                            : "border-border bg-muted/20 text-muted-foreground"
                          } ${!tfSubmitted ? "hover:border-primary/50 cursor-pointer" : "cursor-default"}`}
                      >
                        {val ? "True" : "False"}
                      </button>
                    ))}
                  </div>

                  {tfSubmitted && (
                    <div className={`mt-3 pl-9 text-sm fade-in ${isCorrect ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}>
                      {isCorrect ? "✓ " : "✗ "}{q.explanation}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="mt-8 flex justify-between items-center">
            {!tfSubmitted ? (
              <button onClick={submitTF} className="px-6 py-3 bg-primary text-white rounded-xl font-semibold hover:bg-primary/90 transition-colors" data-testid="submit-tf-btn">
                Submit True/False
              </button>
            ) : (
              <div>
                <div className="text-lg font-semibold mb-1">Score: {tfScore}/{exam.trueFalse.length}</div>
                <button onClick={() => setPhase("mcq")} className="px-6 py-3 bg-primary text-white rounded-xl font-semibold hover:bg-primary/90 transition-colors" data-testid="next-to-mcq-btn">
                  Continue to MCQ →
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Part 2: MCQ */}
      {phase === "mcq" && (
        <div>
          <h2 className="text-2xl font-bold mb-2">Part 2: Multiple Choice</h2>
          <p className="text-muted-foreground mb-6">{exam.mcq.length} questions — Select the best answer.</p>

          <div className="space-y-5">
            {exam.mcq.map((q, i) => {
              const selected = mcqAnswers[q.id];
              const isCorrect = mcqSubmitted && selected === q.correctIndex;
              const isWrong = mcqSubmitted && selected !== undefined && selected !== q.correctIndex;

              return (
                <div key={q.id} className={`bg-card border rounded-xl p-5 ${
                  mcqSubmitted && isCorrect ? "border-green-400" :
                  mcqSubmitted && isWrong ? "border-red-400" : "border-border"
                }`}>
                  <div className="flex items-start gap-3 mb-4">
                    <span className="w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                      {i + 1}
                    </span>
                    <p className="font-medium text-foreground">{q.question}</p>
                  </div>
                  <div className="space-y-2 pl-9">
                    {q.options.map((opt, oi) => {
                      const isSelected = selected === oi;
                      const isCorrectOpt = mcqSubmitted && oi === q.correctIndex;
                      const isWrongSel = mcqSubmitted && isSelected && oi !== q.correctIndex;

                      return (
                        <button
                          key={oi}
                          onClick={() => !mcqSubmitted && setMcqAnswers((p) => ({ ...p, [q.id]: oi }))}
                          disabled={mcqSubmitted}
                          className={`w-full text-left px-4 py-3 rounded-lg border-2 text-sm transition-all
                            ${!mcqSubmitted
                              ? isSelected ? "border-primary bg-accent text-foreground" : "border-border bg-muted/20 hover:border-primary/50 hover:bg-accent/50 text-foreground cursor-pointer"
                              : isCorrectOpt ? "answer-correct border-green-400 text-foreground"
                              : isWrongSel ? "answer-wrong border-red-400 text-foreground"
                              : "border-border bg-muted/20 text-muted-foreground cursor-default"
                            }`}
                        >
                          <span className="font-semibold mr-2">{String.fromCharCode(65 + oi)}.</span> {opt}
                          {mcqSubmitted && isCorrectOpt && <CheckCircle size={14} className="inline ml-2 text-green-500" />}
                          {mcqSubmitted && isWrongSel && <XCircle size={14} className="inline ml-2 text-red-500" />}
                        </button>
                      );
                    })}
                  </div>
                  {mcqSubmitted && (
                    <div className={`mt-3 pl-9 text-sm fade-in ${isCorrect ? "text-green-600 dark:text-green-400" : "text-orange-600 dark:text-orange-400"}`}>
                      {isCorrect ? "✓ " : "✗ "}{q.explanation}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="mt-8 flex gap-3 items-center">
            <button onClick={() => setPhase("truefalse")} className="px-4 py-3 border border-border rounded-xl text-muted-foreground hover:bg-muted transition-colors">
              ← Back
            </button>
            {!mcqSubmitted ? (
              <button onClick={submitMCQ} className="px-6 py-3 bg-primary text-white rounded-xl font-semibold hover:bg-primary/90 transition-colors" data-testid="submit-mcq-btn">
                Submit MCQ
              </button>
            ) : (
              <button onClick={() => setPhase("coding")} className="px-6 py-3 bg-primary text-white rounded-xl font-semibold hover:bg-primary/90 transition-colors" data-testid="next-to-coding-btn">
                Continue to Coding →
              </button>
            )}
          </div>
        </div>
      )}

      {/* Part 3: Coding */}
      {phase === "coding" && (
        <div>
          <h2 className="text-2xl font-bold mb-2">Part 3: Coding Question</h2>
          <p className="text-muted-foreground mb-6">Write code to solve the problem below.</p>

          <div className="bg-card border border-border rounded-xl p-5 mb-4">
            <div className="flex items-start gap-3">
              <Code2 size={20} className="text-primary flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold mb-2">Problem Statement</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{exam.codingQuestion.prompt}</p>
              </div>
            </div>
          </div>

          <div className="relative mb-4">
            <div className="absolute top-0 left-0 right-0 flex items-center justify-between px-4 py-2 bg-[hsl(222,47%,8%)] rounded-t-xl border-b border-[hsl(222,40%,18%)]">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/70" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
                <div className="w-3 h-3 rounded-full bg-green-500/70" />
              </div>
              <span className="text-xs text-slate-400">Your Answer</span>
            </div>
            <textarea
              value={codingAnswer}
              onChange={(e) => { setCodingAnswer(e.target.value); setCodingResult(null); }}
              className="code-editor rounded-t-none pt-10 min-h-[200px]"
              spellCheck={false}
              data-testid="coding-answer-input"
            />
          </div>

          {codingResult && (
            <div className={`p-4 rounded-xl mb-4 text-sm fade-in ${
              codingResult === "correct" ? "bg-green-50 dark:bg-green-900/20 border border-green-300 text-green-800 dark:text-green-300" :
              codingResult === "partial" ? "bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-300 text-yellow-800 dark:text-yellow-300" :
              "bg-red-50 dark:bg-red-900/20 border border-red-300 text-red-800 dark:text-red-300"
            }`}>
              {codingResult === "correct" && "✅ Excellent! Your code contains all the required elements."}
              {codingResult === "partial" && "⚠️ Partial credit — some elements are present. Review the requirements and add the missing parts."}
              {codingResult === "wrong" && "❌ Missing key elements. Check the problem statement and try again."}
            </div>
          )}

          <div className="flex gap-3">
            <button onClick={() => setPhase("mcq")} className="px-4 py-3 border border-border rounded-xl text-muted-foreground hover:bg-muted transition-colors">
              ← Back
            </button>
            <button onClick={checkCodingAnswer} className="px-5 py-3 bg-muted text-foreground rounded-xl font-medium hover:bg-muted/80 transition-colors" data-testid="check-code-btn">
              Check My Code
            </button>
            <button onClick={finishExam} className="px-6 py-3 bg-primary text-white rounded-xl font-semibold hover:bg-primary/90 transition-colors ml-auto" data-testid="finish-exam-btn">
              Finish Exam
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
