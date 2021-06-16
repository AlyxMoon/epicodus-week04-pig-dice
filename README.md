# Epicodus | Week 04 | Making a Game - Pig Dice

> Write a program where two users can play Pig dice against each other. Don't forget to write plain English specifications with example inputs and outputs before you begin coding!

## Further Exploration
- Add options to play one of the other variations of Pig Dice using two or more dice
- Add option to play the computer - easy or hard levels:
  - Easy: Computer always stops after second roll.
  - Hard: Computer uses strategy based on current total and rolled dice.

## Live Site
[https://alyxmoon.github.io/epicodus-week04-pig-dice/](https://alyxmoon.github.io/epicodus-week04-pig-dice/)

## Outline

Overall game loop:
1. game starts with both players initialized
    - both players have a score of 0
2. Set player one as the active player
3. Allow player one to do a turn
4. Turn logic is as follows:
    - Player can either "hold" or "roll"
    - if player rolls, get a dice result, 1-6
      - if result is 2-6, add to the player's turn score, and repeat turn logic
      - if result if 1, set turn score to 0 and skip to step 5
    - if player holds, add turn score to their overall score and go to next step
5. Set player two as the active player
6. Do turn logic as per step 4
7. Repeat steps 2-6, until a player has reached a total score of 100 after ending their turn
8. Once a player has reached 100, mark them as the winner and end the game


## Tests

### Describe class GameManager

```
Test: A newly created GameManager class starts with correct properties initialized
Code: new GameManager()
Expected: GameManager { activePlayer: 0, players: [{ scoreCurrent: 0 }, { scoreCurrent: 0} ]}
```

#### Describe GameManager.setActivePlayer ()

```
Test: GameManager.setActivePlayer(0) updates the activePlayer accordingly
Code:
const gameManager = new GameManager()
gameManager.setActivePlayer(0)
Expected: gameManager.activePlayer === 0
```

```
Test: GameManager.setActivePlayer(1) updates the activePlayer accordingly
Code:
const gameManager = new GameManager()
gameManager.setActivePlayer(1)
Expected: gameManager.activePlayer === 1
```

```
Test: GameManager.setActivePlayer(2) does not change the activePlayer
Code:
const gameManager = new GameManager()
gameManager.setActivePlayer(2)
Expected: gameManager.activePlayer === 0
```

```
Test: GameManager.addScoreToPlayer(0, 10) adds 10 points to first player
Code:
const gameManager = new GameManager()
gameManager.addScoreToPlayer(0, 10)
Expected: gameManager.players[0].scoreCurrent === 10
```

```
Test: GameManager.addScoreToPlayer(1, 5) adds 5 points to second player
Code:
const gameManager = new GameManager()
gameManager.addScoreToPlayer(1, 5)
Expected: gameManager.players[1].scoreCurrent === 5
```

```
Test: GameManager.setLastRollForPlayer(0, 2) sets a roll of 2 for player 1
Code:
const gameManager = new GameManager()
gameManager.setLastRollForPlayer(0, 2)
Expected: gameManager.players[0].lastRoll === 2
```

```
Test: GameManager.setLastRollForPlayer(1, 6) sets a roll of 6 for player 2
Code:
const gameManager = new GameManager()
gameManager.setLastRollForPlayer(1, 6)
Expected: gameManager.players[1].lastRoll === 6
```

```
Test: GameManager.holdPlayer(0) updates the player 1 total score with current score, and wipes current values
Code:
const gameManager = new GameManager()
gameManager.addCurrentScoreForPlayer(0, 6)
gameManager.setLastRollForPlayer(0, 6)
gameManager.holdPlayer(0)
Expected: gameManager.players[0] === { scoreTotal: 6, scoreCurrent: 0, lastRoll: 0 }
```

```
Test: GameManager.holdPlayer(0) will switch the active player to player 2
Code:
const gameManager = new GameManager()
gameManager.holdPlayer(0)
Expected: gameManager.activePlayer === 1
```

```
Test: GameManager.holdPlayer(1) will switch the active player to player 1
Code:
const gameManager = new GameManager()
gameManager.activePlayer = 1
gameManager.holdPlayer(1)
Expected: gameManager.activePlayer === 0
```

```
Test: GameManager.rollDice() gives a number between 1 and 6
Code:
const gameManager = new GameManager()
gameManager.rollDice()
Expected: a number between 1 and 6
```
