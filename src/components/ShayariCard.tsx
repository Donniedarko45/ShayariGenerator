import { Share2, Download, Heart } from 'lucide-react';
import { useState } from 'react';

interface ShayariCardProps {
  content: string;
  author?: string;
}

export function ShayariCard({ content, author }: ShayariCardProps) {
  const [isLiked, setIsLiked] = useState(false);

  const handleShare = async () => {
    try {
      await navigator.share({
        title: 'Beautiful Shayari',
        text: content,
      });
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  const handleDownload = () => {
    const element = document.createElement('a');
    const file = new Blob([content], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = 'shayari.txt';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-6 max-w-2xl w-full mx-auto transition-transform transform hover:scale-105">
      <div className="mb-4 font-serif text-xl text-gray-800 leading-relaxed text-center">
        {content}
      </div>
      {author && (
        <div className="text-right text-gray-600 italic mb-4">- {author}</div>
      )}
      <div className="flex justify-center space-x-4 border-t pt-4">
        <button
          onClick={() => setIsLiked(!isLiked)}
          className={`p-2 rounded-full transition-colors ${
            isLiked ? 'text-red-500 bg-red-50' : 'text-gray-500 hover:bg-gray-100'
          }`}
        >
          <Heart className="w-5 h-5" fill={isLiked ? 'currentColor' : 'none'} />
        </button>
        <button
          onClick={handleShare}
          className="p-2 rounded-full text-gray-500 hover:bg-gray-100 transition-colors"
        >
          <Share2 className="w-5 h-5" />
        </button>
        <button
          onClick={handleDownload}
          className="p-2 rounded-full text-gray-500 hover:bg-gray-100 transition-colors"
        >
          <Download className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}