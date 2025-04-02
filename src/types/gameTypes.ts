export type Tile = {
  id: string;
  letter: string;
  row?: number | null;
  col?: number | null;
};
export type BoardArea = "TilePile" | "PlayerTray" | "WordGrid";
export type DragTarget = BoardArea | "self";
