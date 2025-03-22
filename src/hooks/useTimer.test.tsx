import { act, renderHook } from "@testing-library/react";
import { useTimer } from "./useTimer";

describe("useTimer", () => {
  jest.useFakeTimers();

  it("should start the timer", () => {
    const { result } = renderHook(() => useTimer());

    act(() => {
      result.current.start();
    });

    act(() => {
      jest.advanceTimersByTime(3000);
    });

    expect(result.current.formattedTime).toBe("00:00:03");
  });

  it("should stop the timer", () => {
    const { result } = renderHook(() => useTimer());

    act(() => {
      result.current.start();
    });
    act(() => {
      jest.advanceTimersByTime(2000);
    });

    act(() => {
      result.current.stop();
    });

    expect(result.current.formattedTime).toBe("00:00:02");

    act(() => {
      jest.advanceTimersByTime(3000);
    });

    expect(result.current.formattedTime).toBe("00:00:02");
  });

  it("should reset the timer", () => {
    const { result } = renderHook(() => useTimer());

    act(() => {
      result.current.start();
    });
    act(() => {
      jest.advanceTimersByTime(3000);
    });

    act(() => {
      result.current.reset();
    });

    expect(result.current.formattedTime).toBe("00:00:00");
  });

  it("should not start the timer if already running", () => {
    const { result } = renderHook(() => useTimer());

    act(() => {
      result.current.start();
    });

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    act(() => {
      result.current.start();
    });

    expect(result.current.formattedTime).toBe("00:00:01");
  });

  it("should not stop the timer if already stopped", () => {
    const { result } = renderHook(() => useTimer());

    act(() => {
      result.current.start();
    });

    act(() => {
      jest.advanceTimersByTime(2000);
    });

    act(() => {
      result.current.stop();
    });

    expect(result.current.formattedTime).toBe("00:00:02");

    act(() => {
      result.current.stop();
    });

    expect(result.current.formattedTime).toBe("00:00:02");
  });
});
