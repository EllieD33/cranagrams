import { ReactElement } from "react";
import styles from "./WordArea.module.css";

export interface WordAreaProps {};

const WordArea = ({}: WordAreaProps): ReactElement => {
    return (
        <div className={styles.wordGridContainer} data-testid="wordGrid">

        </div>
    );
};

export default WordArea;
