function placeTreasure() {
    let checker = false;
    while (checker === false) {
        let i = Math.floor(Math.random() * 10);
        let j = Math.floor(Math.random() * 10);
        if (computerGrid[i][j] === "") {
            checker = true;
            computerGrid[i][j] = "T";
            console.log(`${i} ++++ ${j}`);
        }
    }
}

currentLevelStatus();

// if (tutorial === true) {
//     setTimeout(modalMessage, 100, "DRAW PLANES", "Click or touch an empty area from the first canvas (your canvas). This will be the head of your plane.", "It will show all available directions (green tiles). Continue by clicking in each cell of the chosen plane.");
// }

// Create an array with all available locations from a grid (10 x 10 = 100 available locations in the beggining)
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
    let noOfPoints;
    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
            if (gridA[i][j] === "X" || gridA[i][j] === "O" || gridA[i][j] === "Y" || gridA[i][j] === "P") {
                if (currentLevel === 1) {
                    noOfPoints = lvlOnePoints;
                } else if (currentLevel === 2) {
                    noOfPoints = lvlTwoPoints;
                } else if (currentLevel === 3) {
                    noOfPoints = lvlThreePoints;
                } else if (currentLevel === 4) {
                    noOfPoints = lvlFourPoints;
                }
                if (currentLevel < 4) {
                    modalText.innerHTML = `
                <h1>ENEMY DOWN</h1>
                <p>${playerName}, you won this battle gaining ${noOfPoints} points in level ${currentLevel}.</p>
                <p>Please choose your next move.</p>
                <a href="#" class="play-again" onclick="restartLevel(); closeModal();">RESTART LEVEL</a>
                <a href="#" class="play-again" onclick="nextLevel(); closeModal();">NEXT LEVEL</a>`;
                    modal.style.display = "flex";
                }

                if (currentLevel === 4) {
                    // end game message and stats
                    let totalPoints = lvlOnePoints + lvlTwoPoints + lvlThreePoints + lvlFourPoints;
                    modalText.innerHTML = `
                <h1>CONGRATULATIONS!!!</h1>
                <p>You have managed to beat all the levels of the game.</p>
                <p>Scoreboard:</p>
                <p>LEVEL 1: ${lvlOnePoints} / TOTAL AVAILABLE points.</p>
                <p>LEVEL 2: ${lvlTwoPoints} / TOTAL AVAILABLE points.</p>
                <p>LEVEL 3: ${lvlThreePoints} / TOTAL AVAILABLE points.</p>
                <p>LEVEL 4: ${lvlFourPoints} / TOTAL AVAILABLE points.</p>
                <p>TOTAL: ${totalPoints} / TOTAL AVAILABLE points.</p>
                <a href="#" class="menu-option"><i class="fas fa-plane-departure menu-icon"></i> RESTART PROGRESS</a>
                <a href="#" onclick="exitTrue()" class="menu-option"><i class="fas fa-plane-arrival"></i> EXIT GAME</a>`;
                    modal.style.display = "flex";
                }
                break;
            }
            if (gridB[i][j] === "X" || gridB[i][j] === "O") {
                modalText.innerHTML = `
                <p>GAME OVER!!!</p>
                <p>Computer's missles destroyed all the planes!</p>
                <p>Computer won.</p>
                <a href="#" class="play-again" onclick="restartLevel(); closeModal();"><i class="fas fa-plane-departure menu-icon"></i> RESTART LEVEL</a>`;
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
            selectedItem = document.getElementById(`${i}-${j}`);
            selectedItem.addEventListener("click", startGame);
        }
    }
}

function createComputerBoard() {
    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
            gridItem.id = `${i}${j}`;
            gridComp.appendChild(gridItem.cloneNode(true));
            let selectedItem = document.getElementById(`${i}${j}`);
            selectedItem.addEventListener("click", hit);
        }
    }
}

function createComputerPlanes() {
    let checkRandom = false;
    while (checkRandom === false) {
        let x = Math.floor(Math.random() * 10);
        let y = Math.floor(Math.random() * 10);
        showAvailableDirections(x, y, computerGrid);
        let direction = Math.floor(Math.random() * availableDirections.length);
        if (availableDirections != "" && computerGrid[x][y] === "") {
            computerGrid[x][y] = "O";
            computerPlanes.push([x, y]);
            console.log(computerPlanes);
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

// plane hit

function playerHit(coordX, coordY) { // 3 head, 2 hit, 1 miss
    if (computerGrid[coordX][coordY] === "T") {
        console.log("TREASURE FOUND");
        let treasure = Math.floor(Math.random() * 350 + 1);
        console.log(treasure);
        switch (currentLevel) {
            case 1:
                lvlOnePoints = lvlOnePoints + treasure;
                break;
            case 2:
                lvlTwoPoints = lvlTwoPoints + treasure;
                break;
            case 3:
                lvlThreePoints = lvlThreePoints + treasure;
                break;
            case 4:
                lvlFourPoints = lvlFourPoints + treasure;

        }
        document.getElementById(`${coordX}${coordY}`).style.background = `url('../img/treasure.png') no-repeat center/${planeSize} ${planeSize}`;
    } else if (computerGrid[coordX][coordY] === "X" || computerGrid[coordX][coordY] === "Y") {
        document.getElementById(`${coordX}${coordY}`).innerHTML = `<img src="../img/flame.png" class="animate" alt="" width="${smokeSize}" height="${smokeSize}">`;
        computerGrid[coordX][coordY] = 2;
        playersTurn = false;
        computersTurn = true;
        playerHitCount++;
        switch (currentLevel) {
            case 1:
                lvlOnePoints = lvlOnePoints + 10; // 10 points for a hit
                break;
            case 2:
                lvlTwoPoints = lvlTwoPoints + 15; // 15 points for a hit
                break;
            case 3:
                lvlThreePoints = lvlThreePoints + 20; // 20 points for a hit
                break;
            case 4:
                lvlFourPoints = lvlFourPoints + 25; // 25 points for a hit

        }
    } else if (computerGrid[coordX][coordY] === "O" || computerGrid[coordX][coordY] === "P") {
        // if head hit :: check which plane and draw the whole plane
        if (computerPlanes[0][0] === coordX && computerPlanes[0][1] === coordY) {
            for (i = 0; i < 8; i++) {
                document.getElementById(`${computerPlanes[i][0]}${computerPlanes[i][1]}`).innerHTML = `<img src="../img/flame.png" class="animate" alt="" width="${smokeSize}" height="${smokeSize}">`;
                computerGrid[computerPlanes[i][0]][computerPlanes[i][1]] = 2;
            }
            console.log("FIRST PLANE DOWN");

        }
        // if (computerPlanes[8][0] === coordX && computerPlanes[8][1] === coordY) {
        //     for (i = 8; i < 16; i++) {
        //         document.getElementById(`${computerPlanes[i][0]}${computerPlanes[i][1]}`).innerHTML = `<img src="../img/flame.png" class="animate" alt="" width="${smokeSize}" height="${smokeSize}">`;
        //         computerGrid[computerPlanes[i][0]][computerPlanes[i][1]] = 2;
        //     }
        //     console.log("SECOND PLANE DOWN");
        // }
        // if (currentLevel === 2 || currentLevel === 3 || currentLevel === 4) {
        //     if (computerPlanes[16][0] === coordX && computerPlanes[16][1] === coordY) {
        //         for (i = 16; i < 24; i++) {
        //             document.getElementById(`${computerPlanes[i][0]}${computerPlanes[i][1]}`).innerHTML = `<img src="../img/flame.png" class="animate" alt="" width="${smokeSize}" height="${smokeSize}">`;
        //             computerGrid[computerPlanes[i][0]][computerPlanes[i][1]] = 2;
        //         }
        //     }
        //     console.log("THIRD PLANE DOWN");
        // }

        // if (currentLevel === 3 || currentLevel === 4) {
        //     if (computerPlanes[24][0] === coordX && computerPlanes[24][1] === coordY) {
        //         for (i = 24; i < 32; i++) {
        //             document.getElementById(`${computerPlanes[i][0]}${computerPlanes[i][1]}`).innerHTML = `<img src="../img/flame.png" class="animate" alt="" width="${smokeSize}" height="${smokeSize}">`;
        //             computerGrid[computerPlanes[i][0]][computerPlanes[i][1]] = 2;
        //         }
        //     }
        //     console.log("FOURTH PLANE DOWN");
        // }

        // if (currentLevel === 4) {
        //     if (computerPlanes[32][0] === coordX && computerPlanes[32][1] === coordY) {
        //         for (i = 32; i < 40; i++) {
        //             document.getElementById(`${computerPlanes[i][0]}${computerPlanes[i][1]}`).innerHTML = `<img src="../img/flame.png" class="animate" alt="" width="${smokeSize}" height="${smokeSize}">`;
        //             computerGrid[computerPlanes[i][0]][computerPlanes[i][1]] = 2;
        //         }
        //     }
        //     console.log("FIFTH PLANE DOWN");
        // }

        switch (currentLevel) {
            case 1:
                lvlOnePoints = lvlOnePoints + 125; // 125 points for a head
                break;
            case 2:
                lvlTwoPoints = lvlTwoPoints + 250; // 250 points for a head
                break;
            case 3:
                lvlThreePoints = lvlThreePoints + 375; // 375 points for a head
                break;
            case 4:
                lvlFourPoints = lvlFourPoints + 400; // 400 points for a hit

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
    updateScoreBoard();
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
                    testUp = true;
                    x = i;
                }
            }
        }
        if (right === true) {
            // try right
            for (let i = 0; i < randomHitArr.length; i++) {
                if (randomHitArr[i][0] === xD && randomHitArr[i][1] === (yD + 1)) {
                    x = i;
                }
            }
        }
        if (down === true) {
            // try down
            for (let i = 0; i < randomHitArr.length; i++) {
                if (randomHitArr[i][0] === (xD + 1) && randomHitArr[i][1] === yD) {
                    x = i;
                }
            }
        }
        if (left === true) {
            // try left
            for (let i = 0; i < randomHitArr.length; i++) {
                if (randomHitArr[i][0] === xD && randomHitArr[i][1] === (yD - 1)) {
                    x = i;
                }
            }
        }
    }
    // A bit of brain for the computer :: END
    if (playerGrid[randomHitArr[x][0]][randomHitArr[x][1]] === "X" || playerGrid[randomHitArr[x][0]][randomHitArr[x][1]] === "Y") {
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
    console.log(computerGrid);
    if (waitingForReturn === false) {
        if (action === true && playersTurn === true && gameOver === false && computerGrid[coordX][coordY] !== 1 && computerGrid[coordX][coordY] !== 2) {
            waitingForReturn = true;
            playerHit(coordX, coordY);
        }
        if (action === true && computersTurn === true && gameOver === false) {
            waitingForReturn = true;

            // waiting for computer move :: plane will fly from random direction
            let randomPlaneAnim;
            randomPlaneAnim = Math.floor(Math.random() * 4 + 1);
            document.getElementById('loading-sign').innerHTML = `<img src="../img/airplane${randomPlaneAnim}.png" alt="" class="loading-sign">`;

            randomPlaneAnim = Math.floor(Math.random() * 4 + 1);
            document.querySelector(".loading-sign").style.animationName = `AirplaneAcrossScreen${randomPlaneAnim}`;
            if (randomPlaneAnim === 1) {
                document.querySelector(".loading-sign").style.transform = "rotate(90deg)";
            } else if (randomPlaneAnim === 2) {
                document.querySelector(".loading-sign").style.transform = "rotate(-90deg)";
            } else if (randomPlaneAnim === 3) {
                document.querySelector(".loading-sign").style.transform = "rotate(180deg)";
            } else if (randomPlaneAnim === 4) {
                document.querySelector(".loading-sign").style.transform = "rotate(-360deg)";
            }

            setTimeout(computerHit, 3500);
        }
        //drawComputerHitMap();
    } else {}
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
            // if (tutorial === true) {
            //     setTimeout(modalMessage, 100, "DRAW PLANES", "Please choose another location for the second plane.", "Click in the green tiles to form the plane that you want.");
            // }
            // planeParts = 0; - use if you want to use more than 2 planes
        } else if (planeParts === 14) { // ACTION STARTS HERE
            action = true;
            // if (tutorial === true) {
            //     setTimeout(modalMessage, 100, "GAME STARTS", "The computer finished choosing it's planes. Game on.", "Please use the last canvas (computer canvas) to try and hit the planes!");
            // }
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