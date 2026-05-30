"use client"

import { useEffect, useState } from "react";
import { Box, Container, Paper, Typography, Button } from "@mui/material";
import { Add, Edit, Delete } from "@mui/icons-material";
import { DataGrid, GridColDef, GridRowSelectionModel, GridRowId } from "@mui/x-data-grid";
import { styled } from "@mui/material/styles";
import Navbar from "@/components/Navbar";

const DashboardCard = styled(Paper)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  gap: theme.spacing(3),
}));

const columns: GridColDef[] = [
  { field: 'id' },
  { field: 'name', headerName: 'Product Name', minWidth: 200, maxWidth: 300 },
  { field: 'category', headerName: 'Category', minWidth: 100, maxWidth: 200 },
  { field: 'description', headerName: 'Description', minWidth: 300, maxWidth: 400 },
  { field: 'stock', headerName: 'Stock', minWidth: 50, maxWidth: 100 }
];

const AddButton = () => {
  return (
    <Button
      variant="contained"
      startIcon={<Add />}
      onClick={() => {
        alert('Add');
      }}>
      New
    </Button>
  );
};

const EditButton = ({ disabled, onClick }: { disabled: boolean, onClick?: () => void }) => {
  return (
    <Button
      variant="contained"
      startIcon={<Edit />}
      disabled={disabled}
      onClick={onClick}>
      Edit
    </Button>
  );
};

const DeleteButton = ({ disabled, onClick }: { disabled: boolean, onClick?: () => void }) => {
  return (
    <Button
      variant="contained"
      startIcon={<Delete />}
      disabled={disabled}
      onClick={onClick}>
      Delete
    </Button>
  );
};

export default function ProductsPage() {
  const [dataRows, setDataRows] = useState<any[]>([]);
  const [selectedRowIds, setSelectedRowIds] = useState<GridRowSelectionModel>({
    type: 'include',
    ids: new Set<GridRowId>(),
  });

  const hasSelection = selectedRowIds.type === 'include'
    ? selectedRowIds.ids.size > 0
    : selectedRowIds.ids.size < dataRows.length;

  const multipleSelected = selectedRowIds.type === 'include' && selectedRowIds.ids.size === 1;

  const getSelectedRows = () => {
    return dataRows.filter((row) => {
      const isPresent = selectedRowIds.ids.has(row.id);
      return selectedRowIds.type === 'include' ? isPresent : !isPresent;
    })
  }

  const handleEdit = () => {
    const selectedRows = getSelectedRows();
  }

  const handleDelete = () => {
    const selectedRows = getSelectedRows();
  }

  useEffect(() => {
    const apiUrl = process.env.API_URL;

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

        const mappedRows = rawProducts.map((product: any) => ({
          id: product.productId,
          name: product.name,
          category: product.category?.name || product.category || '',
          description: product.description,
          stock: product.stock
        }));

        setDataRows(mappedRows);
      })
      .catch((error) => console.error('Error:', error));
  }, []);

  return (
    <>
      <Navbar />
      <Box
        sx={{
          pt: '100px',
          minHeight: '100vh',
          background: (theme) =>
            theme.palette.mode === 'dark'
              ? 'linear-gradient(135deg, #0a0a0a 0%, #121212 100%)'
              : 'linear-gradient(135deg, #fdfbf7 0%, #f5f7fa 100%)',
        }}
      >
        <Container maxWidth="md">
          <DashboardCard>
            <Typography
              variant="h4"
              component="h1"
              gutterBottom
              sx={{
                fontWeight: 600,
              }}
            >
              Product Management
            </Typography>
            <DataGrid
              sx={{
                width: '100%',
              }}
              rows={dataRows}
              columns={columns}
              initialState={{
                pagination: {
                  paginationModel: {
                    pageSize: 15
                  }
                },
                columns: {
                  columnVisibilityModel: {
                    id: false,
                  },
                },
              }}
              pageSizeOptions={[10, 25, 50]}
              checkboxSelection
              disableRowSelectionOnClick
              showToolbar
              onRowSelectionModelChange={(newSelectionModel) => {
                setSelectedRowIds(newSelectionModel);
              }}

            >

            </DataGrid>
            <Container sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
              <AddButton />
              <EditButton disabled={!hasSelection || !multipleSelected} onClick={handleEdit} />
              <DeleteButton disabled={!hasSelection} onClick={handleDelete} />
            </Container>
          </DashboardCard>

        </Container>
      </Box>
    </>
  );
}