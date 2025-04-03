import { Tile, BoardArea, DragTarget } from "../types/gameTypes";

export type Setters = {
  setPlayerTiles: React.Dispatch<React.SetStateAction<Tile[]>>;
  setTilePile: React.Dispatch<React.SetStateAction<Tile[]>>;
  setWordGrid: React.Dispatch<React.SetStateAction<Tile[]>>;
};

export const addToPlayerTray = (tiles: Tile[], tile: Tile): Tile[] => [
  ...tiles,
  tile
];

export const removeTile = (tiles: Tile[], tile: Tile): Tile[] =>
  tiles.filter(t => t.id !== tile.id);

export const isPositionOccupied = (
  tiles: Tile[],
  row: number,
  col: number
): boolean => {
  return tiles.some(t => t.row === row && t.col === col);
};

export const addToWordGrid = (
  tiles: Tile[],
  tile: Tile,
  row: number,
  col: number
): Tile[] => [...tiles, { ...tile, row, col }];

export const updateTilePosition = (
  tile: Tile,
  row: number,
  col: number
): Tile => ({ ...tile, row, col });

export const updateWordGridPosition = (
  tiles: Tile[],
  tile: Tile,
  row: number,
  col: number
): Tile[] =>
  tiles.map(t => (t.id === tile.id ? updateTilePosition(t, row, col) : t));

export const moveTile = (
  origin: BoardArea,
  target: DragTarget,
  tile: Tile,
  row: number | null,
  col: number | null,
  setters: Setters,
  wordGrid?: Tile[]
) => {
  const { setPlayerTiles, setTilePile, setWordGrid } = setters;
  if (origin === "TilePile" && target === "PlayerTray") {
    setPlayerTiles(prev => addToPlayerTray(prev, tile));
    setTilePile(prev => removeTile(prev, tile));
  } else if (
    origin === "PlayerTray" &&
    target === "WordGrid" &&
    row &&
    col &&
    wordGrid
  ) {
    if (isPositionOccupied(wordGrid, row, col)) return;
    setWordGrid(prev => addToWordGrid(prev, tile, row, col));
    setPlayerTiles(prev => removeTile(prev, tile));
  } else if (
    origin === "WordGrid" &&
    target === "WordGrid" &&
    row &&
    col &&
    wordGrid
  ) {
    if (isPositionOccupied(wordGrid, row, col)) return;
    setWordGrid(prev => updateWordGridPosition(prev, tile, row, col));
  } else if (origin === "WordGrid" && target === "PlayerTray") {
    setPlayerTiles(prev => addToPlayerTray(prev, tile));
    setWordGrid(prev => removeTile(prev, tile));
  } else {
    console.warn("Move not allowed");
  }
};
