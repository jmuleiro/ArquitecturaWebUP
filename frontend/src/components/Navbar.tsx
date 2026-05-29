'use client';

import Link from 'next/link';
import Image from 'next/image';
import NavbarButton from '@/components/NavbarButton';
import { AppBar, Toolbar, Box, useTheme } from '@mui/material';
import InventoryIcon from '@mui/icons-material/Inventory';
import CategoryIcon from '@mui/icons-material/Category';

export default function Navbar() {
  const theme = useTheme();

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        backgroundColor: theme.palette.mode === 'dark' ? 'rgba(10, 10, 10, 0.75)' : 'rgba(255, 255, 255, 0.75)',
        backdropFilter: 'blur(16px)',
        borderBottom: `1px solid ${theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.08)'}`,
        color: theme.palette.mode === 'dark' ? '#ffffff' : '#000000',
        zIndex: theme.zIndex.drawer + 1,
        transition: 'background-color 0.3s ease, border-color 0.3s ease',
      }}
    >
      <Toolbar sx={{ justifyContent: 'left', minHeight: '64px', px: { xs: 6, sm: 12 } }}>
        <Link href="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              cursor: 'pointer',
              transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              '&:hover': {
                transform: 'scale(1.05)',
              },
            }}
          >
            <Image
              src="/dashboard_logo.png"
              alt="Gestión de Productos"
              width={140}
              height={45}
              style={{
                objectFit: 'contain',
                borderRadius: '8px',
              }}
              priority
            />
          </Box>
        </Link>
        <NavbarButton text="Products" href="/products" icon={<InventoryIcon />} />
        <NavbarButton text="Categories" href="/categories" icon={<CategoryIcon />} />
      </Toolbar>
    </AppBar>
  );
}
