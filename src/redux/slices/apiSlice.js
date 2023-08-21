import { createApi } from '@reduxjs/toolkit/query/react';

export const api = createApi({
  // Define endpoints here
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => fetch('/users', { method: 'GET' }).then((response) => response.json()),
    }),
    addToCart: builder.mutation({
      query: ({ productId }) => ({
        url: `/users/${productId}/cart`,
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('userAccessToken')}`,
        },
      }),
    }),
    // Define other endpoints as needed
  }),
});

// Export hooks for using the API endpoints
export const { useGetUsersQuery, useAddToCartMutation } = api;
