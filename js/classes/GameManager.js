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

  addCurrentScoreForPlayer(player, score) {
    this.players[player].scoreCurrent += score
  }

  setLastRollForPlayer (player, roll) {
    this.players[player].lastRoll = roll
  }

  rollDice () {
    return Math.floor(Math.random() * 6) + 1
  }
}
