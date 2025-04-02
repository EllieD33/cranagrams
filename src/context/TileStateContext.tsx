import React, { createContext, useContext, useState } from "react";
import { Tile } from "../types/gameTypes";
import { tileDeck } from "../constants/tiles";
import { shuffle } from "../utils/shuffle";

type TileStateContextType = {
  tilePile: Tile[];
  setTilePile: React.Dispatch<React.SetStateAction<Tile[]>>;
  playerTiles: Tile[];
  setPlayerTiles: React.Dispatch<React.SetStateAction<Tile[]>>;
  wordGrid: Tile[];
  setWordGrid: React.Dispatch<React.SetStateAction<Tile[]>>;
};

const TileStateContext = createContext<TileStateContextType | undefined>(
  undefined
);

export const useTileState = (): TileStateContextType => {
  const context = useContext(TileStateContext);
  if (!context) {
    throw new Error("useTileState must be used within a TileStateProvider");
  }
  return context;
};

export const TileStateProvider: React.FC<{ children: React.ReactNode }> = ({
  children
}) => {
  const [tilePile, setTilePile] = useState<Tile[]>(() =>
    shuffle([...tileDeck])
  );
  const [playerTiles, setPlayerTiles] = useState<Tile[]>([]);
  const [wordGrid, setWordGrid] = useState<Tile[]>([]);

  return (
    <TileStateContext.Provider
      value={{
        tilePile,
        setTilePile,
        playerTiles,
        setPlayerTiles,
        wordGrid,
        setWordGrid
      }}
    >
      {children}
    </TileStateContext.Provider>
  );
};
