"use client"

import { useEffect, useState } from "react";
import { Box, Container, Typography, CircularProgress } from "@mui/material";
import { BarChart } from "@mui/x-charts/BarChart";
import { PieChart } from "@mui/x-charts/PieChart";
import Navbar from "@/components/Navbar";
import MainBox from "@/components/MainBox";
import DashboardCard from "@/components/DashboardCard";

interface ProductRow {
  id: string;
  name: string;
  category: string;
  stock: number;
}

export default function ReportsPage() {
  const [products, setProducts] = useState<ProductRow[]>([]);
  const [loading, setLoading] = useState(true);

  const apiUrl = process.env.API_URL;

  useEffect(() => {
    fetch(`${apiUrl}/products`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        const rawProducts = Array.isArray(data)
          ? data
          : data.ok && Array.isArray(data.products)
            ? data.products
            : (data.products || []);

        const mapped: ProductRow[] = rawProducts.map((product: any) => ({
          id: product.productId,
          name: product.name,
          category: product.category?.name || product.category || 'Uncategorized',
          stock: product.stock ?? 0,
        }));

        setProducts(mapped);
      })
      .catch((error) => console.error('Error fetching products:', error))
      .finally(() => setLoading(false));
  }, []);

  const stockChartLabels = products.map((p) => p.name);
  const stockChartData = products.map((p) => p.stock);

  const categoryCounts: Record<string, number> = {};
  products.forEach((p) => {
    categoryCounts[p.category] = (categoryCounts[p.category] || 0) + 1;
  });

  const pieChartData = Object.entries(categoryCounts).map(([label, value], index) => ({
    id: index,
    value,
    label,
  }));

  return (
    <>
      <Navbar />
      <MainBox>
        <Container maxWidth="lg">
          <Typography
            variant="h4"
            component="h1"
            gutterBottom
            sx={{
              fontWeight: 600,
              mb: 4,
              textAlign: 'center',
            }}
          >
            Reports
          </Typography>

          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 10 }}>
              <CircularProgress />
            </Box>
          ) : (
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 4,
              }}
            >
              <DashboardCard>
                <Typography
                  variant="h5"
                  component="h2"
                  sx={{ fontWeight: 500 }}
                >
                  Product Stock Levels
                </Typography>
                {products.length > 0 ? (
                  <BarChart
                    xAxis={[
                      {
                        id: 'products',
                        data: stockChartLabels,
                        scaleType: 'band',
                        label: 'Product',
                      },
                    ]}
                    yAxis={[
                      {
                        label: 'Stock',
                      },
                    ]}
                    series={[
                      {
                        data: stockChartData,
                        label: 'Stock',
                        color: '#1976d2',
                      },
                    ]}
                    height={400}
                    width={400}
                  />
                ) : (
                  <Typography color="text.secondary">
                    No product data available.
                  </Typography>
                )}
              </DashboardCard>
              <DashboardCard>
                <Typography
                  variant="h5"
                  component="h2"
                  sx={{ fontWeight: 500 }}
                >
                  Product Count by Category
                </Typography>
                {pieChartData.length > 0 ? (
                  <PieChart
                    series={[
                      {
                        data: pieChartData,
                        highlightScope: { fade: 'global', highlight: 'item' },
                        faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
                        innerRadius: 40,
                        paddingAngle: 2,
                        cornerRadius: 5,
                      },
                    ]}
                    height={400}
                    width={400}
                  />
                ) : (
                  <Typography color="text.secondary">
                    No category data available.
                  </Typography>
                )}
              </DashboardCard>
            </Box>
          )}
        </Container>
      </MainBox>
    </>
  );
}
