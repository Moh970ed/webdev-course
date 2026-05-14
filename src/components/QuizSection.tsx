import { useState } from "react";
import type { QuizQuestion } from "@/data/courseData";
import { CheckCircle, XCircle, RotateCcw, Trophy } from "lucide-react";

interface QuizSectionProps {
  questions: QuizQuestion[];
  title?: string;
}

export default function QuizSection({ questions, title = "Chapter Quiz" }: QuizSectionProps) {
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [submitted, setSubmitted] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const handleSelect = (questionId: string, optionIndex: number) => {
    if (submitted) return;
    setSelectedAnswers((prev) => ({ ...prev, [questionId]: optionIndex }));
  };

  const handleSubmit = () => {
    if (Object.keys(selectedAnswers).length < questions.length) {
      alert("Please answer all questions before submitting.");
      return;
    }
    setSubmitted(true);
    setShowResults(true);
  };

  const handleRetry = () => {
    setSelectedAnswers({});
    setSubmitted(false);
    setShowResults(false);
  };

  const score = submitted
    ? questions.filter((q) => selectedAnswers[q.id] === q.correctIndex).length
    : 0;

  const percentage = submitted ? Math.round((score / questions.length) * 100) : 0;

  const getScoreColor = () => {
    if (percentage >= 80) return "text-green-600 dark:text-green-400";
    if (percentage >= 60) return "text-yellow-600 dark:text-yellow-400";
    return "text-red-600 dark:text-red-400";
  };

  const getScoreLabel = () => {
    if (percentage >= 90) return "Excellent! 🎉";
    if (percentage >= 80) return "Great work!";
    if (percentage >= 70) return "Good job!";
    if (percentage >= 60) return "Keep practicing!";
    return "Keep studying and try again";
  };

  return (
    <div className="max-w-3xl mx-auto" data-testid="quiz-section">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-foreground">{title}</h2>
        <span className="text-sm text-muted-foreground">{questions.length} Questions</span>
      </div>

      {/* Score Summary */}
      {showResults && (
        <div className={`mb-8 p-6 rounded-xl border-2 text-center fade-in
          ${percentage >= 80 ? "border-green-300 bg-green-50 dark:bg-green-900/20 dark:border-green-800" :
            percentage >= 60 ? "border-yellow-300 bg-yellow-50 dark:bg-yellow-900/20 dark:border-yellow-800" :
            "border-red-300 bg-red-50 dark:bg-red-900/20 dark:border-red-800"}`}
        >
          <Trophy size={40} className={`mx-auto mb-3 ${getScoreColor()}`} />
          <div className={`text-5xl font-bold mb-1 ${getScoreColor()}`}>{percentage}%</div>
          <div className="text-xl font-semibold mb-1 text-foreground">{getScoreLabel()}</div>
          <div className="text-muted-foreground">
            You got {score} out of {questions.length} questions correct
          </div>
          <button
            onClick={handleRetry}
            className="mt-4 flex items-center gap-2 mx-auto px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors text-sm font-medium"
            data-testid="retry-quiz-btn"
          >
            <RotateCcw size={14} />
            Try Again
          </button>
        </div>
      )}

      {/* Questions */}
      <div className="space-y-6">
        {questions.map((question, qIndex) => {
          const selected = selectedAnswers[question.id];
          const isCorrect = submitted && selected === question.correctIndex;
          const isWrong = submitted && selected !== undefined && selected !== question.correctIndex;

          return (
            <div
              key={question.id}
              className={`bg-card border rounded-xl p-5 shadow-xs transition-all
                ${submitted && isCorrect ? "border-green-400 dark:border-green-600" :
                  submitted && isWrong ? "border-red-400 dark:border-red-600" :
                  "border-border"}`}
              data-testid={`quiz-question-${qIndex}`}
            >
              <div className="flex items-start gap-3 mb-4">
                <span className="flex-shrink-0 w-7 h-7 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm font-bold">
                  {qIndex + 1}
                </span>
                <p className="font-semibold text-foreground leading-relaxed">{question.question}</p>
              </div>

              <div className="space-y-2 pl-10">
                {question.options.map((option, oIndex) => {
                  const isSelected = selected === oIndex;
                  const isCorrectOption = submitted && oIndex === question.correctIndex;
                  const isWrongSelected = submitted && isSelected && oIndex !== question.correctIndex;

                  return (
                    <button
                      key={oIndex}
                      onClick={() => handleSelect(question.id, oIndex)}
                      disabled={submitted}
                      className={`w-full text-left px-4 py-3 rounded-lg border-2 transition-all text-sm
                        ${!submitted
                          ? isSelected
                            ? "border-primary bg-accent text-foreground"
                            : "border-border bg-muted/30 hover:border-primary/50 hover:bg-accent/50 text-foreground quiz-option cursor-pointer"
                          : isCorrectOption
                          ? "answer-correct border-green-400 text-foreground"
                          : isWrongSelected
                          ? "answer-wrong border-red-400 text-foreground"
                          : "border-border bg-muted/20 text-muted-foreground cursor-default"
                        }`}
                      data-testid={`quiz-option-${qIndex}-${oIndex}`}
                    >
                      <div className="flex items-center gap-3">
                        <span className={`w-5 h-5 rounded-full border flex items-center justify-center text-xs font-bold flex-shrink-0
                          ${!submitted && isSelected ? "border-primary bg-primary text-white" :
                            isCorrectOption ? "border-green-500 bg-green-500 text-white" :
                            isWrongSelected ? "border-red-500 bg-red-500 text-white" :
                            "border-muted-foreground text-muted-foreground"}`}
                        >
                          {String.fromCharCode(65 + oIndex)}
                        </span>
                        <span>{option}</span>
                        {submitted && isCorrectOption && (
                          <CheckCircle size={16} className="ml-auto text-green-500 flex-shrink-0" />
                        )}
                        {submitted && isWrongSelected && (
                          <XCircle size={16} className="ml-auto text-red-500 flex-shrink-0" />
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Explanation */}
              {submitted && (
                <div className={`mt-3 ml-10 p-3 rounded-lg text-sm fade-in
                  ${isCorrect
                    ? "bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-300"
                    : "bg-orange-50 dark:bg-orange-900/20 text-orange-800 dark:text-orange-300"}`}
                >
                  <span className="font-semibold">{isCorrect ? "✓ Correct!" : "✗ Incorrect."} </span>
                  {question.explanation}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Submit Button */}
      {!submitted && (
        <div className="mt-8 flex items-center justify-between">
          <span className="text-sm text-muted-foreground">
            {Object.keys(selectedAnswers).length}/{questions.length} answered
          </span>
          <button
            onClick={handleSubmit}
            className="px-6 py-3 bg-primary text-white rounded-xl font-semibold hover:bg-primary/90 transition-colors shadow-sm"
            data-testid="submit-quiz-btn"
          >
            Submit Quiz
          </button>
        </div>
      )}
    </div>
  );
}
