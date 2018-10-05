import React, { Component } from 'react';
import Exposition from './exposition/Exposition';
import { withStyles } from '@material-ui/core';

const styles = theme => ({
    container: {
        display: 'flex',
        flexDirection: 'column',
        flexGrow: '1',
        overflow: 'auto',
    },
});

class Gallery extends Component {

    handleViewButtonClick = (post) => {
        this.props.onViewButtonClick(post)
    }

    render() {
        const { classes } = this.props;
        return (
            <div className={classes.container}>
                <Exposition postList={this.props.postList} onViewButtonClick={this.handleViewButtonClick} />
            </div>
        )
    }
}

export default withStyles(styles)(Gallery)