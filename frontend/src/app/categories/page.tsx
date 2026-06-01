"use client"

import DashboardCard from "@/components/DashboardCard"
import MainBox from "@/components/MainBox"
import Navbar from "@/components/Navbar"
import { Container, Typography } from "@mui/material"

export default function CategoriesPage() {
  return (
    <>
      <Navbar />
      <MainBox>
        <Container maxWidth="md">
          <DashboardCard>
            <Typography
              variant="h4"
              component="h1"
              gutterBottom
              sx={{
                fontWeight: 600,
                marginTop: '15px'
              }}
            >
              Category Management
            </Typography>
          </DashboardCard>
        </Container>
      </MainBox>
    </>
  )
}