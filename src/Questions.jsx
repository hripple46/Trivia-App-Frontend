import { useState, useEffect } from "react";
import "./App.css";

function Questions() {
  const [questions, setQuestions] = useState([]);
  const [results, setResults] = useState([]);
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    fetch("https://opentdb.com/api.php?amount=5")
      .then((response) => response.json())
      .then((data) => {
        const shuffledQuestions = data.results.map((question) => {
          const allAnswers = [
            ...question.incorrect_answers,
            question.correct_answer,
          ];
          question.shuffledAnswers = shuffle([...allAnswers]);
          return question;
        });
        setQuestions(shuffledQuestions);
      });
  }, []);

  const [clickedAnswers, setClickedAnswers] = useState({});

  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  const displayQuestions = () => {
    return questions.map((question) => (
      <div
        className={
          !completed
            ? "border-gray-500 border-2 w-1/3 m-4"
            : completed && question.result
            ? "border-green-500 border-2 w-1/3 m-4"
            : "border-red-500 border-2 w-1/3 m-4"
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
  };

  function decodeHtmlEntities(text) {
    const textArea = document.createElement("textarea");
    textArea.innerHTML = text;
    return textArea.value;
  }

  return (
    <>
      <div className="flex flex-col justify-center items-center relative mt-2">
        <h1 className="text-4xl font-bold">Trivia!</h1>
        {displayQuestions()}
        <div className="w-full flex justify-center">
          <button
            onClick={handleSubmit}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Submit
          </button>
        </div>
      </div>
    </>
  );
}

export default Questions;
