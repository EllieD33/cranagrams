import { ReactElement } from "react";
import styles from "./WordArea.module.css";
import GridCell from "../GridCell/GridCell";

export interface WordAreaProps {}

const WordArea = ({}: WordAreaProps): ReactElement => {
  const rows = 5;
  const cols = 5;

  return (
    <div
      className={styles.wordGridContainer}
      style={{
        gridTemplateRows: `repeat(${rows}, 50px)`,
        gridTemplateColumns: `repeat(${cols}, 50px)`
      }}
      data-testid="wordGrid"
    >
      {Array.from({ length: rows }).map((_, rowIndex) =>
        Array.from({ length: cols }).map((_, colIndex) => {
          return (
            <GridCell
              key={`GridCell-${rowIndex}-${colIndex}`}
              rowIndex={rowIndex}
              colIndex={colIndex}
            />
          );
        })
      )}
    </div>
  );
};

export default WordArea;
