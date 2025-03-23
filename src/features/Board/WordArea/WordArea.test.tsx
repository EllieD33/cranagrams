import { render, screen } from "@testing-library/react";
import WordArea, { WordAreaProps } from "./WordArea";

const defaultProps: WordAreaProps = {};

describe("WordArea", () => {
  it("should render the default component", () => {
    render(<WordArea {...defaultProps} />);
    expect(screen.getByTestId("wordGrid")).toBeInTheDocument();
  });
});
