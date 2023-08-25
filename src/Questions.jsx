import { useState, useEffect } from "react";
import "./App.css";

function Questions() {
  const [questions, setQuestions] = useState([]);
  const [results, setResults] = useState([]);

  useEffect(() => {
    fetch("https://opentdb.com/api.php?amount=5")
      .then((response) => response.json())
      .then((data) => {
        setQuestions(data.results);
      });
  }, []);

  const displayQuestions = () => {
    return questions.map((question) => {
      return (
        <div key={question.question}>
          <p>{decodeHtmlEntities(question.question)}</p>
          {question.incorrect_answers.map((answer) => {
            return (
              <p
                onClick={() => {
                  console.log("Incorrect!");
                  question.result = false;
                }}
                key={answer}
              >
                {decodeHtmlEntities(answer)}
              </p>
            );
          })}
          <p
            onClick={() => {
              console.log("Correct!");
              question.result = true;
            }}
          >
            {decodeHtmlEntities(question.correct_answer)}
          </p>
        </div>
      );
    });
  };

  const handleSubmit = () => {
    const newResults = questions.map((question) =>
      question.result === true ? "Correct!" : "Incorrect!"
    );
    setResults(newResults);
  };

  function decodeHtmlEntities(text) {
    const textArea = document.createElement("textarea");
    textArea.innerHTML = text;
    return textArea.value;
  }

  return (
    <>
      <div className="w-full h-full flex flex-col justify-center items-center relative">
        {displayQuestions()}
        <div className="absolute bottom-0 w-full flex justify-center">
          <button
            onClick={handleSubmit}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Submit
          </button>
          {results.map((result, index) => (
            <p key={index}>{result}</p>
          ))}
        </div>
      </div>
    </>
  );
}

export default Questions;
