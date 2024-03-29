// declaring board variables
const playerGrid = document.getElementById("playerGrid")
const aiGrid = document.getElementById("aiGrid")
const startButton = document.getElementById("startButton")
const resultsContainer = document.getElementById("resultsContainer")

// creating grids
const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J']

for (let i = 0; i < 10; i++) {
  const playerRow = document.createElement("tr")
  playerRow.setAttribute('id', `playerRow${i}`)
  playerGrid.appendChild(playerRow)

  const aiRow = document.createElement("tr")
  aiRow.setAttribute('id', `row${i}`)
  aiGrid.appendChild(aiRow)

  for (let j = 0; j < 10; j++) {
    const playerCell = document.createElement("td")
    playerCell.classList.add("cell")
    playerCell.setAttribute("id", `playerCol${j}`)
    playerCell.innerHTML = letters[j] + (i+1)
    playerCell.addEventListener("click", () => placeShip(i,j))
    playerRow.appendChild(playerCell)

    const aiCell = document.createElement("td")
    aiCell.classList.add("cell")
    aiCell.setAttribute('id', `col${j}`)
    aiCell.innerHTML = letters[j] + (i+1)
    aiCell.addEventListener("click", handlePlayerAttack)
    aiRow.appendChild(aiCell)
  }
}

// for (let i = 0; i < 10; i++) {
//     const playerRow = document.createElement("tr")
//     playerRow.setAttribute('id', `playerRow${i}`)
//     playerGrid.appendChild(playerRow)
  
//     const aiRow = document.createElement("tr")
//     aiRow.setAttribute('id', `row${i}`)
//     aiGrid.appendChild(aiRow)
  
//     for (let j = 0; j < 10; j++) {
//       const playerCell = document.createElement("td")
//       playerCell.classList.add("cell")
//       playerCell.setAttribute("id", `playerCol${j}`)
//       playerCell.addEventListener("click", () => placeShip(i,j))
//       playerRow.appendChild(playerCell)
  
//       const aiCell = document.createElement("td")
//       aiCell.classList.add("cell")
//       aiCell.setAttribute('id', `col${j}`)
//       aiCell.addEventListener("click", handlePlayerAttack)
//       aiRow.appendChild(aiCell)
//     }
//   }

// Placing AI ships and initializing Player Ship placement

startButton.addEventListener("click", () => {
    resetGame()
    handleAIShipPlacement(aiShips)
    startButton.disabled = true
})

const playerShips = [5, 4, 3, 3, 2]
const aiShips = [5, 4, 3, 3, 2]
let playerHits = 0
let aiHits = 0

let currentShip = 0
function placeShip(row, col) {
  const shipLength = playerShips[currentShip]

  // place horizontally or vertically depending on user choice
  const isHorizontal = document.getElementById("horizontalRadio").checked
  if (isHorizontal) {
      // check for space to place ship horizontally
      if (col + shipLength > 10) {
          document.getElementById("resultsContainer").innerHTML = "Not enough space to place ship horizontally!"
          return
      }
      // check for overlap with other ships
      for (let i = col; i < col + shipLength; i++) {
          if (document.getElementById(`playerRow${row}`).children[i].classList.contains("ship")) {
              document.getElementById("resultsContainer").innerHTML = "Ships cannot overlap!"
              return
          }
      }
      // Place the ship
      for (let i = col; i < col + shipLength; i++) {
          document.getElementById(`playerRow${row}`).children[i].classList.add("ship")
          document.getElementById("resultsContainer").innerHTML = "" // This is to remove any incorrect placement messages
      }
  } else {
      // check for space to place ship vertically
      if (row + shipLength > 10) {
          document.getElementById("resultsContainer").innerHTML ="Not enough space to place ship vertically!"
          return
      }
      // check for overlap with other ships
      for (let i = row; i < row + shipLength; i++) {
          if (document.getElementById(`playerRow${i}`).children[col].classList.contains("ship")) {
              document.getElementById("resultsContainer").innerHTML = "Ships cannot overlap!"
              return
          }
      }
      // Place the ship
      for (let i = row; i < row + shipLength; i++) {
          document.getElementById(`playerRow${i}`).children[col].classList.add("ship")
          document.getElementById("resultsContainer").innerHTML = "" // This is to remove any incorrect placement messages
      }
  }
  currentShip++
  // Once all ships are placed, disable the ship placement function
  if (currentShip === playerShips.length) {
      playerGrid.removeEventListener("click", placeShip)
  }
}


function handleAIShipPlacement() {
  if (!aiGrid) {
    return;
  }

  const shipLengths = [...aiShips];

  for (const shipLength of shipLengths) {
    let isValidPlacement = false;

    while (!isValidPlacement) {
      const startRow = Math.floor(Math.random() * 10);
      const startCol = Math.floor(Math.random() * 10);
      const orientation = Math.random() < 0.5 ? "horizontal" : "vertical";

      isValidPlacement = tryPlaceShip(startRow, startCol, shipLength, orientation);
    }
  }
}

function tryPlaceShip(startRow, startCol, shipLength, orientation) {
  const cellsToPlace = [];

  for (let i = 0; i < shipLength; i++) {
    const nextRow = orientation === "horizontal" ? startRow : startRow + i;
    const nextCol = orientation === "vertical" ? startCol : startCol + i;

    if (nextRow >= 10 || nextCol >= 10) {
      return false;
    }

    const nextCell = aiGrid.querySelector(`#row${nextRow} #col${nextCol}`);

    if (nextCell.classList.contains("aiShip")) {
      return false;
    }

    cellsToPlace.push(nextCell);
  }

  cellsToPlace.forEach(cell => {
    cell.classList.add("aiShip");
    cell.dataset.length = shipLength;
  });

  return true;
}

// This is an older version of the aiShipPlacement that for some reason refused to place ships vertically

//   function handleAIShipPlacement() {
//     if (!aiGrid) {
//       return
//     }
  
//     // sort ship lengths in descending order
//     const sortedShipLengths = [...aiShips].sort((a, b) => b - a)
  
//     // place ships on AI grid
//     for (const shipLength of aiShips) {
//       for (let attempts = 0; attempts < 1000; attempts++) {
//         // Pick a random cell to start the ship
//         const startRow = Math.floor(Math.random() * 10)
//         const startCol = Math.floor(Math.random() * 10)
//         const startCell = aiGrid.querySelector(`#row${startRow} #col${startCol}`)
  
//         // Pick a random orientation for the ship (horizontal or vertical)
//         const orientation = Math.random() < 0.5 ? "horizontal" : "vertical"
  
//         let isValidPlacement = true
//         for (let i = 0; i < shipLength; i++) {
//           const nextCell = getNextCell(startCell, i, orientation)
//           if (!nextCell || nextCell.classList.contains("aiShip")) {
//             isValidPlacement = false
//             break
//           }
//         }
  
//         if (isValidPlacement) {
//           // Place the ship
//           startCell.classList.add("aiShip")
//           startCell.dataset.length = shipLength
//           for (let i = 1; i < shipLength; i++) {
//             const nextCell = getNextCell(startCell, i, orientation)
//             nextCell.classList.add("aiShip")
//           }
  
//           break // break out of the for loop if the ship is placed
//         } else {
//           // Cannot place the ship, try again with next ship
//           sortedShipLengths.push(shipLength)
//         }
//       }
//     }
//   }
  
  
//   function getNextCell(startCell, i, orientation) {
//     if (orientation === "horizontal") {
//         // Check if the ship goes off the grid
//         if (startCell.cellIndex + i >= 10) {
//             return null
//         }
//         // Return the next horizontal cell
//         return document.querySelector(`#${startCell.parentNode.id} #col${startCell.cellIndex + i}`)
//     } else {
//         // Check if the ship goes off the grid
//         if (startCell.parentNode.rowIndex + i >= 10) {
//             return null
//         }
//         // Return the next vertical cell
//         return document.querySelector(`#row${startCell.parentNode.rowIndex + i} #col${startCell.cellIndex}`)
//     }
// }

//This is a leftover function from an earlier version of player ship placement

// function getNextPlayerCell(cell, i, orientation) {
//     // Check if the ship goes off the grid
//     if (orientation === "horizontal") {
//         if (cell.cellIndex + i >= 10) {
//             return null
//         }
//         // Return the next horizontal cell
//         return document.querySelector(`#${cell.parentNode.id} #playerCol${cell.cellIndex + i}`)
//     } else {
//         if (cell.parentNode.rowIndex + i >= 10) {
//             return null
//         }
//         // Return the next vertical cell
//         return document.querySelector(`#playerRow${cell.parentNode.rowIndex + i} #playerCol${cell.cellIndex}`)
//     }
// }

  

  function handlePlayerAttack(evt) {
    // make sure game is still ongoing and all player ships are placed, else disable attack function
    if (startButton.disabled === false || currentShip !== playerShips.length) {
        return
    }
    const cell = evt.target
    // make sure function can only target cells in player's grid
    if (!cell.classList.contains("cell")){
        return
    }
    //check if cell has already been targeted
    if(cell.classList.contains("hit") || cell.classList.contains("miss")) {
        return
    }

    //check if cell contains a ship
    if(cell.classList.contains("aiShip")) {
        cell.classList.add("hit")
        playerHits++
        document.getElementById("resultsContainer").innerHTML = "Hit!"

        //check for win
        if (playerHits === 17) {
            document.getElementById("resultsContainer").innerHTML = "Congratulations! You win!"
            startButton.disabled = false
            return
        }
    } else {
        cell.classList.add("miss")
        document.getElementById("resultsContainer").innerHTML = "Miss!"
    }
    // invoke ai attack 1 second after player attack completes
    setTimeout(() => handleAIAttack(), 1000)
}

  function handleAIAttack () {
    // make sure game is still ongoing, else disable player attack function
    if (startButton.disabled === false) {
        return
    }
   // Generate random coordinates for the target cell
   const row = Math.floor(Math.random() * 10)
   const col = Math.floor(Math.random() * 10)

   // select the target cell from the players grid
   const targetCell = document.querySelector(`#playerRow${row} #playerCol${col}`)

    // check if cell has already been targeted
    if (targetCell.classList.contains("hit") || targetCell.classList.contains("miss")) {
        setTimeout(() => handleAIAttack(), 500)
        return
    }

    // check if cell contains a ship
    if (targetCell.classList.contains("ship")) {
        targetCell.classList.add("hit")
        aiHits++

        //check for win
        if (aiHits === 17) {
            document.getElementById("resultsContainer").innerHTML = "Sorry! The AI Wins!"
            startButton.disabled = false
        }
    } else {
        targetCell.classList.add("miss")
    }
  }

  function resetGame() {
    // Reset all variables to their initial state
    currentShip = 0
    playerHits = 0
    aiHits = 0
    
    // Remove all "ship" and "hit" classes from player and AI cells
    const playerCells = playerGrid.querySelectorAll(".cell")
    playerCells.forEach(cell => cell.classList.remove("ship", "hit", "miss"))
    const aiCells = aiGrid.querySelectorAll(".cell")
    aiCells.forEach(cell => cell.classList.remove("aiShip", "hit", "miss"))
    
    // Enable the start button
    startButton.disabled = false
    
    // Clear the results container
    resultsContainer.innerHTML = ""
  }
  