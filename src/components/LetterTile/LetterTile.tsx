import { ReactElement } from "react";
import styles from "./LetterTile.module.css";
import clsx from "clsx";

export interface LetterTileProps {
  letter: string;
  flipped?: boolean;
  colour?: "white" | "ivory" | "yellow";
}

const LetterTile = ({
  letter,
  flipped = false,
  colour = "yellow"
}: LetterTileProps): ReactElement => {
  const letterStyles = clsx(styles.letter, { [styles.flipped]: flipped });
  return (
    <div
      className={clsx(styles.tile, styles[colour])}
      data-testid={`tile-${letter}`}
    >
      <p className={letterStyles} data-testid="letter">
        {letter}
      </p>
    </div>
  );
};

export default LetterTile;
