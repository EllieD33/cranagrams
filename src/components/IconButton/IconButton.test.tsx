import { fireEvent, render, screen } from "@testing-library/react";
import IconButton, { IconButtonProps } from "./IconButton";

const defaultProps: IconButtonProps = {
  icon: "start",
  ariaLabel: "Start",
  onClick: () => {}
};

describe("IconButton", () => {
  it("should render the component", () => {
    render(<IconButton {...defaultProps} />);
    const button = screen.getByTestId(`${defaultProps.icon}IconButton`);
    expect(button).toBeInTheDocument();
  });

  it("should have an aria label", () => {
    render(<IconButton {...defaultProps} />);
    expect(screen.getByLabelText(defaultProps.ariaLabel)).toBeInTheDocument();
  });

  it("should disabled button when disabled prop is true", () => {
    render(<IconButton {...defaultProps} disabled={true} />);
    const button = screen.getByTestId(`${defaultProps.icon}IconButton`);
    expect(button).toBeDisabled();
  });

  it("should call onClick when clicked", () => {
    const mockOnClick = jest.fn();
    render(<IconButton {...defaultProps} onClick={mockOnClick} />);
    const button = screen.getByTestId(`${defaultProps.icon}IconButton`);
    fireEvent.click(button);
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });
});
