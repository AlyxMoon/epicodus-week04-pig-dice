
function setUpEventWatchers (gameManager) {
  $('#player-1 .button-roll').on('click', () => {
    const roll = gameManager.rollDice()

    gameManager.setLastRollForPlayer(0, roll)
    gameManager.addCurrentScoreForPlayer(0, roll)

    updatePlayerDisplay(gameManager)
  })

  $('#player-1 .button-hold').on('click', () => {
    gameManager.holdPlayer(0)
    updatePlayerDisplay(gameManager)
  })

  $('#player-2 .button-roll').on('click', () => {
    const roll = gameManager.rollDice()

    gameManager.setLastRollForPlayer(1, roll)
    gameManager.addCurrentScoreForPlayer(1, roll)

    updatePlayerDisplay(gameManager)
  })

  $('#player-2 .button-hold').on('click', () => {
    gameManager.holdPlayer(1)
    updatePlayerDisplay(gameManager)
  })
}

function updatePlayerDisplay (gameManager) {
  const activePlayer = gameManager.activePlayer
  const player1 = gameManager.players[0]
  const player2 = gameManager.players[1]

  if (activePlayer === 0) {
    $('#player-2 button').attr('disabled', '')
    $('#player-1 button').removeAttr('disabled')
  }

  if (activePlayer === 1) {
    $('#player-1 button').attr('disabled', '')
    $('#player-2 button').removeAttr('disabled')
  }
  
  $('#player-1 .total').text(player1.scoreTotal)
  $('#player-1 .current').text(player1.scoreCurrent)
  $('#player-1 .roll').text(player1.lastRoll)

  $('#player-2 .total').text(player2.scoreTotal)
  $('#player-2 .current').text(player2.scoreCurrent)
  $('#player-2 .roll').text(player2.lastRoll)
}

const main = () => {
  const gameManager = new GameManager()

  setUpEventWatchers(gameManager)
  updatePlayerDisplay(gameManager)
}

$(main)