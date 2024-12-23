import { useState } from "react";
import { Send } from "lucide-react";
import { ShayariCard } from "../components/ShayariCard";
import { PoetSection } from "../components/PoetSection";
import { Mistral } from "@mistralai/mistralai";

const apiKey = import.meta.env.VITE_MISTRAL_API_KEY;

const client = new Mistral({ apiKey: apiKey });

export function Home() {
  const [topic, setTopic] = useState("");
  const [genre, setGenre] = useState("Romantic");
  const [shayari, setShayari] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const generateShayari = async () => {
    setIsLoading(true);
    try {
      const response = await client.chat.complete({
        model: "mistral-large-latest",
        messages: [
          {
            role: "user",
            content: `Generate a ${genre} Shayari in Hindi that is emotional and heartfelt based on the following line: '${topic}'. The Shayari should be filled with deep feelings, with a perfect blend of love and longing. Keep it soulful and poetic, with 5-6 lines that capture the essence of the topic.`,
          },
        ],
      });
      console.log("Response:", response);

      const generatedShayari = response.choices[0]?.message?.content;
      setShayari(generatedShayari as string);
    } catch (error) {
      console.error("Error generating shayari:", error);
      setShayari("Sorry, we couldn't generate a Shayari at this moment.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <section className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          Create Beautiful Shayari
        </h1>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          Generate heartfelt Shayaris based on any topic you like. Just enter a
          theme or topic, and we'll create a beautiful Shayari for you.
        </p>
      </section>

      <div className="max-w-2xl mx-auto mb-12">
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="Enter a topic or theme for your Shayari..."
            className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-transform transform hover:scale-105"
          />
          <select
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
            className="px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-transform transform hover:scale-105"
          >
            <option value="Romantic">Romantic</option>
            <option value="Sad">Sad</option>
            <option value="Motivational">Motivational</option>
            <option value="Friendship">Friendship</option>
          </select>
          <button
            onClick={generateShayari}
            disabled={!topic || isLoading}
            className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 transition-transform transform hover:scale-105"
          >
            {isLoading ? (
              "Generating..."
            ) : (
              <>
                Generate
                <Send className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      </div>

      {shayari && <ShayariCard content={shayari} />}

      <PoetSection />
    </main>
  );
}
