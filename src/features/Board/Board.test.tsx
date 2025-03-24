import { render, screen, fireEvent } from "@testing-library/react";
import Board from "./Board";
import { tileDeck } from "../../constants/tiles";

const getTileById = (id: string) => screen.getByTestId(`tile-${id}`);

describe("Board", () => {
  it("should render the default component", () => {
    render(<Board />);
    expect(screen.getByTestId("board")).toBeInTheDocument();
  });

  it("selects a tile and moves it to playerTiles", async () => {
    render(<Board />);

    const tile = tileDeck[0];
    const renderedTile = getTileById(tile.id);

    fireEvent.click(renderedTile);

    const playerTilePile = screen.getByTestId("playerTiles");
    const playerTiles = playerTilePile.querySelectorAll(
      '[data-testid^="tile-"]'
    );

    expect(playerTiles.length).toBe(1);
    expect(playerTiles[0]).toHaveTextContent(tile.letter);

    const remainingTilePile = screen.getByTestId("remainingTiles");
    const remainingTiles = remainingTilePile.querySelectorAll(
      '[data-testid^="tile-"]'
    );

    const remainingTilesAfterClick = remainingTiles.length;
    expect(remainingTilesAfterClick).toBe(tileDeck.length - 1);

    const remainingTileAfterClickId = remainingTilePile.querySelector(
      `[data-testid="tile-${tile.id}"]`
    );
    expect(remainingTileAfterClickId).toBeNull();
  });
});
