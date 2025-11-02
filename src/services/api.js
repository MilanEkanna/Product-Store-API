// This file defines an API slice using Redux Toolkit Query to manage product data from a fake store API.


import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const productsApi = createApi({
    reducerPath: 'productsApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://fakestoreapi.com' }), //A lightweight wrapper around fetch() provided by RTK Query.
    endpoints: (builder) => ({
        getProducts: builder.query({ //Here Builder is an object that provides methods to define different types of endpoints like query and mutation and we must use builder to declare the endpoints
            query: () => '/products',  //Fetching lists and details
        }),


        getProductById: builder.query({ // Query Fetch read-only data 
            query: (id) => `/products/${id}`,  // fetching single product details
        }),


        updateProduct: builder.mutation({ // Mutation to modify data on the server
            query: ({ id, ...body }) => ({ //object destructuring and rest syntax to separate id from the rest of the body
                url: `/products/${id}`, // Updating product details
                method: 'PUT', // But This version does NOT auto-update the product list cache.
                body,
            }),
        }),



        deleteProduct: builder.mutation({
            query: (id) => ({
                url: `/products/${id}`, //Deleting that product 
                method: 'DELETE',
            }),


            // Below code remove from cached list instantly

            // Here onQueryStarted is a lifecycle callback in RTK Query that runs as soon as a mutation/query starts before the api request is made this is perfect for UI Updates.

            async onQueryStarted(id, { dispatch, queryFulfilled }) {
                // It allows you to directly modify the cached result of a specific query without making a new network request.

                // syntax is : api.util.updateQueryData(
                //                             endpointName,   
                //                             args,         
                //                             updateFunction  
                //                         )
                const patchList = dispatch( //here updateQueryData is a utility function provided by RTK Query
                    productsApi.util.updateQueryData('getProducts', undefined, (draft) => {
                        const index = draft.findIndex((product) => product.id === id); //A function that receives a mutable draft of the cached data 
                        if (index !== -1) {
                            draft.splice(index, 1); //Uses Immer under the hood 
                        }
                    })
                );



                try {
                    await queryFulfilled;
                    // Success: keep the optimistic update
                } catch (err) {
                    // On error, revert the cache update
                    patchList.undo();
                }
            },
        }),
    }),
});

export const {
    useGetProductsQuery,
    useGetProductByIdQuery,
    useUpdateProductMutation,
    useDeleteProductMutation,
} = productsApi;