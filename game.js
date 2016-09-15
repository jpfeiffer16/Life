const Game = function (configObj) {
  let {width, height} = configObj;
  if (!width) width = 100;
  if (!height) height = 100;

  //Generate the structure

  var tiles = [][];
  

  let changeTile = (coordsObj) => {
    let {x, y} = coordsObj;
    if (!x || !y) return;
  }
}

module.exports = new Game();