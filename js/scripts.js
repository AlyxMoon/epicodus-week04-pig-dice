
function updatePlayerDisplay (gameManager) {
  $('#player-1 .current').text(gameManager.players[0].score)
  $('#player-2 .current').text(gameManager.players[1].score)
}

const main = () => {
  const gameManager = new GameManager()

  $('#player-1 .button-roll').on('click', function (event) {
    gameManager.addScoreToPlayer(0, gameManager.rollDice())
    updatePlayerDisplay(gameManager)
  })

  $('#player-1 .button-hold').on('click', function (event) {
  })

  $('#player-2 .button-roll').on('click', function (event) {
    gameManager.addScoreToPlayer(1, gameManager.rollDice())
    updatePlayerDisplay(gameManager)
  })

  $('#player-2 .button-hold').on('click', function (event) {
    alert('hold for player 2')
  })
}

$(main)