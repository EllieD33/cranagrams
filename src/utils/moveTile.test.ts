import { moveTile } from "../utils/moveTile";
import { BoardArea, DragTarget, Tile } from "../types/gameTypes";

describe("moveTile function", () => {
  let mockSetPlayerTiles: jest.Mock;
  let mockSetTilePile: jest.Mock;
  let mockSetWordGrid: jest.Mock;

  const mockTile: Tile = { id: "1", letter: "A" };

  beforeEach(() => {
    mockSetPlayerTiles = jest.fn();
    mockSetTilePile = jest.fn();
    mockSetWordGrid = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("moves tile from TilePile to PlayerTray", () => {
    moveTile("TilePile", "PlayerTray", mockTile, null, null, {
      setPlayerTiles: mockSetPlayerTiles,
      setTilePile: mockSetTilePile,
      setWordGrid: mockSetWordGrid
    });

    expect(mockSetPlayerTiles).toHaveBeenCalledWith(expect.any(Function));
    expect(mockSetTilePile).toHaveBeenCalledWith(expect.any(Function));

    expect(mockSetPlayerTiles).toHaveBeenCalledWith(expect.any(Function));
    expect(mockSetTilePile).toHaveBeenCalledWith(expect.any(Function));
  });

  it("moves tile from PlayerTray to WordGrid", () => {
    moveTile("PlayerTray", "WordGrid", mockTile, 1, 1, {
      setPlayerTiles: mockSetPlayerTiles,
      setTilePile: mockSetTilePile,
      setWordGrid: mockSetWordGrid
    });

    expect(mockSetWordGrid).toHaveBeenCalledWith(expect.any(Function));
    expect(mockSetPlayerTiles).toHaveBeenCalledWith(expect.any(Function));

    expect(mockSetWordGrid).toHaveBeenCalledWith(expect.any(Function));
    expect(mockSetPlayerTiles).toHaveBeenCalledWith(expect.any(Function));
  });

  it("moves tile within WordGrid", () => {
    moveTile("WordGrid", "WordGrid", mockTile, 2, 2, {
      setPlayerTiles: mockSetPlayerTiles,
      setTilePile: mockSetTilePile,
      setWordGrid: mockSetWordGrid
    });

    expect(mockSetWordGrid).toHaveBeenCalledWith(expect.any(Function));

    expect(mockSetPlayerTiles).not.toHaveBeenCalled();
    expect(mockSetTilePile).not.toHaveBeenCalled();
  });

  it("moves tile from WordGrid to PlayerTray", () => {
    moveTile("WordGrid", "PlayerTray", mockTile, null, null, {
      setPlayerTiles: mockSetPlayerTiles,
      setTilePile: mockSetTilePile,
      setWordGrid: mockSetWordGrid
    });

    expect(mockSetPlayerTiles).toHaveBeenCalledWith(expect.any(Function));
    expect(mockSetWordGrid).toHaveBeenCalledWith(expect.any(Function));

    expect(mockSetPlayerTiles).toHaveBeenCalledWith(expect.any(Function));
    expect(mockSetWordGrid).toHaveBeenCalledWith(expect.any(Function));
  });

  it("does not perform any actions when invalid move is attempted", () => {
    const consoleWarnSpy = jest
      .spyOn(console, "warn")
      .mockImplementation(() => {});

    moveTile(
      "WordGrid" as BoardArea,
      "TilePile" as DragTarget,
      mockTile,
      null,
      null,
      {
        setPlayerTiles: mockSetPlayerTiles,
        setTilePile: mockSetTilePile,
        setWordGrid: mockSetWordGrid
      }
    );

    expect(consoleWarnSpy).toHaveBeenCalledWith("Move not allowed");
    expect(mockSetPlayerTiles).not.toHaveBeenCalled();
    expect(mockSetTilePile).not.toHaveBeenCalled();
    expect(mockSetWordGrid).not.toHaveBeenCalled();

    consoleWarnSpy.mockRestore();
  });

  it("should update wordGrid when moving a tile within the grid", () => {
    const mockSetPlayerTiles = jest.fn();
    const mockSetTilePile = jest.fn();
    const mockSetWordGrid = jest.fn();

    const mockTile: Tile = { id: "1", letter: "A", row: 0, col: 0 };

    const currentWordGrid = [{ ...mockTile }];

    const setters = {
      setPlayerTiles: mockSetPlayerTiles,
      setTilePile: mockSetTilePile,
      setWordGrid: mockSetWordGrid
    };

    moveTile("WordGrid", "WordGrid", mockTile, 1, 1, setters);

    expect(mockSetWordGrid).toHaveBeenCalledTimes(1);

    expect(mockSetWordGrid).toHaveBeenCalledWith(expect.any(Function));

    const setWordGridFunction = mockSetWordGrid.mock.calls[0][0];
    const updatedWordGrid = setWordGridFunction(currentWordGrid);

    expect(updatedWordGrid).toEqual([{ id: "1", letter: "A", row: 1, col: 1 }]);
  });

  it("should call console.warn for invalid move from WordGrid to TilePile", () => {
    const mockTile = { id: "tile-5", letter: "E" } as Tile;
    const mockSetPlayerTiles = jest.fn();
    const mockSetTilePile = jest.fn();
    const mockSetWordGrid = jest.fn();

    const setters = {
      setPlayerTiles: mockSetPlayerTiles,
      setTilePile: mockSetTilePile,
      setWordGrid: mockSetWordGrid
    };

    const consoleWarnSpy = jest
      .spyOn(console, "warn")
      .mockImplementation(() => {});

    moveTile("WordGrid", "TilePile", mockTile, null, null, setters);

    expect(consoleWarnSpy).toHaveBeenCalledWith("Move not allowed");
    expect(mockSetPlayerTiles).not.toHaveBeenCalled();
    expect(mockSetTilePile).not.toHaveBeenCalled();
    expect(mockSetWordGrid).not.toHaveBeenCalled();

    consoleWarnSpy.mockRestore();
  });
});
