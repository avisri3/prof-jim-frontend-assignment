import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios'; // Make sure Axios is imported

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

interface ProductState {
  items: Product[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: ProductState = {
  items: JSON.parse(localStorage.getItem('products') || '[]'),
  status: 'idle',
  error: null,
};

// Fetch products from API
export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
  const response = await axios.get('https://freetestapi.com/api/v1/products');
  return response.data;
});

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    addProduct(state, action: PayloadAction<Product>) {
      state.items.unshift(action.payload); // Add new product to the beginning of the array
      localStorage.setItem('products', JSON.stringify(state.items));
    },
    deleteProduct(state, action: PayloadAction<number>) {
      state.items = state.items.filter((product) => product.id !== action.payload);
      localStorage.setItem('products', JSON.stringify(state.items));
    },
    editProduct(state, action: PayloadAction<Product>) {
      const index = state.items.findIndex((product) => product.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = action.payload;
        localStorage.setItem('products', JSON.stringify(state.items));
      }
    },
    clearProducts(state) {
      state.items = [];
      localStorage.removeItem('products');
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // Only update state and localStorage if fetched products are different from localStorage
        if (state.items.length === 0) {
          state.items = action.payload;
          localStorage.setItem('products', JSON.stringify(state.items));
        }
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch products';
      });
  },
});

export const { addProduct, deleteProduct, editProduct, clearProducts } = productSlice.actions;
export default productSlice.reducer;
