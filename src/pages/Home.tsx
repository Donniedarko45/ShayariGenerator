import { useState } from "react";
import { Send } from "lucide-react";
import { ShayariCard } from "../components/ShayariCard";
import { PoetSection } from "../components/PoetSection";
import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.REACT_APP_OPENAI_API_KEY, // Use environment variables for security
});

const openai = new OpenAIApi(configuration);
export function Home() {
  const [topic, setTopic] = useState("");
  const [shayari, setShayari] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const generateShayari = async () => {
    setIsLoading(true);
    try {
      const response = await openai.createCompletion({
        model: "text-davinci-003", // Use gpt-3.5-turbo for cost efficiency or gpt-4 for higher quality
        prompt:
          "Generate a romantic Shayari in Hindi. Keep it emotional and short.",
        max_tokens: 100, // Adjust as needed for Shayari length
        temperature: 0.7, // Creativity level
      });

      const generatedShayari = response.data.choices[0].text.trim();
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
          Let AI help you craft meaningful and heartfelt Shayari in seconds
        </p>
      </section>

      <div className="max-w-2xl mx-auto mb-12">
        <div className="flex gap-2">
          <input
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="Enter a topic or theme for your Shayari..."
            className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
          <button
            onClick={generateShayari}
            disabled={!topic || isLoading}
            className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
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

