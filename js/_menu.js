// gameMenu
function gameMenu() {
    modalText.innerHTML = `
                <a href="#" class="close-button" onclick="closeModal()"><i class="fas fa-window-close"></i></a>
                <h1>GAME MENU</h1>
                <a href="#" onclick="newGame()" class="menu-option"><i class="fas fa-plane-departure menu-icon"></i> NEW GAME</a>
                <a href="#" onclick="changePlayer()" class="menu-option"><i class="fas fa-plane-departure menu-icon"></i> CHANGE PLAYER</a>
                <a href="#" class="menu-option"><i class="fas fa-redo-alt menu-icon"></i> RESTART</a>
                <a href="#" onclick="optionsMenu()" class="menu-option"><i class="fas fa-tools menu-icon"></i> OPTIONS</a>
                <a href="#" onclick="scoreBoard()" class="menu-option"><i class="fas fa-tools menu-icon"></i> SCORE</a>
                <a href="#" onclick="exitTrue()" class="menu-option"><i class="fas fa-plane-arrival"></i> EXIT GAME</a>`;
    modal.style.display = "flex";
}

function scoreBoard() {
    lsScoreBoard = JSON.parse(localStorage.getItem(LOCAL_STORAGE_SCOREBOARD_KEY)) || [];
    let tempStr;
    for (i = 0; i < lsScoreBoard.length; i++) {
        tempStr += `<p>${i}: ${lsScoreBoard[i].name} - ${lsScoreBoard[i].level} - ${lsScoreBoard[i].score} - ${lsScoreBoard[i].date}</p>`;
    }
    modalText.innerHTML = `<h1>SCOREBOARD</h1>
                            ${tempStr}
                            <a href="#" onclick="closeModal()" class="menu-option"><i class="fas fa-plane-arrival"></i> CLOSE</a>`;
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
let animationMode = true;
let animationStatus;

function optionsMenu() {
    if (tutorial === true) {
        checkTutorial = `<a href="#" onclick="tutorialOff(); optionsMenu();" class="menu-option"><i class="fas fa-spell-check menu-icon"></i> TUTORIAL ON</a>`;
    } else {
        checkTutorial = `<a href="#" onclick="tutorialOn(); optionsMenu();" class="menu-option"><i class="fas fa-spell-check menu-icon"></i> TUTORIAL OFF</a>`;
    }

    if (animationMode === true) {
        animationStatus = `<a href="#" onclick="animationOff(); optionsMenu();" class="menu-option"><i class="fas fa-spell-check menu-icon"></i> ANIMATION ON</a>`;
    } else {
        animationStatus = `<a href="#" onclick="animationOn(); optionsMenu();" class="menu-option"><i class="fas fa-spell-check menu-icon"></i> ANIMATION OFF</a>`;
    }
    modalText.innerHTML = `
    <a href="#" class="close-button" onclick="closeModal()"><i class="fas fa-window-close"></i></a>
    <h1>OPTIONS</h1>
    ${checkTutorial}
    ${animationStatus}
    <a href="#" class="menu-option"><i class="fas fa-redo-alt menu-icon"></i> RESET SCORE</a>
    <a href="#" class="menu-option"><i class="fas fa-redo-alt menu-icon"></i> SOUND OFF</a>
    <a href="#" class="menu-option"><i class="fas fa-redo-alt menu-icon"></i> GRID LINES OFF</a>
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