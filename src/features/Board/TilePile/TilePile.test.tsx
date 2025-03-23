import { render, screen } from "@testing-library/react";
import TilePile, { TilePileProps } from "./TilePile";
import { tileDeck } from "../../../constants/tiles";

const defaultProps: TilePileProps = { tiles: [...tileDeck] };

describe('TilePile', () => {
    it('should initially render the pile with 144 tiles component', () => {
        render(<TilePile {...defaultProps} />);
        expect(screen.getByTestId('pile')).toBeInTheDocument();
        expect(screen.getAllByTestId(/tile-/).length).toBe(144)
    });
});
