import { render, screen, fireEvent } from "@testing-library/react";
import LetterTile, { LetterTileProps } from "./LetterTile";
import * as dragAndDrop from "../../utils/dragAndDrop";

const defaultProps: LetterTileProps = {
  tileData: { id: "A1", letter: "A" },
  tileLocation: "TilePile"
};

describe("LetterTile", () => {
  it("should render the component", () => {
    render(<LetterTile {...defaultProps} />);
    expect(screen.getByTestId(/tile/)).toBeInTheDocument();
    expect(screen.getByText(defaultProps.tileData.letter)).toBeInTheDocument();
  });

  it("should hide the letter when flipped is true", () => {
    render(<LetterTile {...defaultProps} flipped={true} />);
    expect(screen.getByTestId(/letter/)).toHaveClass(/flipped/);
  });

  it("should call handleDragStart on drag start", () => {
    const mockHandleDragStart = jest
      .spyOn(dragAndDrop, "handleDragStart")
      .mockImplementation(jest.fn());

    render(<LetterTile {...defaultProps} />);

    const tileElement = screen.getByTestId(`tile-${defaultProps.tileData.id}`);
    fireEvent.dragStart(tileElement);

    expect(mockHandleDragStart).toHaveBeenCalledTimes(1);
    expect(mockHandleDragStart).toHaveBeenCalledWith(
      expect.any(Object),
      { ...defaultProps.tileData },
      defaultProps.tileLocation
    );
  });
});
