import { ReactElement } from "react";
import styles from "./TileTray.module.css";
import LetterTile from "../../../components/LetterTile/LetterTile";
import clsx from "clsx";
import { useTileState } from "../../../context/TileStateContext";
import { handleDragOver, handleDrop } from "../../../utils/dragAndDrop";
import { moveTile } from "../../../utils/moveTile";

export interface TilePileProps {
  variant: "PlayerTray" | "TilePile";
}

const TileTray = ({ variant }: TilePileProps): ReactElement => {
  const trayStyles = clsx(styles.pile, {
    [styles.tilePile]: variant === "TilePile",
    [styles.playerTray]: variant === "PlayerTray"
  });
  const { tilePile, playerTiles, setPlayerTiles, setTilePile, setWordGrid } =
    useTileState();
  const tiles = variant === "TilePile" ? tilePile : playerTiles;

  const handleDropWrapper = (e: React.DragEvent<HTMLDivElement>) => {
    const { origin, target, tile, row, col } = handleDrop(
      e,
      variant,
      null,
      null
    );
    moveTile(origin, target, tile, row, col, {
      setPlayerTiles,
      setTilePile,
      setWordGrid
    });
  };
  return (
    <div
      className={trayStyles}
      data-testid={variant}
      onDrop={e => handleDropWrapper(e)}
      onDragOver={e => handleDragOver(e)}
    >
      {tiles.map(tile => (
        <LetterTile tileData={tile} tileLocation={variant} key={tile.id} />
      ))}
    </div>
  );
};

export default TileTray;
