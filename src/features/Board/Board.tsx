import { ReactElement } from "react";
import styles from "./Board.module.css";
import TilePile from "./TilePile/TilePile";
import WordArea from "./WordArea/WordArea";
import { useTileSelection } from "../../hooks/useTileSelection";

const Board = (): ReactElement => {
  const { remainingTiles, playerTiles, handleTileSelect } = useTileSelection();

  return (
    <div className={styles.boardContainer} data-testid="board">
      <WordArea />
      <div className={styles.tilePileCol}>
        <TilePile
          tiles={remainingTiles}
          onTileClick={handleTileSelect}
          testId={"remainingTiles"}
        />
        <TilePile
          tiles={playerTiles}
          onTileClick={() => {}}
          testId={"playerTiles"}
        />
      </div>
    </div>
  );
};

export default Board;
