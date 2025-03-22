import { ReactElement } from "react";
import styles from "./Timer.module.css";
import IconButton from "../IconButton/IconButton";
import clsx from "clsx";

// export interface TimerProps {};

const Timer = (): ReactElement => {
  const containerStyles = clsx(styles.flexCentred, styles.stopwatchContainer);
  const stopwatchStyles = clsx(styles.flexCentred, styles.stopwatch);
  return (
    <div className={containerStyles}>
      <div className={stopwatchStyles} data-testid={"stopwatch"}>
        <h2 className={styles.digits} data-testid={"digits"}>
          00:00:00
        </h2>
      </div>
      <div className={styles.timerControls}>
        <IconButton icon="start" ariaLabel="Start timer" onClick={() => {}} />
        <IconButton icon="stop" ariaLabel="Stop timer" onClick={() => {}} />
        <IconButton icon="reset" ariaLabel="Reset timer" onClick={() => {}} />
      </div>
    </div>
  );
};

export default Timer;
