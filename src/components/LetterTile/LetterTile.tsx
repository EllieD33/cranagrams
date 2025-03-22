import { ReactElement } from "react";
import styles from "./LetterTile.module.css";
import clsx from "clsx";

export interface LetterTileProps {
  letter: string;
  colour?: "white" | "ivory" | "yellow";
}

const LetterTile = ({
  letter,
  colour = "yellow"
}: LetterTileProps): ReactElement => {
  return (
    <div
      className={clsx(styles.tile, styles[colour])}
      data-testid={`tile-${letter}`}
    >
      <p className={styles.letter}>{letter.toUpperCase()}</p>
    </div>
  );
};

export default LetterTile;
