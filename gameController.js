let width = 30;
let height = 30;
let game = require('./game')({width , height });

//Set up grid
for (let x = 0; x < width; x++) {
  let row = document.createElement('div');
  row.className = 'row';
  for (let y = 0; y < height; y++) {
    let tile = document.createElement('div');
    tile.className = 'tile';
    row.appendChild(tile);
  }
  document.getElementById('tile-container')
    .appendChild(row);
}

//Hook up events on the tile grid
let tiles = document.getElementsByClassName('tile');
for (let i = 0; i < tiles.length; i++) {
  let tile = tiles[i];
  tile.addEventListener('click', (e) => {
    toggleTile(tile);
  });
}

$('#step').click((e) => {
  game.step();
  updateTiles();
});

let gameInterval = null;
$('#play').click(function() {
  if (!gameInterval) {
    gameInterval = setInterval(() => {
      game.step();
      updateTiles();
    }, 300);
    $(this).text('Pause');
  } else {
    clearInterval(gameInterval);
    gameInterval = null;
    $(this).text('Play');
  }
});

function toggleTile(element) {
  let $element = $(element);
  //if (element.classList.contains('active')) {
  //  element.classList.remove('active');
  //  let x = element.parentNode.childNodes.slice(element);
  //  let y = element.parentNode.parentNode.childNodes.slice(element.parentNode);
  //  console.log(x, y);
  //} else {
  //  element.classList.add('active');
  //}
  $element.toggleClass('active');
  let x = $element.index();
  let y = $element.parent().index();
  game.toggleTile({x, y});
}

function updateTiles() {
  game.tiles.forEach((tileRow, x) => {
    tileRow.forEach((tile, y) => {
      let tileElement = $('#tile-container .row').eq(y).find('.tile').eq(x);
      tileElement.removeClass('active');
      if (tile.state) tileElement.addClass('active');
    });
  });
}
