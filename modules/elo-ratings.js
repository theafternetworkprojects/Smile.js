module.exports = class Elo {
  constructor(){
    this.wins = 0
    this.loses = 0
    this.draws = 0
    this.opponentRatingsTotal = 0;
  }
  get rating(){
    return (this.opponentRatingsTotal + (400 * (this.wins - this.loses))) / (this.wins + this.loses + this.draws)
  }
}
