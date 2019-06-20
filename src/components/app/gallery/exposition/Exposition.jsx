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
  const { postList } = useContext(UserContext);

  const handleViewButtonClick = post => {
    props.onViewButtonClick(post);
  };

  return (
    <div className={classes.borderedContainer}>
      {postList.map((post, index) => {
        return (
          <ImgThumb
            onViewButtonClick={handleViewButtonClick}
            post={post}
            key={"post_" + index}
          />
        );
      })}
    </div>
  );

}
