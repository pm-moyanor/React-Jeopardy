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
    try {
      const res = await axios.get(`${BASE_API_URL}categories?count=100`);
      categoryIDs = res.data.map((e) => ({ id: e.id, title: e.title }));
      randomCategories = _.sampleSize(categoryIDs, 6);
    } catch (error) {
      console.log(error);
      
    }
    setCategories(randomCategories);
    getClues(randomCategories);
  }

  async function getClues(categories) {
    try {
      let lodashClues = [];
      await Promise.all(
        categories.map(async (category) => {
          const res = await axios.get(
            `${BASE_API_URL}clues?category=${category.id}`
          );
          lodashClues = [...lodashClues, ..._.sampleSize(res.data, 5)];
        })
      );
      setClues(lodashClues);
    } catch (error) {
      console.error(error);
      
    }
  }

  const handleStartGame = () => {

    getAllCategories()
 
  };

  return (
    <>
      <div >
        <h2>Jeopardy</h2>
      </div>
      <div className="board">
        {categories.map((category, index) => {
          return (
            <div className="cells-box">
              <h5 key={category.title} className="cell-box">
                {category.title}
              </h5>
              {clues
                .filter((clue) => clue.category_id === category.id)
                .map((clue) => (
                  <Cell
                    id={clue.id}
                    answer={clue.answer}
                    catId={category.id}
                    question={clue.question}
                  />
                ))}
            </div>
          );
        })}
      </div>
      <button className="restart-btn" onClick={handleStartGame}>restart</button>
    </>
  );
}

///to do:
// restart game button and clean statement for useEffect
// review useEffect, apis, return chained functions
// add css, what happens after click answer
// how to choose winner
