import React, { useState } from 'react';
import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  IconButton,
  Typography,
  Avatar,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import EditProductDialog from './EditProductDialog';
import './ProductCard.css';

interface ProductCardProps {
  product: {
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
  };
  onDelete: (id: number) => void;
  onEdit: (product: any) => void;
  className?: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onDelete, onEdit, className }) => {
  const [expanded, setExpanded] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleDeleteClick = () => {
    setDeleteDialogOpen(true);
  };

  const handleClose = () => {
    setDeleteDialogOpen(false);
  };

  const handleConfirmDelete = () => {
    onDelete(product.id);
    setDeleteDialogOpen(false);
  };

  const handleEditClick = () => {
    setEditDialogOpen(true);
  };

  const handleEditDialogClose = () => {
    setEditDialogOpen(false);
  };

  const handleEditSave = (updatedProduct: any) => {
    onEdit(updatedProduct);
  };

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  return (
    <Card className={`${className} product-card`}>
      <CardHeader
        className="card-header"
        avatar={
          <Avatar aria-label="product">
            {product.name ? product.name.charAt(0) : 'N/A'}
          </Avatar>
        }
        title={
          <Typography variant="h6" className="card-title">
            {product.name || 'No Name'}
          </Typography>
        }
        action={
          <IconButton aria-label="add to favorites" onClick={toggleFavorite}>
            {isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
          </IconButton>
        }
      />
      {product.image && (
        <CardMedia
          component="img"
          height="200"
          image={product.image}
          alt={product.name || 'No Image'}
          className="card-media"
        />
      )}
      <CardContent className="card-content">
        <Typography variant="body2" color="text.secondary">
          {product.description || 'No Description'}
        </Typography>
        {expanded && (
          <div className="expanded-details">
            <Typography>Price: ${product.price}</Typography>
            <Typography>Rating: {product.rating}</Typography>
            <Typography>Brand: {product.brand}</Typography>
            <Typography>Color: {product.color}</Typography>
            <Typography>Connectivity: {product.connectivity}</Typography>
            <Typography>Wireless: {product.wireless ? 'Yes' : 'No'}</Typography>
          </div>
        )}
      </CardContent>
      <CardActions className="card-actions" disableSpacing>
        <IconButton aria-label="edit" onClick={handleEditClick}>
          <EditIcon />
        </IconButton>
        <IconButton aria-label="delete" onClick={handleDeleteClick}>
          <DeleteIcon />
        </IconButton>
        <IconButton
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Dialog open={deleteDialogOpen} onClose={handleClose}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this product?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirmDelete} color="primary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
      <EditProductDialog
        open={editDialogOpen}
        product={product}
        onClose={handleEditDialogClose}
        onSave={handleEditSave}
      />
    </Card>
  );
};

export default ProductCard;
