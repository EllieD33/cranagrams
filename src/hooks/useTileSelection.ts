import { useState } from "react";
import { shuffle } from "../utils/shuffle";
import { tileDeck } from "../constants/tiles";
import { TileType } from "../types/gameTypes";

export const useTileSelection = () => {
  const [remainingTiles, setRemainingTiles] = useState<TileType[]>(() =>
    shuffle([...tileDeck])
  );
  const [playerTiles, setPlayerTiles] = useState<TileType[]>([]);

  const maxSelectedTiles = 21;

  const handleTileSelect = (tile: TileType) => {
    if (playerTiles.length < maxSelectedTiles) {
      setPlayerTiles(prevSelected => [...prevSelected, tile]);
      setRemainingTiles(prevRemaining =>
        prevRemaining.filter(t => t.id !== tile.id)
      );
    }
  };

  return {
    remainingTiles,
    playerTiles,
    handleTileSelect
  };
};
