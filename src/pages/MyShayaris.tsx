import { ShayariCard } from '../components/ShayariCard';

const savedShayaris = [
  {
    content: "Zindagi ke safar mein guzar jaate hain jo makaam\nWo phir nahi aate, wo phir nahi aate",
    author: "You"
  },
  {
    content: "Dil ke armaan aansuon mein beh gaye\nPyaar ke nagme saanson mein reh gaye",
    author: "You"
  }
];

export function MyShayaris() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-center mb-12 text-gray-800">
        My Saved Shayaris
      </h1>
      <div className="space-y-8">
        {savedShayaris.map((shayari, index) => (
          <ShayariCard
            key={index}
            content={shayari.content}
            author={shayari.author}
          />
        ))}
      </div>
    </div>
  );
}