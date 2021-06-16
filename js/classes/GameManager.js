class GameManager {
  constructor () {
    this.activePlayer = 0
    this.players = [
      { scoreCurrent: 0, scoreTotal: 0 },
      { scoreCurrent: 0, scoreTotal: 0 },
    ]
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

  addCurrentScoreForPlayer(player, score) {
    this.players[player].scoreCurrent += score
  }

  setLastRollForPlayer (player, roll) {
    this.players[player].lastRoll = roll
  }

  holdPlayer (player) {
    const current = this.players[player].scoreCurrent

    this.players[player].scoreTotal += current
    this.players[player].scoreCurrent = 0
    this.players[player].lastRoll = 0

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
