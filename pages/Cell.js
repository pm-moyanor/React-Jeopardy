import { useEffect, useState } from "react";
import axios from "axios";
import Board from "./Board";

export default function Cell({ id, catId, answer, question }) {
  const [isClue, setIsClue] = useState("?");


  function handleClick() {
    console.log(id);
    setIsClue(question);
    if (isClue === question) {
      setIsClue(answer);
    } else if (isClue === answer) {
      setIsClue(null);
    }
  }

  return (
    <div key={id} id={id} className="cell-box" onClick={handleClick}>
      {isClue}
    </div>
  );
}

