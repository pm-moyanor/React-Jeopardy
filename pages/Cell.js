import { useEffect, useState } from "react";
import axios from "axios";
import _, { forEach } from "lodash";
import Board from "./Board";

export default function Cell() {


//   function handleClick() {
//     getClues();
//   }
//   function fillBoard(clues) {
//     console.log(clues);
//   }

  //console.log(clues[0])
  //   return (

return(
<td className="cell-box">?</td>
)


    
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
