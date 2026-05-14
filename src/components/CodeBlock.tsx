interface CodeBlockProps {
  code: string;
  language?: string;
  explanation?: string;
}

export default function CodeBlock({ code, language = "code", explanation }: CodeBlockProps) {
  const handleCopy = () => {
    navigator.clipboard.writeText(code);
  };

  return (
    <div className="my-4 rounded-xl overflow-hidden border border-border shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2 bg-[hsl(222,47%,10%)] border-b border-[hsl(222,40%,18%)]">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500/70" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
            <div className="w-3 h-3 rounded-full bg-green-500/70" />
          </div>
          <span className="text-xs text-slate-400 font-mono ml-2">{language}</span>
        </div>
        <button
          onClick={handleCopy}
          className="text-xs text-slate-400 hover:text-white transition-colors px-2 py-1 rounded hover:bg-white/10"
          data-testid="copy-code-btn"
        >
          Copy
        </button>
      </div>

      {/* Code */}
      <pre className="code-block rounded-none border-0 text-sm leading-relaxed overflow-x-auto">
        <code>{code}</code>
      </pre>

      {/* Explanation */}
      {explanation && (
        <div className="px-4 py-3 bg-blue-50 dark:bg-blue-900/20 border-t border-blue-100 dark:border-blue-900/40">
          <p className="text-sm text-blue-800 dark:text-blue-300">
            <span className="font-semibold">Explanation: </span>
            {explanation}
          </p>
        </div>
      )}
    </div>
  );
}
