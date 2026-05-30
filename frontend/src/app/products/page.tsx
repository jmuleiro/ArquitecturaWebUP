"use client"

import { useEffect, useState } from "react";
import { Box, Container, Paper, Typography, Button } from "@mui/material";
import { Add, Edit, Delete } from "@mui/icons-material";
import { DataGrid, GridColDef, GridRowSelectionModel, GridRowId } from "@mui/x-data-grid";
import { styled } from "@mui/material/styles";
import Navbar from "@/components/Navbar";
import ConfirmationDialog from "@/components/ConfirmationDialog";
import EditDialog, { EditableProperties } from "@/components/EditDialog";
import Product from "@/entities/Product";

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

let editableProperties: EditableProperties[] = [];

export default function ProductsPage() {
  // Confirmation dialog states
  const [confDialogOpen, setConfDialogOpen] = useState(false);

  // Edit dialog states
  const [editDialogOpen, setEditDialogOpen] = useState(false);

  // Add dialog states
  const [addDialogOpen, setAddDialogOpen] = useState(false);

  // Data states
  const [dataRows, setDataRows] = useState<any[]>([]);
  const [selectedRowIds, setSelectedRowIds] = useState<GridRowSelectionModel>({
    type: 'include',
    ids: new Set<GridRowId>(),
  });

  let deleteMessage = "Do you wish to delete this product?"
  let editMessage = "Edit product properties"
  let addMessage = "Add a new product"

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
    const selectedRow = getSelectedRows()[0];
    Object.entries(selectedRow)
      .forEach(([key, value]) => {
        if (key !== "id" && key !== "category") {
          editableProperties.push({
            name: key,
            value: value as string,
            editable: true,
            required: false
          })
        } else {
          editableProperties.push({
            name: key,
            value: value as string,
            editable: false,
            required: false
          })
        }
      })
    setEditDialogOpen(true);
  }

  const handleDelete = () => {
    setConfDialogOpen(true);
  }

  const apiUrl = process.env.API_URL;

  const fetchProducts = () => {
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
  }

  const handleConfDialogClose = (value: string) => {
    setConfDialogOpen(false);
    if (value === 'confirm') {
      const selectedRows = getSelectedRows();
      const plural = selectedRows.length === 1 ? "product" : "products";
      deleteMessage = `Do you wish to delete ${selectedRows.length} ${plural}?`

      const deletePromises = selectedRows.map((row) =>
        fetch(`${apiUrl}/products/${row.id}`, {
          method: 'DELETE',
        }).catch((error) => console.error('Error:', error))
      );

      Promise.all(deletePromises).then(() => {
        fetchProducts();
      });
    }
  }

  const handleEditDialogClose = (
    action: 'confirm' | 'cancel',
    updatedProperties?: EditableProperties[]
  ) => {
    setEditDialogOpen(false);
    editableProperties = [];
    if (action === 'confirm' && updatedProperties) {
      const originalProduct = getSelectedRows()[0];

      if (!originalProduct) return; // TODO: handle this error

      const rawData = Object.fromEntries(
        updatedProperties.map((prop) => [prop.name, prop.value])
      );

      const updatedProduct = Object.assign(
        new Product(
          originalProduct.id,
          rawData.name ?? originalProduct.name,
          rawData.category ?? originalProduct.category,
          Number(rawData.stock) ?? originalProduct.stock,
          rawData.description ?? originalProduct.description),
        rawData
      );

      const hasChanges =
        updatedProduct.name !== originalProduct.name ||
        updatedProduct.category !== originalProduct.category ||
        updatedProduct.stock !== originalProduct.stock ||
        updatedProduct.description !== originalProduct.description;

      if (hasChanges) {
        fetch(`${apiUrl}/products/${updatedProduct.id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          body: JSON.stringify({
            name: updatedProduct.name,
            description: updatedProduct.description,
            stock: Number(updatedProduct.stock),
            // TODO: include category update request
          }),
        })
          .then(() => {
            fetchProducts();
          })
          .catch((error) => console.error('Error:', error));
      } else {
        fetchProducts();
      }
    }
  };

  const handleAddDialogClose = (
    action: 'confirm' | 'cancel',
    updatedProperties?: EditableProperties[]
  ) => {
    setAddDialogOpen(false);
    editableProperties = [];
    if (action === 'confirm' && updatedProperties) {
      fetch(`${apiUrl}/products`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          name: updatedProperties[0].value,
          description: updatedProperties[1].value,
          stock: Number(updatedProperties[2].value),
          // TODO: include category creation request
        }),
      })
        .then(() => {
          fetchProducts();
        })
        .catch((error) => console.error('Error:', error));
    }
  }

  useEffect(() => {
    fetchProducts();
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
              pageSizeOptions={[15, 30, 50]}
              checkboxSelection
              disableRowSelectionOnClick
              showToolbar
              onRowSelectionModelChange={(newSelectionModel) => {
                setSelectedRowIds(newSelectionModel);
              }}
            />
            <Container sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
              <AddButton />
              <EditButton disabled={!hasSelection || !multipleSelected} onClick={handleEdit} />
              <DeleteButton disabled={!hasSelection} onClick={handleDelete} />
            </Container>
          </DashboardCard>

        </Container>
      </Box>
      <ConfirmationDialog
        open={confDialogOpen}
        onClose={handleConfDialogClose}
        message={deleteMessage}
      />
      <EditDialog
        open={editDialogOpen}
        onClose={handleEditDialogClose}
        message={editMessage}
        properties={editableProperties}
      />
      <EditDialog
        open={addDialogOpen}
        onClose={handleAddDialogClose}
        message={addMessage}
        properties={[
          {
            name: 'name',
            value: '',
            required: true,
            editable: true
          },
          {
            name: 'category',
            value: '',
            required: true,
            editable: true
          },
          {
            name: 'description',
            value: '',
            required: false,
            editable: true
          },
          {
            name: 'stock',
            value: '',
            required: true,
            editable: true
          },
        ]}
      />
    </>
  );
}