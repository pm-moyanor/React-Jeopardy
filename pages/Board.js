import { fromPairs } from "lodash";
import axios from "axios";
import Cell from "./Cell";
import { useEffect, useState } from "react";

export default function Board() {
  const [clues, setClues] = useState([]);
  const BASE_API_URL = "http://jservice.io/api/";

  let categoryIDs = [];
  let randomCategories = [];
  let randomClues = [];
  let arr = [];
  let testArray = [1, 2, 3, 4, 5, 6];

  useEffect(() => {
    let finalCut = getAllCategories();
  }, []);

  async function getAllCategories() {
    const response = await axios.get(`${BASE_API_URL}categories?count=100`);
    categoryIDs = response.data.map((e) => e.id);
    randomCategories = _.sampleSize(categoryIDs, 6);
    getClues();
    //return randomCategories
  }

  async function getClues() {
    let cluesData = await Promise.all(
      randomCategories.map((categoryID) => {
        getRandomClues(categoryID);
      })
    );
    console.log(cluesData);
    return cluesData;
  }

  async function getRandomClues(id) {
    let response = await axios.get(`${BASE_API_URL}clues?category=${id}`);
    randomClues = _.sampleSize(response.data, 5);
  }

  return (
    <div className="board">
      <div className="header">
        {testArray.map((category) => {
          return (
            <div className="container">
              
              <div className="cells-box">
              <h3 className="cell-box">category</h3>
                <Cell />
                <Cell />
                <Cell />
                <Cell />
                <Cell />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
