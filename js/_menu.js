// gameMenu
function gameMenu() {
    modalText.innerHTML = `
                <a href="#" class="close-button" onclick="closeModal()"><i class="fas fa-window-close"></i></a>
                <h1>GAME MENU</h1>
                <a href="#" onclick="newGame()" class="menu-option"><i class="fas fa-plane-departure menu-icon"></i> NEW GAME</a>
                <a href="#" onclick="changePlayer()" class="menu-option"><i class="fas fa-exchange-alt menu-icon"></i> CHANGE PLAYER</a>
                <a href="#" onclick="restartLevel()" class="menu-option"><i class="fas fa-redo-alt menu-icon"></i> RESTART</a>
                <a href="#" onclick="optionsMenu()" class="menu-option"><i class="fas fa-tools menu-icon"></i> OPTIONS</a>
                <a href="#" onclick="scoreBoard()" class="menu-option"><i class="far fa-chart-bar menu-icon"></i> SCORE BOARD</a>
                <a href="#" onclick="exitTrue()" class="menu-option"><i class="fas fa-plane-arrival menu-icon"></i> EXIT GAME</a>`;
    modal.style.display = "flex";
}

function scoreBoard() {
    lsScoreBoard = JSON.parse(localStorage.getItem(LOCAL_STORAGE_SCOREBOARD_KEY)) || [];
    //MAXIMUM SCORE VALUE TESTING 

    // get old array of objects from local storage
    let oldArr = JSON.parse(localStorage.getItem(LOCAL_STORAGE_SCOREBOARD_KEY)) || [];
    // create a new empty array
    let newArr = [];
    // how many times we need to go through finding the maximum score
    let i = oldArr.length;
    while (i > 0) {
        // find the maximum .score
        let result = Math.max.apply(Math, oldArr.map(function (o) {
            return o.score;
        }));
        // find the object that is holding the maximum score
        let objectResulted = oldArr.find(function (o) {
            if (o.score === result) {
                // return the object found or if only one left return that one
                return o.score || oldArr[0];
            }
        });
        // show only biggest 10 scores
        if (newArr.length < 10) {
            // push max found into new array
            newArr.push(objectResulted);
        }
        // go through the old array and find the one that was pushed into new array by .date and remove it
        for (j = 0; j < oldArr.length; j++) {
            if (objectResulted.date === oldArr[j].date) {
                oldArr.splice(j, 1);
                break;
            }
        }
        i--;
    }
    //MAXIMUM SCORE VALUE TESTING

    // temporary string to hold all values
    let tempStr;
    if (newArr.length > 0) {
        // first value from the newarray assigned manually
        tempStr = `<tr>
                        <td>${1}</td> 
                        <td>${newArr[0].name}</td> 
                        <td>${newArr[0].level}</td> 
                        <td>${newArr[0].score}</td> 
                        <td>${newArr[0].date}</td>
                    </tr>`;
        // all other values automatically added
        for (i = 1; i < newArr.length; i++) {
            tempStr += `<tr> 
                            <td>${i+1}</td> 
                            <td>${newArr[i].name}</td> 
                            <td>${newArr[i].level}</td> 
                            <td>${newArr[i].score}</td> 
                            <td>${newArr[i].date}</td>
                        </tr>`;
        }
    } else {
        tempStr = `No available stats recorded.`;
    }
    // show the results in the modal
    modalText.innerHTML = `<h1>SCOREBOARD</h1>
                            <table id="score-stats">
                                <tr>
                                    <th>Place</th>
                                    <th>Player Name</th>
                                    <th>Level</th>
                                    <th>Score</th>
                                    <th>Date</th>
                                </tr>
                                ${tempStr}
                            </table>
                            
                            <a href="#" onclick="closeModal()" class="menu-option"><i class="fas fa-plane-arrival menu-icon"></i> CLOSE</a>`;
    modal.style.display = "flex";
}

function exitTrue() {
    modalText.innerHTML = `
                <a href="#" class="close-button" onclick="closeModal()"><i class="fas fa-window-close"></i></a>
                <h1>GAME MENU</h1>
                <h3>ARE YOU SURE YOU WANT TO EXIT?</h3>
                <a href="#" onclick="gameMenu()" class="play-again exit-no">NO</a>
                <a href="#" onclick="window.close()" class="play-again exit-yes">YES</a>`;
    modal.style.display = "flex";
}


function optionsMenu() {
    if (tutorial === true) {
        checkTutorial = `<a href="#" onclick="tutorialOff(); optionsMenu();" class="menu-option"><i class="fas fa-spell-check menu-icon"></i> TUTORIAL ON</a>`;
    } else {
        checkTutorial = `<a href="#" onclick="tutorialOn(); optionsMenu();" class="menu-option"><i class="fas fa-spell-check menu-icon"></i> TUTORIAL OFF</a>`;
    }

    if (animationMode === true) {
        animationStatus = `<a href="#" onclick="animationOff(); optionsMenu();" class="menu-option"><i class="fas fa-fighter-jet menu-icon"></i> ANIMATION ON</a>`;
    } else {
        animationStatus = `<a href="#" onclick="animationOn(); optionsMenu();" class="menu-option"><i class="fas fa-fighter-jet menu-icon"></i> ANIMATION OFF</a>`;
    }

    if (gridLinesMode === true) {
        gridLinesStatus = `<a href="#" onclick="gridLinesOff(); optionsMenu();" class="menu-option"><i class="fas fa-fighter-jet menu-icon"></i> GRID LINES ON</a>`;
    } else {
        gridLinesStatus = `<a href="#" onclick="gridLinesOn(); optionsMenu();" class="menu-option"><i class="fas fa-fighter-jet menu-icon"></i> GRID LINES OFF</a>`;
    }
    modalText.innerHTML = `
    <a href="#" class="close-button" onclick="closeModal()"><i class="fas fa-window-close"></i></a>
    <h1>OPTIONS</h1>
    ${checkTutorial}
    ${animationStatus}
    <a href="#" onclick="localStorageReset()" class="menu-option"><i class="fas fa-redo-alt menu-icon"></i> RESET ALL STATS</a>
    ${gridLinesStatus}
    <a href="#" onclick="gameMenu()" class="menu-option"><i class="fas fa-undo menu-icon"></i> GO BACK</a>`;
    modal.style.display = "flex";
}

function tutorialOn() {
    tutorial = true;
    closeModal();
}

function tutorialOff() {
    tutorial = false;
    closeModal();
}
// gameMenu

function closeModal() {
    modal.style.display = "none";
}

function updateScoreBoard() {
    let levelPoints = 0;
    if (currentLevel === 1) {
        levelPoints = lvlOnePoints;
    } else if (currentLevel === 2) {
        levelPoints = lvlTwoPoints;
    } else if (currentLevel === 3) {
        levelPoints = lvlThreePoints;
    } else if (currentLevel === 4) {
        levelPoints = lvlFourPoints;
    }
    document.getElementById("score-board").innerHTML = `
    <div class="score-board">
    <h1>LEVEL ${currentLevel} | POINTS ${levelPoints}</h1>
    </div>`;
}

function modalMessage(title, messageOne, messageTwo) {
    modalText.innerHTML = `
                <a href="#" class="close-button" onclick="closeModal()"><i class="fas fa-window-close"></i></a>
                <h1>${title}</h1>
                <p>${messageOne}</p>
                <p>${messageTwo}</p>
                <a href="#" onclick="closeModal()" class="play-again">OK</a>`;
    modal.style.display = "flex";
}

function modalMessageTutorial(title, messageOne, messageTwo) {
    let checkTutorial;
    if (tutorial === true) {
        checkTutorial = `<a href="#" onclick="tutorialOff()" class="play-again">TURN OFF</a>`;
    } else {
        checkTutorial = `<a href="#" onclick="tutorialOn()" class="play-again">TURN ON</a>`;
    }
    modalText.innerHTML = `
                <a href="#" class="close-button" onclick="closeModal()"><i class="fas fa-window-close"></i></a>
                <h1>${title}</h1>
                <p>${messageOne}</p>
                <p>${messageTwo}</p>
                ${checkTutorial}`;
    modal.style.display = "flex";
}

function welcomeScreen() {
    if (lsScoreBoard.length === 0 || newPlayer === true) {
        modalText.innerHTML = `
        <h1>WELCOME</h1>
        <form action="" class="form" id="form">
            <input type="text" name="name" id="name" class="menu-option" placeholder="Please enter your name">
        </form>
        <a href="#" class="menu-option" onclick="newGame()"><i class="fas fa-plane-departure menu-icon"></i> NEW GAME</a>`;
        modal.style.display = "flex";
    } else {
        modalText.innerHTML = `
        <h1>WELCOME</h1>
        <p>Welcome back, ${lsScoreBoard[0].name}</p>
        <p>What would you like to do?</p>
        <a href="#" class="menu-option" onclick="continueFromLast()"><i class="fas fa-plane-departure menu-icon"></i> CONTINUE</a>
        <a href="#" class="menu-option" onclick="newGame()"><i class="fas fa-plane-departure menu-icon"></i> NEW GAME</a>
        <a href="#" class="menu-option" onclick="changePlayer()"><i class="fas fa-plane-departure menu-icon"></i> NEW PLAYER</a>`;
        modal.style.display = "flex";
    }
}