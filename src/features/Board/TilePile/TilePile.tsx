import { ReactElement } from "react";
import styles from "./TilePile.module.css";
import LetterTile from "../../../components/LetterTile/LetterTile";

export interface TilePileProps {
    tiles: string[]
};

const TilePile = ({ tiles }: TilePileProps): ReactElement => {
    return (
        <div>
            <div className={styles.pile} data-testid="pile">
                {tiles.map((tile, index) => <LetterTile letter={tile} key={`${tile}${index}`} />)}
            </div>
            <div></div>
        </div>
    );
};

export default TilePile;
