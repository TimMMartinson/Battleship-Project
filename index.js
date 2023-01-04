// declaring board variables
const playerGrid = document.getElementById("playerGrid")
const aiGrid = document.getElementById("aiGrid")
const startButton = document.getElementById("startButton")

// creating grids

for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
        const cell = document.createElement("div")
        cell.classList.add("cell")
        playerGrid.appendChild(cell)

        const aiCell = document.createElement("div")
        aiCell.classList.add("cell")
        aiCell.addEventListener("click", handlePlayerAttack)
        aiGrid.appendChild(aiCell)
    }
}

// Placing AI ships and initializing Player Ship placement

startButton.addEventListener("click", () => {
    playerGrid.querySelectorAll(".cell").forEach(cell => {
        cell.addEventListener("click", handlePlayerShipPlacement)
    })
    handleAIShipPlacement()
    startButton.disabled = true
})

let playerShips = [5, 4, 3, 3, 2]
let aiShips = [5, 4, 3, 3, 2]
let playerHits = 0
let aiHits = 0

function handlePlayerShipPlacement(evt) {
    const cell = evt.target
    if (cell.classList.contains("ship")) {
        cell.classList.remove("ship") //this removes a ship if there is already one placed
        playerShips[playerShips.indexOf(cell.dataset.length)]++
    } else if (playerShips.length > 0) {
        const shipLength = playerShips.pop()
        cell.classList.add("ship")
        cell.dataset.length = shipLength
        
        let orientation = "horizontal" //default orientation for ship placement

        for (let i = 1; i < shipLength; i++) {
            const nextCell = getNextCell(cell, i, orientation)
            if (!nextCell || nextCell.classList.contains("ship")) {
                //this checks for valid ship placement
                playerShips.push(shipLength)
                cell.classList.remove("ship")
                delete cell.dataset.length
                return
            }
        }
    }
    if (playerShips.length === 0) {
        return
    }
}

function handleAIShipPlacement(ships) {
    if(!aiGrid){
        return
    }

    // sort ship lengths in descending order
    const sortedShipLengths = [...ships].sort((a, b) => b - a)
  
    // place ships on AI grid
    for (const shipLength of sortedShipLengths) {
      let placed = false
      let attempts = 0
      // This prevents the while loop from going infinite
      while (!placed && attempts < 1000) {
        // Pick a random cell to start the ship
        const startRow = Math.floor(Math.random() * 10)
        const startCol = Math.floor(Math.random() * 10)
        const startCell = aiGrid.children[startRow].children[startCol]
  
        // Pick a random orientation for the ship (horizontal or vertical)
        const orientation = Math.random() < 0.5 ? "horizontal" : "vertical"
  
        let isValidPlacement = true
        for (let i = 0; i < shipLength; i++) {
          const nextCell = getNextCell(startCell, i, orientation)
          if (!nextCell || nextCell.classList.contains("ship")) {
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
          placed = true
        } else {
          // Cannot place the ship, try again with next ship
          placed = false
          ships.push(shipLength)
        }
  
        // Break out of the loop if we've reached 1000 attempts
        attempts++
        if (attempts === 1000) {
          break
        }
      }
    }
  }
  
  
  function getNextCell(startCell, i, orientation) {
    if (!startCell) return null
    if (orientation === "horizontal") {
      // Find the next cell in the same row
      return startCell.nextElementSibling
    } else if (orientation === "vertical") {
      // Find the next cell in the same column
      if (startCell.parentElement && startCell.parentElement.nextElementSibling) {
        return startCell.parentElement.nextElementSibling.children[startCell.cellIndex]
      } else {
        return null
      }
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

        //check for win
        if (playerHits === 17) {
            alert("Congratulations, the player wins!")
            startButton.disabled = false
        }
    } else {
        cell.classList.add("miss")
    }
    // invoke ai attack 1 second after player attack completes
    setTimeout(() => handleAIAttack(), 1000)
}

  function handleAIAttack () {
    do{
        const row = Math.floor(Math.random() * 10)
        const col = Math.floor(Math.random() * 10)
        cell = playerGrid.rows[row].cells[col]
    } while (cell.classList.contains("hit") || cell.classList.contains("miss"))

    if (cell.classList.contains("ship")) {
        cell.classList.add("hit")
        aiHits++
        if (aiHits === 17) {
            alert("Sorry, AI Wins!")
            startButton.disabled = false
        }
    } else {
        cell.classList.add("miss")
    }
  }

