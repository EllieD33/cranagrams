import { render, screen, act, renderHook } from "@testing-library/react";
import { TileStateProvider, useTileState } from "../context/TileStateContext";

// Mock Component to consume the context
const TestComponent = () => {
  const { tilePile, playerTiles, wordGrid, setPlayerTiles } = useTileState();

  return (
    <div>
      <div data-testid="tile-pile-count">{tilePile.length}</div>
      <div data-testid="player-tiles-count">{playerTiles.length}</div>
      <div data-testid="word-grid-count">{wordGrid.length}</div>
      <button
        data-testid="add-player-tile"
        onClick={() =>
          setPlayerTiles([...playerTiles, { id: "1", letter: "A" }])
        }
      >
        Add Player Tile
      </button>
    </div>
  );
};

describe("TileStateContext", () => {
  it("should provide initial state correctly", () => {
    render(
      <TileStateProvider>
        <TestComponent />
      </TileStateProvider>
    );

    const tilePileCount = screen.getByTestId("tile-pile-count");
    const playerTilesCount = screen.getByTestId("player-tiles-count");
    const wordGridCount = screen.getByTestId("word-grid-count");

    expect(tilePileCount.textContent).toBe("144");
    expect(playerTilesCount.textContent).toBe("0");
    expect(wordGridCount.textContent).toBe("0");
  });

  it("should provide all setters", () => {
    const { result } = renderHook(() => useTileState(), {
      wrapper: TileStateProvider
    });

    expect(result.current).toHaveProperty("tilePile");
    expect(result.current).toHaveProperty("setTilePile");
    expect(result.current).toHaveProperty("playerTiles");
    expect(result.current).toHaveProperty("setPlayerTiles");
    expect(result.current).toHaveProperty("wordGrid");
    expect(result.current).toHaveProperty("setWordGrid");
  });

  it("should update state when setPlayerTiles is called", () => {
    render(
      <TileStateProvider>
        <TestComponent />
      </TileStateProvider>
    );

    const addPlayerTileButton = screen.getByTestId("add-player-tile");

    act(() => {
      addPlayerTileButton.click();
    });

    const playerTilesCount = screen.getByTestId("player-tiles-count");
    expect(playerTilesCount.textContent).toBe("1");
  });

  it("throws an error if used outside of TileStateProvider", () => {
    expect(() => renderHook(() => useTileState())).toThrow(
      "useTileState must be used within a TileStateProvider"
    );
  });
});
