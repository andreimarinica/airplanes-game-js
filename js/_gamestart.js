// get from local storage 
// if (lsScoreBoard.length > 0) {
//     playerStats = JSON.parse(localStorage.getItem(LOCAL_STORAGE_SCOREBOARD_KEY));
//     playerName = playerStats[0].name;
// }

// Starts the game and draws everything
currentLevelStatus();

// Show welcome screen with name input if new player or welcome screen with continue if old player detected in local storage
welcomeScreen();