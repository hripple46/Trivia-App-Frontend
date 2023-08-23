import { useState, useEffect } from "react";
import "./App.css";
import Questions from "./Questions";

function App() {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    fetch("https://opentdb.com/api.php?amount=5")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setQuestions(data.results);
      });
  }, []);

  function decodeHtmlEntities(text) {
    const textArea = document.createElement("textarea");
    textArea.innerHTML = text;
    return textArea.value;
  }
  return (
    <>
      <div className="w-full h-full flex justify-center items-center">
        <ul className="max-w-sm ">
          {questions.map((question) => {
            return (
              <li
                //on click, set the background color to gray using utility classes
                //hint: use the className prop
                onClick={() => {
                  console.log("clicked");
                }}
                key={question.question}
              >
                <Questions
                  question={decodeHtmlEntities(question.question)}
                ></Questions>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}

export default App;
