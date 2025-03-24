import { ReactElement } from "react";
import styles from "./LetterTile.module.css";
import clsx from "clsx";
import { TileType } from "../../types/gameTypes";

export interface LetterTileProps {
  tileData: TileType;
  onClick: (tile: TileType) => void;
  flipped?: boolean;
  colour?: "white" | "ivory" | "yellow";
}

const LetterTile = ({
  tileData,
  onClick,
  flipped = false,
  colour = "yellow"
}: LetterTileProps): ReactElement => {
  const { id, letter } = tileData;
  const letterStyles = clsx(styles.letter, { [styles.flipped]: flipped });

  return (
    <div
      id={id}
      onClick={() => onClick(tileData)}
      className={clsx(styles.tile, styles[colour])}
      data-testid={`tile-${id}`}
    >
      <p className={letterStyles} data-testid="letter">
        {letter}
      </p>
    </div>
  );
};

export default LetterTile;
