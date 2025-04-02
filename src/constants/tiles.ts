import { Tile } from "../types/gameTypes";

const letters = [
  ...Array(13).fill("A"),
  ...Array(3).fill("B"),
  ...Array(3).fill("C"),
  ...Array(6).fill("D"),
  ...Array(18).fill("E"),
  ...Array(3).fill("F"),
  ...Array(4).fill("G"),
  ...Array(3).fill("H"),
  ...Array(12).fill("I"),
  ...Array(2).fill("J"),
  ...Array(2).fill("K"),
  ...Array(5).fill("L"),
  ...Array(3).fill("M"),
  ...Array(8).fill("N"),
  ...Array(11).fill("O"),
  ...Array(3).fill("P"),
  ...Array(2).fill("Q"),
  ...Array(9).fill("R"),
  ...Array(6).fill("S"),
  ...Array(9).fill("T"),
  ...Array(6).fill("U"),
  ...Array(3).fill("V"),
  ...Array(3).fill("W"),
  ...Array(2).fill("X"),
  ...Array(3).fill("Y"),
  ...Array(2).fill("Z")
] as const;

export const tileDeck = letters.map(
  (letter, index) =>
    ({
      id: `${letter}${index + 1}`,
      letter
    }) satisfies Tile
);
