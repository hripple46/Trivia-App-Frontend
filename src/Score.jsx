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
  todayComplete,
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
      <button onClick={onHide}>
        <p className="underline">Hide Score</p>
      </button>
      <h1 className="xl:mt-4">Previous Scores of 5:</h1>
      <ul className="w-full flex justify-around xl:justify-evenly">
        <li className="flex flex-col justify-center items-center">
          <p className="w-4 text-center border-b-2">0</p> <div>{score0}x</div>
        </li>
        <li className="flex flex-col justify-center items-center">
          <p className="w-4 text-center border-b-2">1</p> <div>{score1}x</div>
        </li>
        <li className="flex flex-col justify-center items-center">
          <p className="w-4 text-center border-b-2">2</p> <div>{score2}x</div>
        </li>
        <li className="flex flex-col justify-center items-center">
          <p className="w-4 text-center border-b-2">3</p> <div>{score3}x</div>
        </li>
        <li className="flex flex-col justify-center items-center">
          <p className="w-4 text-center border-b-2">4</p> <div>{score4}x</div>
        </li>
        <li className="flex flex-col justify-center items-center">
          <p className="w-4 text-center border-b-2">5</p> <div>{score5}x</div>
        </li>
      </ul>
    </div>
  );
}
