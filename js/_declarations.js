// al the global variables will be declared in here
//
//
//


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
let selectedItem;
let randomHitArr = [];
let computerPlanes = [];
let playerPlanes = [];
let currentLevel = 1;
let availableDirections = [];
let action = false;
let planeParts = 0;
let headPlaced = false;
let gameOver = false;
let playerHitCount = 0;
let computerHitCount = 0;
let playersTurn = true;
let computersTurn = false;
let playerName;
let waitingForReturn = false;
let ok = 0;
let tutorial = true;
let missedRand = 0;
// Points System
let lvlOnePoints = 0;
let lvlTwoPoints = 0;
let lvlThreePoints = 0;
let lvlFourPoints = 0;
// size of the images based on the grid size - different for different screen sizes
let planeSize = document.querySelector(".human-grid").clientWidth / 10 + "px";
let smokeSize = document.querySelector(".human-grid").clientWidth / 10 - 5 + "px";
let loadingSize = document.querySelector(".human-grid").clientWidth + "px";
// can use a random event below :: for now it will always go
let fighterHeight = 70;
let fighterWidth = 60;
let cloudsHeight = 330;
let cloudWidth = 470;
let cloudRand = Math.floor(Math.random() * 4 + 1); // 1 - 4
let movingPlane = 3;
// MODAL
let modal = document.getElementById("myModal");
let modalText = document.getElementById("modal-text");
// window.addEventListener('click', function (event) {
//     if (event.target == modal) {
//         modal.style.display = "none";
//     }
// });
// MODAL

//random for computer hits
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
let newPlayer = false;

let stuffInitialized;