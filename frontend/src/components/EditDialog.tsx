"use client"

import { useState, useEffect } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Stack
} from "@mui/material";

export interface EditableProperties {
  name: string;
  editable?: boolean;
  value?: string;
}

export interface EditDialogProps {
  open: boolean;
  onClose: (action: 'confirm' | 'cancel', updatedProperties?: EditableProperties[]) => void;
  message: string;
  properties: EditableProperties[];
}

export default function EditDialog(props: EditDialogProps) {
  const { onClose, open, message, properties } = props;
  const [fields, setFields] = useState<EditableProperties[]>(properties);

  // Sync internal state with properties when dialog opens or properties update
  useEffect(() => {
    if (open) {
      setFields(properties);
    }
  }, [properties, open]);

  const handleChange = (name: string, value: string) => {
    setFields((prev) =>
      prev.map((prop) => (prop.name === name ? { ...prop, value } : prop))
    );
  };

  return (
    <Dialog onClose={() => onClose('cancel')} open={open} fullWidth maxWidth="xs">
      <DialogTitle>{message}</DialogTitle>
      <DialogContent dividers>
        <Stack spacing={2} sx={{ my: 1 }}>
          {fields.map((property) => (
            <TextField
              key={property.name}
              name={property.name}
              label={property.name.charAt(0).toUpperCase() + property.name.slice(1)}
              disabled={!property.editable}
              value={property.value || ''}
              onChange={(e) => handleChange(property.name, e.target.value)}
              variant="outlined"
              fullWidth
            />
          ))}
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" onClick={() => onClose('confirm', fields)}>Confirm</Button>
        <Button variant="outlined" onClick={() => onClose('cancel')}>Cancel</Button>
      </DialogActions>
    </Dialog>
  )
}
