import { useEffect, useState } from "react";
import axios from "axios";
import _, { forEach } from "lodash";
import Board from "./Board";

export default function Cell() {
  const [question, setQuestion] = useState("");
  const BASE_API_URL = "http://jservice.io/api/";

  let categoryIDs = [];
  let randomCategories = "";
  let clues = [];
  let randomClues = useEffect(() => {
    getAllCategories();
  }, []);

  async function getAllCategories() {
    await axios.get(`${BASE_API_URL}categories?count=100`).then((res) => {
      let arr = res.data;
      categoryIDs = arr.map((e) => e.id);
      randomCategories = _.sampleSize(categoryIDs, 6);
      return randomCategories;
    });
  }

  async function getRandomClues(id) {
    let t = await axios.get(`${BASE_API_URL}clues?category=${id}`);
    let clues = t.data;
    let randomClues = _.sampleSize(clues, 5);
    console.log(randomClues);
    return randomClues;
  }

  async function getClues() {
    let cluesArr = await Promise.all(
      randomCategories.map((category) => {
        getRandomClues(category);
      })
    );
  }

  function handleClick() {
    getClues();
  }

  return (
    <div className="cell-box" onClick={handleClick}>
      <h2>?</h2>
    </div>
  );
}

// needed:

// fill board with question,answers
// for each category (in column)
// take randomClues and iterate to fill out every cell in Board column.

// like >

// foreach randomClues element, update state to key question or answer onClick


// por hacer
// repasar useEffect
// promises, como await chained requests 
// extract objects

