import React, { Component } from 'react';
import { Typography } from '@material-ui/core/Typography';

export default class NotFound extends Component {
  render() {
    return (
      <Typography noWrap>The resource was not found :(</Typography>
    )
  }
}
