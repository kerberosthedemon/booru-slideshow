import React, { Component } from "react";
import Exposition from "./exposition/Exposition";
import { withStyles } from "@material-ui/core";

const styles = theme => ({
  container: {
    display: "flex",
    flexDirection: "column",
    flexGrow: "1",
    overflow: "auto"
  }
});

class Gallery extends Component {
  handleViewButtonClick = post => {
    this.props.handleViewButtonClick(post);
  };

  handleScroll = event => {
    let element = event.target;

    //Valor absoluto del fondo de la barra de scrolling
    const bottomScrollValue = element.scrollHeight - element.clientHeight;

    //Valor actual de la barra de scrolling
    const currentScrollValue = element.scrollTop;

    //Porcentaje limite
    const percentage = 80 / 100;

    //Limite para alertar cuando la barra de desplazamiento sobrepasa ese valor
    const limitScrollValue = percentage * bottomScrollValue;

    const limitReached = currentScrollValue >= limitScrollValue;

    if (limitReached) {
    }
    //alert("limit reached");
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.container} onScroll={this.handleScroll}>
        <Exposition
          onViewButtonClick={this.handleViewButtonClick}
        />
      </div>
    );
  }
}

export default withStyles(styles)(Gallery);
