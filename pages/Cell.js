import { useState } from "react";

export default function Cell({ id, answer, question, trimTags }) {
  const [isClue, setIsClue] = useState("?"); // check if clicked to clue or answer

  function handleClick() {
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

  return (
    <div id={id} className="cell-box" onClick={handleClick}>
      {isClue}
    </div>
  );
}
