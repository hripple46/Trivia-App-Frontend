import { useState, useEffect } from "react";

function Questions({ question }) {
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
        {question}
      </div>
    </>
  );
}

export default Questions;
