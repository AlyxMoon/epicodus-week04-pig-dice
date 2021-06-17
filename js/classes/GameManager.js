class GameManager {
  constructor () {
    this.activePlayer = 0
    this.players = [
      { scoreCurrent: 0, scoreTotal: 0 },
      { scoreCurrent: 0, scoreTotal: 0 },
    ]

    this.gameOver = false
  }

  doMove (rollForPlayer) {
    const roll = rollForPlayer || this.rollDice()

    this.setLastRollForPlayer(this.activePlayer, roll)
    this.addCurrentScoreForPlayer(this.activePlayer, roll)

    if (this.shouldEndTurn()) {
      this.setCurrentScoreForPlayer(this.activePlayer, 0)
      this.holdPlayer(this.activePlayer)
    }
  }

  setActivePlayer (player) {
    if (player < this.players.length) {
      this.activePlayer = player
    }
  }

  setNextActivePlayer () {
    this.activePlayer++
    if (this.activePlayer >= this.players.length) {
      this.activePlayer = 0
    }
  }

  addCurrentScoreForPlayer (player, score) {
    this.players[player].scoreCurrent += score
  }

  setCurrentScoreForPlayer (player) {
    this.players[player].scoreCurrent = 0
  }

  setLastRollForPlayer (player, roll) {
    this.players[player].lastRoll = roll
  }

  holdPlayer (player) {
    const current = this.players[player].scoreCurrent

    this.players[player].scoreTotal += current
    this.players[player].scoreCurrent = 0
    this.players[player].lastRoll = 0

    if (this.players[player].scoreTotal >= 100) {
      this.gameOver = true
      return
    }

    this.setNextActivePlayer()
  }

  shouldEndTurn ()  {
    const player = this.players[this.activePlayer]

    return player.lastRoll === 1
  }

  rollDice () {
    return Math.floor(Math.random() * 6) + 1
  }
}
