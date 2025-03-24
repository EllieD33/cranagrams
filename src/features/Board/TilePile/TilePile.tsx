import { ReactElement } from "react";
import styles from "./TilePile.module.css";
import LetterTile from "../../../components/LetterTile/LetterTile";
import { TileType } from "../../../types/gameTypes";

export interface TilePileProps {
  tiles: TileType[];
  onTileClick: (tile: TileType) => void;
  testId?: string;
}

const TilePile = ({
  tiles,
  onTileClick,
  testId
}: TilePileProps): ReactElement => {
  return (
    <div data-testid={testId}>
      <div className={styles.pile} data-testid="pile">
        {tiles.map(tile => (
          <LetterTile tileData={tile} key={tile.id} onClick={onTileClick} />
        ))}
      </div>
      <div></div>
    </div>
  );
};

export default TilePile;
