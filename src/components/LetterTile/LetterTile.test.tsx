import { fireEvent, render, screen } from "@testing-library/react";
import LetterTile, { LetterTileProps } from "./LetterTile";

const defaultProps: LetterTileProps = {
  tileData: { id: "A1", letter: "A" },
  onClick: jest.fn()
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

  it("should call the onClick when tile is clicked", () => {
    render(<LetterTile {...defaultProps} />);
    const tile = screen.getByTestId(/tile/);
    fireEvent.click(tile);
    expect(defaultProps.onClick).toHaveBeenCalledTimes(1);
  });
});
