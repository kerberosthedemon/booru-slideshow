import React from 'react';
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => {
  return {
    iconButton: {
      width: "22px",
      cursor: "pointer",
      height: "22px",
      // margin: "0 5px 0 -6px",
      display: "flex",
      overflow: "hidden",
      position: "relative",
      "font-size": "1.25rem",
      "align-items": "center",
      "flex-shrink": 0,
      "font-family": '"Roboto", "Helvetica", "Arial", sans-serif',
      "line-height": 1,
      "border-radius": "50%",
      "justify-content": "center",
      "-moz-user-select": "none",
      "background-color": "#bdbdbd",
      color: "#fff",
      "&:hover": {
        color: "unset"
      }
    }
  }
});

export default function ChipButton({ children, onClick }) {
  const classes = useStyles();

  return (
    <div
      onClick={onClick}
      style={{ marginRight: "4px" }}
      className={classes.iconButton}
    >
      {children}
    </div>);
}