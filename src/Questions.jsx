import { useState, useEffect } from "react";

function Questions({ question, correct_answer, incorrect_answers }) {
  const [active, setActive] = useState(false);
  return (
    <>
      <div
        className={`m-2 p-2 rounded-md ${
          active ? "border-blue-400 border-2" : "border-gray-400 border-2"
        }`}
        onClick={() => {
          setActive(true);
        }}
      >
        <p className=""> {question}</p>
        <p className="w-full">{correct_answer}</p>
        <ul>
          {incorrect_answers.map((answer) => {
            return <li key={answer}>{answer}</li>;
          })}
        </ul>
      </div>
    </>
  );
}

export default Questions;
