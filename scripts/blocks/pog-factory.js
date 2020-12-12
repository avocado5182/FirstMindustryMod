const pogFactory = extendContent(Block, "pog-factory", {
  buildConfiguration(tile, table) {
    table.addImageButton(
    Icon.arrowUpSmall,
    Styles.clearTransi,

    // configure the tile to signal that it has been
    // pressed (this sync on client to server)
    run(() => tile.configure(0))
    ).size(50);
  },

  // override configure event
  configured(tile, value) {
    // make sure this silo has the items it needs to fire
    if (tile.entity.cons.valid()) {
      // make this effect occur at the tile location
      Effects.effect(siloLaunchEffect, tile);

      // create 10 bullets at this tile's location with
      // random rotation and velocity/lifetime
      for (var i = 0; i < 10; i++) {
        Calls.createBullet(
          Bullets.flakExplosive,
          tile.getTeam(),
          tile.drawx(),
          tile.drawy(),
          Mathf.random(360),
          Mathf.random(0.5, 1.0),
          Mathf.random(0.2, 1.0)
        );
      }

      // triggering consumption makes it use up the
      // items it requires
      tile.entity.cons.trigger();
    }
  }
}); 
