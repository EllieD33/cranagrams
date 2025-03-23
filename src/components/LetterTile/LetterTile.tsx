import { ReactElement } from "react";
import styles from "./LetterTile.module.css";
import clsx from "clsx";

export interface LetterTileProps {
  letter: string;
  onClick?: () => {};
  flipped?: boolean;
  colour?: "white" | "ivory" | "yellow";
}

const LetterTile = ({
  letter,
  onClick,
  flipped = false,
  colour = "yellow"
}: LetterTileProps): ReactElement => {
  const letterStyles = clsx(styles.letter, { [styles.flipped]: flipped });
  return (
    <div
      onClick={onClick}
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
