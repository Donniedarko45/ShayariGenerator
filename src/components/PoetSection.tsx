interface Poet {
  name: string;
  image: string;
  bio: string;
  famousWork: string;
}

const poets: Poet[] = [
  {
    name: "Mirza Ghalib",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=400&h=400&fit=crop",
    bio: "One of the most influential poets of the Urdu language",
    famousWork: "Dil-e-nadaan tujhe hua kya hai..."
  },
  {
    name: "Faiz Ahmad Faiz",
    image: "https://images.unsplash.com/photo-1552058544-f2b08422138a?q=80&w=400&h=400&fit=crop",
    bio: "Revolutionary poet known for his progressive writings",
    famousWork: "Gulon mein rang bhare..."
  },
  {
    name: "Mir Taqi Mir",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=400&h=400&fit=crop",
    bio: "Known as the God of Urdu poetry (Khuda-e-Sukhan)",
    famousWork: "Dikhai diye yun ke bekhud kiya..."
  }
];

export function PoetSection() {
  return (
    <section className="py-12 bg-gradient-to-br from-purple-50 to-pink-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
          Legendary Poets
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {poets.map((poet) => (
            <div
              key={poet.name}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              <img
                src={poet.image}
                alt={poet.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="font-bold text-xl mb-2 text-gray-800">{poet.name}</h3>
                <p className="text-gray-600 mb-4">{poet.bio}</p>
                <div className="italic text-gray-700 border-l-4 border-purple-500 pl-4">
                  "{poet.famousWork}"
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}