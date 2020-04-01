// Starts the game and draws everything
currentLevelStatus();

// Show welcome screen with name input
if (lsFirstVisit.length === 0) {
    modalText.innerHTML = `
    <h1>WELCOME</h1>
    <form action="" class="form" id="form">
        <input type="text" name="name" id="name" class="menu-option" placeholder="Please enter your name">
    </form>
    <a href="#" class="menu-option" onclick="newGame()"><i class="fas fa-plane-departure menu-icon"></i> NEW GAME</a>`;
    modal.style.display = "flex";
} else {
    //get last name used in local storage
}