import { ReactElement } from "react";
import { useTimer } from "./useTimer";
import styles from "./Timer.module.css";
import clsx from "clsx";
import IconButton from "../../components/IconButton/IconButton";

const Timer = (): ReactElement => {
  const containerStyles = clsx(styles.flexCentred, styles.stopwatchContainer);
  const stopwatchStyles = clsx(styles.flexCentred, styles.stopwatch);

  const { formattedTime, start, stop, reset, isRunning } = useTimer();

  return (
    <div className={containerStyles}>
      <div className={stopwatchStyles} data-testid={"stopwatch"}>
        <h2 className={styles.digits} data-testid={"digits"}>
          {formattedTime}
        </h2>
      </div>
      <div className={styles.timerControls}>
        {isRunning ? (
          <IconButton icon="stop" ariaLabel="Stop timer" onClick={stop} />
        ) : (
          <IconButton icon="start" ariaLabel="Start timer" onClick={start} />
        )}
        <IconButton icon="reset" ariaLabel="Reset timer" onClick={reset} />
      </div>
    </div>
  );
};

export default Timer;
