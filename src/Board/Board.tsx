import { ReactElement } from "react";
import styles from "./Board.module.css";
import TileTray from "./TileTray/TileTray";
import WordArea from "./WordArea/WordArea";

const Board = (): ReactElement => {
  return (
    <div className={styles.boardContainer} data-testid="board">
      <WordArea />
      <div className={styles.tilePileCol}>
        <TileTray variant="TilePile" />
        <TileTray variant="PlayerTray" />
      </div>
    </div>
  );
};

export default Board;
