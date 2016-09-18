var Game = require('./game');

let game = Game({
  width: 100,
  height: 100
});

console.log('Done');
// game.toggleTile({
//   x: 99,
//   y: 99
// });  
// game.changeTile();
// console.log(JSON.stringify(game.tiles));
game.step();