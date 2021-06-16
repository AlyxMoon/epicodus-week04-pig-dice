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
        { score: 0 },
        { score: 0 },
      ],
    }

    let isValid = true
    isValid = isValid && actual.activePlayer === expected.activePlayer
    isValid = isValid && actual.players.length === expected.players.length
    isValid = isValid && actual.players[0].score === expected.players[0].score
    isValid = isValid && actual.players[1].score === expected.players[1].score

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
    logDescription('GameManager.addScoreToPlayer(0, 10) adds 10 points to first player')
    
    const gameManager = new GameManager()
    gameManager.addScoreToPlayer(0, 10)
    
    logResult(gameManager.players[0].score, 10)
  },

  () => {
    logDescription('GameManager.addScoreToPlayer(1, 5) adds 5 points to second player')
    
    const gameManager = new GameManager()
    gameManager.addScoreToPlayer(1, 5)
    
    logResult(gameManager.players[1].score, 5)
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