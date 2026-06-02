"use client"

import { useEffect, useState } from "react";
import { Container, Typography } from "@mui/material";
import { DataGrid, GridColDef, GridRowSelectionModel, GridRowId } from "@mui/x-data-grid";
import Navbar from "@/components/Navbar";
import ConfirmationDialog from "@/components/ConfirmationDialog";
import EditDialog, { EditableField } from "@/components/EditDialog";
import Product from "@/entities/Product";
import DashboardCard from "@/components/DashboardCard";
import MainBox from "@/components/MainBox";
import { AddButton, EditButton, DeleteButton } from "@/components/buttons";
import Category from "@/entities/Category";

const columns: GridColDef[] = [
  { field: 'id' },
  { field: 'name', headerName: 'Category Name', minWidth: 100, maxWidth: 200 },
  { field: 'description', headerName: 'Description', minWidth: 200, maxWidth: 400 },
]

let editableProperties: EditableField[] = [];

export default function CategoriesPage() {
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

  let deleteMessage = "Do you wish to delete this category?";
  let editMessage = "Edit category properties";
  let addMessage = "Add a new category";

  const hasSelection = selectedRowIds.type === 'include'
    ? selectedRowIds.ids.size > 0
    : selectedRowIds.ids.size < dataRows.length;

  const multipleSelected = selectedRowIds.type === 'include' && selectedRowIds.ids.size === 1;

  const apiUrl = process.env.API_URL;

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
        if (key !== "id") {
          editableProperties.push({
            type: 'text',
            name: key,
            value: value as string,
            editable: true,
            required: false
          })
        } else {
          editableProperties.push({
            type: 'text',
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

  const handleAdd = () => {
    setAddDialogOpen(true);
  }

  const handleEditDialogClose = (
    action: 'confirm' | 'cancel',
    updatedProperties?: EditableField[]
  ) => {
    setEditDialogOpen(false);
    editableProperties = [];
    if (action === 'confirm' && updatedProperties) {
      const originalCategory = getSelectedRows()[0];

      if (!originalCategory) return; // TODO: handle this error

      const rawData = Object.fromEntries(
        updatedProperties
          .filter((p) => p.name !== 'id' && p.name !== 'name' && p.value)
          .map((p) => [p.name, p.value])
      );

      const updatedCategory = Object.assign(
        new Category(
          originalCategory.id,
          rawData.name ?? originalCategory.name,
          rawData.description ?? originalCategory.description
        )
      );

      const hasChanges =
        updatedCategory.name !== originalCategory.name ||
        updatedCategory.description !== originalCategory.description;

      if (hasChanges) {
        fetch(`${apiUrl}/categories/${originalCategory.id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          body: JSON.stringify({
            name: updatedCategory.name,
            description: updatedCategory.description
          }),
        })
          .then(() => {
            fetchCategories();
          })
          .catch((error) => console.error('Error:', error));
      } else {
        fetchCategories();
      }
    }
  }

  const handleConfDialogClose = (value: string) => {
    setConfDialogOpen(false);
    if (value === 'confirm') {
      const selectedRows = getSelectedRows();
      const plural = selectedRows.length === 1 ? "category" : "categories";
      deleteMessage = `Do you wish to delete ${selectedRows.length} ${plural}?`

      const deletePromises = selectedRows.map((row) =>
        fetch(`${apiUrl}/categories/${row.id}`, {
          method: 'DELETE',
        }).catch((error) => console.error('Error:', error))
      );

      Promise.all(deletePromises).then(() => {
        fetchCategories();
      });
    }
  }

  const handleAddDialogClose = (
    action: 'confirm' | 'cancel',
    updatedProperties?: EditableField[]
  ) => {
    setAddDialogOpen(false);
    if (action === 'confirm' && updatedProperties) {
      fetch(`${apiUrl}/categories`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          name: updatedProperties[0].value,
          description: updatedProperties[1].value,
        }),
      })
        .then(() => {
          fetchCategories();
        })
        .catch((error) => console.error('Error:', error));
    }
  }

  const fetchCategories = () => {
    fetch(`${apiUrl}/categories`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        const rawCategories = Array.isArray(data)
          ? data
          : data.ok && Array.isArray(data.categories)
            ? data.categories
            : (data.categories || []);

        const mappedCategories = rawCategories.map((category: any) => ({
          id: category.categoryId,
          name: category.name,
          description: category.description,
        }));

        setDataRows(mappedCategories);
      })
      .catch((error) => console.error('Error:', error));
  }

  useEffect(() => {
    fetchCategories()
  }, [])

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
            <Container sx={{
              display: 'flex',
              gap: 2,
              justifyContent: 'center',
              marginBottom: '15px'
            }}>
              <AddButton onClick={handleAdd} />
              <EditButton disabled={!hasSelection || !multipleSelected} onClick={handleEdit} />
              <DeleteButton disabled={!hasSelection} onClick={handleDelete} />
            </Container>
          </DashboardCard>
        </Container>
      </MainBox>
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
            type: 'text',
            name: 'name',
            value: '',
            required: true,
            editable: true
          },
          {
            type: 'text',
            name: 'description',
            value: '',
            required: false,
            editable: true
          }
        ]}
      />
    </>
  )
}