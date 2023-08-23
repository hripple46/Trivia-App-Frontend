import { useState, useEffect } from "react";
import "./App.css";
import Questions from "./Questions";

function App() {
  return (
    <>
      <div className=" w-full h-full flex justify-center items-center">
        <Questions />
      </div>
    </>
  );
}

export default App;
