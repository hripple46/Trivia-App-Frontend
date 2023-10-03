export default function Score({
  score,
  results,
  visibility,
  onHide,
  score0,
  score1,
  score2,
  score3,
  score4,
  score5,
}) {
  const symbols = results
    .map((result) => (result === "Correct!" ? "✅" : "❌"))
    .join("");

  function shareScore() {
    if (navigator.share) {
      navigator
        .share({
          text: `Daily Quiz Game! \ndailyquizgame.com \n\nI got ${score} out of 5! \nHere are my results: ${symbols}`,
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
        visibility
          ? `md:w-1/2 md:h-1/3 w-full h-1/2 bg-blue-500 rounded-md text-white flex flex-col items-center sm:justify-center justify-around fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2`
          : `hidden`
      }
    >
      <h1 className="text-2xl">{score} of 5</h1>
      <button
        className="border-2 border-white p-2 rounded-md"
        onClick={shareScore}
      >
        Share Score
      </button>
      <button onClick={onHide}>Hide Score</button>
      <h1>Previous Results:</h1>
      <ul>
        <li>0 Correct: {score0}</li>
        <li>1 Correct: {score1}</li>
        <li>2 Correct: {score2}</li>
        <li>3 Correct: {score3}</li>
        <li>4 Correct: {score4}</li>
        <li>5 Correct: {score5}</li>
      </ul>
    </div>
  );
}
