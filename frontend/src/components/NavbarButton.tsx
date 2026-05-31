'use client';

import React from 'react';
import { Button, useTheme } from "@mui/material";

interface NavbarButtonProps {
  text: string;
  href: string;
  icon?: React.ReactNode;
}

export default function NavbarButton({ text, icon, href }: NavbarButtonProps) {
  const theme = useTheme();

  return (
    <Button variant="text" startIcon={icon} href={href} sx={{
      color: '#ffffff',
    }}>
      {text}
    </Button>
  );
}