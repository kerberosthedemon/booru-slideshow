import React from 'react';
import { makeStyles, Chip } from "@material-ui/core";

const useStyles = makeStyles((theme) => {
  return {
    chipButtonContainer: {
      display: "flex",
      width: "unset",
      "&:hover": {
        color: "unset"
      }
    }
  }
});

export default function ChipWithButtons({ children, ...rest }) {
  const classes = useStyles();

  const handleDelete = () => { };

  return (
    <Chip
      {...rest}
      deleteIcon={
        <div className={classes.chipButtonContainer}>
          {children}
        </div>
      }
      onDelete={handleDelete}
    />);
}