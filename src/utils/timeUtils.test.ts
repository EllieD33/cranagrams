import { formatTime } from "./timeUtils";

describe("formatTime", () => {
  test("formats 0 seconds correctly", () => {
    expect(formatTime(0)).toBe("00:00:00");
  });

  test("formats seconds correctly", () => {
    expect(formatTime(7)).toBe("00:00:07");
    expect(formatTime(59)).toBe("00:00:59");
  });

  test("formats minutes correctly", () => {
    expect(formatTime(60)).toBe("00:01:00");
    expect(formatTime(125)).toBe("00:02:05");
  });

  test("formats hours correctly", () => {
    expect(formatTime(3600)).toBe("01:00:00");
    expect(formatTime(3661)).toBe("01:01:01");
  });

  test("handles large values", () => {
    expect(formatTime(86400)).toBe("24:00:00");
    expect(formatTime(90061)).toBe("25:01:01");
  });
});
