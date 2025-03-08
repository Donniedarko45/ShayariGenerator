import { GoogleGenerativeAI } from "@google/generative-ai";
import { Send } from "lucide-react";
import { useState } from "react";
import { PoetSection } from "../components/PoetSection";
import { ShayariCard } from "../components/ShayariCard";

const apiKey = import.meta.env.VITE_GOOGLE_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const generationConfig = {
  temperature: 0.7,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 65536,
  responseMimeType: "text/plain",
};

export function Home() {
  const [topic, setTopic] = useState("");
  const [shayari, setShayari] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const generateShayari = async () => {
    setIsLoading(true);
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-thinking-exp-01-21" });

      const prompt = `
- Generate a shayari inspired by this theme: '${topic}'.
- Take inspiration from famous Urdu and Hindi poets.
- Use Hinglish words while writing.
- The output should be a shayari, nothing else, and generate only one shayari at a time.
`;

      const result = await model.generateContent({
        contents: [{ role: "user", parts: [{ text: prompt }] }],
        generationConfig
      });

      console.log(result);
      const response = result.response;
      const generatedShayari = response.text();
      console.log(generatedShayari);
      setShayari(generatedShayari);
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
        <div className="flex gap-2">
          <input
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="Enter a topic or theme for your Shayari..."
            className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-transform transform hover:scale-105"
          />
          <button
            onClick={generateShayari}
            disabled={!topic || isLoading}
            className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg disabled:cursor-not-allowed flex items-center gap-2 transition-transform transform hover:scale-105"
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
