import { Dialog, DialogContent } from '@material-ui/core';
import React from 'react';
import BooruCheckList from './BooruCheckList/BooruCheckList';

export default function AdvancedSearchModal({ configState, ...rest }) {
  const [configurations, configActions] = configState;

  return (
    <Dialog open={true} {...rest} >
      <DialogContent>
        <BooruCheckList configurations={configurations} actions={configActions} />
      </DialogContent>
    </Dialog>
  );
}