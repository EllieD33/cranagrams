import { render, screen, fireEvent } from "@testing-library/react";
import Timer from "./Timer";

describe("Timer", () => {
  it("should render the default component", () => {
    render(<Timer />);
    const stopwatch = screen.getByTestId("stopwatch");
    const digits = screen.getByTestId("digits");

    expect(stopwatch).toBeInTheDocument();
    expect(digits).toHaveTextContent("00:00:00");
  });

  it("should render timer control buttons", () => {
    render(<Timer />);

    const startButton = screen.getByLabelText("Start timer");
    const stopButton = screen.getByLabelText("Stop timer");
    const resetButton = screen.getByLabelText("Reset timer");

    expect(startButton).toBeInTheDocument();
    expect(stopButton).toBeInTheDocument();
    expect(resetButton).toBeInTheDocument();
  });

  it("should call onClick functions when buttons are clicked", () => {
    render(<Timer />);

    const startButton = screen.getByLabelText("Start timer");
    const stopButton = screen.getByLabelText("Stop timer");
    const resetButton = screen.getByLabelText("Reset timer");

    const mockOnClick = jest.fn();

    startButton.onclick = mockOnClick;
    stopButton.onclick = mockOnClick;
    resetButton.onclick = mockOnClick;

    fireEvent.click(startButton);
    fireEvent.click(stopButton);
    fireEvent.click(resetButton);

    expect(mockOnClick).toHaveBeenCalledTimes(3);
  });
});
