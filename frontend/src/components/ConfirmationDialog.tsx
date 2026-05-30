"use client"

import { Button, Dialog, DialogTitle, DialogActions } from "@mui/material";

export interface ConfirmationDialogProps {
  open: boolean;
  onClose: (value: string) => void;
  message: string;
}

export default function ConfirmationDialog(props: ConfirmationDialogProps) {
  const { onClose, open, message } = props;

  return (
    <Dialog onClose={onClose} open={open}>
      <DialogTitle>{message}</DialogTitle>
      <DialogActions>
        <Button variant="contained" onClick={() => onClose('confirm')}>Confirm</Button>
        <Button variant="outlined" onClick={() => onClose('cancel')}>Cancel</Button>
      </DialogActions>
    </Dialog>
  )
}