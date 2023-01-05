// declaring board variables
const playerGrid = document.getElementById("playerGrid")
const aiGrid = document.getElementById("aiGrid")
const startButton = document.getElementById("startButton")

// creating grids

for (let i = 0; i < 10; i++) {
    const playerRow = document.createElement("tr")
    playerRow.setAttribute('id', `row${i}`)
    playerGrid.appendChild(playerRow)
  
    const aiRow = document.createElement("tr")
    aiRow.setAttribute('id', `row${i}`)
    aiGrid.appendChild(aiRow)
  
    for (let j = 0; j < 10; j++) {
      const playerCell = document.createElement("td")
      playerCell.classList.add("cell")
      playerCell.setAttribute("id", `col${j}`)
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
    playerGrid.querySelectorAll(".cell").forEach(cell => {
        cell.addEventListener("click", handlePlayerShipPlacement)
    })
    handleAIShipPlacement(aiShips)
    startButton.disabled = true
})

let playerShips = [5, 4, 3, 3, 2]
let aiShips = [5, 4, 3, 3, 2]
let playerHits = 0
let aiHits = 0

function handlePlayerShipPlacement(evt) {
    const cell = evt.target
    if (cell.classList.contains("ship")) {
      cell.classList.remove("ship") // this removes a ship if there is already one placed
      playerShips[playerShips.indexOf(cell.dataset.length)]++
    } else if (playerShips.length > 0) {
      const shipLength = playerShips.pop()
      cell.classList.add("ship")
      cell.dataset.length = shipLength
  
      let orientation = "horizontal" // default orientation for ship placement
  
      // Check for valid ship placement
      let isValidPlacement = true
      for (let i = 0; i < shipLength; i++) {
        const nextCell = getNextCell(cell, i, orientation)
        if (!nextCell || nextCell.classList.contains("ship")) {
          isValidPlacement = false
          break
        }
      }
  
      if (isValidPlacement) {
        // Place the ship
        cell.classList.add("ship")
        for (let i = 1; i < shipLength; i++) {
          const nextCell = getNextCell(cell, i, orientation)
          nextCell.classList.add("ship")
        } sortedShipLengths.splice(sortedShipLengths.indexOf(shipLength), 1)
      } else {
        // Cannot place the ship, try again with next ship
        playerShips.push(shipLength)
        cell.classList.remove("ship")
        delete cell.dataset.length
      }
    }
    if (playerShips.length === 0) {
      return
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

