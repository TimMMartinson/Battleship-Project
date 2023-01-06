// declaring board variables
const playerGrid = document.getElementById("playerGrid")
const aiGrid = document.getElementById("aiGrid")
const startButton = document.getElementById("startButton")
const resultsContainer = document.getElementById("resultsContainer")

// creating grids

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
      playerCell.addEventListener("click", () => placeShip(i,j))
      playerRow.appendChild(playerCell)
  
      const aiCell = document.createElement("td")
      aiCell.classList.add("cell")
      aiCell.setAttribute('id', `col${j}`)
      aiCell.addEventListener("click", handlePlayerAttack)
      aiRow.appendChild(aiCell)
    }
  }

// Placing AI ships and initializing Player Ship placement

startButton.addEventListener("click", () => {
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
            alert("Not enough space to place ship horizontally!")
            return
        }
        // Place the ship
        for (let i = col; i < col + shipLength; i++) {
            document.getElementById(`playerRow${row}`).children[i].classList.add("ship")
        }
    } else {
        // check for space to place ship vertically
        if (row + shipLength > 10) {
            alert("Not enough space to place ship vertically!")
            return
        }
        // Place the ship
        for (let i = row; i < row + shipLength; i++) {
            document.getElementById(`playerRow${i}`).children[col].classList.add("ship")
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
      return
    }
  
    // sort ship lengths in descending order
    const sortedShipLengths = [...aiShips].sort((a, b) => b - a)
  
    // place ships on AI grid
    for (const shipLength of aiShips) {
      for (let attempts = 0; attempts < 1000; attempts++) {
        // Pick a random cell to start the ship
        const startRow = Math.floor(Math.random() * 10)
        const startCol = Math.floor(Math.random() * 10)
        const startCell = aiGrid.querySelector(`#row${startRow} #col${startCol}`)
  
        // Pick a random orientation for the ship (horizontal or vertical)
        const orientation = Math.random() < 0.5 ? "horizontal" : "vertical"
  
        let isValidPlacement = true
        for (let i = 0; i < shipLength; i++) {
          const nextCell = getNextCell(startCell, i, orientation)
          if (!nextCell || nextCell.classList.contains("ship") || nextCell === null) {
            isValidPlacement = false
            break
          }
        }
  
        if (isValidPlacement) {
          // Place the ship
          startCell.classList.add("ship")
          startCell.dataset.length = shipLength
          for (let i = 1; i < shipLength; i++) {
            const nextCell = getNextCell(startCell, i, orientation)
            nextCell.classList.add("ship")
          }
  
          console.log("ship placed")
          break // break out of the for loop if the ship is placed
        } else {
          // Cannot place the ship, try again with next ship
  
          sortedShipLengths.push(shipLength)
          console.log("ship placement failed")
        }
      }
    }
  }
  
  
  function getNextCell(cell, i, orientation) {
    if (orientation === "horizontal") {
        // Check if the ship goes off the grid
        if (cell.cellIndex + i >= 10) {
            return null
        }
        // Return the next horizontal cell
        return document.querySelector(`#${cell.parentNode.id} #col${cell.cellIndex + i}`)
    } else {
        // Check if the ship goes off the grid
        if (cell.parentNode.rowIndex + i >= 10) {
            return null
        }
        // Return the next vertical cell
        return document.querySelector(`#row${cell.parentNode.rowIndex + i} #col${cell.cellIndex}`)
    }
}

function getNextPlayerCell(cell, i, orientation) {
    // Check if the ship goes off the grid
    if (orientation === "horizontal") {
        if (cell.cellIndex + i >= 10) {
            return null
        }
        // Return the next horizontal cell
        return document.querySelector(`#${cell.parentNode.id} #playerCol${cell.cellIndex + i}`)
    } else {
        if (cell.parentNode.rowIndex + i >= 10) {
            return null
        }
        // Return the next vertical cell
        return document.querySelector(`#playerRow${cell.parentNode.rowIndex + i} #playerCol${cell.cellIndex}`)
    }
}

  

  function handlePlayerAttack(evt) {
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
    if(cell.classList.contains("ship")) {
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
