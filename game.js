const Game = function (configObj) {
  let {width, height} = configObj;
  if (!width) width = 100;
  if (!height) height = 100;

  //Generate the structure

  let tiles = [];

  for (let i = 0; i < width; i++) {
    let subLevel = []
    tiles.push(subLevel);
    for (let j = 0; j < height; j++) {
      subLevel.push({
        state: false
      });
    }
  }

  //Public Methods

  let changeTile = (coordsObj, state) => {
    let tile = getTile(coordsObj);
    if (tile) tile.state = state;
  }

  let toggleTile = (coordsObj) => {
    let tile = getTile(coordsObj);
    if (tile) tile.state = !tile.state;
  }

  let clearTiles = () => {
    tiles
      .reduce((fist, second) => fist.concat(second))
      .forEach((tile) => {
        tile.state = false;
      });
  }

  let step = () => {
    let tilesToChange = [];
    for (let x = 0; x < width; x++) {
      for (let y = 0; y < height; y++) {
        let coordsObj = { x, y };
        let tile = getTile(coordsObj);
        let neighbors = getNeighbors(coordsObj);
        let newValue = null;
        newValue = checkTile(tile, neighbors);
        if (newValue != tile.state) {
          tilesToChange.push({ tile, newValue });
        }
      }
    }
    tilesToChange.forEach((changeObj) => {
      let {tile, newValue} = changeObj;
      if (tile == undefined || newValue == undefined) return;
      tile.state = newValue;
    });
  }

  //Private Methods
  let checkTile = (tile, neighbors) => {
    //Any live cell with fewer than two live neighbours dies, as if caused by under-population.
    //Any live cell with two or three live neighbours lives on to the next generation.
    //Any live cell with more than three live neighbours dies, as if by over-population.
    //Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.
    let liveNeighbors = neighbors.filter(i => i.state);
    if (tile.state) {
      if (liveNeighbors.length < 2) return false;
      if (liveNeighbors.length == 2 || liveNeighbors.length == 3) return true;
      if (liveNeighbors.length > 2) return false;
    } else {
      if (liveNeighbors.length == 3) return true;
      else return false;
    }
  };

  let getTile = (coordsObj) => {
    let {x,y} = coordsObj;
    if (x == undefined || y == undefined) return;
    if (x > (height - 1) || x < 0) return  null;
    if (y > (width - 1) || y < 0) return  null;
    return tiles[x][y];
  }

  let getNeighbors = (configObj) => {
    let {x,y} = configObj;
    if (x == undefined || y == undefined) return;
    let tile = getTile(configObj);
    if (!tile) return;
    let listNeighbors = [
      getTile({
        x,
        y: y - 1
      }),
      getTile({
        x: x + 1,
        y: y - 1
      }),
      getTile({
        x: x + 1,
        y
      }),
      getTile({
        x: x + 1,
        y: y + 1
      }),
      getTile({
        x,
        y: y + 1
      }),
      getTile({
        x: x - 1,
        y: y + 1
      }),
      getTile({
        x: x - 1,
        y
      }),
      getTile({
        x: x - 1,
        y: y - 1
      })
    ];
    return listNeighbors.filter((item) => {
      return item != null;  
    });
  }

  return {
    changeTile,
    toggleTile,
    tiles,
    step,
    clearTiles
  }
}

module.exports = Game;
