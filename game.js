const Game = function (configObj) {
  let {width, height} = configObj;
  if (!width) width = 100;
  if (!height) height = 100;

  //Generate the structure

  let tiles = [];

  for (var i = 0; i < width; i++) {
    let subLevel = []
    tiles.push(subLevel);
    for (var j = 0; j < height; j++) {
      subLevel.push({
        state: false
      });
    }
  }
  let changeTile = (coordsObj, state) => {
    let {x, y} = coordsObj;
    if (!x || !y) return;
    tiles[x][y].state = state;
  }

  let toggleTile = (coordsObj) => {
    let {x, y} = coordsObj;
    if (!x || !y) return;
    let tile = tiles[x][y];
    tile.state = !tile.state;
  }

  return {
    changeTile,
    toggleTile,
    tiles
  }
}

module.exports = Game;