import {
  useCreateCatalogService,
  useDeleteCatalogService,
  useGetCatalogService,
  useUpdateCatalogService,
} from "@/api/catalogServices";
import ComboBox from "@/components/ComboBox";
import CustomDialog from "@/components/CustomDialog";
import DataGrid from "@/components/DataGrid";
import Dropdown from "@/components/Dropdown";
import Input from "@/components/Input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Delete, Edit } from "@mui/icons-material";
import {
  Box,
  Button,
  Chip,
  CircularProgress,
  IconButton,
  Stack,
  TextField,
} from "@mui/material";
import { fileToBase64 } from "file64";
import { MRT_ColumnDef } from "material-react-table";
import React, { useCallback, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import DashboardLayout from "..";
import {
  CatalogItemDataType,
  catalogFormDataZodSchema,
  catalogProductTypeOptions,
  defaultCatalogFormData,
} from "./typesAndData";

const DashboardCatalogPage: React.FC = () => {
  const { data: products = [] } = useGetCatalogService();

  const { mutate: updateProduct, isPending: isUpdateInProgress } =
    useUpdateCatalogService();
  const { mutate: deleteProduct, isPending: isDeleteInProgress } =
    useDeleteCatalogService();
  const { mutate: createProduct, isPending: isCreationInProgress } =
    useCreateCatalogService();

  const isLoading =
    isUpdateInProgress || isDeleteInProgress || isCreationInProgress;

  const [selectedItem, setSelectedItem] =
    useState<Partial<CatalogItemDataType> | null>(null);

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const { control, handleSubmit, reset, setValue } =
    useForm<CatalogItemDataType>({
      defaultValues: selectedItem ?? defaultCatalogFormData,
      resolver: zodResolver(catalogFormDataZodSchema),
    });

  const handleClose = useCallback(() => {
    setSelectedItem(null);
    setIsOpen(false);
  }, []);

  const columns = useMemo(() => {
    return [
      {
        accessorKey: "name",
        header: "Name",
      },
      {
        accessorKey: "image",
        header: "Image",
        enableSorting: false,
        maxSize: "8rem",
        accessorFn: (item) => (
          <Box
            component="img"
            src={item.image}
            alt="N/A"
            width="4rem"
            height="4rem"
            borderRadius="50%"
          />
        ),
      },
      {
        accessorFn: (item) => `$ ${item.price?.toFixed(2)}`,
        header: "Price",
        maxSize: "8rem",
      },
      {
        accessorKey: "tags",
        header: "Tags",
        maxSize: "8rem",
        enableSorting: false,
        accessorFn: (item) => (
          <Stack gap="0.25rem">
            {item.tags?.map((tag) => (
              <Chip
                key={item._id + tag}
                size="small"
                label={tag}
                sx={{ width: "8rem" }}
              />
            ))}
          </Stack>
        ),
      },
      {
        accessorKey: "type",
        header: "Type",
        maxSize: "8rem",
      },
      {
        accessorKey: "stockInNumber",
        header: "Stock In Number",
      },
      {
        id: "edit",
        header: "",
        accessorFn: (item) => (
          <IconButton
            onClick={() => {
              reset(item);
              setSelectedItem(item);
              setIsOpen(true);
            }}
          >
            <Edit color="primary" />
          </IconButton>
        ),
        enableSorting: false,
        maxSize: "3rem",
      },
      {
        id: "delete",
        header: "",
        accessorFn: (item) => (
          <IconButton
            onClick={() => {
              if (
                window.confirm("Are you sure you want to delete the product?")
              ) {
                deleteProduct(item);
              }
            }}
          >
            <Delete color="error" />
          </IconButton>
        ),
        enableSorting: false,
        maxSize: "3rem",
      },
    ] as MRT_ColumnDef<CatalogItemDataType>[];
  }, [deleteProduct, reset]);

  const onSubmit = (data: CatalogItemDataType, isEdit = false) => {
    if (isEdit) {
      return updateProduct(data, {
        onSuccess: handleClose,
      });
    }
    return createProduct(data, {
      onSuccess: handleClose,
    });
  };

  return (
    <DashboardLayout>
      <DataGrid
        tableTitle="Product Catalog"
        columns={columns}
        rows={products}
        muiTableContainerProps={{ sx: { height: "75vh" } }}
        topToolbarCustomActions={
          <Button
            size="small"
            variant="outlined"
            color="secondary"
            onClick={() => {
              setSelectedItem(null);
              setIsOpen(true);
              reset(defaultCatalogFormData);
            }}
          >
            Add
          </Button>
        }
      />

      {/* Modal */}
      <CustomDialog
        isOpen={isOpen}
        onClose={handleClose}
        title={selectedItem ? "Edit Product" : "Add Product"}
      >
        <Stack
          direction="row"
          gap="2rem"
          component="form"
          onSubmit={handleSubmit((d) =>
            onSubmit(
              { ...d, image: selectedItem?.image },
              Boolean(selectedItem)
            )
          )}
        >
          {/* Left Container */}
          <Stack gap="0.5rem">
            <Box
              border="1px solid gray"
              borderRadius="0.5rem"
              height="18rem"
              width="18rem"
            >
              <Box
                component="img"
                src={selectedItem?.image || "/image_placeholder.jpg"}
                alt={selectedItem?.name}
                width="100%"
                height="100%"
                p="0.5rem"
                borderRadius="0.75rem"
              />
            </Box>
            <TextField
              type="file"
              placeholder="Upload Image"
              helperText="Upload Image"
              onChange={async ({
                target,
              }: React.ChangeEvent<HTMLInputElement>) => {
                const file = target.files?.[0];
                if (!file) {
                  return setSelectedItem((prev) => ({
                    ...prev,
                    image: undefined,
                  }));
                }
                const image = await fileToBase64(file);
                setSelectedItem((prev) => ({ ...prev, image: image }));
              }}
            />
          </Stack>

          {/* Right Container */}
          <Stack width="30rem" gap="1.5rem">
            <Input
              control={control}
              id="name"
              label="Name"
              fullWidth
              size="small"
            />
            <Input
              control={control}
              id="description"
              label="Description"
              fullWidth
              multiline
              rows={2}
            />
            <Input
              control={control}
              id="price"
              label="Price"
              fullWidth
              type="number"
              size="small"
            />
            <Dropdown
              control={control}
              id="type"
              label="Type"
              options={catalogProductTypeOptions}
              variant="outlined"
            />
            <ComboBox
              control={control}
              id="tags"
              options={[]}
              label="Tags"
              multiple
              freeSolo
              onChange={(_, v) => setValue("tags", v)}
            />
            <Input
              control={control}
              id="stockInNumber"
              label="Stock in number"
              fullWidth
              type="number"
              size="small"
            />
            <Button
              fullWidth
              variant="contained"
              type="submit"
              startIcon={isLoading && <CircularProgress size="1rem" />}
              disabled={isLoading}
            >
              {!selectedItem ? "Add" : "Update"}
            </Button>
          </Stack>
        </Stack>
      </CustomDialog>
    </DashboardLayout>
  );
};

export default DashboardCatalogPage;
