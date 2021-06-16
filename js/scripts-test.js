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