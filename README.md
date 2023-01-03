# Description
- Battleship is a two-player strategy/guessing game where the object is to sink all of your opponents ships.
- Ships are placed on a 10x10 grid and players take turns "attacking" each other by guessing a coordinate.
- The object of the game is to sink all of your opponent's ships.

> This project is my first project for the General Assembly SEI Bootcamp.  I chose to create Battleship because of the challenge of implementing an AI opponent.
> The logic required to place the AI's ships and handle both its and the player's attack functions was intriguing to me
>
> Also, as a chess player, I have an interest in strategy game AI (i.e. chess engines) and saw this project as an opportunity to learn more about the ideas and processes behind creating such an
> AI, albeit with a simpler game.
> The first version of the Battleship AI will attack randomly but I hope to add better logic in the future.
 

# Wireframe
![Battleship Wireframe](https://i.imgur.com/UZkgMqr.jpg)

# User Stories
## MVP
1. As a user, I want to see a Battleship board.
2. As a user, I want to see a new game button.
3. As a user, I want to have 5 different kinds of boats.
4. As a user, I want to have an AI Opponent that attacks randomly
5. As a user, I want the AI to have the same types of boats that I do.
6. As a user, I want to be able to place my boats on my half of the board.
7. As a user, I want the AI's boats to be placed randomly, and invisible.
8. As a user, I want to be able to attack the AI's half of the board.
9. As a user, I want to know if an attack is a miss.
10. As a user, I want to know if an attack is a hit.
11. As a user, I want to know if an attack sinks a ship.
12. As a user, I want to know when I have sunk all of the AI's ships/won the game.
13. As a user, I want the AI to attack me after I attack it.
14. As a user, I want to know if the AI's attack hits my ship.
15. As a user, I want to know if the AI's attack misses my ship.
16. As a user, I want to know if the AI has sunk a ship.
17. As a user, I want to know if I have lost the game.
18. As a user, I want to know which coordinates I have already attacked.
19. As a user, I want to know which coordinates the AI has already attacked.
20. As a user, I want each attack to be unique, i.e. no repeated attacks allowed.

## Version 2
1. As a user, I want to be able to drag and drop my ships to place them.
2. As a user, I want an end of game screen that shows where both players placed all of their boats
3. As a user, I want access to different board backgrounds
4. As a user, I want to keep track of my wins and losses
5. As a user, I want my cursor to look like a missile when I am hovering to attack.

## Version 3
1. As a user, I want customizable ships.
2. As a user, I want sound effects.
3. As a user, I want different types of boats
4. As a user, I want better, non-random AI.

# Pseudocode for MVP User Stories
- As a user, I want to see a Battleship board.
    - create a div for the AI's grid and a div for the player's grid in html
    - use css to add a 10x10 grid to both the player and AI grid divs
---
- As a user, I want to see a new game button.
    - create a button element in html
    - style in CSS
---
- As a user, I want to have 5 different kinds of ships.
    - create an array in Javascript with each boat having a different value of number of cells it takes up in the grid
---
- As a user, I want to have an AI Opponent that attacks randomly
    - implement a random x-coordinate and y-coordinate generator to provide the AI's attacks
---
- As a user, I want the AI to have the same types of ships that I do.
    - create another array for the AI's ships with the same values, but a different variable name
---
- As a user, I want to be able to place my boats on my half of the board.
    - create a function to place ships, this would require click listeners on the cells in the grid
    - cells should have values to correspond to whether the cell is 
        1. empty and unattacked 
        2. occupied by a ship and unattacked
        3. empty and attacked (miss)
        4. occupied and attacked (hit)
---
- As a user, I want the AI's boats to be placed randomly, and invisible.
    - Use a for loop with random math to place each ship either horizontally or vertically, adding logic for if it fits or not
    - e.g. if the length of the boat will exceed the length of the board, it will not fit
---
- As a user, I want to be able to attack the AI's half of the board.
    - add click listeners on AI's grid to link to the player attack function
    - if a ship is located in the attacked cell, return hit, else return miss
---
- As a user, I want to know if an attack is a miss.
    - if the cell clicked on has a value of empty, it should return "miss" and change color accordingly 
---
- As a user, I want to know if an attack is a hit.
    - if the cell clicked on has a ship in it, it should return "hit" and change color accordingly
---
- As a user, I want to know if an attack sinks a ship.
    - if all of the cells containing a ship are attacked, display "ship has been sunk" and indicate visually on the board
---
- As a user, I want to know when I have sunk all of the AI's ships/won the game.
    - once all of the AI's ships are sunk, display "player wins game" message
    - logically, the AI has lost when the number of hits is equal to the total number of cells in all the boats. If the boats are 5, 4, 3, 3, and 2 cells long then the total number of hits required to win is 17.
---
- As a user, I want the AI to attack me after I attack it.
    - make the AI attack function take place after the player attack function has completed.
---
- As a user, I want to know if the AI's attack hits my ship.
    - if the cell clicked on has a ship in it, it should return "hit" and change color accordingly
---
- As a user, I want to know if the AI's attack misses my ship.
    - each cell that the AI attacks that doesn't contain a ship should return a value of miss and change color accordingly. 
---
- As a user, I want to know if the AI has sunk a ship. 
    - ships should have visual confirmation when they are sunk
---
- As a user, I want to know if I have lost the game.
    - If all user ships are sunk, return an "AI wins" message
---
- As a user, I want to know which coordinates I have already attacked.
    - Cells will be different colors depening on if they have:
        1. not been attacked
        2. attack was a miss
        3. attack was a hit
---
- As a user, I want to know which coordinates the AI has already attacked.
    - above functionality will be built in to both player and AI boards
---
- As a user, I want each attack to be unique, i.e. no repeated attacks allowed.
    - add an if else chain to the AI's attack generation to make sure that no cells that have already been attacked are selected again
    