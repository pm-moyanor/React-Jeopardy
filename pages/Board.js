import _ from "lodash";
import axios from "axios";
import Cell from "./Cell";
import { useEffect, useState } from "react";

export default function Board() {
  const [clues, setClues] = useState([]);
  const [categories, setCategories] = useState([]);
  const BASE_API_URL = "http://jservice.io/api/";

  let randomCategoryData = [];
  let randomCategories = [];
  let randomClues = [];

  useEffect(() => {
    getAllCategories(); //get data when mounted
  }, []);

  async function getAllCategories() {
    try {
      const res = await axios.get(`${BASE_API_URL}categories?count=100`); //get 100 categories from API
      const data = res.data.filter((cat) => cat.clues_count > 5); //check if they have enough clues

      randomCategories = _.sampleSize(data, 6); //get 6 random categories from the 100

      randomCategoryData = randomCategories.map((cat) => ({
        id: cat.id,
        title: cat.title,
      })); // iterate throw the 6 and extract its name and title
    } catch (error) {
      console.log(error);
    }
    setCategories(randomCategories);

    getClues(randomCategoryData); // go get the clues for each category
  }

  async function getClues(categories) {
    try {
      //get clues for every category, using the id provided
      await Promise.all(
        categories.map(async (category) => {
          const res = await axios.get(
            `${BASE_API_URL}clues?category=${category.id}`
          );
          let cluesSample = _.sampleSize(res.data, 5); //extract 5 random clues
          randomClues = [...randomClues, ...cluesSample]; // store clues in the array
        })
      );

      setClues(randomClues);
    } catch (error) {
      console.error(error);
    }
  }

  const handleStartGame = () => {
    // reset the API fetch
    getAllCategories();
  };

  function trimTags(string){  // modifies italic tags in some data strings 
    const regex = /<i>(.*?)<\/i>/g; // function on top or close to where is used??
   return string.replace(regex, '')
  }

  return (
    <>
      <div>
        <h2>Jeopardy</h2>
      </div>
      <div className="board">
        {categories.map((category, index) => {
          // trimTags(category.title) // check for all data? or on every iteration ?
          return (
            <div className="cells-box">
              <h5 className="cell-box category-cell">{category.title}</h5>

              {clues
                .filter((clue) => clue.category_id === category.id) // take the clues that belong to the category
                .map((clue) => (

                  <Cell
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
  );
}

///to do:
// some strings have <i> tags. need to filter them
// order of rendering syncro?
// restart game button and clean statement for useEffect
// fix CSS
// review useEffect, apis, return chained functions
// add css, what happens after click answer
// how to choose winner
