import React, { useContext } from "react";
import ImgThumb from "./img-thumb/ImgThumb";
import { UserContext } from './../../App';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  borderedContainer: {
    //border: '1px solid white',
    flexGrow: 1,
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    alignContent: "flex-start"
  }
}));

export default function Exposition(props) {
  const classes = useStyles();
  const { postList, handleViewButtonClick } = useContext(UserContext);

  const handleClick = post => {
    handleViewButtonClick(post);
  };

  return (
    <div className={classes.borderedContainer}>
      {postList.map((post, index) => {
        return (
          <ImgThumb
            onViewButtonClick={handleClick}
            post={post}
            key={"post_" + index}
          />
        );
      })}
    </div>
  );

}
