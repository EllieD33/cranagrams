import { renderHook, act, waitFor } from "@testing-library/react";
import { useTileSelection } from "./useTileSelection";
import { TileType } from "../types/gameTypes";
import { tileDeck } from "../constants/tiles";

const mockTile: TileType = {
  id: "A1",
  letter: "A"
};

describe("useTileSelection", () => {
  it("should initialise with shuffled tiles from the tile deck", () => {
    const { result } = renderHook(() => useTileSelection());

    expect(result.current.remainingTiles.length).toBe(tileDeck.length);
    expect(result.current.playerTiles).toEqual([]);
  });

  it("should move a tile from remainingTiles to playerTiles when selected", () => {
    const { result } = renderHook(() => useTileSelection());

    act(() => {
      result.current.handleTileSelect(mockTile);
    });

    expect(result.current.playerTiles).toContainEqual(mockTile);
    expect(result.current.remainingTiles).not.toContainEqual(mockTile);
  });

  it("should not add more than 21 tiles to playerTiles", async () => {
    const { result } = renderHook(() => useTileSelection());

    for (let i = 0; i < 22; i++) {
      act(() => {
        result.current.handleTileSelect(tileDeck[i]);
      });
    }

    await waitFor(() => {
      expect(result.current.playerTiles.length).toBe(21);
    });
  });
});
