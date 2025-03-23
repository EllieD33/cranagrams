import { render, screen } from "@testing-library/react";
import LetterTile, { LetterTileProps } from "./LetterTile";

const defaultProps: LetterTileProps = {
  letter: "a"
};

describe("LetterTile", () => {
  it("should render the component", () => {
    render(<LetterTile {...defaultProps} />);
    expect(screen.getByTestId(/tile/)).toBeInTheDocument();
    expect(
      screen.getByText(defaultProps.letter.toUpperCase())
    ).toBeInTheDocument();
  });

  it("should hide the letter when flipped is true", () => {
    render(<LetterTile {...defaultProps} flipped={true} />);
    expect(screen.getByTestId(/letter/)).toHaveClass(/flipped/);
  });
});
