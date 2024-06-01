import React, { useState } from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Button,
} from '@mui/material';

interface AddProductDialogProps {
  open: boolean;
  onClose: () => void;
  onSave: (product: any) => void;
}

const AddProductDialog: React.FC<AddProductDialogProps> = ({ open, onClose, onSave }) => {
  const [product, setProduct] = useState({
    id: Date.now(), // Generate a unique id based on the current timestamp
    name: '',
    description: '',
    price: '',
    rating: '',
    brand: '',
    color: '',
    image: '',
    connectivity: '',
    wireless: false,
  });

  const [errors, setErrors] = useState({
    name: '',
    price: '',
    rating: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));

    // Clear the error for the current field
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: '',
    }));
  };

  const validate = () => {
    const newErrors = { name: '', price: '', rating: '' };
    let isValid = true;

    if (!product.name) {
      newErrors.name = 'Name is required';
      isValid = false;
    }

    if (!product.price) {
      newErrors.price = 'Price is required';
      isValid = false;
    } else if (isNaN(Number(product.price)) || Number(product.price) < 0) {
      newErrors.price = 'Price must be a non-negative number';
      isValid = false;
    }

    if (isNaN(Number(product.rating))) {
      newErrors.rating = 'Rating must be a number';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSave = () => {
    if (validate()) {
      const productToSave = {
        ...product,
        price: Number(product.price),
        rating: Number(product.rating),
      };
      onSave(productToSave);
      onClose();
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add New Product</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Please fill out the form below to add a new product.
        </DialogContentText>
        <TextField
          margin="dense"
          name="name"
          label="Name"
          value={product.name}
          onChange={handleChange}
          error={!!errors.name}
          helperText={errors.name}
          fullWidth
        />
        <TextField
          margin="dense"
          name="description"
          label="Description"
          value={product.description}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          margin="dense"
          name="price"
          label="Price"
          value={product.price}
          onChange={handleChange}
          error={!!errors.price}
          helperText={errors.price}
          fullWidth
        />
        <TextField
          margin="dense"
          name="rating"
          label="Rating"
          value={product.rating}
          onChange={handleChange}
          error={!!errors.rating}
          helperText={errors.rating}
          fullWidth
        />
        <TextField
          margin="dense"
          name="brand"
          label="Brand"
          value={product.brand}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          margin="dense"
          name="color"
          label="Color"
          value={product.color}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          margin="dense"
          name="image"
          label="Image URL"
          value={product.image}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          margin="dense"
          name="connectivity"
          label="Connectivity"
          value={product.connectivity}
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

export default AddProductDialog;
