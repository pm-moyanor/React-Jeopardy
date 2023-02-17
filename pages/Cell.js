import { useEffect, useState } from "react";
import axios from "axios";
import Board from "./Board";

export default function Cell({ id, answer, question,trimTags }) {
  const [isClue, setIsClue] = useState("?"); // check if clicked to clue or answer

  function handleClick() { // error no frena la function 
    setIsClue(question);
    if (isClue === null) {
      return;
    }

    if (isClue === question) {
      setIsClue(answer);
    } else if (isClue === answer) {
      setIsClue(null);
    }
  }
s
  return (
    <div id={id} className="cell-box" onClick={handleClick}>
      {isClue}
    </div>
  );
}
