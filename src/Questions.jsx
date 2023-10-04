import { useState, useEffect } from "react";
import "./App.css";
import Score from "./Score";

function Questions() {
  const [questions, setQuestions] = useState([]);
  const [results, setResults] = useState([]);
  const [completed, setCompleted] = useState(false);
  const [showTodayCompleted, setShowTodayCompleted] = useState(false);

  const [score, setScore] = useState(0);

  const [score0, setScore0] = useState(0);
  const [score1, setScore1] = useState(0);
  const [score2, setScore2] = useState(0);
  const [score3, setScore3] = useState(0);
  const [score4, setScore4] = useState(0);
  const [score5, setScore5] = useState(0);

  //adding showScore state to pass as a prop to Score component
  const [showScore, setShowScore] = useState(false);

  const [showCorrectAnswers, setShowCorrectAnswers] = useState(false);

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

  useEffect(() => {
    getPreviousScores();
  }, []);

  useEffect(() => {
    //chec if todays date is on local storage
    if (localStorage.getItem(date)) {
      setShowTodayCompleted(true);
      setScore(localStorage.getItem(date));
      setResults(JSON.parse(localStorage.getItem("results")));
      setCompleted(true);
      setShowScore(true);
    }
  }, []);

  // Keep track of which answers have been clicked
  const [clickedAnswers, setClickedAnswers] = useState({});

  function getScore() {
    let newScore = 0;
    for (let i = 0; i < questions.length; i++) {
      if (questions[i].result === true) {
        newScore++;
      }
    }
    console.log("Here's the new score: ", newScore);
    setScore(newScore);
    localStorage.setItem(date, newScore);
  }

  const displayQuestions = () => {
    return questions.map((question) => (
      <div
        className={
          !completed || !showCorrectAnswers
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
              (completed &&
              showCorrectAnswers &&
              answer === question.correct_answer
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
    setShowCorrectAnswers(true);
    localStorage.setItem("results", JSON.stringify(newResults));
    localStorage.setItem("ids", JSON.stringify(questionIds));

    console.log("Here's the questions array: ", questionIds);
    setShowScore(true);
  };
  // Set the timezone to Eastern Standard Time (EST)
  const estTimezone = "America/New_York";

  // Get the current date and time in EST
  const date = new Date().toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: estTimezone, // Specify the EST timezone
  });

  function decodeHtmlEntities(text) {
    const textArea = document.createElement("textarea");
    textArea.innerHTML = text;
    return textArea.value;
  }

  function getPreviousScores() {
    // Check if localStorage is supported in the browser
    if (typeof localStorage !== "undefined") {
      // Create an empty object to store filtered items
      var filteredItems = {};

      // Iterate through localStorage keys
      for (var i = 0; i < localStorage.length; i++) {
        var key = localStorage.key(i);
        var value = localStorage.getItem(key);

        // Check if the key starts with the name of a month
        var months = [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December",
        ];

        for (var j = 0; j < months.length; j++) {
          var month = months[j];
          if (key.startsWith(month)) {
            // Add the key-value pair to the filteredItems object
            filteredItems[key] = value;
            break; // Exit the inner loop once a match is found
          }
        }
      }

      // Now filteredItems contains items with keys starting with a month
      console.log(filteredItems);
      //tally up the the # of times, the score was 0,1,2,3,4, or 5
      let score0 = 0;
      let score1 = 0;
      let score2 = 0;
      let score3 = 0;
      let score4 = 0;
      let score5 = 0;

      for (let key in filteredItems) {
        if (filteredItems[key] === "0") {
          score0++;
        } else if (filteredItems[key] === "1") {
          score1++;
        } else if (filteredItems[key] === "2") {
          score2++;
        } else if (filteredItems[key] === "3") {
          score3++;
        } else if (filteredItems[key] === "4") {
          score4++;
        } else if (filteredItems[key] === "5") {
          score5++;
        }
      }
      setScore0(score0);
      setScore1(score1);
      setScore2(score2);
      setScore3(score3);
      setScore4(score4);
      setScore5(score5);
    } else {
      console.log("localStorage is not supported in this browser.");
    }
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
          {!completed && (
            <button
              onClick={handleSubmit}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 mb-2 px-4 rounded"
            >
              Submit
            </button>
          )}
        </div>
        {completed && (
          <Score
            todayComplete={showTodayCompleted}
            score={score}
            results={results}
            visibility={showScore}
            onHide={() => setShowScore(false)}
            score0={score0}
            score1={score1}
            score2={score2}
            score3={score3}
            score4={score4}
            score5={score5}
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
