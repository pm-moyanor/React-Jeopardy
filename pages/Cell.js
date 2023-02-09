import { useEffect, useState } from "react";
import axios from "axios";
import _ from 'lodash'

export default function Cell() {
  const [question, setQuestion] = useState("");
  const BASE_API_URL = "http://jservice.io/api/";
  const NUM_CATEGORIES = 6;
  const NUM_CLUES_PER_CAT = 5;
  let categoryIDs = [];
  let ranCat = Math.floor(Math.random() * 6);
  let arr = [];
  let clues = [];

  useEffect(() => {
    async function getAllCategories() {
      await axios.get(`${BASE_API_URL}categories?count=100`).then((res) => {
        res.data.forEach((category) => categoryIDs.push(category.id));
        return _.sampleSize(categoryIDs, NUM_CATEGORIES)
      });
    //console.log(_.sampleSize(categoryIDs, NUM_CATEGORIES))

      async function getCluesRandomC() {
        const res = await axios.get(
          `${BASE_API_URL}clues?category=${categoryIDs[ranCat]}`
        );
        clues = res.data;

        let randomClues = _.sampleSize(clues, NUM_CLUES_PER_CAT)
        //return  _.sampleSize(clues, NUM_CLUES_PER_CAT)
        let pistas = randomClues.map(c => ({
            question: c.question,
            answer: c.answer,
            showing: null,
          }));
          return { title: clues.title, pistas };
       
      }
      getCluesRandomC();
     
    }

  
    console.log(getAllCategories())
  },[]);

  function handleClick() {
    setQuestion();
    console.log(question);
  }

  return (
    <div className="cell-box" onClick={handleClick}>
      <h2>?</h2>
    </div>
  );
}
