// Get data from local storage if available

// local storage keys

const LOCAL_STORAGE_TUTORIAL_KEY = "airplanes.js.am.tutorial";
const LOCAL_STORAGE_SCOREBOARD_KEY = "airplanes.js.am.scoreboard";

let lsTutorial = JSON.parse(localStorage.getItem(LOCAL_STORAGE_TUTORIAL_KEY)) || [];
let lsScoreBoard = JSON.parse(localStorage.getItem(LOCAL_STORAGE_SCOREBOARD_KEY)) || [];

let playerStats = {
    name: playerName,
    level: currentLevel,
    score: lvlOnePoints + lvlTwoPoints + lvlThreePoints + lvlFourPoints,
    tutorial: tutorial,
    date: new Date()
};


// update local storage with playerStats

function localStorageInit() {
    lsScoreBoard = JSON.parse(localStorage.getItem(LOCAL_STORAGE_SCOREBOARD_KEY)) || [];
    // get data from local storage lsScoreBoard
    playerStats.name = playerName;
    playerStats.level = currentLevel;
    playerStats.score = lvlOnePoints + lvlTwoPoints + lvlThreePoints + lvlFourPoints;
    playerStats.tutorial = tutorial;
    // date
    let date = new Date();
    date = String(date);
    date = date.substring(0, 24);
    // console.log(date);
    playerStats.date = date;
    lsScoreBoard.unshift(playerStats);
    localStorage.setItem(LOCAL_STORAGE_SCOREBOARD_KEY, JSON.stringify(lsScoreBoard));
}

function localStorageUpdate() {
    lsScoreBoard = JSON.parse(localStorage.getItem(LOCAL_STORAGE_SCOREBOARD_KEY)) || [];
    // get data from local storage lsScoreBoard
    lsScoreBoard[0].name = playerName;
    lsScoreBoard[0].level = currentLevel;
    lsScoreBoard[0].score = lvlOnePoints + lvlTwoPoints + lvlThreePoints + lvlFourPoints;
    lsScoreBoard[0].tutorial = tutorial;
    // date
    let date = new Date();
    date = String(date);
    date = date.substring(0, 24);
    // console.log(date);
    lsScoreBoard[0].date = date;
    localStorage.setItem(LOCAL_STORAGE_SCOREBOARD_KEY, JSON.stringify(lsScoreBoard));
}