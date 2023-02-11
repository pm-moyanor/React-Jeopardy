import { useEffect, useState } from "react";
import axios from "axios";

import Board from "./Board";

export default function Cell({ clue, catId,answer, question }) {
  const [isClue, setIsClue] = useState("?");
 // console.log(catId , clue)

  function handleClick() {
    setIsClue(question);
    if (isClue === question) {
      setIsClue(answer);
    } else if (isClue === answer) {
      setIsClue(null);
    }
  }

  return (
    <div className="cell-box" onClick={handleClick}>
      {isClue}
    </div>
  );
}
