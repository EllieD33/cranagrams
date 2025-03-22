import React, { ReactElement } from "react";
import styles from "./IconButton.module.css";
import { FaPlay, FaStop, FaRedo } from "react-icons/fa";
import clsx from "clsx";

export interface IconButtonProps {
  icon: "start" | "stop" | "reset";
  ariaLabel: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
}

const IconButton = ({
  icon,
  ariaLabel,
  onClick,
  disabled = false
}: IconButtonProps): ReactElement => {
  const iconProps = { size: 18, color: "#fff" };
  const iconLookup = {
    start: <FaPlay {...iconProps} style={{ marginLeft: "3px" }} />,
    stop: <FaStop {...iconProps} />,
    reset: <FaRedo {...iconProps} />
  };
  const buttonStyles = clsx(styles.button, { [styles.disabled]: disabled });

  return (
    <button
      type="button"
      aria-label={ariaLabel}
      onClick={onClick}
      disabled={disabled}
      className={buttonStyles}
      data-testid={`${icon}IconButton`}
    >
      {iconLookup[icon]}
    </button>
  );
};

export default IconButton;
