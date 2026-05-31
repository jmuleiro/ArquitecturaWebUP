"use client"

import { useState, useEffect } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Stack
} from "@mui/material";

interface BaseField {
  name: string;
  editable?: boolean;
  required: boolean;
}

export interface TextFieldConfig extends BaseField {
  type: 'text';
  value?: string;
}

export interface SelectFieldConfig extends BaseField {
  type: 'select';
  value?: string;
  options: { label: string; value: string }[];
}

export type EditableField = TextFieldConfig | SelectFieldConfig;

export interface EditDialogProps {
  open: boolean;
  onClose: (action: 'confirm' | 'cancel', updatedFields?: EditableField[]) => void;
  message: string;
  properties: EditableField[];
}

export default function EditDialog(props: EditDialogProps) {
  const { onClose, open, message, properties } = props;
  const [fields, setFields] = useState<EditableField[]>(properties);

  // Sync internal state with properties when dialog opens or properties update
  useEffect(() => {
    if (open) {
      setFields(properties);
    }
  }, [properties, open]);

  const handleChange = (name: string, value: string) => {
    setFields((prev) =>
      prev.map((field) => (field.name === name ? { ...field, value } : field))
    );
  };

  return (
    <Dialog onClose={() => onClose('cancel')} open={open} fullWidth maxWidth="xs">
      <DialogTitle>{message}</DialogTitle>
      <DialogContent dividers>
        <Stack spacing={2} sx={{ my: 1 }}>
          {fields.map((field) => {
            const label = field.name.charAt(0).toUpperCase() + field.name.slice(1);

            if (field.type === 'select') {
              return (
                <FormControl
                  key={field.name}
                  fullWidth
                  required={field.required}
                  disabled={!field.editable}
                >
                  <InputLabel>{label}</InputLabel>
                  <Select
                    name={field.name}
                    label={label}
                    value={field.value || ''}
                    onChange={(e) => handleChange(field.name, e.target.value as string)}
                  >
                    {field.options.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              );
            }

            return (
              <TextField
                key={field.name}
                name={field.name}
                label={label}
                disabled={!field.editable}
                value={field.value || ''}
                required={field.required}
                onChange={(e) => handleChange(field.name, e.target.value)}
                variant="outlined"
                fullWidth
              />
            );
          })}
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" onClick={() => onClose('confirm', fields)}>Confirm</Button>
        <Button variant="outlined" onClick={() => onClose('cancel')}>Cancel</Button>
      </DialogActions>
    </Dialog>
  )
}
