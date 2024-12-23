import { Book } from 'lucide-react';

const categories = [
  { name: 'Love', description: 'Romantic and heartfelt shayaris' },
  { name: 'Life', description: 'Philosophical and meaningful verses' },
  { name: 'Nature', description: 'Poetry inspired by natural beauty' },
  { name: 'Friendship', description: 'Celebrating bonds and relationships' },
  { name: 'Motivation', description: 'Inspiring and uplifting words' },
  { name: 'Sadness', description: 'Melancholic and emotional poetry' },
];

export function Categories() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-center mb-12 text-gray-800">
        Shayari Categories
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => (
          <div
            key={category.name}
            className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow cursor-pointer"
          >
            <div className="flex items-center gap-3 mb-3">
              <Book className="w-6 h-6 text-purple-600" />
              <h3 className="text-xl font-semibold text-gray-800">
                {category.name}
              </h3>
            </div>
            <p className="text-gray-600">{category.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}