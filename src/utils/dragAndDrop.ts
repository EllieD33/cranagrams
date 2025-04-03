import { BoardArea, DragTarget, Tile } from "../types/gameTypes";

export const handleDragStart = (
  e: React.DragEvent<HTMLDivElement>,
  tile: Tile,
  origin: BoardArea
) => {
  const data = JSON.stringify({ tile, origin });
  e.dataTransfer.setData("application/json", data);
};

export const handleDrop = (
  e: React.DragEvent<HTMLDivElement>,
  target: DragTarget,
  row: number | null,
  col: number | null
) => {
  e.preventDefault();
  const { origin, tile } = JSON.parse(
    e.dataTransfer.getData("application/json")
  );
  return { origin, target, tile, row, col };
};

export const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
  e.preventDefault();
};
