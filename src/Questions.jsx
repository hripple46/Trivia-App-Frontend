import { useState, useEffect } from "react";

function Questions() {
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
      <ul className="max-w-sm ">
        {questions.map((question) => {
          return (
            <li
              className="border-2 border-gray-400 rounded-md m-2 p-2"
              key={question.question}
            >
              <div>{decodeHtmlEntities(question.question)}</div>
            </li>
          );
        })}
      </ul>
    </>
  );
}

export default Questions;
