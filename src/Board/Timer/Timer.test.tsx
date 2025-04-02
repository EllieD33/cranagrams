import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Timer from "./Timer";

describe("Timer", () => {
  it("should render the default component", () => {
    render(<Timer />);
    const stopwatch = screen.getByTestId("stopwatch");
    const digits = screen.getByTestId("digits");

    expect(stopwatch).toBeInTheDocument();
    expect(digits).toHaveTextContent("00:00:00");
  });

  it("should render start and reset control buttons when timer is not running", () => {
    render(<Timer />);

    const startButton = screen.getByLabelText("Start timer");
    const stopButton = screen.queryByLabelText("Stop timer");
    const resetButton = screen.getByLabelText("Reset timer");

    expect(startButton).toBeInTheDocument();
    expect(stopButton).not.toBeInTheDocument();
    expect(resetButton).toBeInTheDocument();
  });

  it("should render stop and reset control buttons when timer is running", async () => {
    render(<Timer />);

    const startButton = screen.getByLabelText("Start timer");
    const resetButton = screen.getByLabelText("Reset timer");

    fireEvent.click(startButton);

    await waitFor(() => {
      const stopButton = screen.getByLabelText("Stop timer");
      expect(screen.queryByLabelText("Start timer")).toBeNull();
      expect(stopButton).toBeInTheDocument();
      expect(resetButton).toBeInTheDocument();
    });
  });
});
