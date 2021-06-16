


const main = () => {
  const gameManager = new GameManager()

  $('#player-1 .button-roll').on('click', function (event) {
    alert('roll for player 1')
  })

  $('#player-1 .button-hold').on('click', function (event) {
    alert('hold for player 1')
  })

  $('#player-2 .button-roll').on('click', function (event) {
    alert('roll for player 2')
  })

  $('#player-2 .button-hold').on('click', function (event) {
    alert('hold for player 2')
  })
}

$(main)