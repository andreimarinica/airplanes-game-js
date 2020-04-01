function clearViews() {
    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
            if (playerGrid[i][j] === "") {
                // If it's empty (and will be) clear the backgrounds (airplanes) and any hit marks
                document.getElementById(`${i}-${j}`).style.background = "";
                document.getElementById(`${i}-${j}`).innerHTML = "";
            }
            if (computerGrid[i][j] === "") {
                // If it's empty (and will be) clear the backgrounds (airplanes) and any hit marks
                document.getElementById(`${i}${j}`).style.background = "";
                document.getElementById(`${i}${j}`).innerHTML = "";
            }
        }
    }
    // Clear all the inserted grid cells 
    document.getElementById("playerGrid").innerHTML = "";
    document.getElementById("computerGrid").innerHTML = "";
}

function clearLevel() {
    // reset all vars to original state
    playerGrid = [
        ['', '', '', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', '', '', '']
    ];
    computerGrid = [
        ['', '', '', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', '', '', '']
    ];
    onlyOneDirection = [];
    randomHitArr = [];
    computerPlanes = [];
    playerPlanes = [];
    availableDirections = [];
    action = false;
    planeParts = 0;
    headPlaced = false;
    gameOver = false;
    playerHitCount = 0;
    computerHitCount = 0;
    playersTurn = true;
    computersTurn = false;
    waitingForReturn = false;
    ok = 0;
    //tutorial = true;
    missedRand = 0;
    holdHitCoords = [];
    haveHit = false;
    up = false;
    right = false;
    down = false;
    left = false;
    didLastOneHit = false;
    testUp = false;
    testRight = false;
    testDown = false;
    testLeft = false;
    // clear the visual design for a fresh game
    clearViews();
}

let currentLevel = 1;

function currentLevelStatus() {
    if (currentLevel === 1) {
        if (action === true) {
            clearLevel();
        }
        createRandomHitArr();
        createComputerPlanes();
        //createComputerPlanes();
        createPlayerBoard();
        createComputerBoard();
        placeTreasure();
        document.querySelector("body").style.background = `url('../img/bg1.jpg') no-repeat center center/cover`;
        updateScoreBoard();
    } else if (currentLevel === 2) {
        clearLevel();
        createRandomHitArr();
        createComputerPlanes();
        //createComputerPlanes();
        //createComputerPlanes();
        createPlayerBoard();
        createComputerBoard();
        placeTreasure();
        document.querySelector("body").style.background = `url('../img/bg2.jpg') no-repeat center center/cover`;
        updateScoreBoard();
    } else if (currentLevel === 3) {
        clearLevel();
        createRandomHitArr();
        createComputerPlanes();
        //createComputerPlanes();
        //createComputerPlanes();
        //createComputerPlanes();
        createPlayerBoard();
        createComputerBoard();
        placeTreasure();
        document.querySelector("body").style.background = `url('../img/bg3.jpg') no-repeat center center/cover`;
        updateScoreBoard();
    } else if (currentLevel === 4) {
        clearLevel();
        createRandomHitArr();
        createComputerPlanes();
        //createComputerPlanes();
        //createComputerPlanes();
        //createComputerPlanes();
        //createComputerPlanes();
        createPlayerBoard();
        createComputerBoard();
        placeTreasure();
        document.querySelector("body").style.background = `url('../img/bg3.jpg') no-repeat center center/cover`;
        updateScoreBoard();
    }
}

function nextLevel() {
    currentLevel++;
    console.log(`Current Level: ${currentLevel}`);
    currentLevelStatus();
}

function restartLevel() {
    if (currentLevel === 1) {
        lvlOnePoints = 0;
    } else if (currentLevel === 2) {
        lvlTwoPoints = 0;
    } else if (currentLevel === 3) {
        lvlThreePoints = 0;
    } else if (currentLevel === 4) {
        lvlFourPoints = 0;
    }
    currentLevelStatus();
    updateScoreBoard();
}