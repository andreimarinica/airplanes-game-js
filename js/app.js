let grid = document.querySelector(".human-grid");
let gridComp = document.querySelector(".computer-grid");
let gridItem = document.createElement("div");
gridItem.className = "grid-item";

let playerGrid = [
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
let computerGrid = [
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
let randomHitArr = [];
let computerPlanes = [];
let playerPlanes = [];
let availableDirections = [];
let action = false;
let planeParts = 0;
let headPlaced = false;
let gameOver = false;
let playerHitCount = 0;
let computerHitCount = 0;
let playersTurn = true;
let computersTurn = false;
let playerName = "Player 1";
let waitingForReturn = false;
let ok = 0;
let tutorial = true;

createRandomHitArr();
createComputerBoard();
createComputerBoard();
createPlayerBoard();
showComputerBoard();

// MODAL
let modal = document.getElementById("myModal");
let modalText = document.getElementById("modal-text");
window.addEventListener('click', function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
});
// MODAL

if (tutorial === true) {
    setTimeout(modalMessage, 100, "DRAW PLANES", "Click or touch an empty area from the first canvas (your canvas). This will be the head of your plane.", "It will show all available directions (green tiles). Continue by clicking in each cell of the chosen plane.");
}

function closeModal() {
    modal.style.display = "none";
}


function tutorialOn() {
    tutorial = true;
    closeModal();
}

function tutorialOff() {
    tutorial = false;
    closeModal();
}

function createRandomHitArr() {
    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
            randomHitArr.unshift([i, j]);
        }
    }
}

function checkGameOver(gridT) {
    let counter = 0;
    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
            if (gridT[i][j] === "X" || gridT[i][j] === "O") {
                counter++;
            }
        }
    }
    if (counter === 0) {
        gameOver = true;
        checkWinner(playerGrid, computerGrid);
    } else {
        gameOver = false;
    }
}

function checkWinner(gridA, gridB) {
    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
            if (gridA[i][j] === "X" || gridA[i][j] === "O") {
                modalText.innerHTML = `
                <h1>GAME OVER</h1>
                <p>${playerName}'s missles destroyed all the planes!</p>
                <p>${playerName} won.</p>
                <a href="avionase.html" class="play-again">PLAY AGAIN</a>`;
                modal.style.display = "flex";
                break;
            }
            if (gridB[i][j] === "X" || gridB[i][j] === "O") {
                modalText.innerHTML = `
                <p>GAME OVER!!!</p>
                <p>Computer's missles destroyed all the planes!</p>
                <p>Computer won.</p>
                <a href="avionase.html" class="play-again">PLAY AGAIN</a>`;
                modal.style.display = "flex";
                break;
            }
        }
    }
}

function createPlayerBoard() {
    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
            gridItem.id = `${i}-${j}`;
            grid.appendChild(gridItem.cloneNode(true));
            let selectedItem = document.getElementById(`${i}-${j}`);
            selectedItem.addEventListener("click", startGame);
        }
    }
}

function showComputerBoard() {
    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
            gridItem.id = `${i}${j}`;
            gridComp.appendChild(gridItem.cloneNode(true));
            let selectedItem = document.getElementById(`${i}${j}`);
            selectedItem.addEventListener("click", hit);
        }
    }
}

function drawComputerHitMap() {
    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
            if (computerGrid[i][j] === 3) {
                document.getElementById(`${i}${j}`).style.background = "#00b8b8";
            }
            if (computerGrid[i][j] === 2) {
                document.getElementById(`${i}${j}`).style.background = "#00b8b8";
            }
        }
    }
}

function createComputerBoard() {
    let checkRandom = false;
    while (checkRandom === false) {
        let x = Math.floor(Math.random() * 10);
        let y = Math.floor(Math.random() * 10);
        showAvailableDirections(x, y, computerGrid);
        let direction = Math.floor(Math.random() * availableDirections.length);
        if (availableDirections != "" && computerGrid[x][y] === "") {
            computerGrid[x][y] = "O";
            computerPlanes.push([x, y]);
            for (let j = 0; j < 14; j += 2) {
                // availableDirections is an array with maximum 4 positions which reflect UP DOWN LEFT RIGHT
                // this will take a random direction availableDirections[RANDOM][ALL COORDS TO FORM AIRPLANE]
                if (availableDirections[direction][j + 1] != null) {
                    computerGrid[availableDirections[direction][j]][availableDirections[direction][j + 1]] = "X";
                    computerPlanes.push([availableDirections[direction][j], availableDirections[direction][j + 1]]);
                    checkRandom = true;
                }
            }
        }
        availableDirections = [];
    }
}


function playerHit(coordX, coordY) {
    if (computerGrid[coordX][coordY] === "X") {
        document.getElementById(`${coordX}${coordY}`).innerHTML = `<i class="fas fa-plane"></i>`;
        computerGrid[coordX][coordY] = 2;
        drawComputerHitMap();
        playersTurn = false;
        computersTurn = true;
        playerHitCount++;
    } else if (computerGrid[coordX][coordY] === "O") {
        // if head hit :: check which plane and draw the whole plane
        if (computerPlanes[0][0] === coordX && computerPlanes[0][1] === coordY) {
            for (i = 0; i < 8; i++) {
                document.getElementById(`${computerPlanes[i][0]}${computerPlanes[i][1]}`).innerHTML = `<i class="fas fa-plane"></i>`;
                computerGrid[computerPlanes[i][0]][computerPlanes[i][1]] = 2;
                drawComputerHitMap();
            }
        }
        if (computerPlanes[8][0] === coordX && computerPlanes[8][1] === coordY) {
            for (i = 8; i < 16; i++) {
                document.getElementById(`${computerPlanes[i][0]}${computerPlanes[i][1]}`).innerHTML = `<i class="fas fa-plane"></i>`;
                computerGrid[computerPlanes[i][0]][computerPlanes[i][1]] = 2;
                drawComputerHitMap();
            }
        }
        drawComputerHitMap();
        checkGameOver(computerGrid);
        if (gameOver === false) {
            playersTurn = false;
            computersTurn = true;
            playerHitCount++;
        }
    } else {
        document.getElementById(`${coordX}${coordY}`).innerHTML = `<span>X</span>`;
        if (gameOver === false) {
            computerGrid[coordX][coordY] = 1;
            playersTurn = false;
            computersTurn = true;
            playerHitCount++;
        }
    }
    waitingForReturn = false;
}

function removeHitArrLocations() {
    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
            if (playerGrid[i][j] === 1) {
                for (let n = 0; n < randomHitArr.length; n++) {
                    if (randomHitArr[n][0] === i && randomHitArr[n][1] === j) {
                        randomHitArr.splice(n, 1);
                    }
                }
            }
        }
    }
}

function computerHit() {
    // optimize random algorithm as if the game progresses too much random will fail
    let x = Math.floor(Math.random() * randomHitArr.length);
    if (playerGrid[randomHitArr[x][0]][randomHitArr[x][1]] === "X") {
        document.getElementById(`${randomHitArr[x][0]}-${randomHitArr[x][1]}`).innerHTML = `<i class="fas fa-plane"></i>`;
        playersTurn = true;
        computersTurn = false;
        computerHitCount++;
    } else if (playerGrid[randomHitArr[x][0]][randomHitArr[x][1]] === "O") {
        // if head hit :: check which plane and draw the whole plane
        if (playerPlanes[0][0] === randomHitArr[x][0] && playerPlanes[0][1] === randomHitArr[x][1]) {
            for (let i = 0; i < 8; i++) {
                document.getElementById(`${playerPlanes[i][0]}-${playerPlanes[i][1]}`).innerHTML = `<i class="fas fa-plane"></i>`;
                playerGrid[playerPlanes[i][0]][playerPlanes[i][1]] = 1;
            }
        }
        if (playerPlanes[8][0] === randomHitArr[x][0] && playerPlanes[8][1] === randomHitArr[x][1]) {
            for (let i = 8; i < 16; i++) {
                document.getElementById(`${playerPlanes[i][0]}-${playerPlanes[i][1]}`).innerHTML = `<i class="fas fa-plane"></i>`;
                playerGrid[playerPlanes[i][0]][playerPlanes[i][1]] = 1;
            }
        }
        checkGameOver(playerGrid);
        if (gameOver === false) {
            playersTurn = true;
            computersTurn = false;
            computerHitCount++;
        }

    } else {
        document.getElementById(`${randomHitArr[x][0]}-${randomHitArr[x][1]}`).innerHTML = `<span>X</span>`;
        if (gameOver === false) {
            playersTurn = true;
            computersTurn = false;
            computerHitCount++;
        }
    }
    // remove the location from random Array - improves random function and works!!!
    randomHitArr.splice(x, 1);
    // remove all the locations of the plane if head is hit - somehow missed this!
    removeHitArrLocations();
    document.getElementById('loading-sign').innerHTML = ``;
    waitingForReturn = false;
    console.log(randomHitArr);
}




function hit(e) {
    coordX = parseInt(e.target.id[0]);
    coordY = parseInt(e.target.id[1]);
    // check if returned from previous hit (was a problem with the setTimeout function)
    if (waitingForReturn === false) {
        if (action === true && playersTurn === true && gameOver === false && computerGrid[coordX][coordY] !== 1 && computerGrid[coordX][coordY] !== 2) {
            waitingForReturn = true;
            playerHit(coordX, coordY);
        }
        if (action === true && computersTurn === true && gameOver === false) {
            waitingForReturn = true;
            document.getElementById('loading-sign').innerHTML = `
            <i class="fas fa-spinner loading-sign"></i>`;
            setTimeout(computerHit, 1500);
        }
        drawComputerHitMap();
    } else {}
}

function modalMessage(title, messageOne, messageTwo) {
    let checkTutorial;
    if (tutorial === true) {
        checkTutorial = `<a href="#" onclick="tutorialOff()" class="play-again">TURN OFF</a>`;
    } else {
        checkTutorial = `<a href="#" onclick="tutorialOn()" class="play-again">TURN ON</a>`;
    }
    modalText.innerHTML = `
                <h1>${title}</h1>
                <p>${messageOne}</p>
                <p>${messageTwo}</p>
                <a href="#" onclick="closeModal()" class="play-again">CLOSE</a>
                ${checkTutorial}`;
    modal.style.display = "flex";
}

function startGame(e) {
    coordX = parseInt(e.target.id[0]);
    coordY = parseInt(e.target.id[2]);
    if (headPlaced === false) {
        showAvailableDirections(coordX, coordY, playerGrid);
        placeHead(coordX, coordY);
        drawRemainingDirections();
    } else {
        if (headPlaced === true) {
            placePlane(coordX, coordY);
        }
    }
}

function placeHead(x, y) {
    // Check if location empty, head not placed already and no corners chosen
    if ((playerGrid[x][y] === "") && (headPlaced === false) && availableDirections != "" && (x != 0 || y != 0) && (x != 0 || y != 9) && (x != 9 || y != 0) && (x != 9 || y != 9)) {
        // Place Head
        document.getElementById(`${x}-${y}`).style.background = '#00b8b8';
        playerGrid[x][y] = "O";
        playerPlanes.push([x, y]);
        headPlaced = true;
    } else {
        modalMessage("GAME INFO", "Invalid location. A plan can not be built here.", "Please choose a valid location.");
        availableDirections = [];
    }
}

function showAvailableDirections(x, y, gridP) {
    // check up x - 1 goes up
    if (x >= 3 &&
        gridP[x - 1][y] === "" &&
        gridP[x - 2][y] === "" &&
        gridP[x - 3][y] === "" &&
        gridP[x - 1][y + 1] === "" &&
        gridP[x - 1][y - 1] === "" &&
        gridP[x - 3][y - 1] === "" &&
        gridP[x - 3][y + 1] === "") {
        availableDirections.unshift([x - 1, y, x - 2, y, x - 3, y, x - 1, y + 1, x - 1, y - 1, x - 3, y - 1, x - 3, y + 1]);
    } else {}
    //check down location
    if (x <= 6 &&
        gridP[x + 1][y] === "" &&
        gridP[x + 2][y] === "" &&
        gridP[x + 3][y] === "" &&
        gridP[x + 1][y + 1] === "" &&
        gridP[x + 1][y - 1] === "" &&
        gridP[x + 3][y - 1] === "" &&
        gridP[x + 3][y + 1] === "") {
        availableDirections.unshift([x + 1, y, x + 2, y, x + 3, y, x + 1, y + 1, x + 1, y - 1, x + 3, y - 1, x + 3, y + 1]);

    } else {}
    //check left location
    if (y >= 3 &&
        x <= 8 &&
        x >= 1 &&
        gridP[x][y - 1] === "" &&
        gridP[x][y - 2] === "" &&
        gridP[x][y - 3] === "" &&
        gridP[x + 1][y - 1] === "" &&
        gridP[x - 1][y - 1] === "" &&
        gridP[x + 1][y - 3] === "" &&
        gridP[x - 1][y - 3] === "") {
        availableDirections.unshift([x, y - 1, x, y - 2, x, y - 3, x + 1, y - 1, x - 1, y - 1, x - 1, y - 3, x + 1, y - 3]);
    } else {}
    //check right location
    if (y <= 6 &&
        x <= 8 &&
        x >= 1 &&
        gridP[x][y + 1] === "" &&
        gridP[x][y + 2] === "" &&
        gridP[x][y + 3] === "" &&
        gridP[x + 1][y + 1] === "" &&
        gridP[x - 1][y + 1] === "" &&
        gridP[x + 1][y + 3] === "" &&
        gridP[x - 1][y + 3] === "") {
        availableDirections.unshift([x, y + 1, x, y + 2, x, y + 3, x + 1, y + 1, x - 1, y + 1, x - 1, y + 3, x + 1, y + 3]);
    }
}

function showAvailableDirectionsReset() {
    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
            document.getElementById(`${i}-${j}`).style.background = "";
        }
    }
}

function drawChosenPlane() {
    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
            if (playerGrid[i][j] === "X") {
                document.getElementById(`${i}-${j}`).style.background = "#00b8b8";
            }
            if (playerGrid[i][j] === "O") {
                document.getElementById(`${i}-${j}`).style.background = "#00d6c4";
            }

        }
    }
}

function drawRemainingDirections() {
    for (let i = 0; i < availableDirections.length; i++) {
        for (let j = 0; j < 14; j += 2) {
            if (availableDirections[i][j + 1] != null) {
                document.getElementById(`${availableDirections[i][j]}-${availableDirections[i][j+1]}`).style.background = "green";
            }
        }
    }
}


// check if coords are allowed
function placePlane(x, y) {
    let spliceMe = [];
    for (let i = 0; i < availableDirections.length; i++) {
        for (let j = 0; j < 14; j += 2) {
            if (availableDirections[i][j + 1] != null && x === availableDirections[i][j] && y === availableDirections[i][j + 1]) {
                ok = 1;
            }
        }
    }
    // if allowed check if matrix is empty on the selecteed coords
    if (ok === 1 && playerGrid[x][y] != "X") {
        //check again - found and counter used for determining if a full complete direction is not used so it will be removed from array
        for (let i = 0; i < availableDirections.length; i++) {
            let found = false;
            let counter = 0;
            for (let j = 0; j < 14; j += 2) {
                counter++;
                if (availableDirections[i][j + 1] != null && x === availableDirections[i][j] && y === availableDirections[i][j + 1]) {
                    found = true;
                } else {
                    if (found === false && counter == 7) {
                        // Create array with directions to be deleted
                        spliceMe.unshift(i);
                    }
                }
            }
        }
        // add location to matrix
        playerGrid[x][y] = "X";
        playerPlanes.push([x, y]);
        // increment the plane partss used
        planeParts++;
        // if full plane
        if (planeParts === 7) {
            // remove the head check and reset the available locations
            headPlaced = false;
            availableDirections = [];
            if (tutorial === true) {
                setTimeout(modalMessage, 100, "DRAW PLANES", "Please choose another location for the second plane.", "Click in the green tiles to form the plane that you want.");
            }
            // planeParts = 0; - use if you want to use more than 2 planes
        } else if (planeParts === 14) { // ACTION STARTS HERE
            action = true;
            if (tutorial === true) {
                setTimeout(modalMessage, 100, "GAME STARTS", "The computer finished choosing it's planes. Game on.", "Please use the last canvas (computer canvas) to try and hit the planes!");
            }
        }

        // delete unused directions
        for (let n = 0; n < spliceMe.length; n++) {
            availableDirections.splice(spliceMe[n], 1);
        }
        // reset the view
        showAvailableDirectionsReset();
        // draw remaining directions ---- after removal of unused ones
        drawRemainingDirections();
        // draw the plane from matrix
        drawChosenPlane();
    }
    ok = 0;
}