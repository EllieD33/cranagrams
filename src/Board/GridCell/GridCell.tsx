import { ReactElement } from "react";
import styles from "./GridCell.module.css";
import LetterTile from "../LetterTile/LetterTile";
import { useTileState } from "../../context/TileStateContext";
import { handleDragOver, handleDrop } from "../../utils/dragAndDrop";
import { moveTile } from "../../utils/moveTile";

export interface GridCellProps {
  rowIndex: number;
  colIndex: number;
}

const GridCell = ({ rowIndex, colIndex }: GridCellProps): ReactElement => {
  const { wordGrid, setPlayerTiles, setTilePile, setWordGrid } = useTileState();
  const droppedTile = wordGrid.find(
    tile => tile.row === rowIndex && tile.col === colIndex
  );

  const handleDropWrapper = (e: React.DragEvent<HTMLDivElement>) => {
    const { origin, target, tile, row, col } = handleDrop(
      e,
      "WordGrid",
      rowIndex,
      colIndex
    );
    moveTile(
      origin,
      target,
      tile,
      row,
      col,
      {
        setPlayerTiles,
        setTilePile,
        setWordGrid
      },
      wordGrid
    );
  };

  return (
    <div
      data-testid={`tile-${rowIndex}${colIndex}`}
      className={styles.cell}
      onDrop={e => handleDropWrapper(e)}
      onDragOver={e => handleDragOver(e)}
    >
      {droppedTile && (
        <LetterTile tileData={droppedTile} tileLocation="WordGrid" />
      )}
    </div>
  );
};

export default GridCell;
