# Jeopardy App

This is a Jeopardy app built with React and Next.js, using APIs to retrieve and display data.

## Installation

To run the app locally, follow these steps:

1. Clone the repository to your local machine
2. Open the terminal and navigate to the project directory
3. Run the command `npm install` to install the necessary dependencies
4. Run the command `npm run dev` to start the development server
5. Open your browser and navigate to http://localhost:3000 to view the app

## Usage

The Jeopardy app allows users to play a game of Jeopardy by selecting a category and a point value from the game board. The app retrieves data from the jService API (http://jservice.io/) and displays the corresponding clue/question. 

To select a clue, simply click on the desired point value within a category. The clue/question will be displayed in the corresponding cell. If the clue has not been previously selected, the cell will display a blue background. If the clue has been selected, the cell will display a gray background.

Clicking on a selected clue will reveal the answer. Clicking on the answer again will hide it.

In the future, a popup card will be added to display the question and answer.

## Technologies Used

- React
- Next.js
- jService API (http://jservice.io/)

## License

This project is licensed under the MIT License. See the LICENSE file for details.
