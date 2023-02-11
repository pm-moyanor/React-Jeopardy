import { useEffect, useState } from "react";
import axios from "axios";

import Board from "./Board";

export default function Cell({ answer, question }) {
  const [isClue, setIsClue] = useState("?");

  function handleClick() {
    setIsClue(question);
    if(isClue === question){
        setIsClue(answer)
    }   else if(isClue === answer){
        setIsClue(null)
    }   

    console.log('clicked')
  }

  return (
    <div className="cell-box" onClick={handleClick}>
      {isClue }
    </div>
  );
}

// needed:

// fill board with question,answers
// for each category (in column)
// take randomClues and iterate to fill out every cell in Board column.
// work accross components when i move to board.js
// like >

// foreach randomClues element, update state to key question or answer onClick

// por hacer
// repasar useEffect
//useFetch??
// promises, como await chained requests
// extract objects
