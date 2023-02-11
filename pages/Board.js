import _ from "lodash";
import axios from "axios";
import Cell from "./Cell";
import { useEffect, useState } from "react";




export default function Board() {
  const [clues, setClues] = useState([]);
  const [categories, setCategories] = useState([]);
  const BASE_API_URL = "http://jservice.io/api/";

  let categoryIDs = [];
  let randomCategories = [];
  let randomClues = [];

  useEffect(() => {
    getAllCategories();
  }, []);

  async function getAllCategories() {
    await axios.get(`${BASE_API_URL}categories?count=100`).then((res) => {
      categoryIDs = res.data.map((e) => ({ id: e.id, title: e.title }));
      randomCategories = _.sampleSize(categoryIDs, 6);
    });

    setCategories(randomCategories);
    getClues(randomCategories);
  }

  async function getClues(categories) {
    let cluesData = await Promise.all(
      categories.map(async (category) => {
        await axios
          .get(`${BASE_API_URL}clues?category=${category.id}`)
          .then((res) => {
            randomClues = randomClues.concat(_.sampleSize(res.data, 5));
          });
      })
    );
    setClues(randomClues);
  }

  return (
    <div className="board">
      <div className="header">
        {categories.map((category, index) => {
          return (
            <div className="container">
              <div className="cells-box">
                <h5 className="cell-box">{category.title}</h5>
                {clues.slice(index * 5, (index + 1) * 5).map((clue) => (
                  <Cell answer={clue.answer} question={clue.question}/>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}


///to do:
// onClick change state from ? to clue.question to clue.answer
// set button onClick for restarting game