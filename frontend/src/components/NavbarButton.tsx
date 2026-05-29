'use client';

import React from 'react';
import { Button, useTheme } from "@mui/material";

interface NavbarButtonProps {
  text: string;
  icon?: React.ReactNode;
}

export default function NavbarButton({ text, icon }: NavbarButtonProps) {
  const theme = useTheme();

  return (
    <Button variant="text" startIcon={icon}>
      {text}
    </Button>
  );
}