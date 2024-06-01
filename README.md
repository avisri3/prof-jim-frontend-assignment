# Prof Jim Assignment

### [Video](https://www.loom.com/share/f7e70e45f7424a3ca37936e681ba9ec5?sid=07d3fbd2-ab48-4d98-bb69-1aea3a9629bf) 


## Brief overview of each component and how it works:

### App.tsx
- Sets up the router and routes for the application.
- Includes a private route to protect the dashboard.
- Provides the Redux store to the application.
### PrivateRoute.tsx
- A higher-order component that wraps protected routes.
- Checks if the user is authenticated before allowing access to the route.
### Login.tsx
- Handles user login.
- Dispatches login action to Redux store.
- Displays login form and handles form submission.
### ProductCard.tsx
- Displays individual product details.
- Provides options to edit, delete, and mark products as favorites.
### Navbar.tsx
- Displays a navigation bar.
- Includes options to search for products, add a new product, and log out.
### Dashboard.tsx
- Displays a grid of product cards.
- Handles fetching products from the API.
- Includes infinite scrolling and lazy loading.
### EditProductDialog.tsx
- A dialog for editing product details.
- Provides a form for users to update product information.
### AddProductDialog.tsx
- A dialog for adding a new product.
- Provides a form for users to input new product details.
### State Management
We are using Redux for state management. The state is divided into two slices:

### authSlice.ts
- Manages authentication state.
- Handles login, logout, and setting authentication from local storage.
- Uses async thunks for handling login API calls.
### productSlice.ts
- Manages product state.
- Handles fetching, adding, editing, and deleting products.
- Uses async thunks for fetching products from an API.
### store/index.ts
- Configures the Redux store.
- Combines auth and product reducers.
