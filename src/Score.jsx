import { useEffect, useState } from "react";

export default function Questions({ score, results }) {
  const [showScore, setShowScore] = useState(true);

  const symbols = results
    .map((result) => (result === "Correct!" ? "✅" : "❌"))
    .join("");

  function shareScore() {
    if (navigator.share) {
      navigator
        .share({
          title: "My Quiz Score",
          text: `I got ${score} out of 5! Here are my results: ${symbols}`,
          url: "https://dailyquizgame.com",
        })
        .then(() => console.log("Shared!"))
        .catch((error) => console.log(error));
    } else {
      console.log("Web Share API not supported in your browser");
    }
  }

  return (
    <div
      className={
        showScore
          ? `md:w-1/2 md:h-1/3 w-3/4 h-1/4 bg-blue-500/75 rounded-md text-white flex flex-col items-center sm:justify-center justify-between fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2`
          : `hidden`
      }
    >
      {" "}
      <h1 className="text-2xl">{score} of 5</h1>
      <button
        className="border-2 border-white p-2 rounded-md"
        onClick={() => shareScore()}
      >
        Share Score
      </button>
      <button onClick={() => setShowScore(false)}>Hide Score</button>
    </div>
  );
}
