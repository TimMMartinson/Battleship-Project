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
        aiGrid.appendChild(aiCell)
    }
}