import { render, screen } from "@testing-library/react";
import Board from "./Board";
import { TileStateProvider } from "../../context/TileStateContext";

describe("Board", () => {
  it("should render the default component", () => {
    render(
      <TileStateProvider>
        <Board />
      </TileStateProvider>
    );
    expect(screen.getByTestId("board")).toBeInTheDocument();
  });
});
