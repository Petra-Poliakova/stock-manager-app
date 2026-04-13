import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  TextField,
  MenuItem,
  Button,
} from "@mui/material";

type TProductDialogProps = {
  open: boolean;
  closeDialogAddProduct: () => void;
  handleSubmit: (event: React.SubmitEvent<HTMLFormElement>) => void;
  category: string;
  handleCategoryChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  dataCategories: { name: string; slug: string }[] | null;
};

const CreateProductDialog = ({
  open,
  closeDialogAddProduct,
  handleSubmit,
  category,
  handleCategoryChange,
  dataCategories,
}: TProductDialogProps) => {
  return (
    <Dialog open={open} onClose={closeDialogAddProduct}>
      <DialogTitle>Create new product</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Please fill in the following details to add a new product to the
          catalog. Ensure all required fields are completed accurately.
        </DialogContentText>

        <form onSubmit={handleSubmit} id="product-add-form">
          <TextField
            required
            margin="dense"
            id="title"
            name="title"
            label="Product's Name"
            fullWidth
            variant="standard"
          />
          <TextField
            margin="dense"
            id="brand"
            name="brand"
            label="Brand"
            fullWidth
            variant="standard"
          />
          <TextField
            margin="dense"
            id="category"
            name="category"
            label="Select category"
            fullWidth
            variant="standard"
            select
            value={category}
            onChange={handleCategoryChange}
          >
            {dataCategories && dataCategories.length > 0 ? (
              dataCategories.map((category) => (
                <MenuItem key={category.slug} value={category.name}>
                  {category.name}
                </MenuItem>
              ))
            ) : (
              <MenuItem value="">No categories available</MenuItem>
            )}
          </TextField>
        </form>
      </DialogContent>

      <DialogActions>
        <Button sx={{"&:hover": { backgroundColor: 'var(--color-neutral-secondary)' }}} onClick={closeDialogAddProduct}>
          Cancel
        </Button>
        <Button type="submit" form="product-add-form" sx={{"&:hover": { backgroundColor: 'var(--color-neutral-secondary)'}}}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateProductDialog;
