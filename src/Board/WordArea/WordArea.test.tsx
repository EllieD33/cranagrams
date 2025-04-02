import { render, screen } from "@testing-library/react";
import WordArea, { WordAreaProps } from "./WordArea";
import { TileStateProvider } from "../../context/TileStateContext";

const defaultProps: WordAreaProps = {};

describe("WordArea", () => {
  it("should render the default component", () => {
    render(
      <TileStateProvider>
        <WordArea {...defaultProps} />
      </TileStateProvider>
    );
    expect(screen.getByTestId("wordGrid")).toBeInTheDocument();
  });
});
