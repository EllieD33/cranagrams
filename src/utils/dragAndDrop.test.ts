import {
  handleDragStart,
  handleDrop,
  handleDragOver
} from "../utils/dragAndDrop";
import { Tile, BoardArea, DragTarget } from "../types/gameTypes";

describe("Drag and Drop Functions", () => {
  let mockDataTransfer: DataTransfer;
  let mockEvent: React.DragEvent<HTMLDivElement>;

  const mockTile: Tile = { id: "1", letter: "A" };
  const mockOrigin: BoardArea = "TilePile";
  const mockTarget: DragTarget = "WordGrid";
  const mockRow = 1;
  const mockCol = 1;

  beforeEach(() => {
    mockDataTransfer = {
      setData: jest.fn(),
      getData: jest
        .fn()
        .mockReturnValue(JSON.stringify({ tile: mockTile, origin: mockOrigin }))
    } as unknown as DataTransfer;

    mockEvent = {
      dataTransfer: mockDataTransfer,
      preventDefault: jest.fn()
    } as unknown as React.DragEvent<HTMLDivElement>;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should correctly handle the drag start event", () => {
    handleDragStart(mockEvent, mockTile, mockOrigin);

    expect(mockDataTransfer.setData).toHaveBeenCalledWith(
      "application/json",
      JSON.stringify({ tile: mockTile, origin: mockOrigin })
    );
  });

  it("should correctly handle the drop event", () => {
    const result = handleDrop(mockEvent, mockTarget, mockRow, mockCol);

    expect(mockEvent.preventDefault).toHaveBeenCalled();

    expect(result).toEqual({
      origin: mockOrigin,
      target: mockTarget,
      tile: mockTile,
      row: mockRow,
      col: mockCol
    });
  });

  it("should prevent the default behavior on drag over", () => {
    handleDragOver(mockEvent);
    expect(mockEvent.preventDefault).toHaveBeenCalled();
  });
});
