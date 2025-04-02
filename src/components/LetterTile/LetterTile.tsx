import { ReactElement } from "react";
import styles from "./LetterTile.module.css";
import clsx from "clsx";
import { BoardArea, Tile } from "../../types/gameTypes";
import { handleDragStart } from "../../utils/dragAndDrop";

export interface LetterTileProps {
  tileData: Tile;
  tileLocation: BoardArea;
  flipped?: boolean;
  colour?: "white" | "ivory" | "yellow";
}

const LetterTile = ({
  tileData,
  tileLocation,
  flipped = false,
  colour = "yellow"
}: LetterTileProps): ReactElement => {
  const { id, letter } = tileData;
  const letterStyles = clsx(styles.letter, { [styles.flipped]: flipped });

  return (
    <div
      draggable
      id={tileData.id}
      className={clsx(styles.tile, styles[colour])}
      data-testid={`tile-${id}`}
      onDragStart={e => handleDragStart(e, tileData, tileLocation)}
    >
      <p className={letterStyles} data-testid="letter">
        {letter}
      </p>
    </div>
  );
};

export default LetterTile;
