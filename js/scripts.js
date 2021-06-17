
const waitFor = (time = 1000) => {
  return new Promise(resolve => window.setTimeout(resolve, time))
}

function setUpEventWatchers (gameManager) {
  $('.button-roll').on('click', async () => {
    const roll = gameManager.rollDice()
    await simulateRollingDice(gameManager, roll)

    gameManager.doMove(roll)
    updatePlayerDisplay(gameManager)
  })

  $('.button-hold').on('click', () => {
    gameManager.holdPlayer(gameManager.activePlayer)
    updatePlayerDisplay(gameManager)
  })

  $('#input-toggle-tests').on('change', () => {
    $('.test-section, .main-section').toggleClass('d-none')
  })
}

async function simulateRollingDice (gameManager, finalRoll) {
  const activePlayer = gameManager.activePlayer
  const playerSelector = `#player-${activePlayer + 1}`

  const elDice = $(`${playerSelector} .dice`)
  const elButtons = $(`${playerSelector} button`)

  elButtons.attr('disabled', '')
  elDice.addClass('rolling')

  for (let i = 0; i < 5; i++) {
    const intermediateRoll = gameManager.rollDice()
    elDice.attr('data-roll', intermediateRoll)
    await waitFor(150)
  }

  elDice.attr('data-roll', finalRoll)
  elDice.removeClass('rolling')
  await waitFor(400)
  elButtons.removeAttr('disabled')
}

function updatePlayerDisplay (gameManager) {
  const activePlayer = gameManager.activePlayer
  const player1 = gameManager.players[0]
  const player2 = gameManager.players[1]

  if (gameManager.gameOver) {
    $('button').attr('disabled', '')

    if (player1.scoreTotal >= 100) {
      $('#player-1 .card-body').text('You win!')
      $('#player-2 .card-body').text('You lose!')
    }

    if (player2.scoreTotal >= 100) {
      $('#player-1 .card-body').text('You lose!')
      $('#player-2 .card-body').text('You win!')
    }

  } else if (activePlayer === 0) {
    $('#player-2 button').attr('disabled', '')
    $('#player-1 button').removeAttr('disabled')
  } else if (activePlayer === 1) {
    $('#player-1 button').attr('disabled', '')
    $('#player-2 button').removeAttr('disabled')
  }
  
  $('#player-1 .total').text(player1.scoreTotal)
  $('#player-1 .current').text(player1.scoreCurrent)
  // $('#player-1 .roll').text(player1.lastRoll)

  $('#player-2 .total').text(player2.scoreTotal)
  $('#player-2 .current').text(player2.scoreCurrent)
  // $('#player-2 .roll').text(player2.lastRoll)
}

const main = () => {
  const gameManager = new GameManager()

  setUpEventWatchers(gameManager)
  updatePlayerDisplay(gameManager)
}

$(main)