const Game = function (configObj) {
  let {width, height} = configObj;
  if (!width) width = 100;
  if (!height) height = 100;

  //Generate the structure

  let tiles = [];

  let liferules = [
    //Any live cell with fewer than two live neighbours dies, as if caused by under-population.
    (tile, neighbors) => {
        if (!tile.state) return false
        if (neighbors.length > 1) return true;
        else return false;
    },
    //Any live cell with two or three live neighbours lives on to the next generation.
    (tile, neighbors) => {
        if (!tile.state) return false;
        // if (neighbors.length ==)
    },
    //Any live cell with more than three live neighbours dies, as if by over-population.

    (tile, neighbors) => {

    },
    //Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.
    (tile, neighbors) => {

    }
  ];

  for (let i = 0; i < width; i++) {
    let subLevel = []
    tiles.push(subLevel);
    for (let j = 0; j < height; j++) {
      subLevel.push({
        state: false
      });
    }
  }

  let changeTile = (coordsObj, state) => {
    let tile = getTile(coordsObj);
    if (tile) tile.state = state;
  }

  let toggleTile = (coordsObj) => {
    let tile = getTile(coordsObj);
    if (tile) tile.state = !tile.state;
  }

  let step = () => {
    for (let x = 0; x < width; x++) {
      for (let y = 0; y < height; y++) {
        let coordsObj = { x, y };
        let tile = getTile(coordsObj);
        let neighbors = getNeighbors(coordsObj);

      }
    }
  }

  let getTile = (coordsObj) => {
    let {x,y} = coordsObj;
    if (!x || !y) return;
    return tiles[x][y];
  }

  let getNeighbors = (configObj) => {
    let {x,y} = configObj;
    if (!x || !y) return;
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
    return listNeighbors;
  }

  return {
    changeTile,
    toggleTile,
    tiles,
    step
  }
}

module.exports = Game;