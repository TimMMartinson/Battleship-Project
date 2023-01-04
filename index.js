// declaring board variables
const playerGrid = document.getElementById("playerGrid")
const aiGrid = document.getElementById("aiGrid")
const startButton = document.getElementById("startButton")

// creating grids

for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
        const cell = document.createElement("div")
        cell.classList.add("cell")
        cell.addEventListener("click", handlePlayerAttack)
        playerGrid.appendChild(cell)

        const aiCell = document.createElement("div")
        aiCell.classList.add("cell")
        aiGrid.appendChild(aiCell)
    }
}

// Placing player's ships

startButton.addEventListener("click", () => {
    playerGrid.querySelectorAll(".cell").forEach(cell => {
        cell.addEventListener("click", handlePlayerShipPlacement)
    })
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
}

function handlePlayerAttack(evt) {
    const cell = evt.target
    //check if cell has already been targeted
    if(cell.classList.contains("hit") || cell.classList.contains("miss")) {
        return
    }

    //check if cell contains a ship
    if(cell.classList.contains("ship")) {
        cell.classList.add("hit")
        playerHits++

        //check for win
        if (playerHits === aiShips.reduce((a,b) => a + b, 0)) {
            alert("Congratulations, the player wins!")
        }
    } else {
        cell.classList.add("miss")
    }
}