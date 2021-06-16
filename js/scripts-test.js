function logDescription (description) {
  console.log(`%c ${description}`, 'font-weight: bold;')

  $('#output-tests li:last-child')
    .addClass('text-light')
    .append(`
    <h6 class="font-bold">${description}</h6>
  `)
}

function logResult (actual, expected, isValid) {
  if (isValid === undefined) {
    isValid = actual === expected
  }

  if (!isValid) {
    console.log(
      `%c -- Incorrect | actual: ${actual} | expected: ${expected}`,
      'background-color: #290000',
    )

    $('#output-tests li:last-child')
      .addClass('bg-danger')
      .append(`
      <p>Incorrect | actual: ${JSON.stringify(actual)} | expected: ${JSON.stringify(expected)}</p>
    `)
  } else {
    console.log('%c -- passed!', 'background-color: green')

    $('#output-tests li:last-child').addClass('bg-success')
  }
}

const tests = [
  () => {
    logDescription('A newly created GameManager class starts with correct properties initialized')

    const actual = new GameManager
    const expected = { 
      activePlayer: 0, 
      players: [
        { scoreCurrent: 0 },
        { scoreCurrent: 0 },
      ],
    }

    let isValid = true
    isValid = isValid && actual.activePlayer === expected.activePlayer
    isValid = isValid && actual.players.length === expected.players.length
    isValid = isValid && actual.players[0].scoreCurrent === expected.players[0].scoreCurrent
    isValid = isValid && actual.players[1].scoreCurrent === expected.players[1].scoreCurrent

    logResult(actual, expected, isValid)
  },

  () => {
    
    const gameManager = new GameManager()
    gameManager.setActivePlayer(0)
    
    const actual = gameManager.activePlayer
    const expected = 0
    
    logDescription('GameManager.setActivePlayer(0) updates the activePlayer accordingly')
    logResult(actual, expected)
  },

  () => {
    logDescription('GameManager.setActivePlayer(1) updates the activePlayer accordingly')
    
    const gameManager = new GameManager()
    gameManager.setActivePlayer(1)
    
    const actual = gameManager.activePlayer
    const expected = 1
    
    logResult(actual, expected)
  },

  () => {
    logDescription('GameManager.setActivePlayer(2) does not change the activePlayer')
    
    const gameManager = new GameManager()
    gameManager.setActivePlayer(2)
    
    const actual = gameManager.activePlayer
    const expected = 0
    
    logResult(actual, expected)
  },

  () => {
    logDescription('GameManager.addCurrentScoreForPlayer(0, 10) adds 10 points to first player')
    
    const gameManager = new GameManager()
    gameManager.addCurrentScoreForPlayer(0, 10)
    
    logResult(gameManager.players[0].scoreCurrent, 10)
  },

  () => {
    logDescription('GameManager.addCurrentScoreForPlayer(1, 5) adds 5 points to second player')
    
    const gameManager = new GameManager()
    gameManager.addCurrentScoreForPlayer(1, 5)
    
    logResult(gameManager.players[1].scoreCurrent, 5)
  },

  () => {
    logDescription('GameManager.setLastRollForPlayer(0, 2) sets a roll of 2 for player 1')
    
    const gameManager = new GameManager()
    gameManager.setLastRollForPlayer(0, 2)
    
    logResult(gameManager.players[0].lastRoll, 2)
  },

  () => {
    logDescription('GameManager.setLastRollForPlayer(1, 5) sets a roll of 6 for player 2')
    
    const gameManager = new GameManager()
    gameManager.setLastRollForPlayer(1, 6)
    
    logResult(gameManager.players[1].lastRoll, 6)
  },

  () => {
    logDescription('GameManager.holdPlayer(0) updates the player 1 total score with current score, and wipes current values')
    
    const gameManager = new GameManager()
    gameManager.addCurrentScoreForPlayer(0, 6)
    gameManager.setLastRollForPlayer(0, 6)
    gameManager.holdPlayer(0)

    let isValid = true
    isValid = isValid && gameManager.players[0].scoreTotal === 6
    isValid = isValid && gameManager.players[0].scoreCurrent === 0
    isValid = isValid && gameManager.players[0].lastRoll === 0
    
    logResult(gameManager.players[0], gameManager.players[0], isValid)
  },

  () => {
    logDescription('GameManager.holdPlayer(0) will switch the active player to player 2')
    
    const gameManager = new GameManager()
    gameManager.holdPlayer(0)
    
    logResult(gameManager.activePlayer, 1)
  },

  () => {
    logDescription('GameManager.holdPlayer(1) will switch the active player to player 1')
    
    const gameManager = new GameManager()
    gameManager.activePlayer = 1
    gameManager.holdPlayer(1)
    
    logResult(gameManager.activePlayer, 0)
  },

  () => {
    logDescription('GameManager.rollDice() returns a number between 1 and 6')
    
    let hadInvalidResult = false

    const gameManager = new GameManager()
    for (let i = 0; i < 1000; i++) {
      const roll = gameManager.rollDice()

      if (roll < 1 || roll > 6) {
        hadInvalidResult = roll
        break
      }
    }
    
    if (hadInvalidResult !== false) {
      logResult(hadInvalidResult, '1 - 6')
    } else {
      logResult('1 - 6', '1 - 6')
    }
  },
]

function runTests () {
  tests.forEach(test => {
    $('#output-tests').append(`
      <li class="list-group-item" />
    `)

    test()
  })
}

runTests()