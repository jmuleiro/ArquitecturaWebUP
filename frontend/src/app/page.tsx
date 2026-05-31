"use client";

import { Button, Stack, Container, Box, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import Navbar from "@/components/Navbar";
import DashboardCard from "@/components/DashboardCard";
import MainBox from "@/components/MainBox";

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
      <MainBox>
        <Container maxWidth="md">
          <DashboardCard>
            <Box>
              <Typography
                variant="h4"
                component="h1"
                gutterBottom
                sx={{
                  fontWeight: 800,
                }}
              >
                Product Management
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Trabajo Práctico de Arquitectura Web - Universidad de Palermo.
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
      </MainBox>
    </>
  );
}

