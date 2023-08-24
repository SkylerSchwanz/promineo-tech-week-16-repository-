import { createApi } from '@reduxjs/toolkit/query/react';

export const api = createApi({
  // Ednpoints
  endpoints: (builder) => ({
    getUsers: builder.query({
      queryFn: async () => {
        const response = await fetch('/users', { method: 'GET' });
        if (!response.ok) {
          throw new Error('Failed to fetch users');
        }
        return response.json();
      },
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
  }),
});

// Export hooks for using the API endpoints
export const { useGetUsersQuery, useAddToCartMutation } = api;
