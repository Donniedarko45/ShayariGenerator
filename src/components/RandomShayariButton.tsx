import { Sparkles } from "lucide-react";

interface RandomShayariButtonProps {
  onClick: () => void;
  isLoading: boolean;
}

export function RandomShayariButton({ onClick, isLoading }: RandomShayariButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={isLoading}
      className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg disabled:cursor-not-allowed flex items-center gap-2 transition-all hover:scale-105 hover:shadow-lg hover:shadow-indigo-500/50"
    >
      {isLoading ? (
        "Generating..."
      ) : (
        <>
          Random Shayari
          <Sparkles className="w-4 h-4" />
        </>
      )}
    </button>
  );
} 