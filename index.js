/*****************************************************************************
 * Challenge 2: Review the provided code. The provided code includes:
 * -> Statements that import data from games.js
 * -> A function that deletes all child elements from a parent element in the DOM
*/

// import the JSON data about the crowd funded games from the games.js file
import GAMES_DATA from './games.js';

// create a list of objects to store the data about the games using JSON.parse
const GAMES_JSON = JSON.parse(GAMES_DATA)

// remove all child elements from a parent element in the DOM
function deleteChildElements(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

/*****************************************************************************
 * Challenge 3: Add data about each game as a card to the games-container
 * Skills used: DOM manipulation, for loops, template literals, functions
*/
console.log(GAMES_JSON.length);

// grab the element with the id games-container
const gamesContainer = document.getElementById("games-container");

// create a function that adds all data from the games array to the page
function addGamesToPage(games) {

    // loop over each item in the data
    for (let game of games) {

        // create a new div element, which will become the game card
        const gameCard = document.createElement("div");


        // add the class game-card to the list
        gameCard.classList.add("game-card");


        // set the inner HTML using a template literal to display some info 
        gameCard.innerHTML = `
        <img class="game-img" src="${game.img}" alt="${game.name}" />
        <h2>${game.name}</h2>
        <p>${game.description}</p>
        <p>Backers: ${game.backers}</p>
        `;
        // about each game
        // TIP: if your images are not displaying, make sure there is space
        // between the end of the src attribute and the end of the tag ("/>")
        gamesContainer.appendChild(gameCard);
    }

        // append the game to the games-container

}


// call the function we just defined using the correct variable
addGamesToPage(GAMES_JSON);

// later, we'll call this function using a different list of games


/*************************************************************************************
 * Challenge 4: Create the summary statistics at the top of the page displaying the
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: arrow functions, reduce, template literals
*/

// grab the contributions card element
const contributionsCard = document.getElementById("num-contributions");

// use reduce() to count the number of total contributions by summing the backers
// Calculate the total number of individual contributions
const totalBackers = GAMES_JSON.reduce((acc, game) => acc + game.backers, 0);

// Set the inner HTML of the contributions card
contributionsCard.innerHTML = totalBackers.toLocaleString();

// set the inner HTML using a template literal and toLocaleString to get a number with commas


// grab the amount raised card, then use reduce() to find the total amount raised
const raisedCard = document.getElementById("total-raised");

// Calculate the total amount raised
const totalRaised = GAMES_JSON.reduce((acc, game) => acc + game.pledged, 0);

// Set the inner HTML of the amount raised card
raisedCard.innerHTML = `$${totalRaised.toLocaleString()}`;
// set inner HTML using template literal


// grab number of games card and set its inner HTML
const gamesCard = document.getElementById("num-games");

// Get the total number of games
const totalGames = GAMES_JSON.length;

// Set the inner HTML of the number of games card
gamesCard.innerHTML = totalGames.toLocaleString();


/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: functions, filter
*/

// show only games that do not yet have enough funding
function filterUnfundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have not yet met their goal
    // Filter games where the pledged amount is less than the goal
    const unfundedGames = GAMES_JSON.filter(game => game.pledged < game.goal);



    // Log the number of unfunded games (for debugging purposes)
    console.log(`Number of unfunded games: ${unfundedGames.length}`);
    // Add the filtered games to the page
    addGamesToPage(unfundedGames);

    // use the function we previously created to add the unfunded games to the DOM
    
}

// show only games that are fully funded
function filterFundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have met or exceeded their goal
    // Filter games where the pledged amount is greater than or equal to the goal
    const fundedGames = GAMES_JSON.filter(game => game.pledged >= game.goal);
    // Log the number of funded games (for debugging purposes)
    console.log(`Number of funded games: ${fundedGames.length}`);

    // Add the filtered games to the page
    addGamesToPage(fundedGames);

    // use the function we previously created to add unfunded games to the DOM

}



// Call the functions to see the output
filterUnfundedOnly();
filterFundedOnly();

// show all games
function showAllGames() {
    deleteChildElements(gamesContainer);

    // add all games from the JSON data to the DOM
    // Display all games
    addGamesToPage(GAMES_JSON);
}

// select each button in the "Our Games" section
const unfundedBtn = document.getElementById("unfunded-btn");
const fundedBtn = document.getElementById("funded-btn");
const allBtn = document.getElementById("all-btn");

// add event listeners with the correct functions to each button
// Add event listener to the "Unfunded" button
unfundedBtn.addEventListener("click", filterUnfundedOnly);

// Add event listener to the "Funded" button
fundedBtn.addEventListener("click", filterFundedOnly);

// Add event listener to the "All" button
allBtn.addEventListener("click", showAllGames);


/*************************************************************************************
 * Challenge 6: Add more information at the top of the page about the company.
 * Skills used: template literals, ternary operator
*/

// grab the description container
const descriptionContainer = document.getElementById("description-container");

// use filter or reduce to count the number of unfunded games
// Create a string with the number of unfunded games
const numberOfUnfundedGames = GAMES_JSON.filter(game => game.pledged < game.goal).length;
const descriptionText = `
    So far, $${totalRaised.toLocaleString()} has been raised for ${totalGames.toLocaleString()} games.
    ${numberOfUnfundedGames === 1 ? 'There is 1 game that remains unfunded.' : `There are ${numberOfUnfundedGames.toLocaleString()} games that remain unfunded.`}
`;

// Create a new paragraph element and set its inner HTML
const descriptionElement = document.createElement("p");
descriptionElement.innerHTML = descriptionText;

// Append the paragraph element to the description container
descriptionContainer.appendChild(descriptionElement);


// create a string that explains the number of unfunded games using the ternary operator


// create a new DOM element containing the template string and append it to the description container

/************************************************************************************
 * Challenge 7: Select & display the top 2 games
 * Skills used: spread operator, destructuring, template literals, sort 
 */

const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");

const sortedGames =  GAMES_JSON.sort( (item1, item2) => {
    return item2.pledged - item1.pledged;
});

// use destructuring and the spread operator to grab the first and second games
const [firstGame, secondGame, ...rest] = sortedGames;


const firstWordFirstGame = firstGame.name.split(' ')[0];
const firstWordSecondGame = secondGame.name.split(' ')[0];

console.log("First word of the most funded game:", firstWordFirstGame);
console.log("First word of the second most funded game:", firstWordSecondGame);
// Create a new element for the top-funded game
const firstGameElement = document.createElement("p");
firstGameElement.innerHTML = firstGame.name;

// Append it to the firstGameContainer
firstGameContainer.appendChild(firstGameElement);

// Create a new element for the second top-funded game
const secondGameElement = document.createElement("p");
secondGameElement.innerHTML = secondGame.name;

// Append it to the secondGameContainer
secondGameContainer.appendChild(secondGameElement);

// create a new element to hold the name of the top pledge game, then append it to the correct element

// do the same for the runner up item