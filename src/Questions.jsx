import { useState, useEffect } from "react";
import "./App.css";
import Score from "./Score";

function Questions() {
  const [questions, setQuestions] = useState([]);
  const [results, setResults] = useState([]);
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    fetch("http://localhost:3000/questions")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setQuestions(data);
      });
  }, []);

  // Keep track of which answers have been clicked
  const [clickedAnswers, setClickedAnswers] = useState({});

  function getScore() {
    let score = 0;
    for (let i = 0; i < questions.length; i++) {
      if (questions[i].result === true) {
        score++;
      }
    }
    return score;
  }

  const displayQuestions = () => {
    return questions.map((question) => (
      <div
        className={
          !completed
            ? "border-gray-500 border-2 md:w-1/3 w-3/4 m-4"
            : completed && question.result
            ? "border-green-500 border-2 md:w-1/3 w-3/4 m-4"
            : "border-red-500 border-2 md:w-1/3 w-3/4 m-4"
        }
        key={question.question}
      >
        <p className="font-bold mb-2">
          {decodeHtmlEntities(question.question)}
        </p>
        {question.shuffledAnswers.map((answer) => (
          <p
            className={
              "hover:bg-gray-200 cursor-pointer" +
              (clickedAnswers[question.question] === answer
                ? " bg-gray-200"
                : "") +
              (completed && answer === question.correct_answer
                ? " font-bold"
                : "")
            }
            onClick={() => {
              if (answer === question.correct_answer) {
                console.log("Correct!");
                question.result = true;
              } else {
                console.log("Incorrect!");
                question.result = false;
              }
              setClickedAnswers({
                ...clickedAnswers,
                [question.question]: answer,
              });
            }}
            key={answer}
          >
            {decodeHtmlEntities(answer)}
          </p>
        ))}
      </div>
    ));
  };

  const handleSubmit = () => {
    const newResults = questions.map((question) =>
      question.result === true ? "Correct!" : "Incorrect!"
    );
    setResults(newResults);
    setCompleted(true);
    getScore();
  };

  function decodeHtmlEntities(text) {
    const textArea = document.createElement("textarea");
    textArea.innerHTML = text;
    return textArea.value;
  }

  return (
    <>
      <div className="flex flex-col justify-center items-center relative mt-2 overflow-x-clip">
        <div className="md:w-1/3 w-full  flex md:justify-between justify-around items-end">
          <h1 className="text-4xl font-bold">Daily Quiz Game!</h1>
          <p className="text-xl italic">An Ashmita G License</p>
        </div>
        {displayQuestions()}
        <div className="w-full flex justify-center">
          <button
            onClick={handleSubmit}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 mb-2 px-4 rounded"
          >
            Submit
          </button>
        </div>
        {completed && <Score score={getScore()} />}
      </div>
    </>
  );
}

export default Questions;
