import React, { useState, useEffect } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button } from '@mui/material';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  rating: number;
  brand: string;
  color: string;
  image: string;
  connectivity: string;
  wireless: boolean;
}

interface EditProductDialogProps {
  open: boolean;
  product: Product;
  onClose: () => void;
  onSave: (product: Product) => void;
}

const EditProductDialog: React.FC<EditProductDialogProps> = ({ open, product, onClose, onSave }) => {
  const [formValues, setFormValues] = useState<Product>(product);

  useEffect(() => {
    setFormValues(product);
  }, [product]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues((prevValues: Product) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSave = () => {
    onSave(formValues);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edit Product</DialogTitle>
      <DialogContent>
        <TextField
          margin="dense"
          name="name"
          label="Name"
          value={formValues.name}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          margin="dense"
          name="description"
          label="Description"
          value={formValues.description}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          margin="dense"
          name="price"
          label="Price"
          type="number"
          value={formValues.price}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          margin="dense"
          name="rating"
          label="Rating"
          type="number"
          value={formValues.rating}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          margin="dense"
          name="brand"
          label="Brand"
          value={formValues.brand}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          margin="dense"
          name="color"
          label="Color"
          value={formValues.color}
          onChange={handleChange}
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSave} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditProductDialog;
