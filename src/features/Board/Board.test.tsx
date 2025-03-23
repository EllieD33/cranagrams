import React from "react";
import { render, screen } from "@testing-library/react";
import Board, { BoardProps } from "./Board";

const defaultProps: BoardProps = {};

describe('Board', () => {
    it('should render the default component', () => {
        render(<Board {...defaultProps} />);
        expect(screen.getByTestId('board')).toBeInTheDocument();
    });
});
