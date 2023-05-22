import { useState } from "react";
import Image from "next/image";
import questionMark from "../public/question-mark.png";

export default function Cell({ id, answer, question, trimTags }) {
  const [isClue, setIsClue] = useState(
    <Image
      src={questionMark}
      style={{ width: "22px", height: "36px" }}
      alt="question mark"
    ></Image>
  );

  let randomColor = `rgb(${Math.floor(Math.random() * 256)} ${Math.floor(
    Math.random() * 256
  )} ${Math.floor(Math.random() * 256)})`;
  // check if clicked to clue or answer
  function handleClick() {
    setIsClue(question);
    if (isClue === null) {
      return;
    }

    if (isClue === question) {
      const trimmedAnswer = trimTags(answer);
      setIsClue(trimmedAnswer);
    } else if (isClue === answer) {
      setIsClue(null);
    }
  }
  return (
    <div
      id={id}
      className={`cell-box ${isClue === null ? "blocked" : ""}`}
      onClick={handleClick}
      style={{
        backgroundColor: randomColor,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {isClue}
    </div>
  );
}
