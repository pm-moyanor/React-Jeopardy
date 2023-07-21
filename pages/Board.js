import React, { useState, useEffect } from "react";
import _ from "lodash";
import axios from "axios";
import Cell from "./Cell";
import styles from "../styles/Board.module.css";
import Image from "next/image";
import downIcon from "../public/down-filled-triangular-arrow.png";

const BASE_API_URL = "http://jservice.io/api/";

export default function Board() {
  const [clues, setClues] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchData(); // Fetch data when the component mounts
  }, []);

  async function fetchData() {
    try {
      const res = await axios.get(`${BASE_API_URL}categories?count=100`);
      const data = res.data.filter((cat) => cat.clues_count > 5);
      let randomCategories = _.sampleSize(data, 6);
      let randomCategoryData = randomCategories.map((cat) => ({
        id: cat.id,
        title: cat.title,
      }));

      let promises = randomCategoryData.map(async (category) => {
        const res = await axios.get(
          `${BASE_API_URL}clues?category=${category.id}`
        );
        let cluesSample = _.sampleSize(res.data, 5);
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
      setIsLoading(false);
    } catch (error) {
      if (error.response && error.response.status === 429) {
        // Retry the request after a delay (e.g., 2 seconds)
        setTimeout(() => fetchData(), 2000);
      } else {
        console.log(error);
        setIsLoading(false);
      }
    }
  }

  const handleStartGame = () => {
    setIsLoading(true);
    fetchData();
  };

  function trimTags(string) {
    const regex = /<i>(.*?)<\/i>/g;
    return string.replace(regex, "");
  }

  return (
    <div className={styles.mainContainer}>
      {isLoading ? (
        <div className={styles.loadingMsg}>LOADING...</div>
      ) : (
        // Check both categories and clues before rendering the board
        categories.length > 0 && clues.length > 0 && (
          <>
            <div className={styles.board}>
              {categories.map((category, index) => {
                return (
                  <div className="cells-box" key={category.id}>
                    <div className={styles.tops}>
                      {" "}
                      <h5 className="cell-box category-cell">
                        {category.title}
                      </h5>
                      <Image
                        src={downIcon}
                        style={{ width: "16px", height: "22px" }}
                        alt="arrow down"
                      />
                    </div>

                    {clues
                      .filter((clue) => clue.categoryId === category.id)
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
        )
      )}
    </div>
  );
}
