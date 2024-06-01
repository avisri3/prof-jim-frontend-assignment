import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store';
import { fetchProducts, deleteProduct, editProduct, addProduct } from '../store/slices/productSlice';
import ProductCard from './ProductCard';
import { Grid as MuiGrid, Container, CircularProgress } from '@mui/material';
import Navbar from './Navbar';
import './Dashboard.css';

const Dashboard: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { items: products, status } = useSelector((state: RootState) => state.products);
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [visibleProducts, setVisibleProducts] = useState(products.slice(0, 16));
  const [isLoading, setIsLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [allLoaded, setAllLoaded] = useState(false);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (status === 'idle') {
      setInitialLoading(true);
      setIsLoading(true);
      dispatch(fetchProducts()).then(() => {
        setTimeout(() => {
          setInitialLoading(false);
          setIsLoading(false);
        }, 3000);
      });
    } else {
      setFilteredProducts(products);
      setVisibleProducts(products.slice(0, 16));
    }
  }, [dispatch, status, products]);

  const handleDelete = (id: number) => {
    dispatch(deleteProduct(id));
  };

  const handleEdit = (product: any) => {
    dispatch(editProduct(product));
  };

  const handleAdd = (product: any) => {
    dispatch(addProduct(product));
  };

  const handleSearch = (query: string) => {
    const filtered = products.filter((product) =>
      product.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredProducts(filtered);
    setVisibleProducts(filtered.slice(0, 16));
    setAllLoaded(false);
  };

  const loadMoreItems = useCallback(() => {
    if (allLoaded) return;

    setIsLoading(true);
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    timerRef.current = setTimeout(() => {
      setVisibleProducts((prevVisibleProducts) => {
        const currentLength = prevVisibleProducts.length;
        const moreProducts = filteredProducts.slice(currentLength, currentLength + 16);
        if (moreProducts.length === 0) {
          setAllLoaded(true);
        }
        setIsLoading(false);
        return [...prevVisibleProducts, ...moreProducts];
      });
    }, 3000);
  }, [filteredProducts, allLoaded]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !allLoaded && !initialLoading) {
        loadMoreItems();
      }
    });

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    return () => {
      if (loadMoreRef.current) {
        observer.unobserve(loadMoreRef.current);
      }
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [loadMoreItems, allLoaded, initialLoading]);

  if (initialLoading) {
    return (
      <Container className="grid-container">
        <div className="loader-container">
          <CircularProgress />
        </div>
      </Container>
    );
  }

  return (
    <>
      <Navbar onSearch={handleSearch} onAddProduct={handleAdd} />
      <Container className="grid-container">
        <MuiGrid container spacing={2}>
          {visibleProducts.map((product) => (
            <MuiGrid item key={product.id} xs={12} sm={6} md={4} lg={3}>
              <ProductCard
                product={product}
                onDelete={handleDelete}
                onEdit={handleEdit}
                className="card"
              />
            </MuiGrid>
          ))}
        </MuiGrid>
        {isLoading && (
          <div className="loader-container">
            <CircularProgress />
          </div>
        )}
        <div ref={loadMoreRef} style={{ height: '20px' }} />
      </Container>
    </>
  );
};

export default Dashboard;
