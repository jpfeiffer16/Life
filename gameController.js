(($, Game) => {
  //Vars
  let width = 30;
  let height = 30;
  let game = Game({ width , height });
  let gameInterval = null;

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

  adjustTiles();

  //Hook up events on the tile grid
  $('.tile').click(function(e) {
    toggleTile($(this));
  });

  //Hookup control events
  $('#step').click((e) => {
    game.step();
    updateTiles();
  });

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

  $('#clear').click(function() {
    game.clearTiles();
    updateTiles();
  });

  //Utility Methods
  function toggleTile($element) {
    $element.toggleClass('active');
    let x = $element.index(),
        y = $element.parent().index();
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

  function adjustTiles() {
    let windowWidth = window.innerWidth;
    let tileWidth = (windowWidth / width) / 1.5;
    $('.tile').width(tileWidth);
    $('.row').height(tileWidth);
  }
})(jQuery, require('./game'));