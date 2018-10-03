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
    render() {
        const { classes } = this.props;
        console.log(this.props);
        return (
            <div className={classes.container}>
                <Exposition postList={this.props.postList} />
            </div>
        )
    }
}

export default withStyles(styles)(Gallery)