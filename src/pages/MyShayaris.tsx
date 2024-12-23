import { ShayariCard } from "../components/ShayariCard";

const savedShayaris = [
  {
    content:
      "Har ek vasiyat meri khudai si lage\nJo lafz tumse jud jaaye, wo dua si lage.\nJane anjane mein jo baatein tumse likhwate,\nWo har kahaani tumhari parchai si lage.\nZindagi ke safar mein tum dastaan ban jao,\nMeri har khata ka tum afsana ban jao.\nJo dil se likhi hai wo mohabbat hai meri,\nHar ek vasiyat bas tumhara naam paaye, ye khwaish bn jaye meri",
    author: "You",
  },
  {
    content:
      "तुम मेरी वो ख्वाहिश हो, जो मैं कभी पा नहीं सकूंगा, एक सितारा है तुम, जो मेरे हाथ से दूर है सदा। चांदनी रात में भी, तुम्हारी रोशनी मुझे अंधेरा दिखाती है, तुम्हारे बिना मेरी जिंदगी, एक बेरंग तस्वीर है। तुम मेरे सपनों में आकर, मुझे जगाती हो बार-बार, पर हकीकत में तुम, मेरे लिए एक दूर का सितारा हो। तुम्हारी यादों में खोकर, मैं अपने आप को पाता हूं, तुम मेरी वो ख्वाहिश हो, जो मैं कभी पा नहीं सकूंगा।",
    author: "You",
  },
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

