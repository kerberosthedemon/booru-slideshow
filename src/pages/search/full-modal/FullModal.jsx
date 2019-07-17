import React from 'react'
import { Dialog, DialogContent, Button } from '@material-ui/core';

export default function FullModal({ open, onClose, ...rest }) {
  return (
    <Dialog open={open} onClose={onClose} fullScreen {...rest}>
      <DialogContent>
        <Button onClick={onClose}>Hola</Button>
      </DialogContent>
    </Dialog>
  )
}
