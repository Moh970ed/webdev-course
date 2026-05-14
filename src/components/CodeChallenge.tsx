import { useState } from "react";
import type { Challenge } from "@/data/courseData";
import { CheckCircle, XCircle, Lightbulb, Code2 } from "lucide-react";

interface CodeChallengeProps {
  challenge: Challenge;
  index: number;
}

export default function CodeChallenge({ challenge, index }: CodeChallengeProps) {
  const [code, setCode] = useState(challenge.starterCode);
  const [result, setResult] = useState<"correct" | "wrong" | null>(null);
  const [showHint, setShowHint] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [isOpen, setIsOpen] = useState(index === 0);

  const difficultyColor = {
    easy: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
    medium: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
    hard: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
  }[challenge.difficulty];

  const checkCode = () => {
    const lowerCode = code.toLowerCase();
    const missing = challenge.expectedKeywords.filter(
      (kw) => !lowerCode.includes(kw.toLowerCase())
    );

    if (missing.length === 0) {
      setResult("correct");
      setFeedback("Excellent work! All required elements are present in your code.");
    } else {
      setResult("wrong");
      setFeedback(
        `Missing elements: ${missing.map((k) => `"${k}"`).join(", ")}. Check your solution and try again.`
      );
    }
  };

  const handleReset = () => {
    setCode(challenge.starterCode);
    setResult(null);
    setFeedback("");
    setShowHint(false);
  };

  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden shadow-xs mb-4">
      {/* Header */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-5 text-left hover:bg-muted/30 transition-colors"
        data-testid={`challenge-${index}-toggle`}
      >
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
            <Code2 size={18} className="text-primary" />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-0.5">
              <span className={`text-xs font-semibold px-2 py-0.5 rounded-full capitalize ${difficultyColor}`}>
                {challenge.difficulty}
              </span>
              {result === "correct" && (
                <CheckCircle size={16} className="text-green-500" />
              )}
            </div>
            <h3 className="font-semibold text-foreground">{challenge.title}</h3>
          </div>
        </div>
        <span className="text-muted-foreground text-lg">{isOpen ? "−" : "+"}</span>
      </button>

      {/* Content */}
      {isOpen && (
        <div className="px-5 pb-5 fade-in">
          <p className="text-muted-foreground text-sm mb-4 leading-relaxed">{challenge.description}</p>

          {/* Code Editor */}
          <div className="relative">
            <div className="absolute top-0 left-0 right-0 flex items-center justify-between px-4 py-2 bg-[hsl(222,47%,8%)] rounded-t-lg border-b border-[hsl(222,40%,18%)]">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
              </div>
              <span className="text-xs text-slate-400">Your Code</span>
            </div>
            <textarea
              value={code}
              onChange={(e) => { setCode(e.target.value); setResult(null); setFeedback(""); }}
              className="code-editor rounded-t-none pt-10 min-h-[180px]"
              spellCheck={false}
              data-testid={`challenge-${index}-editor`}
            />
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3 mt-3 flex-wrap">
            <button
              onClick={checkCode}
              className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors"
              data-testid={`challenge-${index}-check`}
            >
              Check Solution
            </button>
            <button
              onClick={() => setShowHint(!showHint)}
              className="flex items-center gap-1.5 px-4 py-2 bg-muted text-muted-foreground rounded-lg text-sm font-medium hover:bg-muted/80 transition-colors"
              data-testid={`challenge-${index}-hint`}
            >
              <Lightbulb size={14} />
              {showHint ? "Hide Hint" : "Show Hint"}
            </button>
            <button
              onClick={handleReset}
              className="px-4 py-2 text-muted-foreground rounded-lg text-sm hover:bg-muted transition-colors"
            >
              Reset
            </button>
          </div>

          {/* Hint */}
          {showHint && (
            <div className="mt-3 p-3 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg text-sm text-amber-800 dark:text-amber-300 fade-in">
              <span className="font-semibold">Hint: </span>{challenge.hint}
            </div>
          )}

          {/* Feedback */}
          {result && (
            <div className={`mt-3 p-4 rounded-lg text-sm flex items-start gap-3 fade-in
              ${result === "correct"
                ? "bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 text-green-800 dark:text-green-300"
                : "bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-800 dark:text-red-300"}`}
              data-testid={`challenge-${index}-feedback`}
            >
              {result === "correct"
                ? <CheckCircle size={18} className="flex-shrink-0 mt-0.5" />
                : <XCircle size={18} className="flex-shrink-0 mt-0.5" />
              }
              <span>{feedback}</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
