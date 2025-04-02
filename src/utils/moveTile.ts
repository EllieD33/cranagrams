import { Tile, BoardArea, DragTarget } from "../types/gameTypes";

export const moveTile = (
  origin: BoardArea,
  target: DragTarget,
  tile: Tile,
  row: number | null,
  col: number | null,
  setters: {
    setPlayerTiles: React.Dispatch<React.SetStateAction<Tile[]>>;
    setTilePile: React.Dispatch<React.SetStateAction<Tile[]>>;
    setWordGrid: React.Dispatch<React.SetStateAction<Tile[]>>;
  }
) => {
  const { setPlayerTiles, setTilePile, setWordGrid } = setters;
  if (origin === "TilePile" && target === "PlayerTray") {
    setPlayerTiles(prev => [...prev, tile]);
    setTilePile(prev => prev.filter(t => t.id !== tile.id));
  } else if (origin === "PlayerTray" && target === "WordGrid" && row && col) {
    setWordGrid(prev => [...prev, { ...tile, row, col }]);
    setPlayerTiles(prev => prev.filter(t => t.id !== tile.id));
  } else if (origin === "WordGrid" && target === "WordGrid" && row && col) {
    /*istanbul ignore next */
    setWordGrid(prev =>
      prev.map(t => (t.id === tile.id ? { ...t, row, col } : t))
    );
  } else if (origin === "WordGrid" && target === "PlayerTray") {
    setPlayerTiles(prev => [...prev, tile]);
    setWordGrid(prev => prev.filter(t => t.id !== tile.id));
  } else {
    console.warn("Move not allowed");
  }
};
