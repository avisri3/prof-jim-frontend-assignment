import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppBar, Toolbar, Typography, Button, InputBase, IconButton } from '@mui/material';
import { Search as SearchIcon, Add as AddIcon } from '@mui/icons-material';
import { logoutAndClear } from '../store/slices/authSlice'; // Import the logoutAndClear action
import { RootState } from '../store';
import AddProductDialog from './AddProductDialog';
import './Navbar.css';

const Navbar: React.FC<{ onSearch: (query: string) => void; onAddProduct: (product: any) => void }> = ({ onSearch, onAddProduct }) => {
  const dispatch = useDispatch();
  const auth = useSelector((state: RootState) => state.auth);
  const [searchQuery, setSearchQuery] = useState('');
  const [addDialogOpen, setAddDialogOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logoutAndClear());
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
    onSearch(event.target.value);
  };

  const handleAddClick = () => {
    setAddDialogOpen(true);
  };

  const handleAddDialogClose = () => {
    setAddDialogOpen(false);
  };

  return (
    <>
      <AppBar position="fixed" className='app-bar-container'>
        <Toolbar>
          <Typography variant="h6" className="navbar-username">
            Welcome, {auth.username}
          </Typography>
          <div className="search">
            <div className="searchIcon">
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              value={searchQuery}
              onChange={handleSearchChange}
              classes={{
                root: 'inputRoot',
                input: 'inputInput',
              }}
            />
          </div>
          <IconButton color="inherit" aria-label="add" onClick={handleAddClick}>
            <AddIcon />
          </IconButton>
          <Button color="inherit" onClick={handleLogout}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      <AddProductDialog open={addDialogOpen} onClose={handleAddDialogClose} onSave={onAddProduct} />
    </>
  );
};

export default Navbar;
