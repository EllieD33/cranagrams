import { render, fireEvent, screen } from "@testing-library/react";
import { useTileState } from "../../context/TileStateContext";
import * as dragAndDrop from "../../utils/dragAndDrop";
import * as moveTileUtils from "../../utils/moveTile";
import TileTray from "./TileTray";

jest.mock("../../context/TileStateContext", () => ({
  useTileState: jest.fn()
}));

describe("TileTray Component", () => {
  const mockSetPlayerTiles = jest.fn();
  const mockSetTilePile = jest.fn();
  const mockSetWordGrid = jest.fn();

  const mockTileState = {
    tilePile: [{ id: "1", letter: "A" }],
    playerTiles: [{ id: "2", letter: "B" }],
    setPlayerTiles: mockSetPlayerTiles,
    setTilePile: mockSetTilePile,
    setWordGrid: mockSetWordGrid
  };

  beforeEach(() => {
    (useTileState as jest.Mock).mockReturnValue(mockTileState);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders tiles correctly for TilePile variant", () => {
    render(<TileTray variant="TilePile" />);
    const tilePile = screen.getByTestId("TilePile");

    expect(tilePile).toBeInTheDocument();
    expect(screen.getByText("A")).toBeInTheDocument();
  });

  it("renders tiles correctly for PlayerTray variant", () => {
    render(<TileTray variant="PlayerTray" />);
    const playerTray = screen.getByTestId("PlayerTray");

    expect(playerTray).toBeInTheDocument();
    expect(screen.getByText("B")).toBeInTheDocument();
  });

  it("calls handleDragOver on drag over", () => {
    const mockHandleDragOver = jest
      .spyOn(dragAndDrop, "handleDragOver")
      .mockImplementation(() => {});

    render(<TileTray variant="TilePile" />);
    const tray = screen.getByTestId("TilePile");

    fireEvent.dragOver(tray);
    expect(mockHandleDragOver).toHaveBeenCalledTimes(1);
  });

  it("calls handleDrop and moveTile on drop", () => {
    const mockHandleDrop = jest
      .spyOn(dragAndDrop, "handleDrop")
      .mockImplementation(() => ({
        origin: "TilePile",
        target: "PlayerTray",
        tile: { id: "1", letter: "A" },
        row: 0,
        col: 0
      }));

    const mockMoveTile = jest
      .spyOn(moveTileUtils, "moveTile")
      .mockImplementation(() => {});

    render(<TileTray variant="TilePile" />);
    const tray = screen.getByTestId("TilePile");

    fireEvent.drop(tray);

    expect(mockHandleDrop).toHaveBeenCalledWith(
      expect.any(Object),
      "TilePile",
      null,
      null
    );
    expect(mockMoveTile).toHaveBeenCalledWith(
      "TilePile",
      "PlayerTray",
      { id: "1", letter: "A" },
      0,
      0,
      {
        setPlayerTiles: mockSetPlayerTiles,
        setTilePile: mockSetTilePile,
        setWordGrid: mockSetWordGrid
      }
    );
  });
});
