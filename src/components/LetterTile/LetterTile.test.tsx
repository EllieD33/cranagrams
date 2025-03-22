import React from "react";
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
});
