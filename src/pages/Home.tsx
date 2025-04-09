import { GoogleGenerativeAI } from "@google/generative-ai";
import { Send } from "lucide-react";
import { useState } from "react";
import { PoetSection } from "../components/PoetSection";
import { ShayariCard } from "../components/ShayariCard";
import { RandomShayariButton } from "../components/RandomShayariButton";

const apiKey = import.meta.env.VITE_GOOGLE_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const generationConfig = {
  temperature: 0.8,
  topP: 0.9,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

const randomTopics = [
  "Ishq",
  "Dard",
  "Mohabbat",
  "Zindagi",
  "Khwab",
  "Dosti",
  "Tanhai",
  "Yaad",
  "Waqt",
  "Dil"
];

export function Home() {
  const [topic, setTopic] = useState("");
  const [shayari, setShayari] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [currentRandomTopic, setCurrentRandomTopic] = useState("");

  const generateShayari = async (selectedTopic: string, isRandom: boolean = false) => {
    setIsLoading(true);
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-thinking-exp-01-21" });

      const prompt = `
Generate a beautiful shayari inspired by the theme: '${selectedTopic}'.

Guidelines:
1. Take inspiration from classical poets like Ahmed Faraz, Mirza Ghalib, Faiz Ahmed Faiz, and other renowned Urdu/Hindi poets
2. Use authentic Hindi vocabulary with proper poetic devices (tashbih, istiara, etc.)
3. Maintain the traditional shayari structure with proper meter and rhyme
4. Include at least 4-6 lines (sher)
5. The shayari should reflect deep emotions and philosophical depth
6. Include a proper matla (opening couplet) and maqta (closing couplet)
7. Use classical poetic imagery and metaphors

output should be only shayari no other words 

Generate only one complete shayari.
`;

      const result = await model.generateContent({
        contents: [{ role: "user", parts: [{ text: prompt }] }],
        generationConfig
      });

      const response = result.response;
      const generatedShayari = response.text();
      setShayari(generatedShayari);
      if (isRandom) {
        setCurrentRandomTopic(selectedTopic);
      }
    } catch (error) {
      console.error("Error generating shayari:", error);
      setShayari("Sorry, we couldn't generate a Shayari at this moment. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const generateRandomShayari = () => {
    const randomTopic = randomTopics[Math.floor(Math.random() * randomTopics.length)];
    generateShayari(randomTopic, true);
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <section className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Shayari Generator
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Create beautiful shayaris inspired by classical poets. Enter a theme or let us surprise you with a random shayari.
          </p>
        </section>

        <div className="max-w-2xl mx-auto mb-12">
          <div className="flex flex-col gap-4">
            <div className="flex gap-2">
              <input
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="Enter a topic or theme for your Shayari..."
                className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all hover:shadow-md"
              />
              <button
                onClick={() => generateShayari(topic)}
                disabled={!topic || isLoading}
                className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg disabled:cursor-not-allowed flex items-center gap-2 transition-all hover:scale-105 hover:shadow-lg hover:shadow-purple-500/50"
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
            <div className="flex justify-center">
              <RandomShayariButton onClick={generateRandomShayari} isLoading={isLoading} />
            </div>
          </div>
        </div>

        {shayari && (
          <div className="max-w-3xl mx-auto">
            <ShayariCard content={shayari} />
          </div>
        )}

        <PoetSection />
      </div>
    </main>
  );
}
