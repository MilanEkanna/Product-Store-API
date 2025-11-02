// src/store.js
import { configureStore } from '@reduxjs/toolkit';
import { productsApi } from './services/api';
import { setupListeners } from '@reduxjs/toolkit/query';

export const store = configureStore({ //The Redux Toolkit function to create a store 
  reducer: {
    [productsApi.reducerPath]: productsApi.reducer, //this is optionally specify the reducer path define in api slice
  }, //By using [productsApi.reducerPath], we are dynamically assigning the correct key — even if we later change reducerPath to something else (like 'storeApi'), the store setup still works automatically.

  middleware: (getDefaultMiddleware) =>

    getDefaultMiddleware().concat(productsApi.middleware),// Adds RTK Query’s middleware
    
});

setupListeners(store.dispatch) //A helper from RTK Query that enables automatic re-fetching on events like window refocus
