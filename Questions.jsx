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
      <ul>
        {questions.map((question) => {
          return (
            <li key={question.question}>
              {decodeHtmlEntities(question.question)}
            </li>
          );
        })}
      </ul>
    </>
  );
}

export default Questions;
