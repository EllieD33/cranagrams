import {
  addToPlayerTray,
  addToWordGrid,
  isPositionOccupied,
  moveTile,
  removeTile,
  updateTilePosition,
  updateWordGridPosition
} from "../utils/moveTile";
import { Tile } from "../types/gameTypes";

describe("addToPlayerTray", () => {
  it("should add a tile to an empty tray", () => {
    const tiles: Tile[] = [];
    const tile: Tile = { id: "1", letter: "A" };
    const result = addToPlayerTray(tiles, tile);
    expect(result).toEqual([tile]);
  });

  it("should add a tile to an existing tray", () => {
    const tiles: Tile[] = [{ id: "1", letter: "A" }];
    const newTile: Tile = { id: "2", letter: "B" };
    const result = addToPlayerTray(tiles, newTile);
    expect(result).toEqual([
      { id: "1", letter: "A" },
      { id: "2", letter: "B" }
    ]);
  });

  it("should add multiple tiles correctly", () => {
    const tiles: Tile[] = [{ id: "1", letter: "A" }];
    const newTile1: Tile = { id: "2", letter: "B" };
    const newTile2: Tile = { id: "3", letter: "C" };
    const result = addToPlayerTray(addToPlayerTray(tiles, newTile1), newTile2);
    expect(result).toEqual([
      { id: "1", letter: "A" },
      { id: "2", letter: "B" },
      { id: "3", letter: "C" }
    ]);
  });

  it("should not modify original array when adding a tile", () => {
    const tiles: Tile[] = [{ id: "1", letter: "A" }];
    const newTile: Tile = { id: "2", letter: "B" };
    const result = addToPlayerTray(tiles, newTile);
    expect(result).not.toBe(tiles);
  });
});

describe("removeTile", () => {
  it("should remove a tile from the tray", () => {
    const tiles: Tile[] = [
      { id: "1", letter: "A", row: 0, col: 0 },
      { id: "2", letter: "B", row: 1, col: 1 }
    ];
    const tileToRemove: Tile = { id: "1", letter: "A", row: 0, col: 0 };
    const result = removeTile(tiles, tileToRemove);
    expect(result).toEqual([{ id: "2", letter: "B", row: 1, col: 1 }]);
  });

  it("should not modify the tray if the tile is not found", () => {
    const tiles: Tile[] = [
      { id: "1", letter: "A", row: 0, col: 0 },
      { id: "2", letter: "B", row: 1, col: 1 }
    ];
    const tileToRemove: Tile = { id: "3", letter: "C", row: 2, col: 2 };
    const result = removeTile(tiles, tileToRemove);
    expect(result).toEqual(tiles);
  });

  it("should not modify the tray if the tile to remove is the last tile", () => {
    const tiles: Tile[] = [{ id: "1", letter: "A", row: 0, col: 0 }];
    const tileToRemove: Tile = { id: "1", letter: "A", row: 0, col: 0 };
    const result = removeTile(tiles, tileToRemove);
    expect(result).toEqual([]);
  });

  it("should return the same array if no tiles are passed", () => {
    const tiles: Tile[] = [];
    const tileToRemove: Tile = { id: "1", letter: "A", row: 0, col: 0 };
    const result = removeTile(tiles, tileToRemove);
    expect(result).toEqual([]);
  });
});

describe("isPositionOccupied", () => {
  it("should return true if the position is occupied by a tile", () => {
    const tiles: Tile[] = [
      { id: "1", letter: "A", row: 2, col: 3 },
      { id: "2", letter: "B", row: 4, col: 5 }
    ];

    expect(isPositionOccupied(tiles, 2, 3)).toBe(true);
  });

  it("should return false if the position is not occupied by a tile", () => {
    const tiles: Tile[] = [
      { id: "1", letter: "A", row: 2, col: 3 },
      { id: "2", letter: "B", row: 4, col: 5 }
    ];

    expect(isPositionOccupied(tiles, 0, 0)).toBe(false);
  });

  it("should return false when no tiles are present", () => {
    const tiles: Tile[] = [];

    expect(isPositionOccupied(tiles, 1, 1)).toBe(false);
  });

  it("should return false if the position is occupied by a tile but the row/col does not match", () => {
    const tiles: Tile[] = [{ id: "1", letter: "A", row: 2, col: 3 }];

    expect(isPositionOccupied(tiles, 3, 3)).toBe(false);
  });
});

describe("addToWordGrid", () => {
  it("should add a tile to an empty word grid", () => {
    const tiles: Tile[] = [];
    const tile: Tile = { id: "1", letter: "A", row: 0, col: 0 };
    const result = addToWordGrid(tiles, tile, 0, 1);
    expect(result).toEqual([{ id: "1", letter: "A", row: 0, col: 1 }]);
  });

  it("should add a tile to an existing word grid", () => {
    const tiles: Tile[] = [{ id: "1", letter: "A", row: 0, col: 0 }];
    const newTile: Tile = { id: "2", letter: "B", row: 1, col: 1 };
    const result = addToWordGrid(tiles, newTile, 1, 2);
    expect(result).toEqual([
      { id: "1", letter: "A", row: 0, col: 0 },
      { id: "2", letter: "B", row: 1, col: 2 }
    ]);
  });

  it("should add a tile with updated coordinates", () => {
    const tiles: Tile[] = [{ id: "1", letter: "A", row: 0, col: 0 }];
    const newTile: Tile = { id: "2", letter: "B", row: 0, col: 0 };
    const result = addToWordGrid(tiles, newTile, 1, 1);
    expect(result).toEqual([
      { id: "1", letter: "A", row: 0, col: 0 },
      { id: "2", letter: "B", row: 1, col: 1 }
    ]);
  });

  it("should not modify original array when adding a tile", () => {
    const tiles: Tile[] = [{ id: "1", letter: "A", row: 0, col: 0 }];
    const newTile: Tile = { id: "2", letter: "B", row: 1, col: 1 };
    const result = addToWordGrid(tiles, newTile, 1, 2);
    expect(result).not.toBe(tiles);
  });
});

describe("updateTilePosition", () => {
  it("should update the position of the tile", () => {
    const tile: Tile = { id: "1", letter: "A", row: 0, col: 0 };
    const result = updateTilePosition(tile, 1, 1);
    expect(result).toEqual({ id: "1", letter: "A", row: 1, col: 1 });
  });

  it("should not modify the original tile", () => {
    const tile: Tile = { id: "1", letter: "A", row: 0, col: 0 };
    const result = updateTilePosition(tile, 1, 1);
    expect(result).not.toBe(tile);
  });

  it("should handle updates to an already moved tile", () => {
    const tile: Tile = { id: "1", letter: "A", row: 1, col: 1 };
    const result = updateTilePosition(tile, 2, 2);
    expect(result).toEqual({ id: "1", letter: "A", row: 2, col: 2 });
  });
});

describe("updateWordGridPosition", () => {
  it("should update the position of the specified tile in the grid", () => {
    const tiles: Tile[] = [
      { id: "1", letter: "A", row: 0, col: 0 },
      { id: "2", letter: "B", row: 1, col: 1 }
    ];
    const tileToMove: Tile = { id: "1", letter: "A", row: 0, col: 0 };
    const result = updateWordGridPosition(tiles, tileToMove, 2, 2);
    expect(result).toEqual([
      { id: "1", letter: "A", row: 2, col: 2 },
      { id: "2", letter: "B", row: 1, col: 1 }
    ]);
  });

  it("should not modify tiles that are not being updated", () => {
    const tiles: Tile[] = [
      { id: "1", letter: "A", row: 0, col: 0 },
      { id: "2", letter: "B", row: 1, col: 1 }
    ];
    const tileToMove: Tile = { id: "1", letter: "A", row: 0, col: 0 };
    const result = updateWordGridPosition(tiles, tileToMove, 2, 2);
    expect(result[1]).toEqual({ id: "2", letter: "B", row: 1, col: 1 });
  });

  it("should return the same array if no matching tile is found", () => {
    const tiles: Tile[] = [
      { id: "1", letter: "A", row: 0, col: 0 },
      { id: "2", letter: "B", row: 1, col: 1 }
    ];
    const tileToMove: Tile = { id: "3", letter: "C", row: 2, col: 2 };
    const result = updateWordGridPosition(tiles, tileToMove, 2, 2);
    expect(result).toEqual(tiles);
  });

  it("should not modify the original tile array", () => {
    const tiles: Tile[] = [
      { id: "1", letter: "A", row: 0, col: 0 },
      { id: "2", letter: "B", row: 1, col: 1 }
    ];
    const tileToMove: Tile = { id: "1", letter: "A", row: 0, col: 0 };
    const result = updateWordGridPosition(tiles, tileToMove, 2, 2);
    expect(result).not.toBe(tiles);
  });
});

describe("moveTile", () => {
  const mockSetPlayerTiles = jest.fn();
  const mockSetTilePile = jest.fn();
  const mockSetWordGrid = jest.fn();

  const tile: Tile = { id: "1", letter: "A", row: 0, col: 0 };
  const wordGrid: Tile[] = [{ id: "2", letter: "B", row: 0, col: 1 }];
  const setters = {
    setPlayerTiles: mockSetPlayerTiles,
    setTilePile: mockSetTilePile,
    setWordGrid: mockSetWordGrid
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should move tile from TilePile to PlayerTray", () => {
    moveTile("TilePile", "PlayerTray", tile, null, null, setters);

    expect(setters.setPlayerTiles).toHaveBeenCalledTimes(1);
    expect(setters.setPlayerTiles).toHaveBeenCalledWith(expect.any(Function));

    const setPlayerTrayFunction = setters.setPlayerTiles.mock.calls[0][0];
    const updatedPlayerTray = setPlayerTrayFunction([]);
    expect(updatedPlayerTray).toEqual([{ ...tile, row: 0, col: 0 }]);

    expect(setters.setTilePile).toHaveBeenCalledTimes(1);
    expect(setters.setTilePile).toHaveBeenCalledWith(expect.any(Function));

    const setTilePileFunction = setters.setTilePile.mock.calls[0][0];
    const updatedTilePile = setTilePileFunction([tile]);
    expect(updatedTilePile).toEqual([]);
  });

  it("should move tile from PlayerTray to WordGrid if position is available", () => {
    moveTile("PlayerTray", "WordGrid", tile, 1, 1, setters, wordGrid);

    expect(setters.setWordGrid).toHaveBeenCalledTimes(1);
    expect(setters.setWordGrid).toHaveBeenCalledWith(expect.any(Function));

    const setWordGridFunction = setters.setWordGrid.mock.calls[0][0];
    const updatedWordGrid = setWordGridFunction([]);
    expect(updatedWordGrid).toEqual([{ ...tile, row: 1, col: 1 }]);

    expect(setters.setPlayerTiles).toHaveBeenCalledTimes(1);
    expect(setters.setPlayerTiles).toHaveBeenCalledWith(expect.any(Function));

    const setPlayerTrayFunction = setters.setPlayerTiles.mock.calls[0][0];
    const updatedPlayerTray = setPlayerTrayFunction([tile]);
    expect(updatedPlayerTray).toEqual([]);
  });

  it("should not move tile from PlayerTray to WordGrid if position is occupied", () => {
    const occupiedTile = { id: "2", letter: "B", row: 1, col: 1 };
    const occupiedGrid = [occupiedTile];

    moveTile("PlayerTray", "WordGrid", tile, 1, 1, setters, occupiedGrid);

    expect(setters.setWordGrid).not.toHaveBeenCalled();
    expect(setters.setPlayerTiles).not.toHaveBeenCalled();
  });

  it("should update position of a tile within WordGrid", () => {
    moveTile("WordGrid", "WordGrid", tile, 1, 1, setters, wordGrid);
    expect(setters.setWordGrid).toHaveBeenCalledWith(expect.any(Function));
    expect(setters.setWordGrid).toHaveBeenCalledTimes(1);

    const setWordGridFunction = setters.setWordGrid.mock.calls[0][0];
    const updatedWordGrid = setWordGridFunction(wordGrid);
    expect(updatedWordGrid).toEqual([{ id: "2", letter: "B", row: 0, col: 1 }]);
  });

  it("should move tile from WordGrid to PlayerTray", () => {
    moveTile("WordGrid", "PlayerTray", tile, null, null, setters);

    expect(setters.setPlayerTiles).toHaveBeenCalledTimes(1);
    expect(setters.setPlayerTiles).toHaveBeenCalledWith(expect.any(Function));

    const setPlayerTrayFunction = setters.setPlayerTiles.mock.calls[0][0];
    const updatedPlayerTray = setPlayerTrayFunction([]);
    expect(updatedPlayerTray).toEqual([{ ...tile, row: 0, col: 0 }]);

    expect(setters.setWordGrid).toHaveBeenCalledWith(expect.any(Function));
    expect(setters.setWordGrid).toHaveBeenCalledTimes(1);

    const setWordGridFunction = setters.setWordGrid.mock.calls[0][0];
    const updatedWordGrid = setWordGridFunction([{ ...tile, row: 0, col: 0 }]);
    expect(updatedWordGrid).toEqual([]);
  });

  it("should not move tile within WordGrid if target position is occupied", () => {
    const occupiedTile = { id: "2", letter: "B", row: 1, col: 1 };
    const occupiedGrid = [occupiedTile];

    moveTile("WordGrid", "WordGrid", tile, 1, 1, setters, occupiedGrid);

    expect(setters.setWordGrid).not.toHaveBeenCalled();
  });

  it("should log a warning if move is not allowed", () => {
    console.warn = jest.fn();
    moveTile("TilePile", "WordGrid", tile, null, null, setters);
    expect(console.warn).toHaveBeenCalledWith("Move not allowed");
  });
});
