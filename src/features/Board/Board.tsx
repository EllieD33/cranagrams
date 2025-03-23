import { ReactElement, useState } from "react";
import styles from "./Board.module.css";
import { tileDeck } from "../../constants/tiles";
import TilePile from "./TilePile/TilePile";
import WordArea from "./WordArea/WordArea";
import { shuffle } from "../../utils/shuffle";

export interface BoardProps { };

const Board = ({ }: BoardProps): ReactElement => {
    const [remainingTiles, setRemainingTiles] = useState<string[]>(() => shuffle([...tileDeck]));
    const [playerTiles, setPlayerTiles] = useState<string[]>(["A", "C", "F"]);

    return (
        <div className={styles.boardContainer} data-testid="board">
            <WordArea />
            <div className={styles.tilePileCol}>
                <TilePile tiles={remainingTiles} />
                <TilePile tiles={playerTiles} />
            </div>
        </div>
    );
};

export default Board;
