import { useState } from "react";
import Image from "next/image";
import questionMark from "../public/question-mark.png";

export default function Cell({ id, answer, question, trimTags }) {
  const [isClue, setIsClue] = useState(
    <Image
      src={questionMark}
      style={{ width: "22px", height: "36px" }}
      alt="question mark"
    />
  );

  const randomColor = `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(
    Math.random() * 256
  )}, ${Math.floor(Math.random() * 256)})`;

  // Check if clicked to clue or answer
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

  // Determine the className based on the isClue value
  const cellClassName = isClue === null ? "cell-box blocked" : "cell-box";

  // Determine the style based on the isClue value
  const cellStyle = {
    backgroundColor: isClue === null ? "gray" : randomColor,
    position: "relative", // Required to position the overlay
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  // Create a translucent white overlay for question and answer states
  const overlayStyle = {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(255, 255, 255, 0.3)", // Adjust the alpha value as needed for readability
    zIndex: 1, // Ensure the overlay is above the background
  };

  // Determine the zIndex for the question and answer content
  const contentZIndex = isClue === question || isClue === answer ? 2 : 3;

  // Style for the content (question and answer)
  const contentStyle = {
    position: "relative", // Required to respect overlay's position
    zIndex: contentZIndex,
  };

  return (
    <div
      id={id}
      className={cellClassName}
      onClick={handleClick}
      style={cellStyle}
    >
      <div style={contentStyle}>{isClue}</div>
      {isClue === question || isClue === answer && <div style={overlayStyle}></div>}
    </div>
  );
}
