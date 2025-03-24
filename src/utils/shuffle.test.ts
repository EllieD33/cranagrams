import { shuffle } from "./shuffle";
import { tileDeck } from "../constants/tiles";

describe("shuffle", () => {
  const tileDeckCopy = [...tileDeck];
  it("should shuffle the deck and return a new array", () => {
    const shuffledDeck = shuffle(tileDeckCopy);

    expect(shuffledDeck).not.toEqual(tileDeckCopy);

    expect(new Set(shuffledDeck)).toEqual(new Set(tileDeckCopy));
  });

  it("should return the same number of elements", () => {
    const shuffledDeck = shuffle(tileDeckCopy);

    expect(shuffledDeck.length).toBe(tileDeckCopy.length);
  });

  it("should not mutate the original array", () => {
    const originalDeck = [...tileDeckCopy];

    shuffle(tileDeckCopy);

    expect(tileDeckCopy).toEqual(originalDeck);
  });

  it("should shuffle multiple times differently", () => {
    const shuffledDeck1 = shuffle(tileDeckCopy);
    const shuffledDeck2 = shuffle(tileDeckCopy);

    expect(shuffledDeck1).not.toEqual(shuffledDeck2);
  });
});
