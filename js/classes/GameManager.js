class GameManager {
  constructor () {
    this.activePlayer = 0
    this.players = [
      { score: 0 },
      { score: 0 },
    ]
  }

  setActivePlayer (player) {
    if (player < this.players.length) {
      this.activePlayer = player
    }
  }

  addScoreToPlayer(player, score) {
    this.players[player].score += score
  }
}
