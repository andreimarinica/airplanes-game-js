let grid = document.querySelector(".human-grid");
let gridComp = document.querySelector(".computer-grid");
let gridItem = document.createElement("div");
gridItem.className = "grid-item";
let onlyOneDirection = [];
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
let missedRand = 0;

// size of the images based on the grid size - different for different screen sizes
let planeSize = document.querySelector(".human-grid").clientWidth / 10 + "px";
let smokeSize = document.querySelector(".human-grid").clientWidth / 10 - 5 + "px";
let loadingSize = document.querySelector(".human-grid").clientWidth / 10 + "px";

// get a random background 

bgRand = Math.floor(Math.random() * 4 + 1); // 1 - 4
document.querySelector("body").style.background = `url('../img/bg${bgRand}.jpg') no-repeat center center/cover`;

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
            if (gridT[i][j] === "X" || gridT[i][j] === "O" || gridT[i][j] === "Y" || gridT[i][j] === "P") {
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

function checkGameOverComp(gridT) {
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
            if (gridA[i][j] === "X" || gridA[i][j] === "O" || gridA[i][j] === "Y" || gridA[i][j] === "P") {
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
//obsolete
/*function drawComputerHitMap() {
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
}*/

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


function playerHit(coordX, coordY) { // 3 head, 2 hit, 1 miss
    if (computerGrid[coordX][coordY] === "X" || computerGrid[coordX][coordY] === "Y") {
        document.getElementById(`${coordX}${coordY}`).innerHTML = `<img src="../img/flame.png" class="animate" alt="" width="${smokeSize}" height="${smokeSize}">`;
        computerGrid[coordX][coordY] = 2;
        playersTurn = false;
        computersTurn = true;
        playerHitCount++;
    } else if (computerGrid[coordX][coordY] === "O" || computerGrid[coordX][coordY] === "P") {
        // if head hit :: check which plane and draw the whole plane
        if (computerPlanes[0][0] === coordX && computerPlanes[0][1] === coordY) {
            for (i = 0; i < 8; i++) {
                document.getElementById(`${computerPlanes[i][0]}${computerPlanes[i][1]}`).innerHTML = `<img src="../img/flame.png" class="animate" alt="" width="${smokeSize}" height="${smokeSize}">`;
                computerGrid[computerPlanes[i][0]][computerPlanes[i][1]] = 2;
            }

        }
        if (computerPlanes[8][0] === coordX && computerPlanes[8][1] === coordY) {
            for (i = 8; i < 16; i++) {
                document.getElementById(`${computerPlanes[i][0]}${computerPlanes[i][1]}`).innerHTML = `<img src="../img/flame.png" class="animate" alt="" width="${smokeSize}" height="${smokeSize}">`;
                computerGrid[computerPlanes[i][0]][computerPlanes[i][1]] = 2;
            }

        }
        computerGrid[coordX][coordY] = 3;
        transfromChosenAirplaneComputer();
        checkGameOverComp(computerGrid);
        if (gameOver === false) {
            playersTurn = false;
            computersTurn = true;
            playerHitCount++;
        }
    } else {
        missedRand = Math.floor(Math.random() * 3 + 1);
        document.getElementById(`${coordX}${coordY}`).innerHTML = `<img src="../img/missed${missedRand}.png" class="animate" alt="" width="${smokeSize}" height="${smokeSize}">`;
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

let holdHitCoords = [];
let haveHit = false;
let up = false;
let right = false;
let down = false;
let left = false;
let didLastOneHit = false;
let testUp = false;
let testRight = false;
let testDown = false;
let testLeft = false;

function computerHit() {
    // optimize random algorithm as if the game progresses too much random will fail
    let x = Math.floor(Math.random() * randomHitArr.length);

    // determine the value of x and find the correct coords in randomhitarr...
    if (haveHit === true) {
        // A bit of brain for the computer :: still not properly developed
        let xD = holdHitCoords[0][0];
        let yD = holdHitCoords[0][1];
        let testUp = false;
        let testRight = false;
        let testDown = false;
        let testLeft = false;
        for (let i = 0; i < randomHitArr.length; i++) {
            if (randomHitArr[i][0] === (xD - 1) && randomHitArr[i][1] === yD) {
                testUp = true;
            }
            if (randomHitArr[i][0] === xD && randomHitArr[i][1] === (yD + 1)) {
                testRight = true;
            }
            if (randomHitArr[i][0] === (xD + 1) && randomHitArr[i][1] === yD) {
                testDown = true;
            }
            if (randomHitArr[i][0] === xD && randomHitArr[i][1] === (yD - 1)) {
                testLeft = true;
            }
        }

        if (testUp === false && testRight === false && testDown === false && testLeft === false) {
            holdHitCoords.splice(0, 1);
            xD = holdHitCoords[0][0];
            yD = holdHitCoords[0][1];
        }


        //if (didLastOneHit === true) { // try up, try right, try down, try left :: if hit try again
        if (up === false && right === false && down === false && left === false) {
            up = true;
        }

        if (didLastOneHit === false && up === true) {
            right = true;
            up = false;
        } else if (didLastOneHit === false && right === true) {
            right = false;
            down = true;
        } else if (didLastOneHit === false && down === true) {
            left = true;
            down = false;
        } else if (didLastOneHit === false && left === true) {
            up = true;
            left = false;
        }


        if (up === true && testUp === false) {
            right = true;
            up = false;
        }
        if (right === true && testRight === false) {
            down = true;
            right = false;
        }
        if (down === true && testDown === false) {
            left = true;
            down = false;
        }
        if (left === true && testLeft === false) {
            up = true;
            left = false;
        }

        // try up
        if (up === true) {
            for (let i = 0; i < randomHitArr.length; i++) {
                if (randomHitArr[i][0] === (xD - 1) && randomHitArr[i][1] === yD) {
                    console.log("A INTRAT UPPP");
                    console.log(xD - 1);
                    console.log(randomHitArr[i][0]);
                    console.log(yD);
                    console.log(randomHitArr[i][1]);
                    testUp = true;
                    x = i;
                }
            }
        }
        if (right === true) {
            // try right
            for (let i = 0; i < randomHitArr.length; i++) {
                if (randomHitArr[i][0] === xD && randomHitArr[i][1] === (yD + 1)) {
                    console.log("A INTRAT RIGHHT");
                    console.log(xD);
                    console.log(randomHitArr[i][0]);
                    console.log(yD + 1);
                    console.log(randomHitArr[i][1]);
                    x = i;
                }
            }
        }
        if (down === true) {
            // try down
            for (let i = 0; i < randomHitArr.length; i++) {
                if (randomHitArr[i][0] === (xD + 1) && randomHitArr[i][1] === yD) {
                    console.log("A INTRAT DOWNN");
                    console.log(xD + 1);
                    console.log(randomHitArr[i][0]);
                    console.log(yD);
                    console.log(randomHitArr[i][1]);
                    x = i;
                }
            }
        }
        if (left === true) {
            // try left
            for (let i = 0; i < randomHitArr.length; i++) {
                if (randomHitArr[i][0] === xD && randomHitArr[i][1] === (yD - 1)) {
                    console.log("A INTRAT LEEFT");
                    console.log(xD);
                    console.log(randomHitArr[i][0]);
                    console.log(yD - 1);
                    console.log(randomHitArr[i][1]);
                    x = i;
                }
            }
        }
    }
    // A bit of brain for the computer :: END
    if (playerGrid[randomHitArr[x][0]][randomHitArr[x][1]] === "X" || playerGrid[randomHitArr[x][0]][randomHitArr[x][1]] === "Y") {
        // document.getElementById(`${randomHitArr[x][0]}-${randomHitArr[x][1]}`).innerHTML = `<i class="fas fa-plane"></i>`;
        document.getElementById(`${randomHitArr[x][0]}-${randomHitArr[x][1]}`).innerHTML = `<img src="../img/flame.png" alt="" class="animate" width="${smokeSize}" height="${smokeSize}">`;
        playersTurn = true;
        computersTurn = false;
        computerHitCount++;
        haveHit = true;
        didLastOneHit = true;
        holdHitCoords.unshift([randomHitArr[x][0], randomHitArr[x][1]]);


    } else if (playerGrid[randomHitArr[x][0]][randomHitArr[x][1]] === "O" || playerGrid[randomHitArr[x][0]][randomHitArr[x][1]] === "P") {
        // if head hit :: check which plane and draw the whole plane
        if (playerPlanes[0][0] === randomHitArr[x][0] && playerPlanes[0][1] === randomHitArr[x][1]) {
            for (let i = 0; i < 8; i++) {
                document.getElementById(`${playerPlanes[i][0]}-${playerPlanes[i][1]}`).innerHTML = `<img src="../img/flame.png" alt="" class="animate" width="${smokeSize}" height="${smokeSize}">`;
                playerGrid[playerPlanes[i][0]][playerPlanes[i][1]] = 1;
            }
        }
        if (playerPlanes[8][0] === randomHitArr[x][0] && playerPlanes[8][1] === randomHitArr[x][1]) {
            for (let i = 8; i < 16; i++) {
                document.getElementById(`${playerPlanes[i][0]}-${playerPlanes[i][1]}`).innerHTML = `<img src="../img/flame.png" alt="" class="animate" width="${smokeSize}" height="${smokeSize}">`;
                playerGrid[playerPlanes[i][0]][playerPlanes[i][1]] = 1;
            }
        }
        haveHit = false;
        didLastOneHit = false;
        holdHitCoords = [];
        up = false;
        right = false;
        down = false;
        left = false;
        checkGameOver(playerGrid);
        if (gameOver === false) {
            playersTurn = true;
            computersTurn = false;
            computerHitCount++;
        }

    } else {
        missedRand = Math.floor(Math.random() * 3 + 1);
        document.getElementById(`${randomHitArr[x][0]}-${randomHitArr[x][1]}`).innerHTML = `<img src="../img/missed${missedRand}.png" alt="" class="animate" width="${smokeSize}" height="${smokeSize}">`;
        didLastOneHit = false;
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
    document.getElementById('loading-sign').style.animationPlayState = "initial";

    waitingForReturn = false;
}




function hit(e) {
    coordX = parseInt(e.target.id[0]);
    coordY = parseInt(e.target.id[1]);
    transfromChosenAirplane();
    // check if returned from previous hit (was a problem with the setTimeout function)
    console.log(holdHitCoords);
    if (waitingForReturn === false) {
        if (action === true && playersTurn === true && gameOver === false && computerGrid[coordX][coordY] !== 1 && computerGrid[coordX][coordY] !== 2) {
            waitingForReturn = true;
            playerHit(coordX, coordY);
        }
        if (action === true && computersTurn === true && gameOver === false) {
            waitingForReturn = true;
            // document.getElementById('loading-sign').innerHTML = `<i class="fas fa-spinner loading-sign"></i>`;
            document.getElementById('loading-sign').innerHTML = `<img src="../img/airplane.png" alt="" class="loading-sign">`;
            setTimeout(computerHit, 3000);
        }
        //drawComputerHitMap();
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
        document.getElementById(`${x}-${y}`).style.background = "red";
        playerGrid[x][y] = "O"; // O is head initially
        playerPlanes.push([x, y]);
        headPlaced = true;
    } else {
        modalMessage("GAME INFO", "Invalid location. A plane can not be built here.", "Please choose a valid location.");
        availableDirections = [];
    }
}



function showAvailableDirections(x, y, gridP) {
    onlyOneDirection = [];
    // check up x - 1 goes up
    if (x >= 3 &&
        gridP[x - 1][y] === "" &&
        gridP[x - 2][y] === "" &&
        gridP[x - 3][y] === "" &&
        gridP[x - 1][y + 1] === "" &&
        gridP[x - 1][y - 1] === "" &&
        gridP[x - 3][y - 1] === "" &&
        gridP[x - 3][y + 1] === "") {
        onlyOneDirection.unshift("up");
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
        onlyOneDirection.unshift("down");
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
        onlyOneDirection.unshift("left");
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
        onlyOneDirection.unshift("right");
        availableDirections.unshift([x, y + 1, x, y + 2, x, y + 3, x + 1, y + 1, x - 1, y + 1, x - 1, y + 3, x + 1, y + 3]);
    }
}

function showAvailableDirectionsReset() {
    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
            if (playerGrid[i][j] != "Y" && playerGrid[i][j] != "P") {
                document.getElementById(`${i}-${j}`).style.background = "";
            }
        }
    }
}

function drawChosenPlane() {
    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
            if (playerGrid[i][j] === "X") {
                document.getElementById(`${i}-${j}`).style.background = "red";
            }
            if (playerGrid[i][j] === "O") {
                document.getElementById(`${i}-${j}`).style.background = "red";
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

function transfromChosenAirplaneComputer() {
    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
            if (computerGrid[i][j] === 3) {
                planeSize = document.querySelector(".human-grid").clientWidth / 10 + "px";
                document.getElementById(`${i}${j}`).style.background = `url('../img/head.png') no-repeat center/${planeSize} ${planeSize}`;
                //check which direction is the airplane
                //check up
                if (i >= 3 &&
                    computerGrid[i - 1][j] === 2 &&
                    computerGrid[i - 2][j] === 2 &&
                    computerGrid[i - 3][j] === 2 &&
                    computerGrid[i - 1][j + 1] === 2 &&
                    computerGrid[i - 1][j - 1] === 2 &&
                    computerGrid[i - 3][j - 1] === 2 &&
                    computerGrid[i - 3][j + 1] === 2) {
                    computerGrid[i][j] = "P";
                    computerGrid[i - 1][j] = "Y";
                    computerGrid[i - 2][j] = "Y";
                    computerGrid[i - 3][j] = "Y";
                    computerGrid[i - 1][j + 1] = "Y";
                    computerGrid[i - 1][j - 1] = "Y";
                    computerGrid[i - 3][j - 1] = "Y";
                    computerGrid[i - 3][j + 1] = "Y";
                    document.getElementById(`${i}${j}`).style.transform = `rotate(180deg)`;
                    document.getElementById(`${i - 1}${j}`).style.background = `url('../img/center.png') no-repeat center/${planeSize} ${planeSize}`;
                    document.getElementById(`${i - 1}${j}`).style.transform = `rotate(180deg)`;
                    document.getElementById(`${i - 2}${j}`).style.background = `url('../img/back.png') no-repeat center/${planeSize} ${planeSize}`;
                    document.getElementById(`${i - 2}${j}`).style.transform = `rotate(180deg)`;
                    document.getElementById(`${i - 3}${j}`).style.background = `url('../img/back-back.png') no-repeat center/${planeSize} ${planeSize}`;
                    document.getElementById(`${i - 3}${j}`).style.transform = `rotate(180deg)`;
                    document.getElementById(`${i - 1}${j +1}`).style.background = `url('../img/left.png') no-repeat center/${planeSize} ${planeSize}`;
                    document.getElementById(`${i - 1}${j +1}`).style.transform = `rotate(180deg)`;
                    document.getElementById(`${i - 1}${j -1}`).style.background = `url('../img/right.png') no-repeat center/${planeSize} ${planeSize}`;
                    document.getElementById(`${i - 1}${j -1}`).style.transform = `rotate(180deg)`;
                    document.getElementById(`${i - 3}${j +1}`).style.background = `url('../img/back-left.png') no-repeat center/${planeSize} ${planeSize}`;
                    document.getElementById(`${i - 3}${j +1}`).style.transform = `rotate(180deg)`;
                    document.getElementById(`${i - 3}${j - 1}`).style.background = `url('../img/back-right.png') no-repeat center/${planeSize} ${planeSize}`;
                    document.getElementById(`${i - 3}${j - 1}`).style.transform = `rotate(180deg)`;
                }

                // check down

                if (i <= 6 &&
                    computerGrid[i + 1][j] === 2 &&
                    computerGrid[i + 2][j] === 2 &&
                    computerGrid[i + 3][j] === 2 &&
                    computerGrid[i + 1][j + 1] === 2 &&
                    computerGrid[i + 1][j - 1] === 2 &&
                    computerGrid[i + 3][j - 1] === 2 &&
                    computerGrid[i + 3][j + 1] === 2) {
                    computerGrid[i][j] = "P";
                    computerGrid[i + 1][j] = "Y";
                    computerGrid[i + 2][j] = "Y";
                    computerGrid[i + 3][j] = "Y";
                    computerGrid[i + 1][j + 1] = "Y";
                    computerGrid[i + 1][j - 1] = "Y";
                    computerGrid[i + 3][j - 1] = "Y";
                    computerGrid[i + 3][j + 1] = "Y";
                    document.getElementById(`${i +1}${j}`).style.background = `url('../img/center.png') no-repeat center/${planeSize} ${planeSize}`;
                    document.getElementById(`${i +2}${j}`).style.background = `url('../img/back.png') no-repeat center/${planeSize} ${planeSize}`;
                    document.getElementById(`${i +3}${j}`).style.background = `url('../img/back-back.png') no-repeat center/${planeSize} ${planeSize}`;
                    document.getElementById(`${i +1}${j +1}`).style.background = `url('../img/right.png') no-repeat center/${planeSize} ${planeSize}`;
                    document.getElementById(`${i +1}${j -1}`).style.background = `url('../img/left.png') no-repeat center/${planeSize} ${planeSize}`;
                    document.getElementById(`${i +3}${j +1}`).style.background = `url('../img/back-right.png') no-repeat center/${planeSize} ${planeSize}`;
                    document.getElementById(`${i +3}${j - 1}`).style.background = `url('../img/back-left.png') no-repeat center/${planeSize} ${planeSize}`;
                }

                // check left
                if (j >= 3 &&
                    i <= 8 &&
                    i >= 1 &&
                    computerGrid[i][j - 1] === 2 &&
                    computerGrid[i][j - 2] === 2 &&
                    computerGrid[i][j - 3] === 2 &&
                    computerGrid[i + 1][j - 1] === 2 &&
                    computerGrid[i - 1][j - 1] === 2 &&
                    computerGrid[i + 1][j - 3] === 2 &&
                    computerGrid[i - 1][j - 3] === 2) {
                    computerGrid[i][j] = "P";
                    computerGrid[i][j - 1] = "Y";
                    computerGrid[i][j - 2] = "Y";
                    computerGrid[i][j - 3] = "Y";
                    computerGrid[i + 1][j - 1] = "Y";
                    computerGrid[i - 1][j - 1] = "Y";
                    computerGrid[i + 1][j - 3] = "Y";
                    computerGrid[i - 1][j - 3] = "Y";
                    document.getElementById(`${i}${j}`).style.transform = `rotate(90deg)`;
                    document.getElementById(`${i}${j-1}`).style.background = `url('../img/center.png') no-repeat center/${planeSize} ${planeSize}`;
                    document.getElementById(`${i}${j-1}`).style.transform = `rotate(90deg)`;
                    document.getElementById(`${i}${j-2}`).style.background = `url('../img/back.png') no-repeat center/${planeSize} ${planeSize}`;
                    document.getElementById(`${i}${j-2}`).style.transform = `rotate(90deg)`;
                    document.getElementById(`${i}${j-3}`).style.background = `url('../img/back-back.png') no-repeat center/${planeSize} ${planeSize}`;
                    document.getElementById(`${i}${j-3}`).style.transform = `rotate(90deg)`;
                    document.getElementById(`${i + 1}${j -1}`).style.background = `url('../img/right.png') no-repeat center/${planeSize} ${planeSize}`;
                    document.getElementById(`${i + 1}${j -1}`).style.transform = `rotate(90deg)`;
                    document.getElementById(`${i - 1}${j -1}`).style.background = `url('../img/left.png') no-repeat center/${planeSize} ${planeSize}`;
                    document.getElementById(`${i - 1}${j -1}`).style.transform = `rotate(90deg)`;
                    document.getElementById(`${i + 1}${j -3}`).style.background = `url('../img/back-right.png') no-repeat center/${planeSize} ${planeSize}`;
                    document.getElementById(`${i + 1}${j -3}`).style.transform = `rotate(90deg)`;
                    document.getElementById(`${i - 1}${j - 3}`).style.background = `url('../img/back-left.png') no-repeat center/${planeSize} ${planeSize}`;
                    document.getElementById(`${i - 1}${j - 3}`).style.transform = `rotate(90deg)`;

                }

                // check right
                if (j <= 6 &&
                    i <= 8 &&
                    i >= 1 &&
                    computerGrid[i][j + 1] === 2 &&
                    computerGrid[i][j + 2] === 2 &&
                    computerGrid[i][j + 3] === 2 &&
                    computerGrid[i + 1][j + 1] === 2 &&
                    computerGrid[i - 1][j + 1] === 2 &&
                    computerGrid[i + 1][j + 3] === 2 &&
                    computerGrid[i - 1][j + 3] === 2) {
                    computerGrid[i][j] = "P";
                    computerGrid[i][j + 1] = "Y";
                    computerGrid[i][j + 2] = "Y";
                    computerGrid[i][j + 3] = "Y";
                    computerGrid[i + 1][j + 1] = "Y";
                    computerGrid[i - 1][j + 1] = "Y";
                    computerGrid[i + 1][j + 3] = "Y";
                    computerGrid[i - 1][j + 3] = "Y";
                    document.getElementById(`${i}${j}`).style.transform = `rotate(-90deg)`;
                    document.getElementById(`${i}${j+1}`).style.background = `url('../img/center.png') no-repeat center/${planeSize} ${planeSize}`;
                    document.getElementById(`${i}${j+1}`).style.transform = `rotate(-90deg)`;
                    document.getElementById(`${i}${j+2}`).style.background = `url('../img/back.png') no-repeat center/${planeSize} ${planeSize}`;
                    document.getElementById(`${i}${j+2}`).style.transform = `rotate(-90deg)`;
                    document.getElementById(`${i}${j+3}`).style.background = `url('../img/back-back.png') no-repeat center/${planeSize} ${planeSize}`;
                    document.getElementById(`${i}${j+3}`).style.transform = `rotate(-90deg)`;
                    document.getElementById(`${i + 1}${j +1}`).style.background = `url('../img/left.png') no-repeat center/${planeSize} ${planeSize}`;
                    document.getElementById(`${i + 1}${j +1}`).style.transform = `rotate(-90deg)`;
                    document.getElementById(`${i - 1}${j +1}`).style.background = `url('../img/right.png') no-repeat center/${planeSize} ${planeSize}`;
                    document.getElementById(`${i - 1}${j +1}`).style.transform = `rotate(-90deg)`;
                    document.getElementById(`${i + 1}${j +3}`).style.background = `url('../img/back-left.png') no-repeat center/${planeSize} ${planeSize}`;
                    document.getElementById(`${i + 1}${j +3}`).style.transform = `rotate(-90deg)`;
                    document.getElementById(`${i - 1}${j + 3}`).style.background = `url('../img/back-right.png') no-repeat center/${planeSize} ${planeSize}`;
                    document.getElementById(`${i - 1}${j + 3}`).style.transform = `rotate(-90deg)`;
                }



            }
        }
    }
}
// ISSUE: two directions positive if the planes are one after each other 
// EX: HEAD BODY BODY BODY HEAD BODY BODY BODY
function transfromChosenAirplane() {
    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
            if (playerGrid[i][j] === "O") {
                planeSize = document.querySelector(".human-grid").clientWidth / 10 + "px";
                // use directions.length if 3 splice middle 
                // get a counter 7 / 14
                //check which direction is the airplane
                //check up
                if (i >= 3 &&
                    playerGrid[i - 1][j] === "X" &&
                    playerGrid[i - 2][j] === "X" &&
                    playerGrid[i - 3][j] === "X" &&
                    playerGrid[i - 1][j + 1] === "X" &&
                    playerGrid[i - 1][j - 1] === "X" &&
                    playerGrid[i - 3][j - 1] === "X" &&
                    playerGrid[i - 3][j + 1] === "X") {
                    playerGrid[i][j] = "P";
                    playerGrid[i - 1][j] = "Y";
                    playerGrid[i - 2][j] = "Y";
                    playerGrid[i - 3][j] = "Y";
                    playerGrid[i - 1][j + 1] = "Y";
                    playerGrid[i - 1][j - 1] = "Y";
                    playerGrid[i - 3][j - 1] = "Y";
                    playerGrid[i - 3][j + 1] = "Y";
                    document.getElementById(`${i}-${j}`).style.background = `url('../img/head.png') no-repeat center/${planeSize} ${planeSize}`;
                    document.getElementById(`${i}-${j}`).style.transform = `rotate(180deg)`;
                    document.getElementById(`${i - 1}-${j}`).style.background = `url('../img/center.png') no-repeat center/${planeSize} ${planeSize}`;
                    document.getElementById(`${i - 1}-${j}`).style.transform = `rotate(180deg)`;
                    document.getElementById(`${i - 2}-${j}`).style.background = `url('../img/back.png') no-repeat center/${planeSize} ${planeSize}`;
                    document.getElementById(`${i - 2}-${j}`).style.transform = `rotate(180deg)`;
                    document.getElementById(`${i - 3}-${j}`).style.background = `url('../img/back-back.png') no-repeat center/${planeSize} ${planeSize}`;
                    document.getElementById(`${i - 3}-${j}`).style.transform = `rotate(180deg)`;
                    document.getElementById(`${i - 1}-${j +1}`).style.background = `url('../img/left.png') no-repeat center/${planeSize} ${planeSize}`;
                    document.getElementById(`${i - 1}-${j +1}`).style.transform = `rotate(180deg)`;
                    document.getElementById(`${i - 1}-${j -1}`).style.background = `url('../img/right.png') no-repeat center/${planeSize} ${planeSize}`;
                    document.getElementById(`${i - 1}-${j -1}`).style.transform = `rotate(180deg)`;
                    document.getElementById(`${i - 3}-${j +1}`).style.background = `url('../img/back-left.png') no-repeat center/${planeSize} ${planeSize}`;
                    document.getElementById(`${i - 3}-${j +1}`).style.transform = `rotate(180deg)`;
                    document.getElementById(`${i - 3}-${j - 1}`).style.background = `url('../img/back-right.png') no-repeat center/${planeSize} ${planeSize}`;
                    document.getElementById(`${i - 3}-${j - 1}`).style.transform = `rotate(180deg)`;
                }

                // check down

                if (i <= 6 &&
                    playerGrid[i + 1][j] === "X" &&
                    playerGrid[i + 2][j] === "X" &&
                    playerGrid[i + 3][j] === "X" &&
                    playerGrid[i + 1][j + 1] === "X" &&
                    playerGrid[i + 1][j - 1] === "X" &&
                    playerGrid[i + 3][j - 1] === "X" &&
                    playerGrid[i + 3][j + 1] === "X") {
                    playerGrid[i][j] = "P";
                    playerGrid[i + 1][j] = "Y";
                    playerGrid[i + 2][j] = "Y";
                    playerGrid[i + 3][j] = "Y";
                    playerGrid[i + 1][j + 1] = "Y";
                    playerGrid[i + 1][j - 1] = "Y";
                    playerGrid[i + 3][j - 1] = "Y";
                    playerGrid[i + 3][j + 1] = "Y";
                    document.getElementById(`${i}-${j}`).style.background = `url('../img/head.png') no-repeat center/${planeSize} ${planeSize}`;
                    document.getElementById(`${i +1}-${j}`).style.background = `url('../img/center.png') no-repeat center/${planeSize} ${planeSize}`;
                    document.getElementById(`${i +2}-${j}`).style.background = `url('../img/back.png') no-repeat center/${planeSize} ${planeSize}`;
                    document.getElementById(`${i +3}-${j}`).style.background = `url('../img/back-back.png') no-repeat center/${planeSize} ${planeSize}`;
                    document.getElementById(`${i +1}-${j +1}`).style.background = `url('../img/right.png') no-repeat center/${planeSize} ${planeSize}`;
                    document.getElementById(`${i +1}-${j -1}`).style.background = `url('../img/left.png') no-repeat center/${planeSize} ${planeSize}`;
                    document.getElementById(`${i +3}-${j +1}`).style.background = `url('../img/back-right.png') no-repeat center/${planeSize} ${planeSize}`;
                    document.getElementById(`${i +3}-${j - 1}`).style.background = `url('../img/back-left.png') no-repeat center/${planeSize} ${planeSize}`;
                }

                // check left
                if (j >= 3 &&
                    i <= 8 &&
                    i >= 1 &&
                    playerGrid[i][j - 1] === "X" &&
                    playerGrid[i][j - 2] === "X" &&
                    playerGrid[i][j - 3] === "X" &&
                    playerGrid[i + 1][j - 1] === "X" &&
                    playerGrid[i - 1][j - 1] === "X" &&
                    playerGrid[i + 1][j - 3] === "X" &&
                    playerGrid[i - 1][j - 3] === "X") {
                    playerGrid[i][j] = "P";
                    playerGrid[i][j - 1] = "Y";
                    playerGrid[i][j - 2] = "Y";
                    playerGrid[i][j - 3] = "Y";
                    playerGrid[i + 1][j - 1] = "Y";
                    playerGrid[i - 1][j - 1] = "Y";
                    playerGrid[i + 1][j - 3] = "Y";
                    playerGrid[i - 1][j - 3] = "Y";
                    document.getElementById(`${i}-${j}`).style.background = `url('../img/head.png') no-repeat center/${planeSize} ${planeSize}`;
                    document.getElementById(`${i}-${j}`).style.transform = `rotate(90deg)`;
                    document.getElementById(`${i}-${j-1}`).style.background = `url('../img/center.png') no-repeat center/${planeSize} ${planeSize}`;
                    document.getElementById(`${i}-${j-1}`).style.transform = `rotate(90deg)`;
                    document.getElementById(`${i}-${j-2}`).style.background = `url('../img/back.png') no-repeat center/${planeSize} ${planeSize}`;
                    document.getElementById(`${i}-${j-2}`).style.transform = `rotate(90deg)`;
                    document.getElementById(`${i}-${j-3}`).style.background = `url('../img/back-back.png') no-repeat center/${planeSize} ${planeSize}`;
                    document.getElementById(`${i}-${j-3}`).style.transform = `rotate(90deg)`;
                    document.getElementById(`${i + 1}-${j -1}`).style.background = `url('../img/right.png') no-repeat center/${planeSize} ${planeSize}`;
                    document.getElementById(`${i + 1}-${j -1}`).style.transform = `rotate(90deg)`;
                    document.getElementById(`${i - 1}-${j -1}`).style.background = `url('../img/left.png') no-repeat center/${planeSize} ${planeSize}`;
                    document.getElementById(`${i - 1}-${j -1}`).style.transform = `rotate(90deg)`;
                    document.getElementById(`${i + 1}-${j -3}`).style.background = `url('../img/back-right.png') no-repeat center/${planeSize} ${planeSize}`;
                    document.getElementById(`${i + 1}-${j -3}`).style.transform = `rotate(90deg)`;
                    document.getElementById(`${i - 1}-${j - 3}`).style.background = `url('../img/back-left.png') no-repeat center/${planeSize} ${planeSize}`;
                    document.getElementById(`${i - 1}-${j - 3}`).style.transform = `rotate(90deg)`;

                }

                // check right
                if (j <= 6 &&
                    i <= 8 &&
                    i >= 1 &&
                    playerGrid[i][j + 1] === "X" &&
                    playerGrid[i][j + 2] === "X" &&
                    playerGrid[i][j + 3] === "X" &&
                    playerGrid[i + 1][j + 1] === "X" &&
                    playerGrid[i - 1][j + 1] === "X" &&
                    playerGrid[i + 1][j + 3] === "X" &&
                    playerGrid[i - 1][j + 3] === "X") {
                    playerGrid[i][j] = "P";
                    playerGrid[i][j + 1] = "Y";
                    playerGrid[i][j + 2] = "Y";
                    playerGrid[i][j + 3] = "Y";
                    playerGrid[i + 1][j + 1] = "Y";
                    playerGrid[i - 1][j + 1] = "Y";
                    playerGrid[i + 1][j + 3] = "Y";
                    playerGrid[i - 1][j + 3] = "Y";
                    document.getElementById(`${i}-${j}`).style.background = `url('../img/head.png') no-repeat center/${planeSize} ${planeSize}`;
                    document.getElementById(`${i}-${j}`).style.transform = `rotate(-90deg)`;
                    document.getElementById(`${i}-${j+1}`).style.background = `url('../img/center.png') no-repeat center/${planeSize} ${planeSize}`;
                    document.getElementById(`${i}-${j+1}`).style.transform = `rotate(-90deg)`;
                    document.getElementById(`${i}-${j+2}`).style.background = `url('../img/back.png') no-repeat center/${planeSize} ${planeSize}`;
                    document.getElementById(`${i}-${j+2}`).style.transform = `rotate(-90deg)`;
                    document.getElementById(`${i}-${j+3}`).style.background = `url('../img/back-back.png') no-repeat center/${planeSize} ${planeSize}`;
                    document.getElementById(`${i}-${j+3}`).style.transform = `rotate(-90deg)`;
                    document.getElementById(`${i + 1}-${j +1}`).style.background = `url('../img/left.png') no-repeat center/${planeSize} ${planeSize}`;
                    document.getElementById(`${i + 1}-${j +1}`).style.transform = `rotate(-90deg)`;
                    document.getElementById(`${i - 1}-${j +1}`).style.background = `url('../img/right.png') no-repeat center/${planeSize} ${planeSize}`;
                    document.getElementById(`${i - 1}-${j +1}`).style.transform = `rotate(-90deg)`;
                    document.getElementById(`${i + 1}-${j +3}`).style.background = `url('../img/back-left.png') no-repeat center/${planeSize} ${planeSize}`;
                    document.getElementById(`${i + 1}-${j +3}`).style.transform = `rotate(-90deg)`;
                    document.getElementById(`${i - 1}-${j + 3}`).style.background = `url('../img/back-right.png') no-repeat center/${planeSize} ${planeSize}`;
                    document.getElementById(`${i - 1}-${j + 3}`).style.transform = `rotate(-90deg)`;
                }



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
        playerGrid[x][y] = "X"; // plane body is X initially
        console.log(playerGrid);
        playerPlanes.push([x, y]);
        // increment the plane partss used
        planeParts++;
        // if full plane
        if (planeParts === 7) {

            // remove the head check and reset the available locations
            headPlaced = false;
            availableDirections = [];
            // turn colors into airplane lol
            //do something here TODO:
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
        // after a complete airplane is down the below function will activate the graphics for it based on it's direction
        transfromChosenAirplane();


    }
    ok = 0;
}