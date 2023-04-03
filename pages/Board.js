

import _ from "lodash";
import axios from "axios";
import Cell from "./Cell";
import { useEffect, useState } from "react";

export default function Board() {
  const [clues, setClues] = useState([]);
  const [categories, setCategories] = useState([]);
  const BASE_API_URL = "http://jservice.io/api/";

  useEffect(() => {
    if (clues.length === 0 && categories.length === 0) {
      getAllData(); //get data when mounted
    }
  }, []);

  async function getAllData() {
    try {
      const res = await axios.get(`${BASE_API_URL}categories?count=100`); //get 100 categories from API
      const data = res.data.filter((cat) => cat.clues_count > 5); //check if they have enough clues

      let randomCategories = _.sampleSize(data, 6); //get 6 random categories from the 100

      let randomCategoryData = randomCategories.map((cat) => ({
        id: cat.id,
        title: cat.title,
      })); // iterate throw the 6 and extract its name and title

      // get clues for every category, using the id provided
      let promises = randomCategoryData.map(async (category) => {
        const res = await axios.get(
          `${BASE_API_URL}clues?category=${category.id}`
        );
        let cluesSample = _.sampleSize(res.data, 5); //extract 5 random clues
        return cluesSample.map((clue) => ({
          id: clue.id,
          answer: clue.answer,
          question: clue.question,
          categoryId: clue.category_id,
        }));
      });

      let randomClues = await Promise.all(promises);

      setCategories(randomCategoryData);
      setClues(_.flatten(randomClues));
    } catch (error) {
      console.log(error);
    }
  }

  const handleStartGame = () => {
    // reset the API fetch
    getAllData();
  };

  function trimTags(string) {
    // modifies italic tags in some data strings
    const regex = /<i>(.*?)<\/i>/g; 
    return string.replace(regex, "");
  }

  return (
    <>
      <div>
        <h2>Jeopardy</h2>
      </div>
      {categories.length > 0 && clues.length > 0 ? (
        <>
          <div className="board">
            {categories.map((category, index) => {
              return (
                <div className="cells-box" key={category.id}>
                  <h5 className="cell-box category-cell">{category.title}</h5>

                  {clues
                    .filter((clue) => clue.categoryId === category.id) // take the clues that belong to the category
                    .map((clue) => (
                      <Cell
                        key={clue.id}
                        id={clue.id}
                        answer={clue.answer}
                        question={clue.question}
                        trimTags={trimTags}
                      />
                    ))}
                </div>
              );
            })}
          </div>

          <button className="restart-btn" onClick={handleStartGame}>
            restart
          </button>
        </>
      ) : (
        <h3>loading...</h3>
      )}
    </>
  );
}

