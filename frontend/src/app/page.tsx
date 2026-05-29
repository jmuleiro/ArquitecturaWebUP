"use client";

import { Button, Stack, Container, Box, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import Navbar from "@/components/Navbar";

const DashboardCard = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? 'rgba(30, 30, 30, 0.6)' : 'rgba(255, 255, 255, 0.8)',
  backdropFilter: 'blur(16px)',
  padding: theme.spacing(4),
  borderRadius: '16px',
  border: `1px solid ${theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.08)'}`,
  boxShadow: '0 4px 30px rgba(0, 0, 0, 0.05)',
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(3),
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: '0 8px 40px rgba(0, 0, 0, 0.08)',
  },
}));

const NavigationItem = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#ffffff',
  ...theme.typography.body1,
  padding: theme.spacing(2, 4),
  textAlign: 'center',
  color: theme.palette.text.primary,
  borderRadius: '12px',
  border: `1px solid ${theme.palette.divider}`,
  textTransform: 'none',
  fontWeight: 600,
  transition: 'all 0.2s ease-in-out',
  '&:hover': {
    backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.02)',
    borderColor: theme.palette.primary.main,
    transform: 'translateY(-1px)',
  },
}));

export default function Home() {

  const handleNavigation = (destination: string) => {
    alert(`Navigating to ${destination}`);
  };

  return (
    <>
      <Navbar />
      <Box
        sx={{
          minHeight: '100vh',
          background: (theme) =>
            theme.palette.mode === 'dark'
              ? 'linear-gradient(135deg, #0a0a0a 0%, #121212 100%)'
              : 'linear-gradient(135deg, #fdfbf7 0%, #f5f7fa 100%)',
          pt: '100px',
          pb: 6,
        }}
      >
        <Container maxWidth="md">
          <DashboardCard>
            <Box>
              <Typography
                variant="h4"
                component="h1"
                gutterBottom
                sx={{
                  fontWeight: 800,
                  background: 'linear-gradient(45deg, #2e8b57 30%, #20b2aa 90%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Gestión de Productos
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Trabajo Práctico de Arquitectura Web - Universidad de Palermo. Seleccione un módulo para comenzar.
              </Typography>
            </Box>
            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              spacing={2}
              sx={{ mt: 1 }}
            >
              <NavigationItem onClick={() => handleNavigation('Products')} fullWidth>
                Products
              </NavigationItem>
              <NavigationItem onClick={() => handleNavigation('Categories')} fullWidth>
                Categories
              </NavigationItem>
            </Stack>
          </DashboardCard>
        </Container>
      </Box>
    </>
  );
}

