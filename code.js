//map model
const map = [
  "WWWWWWWWWWWWWWWWWWWWW",
  "W   W     W     W W W",
  "W W W WWW WWWWW W W W",
  "W W W   W     W W   W",
  "W WWWWWWW W WWW W W W",
  "W         W     W W W",
  "W WWW WWWWW WWWWW W W",
  "W W   W   W W     W W",
  "W WWWWW W W W WWW W F",
  "S     W W W W W W WWW",
  "WWWWW W W W W W W W W",
  "W     W W W   W W W W",
  "W WWWWWWW WWWWW W W W",
  "W       W       W   W",
  "WWWWWWWWWWWWWWWWWWWWW",
];

let maze = document.getElementById("maze");

let maxHeight = 0;
let maxWidth = 0;
let playerPosition = [];

//Function to construct map. Uses nested loop to loop rows and columns. Appending "blocks" with the correct attributes into rows, and then appending those rows into a maze.
function displayMaze(model) {
  maxHeight = model.length;
  maxWidth = model[0].length;

  for (let mazeRow = 0; mazeRow < model.length; mazeRow++) {
    let row = document.createElement("div");
    row.setAttribute("class", "row");

    for (let mazeCol = 0; mazeCol < model[mazeRow].length; mazeCol++) {
      let block = document.createElement("div");

      if (model[mazeRow][mazeCol] === "W") {
        block.setAttribute("class", "block wall");
      } else if (model[mazeRow][mazeCol] === "S") {
        block.setAttribute("class", "block floor start");
        let player = document.createElement("div");
        player.setAttribute("id", "player");
        block.append(player);
        playerPosition.push(mazeRow);
        playerPosition.push(mazeCol);
      } else if (model[mazeRow][mazeCol] === "F") {
        block.setAttribute("class", "block floor finish");
      } else {
        block.setAttribute("class", "block floor");
      }
      row.append(block);
    }
    maze.append(row);
  }
}

//renders the map once called
displayMaze(map);

let player = document.getElementById("player");
let messageBox = document.getElementById("messageBox");

//function that uses arrow events to move player through the maze
function movePlayer(event) {
  let rowPos = playerPosition[0];
  let colPos = playerPosition[1];
  messageBox.innerHTML = "Please use your arrow keys to move your player through the maze!";

  //check which arrow key was pressed, verify the player is not escaping, and update colPos or rowPos (based of values that were current in the playerPosition array)
  switch (event.key) {
    case "ArrowRight":
      if (playerPosition[1] < maxWidth - 1) {
        colPos++;
      } else {
        messageBox.innerHTML = "You cannot leave the maze";
      }
      break;
    case "ArrowLeft":
      if (playerPosition[1] > 0) {
        colPos--;
      } else {
        messageBox.innerHTML = "You cannot leave the maze";
      }
      break;
    case "ArrowUp":
      if (rowPos > 0) {
        rowPos--;
      } else {
        messageBox.innerHTML = "You cannot leave the maze";
      }
      break;
    case "ArrowDown":
      if (rowPos < maxHeight - 1) {
        rowPos++;
      } else {
        messageBox.innerHTML = "You cannot leave the maze";
      }
      break;
  }

  let rowArray = document.getElementsByClassName("row");
  let currentRow = rowArray[rowPos].children;
  let currentBlock = currentRow[colPos];

  //checks to see if the move is valid, if so, append player to block and update and playerPosition array with new rowPos and colPos
  if (map[rowPos][colPos] == "F") {
    currentBlock.append(player);
    messageBox.innerHTML = "Winner Winner Chicken Dinner";
    playerPosition[0] = rowPos;
    playerPosition[1] = colPos;
  } else if (map[rowPos][colPos] == " " || map[rowPos][colPos] == "S") {
    currentBlock.append(player);
    playerPosition[0] = rowPos;
    playerPosition[1] = colPos;
  }
}

document.addEventListener("keydown", movePlayer);

let reset = document.getElementById("reset");

reset.addEventListener("click", function () {
  location.reload();
});
