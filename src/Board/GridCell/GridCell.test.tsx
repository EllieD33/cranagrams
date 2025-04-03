import { render, fireEvent, screen } from "@testing-library/react";
import GridCell, { GridCellProps } from "./GridCell";
import { useTileState } from "../../context/TileStateContext";
import * as dragAndDrop from "../../utils/dragAndDrop";
import * as moveTileUtils from "../../utils/moveTile";

jest.mock("../../context/TileStateContext", () => ({
  useTileState: jest.fn()
}));

describe("GridCell Component", () => {
  const mockSetPlayerTiles = jest.fn();
  const mockSetTilePile = jest.fn();
  const mockSetWordGrid = jest.fn();

  const mockTileState = {
    wordGrid: [{ id: "1", letter: "A", row: 0, col: 0 }],
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

  const defaultProps: GridCellProps = {
    rowIndex: 0,
    colIndex: 0
  };

  it("renders correctly without a tile", () => {
    (useTileState as jest.Mock).mockReturnValue({ wordGrid: [] });
    render(<GridCell {...defaultProps} />);
    const cell = screen.getByTestId("tile-00");

    expect(cell).toBeInTheDocument();
    expect(cell.querySelector("p")).toBeNull();
  });

  it("renders correctly with a dropped tile", () => {
    render(<GridCell {...defaultProps} />);
    const cell = screen.getByTestId("tile-00");
    const letterElement = screen.getByTestId("letter");

    expect(cell).toBeInTheDocument();
    expect(letterElement).toHaveTextContent("A");
  });

  it("calls handleDragOver on drag over", () => {
    const mockHandleDragOver = jest
      .spyOn(dragAndDrop, "handleDragOver")
      .mockImplementation(() => {});

    render(<GridCell {...defaultProps} />);
    const cell = screen.getByTestId("tile-00");

    fireEvent.dragOver(cell);
    expect(mockHandleDragOver).toHaveBeenCalledTimes(1);
  });

  it("calls handleDrop and moveTile on drop", () => {
    const mockHandleDrop = jest
      .spyOn(dragAndDrop, "handleDrop")
      .mockImplementation(() => ({
        origin: "PlayerTray",
        target: "WordGrid",
        tile: { id: "1", letter: "A" },
        row: 0,
        col: 0
      }));

    const mockMoveTile = jest
      .spyOn(moveTileUtils, "moveTile")
      .mockImplementation(() => {});

    render(<GridCell {...defaultProps} />);
    const cell = screen.getByTestId("tile-00");

    fireEvent.drop(cell);

    expect(mockHandleDrop).toHaveBeenCalledWith(
      expect.any(Object),
      "WordGrid",
      0,
      0
    );
    expect(mockMoveTile).toHaveBeenCalledWith(
      "PlayerTray",
      "WordGrid",
      { id: "1", letter: "A" },
      0,
      0,
      {
        setPlayerTiles: mockSetPlayerTiles,
        setTilePile: mockSetTilePile,
        setWordGrid: mockSetWordGrid
      },
      [{ col: 0, id: "1", letter: "A", row: 0 }]
    );
  });
});
