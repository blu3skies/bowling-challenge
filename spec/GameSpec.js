describe('Game', function(){

  var game

  beforeEach(function(){
    game = new Game(player1 = new Player('Tim'), player2 = new Player('Harry'))
  });

  it('game should be created with players', function() {
    expect(game.player1.name).toEqual('Tim')
    expect(game.player2.name).toEqual('Harry')
  });

  it('game should start on first turn', function(){
    expect(game.player1.turn).toEqual(1)
  });

  describe('keeping score', function(){

    it('score after first turn should be 9', function(){
      game.player1.firstRoll(5)
      game.player1.secondRoll(4)
      expect(game.player1.score).toEqual(9)
      expect(game.player1.spare).toEqual(false)
      expect(game.player1.onStrike).toEqual(false)
      expect(game.player1.scoreTracker.length + 1).toEqual(2) // +1 because array start a 0
    });

    it('score a spare', function(){
      game.player2.firstRoll(4)
      game.player2.secondRoll(6)
      expect(game.player2.spare).toEqual(true)
      expect(game.player2.onStrike).toEqual(false)
    });

    it('second turn after no strikes or spares', function(){
      game.player1.firstRoll(5)
      game.player1.secondRoll(4)
      game.player1.firstRoll(2)
      game.player1.secondRoll(4)
      expect(game.player1.score).toEqual(15)
      expect(game.player1.scoreTracker).toEqual([[5,4], [2,4]])
    });

    it('second turn score after a spare in the first turn', function(){
      game.player2.firstRoll(6)
      game.player2.secondRoll(4)
      expect(game.player2.score).toEqual(0)
      game.player2.firstRoll(7)
      expect(game.player2.score).toEqual(17)
      game.player2.secondRoll(1)
      expect(game.player2.score).toEqual(25)
      expect(game.player2.scoreTracker).toEqual([[6,'spare'], [7,1]])
    });

    it('end of third turn after a strike', function(){
      game.player1.firstRoll(3)
      game.player1.secondRoll(2)
      expect(game.player1.score).toEqual(5)
      game.player1.firstRoll(10)
      expect(game.player1.onStrike).toEqual(true)
      expect(game.player1.score).toEqual(5)
      game.player1.firstRoll(5)
      game.player1.secondRoll(2)
      expect(game.player1.score).toEqual(29)

    });
  }); 
});