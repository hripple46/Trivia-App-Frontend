import { useState, useEffect } from "react";
import "./App.css";
import Score from "./Score";

function Questions() {
  const [questions, setQuestions] = useState([]);
  const [results, setResults] = useState([]);
  const [completed, setCompleted] = useState(false);

  //adding showScore state to pass as a prop to Score component
  const [showScore, setShowScore] = useState(false);

  //question ids will be used to check if user has already answered question
  const [questionIds, setQuestionIds] = useState([]);

  //function to compare question ids to see if user has already answered question

  useEffect(() => {
    const fetchQuestions = async (retries = 3) => {
      try {
        const response = await fetch(
          "https://ancient-morning-8801.fly.dev/questions"
        );
        const data = await response.json();
        console.log(data);

        // If the data array is empty and there are retries left
        if (!data.length && retries > 0) {
          setTimeout(() => {
            fetchQuestions(retries - 1);
          }, 2000); // Wait for 2 seconds before retrying
          return;
        }

        setQuestions(data);
        //store id's in array to check if user has already answered question
        setQuestionIds(data.map((question) => question._id));
        //compare the question ids with the ids stored in local storage
        //if the question id is in the local storage, then the user has already submitted their answers for the day
      } catch (error) {
        console.error("An error occurred:", error);
        if (retries > 0) {
          setTimeout(() => {
            fetchQuestions(retries - 1);
          }, 2000); // Wait for 2 seconds before retrying
        }
      }
    };

    // Trigger the fetch operation
    fetchQuestions();
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
            ? "text-center md:w-1/3 w-3/4 m-4"
            : completed && question.result
            ? "text-center border-green-500 border-2 md:w-1/3 w-3/4 m-4 rounded-md"
            : " text-center border-red-500 border-2 md:w-1/3 w-3/4 m-4 rounded-md"
        }
        key={question.question}
      >
        <p className="font-normal mb-2 p-2 text-md md:text-xl">
          {decodeHtmlEntities(question.question)}
        </p>
        {question.shuffledAnswers.map((answer) => (
          <p
            className={
              "hover:bg-gray-200 cursor-pointer p-2 border-2 border-gray-400 rounded-md m-2" +
              (clickedAnswers[question.question] === answer
                ? " bg-gray-200"
                : "") +
              (completed && answer === question.correct_answer
                ? " font-semibold text-green-500"
                : "")
            }
            onClick={() => {
              if (!completed) {
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
              }
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
    localStorage.setItem("results", JSON.stringify(newResults));
    localStorage.setItem("ids", JSON.stringify(questionIds));
    console.log("Here's the questions array: ", questionIds);
    setShowScore(true);
  };

  function decodeHtmlEntities(text) {
    const textArea = document.createElement("textarea");
    textArea.innerHTML = text;
    return textArea.value;
  }

  return (
    <>
      <div className="flex flex-col justify-center items-center relative mt-2 ">
        <div className="mt-4 w-full   flex justify-center">
          <div className="w-full flex justify-center flex-col items-center border-b-2 pb-2 border-gray-400">
            <h1 className="md:text-4xl text-2xl font-bold">Daily Quiz Game</h1>
            <p className="md:text-md text-sm">New Questions at Midnight!</p>
          </div>
        </div>
        {displayQuestions()}
        {!questions.length && <p className="text-xl">Loading Questions...</p>}

        <div className="w-full flex justify-center">
          <button
            onClick={handleSubmit}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 mb-2 px-4 rounded"
          >
            Submit
          </button>
        </div>
        {completed && (
          <Score
            score={getScore()}
            results={results}
            visibility={showScore}
            onHide={() => setShowScore(false)}
          />
        )}
        {completed && (
          <div
            onClick={() => setShowScore(true)}
            className="p-2 rounded-md text-white text-xs fixed top-2 right-2 bg-blue-500 hover:bg-blue-700 hover:cursor-pointer"
          >
            Show Score
          </div>
        )}
      </div>
    </>
  );
}

export default Questions;
